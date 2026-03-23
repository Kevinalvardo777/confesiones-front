import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthSplitTemplate from '@/components/templates/AuthSplitTemplate/AuthSplitTemplate'
import AuthForm from '@/features/auth/components/AuthForm'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { loginSchema } from '@/features/auth/schemas/auth.schemas'
import type { LoginPayload } from '@/features/auth/types/auth.types'
import Button from '@/shared/components/ui/Button'
import { appRoutes } from '@/shared/constants/routes'
import { useToast } from '@/shared/hooks/useToast'
import { usePageMeta } from '@/shared/lib/seo'
import '@/features/auth/components/auth.scss'

function LoginPage() {
  usePageMeta({
    title: 'Iniciar sesion',
    description: 'Accede para publicar, comentar, votar y reportar contenido dentro de tu comunidad.',
    noIndex: true,
  })
  const navigate = useNavigate()
  const { login, loginAsGuest } = useAuth()
  const { showToast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isGuestSubmitting, setIsGuestSubmitting] = useState(false)

  return (
    <AuthSplitTemplate
      title="Entra y sumate a la conversacion sin perder tu estilo."
      description="Puedes quedarte con tu cuenta o entrar como invitado para explorar antes de participar."
    >
      <AuthForm
        title="Iniciar sesion"
        description="Accede para publicar, comentar, votar y reportar contenido."
        schema={loginSchema}
        fields={[
          { name: 'email', label: 'Correo', type: 'email', placeholder: 'ana@campussecret.app', autoComplete: 'email' },
          {
            name: 'password',
            label: 'Contrasena',
            type: 'password',
            placeholder: 'Password123',
            autoComplete: 'current-password',
          },
        ]}
        submitLabel="Ingresar"
        isSubmitting={isSubmitting}
        defaultValues={{ email: '', password: '' }}
        onSubmit={async (values) => {
          try {
            setIsSubmitting(true)
            await login(values as unknown as LoginPayload)
            navigate(appRoutes.home)
          } catch (error) {
            showToast({
              title: error instanceof Error ? error.message : 'No pudimos iniciar sesion.',
              tone: 'error',
            })
          } finally {
            setIsSubmitting(false)
          }
        }}
        footer={
          <>
            <Button
              type="button"
              variant="secondary"
              fullWidth
              disabled={isGuestSubmitting}
              onClick={() => {
                setIsGuestSubmitting(true)
                void loginAsGuest()
                  .then(() => navigate(appRoutes.home))
                  .catch((error: unknown) => {
                    showToast({
                      title: error instanceof Error ? error.message : 'No pudimos entrar como invitado.',
                      tone: 'error',
                    })
                  })
                  .finally(() => {
                    setIsGuestSubmitting(false)
                  })
              }}
            >
              {isGuestSubmitting ? 'Entrando...' : 'Continuar como invitado'}
            </Button>
            <Link to={appRoutes.register}>Crear una cuenta</Link>
          </>
        }
      />
    </AuthSplitTemplate>
  )
}

export default LoginPage
