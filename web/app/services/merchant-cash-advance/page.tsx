import ServicePageTemplate from '@/components/services/ServicePageTemplate'
import type { ServicePageData } from '@/components/services/ServicePageTemplate'

export const metadata = {
  title: 'Merchant Cash Advance - First Fund',
  description:
    'A merchant cash advance is a revenue-based financing structure that can fit businesses with consistent sales activity. Review, offer terms, and timing vary by file.',
}

const enData: ServicePageData = {
  badge: 'Flexible Structure',
  title: 'Merchant Cash\nAdvance',
  subtitle:
    'Revenue-based financing for businesses that want repayment tied more closely to sales activity instead of fixed monthly payments.',
  overview:
    'A merchant cash advance provides capital in exchange for future business receivables. Instead of using a fixed monthly installment structure, repayment is tied to business performance. Based on the approved source material, this product is commonly structured for 6 to 24 months and is often sized in relation to monthly revenue.',
  repaymentNote:
    'Merchant cash advance repayment is typically structured using a factor rate and a revenue-based collection method. The approved source material positions this product as open-term and pro-rated, which makes it different from a standard fixed-payment loan.',
  bestFor: [
    'Businesses with active and consistent sales activity',
    'Owners who prefer repayment tied more closely to revenue flow',
    'Companies facing seasonal swings or variable monthly performance',
    'Businesses pursuing a time-sensitive opportunity',
    'Operators who need a shorter-term working-capital structure',
    'Companies prepared to provide business documents for review',
  ],
  benefits: [
    {
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
      label: 'Faster Funding After Approval',
      desc: 'For this product, funding can move quickly once the file is approved. Timing still depends on documentation, review, and offer acceptance.',
    },
    {
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>,
      label: 'Revenue-Based Structure',
      desc: 'This product is built around business revenue rather than a fixed monthly installment schedule.',
    },
    {
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
      label: 'Built for Variable Performance',
      desc: 'The structure can be useful for businesses whose revenue changes from one period to the next.',
    },
    {
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
      label: 'Can Work Alongside an Existing MCA',
      desc: 'The approved source material indicates that having an existing merchant cash advance does not automatically rule this structure out.',
    },
    {
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>,
      label: 'Offer Review Before Commitment',
      desc: 'Submitting for review and receiving an offer can be done without upfront cost based on the approved source material.',
    },
    {
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      label: 'Sized Around Revenue',
      desc: 'The approved source material frames MCA sizing in relation to monthly business revenue rather than a universal fixed cap.',
    },
  ],
  useCases: [
    'Bridging a working-capital gap during a slower period',
    'Buying inventory ahead of a strong sales cycle',
    'Moving quickly on a business opportunity that cannot wait weeks',
    'Supporting operating needs while revenue continues to come in',
    'Using a shorter-term structure when repayment needs to track business activity more closely',
  ],
  faqItems: [
    {
      question: 'How is an MCA different from a traditional loan?',
      answer:
        'A merchant cash advance is typically structured around future receivables and business revenue rather than a fixed-payment loan schedule.',
    },
    {
      question: 'How long can an MCA run?',
      answer:
        'The approved source material describes MCA terms in a typical range of 6 to 24 months.',
    },
    {
      question: 'How is the amount determined?',
      answer:
        'The approved source material frames MCA sizing at roughly 100% to 150% of monthly revenue, depending on the file.',
    },
    {
      question: 'How quickly can funding happen?',
      answer:
        'For this product, funding can happen in 24 to 48 hours once approved. Timing still depends on documentation, review, and signed acceptance.',
    },
    {
      question: 'Can a business already have an MCA and still be reviewed?',
      answer:
        'Yes. The approved source material indicates that an existing MCA does not automatically prevent review for this product.',
    },
  ],
}

