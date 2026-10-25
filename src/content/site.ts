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
    proof1: 'Código en producción desde 2025', proof2: '4 casos, 2 con código y demo públicos', proof3: 'Trabajo en ES · CA · AR · EN',
    casesKicker: '01 · proyectos', casesTitle: 'Casos',
    casesIntro: 'Cuatro proyectos con el problema, lo que decidí y por qué. Cada uno tiene su página con el detalle.',
    problem: 'problema', decision: 'decisión', result: 'resultado',
    readCase: 'Leer el caso', code: 'Código', demo: 'Demo',
    stackKicker: '02 · stack', stackTitle: 'Stack',
    stackIntro: 'Las teclas que pulso cada día: lenguajes, frameworks, datos y herramientas, todo en el mismo teclado.',
    stackHintMouse: 'mueve el ratón sobre el teclado y pasa por las teclas', stackHintTouch: 'toca una tecla para ver su nombre',
    stackCredit: 'Logotipos de Devicon (MIT) y Simple Icons (CC0); las marcas pertenecen a sus dueños.',
    howKicker: '03 · cómo trabajo', howTitle: 'Cómo trabajo', howIntro: 'Lo que hago en cada tarea, sea en un equipo o en un proyecto por mi cuenta.',
    aboutKicker: '04 · sobre mí', aboutTitle: 'Sobre mí', cvOther: 'CV en inglés',
    whereK: '// dónde estoy', whereT: 'Tarragona, España', whereS: 'Remoto en España e internacional, o híbrido en Tarragona y Barcelona.',
    pathK: '// trayectoria', logrosK: '// certificados y voluntariado', langsK: '// idiomas',
    freeKicker: '05 · encargos', freeTitle: '¿Tienes un proyecto',
    freeIntro: 'Ahora mismo busco un puesto como desarrollador. Aun así, si tienes un proyecto concreto que encaje con lo que hago, cuéntamelo y te digo con sinceridad si puedo ayudarte.',
    yes: '// encaja', no: '// no encaja',
    fKind: '¿Qué tipo de proyecto?', fWhat: 'Qué necesitas', fWhatPh: 'Cuéntamelo en pocas líneas: qué quieres conseguir y qué tienes ya.',
    fWhen: '¿Para cuándo?', fName: 'Tu nombre', fEmail: 'Tu correo', fEmailPh: 'para poder responderte',
    fSend: 'Enviar', fSending: 'Enviando…', fOk: 'Recibido. Te respondo en unos días.', fErr: 'No se ha podido enviar. Escríbeme a',
    fNote: 'Protegido con Cloudflare Turnstile. Solo uso tus datos para responderte.',
    fOff: 'Al enviar se abrirá tu correo con el mensaje preparado.', fMail: 'Se abre tu correo con el mensaje preparado. Si no se abre, escríbeme a',
    contactKicker: '06 · contacto', copy: 'Copiar', copied: 'Copiado',
    legal: 'Aviso legal y privacidad', home: 'Inicio', allCases: 'Todos los casos', prevCase: 'caso anterior', nextCase: 'siguiente caso',
    context: 'Contexto', decisions: 'Lo que decidí, y por qué', learned: 'Qué aprendí', different: 'Qué haría distinto',
    role: 'rol', year: 'año', stack: 'stack', links: 'enlaces', why: 'por qué', what: 'qué',
    detail: 'detalle técnico', check: 'comprobación', review: 'revisión', shots: 'Capturas',
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
    proof1: 'Code in production since 2025', proof2: '4 case studies, 2 with public code and demo', proof3: 'I work in ES · CA · AR · EN',
    casesKicker: '01 · projects', casesTitle: 'Case studies',
    casesIntro: 'Four projects: the problem, what I decided and why. Each one has its own page with the details.',
    problem: 'problem', decision: 'decision', result: 'result',
    readCase: 'Read the case', code: 'Code', demo: 'Demo',
    stackKicker: '02 · stack', stackTitle: 'Stack',
    stackIntro: 'The keys I press every day: languages, frameworks, data and tools, all on the same keyboard.',
    stackHintMouse: 'move your mouse over the keyboard and hover the keys', stackHintTouch: 'tap a key to see its name',
    stackCredit: 'Logos from Devicon (MIT) and Simple Icons (CC0); trademarks belong to their owners.',
    howKicker: '03 · how I work', howTitle: 'How I work', howIntro: 'What I do on every task, whether in a team or on a project of my own.',
    aboutKicker: '04 · about', aboutTitle: 'About me', cvOther: 'CV in Spanish',
    whereK: '// where I am', whereT: 'Tarragona, Spain', whereS: 'Remote in Spain and abroad, or hybrid in Tarragona and Barcelona.',
    pathK: '// path', logrosK: '// certificates and volunteering', langsK: '// languages',
    freeKicker: '05 · freelance work', freeTitle: 'Got a project',
    freeIntro: "Right now I'm looking for a developer role. Even so, if you have a specific project that fits what I do, tell me about it and I'll be honest about whether I can help.",
    yes: '// a good fit', no: '// not a fit',
    fKind: 'What kind of project?', fWhat: 'What you need', fWhatPh: 'A few lines: what you want to achieve and what you already have.',
    fWhen: 'When for?', fName: 'Your name', fEmail: 'Your email', fEmailPh: 'so I can reply',
    fSend: 'Send', fSending: 'Sending…', fOk: "Got it. I'll reply within a few days.", fErr: 'It could not be sent. Write to me at',
    fNote: 'Protected by Cloudflare Turnstile. I only use your details to reply.',
    fOff: 'When you send it, your email app opens with the message ready.', fMail: 'Your email app is opening with the message ready. If it does not, write to me at',
    contactKicker: '06 · contact', copy: 'Copy', copied: 'Copied',
    legal: 'Legal notice & privacy', home: 'Home', allCases: 'All case studies', prevCase: 'previous case', nextCase: 'next case',
    context: 'Context', decisions: 'What I decided, and why', learned: 'What I learned', different: "What I'd do differently",
    role: 'role', year: 'year', stack: 'stack', links: 'links', why: 'why', what: 'what',
    detail: 'technical detail', check: 'how I checked', review: 'review', shots: 'Screenshots',
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

