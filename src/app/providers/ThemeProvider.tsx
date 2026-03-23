import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { ThemeContext, type AppTheme, type ThemeContextValue } from '@/app/providers/ThemeContext'

const storageKey = 'campus-secret.theme'

function getInitialTheme(): AppTheme {
  if (typeof window === 'undefined') {
    return 'dark'
  }

  const stored = window.localStorage.getItem(storageKey)
  return stored === 'light' ? 'light' : 'dark'
}

function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<AppTheme>(getInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem(storageKey, theme)
  }, [theme])

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      toggleTheme: () => {
        setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
      },
    }),
    [theme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export default ThemeProvider
