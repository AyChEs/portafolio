# Marca v3 · «Tinta, marino y un punto»

Propuesta del 2026-11-19. **Pendiente del visto bueno de Ayman.** Hasta entonces mandan las reglas de `CLAUDE.md`. Si se aprueba, se actualizan allí las secciones «Marca» y «Prohibido».

## 1. Por qué cambiar

La v2 («Medianoche con señal») funciona, pero tiene tres problemas que se ven al compararla con los portafolios premiados de este año:

1. **Demasiado azul.** El fondo tira a azul, el marino es azul, el botón es azul y las etiquetas son azules. Todo se funde y el azul deja de señalar nada.
2. **La tipografía no tiene voz.** Plus Jakarta Sans es correcta, pero es la de cientos de plantillas. Los portafolios de referencia tienen un titular reconocible desde lejos.
3. **Los elementos visuales son decoración, no contenido.** Cintas de luz y retícula de puntos no cuentan nada del trabajo. En las referencias, lo que se mueve al hacer scroll explica el proyecto.

Lo que se conserva: el nombre «λyman.», la λ, el punto como motivo, el azul marino como color de marca, el tono, la estructura de secciones y todo el trabajo de accesibilidad y rendimiento.

## 2. Referencias (Awwwards, noviembre de 2026)

Revisadas con capturas reales, no de memoria. Solo portafolios personales de desarrolladores.

| Sitio | Premio | Qué tomamos | Qué no tomamos |
|---|---|---|---|
| **Christen Dijoux** (christendijoux.com) | Mención, 28-10-2026 | La más cercana a nosotros: desarrollador full-stack que «cuida la interfaz tanto como el código». Ficha bajo la barra (nombre, ciudad, rol, hora local), marco de líneas finas, índices `[00]`, titular estrecho enorme, globo de puntos con coordenadas, datos grandes («13 672 KM») con origen y destino en mono. | Banner de cookies, asistente de IA, blanco y negro puro. |
| **Carter Ogunsola** (carterogunsola.com) | Developer Award + Sitio del día, 19-11-2026 | Barra de estado con datos reales en mono (`FPS`, `LCP::1.4s`, `Booking::Q1'27`), paleta de órdenes `⌘K`, ilustraciones 3D tipo maqueta sobre tarjetas inclinadas, numeración `N°01 / 17`. | Cursores de otros visitantes (necesitan servidor y distraen), colores pastel. |
| **Daksh Gajjar** (dakshgajjar.com) | Mención, 27-10-2026 | Titular de grotesca pesada a todo el ancho con texto en mono debajo; un único hilo de color que se dibuja con el scroll; fragmentos de interfaz reales (contrato, alquiler, impuestos) como ilustración del proyecto. | El naranja del hilo. |
| **Daniel Kiss** (danielkiss.hu) | Mención, 18-09-2026 | Reglas y coordenadas en el borde (`X:0000 Y:0000`), navegación numerada, columna fija con ficha y correo copiable. | Rojo, tipografía de rotulador. |
| **Guillaume Colombel, Léo Parpeix, Maria Vasilyeva** | Developer Award + Sitio del día | Disciplina: dos colores, mucho aire, la retícula se nota. | Fondos claros a toda la web, fotos de producto. |

Conclusión: el patrón común no es «más efectos». Es **un sistema**: retícula visible, números e índices, mono para los datos, un titular con carácter y un solo acento. Encaja con un desarrollador que cuida lo que no puede fallar.

## 3. Idea de marca

**Ayman es el desarrollador que enseña los números.** La web tiene el aspecto de un panel de control bien hecho: medidas reales, estados, coordenadas y un punto azul que indica lo que importa. No hace falta decir «cuido el rendimiento» si la barra superior muestra el LCP medido de la propia página.

- **Para quien contrata:** ve criterio técnico en cada detalle, no en adjetivos.
- **Para quien tiene un proyecto:** ve cómo trabajo antes de escribirme, con casos explicados y un formulario serio.

## 4. Paleta

El azul marino pasa a ser **el** color de la marca (superficies grandes). El azul brillante queda solo para el punto y los estados. El fondo deja de ser azulado y pasa a ser tinta neutra.

