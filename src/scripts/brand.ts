// Animación del logotipo: el icono se recoge sobre la λ y el punto escribe «yman»
// hasta quedar como punto final. Geometría en unidades de la altura de la λ (h),
// medida sobre el icono de 512 (docs/marca/logo/ayman-icono.svg).
const G = { tx: -0.304, ty: -0.387, size: 1.761, r: 0.383, dx: 1.087, dy: 0.83, dr: 0.104 };
const css = (n: string) => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
// Duración y curva salen de los tokens de movimiento (src/styles/global.css).
const sec = (n: string, d: number) => (parseFloat(css(n)) || d) * 1000;
const DUR = sec('--d-brand', 1.1);
const OPEN = sec('--d-open', 0.64);
const EASE = css('--ease') || 'cubic-bezier(.23,1,.32,1)';
const EASE_IO = css('--ease-io') || 'cubic-bezier(.65,0,.35,1)';
const reduce = matchMedia('(prefers-reduced-motion: reduce)');
const scheme = matchMedia('(prefers-color-scheme: light)');
type State = 'logo' | 'name';

function setup(brand: HTMLElement, glow: boolean) {
  const tile = brand.querySelector<HTMLElement>('.tile')!;
  const lam = brand.querySelector<SVGElement>('.lam')!;
  const rest = brand.querySelector<HTMLElement>('.rest')!;
  const dot = brand.querySelector<HTMLElement>('.dot')!;
  let anims: Animation[] = [];
  let state: State = 'logo';

  function build() {
    anims.forEach((a) => a.cancel());
    // Las medidas se pasan a coordenadas propias del nombre: el scroll puede tenerlo escalado
    // (scripts/motion-core.ts), y el recorte y el punto se aplican antes de esa escala.
    const b = brand.getBoundingClientRect();
    const k = b.width / (brand.offsetWidth || b.width) || 1;
    const rect = (el: Element) => { const r = el.getBoundingClientRect(); return { left: (r.left - b.left) / k, top: (r.top - b.top) / k, width: r.width / k, height: r.height / k }; };
    const l = rect(lam);
    const d = rect(dot);
    const h = l.height;
    const lx = l.left;
    const ly = l.top;
    const size = G.size * h;
    Object.assign(tile.style, {
      left: `${lx + G.tx * h}px`, top: `${ly + G.ty * h}px`,
      width: `${size}px`, height: `${size}px`, borderRadius: `${G.r * h}px`,
    });
    const it = -G.ty * h, il = -G.tx * h, ir = size - il - l.width, ib = size - it - h;
    const box = `inset(${it}px ${ir}px ${ib}px ${il}px round ${0.12 * h}px)`;
    const full = `inset(0px round ${G.r * h}px)`;
    const fx = d.left + d.width / 2, fy = d.top + d.height / 2;
    const sx = l.left + G.dx * h, sy = l.top + G.dy * h;
    const s = (2 * G.dr * h) / d.width;
    const T = `translate(${sx - fx}px,${sy - fy}px) scale(${s})`;
    const o: KeyframeAnimationOptions = { duration: DUR, easing: EASE, fill: 'both' };
    const fg = css('--tile-fg'), tx = css('--txt'), sig = css('--sig');
    const sh0 = glow ? '0 0 0 rgba(59,130,246,0)' : 'none';
    const sh1 = glow ? '0 0 28px rgba(59,130,246,.6)' : 'none';
    anims = [
      tile.animate([
        { opacity: 1, clipPath: full }, { opacity: 1, clipPath: full, offset: 0.1 },
        { opacity: 1, clipPath: box, offset: 0.42 }, { opacity: 0, clipPath: box, offset: 0.52 }, { opacity: 0, clipPath: box },
      ], o),
      lam.animate([{ fill: fg }, { fill: fg, offset: 0.42 }, { fill: tx, offset: 0.52 }, { fill: tx }], o),
      rest.animate([
        { clipPath: 'inset(-40% 100% -40% 0)', opacity: 0 },
        { clipPath: 'inset(-40% 100% -40% 0)', opacity: 0, offset: 0.4 },
        { clipPath: 'inset(-40% 0% -40% 0)', opacity: 1 },
      ], o),
      dot.animate([
        { transform: T, backgroundColor: '#3A5A8C', boxShadow: sh0 },
        { transform: T, backgroundColor: '#3A5A8C', boxShadow: sh0, offset: 0.4 },
        { transform: 'none', backgroundColor: sig, boxShadow: sh1 },
      ], o),
    ];
    anims.forEach((a) => a.pause());
  }

  function to(next: State, instant = false) {
    state = next;
    if (!anims.length) build();
    const name = next === 'name';
    anims.forEach((a) => {
      if (instant || reduce.matches) { a.currentTime = name ? DUR : 0; a.pause(); return; }
      a.playbackRate = name ? 1 : -1.4;
      a.play();
    });
  }

  const refresh = () => { build(); to(state, true); };
  return { to, build, refresh, tile, lam, dot };
}

