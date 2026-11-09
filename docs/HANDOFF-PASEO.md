# Traspaso a paseo.sh

Prompt maestro para continuar el trabajo fuera de esta sesión. Se pega entero como primer mensaje de una sesión de **Claude Opus 5.5** en paseo.sh. Esa sesión no programa: lee, decide y deja escrito un plan dividido en sesiones. Cada sesión del plan la ejecuta **opencode go con GLM 5.3 Flash**, una por proyecto y mejora.

Supuestos que no he podido comprobar desde aquí:

- La sintaxis exacta de paseo.sh para abrir sesiones y elegir modelo. El prompt la describe de forma neutra; Opus debe adaptarla a lo que paseo.sh ofrezca.
- El identificador exacto de GLM 5.3 Flash en opencode. Si no existe con ese nombre, Opus usa el modelo GLM Flash más reciente disponible y lo anota.
- Que paseo.sh tenga acceso de escritura a `AyChEs/Zellige-Hotels` y `AyChEs/cineflow-booking-engine`. Si no lo tiene, es uno de los pocos avisos permitidos.

---

## Prompt maestro

```text
Eres el planificador de un traspaso. Trabajas para Ayman Charoui Essamadi
(GitHub: AyChEs), desarrollador full-stack en España. Respondes en español.
En esta sesión NO escribes código de producto: lees, decides y dejas un plan
ejecutable por otro modelo más barato (GLM 5.3 Flash en opencode go), que
seguirá tus instrucciones al pie de la letra y sin tu contexto.

## 0. Objetivo

Tres frentes, cada uno en sesiones independientes:

A. Terminar el portafolio (repo AyChEs/portafolio, rama de trabajo
   claude/zealous-franklin-er41ad). Está construido y verificado; queda lo
   listado en la sección 3.
B. Mejorar Zellige Hotels (https://github.com/AyChEs/Zellige-Hotels):
   diseño de interfaz, arquitectura del frontend y accesibilidad.
C. Mejorar CineFlow (https://github.com/AyChEs/cineflow-booking-engine):
   lo mismo, más terminar la integración de Stripe en modo prueba.

Los dos proyectos son casos del portafolio: tienen que verse tan cuidados
como él, porque un reclutador abrirá la demo después de leer el caso.

## 1. Primero, lee (en este orden)

En AyChEs/portafolio, rama claude/zealous-franklin-er41ad:
1. CLAUDE.md: reglas fijas de marca, estructura y stack. Mandan sobre
   cualquier skill.
2. docs/PENDIENTES.md y docs/DESPLIEGUE.md.
3. src/content/site.ts: todos los textos ES/EN, incluidos los tres casos
   (saas, zellige, cineflow) con contexto, decisiones y resultado.
4. docs/marca/ESTUDIO-DE-MARCA.md y docs/marca/referencias/caso.html.
5. .claude/skills/: las 14 skills disponibles (taste-skill,
   frontend-ui-engineering, spec-driven-development,
   planning-and-task-breakdown, incremental-implementation,
   code-review-and-quality, verification-before-completion,
   performance-optimization, browser-testing-with-devtools, seo-audit,
   ai-seo, product-marketing, brandkit, imagegen-frontend-web).

Después clona Zellige-Hotels y cineflow-booking-engine y lee su README,
estructura, pruebas y forma de arrancar en local antes de planificar nada.

## 2. Reglas que no se negocian (resumen de CLAUDE.md)

- Darsi no aparece en nada de esto: ni nombre, ni caso anónimo, ni sus
  elementos de marca (estrella de ocho puntas, verde #0F5E5A, arena, ámbar,
  Cairo). Ojo: Zellige Hotels tiene su propia identidad de hotel y puede
  usar motivos de zellige dentro de su app; lo prohibido es mezclarlo con la
  marca del portafolio.
- Rol: desarrollador full-stack. Java es una tecnología más, no la identidad.
- Etecnic es contexto, no protagonista. Sus clientes no se nombran:
  «operadores energéticos y aeropuertos de varios países».
- Nada de frases sobre IA en la web. Claude es una herramienta más.
- No se afirma lo que no se domina: nada de «sistemas» ni «arquitectura»
  como especialidad.
- Tono: primera persona, frases cortas, hechos antes que adjetivos. Sin
  «apasionado», «robusto», «soluciones», exclamaciones ni rayas largas.
- Prohibido el naranja. Sin fotos de stock, sin degradados morados, sin
  plantillas.
- Sin servicios de pago. No cambies el hosting de ningún proyecto.
- WCAG 2.2 AA y prefers-reduced-motion en todo.
- CineFlow es un proyecto de equipo (con Ismael Achamrouk y Danna Guevara):
  en el portafolio se dice siempre así, y en su repo no se reescribe el
  trabajo ajeno sin motivo.
- Ningún identificador de modelo en commits, PR ni código.

## 3. Estado del portafolio

Hecho y verificado:
- Astro 7 estático, rutas /es/ y /en/, páginas de caso, aviso legal,
  sitemap, llms.txt, JSON-LD, hreflang, OG, _headers con CSP.
- Logotipo animado «λyman.», modo claro/oscuro automático, idioma por
  navegador con selector ES/EN.
- Teclado 3D en Three.js con carga perezosa y alternativa CSS sin WebGL.
- Formulario con Pages Function (Turnstile + Resend) y middleware de idioma,
  probados solo con dobles; falta probarlos con claves reales.
- 44 combinaciones (11 páginas × 390/1440 px × claro/oscuro) sin errores y
  Lighthouse 100/100/100/100 en móvil y escritorio.

Pendiente que puede hacerse sin Ayman:
- P1. CI en GitHub Actions: npm ci, npm run build, astro check, la
  auditoría de Playwright de las 44 combinaciones y Lighthouse CI con
  umbral 95 en las cuatro categorías.
- P2. Pruebas unitarias (Vitest) de functions/api/contact.ts y
  functions/_middleware.ts: Turnstile falla, Resend falla, honeypot, origen
  ajeno, campos vacíos o enormes, Accept-Language y cookie lang.
- P3. Sección «Ahora mismo»: Ayman no ha decidido. Prepara en una rama
  aparte la recomendación (convertirla en «Fuera del trabajo», atemporal,
  con 2 o 3 objetos que no caduquen: el carné del gimnasio, la ficha de
  lectura y la foto de Granada) y déjala como PR para que él la acepte o
  no. No la fusiones.
- P4. Cuando B y C terminen: capturas nuevas de Zellige y CineFlow en
  public/img/proyectos/ (webp, mismo tamaño que las actuales) y, si cambió
  algo que el caso cuenta, actualizar el caso en site.ts en ES y EN.
- P5. Revisión del inglés: propuesta de cambios en un PR aparte, sin
  fusionar (el punto 6 de PENDIENTES lo tiene que validar Ayman).

Pendiente que solo puede hacer Ayman (no lo planifiques como tarea de
agente; recógelo en el resumen final): CV nuevos, cifra real del SaaS,
claves de Turnstile/Resend/Analytics, crear el proyecto en Cloudflare
Pages, la PR a is-a.dev con el CNAME y revisar la exclusividad de su
contrato.

## 4. Datos de los proyectos

Zellige Hotels: Spring Boot 3.4, Java 21, React 19, TypeScript,
Tailwind 4, TanStack Query, Testcontainers (28 pruebas). Reservas sin
solaparse con EXCLUDE USING gist en PostgreSQL, JWT con rotación, roles
admin, manager, receptionist y client. Despliegue en Vercel, Render, Neon y
Brevo (capas gratuitas; no se toca).

CineFlow: Laravel 12, PHP 8.4. Bloqueo de butacas de 8 minutos
(SeatLock) con lockForUpdate, 38 pruebas. Demo en
https://cineflow-ufe0.onrender.com/. Stripe Checkout en modo prueba sin
terminar: la reserva debe confirmarse por webhook firmado, ser idempotente
y liberar el bloqueo si el pago caduca o falla.

## 5. Qué tienes que entregar

Escribe en cada repositorio, en una rama nueva, los archivos del plan:

- plan/PLAN.md: objetivo, orden de las sesiones, dependencias entre ellas
  y criterio de «terminado» del frente.
- plan/sesiones/NN-nombre.md: una por sesión, autocontenida (ver formato
  en la sección 6). GLM no tendrá tu contexto: todo lo que necesite saber
  va en ese archivo.
- plan/AVISOS.md: vacío al principio. Es donde las sesiones dejan lo que
  necesita a Ayman (ver sección 7).

Antes de las sesiones de mejora visual de B y C, haz tú (no GLM) una
dirección de diseño por proyecto en plan/DISENO.md: paleta con valores y
contrastes comprobados, tipografía, escala de espaciado, radios, estados de
foco, componentes que se rediseñan y capturas de referencia de cómo está
hoy. Usa taste-skill y frontend-ui-engineering para decidir, pero respeta la
identidad de cada producto: Zellige es un hotel (cálido, sereno, claro);
CineFlow es una taquilla (oscura, de sala, con la butaca como protagonista).
Ninguno usa naranja ni copia la marca del portafolio. Justifica cada
decisión visual en una línea: Ayman es desarrollador backend y no tiene
formación en diseño.

Propuesta inicial de sesiones (ajústala tras leer el código):

Portafolio
  01 CI de build, auditoría Playwright y Lighthouse (P1)
  02 Pruebas de las funciones (P2)
  03 «Fuera del trabajo» como PR sin fusionar (P3)
  04 Capturas y casos actualizados (P4, tras B y C)
  05 Revisión del inglés como PR sin fusionar (P5)

Zellige Hotels
  01 Auditoría: axe en cada pantalla, Lighthouse, capturas 390/1440,
     inventario de componentes y deuda del frontend. Solo informe.
  02 Tokens de diseño (Tailwind 4 @theme) y tipografía autoalojada
  03 Componentes base: botón, campo, select, fecha, tarjeta, modal,
     toast, tabla, con estados de foco, error, carga y vacío
  04 Flujo de reserva del cliente (búsqueda, habitación, fechas, confirmación)
  05 Panel de gestión por rol (admin, manager, recepción)
  06 Accesibilidad: teclado, foco en modales, etiquetas, errores
     anunciados, contraste, reduced-motion
  07 Arquitectura del frontend: rutas perezosas, límites de error,
     estados de TanStack Query, sin duplicación de llamadas
  08 Revisión final con Opus (code-review-and-quality)

CineFlow
  01 Auditoría (igual que Zellige 01)
  02 Tokens de diseño y layout Blade/CSS base
  03 Cartelera y ficha de película
  04 Selector de butacas: mapa accesible por teclado (rejilla con
     flechas), estados libre/bloqueada/tuya/ocupada con texto y no solo
     color, cuenta atrás del bloqueo anunciada a lectores de pantalla
  05 Stripe Checkout en modo prueba: sesión, webhook firmado,
     idempotencia, liberar butacas al caducar; pruebas con dobles de Stripe
  06 Accesibilidad global y rendimiento
  07 Revisión final con Opus

Las sesiones de revisión final (08 y 07) y cualquier sesión que toque
pagos, autenticación o datos personales se ejecutan con Opus, no con GLM.

## 6. Formato de cada archivo de sesión

  # NN · Título
  Modelo: GLM 5.3 Flash (opencode go) | Opus 5.5
  Rama: mejora/NN-nombre-corto, creada desde la rama del plan. Nunca main.
  Depende de: sesiones previas que deben estar fusionadas
  Skills que lee antes de empezar: rutas exactas
  Contexto: lo mínimo que necesita saber, con rutas de archivo
  Tareas: lista numerada, cada una pequeña y comprobable
  No hacer: lo que queda fuera de alcance
  Criterios de aceptación: comprobables por comando o captura
  Verificación: comandos exactos (ver sección 8)
  Cierre: commit en español con mensaje claro, push de la rama, PR hacia
    la rama del plan con resumen, capturas antes/después y resultado de la
    verificación; marcar la sesión como hecha en plan/PLAN.md

Escribe las tareas para un modelo que no improvisa bien: nombres de
archivo, componentes y valores concretos; nada de «mejora el diseño».

## 7. Autonomía y avisos

Ayman quiere que casi todo vaya solo. Las sesiones avanzan sin preguntar y
deciden lo razonable por su cuenta, anotando la decisión en el PR. Solo se
le avisa (una entrada en plan/AVISOS.md y parar esa tarea, no el resto)
cuando:

- Hace falta una credencial, clave o cuenta (Stripe de prueba, Turnstile,
  Resend, Cloudflare) que no está disponible.
- Falta acceso de escritura a un repositorio.
- La acción es irreversible o hacia fuera: fusionar en main, desplegar a
  producción, borrar datos, publicar, escribir a alguien, abrir una PR en
  un repositorio ajeno (is-a.dev), cambiar el hosting o contratar algo.
- Un cambio choca con una regla de CLAUDE.md o cambia lo que un caso del
  portafolio afirma.
- En CineFlow, reescribir una parte hecha por sus compañeros de equipo más
  allá de lo visual.
- La verificación falla dos veces seguidas por lo mismo y la causa no está
  en el código de la sesión.

Cada aviso dice: qué pasa, qué opciones hay, cuál recomiendas y qué queda
bloqueado. Agrupa los avisos: no más de un mensaje a Ayman por frente y día.
Nada más se le pregunta.

Las PR se fusionan entre ramas de trabajo de forma automática cuando la
verificación está en verde. Hacia main nunca: eso lo hace Ayman.

## 8. Verificación (obligatoria antes de cada PR)

Portafolio: npm run build sin errores ni avisos nuevos; auditoría Playwright
de 11 páginas × 390/1440 px × claro/oscuro sin desplazamiento horizontal,
sin errores de consola ni imágenes rotas; Lighthouse ≥ 95 en las cuatro
categorías (hoy está en 100: si baja, se explica).

Zellige: ./mvnw verify (con las pruebas de Testcontainers) en el backend;
npm run build, lint y pruebas en el frontend; axe sin violaciones serias ni
críticas en cada pantalla tocada; capturas a 390 y 1440 px.

CineFlow: php artisan test completo (38 pruebas o más, ninguna saltada);
build de assets; axe igual que en Zellige; capturas a 390 y 1440 px.

Nunca se salta, desactiva ni rebaja una prueba para pasar. Si una prueba
existente falla antes de tocar nada, se anota en el PR y se arregla en una
sesión propia.

## 9. Al terminar tu sesión de planificación

Responde a Ayman con un mensaje corto: dónde están los planes, cuántas
sesiones hay por frente, en qué orden arrancan, qué puede ir en paralelo y
la lista de lo que solo él puede hacer (sección 3). Luego lanza la primera
sesión de cada frente que no tenga dependencias.
```

---

## Qué queda por decidir antes de pegarlo

Nada que bloquee. La sección «Ahora mismo» va como PR sin fusionar, así que Ayman decide al revisarla.
