# Ayman Charoui: estudio de marca personal

**Versión:** 2.0 (borrador para aprobar) · **Fecha:** 2026-10-15
**Sustituye a:** `BRAND.md` (julio 2026), que sigue en el repositorio como fuente: de ahí salen los arquetipos, el tono «sin humo» y el vocabulario de taller.
**Método:** pasos 1 a 3 de `FORMULA-MARCA-PORTAFOLIO.md`, con las skills `product-marketing` y `brandkit`.

Este documento razona cada decisión. Las reglas que deben obedecerse al construir la web se pasarán a `CLAUDE.md` cuando apruebes una dirección.

---

## 0. Decisiones que ya están tomadas

| Decisión | Valor | Origen |
|---|---|---|
| Darsi | No aparece en el portafolio | Tu respuesta del 2026-10-15 (opción a) |
| Rol | Desarrollador full-stack. Java es una de las tecnologías que has usado, no tu identidad | Tus respuestas (corregido el 2026-10-15) |
| Logotipo | La λ con gancho dentro de un cuadrado azul marino y un punto azul; en la web, «λyman.» | Elegido el 2026-10-15 (generado en ChatGPT y redibujado en SVG) |
| Color | Azul marino y punto azul; **nada de naranja** | Tu decisión del 2026-10-15 |
| Ubicación | Remoto (España o internacional); presencial o híbrido en Tarragona o Barcelona | Tu respuesta |
| Identidad | No depende de la empresa donde trabajes | Tu respuesta: «Etecnic no forma mi identidad» |
| Voz | Profesional y auténtica: ni eslogan ni coloquial | Tus respuestas sobre la frase |
| Stack de la web | Astro en Cloudflare Pages, sin servicios de pago | Prompt de la fórmula |

---

## 1. Punto de partida: qué falla hoy

La web actual (React + Vite) está bien hecha técnicamente, pero como marca tiene cinco problemas:

1. **La identidad cuelga de la empresa.** La prueba más fuerte y casi todo el relato salen de Etecnic. Si cambias de trabajo, la marca se queda sin centro.
2. **«Full-stack con base en Java» es una etiqueta, no una identidad.** Miles de perfiles en España la usan igual. Dice qué sabes, no cómo eres ni en qué destacas.
3. **Los proyectos se describen como folletos, no como casos.** Por ejemplo: «seguridad robusta (JWT)» o «sistema completo de reservas». Un responsable técnico busca el problema, la decisión que tomaste y el resultado.
4. **El adorno tapa el contenido.** Hay globo 3D, grafo de intereses, cintas, cursor de cometa, paleta de comandos, carrusel de tecnologías y muro de logos. Son señales de plantilla y contradicen tu perfil de riesgo visual (27/100, sobrio).
5. **El nombre de marca no es el que se busca.** «AyChEs» cuesta leerlo y pronunciarlo. Quien te contrata busca «Ayman Charoui» en Google y en LinkedIn.

---

## 2. Quién te lee y qué busca

| Audiencia | Tiempo que te dedica | Qué decide | Qué necesita ver |
|---|---|---|---|
| **Persona de selección técnica** | 30 segundos | Si pasas el filtro | Rol, stack, remoto o ubicación, idiomas, CV descargable |
| **Responsable técnico o CTO** | 3 a 5 minutos | Si te entrevista | Código real, decisiones técnicas con su porqué, pruebas, producción |
| **Cliente freelance** | 2 minutos | Si te escribe | Qué tipo de proyectos haces, si el suyo encaja, cómo empezar |

**Consecuencia de diseño:** el Inicio responde a la persona de selección, los casos al responsable técnico y la sección «¿Tienes un proyecto?» al cliente. Cada audiencia tiene su sitio y no se mezclan.

---

## 3. El hallazgo: el hilo común de tu trabajo

Si se ordena todo lo que has construido (en el trabajo y por tu cuenta) sin mirar dónde lo hiciste, sale un patrón:

