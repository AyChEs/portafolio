// Auditoría de páginas: 11 páginas × 390/1440 px × claro/oscuro (44 combinaciones).
// Comprueba: errores de consola, errores de página, desplazamiento horizontal e imágenes rotas.
// Arranca `astro preview --port 4321` (o usa BASE_URL si se pasa, p. ej. contra un servidor ya levantado).
// Capturas solo con --capturas (se guardan en plan/capturas/auditoria/).

import { spawn, execSync } from 'node:child_process';
import { mkdirSync, readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import process from 'node:process';
import { chromium } from '@playwright/test';

// Rutas de las 11 páginas. Los slugs de los casos salen de CASES en src/content/site.ts.
const PAGES = [
  '/',
  '/es/',
  '/en/',
  '/es/casos/facturacion-saas-recarga/',
  '/es/casos/zellige-hotels/',
  '/es/casos/cineflow/',
  '/en/cases/ev-charging-saas-invoicing/',
  '/en/cases/zellige-hotels/',
  '/en/cases/cineflow/',
  '/es/aviso-legal/',
  '/en/legal/',
];

// Lista blanca de la consola: solo errores de Turnstile y Cloudflare Analytics.
// Sin claves (preview local sin .dev.vars con PUBLIC_TURNSTILE_SITE_KEY / PUBLIC_CF_BEACON_TOKEN)
// esos scripts no llegan a cargarse, pero si algo de Cloudflare falla al pedirlos, se ignora.
// Nada más se ignora: cualquier otro error de consola es un fallo.
const ALLOWED_CONSOLE_PATTERNS = [
  /challenges\.cloudflare\.com/i, // Turnstile
  /cloudflareinsights/i, // Cloudflare Web Analytics
  /turnstile/i,
];

const WIDTHS = [
  { width: 390, height: 844 },
  { width: 1440, height: 900 },
];
const SCHEMES = ['light', 'dark'];

const withCaptures = process.argv.includes('--captures');
const capturesDir = resolve('plan/capturas/auditoria');
if (withCaptures) mkdirSync(capturesDir, { recursive: true });

const isAllowed = (text) => ALLOWED_CONSOLE_PATTERNS.some((re) => re.test(text));

const waitServer = async (baseUrl, timeoutMs = 60_000) => {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(baseUrl, { redirect: 'manual' });
      if (res.status < 500) return true;
    } catch { /* aún no levantado */ }
    await new Promise((r) => setTimeout(r, 500));
  }
  return false;
};

