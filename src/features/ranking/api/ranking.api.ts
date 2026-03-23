import { httpClient } from '@/shared/api/httpClient'
import { buildSearchParams } from '@/shared/lib/format'
import type { RankingFilters, RankedConfession } from '@/features/ranking/types/ranking.types'

export const rankingApi = {
  async list(filters: RankingFilters) {
    const query = buildSearchParams({
      scope: filters.scope,
      communityId: filters.communityId,
    })

    const response = await httpClient.get<RankedConfession[]>(`/ranking?${query}`, {
      auth: false,
    })

    return response.data
  },
}
