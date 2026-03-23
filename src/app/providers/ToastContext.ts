import { createContext } from 'react'

export interface ToastMessage {
  id: string
  title: string
  tone: 'success' | 'error' | 'info'
}

export interface ToastContextValue {
  showToast: (message: Omit<ToastMessage, 'id'>) => void
}

export const ToastContext = createContext<ToastContextValue | null>(null)
