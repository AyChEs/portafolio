// Microdetalles: el brillo del botón principal sigue al ratón dentro del botón.
// Solo con puntero fino y sin «reducir movimiento»; el resto es CSS.
if (matchMedia('(hover: hover) and (pointer: fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  let raf = 0;
  document.addEventListener('pointermove', (e) => {
    const b = (e.target as Element | null)?.closest?.<HTMLElement>('.btn.p');
    if (!b) return;
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const r = b.getBoundingClientRect();
      b.style.setProperty('--mx', `${e.clientX - r.left}px`);
      b.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  }, { passive: true });
}
export {};
