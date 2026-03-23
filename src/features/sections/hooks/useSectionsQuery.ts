import { useQuery } from '@tanstack/react-query'
import { communitiesApi } from '@/features/sections/api/sections.api'
import { queryKeys } from '@/shared/constants/queryKeys'

export function useCommunitiesQuery() {
  return useQuery({
    queryKey: queryKeys.communities,
    queryFn: communitiesApi.list,
  })
}