const startPreview = () => {
  // Lanza el binario de astro directamente: sin el envoltorio de npx, que suelta un proceso hijo
  // en otro grupo y queda huérfano al hacer SIGTERM. Así el kill se lleva el preview entero.
  const child = spawn('node', ['node_modules/astro/bin/astro.mjs', 'preview', '--port', '4321'], {
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  child.stdout.on('data', () => {});
  child.stderr.on('data', () => {});
  return child;
};

// «astro preview» bifurca: el CLI muere enseguida y el servidor real (el proceso con --json)
// queda reparentado, así que matar al padre no basta. Este cierre mata al padre, a sus
// descendientes y, sobre todo, al proceso que escucha el puerto (vía ss, con fuser de respaldo;
// Linux, que es donde corren el CI y el desarrollo).
const descendantsOf = (pid) => {
  const children = new Map();
  for (const entry of readdirSync('/proc')) {
    if (!/^\d+$/.test(entry)) continue;
    try {
      const stat = readFileSync(`/proc/${entry}/stat`, 'utf8');
      const after = stat.slice(stat.lastIndexOf(')') + 2);
      const ppid = Number(after.split(' ')[1]);
      if (!children.has(ppid)) children.set(ppid, []);
      children.get(ppid).push(Number(entry));
    } catch { /* el proceso desapareció entre medias */ }
  }
  const out = [];
  const walk = (p) => {
    for (const child of children.get(p) ?? []) { out.push(child); walk(child); }
  };
  walk(pid);
  return out;
};

const killListener = (port, signal) => {
  try {
    const out = execSync('ss -ltnpH', { encoding: 'utf8' });
    for (const line of out.split('\n')) {
      if (!new RegExp(`:${port}\\s`).test(line)) continue;
      const m = /pid=(\d+)/.exec(line);
      if (m) {
        try { process.kill(Number(m[1]), signal); } catch { /* ya muerto */ }
      }
    }
  } catch {
    // sin ss (raro en Linux): fuser como alternativa
    try {
      execSync(`fuser -k -${signal === 'SIGKILL' ? 'KILL' : 'TERM'} ${port}/tcp`, { stdio: 'ignore' });
    } catch { /* ya muerto o sin fuser */ }
  }
};

const stopServer = async (server, port) => {
  if (!server) return;
  for (const pid of [server.pid, ...descendantsOf(server.pid)]) {
    try { process.kill(pid, 'SIGTERM'); } catch { /* ya muerto */ }
  }
  const free = async () => {
    try {
      await fetch(`http://localhost:${port}`, { redirect: 'manual' });
      return false;
    } catch { return true; }
  };
  const deadline = Date.now() + 5000;
  while (Date.now() < deadline && !(await free())) {
    killListener(port, 'SIGTERM');
    await new Promise((r) => setTimeout(r, 250));
  }
  if (!(await free())) killListener(port, 'SIGKILL');
};

const portBusy = async (baseUrl) => {
  try {
    const res = await fetch(baseUrl, { redirect: 'manual' });
    return res.status < 500;
  } catch { return false; }
};

const audit = async (browser, baseUrl) => {
  const rows = [];
  for (const { width, height } of WIDTHS) {
    for (const scheme of SCHEMES) {
      const context = await browser.newContext({
        viewport: { width, height },
        colorScheme: scheme,
        reducedMotion: 'reduce',
      });
      const page = await context.newPage();
      const consoleErrors = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error' && !isAllowed(msg.text())) consoleErrors.push(msg.text());
      });
      page.on('pageerror', (err) => {
        if (!isAllowed(String(err))) consoleErrors.push(String(err));
      });

      for (const path of PAGES) {
        const label = `${path} ${width} ${scheme}`;
        const errors = [];
        try {
          await page.goto(baseUrl + path, { waitUntil: 'load' });

          if (consoleErrors.length > 0) errors.push(`consola: ${consoleErrors.join(' | ')}`);

          const overflow = await page.evaluate(
            () => document.documentElement.scrollWidth > window.innerWidth,
          );
          if (overflow) errors.push('desplazamiento horizontal');

          // Desplaza hasta el final para cargar las imágenes perezosas y luego comprueba las rotas.
          await page.evaluate(async () => {
            for (let y = 0; y <= document.documentElement.scrollHeight; y += window.innerHeight) {
              window.scrollTo(0, y);
              await new Promise((r) => setTimeout(r, 100));
            }
            window.scrollTo(0, 0);
          });
          await page.evaluate(() => new Promise((r) => setTimeout(r, 500)));
          const broken = await page.evaluate(() =>
            [...document.querySelectorAll('img')]
              .filter((img) => img.complete && img.naturalWidth === 0)
              .map((img) => img.getAttribute('src') ?? img.getAttribute('alt') ?? 'img'),
          );
          if (broken.length > 0) errors.push(`imágenes rotas: ${broken.join(', ')}`);

          if (withCaptures) {
            const file = `${path.replaceAll('/', '_') || '_'}_${width}_${scheme}.png`.replace(/^_+/, '');
            await page.screenshot({ path: resolve(capturesDir, file), fullPage: true });
          }
        } catch (err) {
          errors.push(`no se pudo auditar: ${String(err)}`);
        }
        rows.push({ label, ok: errors.length === 0, errors });
        consoleErrors.length = 0;
      }
      await context.close();
    }
  }
  return rows;
};

const main = async () => {
  const baseUrl = process.env.BASE_URL ?? 'http://localhost:4321';
  let server = null;
  if (process.env.BASE_URL) {
    if (!(await waitServer(baseUrl))) {
      console.error(`No responde ${baseUrl}`);
      process.exitCode = 1;
      return;
    }
  } else {
    // Si el 4321 ya está ocupado, aborta: podría ser un preview viejo sirviendo un dist anterior
    // y la auditoría daría verde sobre páginas que no son las actuales.
    if (await portBusy(baseUrl)) {
      console.error('El puerto 4321 ya está ocupado por otro servidor. Libéralo o pásalo con BASE_URL.');
      process.exitCode = 1;
      return;
    }
    server = startPreview();
    if (!(await waitServer(baseUrl))) {
      console.error('No se pudo levantar astro preview en el 4321');
      await stopServer(server, 4321);
      process.exitCode = 1;
      return;
    }
  }

  try {
    const browser = await chromium.launch();
    const rows = await audit(browser, baseUrl);
    await browser.close();

    const width = Math.max(...rows.map((r) => r.label.length));
    for (const row of rows) {
      const status = row.ok ? 'ok ' : 'FALLO';
      const detail = row.ok ? '' : ` ← ${row.errors.join(' · ')}`;
      console.log(`${status} | ${row.label.padEnd(width)} |${detail}`);
    }
    const failed = rows.filter((r) => !r.ok).length;
    console.log(`\n${rows.length} combinaciones, ${failed} con fallos.`);
    if (failed > 0) process.exitCode = 1;
  } finally {
    await stopServer(server, 4321);
  }
};

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
