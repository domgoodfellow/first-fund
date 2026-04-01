'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface AnimatedStatProps {
  value: string
  label: string
  prefix?: string
  suffix?: string
}

function parseNumeric(val: string): { prefix: string; number: number; suffix: string } | null {
  const match = val.match(/^([^0-9]*)([0-9,]+(?:\.[0-9]+)?)(.*)$/)
  if (!match) return null
  return {
    prefix: match[1],
    number: parseFloat(match[2].replace(/,/g, '')),
    suffix: match[3],
  }
}

export default function AnimatedStat({ value, label }: AnimatedStatProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: false, amount: 0.5 })
  const [display, setDisplay] = useState(value)

  const parsed = parseNumeric(value)

  useEffect(() => {
    if (!inView || !parsed) {
      setDisplay(value)
      return
    }

    const duration = 1200
    const start = Date.now()
    const from = 0
    const to = parsed.number

    const tick = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = from + (to - from) * eased
      const formatted = to >= 1000 ? Math.round(current).toLocaleString() : current.toFixed(to % 1 !== 0 ? 1 : 0)
      setDisplay(`${parsed.prefix}${formatted}${parsed.suffix}`)
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [inView]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      <span className="font-heading text-3xl md:text-4xl font-extrabold text-ff-accent mb-1">
        {display}
      </span>
      <span className="text-ff-muted text-sm font-medium">{label}</span>
    </div>
  )
}
