'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import GridPattern from '@/components/motion/GridPattern'
import ShimmerBadge from '@/components/motion/ShimmerBadge'
import NumberTicker from '@/components/motion/NumberTicker'

const STAT_VALUES = [
  { num: 800, suffix: 'K+', prefix: '$' },
  { num: 48,  suffix: 'hr' },
  { num: 95,  suffix: '%' },
  { num: 6,   suffix: '' },
]

export default function Hero() {
  const { t } = useLanguage()

  return (
    <section
      id="hero"
      className="hero-pull relative flex flex-col bg-ff-dark-section overflow-hidden"
    >
      <video
        src="/video/who_we_serve_optimized_fs.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden="true"
      />

      <div className="absolute inset-0 bg-ff-dark-section/70" />
      <div className="absolute inset-0 bg-gradient-to-b from-ff-dark-section/35 to-ff-dark-section/80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(var(--ff-accent-rgb),0.28),_transparent_52%)]" />
      <GridPattern opacity={0.14} />

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

          {/* Headline — each line enters independently */}
          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl font-extrabold text-white leading-[1.08] tracking-tight mb-6 overflow-hidden">
            {t.hero.headline.split('\n').map((line, i) => (
              <motion.span
                key={i}
                className="block"
                initial={{ opacity: 0, y: 32, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                {i === 0 ? line : <span className="text-ff-border-blue">{line}</span>}
              </motion.span>
            ))}
          </h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-white text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
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
              className="inline-flex items-center gap-2 bg-white/6 border border-white/25 text-white font-semibold text-base px-8 py-4 rounded-full hover:border-white/55 hover:bg-white/10 transition-all"
            >
              {t.hero.ctaSecondary}
            </Link>
          </motion.div>

          {/* Stats card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-14 bg-white/10 border border-white/14 rounded-2xl overflow-hidden shadow-[0_20px_70px_rgba(8,17,31,0.45)]"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
              {STAT_VALUES.map((stat, i) => (
                <div key={i} className="flex flex-col items-center justify-center py-7 px-4 text-center">
                  <span className="font-heading text-2xl md:text-3xl font-extrabold text-white mb-1">
                    <NumberTicker
                      value={stat.num}
                      prefix={stat.prefix ?? ''}
                      suffix={stat.suffix}
                      duration={1600}
                    />
                  </span>
                  <span className="text-white/65 text-xs font-medium">{t.heroStats[i].label}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
