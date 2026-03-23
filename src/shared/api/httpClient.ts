import { getAuthSession, setAuthSession } from '@/shared/api/authSession'
import { appEnv } from '@/shared/constants/env'
import { AppError, toAppError } from '@/shared/lib/errors'
import { mockRequest } from '@/shared/mocks/mockTransport'
import type { ApiErrorPayload, ApiSuccess, RequestOptions } from '@/shared/types/api'

async function requestFetch<T>(path: string, options: RequestOptions = {}): Promise<ApiSuccess<T>> {
  const session = getAuthSession()
  const headers = new Headers(options.headers)

  headers.set('Content-Type', 'application/json')

  if (options.auth !== false && session?.accessToken) {
    headers.set('Authorization', `Bearer ${session.accessToken}`)
  }

  const response = await fetch(`${appEnv.apiBaseUrl}${path}`, {
    method: options.method ?? 'GET',
    body: options.body ? JSON.stringify(options.body) : undefined,
    headers,
    signal: options.signal,
    credentials: 'include',
  })

  if (response.status === 401 && options.auth !== false && path !== '/auth/refresh') {
    try {
      const refreshResponse = await requestFetch<{
        accessToken: string
        expiresAt: string
        refreshExpiresAt?: string
      }>('/auth/refresh', {
        method: 'POST',
        auth: false,
      })

      setAuthSession(refreshResponse.data)

      return requestFetch<T>(path, options)
    } catch {
      setAuthSession(null)
    }
  }

  const payload = (await response.json()) as ApiSuccess<T> | ApiErrorPayload

  if (!response.ok) {
    throw new AppError(payload as ApiErrorPayload)
  }

  return payload as ApiSuccess<T>
}

async function requestMock<T>(path: string, options: RequestOptions = {}) {
  const session = getAuthSession()
  const headers = {
    ...options.headers,
  }

  if (options.auth !== false && session?.accessToken) {
    headers.Authorization = `Bearer ${session.accessToken}`
  }

  return mockRequest<T>(path, {
    ...options,
    headers,
  })
}

export const httpClient = {
  async request<T>(path: string, options?: RequestOptions) {
    try {
      return appEnv.useMocks ? await requestMock<T>(path, options) : await requestFetch<T>(path, options)
    } catch (error) {
      throw toAppError(error)
    }
  },
  get<T>(path: string, options?: Omit<RequestOptions, 'method' | 'body'>) {
    return this.request<T>(path, { ...options, method: 'GET' })
  },
  post<T>(path: string, body?: unknown, options?: Omit<RequestOptions, 'method' | 'body'>) {
    return this.request<T>(path, { ...options, body, method: 'POST' })
  },
  patch<T>(path: string, body?: unknown, options?: Omit<RequestOptions, 'method' | 'body'>) {
    return this.request<T>(path, { ...options, body, method: 'PATCH' })
  },
}
