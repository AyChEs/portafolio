import { useEffect, useRef } from 'react';
import { Server, Cpu, Code2, BrainCircuit, Webhook, Plane, BookOpen, Dumbbell, Clapperboard } from 'lucide-react';
import { useApp } from '../lib/app-context.jsx';

// Interests as a rotating 3D node-graph — icon nodes on a sphere connected
// like a neural network, with depth (perspective scale + fade) and signals
// travelling along the edges. Reacts to the pointer.
export default function NeuralInterests() {
  const { content } = useApp();
  const es = content.es;
  const wrapRef = useRef(null);
  const nodeRefs = useRef([]);
  const edgeRefs = useRef([]);

  const meta = [
    { Icon: Server, label: 'Backend', accent: true, size: 56 },
    { Icon: Cpu, label: es ? 'Embebida' : 'Embedded', accent: true, size: 48 },
    { Icon: Code2, label: es ? 'Software' : 'Software', accent: true, size: 48 },
    { Icon: BrainCircuit, label: es ? 'IA' : 'AI', accent: true, size: 48 },
    { Icon: Webhook, label: 'APIs', accent: true, size: 46 },
    { Icon: Plane, label: es ? 'Viajar' : 'Travel', accent: false, size: 46 },
    { Icon: BookOpen, label: es ? 'Leer' : 'Reading', accent: false, size: 46 },
    { Icon: Dumbbell, label: es ? 'Gimnasio' : 'Gym', accent: false, size: 46 },
    { Icon: Clapperboard, label: es ? 'Cine' : 'Cinema', accent: false, size: 46 },
  ];
  const N = meta.length;

  // Fibonacci sphere positions
  const base = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < N; i++) {
    const y = 1 - (i / (N - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const th = golden * i;
    base.push({ x: Math.cos(th) * r, y, z: Math.sin(th) * r });
  }
  // edges: each node to its 2 nearest neighbours (deduped)
  const edgeSet = new Set();
  const edges = [];
  for (let i = 0; i < N; i++) {
    const d = base.map((p, j) => ({ j, d: (p.x - base[i].x) ** 2 + (p.y - base[i].y) ** 2 + (p.z - base[i].z) ** 2 }))
      .filter((o) => o.j !== i).sort((a, b) => a.d - b.d);
    for (let k = 0; k < 3; k++) {
      const j = d[k].j; const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (!edgeSet.has(key)) { edgeSet.add(key); edges.push([i, j]); }
    }
  }

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    let W = wrap.offsetWidth || 360, H = wrap.offsetHeight || 360;
    const ro = new ResizeObserver(() => { W = wrap.offsetWidth || W; H = wrap.offsetHeight || H; });
    ro.observe(wrap);

    const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    let ay = 0.4, ax = -0.5;
    let vy = 0.0032, vx = 0;
    let tvy = 0.0032, tvx = 0;

    const onMove = (e) => {
      const rect = wrap.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      tvy = px * 0.06; tvx = -py * 0.05;
    };
    const onLeave = () => { tvy = 0.0032; tvx = 0; };
    wrap.addEventListener('pointermove', onMove);
    wrap.addEventListener('pointerleave', onLeave);

    const start = performance.now();
    const proj = new Array(N);
    let raf;

    const frame = (t) => {
      const dt = t - start;
      vy += (tvy - vy) * 0.05; vx += (tvx - vx) * 0.05;
      if (!reduce) { ay += vy; ax += vx; }
      const R = Math.min(W, H) * 0.33, cx = W / 2, cy = H / 2, focal = 2.6;
      const cosY = Math.cos(ay), sinY = Math.sin(ay), cosX = Math.cos(ax), sinX = Math.sin(ax);

      for (let i = 0; i < N; i++) {
        const p = base[i];
        let x = p.x * cosY + p.z * sinY;
        let z = -p.x * sinY + p.z * cosY;
        let y = p.y * cosX - z * sinX;
        z = p.y * sinX + z * cosX;
        const scale = focal / (focal - z); // z in [-1,1]
        const sx = cx + x * R * scale;
        const sy = cy + y * R * scale;
        const depth = (z + 1) / 2; // 0 back .. 1 front
        proj[i] = { sx, sy, z, scale, depth };
        const el = nodeRefs.current[i];
        if (el) {
          el.style.transform = `translate(${sx}px, ${sy}px) translate(-50%,-50%) scale(${0.66 + scale * 0.34})`;
          el.style.opacity = (0.5 + depth * 0.5).toFixed(3);
          el.style.zIndex = String(Math.round(depth * 100));
        }
      }
      for (let e = 0; e < edges.length; e++) {
        const [a, b] = edges[e];
        const r = edgeRefs.current[e];
        if (!r || !proj[a] || !proj[b]) continue;
        const ax2 = (proj[a].sx / W) * 100, ay2 = (proj[a].sy / H) * 100;
        const bx2 = (proj[b].sx / W) * 100, by2 = (proj[b].sy / H) * 100;
        r.line.setAttribute('x1', ax2); r.line.setAttribute('y1', ay2);
        r.line.setAttribute('x2', bx2); r.line.setAttribute('y2', by2);
        const dep = (proj[a].depth + proj[b].depth) / 2;
        r.line.setAttribute('stroke-opacity', (0.08 + dep * 0.32).toFixed(3));
        const frac = reduce ? 0.5 : ((dt * 0.00012 + e * 0.17) % 1);
        r.pulse.setAttribute('cx', ax2 + (bx2 - ax2) * frac);
        r.pulse.setAttribute('cy', ay2 + (by2 - ay2) * frac);
        r.pulse.setAttribute('opacity', (0.2 + dep * 0.8).toFixed(3));
      }
      if (!reduce) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    if (reduce) frame(start);
    requestAnimationFrame(() => { if (wrap) wrap.style.opacity = '1'; });

    return () => { if (raf) cancelAnimationFrame(raf); ro.disconnect(); wrap.removeEventListener('pointermove', onMove); wrap.removeEventListener('pointerleave', onLeave); };
  }, [es]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="neural" ref={wrapRef} style={{ opacity: 0, transition: 'opacity .8s ease' }}>
      <span className="neural-glow" aria-hidden="true" />
      <svg className="neural-net" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {edges.map((_, e) => (
          <g key={e}>
            <line ref={(el) => { edgeRefs.current[e] = { ...(edgeRefs.current[e] || {}), line: el }; }} className="neural-edge" x1="50" y1="50" x2="50" y2="50" />
            <circle ref={(el) => { edgeRefs.current[e] = { ...(edgeRefs.current[e] || {}), pulse: el }; }} className="neural-pulse" cx="50" cy="50" r="0.7" />
          </g>
        ))}
      </svg>
      {meta.map((n, i) => (
        <div key={i} ref={(el) => { nodeRefs.current[i] = el; }} className="neural-node" style={{ width: n.size, height: n.size }} title={n.label}>
          <span className={`nn-inner${n.accent ? ' accent' : ''}`}>
            <n.Icon size={Math.round(n.size * 0.42)} aria-hidden="true" />
          </span>
        </div>
      ))}
    </div>
  );
}
