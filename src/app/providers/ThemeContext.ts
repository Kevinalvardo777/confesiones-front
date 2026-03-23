import { createContext } from 'react'

export type AppTheme = 'dark' | 'light'

export interface ThemeContextValue {
  theme: AppTheme
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)
