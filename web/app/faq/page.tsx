'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PageHero from '@/components/layout/PageHero'
import SectionWrapper from '@/components/layout/SectionWrapper'
import FAQAccordion from '@/components/content/FAQAccordion'
import CTASection from '@/components/marketing/CTASection'
import BlurFade from '@/components/motion/BlurFade'
import { useLanguage } from '@/contexts/LanguageContext'

export default function FAQPage() {
  const { t } = useLanguage()
  const p = t.faqPage

  return (
    <main className="bg-ff-bg min-h-screen">
      <Navbar />

      <PageHero
        badge={p.badge}
        title={p.title}
        subtitle={p.subtitle}
      />

      <SectionWrapper size="md" bg="bg-ff-bg">
        <div className="prose-section space-y-14">
          {p.categories.map((cat, i) => (
            <BlurFade key={cat.heading} delay={i * 0.05}>
              <div>
                <h2 className="font-heading text-lg font-bold text-ff-text mb-5 pb-3 border-b border-ff-border flex items-center gap-2">
                  <span className="w-1.5 h-5 rounded-full bg-ff-accent inline-block shrink-0" />
                  {cat.heading}
                </h2>
                <FAQAccordion items={[...cat.items]} />
              </div>
            </BlurFade>
          ))}
        </div>
      </SectionWrapper>

      <CTASection
        heading={p.cta.heading}
        subheading={p.cta.subheading}
        primaryLabel={p.cta.primaryLabel}
        primaryHref="/book-a-call"
        secondaryLabel={p.cta.secondaryLabel}
        secondaryHref="/apply"
      />

      <Footer />
    </main>
  )
}
