'use client'

import BlurFade from '@/components/motion/BlurFade'
import { useLanguage } from '@/contexts/LanguageContext'

export default function ServiceComparisonTable() {
  const { t } = useLanguage()
  const ct = t.comparisonTable

  return (
    <BlurFade>
      <div className="overflow-x-auto rounded-2xl border border-ff-border shadow-[0_1px_4px_rgba(15,23,42,0.06)]">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-ff-raised border-b border-ff-border">
              <th className="text-left px-5 py-4 text-ff-muted font-medium min-w-[120px]">{ct.featureLabel}</th>
              {ct.products.map((p) => (
                <th key={p.abbr} className="px-4 py-4 text-center min-w-[130px]">
                  <span className="text-ff-accent font-bold font-heading block text-base">{p.abbr}</span>
                  <span className="text-ff-muted font-normal text-[11px] leading-tight block">{p.full}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ct.rows.map((row, i) => (
              <tr
                key={i}
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
