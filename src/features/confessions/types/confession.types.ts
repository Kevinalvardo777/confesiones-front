export type ConfessionSort = 'recent' | 'top'

export interface Confession {
  id: string
  slug: string
  communityId: string
  alias: string
  content: string
  createdAt: string
  averageRating: number
  ratingVotes: number
  commentsCount: number
  imageUrl?: string
  status: 'published' | 'hidden' | 'reported'
}

export type ConfessionListItem = Confession

export interface PaginatedConfessions {
  items: ConfessionListItem[]
  page: number
  pageSize: number
  total: number
}

export interface ConfessionFilters {
  communityId?: string
  createdAt?: string
  sort?: ConfessionSort
}

export interface CreateConfessionPayload {
  communityId: string
  alias?: string
  content: string
}
