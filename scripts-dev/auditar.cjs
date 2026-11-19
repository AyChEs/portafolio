// Auditoría: axe (WCAG 2.2 AA), desbordamiento horizontal y texto que nunca llega a verse al recorrer la página.
// Uso: con `npm run preview` en marcha, `npm run auditar` (BASE, ONLY y STEP son opcionales).
// Necesita Playwright con Chromium instalado en el sistema. Con WRITE=1 guarda el resultado en src/content/metricas.json.
const { chromium } = require('playwright');
const fs = require('fs');
const axe = fs.readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
const base = process.env.BASE || 'http://localhost:4321';
const paths = process.env.ONLY ? process.env.ONLY.split(',') : ['/es/','/en/','/es/casos/facturacion-saas-recarga/','/en/cases/ev-charging-saas-invoicing/','/es/casos/zellige-hotels/','/en/cases/zellige-hotels/','/es/casos/cineflow/','/en/cases/cineflow/','/es/casos/lacomu/','/en/cases/lacomu/','/es/aviso-legal/','/en/legal/'];
const combos = [];
for (const p of paths) for (const s of ['dark','light']) for (const w of [390,1440]) combos.push({p,s,w,rm:false});
for (const p of ['/es/','/en/','/es/casos/cineflow/','/en/cases/lacomu/']) combos.push({p,s:'dark',w:1440,rm:true});
(async () => {
  const b = await chromium.launch();
  let problems = 0, i = 0;
  const run = async () => {
    while (i < combos.length) {
      const c = combos[i++];
      const ctx = await b.newContext({ viewport:{width:c.w,height:900}, colorScheme:c.s, reducedMotion:c.rm?'reduce':'no-preference' });
      const pg = await ctx.newPage(); const errs = [];
      pg.on('pageerror', e => errs.push('js: '+e.message));
      try {
        await pg.goto(base+c.p, { waitUntil:'networkidle', timeout:60000 });
        const h = await pg.evaluate(() => document.documentElement.scrollHeight);
        // En cada parada se marca el texto que se ve en pantalla; al final se listan los que nunca se vieron.
        const mark = () => pg.evaluate(() => {
          for (const el of document.querySelectorAll('h1,h2,h3,p,li,dt,dd,a,button,span,b,small,label')) {
            const key = el.tagName + '|' + el.textContent.trim(); window.__seen ??= new Set(); if (!el.textContent.trim() || window.__seen.has(key)) continue;
            const rc = el.getBoundingClientRect(); if (!rc.width || !rc.height || rc.bottom < 0 || rc.top > innerHeight) continue;
            let o = 1, n = el; while (n && n.nodeType === 1) { const cs = getComputedStyle(n); o *= parseFloat(cs.opacity); if (cs.visibility === 'hidden') o = 0; n = n.parentElement; }
            if (o >= 0.5) window.__seen.add(key);
          }
        });
        await pg.waitForTimeout(1500); await mark();
        const st = +(process.env.STEP || 400);
        // Hasta el final real: la página crece cuando las secciones fijadas añaden su espacio.
        for (let k = 0; k < 400; k++) {
          await pg.mouse.wheel(0, st); await pg.waitForTimeout(st > 250 ? 700 : 450); await mark();
          const end = await pg.evaluate(() => scrollY + innerHeight >= document.documentElement.scrollHeight - 2);
          if (end) break;
        }
        await pg.waitForTimeout(1500); await mark();
        const r = await pg.evaluate(async (src) => {
          const out = [];
          const de = document.documentElement;
          if (de.scrollWidth > de.clientWidth + 1) out.push(`desborda ${de.scrollWidth}>${de.clientWidth}`);
          const hid = [];
          for (const el of document.querySelectorAll('h1,h2,h3,p,li,dt,dd,a,button,span,b,small,label')) {
            if (!el.textContent.trim() || el.closest('[aria-hidden="true"],.sr,.sr-only,[hidden],dialog:not([open]),noscript')) continue;
            const rc = el.getBoundingClientRect(); if (!rc.width || !rc.height) continue;
            if (el.closest('.sr-only,[data-clock]') || el.querySelector('.sr-only,[data-clock]')) continue;
            if (!(window.__seen ?? new Set()).has(el.tagName + '|' + el.textContent.trim())) hid.push(el.tagName + ':' + el.textContent.trim().slice(0,30));
          }
          if (hid.length) out.push('oculto ' + hid.length + ' ' + hid.slice(0,3).join(' | '));
          eval(src);
          const a = await axe.run(document, { runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']} });
          for (const v of a.violations) out.push(`axe ${v.id} x${v.nodes.length}: ${v.nodes[0].target.join(' ')}`);
          return out;
        }, axe);
        const all = [...errs, ...r];
        if (all.length) { problems += all.length; console.log(`✗ ${c.p} ${c.s} ${c.w}${c.rm?' rm':''}\n   ` + all.join('\n   ')); }
        else console.log(`✓ ${c.p} ${c.s} ${c.w}${c.rm?' rm':''}`);
      } catch (e) { problems++; console.log(`✗ ${c.p} ${c.s} ${c.w} ERROR ${e.message.split('\n')[0]}`); }
      await ctx.close();
    }
  };
  await Promise.all([run(), run(), run(), run()]);
  console.log(`\n${combos.length} combinaciones, ${problems} problemas`);
  if (process.env.WRITE) {
    const f = require('path').join(__dirname, '../src/content/metricas.json');
    const m = JSON.parse(fs.readFileSync(f, 'utf8'));
    m.axe = { fallos: problems, combinaciones: combos.length };
    fs.writeFileSync(f, JSON.stringify(m, null, 2) + '\n');
  }
  await b.close();
})();
