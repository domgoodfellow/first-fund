'use client'

import MarketingShell from '@/components/layout/MarketingShell'
import PageHero from '@/components/layout/PageHero'
import SectionWrapper from '@/components/layout/SectionWrapper'
import FAQAccordion from '@/components/content/FAQAccordion'
import CTASection from '@/components/marketing/CTASection'
import { useLanguage } from '@/contexts/LanguageContext'
import { getHomeFunnelContent } from '@/lib/home-funnel'

export default function FAQPageClient() {
  const { language } = useLanguage()
  const content = getHomeFunnelContent(language)

  return (
    <MarketingShell>
      <PageHero
        badge={content.faq.eyebrow}
        title={language === 'en' ? 'Questions Answered\nBefore You Apply' : 'Preguntas resueltas\nantes de aplicar'}
        subtitle={
          language === 'en'
            ? 'Clear answers about the main funding paths, timing, and what to do next.'
            : 'Respuestas claras sobre las rutas principales de financiamiento, los tiempos y el siguiente paso.'
        }
      />

      <SectionWrapper size="md" bg="bg-ff-bg">
        <div className="prose-section">
          <FAQAccordion items={[...content.faq.items]} />
        </div>
      </SectionWrapper>

      <CTASection contentKey="homeFunnel" />
    </MarketingShell>
  )
}
