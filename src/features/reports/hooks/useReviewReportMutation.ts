import { useMutation, useQueryClient } from '@tanstack/react-query'
import { reportsApi } from '@/features/reports/api/reports.api'
import { queryKeys } from '@/shared/constants/queryKeys'

export function useReviewReportMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: reportsApi.review,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.reports })
    },
  })
}
