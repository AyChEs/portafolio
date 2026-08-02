import { Github, Linkedin, Mail, FileText, ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';
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
        <div className="w w-outline">{content.handle}</div>
        <motion.div
          className="w-fill"
          initial={{ width: '0%' }}
          whileInView={{ width: '100%' }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.4, ease: [0.2, 0.75, 0.25, 1] }}
        >
          <span className="w">{content.handle}</span>
        </motion.div>
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
