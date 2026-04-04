'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import SpotlightCard from '@/components/motion/SpotlightCard'

export interface ServiceCardData {
  title: string
  abbr: string
  desc: string
  badge: string
  icon: ReactNode
  href: string
}

interface ServiceCardProps {
  service: ServiceCardData
  applyLabel?: string
  learnMoreLabel?: string
}

export default function ServiceCard({ service, applyLabel = 'Apply Now', learnMoreLabel = 'Learn More →' }: ServiceCardProps) {
  return (
    <SpotlightCard className="group relative bg-ff-bg border border-ff-border rounded-2xl p-6 flex flex-col h-full hover:border-ff-border-blue hover:shadow-[0_4px_20px_rgba(30,64,175,0.10)] transition-all duration-300">
      {/* Badge */}
      <span className="absolute top-4 right-4 text-[10px] font-semibold text-ff-accent bg-ff-raised border border-ff-border-blue px-2 py-0.5 rounded-full">
        {service.badge}
      </span>

      {/* Icon — lifts on card hover */}
      <motion.div
        className="w-12 h-12 rounded-xl bg-ff-raised border border-ff-border-blue flex items-center justify-center text-ff-accent mb-5 group-hover:bg-ff-brand-tint transition-colors"
        whileHover={{ y: -3, scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      >
        {service.icon}
      </motion.div>

      <span className="text-ff-subtle text-xs font-semibold tracking-widest mb-1">{service.abbr}</span>
      <h3 className="font-heading font-bold text-ff-text text-lg mb-3 leading-snug">{service.title}</h3>
      <p className="text-ff-muted text-sm leading-relaxed flex-1">{service.desc}</p>

      <div className="mt-6 flex gap-3">
        <Link
          href="/apply"
          className="flex-1 bg-ff-accent text-white font-semibold text-sm py-2.5 rounded-lg text-center hover:bg-ff-glow transition-colors"
        >
          {applyLabel}
        </Link>
        <Link
          href={service.href}
          className="flex-1 border border-ff-border-strong text-ff-muted text-sm py-2.5 rounded-lg text-center hover:border-ff-accent hover:text-ff-accent transition-colors"
        >
          {learnMoreLabel}
        </Link>
      </div>
    </SpotlightCard>
  )
}
