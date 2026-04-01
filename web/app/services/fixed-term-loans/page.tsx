import ServicePageTemplate from '@/components/services/ServicePageTemplate'
import type { ServicePageData } from '@/components/services/ServicePageTemplate'

export const metadata = {
  title: 'Fixed-Term Loans — First Fund',
  description: 'Structured business loans with fixed repayment schedules and predictable monthly payments. Approvals in 24–48 hours.',
}

const data: ServicePageData = {
  badge: 'Most Predictable',
  title: 'Fixed-Term\nLoans',
  subtitle: 'A structured loan with fixed payments and a clear end date — the most predictable way to finance your business growth.',
  overview:
    'A Fixed-Term Loan delivers a lump sum of capital repaid over a defined period with consistent monthly payments. The rate and schedule are locked in at the start, so there are no surprises. This makes Fixed-Term Loans ideal for owners who want to plan their budget with precision and know exactly when they will be debt-free.',
  bestFor: [
    'Business owners who prefer predictable monthly payments',
    'Planned investments with a clear ROI timeline',
    'Equipment purchases, renovations, or expansions',
    'Owners who want a defined end date for their financing',
    'Businesses with stable, consistent monthly revenue',
    'Refinancing higher-cost existing debt',
  ],
  benefits: [
    {
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
      label: 'Fixed Monthly Payments',
      desc: 'The same payment every month — no surprises, easy to budget.',
    },
    {
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
      label: 'Transparent Terms',
      desc: 'Rate, term, and total repayment are clear from day one. No hidden fees.',
    },
    {
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
      label: '24–48 Hour Approvals',
      desc: 'Faster than any bank. Decisions within one to two business days.',
    },
    {
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      label: 'Competitive Rates',
      desc: 'Fixed rates that do not change mid-term — what you see is what you get.',
    },
    {
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
      label: 'No Collateral Required',
      desc: 'Most fixed-term loans are unsecured — no assets at risk.',
    },
    {
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
      label: 'All Credit Profiles',
      desc: 'We assess your business holistically — credit score is one factor, not the only one.',
    },
  ],
  useCases: [
    'Purchasing or upgrading equipment with a known cost',
    'Funding a leasehold improvement or office renovation',
    'Hiring and onboarding a new team',
    'Refinancing existing debt at a lower effective cost',
    'Launching a new product line or service with fixed startup costs',
  ],
  faqItems: [
    { question: 'What terms are available?', answer: 'Term lengths vary based on the funding amount and your business profile. Our team will present options at the time of approval.' },
    { question: 'Can I pay it off early?', answer: 'Yes. Early repayment is allowed. Speak with your account manager about any applicable prepayment considerations.' },
    { question: 'What is the maximum loan amount?', answer: 'Fixed-Term Loans go up to $500,000 depending on your business revenue and financial profile.' },
    { question: 'How is this different from an MCA?', answer: 'An MCA has no fixed payment — it takes a percentage of daily sales. A Fixed-Term Loan has a set monthly payment regardless of revenue, making it easier to plan around.' },
    { question: 'How fast is funding after approval?', answer: 'Funds are typically deposited the same or next business day after you accept your offer.' },
  ],
}

export default function FixedTermPage() {
  return <ServicePageTemplate data={data} />
}
