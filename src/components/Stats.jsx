import { useEffect, useRef, useState } from 'react';
import { useInView, animate } from 'framer-motion';
import { useApp } from '../lib/app-context.jsx';

function CountUp({ to, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const [val, setVal] = useState(0);
  const done = useRef(false);

  useEffect(() => {
    if (!inView || done.current) return;
    done.current = true;
    const controls = animate(0, to, {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return <span ref={ref} className="n">{val}{val === to ? suffix : ''}</span>;
}

export default function Stats() {
  const { content } = useApp();
  return (
    <div className="stats">
      {content.stats.map((s, i) => (
        <div className="stat" key={i}>
          <span className="halo" aria-hidden="true" />
          <CountUp to={s.n} suffix={s.suffix} />
          <div className="l">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
