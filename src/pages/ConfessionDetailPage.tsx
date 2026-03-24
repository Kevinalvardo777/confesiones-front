import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '@/features/auth/hooks/useAuth'
import CommentForm from '@/features/comments/components/CommentForm'
import CommentsPanel from '@/features/comments/components/CommentsPanel'
import { useCreateCommentMutation } from '@/features/comments/hooks/useCreateCommentMutation'
import { useCommentsQuery } from '@/features/comments/hooks/useCommentsQuery'
import ConfessionCard from '@/features/confessions/components/ConfessionCard'
import { useConfessionDetailQuery } from '@/features/confessions/hooks/useConfessionDetailQuery'
import { useVoteConfessionMutation } from '@/features/confessions/hooks/useVoteConfessionMutation'
import ReportForm from '@/features/reports/components/ReportForm'
import { useCreateReportMutation } from '@/features/reports/hooks/useCreateReportMutation'
import { useCommunitiesQuery } from '@/features/sections/hooks/useSectionsQuery'
import ErrorState from '@/shared/components/feedback/ErrorState'
import SkeletonBlock from '@/shared/components/feedback/SkeletonBlock'
import { appRoutes } from '@/shared/constants/routes'
import { useToast } from '@/shared/hooks/useToast'
import { usePageMeta } from '@/shared/lib/seo'
import '@/features/comments/components/comments.scss'
import '@/features/reports/components/reports.scss'
import '@/features/confessions/components/confessions.scss'

function ConfessionDetailPage() {
  const { confessionSlug = '' } = useParams()
  const { isAuthenticated } = useAuth()
  const { showToast } = useToast()
  const confessionQuery = useConfessionDetailQuery(confessionSlug)
  usePageMeta(
    confessionQuery.data ? `Confesion en ${confessionQuery.data.communityId}` : 'Detalle de confesion',
    'Consulta una confesion, sus comentarios y las opciones para interactuar con ella.',
  )
  const commentsQuery = useCommentsQuery(confessionQuery.data?.id ?? '')
  const communitiesQuery = useCommunitiesQuery()
  const voteMutation = useVoteConfessionMutation()
  const commentMutation = useCreateCommentMutation(confessionSlug)
  const reportMutation = useCreateReportMutation()

  const sectionNames = useMemo(
    () => Object.fromEntries((communitiesQuery.data ?? []).map((item) => [item.id, item.name])) as Record<string, string>,
    [communitiesQuery.data],
  )

  if (confessionQuery.isLoading) {
    return <SkeletonBlock lines={5} />
  }

  if (confessionQuery.isError || !confessionQuery.data) {
    return (
      <ErrorState
        title="No pudimos cargar la confesion"
        description="Puede que ya no este disponible o que haya ocurrido un problema temporal."
        onRetry={() => void confessionQuery.refetch()}
      />
    )
  }

  const confession = confessionQuery.data

  return (
    <div className="detail-shell">
      <div className="page-stack">
        <ConfessionCard
          confession={confession}
          sectionName={sectionNames[confession.communityId] ?? confession.communityId}
          detailHref={appRoutes.confessionDetail(confession.communityId, confession.slug)}
          votePending={voteMutation.isPending}
          onVote={(currentConfessionId, stars) => {
            if (!isAuthenticated) {
              showToast({
                title: 'Debes autenticarte para votar.',
                tone: 'error',
              })
              return
            }

            voteMutation.mutate(
              { confessionId: currentConfessionId, stars },
              {
                onSuccess: () => {
                  showToast({
                    title: 'Tu voto fue registrado.',
                    tone: 'success',
                  })
                },
              },
            )
          }}
        />

        <CommentForm
          isSubmitting={commentMutation.isPending}
          onSubmit={async (values) => {
            if (!isAuthenticated) {
              showToast({
                title: 'Debes autenticarte para comentar.',
                tone: 'error',
              })
              return
            }

            await commentMutation.mutateAsync({
              confessionId: confession.id,
              authorName: values.authorName,
              content: values.content,
            })

            showToast({
              title: 'Comentario publicado.',
              tone: 'success',
            })
          }}
        />

        {commentsQuery.isError ? (
          <ErrorState
            title="No pudimos cargar los comentarios"
            description="La conversacion no esta disponible por ahora."
            onRetry={() => void commentsQuery.refetch()}
          />
        ) : (
          <CommentsPanel comments={commentsQuery.data ?? []} isLoading={commentsQuery.isLoading} />
        )}
      </div>

      <aside className="detail-sidebar">
        <ReportForm
          isSubmitting={reportMutation.isPending}
          onSubmit={async (values) => {
            if (!isAuthenticated) {
              showToast({
                title: 'Debes autenticarte para reportar contenido.',
                tone: 'error',
              })
              return
            }

            await reportMutation.mutateAsync({
              targetType: 'confession',
              targetId: confession.id,
              reason: values.reason,
              details: values.details,
            })

            showToast({
              title: 'Reporte enviado al equipo de moderacion.',
              tone: 'success',
            })
          }}
        />
      </aside>
    </div>
  )
}

export default ConfessionDetailPage
