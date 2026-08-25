import { metaFor, absolute, HTML_LANG } from './seo'
import { pathForRoute, type RouteMatch } from './routes'

function setMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * Keep the document head in sync during client-side navigation. The initial
 * head is pre-rendered at build time; this only matters for in-app route changes.
 */
export function applyHead(route: RouteMatch) {
  if (typeof document === 'undefined') return
  const meta = metaFor(route)
  // Same rule as the prerendered head: a page whose content lives elsewhere says so.
  const canonical = meta.canonicalUrl ?? absolute(pathForRoute(route))

  document.title = meta.title
  document.documentElement.lang = HTML_LANG[route.lang]
  setMeta('meta[name="description"]', 'name', 'description', meta.description)
  setLink('canonical', canonical)
  setMeta('meta[property="og:title"]', 'property', 'og:title', meta.title)
  setMeta('meta[property="og:description"]', 'property', 'og:description', meta.description)
  setMeta('meta[property="og:url"]', 'property', 'og:url', canonical)
  setMeta('meta[property="og:type"]', 'property', 'og:type', meta.type)
}