| Rol | Oscuro (por defecto) | Claro |
|---|---|---|
| Fondo | tinta `#07080B` | tiza `#ECEBE6` |
| Fondo 2 | `#0E1014` | `#F6F6F3` |
| **Marca: azul marino** (bloques, tarjetas de caso, fondos de las ilustraciones) | `#14213D`; `#1B2B4D` al pasar el ratón | `#14213D` con texto tiza |
| Texto | tiza `#ECEBE6` | tinta `#0B0D12` |
| Texto secundario | `#8E929B` | `#4E535C` |
| Línea | `#23262D` | `#D6D5CF` |
| **Señal** (solo el punto, foco, «Disponible», enlace activo) | `#3B82F6` | `#1D4ED8` |

- **Proporción:** 60 % tinta, 30 % marino, 7 % tiza en titulares y botones, 3 % señal como máximo.
- **Botón principal:** fondo tiza con texto tinta, no azul. El azul ya no compite con el punto.
- **Sin naranja, sin morado, sin arena.** La tiza es fría (gris claro), no beige, para no acercarse a Darsi.
- Los contrastes se comprueban al implementar; objetivo WCAG 2.2 AA (secundario sobre tinta ≥ 4,5:1).

## 5. Tipografía

Dos familias libres (OFL), alojadas en la propia web con Fontsource:

| Uso | Familia | Detalle |
|---|---|---|
| Titulares y nombre | **Archivo** variable (eje de anchura 62–125 y peso 100–900) | Titulares en anchura estrecha (`wdth` 70, `wght` 750), mayúsculas, interlineado 0,9 e interletraje −1 %. |
| Texto | **Geist** variable | 400 y 500, 17 px en escritorio. |
| Etiquetas, datos, barra de estado | **Geist Mono** | 11–13 px, mayúsculas, interletraje +6 %. |

**Firma propia:** el nombre «λyman.» usa el eje de anchura de Archivo. Al cargar entra ancho (`wdth` 125) y al bajar se estrecha hasta quedar en la barra. Es una animación que solo permite una tipografía variable, cuesta cero imágenes y nadie de las referencias la usa.

Se retiran Plus Jakarta Sans y JetBrains Mono.

## 6. Componentes (nivel de detalle)

1. **Barra de estado** (arriba, mono, 24 px): `TARRAGONA 12:44 · LCP 0,9 s · CLS 0 · AXE 0 ERRORES · ● DISPONIBLE`. Los valores salen del informe de Lighthouse y axe generado en la compilación, no se inventan. Se oculta en móvil salvo la hora y el estado.
2. **Ficha bajo la barra** en cuatro columnas: `AYMAN CHAROUI` · `TARRAGONA, ES · 41.12°N 1.24°E` · `DESARROLLADOR FULL-STACK` · `HORA LOCAL`.
3. **Marco**: líneas de 1 px en los bordes, con cruces de registro `+` en las esquinas y una regla con marcas cada 100 px en el lateral (solo escritorio).
4. **Índices**: secciones `[01] CASOS`, casos `N°01 / 04`, todo en mono.
5. **Paleta de órdenes `⌘K` / `Ctrl K`**: ir a una sección, copiar el correo, descargar el CV, cambiar de idioma. Accesible con teclado y con lector de pantalla (`role="dialog"`, lista con `aria-activedescendant`).
6. **Hilo con el punto**: una línea fina en tiza que recorre la página con el scroll. El punto azul viaja por ella y se detiene en cada titular como punto final («Casos.»). Se reutiliza `thread.ts`.
7. **Campo de puntos**: la retícula pasa a ser un campo que forma figuras por sección. En «Sobre mí» forma un globo con Tarragona marcada y sus coordenadas. Se reutiliza `field.ts` (canvas 2D, sin WebGL).
8. **Fragmentos de interfaz como ilustración** (sin créditos, en HTML): cada caso trae 3 o 4 tarjetas que se montan al hacer scroll con los datos reales del proyecto:
   - Zellige Hotels: una reserva con fechas, una línea de pago con Stripe y el estado «confirmada».
   - CineFlow: un plano de butacas con tres ocupadas y el total.
   - LaComu: el informe de accesibilidad «39 → 0» con la barra bajando.
   - Etecnic: una matriz de permisos y una factura con su estado, sin nombres de clientes.
9. **Tarjetas inclinadas con la ilustración 3D** del caso (ver punto 7), sobre fondo marino, con un leve giro siguiendo el ratón.
10. **Teclado 3D**: se queda; caja en marino, teclas en tinta y la λ con el punto azul.

## 7. Elementos visuales para el scroll

