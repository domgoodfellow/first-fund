'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PageHero from '@/components/layout/PageHero'
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

      <section className="py-16 md:py-20 bg-ff-bg">
        <div className="section-container px-4 sm:px-6 max-w-3xl mx-auto space-y-14">
          {p.categories.map((cat, i) => (
            <BlurFade key={cat.heading} delay={i * 0.05}>
              <div>
                <h2 className="font-heading text-xl font-bold text-ff-text mb-5 pb-3 border-b border-ff-border">
                  {cat.heading}
                </h2>
                <FAQAccordion items={[...cat.items]} />
              </div>
            </BlurFade>
          ))}
        </div>
      </section>

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
