'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import BlurFade from '@/components/motion/BlurFade'

const STEP_ICONS = [
  <svg key="1" className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
  </svg>,
  <svg key="2" className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>,
  <svg key="3" className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
  <svg key="4" className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>,
]

export default function HowItWorks() {
  const { t } = useLanguage()

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-ff-surface">
      <div className="section-container px-4 sm:px-6">
        {/* Header */}
        <BlurFade className="text-center mb-16">
          <span className="eyebrow">{t.howItWorks.sectionLabel}</span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-ff-text">
            {t.howItWorks.heading}
          </h2>
        </BlurFade>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-[3.25rem] left-0 right-0 h-px bg-ff-border" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 relative">
            {t.howItWorks.steps.map((s, i) => (
              <BlurFade key={i} delay={i * 0.12} className="flex flex-col items-center text-center">
                <div className="relative mb-8 z-10">
                  <div className="w-[4.5rem] h-[4.5rem] rounded-full bg-ff-bg border-2 border-ff-border-blue flex items-center justify-center text-ff-accent shadow-[0_1px_4px_rgba(15,23,42,0.06)]">
                    {STEP_ICONS[i]}
                  </div>
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
      </div>
    </section>
  )
}
