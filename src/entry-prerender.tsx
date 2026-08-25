// Entry point bundled for Node (vite build --ssr) and consumed by scripts/prerender.mjs.
// Keeps the prerenderer in sync with the app's routes, SEO logic and markup.
// Build-only entry: it deliberately exports helpers rather than components, and
// is never served to the browser, so Fast Refresh's constraint does not apply.
/* eslint-disable react-refresh/only-export-components */
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'
import { RouterProvider } from './router'
import { pathForRoute, type RouteMatch } from './routes'

export { allRoutes, pathForRoute, ogImagePath, feedPath, SITE } from './routes'
export { buildHead, metaFor } from './seo'
// Consumed by scripts/og.mjs so the cards read from the app's own content.
export { libraries } from './content/libraries'
export { posts } from './content/posts'
export { profile } from './content/profile'

/**
 * Render a route to static HTML.
 *
 * React 19 discovers `<img>` sources and hoists `<link rel="preload">` for them
 * to the front of the rendered output. renderToString has no document to hoist
 * into, so they land inside `#root` — where the client never puts them, which
 * fails hydration. Lift them out and let the caller place them in `<head>`,
 * which is where they belong anyway.
 */
export function renderPage(route: RouteMatch): { head: string; body: string } {
  const html = renderToString(
    <StrictMode>
      <RouterProvider initialPath={pathForRoute(route)}>
        <App />
      </RouterProvider>
    </StrictMode>,
  )

  const hoisted = html.match(/^(?:<link\b[^>]*>)+/)
  if (!hoisted) return { head: '', body: html }

  return { head: hoisted[0], body: html.slice(hoisted[0].length) }
}
