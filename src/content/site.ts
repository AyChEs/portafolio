// Todo el texto de la web, en español e inglés. Tono: primera persona, frases
// cortas, hechos antes que adjetivos (ver «Marca» en CLAUDE.md).

export type Lang = 'es' | 'en';

export const PERSON = {
  name: 'Ayman Charoui Essamadi',
  short: 'Ayman Charoui',
  email: 'aymanessamadi72@gmail.com',
  linkedin: 'https://www.linkedin.com/in/ayches',
  github: 'https://github.com/AyChEs',
  site: 'https://ayches.is-a.dev',
  cv: { es: '/cv/CV-Ayman-Charoui-ES.pdf', en: '/cv/CV-Ayman-Charoui-EN.pdf' },
};

export const ROUTES = {
  es: { home: '/es/', cases: '/es/casos/', legal: '/es/aviso-legal/' },
  en: { home: '/en/', cases: '/en/cases/', legal: '/en/legal/' },
} as const;

type Pair<T> = Record<Lang, T>;

export const UI: Pair<Record<string, string>> = {
  es: {
    title: 'Ayman Charoui · Desarrollador full-stack',
    description:
      'Ayman Charoui, desarrollador full-stack en Tarragona. Construyo aplicaciones web completas, del backend a la interfaz. Rails, Java y Spring, Laravel y React.',
    navProjects: 'Proyectos', navStack: 'Stack', navHow: 'Cómo trabajo', navAbout: 'Sobre mí', navProject: '¿Tienes un proyecto?',
    cv: 'CV', downloadCV: 'Descargar CV', talk: 'Hablemos', seeProjects: 'Ver proyectos',
    available: 'Disponible · remoto o en Tarragona y Barcelona',
    leadStrong: 'Desarrollador full-stack.',
    lead: 'Construyo aplicaciones web completas, del backend a la interfaz, y cuido especialmente lo que no puede fallar.',
    whatIDo: '// lo que hago',
    proof1: 'Código en producción desde 2025', proof2: '3 proyectos con código o demo', proof3: 'Trabajo en ES · CA · AR · EN',
    casesKicker: '01 · proyectos', casesTitle: 'Casos',
    casesIntro: 'Tres proyectos con el problema, lo que decidí y por qué. Cada uno tiene su página con el detalle.',
    problem: 'problema', decision: 'decisión', result: 'resultado',
    readCase: 'Leer el caso', code: 'Código', demo: 'Demo',
    stackKicker: '02 · stack', stackTitle: 'Stack',
    stackIntro: 'Las teclas que pulso cada día: lenguajes, frameworks, datos y herramientas, todo en el mismo teclado.',
    stackHintMouse: 'mueve el ratón sobre el teclado y pasa por las teclas', stackHintTouch: 'toca una tecla para ver su nombre',
    stackCredit: 'Logotipos de Devicon (MIT) y Simple Icons (CC0); las marcas pertenecen a sus dueños.',
    howKicker: '03 · cómo trabajo', howTitle: 'Cómo trabajo', howIntro: 'Lo que hago en cada tarea, sea en un equipo o en un proyecto por mi cuenta.',
    aboutKicker: '04 · sobre mí', aboutTitle: 'Sobre mí', cvOther: 'CV en inglés',
    whereK: '// dónde estoy', whereT: 'Tarragona, España', whereS: 'Remoto en España e internacional, o híbrido en Tarragona y Barcelona.',
    pathK: '// trayectoria', langsK: '// idiomas',
    nowTitle: 'Ahora mismo', nowSub: 'fuera del trabajo', nowIntro: 'Lo que tengo encima de la mesa cuando cierro el portátil.',
    freeKicker: '05 · proyectos', freeTitle: '¿Tienes un proyecto',
    freeIntro: 'Ahora mismo busco un puesto como desarrollador. Aun así, si tienes un proyecto concreto que encaje con lo que hago, cuéntamelo y te digo con sinceridad si puedo ayudarte.',
    yes: '// encaja', no: '// no encaja',
    fKind: '¿Qué tipo de proyecto?', fWhat: 'Qué necesitas', fWhatPh: 'Cuéntamelo en pocas líneas: qué quieres conseguir y qué tienes ya.',
    fWhen: '¿Para cuándo?', fName: 'Tu nombre', fEmail: 'Tu correo', fEmailPh: 'para poder responderte',
    fSend: 'Enviar', fSending: 'Enviando…', fOk: 'Recibido. Te respondo en unos días.', fErr: 'No se ha podido enviar. Escríbeme a',
    fNote: 'Protegido con Cloudflare Turnstile. Solo uso tus datos para responderte.',
    fOff: 'El formulario aún no está activo. Mientras tanto, escríbeme a',
    contactKicker: '06 · contacto', copy: 'Copiar', copied: 'Copiado',
    legal: 'Aviso legal y privacidad', home: 'Inicio', allCases: 'Todos los casos', prevCase: 'caso anterior', nextCase: 'siguiente caso',
    context: 'Contexto', decisions: 'Lo que decidí, y por qué', learned: 'Qué aprendí', different: 'Qué haría distinto',
    role: 'rol', year: 'año', stack: 'stack', links: 'enlaces', why: 'por qué', what: 'qué',
    skip: 'Saltar al contenido', langSwitch: 'English',
  },
  en: {
    title: 'Ayman Charoui · Full-stack developer',
    description:
      'Ayman Charoui, full-stack developer based in Tarragona, Spain. I build complete web applications, from the backend to the interface. Rails, Java and Spring, Laravel and React.',
    navProjects: 'Projects', navStack: 'Stack', navHow: 'How I work', navAbout: 'About', navProject: 'Got a project?',
    cv: 'CV', downloadCV: 'Download CV', talk: "Let's talk", seeProjects: 'See projects',
    available: 'Available · remote, or in Tarragona and Barcelona',
    leadStrong: 'Full-stack developer.',
    lead: 'I build complete web applications, from the backend to the interface, and I take special care with the parts that cannot fail.',
    whatIDo: '// what I do',
    proof1: 'Code in production since 2025', proof2: '3 projects with code or demo', proof3: 'I work in ES · CA · AR · EN',
    casesKicker: '01 · projects', casesTitle: 'Case studies',
    casesIntro: 'Three projects: the problem, what I decided and why. Each one has its own page with the details.',
    problem: 'problem', decision: 'decision', result: 'result',
    readCase: 'Read the case', code: 'Code', demo: 'Demo',
    stackKicker: '02 · stack', stackTitle: 'Stack',
    stackIntro: 'The keys I press every day: languages, frameworks, data and tools, all on the same keyboard.',
    stackHintMouse: 'move your mouse over the keyboard and hover the keys', stackHintTouch: 'tap a key to see its name',
    stackCredit: 'Logos from Devicon (MIT) and Simple Icons (CC0); trademarks belong to their owners.',
    howKicker: '03 · how I work', howTitle: 'How I work', howIntro: 'What I do on every task, whether in a team or on a project of my own.',
    aboutKicker: '04 · about', aboutTitle: 'About me', cvOther: 'CV in Spanish',
    whereK: '// where I am', whereT: 'Tarragona, Spain', whereS: 'Remote in Spain and abroad, or hybrid in Tarragona and Barcelona.',
    pathK: '// path', langsK: '// languages',
    nowTitle: 'Right now', nowSub: 'outside work', nowIntro: 'What is on my desk when I close the laptop.',
    freeKicker: '05 · projects', freeTitle: 'Got a project',
    freeIntro: "Right now I'm looking for a developer role. Even so, if you have a specific project that fits what I do, tell me about it and I'll be honest about whether I can help.",
    yes: '// a good fit', no: '// not a fit',
    fKind: 'What kind of project?', fWhat: 'What you need', fWhatPh: 'A few lines: what you want to achieve and what you already have.',
    fWhen: 'When for?', fName: 'Your name', fEmail: 'Your email', fEmailPh: 'so I can reply',
    fSend: 'Send', fSending: 'Sending…', fOk: "Got it. I'll reply within a few days.", fErr: 'It could not be sent. Write to me at',
    fNote: 'Protected by Cloudflare Turnstile. I only use your details to reply.',
    fOff: 'The form is not live yet. In the meantime, write to me at',
    contactKicker: '06 · contact', copy: 'Copy', copied: 'Copied',
    legal: 'Legal notice & privacy', home: 'Home', allCases: 'All case studies', prevCase: 'previous case', nextCase: 'next case',
    context: 'Context', decisions: 'What I decided, and why', learned: 'What I learned', different: "What I'd do differently",
    role: 'role', year: 'year', stack: 'stack', links: 'links', why: 'why', what: 'what',
    skip: 'Skip to content', langSwitch: 'Español',
  },
};

