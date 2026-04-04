'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import SectionWrapper from '@/components/layout/SectionWrapper'
import SectionHeader from '@/components/ui/SectionHeader'

interface TeamMember {
  name: string
  title: string
  initials: string
}

const team: TeamMember[] = [
  { name: 'Alex Rivera',   title: 'Founder & CEO',           initials: 'AR' },
  { name: 'Morgan Lee',    title: 'Head of Underwriting',    initials: 'ML' },
  { name: 'Jordan Kim',    title: 'Senior Funding Advisor',  initials: 'JK' },
  { name: 'Taylor Brooks', title: 'Client Success Manager',  initials: 'TB' },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

const card = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function TeamSection() {
  const { t } = useLanguage()

  return (
    <SectionWrapper size="md" bg="bg-ff-bg">
      <SectionHeader
        eyebrow={t.team.eyebrow}
        heading={t.team.heading}
        size="md"
        mb="mb-12"
      />

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-4xl mx-auto"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {team.map((member) => (
          <motion.div
            key={member.name}
            variants={card}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="bg-ff-bg border border-ff-border rounded-2xl p-6 text-center hover:border-ff-border-blue hover:shadow-[0_4px_16px_rgba(30,64,175,0.08)] transition-all"
          >
            <div className="w-16 h-16 rounded-full bg-ff-raised border-2 border-ff-border-blue flex items-center justify-center mx-auto mb-4">
              <span className="font-heading font-extrabold text-ff-accent text-lg">{member.initials}</span>
            </div>
            <h3 className="font-heading font-bold text-ff-text text-base mb-1">{member.name}</h3>
            <p className="text-ff-muted text-xs">{member.title}</p>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  )
}
