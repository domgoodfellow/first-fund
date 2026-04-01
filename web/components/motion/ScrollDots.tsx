'use client'

import { useState, useEffect } from 'react'

const SECTIONS = [
  { id: 'hero',         label: 'Home'       },
  { id: 'how-it-works', label: 'Process'    },
  { id: 'services',     label: 'Services'   },
  { id: 'testimonials', label: 'Stories'    },
  { id: 'cta',          label: 'Get Funded' },
]

export default function ScrollDots() {
  const [active, setActive] = useState('hero')

  useEffect(() => {
    // Track intersection ratio for each section — the most visible one wins
    const ratios: Record<string, number> = {}

    const observers = SECTIONS.map(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          ratios[id] = entry.intersectionRatio
          const top = Object.entries(ratios).sort(([, a], [, b]) => b - a)[0]
          if (top && top[1] > 0) setActive(top[0])
        },
        { threshold: [0, 0.25, 0.5, 0.75, 1] }
      )
      observer.observe(el)
      return observer
    })

    return () => observers.forEach((o) => o?.disconnect())
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className="hidden md:flex fixed right-5 top-1/2 -translate-y-1/2 z-50 flex-col items-center gap-3"
      aria-label="Section navigation"
    >
      {SECTIONS.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => scrollTo(id)}
          aria-label={`Go to ${label}`}
          className="group relative flex items-center justify-center"
        >
          {/* Dot */}
          <span
            className={`block rounded-full transition-all duration-300 ${
              active === id
                ? 'w-2 h-5 bg-ff-accent'
                : 'w-2 h-2 bg-ff-border hover:bg-ff-muted'
            }`}
          />

          {/* Tooltip */}
          <span className="absolute right-5 whitespace-nowrap text-xs font-medium text-white bg-ff-surface border border-ff-border rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            {label}
          </span>
        </button>
      ))}
    </nav>
  )
}
