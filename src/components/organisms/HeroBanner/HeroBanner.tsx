import './HeroBanner.scss'

interface HeroBannerProps {
  eyebrow: string
  title: string
  description: string
  actions?: React.ReactNode
  aside?: React.ReactNode
}

function HeroBanner({ eyebrow, title, description, actions, aside }: HeroBannerProps) {
  return (
    <div className="organism-hero-banner">
      <div className="organism-hero-banner__copy">
        <span className="page-header__eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
        {actions ? <div className="organism-hero-banner__actions">{actions}</div> : null}
      </div>
      {aside ? <div className="organism-hero-banner__aside">{aside}</div> : null}
    </div>
  )
}

export default HeroBanner
