'use client'

import { motion } from 'framer-motion'

interface TeamMember {
  name: string
  title: string
  initials: string
}

const team: TeamMember[] = [
  { name: 'Alex Rivera', title: 'Founder & CEO', initials: 'AR' },
  { name: 'Morgan Lee', title: 'Head of Underwriting', initials: 'ML' },
  { name: 'Jordan Kim', title: 'Senior Funding Advisor', initials: 'JK' },
  { name: 'Taylor Brooks', title: 'Client Success Manager', initials: 'TB' },
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
  return (
    <section className="py-16 md:py-20 bg-ff-bg">
      <div className="section-container px-4 sm:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <span className="eyebrow">Our Team</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-ff-text">
            The People Behind First Fund
          </h2>
        </motion.div>

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
      </div>
    </section>
  )
}
