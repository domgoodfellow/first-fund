'use client'

import FAQAccordion from '@/components/content/FAQAccordion'
import { useLanguage } from '@/contexts/LanguageContext'
import SectionWrapper from '@/components/layout/SectionWrapper'
import SectionHeader from '@/components/ui/SectionHeader'

export default function HomepageFAQ() {
  const { t } = useLanguage()

  return (
    <SectionWrapper size="lg" bg="bg-ff-surface">
      <SectionHeader
        eyebrow={t.homepageFAQ.eyebrow}
        heading={t.homepageFAQ.heading}
        mb="mb-12"
      />

      <div className="max-w-3xl mx-auto">
        <FAQAccordion items={[...t.homepageFAQ.items]} />
      </div>
    </SectionWrapper>
  )
}
