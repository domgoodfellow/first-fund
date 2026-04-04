'use client'

import { motion } from 'framer-motion'
import { useLanguage, brandName } from '@/contexts/LanguageContext'

interface ApplySuccessProps {
  onReset: () => void
}

export default function ApplySuccess({ onReset }: ApplySuccessProps) {
  const { t } = useLanguage()

  return (
    <div
      className="fixed inset-0 bg-ff-bg flex items-center justify-center"
      style={{ top: 'var(--ff-navbar-offset)' }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="text-center max-w-md px-6"
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="w-20 h-20 rounded-full bg-ff-raised border-2 border-ff-accent flex items-center justify-center mx-auto mb-6"
        >
          <svg className="w-10 h-10 text-ff-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-heading text-3xl font-extrabold text-ff-text mb-3">
            {t.apply.success.heading}
          </h2>
          <p className="text-ff-muted mb-8">
            {t.apply.success.message} {brandName}.
          </p>
          <button
            onClick={onReset}
            className="text-ff-accent text-sm underline underline-offset-4 hover:text-ff-glow transition-colors"
          >
            {t.apply.success.again}
          </button>
        </motion.div>
      </motion.div>
    </div>
  )
}
