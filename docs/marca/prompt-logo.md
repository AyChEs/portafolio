# Prompt maestro del logotipo (ChatGPT)

Cómo usarlo:

1. Pega el **prompt 1** en ChatGPT (con generación de imágenes). Te dará 6 conceptos distintos en una sola hoja.
2. Elige uno y usa el **prompt 2** para afinarlo (cambia el número y escribe qué quieres cambiar).
3. Cuando tengas el definitivo, el **prompt 3** lo prepara en limpio. Después se redibuja en SVG para la web.

El inglés da mejores resultados en los generadores de imagen; por eso los prompts están en inglés.

---

## Prompt 1: exploración (6 conceptos)

```
You are a senior identity designer at a top brand studio. Design a logo for a personal brand.

WHO
Ayman Charoui, a full-stack software developer (Java foundation) based in Tarragona, Spain. Works remotely for teams in Spain and abroad. Speaks Spanish, Catalan, Arabic and English. Came into software from systems and networks administration.

WHAT HE DOES BEST
He works on the parts of an application that cannot fail: who can access what (permissions), what gets charged (billing, payments), and data that must stay correct (concurrency). Careful, precise, honest work. A precision workshop, not a battlefield.

PERSONALITY
Precise, calm, honest, careful, quietly confident, approachable. Never loud, never heroic, never "rockstar". Sophisticated and sincere.
Words that describe his world: steel, workshop, chess, midnight, magnet, comet.

AUDIENCE
Tech recruiters, engineering managers and CTOs. It must look professional enough for a CV, a LinkedIn banner and a business card.

TASK
Create ONE image: a clean presentation sheet with 6 DIFFERENT logo concepts in a 3×2 grid, black on white, flat vector style, each one numbered small (1–6) in a corner, with the name "Ayman Charoui" set under each symbol in a simple modern sans-serif.

Explore these 6 routes, one per concept:
1. Monogram "AC" built with negative space: the two letters share a stroke or interlock cleanly.
2. Monogram "AC" from precise construction geometry (circles, a strict grid, equal stroke widths), like an engineered part.
3. A measurement / tolerance mark: the initials combined with the idea of a precise measurement (calipers, a dimension line, a tick mark), very reduced.
4. A seal or maker's mark: a small stamp an artisan would put on finished work, containing "AC", modern and minimal, not a fake crest.
5. A custom wordmark only: "ayman charoui" or "Ayman Charoui" with ONE subtle custom detail in the letterforms that makes it ownable.
6. A free route: your strongest original idea that connects precision, care and software without using code clichés.

RULES
- Simple, memorable, scalable: every symbol must still read at 16 px as a favicon.
- Must work in one colour first. No gradients, no 3D, no shadows, no glow, no mockups.
- Avoid clichés: no </> brackets, no curly braces, no terminal windows, no laptops, no gears, no lightbulbs, no rockets, no circuit boards, no shields, no lions or animals, no crowns.
- Avoid eight-pointed stars, Islamic/zellige geometric patterns, arabesques and Arabic calligraphy (that belongs to another brand).
- No purple, no gradients, no generic tech-startup look, no copying existing famous logos.
- Plenty of white space around each concept; text must be correctly spelled: "Ayman Charoui".

The result should look like the first concept round from a serious identity studio: reduced, intentional, each concept clearly different from the others.
```

---

## Prompt 2: afinar el elegido

```
I choose concept [NÚMERO]. Develop it further.
Changes I want: [escribe aquí qué cambiar, o "none"].

Show one image with:
- the final symbol large and centred, black on white;
- the symbol + "Ayman Charoui" horizontal lockup;
- the symbol alone at small sizes (favicon 16 px, 32 px, 64 px) to prove it stays legible;
- the symbol in white on deep steel navy #14213D.
Keep it flat vector, one colour, no gradients, no shadows, no mockups. Spell the name exactly "Ayman Charoui".
```

---

## Prompt 3: versión limpia para redibujar

```
Render only the final symbol, perfectly centred, solid black on a pure white background, flat vector style, very high contrast, no text, no texture, no shadow, large size with generous margin. I will redraw it as SVG.
```

Guarda las imágenes que te gusten en `docs/marca/referencias/` (o pásamelas en la conversación) y, con el elegido, sigue con `prompts-brandkit.md`.
