import { setAuthSession } from '@/shared/api/authSession'
import { httpClient } from '@/shared/api/httpClient'
import type { AuthResponse, AuthUser, LoginPayload, RegisterPayload, SessionTokens } from '@/features/auth/types/auth.types'

export const authApi = {
  async me() {
    const response = await httpClient.get<AuthUser>('/auth/me')
    return response.data
  },
  async login(payload: LoginPayload) {
    const response = await httpClient.post<AuthResponse>('/auth/login', payload, { auth: false })
    setAuthSession(response.data.session)
    return response.data
  },
  async register(payload: RegisterPayload) {
    const response = await httpClient.post<AuthResponse>('/auth/register', payload, { auth: false })
    setAuthSession(response.data.session)
    return response.data
  },
  async guest() {
    const response = await httpClient.post<AuthResponse>('/auth/guest', undefined, { auth: false })
    setAuthSession(response.data.session)
    return response.data
  },
  async refresh() {
    const response = await httpClient.post<SessionTokens>('/auth/refresh', undefined, { auth: false })
    setAuthSession(response.data)
    return response.data
  },
  async restoreSession() {
    const session = await this.refresh()
    const user = await this.me()
    return { session, user }
  },
  async logout() {
    await httpClient.post('/auth/logout')
    setAuthSession(null)
  },
}
