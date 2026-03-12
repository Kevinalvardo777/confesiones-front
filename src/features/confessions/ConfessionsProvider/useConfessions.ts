import { useContext } from 'react'
import { ConfessionsContext } from './ConfessionsContext'

export function useConfessions() {
  const context = useContext(ConfessionsContext)

  if (!context) {
    throw new Error('useConfessions must be used within ConfessionsProvider')
  }

  return context
}
