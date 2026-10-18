# Plan de cierre · Portafolio

Rama del plan: `plan/cierre` (sale de `claude/zealous-franklin-er41ad`). Reglas comunes: `plan/REGLAS.md`. Las reglas fijas de marca están en `CLAUDE.md`. Avisos para Ayman: `plan/AVISOS.md`.

## Objetivo

Dejar el portafolio protegido (CI que impide romper lo que hoy está verificado), con las funciones del formulario probadas, y preparar en PR aparte las decisiones que son de Ayman: «Fuera del trabajo», la revisión del inglés y los casos actualizados cuando terminen Zellige y CineFlow.

## Hallazgo de la planificación

El estado dice «44 combinaciones sin errores y Lighthouse 100», pero en el repositorio no hay ni el script de esa auditoría ni `astro check`, ni Lighthouse CI: se hicieron a mano. La sesión 01 los convierte en scripts versionados y en CI.

## Modelos (opencode go)

| Clave | Modelo (paseo) |
|---|---|
| Flash | `opencode-go/glm-5.3-flash`, razonamiento `high` |
| GLM | `opencode-go/glm-5.3`, razonamiento `high` |
| Inglés | `opencode-go/gpt-6-luna`, razonamiento `high` |

## Sesiones

| NN | Sesión | Modelo | Depende de | Se fusiona | Estado |
|---|---|---|---|---|---|
| 01 | CI: build, astro check, auditoría Playwright y Lighthouse CI (P1) | GLM | | sí | pendiente |
| 02 | Pruebas de las funciones con Vitest (P2) | GLM | 01 | sí | pendiente |
| 03 | «Fuera del trabajo» (P3) | GLM | 01 | no, decide Ayman | pendiente |
| 04 | Capturas y casos de Zellige y CineFlow (P4) | Flash | 01; Zellige 09 y CineFlow 07 | no, decide Ayman | pendiente |
| 05 | Revisión del inglés (P5) | Inglés | 01 | no, decide Ayman | pendiente |

## Orden y paralelo

```
01 ─┬─► 02
    ├─► 03
    ├─► 05
    └─► 04  (cuando terminen los frentes de Zellige y CineFlow)
```

02, 03 y 05 pueden ir a la vez tras 01. 03 y 05 tocan `src/content/site.ts`: la que se abra después parte de `plan/cierre` y, si la otra se fusiona antes, se rebasa.

## Terminado significa

- 01 y 02 fusionadas en `plan/cierre`, con el CI en verde en GitHub Actions.
- PR de 03, 04 y 05 abiertos con la etiqueta `decide-ayman`, capturas y explicación.
- Nada de lo que solo puede hacer Ayman (abajo) se ha intentado hacer por él.

## Solo Ayman

CV nuevos en `public/cv/`; una cifra real del SaaS; claves de Turnstile, Resend y Analytics; crear el proyecto en Cloudflare Pages; la PR a is-a.dev con el CNAME (y los registros de Resend); revisar la exclusividad de su contrato; fusionar en `main` o en `claude/zealous-franklin-er41ad`.
