'use client'

import BlurFade from '@/components/motion/BlurFade'
import SpotlightCard from '@/components/motion/SpotlightCard'
import { useLanguage } from '@/contexts/LanguageContext'
import SectionWrapper from '@/components/layout/SectionWrapper'
import SectionHeader from '@/components/ui/SectionHeader'
import IconBadge from '@/components/ui/IconBadge'

const icons = [
  <svg key="0" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>,
  <svg key="1" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>,
  <svg key="2" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>,
  <svg key="3" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>,
]

export default function WhyChooseUs() {
  const { t } = useLanguage()

  return (
    <SectionWrapper size="lg" bg="bg-ff-surface">
      <SectionHeader
        eyebrow={t.whyChooseUs.eyebrow}
        heading={t.whyChooseUs.heading}
        mb="mb-14"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {t.whyChooseUs.items.map((item, i) => (
          <BlurFade key={i} delay={i * 0.1}>
            <SpotlightCard className="bg-ff-bg border border-ff-border rounded-2xl p-6 h-full hover:border-ff-border-blue hover:shadow-[0_4px_20px_rgba(30,64,175,0.10)] transition-all duration-300 group">
              <IconBadge size="md" variant="raised" className="mb-5">
                {icons[i]}
              </IconBadge>
              <h3 className="font-heading font-bold text-ff-text text-lg mb-2">{item.title}</h3>
              <p className="text-ff-muted text-sm leading-relaxed">{item.desc}</p>
            </SpotlightCard>
          </BlurFade>
        ))}
      </div>
    </SectionWrapper>
  )
}
