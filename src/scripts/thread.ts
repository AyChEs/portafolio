// El punto como hilo conductor. Un trazado fino recorre el margen izquierdo de la página y el punto azul de la
// marca baja por él ligado al scroll. Al llegar a cada sección se acerca a su elemento y se «convierte» en él:
//   Inicio: el punto de «Disponible» · Casos, Stack, Cómo trabajo y Sobre mí: el punto final del titular ·
//   ¿Tienes un proyecto?: el punto del formulario (que luego se vuelve ✓) · Contacto: el punto final de «Hablemos.».
// Solo escritorio (≥ 1000 px): en móvil no hay margen y estorbaría. Sin «reducir movimiento» no se carga (motion.ts).
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type Target = { q: string; el: HTMLElement; kind: 'dot' | 'period'; sec: HTMLElement; node: number; ink?: { dx: number; d: number }; fm?: { a: number; dsc: number; abd: number; aba: number } };
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (e0: number, e1: number, v: number) => { const t = clamp((v - e0) / (e1 - e0)); return t * t * (3 - 2 * t); };
const NS = 'http://www.w3.org/2000/svg';
const DOT = 9; // diámetro del punto del hilo, en px

export function thread(): (() => void) | undefined {
  if (!document.querySelector('.hero .chip b') || innerWidth < 1000) return;
  const q = (s: string) => document.querySelector<HTMLElement>(s);
  const defs: { q: string; kind: Target['kind']; sec: string }[] = [
    { q: '.hero .chip b', kind: 'dot', sec: '.hero' },
    { q: '#casos .sh h2 i', kind: 'period', sec: '#casos' },
    { q: '#stack .sh h2 i', kind: 'period', sec: '#stack' },
    { q: '#como .sh h2 i', kind: 'period', sec: '#como' },
    { q: '#sobre .bio .sh h2 i', kind: 'period', sec: '#sobre' },
    { q: '#form-dot', kind: 'dot', sec: '#proyecto' },
    { q: '.fbig i', kind: 'period', sec: '#contacto' },
  ];
  // Los titulares se parten y se recomponen con SplitText: el elemento se vuelve a buscar en cada uso.
  const targets: Target[] = defs.filter((d) => q(d.q) && q(d.sec)).map((d, i) => ({ q: d.q, el: q(d.q)!, kind: d.kind, sec: q(d.sec)!, node: i }));
  const live = (t: Target) => { if (!t.el.isConnected) t.el = q(t.q) ?? t.el; return t.el; };
  if (targets.length < 3) return;

  const root = document.createElement('div');
  root.id = 'thread';
  root.setAttribute('aria-hidden', 'true');
  const mk = (cls: string) => { const s = document.createElementNS(NS, 'svg'); s.setAttribute('class', cls); const p = document.createElementNS(NS, 'path'); s.append(p); return { s, p }; };
  const base = mk('th-base'), prog = mk('th-prog');
  const dot = document.createElement('i');
  dot.className = 'th-dot';
  const nodes = targets.map(() => { const c = document.createElementNS(NS, 'circle'); c.setAttribute('r', '3.5'); c.setAttribute('class', 'th-node'); base.s.append(c); return c; });
  root.append(base.s, prog.s, dot);
  document.body.append(root);

  let ys: number[] = [], xs: number[] = [], nodeY: number[] = [], docH = 0;
  let dirty = true, lastY = -1, lit = -1;

  // Posición en el documento del centro del titular (o del elemento). Con la sección «Cómo trabajo» fijada
  // por GSAP no se puede medir en vivo, así que se usa la altura de su sección más el relleno.
  const docTop = (el: HTMLElement) => el.getBoundingClientRect().top + scrollY;
  const nodePos = (t: Target) => {
    const el = live(t);
    const h = t.kind === 'period' ? ((el.closest('h2, .fbig') as HTMLElement | null) ?? el) : el;
    const pinned = t.sec.id === 'como' && getComputedStyle(t.sec.querySelector('.how')!).position === 'fixed';
    if (pinned) return docTop(t.sec) + parseFloat(getComputedStyle(t.sec).paddingTop) + 40;
    const r = h.getBoundingClientRect();
    return r.top + scrollY + r.height / 2;
  };

  const build = () => {
    docH = document.documentElement.scrollHeight;
    const left = (innerWidth - Math.min(1240, innerWidth)) / 2 + 32;
    const xr = Math.max(8, left - 54), xn = Math.max(12, left - 24);
    nodeY = targets.map(nodePos);
    let d = `M${xn} ${nodeY[0]}`;
    for (let i = 1; i < nodeY.length; i++) {
      const a = nodeY[i - 1], b = nodeY[i];
      d += ` C${xn} ${a + 70},${xr} ${a + 70},${xr} ${a + 140} L${xr} ${b - 140} C${xr} ${b - 70},${xn} ${b - 70},${xn} ${b}`;
    }
    for (const p of [base.p, prog.p]) p.setAttribute('d', d);
    for (const s of [base.s, prog.s]) { s.setAttribute('width', '160'); s.setAttribute('height', String(docH - 1)); s.setAttribute('viewBox', `0 0 160 ${docH - 1}`); }
    nodes.forEach((c, i) => { c.setAttribute('cx', String(xn)); c.setAttribute('cy', String(nodeY[i])); });
    // Muestreo del trazado para saber, dada una altura, en qué punto está.
    const len = base.p.getTotalLength();
    ys = []; xs = [];
    for (let l = 0; l <= len; l += 5) { const p = base.p.getPointAtLength(l); xs.push(p.x); ys.push(p.y); }
    // Tamaño y centro de tinta del punto final de cada titular (en unidades de su cuerpo de letra).
    const ctx = document.createElement('canvas').getContext('2d')!;
    targets.forEach((t) => {
      if (t.kind !== 'period') return;
      const cs = getComputedStyle(live(t));
      ctx.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
      (ctx as CanvasRenderingContext2D & { letterSpacing?: string }).letterSpacing = cs.letterSpacing === 'normal' ? '0px' : cs.letterSpacing;
      const m = ctx.measureText('.');
      t.ink = { dx: (m.actualBoundingBoxRight - m.actualBoundingBoxLeft) / 2, d: m.actualBoundingBoxRight + m.actualBoundingBoxLeft };
      t.fm = { a: m.fontBoundingBoxAscent, dsc: m.fontBoundingBoxDescent, abd: m.actualBoundingBoxDescent, aba: m.actualBoundingBoxAscent };
    });
    dirty = true;
  };

  const railAt = (y: number) => {
    if (y <= ys[0]) return { x: xs[0], y: ys[0] };
    if (y >= ys[ys.length - 1]) return { x: xs[xs.length - 1], y: ys[ys.length - 1] };
    let lo = 0, hi = ys.length - 1;
    while (hi - lo > 1) { const m = (lo + hi) >> 1; if (ys[m] < y) lo = m; else hi = m; }
    return { x: xs[lo], y: ys[lo] };
  };

  // Centro del elemento en pantalla y tamaño del punto que lo representa.
  const centre = (t: Target) => {
    const r = live(t).getBoundingClientRect();
    if (t.kind === 'dot') return { x: r.left + r.width / 2, y: r.top + r.height / 2, d: Math.min(r.width, r.height) };
    const fm = t.fm!;
    const baseline = r.top + (r.height - (fm.a + fm.dsc)) / 2 + fm.a;
    return { x: r.left + t.ink!.dx, y: baseline - (fm.aba - fm.abd) / 2, d: t.ink!.d };
  };

  const update = () => {
    const sy = scrollY;
    if (!dirty && sy === lastY) return;
    dirty = false; lastY = sy;
    const H = innerHeight, focusY = H * 0.42;
    const rail = railAt(sy + focusY);
    let x = rail.x, y = rail.y, k = 0, scale = 1, alpha = 1;
    targets.forEach((t, i) => {
      // Solo se mide en vivo lo que está cerca de la pantalla y, en los titulares, cuando ya han entrado.
      const approx = nodeY[i] - sy;
      if (approx < -H || approx > H * 2) return;
      const el = live(t);
      if (t.kind === 'period' && !(el.closest('h2, .fbig') as HTMLElement | null)?.dataset.in) return;
      const c = centre(t);
      const w = i === 0 ? 1 - smooth(0, 380, sy) : 1 - smooth(60, 340, Math.abs(c.y - focusY));
      if (w > k) {
        k = w;
        x = rail.x + (c.x + scrollX - rail.x) * w;
        y = rail.y + (c.y + sy - rail.y) * w;
        scale = 1 + (c.d / DOT - 1) * w;
        const ok = el.dataset.state === 'ok';
        alpha = ok ? 1 - w : 1;
      }
    });
    dot.style.transform = `translate3d(${(x - DOT / 2).toFixed(1)}px,${(y - DOT / 2).toFixed(1)}px,0) scale(${scale.toFixed(3)})`;
    dot.style.opacity = String(alpha);
    // El trazo ya recorrido se pinta en azul señal.
    prog.s.style.clipPath = `inset(0 0 ${Math.max(0, docH - rail.y)}px 0)`;
    const n = nodeY.filter((v) => v <= rail.y + 1).length - 1;
    if (n !== lit) { lit = n; nodes.forEach((c, i) => c.classList.toggle('on', i <= n)); }
  };

  const tick = () => update();
  gsap.ticker.add(tick);
  const onRefresh = () => { if (innerWidth < 1000) { root.style.display = 'none'; return; } root.style.display = ''; build(); };
  ScrollTrigger.addEventListener('refresh', onRefresh);
  const mo = new MutationObserver(() => { dirty = true; });
  const form = q('#form-dot');
  if (form) mo.observe(form, { attributes: true, attributeFilter: ['data-state'] });
  build(); update();
  root.classList.add('ready');
  return () => { gsap.ticker.remove(tick); ScrollTrigger.removeEventListener('refresh', onRefresh); mo.disconnect(); root.remove(); };
}
