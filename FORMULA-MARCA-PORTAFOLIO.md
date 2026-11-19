# Fórmula de marca y web para tu portafolio de desarrollador

Es el mismo método con el que se creó la marca de Darsi y su web, adaptado a un portafolio personal. Objetivo:

- presentarte como programador, sobre todo para que te contraten;
- tener una vía clara para aceptar proyectos freelance cuando surjan, sin venderte como agencia.

Úsalo en una sesión propia, con un repositorio propio. Nada de esto necesita el repositorio de Darsi, salvo copiar las skills (paso 0).

## Aviso antes de empezar: Darsi y tu nombre

En Darsi hay una decisión tuya del 02/10/2026: la marca habla en plural, y no se dice que la hace una persona ni se da el nombre del fundador.

Si en tu portafolio pones «Creé Darsi», esa decisión se rompe en público. Hay dos opciones:

- **Opción a:** no mencionar Darsi y enseñar otros proyectos.
- **Opción b:** contarlo como caso técnico sin el nombre ni la marca, por ejemplo «App móvil educativa con Expo y Supabase, para miles de usuarios».

Decide tú antes de escribir los casos.

## 0. Las skills (cópialas de Darsi, ya revisadas)

Todas tienen licencia MIT. Cópialas a `.claude/skills/` de tu repositorio, junto con su licencia en `docs/terceros/`:

```sh
mkdir -p ~/portafolio/.claude/skills ~/portafolio/docs/terceros
cd ~/Darsi
for s in taste-skill brandkit imagegen-frontend-web product-marketing seo-audit ai-seo \
         frontend-ui-engineering performance-optimization spec-driven-development \
         planning-and-task-breakdown incremental-implementation code-review-and-quality \
         verification-before-completion browser-testing-with-devtools; do
  cp -r .claude/skills/$s ~/portafolio/.claude/skills/
done
cp .claude/skills/LICENSE-taste-skill ~/portafolio/docs/terceros/
cp docs/terceros/marketingskills-LICENSE.txt docs/terceros/agent-skills-LICENSE.txt docs/terceros/superpowers-LICENSE.txt ~/portafolio/docs/terceros/
```

| Skill | Origen (licencia, commit usado en Darsi) | Para qué en el portafolio |
|---|---|---|
| product-marketing | coreyhaines31/marketingskills (MIT, 1efedbc) | Paso 1: posicionamiento. Crea `.agents/product-marketing.md` con quién eres, para quién y con qué pruebas |
| brandkit | leonxlnx/taste-skill (MIT, ce26fc2) | Paso 3: tablero de marca y logotipo (monograma) como prompts de imagen |
| imagegen-frontend-web | leonxlnx/taste-skill | Paso 4: una imagen de referencia por sección de la web antes de programar |
| taste-skill | leonxlnx/taste-skill | Paso 5: implementar la web sin aspecto de plantilla. Su archivo declara `name: design-taste-frontend`; si tu agente no la carga sola, que la lea a mano |
| frontend-ui-engineering | addyosmani/agent-skills (MIT, 1401c8b) | Componentes accesibles (WCAG 2.2 AA) |
| performance-optimization | addyosmani/agent-skills | Core Web Vitals: una web de un desarrollador tiene que ir rápida |
| spec-driven-development, planning-and-task-breakdown, incremental-implementation, code-review-and-quality | addyosmani/agent-skills | El ciclo spec, plan, construir y revisar |
| seo-audit, ai-seo | coreyhaines31/marketingskills | Que te encuentren al buscar tu nombre y que los asistentes de IA te citen |
| verification-before-completion | obra/superpowers (MIT, bb92a77) | No dar nada por terminado sin comprobarlo |
| browser-testing-with-devtools | addyosmani/agent-skills | Revisar la web en un navegador real |

La pieza clave de Darsi: una skill propia de marca que envuelve taste-skill y dice qué manda cuando chocan (en Darsi, `darsi-diseno-landing`). Créala en el paso 5 como `mi-marca-web`.

## 1. Posicionamiento (skill product-marketing)

Responde en `.agents/product-marketing.md`:

- **Quién eres en una frase.** Por ejemplo: «Desarrollador backend que diseña sistemas fiables y los lleva a producción».
- **Para quién**, en orden:
  1. personas de selección técnica y CTOs;
  2. empresas o personas con un proyecto concreto (freelance).
- **Qué te diferencia**, con 3 pruebas verificables: un sistema en producción, una cifra real de escala o rendimiento, un repositorio público o algo que hayas escrito.
- **Qué no eres:** ni agencia, ni «hago de todo».
- **Llamadas a la acción:**
  - la principal, «Hablemos» (contratación);
  - la secundaria, «¿Tienes un proyecto?» (freelance), con un formulario breve: qué necesitas, plazo y presupuesto aproximado.

## 2. Reglas de marca escritas (el AGENTS.md o CLAUDE.md del portafolio)

Es lo que hizo funcionar Darsi: la marca está escrita como reglas que cualquier agente obedece, no como «ideas». Copia esta plantilla y rellénala:

