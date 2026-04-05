'use client'

import MarketingShell from '@/components/layout/MarketingShell'
import PageHero from '@/components/layout/PageHero'
import SectionWrapper from '@/components/layout/SectionWrapper'
import IconBadge from '@/components/ui/IconBadge'
import ContactForm from '@/components/forms/ContactForm'
import CTASection from '@/components/marketing/CTASection'
import BlurFade from '@/components/motion/BlurFade'
import { useLanguage } from '@/contexts/LanguageContext'

export default function ContactPage() {
  const { t } = useLanguage()
  const p = t.contactPage

  const methods = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      label: p.methodLabels.email,
      value: 'info@firstfund.com',
      href: 'mailto:info@firstfund.com',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      label: p.methodLabels.phone,
      value: '+1 (555) 000-0000',
      href: 'tel:+15550000000',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: p.methodLabels.hours,
      value: p.hoursValue,
      href: null,
    },
  ]

  return (
    <MarketingShell>
      <PageHero
        badge={p.badge}
        title={p.title}
        subtitle={p.subtitle}
      />

      {/* Contact methods strip */}
      <SectionWrapper size="sm" bg="bg-ff-surface border-y border-ff-border">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {methods.map((m, i) => (
            <BlurFade key={m.label} delay={i * 0.1} className="flex flex-col items-center text-center gap-3">
              <IconBadge size="md" variant="default">
                {m.icon}
              </IconBadge>
              <div>
                <p className="text-ff-muted text-xs font-semibold uppercase tracking-wide mb-1">{m.label}</p>
                {m.href ? (
                  <a href={m.href} className="text-ff-text text-sm font-medium hover:text-ff-accent transition-colors">
                    {m.value}
                  </a>
                ) : (
                  <p className="text-ff-text text-sm font-medium">{m.value}</p>
                )}
              </div>
            </BlurFade>
          ))}
        </div>
      </SectionWrapper>

      {/* Contact form */}
      <SectionWrapper size="md" bg="bg-ff-bg">
        <div className="max-w-2xl mx-auto">
          <BlurFade className="mb-10">
            <h2 className="font-heading text-3xl font-bold text-ff-text mb-2">{p.formHeading}</h2>
            <p className="text-ff-muted text-sm">{p.formSubheading}</p>
          </BlurFade>
          <ContactForm />
        </div>
      </SectionWrapper>

      <CTASection
        heading={p.cta.heading}
        subheading={p.cta.subheading}
        primaryLabel={p.cta.primaryLabel}
        primaryHref="/apply"
        secondaryLabel={p.cta.secondaryLabel}
        secondaryHref="/book-a-call"
      />

    </MarketingShell>
  )
}