| Lo que construiste | Qué tipo de problema es |
|---|---|
| Permisos por rol en endpoints REST, con tests (SaaS de recarga) | **Quién puede hacer qué** |
| JWT y control de acceso por roles (Zellige Hotels) | **Quién puede hacer qué** |
| Facturación en 9 idiomas y migración de los PDF a HTML/CSS en CI | **Qué se cobra, y que salga bien** |
| Pagos con Stripe y precios dinámicos (CineFlow) | **Qué se cobra, y que salga bien** |
| Bloqueo de butacas en tiempo real (CineFlow) | **Que dos personas no compren lo mismo** |
| Formación y trabajo en sistemas y redes (SMR, soporte IT) | **Dónde corre el código y por qué se cae** |

**Tu trabajo se concentra donde un error cuesta dinero o confianza:** accesos, cobros, concurrencia y entornos. No es un eslogan inventado, es lo que muestran tus proyectos. Además no depende de ninguna empresa: lo has hecho en tu trabajo y en tus proyectos propios.

Dos rasgos reales lo completan y te diferencian de otros perfiles full-stack:

- **Vienes de sistemas.** Antes de programar, mantenías servidores y redes (Windows Server, Linux, Office 365). Entiendes lo que hay debajo de la aplicación, y eso es raro en un perfil junior full-stack.
- **Trabajas en cuatro idiomas** (español, catalán, árabe e inglés) y has internacionalizado software a nueve. Sabes que un producto no termina cuando funciona en un idioma.

### Esencia de marca

> **Desarrollo con cuidado la parte de una aplicación que no puede fallar.**

Encaja con el estudio de julio: el artesano (Creador), atento (Cuidador) y honesto (Inocente). También con tus palabras de taller (acero, taller, ajedrez): precisión, no épica. La esencia es una brújula interna; no se publica tal cual.

---

## 4. Posicionamiento (paso 1)

### Frase del Inicio

**Recomendada.** Es profesional y auténtica: cada parte se puede comprobar en la web.

> **Ayman Charoui**
> Desarrollador full-stack. Me ocupo sobre todo de lo que no puede fallar en una aplicación: permisos, facturación y datos.

> *EN:* Full-stack developer. I mostly work on the parts of an application that can't fail: permissions, billing and data.

**Alternativa**, con más historia personal:

> Vengo de sistemas y redes, y hoy desarrollo aplicaciones web completas. Me ocupo sobre todo de lo que no puede fallar: permisos, facturación y datos.

Por qué funciona mejor que «de la API a la pantalla»:

- no es una metáfora;
- dice algo que un responsable técnico puede comprobar en los casos;
- te coloca en un sitio concreto (lo crítico) sin dejar de ser full-stack.

### Para quién, en orden

1. **Selección técnica, responsables técnicos y CTOs** de empresas con producto propio o con clientes, en remoto (España o internacional) o en Tarragona o Barcelona.
2. **Empresas o personas con un proyecto concreto** (freelance): una aplicación web a medida, una API o una integración de pagos o facturación.

### Tres pruebas verificables

| # | Prueba | Cómo se comprueba | Estado |
|---|---|---|---|
| 1 | **Código en producción en un SaaS multi-tenant** de gestión de recarga de vehículo eléctrico (permisos por rol con RSpec, facturación en 9 idiomas y pipeline de PDF en CI) | Caso escrito y referencia de la empresa | Falta una cifra real (ver §10) |
| 2 | **Bloqueo de butacas con concurrencia y pagos con Stripe** (CineFlow) | Repositorio público y demo | Falta explicar la técnica de bloqueo |
| 3 | **Control de acceso por roles con JWT en Spring Boot** (Zellige Hotels) | Repositorio público y demo | Lista |

### Qué no eres

- **No eres una agencia:** trabajas solo, en primera persona y con proyectos acotados.
- **No haces «de todo»:** ni WordPress de plantilla, ni tiendas genéricas, ni diseño gráfico.
- **No eres «senior»** ni lo insinúas: las fechas reales están a la vista. Es tu anti-marca: nada de inflar la experiencia.

### Llamadas a la acción

| | Texto | Destino |
|---|---|---|
| Principal | **Hablemos** | Correo, LinkedIn y CV en PDF (contratación) |
| Secundaria | **¿Tienes un proyecto?** | Formulario de 3 campos: qué necesitas, plazo y presupuesto aproximado |

