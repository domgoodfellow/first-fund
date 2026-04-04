'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import BlurFade from '@/components/motion/BlurFade'
import SectionWrapper from '@/components/layout/SectionWrapper'
import SectionHeader from '@/components/ui/SectionHeader'
import IconBadge from '@/components/ui/IconBadge'

const STEP_ICONS = [
  <svg key="1" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
  </svg>,
  <svg key="2" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>,
  <svg key="3" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
  <svg key="4" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>,
]

export default function HowItWorks() {
  const { t } = useLanguage()

  return (
    <SectionWrapper id="how-it-works" size="lg" bg="bg-ff-surface">
      <SectionHeader
        eyebrow={t.howItWorks.sectionLabel}
        heading={t.howItWorks.heading}
        mb="mb-16"
      />

      <div className="relative">
        {/* Connecting line — desktop only */}
        <div className="hidden md:block absolute top-[3.25rem] left-0 right-0 h-px bg-ff-border" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 relative">
          {t.howItWorks.steps.map((s, i) => (
            <BlurFade key={i} delay={i * 0.12} className="flex flex-col items-center text-center">
              <div className="relative mb-8 z-10">
                <IconBadge size="lg" className="rounded-full border-2 border-ff-border-blue shadow-[0_1px_4px_rgba(15,23,42,0.06)]">
                  {STEP_ICONS[i]}
                </IconBadge>
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-ff-accent text-white text-xs font-extrabold flex items-center justify-center font-heading shadow-md">
                  {i + 1}
                </span>
              </div>
              <h3 className="font-heading font-bold text-ff-text text-lg mb-2">{s.title}</h3>
              <p className="text-ff-muted text-sm leading-relaxed max-w-[220px]">{s.desc}</p>
            </BlurFade>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
