'use client'

import { motion } from 'framer-motion'
import { useCountry } from '@/contexts/CountryContext'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function Stats() {
  const { t } = useCountry()

  const items = [t.stats.item1, t.stats.item2, t.stats.item3, t.stats.item4]

  return (
    <section className="bg-ff-surface border-y border-ff-border py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-ff-border"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.6, margin: '0px 0px -40px 0px' }}
        >
          {items.map((stat, i) => (
            <motion.div
              key={i}
              variants={item}
              className="bg-ff-surface flex flex-col items-center justify-center py-8 px-4 text-center"
            >
              <span className="font-heading text-3xl md:text-4xl font-extrabold text-ff-accent mb-1">
                {stat.value}
              </span>
              <span className="text-ff-muted text-xs md:text-sm font-medium">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