---

## 5. Arquitectura de marca

| Elemento | Decisión | Por qué |
|---|---|---|
| Nombre de marca | **Ayman Charoui** | Es lo que se busca y lo que aparece en el CV y en LinkedIn. Es una marca personal, no un producto. |
| Nombre completo | Ayman Charoui Essamadi (aviso legal, datos estructurados y CV) | Coherencia legal y SEO |
| Usuario | `AyChEs` en GitHub y en el dominio | Ya existe y tiene historial; deja de ser la marca y pasa a ser un usuario |
| Logotipo | **Solo «Ayman»**: una «A» propia en un cuadrado redondeado más un acento con significado (estructura como la de Darsi, sin sus elementos) | Decisión tuya del 2026-10-15: el logotipo es tu nombre, sin apellido. Forma por decidir en el paso 3 |
| Dominio | `ayches.is-a.dev` (gratis) | Si algún día pagas uno, `aymancharoui.dev` (~12 €/año); no hace falta ahora |

---

## 6. Identidad verbal

### Reglas de tono

1. **Primera persona del singular**, en presente y con verbos concretos: «construyo», «migré», «probé».
2. **Hechos antes que adjetivos.** Si una frase se sostiene sin el adjetivo, el adjetivo sobra.
3. **Una idea por frase.** Frases cortas, sin encadenar subordinadas.
4. **Precisión técnica sin jerga de marketing.** Se dice «control de acceso por roles», no «seguridad robusta».
5. **Nada de eslóganes, metáforas ni frases en grupos de tres por estética.** Una enumeración solo si son tres cosas reales.
6. **Tono profesional, no coloquial.** El registro de un buen correo a un responsable técnico: cercano y correcto.
7. **Prohibido:** «apasionado», «ninja», «rockstar», «crack», «10x», «robusto», «de vanguardia», «soluciones», «sinergia», signos de exclamación y rayas largas en los textos visibles.

### Antes y después, con textos de la web actual

| Ahora | Propuesta |
|---|---|
| «Plataforma de administración empresarial con seguridad robusta (JWT), control de acceso por roles y dashboards de reporting.» | «Panel de gestión hotelera. Cada rol (recepción, gerencia, administración) ve y edita solo lo suyo; lo resolví con JWT y Spring Security.» |
| «Sistema completo de reservas de cine con bloqueo de butacas en tiempo real (concurrencia) y lógica de precios dinámicos.» | «Reservas de cine donde dos personas no pueden comprar la misma butaca. La butaca se bloquea al elegirla y se libera si no se paga.» |
| «Busco nuevas oportunidades» | «Disponible para un puesto full-stack, en remoto o en Tarragona y Barcelona.» |
| «Si quieres contar conmigo para un proyecto o una vacante, escríbeme.» | «Si tienes un puesto o un proyecto, escríbeme. Respondo en menos de 48 horas.» *(solo si lo vas a cumplir)* |

Los detalles de las propuestas (los roles del hotel, cuándo se libera la butaca) son ilustrativos hasta que confirmes cómo lo hiciste: la web no afirmará nada que no sea exacto.

### Idioma

La web se publica en inglés por defecto y en español. Cada idioma se escribe por separado, sin traducir literalmente: los dos tienen que sonar naturales.

---

## 7. Dos direcciones visuales (paso 2)

> **Dirección elegida el 2026-10-15: «Medianoche con señal».** No es ni la A ni la B tal cual. Usa el fondo oscuro mixto (casi negro con bloques en el azul marino del logotipo) y recupera lo que te gustaba de la web anterior: cintas de luz, resplandor azul, punto azul eléctrico, tarjetas en mosaico, globo y trayectoria. Todo ello al servicio de la marca nueva. Las reglas están en `CLAUDE.md` y la referencia en `docs/marca/referencias/direccion-final.html`. Lo que sigue en esta sección queda como registro de cómo se llegó.

Las dos comparten el logotipo, la voz y la estructura. El logotipo elegido (azul marino, papel y punto azul) encaja de forma natural con la A. Cambia cómo se ve el «taller».

### Dirección A: «Plano técnico» (recomendada)

