import { useApp } from '../lib/app-context.jsx';
import Reveal from './Reveal.jsx';

export default function Languages() {
  const { content } = useApp();
  const ui = content.ui;
  return (
    <section id="languages" className="section">
      <Reveal className="sec-head">
        <span className="num">05</span>
        <h2>{ui.sLang}</h2>
        <span className="line" aria-hidden="true" />
      </Reveal>
      <div className="lang-grid">
        {content.languages.map((l, i) => {
          const native = l.tier >= 5;
          return (
            <Reveal variant="scale" delay={i * 0.05} className="lang-card" key={i}>
              <span className={`lang-code${native ? ' native' : ''}`} aria-hidden="true">{l.code}</span>
              <div className="lang-info">
                <h3>{l.name}</h3>
                <p>{l.sub}</p>
                <span className="lang-bar" aria-hidden="true">
                  <span className="lang-bar-fill" style={{ width: `${(l.tier / 5) * 100}%` }} />
                </span>
              </div>
              <span className={`lang-pill${native ? ' native' : ''}`}>{l.level}</span>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
