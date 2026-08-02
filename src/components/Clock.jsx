import { useEffect, useState } from 'react';

// Live analogue clock in Europe/Madrid time.
function madridTime() {
  const now = new Date();
  try {
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/Madrid', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
    }).formatToParts(now);
    const get = (t) => parseInt((parts.find((x) => x.type === t) || {}).value, 10);
    return { h: get('hour'), m: get('minute'), s: get('second') };
  } catch (e) {
    return { h: now.getHours(), m: now.getMinutes(), s: now.getSeconds() };
  }
}

const ticks = Array.from({ length: 12 }, (_, i) => i * 30);

export default function Clock() {
  const [t, setT] = useState(madridTime);
  useEffect(() => {
    const id = setInterval(() => setT(madridTime()), 250);
    return () => clearInterval(id);
  }, []);

  const pad = (n) => String(n).padStart(2, '0');
  const hDeg = ((t.h % 12) + t.m / 60) * 30;
  const mDeg = (t.m + t.s / 60) * 6;
  const sDeg = t.s * 6;

  return (
    <>
      <svg viewBox="0 0 200 200" role="img" aria-label={`${pad(t.h)}:${pad(t.m)} Tarragona`}>
        <circle cx="100" cy="100" r="94" fill="none" stroke="var(--bd2)" strokeWidth="1" />
        <circle cx="100" cy="100" r="86" fill="none" stroke="var(--bd)" strokeWidth="1" />
        <g stroke="var(--mut)" strokeLinecap="round">
          {ticks.map((deg) => {
            const major = deg % 90 === 0;
            return (
              <line
                key={deg}
                x1="100" y1="16" x2="100" y2={major ? 28 : 24}
                strokeWidth={major ? 2.5 : 1}
                strokeOpacity={major ? 0.9 : 0.4}
                transform={`rotate(${deg} 100 100)`}
              />
            );
          })}
        </g>
        <text x="100" y="132" textAnchor="middle" style={{ font: '600 8px/1 var(--font-mono)', letterSpacing: '.22em', fill: 'var(--mut2)' }}>TARRAGONA</text>
        <line x1="100" y1="112" x2="100" y2="56" stroke="var(--ink)" strokeWidth="4.5" strokeLinecap="round" style={{ transformOrigin: '100px 100px', transform: `rotate(${hDeg}deg)` }} />
        <line x1="100" y1="116" x2="100" y2="34" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" style={{ transformOrigin: '100px 100px', transform: `rotate(${mDeg}deg)` }} />
        <line className="hand-s" x1="100" y1="120" x2="100" y2="28" stroke="var(--acc)" strokeWidth="1.4" strokeLinecap="round" style={{ transformOrigin: '100px 100px', transform: `rotate(${sDeg}deg)` }} />
        <circle cx="100" cy="100" r="5" fill="var(--acc)" />
        <circle cx="100" cy="100" r="2" fill="var(--bg2)" />
      </svg>
      <div className="clock-text">{pad(t.h)}:{pad(t.m)}:{pad(t.s)}</div>
    </>
  );
}
