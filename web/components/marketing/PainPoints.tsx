'use client'

import Link from 'next/link'
import SectionWrapper from '@/components/layout/SectionWrapper'
import SectionHeader from '@/components/ui/SectionHeader'
import BlurFade from '@/components/motion/BlurFade'
import { useLanguage } from '@/contexts/LanguageContext'
import { getHomeFunnelContent } from '@/lib/home-funnel'

export default function PainPoints() {
  const { language } = useLanguage()
  const content = getHomeFunnelContent(language).painPoints

  return (
    <SectionWrapper id="pain-points" size="md" bg="bg-ff-surface border-t border-ff-border">
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
            <article className="h-full rounded-[1.75rem] border border-ff-border bg-white p-7 shadow-[0_14px_36px_rgba(15,23,42,0.05)]">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-ff-raised text-sm font-bold text-ff-accent">
                0{index + 1}
              </span>
              <h3 className="mt-5 font-heading text-2xl font-bold text-ff-text">
                {card.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-ff-muted">{card.description}</p>
            </article>
          </BlurFade>
        ))}
      </div>

      <BlurFade className="mt-8" delay={0.16}>
        <Link href="/book-a-call" className="btn-secondary">
          {language === 'en' ? 'Talk Through My Situation' : 'Hablar sobre mi situacion'}
        </Link>
      </BlurFade>
    </SectionWrapper>
  )
}
