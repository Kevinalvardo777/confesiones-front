import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import type { ReactNode } from 'react'
import Input from '@/components/atoms/Input/Input'
import FormField from '@/components/molecules/FormField/FormField'
import type { ZodTypeAny } from 'zod'
import Button from '@/shared/components/ui/Button'
import './auth.scss'

type AuthFormValues = Record<string, string>

interface AuthFormField {
  name: string
  label: string
  type?: 'text' | 'email' | 'password'
  placeholder?: string
  autoComplete?: string
}

interface AuthFormProps {
  title: string
  description: string
  schema: ZodTypeAny
  fields: AuthFormField[]
  submitLabel: string
  isSubmitting: boolean
  defaultValues: AuthFormValues
  onSubmit: (values: AuthFormValues) => Promise<void>
  footer?: ReactNode
}

function AuthForm({
  title,
  description,
  schema,
  fields,
  submitLabel,
  isSubmitting,
  defaultValues,
  onSubmit,
  footer,
}: AuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormValues>({
    resolver: zodResolver(schema as never) as never,
    defaultValues,
  })

  return (
    <section className="auth-card surface-panel">
      <div>
        <span className="page-header__eyebrow">Cuenta</span>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>

      <form
        className="auth-card__form"
        onSubmit={handleSubmit(async (values) => {
          await onSubmit(values)
        })}
      >
        {fields.map((field) => {
          const errorMessage = errors[field.name]?.message

          return (
            <FormField key={field.name} id={field.name} label={field.label} error={typeof errorMessage === 'string' ? errorMessage : undefined}>
              <Input
                id={field.name}
                type={field.type ?? 'text'}
                placeholder={field.placeholder}
                autoComplete={field.autoComplete}
                {...register(field.name as never)}
              />
            </FormField>
          )
        })}

        <Button type="submit" disabled={isSubmitting} fullWidth>
          {isSubmitting ? 'Procesando...' : submitLabel}
        </Button>
      </form>

      {footer ? <div className="auth-card__footer">{footer}</div> : null}
    </section>
  )
}

export default AuthForm