```md
## Marca
- Tipografía: <display> para titulares y <texto> para el cuerpo (Google Fonts), y <mono> para código y datos.
- Paleta: fondo <hex>, superficie <hex>, texto <hex>, texto secundario <hex>, línea <hex>, principal <hex>, acento <hex> (solo para acciones).
- Proporción: 60 % fondo y superficie, 30 % principal, 10 % acento como máximo.
- Forma: esquinas de <n> px; sombras <estilo>; un motivo propio a muy baja opacidad (en Darsi, la estrella de ocho puntas). Para un dev, por ejemplo, una retícula, un rastro de terminal o un diagrama de nodos.
- Tono: <primera persona del singular>, frases cortas, precisión técnica, sin humo («apasionado», «ninja»).
- Prohibido: fotos de stock, iconos genéricos de «código», degradados morados, plantillas de portafolio, rayas largas en los textos visibles.
- Accesibilidad: WCAG 2.2 AA; toda animación respeta prefers-reduced-motion.
- Modo: <solo claro | claro y oscuro>.
## Precedencia
Si una skill choca con estas reglas, mandan estas reglas.
```

Por qué funciona:

- con proporción y roles de color, el acento no se gasta;
- con un motivo propio, la marca se reconoce sin logotipo;
- con prohibiciones explícitas, la IA no cae en lo genérico.

## 3. Marca visual (skill brandkit)

- Pide a brandkit un tablero de marca con los datos del paso 2: monograma con tus iniciales, paleta, tipografía, motivo y 2 o 3 aplicaciones (favicon, tarjeta para LinkedIn, cabecera).
- Genera las imágenes tú mismo, con ChatGPT o una herramienta similar. Son solo una referencia: el logotipo final se dibuja en SVG limpio, y el texto de las imágenes nunca se copia.
- Elige una dirección y escríbela en el paso 2 con fecha.

## 4. Referencia de cada sección (skill imagegen-frontend-web)

Una imagen por sección, no una con toda la página:

- Inicio: tu tesis en una frase y una prueba visible.
- Proyectos: como casos.
- Cómo trabajo.
- Escritos o charlas.
- Contacto y freelance.

Sirve para decidir la composición antes de programar. Con 5 o 6 imágenes basta.

## 5. Implementación (skill taste-skill y tu skill mi-marca-web)

Stack recomendado (el de Darsi, gratis):

- Astro, con GSAP y Lenis solo si aportan;
- despliegue en Cloudflare Pages;
- formulario de contacto con una Pages Function y Cloudflare Turnstile contra bots;
- correo con Resend cuando tengas dominio.

Crea `.claude/skills/mi-marca-web/SKILL.md`:

```md
---
name: mi-marca-web
description: Diseño de la web del portafolio con taste-skill adaptada a mi marca. Úsala antes de tocar el aspecto de la web.
---
1. Lee entera .claude/skills/taste-skill/SKILL.md.
2. Mandan las reglas de «Marca» de CLAUDE.md: paleta, tipografía, motivo, tono y prohibiciones.
3. Usa las referencias de docs/diseno/ (paso 4) solo como composición, nunca su texto.
4. Justifica cada decisión visual en una frase.
5. Antes de terminar: Playwright a 390 px y 1440 px, sin desplazamiento horizontal, contraste AA y Lighthouse de 95 o más.
```

Estructura que convierte en un portafolio de desarrollador:

- **Inicio:** quién eres, qué haces mejor y una prueba (cifra o sistema en producción). Botones «Ver proyectos» y «Hablemos».
- **3 o 4 casos, no 12 tarjetas.** Cada uno con:
  - el problema;
  - tus decisiones técnicas y por qué;
  - el resultado medible;
  - el stack;
  - el enlace al código si es público.

  Usa diagramas propios o capturas reales, nunca maquetas de stock.
- **Cómo trabajo:** tu forma de trabajar (pruebas, observabilidad, documentación). Es lo que diferencia a un backend.
- **Sobre mí** breve y CV en PDF.
- **«¿Tienes un proyecto?»:** formulario de 3 campos y un texto honesto sobre qué tipo de proyectos aceptas y cuáles no. Así el freelance queda abierto sin que la web sea de un freelance.
- **Pie:** GitHub, LinkedIn y correo como texto que se puede copiar.

## 6. Que te encuentren (skills seo-audit y ai-seo)

- Título y descripción con tu nombre y tu rol.
- Datos estructurados Person (JSON-LD) con `sameAs` a GitHub y LinkedIn.
- Una página por caso, con su propia URL.
- `llms.txt` con un resumen de quién eres y tus casos, para que los asistentes de IA te citen bien.

## 7. Verificar antes de publicar

- `npm run build` sin errores.
- Playwright a 390 px y 1440 px, sin desplazamiento horizontal.
- Contraste AA y navegación con teclado.
- Lighthouse de 95 o más en rendimiento y accesibilidad.
- Probar el formulario de verdad.
- Revisión con code-review-and-quality y verification-before-completion.

## Prompt para empezar la sesión nueva

> Vamos a crear mi portafolio de desarrollador. Lee FORMULA-MARCA-PORTAFOLIO.md y sigue sus pasos en orden, sin saltarte ninguno.
> Empieza por el paso 1 con la skill product-marketing: entrevístame pregunta a pregunta hasta tener mi posicionamiento.
> Después propón las reglas de marca del paso 2 con 2 direcciones visuales distintas, justificadas, para que yo elija.
> No programes nada hasta tener aprobados los pasos 1 a 4. Stack: Astro en Cloudflare Pages, sin servicios de pago.
