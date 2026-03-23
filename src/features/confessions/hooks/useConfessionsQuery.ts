import { useQuery } from '@tanstack/react-query'
import { confessionsApi } from '@/features/confessions/api/confessions.api'
import type { ConfessionFilters } from '@/features/confessions/types/confession.types'
import { queryKeys } from '@/shared/constants/queryKeys'

export function useConfessionsQuery(filters: ConfessionFilters) {
  return useQuery({
    queryKey: queryKeys.confessions({ ...filters }),
    queryFn: () => confessionsApi.list(filters),
  })
}
