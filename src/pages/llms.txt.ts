import { CASES, PERSON, ROUTES } from '../content/site';

// Resumen para asistentes de IA: quién soy y mis casos, con enlaces a cada página.
export function GET() {
  const cases = CASES.map((c) => `- [${c.title.en.replace(/\.$/, '')}](${PERSON.site}${ROUTES.en.cases}${c.slug.en}/): ${c.summary.en}`).join('\n');
  const text = `# ${PERSON.name} (Ayman Charoui)

> Full-stack developer based in Tarragona, Spain. I build complete web applications, from the backend to the interface, and I take special care with the parts that cannot fail. Working remotely in Spain and abroad, or hybrid in Tarragona and Barcelona. Languages: Spanish, Catalan, Arabic (professional) and English (B2).

Current job: full-stack developer at Etecnic since 2025, on a multi-tenant SaaS for EV charging management (Ruby on Rails). Earlier: web application development diploma and computer systems and networks diploma.

## Case studies

${cases}

## Stack

Ruby on Rails, Java and Spring Boot, PHP and Laravel, React, JavaScript, MySQL, PostgreSQL, MongoDB, Supabase, Stripe, Git, GitLab, GitHub, Jira, Sentry, Cloudflare, Postman.

## Pages

- [Home (English)](${PERSON.site}${ROUTES.en.home})
- [Inicio (español)](${PERSON.site}${ROUTES.es.home})
- [CV in English](${PERSON.site}${PERSON.cv.en})
- [CV en español](${PERSON.site}${PERSON.cv.es})

## Contact

- Email: ${PERSON.email}
- LinkedIn: ${PERSON.linkedin}
- GitHub: ${PERSON.github}
`;
  return new Response(text, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
}
