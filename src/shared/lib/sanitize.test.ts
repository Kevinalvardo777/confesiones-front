import { sanitizeText } from '@/shared/lib/sanitize'

describe('sanitizeText', () => {
  it('trims input and strips html tags', () => {
    expect(sanitizeText('  <b>Hola</b><script>alert(1)</script>  ')).toBe('Hola')
  })
})
