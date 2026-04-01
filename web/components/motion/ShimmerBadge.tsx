interface ShimmerBadgeProps {
  children: React.ReactNode
  className?: string
}

export default function ShimmerBadge({ children, className = '' }: ShimmerBadgeProps) {
  return (
    <span
      className={`relative inline-flex items-center gap-2 overflow-hidden
        bg-ff-raised border border-ff-border-blue text-ff-accent
        text-xs font-semibold px-4 py-2 rounded-full ${className}`}
    >
      {/* Shimmer sweep layer */}
      <span
        className="absolute inset-0 pointer-events-none animate-shimmer-swipe"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.55) 50%, transparent 100%)',
          width: '40%',
        }}
      />
      <span className="w-1.5 h-1.5 rounded-full bg-ff-accent shrink-0" />
      <span className="relative z-10">{children}</span>
    </span>
  )
}
