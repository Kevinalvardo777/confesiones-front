import { httpClient } from '@/shared/api/httpClient'
import { buildSearchParams } from '@/shared/lib/format'
import type {
  Confession,
  ConfessionFilters,
  CreateConfessionPayload,
  PaginatedConfessions,
} from '@/features/confessions/types/confession.types'

export const confessionsApi = {
  async list(filters: ConfessionFilters) {
    const query = buildSearchParams({
      communityId: filters.communityId,
      createdAt: filters.createdAt,
      sort: filters.sort,
    })
    const response = await httpClient.get<PaginatedConfessions>(`/confessions${query ? `?${query}` : ''}`, {
      auth: false,
    })

    if (Array.isArray(response.data)) {
      return {
        items: response.data,
        page: Number(response.meta?.page ?? 1),
        pageSize: Number(response.meta?.pageSize ?? response.data.length),
        total: Number(response.meta?.total ?? response.data.length),
      }
    }

    return response.data
  },
  async detail(confessionIdentifier: string) {
    const response = await httpClient.get<Confession>(`/confessions/${confessionIdentifier}`, { auth: false })
    return response.data
  },
  async create(payload: CreateConfessionPayload) {
    const response = await httpClient.post<Confession>('/confessions', payload)
    return response.data
  },
  async vote(confessionId: string, stars: number) {
    const response = await httpClient.post<Confession>(`/confessions/${confessionId}/vote`, { stars })
    return response.data
  },
}
