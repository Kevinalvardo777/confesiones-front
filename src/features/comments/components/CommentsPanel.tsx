import EmptyState from '@/shared/components/feedback/EmptyState'
import SkeletonBlock from '@/shared/components/feedback/SkeletonBlock'
import { formatDate } from '@/shared/lib/format'
import type { Comment } from '@/features/comments/types/comment.types'
import './comments.scss'

interface CommentsPanelProps {
  comments: Comment[]
  isLoading?: boolean
}

function CommentsPanel({ comments, isLoading = false }: CommentsPanelProps) {
  if (isLoading) {
    return <SkeletonBlock lines={4} />
  }

  if (!comments.length) {
    return <EmptyState title="Sin comentarios" description="Se la primera persona en abrir la conversacion." />
  }

  return (
    <section className="comments-panel surface-panel">
      <h3>Comentarios</h3>
      <div className="comments-panel__list">
        {comments.map((comment) => (
          <article key={comment.id} className={`comment-card${comment.parentId ? ' comment-card--reply' : ''}`}>
            <div className="comment-card__meta">
              <strong>{comment.authorName}</strong>
              <span>{formatDate(comment.createdAt)}</span>
            </div>
            <p>{comment.content}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default CommentsPanel