**Idea:** la web como un plano de taller, con medidas, cotas y tolerancias: precisión que se ve. Une tus palabras (acero, taller, ajedrez) con tu hallazgo (lo que no puede fallar se mide).

| Rol | Claro (por defecto) | Oscuro («medianoche») |
|---|---|---|
| Fondo | `#F3F4F1` papel técnico | `#0D1220` |
| Superficie | `#FFFFFF` | `#141B2D` |
| Texto | `#121620` | `#ECEEF2` |
| Texto secundario | `#4D5562` | `#A3ABBA` |
| Línea | `#D9DBD6` | `#263049` |
| Principal (también botones) | `#14213D` azul marino del logotipo, con texto blanco encima | `#9DB0D6`, con texto oscuro encima |
| Punto (enlaces, foco y detalles) | `#3A5A8C`, el punto del logotipo | `#7C9BD1` |

- **Contraste comprobado (AA):** texto 16,4:1; secundario 6,8:1; botón azul marino 16:1; punto como texto 6,3:1. En oscuro, todo por encima de 6:1.
- **Proporción:** 60 % papel y blanco, 30 % azul marino, 10 % punto azul como máximo. Sin naranja en ningún sitio.
- **Tipografía:**
  - **Plus Jakarta Sans** (titulares, peso 700–800): es la del logotipo «λyman.», así que titulares y marca hablan con la misma voz.
  - **Geist** (cuerpo): neutra y muy legible.
  - **Geist Mono** (cotas, fechas, versiones y datos).
  - Las tres son de Google Fonts y se alojan en la propia web.
- **Forma:** esquinas de 4 px, sin sombras y separación con líneas de 1 px, como un plano.
- **Motivo propio:** la **cota** (línea de medida con topes en los extremos). Aparece junto al logotipo, para numerar las secciones y para medir resultados en los casos. Hay además una retícula milimetrada de 8 px al 4 % de opacidad.
- **Modo:** claro y oscuro, con el claro por defecto.
- **Por qué la recomiendo:**
  1. Es la única de las dos que no parece un portafolio de desarrollador más: los de fondo oscuro con cian son la plantilla más común.
  2. El fondo claro se lee mejor en los 30 segundos de la persona de selección, que suele llegar desde el CV o LinkedIn.
  3. Un solo azul marino con un punto azul es sobrio y reconocible, y es exactamente el color de tu logotipo.
  4. El motivo de la cota cuenta tu tesis (precisión) sin decirla.
- **Riesgo:** rompe con el cian actual. Lo compensa que el azul marino de siempre pasa a ser el centro de la marca.

### Dirección B: «Medianoche»

**Idea:** el taller de noche, con el cursor siempre esperando: algo se está construyendo. Es la evolución directa de tu marca actual (cursor «_» y cian).

| Rol | Oscuro (por defecto) | Claro |
|---|---|---|
| Fondo | `#0A0F1C` | `#F2F4F8` |
| Superficie | `#111829` | `#FFFFFF` |
| Texto | `#E6EAF2` | `#0F1626` |
| Texto secundario | `#98A2B6` | `#4A5468` |
| Línea | `#222C42` | `#D5DBE6` |
| Principal | `#22345C` acero nocturno | `#14213D` |
| Acento (solo acciones) | `#7FD1E0` cian (se mantiene), con texto oscuro encima | `#0E7490`, con texto blanco encima |

- **Contraste comprobado (AA):** texto 15,9:1; secundario 7,5:1; botón cian 11:1. En claro, el botón da 5,4:1.
- **Tipografía:**
  - **Archivo** en ancho expandido (titulares): una grotesca industrial, de acero.
  - **Archivo** en ancho normal (cuerpo).
  - **JetBrains Mono** (datos).
- **Forma:** esquinas de 12 px, sin sombras; la profundidad viene de las superficies, y el cian brilla solo en el foco.
- **Motivo propio:** el **cursor «_»** junto al logotipo y al final de los titulares, más una línea de traza fina que une las secciones como una pista de circuito, al 6 %.
- **Modo:** oscuro por defecto y claro como opción.
- **A favor:** es continuista, se reconoce enseguida como «de programador» y aprovecha lo que ya tienes.
- **En contra:**
  - se parece a muchos portafolios oscuros con acento cian;
  - el oscuro por defecto cansa más al leer los casos largos.

