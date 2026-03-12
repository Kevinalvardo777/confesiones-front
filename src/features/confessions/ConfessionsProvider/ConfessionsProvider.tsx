import { useReducer, type ReactNode } from 'react'
import { initialConfessions } from '../../../data/initialConfessions'
import type { Confession, NewConfession } from '../../../types/confession'
import { ConfessionsContext, type ConfessionsContextValue } from './ConfessionsContext'

interface ConfessionsState {
  confessions: Confession[]
}

type ConfessionsAction =
  | { type: 'add'; payload: NewConfession }
  | { type: 'rate'; payload: { confessionId: string; stars: number } }

function createConfessionId(sectionId: string) {
  return `${sectionId}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

function confessionsReducer(state: ConfessionsState, action: ConfessionsAction): ConfessionsState {
  if (action.type === 'add') {
    const confession: Confession = {
      id: createConfessionId(action.payload.sectionId),
      sectionId: action.payload.sectionId,
      authorAlias: action.payload.authorAlias.trim() || 'Anonimo',
      content: action.payload.content.trim(),
      createdAt: new Date().toISOString(),
      ratingTotal: 0,
      ratingVotes: 0,
    }

    return {
      confessions: [confession, ...state.confessions],
    }
  }

  return {
    confessions: state.confessions.map((confession) =>
      confession.id === action.payload.confessionId
        ? {
            ...confession,
            ratingTotal: confession.ratingTotal + action.payload.stars,
            ratingVotes: confession.ratingVotes + 1,
          }
        : confession,
    ),
  }
}

interface ConfessionsProviderProps {
  children: ReactNode
  initialState?: Confession[]
}

export function ConfessionsProvider({ children, initialState = initialConfessions }: ConfessionsProviderProps) {
  const [state, dispatch] = useReducer(confessionsReducer, {
    confessions: initialState,
  })

  const value: ConfessionsContextValue = {
    confessions: state.confessions,
    addConfession: (input) => dispatch({ type: 'add', payload: input }),
    rateConfession: (confessionId, stars) => dispatch({ type: 'rate', payload: { confessionId, stars } }),
  }

  return <ConfessionsContext.Provider value={value}>{children}</ConfessionsContext.Provider>
}
