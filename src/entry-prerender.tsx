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

export { allRoutes, pathForRoute, ogImagePath, SITE } from './routes'
export { buildHead } from './seo'
// Consumed by scripts/og.mjs so the cards read from the app's own content.
export { libraries } from './content/libraries'
export { posts } from './content/posts'
export { profile } from './content/profile'

/** Render a route to static HTML for the `<div id="root">` shell. */
export function renderPage(route: RouteMatch): string {
  return renderToString(
    <StrictMode>
      <RouterProvider initialPath={pathForRoute(route)}>
        <App />
      </RouterProvider>
    </StrictMode>,
  )
}
