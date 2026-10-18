# 03 · «Fuera del trabajo» (PR sin fusionar)

Modelo: GLM 5.3 (opencode go), razonamiento high
Rama: `mejora/03-fuera-del-trabajo`, desde `plan/cierre`.
Depende de: 01 fusionada.
Skills que lee antes de empezar:
- `.claude/skills/taste-skill/SKILL.md` (`CLAUDE.md` manda)
- `.claude/skills/frontend-ui-engineering/SKILL.md`

## Contexto

Lee `CLAUDE.md` (sección «Sobre mí») y `plan/REGLAS.md`. Hoy la sección «Ahora mismo · fuera del trabajo» (`src/components/About.astro`, textos en `NOW` y `UI.nowTitle/nowSub/nowIntro` de `src/content/site.ts`) es una mesa con cuatro objetos de papel: pase de embarque del último viaje (Granada, con `public/img/granada.webp`), entrada de la última película (`public/img/spiderman-cartel.webp`), ficha de lectura con sello «Leyendo ahora» y carné del gimnasio. **Caduca**: en unas semanas la película, el viaje y el libro ya no serán «lo último».

Ayman no ha decidido. Esta sesión prepara la recomendación como PR **que no se fusiona**: él lo acepta o no.

## Recomendación que hay que implementar

Convertirla en **«Fuera del trabajo»**, atemporal, con tres objetos que no caducan:

1. **Carné de socio del gimnasio** (el que ya existe), sin cambios de datos.
2. **Ficha de lectura** del mismo libro, **sin el sello «Leyendo ahora»** ni el estado «en curso»: pasa a ser un libro que le importa, no el que lee hoy. Etiqueta «FICHA DE LECTURA». No inventes valoraciones ni frases que Ayman no haya dicho.
3. **La foto de Granada** como fotografía impresa (borde blanco, ligera rotación, sombra suave de papel como el resto de objetos), con un pie escrito «Granada» y la línea que ya existe «La Alhambra y el mirador de San Nicolás.». Sin «último viaje» ni fechas.

Se quita la entrada de cine (y con ella `spiderman-cartel.webp` deja de usarse: no lo borres del repositorio; Ayman decidirá).

Textos (ES / EN):
- Título: «Fuera del trabajo» / «Outside work». Se quita el subtítulo `nowSub`.
- Intro: «Lo que hay en mi mesa cuando cierro el portátil.» / «What is on my desk when I close the laptop.»

## Tareas

1. Aplica la recomendación en `About.astro` y `site.ts` (ES y EN). Renombra las claves solo si es necesario y en todos los usos (`grep -rn "nowTitle\|nowSub\|nowIntro\|NOW\b" src`).
2. Composición con tres objetos: en 1440 px, en fila sobre la «mesa» con alturas y giros distintos y sin solaparse el texto; en 390 px, en columna. Conserva las sombras de papel (única excepción a «sin sombras» de `CLAUDE.md`), la paleta y la tipografía. Con `prefers-reduced-motion`, nada se mueve.
3. La foto: `<img>` con `width`/`height`, `loading="lazy"`, `alt` descriptivo en cada idioma («La Alhambra desde el mirador de San Nicolás, en Granada» / «The Alhambra from the San Nicolás viewpoint in Granada»).
4. Actualiza `CLAUDE.md`, punto 5 de «Estructura de la web», para describir «Fuera del trabajo» con los tres objetos (fecha 2026-10-18 y «propuesta pendiente de aprobar» hasta que Ayman la fusione).
5. Capturas antes/después a 390 y 1440 px, claro y oscuro, de la sección (8 en total) en `plan/capturas/03/`.

## No hacer

- No fusiones el PR.
- No inventes datos personales (fechas de socio, rutinas, opiniones) que no estén ya en `site.ts`.
- No borres imágenes de `public/`.

## Criterios de aceptación

- Verificación completa de `plan/REGLAS.md` en verde (incluido `npm run audit` y Lighthouse ≥ 95).
- Ningún texto de la sección depende de una fecha («último», «ahora», «en curso»): `grep -niE "último|ahora|en curso|last|right now|reading now" ` sobre los textos de la sección vacío.

## Verificación

La de `plan/REGLAS.md`.

## Cierre

Commit(s), push, PR hacia `plan/cierre` titulado «03 · Propuesta: “Fuera del trabajo” en lugar de “Ahora mismo”», con etiqueta `decide-ayman`, las 8 capturas, la lista de lo que se quita y por qué (caduca), y una línea clara: «Si no te convence, cierra el PR y todo queda como estaba». **No lo fusiones.** Marca 03 en `plan/PLAN.md` como «PR abierto, decide Ayman» (commit directo en `plan/cierre`).
