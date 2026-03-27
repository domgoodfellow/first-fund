'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
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
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (video.readyState >= 2) {
            video.play().catch(() => {})
          } else {
            video.addEventListener('canplay', () => video.play().catch(() => {}), { once: true })
          }
        } else {
          video.pause()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="cta" className="snap-section md:min-h-screen relative overflow-hidden flex flex-col justify-center">
      {/* Padded background video */}
      <video
        ref={videoRef}
        src="/video/hero.mp4"
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-4 md:inset-8 w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] h-[calc(100%-2rem)] md:h-[calc(100%-4rem)] object-cover rounded-2xl"
      />

      {/* Dark overlay so text stays readable */}
      <div className="absolute inset-4 md:inset-8 rounded-2xl bg-black/60" />

      {/* Accent glow on top of overlay */}
      <div
        className="absolute inset-4 md:inset-8 rounded-2xl opacity-[0.08] pointer-events-none"
        style={{ background: 'radial-gradient(circle at 50% 50%, var(--ff-accent) 0%, transparent 60%)' }}
      />

      {/* CTA content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center py-20 md:py-0">
        <motion.div
          variants={content}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5, margin: '0px 0px -60px 0px' }}
        >
          <h2 className="font-heading text-4xl md:text-5xl font-extrabold text-white mb-4">
            {t.cta.heading}
          </h2>
          <p className="text-white/70 text-lg mb-8">{t.cta.sub}</p>

          <Link
            href="/apply"
            className="inline-flex items-center gap-2 bg-ff-accent text-ff-bg font-bold text-base px-10 py-4 rounded-full hover:bg-ff-glow transition-colors animate-pulse-glow"
          >
            {t.cta.button}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>

          <p className="mt-4 text-white/50 text-xs">{t.cta.note}</p>
        </motion.div>
      </div>
    </section>
  )
}
