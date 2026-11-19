// Película del taller: el scroll elige el fotograma. Los fotogramas se descargan solo cuando la escena
// se acerca a la pantalla y el dibujo se hace en un canvas, como mucho una vez por fotograma de pantalla.
const sec = document.querySelector<HTMLElement>('.taller');
const motion = document.documentElement.classList.contains('js-motion');

if (sec && motion) {
  const n = Number(sec.dataset.frames) || 1;
  const img = sec.querySelector<HTMLImageElement>('.taller-img')!;
  const cv = sec.querySelector<HTMLCanvasElement>('.taller-cv')!;
  const ctx = cv.getContext('2d');
  const notes = [...sec.querySelectorAll<HTMLElement>('.taller-notes li')];
  const frames: (HTMLImageElement | null)[] = Array(n).fill(null);
  const src = (i: number) => `/img/taller/${String(i).padStart(2, '0')}.webp`;
  let raf = 0, current = -1, loading = false, w = 0, h = 0;

  const fit = () => {
    const dpr = Math.min(2, devicePixelRatio || 1);
    w = cv.clientWidth; h = cv.clientHeight;
    cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
    current = -1; draw();
  };
  const progress = () => {
    const r = sec.getBoundingClientRect();
    const span = sec.offsetHeight - innerHeight;
    return span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 1;
  };
  const draw = () => {
    raf = 0;
    const p = progress();
    notes.forEach((li, i) => li.classList.toggle('on', p >= 0.12 + i * 0.28));
    if (!ctx || !w) return;
    let i = Math.round(p * (n - 1));
    while (i > 0 && !frames[i]) i--; // si aún no ha llegado, el anterior que haya
    const f = frames[i];
    if (!f || i === current) return;
    current = i;
    // Encuadre «cover» con un poco de zoom en pantallas estrechas, para que la maqueta llene la tarjeta.
    const z = w < 600 ? 1.3 : 1;
    const ca = cv.width / cv.height, fa = f.naturalWidth / f.naturalHeight;
    let sw = f.naturalWidth, sh = f.naturalHeight;
    if (ca > fa) sh = sw / ca; else sw = sh * ca;
    sw /= z; sh /= z;
    ctx.drawImage(f, (f.naturalWidth - sw) / 2, (f.naturalHeight - sh) / 2, sw, sh, 0, 0, cv.width, cv.height);
    cv.classList.add('ready');
  };
  const load = () => {
    if (loading) return;
    loading = true;
    // Primero el fotograma inicial y luego el resto en orden.
    for (let i = 0; i < n; i++) {
      const im = new Image();
      im.decoding = 'async';
      im.onload = () => { frames[i] = im; if (!raf) raf = requestAnimationFrame(draw); };
      im.src = src(i);
    }
  };
  sec.classList.add('scrub');
  img.loading = 'eager';
  new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) load(); }, { rootMargin: '120% 0px' }).observe(sec);
  addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(draw); }, { passive: true });
  new ResizeObserver(fit).observe(cv);
}
export {};