### Qué se evitó a propósito

Se descartó el motivo geométrico de estrella (zellige o estrella de ocho puntas), la gama verde azulado, arena y ámbar, y la tipografía Cairo. Son la identidad de Darsi, y usarlos te vincularía con ella en público, que es justo lo que decidiste evitar.

---

## 8. Logotipo (paso 3): elegido

Se generó en ChatGPT con `docs/marca/prompt-logo.md` y se redibujó a mano en SVG sobre la imagen elegida.

- **Símbolo:** una λ con gancho arriba a la izquierda, dentro de un cuadrado azul marino de esquinas muy redondeadas, con un punto azul abajo a la derecha.
  - **La λ es la A de Ayman** y, a la vez, λ: el símbolo de la función en programación, que comparten todos los lenguajes. No representa una tecnología concreta, sino el oficio.
  - **El punto es el punto final:** el trabajo terminado y comprobado, lo que no puede fallar.
- **En la web, el símbolo forma el nombre:** «λyman.». La λ hace de A, «yman» va en Plus Jakarta Sans 800 y el punto cierra la palabra.
- **Animación** (prototipo en `docs/marca/logo/animacion-logo.html`):
  - **Entrada del Inicio:** el logo aparece centrado; el cuadrado se recoge sobre la λ, que pasa a azul marino. El punto sale de la esquina y avanza escribiendo «yman» hasta quedarse como punto final. Dura 1,1 s, con la curva `cubic-bezier(.23,1,.32,1)`.
  - **Barra de navegación:** arriba se lee «λyman.»; al bajar se recoge en el icono, y al volver arriba se despliega.
  - Con `prefers-reduced-motion` se muestra el estado final sin movimiento.
- **Archivos** en `docs/marca/logo/`:
  - `ayman-icono.svg`: icono y favicon, en una retícula de 512.
  - `ayman-simbolo.svg`: la λ y el punto, sin cuadrado; la λ toma el color del texto.
- **Colores:** cuadrado `#14213D`, letra `#F3F4F1`, punto `#3A5A8C`.

---

## 9. La web que sale de esto (avance del paso 5, no se programa todavía)

1. **Inicio:**
   - nombre, frase del §4 y una prueba visible («Código en producción desde 2025 · 3 casos con código público»);
   - botones «Ver proyectos» y «Hablemos»;
   - descargar el CV.
2. **Casos** (3, cada uno con su propia URL):
   - **Facturación en 9 idiomas en un SaaS de recarga eléctrica.** Etecnic aparece como contexto, no como identidad.
   - **CineFlow:** que dos personas no compren la misma butaca.
   - **Zellige Hotels:** cada rol ve solo lo suyo.

   Cada caso incluye el problema, tus decisiones y por qué, el resultado medible, el stack, el código y un diagrama propio.
3. **Cómo trabajo:** tests antes del merge, cambios pequeños y revisables, documentación y entender el sistema entero, de la red a la interfaz. Solo lo que haces de verdad.
4. **Sobre mí:**
   - el camino de sistemas a desarrollo, contado en 4 líneas;
   - los cuatro idiomas;
   - el CV en PDF.
5. **¿Tienes un proyecto?:**
   - un formulario de 3 campos;
   - qué proyectos aceptas (aplicaciones web a medida, APIs, integraciones de pago o facturación, mejoras en Laravel, Spring o Rails);
   - cuáles no (WordPress o tiendas de plantilla, apps nativas, urgencias 24/7).
6. **Pie:** GitHub, LinkedIn y correo como texto que se puede copiar.

**Lo que sale de la web actual:**

- **Fuera:** el globo 3D, el grafo de intereses, las cintas, el fondo ambiental, el cursor de cometa, la paleta de comandos, el carrusel y el muro de logos de tecnologías. El stack pasa a estar dentro de cada caso.
- **Fuera:** el bloque «Ingeniería embebida e IA», porque distrae del rol.
- **Se mantiene, en otra forma:** la trayectoria, ahora dentro de «Sobre mí».

