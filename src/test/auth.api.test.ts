import { vi } from 'vitest'
import { authApi } from '@/features/auth/api/auth.api'
import { resetDb } from '@/shared/mocks/db'

vi.mock('@/shared/constants/env', () => ({
  appEnv: {
    appName: 'Confesiones EC',
    apiBaseUrl: '/api/v1',
    useMocks: true,
    mockDelayMs: 0,
    siteUrl: '',
    defaultOgImage: '/og-default.svg',
  },
}))

describe('authApi', () => {
  beforeEach(() => {
    window.localStorage.clear()
    resetDb()
  })

  it('logs in with valid seeded credentials', async () => {
    const response = await authApi.login({
      email: 'ana@campussecret.app',
      password: 'Password123',
    })

    expect(response.user.email).toBe('ana@campussecret.app')
    expect(response.session.accessToken).toContain('token-')
  })
})
