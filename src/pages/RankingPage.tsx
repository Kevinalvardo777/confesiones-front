import { useMemo, useState } from 'react'
import { useAuth } from '@/features/auth/hooks/useAuth'
import ConfessionFeed from '@/features/confessions/components/ConfessionFeed'
import { useVoteConfessionMutation } from '@/features/confessions/hooks/useVoteConfessionMutation'
import { useRankingQuery } from '@/features/ranking/hooks/useRankingQuery'
import { useCommunitiesQuery } from '@/features/sections/hooks/useSectionsQuery'
import ErrorState from '@/shared/components/feedback/ErrorState'
import { useToast } from '@/shared/hooks/useToast'
import { usePageMeta } from '@/shared/lib/seo'
import './pages.scss'

function RankingPage() {
  usePageMeta('Ranking', 'Descubre las confesiones con mayor reaccion global o por comunidad.')
  const { isAuthenticated } = useAuth()
  const { showToast } = useToast()
  const [scope, setScope] = useState<'global' | 'community'>('global')
  const [communityId, setCommunityId] = useState('')
  const communitiesQuery = useCommunitiesQuery()
  const rankingQuery = useRankingQuery({
    scope,
    communityId: scope === 'community' ? communityId || undefined : undefined,
  })
  const voteMutation = useVoteConfessionMutation()

  const sectionNames = useMemo(
    () => Object.fromEntries((communitiesQuery.data ?? []).map((item) => [item.id, item.name])) as Record<string, string>,
    [communitiesQuery.data],
  )

  return (
    <div className="page-stack">
      <section className="surface-panel page-header">
        <span className="page-header__eyebrow">Top confesiones</span>
        <h2 className="page-header__title">Las historias que mas reaccion despiertan en la comunidad.</h2>
        <p className="page-header__description">
          Mira lo mas comentado y mejor valorado del momento, ya sea en general o dentro de una comunidad concreta.
        </p>
        <div className="confession-filters__controls">
          <div className="field">
            <label htmlFor="ranking-scope">Alcance</label>
            <select id="ranking-scope" value={scope} onChange={(event) => setScope(event.target.value as 'global' | 'community')}>
              <option value="global">Global</option>
              <option value="community">Por comunidad</option>
            </select>
          </div>

          {scope === 'community' ? (
            <div className="field">
              <label htmlFor="ranking-section">Comunidad</label>
              <select id="ranking-section" value={communityId} onChange={(event) => setCommunityId(event.target.value)}>
                <option value="">Selecciona uno</option>
                {(communitiesQuery.data ?? []).map((community) => (
                  <option key={community.id} value={community.id}>
                    {community.name}
                  </option>
                ))}
              </select>
            </div>
          ) : null}
        </div>
      </section>

      {rankingQuery.isError ? (
        <ErrorState
          title="No pudimos cargar el ranking"
          description="Hubo un problema al traer las historias destacadas. Puedes intentarlo otra vez."
          onRetry={() => void rankingQuery.refetch()}
        />
      ) : (
        <ConfessionFeed
          confessions={rankingQuery.data ?? []}
          isLoading={rankingQuery.isLoading}
          emptyMessage="Todavia no hay suficientes votos para este alcance."
          communityNames={sectionNames}
          votePending={voteMutation.isPending}
          onVote={(confessionId, stars) => {
            if (!isAuthenticated) {
              showToast({
                title: 'Debes autenticarte para votar.',
                tone: 'error',
              })
              return
            }

            voteMutation.mutate(
              { confessionId, stars },
              {
                onSuccess: () => {
                  showToast({
                    title: 'Tu voto actualizo el ranking.',
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

export default RankingPage
