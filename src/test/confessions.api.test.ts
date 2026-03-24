import { vi } from 'vitest'
import { authApi } from '@/features/auth/api/auth.api'
import { confessionsApi } from '@/features/confessions/api/confessions.api'
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

describe('confessionsApi', () => {
  beforeEach(async () => {
    window.localStorage.clear()
    resetDb()
    await authApi.login({
      email: 'ana@campussecret.app',
      password: 'Password123',
    })
  })

  it('creates a confession and returns it ready for UI consumption', async () => {
    const confession = await confessionsApi.create({
      communityId: 'iess-ceibos',
      alias: 'Tester',
      content: 'Este es un texto de prueba suficientemente largo.',
    })

    expect(confession.alias).toBe('Tester')
    expect(confession.averageRating).toBe(0)
  })
})
