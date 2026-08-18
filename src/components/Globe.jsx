import { useEffect, useRef, useMemo } from 'react';
import { useApp } from '../lib/app-context.jsx';
import { LAND_B64 } from '../lib/worldmask.js';

// Dotted world-map globe on a 2D canvas (no WebGL). Dots are drawn only over
// land (real continents), tilted/rotated so Spain sits centred, with a pin
// marker on Tarragona.
const TARRAGONA = { lat: 41.1189, lon: 1.2445 };
const TILT = (TARRAGONA.lat * Math.PI) / 180;

function decodeLand(b64) {
  const bin = atob(b64);
  const pts = new Array(bin.length / 2);
  for (let i = 0; i < pts.length; i++) {
    let la = bin.charCodeAt(i * 2);
    let lo = bin.charCodeAt(i * 2 + 1);
    if (la > 127) la -= 256;
    if (lo > 127) lo -= 256;
    pts[i] = [la * 2, lo * 2];
  }
  return pts;
}

export default function Globe() {
  const canvasRef = useRef(null);
  const { theme } = useApp();
  const land = useMemo(() => decodeLand(LAND_B64), []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

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
      const y = y0 * cosT - z0 * sinT;
      const z = y0 * sinT + z0 * cosT;
      return { x: x0, y, z };
    };

    const draw = (t) => {
      const light = document.documentElement.getAttribute('data-theme') === 'light';
      const drift = reduce ? 0 : Math.sin((t - start) / 5200) * 14;
      const rot = -TARRAGONA.lon + drift;
      ctx.clearRect(0, 0, W, H);

      // atmosphere glow
      const glow = ctx.createRadialGradient(cx, cy, R * 0.62, cx, cy, R * 1.15);
      glow.addColorStop(0, 'rgba(37,99,235,0)');
      glow.addColorStop(0.7, light ? 'rgba(37,99,235,.10)' : 'rgba(37,99,235,.20)');
      glow.addColorStop(1, 'rgba(37,99,235,0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.15, 0, 6.2832);
      ctx.fill();

      // ocean sphere
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, 6.2832);
      ctx.fillStyle = light ? 'rgba(219,234,254,.5)' : 'rgba(12,20,44,.55)';
      ctx.fill();

      // land dots
      for (let i = 0; i < land.length; i++) {
        const p = project(land[i][0], land[i][1] + rot);
        if (p.z < 0) continue;
        const px = cx + p.x * R;
        const py = cy - p.y * R;
        const depth = 0.3 + p.z * 0.7;
        ctx.globalAlpha = depth * (light ? 0.62 : 0.9);
        ctx.fillStyle = light ? '#2563eb' : '#7cb2ff';
        ctx.beginPath();
        ctx.arc(px, py, Math.max(0.6, 1.7 * depth) * dpr, 0, 6.2832);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Tarragona pin
      const m = project(TARRAGONA.lat, TARRAGONA.lon + rot);
      if (m.z >= 0) {
        const mx = cx + m.x * R;
        const my = cy - m.y * R;
        const s = dpr;
        const headR = 6.5 * s;
        const headCY = my - 15 * s;
        const pulse = reduce ? 0.7 : 0.5 + 0.5 * Math.abs(Math.sin((t - start) / 640));

        // soft base halo
        ctx.globalAlpha = 0.22 * pulse;
        ctx.fillStyle = '#93c5fd';
        ctx.beginPath();
        ctx.ellipse(mx, my, 6 * s, 2.4 * s, 0, 0, 6.2832);
        ctx.fill();
        ctx.globalAlpha = 1;

        // teardrop body
        ctx.beginPath();
        ctx.moveTo(mx, my);
        ctx.quadraticCurveTo(mx - headR, headCY + headR * 0.7, mx - headR, headCY);
        ctx.arc(mx, headCY, headR, Math.PI, 0, false);
        ctx.quadraticCurveTo(mx + headR, headCY + headR * 0.7, mx, my);
        ctx.closePath();
        const g = ctx.createLinearGradient(mx, headCY - headR, mx, my);
        g.addColorStop(0, '#93c5fd');
        g.addColorStop(1, '#2563eb');
        ctx.fillStyle = g;
        ctx.shadowColor = 'rgba(37,99,235,.7)';
        ctx.shadowBlur = 10 * s;
        ctx.fill();
        ctx.shadowBlur = 0;

        // inner dot
        ctx.beginPath();
        ctx.arc(mx, headCY, headR * 0.42, 0, 6.2832);
        ctx.fillStyle = light ? '#ffffff' : '#eaf2ff';
        ctx.fill();
      }

      if (!reduce) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    requestAnimationFrame(() => { if (canvas) canvas.style.opacity = '1'; });

    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [theme, land]);

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
