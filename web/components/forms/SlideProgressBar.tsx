interface SlideProgressBarProps {
  current: number   // 0-indexed current slide
  total: number
}

export default function SlideProgressBar({ current, total }: SlideProgressBarProps) {
  const progress = ((current + 1) / total) * 100

  return (
    <div className="flex items-center gap-3 mt-8">
      <div className="flex-1 h-0.5 bg-ff-border rounded-full overflow-hidden">
        <div
          className="h-full bg-ff-accent rounded-full"
          style={{ width: `${progress}%`, transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}
        />
      </div>
      <span className="text-ff-muted text-xs font-mono tabular-nums shrink-0">
        {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
    </div>
  )
}
