import { useApp } from '../lib/app-context.jsx';

function Track({ items, cls }) {
  const set = (
    <div className="ribbon-set">
      {items.map((m, i) => (
        <span className="item" key={i}>{m}<i aria-hidden="true">◆</i></span>
      ))}
    </div>
  );
  return (
    <div className={`ribbon ${cls}`}>
      <div className="ribbon-track">{set}{set}</div>
    </div>
  );
}

export default function Ribbons() {
  const { content } = useApp();
  return (
    <div className="ribbons" aria-hidden="true">
      <Track items={content.marquee} cls="ribbon-a" />
      <Track items={content.marqueeB} cls="ribbon-b" />
    </div>
  );
}
