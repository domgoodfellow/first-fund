'use client'

import BlurFade from '@/components/motion/BlurFade'
import SectionWrapper from '@/components/layout/SectionWrapper'
import SectionHeader from '@/components/ui/SectionHeader'
import { useLanguage } from '@/contexts/LanguageContext'
import { getHomeFunnelContent } from '@/lib/home-funnel'

export default function HowItWorks() {
  const { language } = useLanguage()
  const content = getHomeFunnelContent(language).howItWorks

  return (
    <SectionWrapper id="how-it-works" size="md" bg="bg-ff-surface border-y border-ff-border">
      <SectionHeader
        eyebrow={content.eyebrow}
        heading={content.heading}
        align="left"
        mb="mb-10"
      />

      <div className="grid gap-6 md:grid-cols-3">
        {content.steps.map((step, index) => (
          <BlurFade key={step.title} delay={index * 0.08}>
            <article className="relative h-full rounded-[1.8rem] border border-ff-border bg-white p-7 shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ff-accent text-lg font-extrabold text-white">
                {index + 1}
              </div>
              <h3 className="mt-6 font-heading text-3xl font-bold text-ff-text">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-ff-muted">
                {step.description}
              </p>
            </article>
          </BlurFade>
        ))}
      </div>
    </SectionWrapper>
  )
}
