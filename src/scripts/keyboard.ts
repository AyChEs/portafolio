// @ts-nocheck
// Teclado mecánico en 3D (Three.js). Se carga solo cuando la sección se acerca a la
// pantalla (ver components/Stack.astro); si no hay WebGL, se queda el teclado en CSS.
import * as THREE from 'three';

type Key = { id: string; label?: string; note?: string; kind?: string; w?: number; mono?: string; img?: string };

export function boot(host: HTMLElement) {
  const canvas = host.querySelector<HTMLCanvasElement>('canvas')!;
  const tip = host.querySelector<HTMLElement>('.kb-tip')!;
  const ROWS: Key[][] = JSON.parse(host.querySelector('script[type="application/json"]')!.textContent!);
  const LAMBDA = host.dataset.lambda!;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const narrow = () => innerWidth <= 760;
  return run().catch((err) => { host.classList.remove('gl-on'); console.warn('Teclado 3D no disponible:', err); });

  async function run() {
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) return;
    host.classList.add('gl-on');
    await document.fonts.ready;

    const renderer = new THREE.WebGLRenderer({ canvas, context: gl, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(26, 1, 0.1, 100);

    // Luces: principal cálida-neutra, cielo/suelo y un contraluz azul de la marca
    scene.add(new THREE.HemisphereLight(0xe6edff, 0x0b1430, 0.85));
    const sun = new THREE.DirectionalLight(0xffffff, 2.4);
    sun.position.set(-5, 11, 7);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    Object.assign(sun.shadow.camera, { left: -7, right: 7, top: 5, bottom: -5, near: 1, far: 30 });
    sun.shadow.radius = 4;
    sun.shadow.bias = -0.0004;
    scene.add(sun);
    const rim = new THREE.PointLight(0x3b82f6, 30, 18, 1.6);
    rim.position.set(3, 1.5, -4);
    scene.add(rim);

    const kb = new THREE.Group();
    scene.add(kb);

    // Forma de rectángulo redondeado
    const rrect = (w, d, r) => {
      const s = new THREE.Shape(), x = -w / 2, y = -d / 2;
      s.moveTo(x + r, y); s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r);
      s.lineTo(x + w, y + d - r); s.quadraticCurveTo(x + w, y + d, x + w - r, y + d);
      s.lineTo(x + r, y + d); s.quadraticCurveTo(x, y + d, x, y + d - r);
      s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y);
      return s;
    };

    // Medidas: 1 unidad = una tecla (incluye la separación)
    const COLS = 8, NROWS = ROWS.length, GAP = 0.09, CAP_H = 0.46, PAD = 0.24;
    const W = COLS + PAD * 2, D = NROWS + PAD * 2;

    // Carcasa: base, bandeja interior y paredes
    const caseMat = new THREE.MeshStandardMaterial({ color: 0x14213d, roughness: 0.42, metalness: 0.35 });
    const base = new THREE.Mesh(new THREE.ExtrudeGeometry(rrect(W, D, 0.42), { depth: 0.34, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.05, bevelSegments: 4, curveSegments: 12 }), caseMat);
    base.rotation.x = -Math.PI / 2; base.position.y = -0.38; base.castShadow = base.receiveShadow = true;
    kb.add(base);
    const wallShape = rrect(W, D, 0.42);
    wallShape.holes.push(rrect(W - 0.2, D - 0.2, 0.32));
    const wall = new THREE.Mesh(new THREE.ExtrudeGeometry(wallShape, { depth: 0.16, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.03, bevelSegments: 3, curveSegments: 12 }), caseMat);
    wall.rotation.x = -Math.PI / 2; wall.position.y = 0.0; wall.castShadow = wall.receiveShadow = true;
    kb.add(wall);
    const plate = new THREE.Mesh(new THREE.PlaneGeometry(W - 0.2, D - 0.2), new THREE.MeshStandardMaterial({ color: 0x0a1226, roughness: 0.8 }));
    plate.rotation.x = -Math.PI / 2; plate.position.y = 0.0; plate.receiveShadow = true;
    kb.add(plate);

    // Suelo que solo recibe la sombra
    const ground = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), new THREE.ShadowMaterial({ opacity: 0.35 }));
    ground.rotation.x = -Math.PI / 2; ground.position.y = -0.45; ground.receiveShadow = true;
    scene.add(ground);

    // Tecla esculpida: rectángulo redondeado extruido que se estrecha hacia arriba
    const capGeo = new Map();
    function capGeometry(w) {
      if (capGeo.has(w)) return capGeo.get(w);
      const g = new THREE.ExtrudeGeometry(rrect(w - GAP, 1 - GAP, 0.13), { depth: CAP_H, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.05, bevelSegments: 4, curveSegments: 10 });
      g.rotateX(-Math.PI / 2);
      const p = g.attributes.position;
      for (let i = 0; i < p.count; i++) {
        const y = p.getY(i), k = 1 - 0.16 * Math.max(0, y) / CAP_H;
        p.setX(i, p.getX(i) * (1 - (1 - k) * (1 / w) * 1.0)); // en las anchas, el estrechamiento es menor en X
        p.setZ(i, p.getZ(i) * k);
      }
      g.computeVertexNormals();
      capGeo.set(w, g);
      return g;
    }

    // Textura de la cara superior: logotipo a color y nombre
    const loadImg = src => new Promise(res => { const i = new Image(); i.onload = () => res(i); i.onerror = () => res(null); i.src = src; });
    const lam = new Path2D(LAMBDA);
    async function topTexture(key, w) {
      const S = 256, cw = Math.round(S * Math.min(w, 4)), c = document.createElement('canvas');
      c.width = cw; c.height = S;
      const x = c.getContext('2d');
      const r = 44;
      x.beginPath(); x.roundRect(2, 2, cw - 4, S - 4, r);
      const gr = x.createLinearGradient(0, 0, 0, S);
      if (key.kind === 'acc') { gr.addColorStop(0, '#4B8BF7'); gr.addColorStop(1, '#2563EB'); }
      else { gr.addColorStop(0, '#FBFCFE'); gr.addColorStop(1, '#E6EAF1'); }
      x.fillStyle = gr; x.fill();
      if (key.kind === 'acc') {
        x.save(); x.translate(cw / 2 - 52, 70); x.scale(1.08, 1.08); x.fillStyle = '#fff'; x.fill(lam); x.restore();
      } else if (key.kind === 'space') {
        x.fillStyle = '#2563EB'; x.fillRect(cw - 150, 168, 84, 16);
      } else if (key.img) {
        const im = await loadImg(key.img);
        if (im) { const s = 128, ar = im.width / im.height || 1, iw = ar >= 1 ? s : s * ar, ih = ar >= 1 ? s / ar : s; x.drawImage(im, cw / 2 - iw / 2, 96 - ih / 2, iw, ih); }
      } else if (key.mono) {
        x.fillStyle = '#14213D'; x.font = '800 54px ui-monospace, Menlo, monospace'; x.textAlign = 'center'; x.fillText(key.mono, cw / 2, 112);
      }
      if (key.label) { x.fillStyle = '#14213D'; x.font = '700 31px "Plus Jakarta Sans Variable", system-ui, sans-serif'; x.textAlign = 'center'; x.fillText(key.label, cw / 2, 214); }
      const t = new THREE.CanvasTexture(c);
      t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = renderer.capabilities.getMaxAnisotropy();
      return t;
    }

    const lightCap = new THREE.MeshStandardMaterial({ color: 0xe9edf3, roughness: 0.5, metalness: 0 });
    const accCap = new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.45, metalness: 0.05 });
    const draw = () => renderer.render(scene, camera);
    const keys = [];
    for (let r = 0; r < NROWS; r++) {
      let cx = -COLS / 2;
      for (const key of ROWS[r]) {
        const w = key.w || 1;
        const g = new THREE.Group();
        const cap = new THREE.Mesh(capGeometry(w), key.kind === 'acc' ? accCap : lightCap);
        cap.castShadow = cap.receiveShadow = true;
        g.add(cap);
        if (key.kind !== 'blank') {
          const k = 0.84, top = new THREE.Mesh(new THREE.PlaneGeometry((w - GAP) * (1 - 0.16 / w), (1 - GAP) * k), new THREE.MeshBasicMaterial({ transparent: true, toneMapped: false }));
          top.rotation.x = -Math.PI / 2; top.position.y = CAP_H + 0.052;
          // La cara no se ve hasta que tiene su logotipo (sin ella saldría un plano blanco) y, al tenerlo, se
          // dibuja un fotograma: si el bucle está parado (fuera de pantalla o sin movimiento) no se quedaría la tecla en blanco.
          top.visible = false;
          topTexture(key, w).then(t => { top.material.map = t; top.material.needsUpdate = true; top.visible = true; draw(); });
          g.add(top);
        }
        g.position.set(cx + w / 2, 0.02, -NROWS / 2 + r + 0.5);
        g.userData = { key, rest: 0.02, press: 0 };
        kb.add(g); keys.push(g);
        cx += w;
      }
    }

    // Cámara encuadrada al ancho disponible
    function resize() {
      const w = host.clientWidth, h = canvas.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      const vf = THREE.MathUtils.degToRad(camera.fov), hf = 2 * Math.atan(Math.tan(vf / 2) * camera.aspect);
      const need = Math.max((W * (narrow() ? 1.06 : 0.98)) / 2 / Math.tan(hf / 2), (D * 1.45) / 2 / Math.tan(vf / 2));
      const dir = new THREE.Vector3(0, 0.82, 0.57).normalize();
      camera.position.copy(dir.multiplyScalar(need));
      camera.lookAt(0, -0.3, 0.05);
      camera.updateProjectionMatrix();
    }
    resize();
    addEventListener('resize', () => { resize(); draw(); });

    // Interacción: inclinación con el puntero y tecla que se hunde
    const ray = new THREE.Raycaster(), ptr = new THREE.Vector2(9, 9);
    let tx = 0, ty = 0, hover = null;
    const setTip = (g, e) => {
      if (!g || g.userData.key.kind === 'blank' || g.userData.key.kind === 'space') { tip.classList.remove('on'); return; }
      const k = g.userData.key, b = host.getBoundingClientRect();
      tip.replaceChildren();
      const b1 = document.createElement('b'); b1.textContent = k.label || 'Ayman'; tip.append(b1);
      if (k.note) { const s1 = document.createElement('span'); s1.textContent = k.note; tip.append(s1); }
      tip.style.left = (e.clientX - b.left) + 'px'; tip.style.top = (e.clientY - b.top) + 'px';
      tip.classList.add('on');
    };
    const move = e => {
      const b = canvas.getBoundingClientRect();
      ptr.set(((e.clientX - b.left) / b.width) * 2 - 1, -((e.clientY - b.top) / b.height) * 2 + 1);
      if (!reduce) { tx = ptr.x; ty = ptr.y; } // con «reducir movimiento» el teclado no se inclina, solo se hunde la tecla
      ray.setFromCamera(ptr, camera);
      const hit = ray.intersectObjects(keys, true)[0];
      hover = hit ? keys.find(k => k === hit.object.parent) : null;
      canvas.style.cursor = hover && hover.userData.key.kind !== 'blank' ? 'pointer' : 'default';
      setTip(hover, e);
    };
    canvas.addEventListener('pointermove', move);
    canvas.addEventListener('pointerdown', move);
    canvas.addEventListener('pointerleave', () => { hover = null; tx = ty = 0; tip.classList.remove('on'); });

    // Al entrar en pantalla, las teclas se pulsan una vez en cascada. Con las animaciones de scroll
    // activas la dispara ScrollTrigger (scripts/motion-core.ts); si no, este mismo observador.
    let visible = false, cascaded = false;
    const viaScroll = document.documentElement.classList.contains('js-motion');
    const cascade = () => {
      if (cascaded || reduce) return;
      cascaded = true;
      keys.forEach((g, i) => { if (g.userData.key.kind === 'blank') return; setTimeout(() => { g.userData.press = 1; setTimeout(() => { g.userData.press = 0; }, 130); }, 150 + i * 45); });
    };
    host.addEventListener('kb:cascade', () => { cascade(); loop(); });
    if (host.dataset.cascade === 'go') cascade();
    new IntersectionObserver(es => {
      visible = es[0].isIntersecting;
      if (visible && !viaScroll) cascade();
      if (visible) loop();
    }, { threshold: 0.15 }).observe(host);

    // Con el scroll, el teclado gira e inclina un poco: de frente al llegar y algo de lado al irse.
    const scrollTilt = () => {
      if (reduce) return 0;
      const r = host.getBoundingClientRect();
      const p = (innerHeight - r.top) / (innerHeight + r.height);
      return Math.min(1, Math.max(0, p)) - 0.5;
    };

    const t0 = performance.now();
    let raf = 0;
    function loop() {
      if (raf) return;
      const step = () => {
        raf = 0;
        if (!visible) return;
        const t = (performance.now() - t0) / 1000;
        const idle = reduce ? 0 : Math.sin(t * 0.6) * 0.025;
        const sp = scrollTilt();
        kb.rotation.y += (((narrow() ? 0 : -0.08 - sp * 0.22) + tx * 0.14 + idle) - kb.rotation.y) * 0.06;
        kb.rotation.x += ((0.06 - sp * 0.16 - ty * 0.07) - kb.rotation.x) * 0.06;
        for (const g of keys) {
          const down = g === hover && g.userData.key.kind !== 'blank' ? 1 : g.userData.press;
          const target = g.userData.rest - down * 0.16;
          g.position.y += (target - g.position.y) * 0.35;
        }
        draw();
        raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }
    draw();
    }
  }