export const WHAT_I_DO: Pair<{ t: string; s: string }[]> = {
  es: [
    { t: 'Backend y APIs', s: 'Endpoints, permisos por rol, pagos y facturación' },
    { t: 'Frontend', s: 'Interfaces en React que se entienden a la primera' },
    { t: 'Bases de datos', s: 'Modelado y consultas en MySQL, PostgreSQL y MongoDB' },
  ],
  en: [
    { t: 'Backend and APIs', s: 'Endpoints, role-based permissions, payments and invoicing' },
    { t: 'Frontend', s: 'React interfaces that make sense at first glance' },
    { t: 'Databases', s: 'Modelling and queries in MySQL, PostgreSQL and MongoDB' },
  ],
};

export const HOW: Pair<{ t: string; s: string }[]> = {
  es: [
    { t: 'Pruebas antes del merge', s: 'Lo que toca permisos o dinero lleva sus tests. Si no está probado, no está terminado.' },
    { t: 'Cambios pequeños', s: 'Merge requests que se revisan en minutos y se pueden deshacer sin miedo.' },
    { t: 'Mirar dónde corre', s: 'Cuando algo falla, miro también el entorno, no solo el código. Viene de mis años en sistemas.' },
  ],
  en: [
    { t: 'Tests before the merge', s: 'Anything that touches permissions or money ships with its tests. If it is not tested, it is not done.' },
    { t: 'Small changes', s: 'Merge requests that can be reviewed in minutes and rolled back without fear.' },
    { t: 'Look at where it runs', s: 'When something breaks, I look at the environment too, not just the code. That comes from my years in systems.' },
  ],
};

