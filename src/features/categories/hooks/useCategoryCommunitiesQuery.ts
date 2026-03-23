import { useQuery } from '@tanstack/react-query'
import { categoriesApi } from '@/features/categories/api/categories.api'
import { queryKeys } from '@/shared/constants/queryKeys'

export function useCategoryCommunitiesQuery(slug: string) {
  return useQuery({
    queryKey: queryKeys.categoryCommunities(slug),
    queryFn: () => categoriesApi.communitiesBySlug(slug),
    enabled: Boolean(slug),
  })
}
