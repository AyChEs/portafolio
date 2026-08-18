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
          <img src={item.icon} alt="" width="28" height="28" loading="lazy" onError={() => setFailed(true)} />
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

      <div className="stack-rows">
        {content.techGroups.map((g, i) => (
          <Reveal variant="up" delay={i * 0.06} className="stack-row" key={g.num}>
            <div className="stack-row-label">
              <span className="stack-row-num">{g.num}</span>
              <span className="stack-row-cat">{g.cat}</span>
              <span className="stack-row-line" aria-hidden="true" />
            </div>
            <div className="stack-row-techs">
              {g.items.map((it) => <TechIcon item={it} key={it.n} />)}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
