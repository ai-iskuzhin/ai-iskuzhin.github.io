import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type AnchorHTMLAttributes,
  type ReactNode,
} from 'react'

type RouterValue = {
  path: string
  navigate: (to: string) => void
}

const RouterContext = createContext<RouterValue>({
  path: '/',
  navigate: () => {},
})

function currentPath(): string {
  if (typeof window === 'undefined') return '/'
  return window.location.pathname + window.location.hash
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [path, setPath] = useState<string>(() =>
    typeof window === 'undefined' ? '/' : window.location.pathname,
  )

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const navigate = useCallback((to: string) => {
    const url = new URL(to, window.location.origin)
    if (url.origin !== window.location.origin) {
      window.location.href = to
      return
    }
    window.history.pushState({}, '', url.pathname + url.hash)
    setPath(url.pathname)
    if (url.hash) {
      const target = document.getElementById(url.hash.slice(1))
      if (target) target.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
  }, [])

  return <RouterContext.Provider value={{ path, navigate }}>{children}</RouterContext.Provider>
}

export function useRouter(): RouterValue {
  return useContext(RouterContext)
}

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  to: string
}

export function Link({ to, onClick, ...rest }: LinkProps) {
  const { navigate } = useRouter()
  const isInternal = to.startsWith('/') && !to.startsWith('//')

  return (
    <a
      href={to}
      onClick={(event) => {
        onClick?.(event)
        if (!isInternal) return
        if (event.defaultPrevented) return
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
        if (event.button !== 0) return
        event.preventDefault()
        navigate(to)
      }}
      {...rest}
    />
  )
}

export { currentPath }
