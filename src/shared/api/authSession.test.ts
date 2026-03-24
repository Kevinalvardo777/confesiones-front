import { getAuthSession, setAuthSession } from '@/shared/api/authSession'

describe('authSession', () => {
  afterEach(() => {
    setAuthSession(null)
  })

  it('stores and retrieves session state', () => {
    const session = {
      accessToken: 'token-123',
      expiresAt: '2026-03-24T00:00:00.000Z',
      refreshExpiresAt: '2026-04-24T00:00:00.000Z',
    }

    setAuthSession(session)
    expect(getAuthSession()).toEqual(session)
  })

  it('supports clearing session state', () => {
    setAuthSession({
      accessToken: 'token-123',
      expiresAt: '2026-03-24T00:00:00.000Z',
    })
    setAuthSession(null)

    expect(getAuthSession()).toBeNull()
  })
})
