'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import GridPattern from '@/components/motion/GridPattern'
import ShimmerBadge from '@/components/motion/ShimmerBadge'

interface CTAButton {
  label: string
  href: string
  variant?: 'primary' | 'secondary'
}

interface PageHeroProps {
  badge?: string
  title: string
  subtitle?: string
  ctas?: CTAButton[]
  align?: 'center' | 'left'
}

export default function PageHero({ badge, title, subtitle, ctas, align = 'center' }: PageHeroProps) {
  const isCenter = align === 'center'

  return (
    <section className="relative min-h-[58vh] md:min-h-[64vh] flex flex-col justify-center py-16 md:py-20 bg-ff-surface overflow-hidden">
      <GridPattern opacity={0.12} />

      {/* Blue accent orb — top right */}
      <div
        className="absolute top-0 right-1/4 w-[clamp(200px,28vw,480px)] h-[clamp(200px,28vw,480px)] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(var(--ff-accent-rgb),0.08) 0%, transparent 68%)' }}
      />
      {/* Subtle bottom edge fade */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-ff-bg to-transparent pointer-events-none" />

      <div className={`relative z-10 section-container px-4 sm:px-6 flex flex-col ${isCenter ? 'items-center text-center' : 'items-start text-left'}`}>

        {badge && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mb-6"
          >
            <ShimmerBadge>{badge}</ShimmerBadge>
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: badge ? 0.1 : 0, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-ff-text leading-[1.06] tracking-tight mb-5 max-w-4xl"
        >
          {title.split('\n').map((line, i) => (
            <span key={i} className="block">
              {i === 0 ? line : <span className="text-gradient">{line}</span>}
            </span>
          ))}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className={`text-ff-muted text-lg md:text-xl leading-relaxed mb-8 max-w-2xl ${isCenter ? 'mx-auto' : ''}`}
          >
            {subtitle}
          </motion.p>
        )}

        {ctas && ctas.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-3"
          >
            {ctas.map((cta) => (
              <Link
                key={cta.href}
                href={cta.href}
                className={
                  cta.variant === 'secondary'
                    ? 'inline-flex items-center justify-center gap-2 bg-transparent border border-ff-border-strong text-ff-text font-semibold text-base px-7 py-3.5 rounded-full hover:border-ff-accent hover:text-ff-accent transition-all'
                    : 'inline-flex items-center justify-center gap-2 bg-ff-accent text-white font-bold text-base px-7 py-3.5 rounded-full hover:bg-ff-glow transition-all shadow-[0_1px_4px_rgba(30,64,175,0.3)]'
                }
              >
                {cta.label}
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}
