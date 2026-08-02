import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useApp } from '../lib/app-context.jsx';

export default function Hero() {
  const { content } = useApp();
  const ui = content.ui;
  const reduce = useReducedMotion();
  const letters = content.firstName.split('');

  const up = (delay) => reduce
    ? {}
    : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay, ease: 'easeOut' } };

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06, delayChildren: 0.26 } },
  };
  const letter = {
    hidden: { opacity: 0, y: 38, rotateX: -55, filter: 'blur(9px)' },
    show: { opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.2, 0.75, 0.25, 1] } },
  };

  return (
    <header id="top" className="hero">
      <motion.span className="pill" {...up(0.05)}>
        <span className="dot" aria-hidden="true" />
        {ui.available}
      </motion.span>

      <motion.p className="hero-hi" {...up(0.12)}>
        <span className="hand" aria-hidden="true">👋</span>
        {ui.hi}
      </motion.p>

      <span className="hero-rule" aria-hidden="true" />

      <h1 className="hero-name">
        <span className="visually-hidden">{content.firstName}</span>
        {reduce ? (
          <span aria-hidden="true">{content.firstName}<span className="dotacc">.</span></span>
        ) : (
          <motion.span
            aria-hidden="true"
            style={{ display: 'inline-block', perspective: 700 }}
            variants={container}
            initial="hidden"
            animate="show"
          >
            {letters.map((ch, i) => (
              <motion.span key={i} variants={letter} style={{ display: 'inline-block' }}>
                {ch}
              </motion.span>
            ))}
            <motion.span variants={letter} className="dotacc" style={{ display: 'inline-block' }}>.</motion.span>
          </motion.span>
        )}
      </h1>

      <motion.p className="hero-sub" {...up(0.8)}>{ui.tagline}</motion.p>

      <motion.div className="hero-ctas" {...up(0.9)}>
        <a className="btn btn-primary" href="#projects">
          {ui.seeWork} <span className="m" aria-hidden="true">→</span>
        </a>
        <a className="btn btn-ghost" href="#contact">
          {ui.getInTouch} <ArrowRight size={16} aria-hidden="true" />
        </a>
      </motion.div>
    </header>
  );
}
