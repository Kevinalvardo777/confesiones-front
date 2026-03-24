import { useMutation, useQueryClient } from '@tanstack/react-query'
import { commentsApi } from '@/features/comments/api/comments.api'
import { queryKeys } from '@/shared/constants/queryKeys'

export function useCreateCommentMutation(confessionIdentifier: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: commentsApi.create,
    onSuccess: (_, variables) => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.comments(variables.confessionId) })
      void queryClient.invalidateQueries({ queryKey: queryKeys.confession(confessionIdentifier) })
      void queryClient.invalidateQueries({ queryKey: ['confessions'] })
    },
  })
}
