'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export interface FAQItem {
  question: string
  answer: string
}

interface FAQAccordionProps {
  items: FAQItem[]
  className?: string
}

export default function FAQAccordion({ items, className = '' }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item, i) => {
        const isOpen = openIndex === i
        return (
          <div
            key={i}
            className={`relative bg-ff-bg border rounded-xl overflow-hidden transition-colors duration-200 ${
              isOpen ? 'border-ff-border-blue' : 'border-ff-border hover:border-ff-border-strong'
            }`}
          >
            {/* Blue accent left bar — animates in when open */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  key="bar"
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ scaleY: 1, opacity: 1 }}
                  exit={{ scaleY: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  style={{ originY: 0 }}
                  className="absolute left-0 top-0 bottom-0 w-[3px] bg-ff-accent rounded-r-full"
                />
              )}
            </AnimatePresence>

            <button
              className="w-full flex items-center justify-between px-6 py-5 text-left"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span className={`font-heading font-semibold text-base pr-4 transition-colors duration-150 ${isOpen ? 'text-ff-accent' : 'text-ff-text'}`}>
                {item.question}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                className={`shrink-0 transition-colors duration-150 ${isOpen ? 'text-ff-accent' : 'text-ff-muted'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-5 text-ff-muted text-sm leading-relaxed">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