export const BIO: Pair<string[]> = {
  es: [
    'Soy <strong>Ayman Charoui</strong>, de Tarragona. Empecé a programar porque es la mejor forma que conozco de convertir una idea en algo real que funciona.',
    'Vengo de sistemas y redes, y desde 2025 escribo código que está en producción. Me gusta el código simple y que trabajar conmigo sea cómodo.',
  ],
  en: [
    "I'm <strong>Ayman Charoui</strong>, from Tarragona. I started programming because it is the best way I know to turn an idea into something real that works.",
    'I come from systems and networks, and since 2025 I have been writing code that runs in production. I like simple code, and I like being easy to work with.',
  ],
};

export const PATH: Pair<{ when: string; t: string; s: string; now?: boolean }[]> = {
  es: [
    { when: '2025 → hoy', t: 'Desarrollador full-stack', s: 'Etecnic · de prácticas a contrato indefinido', now: true },
    { when: '2024–2026', t: 'Desarrollo de Aplicaciones Web (DAW)', s: 'Institut Francesc Vidal i Barraquer' },
    { when: '2024', t: 'Técnico informático en prácticas', s: 'Windows Server, Linux y Office 365' },
    { when: '2022–2024', t: 'Sistemas Microinformáticos y Redes', s: 'Matrícula de honor · 8,6' },
  ],
  en: [
    { when: '2025 → now', t: 'Full-stack developer', s: 'Etecnic · from internship to permanent contract', now: true },
    { when: '2024–2026', t: 'Higher Diploma in Web Application Development', s: 'Institut Francesc Vidal i Barraquer' },
    { when: '2024', t: 'IT technician intern', s: 'Windows Server, Linux and Office 365' },
    { when: '2022–2024', t: 'Diploma in Computer Systems and Networks', s: 'With honours · 8.6/10' },
  ],
};

export const LANGS: Pair<[string, string][]> = {
  es: [['ES', 'nativo'], ['CA', 'nativo'], ['AR', 'profesional'], ['EN', 'B2']],
  en: [['ES', 'native'], ['CA', 'native'], ['AR', 'professional'], ['EN', 'B2']],
};

