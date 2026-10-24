// Carga diferida de las animaciones ligadas al scroll (GSAP, ScrollTrigger, SplitText y Lenis).
// Con «reducir movimiento» no se descarga nada: la web se queda en su estado final, sin Lenis ni pins.
const reduce = matchMedia('(prefers-reduced-motion: reduce)');

function start() {
  if (reduce.matches) return;
  import('./motion-core')
    .then((m) => m.init())
    .catch((err) => {
      // Si algo falla, el contenido se queda visible tal cual.
      document.documentElement.classList.remove('js-motion');
      console.warn('Animaciones no disponibles:', err);
    });
}

function whenIdle() {
  const ric = (window as any).requestIdleCallback as ((cb: () => void, o?: { timeout: number }) => number) | undefined;
  if (ric) ric(start, { timeout: 900 });
  else setTimeout(start, 200);
}

if (!reduce.matches) {
  if (document.readyState === 'complete') whenIdle();
  else addEventListener('load', whenIdle, { once: true });
}
export {};
