import { createContext } from 'react'
import type { Confession, NewConfession } from '../../../types/confession'

export interface ConfessionsContextValue {
  confessions: Confession[]
  addConfession: (input: NewConfession) => void
  rateConfession: (confessionId: string, stars: number) => void
}

export const ConfessionsContext = createContext<ConfessionsContextValue | null>(null)
