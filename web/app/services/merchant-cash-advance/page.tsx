import ServicePageTemplate from '@/components/services/ServicePageTemplate'
import type { ServicePageData } from '@/components/services/ServicePageTemplate'

export const metadata = {
  title: 'Merchant Cash Advance — First Fund',
  description: 'Flexible funding repaid through a percentage of your daily card sales. Approvals in 24–48 hours, no collateral required.',
}

const enData: ServicePageData = {
  badge: 'Most Flexible',
  title: 'Merchant Cash\nAdvance',
  subtitle: 'Flexible funding that repays itself through your daily revenue — no fixed payments, no stress on slow months.',
  overview:
    'A Merchant Cash Advance (MCA) gives your business a lump-sum of capital in exchange for a percentage of your future daily debit and credit card sales. Unlike a traditional loan, there are no fixed monthly payments — repayment automatically adjusts to match your revenue.',
  repaymentNote:
    'A small fixed percentage (called a factor rate) of your daily card transactions is remitted to repay the advance. On high-revenue days you pay more; on slow days, less. This makes MCAs especially well-suited for seasonal or variable-income businesses.',
  bestFor: [
    'Businesses with consistent daily card sales',
    'Seasonal businesses with revenue fluctuations',
    'Owners who want flexible repayment — not fixed',
    'Fast-moving opportunities that can\'t wait weeks',
    'Businesses with imperfect credit history',
    'Retail, restaurants, and service businesses',
  ],
  benefits: [
    {
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
      label: '24–48 Hour Approvals',
      desc: 'Get funded fast — our team reviews your application within one to two business days.',
    },
    {
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>,
      label: 'Revenue-Based Repayment',
      desc: 'Payments flex with your sales. No fixed burden on slow months.',
    },
    {
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
      label: 'No Collateral Required',
      desc: 'Your future sales are the only security needed — no assets on the line.',
    },
    {
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
      label: 'All Credit Profiles',
      desc: 'We evaluate your business cash flow — not just a credit score.',
    },
    {
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>,
      label: 'Minimal Paperwork',
      desc: 'One short application. No lengthy business plans or financial projections required.',
    },
    {
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      label: 'Transparent Costs',
      desc: 'Clear factor rate upfront — no hidden fees or surprise charges.',
    },
  ],
  useCases: [
    'Covering payroll or operational costs during a slow season',
    'Purchasing inventory ahead of a busy period',
    'Funding a marketing push or promotion',
    'Bridging a cash flow gap between large client invoices',
    'Upgrading equipment without disrupting operations',
  ],
  faqItems: [
    { question: 'What is a factor rate?', answer: 'A factor rate (e.g. 1.2–1.5) is multiplied by your advance amount to determine the total repayment. For example, a $100,000 advance at 1.3 = $130,000 total repayment through daily sales.' },
    { question: 'Is there a fixed repayment period?', answer: 'No. Repayment depends on your sales volume. Higher sales = faster repayment. There is no fixed end date.' },
    { question: 'Do I need strong credit to qualify?', answer: 'No. We look at your daily card sales volume and business history — not a credit score.' },
    { question: 'How much can I get?', answer: 'MCAs at First Fund can go up to $500,000, depending on your average monthly card sales.' },
    { question: 'How long does funding take?', answer: 'Most applicants are approved within 24–48 hours and receive funds the same or next business day after acceptance.' },
  ],
}

const esData: ServicePageData = {
  badge: 'Más flexible',
  title: 'Adelanto de\nEfectivo',
  subtitle: 'Financiamiento flexible que se paga solo a través de tus ingresos diarios — sin pagos fijos, sin estrés en meses lentos.',
  overview: 'Un Adelanto de Efectivo (MCA) le da a tu negocio una suma de capital a cambio de un porcentaje de tus futuras ventas diarias con tarjeta de débito y crédito. A diferencia de un préstamo tradicional, no hay pagos mensuales fijos — el pago se ajusta automáticamente a tus ingresos.',
  repaymentNote: 'Un pequeño porcentaje fijo (llamado tasa de factor) de tus transacciones diarias con tarjeta se remite para pagar el adelanto. En días de altos ingresos pagas más; en días lentos, menos. Esto lo hace ideal para negocios estacionales o con ingresos variables.',
  bestFor: [
    'Negocios con ventas diarias consistentes con tarjeta',
    'Negocios estacionales con fluctuaciones de ingresos',
    'Dueños que prefieren pagos flexibles — no fijos',
    'Oportunidades que no pueden esperar semanas',
    'Negocios con historial crediticio imperfecto',
    'Comercio minorista, restaurantes y negocios de servicios',
  ],
  benefits: [
    { label: 'Aprobación en 24–48 horas', desc: 'Obtén fondos rápido — nuestro equipo revisa tu solicitud en uno o dos días hábiles.' },
    { label: 'Pago basado en ingresos', desc: 'Los pagos se adaptan a tus ventas. Sin carga fija en meses lentos.' },
    { label: 'Sin garantía requerida', desc: 'Tus ventas futuras son el único respaldo necesario — sin activos en riesgo.' },
    { label: 'Todos los perfiles de crédito', desc: 'Evaluamos el flujo de caja de tu negocio — no solo una calificación crediticia.' },
    { label: 'Papeleo mínimo', desc: 'Una solicitud corta. Sin planes de negocio ni proyecciones financieras extensas.' },
    { label: 'Costos transparentes', desc: 'Tasa de factor clara desde el inicio — sin cargos ocultos ni sorpresas.' },
  ],
  useCases: [
    'Cubrir nómina o costos operativos durante una temporada lenta',
    'Comprar inventario antes de un período de alta demanda',
    'Financiar una campaña de marketing o promoción',
    'Cubrir un desfase de flujo de caja entre facturas grandes de clientes',
    'Actualizar equipo sin interrumpir las operaciones',
  ],
  faqItems: [
    { question: '¿Qué es una tasa de factor?', answer: 'Una tasa de factor (ej. 1.2–1.5) se multiplica por tu monto de adelanto para determinar el pago total. Por ejemplo, un adelanto de $100,000 a 1.3 = $130,000 en pago total a través de ventas diarias.' },
    { question: '¿Hay un período de pago fijo?', answer: 'No. El pago depende del volumen de tus ventas. Más ventas = pago más rápido. No hay fecha de término fija.' },
    { question: '¿Necesito buen crédito para calificar?', answer: 'No. Miramos el volumen de tus ventas diarias con tarjeta y el historial del negocio — no una calificación crediticia.' },
    { question: '¿Cuánto puedo obtener?', answer: 'Los MCA en First Fund pueden llegar hasta $500,000, dependiendo de tus ventas mensuales promedio con tarjeta.' },
    { question: '¿Cuánto tiempo tarda el financiamiento?', answer: 'La mayoría de los solicitantes son aprobados en 24–48 horas y reciben fondos el mismo día hábil o al siguiente después de aceptar.' },
  ],
}

export default function MCAPage() {
  return <ServicePageTemplate en={enData} es={esData} />
}
