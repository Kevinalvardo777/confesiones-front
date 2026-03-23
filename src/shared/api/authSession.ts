export interface AuthSessionState {
  accessToken: string
  expiresAt: string
  refreshExpiresAt?: string
}

let currentSession: AuthSessionState | null = null

export function getAuthSession() {
  return currentSession
}

export function setAuthSession(session: AuthSessionState | null) {
  currentSession = session
}
