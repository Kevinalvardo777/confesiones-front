import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'
import Input from '@/components/atoms/Input/Input'
import Textarea from '@/components/atoms/Textarea/Textarea'
import FormField from '@/components/molecules/FormField/FormField'
import { createReportSchema } from '@/features/reports/schemas/report.schemas'
import Button from '@/shared/components/ui/Button'
import './reports.scss'

type ReportFormValues = z.infer<typeof createReportSchema>

interface ReportFormProps {
  title?: string
  isSubmitting: boolean
  onSubmit: (values: ReportFormValues) => Promise<void>
}

function ReportForm({ title = 'Reportar contenido', isSubmitting, onSubmit }: ReportFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReportFormValues>({
    resolver: zodResolver(createReportSchema),
    defaultValues: {
      reason: '',
      details: '',
    },
  })

  return (
    <form
      className="report-form surface-panel"
      onSubmit={handleSubmit(async (values) => {
        await onSubmit(values)
        reset()
      })}
    >
      <h3>{title}</h3>
      <FormField id="report-reason" label="Razon" error={errors.reason?.message}>
        <Input id="report-reason" maxLength={50} placeholder="Ej. Acoso, insultos, spam" {...register('reason')} />
      </FormField>
      <FormField id="report-details" label="Detalle" error={errors.details?.message}>
        <Textarea id="report-details" rows={4} maxLength={280} {...register('details')} />
      </FormField>
      <Button type="submit" variant="danger" disabled={isSubmitting}>
        {isSubmitting ? 'Enviando...' : 'Enviar reporte'}
      </Button>
    </form>
  )
}

export default ReportForm
