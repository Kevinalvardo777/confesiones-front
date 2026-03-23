import type { ReactNode } from 'react'
import './feedback.scss'

interface EmptyStateProps {
  title: string
  description: string
  action?: ReactNode
}

function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <section className="feedback-card feedback-card--empty">
      <h3>{title}</h3>
      <p>{description}</p>
      {action ? <div className="feedback-card__action">{action}</div> : null}
    </section>
  )
}

export default EmptyState
