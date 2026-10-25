# Despliegue

La web es estática (Astro) más dos funciones de Cloudflare Pages: `functions/api/contact.ts` (formulario) y `functions/_middleware.ts` (idioma según el navegador). Todo funciona en capas gratuitas.

## 1. Cloudflare Pages

1. Cloudflare → Workers y Pages → Crear → Pages → Conectar con Git → este repositorio.
2. Rama de producción: la que decidas (por ejemplo `main`).
3. Build command: `npm run build`. Output directory: `dist`. Variable `NODE_VERSION=22`.
4. Se crea `TU-PROYECTO.pages.dev`. Comprueba que `/es/` y `/en/` cargan.

## 2. Dominio `ayches.is-a.dev`

1. En Pages → Custom domains → añade `ayches.is-a.dev`.
2. En el repositorio de is-a.dev, edita tu fichero (`is-a-dev/ayches.json` es la copia) y cambia el CNAME por `TU-PROYECTO.pages.dev`. Abre la PR.
3. Cuando se fusione, la web nueva sustituye a la de Vercel. Hasta entonces, la antigua sigue funcionando.

## 3. Formulario (Turnstile + Resend)

**Turnstile** (gratis): Cloudflare → Turnstile → Add site → dominio `ayches.is-a.dev` → modo Managed.
- *Site key*: variable pública `PUBLIC_TURNSTILE_SITE_KEY` (Pages → Settings → Variables, en producción).
- *Secret key*: secreto `TURNSTILE_SECRET`.

**Resend** (gratis hasta 3.000 correos al mes):
1. Resend → Domains → añade `ayches.is-a.dev`. Te da registros DNS (SPF, DKIM, MX para el subdominio de envío).
2. Esos registros se publican en la misma PR a is-a.dev (campo `records`, tipos TXT y MX). Si is-a.dev no los admite en tu subdominio, hay dos salidas: pedir el cambio en su repositorio o usar `onboarding@resend.dev` como remitente, que solo permite enviar a tu propio correo y vale para este formulario.
3. Resend → API Keys → crea una clave solo de envío → secreto `RESEND_API_KEY`.
4. Secretos `CONTACT_TO` (tu Gmail) y `CONTACT_FROM` (por ejemplo `Portafolio <web@ayches.is-a.dev>`).

Prueba real tras desplegar: rellena el formulario en producción y comprueba que llega el correo con tu Gmail en «Responder a».

## 4. Analítica

Cloudflare → Web Analytics → Add a site (`ayches.is-a.dev`) → copia el token → variable pública `PUBLIC_CF_BEACON_TOKEN`. Sin cookies y sin banner. Es un sitio aparte de cualquier otro de la cuenta.

## 5. Después de publicar

- Search Console: añade la propiedad y envía `https://ayches.is-a.dev/sitemap.xml`.
- Comprueba con `curl -I https://ayches.is-a.dev/` que redirige a `/es/` o `/en/` según `Accept-Language`.
- Retira el proyecto de Vercel cuando el dominio ya apunte a Cloudflare.

## Desarrollo local

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # genera dist/
npx wrangler pages dev dist   # prueba las funciones (copia .dev.vars.example a .dev.vars)
```
