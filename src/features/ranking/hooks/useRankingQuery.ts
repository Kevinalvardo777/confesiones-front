import { useQuery } from '@tanstack/react-query'
import { rankingApi } from '@/features/ranking/api/ranking.api'
import type { RankingFilters } from '@/features/ranking/types/ranking.types'
import { queryKeys } from '@/shared/constants/queryKeys'

export function useRankingQuery(filters: RankingFilters) {
  const scopeKey = filters.scope === 'community' ? `${filters.scope}-${filters.communityId}` : filters.scope

  return useQuery({
    queryKey: queryKeys.ranking(scopeKey),
    queryFn: () => rankingApi.list(filters),
  })
}
