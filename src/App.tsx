import { useEffect } from 'react'
import { matchRoute } from './routes'
import { useRouter } from './router'
import { applyHead } from './head'
import { trackPageview } from './analytics'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
import { Libraries } from './pages/Libraries'
import { LibraryDetail } from './pages/LibraryDetail'
import { Verificahub } from './pages/Verificahub'
import { Blog } from './pages/Blog'
import { BlogPost } from './pages/BlogPost'
import { NotFound } from './pages/NotFound'
import './App.css'

function Page({ route }: { route: ReturnType<typeof matchRoute> }) {
  switch (route.kind) {
    case 'home':
      return <Home lang={route.lang} />
    case 'libraries':
      return <Libraries lang={route.lang} />
    case 'library':
      return <LibraryDetail lang={route.lang} slug={route.slug} />
    case 'verificahub':
      return <Verificahub lang={route.lang} />
    case 'blog':
      return <Blog lang={route.lang} />
    case 'post':
      return <BlogPost lang={route.lang} slug={route.slug} />
    case 'notFound':
      return <NotFound lang={route.lang} />
  }
}

export default function App() {
  const { path } = useRouter()
  const route = matchRoute(path)

  useEffect(() => {
    applyHead(route)
    // After applyHead, so Metrika reports the destination page's title.
    trackPageview()
    // Scroll to a hash target once the destination page has rendered.
    if (typeof window !== 'undefined' && window.location.hash) {
      const target = document.getElementById(window.location.hash.slice(1))
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path])

  return (
    <div className="app">
      <div className="bg-aurora" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <Header route={route} />
      <main id="main">
        <Page route={route} />
      </main>
      <Footer lang={route.lang} />
    </div>
  )
}
