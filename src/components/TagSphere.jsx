import { useEffect, useRef } from 'react';
import { useApp } from '../lib/app-context.jsx';

// Interactive 3D tag sphere — interests & hobbies as chips floating on a
// rotating sphere (canvas 2D, no WebGL). Auto-spins and reacts to the cursor.
export default function TagSphere({ items }) {
  const canvasRef = useRef(null);
  const { theme } = useApp();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const N = items.length;
    const golden = Math.PI * (3 - Math.sqrt(5));
    const pts = items.map((it, i) => {
      const y = 1 - (i / Math.max(1, N - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const th = golden * i;
      return { x: Math.cos(th) * r, y, z: Math.sin(th) * r, it };
    });

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0, R = 0, cx = 0, cy = 0, focal = 0;
    const resize = () => {
      const size = canvas.offsetWidth || 320;
      W = canvas.width = size * dpr;
      H = canvas.height = size * dpr;
      R = W * 0.34; cx = W / 2; cy = H / 2; focal = W * 1.1;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    let ax = -0.35, ay = 0;
    let vx = 0.0016, vy = 0.004; // idle velocity
    let tx = vx, ty = vy;
    let hovering = false;

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      tx = -py * 0.05;
      ty = px * 0.05;
      hovering = true;
    };
    const onLeave = () => { hovering = false; tx = 0.0016; ty = 0.004; };
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerleave', onLeave);

    const roundRect = (x, y, w, h, rr) => {
      if (ctx.roundRect) { ctx.beginPath(); ctx.roundRect(x, y, w, h, rr); return; }
      ctx.beginPath();
      ctx.moveTo(x + rr, y);
      ctx.arcTo(x + w, y, x + w, y + h, rr);
      ctx.arcTo(x + w, y + h, x, y + h, rr);
      ctx.arcTo(x, y + h, x, y, rr);
      ctx.arcTo(x, y, x + w, y, rr);
      ctx.closePath();
    };

    let raf;
    const draw = () => {
      const light = document.documentElement.getAttribute('data-theme') === 'light';
      // ease velocity toward target
      vx += (tx - vx) * 0.06;
      vy += (ty - vy) * 0.06;
      if (!reduce) { ax += vx; ay += vy; }

      const sinX = Math.sin(ax), cosX = Math.cos(ax);
      const sinY = Math.sin(ay), cosY = Math.cos(ay);
      ctx.clearRect(0, 0, W, H);

      const proj = pts.map((p) => {
        // rotate Y then X
        let x = p.x * cosY - p.z * sinY;
        let z = p.x * sinY + p.z * cosY;
        let y = p.y * cosX - z * sinX;
        z = p.y * sinX + z * cosX;
        const scale = focal / (focal - z * R);
        return { sx: cx + x * R * scale, sy: cy + y * R * scale, z, scale, it: p.it };
      }).sort((a, b) => a.z - b.z);

      const baseFont = W * 0.05;
      for (const q of proj) {
        const depth = (q.z + 1) / 2; // 0 back .. 1 front
        const alpha = 0.35 + depth * 0.65;
        const fs = baseFont * q.scale;
        ctx.font = `600 ${fs}px 'Bricolage Grotesque', -apple-system, sans-serif`;
        const label = q.it.label;
        const tw = ctx.measureText(label).width;
        const padX = fs * 0.62, padY = fs * 0.42;
        const w = tw + padX * 2, h = fs + padY * 2;
        const x = q.sx - w / 2, y = q.sy - h / 2;

        ctx.globalAlpha = alpha;
        const accent = q.it.accent;
        if (accent) {
          const g = ctx.createLinearGradient(x, y, x, y + h);
          g.addColorStop(0, light ? '#3b82f6' : '#60a5fa');
          g.addColorStop(1, light ? '#1d4ed8' : '#2563eb');
          ctx.fillStyle = g;
          roundRect(x, y, w, h, h / 2); ctx.fill();
          ctx.fillStyle = '#ffffff';
        } else {
          ctx.fillStyle = light ? 'rgba(255,255,255,.96)' : 'rgba(14,22,46,.9)';
          roundRect(x, y, w, h, h / 2); ctx.fill();
          ctx.lineWidth = 1 * dpr;
          ctx.strokeStyle = light ? 'rgba(29,58,110,.16)' : 'rgba(96,165,250,.24)';
          ctx.stroke();
          ctx.fillStyle = light ? '#18213a' : '#e8eeff';
        }
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(label, q.sx, q.sy + fs * 0.02);
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    requestAnimationFrame(() => { if (canvas) canvas.style.opacity = '1'; });

    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerleave', onLeave);
    };
  }, [theme, items]);

  return (
    <div className="sphere-wrap">
      <canvas
        ref={canvasRef}
        style={{ width: '100%', aspectRatio: '1', opacity: 0, transition: 'opacity .8s ease', cursor: 'grab', touchAction: 'none' }}
        aria-hidden="true"
      />
    </div>
  );
}
