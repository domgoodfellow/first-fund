'use client'

import BlurFade from '@/components/motion/BlurFade'
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  eyebrow?: string
  heading: string
  /** Optional subtitle rendered below the heading */
  subtitle?: string
  /** text-center (default) or text-left */
  align?: 'center' | 'left'
  /** Bottom margin class — defaults to mb-12 */
  mb?: string
  /** Heading size — defaults to 'lg' (3xl/5xl) */
  size?: 'lg' | 'md' | 'sm'
  /** When true, renders heading in white (for dark-section use) */
  dark?: boolean
  /** Forwarded to the BlurFade wrapper */
  className?: string
  /** BlurFade entrance delay */
  delay?: number
}

const HEADING_SIZE = {
  lg: 'text-3xl md:text-5xl',
  md: 'text-2xl md:text-4xl',
  sm: 'text-xl md:text-3xl',
}

export default function SectionHeader({
  eyebrow,
  heading,
  subtitle,
  align = 'center',
  mb = 'mb-12',
  size = 'lg',
  dark = false,
  className,
  delay,
}: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center' : 'text-left'
  const headingColor = dark ? 'text-white' : 'text-ff-text'
  const subtitleColor = dark ? 'text-white/70' : 'text-ff-muted'

  return (
    <BlurFade
      className={cn(alignClass, mb, className)}
      delay={delay}
    >
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}

      <h2 className={cn('font-heading font-bold leading-tight', HEADING_SIZE[size], headingColor)}>
        {heading.includes('\n')
          ? heading.split('\n').map((line, i) => (
              <span key={i} className={i > 0 ? 'block' : undefined}>{line}</span>
            ))
          : heading}
      </h2>

      {subtitle && (
        <p className={cn('mt-4 text-base md:text-lg leading-relaxed max-w-2xl', subtitleColor, align === 'center' && 'mx-auto')}>
          {subtitle}
        </p>
      )}
    </BlurFade>
  )
}
