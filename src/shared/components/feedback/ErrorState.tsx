import './feedback.scss'

interface ErrorStateProps {
  title: string
  description: string
  onRetry?: () => void
}

function ErrorState({ title, description, onRetry }: ErrorStateProps) {
  return (
    <section className="feedback-card feedback-card--error" role="alert">
      <h3>{title}</h3>
      <p>{description}</p>
      {onRetry ? (
        <button className="feedback-card__button" type="button" onClick={onRetry}>
          Reintentar
        </button>
      ) : null}
    </section>
  )
}

export default ErrorState
