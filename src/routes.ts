import type { Lang } from './content/types'
import { libraries } from './content/libraries'
import { posts } from './content/posts'

export const SITE = {
  baseUrl: 'https://ai-iskuzhin.is-a.dev',
  name: { ru: 'Айгиз Искужин', en: 'Aigiz Iskuzhin' } as Record<Lang, string>,
  twitter: '',
  ogImageWidth: 1200,
  ogImageHeight: 630,
}

export const LANGS: Lang[] = ['ru', 'en']
export const DEFAULT_LANG: Lang = 'ru'

export type RouteMatch =
  | { kind: 'home'; lang: Lang }
  | { kind: 'libraries'; lang: Lang }
  | { kind: 'library'; lang: Lang; slug: string }
  | { kind: 'verificahub'; lang: Lang }
  | { kind: 'blog'; lang: Lang }
  | { kind: 'post'; lang: Lang; slug: string }
  | { kind: 'notFound'; lang: Lang }

function prefix(lang: Lang): string {
  return lang === 'en' ? '/en' : ''
}

export function homePath(lang: Lang): string {
  return lang === 'en' ? '/en' : '/'
}
export function librariesPath(lang: Lang): string {
  return `${prefix(lang)}/open-source`
}
export function libraryPath(lang: Lang, slug: string): string {
  return `${prefix(lang)}/open-source/${slug}`
}
export function verificahubPath(lang: Lang): string {
  return `${prefix(lang)}/verificahub`
}
export function blogPath(lang: Lang): string {
  return `${prefix(lang)}/blog`
}
export function postPath(lang: Lang, slug: string): string {
  return `${prefix(lang)}/blog/${slug}`
}

/** The canonical URL path for a given route. */
export function pathForRoute(route: RouteMatch): string {
  switch (route.kind) {
    case 'home':
      return homePath(route.lang)
    case 'libraries':
      return librariesPath(route.lang)
    case 'library':
      return libraryPath(route.lang, route.slug)
    case 'verificahub':
      return verificahubPath(route.lang)
    case 'blog':
      return blogPath(route.lang)
    case 'post':
      return postPath(route.lang, route.slug)
    case 'notFound':
      return route.lang === 'en' ? '/en/404' : '/404'
  }
}

/**
 * The social card for a route. Kept in lockstep with scripts/og.mjs, which
 * writes exactly these paths into dist/ at build time.
 */
export function ogImagePath(route: RouteMatch): string {
  const dir = `/og/${route.lang}`
  switch (route.kind) {
    case 'home':
      return `${dir}/home.png`
    case 'libraries':
      return `${dir}/open-source.png`
    case 'library':
      return `${dir}/open-source-${route.slug}.png`
    case 'verificahub':
      return `${dir}/verificahub.png`
    case 'blog':
      return `${dir}/blog.png`
    case 'post':
      return `${dir}/blog-${route.slug}.png`
    case 'notFound':
      return `${dir}/home.png`
  }
}

/** The same page in the other language (for hreflang + the language switch). */
export function alternateRoute(route: RouteMatch, lang: Lang): RouteMatch {
  return { ...route, lang }
}

function normalize(pathname: string): string {
  let path = pathname.split('?')[0].split('#')[0]
  if (path.length > 1 && path.endsWith('/')) {
    path = path.slice(0, -1)
  }
  return path === '' ? '/' : path
}

export function matchRoute(pathname: string): RouteMatch {
  const path = normalize(pathname)
  const isEn = path === '/en' || path.startsWith('/en/')
  const lang: Lang = isEn ? 'en' : 'ru'
  const rest = isEn ? path.slice(3) || '/' : path

  if (rest === '/' || rest === '') return { kind: 'home', lang }
  if (rest === '/open-source') return { kind: 'libraries', lang }
  if (rest.startsWith('/open-source/')) {
    const slug = rest.slice('/open-source/'.length)
    if (libraries.some((library) => library.slug === slug)) return { kind: 'library', lang, slug }
    return { kind: 'notFound', lang }
  }
  if (rest === '/verificahub') return { kind: 'verificahub', lang }
  if (rest === '/blog') return { kind: 'blog', lang }
  if (rest.startsWith('/blog/')) {
    const slug = rest.slice('/blog/'.length)
    if (posts.some((post) => post.slug === slug)) return { kind: 'post', lang, slug }
    return { kind: 'notFound', lang }
  }
  return { kind: 'notFound', lang }
}

/** Every prerenderable route, both languages — used by the build and the sitemap. */
export function allRoutes(): RouteMatch[] {
  const routes: RouteMatch[] = []
  for (const lang of LANGS) {
    routes.push({ kind: 'home', lang })
    routes.push({ kind: 'libraries', lang })
    for (const library of libraries) routes.push({ kind: 'library', lang, slug: library.slug })
    routes.push({ kind: 'verificahub', lang })
    routes.push({ kind: 'blog', lang })
    for (const post of posts) routes.push({ kind: 'post', lang, slug: post.slug })
  }
  return routes
}
