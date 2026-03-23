export interface ApiSuccess<T> {
  data: T
  meta?: {
    page?: number
    pageSize?: number
    total?: number
    [key: string]: unknown
  }
}

export interface ApiErrorPayload {
  message: string
  code: string
  status: number
  details?: unknown
}

export interface RequestOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'
  body?: unknown
  headers?: Record<string, string>
  auth?: boolean
  signal?: AbortSignal
}
