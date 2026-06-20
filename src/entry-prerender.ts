// Entry point bundled for Node (vite build --ssr) and consumed by scripts/prerender.mjs.
// Keeps the prerenderer in sync with the app's routes and SEO logic.
export { allRoutes, pathForRoute, SITE } from './routes'
export { buildHead } from './seo'
