import { Link } from 'react-router-dom'
import StatPills from '@/components/molecules/StatPills/StatPills'
import type { Confession } from '@/features/confessions/types/confession.types'
import { formatDate } from '@/shared/lib/format'
import './confessions.scss'

interface ConfessionCardProps {
  confession: Confession
  sectionName: string
  detailHref: string
  onVote: (confessionId: string, stars: number) => void
  votePending?: boolean
}

function ConfessionCard({ confession, sectionName, detailHref, onVote, votePending = false }: ConfessionCardProps) {
  return (
    <article className="confession-card">
      <div className="confession-card__meta">
        <span>{sectionName}</span>
        <span>{formatDate(confession.createdAt)}</span>
      </div>

      <h3>{confession.alias}</h3>
      <p>{confession.content}</p>

      <StatPills
        items={[
          { label: `${confession.averageRating.toFixed(1)} / 5`, accent: true },
          { label: `${confession.ratingVotes} votos` },
          { label: `${confession.commentsCount} comentarios` },
          ...(confession.status === 'reported' ? [{ label: 'En revision' }] : []),
        ]}
      />

      <div className="confession-card__footer">
        <div className="confession-card__stars" aria-label={`Calificar confesion de ${confession.alias}`}>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              aria-label={`Dar ${star} estrellas`}
              disabled={votePending}
              onClick={() => onVote(confession.id, star)}
            >
              *
            </button>
          ))}
        </div>

        <Link to={detailHref} className="confession-card__detail-link">
          Ver detalle
        </Link>
      </div>
    </article>
  )
}

export default ConfessionCard
