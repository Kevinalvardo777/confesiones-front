import { useQuery } from '@tanstack/react-query'
import { confessionsApi } from '@/features/confessions/api/confessions.api'
import { queryKeys } from '@/shared/constants/queryKeys'

export function useConfessionDetailQuery(confessionIdentifier: string) {
  return useQuery({
    queryKey: queryKeys.confession(confessionIdentifier),
    queryFn: () => confessionsApi.detail(confessionIdentifier),
    enabled: Boolean(confessionIdentifier),
  })
}
