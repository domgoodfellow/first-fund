'use client'

import FAQAccordion from '@/components/content/FAQAccordion'
import BlurFade from '@/components/motion/BlurFade'
import { useLanguage } from '@/contexts/LanguageContext'

export default function HomepageFAQ() {
  const { t } = useLanguage()

  return (
    <section className="py-20 md:py-28 bg-ff-surface">
      <div className="section-container px-4 sm:px-6">
        <BlurFade className="text-center mb-12">
          <span className="eyebrow">{t.homepageFAQ.eyebrow}</span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-ff-text">
            {t.homepageFAQ.heading}
          </h2>
        </BlurFade>

        <div className="max-w-3xl mx-auto">
          <FAQAccordion items={[...t.homepageFAQ.items]} />
        </div>
      </div>
    </section>
  )
}
