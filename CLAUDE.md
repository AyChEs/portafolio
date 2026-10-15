# Portafolio de Ayman Charoui

Portafolio personal para que me contraten como desarrollador full-stack y para aceptar proyectos freelance concretos, sin venderme como agencia.

- Método: `FORMULA-MARCA-PORTAFOLIO.md`.
- Razonamiento de la marca: `docs/marca/ESTUDIO-DE-MARCA.md`.
- Posicionamiento: `.agents/product-marketing.md`.
- Referencia visual (estructura y estilo de cada sección): `docs/marca/referencias/direccion-final.html`.

## Decisiones fijas

- **Darsi no aparece en el portafolio**, ni con nombre ni como caso anónimo (decisión del 2026-10-15). Tampoco se usan sus elementos de marca: estrella de ocho puntas, geometría zellige, verde azulado `#0F5E5A`, arena y ámbar, ni la tipografía Cairo.
- **Rol:** desarrollador full-stack. Java es una tecnología más; no se presenta como identidad.
- **La identidad no depende de la empresa** donde trabajo: Etecnic sale como contexto de un caso, no como centro del relato. Sus clientes no se nombran: «operadores energéticos y aeropuertos de varios países».
- **Nombre de marca:** «Ayman». El nombre completo (Ayman Charoui Essamadi) va en el título, el CV, el aviso legal y los datos estructurados. `AyChEs` es solo el usuario de GitHub.
- **Frase del Inicio:** «Desarrollador full-stack. Construyo aplicaciones web completas, del backend a la interfaz, y cuido especialmente lo que no puede fallar.» (2026-10-15)
- **«Lo que no puede fallar» es una actitud, no un límite.** Programo de todo; nunca se presenta como si solo hiciera permisos, facturación o datos.

## Marca (dirección elegida el 2026-10-15: «Medianoche con señal»)

- **Logotipo:** la λ con gancho, que es la A de Ayman, y un punto, dentro de un cuadrado de esquinas muy redondeadas. Archivos en `docs/marca/logo/`.
  - Sobre fondo oscuro se usa el icono invertido (`ayman-icono-claro.svg`): cuadrado `#F3F4F1`, λ `#14213D`, punto `#3A5A8C`.
  - El favicon es `ayman-icono.svg`.
  - En la web el logotipo forma el nombre «λyman.»: la λ, «yman» en Plus Jakarta Sans 800 y el punto final en azul señal.
  - **Animación de entrada:** el icono se recoge sobre la λ y el punto escribe «yman» hasta quedar como punto final (1,1 s, `cubic-bezier(.23,1,.32,1)`). En la barra de navegación, el nombre se recoge en el icono al bajar. Prototipo: `docs/marca/logo/animacion-logo.html`.
- **Tipografía** (Google Fonts, alojadas en la propia web):
  - Plus Jakarta Sans 800 para titulares y el nombre.
  - Plus Jakarta Sans 400 y 600 para el cuerpo.
  - JetBrains Mono para etiquetas, fechas y datos.
- **Paleta:**

  | Rol | Valor |
  |---|---|
  | Fondo | `#04060F`; fondo 2 `#080D1C` |
  | Superficie de marca (bloques y tarjetas destacadas) | `#14213D`; `#1B2B4D` al pasar el ratón |
  | Texto | `#F3F4F1` |
  | Texto secundario | `#98A2B6` |
  | Línea | `#1C2742`; `#2A3B61` en superficies de marca |
  | Principal | azul marino `#14213D` |
  | Señal (solo acciones y estados) | botón `#2563EB` con texto blanco; punto, brillo y estado activo `#3B82F6`; etiquetas mono `#93C5FD` |

- **Proporción:** 60 % fondo, 30 % azul marino, 10 % señal azul como máximo.
- **Forma:**
  - Esquinas de 22 px en tarjetas, 12 px en botones y píldora en las etiquetas.
  - Sin sombras negras: la profundidad viene de las superficies.
  - Solo lo importante (el nombre y el botón principal) lleva un resplandor azul suave.
