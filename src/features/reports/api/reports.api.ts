import { httpClient } from '@/shared/api/httpClient'
import type { CreateReportPayload, Report } from '@/features/reports/types/report.types'

export const reportsApi = {
  async create(payload: CreateReportPayload) {
    const response = await httpClient.post<Report>('/reports', payload)
    return response.data
  },
  async list() {
    const response = await httpClient.get<Report[]>('/reports')
    return response.data
  },
  async review(reportId: string) {
    const response = await httpClient.patch<Report>(`/reports/${reportId}`, {
      status: 'reviewed',
    })
    return response.data
  },
}
