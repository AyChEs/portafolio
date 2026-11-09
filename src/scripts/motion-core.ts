// Animaciones ligadas al scroll. Se descarga después del primer pintado (ver scripts/motion.ts)
// y solo si no se pide «reducir movimiento». Solo se animan transform y opacity.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';
import { registerEases, tokens } from './tokens';
import { scramble } from './scramble';
import { thread } from './thread';

gsap.registerPlugin(ScrollTrigger, SplitText);

const $ = <T extends Element = HTMLElement>(s: string, root: ParentNode = document) => root.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, root: ParentNode = document) => [...root.querySelectorAll<T>(s)];
registerEases();
const T = tokens();
const EASE = 'out';

// Red de seguridad: toda animación de entrada que oculta algo (gsap.from) se registra aquí. Si su elemento ya está
// en pantalla, o por encima, y sigue sin haberse mostrado pasado 1,5 s sin estar sonando, se completa a la fuerza. Así un cálculo de
// posiciones fallido (fuentes o imágenes tardías, pins que cambian la altura, saltos rápidos) nunca deja contenido oculto.
// Red de seguridad: ninguna entrada puede dejar texto oculto. Se completa de golpe si el bloque
// ya quedó por encima de la pantalla, si lleva 1,5 s visible sin arrancar o si lleva 4 s
// «sonando» sin terminar (una animación atascada también cuenta).
const guarded: { el: Element; anim: gsap.core.Animation; since: number; active: number }[] = [];
function guard<T extends gsap.core.Animation>(el: Element, anim: T): T {
  guarded.push({ el, anim, since: 0, active: 0 });
  return anim;
}
function sweep() {
  const now = performance.now();
  for (let i = guarded.length - 1; i >= 0; i--) {
    const g = guarded[i];
    if (g.anim.progress() >= 1 || !g.el.isConnected) { guarded.splice(i, 1); continue; }
    const r = g.el.getBoundingClientRect();
    const finish = () => { g.anim.progress(1, false); guarded.splice(i, 1); };
    if (r.bottom <= 0 && r.height > 0) { finish(); continue; } // ya pasó: se muestra entero
    if (g.anim.isActive()) {
      g.since = 0;
      if (!g.active) g.active = now;
      else if (now - g.active > 4000) finish();
      continue;
    }
    g.active = 0;
    if (r.top >= innerHeight || (r.width === 0 && r.height === 0)) { g.since = 0; continue; }
    if (!g.since) g.since = now;
    else if (now - g.since > 1500) finish();
  }
}

export function init() {
  const root = document.documentElement;
  const mm = gsap.matchMedia();

  mm.add(
    {
      motion: '(prefers-reduced-motion: no-preference)',
      wide: '(min-width: 961px)',
      fine: '(hover: hover) and (pointer: fine)',
    },
    (ctx) => {
      const { motion, wide, fine } = ctx.conditions as Record<string, boolean>;
      if (!motion) { root.classList.remove('js-motion'); return; }

      const lenis = smooth();
      hero(wide);
      if (fine) magnetic();
      root.classList.add('m-on');

      // Lo que está por debajo del Inicio se prepara al primer gesto (scroll, rueda, toque o tecla),
      // en tareas cortas: así la carga de la página no paga el coste de partir textos y medir.
      const later: (() => unknown)[] = [() => story(wide), scenes, () => cases(wide), stack, () => how(wide), tape, footer, labels, thread];
      const undo: (() => void)[] = [];
      let alive = true, started = false;
      const events = ['scroll', 'wheel', 'touchstart', 'keydown', 'pointerdown'];
      const go = async () => {
        if (started) return;
        started = true;
        events.forEach((e) => removeEventListener(e, go));
        for (const fn of later) {
          if (!alive) return;
          ctx.add(() => { const r = fn(); if (typeof r === 'function') undo.push(r as () => void); });
          await new Promise((r) => setTimeout(r, 0));
        }
        ScrollTrigger.refresh();
      };
      if (scrollY > 40 || location.hash) go();
      else events.forEach((e) => addEventListener(e, go, { passive: true }));

      // Las fuentes, el teclado 3D o las imágenes diferidas pueden cambiar el layout después:
      // se recalculan los puntos de inicio cuando cambia la altura de la página.
      document.fonts.ready.then(() => ScrollTrigger.refresh());
      const sweeper = window.setInterval(() => { if (!document.hidden) sweep(); }, 250);
      // Cada imagen diferida que termina de cargar cambia la altura: se recalculan las posiciones.
      let rt = 0;
      const refreshSoon = () => { clearTimeout(rt); rt = window.setTimeout(() => ScrollTrigger.refresh(), 150); };
      document.querySelectorAll<HTMLImageElement>('img').forEach((im) => { if (!im.complete) im.addEventListener('load', refreshSoon, { once: true }); });
      addEventListener('load', refreshSoon, { once: true });
      addEventListener('resize', refreshSoon);
      addEventListener('orientationchange', refreshSoon);
      let last = document.body.scrollHeight, t = 0;
      const ro = new ResizeObserver(() => {
        const h = document.body.scrollHeight;
        if (Math.abs(h - last) < 2) return;
        last = h; clearTimeout(t); t = window.setTimeout(() => ScrollTrigger.refresh(), 200);
      });
      ro.observe(document.body);
      return () => {
        alive = false;
        events.forEach((e) => removeEventListener(e, go));
        undo.forEach((f) => f());
        clearInterval(sweeper); ro.disconnect(); lenis.destroy(); root.classList.remove('m-on');
      };
    },
  );
}

