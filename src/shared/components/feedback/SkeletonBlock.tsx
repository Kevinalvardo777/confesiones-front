import './feedback.scss'

interface SkeletonBlockProps {
  lines?: number
  compact?: boolean
}

function SkeletonBlock({ lines = 3, compact = false }: SkeletonBlockProps) {
  return (
    <div className={`skeleton-block${compact ? ' skeleton-block--compact' : ''}`} aria-hidden="true">
      {Array.from({ length: lines }).map((_, index) => (
        <span key={index} />
      ))}
    </div>
  )
}

export default SkeletonBlock