- **Motivo propio: el punto.**
  - Retícula de puntos de 24 px a muy baja opacidad detrás del Inicio.
  - Punto final azul en el nombre y en los titulares de sección («Quién soy.»).
  - Punto de estado que late en «Disponible».
  - Detrás del nombre, cintas de luz azul heredadas de la web anterior, con dos destellos que recorren las líneas.
- **Tono:**
  - Primera persona del singular, frases cortas y hechos antes que adjetivos.
  - Precisión técnica, profesional y auténtico.
  - Sin eslóganes, metáforas ni frases en grupos de tres por estética.
- **Prohibido:**
  - El naranja, en cualquier sitio.
  - Fotos de stock, iconos genéricos de «código», degradados morados y plantillas de portafolio.
  - Pedir el presupuesto en el formulario de freelance.
  - Cambios bruscos de fondo entre secciones (bandas de color a todo el ancho): el fondo es continuo.
  - «Apasionado», «ninja», «rockstar», «robusto», «soluciones», signos de exclamación y rayas largas en los textos visibles.
- **Accesibilidad:** WCAG 2.2 AA. Contrastes comprobados:
  - texto 18,3:1; secundario 7,9:1 sobre el fondo y 6,2:1 sobre azul marino;
  - botón 5,2:1; azul señal como texto 5,5:1.

  Toda animación respeta `prefers-reduced-motion`: se muestra el estado final, sin movimiento.
- **Modo:** automático según el sistema o navegador (`prefers-color-scheme`), sin botón. Oscuro por defecto; el claro usa fondo `#F3F4F1`, superficie `#FFFFFF`, texto `#0F1626`, secundario `#4A5468`, señal `#2563EB` y etiquetas `#1D4ED8`, con el icono en su versión azul marino. Si el sistema cambia con la página abierta, la web cambia con una transición suave (2026-10-15).
- **Idioma:** según el navegador (español si está en español; si no, inglés), con un selector discreto ES/EN.

## Estructura de la web (2026-10-15)

1. **Inicio:** nombre animado, frase, «Hablemos», «Descargar CV» y «Ver proyectos». Al lado, «Lo que hago»: backend y APIs, frontend y bases de datos. Nada de sistemas ni arquitectura: no se afirma lo que no se domina.
2. **Casos:** filas alternas. Cada caso tiene su página con contexto, problema, decisiones y su porqué, resultado y qué aprendí. Referencia: `docs/marca/referencias/caso.html`.
3. **Stack:** una aplicación por capas (interfaz, API y lógica, datos) con un punto de luz que recorre la petición.
   - **Preferidos:** React y Java con Spring (este último «donde mejor leo el código»).
   - **Trabajo actual:** Ruby on Rails.
   - **Datos:** Supabase («en mis proyectos personales»), PostgreSQL y MySQL, sin preferencia.
   - **Banco de trabajo:** Git, GitHub, Jira, Sentry, Cloudflare, Postman, VS Code, DBX Studio y Claude. Ni Linux ni RubyMine.
   - Filtro por proyecto que ilumina lo usado en cada uno.
   - Iconos de Simple Icons (CC0, licencia en `docs/terceros/`).
4. **Cómo trabajo:** pruebas antes del merge, cambios pequeños y mirar dónde corre. **Sin ninguna frase sobre IA:** el criterio se demuestra en las páginas de caso (decisión, porqué y alternativa descartada). Claude sale como una herramienta más.
5. **Sobre mí:**
   - bio corta, CV, dónde estoy, trayectoria e idiomas;
   - «Ahora mismo» con datos reales: libro que leo (portada tipográfica propia, no la real), última película, último viaje (mapa propio) y días de gimnasio.
6. **¿Tienes un proyecto?:**
   - qué acepto y qué no;
   - formulario con qué necesitas, plazo y correo, sin presupuesto.
7. **Contacto:** Gmail personal con botón de copiar, LinkedIn, GitHub y CV.

El CV está siempre a mano: en la barra, en el Inicio, en Sobre mí y en el pie.

## Precedencia

Si una skill choca con estas reglas, mandan estas reglas.

## Stack

Astro en Cloudflare Pages, sin servicios de pago. GSAP y Lenis solo si aportan. Formulario con una Pages Function y Cloudflare Turnstile.
