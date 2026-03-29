'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'

const STEP_ICONS = [
  <svg key="1" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
  </svg>,
  <svg key="2" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>,
  <svg key="3" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
  <svg key="4" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>,
]

const header = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const stepsContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.2 } },
}

const step = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function HowItWorks() {
  const { t } = useLanguage()

  return (
    <section
      id="how-it-works"
      className="snap-section min-h-screen flex flex-col justify-center py-14 md:py-24 bg-ff-bg"
    >
      <div className="section-container px-4 sm:px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={header}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.6, margin: '0px 0px -60px 0px' }}
        >
          <span className="text-ff-accent text-xs font-semibold uppercase tracking-widest mb-3 block">
            {t.howItWorks.sectionLabel}
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-extrabold text-white">
            {t.howItWorks.heading}
          </h2>
        </motion.div>

        {/* Steps — locked at max 1100px so it looks identical to your screenshot even at 2560px */}
        <div className="relative">
          {/* Connecting line (exactly like your screenshot) */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-ff-border" />

          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 relative"
            variants={stepsContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.4, margin: '0px 0px -60px 0px' }}
          >
            {t.howItWorks.steps.map((s, i) => (
              <motion.div
                key={i}
                variants={step}
                className="flex flex-col items-center text-center relative"
              >
                <div className="relative mb-8 z-10">
                  {/* Circle with accent border */}
                  <div className="w-24 h-24 rounded-full bg-ff-surface border-4 border-ff-accent flex items-center justify-center text-ff-accent">
                    {STEP_ICONS[i]}
                  </div>
                  {/* Red number badge */}
                  <span className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-ff-accent text-ff-bg text-sm font-extrabold flex items-center justify-center font-heading shadow-md">
                    {i + 1}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-white text-lg mb-2">{s.title}</h3>
                <p className="text-ff-muted text-sm leading-relaxed max-w-[220px]">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}