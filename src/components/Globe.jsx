import { useEffect, useRef } from 'react';
import { useApp } from '../lib/app-context.jsx';

// Dotted point-cloud globe on a 2D canvas (no WebGL). Framed and tilted so
// Spain sits centred and close, with a marker on Tarragona.
const SPAIN_LON = 1.2445;  // Tarragona longitude
const SPAIN_LAT = 41.1189; // Tarragona latitude
const TILT = (SPAIN_LAT * Math.PI) / 180; // bring Tarragona's latitude to the visual centre

export default function Globe() {
  const canvasRef = useRef(null);
  const { theme } = useApp();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const pts = [];
    for (let lat = -84; lat <= 84; lat += 5) {
      const rad = Math.cos((lat * Math.PI) / 180);
      const count = Math.max(6, Math.round(58 * rad));
      for (let i = 0; i < count; i++) pts.push([lat, (360 / count) * i]);
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0, R = 0, cx = 0, cy = 0;
    const resize = () => {
      const size = canvas.offsetWidth || 300;
      W = canvas.width = size * dpr;
      H = canvas.height = size * dpr;
      R = W * 0.46; cx = W / 2; cy = H / 2;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const start = performance.now();
    const cosT = Math.cos(TILT), sinT = Math.sin(TILT);
    let raf;
    const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

    const project = (lat, lonEff) => {
      const latR = (lat * Math.PI) / 180;
      const lonR = (lonEff * Math.PI) / 180;
      const x0 = Math.cos(latR) * Math.sin(lonR);
      const y0 = Math.sin(latR);
      const z0 = Math.cos(latR) * Math.cos(lonR);
      // tilt around X so Spain's latitude is centred
      const y = y0 * cosT - z0 * sinT;
      const z = y0 * sinT + z0 * cosT;
      return { x: x0, y, z };
    };

    const draw = (t) => {
      const light = document.documentElement.getAttribute('data-theme') === 'light';
      const drift = reduce ? 0 : Math.sin((t - start) / 4200) * 10; // gentle sway around Spain
      const rot = -SPAIN_LON + drift; // put Spain at the front
      ctx.clearRect(0, 0, W, H);

      const glow = ctx.createRadialGradient(cx, cy, R * 0.15, cx, cy, R * 1.5);
      glow.addColorStop(0, light ? 'rgba(37,99,235,.14)' : 'rgba(37,99,235,.26)');
      glow.addColorStop(1, 'rgba(37,99,235,0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, W, H);

      for (let i = 0; i < pts.length; i++) {
        const p = project(pts[i][0], pts[i][1] + rot);
        if (p.z < 0) continue;
        const px = cx + p.x * R;
        const py = cy - p.y * R;
        const depth = 0.25 + p.z * 0.75;
        ctx.globalAlpha = depth * (light ? 0.55 : 0.8);
        ctx.fillStyle = light ? '#1d4ed8' : '#60a5fa';
        ctx.beginPath();
        ctx.arc(px, py, Math.max(0.7, 2.3 * depth) * dpr, 0, 6.2832);
        ctx.fill();
      }

      // Tarragona marker
      const m = project(SPAIN_LAT, SPAIN_LON + rot);
      if (m.z >= 0) {
        const mx = cx + m.x * R;
        const my = cy - m.y * R;
        const pulse = reduce ? 0.6 : 0.5 + 0.5 * Math.abs(Math.sin((t - start) / 700));
        ctx.globalAlpha = 0.25 * pulse;
        ctx.fillStyle = '#93c5fd';
        ctx.beginPath();
        ctx.arc(mx, my, 9 * dpr * pulse, 0, 6.2832);
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.fillStyle = '#dbeafe';
        ctx.beginPath();
        ctx.arc(mx, my, 3 * dpr, 0, 6.2832);
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
