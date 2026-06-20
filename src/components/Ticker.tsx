import { useEffect, useRef, type ReactNode } from 'react'
import type { Lang } from '../content/types'
import { t } from '../i18n'
import { libraries } from '../content/libraries'
import { projects, prettyHref } from '../content/profile'
import { libraryPath, verificahubPath } from '../routes'
import { Link } from '../router'

const packageCount = libraries.reduce((total, lib) => total + 1 + (lib.nugetFamily?.length ?? 0), 0)

type Item =
  | { kind: 'metric'; text: string }
  | { kind: 'link'; label: string; to: string; icon?: string }
  | { kind: 'external'; label: string; href: string }

function buildItems(lang: Lang): Item[] {
  const items: Item[] = [
    { kind: 'metric', text: t({ ru: `${libraries.length} open-source SDK`, en: `${libraries.length} open-source SDKs` }, lang) },
    { kind: 'metric', text: `${packageCount} ${t({ ru: 'пакетов NuGet', en: 'NuGet packages' }, lang)}` },
    { kind: 'metric', text: 'C# · .NET 10' },
    { kind: 'metric', text: 'MIT' },
    { kind: 'metric', text: t({ ru: '4+ года в проде', en: '4+ years in production' }, lang) },
  ]

  for (const library of libraries) {
    items.push({ kind: 'link', label: library.name, to: libraryPath(lang, library.slug), icon: library.icon })
  }
  items.push({ kind: 'link', label: 'VerificaHub', to: verificahubPath(lang), icon: '/logos/verificahub.svg' })

  for (const project of projects) {
    const href = project.links[0]?.href
    if (href) items.push({ kind: 'external', label: project.title, href })
  }

  return items
}

function renderItem(item: Item, key: string, lang: Lang): ReactNode {
  if (item.kind === 'metric') {
    return (
      <span className="ticker__metric" key={key}>
        <span className="ticker__dot" />
        {item.text}
      </span>
    )
  }
  if (item.kind === 'link') {
    return (
      <Link
        className="ticker__chip"
        title={`${t({ ru: 'Открыть', en: 'Open' }, lang)} ${item.label}`}
        to={item.to}
        tabIndex={-1}
        key={key}
      >
        {item.icon ? <img src={item.icon} alt="" width={20} height={20} /> : null}
        {item.label}
      </Link>
    )
  }
  return (
    <a
      className="ticker__chip"
      title={prettyHref(item.href)}
      href={item.href}
      target="_blank"
      rel="noreferrer"
      tabIndex={-1}
      key={key}
    >
      {item.label}
    </a>
  )
}

export function Ticker({ lang }: { lang: Lang }) {
  const items = buildItems(lang)
  const trackRef = useRef<HTMLDivElement>(null)
  const rootRef = useRef<HTMLDivElement>(null)

  // rAF-driven marquee: immune to layout shifts (it never restarts), and
  // pausing on hover freezes exactly where it is instead of jumping.
  useEffect(() => {
    const track = trackRef.current
    const root = rootRef.current
    if (!track || !root) return
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    let last = 0
    let offset = 0
    let paused = false
    const speed = 42 // px per second

    const tick = (timestamp: number) => {
      if (!last) last = timestamp
      const delta = (timestamp - last) / 1000
      last = timestamp
      if (!paused) {
        const half = track.scrollWidth / 2
        if (half > 0) {
          offset += delta * speed
          if (offset >= half) offset -= half
          track.style.transform = `translate3d(${-offset}px, 0, 0)`
        }
      }
      raf = window.requestAnimationFrame(tick)
    }

    const pause = () => {
      paused = true
    }
    const resume = () => {
      paused = false
      last = 0
    }

    root.addEventListener('mouseenter', pause)
    root.addEventListener('mouseleave', resume)
    root.addEventListener('focusin', pause)
    root.addEventListener('focusout', resume)
    raf = window.requestAnimationFrame(tick)

    return () => {
      window.cancelAnimationFrame(raf)
      root.removeEventListener('mouseenter', pause)
      root.removeEventListener('mouseleave', resume)
      root.removeEventListener('focusin', pause)
      root.removeEventListener('focusout', resume)
    }
  }, [lang])

  return (
    <div className="ticker" ref={rootRef} aria-hidden="true">
      <div className="ticker__track" ref={trackRef}>
        {items.map((item, index) => renderItem(item, `a-${index}`, lang))}
        {items.map((item, index) => renderItem(item, `b-${index}`, lang))}
      </div>
    </div>
  )
}
