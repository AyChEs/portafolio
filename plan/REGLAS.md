# Reglas comunes de todas las sesiones (portafolio)

Léelo entero antes de empezar. **`CLAUDE.md` en la raíz manda sobre todo**: léelo también, entero, antes de tocar nada.

## Resumen de lo que no se negocia (detalle en `CLAUDE.md`)

- Darsi no aparece: ni nombre, ni caso anónimo, ni su marca (estrella de ocho puntas, `#0F5E5A`, arena, ámbar, Cairo).
- Rol: desarrollador full-stack. Java es una tecnología más. Nada de «sistemas» ni «arquitectura» como especialidad.
- Etecnic es contexto. Sus clientes no se nombran: «operadores energéticos y aeropuertos de varios países».
- Ninguna frase sobre IA en la web. Claude es una herramienta más.
- Tono: primera persona, frases cortas, hechos antes que adjetivos. Sin «apasionado», «robusto», «soluciones», exclamaciones ni rayas largas.
- Prohibido el naranja. Sin fotos de stock, sin degradados morados, sin plantillas. Paleta y tipografía, las de `CLAUDE.md`.
- Sin servicios de pago. El hosting es Cloudflare Pages y no se cambia.
- WCAG 2.2 AA y `prefers-reduced-motion` en todo.
- CineFlow se presenta siempre como proyecto de equipo con Ismael Achamrouk y Danna Guevara.
- Ningún identificador de modelo de IA en commits, PR ni código. Ningún «Co-Authored-By» de una IA.
- Nunca se salta, desactiva ni rebaja una prueba o un umbral para pasar.

## Ramas y PR

- Rama del plan: `plan/cierre`, que sale de `claude/zealous-franklin-er41ad`. Cada sesión: `git fetch origin && git checkout plan/cierre && git pull && git checkout -b mejora/NN-nombre`.
- Nunca trabajes en `main` ni en `claude/zealous-franklin-er41ad` directamente, ni abras PR hacia ellas.
- Commits pequeños, en español, en imperativo.
- `git push -u origin mejora/NN-nombre` y `gh pr create --base plan/cierre --title "NN · Título" --body-file /tmp/pr-NN.md`. Cuerpo: resumen, decisiones y su porqué, capturas antes/después si hay cambios visibles, salida de la verificación y lo que quedó fuera.
- Fusión: si la sesión lo permite y la verificación está en verde, `gh pr merge --squash --delete-branch` y marca la sesión como hecha en `plan/PLAN.md`. **Las sesiones 03, 04 y 05 no se fusionan**: las decide Ayman (la etiqueta `decide-ayman` la crea la sesión si no existe: `gh label create decide-ayman --color BFD4F2`).

## Entorno

- Node 22 y `gh` con sesión de `AyChEs`. `npm ci` y `npm run dev` (http://localhost:4321), `npm run build` (genera `dist/`), `npx astro preview` sirve `dist/` en el 4321.
- Las funciones de Cloudflare (`functions/`) no corren con `astro preview`; para probarlas en local: `npx wrangler pages dev dist` (copiando `.dev.vars.example` a `.dev.vars`). No hay claves reales de Turnstile ni de Resend: no se piden, se usan dobles.

## Verificación (obligatoria antes de cada PR)

1. `npm run build` sin errores ni avisos nuevos (compara con la salida de `plan/cierre`).
2. `npx astro check` sin errores (desde la sesión 01).
3. `npm run audit` (lo crea la sesión 01): 11 páginas × 390/1440 px × claro/oscuro sin desplazamiento horizontal, sin errores de consola ni imágenes rotas.
4. Lighthouse ≥ 95 en rendimiento, accesibilidad, buenas prácticas y SEO (`npm run lhci`, desde la sesión 01). Hoy está en 100: si baja, se explica en el PR.
5. Desde la sesión 02, `npm test` en verde.
6. CI del PR en verde (`gh pr checks --watch`).

## Avisos a Ayman

Para y escribe en `plan/AVISOS.md` (solo esa tarea) cuando falte una credencial o cuenta, la acción sea irreversible o hacia fuera (fusionar en `main`, desplegar, publicar, abrir una PR en un repositorio ajeno como is-a.dev, escribir a alguien, contratar), un cambio choque con `CLAUDE.md` o cambie lo que afirma un caso, o la verificación falle dos veces por lo mismo con la causa fuera del código de la sesión.

```markdown
## AAAA-MM-DD · Sesión NN · Título corto
- Qué pasa:
- Opciones: 1) … 2) …
- Recomiendo: … porque …
- Queda bloqueado: …
```

## Skills

En `.claude/skills/<nombre>/SKILL.md` de este mismo repositorio. Lee solo las que indique tu sesión.
