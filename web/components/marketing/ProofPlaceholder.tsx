'use client'

import SectionWrapper from '@/components/layout/SectionWrapper'
import SectionHeader from '@/components/ui/SectionHeader'
import BlurFade from '@/components/motion/BlurFade'
import { useLanguage } from '@/contexts/LanguageContext'
import { getHomeFunnelContent } from '@/lib/home-funnel'

export default function ProofPlaceholder() {
  const { language } = useLanguage()
  const content = getHomeFunnelContent(language).proof

  return (
    <SectionWrapper id="proof" size="md" bg="bg-ff-surface border-y border-ff-border">
      <SectionHeader
        eyebrow={content.eyebrow}
        heading={content.heading}
        subtitle={content.subtitle}
        align="left"
        mb="mb-10"
      />

      <div className="grid gap-6 md:grid-cols-3">
        {content.cards.map((card, index) => (
          <BlurFade key={card.title} delay={index * 0.08}>
            <article className="h-full rounded-[1.75rem] border border-dashed border-ff-border-strong bg-ff-surface p-7">
              <h3 className="mt-5 font-heading text-2xl font-bold text-ff-text">
                {card.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-ff-muted">{card.description}</p>
            </article>
          </BlurFade>
        ))}
      </div>
    </SectionWrapper>
  )
}
