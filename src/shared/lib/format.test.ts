import { buildSearchParams, formatRelativeCount, toDateInputValue } from '@/shared/lib/format'

describe('format utils', () => {
  it('formats singular/plural counts', () => {
    expect(formatRelativeCount(1, 'comentario', 'comentarios')).toBe('1 comentario')
    expect(formatRelativeCount(2, 'comentario', 'comentarios')).toBe('2 comentarios')
  })

  it('builds search params skipping empty and undefined values', () => {
    expect(
      buildSearchParams({
        q: 'hola',
        page: 2,
        empty: '',
        ignored: undefined,
      }),
    ).toBe('q=hola&page=2')
  })

  it('converts ISO date to yyyy-mm-dd input format', () => {
    expect(toDateInputValue('2026-03-24T10:00:00.000Z')).toBe('2026-03-24')
  })
})
