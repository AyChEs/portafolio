// La portada («/») redirige al idioma del navegador; el resto de rutas pasa tal cual.
// Prioridad: cookie «lang» (elección manual) → Accept-Language → inglés.
export const onRequest: PagesFunction = async ({ request, next }) => {
  const url = new URL(request.url);
  if (url.pathname !== '/') return next();
  const cookie = /(?:^|;\s*)lang=(es|en)/.exec(request.headers.get('cookie') ?? '')?.[1];
  const accept = (request.headers.get('accept-language') ?? '').toLowerCase();
  const first = accept.split(',')[0]?.trim().slice(0, 2);
  const lang = cookie ?? (first === 'es' || first === 'ca' && /\bes\b/.test(accept) ? 'es' : 'en');
  return new Response(null, { status: 302, headers: { location: `/${lang}/`, vary: 'Accept-Language, Cookie', 'cache-control': 'private, no-store' } });
};
