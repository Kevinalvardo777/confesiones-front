import { useMutation, useQueryClient } from '@tanstack/react-query'
import { commentsApi } from '@/features/comments/api/comments.api'
import { queryKeys } from '@/shared/constants/queryKeys'

export function useCreateCommentMutation(confessionId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: commentsApi.create,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.comments(confessionId) })
      void queryClient.invalidateQueries({ queryKey: queryKeys.confession(confessionId) })
      void queryClient.invalidateQueries({ queryKey: ['confessions'] })
    },
  })
}
