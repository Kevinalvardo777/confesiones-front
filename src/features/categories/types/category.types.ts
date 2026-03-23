export interface CategoryPreviewCommunity {
  id: string
  slug: string
  name: string
  city: string
}

export interface Category {
  id: string
  slug: string
  name: string
  description: string
  accent: string
  communitiesCount: number
  confessionsCount: number
  featuredCommunities: CategoryPreviewCommunity[]
}

export interface CategoryCommunitiesResponse {
  category: {
    id: string
    slug: string
    name: string
    description: string
    accent: string
  }
  communities: Array<{
    id: string
    slug: string
    name: string
    city: string
    accent: string
    headline: string
    description: string
    isActive: boolean
    confessionsCount: number
  }>
}
