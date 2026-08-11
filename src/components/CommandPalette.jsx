import { useState, useEffect } from 'react';
import { Command } from 'cmdk';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Home, User, Layers, FolderGit2, Briefcase, Mail, Github, Linkedin,
  FileText, Search, Send, Moon, Sun, ArrowUpRight,
} from 'lucide-react';
import { useApp } from '../lib/app-context.jsx';
import { usePalette } from '../lib/palette-context.jsx';

const PAGE_ICONS = {
  home: Home, about: User, stack: Layers, projects: FolderGit2, experience: Briefcase, contact: Mail,
};
const CONTACT_ICONS = {
  github: Github, linkedin: Linkedin, email: Mail, resume: FileText,
};

function go(href, external) {
  if (external || href.startsWith('mailto:') || href.startsWith('http')) {
    window.open(href, external ? '_blank' : '_self', 'noopener');
    return;
  }
  const id = href.replace('#', '');
  const el = id === 'top' ? document.body : document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function CommandPalette() {
  const { content, lang, theme, toggleLang, toggleTheme } = useApp();
  const { open, closePalette } = usePalette();
  const [query, setQuery] = useState('');
  const ui = content.ui;

  useEffect(() => { if (!open) setQuery(''); }, [open]);

  const handleSelect = (href, external) => {
    closePalette();
    // let the overlay unmount before scrolling
    setTimeout(() => go(href, external), 60);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="pal-overlay"
          onClick={closePalette}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <motion.div
            className="pal"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.965, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -8 }}
            transition={{ duration: 0.22, ease: [0.2, 0.75, 0.25, 1] }}
          >
            <Command label={ui.palTap} loop>
              <div className="pal-top">
                <div className="pal-search">
                  <Search size={16} />
                  <Command.Input
                    value={query}
                    onValueChange={setQuery}
                    placeholder={ui.palHint}
                    autoFocus
                  />
                </div>
                <button className="pal-reach" onClick={() => handleSelect('#contact', false)}>
                  <Send size={14} /> {ui.reachOut}
                </button>
                <button className="pal-btn" onClick={toggleLang} title={ui.palLang} aria-label={ui.palLang}>
                  {lang === 'es' ? 'EN' : 'ES'}
                </button>
                <button className="pal-btn" onClick={toggleTheme} title={ui.palTheme} aria-label={ui.palTheme}>
                  {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
                </button>
              </div>

              <Command.List>
                <Command.Empty className="pal-empty">{ui.palEmpty}</Command.Empty>

                <Command.Group heading={ui.palPages} className="grp-pages">
                  {content.nav.map((n) => {
                    const Ico = PAGE_ICONS[n.key] || Home;
                    return (
                      <Command.Item
                        key={n.key}
                        value={n.label}
                        className="pal-page"
                        onSelect={() => handleSelect(n.href, false)}
                      >
                        <span className="ico"><Ico size={15} /></span>
                        {n.label}
                      </Command.Item>
                    );
                  })}
                </Command.Group>

                <Command.Group heading={ui.palConnect} className="grp-chips">
                  {content.contacts.map((c) => {
                    const Ico = CONTACT_ICONS[c.key] || Mail;
                    return (
                      <Command.Item
                        key={c.key}
                        value={`${c.label} ${c.value}`}
                        className="pal-chip"
                        onSelect={() => handleSelect(c.href, c.external)}
                      >
                        <span className="ico"><Ico size={15} /></span>
                        {c.label}
                        {c.external && <ArrowUpRight className="ext" size={12} />}
                      </Command.Item>
                    );
                  })}
                </Command.Group>

              </Command.List>
            </Command>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
