# Portafolio — Ayman Charoui (AyChEs)

Portafolio personal de una sola página construido con **React + Vite**. Diseño
bento con *command palette* (⌘K), tema claro/oscuro, bilingüe (ES/EN) y globo de
puntos animado. Inspiración de referencia: [awrs.me](https://awrs.me/en).

## Stack

- **React 19** + **Vite 7** (build a estáticos en `dist/`)
- **framer-motion** — animaciones de entrada, reveals al hacer scroll, barra de progreso
- **cmdk** — command palette (secciones Páginas / Contacto / Legal, con búsqueda y navegación por teclado)
- **lucide-react** — iconografía
- Globo de puntos en **canvas 2D** propio (sin WebGL, theme-aware) y reloj analógico en vivo (Europe/Madrid)

## Estructura

- `index.html` — entrada de Vite (script inline que fija el tema antes del primer render)
- `src/main.jsx` — bootstrap de React con los providers (tema/idioma + command palette)
- `src/App.jsx` — composición de la página
- `src/index.css` — sistema de diseño (tokens, tipografía, keyframes, clases de componentes)
- `src/lib/content.js` — todo el contenido bilingüe (ES/EN) en un solo lugar
- `src/lib/app-context.jsx` — estado de tema e idioma (persistido en `localStorage`)
- `src/lib/palette-context.jsx` — estado del command palette (atajo ⌘K / Ctrl+K)
- `src/components/*` — Nav, CommandPalette, Hero, Ribbons, About (+ Globe, Clock, Stats), Stack, Projects, Experience, Formation, Contact, Ambient, Reveal
- `public/assets/logos/` — logos devicon auto-hospedados (MIT, ver `LICENSE-devicon.txt`)
- `public/assets/projects/` — imágenes placeholder de proyectos: **sustituir por capturas reales**

## Desarrollo local

```bash
npm install
npm run dev      # servidor de desarrollo (http://localhost:5173)
npm run build    # build de producción a dist/
npm run preview  # sirve el build de dist/
```

## Despliegue (Vercel)

El proyecto se detecta como Vite automáticamente: *Build command* `vite build`,
*Output directory* `dist`. El dominio (is-a-dev) apunta a Vercel vía CNAME
(`is-a-dev/ayches.json`).

## Pendiente

- [ ] Subir el CV en PDF y enlazarlo (tarjeta "CV (PDF)" del footer y del palette, ahora `#`)
- [ ] Sustituir las imágenes placeholder de los proyectos y enlazar Código/Demo reales

---

# Handoff: Portafolio Web Personal — Ayman Charoui (AyChEs)

## Overview
A one-page personal portfolio for a full-stack developer (Ruby/Rails, PHP/Laravel, Java/Spring, React). Bilingual (ES/EN toggle, ES default), single scrolling page: nav → hero → tech stack → projects → experience timeline → education/languages/certifications → contact footer.

## About the Design Files
The file in this bundle (`portafolio-source.html`) is a **design reference built as an interactive HTML/JS prototype** (a "Design Component" running on a small internal runtime — `support.js`/`x-dc` tags/`{{ }}` template holes). **Do not ship this file or its runtime as-is.** The task is to **recreate this design in the target codebase's environment** — plain HTML/CSS/JS, or a framework like React/Next.js/Vue if that's what the project uses — reproducing the layout, styling, copy, and animations described below using idiomatic code for that stack. If no project exists yet, plain static HTML/CSS/JS (or React) is a perfectly appropriate choice for a portfolio like this.

The prototype includes a bilingual (ES/EN) toggle implemented as simple client-side state; reproduce this as a normal state/toggle in whatever the target stack's state model is (React state, Vue ref, plain JS variable, etc.) — not literally.

## Fidelity
**High-fidelity.** All colors, type, spacing, and copy below are final. Recreate pixel-close, not just structurally similar.

## Global Design Tokens

**Colors**
- Background (page): `#fafafa`
- Ink / primary text: `#101218`
- Body text (secondary): `#4a4e58`
- Muted text: `#5a5e69` / `#8a8e98` / `#9a9ea8`
- Navy (primary brand/accent): `#14213d`
- Navy light (secondary accent, links/kickers): `#1d3a6e`
- Dark navy/near-black panels (code card, footer, cert card): `#0c1322` background, `#101a2e` header bars, `#1c2740` borders
- Panel text on dark: `#eef2f9` (headings), `#9aa6c0` / `#cdd7ea` (body), `#6f8fd0` (labels), `#7fd1e0` (cyan accent for "verified"/available-on-dark)
- Borders on light cards: `rgba(16,18,24,.09)` default, `#14213d` on hover
- No red / yellow / green anywhere — traffic-light dots use neutral greys (`#4a5168`, `#5e6478`, `#737888`)

**Typography** — Apple system font stack (renders as real SF Pro on Apple devices, sensible fallback elsewhere):
- Display/headings: `-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif` — weight 700–800, tight letter-spacing (-0.02em to -0.035em)
- Body/UI text: `-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif` — weight 400–700
- Monospace (code, labels, kickers, pills, section numbers): `ui-monospace, "SF Mono", Menlo, Monaco, monospace`
- Scale: hero H1 `clamp(46px, 8.6vw, 94px)` / line-height .94; section H2 `clamp(26px, 4vw, 40px)`; body `clamp(16px, 2.1vw, 19px)`; small/mono labels 10–13px.

**Spacing / radius / shadow**
- Section horizontal padding: `clamp(20px, 5vw, 64px)`; vertical: `clamp(40px, 6vw, 72px)`
- Card radius: 14–20px depending on card type; pill radius: 999px
- Card border: 1px `rgba(16,18,24,.09)`, hover border `#14213d` + shadow `0 16-26px 34-50px rgba(20,33,61,.1-.15)` and a small `translateY(-4px to -7px)` lift
- Buttons: 11px radius, 15px/26px padding

**Responsiveness**: everything built with `clamp()` fluid sizing and CSS Grid `repeat(auto-fit, minmax(...))` — no fixed breakpoints needed except the nav links (hidden under 760px, a language toggle always visible). Recreate with the same fluid approach or standard breakpoints (e.g. Tailwind `sm/md/lg`) — behavior: single column on mobile, multi-column grids from tablet up.

## Screens / Sections (single page, in order)

### 1. Nav (sticky)
- Sticky top bar, translucent blur background `rgba(246,246,243,.78)` + `backdrop-filter: blur(16px)`, bottom border `rgba(16,18,24,.08)`.
- Left: 30×30px navy rounded-square logo mark "AE" + wordmark **"AyChEs"** (bold, tight tracking).
- Center/right: nav links (Stack / Proyectos / Experiencia / Contacto — anchor links to section ids `#stack #projects #experience #contact`), hidden below 760px.
- Right: ES/EN pill toggle — active pill filled navy `#14213d` with white text, inactive transparent with muted text.

### 2. Hero
- Two-column flex (wraps to 1 column on narrow), vertically centered.
- Left column:
  - "Disponible para nuevas oportunidades / Open to new opportunities" pill badge — navy text on `rgba(20,33,61,.07)` bg, 1px navy-tinted border, small pulsing navy dot (see Animations).
  - Kicker line, mono uppercase, letter-spacing .18em, color `#1d3a6e`: "Desarrollador Full-Stack" / "Full-Stack Developer".
  - H1, two stacked lines (each a block-level span): line 1 "Del ticket" / "From ticket", line 2 "al merge." / "to merge." — **all one color** (`#101218`, no accent color on "merge").
  - Subtitle paragraph, `#4a4e58`: "Desarrollador backend en Etecnic. Cojo funcionalidades de principio a fin con Ruby on Rails, APIs REST y SaaS multi-tenant." (EN: "Backend developer at Etecnic. I own features end to end with Ruby on Rails, REST APIs and multi-tenant SaaS.")
  - Two CTA buttons: primary "Hablemos / Let's talk →" (filled navy, white text, lifts + shadow on hover), secondary "Descargar CV / Download CV" (white bg, outlined, lifts + navy border on hover).
- Right column: a dark "code card" (mock IDE window):
  - Header bar `#101a2e` with 3 flat grey dots (`#4a5168 #5e6478 #737888` — **not traffic-light colors**) + filename `developer.rb` in muted mono.
  - Body `#0c1322`, mono font, syntax-highlighted-looking static text:
    ```
    class Developer
      name  = "Ayman Charoui"
      role  = "Full-Stack Developer"
      stack = ["Rails", "REST", "SaaS"]
      at    = "Etecnic"
    end▌
    ```
    (keyword purple `#c792ea`, class name blue `#82aaff`, property cyan `#7fd1e0`, string green `#a5e8a0`; trailing cursor `▌` blinks)
  - Whole card gently floats up/down continuously (see Animations).
- Below both columns: an infinite horizontal **marquee** strip (border-top/bottom hairline) scrolling tech keywords: Ruby on Rails, REST APIs, PostgreSQL, Laravel, Spring Boot, React, Multi-tenant SaaS, i18n, CI/CD, JWT — separated by a navy "◆" glyph, duplicated content for seamless loop.

### 3. Stack (section 01)
- Section header pattern used by every numbered section: mono section number (`01`, `02`...) in `#1d3a6e` + H2 title + a horizontal hairline that **draws in from left to right** when scrolled into view.
- Grid of category cards (`auto-fit, minmax(230px,1fr)`), one per group: Lenguajes/Languages, Frameworks, Bases de datos/Databases, Herramientas/Tools. Each card:
  - Giant faint number watermark (category index) top-right, ~76px, 4% opacity — decorative only.
  - Mono uppercase category label in `#1d3a6e`.
  - Wrapped row of **logo tiles**, one per technology: 52×52px rounded-square tile (light grey `#f6f7fb` bg, subtle border) containing the **actual brand SVG logo** for that technology (Ruby, PHP, Java, JavaScript, Rails, Laravel, Spring, React, PostgreSQL, MySQL, Git, Postman, JIRA), tech name below in small bold text. If a technology has no available logo (SQL, RubyMine, RSpec, CI/CD), show a 2–3 letter monogram instead in navy. Tile lifts slightly + logo box gets navy border + shadow on hover.
  - Card itself lifts and gets a navy border + shadow on hover.
- Real logo source used in the prototype: `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/{tech}/{tech}-{variant}.svg` (devicon project). In production, self-host these SVGs (don't depend on a live CDN) — devicon is MIT-licensed.

### 4. Projects (section 02)
- Grid of project cards (`auto-fit, minmax(300px,1fr)`), each:
  - Top image area, 178px tall, dark bg — **this is a user-uploaded project screenshot/photo placeholder** (in the prototype an editable image slot; in production, a normal `<img>`). Subtle top-to-bottom dark gradient overlay for legibility.
  - Over the image: filename-style badge top-left (mono, e.g. "◍ hotel-erp.java"), and — only for in-progress projects — a white "WIP" badge top-right.
  - Below image: project title (bold, Space-Grotesk-style display font), 2–3 sentence description, wrapped row of tech tag chips (mono, navy-on-tinted-navy), and two full-width side-by-side buttons "↗ Código/Code" (filled navy) and "↗ Demo" (outlined) — omitted entirely for the in-progress project.
  - Card lifts + navy border + larger shadow on hover.
- Content: 3 project cards — "Hotel ERP System" (Java/Spring Security/React/JUnit, enterprise admin platform with JWT security, RBAC, reporting dashboards), "CineFlow Booking Engine" (PHP·Laravel/MySQL/Stripe API/JS, cinema reservation system with real-time seat locking and dynamic pricing), and a WIP placeholder card ("Nuevo proyecto / New project").

### 5. Experience (section 03)
- Vertical timeline: a thin gradient line (navy fading to transparent) running top-to-bottom, offset left.
- Each entry is a small rounded-square **node** (18×18px, rounded 6px) sitting directly on the line — **filled navy with a pulsing ring for the current role**, **hollow/white with navy ring outline for past roles**. No text/initials inside the nodes (kept as plain dot/square markers only).
- Beside each node, a card containing: a mono pill showing the date range, plus (current role only) an "● Ahora / Now" pill with a small cyan dot; role title (bold); "Org · Type · Location" line; bullet list of achievements.
- Card lifts slightly + shifts right + navy border/shadow on hover.
- Content (reverse-chronological): Backend Developer @ Etecnic (Mar 2026–Present, current, 4 bullets about PDF pipeline migration, i18n of invoices in 9 languages, REST endpoints with permission control, per-domain branding system) → Backend Developer Intern @ Etecnic (Jul 2025–Mar 2026) → IT Technician Intern @ The British School of Costa Daurada (Jan–May 2024).

### 6. Education / Languages / Certifications (unnumbered continuation, sections 04/05/06 by their own mono numbers)
Three-column grid (`auto-fit, minmax(300px,1fr)`), each its own column with its own "0N + H2" header (no drawn hairline here):

- **Education (04)**: stacked rows, each a card with a 42×42px navy rounded-square institution monogram ("FV"), date range (mono, navy), degree title (bold), institution name, and — only where applicable — an honors badge ("★ Honores · 8.6/10"). Two entries: DAW higher diploma (2024–2026) and Microcomputer Systems & Networks diploma (2022–2024, with honors). (No English-certificate entry — that lives only in Languages now.)
- **Languages (05)**: stacked rows, each a card with a 44px circular language-code badge (ES/CA/AR/EN) — **filled navy for native-level languages, outlined/tinted for others** — language name (bold), a small descriptor line (e.g. "Lengua materna/Mother tongue"), and on the right **the proficiency level shown directly as a pill label** (e.g. "Nativo/Native", "Profesional/Professional", "B2") — filled navy pill for native, outlined navy pill otherwise. **No bar charts / progress dots for languages** — level is always plain text in a pill. Four languages: Spanish (native), Catalan (native), Arabic (professional), English (B2).
- **Certifications (06)**: dark "credential card" (same dark navy palette as the code card/footer) with a decorative radial glow in the corner, a white rounded-square checkmark seal, a "VERIFIED/VERIFICADO" outlined cyan pill, certification title (bold, white), issuer · date, and the credential ID in muted mono at the bottom (divider above it). One entry: "Full Stack Web Development" — Amazon, Jul 2025, ID 1SUXINCID97O. **No profile photo/portrait anywhere in this section** (previously present, removed).

### 7. Footer / Contact
- Full-width dark navy (`#0c1322`) panel with a soft radial glow decoration top-right.
- Left: availability pill (cyan-tinted this time, since it's on dark bg), big H2 "Hablemos / Let's talk", supporting paragraph about links/CV coming soon — reach out via LinkedIn meanwhile.
- Right: 2×2 grid of contact cards (LinkedIn /in/ayches — live link; Email, GitHub, CV(PDF) — all placeholders marked "añadir/add" pending real links), each with a small icon square, mono label, and value; lifts + lighter bg + accent border on hover.
- Below that: a huge outlined-only (stroke, no fill) wordmark **"AyChEs"** spanning the width, decorative background typography (very low-opacity cyan stroke), non-interactive.
- Bottom bar: "© 2026 Ayman Charoui Essamadi" · "↑ Volver arriba / Back to top" anchor link (scrolls to `#top`) · "Diseñado y desarrollado con cuidado / Designed & built with care", separated by a hairline border-top.

## Interactions & Behavior
- **Language toggle** (ES/EN buttons in nav): swaps all copy on the page between Spanish (default) and English via simple state; button pill background/color reflects active language.
- **Scroll progress bar**: a 3px-tall bar fixed to the very top of the viewport, width driven by `scrollTop / (scrollHeight - clientHeight) * 100`, gradient navy `#14213d → #1d3a6e`, updates on scroll (passive listener).
- **Anchor nav**: nav links and footer "back to top" are plain in-page anchor links (`#stack`, `#projects`, `#experience`, `#contact`, `#top`) with smooth scrolling (`scroll-behavior: smooth` on `<html>`).
- **Hover states**: nearly every card/button/link has a hover transition (150–280ms): lift (`translateY`), border color to navy, added/enlarged shadow. Nav links change to navy text color on hover.
- **Tech logo fallback**: if a technology's logo image fails to load, swap to a 2–3 letter monogram in the same tile (graceful degradation — implement via `onerror` on the `<img>` or an equivalent framework pattern).

## Animations (all pure CSS in the prototype — reproduce with CSS or your framework's animation system)
- `heroUp`: fade + translateY(26px→0), used to stagger-in the hero elements on page load (badge, kicker, title, subtitle, buttons, code card each with increasing delay ~0.05–0.34s).
- `reveal` / `revealX` / `revealScale`: fade+slide-up / fade+slide-from-left / fade+scale-in, triggered by **scroll-linked entry animation** (CSS `animation-timeline: view()` with `animation-range: entry 0% cover 30–36%`) — i.e. elements animate in as they scroll into the viewport. Applied via three reusable classes (`.rv`, `.rvx`, `.rvs`) to section headers, timeline entries, and cards respectively. If the target stack doesn't support scroll-timelines, use an IntersectionObserver-triggered fade/slide-in as the equivalent.
- `pulse`: a soft expanding-ring box-shadow pulse (2.4s loop) on the small "available" status dot.
- `ring`: same expanding-ring pulse (2.6s loop), navy, used only on the current-role timeline node.
- `marquee`: continuous linear horizontal scroll (26s loop) of the duplicated tech-keyword strip.
- `blink`: the trailing `▌` cursor in the code card blinks (1.1s step-end loop).
- `drift`: two large soft radial-gradient blobs behind the hero slowly drift/scale (22s and 28s loops, one reversed) — pure decorative background motion, `pointer-events: none`.
- `floaty`: the hero code card continuously floats up/down (~11px, 7s loop, slight initial delay so it starts after entrance).
- `drawline`: section-header hairlines scale-in horizontally (`transform-origin: left`, `scaleX(0→1)`) as they scroll into view (same view-timeline technique as `reveal`).

No red/yellow/green anywhere in the design (explicit constraint) — the palette is strictly white/off-white, near-black ink, and navy, plus a cyan accent (`#7fd1e0`) reserved for use on dark backgrounds only (code card, footer, cert card).

## Assets
- Tech logos: devicon (MIT license), fetched live from jsDelivr CDN in the prototype — **self-host in production**: `https://github.com/devicons/devicon`.
- Project images: placeholders — the user needs to supply real screenshots for the 2–3 project cards.
- No custom icon set / illustration — everything else is CSS shapes, typography, and system-font glyphs (→, ↗, ◆, ✓, ★, ◍).
- Fonts: no webfont files — uses the OS-provided Apple system font stack (SF Pro / SF Mono), falling back to Helvetica Neue / system sans/mono elsewhere. No font files to hand off.

## Files
- `portafolio-source.html` — the full interactive prototype (reference only, see note above).
