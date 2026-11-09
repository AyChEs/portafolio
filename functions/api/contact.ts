// POST /api/contact: valida el formulario, comprueba Turnstile y envía el correo con Resend.
// Variables (Cloudflare Pages → Settings → Variables and secrets):
//   TURNSTILE_SECRET   secreto de Turnstile
//   RESEND_API_KEY     clave de Resend
//   CONTACT_TO         correo que recibe los mensajes (el Gmail personal)
//   CONTACT_FROM       remitente verificado en Resend, p. ej. "Portafolio <web@ayches.is-a.dev>"

interface Env { TURNSTILE_SECRET?: string; RESEND_API_KEY?: string; CONTACT_TO?: string; CONTACT_FROM?: string }

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } });

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
const clean = (v: unknown, max: number) => String(v ?? '').replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, '').trim().slice(0, max);

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const { TURNSTILE_SECRET, RESEND_API_KEY, CONTACT_TO, CONTACT_FROM } = env;
  if (!TURNSTILE_SECRET || !RESEND_API_KEY || !CONTACT_TO || !CONTACT_FROM) return json({ error: 'not_configured' }, 503);

  // Solo desde este mismo sitio.
  const origin = request.headers.get('origin');
  if (origin && new URL(origin).host !== new URL(request.url).host) return json({ error: 'forbidden' }, 403);

  let form: FormData;
  try { form = await request.formData(); } catch { return json({ error: 'bad_request' }, 400); }

  // Campo trampa: los bots lo rellenan, las personas no lo ven. Se responde "ok" sin enviar nada.
  if (clean(form.get('website'), 200)) return json({ ok: true });

  const name = clean(form.get('name'), 80);
  const email = clean(form.get('email'), 120);
  const message = clean(form.get('message'), 2000);
  const kind = clean(form.get('kind'), 60);
  const when = clean(form.get('when'), 60);
  const lang = clean(form.get('lang'), 2) === 'en' ? 'en' : 'es';
  if (!name || message.length < 10 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return json({ error: 'invalid' }, 422);

  const token = clean(form.get('cf-turnstile-response'), 2048);
  if (!token) return json({ error: 'captcha' }, 422);
  const check = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: new URLSearchParams({ secret: TURNSTILE_SECRET, response: token, remoteip: request.headers.get('cf-connecting-ip') ?? '' }),
  });
  const verdict = (await check.json().catch(() => ({}))) as { success?: boolean };
  if (!verdict.success) return json({ error: 'captcha' }, 422);

  const html = `<p><b>${esc(name)}</b> &lt;${esc(email)}&gt;</p><p>${esc(kind)} · ${esc(when)} · ${lang}</p><p style="white-space:pre-wrap">${esc(message)}</p>`;
  const sent = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { authorization: `Bearer ${RESEND_API_KEY}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      from: CONTACT_FROM,
      to: [CONTACT_TO],
      reply_to: email,
      subject: `Portafolio · ${kind || 'proyecto'} · ${name}`.replace(/[\r\n]+/g, ' ').slice(0, 150),
      html,
      text: `${name} <${email}>\n${kind} · ${when} · ${lang}\n\n${message}`,
    }),
  });
  if (!sent.ok) return json({ error: 'send_failed' }, 502);
  return json({ ok: true });
};

export const onRequest: PagesFunction = () => json({ error: 'method_not_allowed' }, 405);
