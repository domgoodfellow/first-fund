import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type SectionSize = 'lg' | 'md' | 'sm'

interface SectionWrapperProps {
  children: ReactNode
  className?: string
  id?: string
  /** lg = homepage sections (py-20/28), md = inner-page sections (py-16/24), sm = strip/compact (py-8/12) */
  size?: SectionSize
  /** Override background — accepts Tailwind bg-* class(es) */
  bg?: string
  as?: 'section' | 'div' | 'article'
}

const SIZE_CLASSES: Record<SectionSize, string> = {
  lg: 'section-lg',
  md: 'section-md',
  sm: 'section-sm',
}

export default function SectionWrapper({
  children,
  className = '',
  id,
  size = 'md',
  bg = '',
  as: Tag = 'section',
}: SectionWrapperProps) {
  return (
    <Tag id={id} className={cn(SIZE_CLASSES[size], bg, className)}>
      <div className="section-container px-4 sm:px-6">
        {children}
      </div>
    </Tag>
  )
}
