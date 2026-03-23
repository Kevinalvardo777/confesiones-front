import { Link } from 'react-router-dom'
import type { CSSProperties } from 'react'
import type { Community } from '@/features/sections/types/section.types'
import { appRoutes } from '@/shared/constants/routes'
import './sections.scss'

interface CommunityCardProps {
  community: Community
}

function CommunityCard({ community }: CommunityCardProps) {
  return (
    <article className="section-card" style={{ '--section-accent': community.accent } as CSSProperties}>
      <span className="section-card__accent" aria-hidden="true" />
      <div className="section-card__header">
        <span>{community.city}</span>
        <strong>{community.confessionsCount} confesiones</strong>
      </div>
      <div className="section-card__body">
        <h2>{community.name}</h2>
        <p>{community.headline}</p>
        <small>{community.description}</small>
      </div>
      <div className="section-card__footer">
        <span className="section-card__hint">Anonimo y por comunidad</span>
        <Link to={appRoutes.sectionDetail(community.id)} className="section-card__link">
          Entrar a la comunidad
        </Link>
      </div>
    </article>
  )
}

export default CommunityCard
