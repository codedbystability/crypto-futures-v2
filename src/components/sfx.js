// GameSfxManager.js
export function createSfxManager(volume = 0.4) {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    let master = ctx.createGain();
    master.gain.value = volume;
    master.connect(ctx.destination);

    const playTone = (freq, type = "sine", duration = 0.15, delay = 0) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.value = freq;
        osc.connect(gain);
        gain.connect(master);

        gain.gain.setValueAtTime(1, ctx.currentTime + delay);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);

        osc.start(ctx.currentTime + delay);
        osc.stop(ctx.currentTime + delay + duration);
    };

    const playSequence = (notes, type = "sine", gap = 0.05) => {
        let t = ctx.currentTime;
        notes.forEach(([freq, dur]) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = type;
            osc.frequency.value = freq;
            osc.connect(gain);
            gain.connect(master);

            gain.gain.setValueAtTime(1, t);
            gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

            osc.start(t);
            osc.stop(t + dur);

            t += dur + gap;
        });
    };

    const beat = () => {
        const t = ctx.currentTime;
        const makeBeat = (offset) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = "sine";
            osc.frequency.setValueAtTime(50, t + offset);
            gain.gain.setValueAtTime(1, t + offset);
            gain.gain.exponentialRampToValueAtTime(0.001, t + offset + 0.25);
            osc.connect(gain);
            gain.connect(master);
            osc.start(t + offset);
            osc.stop(t + offset + 0.25);
        };

        // double-beat pattern: lub-dub
        makeBeat(0);
        makeBeat(0.25);
    };

    return {
        ctx,
        beat,
        setVolume(v) {
            master.gain.value = v;
        },
        resume() {
            if (ctx.state === "suspended") ctx.resume();
        },

        // Basic clicks
        click() {
            playTone(300, "square", 0.05);
        },
        clickSoft() {
            playTone(220, "sine", 0.07);
        },

        // Notifications
        notify() {
            playSequence([[880, 0.07], [988, 0.1]], "triangle");
        },
        notifySoft() {
            playSequence([[660, 0.07], [880, 0.1]], "sine");
        },

        // Rewards
        success() {
            playSequence([[523, 0.1], [659, 0.1], [784, 0.15]], "triangle");
        },
        bonus() {
            playSequence([[440, 0.1], [660, 0.1], [880, 0.2]], "square");
        },
        jackpot() {
            playSequence([[440, 0.1], [554, 0.1], [660, 0.1], [880, 0.2]], "square", 0.04);
        },

        // Loss or error
        fail() {
            playSequence([[220, 0.15], [180, 0.25]], "sawtooth");
        },
        error() {
            playTone(150, "square", 0.25);
        },

        // UI feedback
        hover() {
            playTone(500, "sine", 0.04);
        },
        pop() {
            playSequence([[600, 0.05], [800, 0.05]], "triangle");
        },
        swoosh() {
            for (let i = 0; i < 10; i++) playTone(800 - i * 50, "sine", 0.02, i * 0.02);
        }
    };
}
