# Prompt maestro del logotipo (ChatGPT)

**Referencia de estructura:** el logo de Darsi (una sola letra rotunda dentro de un cuadrado de esquinas muy redondeadas, de color liso, más un detalle de acento pequeño con significado). Se toma la estructura, no los elementos: nada de verde azulado, ámbar, destello de cuatro puntas ni letra árabe sobre cuadrado, para que nadie vincule las dos marcas.

**Nombre:** solo «Ayman». El apellido no entra en el logotipo. El nombre completo sigue en el título de la web, el CV y los datos estructurados, para que te encuentren al buscarte.

Cómo usarlo:

1. Pega el **prompt 1** en ChatGPT (con generación de imágenes). Te da 6 conceptos distintos en una hoja.
2. Elige uno y usa el **prompt 2** para afinarlo.
3. Con el definitivo, el **prompt 3** lo saca en limpio. Después se redibuja en SVG para la web.

---

## Prompt 1: exploración (6 conceptos)

```
You are a senior identity designer. Design a personal logo for a software developer named AYMAN. Use only the first name "Ayman" and the letter "A". Never use a surname.

FORMAT (follow strictly)
The logo is an app-icon style mark: ONE bold, custom letterform "A" centred inside a rounded square tile (corner radius about 25% of the tile), solid deep steel navy background #14213D, the letter in warm off-white #F3F4F1, plus ONE small accent detail in signal orange #C2410C that carries a meaning. Nothing else inside the tile. Flat vector, no gradients, no shadows, no 3D, no texture.

WHO AYMAN IS AS A PROGRAMMER (the logo must express this, so that people who know him recognise him in it)
- Full-stack developer with a Java foundation.
- He works on the parts of an application that cannot fail: who can access what (permissions), what gets charged (billing and payments), and data that must stay correct when two people act at once.
- He came into software from systems and networks administration: he understands what runs underneath the code.
- He works in four languages (Spanish, Catalan, Arabic, English) and builds software that works in many languages.
- Personality: precise, careful, calm, honest, approachable. A craftsman in a precision workshop, never a "rockstar". His personal signature has always been the blinking cursor "_": something is always being built, carefully.

TASK
Create ONE image: a clean light-grey presentation sheet with 6 DIFFERENT concepts in a 3×2 grid. Each concept shows the icon tile large, and under it the word "Ayman" in a simple modern sans-serif. Number each concept small (1–6).

One route per concept, each a different idea of who he is:
1. CURSOR: a solid "A" with a small orange cursor block "_" as the accent, as if the A had just been typed. His long-time signature.
2. LAMBDA: an "A" without crossbar so it also reads as a lambda (λ), the symbol of Java functions; the accent is a small orange tick or dot that "completes" it.
3. ACCESS: the counter or crossbar of the "A" subtly forms a keyhole or a lock slot: "who can access what". Subtle, not a padlock icon.
4. PRECISION: the "A" built from strict geometry with an orange dimension line or tolerance mark, like a part measured in a workshop.
5. VERIFIED: a lowercase "a" whose tail becomes a small orange check mark: work that is checked before it ships.
6. FREE ROUTE: your most original idea that makes the letter A unmistakably his, connecting precision, care and building software.

RULES
- Each concept must be clearly different from the others.
- Must read at 16 px as a favicon: bold letterform, one accent only.
- Avoid clichés: no </> brackets, no curly braces, no terminal windows, no laptops, no gears, no rockets, no lightbulbs, no circuit boards, no shields, no animals, no crowns.
- No sparkles or four-pointed stars, no eight-pointed stars, no Islamic or zellige patterns, no Arabic letters.
- No purple, no gradients, no generic startup look, no copying famous logos.
- Spell the name exactly "Ayman".

It should look like the first concept round from a serious identity studio: reduced, intentional, ownable.
```

---

## Prompt 2: afinar el elegido

```
I choose concept [NÚMERO]. Develop it further.
Changes I want: [escribe aquí qué cambiar, o "none"].

Show one image with:
- the final icon tile large and centred;
- the icon + the word "Ayman" as a horizontal lockup;
- the icon at favicon sizes (16 px, 32 px, 64 px) to prove it stays legible;
- the letter alone in one colour (black on white), without the tile.
Flat vector, no gradients, no shadows, no mockups. Spell the name exactly "Ayman".
```

---

## Prompt 3: versión limpia para redibujar

```
Render only the final icon, perfectly centred on a pure white background, flat vector style, no text, no texture, no shadow, large size with generous margin. I will redraw it as SVG.
Change the small orange accent to navy blue #14213D, the same navy as the tile: no orange anywhere. If the accent sits on the navy background and would disappear, use a lighter navy #3A5A8C so it stays visible. Keep the letter in #F3F4F1 and everything else exactly as it is.
```

Los colores corresponden a la dirección A («Plano técnico»). Si eliges la B, cambia en el prompt el naranja `#C2410C` por el cian `#7FD1E0` y el fondo por `#0A0F1C`.

Pásame en la conversación la imagen que elijas (o guárdala en `docs/marca/referencias/`) y la redibujo en SVG.
