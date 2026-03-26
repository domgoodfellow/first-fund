'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useCountry } from '@/contexts/CountryContext'

export default function Stats() {
  const { t } = useCountry()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const items = [
    t.stats.item1,
    t.stats.item2,
    t.stats.item3,
    t.stats.item4,
  ]

  return (
    <section ref={ref} className="bg-ff-surface border-y border-ff-border py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-ff-border">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-ff-surface flex flex-col items-center justify-center py-8 px-4 text-center"
            >
              <span className="font-heading text-3xl md:text-4xl font-extrabold text-ff-accent mb-1">
                {item.value}
              </span>
              <span className="text-ff-muted text-xs md:text-sm font-medium">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
