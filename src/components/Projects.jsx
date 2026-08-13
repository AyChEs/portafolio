import { ArrowUpRight } from 'lucide-react';
import { useApp } from '../lib/app-context.jsx';
import Reveal from './Reveal.jsx';

// Browser-window frame that hugs the screenshot's own aspect ratio, so
// nothing is cropped or letterboxed.
function BrowserFrame({ p }) {
  return (
    <div className="browser">
      <div className="browser-bar">
        <i /><i /><i />
        <span className="browser-url">{p.url}</span>
      </div>
      <div className="browser-view">
        {p.img ? (
          <img src={p.img} alt={p.title} loading="lazy" />
        ) : (
          <span className="browser-empty">◍ {p.file}</span>
        )}
      </div>
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
            <div className="project-stage">
              {p.inProgress && <span className="wip">{ui.inProgress}</span>}
              <BrowserFrame p={p} />
            </div>
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
                  <a className="link-demo" href={p.demo} target="_blank" rel="noopener noreferrer">
                    {ui.demo} <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                </div>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
