import { Link } from 'react-router-dom'
import type { CSSProperties } from 'react'
import type { Category } from '@/features/categories/types/category.types'
import { appRoutes } from '@/shared/constants/routes'
import './categories.scss'

interface CategoryCardProps {
  category: Category
}

function CategoryCard({ category }: CategoryCardProps) {
  return (
    <article className="category-card surface-panel" style={{ '--category-accent': category.accent } as CSSProperties}>
      <span className="category-card__accent" aria-hidden="true" />
      <div className="category-card__header">
        <h3>{category.name}</h3>
        <strong>{category.communitiesCount} comunidades</strong>
      </div>
      <p>{category.description}</p>
      <div className="category-card__meta">
        <span>{category.confessionsCount} confesiones visibles</span>
        <span>{category.featuredCommunities.map((community) => community.name).join(' • ')}</span>
      </div>
      <Link to={appRoutes.categoryDetail(category.slug)} className="category-card__link">
        Ver categoria
      </Link>
    </article>
  )
}

export default CategoryCard
