export type Language = 'en' | 'es'

export const translations = {
  en: {
    nav: {
      services: 'Services',
      howItWorks: 'How It Works',
      stories: 'Stories',
      applyNow: 'Apply Now',
    },
    hero: {
      badge: '24–48 Hr Approvals · No Collateral',
      headline: 'Fast Funding for\nBold Businesses.',
      sub: 'Get up to $800K+ in business financing — approved in 24–48 hours, no collateral required. We move at the speed your business demands.',
      cta: 'Apply in 60 Seconds',
      ctaSecondary: 'See How It Works',
    },
    stats: {
      item1: { value: '24–48 hrs', label: 'Funding Decisions' },
      item2: { value: '$800K+', label: 'Available Funding' },
      item3: { value: '0', label: 'Collateral Required' },
      item4: { value: 'All', label: 'Credit Profiles Welcome' },
    },
    howItWorks: {
      sectionLabel: 'The Process',
      heading: 'Funded in 4 Simple Steps',
      steps: [
        { title: 'Apply in 60 Seconds', desc: 'Fill out our one-page application with basic business details — no lengthy paperwork.' },
        { title: 'Same-Day Review', desc: 'Our team reviews your file and reaches out within 24–48 hours with a decision.' },
        { title: 'Get Your Offer', desc: 'Receive a tailored funding offer with clear, transparent terms — no hidden fees.' },
        { title: 'Funded & Growing', desc: 'Accept your offer and receive funds the same or next business day. Time to grow.' },
      ],
    },
    services: {
      sectionLabel: 'Our Products',
      heading: 'Financing Built Around Your Business',
      sub: 'One application, four powerful options — pick the structure that fits your cash flow.',
      items: [
        { title: 'Merchant Cash Advance', abbr: 'MCA', desc: 'Flexible funding repaid through a small percentage of your daily debit and credit card sales. Repayment moves with your revenue — busy months pay more, slow months less.', badge: 'Most Flexible' },
        { title: 'Line of Credit', abbr: 'LOC', desc: 'Ongoing access to capital whenever you need it. Draw only what you use, repay on your schedule, and draw again. Perfect for managing cash flow gaps.', badge: 'Most Popular' },
        { title: 'Mortgage Loans', abbr: 'MTG', desc: 'Leverage your home equity to access larger capital amounts at expedited speeds — ideal for major expansions or equipment purchases.', badge: 'Largest Amounts' },
        { title: 'Fixed-Term Loans', abbr: 'FTL', desc: 'A structured loan with fixed repayment amounts and a set schedule. Predictable budgeting, competitive rates, and no surprises.', badge: 'Most Predictable' },
      ],
      learnMore: 'Learn More →',
      apply: 'Apply Now',
    },
    testimonials: {
      sectionLabel: 'Real Stories',
      heading: 'Business Owners Who Moved Faster',
      items: [
        { quote: 'Got $150K approved in under 24 hours. It literally saved our expansion.', name: 'Maria S.', role: 'Restaurant Owner', location: 'Chicago, IL', rating: 5 },
        { quote: 'FirsFund moved faster than any bank I have ever worked with. The money was in our account the next day.', name: 'James K.', role: 'E-commerce Founder', location: 'Austin, TX', rating: 5 },
        { quote: 'No collateral, no stress — just the capital we needed. We opened two new locations thanks to them.', name: 'Sofia R.', role: 'Retail Chain Owner', location: 'Los Angeles, CA', rating: 5 },
      ],
    },
    cta: {
      heading: 'Ready to Get Funded?',
      sub: 'One application. No collateral. Decisions in 24–48 hours.',
      button: 'Start Your Application',
      note: 'Free to apply · No impact on credit score to check',
    },
    apply: {
      heading: 'Apply for Funding',
      sub: 'Fill out the form below and our team will reach out within 24 hours.',
      progressLabel: 'Application Progress',
      fields: {
        companyName: 'Company Name',
        fullName: 'Full Name',
        email: 'Email Address',
        phone: 'Phone Number',
        revenue: {
          label: "Business's Monthly Revenue",
          options: ['Between $10,000 and $50,000', 'Between $50,000 and $150,000', 'More than $150,000'],
        },
        yearsRegistered: {
          label: 'How long has your company been registered?',
          options: ['Less than 1 year', '1–5 years', '5 years or more'],
        },
        industry: 'Industry',
        referredBy: 'Referred By',
        smsConsent1: 'By providing my phone number, I consent to receive SMS messages regarding my financing inquiry or application. Message frequency may vary. Message & data rates may apply. Text HELP for assistance or reply STOP to unsubscribe.',
        smsConsent2: 'I consent to receive non-marketing SMS messages regarding my account, application updates, and appointment reminders. Reply STOP to unsubscribe.',
        submit: 'Submit Application',
      },
    },
    footer: {
      tagline: 'Business Financing Made Easy — Coast to Coast.',
      links: { company: 'Company', services: 'Services', legal: 'Legal', contact: 'Contact' },
      nav: {
        about: 'About Us', careers: 'Careers', blog: 'Blog',
        mca: 'Merchant Cash Advance', loc: 'Line of Credit', mortgage: 'Mortgage Loans', fixed: 'Fixed-Term Loans',
        terms: 'Terms of Service', privacy: 'Privacy Policy',
        email: 'info@firsfund.com', phone: '+1 (555) 000-0000',
      },
      disclaimer: 'All financing applications are subject to review and underwriting. Approval and funding terms remain at the sole discretion of lending partners.',
      rights: 'All rights reserved.',
    },
  },

  es: {
    nav: {
      services: 'Servicios',
      howItWorks: 'Cómo funciona',
      stories: 'Historias',
      applyNow: 'Solicitar',
    },
    hero: {
      badge: 'Aprobaciones en 24–48 h · Sin garantía',
      headline: 'Financiamiento rápido\npara negocios ambiciosos.',
      sub: 'Obtén hasta $800K+ en financiamiento empresarial — aprobado en 24–48 horas, sin garantía requerida.',
      cta: 'Solicitar en 60 segundos',
      ctaSecondary: 'Ver cómo funciona',
    },
    stats: {
      item1: { value: '24–48 h', label: 'Decisiones de financiamiento' },
      item2: { value: '$800K+', label: 'Financiamiento disponible' },
      item3: { value: '0', label: 'Garantía requerida' },
      item4: { value: 'Todos', label: 'Perfiles de crédito bienvenidos' },
    },
    howItWorks: {
      sectionLabel: 'El proceso',
      heading: 'Financiado en 4 pasos simples',
      steps: [
        { title: 'Solicita en 60 segundos', desc: 'Completa nuestra solicitud de una página — sin papeleo interminable.' },
        { title: 'Revisión el mismo día', desc: 'Nuestro equipo revisa tu expediente y se comunica contigo en 24–48 horas.' },
        { title: 'Recibe tu oferta', desc: 'Obtén una oferta personalizada con términos claros y transparentes — sin cargos ocultos.' },
        { title: 'Financiado y creciendo', desc: 'Acepta tu oferta y recibe los fondos el mismo día o al siguiente día hábil.' },
      ],
    },
    services: {
      sectionLabel: 'Nuestros productos',
      heading: 'Financiamiento diseñado para tu negocio',
      sub: 'Una solicitud, cuatro opciones poderosas — elige la estructura que se adapte a tu flujo de caja.',
      items: [
        { title: 'Adelanto de efectivo', abbr: 'MCA', desc: 'Financiamiento flexible que se paga con un pequeño porcentaje de tus ventas diarias con tarjeta.', badge: 'Más flexible' },
        { title: 'Línea de crédito', abbr: 'LOC', desc: 'Acceso continuo a capital cuando lo necesites. Retira solo lo que usas y vuelve a retirar.', badge: 'Más popular' },
        { title: 'Préstamos hipotecarios', abbr: 'MTG', desc: 'Aprovecha el valor de tu propiedad para acceder a montos más grandes de manera rápida.', badge: 'Mayores montos' },
        { title: 'Préstamos a plazo fijo', abbr: 'FTL', desc: 'Un préstamo estructurado con pagos fijos. Presupuesto predecible, tasas competitivas.', badge: 'Más predecible' },
      ],
      learnMore: 'Ver más →',
      apply: 'Solicitar',
    },
    testimonials: {
      sectionLabel: 'Historias reales',
      heading: 'Dueños de negocio que avanzaron más rápido',
      items: [
        { quote: 'Obtuve $150K aprobados en menos de 24 horas. Literalmente salvó nuestra expansión.', name: 'Maria S.', role: 'Dueña de restaurante', location: 'Chicago, IL', rating: 5 },
        { quote: 'FirsFund se movió más rápido que cualquier banco. El dinero estaba en nuestra cuenta al día siguiente.', name: 'James K.', role: 'Fundador de e-commerce', location: 'Austin, TX', rating: 5 },
        { quote: 'Sin garantía, sin estrés — solo el capital que necesitábamos. Abrimos dos nuevas sucursales.', name: 'Sofia R.', role: 'Dueña de cadena minorista', location: 'Los Ángeles, CA', rating: 5 },
      ],
    },
    cta: {
      heading: '¿Listo para obtener financiamiento?',
      sub: 'Una solicitud. Sin garantía. Decisiones en 24–48 horas.',
      button: 'Comenzar tu solicitud',
      note: 'Gratis · Sin impacto en tu puntaje crediticio',
    },
    apply: {
      heading: 'Solicitar financiamiento',
      sub: 'Completa el formulario y nuestro equipo se comunicará contigo dentro de las 24 horas.',
      progressLabel: 'Progreso de la solicitud',
      fields: {
        companyName: 'Nombre de la empresa',
        fullName: 'Nombre completo',
        email: 'Correo electrónico',
        phone: 'Número de teléfono',
        revenue: {
          label: 'Ingresos mensuales de tu negocio',
          options: ['Entre $10,000 y $50,000', 'Entre $50,000 y $150,000', 'Más de $150,000'],
        },
        yearsRegistered: {
          label: '¿Cuánto tiempo lleva registrada tu empresa?',
          options: ['Menos de 1 año', '1–5 años', '5 años o más'],
        },
        industry: 'Industria',
        referredBy: 'Referido por',
        smsConsent1: 'Al proporcionar mi número, consiento recibir SMS sobre mi solicitud de financiamiento. Se pueden aplicar tarifas. Responde STOP para cancelar.',
        smsConsent2: 'Consiento recibir SMS no promocionales sobre mi cuenta y actualizaciones de solicitud. Responde STOP para cancelar.',
        submit: 'Enviar solicitud',
      },
    },
    footer: {
      tagline: 'Financiamiento empresarial fácil — de costa a costa.',
      links: { company: 'Empresa', services: 'Servicios', legal: 'Legal', contact: 'Contacto' },
      nav: {
        about: 'Sobre nosotros', careers: 'Empleos', blog: 'Blog',
        mca: 'Adelanto de efectivo', loc: 'Línea de crédito', mortgage: 'Préstamos hipotecarios', fixed: 'Préstamos a plazo fijo',
        terms: 'Términos de servicio', privacy: 'Política de privacidad',
        email: 'info@firsfund.com', phone: '+1 (555) 000-0000',
      },
      disclaimer: 'Todas las solicitudes de financiamiento están sujetas a revisión y suscripción. La aprobación queda a discreción exclusiva de los socios prestamistas.',
      rights: 'Todos los derechos reservados.',
    },
  },
} as const

export type Translations = typeof translations.en
