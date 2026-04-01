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
  const alignClass = align === 'center' ? 'text-center items-center' : 'text-left items-start'

  return (
    <section className="relative min-h-[50vh] flex flex-col justify-center pt-12 pb-16 bg-ff-surface overflow-hidden">
      <GridPattern opacity={0.14} />

      {/* Subtle blue accent orb */}
      <div
        className="absolute top-0 right-1/4 w-[clamp(180px,22vw,420px)] h-[clamp(180px,22vw,420px)] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(30,64,175,0.07) 0%, transparent 70%)' }}
      />

      <div className={`relative z-10 section-container px-4 sm:px-6 flex flex-col ${alignClass}`}>
        {badge && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <ShimmerBadge>{badge}</ShimmerBadge>
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold text-ff-text leading-[1.1] tracking-tight mb-4 max-w-4xl"
        >
          {title.split('\n').map((line, i) => (
            <span key={i} className="block">
              {i === 0 ? line : <span className="text-gradient">{line}</span>}
            </span>
          ))}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-ff-muted text-lg md:text-xl max-w-2xl leading-relaxed mb-8"
          >
            {subtitle}
          </motion.p>
        )}

        {ctas && ctas.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-4"
          >
            {ctas.map((cta) => (
              <Link
                key={cta.href}
                href={cta.href}
                className={
                  cta.variant === 'secondary'
                    ? 'inline-flex items-center justify-center gap-2 bg-transparent border border-ff-border-strong text-ff-text font-semibold text-base px-8 py-4 rounded-full hover:border-ff-accent hover:text-ff-accent transition-all'
                    : 'inline-flex items-center justify-center gap-2 bg-ff-accent text-white font-bold text-base px-8 py-4 rounded-full hover:bg-ff-glow transition-all shadow-[0_1px_3px_rgba(30,64,175,0.3)]'
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
