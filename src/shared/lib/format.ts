export function formatDate(date: string) {
  return new Intl.DateTimeFormat('es-EC', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date))
}

export function formatRelativeCount(value: number, singular: string, plural: string) {
  return `${value} ${value === 1 ? singular : plural}`
}

export function toDateInputValue(date: string) {
  return new Date(date).toISOString().slice(0, 10)
}

export function buildSearchParams(params: Record<string, string | number | undefined>) {
  const search = new URLSearchParams()

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== '') {
      search.set(key, String(value))
    }
  }

  return search.toString()
}
