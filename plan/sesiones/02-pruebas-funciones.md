# 02 · Pruebas de las funciones con Vitest

Modelo: GLM 5.3 (opencode go), razonamiento high
Rama: `mejora/02-pruebas`, desde `plan/cierre`.
Depende de: 01 fusionada.
Skills que lee antes de empezar:
- `.claude/skills/incremental-implementation/SKILL.md`
- `.claude/skills/code-review-and-quality/SKILL.md` (sección de seguridad)

## Contexto

Lee `CLAUDE.md` y `plan/REGLAS.md`. Dos Pages Functions de Cloudflare:
- `functions/api/contact.ts`: recibe el formulario de «¿Tienes un proyecto?», valida Turnstile contra `https://challenges.cloudflare.com/turnstile/v0/siteverify` con `TURNSTILE_SECRET`, tiene un campo trampa (honeypot), comprueba el origen y envía el correo con Resend (`https://api.resend.com/emails`, `RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM`).
- `functions/_middleware.ts`: en `/` redirige a `/es/` o `/en/` según la cookie `lang` o `Accept-Language`.
Se probaron solo a mano con dobles. No hay claves reales y no se piden.

## Tareas

1. Lee las dos funciones enteras y anota en el PR su contrato real (códigos de estado y cuerpos de respuesta para cada caso). Las pruebas comprueban **lo que el código hace**; si encuentras un fallo, escribe la prueba que lo demuestra, corrige el código en un commit aparte y explícalo.
2. `npm i -D vitest`. `vitest.config.ts` con `environment: 'node'` (Node 22 ya tiene `Request`, `Response`, `fetch`, `FormData` y `Headers`). Script `"test": "vitest run"`. Importa `onRequestPost`/`onRequest` directamente y construye el `context` a mano (`{ request, env, next, … }` con lo que use cada función). `fetch` se sustituye con `vi.stubGlobal('fetch', vi.fn())`, devolviendo respuestas distintas según la URL.
3. `functions/api/__tests__/contact.test.ts`, al menos:
   - envío válido → llama a Turnstile con el token y la IP (`CF-Connecting-IP`), llama a Resend con `to = CONTACT_TO`, `from = CONTACT_FROM`, `reply_to` = correo del formulario, y responde éxito;
   - Turnstile dice `success: false` → error y **no** llama a Resend;
   - Turnstile no responde (fetch rechaza) → error controlado, sin excepción sin capturar;
   - Resend responde 500 → error y el mensaje no filtra la clave ni el cuerpo de Resend;
   - honeypot relleno → respuesta que no delata la trampa y no llama a Turnstile ni a Resend;
   - `Origin` ajeno (`https://evil.example`) → rechazado; mismo origen → aceptado;
   - campos vacíos (correo, mensaje) → error de validación; correo mal formado → error;
   - campos enormes (mensaje de 100 000 caracteres, nombre de 5 000) → rechazados o recortados según el código (si no hay límite, añádelo: 5 000 caracteres el mensaje, 200 el nombre, 254 el correo, y pruébalo);
   - inyección de cabeceras en el correo (`"a@b.c\r\nBcc: x@y.z"`) → rechazada;
   - método distinto de POST → 405 (si la función lo maneja).
4. `functions/__tests__/middleware.test.ts`:
   - `/` con `Accept-Language: es-ES,es;q=0.9` → redirige a `/es/`;
   - `/` con `Accept-Language: en-GB` y con `fr-FR` → `/en/`;
   - cookie `lang=es` gana a `Accept-Language: en` (y al revés);
   - cookie con valor raro (`lang=xx`) → se ignora;
   - sin cabeceras → el idioma por defecto que tenga el código;
   - rutas distintas de `/` (por ejemplo `/es/`, `/og.png`) → llama a `next()` sin redirigir;
   - el código de redirección (302 o 307) y la cabecera `Vary` si la pone.
5. Añade `- run: npm test` al CI (`.github/workflows/ci.yml`) antes de `npm run build`.
6. Actualiza `docs/DESPLIEGUE.md`, «Desarrollo local»: `npm test`.

## No hacer

- No pidas ni uses claves reales. No envíes correos.
- No cambies el comportamiento visible del formulario salvo para corregir un fallo demostrado por una prueba.

## Criterios de aceptación

- `npm test` en verde con al menos 18 pruebas y en el CI.
- Cada fallo corregido tiene su prueba que fallaba antes.

## Verificación

La de `plan/REGLAS.md`, incluida `npm test`.

## Cierre

Commit(s), push, PR hacia `plan/cierre` con la tabla del contrato de cada función; fusión si está en verde; marca 02 como hecha.
