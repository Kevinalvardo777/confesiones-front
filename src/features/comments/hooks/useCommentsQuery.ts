import { useQuery } from '@tanstack/react-query'
import { commentsApi } from '@/features/comments/api/comments.api'
import { queryKeys } from '@/shared/constants/queryKeys'

export function useCommentsQuery(confessionId: string) {
  return useQuery({
    queryKey: queryKeys.comments(confessionId),
    queryFn: () => commentsApi.list(confessionId),
    enabled: Boolean(confessionId),
  })
}