export const NOW: Pair<Record<string, string>> = {
  es: {
    tripK: 'ÚLTIMO VIAJE', tripCity: 'Granada', tripCountry: 'España', tripBestK: 'lo mejor',
    tripBest: 'La Alhambra y el mirador de San Nicolás.', tripStamp: 'TARRAGONA → GRANADA',
    filmK: 'ÚLTIMA PELÍCULA', film: 'Spider-Man: Brand New Day', filmNote: 'Me gusta Spider-Man, pero esperaba más.',
    bookK: 'FICHA DE LECTURA', bookTitleK: 'título', bookTitle: 'La disciplina del alma',
    bookSub: 'El refinamiento del carácter y el tratamiento de las enfermedades del corazón',
    bookAuthorK: 'autor', bookAuthor: 'Al-Ghazali', bookStateK: 'estado', bookState: 'en curso', stamp: 'LEYENDO<br>AHORA',
    gymK: 'CARNÉ DE SOCIO', gymSportK: 'deporte', gymSport: 'Gimnasio', gymFoot: 'Voy al gimnasio.',
  },
  en: {
    tripK: 'LAST TRIP', tripCity: 'Granada', tripCountry: 'Spain', tripBestK: 'the best part',
    tripBest: 'The Alhambra and the San Nicolás viewpoint.', tripStamp: 'TARRAGONA → GRANADA',
    filmK: 'LAST FILM', film: 'Spider-Man: Brand New Day', filmNote: 'I like Spider-Man, but I expected more.',
    bookK: 'READING CARD', bookTitleK: 'title', bookTitle: 'The Discipline of the Soul',
    bookSub: 'Refining the character and curing the sicknesses of the heart',
    bookAuthorK: 'author', bookAuthor: 'Al-Ghazali', bookStateK: 'status', bookState: 'reading', stamp: 'READING<br>NOW',
    gymK: 'MEMBER CARD', gymSportK: 'sport', gymSport: 'Gym', gymFoot: 'I go to the gym.',
  },
};

export const FREELANCE: Pair<{ yes: string[]; no: string[]; kinds: string[]; when: string[] }> = {
  es: {
    yes: ['Aplicaciones web a medida', 'APIs e integraciones', 'Pagos y facturación', 'Mejoras en Laravel, Spring o Rails'],
    no: ['WordPress o tiendas de plantilla', 'Apps móviles nativas', 'Urgencias 24/7', 'Proyectos sin alcance definido'],
    kinds: ['Aplicación web', 'API o integración', 'Mejorar algo que ya existe', 'Otra cosa'],
    when: ['Sin prisa', 'De 1 a 3 meses', 'Menos de un mes'],
  },
  en: {
    yes: ['Custom web applications', 'APIs and integrations', 'Payments and invoicing', 'Improvements to Laravel, Spring or Rails apps'],
    no: ['WordPress or template shops', 'Native mobile apps', '24/7 emergencies', 'Projects with no defined scope'],
    kinds: ['Web application', 'API or integration', 'Improve something existing', 'Something else'],
    when: ['No rush', '1 to 3 months', 'Less than a month'],
  },
};