// `rive` es el nombre de la pieza de Rive de cada paso (rive/<nombre>/ y public/rive/<nombre>.riv).
export const HOW: Pair<{ t: string; s: string; rive: string }[]> = {
  es: [
    { t: 'Pruebas antes del merge', s: 'Lo que toca permisos o dinero lleva sus tests. Si no está probado, no está terminado.', rive: 'como-pruebas' },
    { t: 'Cambios pequeños', s: 'Merge requests que se revisan en minutos y se pueden deshacer sin miedo.', rive: 'como-ramas' },
    { t: 'Mirar dónde corre', s: 'Cuando algo falla, miro también el entorno, no solo el código. Viene de mi formación en sistemas y redes.', rive: 'como-entorno' },
  ],
  en: [
    { t: 'Tests before the merge', s: 'Anything that touches permissions or money ships with its tests. If it is not tested, it is not done.', rive: 'como-pruebas' },
    { t: 'Small changes', s: 'Merge requests that can be reviewed in minutes and rolled back without fear.', rive: 'como-ramas' },
    { t: 'Look at where it runs', s: 'When something breaks, I look at the environment too, not just the code. That comes from my training in systems and networks.', rive: 'como-entorno' },
  ],
};

export const BIO: Pair<string[]> = {
  es: [
    'Soy <strong>Ayman Charoui</strong>, de Tarragona. Empecé a programar porque es la mejor forma que conozco de convertir una idea en algo real que funciona.',
    'Me formé en sistemas y redes, y desde 2025 escribo código que está en producción. Me gusta el código simple y que trabajar conmigo sea cómodo.',
  ],
  en: [
    "I'm <strong>Ayman Charoui</strong>, from Tarragona. I started programming because it is the best way I know to turn an idea into something real that works.",
    'I trained in systems and networks, and since 2025 I have been writing code that runs in production. I like simple code, and I like being easy to work with.',
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

// Logros: certificados verificables y voluntariado. Solo datos reales; cada uno con su enlace si existe.
export const LOGROS: Pair<{ when: string; t: string; s: string; href?: string; link?: string }[]> = {
  es: [
    { when: 'hoy', t: 'Voluntario en Islamic Relief', s: 'ONG de ayuda humanitaria' },
    { when: '2025', t: 'Full Stack Web Development', s: 'Amazon, en Coursera', href: 'https://coursera.org/verify/1SUXINCID97O', link: 'Verificar' },
  ],
  en: [
    { when: 'now', t: 'Volunteer at Islamic Relief', s: 'Humanitarian aid charity' },
    { when: '2025', t: 'Full Stack Web Development', s: 'Amazon, on Coursera', href: 'https://coursera.org/verify/1SUXINCID97O', link: 'Verify' },
  ],
};

export const LANGS: Pair<[string, string][]> = {
  es: [['ES', 'nativo'], ['CA', 'nativo'], ['AR', 'profesional'], ['EN', 'B2']],
  en: [['ES', 'native'], ['CA', 'native'], ['AR', 'professional'], ['EN', 'B2']],
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
    { id: 'dbx', label: 'DBX Studio' },
    { id: 'claude', label: 'Claude' },
  ],
  [
    { id: 'b2', kind: 'blank', w: 1.25 },
    { id: 'space', kind: 'space', w: 5.5 },
    { id: 'b3', kind: 'blank', w: 1.25 },
  ],
];

// Casos. `slug` cambia por idioma para que cada URL esté en su idioma.
// Captura dentro de una decisión. `phone` las agrupa en una fila de pantallas de móvil.
export type Shot = { src: string; alt: Pair<string>; w: number; h: number; phone?: boolean };
// `what` es lo que hice; el resto de campos son opcionales (los casos antiguos solo usan `what` y `why`).
export type Decision = { t: string; problem?: string; what?: string; why?: string; detail?: string; check?: string; review?: string; items?: string[]; shots?: Shot[] };

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
  decisions: Pair<Decision[]>;
  outcome: Pair<string[]>;
  learned?: Pair<string[]>;
  different?: Pair<string[]>;
};

