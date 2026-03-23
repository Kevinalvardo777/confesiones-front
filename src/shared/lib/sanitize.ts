import DOMPurify from 'dompurify'

export function sanitizeText(value: string) {
  return DOMPurify.sanitize(value.trim(), {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  })
}
