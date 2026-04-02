import ServicePageTemplate from '@/components/services/ServicePageTemplate'
import type { ServicePageData } from '@/components/services/ServicePageTemplate'

export const metadata = {
  title: 'Line of Credit — First Fund',
  description: 'Ongoing access to business credit — draw what you need, repay, and draw again. Approvals in 24–48 hours.',
}

const enData: ServicePageData = {
  badge: 'Most Popular',
  title: 'Line of\nCredit',
  subtitle: 'Revolving access to capital — draw what you need, when you need it, and only pay for what you use.',
  overview:
    'A Business Line of Credit gives you a pre-approved credit limit you can draw from at any time. Unlike a lump-sum loan, you only pay interest on the amount you actually use. Once repaid, the funds become available again — making it the most flexible ongoing financing tool for active businesses.',
  accessNote:
    'Once approved, you can draw funds instantly up to your credit limit. As you repay, your available balance resets. This revolving structure means you always have capital ready without re-applying.',
  bestFor: [
    'Businesses with ongoing or unpredictable cash flow needs',
    'Owners who want capital on standby, not a lump sum',
    'Managing invoice gaps or delayed client payments',
    'Covering operating expenses between busy periods',
    'Businesses that want to pay interest only on what they use',
    'Companies with recurring, variable expenses',
  ],
  benefits: [
    {
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>,
      label: 'Revolving Access',
      desc: 'Draw, repay, and draw again — your credit resets as you pay it down.',
    },
    {
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      label: 'Pay Only for What You Use',
      desc: 'Interest accrues only on your outstanding drawn balance — not the full limit.',
    },
    {
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
      label: 'Fast Approval',
      desc: '24–48 hour decisions so you can have access to capital before you actually need it.',
    },
    {
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
      label: 'No Collateral',
      desc: 'Most credit lines are unsecured — no assets required.',
    },
    {
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
      label: 'All Credit Profiles',
      desc: 'We evaluate your business performance, not just your personal credit score.',
    },
    {
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
      label: 'Flexible Draw Schedule',
      desc: 'No set schedule for when you draw or repay — use it when your business needs it.',
    },
  ],
  useCases: [
    'Covering payroll or operational overhead during a slow month',
    'Bridging the gap between delivering a project and receiving payment',
    'Stocking up on inventory before a busy season',
    'Handling unexpected expenses without disrupting cash flow',
    'Running a marketing campaign or promotion when opportunity arises',
  ],
  faqItems: [
    { question: 'How is a line of credit different from a loan?', answer: 'A loan gives you one lump sum repaid on a fixed schedule. A line of credit lets you draw funds repeatedly up to a limit, paying interest only on what you use.' },
    { question: 'Can I draw as many times as I want?', answer: 'Yes. As long as you have available balance, you can draw as often as needed — no need to reapply.' },
    { question: 'What is the maximum credit limit?', answer: 'Lines of credit at First Fund go up to $250,000, based on your business revenue and financial health.' },
    { question: 'Do I pay interest if I never draw?', answer: 'No. Interest only accrues on outstanding drawn amounts. If your balance is $0, there is no cost.' },
    { question: 'How fast can I access funds after approval?', answer: 'Once your line is established, draws are typically processed the same business day.' },
  ],
}

const esData: ServicePageData = {
  badge: 'Más popular',
  title: 'Línea de\nCrédito',
  subtitle: 'Acceso revolvente a capital — retira lo que necesitas, cuando lo necesitas, y solo paga por lo que usas.',
  overview: 'Una Línea de Crédito Empresarial te da un límite de crédito preaprobado del que puedes retirar en cualquier momento. A diferencia de un préstamo de suma global, solo pagas intereses sobre el monto que realmente usas. Una vez pagado, los fondos están disponibles nuevamente — convirtiéndola en la herramienta de financiamiento continuo más flexible para negocios activos.',
  accessNote: 'Una vez aprobado, puedes retirar fondos de inmediato hasta tu límite de crédito. A medida que pagas, tu saldo disponible se restablece. Esta estructura revolvente significa que siempre tienes capital disponible sin volver a aplicar.',
  bestFor: [
    'Negocios con necesidades de flujo de caja continuas o impredecibles',
    'Dueños que quieren capital disponible, no una suma global',
    'Gestión de desfases de facturas o pagos tardíos de clientes',
    'Cubrir gastos operativos entre períodos de alta demanda',
    'Negocios que quieren pagar intereses solo sobre lo que usan',
    'Empresas con gastos variables recurrentes',
  ],
  benefits: [
    { label: 'Acceso revolvente', desc: 'Retira, paga y vuelve a retirar — tu crédito se restablece a medida que lo pagas.' },
    { label: 'Paga solo por lo que usas', desc: 'Los intereses se acumulan solo sobre tu saldo retirado — no sobre el límite completo.' },
    { label: 'Aprobación rápida', desc: 'Decisiones en 24–48 horas para que tengas acceso al capital antes de que lo necesites.' },
    { label: 'Sin garantía', desc: 'La mayoría de las líneas de crédito son sin garantía — sin activos requeridos.' },
    { label: 'Todos los perfiles de crédito', desc: 'Evaluamos el rendimiento de tu negocio, no solo tu calificación crediticia personal.' },
    { label: 'Calendario de retiro flexible', desc: 'Sin calendario fijo para retirar o pagar — úsala cuando tu negocio lo necesite.' },
  ],
  useCases: [
    'Cubrir nómina u overhead operativo durante un mes lento',
    'Cubrir el desfase entre entregar un proyecto y recibir el pago',
    'Abastecerse de inventario antes de una temporada alta',
    'Manejar gastos inesperados sin interrumpir el flujo de caja',
    'Ejecutar una campaña de marketing o promoción cuando surge la oportunidad',
  ],
  faqItems: [
    { question: '¿En qué se diferencia una línea de crédito de un préstamo?', answer: 'Un préstamo te da una suma global que se paga en un calendario fijo. Una línea de crédito te permite retirar fondos repetidamente hasta un límite, pagando intereses solo sobre lo que usas.' },
    { question: '¿Puedo retirar tantas veces como quiera?', answer: 'Sí. Mientras tengas saldo disponible, puedes retirar con la frecuencia necesaria — sin necesidad de volver a aplicar.' },
    { question: '¿Cuál es el límite máximo de crédito?', answer: 'Las líneas de crédito en First Fund llegan hasta $250,000, según los ingresos y la salud financiera de tu negocio.' },
    { question: '¿Pago intereses si nunca retiro?', answer: 'No. Los intereses solo se acumulan sobre los montos retirados pendientes. Si tu saldo es $0, no hay costo.' },
    { question: '¿Qué tan rápido puedo acceder a fondos después de la aprobación?', answer: 'Una vez establecida tu línea, los retiros generalmente se procesan el mismo día hábil.' },
  ],
}

export default function LOCPage() {
  return <ServicePageTemplate en={enData} es={esData} />
}
