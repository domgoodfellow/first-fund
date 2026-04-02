'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PageHero from '@/components/layout/PageHero'
import WhyChooseUs from '@/components/marketing/WhyChooseUs'
import TeamSection from '@/components/content/TeamSection'
import CTASection from '@/components/marketing/CTASection'
import AnimatedStat from '@/components/motion/AnimatedStat'
import BlurFade from '@/components/motion/BlurFade'
import { useLanguage } from '@/contexts/LanguageContext'

export default function AboutPage() {
  const { t } = useLanguage()
  const a = t.about

  return (
    <main className="bg-ff-bg min-h-screen">
      <Navbar />

      <PageHero
        badge={a.badge}
        title={a.title}
        subtitle={a.subtitle}
        ctas={[
          { label: t.serviceTemplate.applyNow, href: '/apply' },
          { label: t.serviceTemplate.bookACall, href: '/book-a-call', variant: 'secondary' },
        ]}
      />

      {/* Stats */}
      <section className="py-14 bg-ff-surface border-y border-ff-border">
        <div className="section-container px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {a.stats.map((stat, i) => (
              <BlurFade key={stat.label} delay={i * 0.08}>
                <AnimatedStat value={stat.value} label={stat.label} />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 md:py-20 bg-ff-bg">
        <div className="section-container px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <BlurFade>
              <span className="eyebrow">{a.story.eyebrow}</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-ff-text mb-6">
                {a.story.heading}
              </h2>
            </BlurFade>
            <BlurFade delay={0.1}>
              <p className="text-ff-muted text-base leading-relaxed mb-5">{a.story.p1}</p>
            </BlurFade>
            <BlurFade delay={0.15}>
              <p className="text-ff-muted text-base leading-relaxed mb-5">{a.story.p2}</p>
            </BlurFade>
            <BlurFade delay={0.2}>
              <p className="text-ff-muted text-base leading-relaxed">{a.story.p3}</p>
            </BlurFade>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-ff-surface">
        <div className="section-container px-4 sm:px-6">
          <BlurFade className="max-w-3xl mx-auto text-center">
            <span className="eyebrow">{a.mission.eyebrow}</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-ff-text mb-6">
              {a.mission.heading}
            </h2>
            <p className="text-ff-muted text-lg leading-relaxed">{a.mission.text}</p>
          </BlurFade>
        </div>
      </section>

      <WhyChooseUs />

      <TeamSection />

      <CTASection
        heading={a.cta.heading}
        subheading={a.cta.subheading}
      />

      <Footer />
    </main>
  )
}
