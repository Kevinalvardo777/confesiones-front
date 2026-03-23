import type { Confession } from '@/features/confessions/types/confession.types'

export interface RankingFilters {
  scope: 'global' | 'community'
  communityId?: string
}

export type RankedConfession = Confession
