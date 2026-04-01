'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import GridPattern from '@/components/motion/GridPattern'
import ShimmerBadge from '@/components/motion/ShimmerBadge'
import NumberTicker from '@/components/motion/NumberTicker'

const STAT_VALUES = [
  { num: 800, suffix: 'K+', label: 'Max Funding', prefix: '$' },
  { num: 48,  suffix: 'hr', label: 'Approval Time' },
  { num: 95,  suffix: '%',  label: 'Approval Rate' },
  { num: 6,   suffix: '',   label: 'Products Available' },
]

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col bg-ff-bg overflow-hidden"
    >
      <GridPattern opacity={0.12} />

      {/* Blue accent orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="hero-orb-1 absolute w-[clamp(300px,30vw,600px)] h-[clamp(300px,30vw,600px)] rounded-full"
          style={{ top: '5%', left: '-8%' }}
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="hero-orb-2 absolute w-[clamp(250px,25vw,500px)] h-[clamp(250px,25vw,500px)] rounded-full"
          style={{ bottom: '20%', right: '-4%' }}
          animate={{ x: [0, -30, 0], y: [0, 25, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>

      <div className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6">
        <div className="w-full max-w-5xl mx-auto text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <ShimmerBadge>{t.hero.badge}</ShimmerBadge>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading text-5xl sm:text-6xl md:text-7xl font-extrabold text-ff-text leading-[1.08] tracking-tight mb-6"
          >
            {t.hero.headline.split('\n').map((line, i) => (
              <span key={i} className="block">
                {i === 0 ? line : <span className="text-gradient">{line}</span>}
              </span>
            ))}
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-ff-muted text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {t.hero.sub}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 bg-ff-accent text-white font-bold text-base px-8 py-4 rounded-full hover:bg-ff-glow transition-all shadow-[0_1px_3px_rgba(30,64,175,0.3)] group"
            >
              <span>{t.hero.cta}</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/book-a-call"
              className="inline-flex items-center gap-2 bg-transparent border border-ff-border-strong text-ff-text font-semibold text-base px-8 py-4 rounded-full hover:border-ff-accent hover:text-ff-accent transition-all"
            >
              {t.hero.ctaSecondary}
            </Link>
          </motion.div>

          {/* Stats card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-14 bg-ff-bg border border-ff-border rounded-2xl overflow-hidden shadow-[0_1px_4px_rgba(15,23,42,0.06)]"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-ff-border">
              {STAT_VALUES.map((stat, i) => (
                <div key={i} className="flex flex-col items-center justify-center py-7 px-4 text-center">
                  <span className="font-heading text-2xl md:text-3xl font-extrabold text-ff-accent mb-1">
                    <NumberTicker
                      value={stat.num}
                      prefix={stat.prefix ?? ''}
                      suffix={stat.suffix}
                      duration={1600}
                    />
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
