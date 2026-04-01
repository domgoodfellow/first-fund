import ServicePageTemplate from '@/components/services/ServicePageTemplate'
import type { ServicePageData } from '@/components/services/ServicePageTemplate'

export const metadata = {
  title: 'Mortgage Loans — First Fund',
  description: 'Access larger capital amounts through your home equity at expedited speeds. Approvals in 3–5 days.',
}

const data: ServicePageData = {
  badge: 'Largest Amounts',
  title: 'Mortgage\nLoans',
  subtitle: 'Tap into your home equity to unlock larger capital amounts at speeds traditional lenders cannot match.',
  overview:
    'Our Mortgage Loan product allows business owners to leverage the equity in their residential or commercial property to access significant capital. Unlike bank mortgages that take months, we move at the speed your business demands — with transparent terms and a streamlined process designed for entrepreneurs.',
  bestFor: [
    'Business owners with home or property equity',
    'Large-scale expansions requiring $250K+',
    'Major equipment or infrastructure purchases',
    'Acquisitions or real estate investments',
    'Owners who want lower rates in exchange for security',
    'Long-term capital needs with predictable repayment',
  ],
  benefits: [
    {
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      label: 'Largest Available Amounts',
      desc: 'Access up to $800K — far more than unsecured products allow.',
    },
    {
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
      label: 'Expedited Processing',
      desc: 'We move faster than traditional lenders — decisions in 3–5 business days.',
    },
    {
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
      label: 'Fixed Monthly Payments',
      desc: 'Predictable repayment schedule makes budgeting simple and consistent.',
    },
    {
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
      label: 'Competitive Rates',
      desc: 'Secured products typically carry lower rates than unsecured alternatives.',
    },
    {
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
      label: 'All Credit Profiles',
      desc: 'Equity-based financing gives more flexibility on credit requirements.',
    },
    {
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
      label: 'Use Property You Already Own',
      desc: 'Turn idle equity into working capital without selling your property.',
    },
  ],
  useCases: [
    'Opening a second or third business location',
    'Purchasing commercial real estate for your business',
    'Large-scale equipment procurement or facility upgrades',
    'Acquiring a competitor or partner business',
    'Major renovation or construction projects',
  ],
  faqItems: [
    { question: 'What type of property can I use?', answer: 'Both residential and commercial properties are eligible, provided you have sufficient equity. Our team will assess during the application review.' },
    { question: 'How long does approval take?', answer: 'Mortgage Loans take 3–5 business days due to property verification — still significantly faster than traditional lenders who can take weeks or months.' },
    { question: 'What is the maximum loan amount?', answer: 'Up to $800,000 depending on your equity position and business profile.' },
    { question: 'Is my credit score important?', answer: 'It is considered, but your equity position carries significant weight. We work with all credit profiles.' },
    { question: 'What if I already have a mortgage on my property?', answer: 'Existing mortgages reduce available equity but do not automatically disqualify you. Our team will calculate your usable equity during review.' },
  ],
}

export default function MortgagePage() {
  return <ServicePageTemplate data={data} />
}
