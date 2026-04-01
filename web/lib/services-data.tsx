import type { ServiceCardData } from '@/components/services/ServiceCard'

export const SERVICES: ServiceCardData[] = [
  {
    title: 'Invoice Factoring',
    abbr: 'IF',
    desc: 'Turn outstanding invoices into immediate working capital. We advance up to 90% of your invoice value — no waiting 30, 60, or 90 days for clients to pay.',
    badge: 'Fastest Access',
    href: '/services/invoice-factoring',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: 'Fixed-Term Loans',
    abbr: 'FTL',
    desc: 'A structured loan with fixed repayment amounts and a set schedule. Predictable budgeting, competitive rates, and no surprises.',
    badge: 'Most Predictable',
    href: '/services/fixed-term-loans',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Line of Credit',
    abbr: 'LOC',
    desc: 'Ongoing access to capital whenever you need it. Draw only what you use, repay on your schedule, and draw again. Perfect for managing cash flow gaps.',
    badge: 'Most Popular',
    href: '/services/line-of-credit',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
  },
  {
    title: 'Mortgage Loans',
    abbr: 'MTG',
    desc: 'Leverage your home equity to access larger capital amounts at expedited speeds — ideal for major expansions or equipment purchases.',
    badge: 'Largest Amounts',
    href: '/services/mortgage-loans',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    title: 'Merchant Cash Advance',
    abbr: 'MCA',
    desc: 'Flexible funding repaid through a small percentage of your daily debit and credit card sales. Repayment moves with your revenue — busy months pay more, slow months less.',
    badge: 'Most Flexible',
    href: '/services/merchant-cash-advance',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
  {
    title: 'Equipment Financing',
    abbr: 'EF',
    desc: 'Finance the equipment your business needs to grow — from kitchen appliances to construction machinery — without draining your operating capital.',
    badge: 'Asset-Backed',
    href: '/services/equipment-financing',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
]
