import { AppError, toAppError } from '@/shared/lib/errors'

describe('AppError helpers', () => {
  it('keeps AppError instances untouched', () => {
    const error = new AppError({
      code: 'INVALID',
      message: 'Invalid payload',
      status: 400,
    })

    expect(toAppError(error)).toBe(error)
  })

  it('maps generic Error to UNEXPECTED_ERROR', () => {
    const mapped = toAppError(new Error('boom'))

    expect(mapped).toBeInstanceOf(AppError)
    expect(mapped.code).toBe('UNEXPECTED_ERROR')
    expect(mapped.status).toBe(500)
    expect(mapped.message).toBe('boom')
  })

  it('maps unknown values to UNKNOWN_ERROR', () => {
    const mapped = toAppError('boom')

    expect(mapped.code).toBe('UNKNOWN_ERROR')
    expect(mapped.status).toBe(500)
  })
})
