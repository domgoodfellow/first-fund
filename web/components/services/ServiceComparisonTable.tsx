'use client'

import BlurFade from '@/components/motion/BlurFade'

const products = [
  { label: 'IF',  full: 'Invoice Factoring',     href: '/services/invoice-factoring' },
  { label: 'FTL', full: 'Fixed-Term Loans',       href: '/services/fixed-term-loans' },
  { label: 'LOC', full: 'Line of Credit',         href: '/services/line-of-credit' },
  { label: 'MTG', full: 'Mortgage Loans',         href: '/services/mortgage-loans' },
  { label: 'MCA', full: 'Merchant Cash Advance',  href: '/services/merchant-cash-advance' },
  { label: 'EF',  full: 'Equipment Financing',    href: '/services/equipment-financing' },
]

const rows = [
  {
    label: 'Approval Speed',
    values: ['Same day', '24–48 hrs', '24–48 hrs', '3–5 days', '24–48 hrs', '24–48 hrs'],
  },
  {
    label: 'Collateral',
    values: ['None', 'None', 'None', 'Home equity', 'None', 'Equipment'],
  },
  {
    label: 'Repayment',
    values: ['Auto from invoices', 'Fixed monthly', 'Draw & repay', 'Fixed monthly', '% of daily sales', 'Fixed monthly'],
  },
  {
    label: 'Best For',
    values: ['Invoice businesses', 'Predictable budgeting', 'Ongoing cash needs', 'Large expansions', 'Revenue-based flex', 'Equipment purchases'],
  },
  {
    label: 'Max Amount',
    values: ['Up to $500K', 'Up to $500K', 'Up to $250K', 'Up to $800K', 'Up to $500K', 'Up to $500K'],
  },
  {
    label: 'Credit Profile',
    values: ['All welcome', 'All welcome', 'All welcome', 'All welcome', 'All welcome', 'All welcome'],
  },
]

export default function ServiceComparisonTable() {
  return (
    <BlurFade>
      <div className="overflow-x-auto rounded-2xl border border-ff-border shadow-[0_1px_4px_rgba(15,23,42,0.06)]">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-ff-raised border-b border-ff-border">
              <th className="text-left px-5 py-4 text-ff-muted font-medium min-w-[120px]">Feature</th>
              {products.map((p) => (
                <th key={p.label} className="px-4 py-4 text-center min-w-[130px]">
                  <span className="text-ff-accent font-bold font-heading block text-base">{p.label}</span>
                  <span className="text-ff-muted font-normal text-[11px] leading-tight block">{p.full}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.label}
                className={`border-t border-ff-border ${i % 2 === 0 ? 'bg-ff-bg' : 'bg-ff-surface'}`}
              >
                <td className="px-5 py-4 text-ff-text font-medium">{row.label}</td>
                {row.values.map((val, j) => (
                  <td key={j} className="px-4 py-4 text-ff-muted text-center">{val}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </BlurFade>
  )
}
