import {
  Cpu, Code2, BrainCircuit, Plane, BookOpen, Dumbbell, Clapperboard, ArrowRight,
} from 'lucide-react';
import { useApp } from '../lib/app-context.jsx';
import Reveal from './Reveal.jsx';
import Globe from './Globe.jsx';
import Stats from './Stats.jsx';

const FOCUS_ICONS = { cpu: Cpu, code: Code2, ai: BrainCircuit };
const INTEREST_ICONS = { travel: Plane, reading: BookOpen, gym: Dumbbell, cinema: Clapperboard };

export default function About() {
  const { content } = useApp();
  const ui = content.ui;

  return (
    <section id="about" className="section">
      <Reveal className="sec-head">
        <span className="num">01</span>
        <h2>{ui.sAbout}</h2>
        <span className="line" aria-hidden="true" />
      </Reveal>

      <div className="bento">
        {/* Intro / personality */}
        <Reveal variant="scale" className="card b-intro">
          <span className="b-intro-glow" aria-hidden="true" />
          <div className="intro-head">
            <span className="avatar" aria-hidden="true">{content.initials}</span>
            <div className="who">
              <div className="nm">{content.name}</div>
              <div className="rl">{ui.kicker}</div>
            </div>
            <span className="intro-handle" aria-hidden="true">@{content.handle}</span>
          </div>
          <p className="intro-lead">{ui.aboutLead}</p>
          <p>{ui.aboutBio}</p>
          <p>{ui.aboutBio2}</p>
          <dl className="intro-facts">
            {ui.quickFacts.map((f) => (
              <div className="fact-row" key={f.k}>
                <dt>{f.k}</dt>
                <dd>{f.v}</dd>
              </div>
            ))}
          </dl>
          <div className="intro-foot">
            <span className="intro-sign">{ui.signature}</span>
            <div className="trait-row">
              {ui.traits.map((tt) => (
                <span className="trait" key={tt}><span className="d" aria-hidden="true" />{tt}</span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Location globe — real map + pin on Tarragona */}
        <Reveal variant="scale" delay={0.05} className="card b-globe">
          <div className="b-globe-head">
            <span className="eyebrow">{ui.locLabel}</span>
            <h3>{ui.locTitle} <span>{ui.locSub}</span></h3>
          </div>
          <Globe />
        </Reveal>

        {/* Availability CTA */}
        <Reveal variant="scale" delay={0.1} className="b-cta">
          <span className="glow" aria-hidden="true" />
          <div className="avail">
            <span className="dot" aria-hidden="true" />
            <span>{ui.availShort}</span>
          </div>
          <p className="big">
            <span className="a">{ui.ctaA}</span>
            <span className="b">{ui.ctaB}</span>
          </p>
          <a className="chip-link" href="#contact">
            {ui.getInTouch} <ArrowRight size={15} aria-hidden="true" />
          </a>
        </Reveal>

        {/* Quote */}
        <Reveal variant="scale" delay={0.12} className="card b-quote">
          <span className="mark" aria-hidden="true">”</span>
          <p>{content.quote.text}</p>
          <div className="by">{content.quote.author}</div>
        </Reveal>

        {/* Interests band — pro areas + off-the-clock, combined */}
        <Reveal variant="up" delay={0.05} className="card b-interests">
          <div className="int-group">
            <span className="eyebrow">{ui.focusTitle}</span>
            <div className="int-chips">
              {content.focus.map((f) => {
                const Ico = FOCUS_ICONS[f.icon] || Code2;
                return (
                  <span className="int-chip accent" key={f.icon}>
                    <Ico size={16} aria-hidden="true" />{f.title}
                  </span>
                );
              })}
            </div>
          </div>
          <span className="int-sep" aria-hidden="true" />
          <div className="int-group">
            <span className="eyebrow">{ui.interestsTitle}</span>
            <div className="int-chips">
              {content.interests.map((it) => {
                const Ico = INTEREST_ICONS[it.icon] || BookOpen;
                return (
                  <span className="int-chip" key={it.icon}>
                    <Ico size={16} aria-hidden="true" />{it.label}
                  </span>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>

      <Stats />
    </section>
  );
}
