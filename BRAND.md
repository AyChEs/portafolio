# AyChEs — Brand Book v1

Guía de marca personal de **Ayman Charoui Essamadi**. Derivada de un test de descubrimiento
(arquetipos + dimensiones de Aaker + posicionamiento) realizado en julio de 2026.

---

## 1. Núcleo de identidad

| | |
|---|---|
| **Esencia** | Un desarrollador en crecimiento acelerado que ya entrega en producción. |
| **Arquetipo** | El Builder en ascenso — mezcla de Ejecutor ("se lo asignamos a él") y Compañero (cercano, animado, se trabaja a gusto con él). |
| **Promesa** | *"Este tío va a crecer muchísimo."* Quien lo contrata compra la pendiente de la curva, no solo el punto actual. |
| **Valor central** | Verlo funcionar en producción. El código que no despliega no cuenta. |
| **Dirección (3–5 años)** | Senior gestionando proyectos y personas + marca propia con producto. |

## 2. Concepto creativo: el changelog vivo

La carrera como software en desarrollo activo, versionada con semver:

- **v0.1** — Técnico IT en prácticas (2024)
- **v1.0** — Backend intern en Etecnic (2025)
- **v2.0** — Backend Developer en producción (2026, versión actual)
- **v3.0** — Roadmap: liderar proyectos end-to-end, producto propio

Ser junior no se esconde: se versiona. El "_" (cursor) del logo significa
*siempre escribiendo la siguiente versión*. Lema de marca: **shipping since 2024**.

## 3. Posicionamiento

> Para equipos que necesitan gente que entregue, Ayman es el desarrollador junior
> que **ya tiene código facturando en un SaaS real** (PDFs, i18n en 9 idiomas, permisos)
> y que crece de prácticas a titular en meses — con 4 idiomas (ES·CA·AR·EN) y un
> perfil híbrido diseño + backend que hace de puente entre producto e ingeniería.

Diferenciador líder: **velocidad de crecimiento demostrada**.
Soportes: producción real (no tutoriales) · 4 idiomas, 3 culturas · híbrido diseño+backend.

## 4. Voz y tono

**Cercano y directo.** Como escribe a un compañero que respeta: frases cortas, hechos
concretos, cero humo, con la calidez natural de "buen chaval animado". Se permite algún
guiño dev (semver, prompts) pero nunca a costa de la claridad.

- ✅ "Migré el pipeline de PDFs. 9 idiomas. En producción."
- ✅ "v2 y subiendo."
- ❌ "Apasionado de las tecnologías disruptivas orientadas a resultados."

## 5. Identidad visual

### Color
La paleta transmite lo que él es: **navy = solidez/criterio** (la base seria),
**cian = lo vivo** (código en producción, disponibilidad, la señal de actividad).
El cian es el color de firma y se usa para todo lo que "está encendido".

| Token | Claro | Oscuro | Rol |
|---|---|---|---|
| Fondo | `#fafafa` | `#080d16` | Página |
| Tinta | `#101218` | `#eef2f9` | Titulares |
| Navy | `#14213d` | `#14213d` | Base de marca, rellenos fuertes (claro) |
| Acento | `#1d3a6e` | `#7fd1e0` | Links, kickers, números de sección |
| Cian firma | `#7fd1e0` | `#7fd1e0` | Estado "vivo": disponible, ahora, verified, v2 |
| Superficie | `#ffffff` | `#101a2e` | Tarjetas |

Prohibido: rojo/amarillo/verde. El cian nunca se usa como texto sobre fondo claro
salvo en chips con fondo tintado.

### Logo
- **Marca:** monograma "AE" en cuadrado redondeado navy → evolución **"AE_"**.
- **Wordmark:** "AyChEs" + cursor "_" parpadeante. El cursor es el gesto de marca.
- **Chip de versión:** "v2" en mono junto al wordmark — se incrementa con la carrera.

### Tipografía
Sistema Apple (SF Pro Display/Text) para display y texto; **SF Mono / ui-monospace**
para todo lo "de máquina": versiones, fechas, labels, kickers, chips. La dualidad
humano (sans) / máquina (mono) es parte del lenguaje.

## 6. Identidad de movimiento

Personalidad: **rápida, precisa, con vida** — como él. Reglas (de la disciplina
design-engineering):

- Easing firmes: `cubic-bezier(.23,1,.32,1)` (out) / `cubic-bezier(.2,.75,.25,1)` (reveals).
- UI < 300 ms; entradas con stagger 50–80 ms; `scale(.97)` al pulsar.
- Solo `transform`/`opacity`; hovers solo en `(hover:hover) and (pointer:fine)`.
- Gestos de firma: cursor propio de dos capas, botones magnéticos, tilt 3D de la
  code card, contadores que suben (la métrica de crecimiento hecha motion).
- `prefers-reduced-motion`: se mantienen fades, se elimina el movimiento.

## 7. Aplicaciones

- **Web:** ayches.github.io / ayches.is-a.dev — este repositorio.
- **LinkedIn headline:** "Backend Developer @ Etecnic · Rails, REST, SaaS multi-tenant · shipping since 2024".
- **GitHub bio:** "v2 — shipping since 2024. Rails · Laravel · Spring."
- **Email firma:** Ayman Charoui — AyChEs_ · ayches.is-a.dev
