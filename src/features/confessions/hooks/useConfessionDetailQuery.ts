import { useQuery } from '@tanstack/react-query'
import { confessionsApi } from '@/features/confessions/api/confessions.api'
import { queryKeys } from '@/shared/constants/queryKeys'

export function useConfessionDetailQuery(confessionId: string) {
  return useQuery({
    queryKey: queryKeys.confession(confessionId),
    queryFn: () => confessionsApi.detail(confessionId),
  })
}
