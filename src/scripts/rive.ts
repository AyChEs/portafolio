// Piezas de Rive (ilustraciones vectoriales en rive/, construidas en public/rive/).
// Cada pieza (`[data-rive]`) lleva una imagen fija de reserva y un <canvas aria-hidden>:
//  - el runtime se descarga con import() solo cuando la pieza se acerca a la pantalla;
//  - el progreso (0 a 1) entra por el evento `rive:progress` (lo envía ScrollTrigger en
//    scripts/motion-core.ts) y se escribe en la propiedad numérica `progress` del view model;
//  - sin progreso enviado (movimiento reducido, o las animaciones no cargan) se muestra el
//    estado final; si el runtime no carga, se queda la imagen fija.
// Los colores del view model siguen al modo claro u oscuro del sistema.
type RiveMod = typeof import('./rive-runtime');
type Vmi = NonNullable<InstanceType<RiveMod['Rive']>['viewModelInstance']>;

const COLORS = {
  dark: { ink: 'F3F4F1', mut: '98A2B6', line: '2A3B61', surf: '14213D', sig: '3B82F6', lab: '93C5FD', onSig: '04060F' },
  light: { ink: '0F1626', mut: '4A5468', line: 'C6CEDC', surf: 'E6EBF4', sig: '2563EB', lab: '1D4ED8', onSig: 'FFFFFF' },
};
const reduce = matchMedia('(prefers-reduced-motion: reduce)');
const light = matchMedia('(prefers-color-scheme: light)');
let runtime: Promise<RiveMod> | undefined;
const loadRuntime = () => (runtime ??= import('./rive-runtime'));
const mounted = new Set<() => void>();

function mount(host: HTMLElement) {
  const canvas = host.querySelector('canvas');
  if (!canvas || !host.dataset.rive) return;
  const manual = host.dataset.mode === 'manual'; // el formulario: JS lleva el progreso de -1 a 1 con una transición
  let rive: InstanceType<RiveMod['Rive']> | null = null;
  let vmi: Vmi | null = null;
  let want = Number(host.dataset.p ?? (manual ? 0 : 1)); // 0 a 1; por defecto, estado final
  let shown = want;
  let raf = 0;
  let visible = false;

  const write = (p: number) => {
    shown = p;
    const n = vmi?.number('progress');
    if (n) n.value = p * 2 - 1;
  };
  const paint = () => {
    if (!vmi) return;
    const pal = light.matches ? COLORS.light : COLORS.dark;
    for (const [k, v] of Object.entries(pal)) {
      const c = vmi.color(k);
      if (c) c.value = parseInt('FF' + v, 16) >>> 0;
    }
    settle();
  };
  // Con movimiento reducido no hay bucle: se dibuja un fotograma y se para.
  const settle = () => {
    if (!rive || !reduce.matches) return;
    rive.play();
    setTimeout(() => rive?.pause(), 140);
  };
  const apply = () => {
    if (!vmi) return;
    if (!manual || reduce.matches) { cancelAnimationFrame(raf); write(want); settle(); return; }
    // Transición del formulario: el punto se vuelve ✓ (o vuelve a ser punto) en unos 0,9 s.
    cancelAnimationFrame(raf);
    const from = shown, t0 = performance.now(), dur = 900 * Math.abs(want - from);
    const step = (t: number) => {
      const k = dur ? Math.min(1, (t - t0) / dur) : 1;
      write(from + (want - from) * k);
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
  };
  const fit = () => { rive?.resizeDrawingSurfaceToCanvas(); settle(); };

  host.addEventListener('rive:progress', (e) => { want = (e as CustomEvent<number>).detail; host.dataset.p = String(want); apply(); });
  host.addEventListener('rive:to', (e) => { want = (e as CustomEvent<number>).detail; host.dataset.state = want >= 1 ? 'ok' : ''; apply(); });

  const start = async () => {
    try {
      const m = await loadRuntime();
      const live = !reduce.matches;
      rive = new m.Rive({
        src: host.dataset.rive!,
        canvas,
        autoplay: true,
        autoBind: true,
        stateMachine: 'Main',
        layout: new m.Layout({ fit: m.Fit.Contain, alignment: m.Alignment.Center }),
        onLoad: () => {
          vmi = rive!.viewModelInstance as Vmi | null;
          if (!vmi) return;
          const l = vmi.boolean('live');
          if (l) l.value = live;
          write(manual ? (want >= 1 ? 1 : 0) : want);
          fit(); paint();
          // Dos fotogramas después, con ya algo dibujado, la imagen fija deja paso al canvas.
          requestAnimationFrame(() => requestAnimationFrame(() => host.classList.add('ready')));
        },
        onLoadError: () => host.classList.remove('ready'),
      });
    } catch { /* se queda la imagen fija */ }
  };

  let started = false;
  const io = new IntersectionObserver((es) => {
    for (const e of es) {
      visible = e.isIntersecting;
      if (visible && !started) { started = true; start(); }
      else if (rive) { if (visible && !reduce.matches) rive.play(); else if (!visible) rive.pause(); }
    }
  }, { rootMargin: '400px 400px' });
  io.observe(host);
  new ResizeObserver(fit).observe(host);
  mounted.add(paint);
}

function boot() {
  if (!('IntersectionObserver' in window)) return;
  const hosts = document.querySelectorAll<HTMLElement>('[data-rive]');
  if (!hosts.length) return;
  hosts.forEach(mount);
  const repaint = () => mounted.forEach((f) => f());
  light.addEventListener('change', repaint);
  reduce.addEventListener('change', repaint);
}
boot();
export {};
