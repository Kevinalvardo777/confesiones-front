import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { authApi } from '@/features/auth/api/auth.api'
import type { AuthUser } from '@/features/auth/types/auth.types'
import { AuthContext, type AuthContextValue } from '@/app/providers/AuthContext'
import { setAuthSession } from '@/shared/api/authSession'
import { useToast } from '@/shared/hooks/useToast'

function AuthProvider({ children }: { children: ReactNode }) {
  const { showToast } = useToast()
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isBootstrapping, setIsBootstrapping] = useState(true)

  useEffect(() => {
    authApi
      .restoreSession()
      .then(({ user: currentUser }) => {
        setUser(currentUser)
      })
      .catch(() => {
        setAuthSession(null)
        setUser(null)
      })
      .finally(() => {
        setIsBootstrapping(false)
      })
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isBootstrapping,
      login: async (payload) => {
        const response = await authApi.login(payload)
        setUser(response.user)
        showToast({
          title: `Sesion iniciada como ${response.user.name}.`,
          tone: 'success',
        })
      },
      register: async (payload) => {
        const response = await authApi.register(payload)
        setUser(response.user)
        showToast({
          title: 'Cuenta creada correctamente.',
          tone: 'success',
        })
      },
      loginAsGuest: async () => {
        const response = await authApi.guest()
        setUser(response.user)
        showToast({
          title: 'Entraste como invitado.',
          tone: 'info',
        })
      },
      logout: async () => {
        await authApi.logout()
        setUser(null)
        showToast({
          title: 'Sesion cerrada.',
          tone: 'info',
        })
      },
    }),
    [isBootstrapping, showToast, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
