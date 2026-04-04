import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type IconBadgeSize = 'sm' | 'md' | 'lg'
type IconBadgeVariant = 'default' | 'raised' | 'tinted'

interface IconBadgeProps {
  children: ReactNode
  size?: IconBadgeSize
  variant?: IconBadgeVariant
  className?: string
}

const SIZE = {
  sm: 'w-9 h-9 rounded-lg',
  md: 'w-11 h-11 rounded-xl',
  lg: 'w-14 h-14 rounded-2xl',
}

const VARIANT = {
  default: 'bg-ff-raised border border-ff-border-blue text-ff-accent',
  raised:  'bg-ff-raised border border-ff-border-blue text-ff-accent group-hover:bg-ff-brand-tint transition-colors',
  tinted:  'bg-ff-brand-tint border border-ff-border-blue text-ff-accent',
}

/**
 * Shared icon container used in feature cards, step indicators, benefit grids.
 * Keeps the icon badge treatment consistent across the site.
 */
export default function IconBadge({ children, size = 'md', variant = 'default', className }: IconBadgeProps) {
  return (
    <div className={cn('flex items-center justify-center shrink-0', SIZE[size], VARIANT[variant], className)}>
      {children}
    </div>
  )
}
