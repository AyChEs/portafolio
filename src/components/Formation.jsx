import { useApp } from '../lib/app-context.jsx';
import Reveal from './Reveal.jsx';

export default function Formation() {
  const { content } = useApp();
  const ui = content.ui;
  return (
    <section className="section">
      <div className="triple">
        {/* Education */}
        <Reveal>
          <div className="mini-head"><span className="num">05</span><h2>{ui.sEdu}</h2></div>
          <div className="stacked">
            {content.education.map((ed, i) => (
              <article className="edu-card" key={i}>
                <span className="edu-mono" aria-hidden="true">{ed.mono}</span>
                <div style={{ minWidth: 0 }}>
                  <div className="period">{ed.period}</div>
                  <div className="title">{ed.title}</div>
                  <div className="org">{ed.org}</div>
                  {ed.honors && <span className="honors">★ {ed.honors}</span>}
                </div>
              </article>
            ))}
          </div>
        </Reveal>

        {/* Languages */}
        <Reveal delay={0.05}>
          <div className="mini-head"><span className="num">06</span><h2>{ui.sLang}</h2></div>
          <div className="stacked">
            {content.languages.map((l, i) => {
              const native = l.tier >= 5;
              return (
                <article className="lang-card" key={i}>
                  <span className={`lang-code${native ? ' native' : ''}`} aria-hidden="true">{l.code}</span>
                  <div className="lang-info">
                    <h3>{l.name}</h3>
                    <p>{l.sub}</p>
                  </div>
                  <span className={`lang-pill${native ? ' native' : ''}`}>{l.level}</span>
                </article>
              );
            })}
          </div>
        </Reveal>

        {/* Certifications */}
        <Reveal delay={0.1}>
          <div className="mini-head"><span className="num">07</span><h2>{ui.sCert}</h2></div>
          {content.certs.map((c, i) => (
            <article className="cert-card" key={i}>
              <span className="glow" aria-hidden="true" />
              <div className="cert-top">
                <span className="cert-seal" aria-hidden="true">✓</span>
                <span className="cert-verified">{ui.verified}</span>
              </div>
              <h3>{c.title}</h3>
              <div className="cert-org">{c.org} · {c.date}</div>
              <div className="cert-id">{c.id}</div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