// Capturas del caso LaComu: sirven igual en español y en inglés (el texto alternativo lleva los dos idiomas).
const SHOTS_PUBLIC: Shot[] = [
  { src: '/img/proyectos/lacomu-sobre.webp', w: 1440, h: 900, alt: { es: 'Página Sobre de LaComu con su propia cabecera flotante y el hero verde con la ilustración del barrio', en: 'LaComu About page with its own floating header and the green hero with the neighbourhood illustration' } },
];
const SHOTS_SCENE: Shot[] = [
  { src: '/img/proyectos/lacomu-escena-1.webp', w: 1140, h: 600, alt: { es: 'Escena del barrio, estado 1: la manzana de edificios con vecinos alrededor', en: 'Neighbourhood scene, state 1: the city block with neighbours around it' } },
  { src: '/img/proyectos/lacomu-escena-2.webp', w: 1140, h: 600, alt: { es: 'Escena del barrio, estado 2: hilos que unen a vecinos, entidades y administración', en: 'Neighbourhood scene, state 2: threads joining neighbours, organisations and the administration' } },
  { src: '/img/proyectos/lacomu-escena-3.webp', w: 1140, h: 600, alt: { es: 'Escena del barrio, estado 3: el logo de tres nodos', en: 'Neighbourhood scene, state 3: the three-node logo' } },
  { src: '/img/proyectos/lacomu-hero-movil.webp', w: 585, h: 1266, phone: true, alt: { es: 'Portada de LaComu en el móvil: cabecera compacta, hero verde con el titular y los botones', en: 'LaComu home page on mobile: compact header, green hero with the headline and the buttons' } },
  { src: '/img/proyectos/lacomu-escena-movil.webp', w: 585, h: 555, phone: true, alt: { es: 'La escena del barrio en el móvil, con los tres grupos unidos por el trazo del logo', en: 'The neighbourhood scene on mobile, with the three groups joined by the logo stroke' } },
];
const SHOTS_A11Y: Shot[] = [
  { src: '/img/proyectos/lacomu-entidad.webp', w: 1184, h: 505, alt: { es: 'Ficha de una entidad con su cabecera, su estado de verificación y la información de contacto (teléfono y correo difuminados)', en: 'Organisation detail page with its header, verification status and contact information (phone and email blurred)' } },
];
const SHOTS_MOBILE: Shot[] = [
  { src: '/img/proyectos/lacomu-actividades-movil.webp', w: 585, h: 1129, phone: true, alt: { es: 'Lista de actividades en el móvil, en filas compactas con unas cinco por pantalla', en: 'Activities list on mobile, in compact rows with about five per screen' } },
  { src: '/img/proyectos/lacomu-mapa-movil.webp', w: 585, h: 1174, phone: true, alt: { es: 'Mapa en el móvil con una sola barra arriba, la leyenda de capas y el botón de filtros', en: 'Map on mobile with a single bar on top, the layers legend and the filters button' } },
];

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
      es: '31 pruebas en el backend, algunas contra un PostgreSQL real, axe en la CI y demo pública.',
      en: '31 backend tests, some against a real PostgreSQL, axe in CI and a public demo.',
    },
    tags: ['Java 21', 'Spring Boot', 'PostgreSQL', 'React', 'TypeScript', 'Testcontainers', 'axe'],
    visual: {
      type: 'shot',
      src: '/img/proyectos/zellige-portada.webp',
      alt: { es: 'Portada de Zellige Hotels con el titular y la foto en arco de un patio', en: 'Zellige Hotels home page with the headline and an arched photo of a courtyard' },
      extra: [
        { src: '/img/proyectos/zellige-panel.webp', alt: { es: 'Panel de administración con indicadores, ingresos por mes y ocupación', en: 'Admin dashboard with KPIs, monthly revenue and occupancy' } },
        { src: '/img/proyectos/zellige-hoteles.webp', alt: { es: 'Los tres hoteles en tarjetas que entran con el scroll', en: 'The three hotels as cards that enter on scroll' } },
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
        'Después le di un diseño propio con movimiento ligado al scroll, ordené el frontend y lo hice accesible. El objetivo es WCAG 2.2 AA y lo comprueba axe en la CI.',
      ],
      en: [
        'It started as a class project in my web development diploma. I then rewrote it from scratch on my own to learn what I really wanted: Spring Boot on the backend, React on the frontend, real authentication, database constraints and tests against a real PostgreSQL.',
        'It is the project that taught me most about roles and permissions: which roles exist and what each of them can do.',
        'I later gave it its own design with scroll-linked motion, tidied the frontend and made it accessible. The target is WCAG 2.2 AA and axe checks it in CI.',
      ],
    },
    decisions: {
      es: [
        { t: 'Cuatro perfiles, tres de personal', what: 'Administración, gerencia y recepción en el ERP, y cliente en su área. Las reglas viven en el backend y el frontend solo enseña lo que cada rol puede usar.', why: 'Si la regla solo estuviera en la interfaz, bastaría con llamar a la API para saltársela.' },
        { t: 'Refresh tokens que rotan', what: 'El token de acceso vive en memoria y el de refresco cambia en cada uso. Si uno se usa dos veces, se revoca toda la familia.', why: 'Mi primera versión emitía un token largo y ya está. Al leer OWASP con calma vi que la rotación con detección de reutilización era barata y mucho más segura.' },
        { t: 'Que la base de datos impida las reservas solapadas', what: 'El servicio rechaza reservas que se pisan y, además, PostgreSQL tiene una restricción EXCLUDE USING gist como red de seguridad.', why: 'Mis dos primeras comprobaciones a mano fallaban: una con el día de salida y otra con las zonas horarias. La tercera la hace la base de datos y el test es una línea.' },
        { t: 'Accesibilidad comprobada en cada PR', what: 'Un trabajo de la CI recorre 18 pantallas a 390 y 1440 px con axe y mide el desplazamiento horizontal. Falla si hay violaciones serias o críticas.', why: 'Una revisión a mano al final se olvida. Con la prueba en cada PR, una regresión se ve el mismo día.' },
        { t: 'Datos de demo que no caducan', what: 'Un proceso opcional renueva las reservas, facturas y tareas de demo para que el panel no muestre 0 € ni 0 reservas. Los clientes de demo no tienen cuenta y sus reservas no envían correos. Está apagado por defecto y se activa con una variable de entorno.', why: 'Un panel vacío no enseña lo que hace el ERP, y las fechas escritas a mano caducan.' },
      ],
      en: [
        { t: 'Four profiles, three of them staff', what: 'Admin, manager and receptionist in the ERP, and guest in their own area. The rules live in the backend; the frontend only shows what each role can use.', why: 'If the rule only lived in the interface, calling the API directly would bypass it.' },
        { t: 'Rotating refresh tokens', what: 'The access token lives in memory and the refresh token changes on every use. If one is used twice, the whole token family is revoked.', why: 'My first version issued a long-lived token and called it done. Reading OWASP properly showed me that rotation with reuse detection was cheap and far safer.' },
        { t: 'Let the database block overlapping bookings', what: 'The service rejects overlapping bookings and PostgreSQL also has an EXCLUDE USING gist constraint as a safety net.', why: 'My first two hand-written checks were wrong: one on the checkout day, one on time zones. The third time I let the database do it, and the test is one line.' },
        { t: 'Accessibility checked on every PR', what: 'A CI job walks 18 screens at 390 and 1440 px with axe and measures horizontal overflow. It fails on serious or critical violations.', why: 'A manual review at the end gets forgotten. With the check on every PR, a regression shows up the same day.' },
        { t: 'Demo data that does not expire', what: 'An optional job refreshes the demo bookings, invoices and tasks so the dashboard does not show 0 € or 0 bookings. Demo guests have no account and their bookings send no emails. It is off by default and is switched on with an environment variable.', why: 'An empty dashboard does not show what the ERP does, and hand-written dates expire.' },
      ],
    },
    outcome: {
      es: ['31 pruebas en el backend, incluidas pruebas con Testcontainers contra PostgreSQL.', 'axe en la CI: 18 pantallas a 390 y 1440 px, sin violaciones serias ni críticas.', 'Despliegue gratuito con demo pública.'],
      en: ['31 backend tests, including Testcontainers tests against PostgreSQL.', 'axe in CI: 18 screens at 390 and 1440 px, with no serious or critical violations.', 'Free deployment with a public demo.'],
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
      es: 'Bloqueo temporal de la butaca al elegirla, confirmación en una transacción con bloqueo pesimista y pago con Stripe que confirma un webhook firmado.',
      en: 'A temporary seat hold when it is picked, confirmation in a transaction with pessimistic locking, and Stripe payments confirmed by a signed webhook.',
    },
    result: {
      es: '76 pruebas con PHPUnit, incluidas las de condiciones de carrera y las del pago: no se puede vender la misma butaca dos veces.',
      en: '76 PHPUnit tests, including race-condition and payment tests: the same seat cannot be sold twice.',
    },
    tags: ['PHP 8.4', 'Laravel 12', 'MySQL', 'Stripe', 'JavaScript', 'PHPUnit'],
    visual: {
      type: 'shot',
      src: '/img/proyectos/cineflow-portada.webp',
      alt: { es: 'Portada de CineFlow con la película en cartelera y el botón para ver sesiones', en: 'CineFlow home page with the featured film and a button to see showtimes' },
      extra: [
        { src: '/img/proyectos/cineflow-butacas.webp', alt: { es: 'Mapa de butacas con estados por forma y texto y la cuenta atrás del bloqueo', en: 'Seat map with states shown by shape and text, and the hold countdown' } },
        { src: '/img/proyectos/cineflow-pago.webp', alt: { es: 'Cómo se compra: pago con Stripe en modo de prueba y entrada con código QR', en: 'How to buy: Stripe payment in test mode and a ticket with a QR code' } },
      ],
    },
    meta: {
      role: { es: 'Proyecto final de ciclo en equipo, ampliado por mi cuenta', en: 'Team final project, extended on my own' },
      year: '2025',
      code: 'https://github.com/AyChEs/cineflow-booking-engine',
      demo: 'https://cineflow-ufe0.onrender.com/',
    },
    context: {
      es: [
        'Fue el proyecto final del ciclo, hecho en equipo con Ismael Achamrouk y Danna Guevara. Después lo retomé por mi cuenta para modernizarlo: despliegue, CI, el pago con Stripe, un mapa de butacas accesible y un diseño nuevo.',
        'La confirmación de la compra, con su bloqueo pesimista, sigue como la dejó el equipo. Quería un proyecto donde la concurrencia fuera de verdad, no un listado de películas.',
      ],
      en: [
        'It was the final project of my diploma, built as a team with Ismael Achamrouk and Danna Guevara. I later picked it up on my own to modernise it: deployment, CI, Stripe payments, an accessible seat map and a new design.',
        'The purchase confirmation, with its pessimistic locking, stays as the team left it. I wanted a project where concurrency was a real problem, not just a list of films.',
      ],
    },
    decisions: {
      es: [
        { t: 'Retener la butaca al elegirla', what: 'Al seleccionar una butaca se crea un bloqueo temporal de 8 minutos ligado a esa persona. El resto la ve ocupada al momento gracias a un sondeo por AJAX.' },
        { t: 'Confirmar con bloqueo pesimista', what: 'La compra se confirma dentro de una transacción con SELECT … FOR UPDATE (lockForUpdate) y hasta 3 intentos. Dos compras simultáneas se ordenan y la segunda falla de forma limpia.' },
        { t: 'Precio según el tipo de entrada', what: 'El precio parte del precio base de la sesión y aplica un factor por tipo: adulto, reducida, familiar y mayor de 65. Se calcula en el servidor, en céntimos enteros: el navegador no envía importes.' },
        { t: 'Bloqueos que valen igual para invitados y para cuentas', what: 'Una butaca bloqueada por un invitado aparecía libre para quien tenía sesión iniciada, y esa persona podía quitársela. Ahora el bloqueo se respeta para las dos.', why: 'Un bloqueo que solo vale para parte de las personas no protege la butaca.' },
        { t: 'Que confirme Stripe, no el navegador', what: 'El pago es Stripe Checkout en modo de pruebas. La reserva no la confirma el navegador al volver: la confirma un webhook firmado. Cada evento se procesa una sola vez, aunque llegue repetido.', why: 'Si la reserva dependiera de la vuelta del navegador, cerrar la pestaña dejaría un cobro sin reserva.' },
        { t: 'Butacas retenidas mientras se paga', what: 'Mientras alguien paga, sus butacas siguen bloqueadas: el bloqueo se amplía hasta que caduca el pago. Si el pago caduca, falla o se cancela, las butacas se liberan al momento.', why: 'Sin ampliar el bloqueo, otra persona podría quedarse la butaca durante el pago. Sin liberarla, un pago abandonado dejaría la butaca ocupada.' },
        { t: 'Reembolso si otra compra gana', what: 'Si otra compra se queda la butaca un instante antes, el pago se reembolsa solo.', why: 'La butaca ya está vendida. Devolver el dinero sin que nadie lo pida evita un cobro sin entrada.' },
        { t: 'Un mapa de butacas que se usa con el teclado', what: 'El mapa es una rejilla que se maneja con flechas, Inicio, Fin y Espacio. Cada butaca dice su estado con forma, icono y texto, no solo con color. Un lector de pantalla anuncia qué butaca eliges y cuántas te faltan, y la cuenta atrás del bloqueo se anuncia a los 5, 2 y 1 minutos y a los 30 segundos.', why: 'Si el mapa solo funcionara con ratón o con color, parte de las personas no podría elegir butaca.' },
      ],
      en: [
        { t: 'Hold the seat when it is picked', what: 'Picking a seat creates an 8-minute temporary hold tied to that person. Everyone else sees it as taken straight away, thanks to AJAX polling.' },
        { t: 'Confirm with pessimistic locking', what: 'The purchase is confirmed inside a transaction with SELECT … FOR UPDATE (lockForUpdate) and up to 3 attempts. Two simultaneous purchases are serialised and the second one fails cleanly.' },
        { t: 'Price by ticket type', what: 'The price starts from the session base price and applies a factor per type: adult, reduced, family and over-65. It is calculated on the server, in whole cents: the browser sends no amounts.' },
        { t: 'Holds that work the same for guests and accounts', what: 'A seat held by a guest showed as free to a signed-in user, who could take it. Now the hold is respected for both.', why: 'A hold that only counts for some people does not protect the seat.' },
        { t: 'Stripe confirms, not the browser', what: 'Payment is Stripe Checkout in test mode. The booking is not confirmed when the browser comes back: a signed webhook confirms it. Each event is processed once, even if it arrives twice.', why: 'If the booking depended on the browser coming back, closing the tab would leave a charge with no booking.' },
        { t: 'Seats held while paying', what: 'While someone pays, their seats stay held: the hold is extended until the payment expires. If the payment expires, fails or is cancelled, the seats are released straight away.', why: 'Without extending the hold, someone else could take the seat during payment. Without releasing it, an abandoned payment would leave the seat taken.' },
        { t: 'Refund if another purchase wins', what: 'If another purchase takes the seat an instant earlier, the payment is refunded automatically.', why: 'The seat is already sold. Returning the money without being asked avoids a charge with no ticket.' },
        { t: 'A seat map you can use with the keyboard', what: 'The map is a grid you drive with the arrow keys, Home, End and Space. Each seat shows its state with shape, icon and text, not colour alone. A screen reader announces which seat you pick and how many you have left, and the hold countdown is announced at 5, 2 and 1 minutes and at 30 seconds.', why: 'If the map only worked with a mouse or with colour, some people could not pick a seat.' },
      ],
    },
    outcome: {
      es: [
        '76 pruebas con PHPUnit (eran 38), ninguna saltada, incluidas las de condiciones de carrera, caducidad de los bloqueos y webhook con firma inválida o evento repetido.',
        'Dos pruebas de navegador en cada PR: una con axe recorre 13 pantallas a 390 y 1440 px y otra maneja el mapa de butacas con el teclado. Lighthouse móvil da 100 en accesibilidad en portada, cartelera y ficha.',
        'Entradas con código QR firmado. Sin claves de Stripe, la demo usa un pago simulado.',
      ],
      en: [
        '76 PHPUnit tests (up from 38), none skipped, including race conditions, hold expiry and a webhook with an invalid signature or a repeated event.',
        'Two browser tests on every PR: one with axe walks 13 screens at 390 and 1440 px and the other drives the seat map with the keyboard. Mobile Lighthouse gives 100 for accessibility on the home page, listings and film page.',
        'Tickets with signed QR codes. Without Stripe keys, the demo uses a simulated payment.',
      ],
    },
    learned: {
      es: [
        'Un pago tiene más estados que «pagado» y «no pagado»: abandonado, caducado, repetido y llegado tarde. Los dos fallos que salieron en la revisión final estaban en esos bordes.',
        'Un webhook puede llegar dos veces. Si no es idempotente, la segunda vez tiene un coste.',
        'Soltar una butaca un solo instante basta para que otra persona se la quede.',
      ],
      en: [
        'A payment has more states than paid and not paid: abandoned, expired, repeated and late. The two bugs the final review found were in those edges.',
        'A webhook can arrive twice. If it is not idempotent, the second time has a cost.',
        'Releasing a seat for a single instant is enough for someone else to take it.',
      ],
    },
  },
  {
    id: 'lacomu',
    slug: { es: 'lacomu', en: 'lacomu' },
    kicker: { es: 'caso 04 · Plataforma comunitaria · LaComu, ganadora del Premio Princesa de Girona', en: 'case 04 · Community platform · LaComu, winner of the Princess of Girona Award' },
    title: { es: 'Una web que se parece a su comunidad.', en: 'A website that looks like its community.' },
    summary: {
      es: 'Mejora del diseño de la parte pública y de la experiencia en el móvil de LaComu, plataforma comunitaria de Barcelona, sin tocar logo, textos, rutas ni backend.',
      en: 'A redesign of the public side and the mobile experience of LaComu, a community platform in Barcelona, without touching the logo, copy, routes or backend.',
    },
    problem: {
      es: 'La presentación y la app vivían en la misma carcasa, la marca apenas se veía y había 39 fallos de accesibilidad. En el móvil, el mapa y las listas costaban de usar.',
      en: 'The public pages and the app shared one shell, the brand barely showed and there were 39 accessibility failures. On mobile, the map and the lists were hard to use.',
    },
    decision: {
      es: 'Separé la presentación de la app, rediseñé portada, Sobre y Contacte alrededor del logo de tres nodos y arreglé la accesibilidad y el uso en el móvil sin tocar rutas, textos ni backend.',
      en: 'I split the public pages from the app, redesigned the home page, About and Contact around the three-node logo, and fixed accessibility and mobile use without touching routes, copy or backend.',
    },
    result: {
      es: '0 fallos de accesibilidad en 7 páginas, 6 idiomas completos y los cambios integrados en su repositorio con pull requests revisables. Hoy está desplegado en su entorno de pruebas.',
      en: '0 accessibility failures across 7 pages, 6 complete languages and the changes merged into their repository through reviewable pull requests. It is now deployed in their test environment.',
    },
    tags: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'GSAP', 'MapLibre', 'Vitest', 'axe', 'Playwright'],
    visual: {
      type: 'shot',
      src: '/img/proyectos/lacomu-portada.webp',
      alt: { es: 'Portada de LaComu con la cabecera flotante y el hero verde con el mapa del barrio', en: 'LaComu home page with the floating header and the green hero with the neighbourhood map' },
    },
    meta: {
      role: { es: 'Diseño y desarrollo front-end de la mejora, de la auditoría a la entrega', en: 'Front-end design and development of the improvement, from audit to delivery' },
      year: '2026',
    },
    context: {
      es: [
        'LaComu es una plataforma de Barcelona, ganadora del Premio Princesa de Girona Social 2026, que conecta a vecinos, entidades y administración en un mapa del barrio. El equipo ya tenía la app funcionando; me pidieron mejorar el diseño de la parte pública y la experiencia en el móvil antes de una reunión con la dirección. Trabajé sobre una copia de su frontend y entregué los cambios por pull requests a su repositorio.',
        'Mi papel: diseño y desarrollo front-end de la mejora, de la auditoría a la entrega. Duración: octubre de 2026.',
        'Límites fijos: el logo de tres nodos, el verde de marca, los textos y las rutas no se tocan. El proyecto es de LaComu: no publico su código y aquí solo cuento mi contribución.',
      ],
      en: [
        'LaComu is a Barcelona platform, winner of the 2026 Princess of Girona Social Award, that connects neighbours, organisations and the administration on a map of the neighbourhood. The team already had the app working; they asked me to improve the design of the public side and the mobile experience ahead of a meeting with management. I worked on a copy of their frontend and delivered the changes to their repository through pull requests.',
        'My role: front-end design and development of the improvement, from audit to delivery. Duration: October 2026.',
        'Fixed limits: the three-node logo, the brand green, the copy and the routes stay untouched. The project belongs to LaComu: I do not publish their code and this page only covers my contribution.',
      ],
    },
    decisions: {
      es: [
        { t: 'Separar la presentación de la app',
          problem: 'Portada, Sobre y Contacte se mostraban dentro de la app, con su lateral y su barra inferior. Parecía un solo producto sin cara propia.',
          what: 'Una capa pública con su propia cabecera y pie. Las rutas siguen siendo las mismas, así que no se rompe ningún enlace.',
          shots: SHOTS_PUBLIC },
        { t: 'La marca como estructura, no como adorno',
          problem: 'Secciones de tarjetas iguales; el logo y el verde no contaban nada.',
          what: 'Cabecera flotante, hero en el verde de marca y una escena del barrio que, al hacer scroll, une a vecinos, entidades y administración con el trazo exacto del logo y se convierte en él. Trece ilustraciones de marca, una por idea, en lugar de iconos genéricos.',
          why: 'El logo ya dice «comunidad conectada»; la escena lo cuenta en vez de repetirlo.',
          detail: 'GSAP con ScrollTrigger: animación fijada en escritorio y ligada al dedo en el móvil, sin fijar, para no pelear con el scroll. Con «reducir movimiento» todo queda estático.',
          review: 'El equipo vio que la escena se perdía contra el fondo en claro y oscuro. La puse sobre una tarjeta propia en verde claro, igual en los dos temas, y de paso encontré y arreglé que los hilos no llegaban a pintarse.',
          shots: SHOTS_SCENE },
        { t: 'Accesibilidad: de 39 fallos a 0',
          problem: '39 fallos en 158 elementos: contraste bajo, botones que solo aparecían con el ratón, zonas táctiles pequeñas, páginas que se salían de la pantalla en el móvil.',
          what: 'Enlace para saltar al contenido, una sola región principal por página, contraste AA en claro y oscuro, zonas táctiles de 44 px y el título de cada tarjeta como enlace real.',
          check: 'axe con Playwright (WCAG 2.2 AA) a 390 y 1440 px, en claro y oscuro, antes y después.',
          shots: SHOTS_A11Y },
        { t: 'La app, cómoda en el móvil',
          problem: 'Cada actividad ocupaba casi una pantalla y el mapa tenía tres paneles encima.',
          what: 'Actividades en filas compactas (unas 5 por pantalla en vez de menos de 2), filtros a 44 px, una sola barra sobre el mapa con un panel de capas y el logo como vuelta a la portada.',
          shots: SHOTS_MOBILE },
        { t: 'Entregarlo bien',
          items: [
            'Cuatro ramas encadenadas (accesibilidad, portada, Sobre y Contacte, app móvil) para que cada revisión fuera pequeña.',
            'Typecheck, build, lint sin errores y 3.692 pruebas en verde en cada rama.',
            'Todos los textos nuevos en los 6 idiomas de la plataforma (catalán, valenciano, castellano, inglés, gallego y euskera).',
            'Vídeo del antes y el después y una presentación para la reunión.',
          ] },
      ],
      en: [
        { t: 'Separate the public pages from the app',
          problem: 'Home, About and Contact were shown inside the app, with its sidebar and bottom bar. It looked like a single product with no face of its own.',
          what: 'A public layer with its own header and footer. The routes stay the same, so no link breaks.',
          shots: SHOTS_PUBLIC },
        { t: 'The brand as structure, not decoration',
          problem: 'Sections of identical cards; the logo and the green said nothing.',
          what: 'A floating header, a hero in the brand green and a neighbourhood scene that, as you scroll, joins neighbours, organisations and the administration with the exact stroke of the logo and turns into it. Thirteen brand illustrations, one per idea, instead of generic icons.',
          why: 'The logo already says «connected community»; the scene tells it instead of repeating it.',
          detail: 'GSAP with ScrollTrigger: the animation is pinned on desktop and tied to the finger on mobile, without pinning, so it does not fight the scroll. With «reduce motion» everything stays static.',
          review: 'The team saw that the scene got lost against the background in light and dark. I put it on its own light-green card, the same in both themes, and along the way I found and fixed that the threads were not being painted.',
          shots: SHOTS_SCENE },
        { t: 'Accessibility: from 39 failures to 0',
          problem: '39 failures across 158 elements: low contrast, buttons that only appeared on mouse hover, small touch targets and pages that overflowed the screen on mobile.',
          what: 'A skip-to-content link, a single main region per page, AA contrast in light and dark, 44 px touch targets and each card title as a real link.',
          check: 'axe with Playwright (WCAG 2.2 AA) at 390 and 1440 px, in light and dark, before and after.',
          shots: SHOTS_A11Y },
        { t: 'The app, comfortable on mobile',
          problem: 'Each activity took almost a whole screen and the map had three panels on top of it.',
          what: 'Activities in compact rows (about 5 per screen instead of fewer than 2), 44 px filters, a single bar over the map with a layers panel, and the logo as the way back to the home page.',
          shots: SHOTS_MOBILE },
        { t: 'Delivering it properly',
          items: [
            'Four chained branches (accessibility, home page, About and Contact, mobile app) so each review stayed small.',
            'Typecheck, build and lint with no errors, and 3,692 tests passing on every branch.',
            'All new copy in the 6 languages of the platform (Catalan, Valencian, Spanish, English, Galician and Basque).',
            'A before-and-after video and a presentation for the meeting.',
          ] },
      ],
    },
    outcome: {
      es: [
        '0 fallos de accesibilidad en 7 páginas (antes 39).',
        '5 actividades por pantalla en el móvil (antes menos de 2).',
        '1 barra sobre el mapa (antes 3 paneles).',
        'Cambios integrados en su repositorio y desplegados en su entorno de pruebas.',
        'Siguiente fase en conversación: el flujo de navegación del mapa y el directorio.',
      ],
      en: [
        '0 accessibility failures across 7 pages (before: 39).',
        '5 activities per screen on mobile (before: fewer than 2).',
        '1 bar over the map (before: 3 panels).',
        'Changes merged into their repository and deployed in their test environment.',
        'Next phase under discussion: the map navigation flow and the directory.',
      ],
    },
    learned: {
      es: [
        'Rediseñar sin poder tocar logo, colores ni textos obliga a trabajar la estructura, el ritmo y el movimiento.',
        'Repartir el trabajo en pull requests pequeñas hizo que el equipo pudiera revisarlo sin miedo.',
      ],
      en: [
        'Redesigning without being able to touch the logo, colours or copy forces you to work on structure, rhythm and motion.',
        'Splitting the work into small pull requests let the team review it without fear.',
      ],
    },
  },
];
