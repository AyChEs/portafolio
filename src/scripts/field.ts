// Fondo vivo del Inicio: la retícula de puntos y las cintas de luz, dibujadas en canvas 2D.
//  - Los puntos forman tres capas de profundidad: las lejanas se mueven más despacio con el scroll.
//  - Reaccionan al cursor como un campo de fuerza suave (se apartan y se encienden en azul señal),
//    ondulan con el scroll y un haz azul los recorre de vez en cuando. En táctil responden al toque,
//    al arrastre y al scroll, con menos puntos.
//  - Las cintas fluyen con el tiempo y se deforman con el scroll; dos destellos las recorren.
//  - Se pausa con la pestaña oculta y las cintas, fuera de pantalla. Con «reducir movimiento» no arranca:
//    se queda la retícula estática de CSS. Solo usa canvas 2D: la CSP no cambia.
const reduce = matchMedia('(prefers-reduced-motion: reduce)');
const light = matchMedia('(prefers-color-scheme: light)');
const coarse = matchMedia('(pointer: coarse)');

type Layer = { gap: number; r: number; a: number; speed: number; amp: number; push: number };
const css = (n: string) => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

export function boot() {
  if (reduce.matches) return;
  const dots = document.getElementById('field') as HTMLCanvasElement | null;
  const rib = document.getElementById('field-ribbons') as HTMLCanvasElement | null;
  const hero = document.querySelector<HTMLElement>('.hero');
  const dctx = dots?.getContext('2d', { alpha: true });
  const rctx = rib?.getContext('2d', { alpha: true });
  if (!dots || !dctx || !hero) return;

  const touch = coarse.matches;
  // Capas: gap entre puntos, radio, opacidad relativa, velocidad con el scroll (1 = como la página),
  // amplitud de la onda y fuerza con la que se apartan del cursor.
  const layers: Layer[] = touch
    ? [{ gap: 52, r: 0.9, a: 0.6, speed: 0.12, amp: 0.8, push: 0.5 }, { gap: 36, r: 1.1, a: 1, speed: 0.32, amp: 1.2, push: 1 }]
    : [{ gap: 40, r: 0.8, a: 0.6, speed: 0.12, amp: 0.7, push: 0.4 }, { gap: 24, r: 1.05, a: 1, speed: 0.3, amp: 1.1, push: 1 }, { gap: 78, r: 1.9, a: 0.9, speed: 0.62, amp: 1.6, push: 1.6 }];

  let W = 0, H = 0, dpr = 1;
  let rw = 0, rh = 0;
  let sig = '#3B82F6', base = '147,197,253', baseA = 0.17, ribOp = 0.9;
  let px = -999, py = -999, tx = -999, ty = -999; // cursor suavizado y objetivo
  let vel = 0, lastY = scrollY, lastMove = 0, lastScroll = 0;
  const ripples: { x: number; y: number; t: number }[] = [];
  let vignette: CanvasGradient | null = null;
  let heroOn = true, hidden = document.hidden, raf = 0, ready = 0, frame = 0;

  const palette = () => {
    const l = light.matches;
    sig = l ? '#2563EB' : '#3B82F6';
    base = l ? '20,33,61' : '147,197,253';
    baseA = l ? 0.3 : 0.3;
    ribOp = parseFloat(css('--ribbon-op')) || 0.9;
  };
  const fit = () => {
    dpr = Math.min(touch ? 1.5 : 2, devicePixelRatio || 1);
    W = dots.clientWidth; H = dots.clientHeight; vignette = null;
    dots.width = Math.round(W * dpr); dots.height = Math.round(H * dpr);
    if (rib) { rw = rib.clientWidth; rh = rib.clientHeight; rib.width = Math.round(rw * dpr); rib.height = Math.round(rh * dpr); }
  };

  const drawDots = (t: number, sy: number) => {
    const c = dctx;
    c.setTransform(dpr, 0, 0, dpr, 0, 0);
    c.clearRect(0, 0, W, H);
    const fade = 1 - 0.45 * clamp(sy / 1100) * 1; // el Inicio es el más vivo; más abajo la retícula se calma
    const A = 0.4 + 2.4 * vel; // la onda crece con la velocidad del scroll
    const R = touch ? 110 : 150, R2 = R * R, P = touch ? 12 : 16;
    const head = ((t * 0.13) % (W + 900)) - 300; // haz que recorre la retícula en diagonal
    const lit: number[] = [];
    const ramp = clamp(ready);
    for (const L of layers) {
      const off = (sy * L.speed) % L.gap;
      const cols = Math.ceil(W / L.gap) + 2, rows = Math.ceil(H / L.gap) + 2;
      c.fillStyle = `rgba(${base},${(baseA * L.a * fade * ramp).toFixed(3)})`;
      c.beginPath();
      for (let j = -1; j < rows; j++) {
        const y0 = j * L.gap - off;
        for (let i = -1; i < cols; i++) {
          const x0 = i * L.gap;
          // onda: depende de la posición, del scroll acumulado y de un poco de tiempo
          const ph = x0 / 150 + y0 / 190 + t * 0.55 + sy * 0.0035 * L.speed * 6;
          let x = x0 + Math.cos(ph * 1.3) * A * L.amp * 0.6;
          let y = y0 + Math.sin(ph) * A * L.amp;
          let g = 0;
          // haz ambiental
          const u = (x0 + y0 * 0.35 - head) / 120;
          if (u > -2.4 && u < 2.4) g += 0.5 * (1 - (u * u) / 5.76) ** 2;
          // cursor
          const dx = x - px, dy = y - py, d2 = dx * dx + dy * dy;
          if (d2 < R2) {
            const d = Math.sqrt(d2) || 1, k = 1 - d / R, s = k * k * (3 - 2 * k);
            x += (dx / d) * s * P * L.push; y += (dy / d) * s * P * L.push; g += s;
          }
          for (const r of ripples) {
            const rd = Math.hypot(x - r.x, y - r.y), ring = (t - r.t) * 420, w = 70;
            const e = 1 - Math.abs(rd - ring) / w;
            if (e > 0) { const s = e * e * clamp(1 - (t - r.t) / 1.6); g += s; x += ((x - r.x) / (rd || 1)) * s * 9; y += ((y - r.y) / (rd || 1)) * s * 9; }
          }
          if (g > 0.05) lit.push(x, y, Math.min(1, g) * L.a, L.r);
          else c.rect(x - L.r, y - L.r, L.r * 2, L.r * 2);
        }
      }
      c.fill();
    }
    c.fillStyle = sig;
    for (let n = 0; n < lit.length; n += 4) {
      const g = lit[n + 2], r = lit[n + 3] * (1 + g * 0.9);
      c.globalAlpha = (0.2 + 0.75 * g) * fade * ramp;
      c.fillRect(lit[n] - r, lit[n + 1] - r, r * 2, r * 2);
    }
    c.globalAlpha = 1;
    // Viñeta: el campo se desvanece hacia los bordes (sin bandas), dibujada aquí para no usar máscara CSS.
    c.globalCompositeOperation = 'destination-in';
    c.fillStyle = vignette ??= (() => {
      const g = c.createRadialGradient(W * 0.32, H * 0.36, 0, W * 0.32, H * 0.36, Math.hypot(W, H) * 0.62);
      g.addColorStop(0.2, 'rgba(0,0,0,1)'); g.addColorStop(1, 'rgba(0,0,0,.42)');
      return g;
    })();
    c.fillRect(0, 0, W, H);
    c.globalCompositeOperation = 'source-over';
  };

  // Cintas: las mismas 11 del HTML (coordenadas de 1440 x 380), ahora vivas.
  const drawRibbons = (t: number, sy: number) => {
    const c = rctx!;
    c.setTransform(dpr, 0, 0, dpr, 0, 0);
    c.clearRect(0, 0, rw, rh);
    const sx = rw / 1440, syy = rh / 380;
    const flow = t * 0.32 + sy * 0.0034;
    const gr = c.createLinearGradient(0, 0, rw, 0);
    gr.addColorStop(0, '#1d4ed8'); gr.addColorStop(0.5, '#60a5fa'); gr.addColorStop(1, '#1d4ed8');
    const bend = 1 + vel * 1.4;
    const ramp = clamp(ready);
    c.lineCap = 'round'; c.lineJoin = 'round';
    for (let i = 0; i < 11; i++) {
      const y0 = 120 + i * 20 + sy * 0.03 * (i - 5), amp = (24 + i * 3) * bend, ph = i * 0.35;
      const pts: number[] = [];
      for (let x = -40; x <= 1480; x += 40) {
        const y = y0 + amp * Math.sin(x / 260 + ph + flow) + 10 * Math.sin(x / 90 + ph * 2 + flow * 1.6) + 7 * Math.sin(x / 520 - flow * 0.7 + i);
        pts.push(x * sx, y * syy);
      }
      const sp = i === 4 || i === 7;
      const path = (from: number, to: number) => {
        c.beginPath(); c.moveTo(pts[from * 2], pts[from * 2 + 1]);
        for (let k = from + 1; k <= to; k++) {
          const mx = (pts[k * 2 - 2] + pts[k * 2]) / 2, my = (pts[k * 2 - 1] + pts[k * 2 + 1]) / 2;
          c.quadraticCurveTo(pts[k * 2 - 2], pts[k * 2 - 1], mx, my);
        }
      };
      const n = pts.length / 2 - 1;
      c.strokeStyle = gr;
      c.globalAlpha = (0.16 + 0.05 * (5 - Math.abs(5 - i))) * ribOp * ramp * 1.15;
      c.lineWidth = sp ? 2.2 : 1.4;
      path(0, n); c.stroke();
      if (sp) {
        // destello: un tramo corto más claro que recorre la cinta
        const u = ((t * (i === 4 ? 0.1 : 0.075) + (i === 4 ? 0 : 0.5)) % 1.25) - 0.1;
        const head = Math.round(u * n);
        c.strokeStyle = '#93c5fd'; c.lineWidth = 3;
        for (let s = 0; s < 3; s++) {
          const a = head - 8 + s * 3, b = Math.min(n, head - 5 + s * 3);
          if (b < 1 || a > n) continue;
          c.globalAlpha = (0.2 + s * 0.3) * ribOp * ramp;
          path(Math.max(0, a), b); c.stroke();
        }
      }
    }
    c.globalAlpha = 1;
  };

  // Regulador: si dibujar cuesta demasiado (móvil lento, sin GPU), baja de calidad por pasos y, en último
  // caso, devuelve el fondo a la retícula y las cintas estáticas de CSS.
  let cost = 0, level = 0, lastLevelAt = 0;
  const govern = (ms: number, now: number) => {
    cost += (ms - cost) * 0.1;
    if (now - lastLevelAt < 1200 || level >= 3) return;
    const next = cost > 22 ? level + 1 : cost > 11 && level < 1 ? 1 : level;
    if (next === level) return;
    level = next; lastLevelAt = now;
    if (level === 2) layers.splice(0, layers.length, layers[Math.min(1, layers.length - 1)]);
    if (level === 3) { hidden = true; cancelAnimationFrame(raf); raf = 0; document.documentElement.classList.remove('field-on'); dctx.clearRect(0, 0, W, H); rctx?.clearRect(0, 0, rw, rh); }
  };

  let t0 = 0;
  const tick = (now: number) => {
    raf = 0;
    if (hidden) return;
    if (!t0) t0 = now;
    const t = (now - t0) / 1000;
    const sy = scrollY;
    // En reposo (sin cursor ni scroll desde hace 3 s) se dibuja a la mitad de cuadros.
    const idle = now - lastMove > 3000 && now - lastScroll > 3000;
    frame++;
    raf = requestAnimationFrame(tick);
    if ((idle || level >= 1) && frame % 2) return;
    const s0 = performance.now();
    vel += (clamp(Math.abs(sy - lastY) / 38, 0, 1.5) - vel) * 0.12;
    if (Math.abs(sy - lastY) > 0.5) lastScroll = now;
    lastY = sy;
    px += (tx - px) * 0.2; py += (ty - py) * 0.2;
    ready = Math.min(1, ready + 0.03);
    while (ripples.length && t - ripples[0].t > 1.6) ripples.shift();
    drawDots(t, sy);
    if (rctx && rib && heroOn && (level < 2 || frame % 4 < 2)) drawRibbons(t, sy);
    govern(performance.now() - s0, now);
  };
  const run = () => { if (!raf && !hidden) raf = requestAnimationFrame(tick); };

  const move = (x: number, y: number) => { tx = x; ty = y; lastMove = performance.now(); if (px < -500) { px = x; py = y; } };
  addEventListener('pointermove', (e) => { if (e.pointerType !== 'touch') move(e.clientX, e.clientY); }, { passive: true });
  addEventListener('pointerleave', () => { tx = ty = -999; });
  document.documentElement.addEventListener('mouseleave', () => { tx = ty = -999; });
  addEventListener('pointerdown', (e) => { ripples.push({ x: e.clientX, y: e.clientY, t: (performance.now() - t0) / 1000 }); }, { passive: true });
  addEventListener('touchstart', (e) => { const p = e.touches[0]; move(p.clientX, p.clientY); }, { passive: true });
  addEventListener('touchmove', (e) => { const p = e.touches[0]; move(p.clientX, p.clientY); }, { passive: true });
  addEventListener('touchend', () => { tx = ty = -999; });
  document.addEventListener('visibilitychange', () => { hidden = document.hidden; if (hidden) { cancelAnimationFrame(raf); raf = 0; } else run(); });
  new IntersectionObserver((es) => { heroOn = es.some((e) => e.isIntersecting); }, { rootMargin: '100px' }).observe(hero);
  new ResizeObserver(() => { fit(); }).observe(dots);
  light.addEventListener('change', palette);
  reduce.addEventListener('change', () => { if (reduce.matches) { cancelAnimationFrame(raf); raf = 0; hidden = true; document.documentElement.classList.remove('field-on'); dctx.clearRect(0, 0, W, H); rctx?.clearRect(0, 0, rw, rh); } });

  palette(); fit();
  run();
  // La retícula y las cintas estáticas de CSS dejan paso cuando el canvas ya dibuja.
  setTimeout(() => document.documentElement.classList.add('field-on'), 450);
}
