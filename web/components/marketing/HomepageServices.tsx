'use client'

import ServiceCardGrid from '@/components/services/ServiceCardGrid'
import { SERVICES } from '@/lib/services-data'
import { useLanguage } from '@/contexts/LanguageContext'
import BlurFade from '@/components/motion/BlurFade'

export default function HomepageServices() {
  const { t } = useLanguage()

  return (
    <section id="services" className="py-20 md:py-28 bg-ff-bg">
      <div className="section-container px-4 sm:px-6">
        <BlurFade className="text-center mb-14">
          <span className="eyebrow">{t.services.sectionLabel}</span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-ff-text mb-4">
            {t.services.heading}
          </h2>
          <p className="text-ff-muted max-w-xl mx-auto text-base">{t.services.sub}</p>
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
  )
}
