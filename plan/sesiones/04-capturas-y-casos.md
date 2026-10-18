# 04 · Capturas y casos de Zellige y CineFlow (PR sin fusionar)

Modelo: GLM 5.3 Flash (opencode go), razonamiento high
Rama: `mejora/04-casos`, desde `plan/cierre`.
Depende de: 01 fusionada, **y** los frentes de Zellige (sesión 09) y CineFlow (sesión 07) terminados. Compruébalo antes de empezar: en `/home/ayman/Documentos/proyectos/Zellige-Hotels` y `/home/ayman/Documentos/proyectos/cineflow-booking-engine`, `git fetch && git show origin/plan/mejoras:plan/PLAN.md` debe tener todas las sesiones como hechas. Si no, no empieces.
Skills que lee antes de empezar:
- `.claude/skills/product-marketing/SKILL.md` (tono; `CLAUDE.md` manda)

## Contexto

Lee `CLAUDE.md` (tono y reglas) y `plan/REGLAS.md`. Las capturas de los casos están en `public/img/proyectos/` (webp, 1440 × 900): `zellige-landing.webp`, `zellige-admin.webp`, `zellige-detalle.webp` y `cineflow.webp`. Los casos están en `CASES` de `src/content/site.ts` (ids `zellige` y `cineflow`). En los repositorios de los dos proyectos, `plan/capturas/final/` tiene las capturas nuevas y, en CineFlow, `plan/PARA-EL-PORTAFOLIO.md` resume lo que cambió del pago. `docs/PENDIENTES.md`, punto 4, espera precisamente eso: «Cómo se conecta Stripe con la reserva en CineFlow, cuando esté arreglado».

Las capturas deben ser de **producción**, que es lo que verá un reclutador. Si los cambios aún no están en `main` de cada proyecto (y por tanto no desplegados), usa las de `plan/capturas/final/` y dilo en el PR.

## Tareas

1. Capturas nuevas a 1440 × 900, modo de color del producto, convertidas a webp de calidad 80 con el mismo nombre (sustituyen a las actuales): portada de Zellige, panel de admin de Zellige (con sesión de `admin@hotel-erp.dev`), ficha de un hotel de Zellige, y para CineFlow el **mapa de butacas** con dos butacas elegidas (más representativo del caso que la cartelera; si lo haces en la demo pública, suelta las butacas al acabar y no pagues). Conversión: `npx -y sharp-cli -i in.png -o out.webp -f webp -q 80` (o `cwebp -q 80` si existe). Cada archivo debe pesar menos de 150 KB.
2. Si cambias la captura de CineFlow por el mapa, actualiza su `alt` en ES y EN («Mapa de butacas de CineFlow con dos butacas elegidas» / «CineFlow seat map with two seats selected»).
3. Caso CineFlow, en ES y EN, con lo que cuenta `PARA-EL-PORTAFOLIO.md` y **solo si está fusionado en `main` de CineFlow** (si no, prepara el texto en el PR sin aplicarlo):
   - en `decisions`, una cuarta decisión: «Confirmar el pago por webhook» con `what` (Stripe Checkout; la reserva se confirma cuando llega el evento firmado, una sola vez aunque llegue repetido; si el pago caduca o falla, las butacas se liberan; si otra compra gana, se devuelve el dinero) y `why` en una frase de hecho, no de adjetivo;
   - en `outcome`, sustituye «El pago con Stripe funciona en modo de pruebas y aún lo estoy ajustando» por lo que sea cierto ahora (y el número de tests real);
   - en `result` y en el resumen, el número de tests real.
   Respeta el tono de `CLAUDE.md`: primera persona, frases cortas, sin «robusto» ni exclamaciones. CineFlow sigue presentándose como proyecto de equipo.
4. Caso Zellige: solo si el número de tests o algo que afirma dejó de ser cierto (por ejemplo, ahora son 32 tests en vez de 28), corrígelo en ES y EN.
5. Quita el punto 4 de `docs/PENDIENTES.md` si lo has resuelto.
6. Capturas de las dos páginas de caso en ES a 1440 px, antes y después, en `plan/capturas/04/`.

## No hacer

- No fusiones el PR: cambia lo que afirman los casos y eso lo valida Ayman.
- No pagues ni completes compras en la demo de CineFlow. No crees reservas en la de Zellige.
- No cambies los otros casos.

## Criterios de aceptación

- Verificación completa de `plan/REGLAS.md` en verde.
- Los cuatro webp miden 1440 × 900 (`file public/img/proyectos/*.webp`) y pesan < 150 KB.

## Verificación

La de `plan/REGLAS.md`.

## Cierre

Commit(s), push, PR hacia `plan/cierre` titulado «04 · Capturas y casos actualizados», etiqueta `decide-ayman`, con el diff de textos en una tabla antes/después. **No lo fusiones.** Marca 04 en `plan/PLAN.md` como «PR abierto, decide Ayman».
