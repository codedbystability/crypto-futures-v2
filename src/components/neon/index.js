// GameNeonChartPerf.js
import React, { useRef, useEffect } from "react";

/* ---------- utils ---------- */
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
function hexToRgb(hex) {
    const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
    return m ? [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)] : [0, 0, 0];
}
function rgbToHex(r, g, b) {
    const c = (x) => Math.round(clamp(x, 0, 255)).toString(16).padStart(2, "0");
    return `#${c(r)}${c(g)}${c(b)}`;
}
function brighten(rgb, f = 1.6) {
    return rgbToHex(rgb[0] * f, rgb[1] * f, rgb[2] * f);
}

/* ---------- component ---------- */
export default function GameNeonChartPerf({
                                              height = 200,
                                              stroke = 2,
                                              glow = 12,
                                              bg = "#0d1f16",
                                              lineColor = "green", // "red" | "green" | "orange"
                                              volatility = 0.8,
                                              opacity = 0.95,
                                              gridOpacity = 0.08,
                                              transitionMs = 700,
                                              maxParticles = 100,
                                              fps = 60,                 // cap (30/45/60). Lower if your device is weak.
                                              pointStep = 2,            // pixels between points (2 = half the points)
                                              scanlines = true,
                                              vignette = true,
                                          }) {
    const canvasRef = useRef(null);
    const rafRef = useRef(0);
    const runningRef = useRef(true);

    const dataRef = useRef(null);      // Float32Array
    const particlesRef = useRef([]);
    const sweepRef = useRef(0);
    const flashRef = useRef(0);
    const priceRef = useRef(0.55); // normalized 0..1
    const velRef   = useRef(0);    // momentum
    const volRef   = useRef(0.35); // volatility level
    const trendRef = useRef(0);    // slow drift -1..1

    const colorMap = {
        red: "#ff2a2a",
        green: "#32ff88",
        orange: "#ffb347",
    };

    const initialColor = colorMap[lineColor] || "#32ff88";
    const currentColorRef = useRef(hexToRgb(initialColor));
    const targetColorRef = useRef(hexToRgb(initialColor));
    const lastColorKeyRef = useRef(lineColor);

    // Offscreen for static layers
    const gridCanvasRef = useRef(null);

    useEffect(() => {
        const next = hexToRgb(colorMap[lineColor] || "#32ff88");
        targetColorRef.current = next;
        if (lastColorKeyRef.current !== lineColor) {
            flashRef.current = 1;
            lastColorKeyRef.current = lineColor;
        }
    }, [lineColor]);

    useEffect(() => {
        const cv = canvasRef.current;
        if (!cv) return;
        const ctx = cv.getContext("2d", { alpha: true });

        let dpr = Math.max(1, window.devicePixelRatio || 1);
        let widthCss = cv.clientWidth || 800;
        let step = Math.max(1, Math.round(pointStep)); // pixel spacing between points
        let pointCount = Math.max(2, Math.floor(widthCss / step));
        let lastTs = performance.now();
        const frameInterval = 1000 / clamp(fps, 10, 60);

        // build offscreen static grid/scanlines once per size
        const buildStatics = () => {
            widthCss = cv.clientWidth || 800;
            pointCount = Math.max(2, Math.floor(widthCss / step));
            cv.width = Math.floor(widthCss * dpr);
            cv.height = Math.floor(height * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            // seed data
            const arr = new Float32Array(pointCount);
            let lastY = height / 2;
            for (let i = 0; i < pointCount; i++) {
                lastY = clamp(lastY + (Math.random() - 0.5) * volatility * 10, 10, height - 10);
                arr[i] = lastY;
            }
            dataRef.current = arr;


            priceRef.current = 0.55;
            velRef.current   = 0;
            volRef.current   = 0.35;
            trendRef.current = (Math.random() - 0.5) * 0.2; // small initial drift


            // offscreen grid
            const gcv = document.createElement("canvas");
            gcv.width = Math.floor(widthCss * dpr);
            gcv.height = Math.floor(height * dpr);
            const gctx = gcv.getContext("2d");
            gctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            // gradient background
            const grad = gctx.createLinearGradient(0, 0, 0, height);
            grad.addColorStop(0, bg);
            grad.addColorStop(1, "#07110c");
            gctx.fillStyle = grad;
            gctx.fillRect(0, 0, widthCss, height);

            // grid lines
            gctx.strokeStyle = `rgba(255,255,255,${gridOpacity})`;
            gctx.lineWidth = 1;
            gctx.beginPath();
            for (let gx = 0; gx < widthCss; gx += 60) {
                gctx.moveTo(gx, 0);
                gctx.lineTo(gx, height);
            }
            for (let gy = 0; gy < height; gy += 30) {
                gctx.moveTo(0, gy);
                gctx.lineTo(widthCss, gy);
            }
            gctx.stroke();

            if (vignette) {
                const radial = gctx.createRadialGradient(
                    widthCss / 2,
                    height / 2,
                    height * 0.2,
                    widthCss / 2,
                    height / 2,
                    height * 0.9
                );
                radial.addColorStop(0, "rgba(0,0,0,0)");
                radial.addColorStop(1, "rgba(0,0,0,0.45)");
                gctx.fillStyle = radial;
                gctx.fillRect(0, 0, widthCss, height);
            }

            if (scanlines) {
                gctx.globalAlpha = 0.08;
                gctx.fillStyle = "black";
                for (let y = 0; y < height; y += 2) gctx.fillRect(0, y, widthCss, 1);
                gctx.globalAlpha = 1;
            }

            gridCanvasRef.current = gcv;
        };

        const resize = () => {
            dpr = Math.max(1, window.devicePixelRatio || 1);
            buildStatics();
            sweepRef.current = 0; // re-run entrance on resize
        };

        buildStatics();
        window.addEventListener("resize", resize, { passive: true });

        const onVisibility = () => {
            runningRef.current = !document.hidden;
            if (runningRef.current) {
                lastTs = performance.now();
                loop(lastTs);
            }
        };
        document.addEventListener("visibilitychange", onVisibility);

        // particles (small pool)
        const spawnParticle = (x, y, color) => {
            const p = {
                x, y,
                vx: (Math.random() - 0.5) * 0.8,
                vy: (Math.random() - 0.5) * 1.0,
                life: 1,
                size: Math.random() * 2 + 1.2,
                color,
            };
            const list = particlesRef.current;
            if (list.length >= maxParticles) list.shift();
            list.push(p);
        };
        const drawParticles = () => {
            const list = particlesRef.current;
            for (let i = 0; i < list.length; i++) {
                const p = list[i];
                ctx.globalAlpha = p.life;
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
                p.x += p.vx;
                p.y += p.vy + 0.02;
                p.vx *= 0.985;
                p.vy *= 0.985;
                p.life -= 0.02;
            }
            particlesRef.current = list.filter((p) => p.life > 0);
            ctx.globalAlpha = 1;
        };

        const updateData = () => {
            const h = height;

            // mean‑reverting volatility (keeps clustering but bounded)
            volRef.current += (0.35 - volRef.current) * 0.03 + (Math.random() - 0.5) * 0.02;
            volRef.current = clamp(volRef.current, 0.08, 0.9);

            // slow trend drift (regimes)
            if (Math.random() < 0.02) trendRef.current += (Math.random() - 0.5) * 0.15;
            trendRef.current = clamp(trendRef.current * 0.98, -0.8, 0.8);

            // momentum with damping + noise + drift
            velRef.current =
                velRef.current * 0.85 +
                (Math.random() - 0.5) * 0.06 * volRef.current +
                trendRef.current * 0.012;

            // rare spike / gap
            if (Math.random() < 0.003) velRef.current += (Math.random() - 0.5) * 0.4 * volRef.current;

            // integrate to price and keep in band
            priceRef.current = clamp(priceRef.current + velRef.current, 0.08, 0.92);

            // soft bounce near edges
            if (priceRef.current < 0.12) velRef.current = Math.abs(velRef.current) * 0.7;
            if (priceRef.current > 0.88) velRef.current = -Math.abs(velRef.current) * 0.7;

            const y = clamp(h * (1 - priceRef.current), 10, h - 10);

            // push to buffer
            const arr = dataRef.current;
            for (let i = 0; i < arr.length - 1; i++) arr[i] = arr[i + 1];
            arr[arr.length - 1] = y;
        };


        const buildPath = (visibleCount, arr) => {
            const path = new Path2D();
            const stepPx = step;
            path.moveTo(0, arr[0]);
            for (let i = 1; i < visibleCount; i++) {
                path.lineTo(i * stepPx, arr[i]);
            }
            return path;
        };

        const loop = (ts) => {
            if (!runningRef.current) return;
            rafRef.current = requestAnimationFrame(loop);

            // FPS cap
            const dt = ts - lastTs;
            if (dt < frameInterval) return;
            lastTs = ts;

            // entrance sweep progress
            if (sweepRef.current < 1) {
                const inc = 1 / (transitionMs / frameInterval);
                sweepRef.current = clamp(sweepRef.current + inc, 0, 1);
            }
            if (flashRef.current > 0) flashRef.current = clamp(flashRef.current - 0.06, 0, 1);

            // update simulation once per frame
            updateData();

            const arr = dataRef.current;
            const blended = currentColorRef.current;
            const tgt = targetColorRef.current;
            const s = 0.08;
            blended[0] += (tgt[0] - blended[0]) * s;
            blended[1] += (tgt[1] - blended[1]) * s;
            blended[2] += (tgt[2] - blended[2]) * s;
            const baseHex = rgbToHex(blended[0], blended[1], blended[2]);
            const hiHex = brighten(blended, 1.7);

            // draw static bg once per frame
            const gcv = gridCanvasRef.current;
            ctx.clearRect(0, 0, widthCss, height);
            ctx.drawImage(gcv, 0, 0);

            // reveal amount
            const sweep = easeOutCubic(sweepRef.current);
            const visibleCount = Math.max(2, Math.floor(arr.length * sweep));

            // build line Path2D once; reuse for bloom + core
            const path = buildPath(visibleCount, arr);
            const glowPulse = glow + Math.sin(ts * 0.002) * 2;

            // bloom trail (lighter)
            ctx.globalCompositeOperation = "lighter";
            ctx.shadowBlur = glowPulse * 2;
            ctx.shadowColor = baseHex;
            ctx.globalAlpha = 0.45 * opacity;
            ctx.lineJoin = "round";
            ctx.lineCap = "round";
            ctx.lineWidth = stroke + glowPulse * 0.6;
            ctx.strokeStyle = baseHex;
            ctx.stroke(path);

            // core line
            ctx.globalCompositeOperation = "source-over";
            ctx.shadowBlur = glowPulse;
            ctx.globalAlpha = opacity;
            ctx.lineWidth = stroke;
            ctx.strokeStyle = baseHex;
            ctx.stroke(path);

            // two lightweight highlight pulses – compute index, draw tiny segments only
            const wPx = (arr.length - 1) * step;
            const hx1 = ((ts * 0.15) % wPx) / step;
            const hx2 = (wPx - ((ts * 0.10) % wPx)) / step;

            const drawPulseAt = (centerIdx) => {
                const start = Math.max(1, Math.floor(centerIdx - 8));
                const end = Math.min(visibleCount - 1, Math.ceil(centerIdx + 8));
                if (end <= start) return;
                ctx.shadowBlur = 0;
                ctx.globalAlpha = 1;
                ctx.strokeStyle = hiHex;
                ctx.lineWidth = stroke * 1.3;
                ctx.beginPath();
                ctx.moveTo((start - 1) * step, arr[start - 1]);
                for (let i = start; i <= end; i++) ctx.lineTo(i * step, arr[i]);
                ctx.stroke();
                // sprinkle 1–2 particles only
                if (Math.random() < 0.25) {
                    const i = Math.floor(centerIdx);
                    spawnParticle(i * step, arr[i], hiHex);
                }
            };
            drawPulseAt(hx1);
            drawPulseAt(hx2);

            // color-change flash overlay
            if (flashRef.current > 0) {
                ctx.globalAlpha = 0.35 * flashRef.current;
                ctx.shadowBlur = 12;
                ctx.shadowColor = hiHex;
                ctx.lineWidth = stroke * 1.6;
                ctx.strokeStyle = hiHex;
                ctx.stroke(path);
                ctx.globalAlpha = 1;
                ctx.shadowBlur = 0;
            }

            drawParticles();

            // gentle color fog tint once (cheap)
            ctx.globalAlpha = 0.06;
            ctx.fillStyle = baseHex;
            ctx.fillRect(0, 0, widthCss, height);
            ctx.globalAlpha = 1;
        };

        // start
        runningRef.current = !document.hidden;
        if (runningRef.current) {
            lastTs = performance.now();
            loop(lastTs);
        }

        return () => {
            runningRef.current = false;
            cancelAnimationFrame(rafRef.current);
            window.removeEventListener("resize", resize);
            document.removeEventListener("visibilitychange", onVisibility);
        };
    }, [
        height,
        stroke,
        glow,
        bg,
        volatility,
        opacity,
        gridOpacity,
        transitionMs,
        maxParticles,
        fps,
        pointStep,
        scanlines,
        vignette,
    ]);

    return (
        <canvas
            ref={canvasRef}
            style={{ width: "100%", height: "100%", display: "block" }}
        />
    );
}
