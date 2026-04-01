'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function CTABanner() {
  const { t } = useLanguage()
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
    <section id="cta" className="relative py-6 md:py-10 bg-ff-surface overflow-hidden">
      {/* Padded background video */}
      <div className="section-container px-4 sm:px-6">
        <div className="relative rounded-2xl overflow-hidden min-h-[480px] md:min-h-[560px] flex items-center justify-center">
          <video
            ref={videoRef}
            src="/video/hero.mp4"
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/65" />

          {/* Blue accent glow */}
          <div
            className="absolute inset-0 opacity-[0.12] pointer-events-none"
            style={{ background: 'radial-gradient(circle at 50% 50%, #1E40AF 0%, transparent 60%)' }}
          />

          {/* Content */}
          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="font-heading text-4xl md:text-5xl font-extrabold text-white mb-4">
                {t.cta.heading}
              </h2>
              <p className="text-white/70 text-lg mb-8">{t.cta.sub}</p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/apply"
                  className="inline-flex items-center gap-2 bg-ff-accent text-white font-bold text-base px-10 py-4 rounded-full hover:bg-ff-glow transition-all shadow-[0_1px_3px_rgba(30,64,175,0.4)]"
                >
                  {t.cta.button}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/book-a-call"
                  className="inline-flex items-center gap-2 bg-transparent border border-white/30 text-white font-semibold text-base px-10 py-4 rounded-full hover:border-white/60 transition-all"
                >
                  Book a Call
                </Link>
              </div>

              <p className="mt-4 text-white/40 text-xs">{t.cta.note}</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
