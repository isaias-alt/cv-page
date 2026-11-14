export type Locale = 'en' | 'es';

export interface ContactLink {
  label: string;
  value: string;
  href: string;
}

export interface Role {
  title: string;
  period: string;
  bullets: string[];
}

export interface Job {
  title: string;
  period: string;
  roles?: Role[];
  bullets?: string[];
}

export interface Project {
  name: string;
  subtitle: string;
  domain: string;
  href: string;
  bullets: string[];
  stack: string;
}

export interface EducationEntry {
  institution: string;
  program: string;
}

export interface StackGroup {
  label: string;
  items: string[];
}

export interface CvLabels {
  skipToContent: string;
  download: string;
  downloadAria: string;
  downloadMeta: string;
  downloadCta: string;
  languageSwitcher: string;
  pageOne: string;
  pageTwo: string;
  experience: string;
  projects: string;
  education: string;
  stack: string;
  languages: string;
  references: string;
  stackPrefix: string;
}

export interface CvContent {
  locale: Locale;
  htmlLang: string;
  meta: {
    title: string;
    description: string;
    ogLocale: string;
    ogLocaleAlternate: string;
  };
  labels: CvLabels;
  download: {
    href: string;
    filename: string;
  };
  /** The source PDFs differ: EN bolds only the "Stack:" label, ES bolds the whole line. */
  projectStackBold: boolean;
  profile: {
    name: string;
    summary: string;
    contact: ContactLink[];
  };
  experience: Job[];
  projects: Project[];
  education: EducationEntry[];
  stack: StackGroup[];
  languages: { name: string; level: string }[];
  references: string;
}

