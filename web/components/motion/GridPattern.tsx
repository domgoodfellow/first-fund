interface GridPatternProps {
  className?: string
  dotColor?: string
  dotSize?: number
  gap?: number
  opacity?: number
}

export default function GridPattern({
  className = '',
  dotColor = '#1E40AF',
  dotSize = 1.5,
  gap = 28,
  opacity = 0.18,
}: GridPatternProps) {
  const id = 'grid-pattern'
  return (
    <svg
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern id={id} x="0" y="0" width={gap} height={gap} patternUnits="userSpaceOnUse">
          <circle cx={gap / 2} cy={gap / 2} r={dotSize} fill={dotColor} opacity={opacity} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  )
}
