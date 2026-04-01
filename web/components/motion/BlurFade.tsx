'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface BlurFadeProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  yOffset?: number
  blur?: string
  className?: string
  inViewMargin?: string
}

export default function BlurFade({
  children,
  delay = 0,
  duration = 0.5,
  yOffset = 16,
  blur = '8px',
  className,
  inViewMargin = '-60px',
}: BlurFadeProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, {
    once: true,
    margin: inViewMargin as `${number}px ${number}px ${number}px ${number}px` | `${number}px ${number}px ${number}px` | `${number}px ${number}px` | `${number}px`,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: yOffset, filter: `blur(${blur})` }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
