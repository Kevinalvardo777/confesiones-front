import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthSplitTemplate from '@/components/templates/AuthSplitTemplate/AuthSplitTemplate'
import AuthForm from '@/features/auth/components/AuthForm'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { registerSchema } from '@/features/auth/schemas/auth.schemas'
import type { RegisterPayload } from '@/features/auth/types/auth.types'
import { appRoutes } from '@/shared/constants/routes'
import { useToast } from '@/shared/hooks/useToast'
import { usePageMeta } from '@/shared/lib/seo'
import '@/features/auth/components/auth.scss'

function RegisterPage() {
  usePageMeta({
    title: 'Crear cuenta',
    description: 'Crea una cuenta para publicar, comentar y volver a tus conversaciones cuando quieras.',
    noIndex: true,
  })
  const navigate = useNavigate()
  const { register: registerUser } = useAuth()
  const { showToast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  return (
    <AuthSplitTemplate
      title="Crea tu cuenta y deja que tus historias encuentren su lugar."
      description="Con una cuenta podras publicar, comentar y volver cuando quieras sin empezar de cero."
    >
      <AuthForm
        title="Crear cuenta"
        description="Tu sesion se persistira de forma segura del lado cliente."
        schema={registerSchema}
        fields={[
          { name: 'name', label: 'Nombre', placeholder: 'Ana Rios', autoComplete: 'name' },
          { name: 'email', label: 'Correo', type: 'email', placeholder: 'ana@campussecret.app', autoComplete: 'email' },
          { name: 'password', label: 'Contrasena', type: 'password', placeholder: 'Password123', autoComplete: 'new-password' },
          {
            name: 'confirmPassword',
            label: 'Confirmar contrasena',
            type: 'password',
            placeholder: 'Password123',
            autoComplete: 'new-password',
          },
        ]}
        submitLabel="Crear cuenta"
        isSubmitting={isSubmitting}
        defaultValues={{ name: '', email: '', password: '', confirmPassword: '' }}
        onSubmit={async (values) => {
          try {
            setIsSubmitting(true)
            await registerUser({
              name: values.name,
              email: values.email,
              password: values.password,
            } as unknown as RegisterPayload)
            navigate(appRoutes.home)
          } catch (error) {
            showToast({
              title: error instanceof Error ? error.message : 'No pudimos crear tu cuenta.',
              tone: 'error',
            })
          } finally {
            setIsSubmitting(false)
          }
        }}
        footer={<Link to={appRoutes.login}>Ya tengo cuenta</Link>}
      />
    </AuthSplitTemplate>
  )
}

export default RegisterPage
