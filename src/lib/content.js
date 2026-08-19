// Contenido bilingüe del portafolio. `tr(a, b)` elige ES/EN según el idioma.
// URL del CV. Cuando tengas el PDF, súbelo a /public (p. ej. /cv-ayman-charoui.pdf)
// o pega aquí el enlace de Drive. Si queda vacío, el botón se muestra desactivado.
export const RESUME_URL = '';

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
        'Full-stack con base en Java. También trabajo con PHP y Ruby, y estoy metiéndole horas a Python.',
        "Full-stack with a base in Java. I also work with PHP and Ruby, and I'm putting in hours on Python."
      ),
      available: tr('Busco nuevas oportunidades', 'Looking for new opportunities'),
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
      aboutLead: tr('Full-stack, con Java como base.', 'Full-stack, with Java as my base.'),
      aboutBio: tr(
        'Normalmente llevo una funcionalidad entera: la API, los permisos, los idiomas y los documentos que genera la aplicación.',
        'I usually take a feature from start to finish: the API, permissions, languages and the documents the app generates.'
      ),
      aboutBio2: tr(
        'Prefiero el código simple. Si algo se puede resolver de forma clara, lo hago así.',
        'I prefer simple code. If something can be solved in a clear way, that is how I do it.'
      ),
      quickFacts: tr(
        [
          { k: 'Rol', v: 'Full-Stack' },
          { k: 'Base', v: 'Java · PostgreSQL' },
          { k: 'Lugar', v: 'Tarragona · España' },
        ],
        [
          { k: 'Role', v: 'Full-Stack' },
          { k: 'Core', v: 'Java · PostgreSQL' },
          { k: 'Place', v: 'Tarragona · Spain' },
        ]
      ),
      traits: tr([], []),
      locLabel: tr('Dónde estoy', 'Where I am'),
      locTitle: tr('Tarragona,', 'Tarragona,'),
      locSub: tr('España', 'Spain'),
      focusTitle: tr('Me interesa', "What I'm into"),
      interestsTitle: tr('Y fuera del trabajo', 'And outside work'),
      availShort: tr('Abierto a propuestas', 'Open to offers'),
      ctaA: tr('¿Tienes algo en mente?', 'Got something in mind?'),
      ctaB: tr('Cuéntamelo', 'Tell me about it'),
      now: tr('Ahora', 'Now'),
      verified: tr('Verificado', 'Verified'),
      code: tr('Código', 'Code'),
      demo: 'Demo',
      inProgress: 'WIP',
      backTop: tr('Volver arriba', 'Back to top'),
      builtWith: tr('Hecho con React y Vite', 'Built with React and Vite'),
      contactNote: tr(
        'Si quieres contar conmigo para un proyecto o una vacante, escríbeme. Respondo antes en LinkedIn.',
        'If you want to work with me on a project or a role, get in touch. LinkedIn is where I reply fastest.'
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
      privacy: tr('Aviso legal y privacidad', 'Legal notice & privacy'),
      resumeSoon: tr('Lo subo en breve', 'Uploading it shortly'),
    },

    marquee: ['Java', 'Spring Boot', 'PHP', 'Laravel', 'REST APIs', 'PostgreSQL', 'React', 'MySQL', 'Git', 'JWT', 'Ruby on Rails'],

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
        { n: 'Java', icon: L + 'java.svg' },
        { n: 'PHP', icon: L + 'php.svg' },
        { n: 'Ruby', icon: L + 'ruby.svg' },
        { n: 'JavaScript', icon: L + 'javascript.svg', m: 'JS' },
        { n: 'SQL', icon: null, m: 'SQL' },
      ]},
      { num: '02', cat: 'Frameworks', items: [
        { n: 'Spring', icon: L + 'spring.svg' },
        { n: 'Laravel', icon: L + 'laravel.svg' },
        { n: 'Rails', icon: L + 'rails.svg' },
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
        img: '/assets/projects/hotel-erp.png', file: 'hotel-erp.java', url: 'zellige-hotels.vercel.app',
        tags: ['Java', 'Spring Boot', 'React', 'PostgreSQL'],
        desc: tr(
          'Plataforma de administración empresarial con seguridad robusta (JWT), control de acceso por roles y dashboards de reporting.',
          'Enterprise administration platform with robust security (JWT), role-based access control, and reporting dashboards.'
        ),
        inProgress: false, hasLinks: true, code: 'https://github.com/AyChEs/Zellige-Hotels', demo: 'https://zellige-hotels.vercel.app' },
      { title: 'CineFlow Booking Engine', num: '02', kind: tr('App web', 'Web app'), when: '2025',
        img: '/assets/projects/cineflow.png', file: 'cineflow.php', url: 'cineflow-ufe0.onrender.com',
        tags: ['PHP · Laravel', 'MySQL', 'Stripe API', 'JS'],
        desc: tr(
          'Sistema completo de reservas de cine con bloqueo de butacas en tiempo real (concurrencia) y lógica de precios dinámicos.',
          'Complete cinema reservation system featuring real-time seat locking concurrency and dynamic pricing logic.'
        ),
        inProgress: false, hasLinks: true, code: 'https://github.com/AyChEs/cineflow-booking-engine', demo: 'https://cineflow-ufe0.onrender.com/' },
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
      { type: 'work', period: tr('mar 2026 — Actualidad', 'Mar 2026 — Present'), title: tr('Desarrollador Full-Stack', 'Full-Stack Developer'),
        org: 'Etecnic', place: 'Tarragona', current: true,
        note: tr('Funcionalidades de principio a fin: APIs REST con permisos, i18n de facturas en 9 idiomas, pipeline de PDFs y branding por dominio.',
                 'Features end to end: REST APIs with permissions, invoice i18n in 9 languages, a PDF pipeline and per-domain branding.'),
        tag: tr('Promoción tras las prácticas', 'Promoted after the internship') },
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
      {
        key: 'resume',
        label: tr('Descargar CV', 'Download CV'),
        value: RESUME_URL ? 'PDF' : tr('próximamente', 'coming soon'),
        href: RESUME_URL || null,
        external: true,
      },
    ],

    // Aviso legal y privacidad (página aparte, en #/legal).
    legal: {
      title: tr('Aviso legal y privacidad', 'Legal notice & privacy'),
      intro: tr(
        'Esta página recoge las condiciones de uso de este sitio, cómo se tratan los datos personales y bajo qué licencias se publica el contenido.',
        'This page covers the terms of use of this site, how personal data is handled, and the licences the content is published under.'
      ),
      updated: tr('Última actualización: agosto de 2026', 'Last updated: August 2026'),
      back: tr('Volver al portafolio', 'Back to the portfolio'),
      sections: [
        {
          id: 'titular',
          h: tr('1. Titular del sitio', '1. Site owner'),
          body: tr(
            [
              'Titular: Ayman Charoui Essamadi.',
              'Contacto: aymanessamadi72@gmail.com.',
              'Finalidad del sitio: portafolio personal con fines informativos y profesionales. No se ofrecen productos ni servicios de pago a través de esta web, y no existe contratación en línea.',
            ],
            [
              'Owner: Ayman Charoui Essamadi.',
              'Contact: aymanessamadi72@gmail.com.',
              'Purpose: a personal portfolio for informational and professional use. No paid products or services are sold here, and there is no online contracting.',
            ]
          ),
        },
        {
          id: 'datos',
          h: tr('2. Protección de datos personales', '2. Personal data protection'),
          body: tr(
            [
              'El tratamiento de datos personales se rige por el Reglamento (UE) 2016/679, General de Protección de Datos (RGPD), y por la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD).',
              'Este sitio no incluye formularios, no utiliza herramientas de analítica ni de publicidad, y no envía datos a servidores propios ni de terceros. Dicho de otro modo: navegar por esta web no genera ningún registro de datos personales por mi parte.',
              'Lo único que se guarda es una preferencia de tema (claro u oscuro) y de idioma en el almacenamiento local de tu navegador. Es información técnica que no te identifica, permanece en tu dispositivo y puedes borrarla vaciando los datos del sitio en tu navegador.',
              'Si me escribes por correo electrónico o por LinkedIn, trataré los datos que me facilites con la única finalidad de responderte y, en su caso, valorar una colaboración u oferta laboral. La base jurídica es tu consentimiento y el interés legítimo en atender tu consulta. Conservaré esos mensajes mientras dure la conversación y el tiempo necesario para atender posibles responsabilidades.',
            ],
            [
              'Personal data is handled under Regulation (EU) 2016/679 (GDPR) and, in Spain, Organic Law 3/2018 on Data Protection and the guarantee of digital rights (LOPDGDD).',
              'This site has no forms, uses no analytics or advertising tools, and sends no data to my own servers or to third parties. In other words: browsing this site does not create any personal data record on my side.',
              'The only thing stored is your theme (light or dark) and language preference, kept in your browser local storage. It is technical information that does not identify you, it stays on your device, and you can remove it by clearing the site data in your browser.',
              'If you email me or write to me on LinkedIn, I will use the data you provide solely to reply and, where relevant, to consider a collaboration or job opportunity. The legal basis is your consent and my legitimate interest in answering your enquiry. I keep those messages for as long as the conversation lasts and any period needed to address possible liabilities.',
            ]
          ),
        },
        {
          id: 'derechos',
          h: tr('3. Tus derechos', '3. Your rights'),
          body: tr(
            [
              'Puedes ejercer en cualquier momento tus derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad escribiendo a aymanessamadi72@gmail.com. Bastará con que indiques cuál de ellos quieres ejercer.',
              'Si consideras que tus datos no se han tratado correctamente, puedes presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es).',
            ],
            [
              'You can exercise your rights of access, rectification, erasure, objection, restriction of processing and portability at any time by writing to aymanessamadi72@gmail.com. Just tell me which one you want to exercise.',
              'If you believe your data has not been handled properly, you can lodge a complaint with the Spanish Data Protection Agency (www.aepd.es).',
            ]
          ),
        },
        {
          id: 'cookies',
          h: tr('4. Cookies', '4. Cookies'),
          body: tr(
            [
              'Este sitio no utiliza cookies de analítica, de publicidad ni de seguimiento, ni propias ni de terceros. Por eso no verás un banner de consentimiento: no hay nada que consentir.',
              'Como se ha indicado, solo se emplea el almacenamiento local del navegador para recordar tus preferencias de tema e idioma, algo técnicamente necesario para que la interfaz funcione como esperas.',
            ],
            [
              'This site uses no analytics, advertising or tracking cookies, neither first-party nor third-party. That is why you will not see a consent banner: there is nothing to consent to.',
              'As noted above, only browser local storage is used, to remember your theme and language preferences. That is technically necessary for the interface to behave as you expect.',
            ]
          ),
        },
        {
          id: 'propiedad',
          h: tr('5. Propiedad intelectual y licencias', '5. Intellectual property and licences'),
          body: tr(
            [
              'Los textos, el diseño y el código de este sitio son obra propia y están protegidos por el Real Decreto Legislativo 1/1996, por el que se aprueba el texto refundido de la Ley de Propiedad Intelectual.',
              'Puedes citar o enlazar este sitio libremente. Para reproducir el diseño o los textos de forma sustancial, o reutilizarlos con fines comerciales, hace falta autorización previa por escrito.',
              'Cada proyecto mostrado en el portafolio se publica con su propia licencia, indicada en su repositorio correspondiente. Consulta el archivo LICENSE de cada repositorio antes de reutilizar su código.',
              'Los proyectos realizados en un contexto laboral pertenecen a sus respectivas empresas. En este portafolio solo se describe mi participación en ellos, sin publicar código ni material confidencial.',
              'Sobre recursos de terceros: los iconos de tecnologías proceden de Devicon (licencia MIT, © 2015 konpa) y la tipografía Bricolage Grotesque se distribuye bajo la SIL Open Font License 1.1. Sus licencias completas se incluyen junto a los archivos en este repositorio.',
            ],
            [
              'The text, design and code of this site are my own work and are protected by Spanish Royal Legislative Decree 1/1996, which approves the consolidated text of the Intellectual Property Act.',
              'You are welcome to quote or link to this site. Reproducing the design or the text substantially, or reusing it commercially, requires prior written permission.',
              'Each project shown in the portfolio is published under its own licence, stated in its corresponding repository. Check the LICENSE file in each repository before reusing its code.',
              'Projects carried out in a professional context belong to their respective companies. This portfolio only describes my involvement in them; no code or confidential material is published.',
              'On third-party resources: the technology icons come from Devicon (MIT licence, © 2015 konpa) and the Bricolage Grotesque typeface is distributed under the SIL Open Font License 1.1. Their full licences are included alongside the files in this repository.',
            ]
          ),
        },
        {
          id: 'uso',
          h: tr('6. Condiciones de uso y responsabilidad', '6. Terms of use and liability'),
          body: tr(
            [
              'El contenido de este sitio se ofrece con fines informativos. Procuro que la información esté actualizada y sea correcta, pero no puedo garantizar que esté libre de errores u omisiones.',
              'Este sitio enlaza a páginas externas (LinkedIn, GitHub y demos de proyectos). No soy responsable del contenido ni de las políticas de privacidad de esos sitios.',
              'No se permite usar esta web para fines ilícitos, ni intentar dañar su funcionamiento o el de los sistemas desde los que se sirve.',
            ],
            [
              'The content of this site is provided for information purposes. I aim to keep it accurate and up to date, but I cannot guarantee it is free of errors or omissions.',
              'This site links to external pages (LinkedIn, GitHub and project demos). I am not responsible for the content or the privacy policies of those sites.',
              'Using this site for unlawful purposes, or attempting to damage its operation or the systems serving it, is not permitted.',
            ]
          ),
        },
        {
          id: 'ley',
          h: tr('7. Legislación aplicable', '7. Applicable law'),
          body: tr(
            [
              'Estas condiciones se rigen por la legislación española. Para cualquier controversia derivada del uso de este sitio serán competentes los juzgados y tribunales que correspondan conforme a la normativa vigente.',
            ],
            [
              'These terms are governed by Spanish law. Any dispute arising from the use of this site will be settled by the courts designated under the applicable regulations.',
            ]
          ),
        },
      ],
    },

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
