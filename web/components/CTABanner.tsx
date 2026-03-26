'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useCountry } from '@/contexts/CountryContext'

const content = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] },
  },
}

export default function CTABanner() {
  const { t } = useCountry()

  return (
    <section id="cta" className="snap-section md:min-h-screen flex flex-col justify-center py-20 md:py-0 bg-ff-surface border-y border-ff-border overflow-hidden relative">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{ background: 'radial-gradient(circle at 50% 50%, #00a73e 0%, transparent 60%)' }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          variants={content}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5, margin: '0px 0px -60px 0px' }}
        >
          <h2 className="font-heading text-4xl md:text-5xl font-extrabold text-white mb-4">
            {t.cta.heading}
          </h2>
          <p className="text-ff-muted text-lg mb-8">{t.cta.sub}</p>

          <Link
            href="/apply"
            className="inline-flex items-center gap-2 bg-ff-accent text-ff-bg font-bold text-base px-10 py-4 rounded-full hover:bg-ff-glow transition-colors animate-pulse-glow"
          >
            {t.cta.button}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>

          <p className="mt-4 text-ff-muted text-xs">{t.cta.note}</p>
        </motion.div>
      </div>
    </section>
  )
}
