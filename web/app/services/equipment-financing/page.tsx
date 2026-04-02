import ServicePageTemplate from '@/components/services/ServicePageTemplate'
import type { ServicePageData } from '@/components/services/ServicePageTemplate'

export const metadata = {
  title: 'Equipment Financing — First Fund',
  description: 'Finance the equipment your business needs to grow without draining operating capital. Approvals in 24–48 hours.',
}

const enData: ServicePageData = {
  badge: 'Asset-Backed',
  title: 'Equipment\nFinancing',
  subtitle: 'Get the machinery, vehicles, or technology your business needs — financed over time, so you preserve your operating capital.',
  overview:
    'Equipment Financing lets your business acquire the tools it needs to operate and grow without paying the full purchase price upfront. The equipment itself serves as collateral for the loan, which typically results in better terms than unsecured financing. You make fixed monthly payments over the loan term, and at the end you own the equipment outright.',
  bestFor: [
    'Restaurants and food service businesses needing kitchen equipment',
    'Construction companies purchasing heavy machinery or vehicles',
    'Medical practices acquiring diagnostic or treatment equipment',
    'Transportation businesses expanding their fleet',
    'Manufacturers investing in production machinery',
    'Any business replacing aging or failing equipment',
  ],
  benefits: [
    {
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
      label: 'Equipment as Collateral',
      desc: 'The financed equipment secures the loan — preserving your other assets and often reducing required credit.',
    },
    {
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
      label: 'Predictable Payments',
      desc: 'Fixed monthly payments make budgeting straightforward — you know exactly what you owe and when.',
    },
    {
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
      label: '24–48 Hour Approvals',
      desc: 'Fast decisions so you can acquire the equipment you need without losing time or opportunity.',
    },
    {
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      label: 'Preserve Working Capital',
      desc: 'Finance equipment over time instead of paying cash — keeping your operating capital for day-to-day needs.',
    },
    {
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
      label: 'All Credit Profiles',
      desc: 'Asset-backed structure means we can approve businesses that might not qualify for unsecured products.',
    },
    {
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>,
      label: 'Own It at the End',
      desc: 'Unlike leasing, equipment financing ends with you owning the asset outright — building business equity.',
    },
  ],
  useCases: [
    'A restaurant replacing a broken commercial oven that is disrupting service',
    'A construction company purchasing an excavator to take on a larger project',
    'A medical clinic financing a new imaging machine to expand treatment offerings',
    'A delivery business adding vehicles to its fleet to meet growing demand',
    'A manufacturer upgrading production machinery to improve output and reduce costs',
  ],
  faqItems: [
    { question: 'What types of equipment can be financed?', answer: 'We finance most business equipment — vehicles, machinery, kitchen appliances, medical equipment, technology, and more. If it is used for your business, we can likely finance it.' },
    { question: 'Do I need a down payment?', answer: 'Not always. Equipment financing often requires little to no down payment since the equipment itself secures the loan. Ask our team about your specific situation.' },
    { question: 'Is this different from an equipment lease?', answer: 'Yes. With financing you own the equipment at the end of the term. With a lease you are renting it, often with an option to buy. Financing is better if you plan to keep the equipment long-term.' },
    { question: 'How much can I finance?', answer: 'Equipment financing at First Fund can go up to $500,000 depending on the type of equipment and your business profile.' },
    { question: 'How long does approval take?', answer: 'Most applications are reviewed within 24–48 hours. Once approved, funds are typically available the same or next business day.' },
  ],
}

const esData: ServicePageData = {
  badge: 'Respaldado por activos',
  title: 'Financiamiento de\nEquipo',
  subtitle: 'Obtén la maquinaria, vehículos o tecnología que tu negocio necesita — financiado en el tiempo, para preservar tu capital operativo.',
  overview: 'El Financiamiento de Equipo le permite a tu negocio adquirir las herramientas necesarias para operar y crecer sin pagar el precio total de compra por adelantado. El equipo mismo sirve como garantía del préstamo, lo que generalmente resulta en mejores términos que el financiamiento sin garantía. Haces pagos mensuales fijos durante el plazo del préstamo y al final eres dueño del equipo por completo.',
  bestFor: [
    'Restaurantes y negocios de alimentos que necesitan equipo de cocina',
    'Empresas de construcción que compran maquinaria pesada o vehículos',
    'Consultorios médicos que adquieren equipo de diagnóstico o tratamiento',
    'Negocios de transporte que expanden su flota',
    'Fabricantes que invierten en maquinaria de producción',
    'Cualquier negocio que reemplace equipo antiguo o que falla',
  ],
  benefits: [
    { label: 'Equipo como garantía', desc: 'El equipo financiado asegura el préstamo — preservando tus otros activos y a menudo reduciendo el crédito requerido.' },
    { label: 'Pagos predecibles', desc: 'Pagos mensuales fijos que simplifican la presupuestación — sabes exactamente qué debes y cuándo.' },
    { label: 'Aprobación en 24–48 horas', desc: 'Decisiones rápidas para que puedas adquirir el equipo que necesitas sin perder tiempo u oportunidades.' },
    { label: 'Preserva el capital operativo', desc: 'Financia el equipo en el tiempo en lugar de pagar efectivo — manteniendo tu capital operativo para necesidades del día a día.' },
    { label: 'Todos los perfiles de crédito', desc: 'La estructura respaldada por activos nos permite aprobar negocios que podrían no calificar para productos sin garantía.' },
    { label: 'Lo posees al final', desc: 'A diferencia del arrendamiento, el financiamiento de equipo termina con que eres dueño del activo — construyendo capital empresarial.' },
  ],
  useCases: [
    'Un restaurante que reemplaza un horno comercial roto que interrumpe el servicio',
    'Una empresa de construcción que compra una excavadora para tomar proyectos más grandes',
    'Una clínica médica que financia una nueva máquina de imágenes para expandir sus servicios',
    'Un negocio de entrega que agrega vehículos a su flota para satisfacer la creciente demanda',
    'Un fabricante que actualiza maquinaria de producción para mejorar la producción y reducir costos',
  ],
  faqItems: [
    { question: '¿Qué tipos de equipo se pueden financiar?', answer: 'Financiamos la mayoría del equipo empresarial — vehículos, maquinaria, electrodomésticos de cocina, equipo médico, tecnología y más. Si se usa para tu negocio, probablemente podamos financiarlo.' },
    { question: '¿Necesito un pago inicial?', answer: 'No siempre. El financiamiento de equipo a menudo requiere poco o ningún pago inicial ya que el equipo mismo asegura el préstamo. Consulta a nuestro equipo sobre tu situación específica.' },
    { question: '¿Es diferente a un arrendamiento de equipo?', answer: 'Sí. Con el financiamiento eres dueño del equipo al final del plazo. Con un arrendamiento lo estás rentando, a menudo con opción de compra. El financiamiento es mejor si planeas mantener el equipo a largo plazo.' },
    { question: '¿Cuánto puedo financiar?', answer: 'El financiamiento de equipo en First Fund puede llegar hasta $500,000 dependiendo del tipo de equipo y tu perfil empresarial.' },
    { question: '¿Cuánto tiempo tarda la aprobación?', answer: 'La mayoría de las solicitudes se revisan en 24–48 horas. Una vez aprobado, los fondos generalmente están disponibles el mismo día hábil o al siguiente.' },
  ],
}

export default function EquipmentFinancingPage() {
  return <ServicePageTemplate en={enData} es={esData} />
}
