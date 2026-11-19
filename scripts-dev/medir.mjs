// Mide la portada con Lighthouse (escritorio y móvil) y guarda los datos que enseña la barra de estado
// en src/content/metricas.json. Uso: con `npm run preview` en marcha, `npm run medir`.
// CHROME_PATH debe apuntar a un Chrome o Chromium (en este entorno, el de Playwright).
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const base = process.env.BASE || 'http://localhost:4321';
const pagina = '/es/';
const dir = mkdtempSync(join(tmpdir(), 'lh-'));
const run = (preset) => {
  const out = join(dir, `${preset}.json`);
  const args = ['-y', 'lighthouse@12', base + pagina, '--quiet', '--output=json', `--output-path=${out}`, '--chrome-flags=--headless=new --no-sandbox'];
  if (preset === 'escritorio') args.push('--preset=desktop');
  execFileSync('npx', args, { stdio: 'inherit' });
  return JSON.parse(readFileSync(out, 'utf8'));
};
const pct = (r, c) => Math.round(r.categories[c].score * 100);
const d = run('escritorio'), m = run('movil');
const f = new URL('../src/content/metricas.json', import.meta.url);
const prev = JSON.parse(readFileSync(f, 'utf8'));
const datos = {
  fecha: new Date().toISOString().slice(0, 10),
  pagina,
  escritorio: {
    rendimiento: pct(d, 'performance'), accesibilidad: pct(d, 'accessibility'), buenasPracticas: pct(d, 'best-practices'), seo: pct(d, 'seo'),
    lcpMs: Math.round(d.audits['largest-contentful-paint'].numericValue), cls: Math.round(d.audits['cumulative-layout-shift'].numericValue * 100) / 100,
  },
  movil: { rendimiento: pct(m, 'performance'), lcpMs: Math.round(m.audits['largest-contentful-paint'].numericValue), cls: Math.round(m.audits['cumulative-layout-shift'].numericValue * 100) / 100 },
  axe: prev.axe,
};
writeFileSync(f, JSON.stringify(datos, null, 2) + '\n');
console.log(datos);
