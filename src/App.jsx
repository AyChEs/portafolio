import { motion, useScroll } from 'framer-motion';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Ambient from './components/Ambient.jsx';
import Nav from './components/Nav.jsx';
import CommandPalette from './components/CommandPalette.jsx';
import Hero from './components/Hero.jsx';
import Ribbons from './components/Ribbons.jsx';
import About from './components/About.jsx';
import Stack from './components/Stack.jsx';
import Projects from './components/Projects.jsx';
import Experience from './components/Experience.jsx';
import Formation from './components/Formation.jsx';
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

  return (
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
        <Experience />
        <Connector delay={1.8} />
        <Formation />
      </main>

      <Contact />
      <SpeedInsights />
    </>
  );
}
