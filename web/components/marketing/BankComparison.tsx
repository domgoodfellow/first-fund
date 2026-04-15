'use client'

import SectionWrapper from '@/components/layout/SectionWrapper'
import SectionHeader from '@/components/ui/SectionHeader'
import BlurFade from '@/components/motion/BlurFade'
import { useLanguage } from '@/contexts/LanguageContext'
import { getHomeFunnelContent } from '@/lib/home-funnel'

export default function BankComparison() {
  const { language } = useLanguage()
  const content = getHomeFunnelContent(language).comparison

  return (
    <SectionWrapper id="comparison" size="md" bg="bg-ff-bg">
      <SectionHeader
        eyebrow={content.eyebrow}
        heading={content.heading}
        subtitle={content.subtitle}
        align="left"
        mb="mb-10"
      />

      <div className="overflow-hidden rounded-[2rem] border border-ff-border bg-white shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
        <div className="hidden grid-cols-[220px_minmax(0,1fr)_minmax(0,1fr)] border-b border-ff-border bg-ff-surface px-6 py-4 text-sm font-semibold text-ff-text md:grid">
          <span>{language === 'en' ? 'Category' : 'Categoria'}</span>
          <span>{language === 'en' ? 'First Fund' : 'First Fund'}</span>
          <span>{language === 'en' ? 'Typical bank path' : 'Ruta bancaria tipica'}</span>
        </div>

        {content.rows.map((row, index) => (
          <BlurFade
            key={row.label}
            delay={index * 0.05}
            className="border-b border-ff-border last:border-b-0"
          >
            <div className="grid gap-4 px-6 py-6 md:grid-cols-[220px_minmax(0,1fr)_minmax(0,1fr)]">
              <div className="text-sm font-semibold uppercase tracking-[0.08em] text-ff-accent">
                {row.label}
              </div>
              <div className="rounded-2xl border border-ff-border-blue bg-ff-raised px-4 py-4 text-sm leading-7 text-ff-text">
                {row.firstFund}
              </div>
              <div className="rounded-2xl border border-ff-border bg-ff-surface px-4 py-4 text-sm leading-7 text-ff-muted">
                {row.bank}
              </div>
            </div>
          </BlurFade>
        ))}
      </div>
    </SectionWrapper>
  )
}
