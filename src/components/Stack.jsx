import { useState } from 'react';
import { useApp } from '../lib/app-context.jsx';
import Reveal from './Reveal.jsx';

function TechIcon({ item }) {
  const [failed, setFailed] = useState(!item.icon);
  const mono = item.m || item.n.slice(0, 2);
  return (
    <div className="tech" title={item.n}>
      <span className="tech-box">
        {!failed ? (
          <img src={item.icon} alt="" width="30" height="30" loading="lazy" onError={() => setFailed(true)} />
        ) : (
          <span className="tech-mono">{mono}</span>
        )}
      </span>
      <span className="tech-name">{item.n}</span>
    </div>
  );
}

export default function Stack() {
  const { content } = useApp();
  return (
    <section id="stack" className="section">
      <Reveal className="sec-head">
        <span className="num">02</span>
        <h2>{content.ui.sStack}</h2>
        <span className="line" aria-hidden="true" />
      </Reveal>
      <div className="stack-grid">
        {content.techGroups.map((g, i) => (
          <Reveal variant="scale" delay={i * 0.05} className="card stack-card" key={g.num}>
            <span className="wm" aria-hidden="true">{g.num}</span>
            <div className="cat">{g.cat}</div>
            <div className="tech-row">
              {g.items.map((it) => <TechIcon item={it} key={it.n} />)}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
