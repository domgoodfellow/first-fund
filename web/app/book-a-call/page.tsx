'use client'

import MarketingShell from '@/components/layout/MarketingShell'
import PageHero from '@/components/layout/PageHero'
import SectionWrapper from '@/components/layout/SectionWrapper'
import IconBadge from '@/components/ui/IconBadge'
import BookingForm from '@/components/forms/BookingForm'
import CTASection from '@/components/marketing/CTASection'
import BlurFade from '@/components/motion/BlurFade'
import { useLanguage } from '@/contexts/LanguageContext'

const BENEFIT_ICONS = [
  <svg key="0" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>,
  <svg key="1" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>,
  <svg key="2" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
]

export default function BookACallPage() {
  const { t } = useLanguage()
  const p = t.bookACallPage

  return (
    <MarketingShell>
      <PageHero
        badge={p.badge}
        title={p.title}
        subtitle={p.subtitle}
      />

      {/* Benefits strip */}
      <SectionWrapper size="sm" bg="bg-ff-surface border-y border-ff-border">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {p.benefits.map((b, i) => (
            <BlurFade key={i} delay={i * 0.1} className="flex flex-col items-center text-center gap-3">
              <IconBadge size="md" variant="default">
                {BENEFIT_ICONS[i]}
              </IconBadge>
              <div>
                <h3 className="font-heading font-bold text-ff-text text-base mb-1">{b.title}</h3>
                <p className="text-ff-muted text-sm">{b.desc}</p>
              </div>
            </BlurFade>
          ))}
        </div>
      </SectionWrapper>

      {/* Booking form */}
      <SectionWrapper size="md" bg="bg-ff-bg">
        <BlurFade className="text-center mb-10">
          <h2 className="font-heading text-3xl font-bold text-ff-text mb-2">{p.formHeading}</h2>
          <p className="text-ff-muted text-sm">{p.formSubheading}</p>
        </BlurFade>
        <BookingForm />
      </SectionWrapper>

      <CTASection
        heading={p.cta.heading}
        subheading={p.cta.subheading}
        primaryLabel={p.cta.primaryLabel}
        primaryHref="/apply"
        secondaryLabel={p.cta.secondaryLabel}
        secondaryHref="/"
      />

    </MarketingShell>
  )
}
