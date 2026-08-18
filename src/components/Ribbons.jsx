import { useApp } from '../lib/app-context.jsx';

// Single marquee strip of technologies.
export default function Ribbons() {
  const { content } = useApp();
  const set = (
    <div className="ribbon-set">
      {content.marquee.map((m, i) => (
        <span className="item" key={i}>{m}<i aria-hidden="true">·</i></span>
      ))}
    </div>
  );
  return (
    <div className="ribbons" aria-hidden="true">
      <div className="ribbon ribbon-a">
        <div className="ribbon-track">{set}{set}</div>
      </div>
    </div>
  );
}
