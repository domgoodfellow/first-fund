'use client'

import Link from 'next/link'
import BlurFade from '@/components/motion/BlurFade'
import { useLanguage } from '@/contexts/LanguageContext'
import { getHomeFunnelContent } from '@/lib/home-funnel'

interface CTASectionProps {
  heading?: string
  subheading?: string
  primaryLabel?: string
  primaryHref?: string
  secondaryLabel?: string
  secondaryHref?: string
  variant?: 'light' | 'dark'
  contentKey?: 'default' | 'homeFunnel'
}

export default function CTASection({
  heading,
  subheading,
  primaryLabel,
  primaryHref = '/apply',
  secondaryLabel,
  secondaryHref = '/book-a-call',
  variant = 'light',
  contentKey = 'default',
}: CTASectionProps) {
  const { language, t } = useLanguage()
  const homeContent = getHomeFunnelContent(language).cta
  const h = heading ?? (contentKey === 'homeFunnel' ? homeContent.heading : t.cta.heading)
  const sub = subheading ?? (contentKey === 'homeFunnel' ? homeContent.subheading : t.cta.sub)
  const pl = primaryLabel ?? (contentKey === 'homeFunnel' ? homeContent.primary : t.ctaSection.primaryLabel)
  const sl = secondaryLabel ?? (contentKey === 'homeFunnel' ? homeContent.secondary : t.ctaSection.secondaryLabel)
  const isDark = variant === 'dark'

  return (
    <section
      className={`py-20 border-t ${
        isDark
          ? 'border-white/[0.08]'
          : 'bg-ff-surface border-ff-border'
      }`}
      style={isDark ? { backgroundColor: 'var(--ff-dark-alt)' } : undefined}
    >
      <div className="section-container px-4 sm:px-6 text-center">
        <BlurFade>
          <h2
            className={`font-heading text-4xl md:text-5xl font-extrabold mb-4 ${
              isDark ? 'text-white' : 'text-ff-text'
            }`}
          >
            {h}
          </h2>
          <p className={`text-lg mb-10 max-w-xl mx-auto ${isDark ? 'text-slate-400' : 'text-ff-muted'}`}>
            {sub}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={primaryHref}
              className="inline-flex items-center gap-2 bg-ff-accent text-white font-bold text-base px-10 py-4 rounded-full hover:bg-ff-glow transition-all shadow-[0_1px_3px_rgba(30,64,175,0.3)]"
            >
              {pl}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href={secondaryHref}
              className={`inline-flex items-center gap-2 bg-transparent font-semibold text-base px-10 py-4 rounded-full transition-all border ${
                isDark
                  ? 'border-white/20 text-white hover:border-ff-accent hover:text-ff-accent'
                  : 'border-ff-border-strong text-ff-text hover:border-ff-accent hover:text-ff-accent'
              }`}
            >
              {sl}
            </Link>
          </div>
        </BlurFade>
      </div>
    </section>
  )
}
