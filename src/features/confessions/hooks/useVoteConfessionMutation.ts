import { useMutation, useQueryClient } from '@tanstack/react-query'
import { confessionsApi } from '@/features/confessions/api/confessions.api'
import { queryKeys } from '@/shared/constants/queryKeys'

export function useVoteConfessionMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ confessionId, stars }: { confessionId: string; stars: number }) =>
      confessionsApi.vote(confessionId, stars),
    onSuccess: (_, variables) => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.confession(variables.confessionId) })
      void queryClient.invalidateQueries({ queryKey: ['confessions'] })
      void queryClient.invalidateQueries({ queryKey: ['ranking'] })
    },
  })
}
