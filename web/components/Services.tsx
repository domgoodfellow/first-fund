'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useCountry } from '@/contexts/CountryContext'

const SERVICE_ICONS = [
  <svg key="mca" className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>,
  <svg key="loc" className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>,
  <svg key="mtg" className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>,
  <svg key="ftl" className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>,
]

const header = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const cardsContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
}

const card = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function Services() {
  const { t } = useCountry()

  return (
    <section
      id="services"
      className="snap-section min-h-screen flex flex-col justify-center py-14 md:py-24 bg-ff-surface"
    >
      <div className="section-container px-4 sm:px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-4"
          variants={header}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.6, margin: '0px 0px -60px 0px' }}
        >
          <span className="text-ff-accent text-xs font-semibold uppercase tracking-widest mb-3 block">
            {t.services.sectionLabel}
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-extrabold text-white mb-4">
            {t.services.heading}
          </h2>
          <p className="text-ff-muted max-w-xl mx-auto text-base">{t.services.sub}</p>
        </motion.div>

        {/* Cards */}
        <motion.div
          className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          variants={cardsContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3, margin: '0px 0px -60px 0px' }}
        >
          {t.services.items.map((service, i) => (
            <motion.div
              key={service.abbr}
              variants={card}
              className="group relative bg-ff-bg border border-ff-border rounded-2xl p-6 card-hover cursor-default flex flex-col"
            >
              <span className="absolute top-4 right-4 text-[10px] font-semibold text-ff-accent bg-ff-raised border border-ff-accent/30 px-2 py-0.5 rounded-full">
                {service.badge}
              </span>
              <div className="w-12 h-12 rounded-xl bg-ff-raised border border-ff-accent/20 flex items-center justify-center text-ff-accent mb-5 group-hover:border-ff-accent/60 transition-colors">
                {SERVICE_ICONS[i]}
              </div>
              <span className="text-ff-muted text-xs font-semibold tracking-widest mb-1">{service.abbr}</span>
              <h3 className="font-heading font-bold text-white text-lg mb-3 leading-snug">{service.title}</h3>
              <p className="text-ff-muted text-sm leading-relaxed flex-1">{service.desc}</p>
              <div className="mt-6 flex gap-3">
                <Link href="/apply" className="flex-1 bg-ff-accent text-ff-bg font-semibold text-sm py-2 rounded-lg text-center hover:bg-ff-glow transition-colors">
                  {t.services.apply}
                </Link>
                <button className="flex-1 border border-ff-border text-ff-muted text-sm py-2 rounded-lg hover:border-ff-accent/50 hover:text-ff-accent transition-colors">
                  {t.services.learnMore}
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