---

## 10. Lo que necesito de ti para cerrar los pasos 1 a 3

1. **Elegir la dirección A o B**, o pedir una mezcla concreta, por ejemplo la A con el cursor de la B.
2. **Validar la frase del Inicio** (la recomendada o la alternativa) y la tesis «lo que no puede fallar»: ¿te reconoces en ella?
3. **Una cifra real** del SaaS de recarga, aunque sea un orden de magnitud, y si puedes nombrar a sus clientes (GALP, AENA, Celsia).
4. **Cómo resolviste el bloqueo de butacas en CineFlow**: bloqueo en base de datos, reserva temporal con caducidad u otra técnica.
5. **Freelance:** revisa si tu contrato tiene un pacto de plena dedicación o de exclusividad antes de anunciar que aceptas proyectos. En España, el pacto de plena dedicación tiene que estar firmado y compensado (artículo 21 del Estatuto de los Trabajadores); sin él puedes trabajar por tu cuenta mientras no compitas con tu empresa. Para facturar necesitarás darte de alta como autónomo cuando llegue el primer proyecto.
6. **Generar el logotipo** con `docs/marca/prompt-logo.md` y, con el elegido, **el tablero de marca** con `docs/marca/prompts-brandkit.md` (ChatGPT o similar).

---

## Movimiento

La web se recorre como una presentación animada de la marca. El movimiento no añade nada a la marca: la paleta, la tipografía, los textos y la estructura son los de arriba. Cada animación tiene una función (orientar, mostrar un cambio de estado o contar el caso en orden) y todas se apagan con `prefers-reduced-motion`: estado final, sin Lenis, sin pins, sin apertura, sin fondo vivo, sin transición entre páginas.

### Tokens de movimiento

Viven en un solo sitio: el bloque «TOKENS DE MOVIMIENTO» de `src/styles/global.css`. `src/scripts/tokens.ts` los lee para GSAP y registra las curvas con los mismos nombres. No se escriben duraciones ni curvas sueltas en ningún otro archivo.

| Token | Valor | Para qué |
|---|---|---|
| `--ease` / `brand` | `cubic-bezier(.23,1,.32,1)` | El logotipo, los botones y los objetos de la mesa |
| `--ease-out` / `out` | `cubic-bezier(.16,1,.3,1)` | Entradas de contenido |
| `--ease-io` / `io` | `cubic-bezier(.65,0,.35,1)` | Cambios de estado y transiciones de página |
| `--d-fast` | 0,2 s | Pulsaciones y hover |
| `--d-base` | 0,45 s | Subrayados, colores, puntos de progreso |
| `--d-slow` | 0,9 s | Entrada de bloques de texto |
| `--d-brand` | 1,1 s | Animación del logotipo y titulares |
| `--d-open` | 0,64 s | Vuelo del icono en la apertura (más 1,1 s del nombre: 1,74 s en total) |
| `--d-page` | 0,7 s | Transición entre páginas |
| `--d-scramble` | 0,3 s | Etiquetas que se descifran |
| `--step` | 0,07 s | Retardo entre elementos de una misma capa |
| `--scene` | 0,22 s | Retardo entre capas de una escena |

### Piezas

