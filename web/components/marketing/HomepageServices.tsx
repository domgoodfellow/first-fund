'use client'

import ServiceCardGrid from '@/components/services/ServiceCardGrid'
import { SERVICES } from '@/lib/services-data'
import { useLanguage } from '@/contexts/LanguageContext'
import SectionWrapper from '@/components/layout/SectionWrapper'
import SectionHeader from '@/components/ui/SectionHeader'

export default function HomepageServices() {
  const { t } = useLanguage()

  return (
    <SectionWrapper id="services" size="lg" bg="bg-ff-bg">
      <SectionHeader
        eyebrow={t.services.sectionLabel}
        heading={t.services.heading}
        subtitle={t.services.sub}
        mb="mb-14"
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
  )
}
