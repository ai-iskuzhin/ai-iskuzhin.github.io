import { useEffect, useState, useSyncExternalStore } from 'react'

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'

function subscribeMotion(listener: () => void) {
  const query = window.matchMedia(REDUCED_MOTION)
  query.addEventListener('change', listener)
  return () => query.removeEventListener('change', listener)
}

// The server renders the first phrase statically; the client animates unless motion is reduced.
const canAnimate = () => !window.matchMedia(REDUCED_MOTION).matches
const serverCanAnimate = () => false

/**
 * Rotating typewriter effect — mirrors the animated tagline on the GitHub
 * profile README. SSR-safe: renders the first phrase statically, then animates
 * on the client (and respects prefers-reduced-motion).
 */
export function Typewriter({ phrases }: { phrases: string[] }) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState(phrases[0] ?? '')
  const [deleting, setDeleting] = useState(false)
  const animate = useSyncExternalStore(subscribeMotion, canAnimate, serverCanAnimate)

  useEffect(() => {
    if (!animate) return
    const current = phrases[index % phrases.length] ?? ''
    let timeout: number

    if (!deleting && text === current) {
      timeout = window.setTimeout(() => setDeleting(true), 2000)
    } else if (deleting && text === '') {
      timeout = window.setTimeout(() => {
        setDeleting(false)
        setIndex((value) => (value + 1) % phrases.length)
      }, 32)
    } else {
      const next = deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1)
      timeout = window.setTimeout(() => setText(next), deleting ? 32 : 58)
    }

    return () => window.clearTimeout(timeout)
  }, [text, deleting, index, animate, phrases])

  return (
    <span className="typewriter">
      <span className="gradient-text">{text}</span>
      <span className="typewriter__caret" aria-hidden="true" />
    </span>
  )
}