document.fonts.ready.then(() => {
  const heroEl = document.querySelector<HTMLElement>('[data-brand="hero"]');
  const navEl = document.querySelector<HTMLElement>('[data-brand="nav"]');
  const bar = document.getElementById('top-bar');
  const hero = heroEl ? setup(heroEl, true) : null;
  // En las páginas sin «λyman.» grande, la barra enseña el nombre desde el principio.
  const nav = navEl ? setup(navEl, false) : null;

  if (hero) {
    hero.build(); hero.to('logo', true);
    const layer = document.querySelector<HTMLElement>('.open');
    if (layer && document.documentElement.classList.contains('js-open') && !reduce.matches) opening(layer, hero);
    else { layer?.remove(); setTimeout(() => hero.to('name'), 450); }
  }
  if (nav) { nav.build(); nav.to(hero ? 'logo' : 'name', true); }

  let past = false;
  const onScroll = () => {
    bar?.classList.toggle('scrolled', scrollY > 20);
    if (!hero || !nav) return;
    const p = scrollY > 420;
    if (p !== past) { past = p; nav.to(p ? 'name' : 'logo'); }
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  let t: number | undefined;
  addEventListener('resize', () => { clearTimeout(t); t = window.setTimeout(() => { hero?.refresh(); nav?.refresh(); }, 150); });
  scheme.addEventListener('change', () => { hero?.refresh(); nav?.refresh(); });
});

// Apertura: el icono aparece grande en el centro y vuela hasta su sitio en «λyman.» del Inicio,
// donde la animación de siempre lo recoge sobre la λ. Solo WAAPI: no espera a GSAP ni a Lenis.
function opening(layer: HTMLElement, hero: ReturnType<typeof setup>) {
  try { sessionStorage.setItem('opened', '1'); } catch { /* sin almacenamiento: se repite en cada carga */ }
  const t = hero.tile.getBoundingClientRect(), l = hero.lam.getBoundingClientRect(), d = hero.dot.getBoundingClientRect();
  const ic = document.createElement('div');
  ic.className = 'open-ic';
  Object.assign(ic.style, { left: `${t.left}px`, top: `${t.top}px`, width: `${t.width}px`, height: `${t.height}px`, borderRadius: hero.tile.style.borderRadius });
  const lam = hero.lam.cloneNode(true) as SVGElement;
  Object.assign(lam.style, { left: `${l.left - t.left}px`, top: `${l.top - t.top}px`, width: `${l.width}px`, height: `${l.height}px` });
  const dot = document.createElement('i');
  Object.assign(dot.style, { left: `${d.left - t.left}px`, top: `${d.top - t.top}px`, width: `${d.width}px`, height: `${d.height}px` });
  ic.append(lam, dot);
  layer.append(ic);
  const S = Math.min(2.4, Math.max(1.15, (0.34 * Math.min(innerWidth, innerHeight)) / t.width));
  const go = `translate(${innerWidth / 2 - (t.left + t.width / 2)}px,${innerHeight / 2 - (t.top + t.height / 2)}px)`;
  const o: KeyframeAnimationOptions = { duration: OPEN, fill: 'forwards' };
  const a1 = ic.animate([
    { opacity: 0, transform: `${go} scale(${S * 0.9})`, easing: EASE },
    { opacity: 1, transform: `${go} scale(${S})`, offset: 0.28 },
    { opacity: 1, transform: `${go} scale(${S})`, offset: 0.36, easing: EASE_IO },
    { opacity: 1, transform: 'none' },
  ], o);
  const a2 = layer.animate([{ opacity: 1 }, { opacity: 1, offset: 0.3 }, { opacity: 0, easing: 'linear' }], o);
  let over = false;
  const end = (instant: boolean) => {
    if (over) return;
    over = true;
    removeEventListener('scroll', skip);
    a1.cancel(); a2.cancel(); layer.remove();
    hero.to('name', instant);
  };
  const skip = () => end(true);
  addEventListener('scroll', skip, { once: true, passive: true });
  a1.finished.then(() => end(false), () => {});
}
