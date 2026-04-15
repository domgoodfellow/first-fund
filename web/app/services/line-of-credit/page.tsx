import ServicePageTemplate from '@/components/services/ServicePageTemplate'
import type { ServicePageData } from '@/components/services/ServicePageTemplate'

export const metadata = {
  title: 'Line of Credit - First Fund',
  description:
    'A business line of credit can provide ongoing access to capital, with interest charged only on the amount drawn. Review, documentation, fees, and timelines vary by file.',
}

const enData: ServicePageData = {
  badge: 'Ongoing Access',
  title: 'Line of\nCredit',
  subtitle:
    'A revolving business credit structure for companies that need access to capital over time, not just a one-time lump sum.',
  overview:
    'A business line of credit gives your company access to a credit limit that can be used as needed. Instead of borrowing one fixed amount upfront, you draw funds when the business needs them and pay interest on the amount actually used. This can be a strong fit for businesses that need working capital flexibility, but it is typically a more formal product with a fuller review process.',
  accessNote:
    'Line of credit review may involve documentation, a hard credit check, fees, and a longer approval timeline. For this product, approval and funding can take 6 to 8 weeks, with interest charged on the amount drawn and a minimum payment requirement of 2% every 60 days.',
  bestFor: [
    'Businesses that need recurring access to working capital',
    'Owners who prefer drawing funds only when needed',
    'Companies managing uneven cash flow across the year',
    'Businesses that want a revolving structure instead of a one-time advance',
    'Operators planning around ongoing expenses, payroll, or growth needs',
    'Companies prepared for a more document-driven review process',
  ],
  benefits: [
    {
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>,
      label: 'Revolving Access',
      desc: 'A line of credit is built for repeated access to capital instead of a single one-time disbursement.',
    },
    {
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      label: 'Interest on What You Use',
      desc: 'Interest is charged on the amount drawn rather than on the full approved limit.',
    },
    {
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
      label: 'Useful for Ongoing Needs',
      desc: 'This structure can work well for businesses with recurring working-capital needs instead of one isolated expense.',
    },
    {
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
      label: 'Secured or Unsecured Depending on Structure',
      desc: 'Some credit lines may be unsecured, while larger requests may require collateral depending on the structure and file.',
    },
    {
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
      label: 'Formal Review',
      desc: 'This is not a light-touch product. Review may include business documentation, credit review, and additional underwriting steps.',
    },
    {
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
      label: 'Structured Repayment',
      desc: 'This product may include minimum payment requirements and fees, so it should be evaluated as an ongoing credit facility rather than a quick cash option.',
    },
  ],
  useCases: [
    'Covering recurring operating expenses without relying on a one-time funding structure',
    'Managing working-capital needs across uneven revenue cycles',
    'Supporting payroll, inventory, or vendor payments when timing matters',
    'Keeping access to capital available for planned growth or unexpected gaps',
    'Using a revolving facility when repeated access is more useful than a single disbursement',
  ],
  faqItems: [
    {
      question: 'How is a line of credit different from a loan?',
      answer:
        'A loan is typically disbursed as one fixed amount. A line of credit is a revolving structure that lets you draw funds as needed, with interest charged on the amount drawn.',
    },
    {
      question: 'Does this product involve credit review?',
      answer:
        'Yes. This product can involve a hard credit check as part of the review process.',
    },
    {
      question: 'How long can approval and funding take?',
      answer:
        'For this structure, approval and funding can take 6 to 8 weeks depending on the file, documentation, and underwriting process.',
    },
    {
      question: 'Is collateral always required?',
      answer:
        'Not always. Some structures may be unsecured, while larger requests may require collateral depending on the file.',
    },
    {
      question: 'Are there fees or minimum payment requirements?',
      answer:
        'Yes. This product can include fees and a minimum payment requirement, so the full structure should be reviewed carefully before moving forward.',
    },
  ],
}

