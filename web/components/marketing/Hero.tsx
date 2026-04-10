'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
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
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoReady, setVideoReady] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  // Defer video mount until after page load + entrance animations (~1.5s)
  useEffect(() => {
    const load = () => setTimeout(() => setVideoReady(true), 1500)
    if (document.readyState === 'complete') {
      load()
    } else {
      window.addEventListener('load', load, { once: true })
      return () => window.removeEventListener('load', load)
    }
  }, [])

  // Once mounted, ensure playback starts (handles mobile autoplay policy)
  useEffect(() => {
    if (!videoReady) return
    const video = videoRef.current
    if (!video) return
    const tryPlay = () => video.play().catch(() => {})
    tryPlay()
    document.addEventListener('touchstart', tryPlay, { once: true })
    return () => document.removeEventListener('touchstart', tryPlay)
  }, [videoReady])

  // Entrance animation variants — skipped entirely when reduced-motion is on
  const fadeUp = shouldReduceMotion
    ? {}
    : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 } }

  const fadeUpBlur = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 32, filter: 'blur(6px)' },
        animate:  { opacity: 1, y: 0,  filter: 'blur(0px)' },
      }

  return (
    <section
      id="hero"
      className="hero-pull relative flex flex-col bg-ff-dark-section overflow-hidden"
    >
      {/* Video — desktop only, lazy-mounted after load */}
      {videoReady && (
        <video
          ref={videoRef}
          src="/video/who_we_serve_optimized_fs.mp4"
          poster="/video/poster.jpg"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="hidden md:block absolute inset-0 h-full w-full object-cover animate-fade-in"
          aria-hidden="true"
        />
      )}

      {/* Overlays: solid base + brand-tinted gradient (tint sits mid/bottom, never over headline) */}
      <div className="absolute inset-0 bg-[#08111f]/45" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#08111f]/25 via-[#0d1b35]/20 to-[#08111f]/48" />

      {/* Orbs — desktop only, motion-aware */}
      {!shouldReduceMotion && (
        <div className="hidden md:block absolute inset-0 pointer-events-none">
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
      )}

      <div className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6">
        <div className="w-full max-w-5xl mx-auto text-center">

          {/* Badge */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5 }}
            className="mb-6 md:mb-8"
          >
            <ShimmerBadge>{t.hero.badge}</ShimmerBadge>
          </motion.div>

          {/* Headline */}
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.08] tracking-tight mb-5 md:mb-6 overflow-hidden [text-shadow:0_2px_16px_rgba(0,0,0,0.6)]">
            {t.hero.headline.split('\n').map((line, i) => (
              <motion.span
                key={i}
                className="block"
                {...fadeUpBlur}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                {i === 0 ? line : <span className="text-ff-border-blue">{line}</span>}
              </motion.span>
            ))}
          </h1>

          {/* Sub — clamped to 2 lines on mobile */}
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-white/80 text-base md:text-xl max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed line-clamp-2 md:line-clamp-none [text-shadow:0_1px_8px_rgba(0,0,0,0.5)]"
          >
            {t.hero.sub}
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.65, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4"
          >
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 bg-ff-accent text-white font-bold text-base px-8 py-4 rounded-full hover:bg-ff-glow transition-all shadow-[0_2px_12px_rgba(30,64,175,0.4)] group"
            >
              <span>{t.hero.cta}</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            {/* Secondary CTA — hidden on smallest screens */}
            <Link
              href="/book-a-call"
              className="hidden sm:inline-flex items-center gap-2 bg-white/8 backdrop-blur-sm border border-white/25 text-white font-semibold text-base px-8 py-4 rounded-full hover:bg-white/14 hover:border-white/40 transition-all"
            >
              {t.hero.ctaSecondary}
            </Link>
          </motion.div>

          {/* Stats card — desktop only */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.65, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="hidden md:block mt-14 bg-white/8 backdrop-blur-sm border border-ff-accent/30 rounded-2xl overflow-hidden shadow-[0_20px_70px_rgba(8,17,31,0.45)]"
          >
            <div className="grid grid-cols-4 divide-x divide-white/10">
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
                  <span className="text-white/70 text-xs font-medium">{t.heroStats[i].label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Stats — mobile inline strip (2 key stats only) */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.65, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden mt-8 flex items-center justify-center gap-8"
          >
            {STAT_VALUES.slice(0, 2).map((stat, i) => (
              <div key={i} className="text-center">
                <div className="font-heading text-2xl font-extrabold text-white">
                  {stat.prefix ?? ''}{stat.num}{stat.suffix}
                </div>
                <div className="text-white/60 text-xs mt-0.5">{t.heroStats[i].label}</div>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
