import { useParams } from 'react-router-dom'
import CommunityCard from '@/features/sections/components/SectionCard'
import { useCategoryCommunitiesQuery } from '@/features/categories/hooks/useCategoryCommunitiesQuery'
import ErrorState from '@/shared/components/feedback/ErrorState'
import SkeletonBlock from '@/shared/components/feedback/SkeletonBlock'
import EmptyState from '@/shared/components/feedback/EmptyState'
import { usePageMeta } from '@/shared/lib/seo'
import '@/features/categories/components/categories.scss'
import '@/features/sections/components/sections.scss'
import './pages.scss'

function CategoryPage() {
  const { slug = '' } = useParams()
  const categoryQuery = useCategoryCommunitiesQuery(slug)
  usePageMeta(
    categoryQuery.data ? categoryQuery.data.category.name : 'Categoria',
    'Explora las comunidades disponibles dentro de una categoria de Confesiones EC.',
  )

  if (categoryQuery.isLoading) {
    return (
      <div className="page-stack">
        <SkeletonBlock lines={4} />
        <div className="section-grid">
          <SkeletonBlock lines={4} />
          <SkeletonBlock lines={4} />
          <SkeletonBlock lines={4} />
        </div>
      </div>
    )
  }

  if (categoryQuery.isError || !categoryQuery.data) {
    return (
      <ErrorState
        title="No pudimos cargar la categoria"
        description="Puede que no exista o que haya un problema temporal."
        onRetry={() => void categoryQuery.refetch()}
      />
    )
  }

  const { category, communities } = categoryQuery.data

  return (
    <div className="page-stack">
      <section className="surface-panel page-header">
        <span className="page-header__eyebrow">Categoria</span>
        <h2 className="page-header__title">{category.name}</h2>
        <p className="page-header__description">{category.description}</p>
      </section>

      {communities.length ? (
        <section className="section-grid">
          {communities.map((community) => (
            <CommunityCard key={community.id} community={community} />
          ))}
        </section>
      ) : (
        <EmptyState title="Sin comunidades aun" description="Todavia no hay comunidades publicadas dentro de esta categoria." />
      )}
    </div>
  )
}

export default CategoryPage
