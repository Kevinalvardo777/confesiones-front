import { useMemo, useState, type CSSProperties } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '@/features/auth/hooks/useAuth'
import ConfessionComposer from '@/features/confessions/components/ConfessionComposer'
import ConfessionFeed from '@/features/confessions/components/ConfessionFeed'
import ConfessionFilters from '@/features/confessions/components/ConfessionFilters'
import { useCreateConfessionMutation } from '@/features/confessions/hooks/useCreateConfessionMutation'
import { useConfessionsQuery } from '@/features/confessions/hooks/useConfessionsQuery'
import { useVoteConfessionMutation } from '@/features/confessions/hooks/useVoteConfessionMutation'
import { useCommunitiesQuery } from '@/features/sections/hooks/useSectionsQuery'
import ErrorState from '@/shared/components/feedback/ErrorState'
import EmptyState from '@/shared/components/feedback/EmptyState'
import { usePageMeta } from '@/shared/lib/seo'
import { useToast } from '@/shared/hooks/useToast'
import './pages.scss'

function SectionPage() {
  const { communityId = '' } = useParams()
  const { isAuthenticated } = useAuth()
  const { showToast } = useToast()
  const [selectedDate, setSelectedDate] = useState('')
  const [sort, setSort] = useState<'recent' | 'top'>('recent')

  const communitiesQuery = useCommunitiesQuery()
  const community = communitiesQuery.data?.find((item) => item.id === communityId)
  usePageMeta(community ? community.name : 'Comunidad', 'Lee y publica confesiones dentro de una comunidad especifica.')
  const confessionsQuery = useConfessionsQuery({
    communityId,
    createdAt: selectedDate,
    sort,
  })
  const createMutation = useCreateConfessionMutation(communityId)
  const voteMutation = useVoteConfessionMutation()

  const communityNames = useMemo(
    () =>
      Object.fromEntries((communitiesQuery.data ?? []).map((item) => [item.id, item.name])) as Record<string, string>,
    [communitiesQuery.data],
  )

  if (communitiesQuery.isError) {
    return (
      <ErrorState
        title="No pudimos cargar la comunidad"
        description="La informacion de este espacio no esta disponible en este momento."
        onRetry={() => void communitiesQuery.refetch()}
      />
    )
  }

  if (!community && communitiesQuery.data) {
    return <EmptyState title="Comunidad no encontrada" description="La ruta no coincide con una comunidad disponible." />
  }

  return (
    <div className="page-stack">
      {community ? (
        <section className="section-hero surface-panel" style={{ '--section-accent': community.accent } as CSSProperties}>
          <div>
            <span className="page-header__eyebrow">{community.city}</span>
            <h2>{community.name}</h2>
          </div>
          <p>{community.description}</p>
        </section>
      ) : null}

      {community ? (
        <ConfessionComposer
          sectionName={community.name}
          isSubmitting={createMutation.isPending}
          onSubmit={async (values) => {
            if (!isAuthenticated) {
              showToast({
                title: 'Debes iniciar sesion o entrar como invitado para publicar.',
                tone: 'error',
              })
              return
            }

            await createMutation.mutateAsync({
              communityId,
              alias: values.alias,
              content: values.content,
            })

            showToast({
              title: 'Confesion publicada.',
              tone: 'success',
            })
          }}
        />
      ) : null}

      <ConfessionFilters
        selectedDate={selectedDate}
        sort={sort}
        totalVisible={confessionsQuery.data?.items.length ?? 0}
        onDateChange={setSelectedDate}
        onSortChange={setSort}
      />

      {confessionsQuery.isError ? (
        <ErrorState
          title="No pudimos cargar el feed"
          description="La consulta fallo. Puedes reintentar y mantener tus filtros."
          onRetry={() => void confessionsQuery.refetch()}
        />
      ) : (
        <ConfessionFeed
          confessions={confessionsQuery.data?.items ?? []}
          isLoading={confessionsQuery.isLoading}
          emptyMessage="No hay confesiones para los filtros activos."
          communityNames={communityNames}
          votePending={voteMutation.isPending}
          onVote={(confessionId, stars) => {
            if (!isAuthenticated) {
              showToast({
                title: 'Inicia sesion o entra como invitado para votar.',
                tone: 'error',
              })
              return
            }

            voteMutation.mutate(
              { confessionId, stars },
              {
                onSuccess: () => {
                  showToast({
                    title: `Registraste ${stars} estrellas.`,
                    tone: 'success',
                  })
                },
              },
            )
          }}
        />
      )}
    </div>
  )
}

export default SectionPage
