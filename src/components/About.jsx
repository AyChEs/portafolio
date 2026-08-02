import { ArrowRight } from 'lucide-react';
import { useApp } from '../lib/app-context.jsx';
import Reveal from './Reveal.jsx';
import Globe from './Globe.jsx';
import Clock from './Clock.jsx';
import Stats from './Stats.jsx';

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
          <div className="intro-head">
            <span className="avatar" aria-hidden="true">{content.initials}</span>
            <div className="who">
              <div className="nm">{content.name}</div>
              <div className="rl">{ui.kicker}</div>
            </div>
          </div>
          <p><span className="accent">{ui.aboutLead}</span> {ui.aboutBio}</p>
          <p>{ui.aboutBio2}</p>
          <dl className="focus-list">
            {ui.focus.map((f) => (
              <div className="focus-row" key={f.k}>
                <dt>{f.k}</dt>
                <dd>{f.v}</dd>
              </div>
            ))}
          </dl>
          <div className="trait-row">
            {ui.traits.map((tt) => (
              <span className="trait" key={tt}><span className="d" aria-hidden="true" />{tt}</span>
            ))}
          </div>
        </Reveal>

        {/* Location globe */}
        <Reveal variant="scale" delay={0.05} className="card b-globe">
          <span className="eyebrow">{ui.locLabel}</span>
          <h3>{ui.locTitle} <span>{ui.locSub}</span></h3>
          <Globe />
        </Reveal>

        {/* Local time */}
        <Reveal variant="scale" delay={0.1} className="card b-clock">
          <span className="eyebrow">{ui.clockLabel}</span>
          <Clock />
        </Reveal>

        {/* Availability CTA */}
        <Reveal variant="scale" delay={0.05} className="b-cta">
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
        <Reveal variant="scale" delay={0.1} className="card b-quote">
          <span className="mark" aria-hidden="true">”</span>
          <p>{content.quote.text}</p>
          <div className="by">{content.quote.author}</div>
        </Reveal>

        {/* Code card */}
        <Reveal variant="scale" delay={0.15} className="b-code">
          <div className="code-head">
            <i aria-hidden="true" /><i aria-hidden="true" /><i aria-hidden="true" />
            <span className="fn">developer.rb</span>
          </div>
          <div className="code-body">
            <div><span className="tkk">class</span> <span className="tkc">Developer</span></div>
            <div className="in"><span className="tkv">name</span>&nbsp;&nbsp;= <span className="tks">"Ayman Charoui"</span></div>
            <div className="in"><span className="tkv">role</span>&nbsp;&nbsp;= <span className="tks">"Full-Stack"</span></div>
            <div className="in"><span className="tkv">stack</span> = [<span className="tks">"Rails"</span>, <span className="tks">"REST"</span>]</div>
            <div className="in"><span className="tkv">at</span>&nbsp;&nbsp;&nbsp;&nbsp;= <span className="tks">"Etecnic"</span></div>
            <div><span className="tkk">end</span><span className="cur">▌</span></div>
          </div>
        </Reveal>
      </div>

      <Stats />
    </section>
  );
}
