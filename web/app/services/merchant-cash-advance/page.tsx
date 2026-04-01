import ServicePageTemplate from '@/components/services/ServicePageTemplate'
import type { ServicePageData } from '@/components/services/ServicePageTemplate'

export const metadata = {
  title: 'Merchant Cash Advance — First Fund',
  description: 'Flexible funding repaid through a percentage of your daily card sales. Approvals in 24–48 hours, no collateral required.',
}

const data: ServicePageData = {
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

export default function MCAPage() {
  return <ServicePageTemplate data={data} />
}
