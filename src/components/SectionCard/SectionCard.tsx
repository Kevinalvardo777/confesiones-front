import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import type { Section } from '../../types/confession'
import './SectionCard.scss'

interface SectionCardProps {
  section: Section
  totalConfessions: number
}

function SectionCard({ section, totalConfessions }: SectionCardProps) {
  return (
    <article className="section-card" style={{ '--section-accent': section.accent } as CSSProperties}>
      <div className="section-card__header">
        <span>{section.city}</span>
        <strong>{totalConfessions} confesiones</strong>
      </div>
      <h2>{section.name}</h2>
      <p>{section.headline}</p>
      <small>{section.description}</small>
      <Link to={`/seccion/${section.id}`} className="section-card__link">
        Entrar a la seccion
      </Link>
    </article>
  )
}

export default SectionCard
