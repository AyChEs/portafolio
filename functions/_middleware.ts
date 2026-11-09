// Las demos de los casos viven en el plan gratuito de Render, que las duerme tras 15 minutos
// sin visitas y tarda alrededor de un minuto en despertarlas. Cada vez que alguien abre una
// página del portafolio se les manda una petición en segundo plano: cuando llegue a «Demo»,
// ya estarán despiertas. No retrasa la respuesta (waitUntil) y solo gasta horas de Render
// cuando hay visitas reales.
const DEMOS = ['https://cineflow-ufe0.onrender.com/up', 'https://zellige-hotels.onrender.com/api/health'];

const despiertaDemos = () =>
  Promise.allSettled(DEMOS.map((u) => fetch(u, { headers: { 'user-agent': 'portafolio-warmup' }, signal: AbortSignal.timeout(90_000) })));

// La portada («/») redirige al idioma del navegador; el resto de rutas pasa tal cual.
// Prioridad: cookie «lang» (elección manual) → Accept-Language → inglés.
export const onRequest: PagesFunction = async ({ request, next, waitUntil }) => {
  const url = new URL(request.url);
  const esPagina = request.method === 'GET' && (request.headers.get('accept') ?? '').includes('text/html');
  if (esPagina) waitUntil(despiertaDemos());

  if (url.pathname !== '/') return next();
  const cookie = /(?:^|;\s*)lang=(es|en)/.exec(request.headers.get('cookie') ?? '')?.[1];
  const accept = (request.headers.get('accept-language') ?? '').toLowerCase();
  const first = accept.split(',')[0]?.trim().slice(0, 2);
  const lang = cookie ?? (first === 'es' || first === 'ca' && /\bes\b/.test(accept) ? 'es' : 'en');
  return new Response(null, { status: 302, headers: { location: `/${lang}/`, vary: 'Accept-Language, Cookie', 'cache-control': 'private, no-store' } });
};
