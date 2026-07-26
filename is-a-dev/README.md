# Dominio gratis `ayches.is-a.dev` (is-a.dev)

Este directorio contiene el archivo listo para registrar un subdominio gratuito de
[is-a.dev](https://www.is-a.dev/) que apunte a este portafolio (desplegado en **Vercel**).

- **Dominio final:** `ayches.is-a.dev`
- **Apunta a:** el deployment de Vercel (`ayches-dev.vercel.app`)

> Nota: is-a.dev sólo entrega subdominios `*.is-a.dev` (no un `.dev` a secas). El nombre
> del subdominio debe ir en minúsculas, por eso el archivo se llama `ayches.json` y el
> dominio es `ayches.is-a.dev`. Tú puedes mostrarlo estilizado como `AyChEs.is-a.dev`.

## Archivo a enviar

[`ayches.json`](./ayches.json) — este es exactamente el contenido que hay que colocar en
`domains/ayches.json` dentro del repo de registro:

```json
{
  "owner": {
    "username": "AyChEs"
  },
  "records": {
    "CNAME": "cname.vercel-dns.com"
  }
}
```

El registro **CNAME → `cname.vercel-dns.com`** es el valor estándar de Vercel para un
subdominio. Con eso, is-a.dev delega la resolución a Vercel y Vercel emite el certificado
HTTPS automáticamente.

## Pasos

### 1) Añadir el dominio en Vercel (hazlo primero)

1. Entra a tu proyecto en Vercel → **Settings → Domains**.
2. Añade `ayches.is-a.dev` y guarda.
3. Vercel te mostrará el registro que espera: un **CNAME** apuntando a
   `cname.vercel-dns.com`. Déjalo así (todavía marcará "Invalid Configuration" hasta que
   is-a.dev publique el DNS en el paso siguiente — es normal).

### 2) Registrar el subdominio en is-a.dev

1. Haz **fork** de https://github.com/is-a-dev/register
2. En tu fork, crea el archivo `domains/ayches.json` con el contenido de
   [`ayches.json`](./ayches.json) (puedes copiarlo tal cual).
3. Abre un **Pull Request** hacia `is-a-dev/register`.
   - Escribe una descripción breve y tuya (p. ej. "Registro de ayches.is-a.dev para mi
     portafolio en Vercel"). Mantenlo simple y personal.
   - Revisa el PR por si piden algún cambio; si lo piden, atiéndelo o pueden rechazarlo.
4. Cuando lo **mergeen**, el DNS se publica en pocos minutos y Vercel pasará a
   "Valid Configuration" con HTTPS activo.

### 3) Verificar

```bash
dig +short ayches.is-a.dev CNAME     # debe devolver cname.vercel-dns.com
curl -I https://ayches.is-a.dev      # debe responder 200 desde Vercel
```

## Avisos importantes

- **is-a.dev pide NO usar IA para generar la solicitud** y se reservan el derecho de cerrar
  PRs generados por IA. Este archivo `ayches.json` es una simple configuración válida:
  **revísalo tú, súbelo desde tu cuenta y escribe la descripción del PR con tus palabras.**
- El `username` debe coincidir con tu usuario de GitHub que abre el PR (aquí: `AyChEs`).
- No marques el registro como `proxied`: Vercel necesita ver el dominio para emitir su
  certificado (is-a.dev es DNS-only por defecto, así que no hay que tocar nada).
- Referencia oficial: https://www.is-a.dev/  ·  Guía de Vercel + dominios:
  https://vercel.com/docs/projects/domains
