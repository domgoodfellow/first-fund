'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import ShimmerBadge from '@/components/motion/ShimmerBadge'
import { useLanguage } from '@/contexts/LanguageContext'
import {
  getHomeFunnelContent,
  type HeroMessageVariant,
  type HeroVisualVariant,
} from '@/lib/home-funnel'

interface HeroProps {
  messageVariant: HeroMessageVariant
  visualVariant: HeroVisualVariant
  showPreviewLabel?: boolean
}

function PreviewPill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-ff-border bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-ff-muted">
      {label}
    </span>
  )
}

export default function Hero({
  messageVariant,
  visualVariant,
  showPreviewLabel = false,
}: HeroProps) {
  const { language } = useLanguage()
  const content = getHomeFunnelContent(language)
  const message = content.hero.variants[messageVariant]
  const shouldReduceMotion = useReducedMotion()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoReady, setVideoReady] = useState(false)

  useEffect(() => {
    if (visualVariant !== 'video') return

    const load = () => setTimeout(() => setVideoReady(true), 400)
    if (document.readyState === 'complete') {
      load()
    } else {
      window.addEventListener('load', load, { once: true })
      return () => window.removeEventListener('load', load)
    }
  }, [visualVariant])

  useEffect(() => {
    if (!videoReady || visualVariant !== 'video') return
    const video = videoRef.current
    if (!video) return

    const tryPlay = () => video.play().catch(() => {})
    tryPlay()
    document.addEventListener('touchstart', tryPlay, { once: true })
    return () => document.removeEventListener('touchstart', tryPlay)
  }, [videoReady, visualVariant])

  const fadeUp = useMemo(
    () =>
      shouldReduceMotion
        ? {}
        : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } },
    [shouldReduceMotion],
  )

  const previewLabel = `${messageVariant} / ${visualVariant}`

  return (
    <section
      id="hero"
      className="hero-pull relative overflow-hidden bg-[#08111f]"
    >
      {visualVariant === 'video' && videoReady && (
        <video
          ref={videoRef}
          src="/video/who_we_serve_optimized_fs.mp4"
          poster="/video/poster.jpg"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden="true"
        />
      )}
      {visualVariant === 'video' && <div className="absolute inset-0 bg-[#08111f]/64" />}
      {visualVariant === 'video' && <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,17,31,0.92)_0%,rgba(8,17,31,0.82)_36%,rgba(8,17,31,0.58)_64%,rgba(8,17,31,0.78)_100%)]" />}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(96,165,250,0.22),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(37,99,235,0.18),_transparent_30%)]" />
      <div className="absolute inset-y-0 right-0 hidden w-[42%] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))] xl:block" />

      <div className="section-container relative z-10 px-4 pb-14 pt-28 sm:px-6 md:pb-16 md:pt-32">
        <div
          className={
            visualVariant === 'video'
              ? 'mx-auto max-w-4xl'
              : 'grid items-end gap-10 xl:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)] xl:gap-12'
          }
        >
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className={visualVariant === 'video' ? 'mx-auto max-w-4xl text-center' : 'max-w-2xl'}
          >
            <div className={`mb-5 flex flex-wrap items-center gap-3 ${visualVariant === 'video' ? 'justify-center' : ''}`}>
              <ShimmerBadge className="border-white/15 bg-white/10 text-white">
                {message.badge}
              </ShimmerBadge>
              {showPreviewLabel ? <PreviewPill label={previewLabel} /> : null}
            </div>

            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-blue-200">
              {content.hero.eyebrow}
            </p>
            <h1 className="font-heading text-4xl font-extrabold leading-[0.98] tracking-tight text-white sm:text-5xl lg:text-[5.2rem]">
              {message.heading}
            </h1>
            <p
              className={`mt-5 text-base leading-7 text-white md:text-lg md:leading-8 [text-shadow:0_2px_12px_rgba(8,17,31,0.45)] ${
                visualVariant === 'video' ? 'mx-auto max-w-2xl' : 'max-w-xl'
              }`}
            >
              {message.subheading}
            </p>

            <ul
              className={`mt-8 grid gap-3 text-sm text-white md:grid-cols-1 ${
                visualVariant === 'video' ? 'mx-auto max-w-3xl text-left' : ''
              }`}
            >
              {message.bullets.map((bullet, index) => (
                <motion.li
                  key={bullet}
                  {...fadeUp}
                  transition={{
                    duration: 0.45,
                    delay: shouldReduceMotion ? 0 : 0.08 * index,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex items-start gap-3 rounded-2xl border border-white/12 bg-white/8 px-4 py-3 backdrop-blur-sm"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/12 text-blue-200">
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span>{bullet}</span>
                </motion.li>
              ))}
            </ul>

            <motion.div
              {...fadeUp}
              transition={{ duration: 0.55, delay: shouldReduceMotion ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
              className={`mt-8 flex flex-col gap-3 sm:flex-row ${visualVariant === 'video' ? 'justify-center' : ''}`}
            >
              <Link
                href="/apply"
                className="inline-flex min-h-14 items-center justify-center rounded-full bg-white px-7 py-4 text-base font-bold text-[#0f172a] transition-all hover:bg-blue-50 sm:min-w-[220px]"
              >
                {content.hero.primaryCta}
              </Link>
              <Link
                href="/book-a-call"
                className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/18 bg-white/8 px-7 py-4 text-base font-semibold text-white transition-all hover:border-white/30 hover:bg-white/12 sm:min-w-[220px]"
              >
                {content.hero.secondaryCta}
              </Link>
            </motion.div>
          </motion.div>

          {visualVariant === 'clean' ? (
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.65, delay: shouldReduceMotion ? 0 : 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="overflow-hidden rounded-[2rem] border border-white/12 bg-white/8 shadow-[0_24px_80px_rgba(8,17,31,0.28)] backdrop-blur-sm">
                <div className="p-6">
                  <div className="rounded-[1.75rem] bg-gradient-to-br from-[#0f1c2e] via-[#10264a] to-[#0b1730] p-7 text-white">
                    <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-blue-200">
                      {message.badge}
                    </span>
                    <h2 className="mt-5 font-heading text-4xl font-bold leading-tight">
                      {message.heading}
                    </h2>
                    <p className="mt-4 max-w-md text-sm leading-7 text-white/76">
                      {message.subheading}
                    </p>
                  </div>

                  <div className="mt-5 grid gap-3">
                    {content.hero.summaryItems.map((item) => (
                      <div
                        key={item}
                        className="rounded-[1.25rem] border border-white/12 bg-white/8 px-4 py-4 text-sm font-medium text-white/92"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
