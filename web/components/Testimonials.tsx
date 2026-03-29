'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import ReviewCarousel from './ReviewCarousel'

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

const header = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function Testimonials() {
  const { t } = useLanguage()

  return (
    <section
      id="testimonials"
      className="snap-section min-h-screen flex flex-col justify-center py-14 md:py-24 bg-ff-bg"
    >
      <div className="section-container px-4 sm:px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          variants={header}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.6, margin: '0px 0px -60px 0px' }}
        >
          <span className="text-ff-accent text-xs font-semibold uppercase tracking-widest mb-3 block">
            {t.testimonials.sectionLabel}
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-extrabold text-white">
            {t.testimonials.heading}
          </h2>
        </motion.div>

        {/* Carousel */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3, margin: '0px 0px -60px 0px' }}
        >
          <ReviewCarousel />
        </motion.div>

        {/* Google rating badge */}
        <motion.div
          className="mt-14 flex justify-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.6, margin: '0px 0px -60px 0px' }}
        >
          <div className="inline-flex items-center gap-3 bg-ff-surface border border-ff-border rounded-full px-6 py-3">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            <div className="flex items-center gap-1.5">
              <Stars count={5} />
              <span className="text-white font-semibold text-sm">5.0</span>
              <span className="text-ff-muted text-xs">on Google</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
