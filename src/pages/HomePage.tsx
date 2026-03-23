import ErrorState from '@/shared/components/feedback/ErrorState'
import SkeletonBlock from '@/shared/components/feedback/SkeletonBlock'
import CategoryCard from '@/features/categories/components/CategoryCard'
import { useCategoriesQuery } from '@/features/categories/hooks/useCategoriesQuery'
import '@/features/categories/components/categories.scss'
import '@/features/sections/components/sections.scss'
import { usePageMeta } from '@/shared/lib/seo'
import './pages.scss'

function HomePage() {
  usePageMeta('Inicio', 'Explora categorias y comunidades de Ecuador para leer confesiones, reacciones y conversaciones.')
  const categoriesQuery = useCategoriesQuery()
  const totalCategories = categoriesQuery.data?.length ?? 0
  const totalCommunities = (categoriesQuery.data ?? []).reduce((sum, category) => sum + category.communitiesCount, 0)
  const totalConfessions = (categoriesQuery.data ?? []).reduce((sum, category) => sum + category.confessionsCount, 0)

  return (
    <div className="page-stack">
      <section id="campus-map" className="page-home-intro surface-panel">
        <div>
          <span className="page-header__eyebrow">Mapa de categorias</span>
          <h2>Empieza por el sector y luego entra a la comunidad concreta que quieres explorar.</h2>
        </div>
        <p>
          Universidades, iglesias, empresas y hospitales viven realidades distintas. Primero eliges la categoria y
          luego ves las comunidades que hay dentro.
        </p>
      </section>

      {categoriesQuery.data ? (
        <section className="page-home-summary">
          <article className="page-home-summary__lead surface-panel">
            <span className="page-header__eyebrow">Ahora mismo</span>
            <h3>Explora sectores de Ecuador y luego entra a las comunidades que forman parte de cada uno.</h3>
            <p>
              El flujo ya no es plano. Primero ves las categorias grandes y luego sus entidades: universidades,
              iglesias, empresas, hospitales y mas.
            </p>
          </article>

          <article className="page-home-summary__stat surface-panel">
            <strong>{totalCategories}</strong>
            <span>categorias activas</span>
          </article>

          <article className="page-home-summary__stat surface-panel">
            <strong>{totalCommunities}</strong>
            <span>comunidades activas</span>
          </article>

          <article className="page-home-summary__stat surface-panel">
            <strong>{totalConfessions}</strong>
            <span>confesiones visibles</span>
          </article>
        </section>
      ) : null}

      {categoriesQuery.isLoading ? (
        <div className="category-grid">
          <SkeletonBlock lines={4} />
          <SkeletonBlock lines={4} />
          <SkeletonBlock lines={4} />
          <SkeletonBlock lines={4} />
        </div>
      ) : null}

      {categoriesQuery.isError ? (
        <ErrorState
          title="No pudimos cargar las categorias"
          description="La lista de sectores fallo. Puedes reintentar sin perder el contexto."
          onRetry={() => void categoriesQuery.refetch()}
        />
      ) : null}

      {categoriesQuery.data ? (
        <section className="category-grid">
          {categoriesQuery.data.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </section>
      ) : null}
    </div>
  )
}

export default HomePage
