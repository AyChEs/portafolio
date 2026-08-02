import { useApp } from '../lib/app-context.jsx';
import Reveal from './Reveal.jsx';

export default function Experience() {
  const { content } = useApp();
  const ui = content.ui;
  return (
    <section id="experience" className="section">
      <Reveal className="sec-head">
        <span className="num">04</span>
        <h2>{ui.sExp}</h2>
        <span className="line" aria-hidden="true" />
      </Reveal>
      <div className="timeline">
        <span className="spine" aria-hidden="true" />
        {content.experience.map((e, i) => (
          <Reveal variant="left" delay={i * 0.05} className="tl-entry" key={i}>
            <span className={`tl-badge${e.current ? ' current' : ''}`} aria-hidden="true" />
            <div className="tl-card">
              <div className="tl-top">
                <span className="tl-period">{e.period}</span>
                {e.current && (
                  <span className="tl-now"><span className="d" aria-hidden="true" />{ui.now}</span>
                )}
              </div>
              <h3>{e.role}</h3>
              <div className="tl-org">{e.org} · {e.type} · {e.place}</div>
              <ul>
                {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
