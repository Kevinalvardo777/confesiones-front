import type { Confession } from '../../types/confession'
import ConfessionCard from '../ConfessionCard/ConfessionCard'
import './ConfessionFeed.scss'

interface ConfessionFeedProps {
  confessions: Confession[]
  sectionNameById: Record<string, string>
  onRate: (confessionId: string, stars: number) => void
  emptyMessage: string
}

function ConfessionFeed({ confessions, sectionNameById, onRate, emptyMessage }: ConfessionFeedProps) {
  if (!confessions.length) {
    return <div className="confession-feed confession-feed--empty">{emptyMessage}</div>
  }

  return (
    <section className="confession-feed">
      {confessions.map((confession) => (
        <ConfessionCard
          key={confession.id}
          confession={confession}
          sectionName={sectionNameById[confession.sectionId] ?? confession.sectionId}
          onRate={onRate}
        />
      ))}
    </section>
  )
}

export default ConfessionFeed
