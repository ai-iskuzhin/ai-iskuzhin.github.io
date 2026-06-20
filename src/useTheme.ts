import { useEffect, useState } from 'react'

export type ThemeMode = 'light' | 'dark' | 'system'

const STORAGE_KEY = 'theme-mode'

function readStored(): ThemeMode {
  if (typeof window === 'undefined') return 'system'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark' || stored === 'system') return stored
  return 'system'
}

export function useTheme() {
  const [mode, setMode] = useState<ThemeMode>('system')

  // Hydrate from storage after mount to avoid SSR/markup mismatch.
  useEffect(() => {
    setMode(readStored())
  }, [])

  useEffect(() => {
    const root = document.documentElement
    if (mode === 'system') {
      root.removeAttribute('data-theme')
    } else {
      root.dataset.theme = mode
    }
    window.localStorage.setItem(STORAGE_KEY, mode)
  }, [mode])

  return { mode, setMode }
}
