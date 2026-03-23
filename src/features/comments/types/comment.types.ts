export interface Comment {
  id: string
  confessionId: string
  parentId: string | null
  authorName: string
  content: string
  createdAt: string
}

export interface CreateCommentPayload {
  confessionId: string
  parentId?: string | null
  authorName?: string
  content: string
}
