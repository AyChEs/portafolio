import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useApp } from '../lib/app-context.jsx';

// Standalone legal notice / privacy page (rendered at #/legal).
export default function Legal() {
  const { content, lang, theme, toggleLang, toggleTheme } = useApp();
  const l = content.legal;

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${l.title} — ${content.name}`;
  }, [l.title, content.name]);

  return (
    <div className="legal-page">
      <header className="legal-bar">
        <a className="legal-back" href="#top">
          <ArrowLeft size={16} aria-hidden="true" />
          {l.back}
        </a>
        <div className="legal-bar-actions">
          <button className="pal-btn" onClick={toggleLang} title={content.ui.palLang} aria-label={content.ui.palLang}>
            {lang === 'es' ? 'EN' : 'ES'}
          </button>
          <button className="pal-btn" onClick={toggleTheme} title={content.ui.palTheme} aria-label={content.ui.palTheme}>
            {theme === 'light' ? '☾' : '☀'}
          </button>
        </div>
      </header>

      <main className="legal-main">
        <p className="eyebrow">{content.handle}</p>
        <h1>{l.title}</h1>
        <p className="legal-intro">{l.intro}</p>
        <p className="legal-updated">{l.updated}</p>

        <nav className="legal-toc" aria-label={l.title}>
          {l.sections.map((s) => (
            <a key={s.id} href={`#/legal#${s.id}`} onClick={(e) => {
              e.preventDefault();
              document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}>{s.h}</a>
          ))}
        </nav>

        {l.sections.map((s) => (
          <section className="legal-section" id={s.id} key={s.id}>
            <h2>{s.h}</h2>
            {s.body.map((p, i) => <p key={i}>{p}</p>)}
          </section>
        ))}

        <footer className="legal-foot">
          <span>© {new Date().getFullYear()} {content.name}</span>
          <a href="#top">{l.back}</a>
        </footer>
      </main>
    </div>
  );
}
