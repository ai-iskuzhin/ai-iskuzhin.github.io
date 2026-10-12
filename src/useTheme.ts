import { useCallback, useEffect, useSyncExternalStore } from 'react'

export type ThemeMode = 'light' | 'dark' | 'system'

const STORAGE_KEY = 'theme-mode'

const listeners = new Set<() => void>()

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function readStored(): ThemeMode {
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark' || stored === 'system') return stored
  return 'system'
}

// The server (and hydration) always sees 'system', so the markup matches; React then
// re-renders with the stored mode on the client.
const serverMode = (): ThemeMode => 'system'

export function useTheme() {
  const mode = useSyncExternalStore(subscribe, readStored, serverMode)

  const setMode = useCallback((next: ThemeMode) => {
    window.localStorage.setItem(STORAGE_KEY, next)
    listeners.forEach((listener) => listener())
  }, [])

  useEffect(() => {
    const root = document.documentElement
    if (mode === 'system') {
      root.removeAttribute('data-theme')
    } else {
      root.dataset.theme = mode
    }
  }, [mode])

  return { mode, setMode }
}
