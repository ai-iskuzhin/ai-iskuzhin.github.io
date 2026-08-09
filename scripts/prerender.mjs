// Static pre-rendering for SEO. Runs after `vite build` (client) and the SSR
// build of src/entry-prerender.ts. For each route it injects a per-page <head>
// (title, description, canonical, hreflang, Open Graph, Twitter, JSON-LD) and the
// correct <html lang> into the built index.html, writing one static file per URL.
// It also emits sitemap.xml and a 404.html fallback.

import { execFileSync } from 'node:child_process'
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const distDir = join(root, 'dist')
const ssrEntry = pathToFileURL(join(root, '.prerender/entry-prerender.js')).href

const { allRoutes, pathForRoute, feedPath, buildHead, SITE, renderPage, posts, profile } =
  await import(ssrEntry)

/**
 * Google ignores <lastmod> it believes to be inaccurate, so date the pages from
 * the commit that produced them rather than from the clock.
 */
function lastCommitDate() {
  try {
    return execFileSync('git', ['log', '-1', '--format=%cI'], { cwd: root, encoding: 'utf8' }).trim()
  } catch {
    return new Date().toISOString()
  }
}

const buildDate = lastCommitDate()

const HEAD_MARKER = '<!--app-head-->'
const ROOT_MARKER = '<div id="root"></div>'

function outputFile(path) {
  if (path === '/') return join(distDir, 'index.html')
  return join(distDir, path.replace(/^\//, ''), 'index.html')
}

const rawTemplate = await readFile(join(distDir, 'index.html'), 'utf8')

if (!rawTemplate.includes(HEAD_MARKER)) {
  throw new Error(`index.html is missing the ${HEAD_MARKER} marker`)
}

if (!rawTemplate.includes(ROOT_MARKER)) {
  throw new Error(`index.html is missing the ${ROOT_MARKER} mount point`)
}

// Drop the static <title> from the template; each page injects its own.
const template = rawTemplate.replace(/\n?\s*<title>[\s\S]*?<\/title>/i, '')

const routes = allRoutes()
const postBySlug = new Map(posts.map((post) => [post.slug, post]))
let written = 0

// `$&`, `` $` `` and friends are substitution patterns in a replacement string,
// and rendered markup (e.g. C# snippets) can contain them. Always replace via a
// function so the injected HTML is treated as a literal.
const literal = (value) => () => value

for (const route of routes) {
  const head = buildHead(route)
  const path = pathForRoute(route)
  const page = renderPage(route)
  const html = template
    .replace('<html lang="en"', literal(`<html lang="${head.lang}"`))
    .replace(HEAD_MARKER, literal(`${head.tags}\n    ${page.head}`))
    .replace(ROOT_MARKER, literal(`<div id="root">${page.body}</div>`))

  const file = outputFile(path)
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, html, 'utf8')
  written += 1
}

// 404 fallback (GitHub Pages serves /404.html for unknown paths). Its root stays
// empty on purpose: the served path is unknown at build time, so the client
// renders the right language instead of hydrating against the wrong markup.
const notFoundHead = buildHead({ kind: 'notFound', lang: 'ru' })
await writeFile(
  join(distDir, '404.html'),
  template
    .replace('<html lang="en"', literal(`<html lang="${notFoundHead.lang}"`))
    .replace(HEAD_MARKER, literal(notFoundHead.tags)),
  'utf8',
)

function absolute(path) {
  if (path === '/') return `${SITE.baseUrl}/`
  const isFile = /\.[a-z0-9]+$/i.test(path)
  return `${SITE.baseUrl}${path}${path.endsWith('/') || isFile ? '' : '/'}`
}

function xml(value) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

// Yandex reads <priority> as a crawl-ordering hint; neither engine treats it as
// a ranking signal. hreflang lives only in the <head>: Google says one method is
// enough, and Yandex no longer reads language alternates from the sitemap.
const PRIORITY = { home: '1.0', libraries: '0.8', verificahub: '0.8', pir2pir: '0.8', library: '0.7', blog: '0.6', post: '0.6' }

const indexable = routes.filter((route) => route.kind !== 'notFound')
const urlEntries = indexable.map((route) => {
  const lastmod = route.kind === 'post' ? postBySlug.get(route.slug).date : buildDate
  return [
    '  <url>',
    `    <loc>${absolute(pathForRoute(route))}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    `    <priority>${PRIORITY[route.kind]}</priority>`,
    '  </url>',
  ].join('\n')
})

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries.join('\n')}\n</urlset>\n`
await writeFile(join(distDir, 'sitemap.xml'), sitemap, 'utf8')

// RSS per language — discovery, not ranking.
for (const lang of ['ru', 'en']) {
  const items = [...posts]
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((post) => {
      const url = absolute(`${lang === 'en' ? '/en' : ''}/blog/${post.slug}`)
      return [
        '    <item>',
        `      <title>${xml(post.title[lang])}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate>`,
        `      <description>${xml(post.excerpt[lang])}</description>`,
        ...post.tags.map((tag) => `      <category>${xml(tag)}</category>`),
        '    </item>',
      ].join('\n')
    })

  const feed = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    '  <channel>',
    `    <title>${xml(profile.name[lang])} — Blog</title>`,
    `    <link>${absolute(`${lang === 'en' ? '/en' : ''}/blog`)}</link>`,
    `    <description>${xml(profile.specialty[lang])}</description>`,
    `    <language>${lang}</language>`,
    `    <atom:link href="${absolute(feedPath(lang))}" rel="self" type="application/rss+xml" />`,
    ...items,
    '  </channel>',
    '</rss>',
    '',
  ].join('\n')

  const file = join(distDir, feedPath(lang).replace(/^\//, ''))
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, feed, 'utf8')
}

// robots.txt (kept here so it always points at the right host).
//
// AI crawlers are allowed on purpose: for a personal-brand site, being cited in
// AI answers is upside. Each bot needs its own block — allowing ClaudeBot does
// not cover Claude-SearchBot, and GPTBot does not cover OAI-SearchBot.
//
// No `Host:` or `Crawl-delay:` — Yandex stopped honouring both in 2018.
const AI_AGENTS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Google-Extended',
  'CCBot',
  'Applebot-Extended',
]

const robots = [
  'User-agent: *',
  'Allow: /',
  '',
  ...AI_AGENTS.flatMap((agent) => [`User-agent: ${agent}`, 'Allow: /', '']),
  `Sitemap: ${SITE.baseUrl}/sitemap.xml`,
  '',
].join('\n')
await writeFile(join(distDir, 'robots.txt'), robots, 'utf8')

// Clean the SSR scratch output.
await rm(join(root, '.prerender'), { recursive: true, force: true })

console.log(`Prerendered ${written} routes + 404.html + sitemap.xml + robots.txt`)
