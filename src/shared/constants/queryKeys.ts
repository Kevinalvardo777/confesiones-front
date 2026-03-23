export const queryKeys = {
  auth: ['auth'] as const,
  categories: ['categories'] as const,
  categoryCommunities: (slug: string) => ['categories', slug, 'communities'] as const,
  communities: ['communities'] as const,
  confessions: (params?: Record<string, unknown>) => ['confessions', params] as const,
  confession: (id: string) => ['confession', id] as const,
  comments: (confessionId: string) => ['comments', confessionId] as const,
  ranking: (scope: string) => ['ranking', scope] as const,
  reports: ['reports'] as const,
}
