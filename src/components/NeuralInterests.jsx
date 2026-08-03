import { useEffect, useRef } from 'react';
import { Server, Cpu, Code2, BrainCircuit, Webhook, Plane, BookOpen, Dumbbell, Clapperboard } from 'lucide-react';
import { useApp } from '../lib/app-context.jsx';

// Interests as a living node-graph — icon nodes connected like a neural
// network / vector database, with signals travelling along the edges.
export default function NeuralInterests() {
  const { content } = useApp();
  const es = content.es;
  const wrapRef = useRef(null);
  const svgRef = useRef(null);
  const nodeRefs = useRef([]);
  const edgeRefs = useRef([]);

  const polar = (r, deg) => {
    const a = (deg * Math.PI) / 180;
    return { x: 50 + r * Math.cos(a), y: 50 - r * Math.sin(a) };
  };

  const nodes = [
    { key: 'backend', Icon: Server, label: 'Backend', accent: true, size: 58, ...polar(0, 0), amp: 0.6 },
    { key: 'embedded', Icon: Cpu, label: es ? 'Embebida' : 'Embedded', accent: true, size: 48, ...polar(23, 135), amp: 1.4 },
    { key: 'software', Icon: Code2, label: es ? 'Software' : 'Software', accent: true, size: 48, ...polar(23, 45), amp: 1.4 },
    { key: 'ai', Icon: BrainCircuit, label: es ? 'IA' : 'AI', accent: true, size: 48, ...polar(23, 315), amp: 1.4 },
    { key: 'apis', Icon: Webhook, label: 'APIs', accent: true, size: 48, ...polar(23, 225), amp: 1.4 },
    { key: 'travel', Icon: Plane, label: es ? 'Viajar' : 'Travel', accent: false, size: 44, ...polar(39, 90), amp: 2.0 },
    { key: 'reading', Icon: BookOpen, label: es ? 'Leer' : 'Reading', accent: false, size: 44, ...polar(39, 0), amp: 2.0 },
    { key: 'gym', Icon: Dumbbell, label: es ? 'Gimnasio' : 'Gym', accent: false, size: 44, ...polar(39, 270), amp: 2.0 },
    { key: 'cinema', Icon: Clapperboard, label: es ? 'Cine' : 'Cinema', accent: false, size: 44, ...polar(39, 180), amp: 2.0 },
  ];

  const edges = [
    [0, 1], [0, 2], [0, 3], [0, 4],
    [1, 2], [2, 3], [3, 4], [4, 1],
    [5, 2], [5, 1], [6, 2], [6, 3], [7, 3], [7, 4], [8, 1], [8, 4],
  ];

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    let W = wrap.offsetWidth || 360;
    let H = wrap.offsetHeight || 360;
    const ro = new ResizeObserver(() => { W = wrap.offsetWidth || W; H = wrap.offsetHeight || H; });
    ro.observe(wrap);

    const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    const seed = nodes.map((_, i) => ({ sp: 0.0004 + (i % 5) * 0.00007, ph: i * 1.7 }));
    const pos = nodes.map((n) => ({ x: n.x, y: n.y }));
    const start = performance.now();
    let raf;

    const frame = (t) => {
      const dt = t - start;
      for (let i = 0; i < nodes.length; i++) {
        const s = seed[i];
        const ox = reduce ? 0 : nodes[i].amp * Math.sin(dt * s.sp + s.ph);
        const oy = reduce ? 0 : nodes[i].amp * Math.cos(dt * s.sp * 1.15 + s.ph);
        pos[i].x = nodes[i].x + ox;
        pos[i].y = nodes[i].y + oy;
        const el = nodeRefs.current[i];
        if (el) el.style.transform = `translate(${(pos[i].x / 100) * W}px, ${(pos[i].y / 100) * H}px) translate(-50%, -50%)`;
      }
      for (let e = 0; e < edges.length; e++) {
        const [a, b] = edges[e];
        const r = edgeRefs.current[e];
        if (!r) continue;
        r.line.setAttribute('x1', pos[a].x); r.line.setAttribute('y1', pos[a].y);
        r.line.setAttribute('x2', pos[b].x); r.line.setAttribute('y2', pos[b].y);
        const frac = reduce ? 0.5 : ((dt * 0.00013 + e * 0.16) % 1);
        r.pulse.setAttribute('cx', pos[a].x + (pos[b].x - pos[a].x) * frac);
        r.pulse.setAttribute('cy', pos[a].y + (pos[b].y - pos[a].y) * frac);
      }
      if (!reduce) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    if (reduce) frame(start);
    requestAnimationFrame(() => { if (wrap) wrap.style.opacity = '1'; });

    return () => { if (raf) cancelAnimationFrame(raf); ro.disconnect(); };
  }, [es]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="neural" ref={wrapRef} style={{ opacity: 0, transition: 'opacity .8s ease' }}>
      <svg className="neural-net" ref={svgRef} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {edges.map((_, e) => (
          <g key={e}>
            <line
              ref={(el) => { edgeRefs.current[e] = { ...(edgeRefs.current[e] || {}), line: el }; }}
              className="neural-edge" x1="50" y1="50" x2="50" y2="50"
            />
            <circle
              ref={(el) => { edgeRefs.current[e] = { ...(edgeRefs.current[e] || {}), pulse: el }; }}
              className="neural-pulse" cx="50" cy="50" r="0.7"
            />
          </g>
        ))}
      </svg>
      {nodes.map((n, i) => (
        <div
          key={n.key}
          ref={(el) => { nodeRefs.current[i] = el; }}
          className="neural-node"
          style={{ width: n.size, height: n.size }}
          title={n.label}
        >
          <span className={`nn-inner${n.accent ? ' accent' : ''}`}>
            <n.Icon size={Math.round(n.size * 0.42)} aria-hidden="true" />
          </span>
        </div>
      ))}
    </div>
  );
}
