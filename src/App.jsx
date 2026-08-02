import { ReactLenis } from 'lenis/react';
import { motion, useScroll, useReducedMotion } from 'framer-motion';
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

export default function App() {
  const { scrollYProgress } = useScroll();
  const reduce = useReducedMotion();

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
