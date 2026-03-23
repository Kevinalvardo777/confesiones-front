import { useQuery } from '@tanstack/react-query'
import { categoriesApi } from '@/features/categories/api/categories.api'
import { queryKeys } from '@/shared/constants/queryKeys'

export function useCategoriesQuery() {
  return useQuery({
    queryKey: queryKeys.categories,
    queryFn: categoriesApi.list,
  })
}
