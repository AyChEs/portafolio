import { CASES, ROUTES, PERSON } from '../content/site';

export function GET() {
  const urls: { es: string; en: string }[] = [
    { es: ROUTES.es.home, en: ROUTES.en.home },
    ...CASES.map((c) => ({ es: `${ROUTES.es.cases}${c.slug.es}/`, en: `${ROUTES.en.cases}${c.slug.en}/` })),
    { es: ROUTES.es.legal, en: ROUTES.en.legal },
  ];
  const entry = (loc: string, u: { es: string; en: string }) =>
    `<url><loc>${PERSON.site}${loc}</loc>` +
    `<xhtml:link rel="alternate" hreflang="es" href="${PERSON.site}${u.es}"/>` +
    `<xhtml:link rel="alternate" hreflang="en" href="${PERSON.site}${u.en}"/>` +
    `<xhtml:link rel="alternate" hreflang="x-default" href="${PERSON.site}${u.en}"/></url>`;
  const body = urls.flatMap((u) => [entry(u.es, u), entry(u.en, u)]).join('');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${body}</urlset>`,
    { headers: { 'content-type': 'application/xml; charset=utf-8' } },
  );
}
