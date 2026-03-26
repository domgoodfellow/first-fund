'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useCountry } from '@/contexts/CountryContext'
import FlickeringGrid from './FlickeringGrid'
export default function Hero() {
  const { t } = useCountry()
  const stats = [t.stats.item1, t.stats.item2, t.stats.item3, t.stats.item4]

  return (
    <section
      id="hero"
      className="snap-section relative min-h-screen flex flex-col bg-ff-bg pt-16 overflow-hidden"
    >
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
          style={{ bottom: '20%', right: '-5%' }}
          animate={{ x: [0, -30, 0], y: [0, 25, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        <FlickeringGrid
          className="absolute inset-0"
          squareSize={8}
          gridGap={13}
          flickerChance={0.05}
          color="#93c5fd"
          cursorColor="#ef4444"
          cursorRadius={130}
          maxOpacity={0.2}
        />
      </div>

      {/* All content vertically centered — background shows naturally above and below */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6">
        <div className="w-full max-w-5xl mx-auto text-center">

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

          {/* Stats card — inside the centered block so background shows below */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-14 bg-ff-surface border border-ff-border rounded-2xl overflow-hidden py-2"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-ff-border">
              {stats.map((stat, i) => (
                <div key={i} className="flex flex-col items-center justify-center py-6 px-4 text-center">
                  <span className="font-heading text-2xl md:text-3xl font-extrabold text-ff-accent mb-1">
                    {stat.value}
                  </span>
                  <span className="text-ff-muted text-xs font-medium">{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>

    </section>
  )
}
