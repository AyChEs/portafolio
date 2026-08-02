import { Github, Linkedin, Mail, FileText, ArrowUp } from 'lucide-react';
import { useApp } from '../lib/app-context.jsx';
import Reveal from './Reveal.jsx';

const ICONS = { github: Github, linkedin: Linkedin, email: Mail, resume: FileText };

export default function Contact() {
  const { content } = useApp();
  const ui = content.ui;
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="footer">
      <span className="beam" aria-hidden="true" />
      <div className="footer-cols">
        <Reveal className="footer-copy">
          <div className="pill" style={{ marginBottom: 22 }}>
            <span className="dot" aria-hidden="true" />
            {ui.available}
          </div>
          <h2>{ui.getInTouch}</h2>
          <p>{ui.contactNote}</p>
        </Reveal>
        <Reveal delay={0.05} className="contact-grid">
          {content.contacts.map((c) => {
            const Ico = ICONS[c.key] || Mail;
            return (
              <a
                key={c.key}
                className="contact-card"
                href={c.href}
                {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <span className="ico" aria-hidden="true"><Ico size={17} /></span>
                <span className="lb">{c.label}</span>
                <span className="vl">{c.value}</span>
              </a>
            );
          })}
        </Reveal>
      </div>

      <div className="wordmark" aria-hidden="true">
        <div className="w">{content.firstName}</div>
      </div>

      <div className="footer-bar">
        <span>© {year} {content.name}</span>
        <a href="#top">
          <ArrowUp size={13} aria-hidden="true" /> {ui.backTop}
        </a>
        <span>{ui.builtWith}</span>
      </div>
    </footer>
  );
}
