import type { ReactNode } from 'react'

interface SectionWrapperProps {
  children: ReactNode
  className?: string
  id?: string
}

export default function SectionWrapper({ children, className = '', id }: SectionWrapperProps) {
  return (
    <section id={id} className={`py-16 md:py-24 ${className}`}>
      <div className="section-container px-4 sm:px-6">
        {children}
      </div>
    </section>
  )
}
