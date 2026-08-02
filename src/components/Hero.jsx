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

  const container = { hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.26 } } };
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

      <motion.p className="hero-hi" {...up(0.12)}>{ui.hi}</motion.p>

      <span className="hero-rule" aria-hidden="true" />

      <div className="hero-name-wrap">
        {/* High-quality fiber beam behind the name */}
        <div className="hero-beam" aria-hidden="true">
          <svg viewBox="0 0 1200 320" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="fiber" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#1d4ed8" stopOpacity="0" />
                <stop offset="30%" stopColor="#2563eb" stopOpacity=".9" />
                <stop offset="55%" stopColor="#93c5fd" />
                <stop offset="78%" stopColor="#3b82f6" stopOpacity=".8" />
                <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="fiberSpark" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#dbeafe" stopOpacity="0" />
                <stop offset="50%" stopColor="#eff6ff" />
                <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
              </linearGradient>
            </defs>
            <g fill="none" stroke="url(#fiber)" strokeLinecap="round">
              <path d="M-40 190 C 260 150 520 120 640 158 S 980 210 1240 150" strokeWidth="1" strokeOpacity=".35" />
              <path d="M-40 168 C 240 128 520 100 660 140 S 980 190 1240 128" strokeWidth="1.5" strokeOpacity=".5" />
              <path d="M-40 152 C 240 116 520 86 660 128 S 1000 176 1240 112" strokeWidth="2.4" strokeOpacity=".7" />
              <path d="M-40 138 C 240 104 520 74 660 118 S 1000 162 1240 98" strokeWidth="1.4" strokeOpacity=".5" />
              <path d="M-40 122 C 240 92 520 62 660 106 S 1000 148 1240 84" strokeWidth="1" strokeOpacity=".32" />
              <path d="M-40 208 C 260 168 520 138 640 176 S 980 226 1240 168" strokeWidth="1" strokeOpacity=".28" />
              <path d="M-40 226 C 260 186 520 156 640 192 S 980 240 1240 186" strokeWidth="1" strokeOpacity=".2" />
            </g>
            <g fill="none" stroke="url(#fiberSpark)" strokeLinecap="round" strokeWidth="2.4" strokeDasharray="150 1900">
              <path d="M-40 168 C 240 128 520 100 660 140 S 980 190 1240 128" style={{ animation: 'beamRun 6s linear infinite' }} />
              <path d="M-40 152 C 240 116 520 86 660 128 S 1000 176 1240 112" style={{ animation: 'beamRun 7.5s 1.2s linear infinite' }} />
              <path d="M-40 190 C 260 150 520 120 640 158 S 980 210 1240 150" style={{ animation: 'beamRun 9s 2.8s linear infinite' }} />
            </g>
          </svg>
          <span className="hero-beam-core" />
        </div>

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
                <motion.span key={i} variants={letter} style={{ display: 'inline-block' }}>{ch}</motion.span>
              ))}
              <motion.span variants={letter} className="dotacc" style={{ display: 'inline-block' }}>.</motion.span>
            </motion.span>
          )}
        </h1>
      </div>

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
