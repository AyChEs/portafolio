import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { GraduationCap, Briefcase, Award, MapPin } from 'lucide-react';
import { useApp } from '../lib/app-context.jsx';
import Reveal from './Reveal.jsx';

const TYPE_ICON = { study: GraduationCap, work: Briefcase, cert: Award };
const TYPE_LABEL = (es) => ({
  study: es ? 'Estudios' : 'Studies',
  work: es ? 'Experiencia' : 'Work',
  cert: es ? 'Certificación' : 'Certification',
});

export default function Journey() {
  const { content } = useApp();
  const ui = content.ui;
  const ref = useRef(null);
  const labels = TYPE_LABEL(content.es);

  // Progress line fills as the section scrolls through the viewport.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 70%', 'end 60%'],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  return (
    <section id="journey" className="section">
      <Reveal className="sec-head">
        <span className="num">04</span>
        <h2>{ui.sJourney}</h2>
        <span className="line" aria-hidden="true" />
      </Reveal>

      <div className="journey" ref={ref}>
        <div className="journey-track" aria-hidden="true">
          <motion.span className="journey-fill" style={{ scaleY: fill }} />
        </div>

        {content.journey.map((e, i) => {
          const Ico = TYPE_ICON[e.type] || Briefcase;
          return (
            <motion.div
              className={`jn-entry${e.current ? ' current' : ''}`}
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -12% 0px' }}
              transition={{ duration: 0.6, delay: 0.04, ease: [0.2, 0.75, 0.25, 1] }}
            >
              <span className={`jn-node jn-${e.type}`} aria-hidden="true">
                <Ico size={17} />
              </span>
              <div className="jn-card">
                <div className="jn-top">
                  <span className={`jn-kind jn-kind-${e.type}`}>{labels[e.type]}</span>
                  <span className="jn-period">{e.period}</span>
                  {e.current && <span className="jn-now"><span className="d" aria-hidden="true" />{ui.now}</span>}
                </div>
                <h3>{e.title}</h3>
                <div className="jn-org">
                  {e.org}{e.place && <span className="jn-place"><MapPin size={12} aria-hidden="true" /> {e.place}</span>}
                </div>
                <p>{e.note}</p>
                {e.tag && <span className="jn-tag">{e.type === 'cert' ? '✓ ' : '★ '}{e.tag}</span>}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
