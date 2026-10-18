# Avisos para Ayman

Aquí las sesiones dejan solo lo que necesita una decisión o una acción tuya. Formato en `plan/REGLAS.md`.

## 2026-10-18 · Sesión 01 · Contraste previo en las páginas de caso
- Qué pasa: el nuevo Lighthouse CI detecta accesibilidad 96 (umbral 95, en verde) en `/es/casos/zellige-hotels/`: el `figcaption` de las capturas de la sección «extra» usa el secundario del modo claro (`#4A5468`) sobre la tarjeta azul marino (`#14213D`): contraste 2,09:1, por debajo del AA de `CLAUDE.md` (que declara 6,2:1 sobre azul marino, comprobado en oscuro). También rendimiento 97 en móvil (LCP 2,6 s en `p.sum`, CSS bloqueante 380 ms e imágenes de caso sin `srcset`). Es estado previo de la web, no un cambio de esta sesión, y la sesión 01 no puede tocar el aspecto.
- Opciones: 1) arreglarlo en una sesión aparte (p. ej. el secundario claro `#4A5468` pasa a un valor con ≥ 4,5:1 sobre `#14213D` en los `figcaption`, y `srcset` en las capturas de caso). 2) dejarlo: el CI está en verde (≥ 95) y se documenta en el PR.
- Recomiendo: 1) porque choca con la decisión fija de WCAG 2.2 AA de `CLAUDE.md` y ahora el CI lo mide en cada PR; una sesión pequeña lo cierra sin tocar nada más.
- Queda bloqueado: nada de la sesión 01; el CI pasa.
