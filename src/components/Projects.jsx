import { useApp } from '../lib/app-context.jsx';
import Reveal from './Reveal.jsx';

function Media({ p }) {
  return (
    <div className="project-media">
      {p.img ? (
        <img src={p.img} alt={p.title} loading="lazy" />
      ) : (
        <span aria-hidden="true" style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--mut2)',
          background: 'radial-gradient(circle at 50% 40%, rgba(37,99,235,.16), transparent 70%)',
        }}>◍</span>
      )}
      <span className="veil" aria-hidden="true" />
      <span className="fname">◍ {p.file}</span>
      {p.inProgress && <span className="wip">WIP</span>}
    </div>
  );
}

export default function Projects() {
  const { content } = useApp();
  const ui = content.ui;
  return (
    <section id="projects" className="section">
      <Reveal className="sec-head">
        <span className="num">03</span>
        <h2>{ui.sProjects}</h2>
        <span className="line" aria-hidden="true" />
      </Reveal>
      <div className="projects-grid">
        {content.projects.map((p, i) => (
          <Reveal variant="scale" delay={i * 0.06} className="card project-card" key={p.num}>
            <Media p={p} />
            <div className="project-body">
              <div className="project-meta">
                <span className="no">{p.num}</span>
                <span className="dash" aria-hidden="true" />
                <span>{p.kind}</span>
                <span className="dash" aria-hidden="true" />
                <span>{p.when}</span>
              </div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <div className="project-tags">
                {p.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
              </div>
              {p.hasLinks && (
                <div className="project-links">
                  <a className="link-code" href={p.code} target="_blank" rel="noopener noreferrer">↗ {ui.code}</a>
                  <a className="link-demo" href={p.demo} target="_blank" rel="noopener noreferrer">↗ {ui.demo}</a>
                </div>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
