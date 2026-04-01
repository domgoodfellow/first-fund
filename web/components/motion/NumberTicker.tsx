'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface NumberTickerProps {
  value: number
  prefix?: string
  suffix?: string
  duration?: number
  className?: string
}

export default function NumberTicker({
  value,
  prefix = '',
  suffix = '',
  duration = 2000,
  className = '',
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [display, setDisplay] = useState(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (!inView) return
    const start = performance.now()

    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(eased * value))
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [inView, value, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}{display.toLocaleString()}{suffix}
    </span>
  )
}
