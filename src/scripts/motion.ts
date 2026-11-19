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

// Para no pagar el coste en la carga, las animaciones arrancan con el primer gesto del visitante
// (o a los 8 s, o si se llega con un ancla o con la página ya desplazada).
function arm() {
  const events = ['scroll', 'wheel', 'touchstart', 'keydown', 'pointerdown', 'pointermove'];
  let done = false;
  const go = () => {
    if (done) return;
    done = true;
    events.forEach((e) => removeEventListener(e, go));
    start();
  };
  if (scrollY > 40 || location.hash) return go();
  events.forEach((e) => addEventListener(e, go, { passive: true }));
  setTimeout(go, 8000);
}

if (!reduce.matches) {
  if (document.readyState === 'complete') arm();
  else addEventListener('load', arm, { once: true });
}
export {};
