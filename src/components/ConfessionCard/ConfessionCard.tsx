import './ConfessionCard.scss'
import type { Confession } from '../../types/confession'

interface ConfessionCardProps {
  confession: Confession
  sectionName: string
  onRate: (confessionId: string, stars: number) => void
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('es-EC', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function formatAverage(confession: Confession) {
  if (!confession.ratingVotes) {
    return 'Sin votos'
  }

  return `${(confession.ratingTotal / confession.ratingVotes).toFixed(1)} / 5`
}

function ConfessionCard({ confession, sectionName, onRate }: ConfessionCardProps) {
  return (
    <article className="confession-card">
      <div className="confession-card__meta">
        <span>{sectionName}</span>
        <span>{formatDate(confession.createdAt)}</span>
      </div>

      <h3>{confession.authorAlias}</h3>
      <p>{confession.content}</p>

      <div className="confession-card__footer">
        <div className="confession-card__stats">
          <strong>{formatAverage(confession)}</strong>
          <small>{confession.ratingVotes} votos</small>
        </div>

        <div className="confession-card__stars" aria-label={`Calificar confesion de ${confession.authorAlias}`}>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              aria-label={`Dar ${star} estrellas`}
              onClick={() => onRate(confession.id, star)}
            >
              ★
            </button>
          ))}
        </div>
      </div>
    </article>
  )
}

export default ConfessionCard
