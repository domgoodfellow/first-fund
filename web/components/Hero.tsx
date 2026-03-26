'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useCountry } from '@/contexts/CountryContext'

export default function Hero() {
  const { t } = useCountry()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-ff-bg pt-28">
      {/* Animated background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="hero-orb-1 absolute w-[600px] h-[600px] rounded-full"
          style={{ top: '10%', left: '-10%' }}
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="hero-orb-2 absolute w-[500px] h-[500px] rounded-full"
          style={{ bottom: '5%', right: '-5%' }}
          animate={{ x: [0, -30, 0], y: [0, 25, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(#00a73e 1px, transparent 1px), linear-gradient(90deg, #00a73e 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-ff-raised border border-ff-accent/30 text-ff-accent text-xs font-semibold px-4 py-2 rounded-full mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-ff-accent animate-pulse" />
          {t.hero.badge}
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-heading text-5xl sm:text-6xl md:text-7xl font-extrabold text-white leading-[1.1] tracking-tight mb-6"
        >
          {t.hero.headline.split('\n').map((line, i) => (
            <span key={i} className="block">
              {i === 0 ? line : <span className="text-gradient">{line}</span>}
            </span>
          ))}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-ff-muted text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {t.hero.sub}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/apply"
            className="relative inline-flex items-center gap-2 bg-ff-accent text-ff-bg font-bold text-base px-8 py-4 rounded-full hover:bg-ff-glow transition-colors animate-pulse-glow group"
          >
            <span>{t.hero.cta}</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link
            href="/#how-it-works"
            className="inline-flex items-center gap-2 bg-transparent border border-ff-border text-white font-semibold text-base px-8 py-4 rounded-full hover:border-ff-accent/50 hover:text-ff-accent transition-colors"
          >
            {t.hero.ctaSecondary}
          </Link>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-6 text-ff-muted text-xs"
        >
          {[
            { icon: '⚡', text: '24–48 Hr Decisions' },
            { icon: '🔓', text: 'No Collateral' },
            { icon: '💼', text: 'All Credit Profiles' },
            { icon: '🇺🇸🇨🇦', text: 'US & Canada' },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-1.5">
              <span>{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg className="w-5 h-5 text-ff-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </motion.div>
    </section>
  )
}
