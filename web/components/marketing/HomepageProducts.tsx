'use client'

import Link from 'next/link'
import SectionWrapper from '@/components/layout/SectionWrapper'
import SectionHeader from '@/components/ui/SectionHeader'
import BlurFade from '@/components/motion/BlurFade'
import { useLanguage } from '@/contexts/LanguageContext'
import { getHomeFunnelContent } from '@/lib/home-funnel'

export default function HomepageProducts() {
  const { language } = useLanguage()
  const content = getHomeFunnelContent(language).products

  return (
    <SectionWrapper id="products" size="md" bg="bg-ff-bg">
      <SectionHeader
        eyebrow={content.eyebrow}
        heading={content.heading}
        subtitle={content.subtitle}
        align="left"
        mb="mb-10"
      />

      <div className="grid gap-6 xl:grid-cols-3">
        {content.cards.map((card, index) => (
          <BlurFade key={card.title} delay={index * 0.08} className="h-full">
            <article className="flex h-full flex-col rounded-[1.9rem] border border-ff-border bg-white p-7 shadow-[0_18px_46px_rgba(15,23,42,0.05)]">
              <p className="eyebrow mb-4">{card.eyebrow}</p>
              <h3 className="font-heading text-3xl font-bold leading-tight text-ff-text">
                {card.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-ff-muted">{card.summary}</p>

              <div className="mt-6 grid gap-3">
                {card.highlights.map((highlight) => (
                  <div
                    key={highlight}
                    className="rounded-2xl border border-ff-border bg-ff-surface px-4 py-3 text-sm font-medium text-ff-text"
                  >
                    {highlight}
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-[1.5rem] bg-ff-surface p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ff-muted">
                  {language === 'en' ? 'Related paths' : 'Rutas relacionadas'}
                </p>
                <div className="mt-4 flex flex-col gap-3">
                  {card.paths.map((path) => (
                    <Link
                      key={path.href + path.label}
                      href={path.href}
                      className="group flex items-center justify-between rounded-2xl border border-ff-border bg-white px-4 py-3 text-sm font-medium text-ff-text transition-all hover:border-ff-border-blue hover:text-ff-accent"
                    >
                      <span>{path.label}</span>
                      <span className="text-ff-accent transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 xl:mt-auto">
                <Link href={card.href} className="btn-primary text-center">
                  {language === 'en' ? 'Explore This Path' : 'Explorar esta ruta'}
                </Link>
                <Link href="/services" className="btn-secondary text-center">
                  {language === 'en' ? 'Browse All Services' : 'Ver todos los servicios'}
                </Link>
              </div>
            </article>
          </BlurFade>
        ))}
      </div>
    </SectionWrapper>
  )
}
