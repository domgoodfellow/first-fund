import type { Language } from '@/lib/i18n'

export const HERO_MESSAGE_VARIANTS = ['speed', 'access', 'growth'] as const
export const HERO_VISUAL_VARIANTS = ['video', 'clean'] as const

export type HeroMessageVariant = (typeof HERO_MESSAGE_VARIANTS)[number]
export type HeroVisualVariant = (typeof HERO_VISUAL_VARIANTS)[number]

export interface HeroMessageContent {
  badge: string
  heading: string
  subheading: string
  bullets: string[]
}

export interface PainPointCard {
  title: string
  description: string
}

export interface ProductPath {
  label: string
  href: string
}

export interface ProductGroup {
  eyebrow: string
  title: string
  summary: string
  highlights: string[]
  href: string
  paths: ProductPath[]
}

export interface ComparisonRow {
  label: string
  firstFund: string
  bank: string
}

export interface FAQItem {
  question: string
  answer: string
}

export interface HomeFunnelContent {
  nav: {
    products: string
    howItWorks: string
    faq: string
    applyNow: string
    bookCall: string
    productsNote: string
    compareAll: string
    language: string
  }
  hero: {
    eyebrow: string
    primaryCta: string
    secondaryCta: string
    rightCardTitle: string
    rightCardSubtitle: string
    summaryTitle: string
    summaryItems: string[]
    variants: Record<HeroMessageVariant, HeroMessageContent>
  }
  painPoints: {
    eyebrow: string
    heading: string
    subtitle: string
    cards: PainPointCard[]
  }
  products: {
    eyebrow: string
    heading: string
    subtitle: string
    cards: ProductGroup[]
  }
  howItWorks: {
    eyebrow: string
    heading: string
    steps: Array<{ title: string; description: string }>
  }
  comparison: {
    eyebrow: string
    heading: string
    subtitle: string
    rows: ComparisonRow[]
  }
  proof: {
    eyebrow: string
    heading: string
    subtitle: string
    cards: Array<{ title: string; description: string }>
  }
  faq: {
    eyebrow: string
    heading: string
    items: FAQItem[]
  }
  cta: {
    heading: string
    subheading: string
    primary: string
    secondary: string
  }
  stickyCta: {
    label: string
    secondary: string
  }
}

