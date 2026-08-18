import { useState, useEffect } from 'react';
import { ReactLenis } from 'lenis/react';
import { motion, useScroll, useReducedMotion } from 'framer-motion';
import Legal from './components/Legal.jsx';
import Ambient from './components/Ambient.jsx';
import Nav from './components/Nav.jsx';
import CommandPalette from './components/CommandPalette.jsx';
import Hero from './components/Hero.jsx';
import Ribbons from './components/Ribbons.jsx';
import About from './components/About.jsx';
import Stack from './components/Stack.jsx';
import Projects from './components/Projects.jsx';
import Journey from './components/Journey.jsx';
import Languages from './components/Languages.jsx';
import Contact from './components/Contact.jsx';

function Connector({ delay = 0 }) {
  return (
    <div className="connector" aria-hidden="true">
      <span><i style={{ animationDelay: `${delay}s` }} /></span>
    </div>
  );
}

// Minimal hash routing: #/legal renders the legal page, anything else the portfolio.
function useHashRoute() {
  const [route, setRoute] = useState(() => (window.location.hash.startsWith('#/legal') ? 'legal' : 'home'));
  useEffect(() => {
    const onHash = () => setRoute(window.location.hash.startsWith('#/legal') ? 'legal' : 'home');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  return route;
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const reduce = useReducedMotion();
  const route = useHashRoute();

  if (route === 'legal') return <Legal />;

  const content = (
    <>
      <motion.div className="progress" style={{ scaleX: scrollYProgress }} />
      <Ambient />
      <Nav />
      <CommandPalette />

      <main>
        <Hero />
        <Ribbons />
        <About />
        <Connector />
        <Stack />
        <Connector delay={0.6} />
        <Projects />
        <Connector delay={1.2} />
        <Journey />
        <Connector delay={1.8} />
        <Languages />
      </main>

      <Contact />
    </>
  );

  // Lenis smooth scroll (disabled when the user prefers reduced motion).
  if (reduce) return content;
  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true }}>
      {content}
    </ReactLenis>
  );
}