const en: CvContent = {
  locale: 'en',
  htmlLang: 'en',
  meta: {
    title: 'Lucas Casco — CV · Fullstack Software Engineer',
    description:
      'CV of Lucas Isaias Casco, fullstack software engineer from Paraguay with a backend focus: banking and fintech systems, Node.js and Nest.js APIs, and AI agent orchestration. Available in English and Spanish.',
    ogLocale: 'en_US',
    ogLocaleAlternate: 'es_PY',
  },
  labels: {
    skipToContent: 'Skip to content',
    download: 'Download PDF',
    downloadAria: 'Download the CV in English as a PDF',
    downloadMeta: 'A4 · 2 pages',
    downloadCta: 'Download PDF',
    languageSwitcher: 'Language',
    pageOne: 'Page 1 of 2',
    pageTwo: 'Page 2 of 2',
    experience: 'Professional Experience',
    projects: 'Projects',
    education: 'Education',
    stack: 'Tech Stack',
    languages: 'Languages',
    references: 'References',
    stackPrefix: 'Stack',
  },
  download: {
    href: '/cv/lucas-casco-cv-en.pdf',
    filename: 'Lucas-Casco-CV-EN.pdf',
  },
  projectStackBold: false,
  profile: {
    name: 'Lucas Isaias Casco',
    summary:
      'Fullstack Software Engineer from Paraguay with a backend focus and 5 years of experience building systems in banking, fintech, and my own products. I design and build APIs and services with Node.js and Nest.js, integrate with existing systems, and work on authentication and critical flows with idempotency. I use AI coding agents daily, including a CLI I built to orchestrate them.',
    contact: [
      {
        label: 'Email',
        value: 'cascolucasisaias@gmail.com',
        href: 'mailto:cascolucasisaias@gmail.com',
      },
      {
        label: 'Phone',
        value: '+595 975 649211',
        href: 'tel:+595975649211',
      },
      {
        label: 'LinkedIn',
        value: 'linkedin.com/in/lucascodev',
        href: 'https://www.linkedin.com/in/lucascodev',
      },
      {
        label: 'Website',
        value: 'lucasco.dev',
        href: 'https://lucasco.dev',
      },
    ],
  },
  experience: [
    {
      title: 'Software Engineer - SODEP S.A',
      period: 'November 2024 - July 2026',
      roles: [
        {
          title: 'Fintech Inversiones - Aquí Pago (Module “Mi Tienda”)',
          period: 'March 2026 - July 2026',
          bullets: [
            'Implemented a shared session module between Posweb (PHP) and Mi Tienda (Next.js), integrating with the existing middleware to enable unified access without re-login',
            'Built a Next.js module integrated as a microfrontend into an existing PHP application',
            'Developed stock management and payment features',
            'Delivered the MVP on a tight deadline',
          ],
        },
        {
          title: 'Banco Basa - Banking CRM',
          period: 'April 2025 - February 2026',
          bullets: [
            'Integrated with banking APIs through a Fastify proxy server responsible for authentication and request/response encryption',
            'Implemented idempotency keys with Redis to prevent duplicate records in critical onboarding flows',
            'Built modules for client onboarding, account creation, and card issuance within a banking CRM',
            'Contributed to defining the deployment pipeline across development, QA, and production environments and its interaction with frontend and backend services',
            'Conducted code reviews focused on maintainability and team standards',
            'Provided structured technical mentorship to team developers; two participants reached semi-senior level and one reached mid-level in under two years',
          ],
        },
        {
          title: 'Banco Interfisa - Business Banking Platform',
          period: 'November 2024 - April 2025',
          bullets: [
            'Built frontend features for high-complexity business banking flows: loan payments, transaction history, and vendor management',
          ],
        },
      ],
    },
    {
      title: 'Freelance',
      period: 'June 2021 - November 2024',
      bullets: [
        'Integrated payment gateways (Stripe, Bancard, Pagopar) into client applications, including checkout flows and payment confirmation webhooks',
        'Built web solutions for clients under NDAs using React, Next.js, and Node.js across different domains',
      ],
    },
  ],
  projects: [
    {
      name: 'NutriOne',
      subtitle: 'SaaS for nutritionists',
      domain: 'nutrione.com.py',
      href: 'https://nutrione.com.py',
      bullets: [
        'Co-created the product and led full backend and frontend development of the MVP',
        'Nest.js backend with Prisma and Redis for patient management, scheduling, and nutrition planning',
        'Optimized the nutritional plan creation process',
        'Built with an AI-assisted workflow (Claude Code, custom agent orchestration)',
      ],
      stack: 'Nest.js, Next.js, Prisma, Redis',
    },
    {
      name: 'Vexillum CLI',
      subtitle: 'Orchestrator for AI coding agents',
      domain: 'vx.lucasco.dev',
      href: 'https://vx.lucasco.dev',
      bullets: [
        'Go terminal CLI that coordinates multiple coding agents (Claude Code) on parallel tasks',
        "Used to develop NutriOne's current iteration",
      ],
      stack: 'Go, JSON file storage, Claude Code',
    },
    {
      name: 'Creacionix AI',
      subtitle: 'AI content generation app',
      domain: 'creacionixai.lucasco.dev',
      href: 'https://creacionixai.lucasco.dev',
      bullets: [
        'Text generation platform with 25+ templates powered by the Google Gemini API',
        'Designed, built, and deployed solo; open source on GitHub',
      ],
      stack: 'Next.js, Clerk, Neon, Drizzle ORM',
    },
  ],
  education: [
    {
      institution: 'Universidad Católica',
      program: 'Computer Engineering',
    },
    {
      institution: 'Colegio Nacional “Prof.: Luciano Bordón”',
      program: 'Technical Degree in IT',
    },
  ],
  stack: [
    {
      label: 'Languages',
      items: ['JavaScript', 'TypeScript', 'Java', 'Dart', 'Go'],
    },
    {
      label: 'Backend',
      items: ['Nest.js', 'Node.js', 'Express', 'Fastify', 'Spring Boot'],
    },
    {
      label: 'Frontend',
      items: ['React', 'Next.js', 'Flutter'],
    },
    {
      label: 'Data & Infrastructure',
      items: ['PostgreSQL', 'Prisma', 'Redis', 'Docker', 'Docker Compose', 'CI/CD'],
    },
    {
      label: 'Tools',
      items: ['Git', 'GitHub'],
    },
    {
      label: 'AI & Integrations',
      items: [
        'Claude Code',
        'Google Gemini API',
        'AI agent orchestration',
        'Stripe',
        'Bancard',
        'Pagopar',
        'Firebase',
      ],
    },
  ],
  languages: [
    { name: 'Spanish', level: 'Native' },
    { name: 'English', level: 'Intermediate' },
  ],
  references: 'References upon request',
};

