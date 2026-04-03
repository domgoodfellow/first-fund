'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PageHero from '@/components/layout/PageHero'
import ServiceCardGrid from '@/components/services/ServiceCardGrid'
import ServiceComparisonTable from '@/components/services/ServiceComparisonTable'
import CTASection from '@/components/marketing/CTASection'
import BlurFade from '@/components/motion/BlurFade'
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
      <section className="py-16 md:py-20 bg-ff-surface">
        <div className="section-container px-4 sm:px-6">
          <BlurFade className="text-center mb-12">
            <span className="eyebrow">{p.grid.eyebrow}</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-ff-text">
              {p.grid.heading}
            </h2>
          </BlurFade>
          <ServiceCardGrid
            services={SERVICES.map((s) => {
              const item = t.services.items.find((i) => i.abbr === s.abbr)
              return item ? { ...s, title: item.title, desc: item.desc, badge: item.badge } : s
            })}
            applyLabel={t.services.apply}
            learnMoreLabel={t.services.learnMore}
          />
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-16 md:py-20 bg-ff-bg">
        <div className="section-container px-4 sm:px-6">
          <BlurFade className="text-center mb-10">
            <span className="eyebrow">{p.comparison.eyebrow}</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-ff-text mb-3">
              {p.comparison.heading}
            </h2>
            <p className="text-ff-muted max-w-xl mx-auto">{p.comparison.text}</p>
          </BlurFade>
          <ServiceComparisonTable />
        </div>
      </section>

      {/* Not sure block */}
      <section className="py-14 bg-ff-surface border-y border-ff-border">
        <div className="section-container px-4 sm:px-6">
          <BlurFade className="max-w-2xl mx-auto text-center">
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-ff-text mb-3">
              {p.notSure.heading}
            </h3>
            <p className="text-ff-muted mb-6">{p.notSure.text}</p>
            <a
              href="/book-a-call"
              className="inline-flex items-center gap-2 bg-ff-accent text-white font-bold text-base px-8 py-3 rounded-full hover:bg-ff-glow transition-all shadow-[0_1px_3px_rgba(30,64,175,0.3)]"
            >
              {p.notSure.cta}
            </a>
          </BlurFade>
        </div>
      </section>

      <CTASection
        heading={p.cta.heading}
        subheading={p.cta.subheading}
      />

      <Footer />
    </main>
  )
}
