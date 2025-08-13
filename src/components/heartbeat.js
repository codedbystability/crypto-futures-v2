// TradingAudioDirector.js
// Standalone trading audio engine: dynamic heartbeat + event SFX.
// Call director.resume() after a user gesture (required by browsers).

export function createTradingAudioDirector({
                                               volume = 0.35,           // master volume 0..1
                                               hbMinBPM = 60,           // heartbeat BPM range
                                               hbMaxBPM = 120,
                                               hbJitter = 0.10,         // per-beat timing randomness
                                               hbSwing  = 0.05,         // lub->dub swing feel
                                               duckDb   = -6,           // heartbeat duck amount in dB during big SFX
                                               maxSfxPerMinute = 12,    // global rate limit
                                           } = {}) {

    // ---------- Audio bootstrap ----------
    const AC = window.AudioContext || window.webkitAudioContext;
    const ctx = new AC();

    // Master + a separate bus for heartbeat (so we can duck it)
    const master = ctx.createGain();
    const hbBus  = ctx.createGain();
    const sfxBus = ctx.createGain();

    // simple linear gain utils
    const dbToGain = (db) => Math.pow(10, db / 20);

    master.gain.value = volume;
    hbBus.gain.value = 1;
    sfxBus.gain.value = 1;

    hbBus.connect(master);
    sfxBus.connect(master);
    master.connect(ctx.destination);

    const clamp = (v,a,b)=>Math.max(a,Math.min(b,v));
    const lerp  = (a,b,t)=>a+(b-a)*t;

    // ---------- Rate limit ----------
    const sfxWindow = { start: 0, count: 0 };
    function canPlay() {
        const now = performance.now();
        if (!sfxWindow.start || now - sfxWindow.start > 60000) {
            sfxWindow.start = now; sfxWindow.count = 0;
        }
        if (sfxWindow.count >= maxSfxPerMinute) return false;
        sfxWindow.count++;
        return true;
    }

    // ---------- Tiny synths ----------
    function env(g, t=0.2, peak=0.9, curve="exp") {
        const n = ctx.currentTime;
        g.gain.cancelScheduledValues(n);
        g.gain.setValueAtTime(0.0001, n);
        if (curve==="exp") {
            g.gain.exponentialRampToValueAtTime(peak, n + Math.min(0.01, t*0.3));
            g.gain.exponentialRampToValueAtTime(0.0001, n + t);
        } else {
            g.gain.linearRampToValueAtTime(peak, n + Math.min(0.01, t*0.3));
            g.gain.linearRampToValueAtTime(0.0001, n + t);
        }
    }

    function tone({freq=880, dur=0.15, type="triangle", gain=0.7, bus=sfxBus, start=ctx.currentTime}) {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = type; o.frequency.setValueAtTime(freq, start);
        g.gain.value = 0.0001;
        o.connect(g); g.connect(bus);
        // envelope
        g.gain.setValueAtTime(0.0001, start);
        g.gain.exponentialRampToValueAtTime(gain, start + 0.01);
        g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
        o.start(start); o.stop(start + dur + 0.01);
    }

    function noise({dur=0.15, startFreq=1500, endFreq=300, q=4, bus=sfxBus, start=ctx.currentTime, peak=0.5}) {
        const len = Math.floor(ctx.sampleRate * dur);
        const buf = ctx.createBuffer(1, len, ctx.sampleRate);
        const data = buf.getChannelData(0);
        for (let i=0;i<len;i++) data[i] = Math.random()*2-1;

        const src = ctx.createBufferSource();
        src.buffer = buf;

        const g = ctx.createGain();
        g.gain.value = 0.0001;
        const f = ctx.createBiquadFilter();
        f.type = "bandpass";
        f.frequency.setValueAtTime(startFreq, start);
        f.Q.value = q;
        f.frequency.exponentialRampToValueAtTime(endFreq, start + dur);

        src.connect(g); g.connect(f); f.connect(bus);

        // env
        g.gain.setValueAtTime(0.0001, start);
        g.gain.exponentialRampToValueAtTime(peak, start + 0.01);
        g.gain.exponentialRampToValueAtTime(0.0001, start + dur);

        src.start(start); src.stop(start + dur + 0.01);
    }

    // ---------- Heartbeat scheduler ----------
    let isRunning = false, timerId = null;
    let lookahead = 0.025, scheduleAhead = 0.12;
    let nextBeatTime = 0;
    let minBPM = hbMinBPM, maxBPM = hbMaxBPM;
    let bpm = (minBPM + maxBPM)/2, targetBpm = bpm;
    let jitter = hbJitter, swing = hbSwing, dubRatio = 0.26;
    let lastUpdate = 0;

    function scheduleThump(atTime, strength=1) {
        // bass body
        const bodyOsc = ctx.createOscillator();
        bodyOsc.type = "sine";
        bodyOsc.frequency.setValueAtTime(58, atTime);
        bodyOsc.frequency.exponentialRampToValueAtTime(38, atTime + 0.08);

        const gBody = ctx.createGain();
        gBody.gain.value = 0.0001;
        bodyOsc.connect(gBody); gBody.connect(hbBus);

        gBody.gain.setValueAtTime(0.0001, atTime);
        gBody.gain.exponentialRampToValueAtTime(0.5*strength, atTime + 0.006);
        gBody.gain.exponentialRampToValueAtTime(0.0001, atTime + 0.22);

        // click transient
        const clickOsc = ctx.createOscillator();
        clickOsc.type = "sine";
        clickOsc.frequency.setValueAtTime(220, atTime);
        const gClick = ctx.createGain();
        gClick.gain.value = 0.0001;
        clickOsc.connect(gClick); gClick.connect(hbBus);
        gClick.gain.setValueAtTime(0.0001, atTime);
        gClick.gain.exponentialRampToValueAtTime(0.2*strength, atTime + 0.003);
        gClick.gain.exponentialRampToValueAtTime(0.0001, atTime + 0.04);

        bodyOsc.start(atTime); clickOsc.start(atTime);
        clickOsc.stop(atTime + 0.06);
        bodyOsc.stop(atTime + 0.25);
    }

    function scheduleBeat(atTime) {
        const interval = 60 / bpm;
        const swingOffset = (Math.random()*2-1) * swing * interval;
        const lubTime = atTime;
        const dubTime = atTime + dubRatio * interval + swingOffset;
        scheduleThump(lubTime, 1.0);
        scheduleThump(dubTime, 0.72);
    }

    function updateTempo(now) {
        const dt = Math.min(0.25, Math.max(0, now - lastUpdate));
        lastUpdate = now;
        // drift target a little
        if (Math.random() < 0.02) {
            const span = maxBPM - minBPM;
            targetBpm = clamp(targetBpm + (Math.random()-0.5)*0.15*span, minBPM, maxBPM);
        }
        // ease bpm
        bpm = lerp(bpm, targetBpm, 0.35*dt);
    }

    function scheduler() {
        if (!isRunning) return;
        const now = ctx.currentTime;
        updateTempo(now);

        while (nextBeatTime < now + scheduleAhead) {
            scheduleBeat(nextBeatTime);
            const baseInterval = 60 / bpm;
            const localJ = 1 + (Math.random()*2-1)*jitter;
            nextBeatTime += baseInterval * localJ;
        }
        timerId = setTimeout(scheduler, lookahead * 1000);
    }

    function start() {
        if (isRunning) return;
        if (ctx.state === "suspended") ctx.resume();
        isRunning = true;
        lastUpdate = ctx.currentTime;
        nextBeatTime = ctx.currentTime + 0.05;
        scheduler();
    }

    function stop() {
        isRunning = false;
        if (timerId) { clearTimeout(timerId); timerId = null; }
    }

    // ---------- Sidechain ducking ----------
    let duckTimeout = null;
    function duckHeartbeat(ms = 180) {
        // dip hbBus by duckDb dB briefly
        const now = ctx.currentTime;
        const g = hbBus.gain;
        const target = dbToGain(duckDb);
        g.cancelScheduledValues(now);
        const prev = g.value;
        g.setValueAtTime(prev, now);
        g.linearRampToValueAtTime(target, now + 0.02);
        g.linearRampToValueAtTime(1, now + ms/1000);
        if (duckTimeout) clearTimeout(duckTimeout);
        duckTimeout = setTimeout(()=>{}, ms);
    }

    // ---------- Public SFX (event cues) ----------
    const sfx = {
        orderPlaced() { if (!canPlay()) return; tone({freq:600,dur:0.07,type:"square"}); },
        orderFilled(side="buy") {
            if (!canPlay()) return;
            const f = side==="buy" ? 900 : 500;
            tone({freq:f, dur:0.1, type:"triangle"});
            tone({freq:f*1.33, dur:0.08, type:"sine", start: ctx.currentTime+0.06});
            duckHeartbeat(160);
        },
        takeProfit() {
            if (!canPlay()) return;
            tone({freq:700, dur:0.08, type:"triangle"});
            tone({freq:900, dur:0.10, type:"sine", start: ctx.currentTime+0.06});
            tone({freq:1200,dur:0.12,type:"sine", start: ctx.currentTime+0.12});
            duckHeartbeat(220);
        },
        stopLoss() {
            if (!canPlay()) return;
            tone({freq:220, dur:0.18, type:"sawtooth", gain:0.8});
            noise({dur:0.18, startFreq:1200, endFreq:300, peak:0.35});
            duckHeartbeat(240);
        },
        breakout(str=1) {
            if (!canPlay()) return;
            const now = ctx.currentTime;
            const steps = [660, 770, 880, 990, 1180];
            steps.slice(0, Math.min(steps.length, 3+Math.round(str*2))).forEach((f,i)=>{
                tone({freq:f, dur:0.09, type:"triangle", start: now + i*0.06});
            });
            duckHeartbeat(200);
        },
        newHigh() { if (!canPlay()) return; tone({freq:1400,dur:0.1,type:"triangle"}); },
        newLow()  { if (!canPlay()) return; tone({freq:180,dur:0.16,type:"sawtooth"}); },
        volSpike() { if (!canPlay()) return; noise({dur:0.12, startFreq:4000, endFreq:900, peak:0.4}); duckHeartbeat(160); },
        alert()    { if (!canPlay()) return; tone({freq:980, dur:0.12, type:"square"}); },
        notify()   { if (!canPlay()) return; tone({freq:900, dur:0.08, type:"triangle"}); tone({freq:1100, dur:0.08, type:"sine", start: ctx.currentTime+0.06}); },
    };

    // ---------- Market-driven mood (call this with your data) ----------
    // onMarketUpdate({ volatility: 0..1, pnl: number, drawdown: 0..1, candleClosed: bool, madeNewHigh, madeNewLow, breakoutStrength })
    function onMarketUpdate({
                                volatility = 0.2,
                                pnl = 0,
                                drawdown = 0,
                                candleClosed = false,
                                madeNewHigh = false,
                                madeNewLow = false,
                                breakoutStrength = 0,
                            } = {}) {
        // map vol to BPM range
        const tVol = clamp(volatility, 0, 1);
        const min = lerp(hbMinBPM, Math.max(hbMinBPM, hbMinBPM+10), tVol*0.2);
        const max = lerp(hbMaxBPM*0.7, hbMaxBPM, tVol);
        minBPM = Math.min(min, max-5);
        maxBPM = max;
        // target BPM nudges with PnL trend (positive PnL → slightly faster)
        const pnlBias = clamp(pnl, -1, 1) * 4; // +/- 4 BPM bias
        const center = clamp(((minBPM+maxBPM)/2) + pnlBias, minBPM, maxBPM);
        // steer target bpm toward center
        targetBpm = center;

        // spike cues
        if (breakoutStrength > 0.6) sfx.breakout(breakoutStrength);
        if (madeNewHigh) sfx.newHigh();
        if (madeNewLow)  sfx.newLow();
        if (tVol > 0.75) sfx.volSpike();

        // candle close ticks during high vol only
        if (candleClosed && tVol > 0.6 && canPlay()) {
            tone({freq:1000, dur:0.04, type:"square", gain:0.25});
        }

        // drawdown warning (duck heartbeat a bit)
        if (drawdown > 0.35 && canPlay()) {
            tone({freq:240, dur:0.12, type:"sawtooth", gain:0.5});
            duckHeartbeat(200);
        }
    }

    function setVolume(v) {
        master.gain.linearRampToValueAtTime(clamp(v, 0, 1), ctx.currentTime + 0.02);
    }

    function setHeartbeatVariability({ newJitter, newSwing, newDubRatio } = {}) {
        if (typeof newJitter === "number") jitter = clamp(newJitter, 0, 0.5);
        if (typeof newSwing  === "number") swing  = clamp(newSwing, 0, 0.3);
        if (typeof newDubRatio === "number") dubRatio = clamp(newDubRatio, 0.15, 0.45);
    }

    function resume() { return ctx.state === "suspended" ? ctx.resume() : Promise.resolve(); }
    function destroy() { stop(); try { master.disconnect(); } catch {} try { ctx.close(); } catch {} }

    return {
        // lifecycle
        resume, start, stop, destroy,
        // controls
        setVolume, setHeartbeatVariability,
        setTempoRange(min,max){ hbMinBPM=min; hbMaxBPM=max; minBPM=min; maxBPM=max; targetBpm = clamp(targetBpm, min, max); },
        // events
        sfx,
        onMarketUpdate,
        // debug
        getState: () => ({ running: isRunning, bpm, minBPM, maxBPM, jitter, swing, dubRatio })
    };
}
