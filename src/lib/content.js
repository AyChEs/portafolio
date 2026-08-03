// Contenido bilingüe del portafolio. `tr(a, b)` elige ES/EN según el idioma.
export function getContent(lang) {
  const es = lang === 'es';
  const tr = (a, b) => (es ? a : b);

  // Logos auto-hospedados (devicon, MIT) en /public/assets/logos.
  const L = '/assets/logos/';

  return {
    es,
    name: 'Ayman Charoui Essamadi',
    firstName: 'Ayman',
    handle: 'AyChEs',
    initials: 'AC',

    ui: {
      hi: tr('Hola, soy', "Hi, I'm"),
      kicker: tr('Desarrollador Full-Stack', 'Full-Stack Developer'),
      tagline: tr(
        'Desarrollador full-stack centrado en backend — Ruby on Rails, APIs REST y SaaS multi-tenant.',
        'Full-stack developer focused on backend — Ruby on Rails, REST APIs and multi-tenant SaaS.'
      ),
      available: tr('Disponible para nuevas oportunidades', 'Open to new opportunities'),
      seeWork: tr('Ver proyectos', 'See projects'),
      getInTouch: tr('Hablemos', "Let's talk"),
      reachOut: tr('Escríbeme', 'Reach out'),
      sAbout: tr('Sobre mí', 'About me'),
      sStack: 'Stack',
      sProjects: tr('Proyectos', 'Projects'),
      sJourney: tr('Trayectoria', 'Journey'),
      sLang: tr('Idiomas', 'Languages'),
      sContact: tr('Contacto', 'Contact'),
      sHome: tr('Inicio', 'Home'),
      aboutLead: tr('Full-stack, más cómodo en el backend.', 'Full-stack, most at home in the backend.'),
      aboutBio: tr(
        'Cojo las funcionalidades de principio a fin con Ruby on Rails: APIs REST, control de permisos, i18n y generación de documentos para SaaS multi-tenant.',
        'I own features end to end with Ruby on Rails: REST APIs, permission control, i18n and document generation for multi-tenant SaaS.'
      ),
      aboutBio2: tr(
        'Me gusta el código simple, honesto y bien cuidado — prefiero una solución clara a una lista de logros inflada.',
        'I like code that is simple, honest and well cared for — I prefer a clear solution to an inflated list of achievements.'
      ),
      signature: tr('Del ticket al merge.', 'From ticket to merge.'),
      quickFacts: tr(
        [
          { k: 'Rol', v: 'Backend & Full-stack' },
          { k: 'Base', v: 'Ruby on Rails · PostgreSQL' },
          { k: 'Lugar', v: 'Tarragona · España' },
        ],
        [
          { k: 'Role', v: 'Backend & Full-stack' },
          { k: 'Core', v: 'Ruby on Rails · PostgreSQL' },
          { k: 'Place', v: 'Tarragona · Spain' },
        ]
      ),
      traits: tr(
        ['Detalle en el código', 'Buen ambiente', 'Curioso'],
        ['Detail in the code', 'Good vibes', 'Curious']
      ),
      locLabel: tr('Basado en', 'Based in'),
      locTitle: tr('Tarragona,', 'Tarragona,'),
      locSub: tr('España', 'Spain'),
      focusTitle: tr('Me interesa', "What I'm into"),
      interestsTitle: tr('Fuera del código', 'Off the clock'),
      availShort: tr('Disponible para proyectos', 'Available for work'),
      ctaA: tr('¿Tienes una idea?', 'Have an idea?'),
      ctaB: tr('Construyámosla', "Let's build it"),
      now: tr('Ahora', 'Now'),
      verified: tr('Verificado', 'Verified'),
      code: tr('Código', 'Code'),
      demo: 'Demo',
      inProgress: 'WIP',
      backTop: tr('Volver arriba', 'Back to top'),
      builtWith: tr('Diseñado y desarrollado con cuidado', 'Designed & built with care'),
      contactNote: tr(
        'Enlaces y CV próximamente — los añado en breve. Mientras tanto, escríbeme por LinkedIn.',
        'Links & CV coming soon — adding them shortly. In the meantime, reach me on LinkedIn.'
      ),
      // command palette
      palHint: tr('Salta a una sección…', 'Jump to a section…'),
      palPages: tr('Secciones', 'Pages'),
      palConnect: tr('Contacto', 'Connect'),
      palLegal: 'Legal',
      palEmpty: tr('Sin resultados.', 'No results.'),
      palLang: tr('Cambiar idioma', 'Change language'),
      palTheme: tr('Cambiar tema', 'Toggle theme'),
      palTap: tr('Explorar', 'Explore'),
      privacy: tr('Privacidad', 'Privacy'),
    },

    marquee: ['Ruby on Rails', 'REST APIs', 'PostgreSQL', 'Laravel', 'Spring Boot', 'React', 'Multi-tenant SaaS', 'i18n', 'CI/CD', 'JWT'],
    marqueeB: es
      ? ['Backend a producción', 'APIs limpias', 'Del ticket al merge', 'SaaS multi-tenant', 'Tests que importan', 'Detalle en el código']
      : ['Backend that ships', 'Clean APIs', 'Ticket to merge', 'Multi-tenant SaaS', 'Tests that matter', 'Detail in the code'],

    // Áreas profesionales que me representan.
    focus: [
      { icon: 'cpu', title: tr('Ingeniería embebida', 'Embedded engineering'), sub: tr('Hardware que piensa', 'Hardware that thinks') },
      { icon: 'code', title: tr('Desarrollo de software', 'Software development'), sub: tr('Del backend al producto', 'From backend to product') },
      { icon: 'ai', title: tr('Inteligencia artificial', 'Artificial intelligence'), sub: tr('Aprendiendo y aplicando', 'Learning & applying') },
    ],

    // Intereses personales.
    interests: [
      { icon: 'travel', label: tr('Viajar', 'Travel') },
      { icon: 'reading', label: tr('Leer', 'Reading') },
      { icon: 'gym', label: tr('Gimnasio', 'Gym') },
      { icon: 'cinema', label: tr('Cine', 'Cinema') },
    ],

    // Stack por categorías (layout en filas, no en cajas).
    techGroups: [
      { num: '01', cat: tr('Lenguajes', 'Languages'), items: [
        { n: 'Ruby', icon: L + 'ruby.svg' },
        { n: 'PHP', icon: L + 'php.svg' },
        { n: 'Java', icon: L + 'java.svg' },
        { n: 'JavaScript', icon: L + 'javascript.svg', m: 'JS' },
        { n: 'SQL', icon: null, m: 'SQL' },
      ]},
      { num: '02', cat: 'Frameworks', items: [
        { n: 'Rails', icon: L + 'rails.svg' },
        { n: 'Laravel', icon: L + 'laravel.svg' },
        { n: 'Spring', icon: L + 'spring.svg' },
        { n: 'React', icon: L + 'react.svg' },
      ]},
      { num: '03', cat: tr('Bases de datos', 'Databases'), items: [
        { n: 'PostgreSQL', icon: L + 'postgresql.svg', m: 'Pg' },
        { n: 'MySQL', icon: L + 'mysql.svg' },
      ]},
      { num: '04', cat: tr('Herramientas', 'Tools'), items: [
        { n: 'Git', icon: L + 'git.svg' },
        { n: 'Postman', icon: L + 'postman.svg' },
        { n: 'JIRA', icon: L + 'jira.svg' },
        { n: 'RubyMine', icon: null, m: 'RM' },
        { n: 'RSpec', icon: null, m: 'RS' },
        { n: 'CI/CD', icon: null, m: 'CI' },
      ]},
    ],

    projects: [
      { title: 'Hotel ERP System', num: '01', kind: tr('Plataforma web', 'Web platform'), when: '2025',
        img: '/assets/projects/hotel-erp.jpg', file: 'hotel-erp.java', url: 'hotel-erp.vercel.app',
        tags: ['Java', 'Spring Boot', 'React', 'PostgreSQL'],
        desc: tr(
          'Plataforma de administración empresarial con seguridad robusta (JWT), control de acceso por roles y dashboards de reporting.',
          'Enterprise administration platform with robust security (JWT), role-based access control, and reporting dashboards.'
        ),
        inProgress: false, hasLinks: true, code: 'https://github.com/AyChEs/hotel-erp', demo: 'https://hotel-erp-rho.vercel.app' },
      { title: 'CineFlow Booking Engine', num: '02', kind: tr('App web', 'Web app'), when: '2025',
        img: '/assets/projects/cineflow.svg', file: 'cineflow.php', url: 'cineflow.app',
        tags: ['PHP · Laravel', 'MySQL', 'Stripe API', 'JS'],
        desc: tr(
          'Sistema completo de reservas de cine con bloqueo de butacas en tiempo real (concurrencia) y lógica de precios dinámicos.',
          'Complete cinema reservation system featuring real-time seat locking concurrency and dynamic pricing logic.'
        ),
        inProgress: false, hasLinks: true, code: '#', demo: '#' },
    ],

    // Trayectoria unificada (estudios + trabajo + certificación), ascendente.
    journey: [
      { type: 'study', period: '2022 — 2024', title: tr('Téc. en Sistemas Microinformáticos y Redes', 'Diploma in Microcomputer Systems & Networks'),
        org: 'Institut Francesc Vidal i Barraquer', tag: tr('Honores · 8.6/10', 'Honors · 8.6/10'),
        note: tr('Primer contacto serio con sistemas, redes y hardware.', 'First serious contact with systems, networks and hardware.') },
      { type: 'work', period: tr('ene — may 2024', 'Jan — May 2024'), title: tr('Técnico Informático · Prácticas', 'IT Technician · Intern'),
        org: 'The British School of Costa Daurada', place: 'Tarragona',
        note: tr('Soporte técnico, redes y automatización de tareas.', 'Technical support, networks and task automation.') },
      { type: 'study', period: '2024 — 2026', title: tr('Téc. Superior en Desarrollo de Aplicaciones Web (DAW)', 'Higher Diploma in Web Application Development (DAW)'),
        org: 'Institut Francesc Vidal i Barraquer',
        note: tr('El salto al desarrollo: full-stack, bases de datos y despliegue.', 'The jump into development: full-stack, databases and deployment.') },
      { type: 'work', period: tr('jul 2025 — mar 2026', 'Jul 2025 — Mar 2026'), title: tr('Desarrollador Backend · Prácticas', 'Backend Developer · Intern'),
        org: 'Etecnic', place: 'Tarragona',
        note: tr('Primeros pasos en producción real con Ruby on Rails, compaginando estudios.', 'First steps in real production with Ruby on Rails, alongside my studies.') },
      { type: 'work', period: tr('mar 2026 — Actualidad', 'Mar 2026 — Present'), title: tr('Desarrollador Backend', 'Backend Developer'),
        org: 'Etecnic', place: 'Tarragona', current: true,
        note: tr('Funcionalidades de principio a fin: APIs REST con permisos, i18n de facturas en 9 idiomas, pipeline de PDFs y branding por dominio.',
                 'Features end to end: REST APIs with permissions, invoice i18n in 9 languages, a PDF pipeline and per-domain branding.') },
    ],

    languages: [
      { name: tr('Español', 'Spanish'), code: 'ES', level: tr('Nativo', 'Native'), sub: tr('Lengua materna', 'Mother tongue'), tier: 5 },
      { name: tr('Catalán', 'Catalan'), code: 'CA', level: tr('Nativo', 'Native'), sub: tr('Bilingüe', 'Bilingual'), tier: 5 },
      { name: tr('Árabe', 'Arabic'), code: 'AR', level: tr('Profesional', 'Professional'), sub: tr('Competencia profesional', 'Full professional'), tier: 4 },
      { name: tr('Inglés', 'English'), code: 'EN', level: 'B2', sub: tr('Profesional limitada', 'Limited working'), tier: 3 },
    ],

    contacts: [
      { key: 'linkedin', label: 'LinkedIn', value: '/in/ayches', href: 'https://www.linkedin.com/in/ayches', external: true },
      { key: 'github', label: 'GitHub', value: '/AyChEs', href: 'https://github.com/AyChEs', external: true },
      { key: 'email', label: 'Email', value: 'aymanessamadi72@gmail.com', href: 'mailto:aymanessamadi72@gmail.com', external: false },
      { key: 'resume', label: 'CV (PDF)', value: es ? 'añadir' : 'add', href: '#', external: false },
    ],

    nav: [
      { label: tr('Inicio', 'Home'), href: '#top', key: 'home' },
      { label: tr('Sobre mí', 'About'), href: '#about', key: 'about' },
      { label: 'Stack', href: '#stack', key: 'stack' },
      { label: tr('Proyectos', 'Projects'), href: '#projects', key: 'projects' },
      { label: tr('Trayectoria', 'Journey'), href: '#journey', key: 'journey' },
      { label: tr('Contacto', 'Contact'), href: '#contact', key: 'contact' },
    ],
  };
}