const esData: ServicePageData = {
  badge: 'Estructura flexible',
  title: 'Adelanto de\nEfectivo',
  subtitle:
    'Financiamiento basado en ingresos para negocios que prefieren que el pago se relacione mas de cerca con la actividad de ventas en lugar de pagos mensuales fijos.',
  overview:
    'Un adelanto de efectivo para comerciantes ofrece capital a cambio de cuentas por cobrar futuras del negocio. En lugar de usar una estructura de cuotas mensuales fijas, el pago se relaciona con el desempeno del negocio. Segun el material aprobado, este producto suele estructurarse entre 6 y 24 meses y normalmente se calcula en relacion con los ingresos mensuales.',
  repaymentNote:
    'El pago de un MCA normalmente se estructura con una tasa factor y un metodo de cobro basado en ingresos. El material aprobado presenta este producto como abierto y prorrateado, lo que lo diferencia de un prestamo tradicional con pagos fijos.',
  bestFor: [
    'Negocios con actividad de ventas activa y consistente',
    'Duenos que prefieren pagos mas relacionados con el flujo de ingresos',
    'Empresas con temporadas marcadas o rendimiento mensual variable',
    'Negocios que persiguen una oportunidad sensible al tiempo',
    'Operadores que necesitan una estructura de capital de trabajo de plazo mas corto',
    'Empresas preparadas para entregar documentacion del negocio para revision',
  ],
  benefits: [
    {
      label: 'Fondeo mas rapido despues de la aprobacion',
      desc: 'Para este producto, el fondeo puede avanzar rapidamente una vez aprobado el expediente. El tiempo sigue dependiendo de la documentacion, la revision y la aceptacion de la oferta.',
    },
    {
      label: 'Estructura basada en ingresos',
      desc: 'Este producto esta pensado alrededor de los ingresos del negocio en lugar de un calendario fijo de cuotas mensuales.',
    },
    {
      label: 'Pensado para rendimiento variable',
      desc: 'La estructura puede ser util para negocios cuyos ingresos cambian de un periodo a otro.',
    },
    {
      label: 'Puede convivir con un MCA existente',
      desc: 'El material aprobado indica que tener un merchant cash advance existente no descarta automaticamente esta estructura.',
    },
    {
      label: 'Revision de oferta antes del compromiso',
      desc: 'Presentar el expediente para revision y recibir una oferta puede hacerse sin costo inicial segun el material aprobado.',
    },
    {
      label: 'Calculado alrededor de los ingresos',
      desc: 'El material aprobado presenta el monto del MCA en relacion con los ingresos mensuales del negocio y no con un tope universal fijo.',
    },
  ],
  useCases: [
    'Cubrir una brecha de capital de trabajo durante un periodo mas lento',
    'Comprar inventario antes de un ciclo fuerte de ventas',
    'Moverse rapido ante una oportunidad de negocio que no puede esperar semanas',
    'Respaldar necesidades operativas mientras el negocio sigue generando ingresos',
    'Usar una estructura de plazo mas corto cuando el pago debe seguir mas de cerca la actividad del negocio',
  ],
  faqItems: [
    {
      question: 'En que se diferencia un MCA de un prestamo tradicional?',
      answer:
        'Un merchant cash advance normalmente se estructura alrededor de cuentas por cobrar futuras y de los ingresos del negocio, no como un prestamo con pagos fijos.',
    },
    {
      question: 'Cuanto puede durar un MCA?',
      answer:
        'El material aprobado describe plazos tipicos de MCA en un rango de 6 a 24 meses.',
    },
    {
      question: 'Como se determina el monto?',
      answer:
        'El material aprobado presenta el monto del MCA aproximadamente entre 100% y 150% de los ingresos mensuales, segun el expediente.',
    },
    {
      question: 'Que tan rapido puede ocurrir el fondeo?',
      answer:
        'Para este producto, el fondeo puede ocurrir en 24 a 48 horas una vez aprobado. El tiempo sigue dependiendo de la documentacion, la revision y la aceptacion firmada.',
    },
    {
      question: 'Un negocio con un MCA actual aun puede ser evaluado?',
      answer:
        'Si. El material aprobado indica que un MCA existente no impide automaticamente la revision para este producto.',
    },
  ],
}

export default function MCAPage() {
  return <ServicePageTemplate en={enData} es={esData} />
}
