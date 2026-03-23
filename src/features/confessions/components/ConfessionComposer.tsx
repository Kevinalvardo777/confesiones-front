import { useState } from 'react'
import type { z } from 'zod'
import Input from '@/components/atoms/Input/Input'
import Textarea from '@/components/atoms/Textarea/Textarea'
import FormField from '@/components/molecules/FormField/FormField'
import { createConfessionSchema } from '@/features/confessions/schemas/confession.schemas'
import { sanitizeText } from '@/shared/lib/sanitize'
import Button from '@/shared/components/ui/Button'
import './confessions.scss'

type ConfessionFormValues = z.infer<typeof createConfessionSchema>

interface ConfessionComposerProps {
  sectionName: string
  isSubmitting: boolean
  onSubmit: (values: ConfessionFormValues) => Promise<void>
}

function ConfessionComposer({ sectionName, isSubmitting, onSubmit }: ConfessionComposerProps) {
  const [values, setValues] = useState<ConfessionFormValues>({
    alias: '',
    content: '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof ConfessionFormValues, string>>>({})

  function updateField(field: keyof ConfessionFormValues, value: string) {
    setValues((current) => ({
      ...current,
      [field]: value,
    }))
    setErrors((current) => ({
      ...current,
      [field]: undefined,
    }))
  }

  return (
    <section className="confession-composer surface-panel">
      <div className="confession-composer__copy">
        <span className="page-header__eyebrow">Publicar en {sectionName}</span>
        <h2>Sueltalo sin exponer tu identidad.</h2>
        <p>Dejamos la UI preparada para imagenes futuras, pero ahora el flujo principal es texto + alias opcional.</p>
      </div>

      <form
        className="confession-composer__form"
        onSubmit={async (event) => {
          event.preventDefault()

          const payload = {
            alias: sanitizeText(values.alias ?? ''),
            content: sanitizeText(values.content ?? ''),
          }

          const result = createConfessionSchema.safeParse(payload)

          if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors

            setErrors({
              alias: fieldErrors.alias?.[0],
              content: fieldErrors.content?.[0],
            })
            return
          }

          setErrors({})
          await onSubmit(result.data)
          setValues({
            alias: '',
            content: '',
          })
        }}
      >
        <FormField
          id="confession-alias"
          label="Alias"
          hint="Opcional. Si lo dejas vacio se publicara como Anonimo."
          error={errors.alias}
        >
          <Input
            id="confession-alias"
            maxLength={40}
            placeholder="Ej. Fantasma del bloque A"
            value={values.alias ?? ''}
            onChange={(event) => updateField('alias', event.target.value)}
          />
        </FormField>

        <FormField
          id="confession-content"
          label="Confesion"
          footer={<p className="molecule-field__hint confession-composer__counter">{values.content.length} / 600 caracteres</p>}
          error={errors.content}
        >
          <Textarea
            id="confession-content"
            rows={6}
            maxLength={600}
            placeholder={`Que paso hoy en ${sectionName}?`}
            value={values.content}
            onChange={(event) => updateField('content', event.target.value)}
          />
        </FormField>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Publicando...' : 'Publicar confesion'}
        </Button>
      </form>
    </section>
  )
}

export default ConfessionComposer
