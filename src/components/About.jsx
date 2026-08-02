import { ArrowRight } from 'lucide-react';
import { useApp } from '../lib/app-context.jsx';
import Reveal from './Reveal.jsx';
import Globe from './Globe.jsx';
import TagSphere from './TagSphere.jsx';
import Stats from './Stats.jsx';

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
        {/* Intro — compact, full-width */}
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
            <p>{ui.aboutBio}</p>
            <dl className="intro-facts">
              {ui.quickFacts.map((f) => (
                <div className="fact-row" key={f.k}>
                  <dt>{f.k}</dt><dd>{f.v}</dd>
                </div>
              ))}
            </dl>
            <div className="trait-row">
              {ui.traits.map((tt) => (
                <span className="trait" key={tt}><span className="d" aria-hidden="true" />{tt}</span>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Location globe */}
        <Reveal variant="scale" delay={0.05} className="card b-globe">
          <div className="b-globe-head">
            <span className="eyebrow">{ui.locLabel}</span>
            <h3>{ui.locTitle} <span>{ui.locSub}</span></h3>
          </div>
          <Globe />
        </Reveal>

        {/* Interests sphere */}
        <Reveal variant="scale" delay={0.1} className="card b-sphere">
          <div className="b-sphere-head">
            <span className="eyebrow">{ui.interestsTitle}</span>
            <h3>{ui.focusTitle} <span>&amp; {content.es ? 'aficiones' : 'hobbies'}</span></h3>
          </div>
          <TagSphere items={content.sphereTags} />
        </Reveal>

        {/* CTA -> LinkedIn */}
        <Reveal variant="scale" delay={0.12} className="b-cta">
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

        {/* Quote */}
        <Reveal variant="scale" delay={0.14} className="card b-quote">
          <span className="mark" aria-hidden="true">”</span>
          <p>{content.quote.text}</p>
          <div className="by">{content.quote.author}</div>
        </Reveal>
      </div>

      <Stats />
    </section>
  );
}
