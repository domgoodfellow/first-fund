'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useCountry } from '@/contexts/CountryContext'

const STEP_ICONS = [
  // Clipboard / form
  <svg key="1" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
  </svg>,
  // Search / review
  <svg key="2" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>,
  // Checkmark / offer
  <svg key="3" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
  // Lightning / funded
  <svg key="4" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>,
]

export default function HowItWorks() {
  const { t } = useCountry()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="how-it-works" className="py-24 bg-ff-bg" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-ff-accent text-xs font-semibold uppercase tracking-widest mb-3 block">
            {t.howItWorks.sectionLabel}
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-extrabold text-white">
            {t.howItWorks.heading}
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-10 left-0 right-0 h-px bg-ff-border" style={{ top: '2.5rem' }} />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {t.howItWorks.steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="flex flex-col items-center text-center relative"
              >
                {/* Step number + icon */}
                <div className="relative mb-6 z-10">
                  <motion.div
                    animate={isInView ? { boxShadow: ['0 0 0px rgba(34,197,94,0)', '0 0 25px rgba(34,197,94,0.4)', '0 0 0px rgba(34,197,94,0)'] } : {}}
                    transition={{ duration: 2, delay: i * 0.4 + 0.5, repeat: 1 }}
                    className="w-20 h-20 rounded-full bg-ff-surface border-2 border-ff-accent flex items-center justify-center text-ff-accent"
                  >
                    {STEP_ICONS[i]}
                  </motion.div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-ff-accent text-ff-bg text-xs font-extrabold flex items-center justify-center font-heading">
                    {i + 1}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-white text-lg mb-2">{step.title}</h3>
                <p className="text-ff-muted text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