Lo más importante de esta versión. Tres técnicas, de más barata a más cara:

| Técnica | Cómo | Dónde | Coste |
|---|---|---|---|
| **Fragmentos de interfaz** | Tarjetas HTML que entran escalonadas, fijadas mientras se lee el caso (ScrollTrigger `pin`). | Casos | 0 créditos |
| **Maquetas 3D ilustradas** | Imagen generada; en código, capas con paralaje y la tarjeta inclinada. | Inicio y una por caso | 1 crédito cada una |
| **Película al hacer scroll** | Un vídeo corto generado a partir de la maqueta del Inicio. Se extraen ~48 fotogramas a WebP y el scroll los dibuja en un canvas (como Apple o Carter). | Inicio | 6 créditos |

**Estilo de las maquetas** (para que no parezcan iconos sueltos): dioramas en miniatura, vistos en isométrico, acabado mate tipo arcilla, habitación en azul marino `#14213D`, objetos en tiza, una sola luz azul pequeña (el punto), luz de estudio suave y desenfoque de maqueta. Sin texto, sin logotipos, sin personas, sin naranja.

| Pieza | Escena |
|---|---|
| Inicio | Taller nocturno en miniatura: mesa con teclado mecánico, monitor con un terminal, flexo apagado, ventana de noche y un punto de luz azul encendido sobre la mesa. |
| Etecnic | Subestación eléctrica y torre de control de aeropuerto en miniatura, unidas por cables con pequeñas luces. |
| Zellige Hotels | Fachada de hotel en corte, con habitaciones, llaves en un casillero y un calendario de pared. Sin geometría zellige. |
| CineFlow | Sala de cine en miniatura vista desde arriba, filas de butacas y unas pocas iluminadas. |
| LaComu | Plaza de barrio en miniatura con un tablón de anuncios y bancos, rampa de acceso visible. |

Toda animación tiene su estado final para `prefers-reduced-motion`: se ven la maqueta fija y las tarjetas montadas.

## 8. Formulario «¿Tienes un proyecto?»

Un formulario en pasos dentro de una tarjeta marino, con un resumen a la derecha que se rellena como un ticket en mono:

1. **Qué necesitas** (botones de selección): web nueva, mejorar una web existente, backend o API, accesibilidad y rendimiento, otra cosa.
2. **Cuéntamelo**: texto libre con contador.
3. **Plazo**: sin prisa, en 1–3 meses, cuanto antes.
4. **Contacto**: nombre y correo, Turnstile y enviar.

Indicador `[2/4]`, se puede volver atrás, funciona con teclado, valida en el momento y muestra los errores con texto, no solo con color. Al enviar, el punto azul recorre el ticket y queda «Recibido. Respondo en 48 h». **Sin presupuesto**, como hasta ahora. Si falla el envío, se ofrece el `mailto:` con el texto ya escrito.

## 9. Servicios (freelance)

Se presentan como tres encargos concretos, no como agencia:

- **Mejorar una web que ya tienes**: interfaz, móvil, accesibilidad y velocidad (caso LaComu: 39 fallos de accesibilidad a 0).
- **Backend, pagos o facturación** para un producto que ya existe (casos Zellige y Etecnic).
- **Una aplicación web a medida** pequeña o mediana, del backend a la interfaz (caso CineFlow).

Antes de publicar ofertas: comprobar la exclusividad del contrato actual. El dominio `ayches.is-a.dev` es de uso no comercial: la web se centra en que me contraten y la sección de proyectos se mantiene sobria.

## 10. Lo que no se copia

Cursores de otros visitantes, asistentes de IA, banners de cookies (no usamos cookies), fotos de stock, el naranja y el rojo de las referencias, bandas de color a todo el ancho y frases de eslogan.

## 11. Orden de trabajo propuesto

1. Visto bueno a este documento y al gasto de créditos.
2. Generar las maquetas (y el vídeo si se aprueba) y revisarlas contigo antes de usarlas.
3. Paleta y tipografía nuevas en `global.css` y `tokens.ts`, con contrastes medidos.
4. Componentes 1 a 7 y formulario.
5. Fragmentos de interfaz y maquetas en los casos.
6. Verificación: Lighthouse ≥ 95, auditoría de 52 combinaciones sin fallos, capturas en 390 y 1440 px.
7. Actualizar `CLAUDE.md` con las reglas nuevas.
