// Static pre-rendering for SEO. Runs after `vite build` (client) and the SSR
// build of src/entry-prerender.ts. For each route it injects a per-page <head>
// (title, description, canonical, hreflang, Open Graph, Twitter, JSON-LD) and the
// correct <html lang> into the built index.html, writing one static file per URL.
// It also emits sitemap.xml and a 404.html fallback.

import { readFile, writeFile, mkdir, rm } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const distDir = join(root, 'dist')
const ssrEntry = pathToFileURL(join(root, '.prerender/entry-prerender.js')).href

const { allRoutes, pathForRoute, buildHead, SITE } = await import(ssrEntry)

const HEAD_MARKER = '<!--app-head-->'

function outputFile(path) {
  if (path === '/') return join(distDir, 'index.html')
  return join(distDir, path.replace(/^\//, ''), 'index.html')
}

const template = await readFile(join(distDir, 'index.html'), 'utf8')

if (!template.includes(HEAD_MARKER)) {
  throw new Error(`index.html is missing the ${HEAD_MARKER} marker`)
}

const routes = allRoutes()
let written = 0

for (const route of routes) {
  const head = buildHead(route)
  const path = pathForRoute(route)
  const html = template
    .replace('<html lang="en"', `<html lang="${head.lang}"`)
    .replace(HEAD_MARKER, head.tags)

  const file = outputFile(path)
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, html, 'utf8')
  written += 1
}

// 404 fallback (GitHub Pages serves /404.html for unknown paths).
const notFoundHead = buildHead({ kind: 'notFound', lang: 'ru' })
await writeFile(
  join(distDir, '404.html'),
  template.replace('<html lang="en"', `<html lang="${notFoundHead.lang}"`).replace(HEAD_MARKER, notFoundHead.tags),
  'utf8',
)

// sitemap.xml — canonical URLs with hreflang alternates.
function absolute(path) {
  if (path === '/') return `${SITE.baseUrl}/`
  return `${SITE.baseUrl}${path}${path.endsWith('/') ? '' : '/'}`
}

const indexable = routes.filter((route) => route.kind !== 'notFound')
const byKey = new Map()
for (const route of indexable) {
  const key = JSON.stringify({ ...route, lang: undefined })
  if (!byKey.has(key)) byKey.set(key, [])
  byKey.get(key).push(route)
}

const urlEntries = []
for (const group of byKey.values()) {
  for (const route of group) {
    const alternates = group
      .map((alt) => `    <xhtml:link rel="alternate" hreflang="${alt.lang}" href="${absolute(pathForRoute(alt))}" />`)
      .join('\n')
    urlEntries.push(
      `  <url>\n    <loc>${absolute(pathForRoute(route))}</loc>\n${alternates}\n  </url>`,
    )
  }
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urlEntries.join('\n')}\n</urlset>\n`
await writeFile(join(distDir, 'sitemap.xml'), sitemap, 'utf8')

// robots.txt (kept here so it always points at the right host).
const robots = `User-agent: *\nAllow: /\n\nSitemap: ${SITE.baseUrl}/sitemap.xml\n`
await writeFile(join(distDir, 'robots.txt'), robots, 'utf8')

// Clean the SSR scratch output.
await rm(join(root, '.prerender'), { recursive: true, force: true })

console.log(`Prerendered ${written} routes + 404.html + sitemap.xml + robots.txt`)