// Teclado del stack: 8 unidades por fila. `w` es el ancho en teclas.
export type Key = { id: string; label?: string; note?: Pair<string>; kind?: 'acc' | 'blank' | 'space'; w?: number; mono?: string };
export const KEYBOARD: Key[][] = [
  [
    { id: 'lambda', kind: 'acc' },
    { id: 'java', label: 'Java', note: { es: 'donde mejor leo el código', en: 'where I read code best' } },
    { id: 'spring', label: 'Spring Boot' },
    { id: 'php', label: 'PHP' },
    { id: 'laravel', label: 'Laravel' },
    { id: 'rails', label: 'Ruby on Rails', note: { es: 'lo uso a diario', en: 'I use it every day' } },
    { id: 'react', label: 'React', note: { es: 'mi preferido en frontend', en: 'my favourite on the frontend' } },
    { id: 'javascript', label: 'JavaScript' },
  ],
  [
    { id: 'b1', kind: 'blank', w: 1 },
    { id: 'mysql', label: 'MySQL' },
    { id: 'postgresql', label: 'PostgreSQL' },
    { id: 'mongodb', label: 'MongoDB' },
    { id: 'supabase', label: 'Supabase', note: { es: 'en mis proyectos', en: 'in my own projects' } },
    { id: 'stripe', label: 'Stripe' },
    { id: 'git', label: 'Git' },
    { id: 'github', label: 'GitHub' },
  ],
  [
    { id: 'gitlab', label: 'GitLab' },
    { id: 'jira', label: 'Jira' },
    { id: 'sentry', label: 'Sentry' },
    { id: 'cloudflare', label: 'Cloudflare' },
    { id: 'postman', label: 'Postman' },
    { id: 'vscode', label: 'VS Code' },
    { id: 'dbx', label: 'DBX Studio', mono: 'DBX' },
    { id: 'claude', label: 'Claude' },
  ],
  [
    { id: 'b2', kind: 'blank', w: 1.25 },
    { id: 'space', kind: 'space', w: 5.5 },
    { id: 'b3', kind: 'blank', w: 1.25 },
  ],
];

// Casos. `slug` cambia por idioma para que cada URL esté en su idioma.
export type Case = {
  id: string;
  slug: Pair<string>;
  kicker: Pair<string>;
  title: Pair<string>;
  summary: Pair<string>;
  problem: Pair<string>;
  decision: Pair<string>;
  result: Pair<string>;
  tags: string[];
  visual: { type: 'diagram' } | { type: 'shot'; src: string; alt: Pair<string>; extra?: { src: string; alt: Pair<string> }[] };
  meta: { role: Pair<string>; year: string; code?: string; demo?: string };
  context: Pair<string[]>;
  decisions: Pair<{ t: string; what: string; why?: string }[]>;
  outcome: Pair<string[]>;
  learned?: Pair<string[]>;
  different?: Pair<string[]>;
};

