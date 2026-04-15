'use client'

import FAQAccordion from '@/components/content/FAQAccordion'
import { useLanguage } from '@/contexts/LanguageContext'
import { getHomeFunnelContent } from '@/lib/home-funnel'
import SectionWrapper from '@/components/layout/SectionWrapper'
import SectionHeader from '@/components/ui/SectionHeader'

export default function HomepageFAQ() {
  const { language } = useLanguage()
  const content = getHomeFunnelContent(language).faq

  return (
    <SectionWrapper id="faq" size="md" bg="bg-ff-bg">
      <SectionHeader
        eyebrow={content.eyebrow}
        heading={content.heading}
        align="left"
        mb="mb-10"
      />

      <div className="mx-auto max-w-3xl">
        <FAQAccordion items={[...content.items]} />
      </div>
    </SectionWrapper>
  )
}
