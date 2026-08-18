import { useEffect, useRef } from "react";

/**
 * Interactive background — a soft particle field that gently follows the cursor.
 * Particles push outward from the cursor and link to nearby neighbors with
 * thin lines, creating a constellation-like feel. Lightweight canvas, no deps.
 */
export function CursorField({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Touch-only devices have no cursor — skip the interactive layer entirely.
    const touchOnly =
      window.matchMedia("(hover: none)").matches &&
      window.matchMedia("(pointer: coarse)").matches;
    if (touchOnly) return;

    let w = 0,
      h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999, active: false };

    type P = { x: number; y: number; bx: number; by: number; r: number };
    let pts: P[] = [];
    let cols = 0;

    const GAP = 34;
    const RADIUS = 220;
    const PUSH = 38;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      pts = [];
      cols = 0;
      for (let y = GAP / 2; y < h; y += GAP) {
        let row = 0;
        for (let x = GAP / 2; x < w; x += GAP) {
          pts.push({ x, y, bx: x, by: y, r: 1.1 });
          row++;
        }
        if (cols === 0) cols = row;
      }
    };

    const setTarget = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      mouse.tx = clientX - rect.left;
      mouse.ty = clientY - rect.top;
      mouse.active = true;
    };

    const onMove = (e: MouseEvent) => setTarget(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) setTarget(t.clientX, t.clientY);
    };
    const onLeave = () => {
      mouse.active = false;
      mouse.tx = -9999;
      mouse.ty = -9999;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("mouseout", onLeave);

    const getInk = () => {
      const isDark = document.documentElement.classList.contains("dark");
      return isDark ? "245,240,225" : "20,22,30";
    };
    const styles = getComputedStyle(document.documentElement);
    const getLime = () => styles.getPropertyValue("--lime").trim() || "#cdfa4a";

    let raf = 0;
    const tick = () => {
      // ease cursor toward target for buttery feel
      mouse.x += (mouse.tx - mouse.x) * 0.18;
      mouse.y += (mouse.ty - mouse.y) * 0.18;

      ctx.clearRect(0, 0, w, h);
      const ink = getInk();
      const lime = getLime();
      const r2 = RADIUS * RADIUS;

      // pass 1: update positions
      for (const p of pts) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;

        let tx = p.bx,
          ty = p.by,
          glow = 0;
        if (mouse.active && d2 < r2) {
          const f = 1 - d2 / r2;
          const dist = Math.sqrt(d2) || 1;
          tx = p.bx + (dx / dist) * f * PUSH;
          ty = p.by + (dy / dist) * f * PUSH;
          glow = f;
        }
        p.x += (tx - p.x) * (reduce ? 1 : 0.15);
        p.y += (ty - p.y) * (reduce ? 1 : 0.15);
        // store glow on r for pass 2
        (p as any).g = glow;
      }

      // pass 2: connecting lines (only near cursor — cheap)
      if (mouse.active) {
        ctx.lineWidth = 1;
        for (let i = 0; i < pts.length; i++) {
          const p = pts[i];
          const g = (p as any).g as number;
          if (g <= 0.05) continue;
          // check right & bottom neighbors only (avoid double-draw)
          const neighbors = [pts[i + 1], pts[i + cols]];
          for (const n of neighbors) {
            if (!n) continue;
            const ng = (n as any).g as number;
            const avg = (g + ng) * 0.5;
            if (avg < 0.08) continue;
            ctx.strokeStyle = `rgba(${ink},${0.18 + avg * 0.45})`;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(n.x, n.y);
            ctx.stroke();
          }
        }
      }

      // pass 3: dots
      for (const p of pts) {
        const g = (p as any).g as number;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r + g * 2.4, 0, Math.PI * 2);
        if (g > 0.4) {
          ctx.fillStyle = lime;
          ctx.globalAlpha = 0.55 + g * 0.45;
        } else {
          ctx.fillStyle = `rgb(${ink})`;
          ctx.globalAlpha = 0.32 + g * 0.6;
        }
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("mouseout", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    />
  );
}
