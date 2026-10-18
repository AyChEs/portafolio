# 05 · Revisión del inglés (PR sin fusionar)

Modelo: GPT-6 Luna (opencode go), razonamiento high
Rama: `mejora/05-ingles`, desde `plan/cierre`.
Depende de: 01 fusionada.
Skills que lee antes de empezar:
- `.claude/skills/product-marketing/SKILL.md`
- `.claude/skills/seo-audit/SKILL.md` (solo títulos y descripciones)

## Contexto

Lee `CLAUDE.md` (tono) y `plan/REGLAS.md`. Todo el texto en inglés está en los bloques `en` de `src/content/site.ts` (y en `src/pages/llms.txt.ts` si tiene textos propios, y en `src/components/Legal.astro` si hay textos en el componente). `docs/PENDIENTES.md`, punto 6: «Revisar la versión en inglés de todos los textos»; lo valida Ayman, por eso esta sesión no fusiona.

Objetivo: inglés natural para un reclutador del Reino Unido, Irlanda o la UE (ortografía británica, como ya usa el texto: «internationalised», «favourite»), con el mismo tono que el español: primera persona, frases cortas, hechos antes que adjetivos, sin «passionate», «robust», «solutions», «leverage», sin exclamaciones ni rayas largas. Fiel al español: no añade ni quita hechos.

## Tareas

1. Revisa cada cadena `en` frente a su `es`. Cambia solo lo que mejore de verdad: calcos del español, falsos amigos, preposiciones, orden de palabras, registro. Ejemplos a revisar: «Diploma in Computer Systems and Networks», «I work in ES · CA · AR · EN», «Code in production since 2025», «Where I read code best», los `what`/`why` de las decisiones de los casos.
2. Revisa también `title` y `description` de cada página en inglés (longitud: título ≤ 60 caracteres, descripción 140-160).
3. Escribe `plan/REVISION-INGLES.md` con una tabla: clave, texto actual, propuesta y motivo en una línea. Las cadenas que no cambias no van en la tabla.
4. Aplica las propuestas en `site.ts` (y donde corresponda) en la misma rama, para que Ayman vea el resultado en la vista previa.
5. No toques los bloques `es`.

## No hacer

- No fusiones el PR.
- No cambies hechos, cifras, nombres ni enlaces.
- No uses ortografía estadounidense salvo que el texto actual ya la use de forma deliberada.

## Criterios de aceptación

- Verificación completa de `plan/REGLAS.md` en verde.
- `git diff plan/cierre -- src/content/site.ts` solo cambia líneas de bloques `en`.

## Verificación

La de `plan/REGLAS.md`.

## Cierre

Commit(s), push, PR hacia `plan/cierre` «05 · Propuesta de revisión del inglés», etiqueta `decide-ayman`, con la tabla de `plan/REVISION-INGLES.md` en el cuerpo. **No lo fusiones.** Marca 05 en `plan/PLAN.md` como «PR abierto, decide Ayman».