// Scroll suave con Lenis, sincronizado con el reloj de GSAP. Lenis usa el scroll nativo:
// el foco, el teclado y los lectores de pantalla siguen funcionando igual.
function smooth() {
  const lenis = new Lenis({ anchors: { offset: 0 }, lerp: 0.12, stopInertiaOnNavigate: true });
  lenis.on('scroll', ScrollTrigger.update);
  const tick = (t: number) => lenis.raf(t * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  const destroy = lenis.destroy.bind(lenis);
  lenis.destroy = () => { gsap.ticker.remove(tick); destroy(); };
  return lenis;
}

// Inicio: al bajar, «λyman.» se recoge hacia la barra
// (que a su vez despliega el nombre en scripts/brand.ts) y las cintas se abren en paralaje.
function hero(wide: boolean) {
  const h = $('.hero');
  if (!h) return;
  const tl = gsap.timeline({ scrollTrigger: { trigger: h, start: 'top top', end: () => `+=${Math.min(innerHeight * 0.9, 640)}`, scrub: 0.6 } });
  tl.to('.hero h1', { scale: wide ? 0.62 : 0.75, y: wide ? -40 : -20, opacity: 0, ease: 'none' }, 0)
    .to('.hero .ribbons', { scale: 1.25, y: 120, opacity: 0.2, ease: 'none' }, 0)
    .to('.hero .glow', { y: 160, opacity: 0.4, ease: 'none' }, 0)
    .to('.hero .lead, .hero .cta', { y: -30, opacity: 0.2, ease: 'none' }, 0.1);
  gsap.to('.hero .dots', { yPercent: 18, ease: 'none', scrollTrigger: { trigger: h, start: 'top top', end: 'bottom top', scrub: true } });
}

// Escenas. Cada bloque entra como una diapositiva: primero el titular (con su etiqueta), después el visual y al
// final los datos, siempre con el mismo ritmo (tokens de movimiento: --scene entre capas, --step dentro de una capa).
// Lo que se mueve con el scroll (máscaras de los casos, mesa, pasos fijados) se define más abajo.
const SCENES: [root: string, layers: string[][]][] = [
  ['.wrap > .sh', [['.k', 'h2'], ['p']]],
  ['.case .ctext', [['.k', 'h3'], ['.dl > div'], ['.tags', '.links']]],
  ['.about .bio', [['.k', '.sh h2'], ['p'], ['.cta']]],
  ['.side', [['.box']]],
  ['.free > div:first-child', [['.k', '.sh h2'], ['.free-intro'], ['.yesno > div']]],
  ['.free > form', [[':scope']]],
  ['footer .wrap', [['.k', '.fbig'], ['.fl'], ['.legal']]],
  ['.body article section', [['.k', 'h2'], ['p', '.out li', '.d:not([data-stage])', '.fig', '.metrics > div', '.sub', 'pre']]],
];
const isHead = (e: Element) => /^H[1-6]$/.test(e.tagName) || e.classList.contains('fbig');

function scenes() {
  for (const [rootSel, layers] of SCENES) {
    $$(rootSel).forEach((root) => {
      const tl = guard(root, gsap.timeline({ scrollTrigger: { trigger: root, start: 'top 85%', once: true }, defaults: { ease: EASE } }));
      layers.forEach((sels, i) => {
        const at = i * T.scene;
        const els = sels.flatMap((sel) => (sel === ':scope' ? [root] : $$(sel, root)));
        els.filter(isHead).forEach((h) => head(tl, h, at));
        const rest = els.filter((e) => !isHead(e));
        if (rest.length) tl.from(rest, { y: 28, opacity: 0, duration: T.slow, stagger: T.step }, at);
      });
    });
  }
}

// Titular: entra por líneas con máscara y el punto azul llega el último. Al terminar se deshace la división
// (si cambia el ancho, el texto vuelve a partirse solo) y se marca con data-in: el hilo del punto ya puede acercarse.
function head(tl: gsap.core.Timeline, el: HTMLElement, at: number) {
  glue(el);
  const split = SplitText.create(el, { type: 'lines', mask: 'lines', linesClass: 'ln', aria: 'none' });
  tl.from(split.lines, { yPercent: 110, duration: T.brand, stagger: T.step + 0.01, ease: EASE }, at);
  const dot = $('i', el);
  if (dot) tl.from(dot, { scale: 0, opacity: 0, transformOrigin: '50% 80%', duration: 0.7, ease: 'back.out(3)' }, at + T.brand * 0.6);
  tl.call(() => { split.revert(); el.dataset.in = '1'; }, [], at + T.brand * 0.6 + 0.8);
}

// El punto final va pegado a la última palabra, para que nunca baje solo a otra línea.
function glue(el: HTMLElement) {
  const dot = $('i', el);
  const prev = dot?.previousSibling;
  if (!dot || !prev || prev.nodeType !== Node.TEXT_NODE) return;
  const text = prev.textContent ?? '';
  const cut = text.search(/\S+$/);
  if (cut < 0) return;
  const tail = document.createElement('span');
  tail.style.whiteSpace = 'nowrap';
  tail.textContent = text.slice(cut);
  prev.textContent = text.slice(0, cut);
  dot.replaceWith(tail);
  tail.append(dot);
}

// Página de caso, «Decisiones»: en escritorio la sección se fija y las decisiones pasan una a una,
// con su porqué, mientras unos puntos marcan por cuál vas. En móvil o con poca altura entran como el resto.
function story(wide: boolean) {
  const sec = $('#decisiones');
  const cards = sec ? $$('.dec .d', sec) : [];
  if (!sec || cards.length < 2 || !wide || innerHeight < 680) return;
  cards.forEach((c) => { c.dataset.stage = '1'; });
  sec.classList.add('staged');
  const prog = document.createElement('div');
  prog.className = 'dec-prog';
  prog.setAttribute('aria-hidden', 'true');
  prog.innerHTML = cards.map(() => '<i></i>').join('');
  $('.dec', sec)!.after(prog);
  const dots = $$('i', prog);
  const mark = (n: number) => dots.forEach((d, i) => d.classList.toggle('on', i <= n));
  mark(0);
  gsap.set(cards.slice(1), { opacity: 0, y: 60, scale: 0.98 });
  const last = cards.length - 1;
  const tl = gsap.timeline({
    defaults: { ease: 'none', duration: 0.3 },
    scrollTrigger: {
      trigger: sec, start: () => `top top+=${Math.round(Math.max(110, (innerHeight - sec.offsetHeight) / 2))}`, end: () => `+=${innerHeight * 0.55 * last + 120}`, pin: true, scrub: 0.5, invalidateOnRefresh: true,
      onUpdate: (self) => mark(Math.round(self.progress * last)),
    },
  });
  // Cada decisión entra, se queda y sale antes de que entre la siguiente: nunca hay dos textos superpuestos.
  cards.forEach((c, i) => {
    if (i > 0) tl.to(c, { opacity: 1, y: 0, scale: 1 }, i - 0.5);
    if (i < last) tl.to(c, { opacity: 0, y: -40, scale: 0.97 }, i + 0.2);
  });
  tl.set({}, {}, last + 0.5);
  return () => { prog.remove(); sec.classList.remove('staged'); cards.forEach((c) => { delete c.dataset.stage; }); gsap.set(cards, { clearProps: 'all' }); };
}

// Casos: la máscara se abre con el scroll (el marco sube mientras su contenido se queda quieto)
// y el visual se mueve un poco más lento que el texto.
function cases(wide: boolean) {
  $$('.case').forEach((c) => {
    const mask = $('.reveal', c), vis = $('.vis', c), px = $('.px', c), text = $('.ctext', c);
    if (!mask || !vis) return;
    // Con la máscara abierta del todo, la imagen se puede pulsar (lleva a la página del caso).
    const st = { trigger: c, start: 'top 92%', end: 'top 35%', scrub: 0.5, onUpdate: (self: ScrollTrigger) => c.classList.toggle('is-open', self.progress > 0.98) };
    gsap.timeline({ scrollTrigger: st })
      .fromTo(mask, { yPercent: 100 }, { yPercent: 0, ease: 'none' }, 0)
      .fromTo(vis, { yPercent: -100 }, { yPercent: 0, ease: 'none' }, 0);
    if (px) gsap.fromTo(px, { y: wide ? 60 : 30 }, { y: wide ? -20 : -10, ease: 'none', scrollTrigger: { trigger: c, start: 'top bottom', end: 'bottom top', scrub: true } });
    if (text && wide) gsap.fromTo(text, { y: 40 }, { y: -40, ease: 'none', scrollTrigger: { trigger: c, start: 'top bottom', end: 'bottom top', scrub: true } });
  });
}

// Stack: la cascada de teclas la dispara ScrollTrigger. El giro con el scroll lo calcula
// el propio teclado (scripts/keyboard.ts) para no despertar su bucle fuera de pantalla.
function stack() {
  const host = $('#kbs');
  if (!host) return;
  ScrollTrigger.create({
    trigger: host, start: 'top 70%', once: true,
    onEnter: () => { host.dataset.cascade = 'go'; host.dispatchEvent(new CustomEvent('kb:cascade')); },
  });
  guard(host, gsap.from('#stack .scene', { y: 40, opacity: 0, duration: 1, ease: EASE, scrollTrigger: { trigger: host, start: 'top 80%', once: true } }));
}

// Cómo trabajo: en escritorio la sección se fija y los tres pasos pasan en horizontal,
// con una barra de progreso en azul señal. En móvil, los pasos entran uno a uno.
function how(wide: boolean) {
  const box = $('.how');
  if (!box) return;
  const steps = $$('.step', box);
  const labels = $$('.how-prog span', box);
  const list = $('.steps', box)!;
  const figs = steps.map((s) => $('.rv', s));
  if (!wide) {
    steps.forEach((s, i) => {
      guard(s, gsap.from(s, { y: 40, opacity: 0, duration: 0.9, ease: EASE, scrollTrigger: { trigger: s, start: 'top 88%', once: true } }));
      // Cada ilustración avanza mientras su paso cruza la pantalla.
      const st = ScrollTrigger.create({ trigger: s, start: 'top 80%', end: 'bottom 50%', onUpdate: (self) => piece(figs[i], self.progress) });
      piece(figs[i], st.progress);
    });
    return () => figs.forEach((f) => piece(f, 1));
  }
  box.classList.add('pinned');
  const setActive = (i: number) => {
    steps.forEach((s, j) => s.classList.toggle('on', j === i));
    labels.forEach((l, j) => l.classList.toggle('on', j <= i));
  };
  setActive(0);
  const dist = () => Math.max(0, list.scrollWidth - box.clientWidth + 64);
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: box, start: 'top top+=96', end: () => `+=${innerHeight * 1.1}`, pin: true, scrub: 0.6,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        setActive(Math.min(steps.length - 1, Math.floor(self.progress * steps.length * 0.999)));
        // Los pasos 1 y 2 se ven desde el principio: cada ilustración se completa en su tramo del recorrido.
        figs.forEach((f, i) => piece(f, (self.progress - RANGES[i][0]) / (RANGES[i][1] - RANGES[i][0])));
      },
    },
  });
  figs.forEach((f) => piece(f, 0));
  tl.to(list, { x: () => -dist(), ease: 'none' }, 0).to('.how-prog b', { scaleX: 1, ease: 'none' }, 0);
  return () => { box.classList.remove('pinned'); steps.forEach((s) => s.classList.remove('on')); figs.forEach((f) => piece(f, 1)); };
}

