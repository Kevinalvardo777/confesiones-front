import { httpClient } from '@/shared/api/httpClient'
import type { Comment, CreateCommentPayload } from '@/features/comments/types/comment.types'

export const commentsApi = {
  async list(confessionId: string) {
    const response = await httpClient.get<Comment[]>(`/comments?confessionId=${confessionId}`, {
      auth: false,
    })
    return response.data
  },
  async create(payload: CreateCommentPayload) {
    const response = await httpClient.post<Comment>('/comments', {
      ...payload,
      authorName: payload.authorName ?? 'Anonimo',
    })
    return response.data
  },
}
