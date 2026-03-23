import Button from '@/shared/components/ui/Button'
import ErrorState from '@/shared/components/feedback/ErrorState'
import EmptyState from '@/shared/components/feedback/EmptyState'
import SkeletonBlock from '@/shared/components/feedback/SkeletonBlock'
import { useReviewReportMutation } from '@/features/reports/hooks/useReviewReportMutation'
import { useReportsQuery } from '@/features/reports/hooks/useReportsQuery'
import { useToast } from '@/shared/hooks/useToast'
import { usePageMeta } from '@/shared/lib/seo'
import '@/features/reports/components/reports.scss'

function ModerationPage() {
  usePageMeta({
    title: 'Moderacion',
    description: 'Revisa reportes y mantiene conversaciones seguras dentro de la plataforma.',
    noIndex: true,
  })
  const { showToast } = useToast()
  const reportsQuery = useReportsQuery()
  const reviewMutation = useReviewReportMutation()

  if (reportsQuery.isLoading) {
    return <SkeletonBlock lines={5} />
  }

  if (reportsQuery.isError) {
    return (
      <ErrorState
        title="No pudimos cargar moderacion"
        description="La lista de reportes no esta disponible."
        onRetry={() => void reportsQuery.refetch()}
      />
    )
  }

  if (!reportsQuery.data?.length) {
    return <EmptyState title="Sin reportes abiertos" description="El equipo de moderacion no tiene pendientes por ahora." />
  }

  return (
    <div className="page-stack">
      <section className="surface-panel page-header">
        <span className="page-header__eyebrow">Moderacion</span>
        <h2 className="page-header__title">Revision de reportes para cuidar el tono de la comunidad.</h2>
        <p className="page-header__description">
          Aqui se revisan los avisos enviados por la comunidad para mantener conversaciones mas seguras y legibles.
        </p>
      </section>

      <section className="surface-panel moderation-list">
        {reportsQuery.data.map((report) => (
          <article key={report.id} className="moderation-card">
            <strong>{report.reason}</strong>
            <p>{report.details}</p>
            <p>
              {report.targetType} · {report.targetId} · {report.status}
            </p>
            <Button
              variant="secondary"
              disabled={report.status === 'reviewed' || reviewMutation.isPending}
              onClick={() => {
                reviewMutation.mutate(report.id, {
                  onSuccess: () => {
                    showToast({
                      title: 'Reporte marcado como revisado.',
                      tone: 'success',
                    })
                  },
                })
              }}
            >
              {report.status === 'reviewed' ? 'Revisado' : 'Marcar revisado'}
            </Button>
          </article>
        ))}
      </section>
    </div>
  )
}

export default ModerationPage
