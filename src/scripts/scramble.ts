// Etiquetas mono que se «descifran»: pasan por caracteres aleatorios hasta su texto (unos 300 ms).
// El texto real queda en el DOM (en un span oculto a la vista) mientras dura el efecto, así que el
// lector de pantalla lo lee igual. El ancho no cambia: son etiquetas en JetBrains Mono.
const SET = 'abcdefghijklmnopqrstuvwxyz0123456789/_<>#=+';

export function scramble(el: HTMLElement, ms: number, delay = 0) {
  if (el.dataset.scr || el.children.length) return;
  const text = el.textContent ?? '';
  if (!text.trim()) return;
  el.dataset.scr = '1';
  const real = document.createElement('span');
  real.className = 'sr-only';
  real.textContent = text;
  const fx = document.createElement('span');
  fx.setAttribute('aria-hidden', 'true');
  const chars = [...text];
  const paint = (p: number) => {
    const done = Math.floor(p * chars.length);
    fx.textContent = chars.map((c, i) => (i < done || /[\s]/.test(c) ? c : SET[(Math.random() * SET.length) | 0])).join('');
  };
  paint(0);
  el.textContent = '';
  el.append(real, fx);
  const t0 = performance.now() + delay * 1000;
  const step = (t: number) => {
    const p = Math.min(1, Math.max(0, (t - t0) / (ms * 1000)));
    if (p >= 1) { el.textContent = text; return; }
    paint(p);
    requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
