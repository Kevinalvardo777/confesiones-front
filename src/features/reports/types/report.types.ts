export interface Report {
  id: string
  targetType: 'confession' | 'comment'
  targetId: string
  reason: string
  details: string
  createdAt: string
  status: 'open' | 'reviewed'
}

export interface CreateReportPayload {
  targetType: 'confession' | 'comment'
  targetId: string
  reason: string
  details: string
}
