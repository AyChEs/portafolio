import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { getContent } from './content.js';

const AppContext = createContext(null);

function detectLang() {
  try {
    const saved = localStorage.getItem('ayches-lang');
    if (saved === 'es' || saved === 'en') return saved;
  } catch (e) { /* ignore */ }
  const nav = (navigator.languages && navigator.languages[0]) || navigator.language || 'es';
  return /^(es|ca)\b/i.test(nav) ? 'es' : 'en';
}

function detectTheme() {
  try {
    const saved = localStorage.getItem('ayches-theme');
    if (saved === 'light' || saved === 'dark') return saved;
  } catch (e) { /* ignore */ }
  return 'dark';
}

export function AppProvider({ children }) {
  const [lang, setLang] = useState(detectLang);
  const [theme, setTheme] = useState(detectTheme);

  useEffect(() => {
    document.documentElement.lang = lang;
    try { localStorage.setItem('ayches-lang', lang); } catch (e) { /* ignore */ }
    document.title = lang === 'es'
      ? 'Ayman Charoui — Desarrollador Full-Stack'
      : 'Ayman Charoui — Full-Stack Developer';
  }, [lang]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('ayches-theme', theme); } catch (e) { /* ignore */ }
  }, [theme]);

  const toggleLang = useCallback(() => setLang((l) => (l === 'es' ? 'en' : 'es')), []);
  const toggleTheme = useCallback(() => setTheme((t) => (t === 'light' ? 'dark' : 'light')), []);

  const content = useMemo(() => getContent(lang), [lang]);

  const value = useMemo(
    () => ({ lang, theme, toggleLang, toggleTheme, content }),
    [lang, theme, toggleLang, toggleTheme, content]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
