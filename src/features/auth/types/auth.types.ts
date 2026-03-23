export type UserRole = 'guest' | 'user' | 'moderator' | 'admin'

export interface AuthUser {
  id: string
  name: string
  email: string
  role: UserRole
  isGuest: boolean
}

export interface SessionTokens {
  accessToken: string
  expiresAt: string
  refreshExpiresAt?: string
}

export interface AuthResponse {
  user: AuthUser
  session: SessionTokens
}

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  name: string
  email: string
  password: string
}