- **Apertura** (`scripts/brand.ts`, `Hero.astro`). Solo en la primera visita de la sesión (`sessionStorage`), sin ancla ni scroll previo. Una capa fija con `transform` y `opacity` cubre el Inicio: el icono aparece grande en el centro y vuela hasta su sitio en «λyman.», donde sigue la animación de siempre. El texto real del Inicio está en el DOM debajo de la capa, de modo que no retrasa el LCP. Solo WAAPI y CSS. Si el script no llega, la capa se retira sola a los 2,6 s. Un scroll durante la apertura la termina al instante.
- **El punto como hilo** (`scripts/thread.ts`). En escritorio (desde 1000 px) un trazado fino recorre el margen izquierdo y el punto azul baja por él ligado al scroll. Al llegar a cada sección se acerca a su elemento y se superpone a él: el punto de «Disponible», el punto final de los titulares de Casos, Stack, Cómo trabajo y Sobre mí, el punto del formulario (que se vuelve ✓ al enviarse bien: entonces el punto del hilo se desvanece) y el punto final de «Hablemos.». En móvil no se crea: no hay margen y estorbaría.
- **Escenas** (`scripts/motion-core.ts`, `SCENES`). Cada bloque entra en este orden: titular con su etiqueta, visual y datos, con `--scene` entre capas y `--step` dentro de cada una. Los titulares entran por líneas con máscara y el punto azul llega el último.
- **Etiquetas que se descifran** (`scripts/scramble.ts`). Las etiquetas mono (`// caso 01`, `problema`) pasan por caracteres aleatorios hasta su texto en 0,3 s. El texto real queda en el DOM, en un `span` oculto a la vista, para el lector de pantalla; el ancho no cambia. Las que ya están a la vista al cargar no se animan.
- **Transición entre páginas.** View Transitions entre documentos (`@view-transition { navigation: auto }`). La imagen del caso y su titular llevan el mismo `view-transition-name` en el Inicio y en la página del caso, así que la imagen se expande hasta ser la cabecera y el titular viaja a su sitio. Sin soporte del navegador es una navegación normal.
- **Página de caso como historia.** En escritorio, «Decisiones» se fija y las decisiones pasan una a una, con su porqué y unos puntos que marcan por cuál vas. El índice lateral llena una línea azul en cada sección según lo que llevas leído. En móvil o con menos de 680 px de alto, las decisiones entran como el resto.
- **Fondo vivo** (`scripts/field.ts`). Canvas 2D: la retícula de puntos tiene tres capas de profundidad (las lejanas se mueven más despacio con el scroll), reacciona al cursor como un campo de fuerza suave, ondula con el scroll y un haz azul la recorre cada pocos segundos. Las cintas de luz detrás del nombre fluyen y se deforman con el scroll y dos destellos las recorren. En táctil hay menos puntos y responde al toque, al arrastre y al scroll. Arranca con el primer gesto (no pesa en la carga), se pausa con la pestaña oculta y, las cintas, fuera de pantalla. Un regulador baja la calidad por pasos si dibujar cuesta demasiado y, en último caso, devuelve la retícula y las cintas estáticas de CSS. Solo usa colores de la paleta; la CSP no cambia.
- **Microdetalles.** Cursor normal. Los enlaces del texto se subrayan con un trazo azul que crece desde la izquierda. El botón principal lleva un brillo que sigue al ratón dentro del botón (`scripts/micro.ts`).

### Reglas técnicas

- Solo se animan `transform` y `opacity` (más `clip-path` donde ya se usaba: el hilo y la máscara del logotipo).
- GSAP, ScrollTrigger y Lenis siguen cargándose con el primer gesto. La apertura funciona sin ellos.
- Los pins no tapan el foco: el teclado y el lector de pantalla recorren el mismo DOM.
- Lighthouse debe seguir en 95 o más en las cuatro categorías, en móvil y en escritorio.

### Escala de espaciado

Una sola escala de márgenes verticales, en `:root` de `src/styles/global.css`. Los pasos fluidos se encogen en móvil para que no queden huecos grandes entre secciones.

| Token | Valor | Uso |
|---|---|---|
| `--sp-1` a `--sp-3` | 4, 8, 16 px | Huecos pequeños dentro de componentes |
| `--sp-4` | 24 px | Entre elementos de un bloque |
| `--sp-5` | 40 px | Entre bloques relacionados (cinta, pie, legal) |
| `--sp-6` | 64 px | Entre el contenido del Inicio y su línea de datos |
| `--blk` | 32 a 48 px | Entre bloques de una misma sección y entre casos |
| `--head` | 32 a 48 px | Bajo el titular de sección |
| `--sec` | 64 a 104 px | Entre secciones y sobre el pie |
| `--top` | 104 a 132 px | Bajo la barra: Inicio y cabecera de caso |

Con esta escala la página del Inicio mide 310 px menos en escritorio (1440 px) y 740 px menos en móvil (390 px) que con los 130 px fijos de antes, sin bandas vacías alrededor de los pins de «Cómo trabajo» ni del pie con «Ayman.».
