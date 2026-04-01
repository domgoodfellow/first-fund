import ServicePageTemplate from '@/components/services/ServicePageTemplate'
import type { ServicePageData } from '@/components/services/ServicePageTemplate'

export const metadata = {
  title: 'Invoice Factoring — First Fund',
  description: 'Turn outstanding invoices into immediate working capital. Get up to 90% of your invoice value advanced same day — no waiting 30, 60, or 90 days.',
}

const data: ServicePageData = {
  badge: 'Fastest Access',
  title: 'Invoice\nFactoring',
  subtitle: 'Stop waiting on slow-paying clients. Turn outstanding invoices into immediate cash — up to 90% advanced the same day.',
  overview:
    'Invoice Factoring (also called accounts receivable financing) lets your business convert unpaid invoices into immediate working capital. Instead of waiting 30, 60, or 90 days for clients to pay, you sell your invoices to First Fund and receive up to 90% of the invoice value upfront. When your client pays, you receive the remaining balance minus a small factoring fee.',
  repaymentNote:
    'Repayment is automatic — it comes directly from your client\'s payment when they settle the invoice. There are no fixed monthly payments or separate repayment schedules. The factoring fee is deducted from the remaining balance when your client pays.',
  bestFor: [
    'B2B businesses with slow-paying clients (Net 30/60/90)',
    'Staffing, trucking, logistics, and construction companies',
    'Businesses that need cash flow without taking on debt',
    'Companies with good clients but inconsistent payment timing',
    'Businesses with revenue but limited credit history',
    'Owners who want repayment tied to client payment, not a schedule',
  ],
  benefits: [
    {
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
      label: 'Same-Day Access',
      desc: 'Receive up to 90% of your invoice value the same day — eliminate waiting periods entirely.',
    },
    {
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
      label: 'No Collateral',
      desc: 'Your invoices are the only asset required. No equipment, property, or personal assets on the line.',
    },
    {
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>,
      label: 'Automatic Repayment',
      desc: 'Repayment happens through your client\'s invoice payment — no separate monthly payments to manage.',
    },
    {
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
      label: 'All Credit Profiles',
      desc: "We evaluate your clients' creditworthiness, not yours — making this accessible even with limited credit history.",
    },
    {
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>,
      label: 'Not Debt',
      desc: 'Invoice factoring is a sale of an asset — not a loan. It does not appear as debt on your balance sheet.',
    },
    {
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      label: 'Transparent Fees',
      desc: 'One simple factoring fee disclosed upfront. No hidden charges or complex interest calculations.',
    },
  ],
  useCases: [
    'A staffing agency with $200K in unpaid invoices needs to make payroll this week',
    'A trucking company waiting 60 days for freight invoices to be paid needs to cover fuel costs',
    'A construction contractor completes a large project and needs to fund the next one before the client pays',
    'A B2B SaaS company offers Net 60 terms to enterprise clients but needs cash sooner',
    'A manufacturer has inventory to purchase but can\'t wait for client payments to clear',
  ],
  faqItems: [
    { question: 'What percentage of the invoice can I receive upfront?', answer: 'Typically 80–90% of the invoice face value is advanced immediately. The remaining balance (minus the factoring fee) is released when your client pays.' },
    { question: 'How is invoice factoring different from a loan?', answer: 'With factoring, you are selling an asset (your invoice) — not borrowing money. There is no debt on your books, no fixed repayment schedule, and no interest rate.' },
    { question: 'What types of invoices qualify?', answer: 'We factor invoices from creditworthy business clients (B2B). Personal/consumer invoices, government contracts, and international invoices may have specific requirements — ask our team.' },
    { question: 'Does my credit score matter?', answer: 'We primarily evaluate your clients\' ability to pay, not your own credit. This makes factoring accessible to businesses with limited or imperfect credit history.' },
    { question: 'How long does it take to get funded?', answer: 'After a quick review of your invoices and clients, most businesses receive funds within 24 hours of approval — often the same day.' },
  ],
}

export default function InvoiceFactoringPage() {
  return <ServicePageTemplate data={data} />
}
