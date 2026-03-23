import type { ApiErrorPayload } from '@/shared/types/api'

export class AppError extends Error {
  code: string
  status: number
  details?: unknown

  constructor(payload: ApiErrorPayload) {
    super(payload.message)
    this.name = 'AppError'
    this.code = payload.code
    this.status = payload.status
    this.details = payload.details
  }
}

export function toAppError(error: unknown) {
  if (error instanceof AppError) {
    return error
  }

  if (error instanceof Error) {
    return new AppError({
      message: error.message,
      code: 'UNEXPECTED_ERROR',
      status: 500,
    })
  }

  return new AppError({
    message: 'Ocurrio un error inesperado. Intenta de nuevo.',
    code: 'UNKNOWN_ERROR',
    status: 500,
  })
}
