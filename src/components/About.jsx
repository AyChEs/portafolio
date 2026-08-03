import { ArrowRight } from 'lucide-react';
import { useApp } from '../lib/app-context.jsx';
import Reveal from './Reveal.jsx';
import Globe from './Globe.jsx';
import NeuralInterests from './NeuralInterests.jsx';

export default function About() {
  const { content } = useApp();
  const ui = content.ui;
  const linkedin = content.contacts.find((c) => c.key === 'linkedin')?.href || '#contact';

  return (
    <section id="about" className="section">
      <Reveal className="sec-head">
        <span className="num">01</span>
        <h2>{ui.sAbout}</h2>
        <span className="line" aria-hidden="true" />
      </Reveal>

      <div className="bento">
        {/* Intro — compact identity */}
        <Reveal variant="up" className="card b-intro">
          <span className="b-intro-glow" aria-hidden="true" />
          <div className="intro-id">
            <span className="avatar" aria-hidden="true">{content.initials}</span>
            <div className="who">
              <div className="nm">{content.name}</div>
              <div className="rl">{ui.kicker}</div>
              <span className="intro-handle">@{content.handle}</span>
            </div>
          </div>
          <div className="intro-body">
            <p className="intro-lead">{ui.aboutLead}</p>
            <dl className="intro-facts">
              {ui.quickFacts.map((f) => (
                <div className="fact-row" key={f.k}><dt>{f.k}</dt><dd>{f.v}</dd></div>
              ))}
            </dl>
            <div className="trait-row">
              {ui.traits.map((tt) => (
                <span className="trait" key={tt}><span className="d" aria-hidden="true" />{tt}</span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* CTA -> LinkedIn */}
        <Reveal variant="up" delay={0.05} className="b-cta">
          <span className="glow" aria-hidden="true" />
          <div className="avail">
            <span className="dot" aria-hidden="true" />
            <span>{ui.availShort}</span>
          </div>
          <p className="big">
            <span className="a">{ui.ctaA}</span>
            <span className="b">{ui.ctaB}</span>
          </p>
          <a className="chip-link" href={linkedin} target="_blank" rel="noopener noreferrer">
            {ui.getInTouch} <ArrowRight size={15} aria-hidden="true" />
          </a>
        </Reveal>

        {/* Location globe — big component */}
        <Reveal variant="scale" delay={0.08} className="card b-globe">
          <div className="b-globe-head">
            <span className="eyebrow">{ui.locLabel}</span>
            <h3>{ui.locTitle} <span>{ui.locSub}</span></h3>
          </div>
          <Globe />
        </Reveal>

        {/* Interests — 3D icon node graph, big component */}
        <Reveal variant="scale" delay={0.12} className="card b-neural">
          <div className="b-neural-head">
            <span className="eyebrow">{ui.interestsTitle}</span>
            <h3>{ui.focusTitle} <span>&amp; {content.es ? 'aficiones' : 'hobbies'}</span></h3>
          </div>
          <NeuralInterests />
        </Reveal>
      </div>
    </section>
  );
}
