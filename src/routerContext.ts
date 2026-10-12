import { createContext, useContext } from 'react'

export type RouterValue = {
  path: string
  navigate: (to: string) => void
}

// Kept apart from router.tsx so that file exports only components (React Fast Refresh).
export const RouterContext = createContext<RouterValue>({
  path: '/',
  navigate: () => {},
})

export function useRouter(): RouterValue {
  return useContext(RouterContext)
}