// Tramo del recorrido (0 a 1) en el que se completa la ilustración de cada paso.
const RANGES = [[0.02, 0.42], [0.25, 0.65], [0.5, 0.92]];

// Envía el progreso (0 a 1) a una pieza de Rive; scripts/rive.ts lo escribe en su view model.
function piece(el: Element | null | undefined, p: number) {
  if (!el) return;
  const v = Math.min(1, Math.max(0, p));
  const last = (el as HTMLElement).dataset.p;
  if (last !== undefined && Math.abs(Number(last) - v) < 0.002) return;
  (el as HTMLElement).dataset.p = String(v);
  el.dispatchEvent(new CustomEvent('rive:progress', { detail: v }));
}

// Cinta de tecnologías: solo se mueve mientras se hace scroll (no se anima sola).
function tape() {
  const run = $('.tape-run');
  if (!run) return;
  gsap.fromTo(run, { xPercent: 0 }, { xPercent: -50, ease: 'none', scrollTrigger: { trigger: '.tape', start: 'top bottom', end: 'bottom top', scrub: 0.4 } });
}

// Pie: «Ayman.» en contorno se rellena con el scroll y termina con el punto azul encendido.
// El relleno es una capa que entra desde la izquierda mientras su texto se queda quieto.
function footer() {
  const g = $('.giant');
  if (!g) return;
  const tl = gsap.timeline({ scrollTrigger: { trigger: g, start: 'top 95%', end: 'bottom bottom', scrub: 0.5 } });
  tl.fromTo('.g-fill', { xPercent: -100 }, { xPercent: 0, ease: 'none', duration: 1 }, 0)
    .fromTo('.g-fill-in', { xPercent: 100 }, { xPercent: 0, ease: 'none', duration: 1 }, 0)
    .fromTo('.g-dot', { scale: 0.2, opacity: 0 }, { scale: 1, opacity: 1, ease: 'back.out(3)', duration: 0.25 }, 0.85);
}

// Etiquetas mono que se descifran al entrar. Las que ya están a la vista al arrancar se quedan como están.
function labels() {
  const groups = new Map<Element, number>();
  $$('.k, .dl dt, .d dt, .meta dt').forEach((el) => {
    if (el.children.length || el.getBoundingClientRect().top < innerHeight * 0.92) return;
    const n = groups.get(el.parentElement!) ?? 0;
    groups.set(el.parentElement!, n + 1);
    ScrollTrigger.create({ trigger: el, start: 'top 92%', once: true, onEnter: () => scramble(el, T.scramble, n * T.step) });
  });
}

// Botones magnéticos: el principal y «Hablemos» siguen un poco al puntero.
function magnetic() {
  $$('[data-magnetic]').forEach((b) => {
    b.style.transition = 'background .2s';
    const xTo = gsap.quickTo(b, 'x', { duration: 0.5, ease: 'power3.out' });
    const yTo = gsap.quickTo(b, 'y', { duration: 0.5, ease: 'power3.out' });
    b.addEventListener('pointermove', (e) => {
      const r = b.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * 0.28);
      yTo((e.clientY - (r.top + r.height / 2)) * 0.38);
    });
    b.addEventListener('pointerleave', () => { xTo(0); yTo(0); });
  });
}
