import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../lib/app-context.jsx';
import { usePalette } from '../lib/palette-context.jsx';

// Track which section is currently in view for the nav indicator.
function useActiveSection(keys) {
  const [active, setActive] = useState(keys[0]);
  useEffect(() => {
    const sections = keys
      .map((k) => ({ k, el: document.getElementById(k === 'home' ? 'top' : k) }))
      .filter((s) => s.el);
    const onScroll = () => {
      const mid = window.innerHeight * 0.34;
      let current = keys[0];
      for (const s of sections) {
        if (s.el.getBoundingClientRect().top <= mid) current = s.k;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [keys.join(',')]); // eslint-disable-line react-hooks/exhaustive-deps
  return active;
}

export default function Nav() {
  const { content } = useApp();
  const { openPalette } = usePalette();
  const keys = content.nav.map((n) => n.key);
  const active = useActiveSection(keys);

  return (
    <>
      <nav className="nav" aria-label={content.ui.sHome}>
        <span className="nav-beam" aria-hidden="true" />
        <a className="brand" href="#top" aria-label="Ayman Charoui — AyChEs">
          <span className="brand-word">Ay<span className="brand-accent">Ch</span>Es</span>
        </a>
        <div className="nav-links">
          {content.nav.map((n) => (
            <a key={n.key} href={n.href} className={active === n.key ? 'active' : ''}>
              {active === n.key && (
                <motion.span
                  layoutId="navind"
                  aria-hidden="true"
                  style={{
                    position: 'absolute', inset: 0, borderRadius: 999,
                    background: 'var(--accSoft)', border: '1px solid var(--bd)', zIndex: 0,
                  }}
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <span style={{ position: 'relative', zIndex: 1 }}>{n.label}</span>
            </a>
          ))}
        </div>
        <button className="nav-cmd" onClick={openPalette} aria-label={content.ui.palTap}>
          <kbd aria-hidden="true">⌘</kbd>
          <span className="cmd-label">{content.ui.palTap}</span>
        </button>
      </nav>

      <button className="cmd-fab" onClick={openPalette} aria-label={content.ui.palTap}>⌘</button>
    </>
  );
}
