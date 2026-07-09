/**
 * Yandex.Metrika pageviews for client-side navigation.
 *
 * The counter snippet in index.html reports the first pageview from its `init`
 * call. This router pushes history state instead of reloading, so every later
 * navigation has to be reported by hand or the whole visit collapses into one
 * pageview and bounce rate reads as ~100%.
 */

// Keep in sync with the counter id in index.html.
const YM_ID = 110549362

declare global {
  interface Window {
    ym?: (id: number, action: string, ...rest: unknown[]) => void
  }
}

/** null until the first call, which corresponds to the hit `init` already sent. */
let lastUrl: string | null = null

export function trackPageview(): void {
  if (typeof window === 'undefined' || typeof window.ym !== 'function') return

  const url = window.location.href

  // The initial page load was already counted by `init`; just record where we are.
  if (lastUrl === null) {
    lastUrl = url
    return
  }
  if (url === lastUrl) return

  const referer = lastUrl
  lastUrl = url
  window.ym(YM_ID, 'hit', url, { referer, title: document.title })
}
