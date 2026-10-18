# Portafolio de Ayman Charoui

Web personal para presentarme como desarrollador full-stack y, cuando encaje, recibir proyectos concretos.
Astro en Cloudflare Pages, bilingüe (español e inglés), claro y oscuro según el sistema.

- **Marca y reglas:** `CLAUDE.md` (lo que cualquier agente debe obedecer) y `docs/marca/ESTUDIO-DE-MARCA.md`.
- **Posicionamiento:** `.agents/product-marketing.md`.
- **Referencias visuales aprobadas:** `docs/marca/referencias/`.
- **Despliegue:** `docs/DESPLIEGUE.md`. **Pendientes:** `docs/PENDIENTES.md`.

## Estructura

```
src/content/site.ts     todo el texto ES/EN, los casos y el teclado
src/components/         Hero, Cases, Stack (teclado 3D), How, About, Freelance, Footer, CasePage, Legal
src/scripts/            brand.ts (animación del logo) y keyboard.ts (Three.js, carga diferida)
src/pages/              /es/, /en/, casos, aviso legal, sitemap.xml y llms.txt
functions/              contacto (Turnstile + Resend) e idioma según el navegador
public/                 logos (Devicon, Simple Icons), capturas, CV, _headers
docs/terceros/          licencias de lo que no es mío
```

## Comandos

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # dist/
```

## Calidad medida

Lo comprueba el CI (GitHub Actions) en cada PR: `npm run check` (tipos), `npm run build`, `npm run audit` (las 11 páginas a 390 y 1440 px en claro y oscuro, sin desplazamiento horizontal, sin errores de consola ni imágenes rotas) y `npm run lhci` + `npm run lhci:mobile` (Lighthouse ≥ 95 en rendimiento, accesibilidad, buenas prácticas y SEO; inicio, un caso y aviso legal).

## Licencias

Código y textos: propios. Tipografías (SIL OFL), Three.js (MIT), Devicon (MIT) y Simple Icons (CC0) en `docs/terceros/`.
