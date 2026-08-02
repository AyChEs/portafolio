import { useEffect, useRef } from 'react';
import { useApp } from '../lib/app-context.jsx';

// Dotted point-cloud globe rendered on a 2D canvas — no WebGL dependency,
// so it renders reliably everywhere and follows the active theme.
export default function Globe() {
  const canvasRef = useRef(null);
  const { theme } = useApp();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Precompute a sphere of points.
    const pts = [];
    for (let lat = -84; lat <= 84; lat += 6) {
      const rad = Math.cos((lat * Math.PI) / 180);
      const count = Math.max(6, Math.round(52 * rad));
      for (let i = 0; i < count; i++) pts.push([lat, (360 / count) * i]);
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0, R = 0, cx = 0, cy = 0;
    const resize = () => {
      const size = canvas.offsetWidth || 300;
      W = canvas.width = size * dpr;
      H = canvas.height = size * dpr;
      R = W * 0.38; cx = W / 2; cy = H / 2;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const start = performance.now();
    let raf;
    const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

    const draw = (t) => {
      const light = document.documentElement.getAttribute('data-theme') === 'light';
      const rot = reduce ? 40 : ((t - start) / 92) % 360;
      ctx.clearRect(0, 0, W, H);

      const glow = ctx.createRadialGradient(cx, cy, R * 0.2, cx, cy, R * 1.5);
      glow.addColorStop(0, light ? 'rgba(37,99,235,.12)' : 'rgba(37,99,235,.22)');
      glow.addColorStop(1, 'rgba(37,99,235,0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, W, H);

      for (let i = 0; i < pts.length; i++) {
        const latR = (pts[i][0] * Math.PI) / 180;
        const lonR = ((pts[i][1] + rot) * Math.PI) / 180;
        const x = Math.cos(latR) * Math.sin(lonR);
        const y = Math.sin(latR);
        const z = Math.cos(latR) * Math.cos(lonR);
        if (z < 0) continue;
        const px = cx + x * R;
        const py = cy - y * R;
        const depth = 0.25 + z * 0.75;
        ctx.globalAlpha = depth * (light ? 0.55 : 0.8);
        ctx.fillStyle = light ? '#1d4ed8' : '#60a5fa';
        ctx.beginPath();
        ctx.arc(px, py, Math.max(0.7, 2.4 * depth) * dpr, 0, 6.2832);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    requestAnimationFrame(() => { if (canvas) canvas.style.opacity = '1'; });

    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [theme]);

  return (
    <div className="globe-wrap">
      <canvas
        ref={canvasRef}
        style={{ width: '100%', aspectRatio: '1', opacity: 0, transition: 'opacity .8s ease' }}
        aria-hidden="true"
      />
    </div>
  );
}