export const CASES: Case[] = [
  {
    id: 'saas',
    slug: { es: 'facturacion-saas-recarga', en: 'ev-charging-saas-invoicing' },
    kicker: { es: 'caso 01 · SaaS de recarga eléctrica · Etecnic', en: 'case 01 · EV charging SaaS · Etecnic' },
    title: { es: 'Facturas correctas en nueve idiomas.', en: 'Correct invoices in nine languages.' },
    summary: {
      es: 'En un SaaS multi-tenant de gestión de recarga de vehículo eléctrico, internacionalicé la facturación y la llevé a un flujo de plantillas probado en CI.',
      en: 'In a multi-tenant SaaS for EV charging management, I internationalised invoicing and moved it to a template pipeline tested in CI.',
    },
    problem: {
      es: 'Operadores energéticos y aeropuertos de varios países necesitan facturas legales en su idioma y con el aspecto de su marca.',
      en: 'Energy operators and airports in several countries need legally valid invoices in their own language and with their own branding.',
    },
    decision: {
      es: 'Internacionalicé la facturación a nueve idiomas y pasé los PDF de factura a plantillas HTML y CSS que se generan y se prueban en CI.',
      en: 'I internationalised invoicing into nine languages and moved the invoice PDFs to HTML and CSS templates that are generated and tested in CI.',
    },
    result: {
      es: 'La factura sale en el idioma y con la marca de cada cliente. La parte de facturación la hice yo de principio a fin.',
      en: "Each customer gets invoices in their language and with their brand. I built the invoicing work end to end.",
    },
    tags: ['Ruby on Rails', 'RSpec', 'MySQL Aurora', 'MongoDB', 'GitLab CI', 'Sentry'],
    visual: { type: 'diagram' },
    meta: { role: { es: 'Desarrollador full-stack', en: 'Full-stack developer' }, year: '2025 → hoy' },
    context: {
      es: [
        'Es mi trabajo actual en Etecnic, donde entré en prácticas y me quedé con contrato indefinido. El producto es un SaaS multi-tenant con el que operadores energéticos y aeropuertos gestionan la recarga de vehículos eléctricos.',
        'Llevo funcionalidades completas: endpoints REST con permisos por rol y tests en RSpec, branding por dominio y, sobre todo, la facturación. No publico código ni material de la empresa: aquí solo cuento mi parte.',
      ],
      en: [
        'This is my current job at Etecnic, where I joined as an intern and stayed on a permanent contract. The product is a multi-tenant SaaS that energy operators and airports use to manage EV charging.',
        'I take features end to end: REST endpoints with role-based permissions and RSpec tests, per-domain branding and, above all, invoicing. I do not publish company code or material: this page only covers my part.',
      ],
    },
    decisions: {
      es: [
        { t: 'Facturación en nueve idiomas', what: 'Todos los textos de la factura salen de traducciones, no de cadenas fijas, para que cada cliente la reciba en su idioma.' },
        { t: 'PDF a partir de plantillas HTML y CSS', what: 'Migré la generación de los PDF de factura a plantillas HTML y CSS, con su paso en el pipeline de CI.' },
        { t: 'Marca por dominio', what: 'Cada cliente ve la aplicación y sus documentos con su propia marca según el dominio desde el que entra.' },
      ],
      en: [
        { t: 'Invoicing in nine languages', what: 'Every invoice string comes from translations rather than hard-coded text, so each customer receives it in their own language.' },
        { t: 'PDFs built from HTML and CSS templates', what: 'I migrated invoice PDF generation to HTML and CSS templates, with their own step in the CI pipeline.' },
        { t: 'Per-domain branding', what: 'Each customer sees the app and its documents with their own brand, depending on the domain they use.' },
      ],
    },
    outcome: {
      es: ['Facturas en el idioma y con la marca de cada cliente, en producción.', 'Endpoints con permisos por rol cubiertos por tests en RSpec.'],
      en: ['Invoices in each customer’s language and brand, in production.', 'Role-based endpoints covered by RSpec tests.'],
    },
    learned: {
      es: [
        'Cómo funciona un entorno real de desarrollo y producción: Git flow, ramas, sprints y merge requests revisadas.',
        'A leer un problema en producción, encontrar la causa y resolverlo.',
        'A aprender por mi cuenta dentro de un equipo: a veces cada uno tiene que encontrar su forma exacta de hacer las cosas.',
      ],
      en: [
        'How a real development and production environment works: Git flow, branches, sprints and reviewed merge requests.',
        'How to read a problem in production, find its cause and fix it.',
        'How to keep learning on my own inside a team: sometimes you have to find your own exact way of doing things.',
      ],
    },
  },
  {
    id: 'zellige',
    slug: { es: 'zellige-hotels', en: 'zellige-hotels' },
    kicker: { es: 'caso 02 · Zellige Hotels', en: 'case 02 · Zellige Hotels' },
    title: { es: 'Cada rol ve y hace solo lo suyo.', en: 'Every role sees and does only its own part.' },
    summary: {
      es: 'Plataforma completa para una cadena hotelera de aprendizaje: web pública con reservas, área de cliente y un ERP para el personal con tres roles.',
      en: 'A complete platform for a learning-project hotel chain: public site with bookings, a client area and a staff ERP with three roles.',
    },
    problem: {
      es: 'Administración, gerencia, recepción y clientes usan la misma plataforma, pero cada uno solo debe ver y tocar lo suyo.',
      en: 'Admins, managers, receptionists and guests share one platform, but each of them must only see and touch their own part.',
    },
    decision: {
      es: 'Roles en Spring Security y rutas protegidas por rol en React, con JWT y refresh tokens que rotan en cada uso.',
      en: 'Roles in Spring Security and role-guarded routes in React, with JWT and refresh tokens that rotate on every use.',
    },
    result: {
      es: '28 tests en el backend, algunos contra un PostgreSQL real, CI en cada push y demo pública.',
      en: '28 backend tests, some against a real PostgreSQL, CI on every push and a public demo.',
    },
    tags: ['Java 21', 'Spring Boot', 'PostgreSQL', 'React', 'TypeScript', 'Testcontainers'],
    visual: {
      type: 'shot',
      src: '/img/proyectos/zellige-landing.webp',
      alt: { es: 'Portada de Zellige Hotels', en: 'Zellige Hotels home page' },
      extra: [
        { src: '/img/proyectos/zellige-admin.webp', alt: { es: 'Panel de administración con indicadores', en: 'Admin dashboard with KPIs' } },
        { src: '/img/proyectos/zellige-detalle.webp', alt: { es: 'Ficha de un hotel', en: 'Hotel detail page' } },
      ],
    },
    meta: {
      role: { es: 'Proyecto de clase reescrito por mi cuenta', en: 'Class project, rewritten on my own' },
      year: '2025',
      code: 'https://github.com/AyChEs/Zellige-Hotels',
      demo: 'https://zellige-hotels.vercel.app',
    },
    context: {
      es: [
        'Empezó como un proyecto de clase del ciclo DAW. Después lo reescribí entero por mi cuenta para aprender lo que quería de verdad: Spring Boot en el backend, React en el frontend, autenticación real, restricciones en la base de datos y tests contra un PostgreSQL de verdad.',
        'Es lo que más me enseñó sobre roles y permisos: qué roles hay y qué puede hacer cada uno.',
      ],
      en: [
        'It started as a class project in my web development diploma. I then rewrote it from scratch on my own to learn what I really wanted: Spring Boot on the backend, React on the frontend, real authentication, database constraints and tests against a real PostgreSQL.',
        'It is the project that taught me most about roles and permissions: which roles exist and what each of them can do.',
      ],
    },
    decisions: {
      es: [
        { t: 'Cuatro perfiles, tres de personal', what: 'Administración, gerencia y recepción en el ERP, y cliente en su área. Las reglas viven en el backend y el frontend solo enseña lo que cada rol puede usar.', why: 'Si la regla solo estuviera en la interfaz, bastaría con llamar a la API para saltársela.' },
        { t: 'Refresh tokens que rotan', what: 'El token de acceso vive en memoria y el de refresco cambia en cada uso. Si uno se usa dos veces, se revoca toda la familia.', why: 'Mi primera versión emitía un token largo y ya está. Al leer OWASP con calma vi que la rotación con detección de reutilización era barata y mucho más segura.' },
        { t: 'Que la base de datos impida las reservas solapadas', what: 'El servicio rechaza reservas que se pisan y, además, PostgreSQL tiene una restricción EXCLUDE USING gist como red de seguridad.', why: 'Mis dos primeras comprobaciones a mano fallaban: una con el día de salida y otra con las zonas horarias. La tercera la hace la base de datos y el test es una línea.' },
      ],
      en: [
        { t: 'Four profiles, three of them staff', what: 'Admin, manager and receptionist in the ERP, and guest in their own area. The rules live in the backend; the frontend only shows what each role can use.', why: 'If the rule only lived in the interface, calling the API directly would bypass it.' },
        { t: 'Rotating refresh tokens', what: 'The access token lives in memory and the refresh token changes on every use. If one is used twice, the whole token family is revoked.', why: 'My first version issued a long-lived token and called it done. Reading OWASP properly showed me that rotation with reuse detection was cheap and far safer.' },
        { t: 'Let the database block overlapping bookings', what: 'The service rejects overlapping bookings and PostgreSQL also has an EXCLUDE USING gist constraint as a safety net.', why: 'My first two hand-written checks were wrong: one on the checkout day, one on time zones. The third time I let the database do it, and the test is one line.' },
      ],
    },
    outcome: {
      es: ['28 tests en el backend, incluidos tests con Testcontainers contra PostgreSQL.', 'CI en cada push y despliegue gratuito con demo pública.'],
      en: ['28 backend tests, including Testcontainers tests against PostgreSQL.', 'CI on every push and a free deployment with a public demo.'],
    },
    learned: {
      es: ['La rotación de refresh tokens no es opcional.', 'Una restricción en la base de datos vale más que tres comprobaciones a mano.', 'TanStack Query cambió mi forma de pensar el estado del frontend.'],
      en: ['Refresh-token rotation is not optional.', 'A database constraint is worth more than three hand-written checks.', 'TanStack Query changed how I think about frontend state.'],
    },
    different: {
      es: ['Empezaría con componentes más grandes y los dividiría solo cuando algo se repita de verdad.'],
      en: ['I would start with bigger components and split them only when something genuinely repeats.'],
    },
  },
  {
    id: 'cineflow',
    slug: { es: 'cineflow', en: 'cineflow' },
    kicker: { es: 'caso 03 · CineFlow', en: 'case 03 · CineFlow' },
    title: { es: 'Una butaca, una sola compra.', en: 'One seat, one purchase.' },
    summary: {
      es: 'Un sistema de reservas de cine donde dos personas que eligen la misma butaca a la vez no pueden acabar pagándola las dos.',
      en: 'A cinema booking system where two people who pick the same seat at the same time cannot both end up paying for it.',
    },
    problem: {
      es: 'Entre que alguien elige una butaca y termina de pagar pasan minutos. Si otra persona la elige en ese tiempo, las dos podrían comprarla.',
      en: 'Minutes go by between choosing a seat and finishing the payment. If someone else picks it in that window, both could buy it.',
    },
    decision: {
      es: 'Bloqueo temporal de la butaca al elegirla y confirmación dentro de una transacción con bloqueo pesimista.',
      en: 'A temporary seat hold when it is picked, and confirmation inside a transaction with pessimistic locking.',
    },
    result: {
      es: '38 tests, incluidos los de condiciones de carrera: no se puede vender la misma butaca dos veces.',
      en: '38 tests, including race-condition tests: the same seat cannot be sold twice.',
    },
    tags: ['PHP 8.4', 'Laravel 12', 'MySQL', 'Stripe', 'JavaScript', 'PHPUnit'],
    visual: { type: 'shot', src: '/img/proyectos/cineflow.webp', alt: { es: 'Cartelera de CineFlow', en: 'CineFlow listings page' } },
    meta: {
      role: { es: 'Proyecto final de ciclo en equipo, ampliado por mi cuenta', en: 'Team final project, extended on my own' },
      year: '2025',
      code: 'https://github.com/AyChEs/cineflow-booking-engine',
      demo: 'https://cineflow-ufe0.onrender.com/',
    },
    context: {
      es: [
        'Fue el proyecto final del ciclo, hecho en equipo con Ismael Achamrouk y Danna Guevara. Después lo retomé por mi cuenta para modernizarlo: despliegue, CI y pago con Stripe.',
        'Quería un proyecto donde la concurrencia fuera de verdad, no un listado de películas.',
      ],
      en: [
        'It was the final project of my diploma, built as a team with Ismael Achamrouk and Danna Guevara. I later picked it up on my own to modernise it: deployment, CI and Stripe payments.',
        'I wanted a project where concurrency was a real problem, not just a list of films.',
      ],
    },
    decisions: {
      es: [
        { t: 'Retener la butaca al elegirla', what: 'Al seleccionar una butaca se crea un bloqueo temporal de 8 minutos ligado a esa persona. El resto la ve ocupada al momento gracias a un sondeo por AJAX.' },
        { t: 'Confirmar con bloqueo pesimista', what: 'La compra se confirma dentro de una transacción con SELECT … FOR UPDATE (lockForUpdate) y hasta 3 intentos. Dos compras simultáneas se ordenan y la segunda falla de forma limpia.' },
        { t: 'Precio según el tipo de entrada', what: 'El precio parte del precio base de la sesión y aplica un factor por tipo: adulto, reducida, familiar y mayor de 65.' },
      ],
      en: [
        { t: 'Hold the seat when it is picked', what: 'Picking a seat creates an 8-minute temporary hold tied to that person. Everyone else sees it as taken straight away, thanks to AJAX polling.' },
        { t: 'Confirm with pessimistic locking', what: 'The purchase is confirmed inside a transaction with SELECT … FOR UPDATE (lockForUpdate) and up to 3 attempts. Two simultaneous purchases are serialised and the second one fails cleanly.' },
        { t: 'Price by ticket type', what: 'The price starts from the session base price and applies a factor per type: adult, reduced, family and over-65.' },
      ],
    },
    outcome: {
      es: ['38 tests con PHPUnit, incluidos los de condiciones de carrera y caducidad de los bloqueos.', 'Entradas con código QR firmado. El pago con Stripe funciona en modo de pruebas y aún lo estoy ajustando.'],
      en: ['38 PHPUnit tests, including race-condition and hold-expiry tests.', 'Tickets with signed QR codes. Stripe payment runs in test mode and I am still polishing it.'],
    },
  },
];
