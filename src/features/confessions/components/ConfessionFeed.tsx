import EmptyState from '@/shared/components/feedback/EmptyState'
import SkeletonBlock from '@/shared/components/feedback/SkeletonBlock'
import type { Confession } from '@/features/confessions/types/confession.types'
import ConfessionCard from '@/features/confessions/components/ConfessionCard'
import { appRoutes } from '@/shared/constants/routes'
import './confessions.scss'

interface ConfessionFeedProps {
  confessions: Confession[]
  isLoading?: boolean
  emptyMessage: string
  communityNames: Record<string, string>
  onVote: (confessionId: string, stars: number) => void
  votePending?: boolean
}

function ConfessionFeed({ confessions, emptyMessage, communityNames, isLoading = false, onVote, votePending }: ConfessionFeedProps) {
  if (isLoading) {
    return (
      <div className="confession-feed">
        <SkeletonBlock lines={4} />
        <SkeletonBlock lines={4} />
      </div>
    )
  }

  if (!confessions.length) {
    return <EmptyState title="Nada por aqui aun" description={emptyMessage} />
  }

  return (
    <section className="confession-feed">
      {confessions.map((confession) => (
        <ConfessionCard
          key={confession.id}
          confession={confession}
          sectionName={communityNames[confession.communityId] ?? confession.communityId}
          detailHref={appRoutes.confessionDetail(confession.communityId, confession.id)}
          onVote={onVote}
          votePending={votePending}
        />
      ))}
    </section>
  )
}

export default ConfessionFeed
