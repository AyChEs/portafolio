# Pendientes de rellenar o confirmar

Lo que solo puede aportar Ayman. Cada punto indica dónde se cambia.

| # | Qué | Dónde |
|---|---|---|
| 1 | CV en español e inglés al día (se sustituyen los PDF conservando el nombre) | `public/cv/` |
| 3 | Una cifra real del SaaS de recarga, cuando exista (operadores, facturas al mes…) | caso `saas`, campo `result` y `outcome` |
| 6 | Revisar la versión en inglés de todos los textos | `src/content/site.ts` (bloques `en`) |
| 7 | Si el SaaS publica a sus clientes, nombrarlos; hasta entonces, no | caso `saas` |
| 8 | Claves: Turnstile, Resend y token de Analytics | `docs/DESPLIEGUE.md` |
| 9 | Contrato de trabajo: revisar si hay pacto de exclusividad antes de aceptar proyectos | — |
| 10 | Fechas de Etecnic: el CV dice «jul. 2025 – ago. 2026» y la web «2025 → hoy» (contrato indefinido). Dime cuál es la correcta | CV y `PATH` en `src/content/site.ts` |
| 11 | El CV nombra a GALP, AENA y Celsia; la web no nombra a los clientes de Etecnic. Decide si el CV los mantiene | `public/cv/` |
| 12 | El CV dice «grado universitario en desarrollo de software» y la web el ciclo DAW (2024–2026). Aclarar cuál es la formación actual | CV |
| 13 | «Matrícula de honor · 8,6» del ciclo de Sistemas: la matrícula de honor suele ser para 9 o más. Confirmar la nota y la mención (el CV no las trae) | `PATH` en `src/content/site.ts` |
| 14 | El CV enlaza a `ayches-dev.vercel.app` (la web antigua); poner la nueva. Además usa «robusto» (versión ES, Zellige) | CV |
| 15 | Zellige y CineFlow: el CV dice «MIT License» y «Stack: Blade, PHP, CSS»; revisar que coincide con los repositorios | CV |
| 16 | Cifras de las páginas de caso (31 pruebas, 76 pruebas, 18 y 13 pantallas con axe): confirmar que siguen vigentes en cada repositorio | `src/content/site.ts` |
| 17 | Claves de Turnstile y Resend. Hasta entonces el formulario abre el correo del visitante con el mensaje preparado | `docs/DESPLIEGUE.md` |