const content: Record<Language, HomeFunnelContent> = {
  en: {
    nav: {
      products: 'Products',
      howItWorks: 'How It Works',
      faq: 'FAQ',
      applyNow: 'Apply Now',
      bookCall: 'Book a Call',
      productsNote: 'Explore the funding paths available through First Fund',
      compareAll: 'View all six services',
      language: 'Language:',
    },
    hero: {
      eyebrow: 'Business funding built for speed and clarity',
      primaryCta: 'Apply Now',
      secondaryCta: 'See If You Qualify',
      rightCardTitle: 'Funding snapshot',
      rightCardSubtitle: 'Flexible funding paths for business owners who need a clear next step.',
      summaryTitle: 'Available options',
      summaryItems: [
        'Merchant cash advance with open terms',
        'Up to 150% of monthly revenue',
        'Funding in 24–48 hours',
        'Line of credit up to $3,000,000',
      ],
      variants: {
        speed: {
          badge: 'Fast funding',
          heading: 'Get business funding without waiting on bank timelines.',
          subheading:
            'When timing matters, First Fund helps business owners move toward the right funding path faster.',
          bullets: [
            'Funding in 24–48 hours for approved files',
            'Merchant cash advance with open terms',
            'A clear next step whether you want to apply or qualify first',
          ],
        },
        access: {
          badge: 'Practical options',
          heading: 'Business funding for owners who need answers, not roadblocks.',
          subheading:
            'If the bank process feels too slow or too rigid, First Fund offers practical funding paths built around real business needs.',
          bullets: [
            'Clearer options when traditional lending feels too slow',
            'Funding paths built around real business situations',
            'Less friction when the decision cannot wait',
          ],
        },
        growth: {
          badge: 'Growth capital',
          heading: 'Use capital to buy equipment, expand operations, and keep revenue opportunities moving.',
          subheading:
            'From inventory and machine purchases to larger expansion plans, First Fund helps business owners move when growth cannot wait.',
          bullets: [
            'Equipment and machine purchase support',
            'Expansion-focused funding paths',
            'Products positioned around business outcomes',
          ],
        },
      },
    },
    painPoints: {
      eyebrow: 'Is this you?',
      heading: 'Business owners usually come here because something needs to happen now.',
      subtitle:
        'If cash flow is tight, an opportunity is time-sensitive, or the bank process is dragging, the pressure is real.',
      cards: [
        {
          title: 'Cash flow pressure',
          description:
            'Payroll, vendor payments, or short-term gaps are creating urgency and forcing decisions on a compressed timeline.',
        },
        {
          title: 'Growth timing',
          description:
            'Inventory, expansion, or equipment opportunities are in front of the business now and cannot wait through a slow bank process.',
        },
        {
          title: 'Bank friction',
          description:
            'Traditional lenders can feel too slow, too rigid, or too paperwork-heavy for the situation at hand.',
        },
      ],
    },
    products: {
      eyebrow: 'Main products',
      heading: 'Funding options built around how the money will be used.',
      subtitle:
        'Start with the path that best matches your situation, then review the deeper options underneath.',
      cards: [
        {
          eyebrow: 'Primary path',
          title: 'Merchant Cash Advance',
          summary:
            'For urgent working capital and revenue-linked funding conversations.',
          highlights: [
            'Open terms',
            'Up to 150% of monthly revenue',
            'Useful for time-sensitive business needs',
          ],
          href: '/services/merchant-cash-advance',
          paths: [
            { label: 'Urgent working capital', href: '/services/merchant-cash-advance' },
            { label: 'Inventory timing', href: '/services/merchant-cash-advance' },
            { label: 'Small equipment needs', href: '/services/equipment-financing' },
          ],
        },
        {
          eyebrow: 'Primary path',
          title: 'Line of Credit',
          summary:
            'For recurring access to capital, uneven cash flow, and ongoing operating needs.',
          highlights: [
            'Up to $3,000,000',
            'Recurring access to capital',
            'Best when the need is ongoing, not one-time',
          ],
          href: '/services/line-of-credit',
          paths: [
            { label: 'Cash flow support', href: '/services/line-of-credit' },
            { label: 'Growth capital', href: '/services/line-of-credit' },
            { label: 'Recurring operating needs', href: '/services/fixed-term-loans' },
          ],
        },
        {
          eyebrow: 'Primary path',
          title: 'Expansion Funding',
          summary:
            'For equipment, machine purchases, larger projects, and property-backed capital conversations.',
          highlights: [
            'Equipment and machine purchases',
            'Business mortgage loan paths',
            'Expansion-focused funding support',
          ],
          href: '/services/equipment-financing',
          paths: [
            { label: 'Equipment financing', href: '/services/equipment-financing' },
            { label: 'Mortgage loans', href: '/services/mortgage-loans' },
            { label: 'Invoice factoring', href: '/services/invoice-factoring' },
          ],
        },
      ],
    },
    howItWorks: {
      eyebrow: 'How it works',
      heading: 'A simple path from application to funding.',
      steps: [
        { title: 'Apply', description: 'Submit the intake or start with a qualification conversation.' },
        { title: 'Review', description: 'We review the file, confirm fit, and clarify the next steps.' },
        { title: 'Fund', description: 'If there is a fit and the file is approved, the process moves to funding.' },
      ],
    },
    comparison: {
      eyebrow: 'Why not banks',
      heading: 'A faster, more practical alternative to the traditional bank path.',
      subtitle:
        'When timing and flexibility matter, the process matters as much as the product.',
      rows: [
        {
          label: 'Speed',
          firstFund: 'Built to move quickly when timing matters.',
          bank: 'Often slower, with longer review cycles.',
        },
        {
          label: 'Structure',
          firstFund: 'Multiple practical funding paths based on the situation.',
          bank: 'More rigid product fit and underwriting path.',
        },
        {
          label: 'Paperwork',
          firstFund: 'A clearer path with faster access to next steps.',
          bank: 'Heavier process and more friction earlier.',
        },
        {
          label: 'Use case fit',
          firstFund: 'Useful when urgency, growth timing, or flexibility is the main issue.',
          bank: 'Often stronger for slower, conventional credit cycles.',
        },
      ],
    },
    proof: {
      eyebrow: 'Why businesses move forward',
      heading: 'Clarity, speed, and a secure process matter before any funding decision.',
      subtitle:
        'First Fund is built to make the process easier to understand before you commit to anything.',
      cards: [
        {
          title: 'Clear process',
          description:
            'Know where to start, what happens next, and which funding path fits the situation best.',
        },
        {
          title: 'Bilingual support',
          description: 'Get guidance and application support in English or Spanish.',
        },
        {
          title: 'Secure intake',
          description: 'Apply securely or start with a lower-friction qualification conversation first.',
        },
      ],
    },
    faq: {
      eyebrow: 'FAQ',
      heading: 'Common funding questions, answered clearly.',
      items: [
        {
          question: 'What funding options does First Fund focus on?',
          answer:
            'First Fund focuses on merchant cash advance, line of credit, and expansion-oriented funding paths, while the broader site keeps six service pages available for deeper detail.',
        },
        {
          question: 'How quickly can funding happen?',
          answer:
            'For approved files where that product applies, funding can happen in 24–48 hours. Timing still depends on the file, documentation, review, and signed acceptance.',
        },
        {
          question: 'How is the merchant cash advance amount framed?',
          answer:
            'Merchant cash advance sizing is framed at up to 150% of monthly revenue.',
        },
        {
          question: 'Is there a business line of credit option?',
          answer:
            'Yes. First Fund offers a business line of credit option up to $3,000,000.',
        },
        {
          question: 'What should I do if I am not sure which product fits?',
          answer:
            'If you are not sure which product fits, the best next step is to book a call or use the qualification path before starting a full application.',
        },
      ],
    },
    cta: {
      heading: 'Start with the funding path that fits your business.',
      subheading:
        'Apply now if you know what you need, or take a lower-friction first step and see if you qualify.',
      primary: 'Apply Now',
      secondary: 'See If You Qualify',
    },
    stickyCta: {
      label: 'Apply Now',
      secondary: 'Qualify First',
    },
  },
  es: {
    nav: {
      products: 'Productos',
      howItWorks: 'Como funciona',
      faq: 'Preguntas',
      applyNow: 'Aplica ahora',
      bookCall: 'Agenda una llamada',
      productsNote: 'Explora las rutas de financiamiento disponibles con First Fund',
      compareAll: 'Ver los seis servicios',
      language: 'Idioma:',
    },
    hero: {
      eyebrow: 'Financiamiento empresarial con velocidad y claridad',
      primaryCta: 'Aplica ahora',
      secondaryCta: 'Verifica si calificas',
      rightCardTitle: 'Resumen de financiamiento',
      rightCardSubtitle: 'Rutas de financiamiento practicas para negocios que necesitan un siguiente paso claro.',
      summaryTitle: 'Opciones disponibles',
      summaryItems: [
        'Merchant cash advance con terminos abiertos',
        'Hasta 150% de los ingresos mensuales',
        'Fondeo en 24–48 horas',
        'Linea de credito hasta $3,000,000',
      ],
      variants: {
        speed: {
          badge: 'Fondeo rapido',
          heading: 'Financiamiento rapido para negocios que no pueden esperar los tiempos de un banco.',
          subheading:
            'Cuando el tiempo importa, First Fund ayuda a los duenos de negocio a avanzar hacia la ruta correcta mas rapido.',
          bullets: [
            'Fondeo en 24–48 horas para expedientes aprobados',
            'Merchant cash advance con terminos abiertos',
            'Un siguiente paso claro para aplicar o calificar primero',
          ],
        },
        access: {
          badge: 'Opciones practicas',
          heading: 'Opciones de financiamiento para negocios que necesitan respuestas, no obstaculos.',
          subheading:
            'Si el proceso bancario se siente lento o demasiado rigido, First Fund ofrece rutas practicas de financiamiento basadas en necesidades reales.',
          bullets: [
            'Opciones mas claras cuando la banca tradicional no avanza',
            'Rutas de financiamiento pensadas para situaciones reales',
            'Menos friccion cuando la decision no puede esperar',
          ],
        },
        growth: {
          badge: 'Capital para crecer',
          heading: 'Capital para comprar equipo, expandir operaciones y mover oportunidades de ingresos.',
          subheading:
            'Desde inventario y compra de maquinaria hasta planes de expansion, First Fund ayuda a moverse cuando crecer no puede esperar.',
          bullets: [
            'Soporte para equipo y compra de maquinaria',
            'Rutas de financiamiento para expansion',
            'Productos presentados segun el resultado del negocio',
          ],
        },
      },
    },
    painPoints: {
      eyebrow: 'Te pasa esto?',
      heading: 'Muchos negocios llegan aqui porque algo necesita resolverse ahora.',
      subtitle:
        'Si el flujo de caja esta ajustado, una oportunidad es urgente o el banco va demasiado lento, la presion es real.',
      cards: [
        {
          title: 'Presion de flujo de caja',
          description:
            'Nomina, proveedores o faltantes de corto plazo estan creando urgencia y forzando decisiones con poco tiempo.',
        },
        {
          title: 'Timing de crecimiento',
          description:
            'Inventario, expansion o oportunidades de equipo estan disponibles ahora y no pueden esperar un proceso bancario lento.',
        },
        {
          title: 'Friccion bancaria',
          description:
            'Los prestamistas tradicionales pueden sentirse demasiado lentos, rigidos o cargados de papeleo para la situacion actual.',
        },
      ],
    },
    products: {
      eyebrow: 'Productos principales',
      heading: 'Opciones de financiamiento segun como se va a usar el capital.',
      subtitle:
        'Empieza con la ruta que mejor encaja con tu situacion y luego revisa las opciones mas especificas debajo.',
      cards: [
        {
          eyebrow: 'Ruta principal',
          title: 'Merchant Cash Advance',
          summary:
            'Para conversaciones urgentes de capital de trabajo y financiamiento ligado a ingresos.',
          highlights: [
            'Terminos abiertos',
            'Hasta 150% de los ingresos mensuales',
            'Util para necesidades sensibles al tiempo',
          ],
          href: '/services/merchant-cash-advance',
          paths: [
            { label: 'Capital de trabajo urgente', href: '/services/merchant-cash-advance' },
            { label: 'Timing de inventario', href: '/services/merchant-cash-advance' },
            { label: 'Necesidades pequenas de equipo', href: '/services/equipment-financing' },
          ],
        },
        {
          eyebrow: 'Ruta principal',
          title: 'Linea de credito',
          summary:
            'Para acceso recurrente a capital, flujo de caja irregular y necesidades operativas continuas.',
          highlights: [
            'Hasta $3,000,000',
            'Acceso recurrente a capital',
            'Mejor cuando la necesidad es continua',
          ],
          href: '/services/line-of-credit',
          paths: [
            { label: 'Soporte de flujo de caja', href: '/services/line-of-credit' },
            { label: 'Capital para crecer', href: '/services/line-of-credit' },
            { label: 'Necesidades operativas recurrentes', href: '/services/fixed-term-loans' },
          ],
        },
        {
          eyebrow: 'Ruta principal',
          title: 'Financiamiento para expansion',
          summary:
            'Para equipo, compras de maquinaria, proyectos mas grandes y conversaciones de capital respaldado por propiedad.',
          highlights: [
            'Equipo y compras de maquinaria',
            'Rutas de prestamos hipotecarios comerciales',
            'Soporte para expansion',
          ],
          href: '/services/equipment-financing',
          paths: [
            { label: 'Financiamiento de equipo', href: '/services/equipment-financing' },
            { label: 'Prestamos hipotecarios', href: '/services/mortgage-loans' },
            { label: 'Invoice factoring', href: '/services/invoice-factoring' },
          ],
        },
      ],
    },
    howItWorks: {
      eyebrow: 'Como funciona',
      heading: 'Un camino simple desde la solicitud hasta el fondeo.',
      steps: [
        { title: 'Aplica', description: 'Completa la solicitud o empieza con una conversacion de calificacion.' },
        { title: 'Revision', description: 'Revisamos el expediente, confirmamos el ajuste y aclaramos los siguientes pasos.' },
        { title: 'Fondeo', description: 'Si hay ajuste y el expediente es aprobado, el proceso avanza al fondeo.' },
      ],
    },
    comparison: {
      eyebrow: 'Por que no un banco',
      heading: 'Una alternativa mas rapida y practica que la ruta bancaria tradicional.',
      subtitle:
        'Cuando importan la velocidad y la flexibilidad, el proceso importa tanto como el producto.',
      rows: [
        {
          label: 'Velocidad',
          firstFund: 'Pensado para moverse rapido cuando el tiempo importa.',
          bank: 'Normalmente mas lento, con ciclos de revision mas largos.',
        },
        {
          label: 'Estructura',
          firstFund: 'Varias rutas practicas segun la situacion.',
          bank: 'Ajuste de producto y suscripcion mas rigidos.',
        },
        {
          label: 'Papeleo',
          firstFund: 'Una ruta mas clara y acceso mas rapido a los siguientes pasos.',
          bank: 'Proceso mas pesado y con mas friccion al principio.',
        },
        {
          label: 'Ajuste de uso',
          firstFund: 'Util cuando la urgencia, el crecimiento o la flexibilidad son el problema principal.',
          bank: 'Mas fuerte para ciclos de credito convencionales y lentos.',
        },
      ],
    },
    proof: {
      eyebrow: 'Por que los negocios avanzan',
      heading: 'La claridad, la velocidad y un proceso seguro importan antes de cualquier decision de financiamiento.',
      subtitle:
        'First Fund esta pensado para que el proceso sea mas facil de entender antes de tomar una decision.',
      cards: [
        {
          title: 'Proceso claro',
          description:
            'Entiende por donde empezar, que sigue y cual ruta encaja mejor con la necesidad.',
        },
        {
          title: 'Soporte bilingue',
          description: 'Recibe orientacion y apoyo en ingles o espanol.',
        },
        {
          title: 'Solicitud segura',
          description: 'Aplica de forma segura o empieza con una conversacion de menor friccion.',
        },
      ],
    },
    faq: {
      eyebrow: 'Preguntas',
      heading: 'Preguntas comunes sobre financiamiento, respondidas con claridad.',
      items: [
        {
          question: 'Que opciones de financiamiento ofrece First Fund?',
          answer:
            'First Fund se enfoca en merchant cash advance, linea de credito y rutas de financiamiento para expansion, mientras que el sitio tambien mantiene seis paginas de servicio para informacion mas detallada.',
        },
        {
          question: 'Que tan rapido puede ocurrir el fondeo?',
          answer:
            'Para expedientes aprobados donde ese producto aplique, el fondeo puede ocurrir en 24–48 horas. El tiempo sigue dependiendo del expediente, la documentacion, la revision y la aceptacion firmada.',
        },
        {
          question: 'Como se presenta el monto del merchant cash advance?',
          answer:
            'El merchant cash advance se presenta como hasta 150% de los ingresos mensuales.',
        },
        {
          question: 'Existe una opcion de linea de credito empresarial?',
          answer:
            'Si. First Fund ofrece una linea de credito empresarial de hasta $3,000,000.',
        },
        {
          question: 'Que debo hacer si no estoy seguro de que producto me conviene?',
          answer:
            'Si no estas seguro de que producto te conviene, el mejor siguiente paso es agendar una llamada o usar la ruta de calificacion antes de empezar una solicitud completa.',
        },
      ],
    },
    cta: {
      heading: 'Empieza con la ruta de financiamiento que mejor encaja con tu negocio.',
      subheading:
        'Aplica ahora si ya sabes lo que necesitas, o toma un primer paso de menor friccion para verificar si calificas.',
      primary: 'Aplica ahora',
      secondary: 'Verifica si calificas',
    },
    stickyCta: {
      label: 'Aplicar',
      secondary: 'Calificar primero',
    },
  },
}

export function getHomeFunnelContent(language: Language) {
  return content[language]
}

export function parseHeroMessageVariant(value?: string): HeroMessageVariant {
  return HERO_MESSAGE_VARIANTS.includes(value as HeroMessageVariant)
    ? (value as HeroMessageVariant)
    : 'speed'
}

export function parseHeroVisualVariant(value?: string): HeroVisualVariant {
  return HERO_VISUAL_VARIANTS.includes(value as HeroVisualVariant)
    ? (value as HeroVisualVariant)
    : 'video'
}
