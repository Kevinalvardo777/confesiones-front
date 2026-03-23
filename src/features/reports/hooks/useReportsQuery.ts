import { useQuery } from '@tanstack/react-query'
import { reportsApi } from '@/features/reports/api/reports.api'
import { queryKeys } from '@/shared/constants/queryKeys'

export function useReportsQuery() {
  return useQuery({
    queryKey: queryKeys.reports,
    queryFn: reportsApi.list,
  })
}
