import { Cpu, Code2, BrainCircuit, Plane, BookOpen, Dumbbell, Clapperboard } from 'lucide-react';
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
          <div className="intro-foot">
            <span className="intro-sign">{ui.signature}</span>
            <div className="trait-row">
              {ui.traits.map((tt) => (
                <span className="trait" key={tt}><span className="d" aria-hidden="true" />{tt}</span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Location globe — Spain */}
        <Reveal variant="scale" delay={0.05} className="card b-globe">
          <div className="b-globe-head">
            <span className="eyebrow">{ui.locLabel}</span>
            <h3>{ui.locTitle} <span>{ui.locSub}</span></h3>
          </div>
          <Globe />
        </Reveal>

        {/* Focus areas */}
        <Reveal variant="scale" delay={0.1} className="card b-focus">
          <span className="eyebrow">{ui.focusTitle}</span>
          <div className="focus-items">
            {content.focus.map((f) => {
              const Ico = FOCUS_ICONS[f.icon] || Code2;
              return (
                <div className="focus-item" key={f.icon}>
                  <span className="focus-ico" aria-hidden="true"><Ico size={20} /></span>
                  <div className="focus-txt">
                    <div className="focus-t">{f.title}</div>
                    <div className="focus-s">{f.sub}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* Interests */}
        <Reveal variant="scale" delay={0.15} className="card b-interests">
          <span className="eyebrow">{ui.interestsTitle}</span>
          <div className="interest-grid">
            {content.interests.map((it) => {
              const Ico = INTEREST_ICONS[it.icon] || BookOpen;
              return (
                <div className="interest-cell" key={it.icon}>
                  <span className="interest-ico" aria-hidden="true"><Ico size={22} /></span>
                  <span className="interest-l">{it.label}</span>
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* Quote */}
        <Reveal variant="scale" delay={0.1} className="card b-quote">
          <span className="mark" aria-hidden="true">”</span>
          <p>{content.quote.text}</p>
          <div className="by">{content.quote.author}</div>
        </Reveal>
      </div>

      <Stats />
    </section>
  );
}
