export type SectionId = 'espol' | 'ucg' | 'udla'

export interface Section {
  id: SectionId
  name: string
  city: string
  headline: string
  description: string
  accent: string
}

export interface Confession {
  id: string
  sectionId: SectionId
  authorAlias: string
  content: string
  createdAt: string
  ratingTotal: number
  ratingVotes: number
}

export interface NewConfession {
  sectionId: SectionId
  authorAlias: string
  content: string
}
