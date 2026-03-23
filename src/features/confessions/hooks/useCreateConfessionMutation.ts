import { useMutation, useQueryClient } from '@tanstack/react-query'
import { confessionsApi } from '@/features/confessions/api/confessions.api'
import { queryKeys } from '@/shared/constants/queryKeys'

export function useCreateConfessionMutation(communityId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: confessionsApi.create,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.confessions({ communityId }) })
      void queryClient.invalidateQueries({ queryKey: queryKeys.communities })
      void queryClient.invalidateQueries({ queryKey: queryKeys.ranking('global') })
    },
  })
}
