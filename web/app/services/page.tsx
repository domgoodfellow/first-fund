'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PageHero from '@/components/layout/PageHero'
import SectionWrapper from '@/components/layout/SectionWrapper'
import SectionHeader from '@/components/ui/SectionHeader'
import ServiceCardGrid from '@/components/services/ServiceCardGrid'
import ServiceComparisonTable from '@/components/services/ServiceComparisonTable'
import CTASection from '@/components/marketing/CTASection'
import BlurFade from '@/components/motion/BlurFade'
import Link from 'next/link'
import { SERVICES } from '@/lib/services-data'
import { useLanguage } from '@/contexts/LanguageContext'

export default function ServicesPage() {
  const { t } = useLanguage()
  const p = t.servicesPage

  return (
    <main className="bg-ff-bg min-h-screen">
      <Navbar />

      <PageHero
        badge={p.badge}
        title={p.title}
        subtitle={p.subtitle}
        ctas={[
          { label: t.serviceTemplate.applyNow, href: '/apply' },
          { label: t.serviceTemplate.bookACall, href: '/book-a-call', variant: 'secondary' },
        ]}
      />

      {/* Services grid */}
      <SectionWrapper size="md" bg="bg-ff-surface">
        <SectionHeader
          eyebrow={p.grid.eyebrow}
          heading={p.grid.heading}
          size="md"
          mb="mb-12"
        />
        <ServiceCardGrid
          services={SERVICES.map((s) => {
            const item = t.services.items.find((i) => i.abbr === s.abbr)
            return item ? { ...s, title: item.title, desc: item.desc, badge: item.badge } : s
          })}
          applyLabel={t.services.apply}
          learnMoreLabel={t.services.learnMore}
        />
      </SectionWrapper>

      {/* Comparison table */}
      <SectionWrapper size="md" bg="bg-ff-bg">
        <SectionHeader
          eyebrow={p.comparison.eyebrow}
          heading={p.comparison.heading}
          subtitle={p.comparison.text}
          size="md"
          mb="mb-10"
        />
        <ServiceComparisonTable />
      </SectionWrapper>

      {/* Not sure strip */}
      <SectionWrapper size="sm" bg="bg-ff-surface border-y border-ff-border">
        <BlurFade className="cta-copy-width text-center">
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-ff-text mb-3">
            {p.notSure.heading}
          </h3>
          <p className="text-ff-muted mb-6">{p.notSure.text}</p>
          <Link
            href="/book-a-call"
            className="inline-flex items-center gap-2 bg-ff-accent text-white font-bold text-base px-8 py-3.5 rounded-full hover:bg-ff-glow transition-all shadow-[0_1px_4px_rgba(30,64,175,0.3)]"
          >
            {p.notSure.cta}
          </Link>
        </BlurFade>
      </SectionWrapper>

      <CTASection
        heading={p.cta.heading}
        subheading={p.cta.subheading}
      />

      <Footer />
    </main>
  )
}
