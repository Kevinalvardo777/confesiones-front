import { useMutation, useQueryClient } from '@tanstack/react-query'
import { reportsApi } from '@/features/reports/api/reports.api'
import { queryKeys } from '@/shared/constants/queryKeys'

export function useCreateReportMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: reportsApi.create,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.reports })
      void queryClient.invalidateQueries({ queryKey: ['confessions'] })
    },
  })
}