const esData: ServicePageData = {
  badge: 'Acceso continuo',
  title: 'Linea de\nCredito',
  subtitle:
    'Una estructura de credito revolvente para negocios que necesitan acceso a capital con el tiempo, no solo un desembolso unico.',
  overview:
    'Una linea de credito empresarial le da a tu negocio acceso a un limite de credito que puede utilizarse segun sea necesario. En lugar de recibir un monto fijo desde el inicio, retiras fondos cuando la empresa lo necesita y pagas intereses sobre el monto realmente utilizado. Puede ser una buena opcion para negocios que necesitan flexibilidad de capital de trabajo, pero normalmente es un producto mas formal con un proceso de revision mas completo.',
  accessNote:
    'La revision de una linea de credito puede incluir documentacion, verificacion dura de credito, cargos y un plazo de aprobacion mas largo. Para este producto, la aprobacion y el fondeo pueden tomar de 6 a 8 semanas, con intereses cobrados sobre el monto retirado y un pago minimo de 2% cada 60 dias.',
  bestFor: [
    'Negocios que necesitan acceso recurrente a capital de trabajo',
    'Duenos que prefieren retirar fondos solo cuando se necesitan',
    'Empresas que manejan flujo de caja irregular durante el ano',
    'Negocios que prefieren una estructura revolvente en lugar de un desembolso unico',
    'Operadores que planifican alrededor de gastos continuos, nomina o crecimiento',
    'Empresas preparadas para un proceso de revision mas documental',
  ],
  benefits: [
    {
      label: 'Acceso revolvente',
      desc: 'Una linea de credito esta pensada para dar acceso repetido a capital, no solo un desembolso unico.',
    },
    {
      label: 'Intereses sobre lo que usas',
      desc: 'Los intereses se cobran sobre el monto retirado, no sobre el limite completo aprobado.',
    },
    {
      label: 'Util para necesidades continuas',
      desc: 'Esta estructura puede funcionar bien para negocios con necesidades recurrentes de capital de trabajo, no solo un gasto aislado.',
    },
    {
      label: 'Con o sin garantia segun la estructura',
      desc: 'Algunas lineas pueden ser sin garantia, mientras que solicitudes mayores pueden requerir colateral segun la estructura y el expediente.',
    },
    {
      label: 'Revision formal',
      desc: 'No es un producto de evaluacion ligera. La revision puede incluir documentacion del negocio, verificacion de credito y pasos adicionales de suscripcion.',
    },
    {
      label: 'Pago estructurado',
      desc: 'Este producto puede incluir pagos minimos y cargos, por lo que debe evaluarse como una facilidad de credito continua, no como una opcion de efectivo rapido.',
    },
  ],
  useCases: [
    'Cubrir gastos operativos recurrentes sin depender de una estructura de financiamiento de una sola vez',
    'Gestionar necesidades de capital de trabajo durante ciclos de ingresos desiguales',
    'Respaldar nomina, inventario o pagos a proveedores cuando el tiempo importa',
    'Mantener acceso a capital disponible para crecimiento planificado o faltantes inesperados',
    'Usar una facilidad revolvente cuando el acceso repetido es mas util que un solo desembolso',
  ],
  faqItems: [
    {
      question: 'En que se diferencia una linea de credito de un prestamo?',
      answer:
        'Un prestamo normalmente se entrega como un monto fijo. Una linea de credito es una estructura revolvente que permite retirar fondos segun se necesiten, pagando intereses sobre el monto utilizado.',
    },
    {
      question: 'Este producto incluye revision de credito?',
      answer:
        'Si. Este producto puede incluir una verificacion dura de credito como parte del proceso de revision.',
    },
    {
      question: 'Cuanto puede tardar la aprobacion y el fondeo?',
      answer:
        'Para esta estructura, la aprobacion y el fondeo pueden tomar de 6 a 8 semanas segun el expediente, la documentacion y el proceso de suscripcion.',
    },
    {
      question: 'Siempre se requiere garantia?',
      answer:
        'No siempre. Algunas estructuras pueden ser sin garantia, mientras que solicitudes mayores pueden requerir colateral segun el expediente.',
    },
    {
      question: 'Existen cargos o pagos minimos?',
      answer:
        'Si. Este producto puede incluir cargos y un pago minimo, por lo que conviene revisar la estructura completa antes de avanzar.',
    },
  ],
}

export default function LOCPage() {
  return <ServicePageTemplate en={enData} es={esData} />
}