const es: CvContent = {
  locale: 'es',
  htmlLang: 'es',
  meta: {
    title: 'Lucas Casco — CV · Ingeniero de Software Fullstack',
    description:
      'CV de Lucas Isaias Casco, ingeniero de software fullstack de Paraguay con foco en backend: sistemas de banca y fintech, APIs con Node.js y Nest.js, y orquestación de agentes de IA. Disponible en inglés y español.',
    ogLocale: 'es_PY',
    ogLocaleAlternate: 'en_US',
  },
  labels: {
    skipToContent: 'Saltar al contenido',
    download: 'Descargar PDF',
    downloadAria: 'Descargar el CV en español en PDF',
    downloadMeta: 'A4 · 2 páginas',
    downloadCta: 'Descargar PDF',
    languageSwitcher: 'Idioma',
    pageOne: 'Página 1 de 2',
    pageTwo: 'Página 2 de 2',
    experience: 'Experiencia Profesional',
    projects: 'Proyectos',
    education: 'Educación',
    stack: 'Stack técnico',
    languages: 'Idiomas',
    references: 'Referencias',
    stackPrefix: 'Stack',
  },
  download: {
    href: '/cv/lucas-casco-cv-es.pdf',
    filename: 'Lucas-Casco-CV-ES.pdf',
  },
  projectStackBold: true,
  profile: {
    name: 'Lucas Isaias Casco',
    summary:
      'Ingeniero de Software Fullstack de Paraguay con foco en backend y 5 años de experiencia construyendo sistemas en banca, fintech y productos propios. Diseño e implemento APIs y servicios con Node.js y Nest.js, integro sistemas existentes y trabajo en autenticación y flujos críticos con idempotencia. Uso agentes de código con IA a diario, incluido un CLI que construí para orquestarlos.',
    contact: [
      {
        label: 'Email',
        value: 'cascolucasisaias@gmail.com',
        href: 'mailto:cascolucasisaias@gmail.com',
      },
      {
        label: 'Teléfono',
        value: '+595 975 649211',
        href: 'tel:+595975649211',
      },
      {
        label: 'LinkedIn',
        value: 'linkedin.com/in/lucascodev',
        href: 'https://www.linkedin.com/in/lucascodev',
      },
      {
        label: 'Sitio',
        value: 'lucasco.dev',
        href: 'https://lucasco.dev',
      },
    ],
  },
  experience: [
    {
      title: 'Ingeniero de Software - SODEP S.A',
      period: 'Noviembre 2024 - Julio 2026',
      roles: [
        {
          title: 'Fintech Inversiones - Aquí Pago (Módulo “Mi Tienda”)',
          period: 'Marzo 2026 - Julio 2026',
          bullets: [
            'Implementación de un módulo de sesión compartida entre Posweb (PHP) y Mi Tienda (Next.js), integrándome al middleware existente para habilitar acceso unificado sin re-login',
            'Desarrollo de un módulo en Next.js incorporado como microfrontend a una aplicación existente en PHP',
            'Desarrollo de funcionalidades de gestión de stock y cobros',
            'Entrega del MVP en plazos ajustados',
          ],
        },
        {
          title: 'Banco Basa - CRM Bancario',
          period: 'Abril 2025 - Febrero 2026',
          bullets: [
            'Integración con APIs bancarias mediante un proxy server en Fastify, responsable de autenticación y cifrado de requests y responses',
            'Implementación de idempotency keys con Redis para prevenir duplicaciones en procesos críticos de alta',
            'Desarrollo de módulos de gestión de clientes, alta de cuentas y emisión de tarjetas dentro del CRM bancario',
            'Participación en la definición del flujo entre entornos (desarrollo, QA y producción) y su interacción con frontend y servicios backend',
            'Code reviews con foco en mantenibilidad y estándares del equipo',
            'Mentoría técnica estructurada a desarrolladores del equipo; dos participantes alcanzaron nivel semi-senior y uno el nivel intermedio en menos de dos años',
          ],
        },
        {
          title: 'Banco Interfisa - Banca Empresa Web',
          period: 'Noviembre 2024 - Abril 2025',
          bullets: [
            'Desarrollo frontend de flujos de alta complejidad en banca empresarial: pagos de préstamos, historial de comprobantes y gestión de proveedores',
          ],
        },
      ],
    },
    {
      title: 'Freelance',
      period: 'Junio 2021 - Noviembre 2024',
      bullets: [
        'Integración de pasarelas de pago (Stripe, Bancard, Pagopar) en aplicaciones de clientes, incluyendo flujos de checkout y webhooks de confirmación de pago',
        'Desarrollo de soluciones web para clientes bajo acuerdos de confidencialidad, con React, Next.js y Node.js en proyectos de distintos dominios',
      ],
    },
  ],
  projects: [
    {
      name: 'NutriOne',
      subtitle: 'SaaS para nutricionistas',
      domain: 'nutrione.com.py',
      href: 'https://nutrione.com.py',
      bullets: [
        'Co-creador del producto y responsable del backend y frontend del MVP',
        'Backend Nest.js con Prisma y Redis para pacientes, agenda y planes nutricionales',
        'Optimización del proceso de creación de planes nutricionales',
        'Flujo de trabajo asistido por IA (Claude Code, orquestación propia)',
      ],
      stack: 'Nest.js, Next.js, Prisma, Redis',
    },
    {
      name: 'Vexillum CLI',
      subtitle: 'Orquestador de agentes de código con IA',
      domain: 'vx.lucasco.dev',
      href: 'https://vx.lucasco.dev',
      bullets: [
        'CLI en Go que coordina agentes de código (Claude Code) en tareas paralelas',
        'Usado para desarrollar la iteración actual de NutriOne',
      ],
      stack: 'Go, almacenamiento en archivos JSON, Claude Code',
    },
    {
      name: 'Creacionix AI',
      subtitle: 'App de generación de contenido con IA',
      domain: 'creacionixai.lucasco.dev',
      href: 'https://creacionixai.lucasco.dev',
      bullets: [
        'Generación de texto con 25+ plantillas, impulsada por la API de Google Gemini',
        'Diseñada, construida y desplegada en solitario; código abierto en GitHub',
      ],
      stack: 'Next.js, Clerk, Neon, Drizzle ORM',
    },
  ],
  education: [
    {
      institution: 'Universidad Católica',
      program: 'Ingeniería Informática',
    },
    {
      institution: 'Colegio Nacional “Prof.: Luciano Bordón”',
      program: 'Tecnicatura en informática',
    },
  ],
  stack: [
    {
      label: 'Lenguajes',
      items: ['JavaScript', 'TypeScript', 'Java', 'Dart', 'Go'],
    },
    {
      label: 'Backend',
      items: ['Nest.js', 'Node.js', 'Express', 'Fastify', 'Spring Boot'],
    },
    {
      label: 'Frontend',
      items: ['React', 'Next.js', 'Flutter'],
    },
    {
      label: 'Datos e Infraestructura',
      items: ['PostgreSQL', 'Prisma', 'Redis', 'Docker', 'Docker Compose', 'CI/CD'],
    },
    {
      label: 'Herramientas',
      items: ['Git', 'GitHub'],
    },
    {
      label: 'IA e Integraciones',
      items: [
        'Claude Code',
        'API de Google Gemini',
        'orquestación de agentes de IA',
        'Stripe',
        'Bancard',
        'Pagopar',
        'Firebase',
      ],
    },
  ],
  languages: [
    { name: 'Español', level: 'Nativo' },
    { name: 'Inglés', level: 'Intermedio' },
  ],
  references: 'Referencias a pedido',
};

export const cv: Record<Locale, CvContent> = { en, es };

export const localePath: Record<Locale, string> = {
  en: '/',
  es: '/es/',
};
