'use client'

import ServiceCard from './ServiceCard'
import type { ServiceCardData } from './ServiceCard'
import BlurFade from '@/components/motion/BlurFade'

interface ServiceCardGridProps {
  services: ServiceCardData[]
  applyLabel?: string
  learnMoreLabel?: string
}

export default function ServiceCardGrid({ services, applyLabel, learnMoreLabel }: ServiceCardGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {services.map((service, i) => (
        <BlurFade key={service.abbr} delay={i * 0.08}>
          <ServiceCard service={service} applyLabel={applyLabel} learnMoreLabel={learnMoreLabel} />
        </BlurFade>
      ))}
    </div>
  )
}
