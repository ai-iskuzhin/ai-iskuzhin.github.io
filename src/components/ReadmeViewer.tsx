import { useEffect, useState } from 'react'
import type { Lang } from '../content/types'
import { t } from '../i18n'
import { GitHubIcon } from './Icons'

type State =
  | { status: 'loading' }
  | { status: 'ready'; html: string }
  | { status: 'error' }

/** A finished load, tagged with the repo it was for: anything else still counts as loading. */
type Loaded = { repo: string; state: State }

const rawUrl = (repo: string, branch: string) =>
  `https://raw.githubusercontent.com/ai-iskuzhin/${repo}/${branch}/README.md`

/** Turn relative README links/images into absolute GitHub URLs. */
function rewriteUrls(html: string, repo: string, branch: string): string {
  const raw = `https://raw.githubusercontent.com/ai-iskuzhin/${repo}/${branch}/`
  const blob = `https://github.com/ai-iskuzhin/${repo}/blob/${branch}/`
  return html
    .replace(/(<img\b[^>]*\bsrc=")(?!https?:|\/\/|data:|#)\.?\/?([^"]+)"/gi, `$1${raw}$2"`)
    .replace(/(<a\b[^>]*\bhref=")(?!https?:|\/\/|#|mailto:)\.?\/?([^"]+)"/gi, `$1${blob}$2"`)
}

/** Drop anything executable — READMEs are trusted, but be defensive. */
function sanitize(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/\son[a-z]+="[^"]*"/gi, '')
    .replace(/\son[a-z]+='[^']*'/gi, '')
}

export function ReadmeViewer({ repo, lang }: { repo: string; lang: Lang }) {
  const [loaded, setLoaded] = useState<Loaded | null>(null)
  // Derived rather than reset in the effect: a repo change shows the spinner on the same render.
  const state: State = loaded?.repo === repo ? loaded.state : { status: 'loading' }

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const { marked } = await import('marked')
        let branch = 'main'
        let response = await fetch(rawUrl(repo, branch))
        if (!response.ok) {
          branch = 'master'
          response = await fetch(rawUrl(repo, branch))
        }
        if (!response.ok) throw new Error(`HTTP ${response.status}`)

        const markdown = await response.text()
        const parsed = marked.parse(markdown, { async: false, gfm: true, breaks: false })
        const html = typeof parsed === 'string' ? parsed : await parsed
        if (!cancelled) setLoaded({ repo, state: { status: 'ready', html: sanitize(rewriteUrls(html, repo, branch)) } })
      } catch {
        if (!cancelled) setLoaded({ repo, state: { status: 'error' } })
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [repo])

  if (state.status === 'loading') {
    return (
      <div className="readme readme--loading" aria-busy="true">
        <span className="readme__spinner" aria-hidden="true" />
        {t({ ru: 'Загружаем README из репозитория…', en: 'Loading README from the repository…' }, lang)}
      </div>
    )
  }

  if (state.status === 'error') {
    return (
      <div className="readme readme--error">
        <p>{t({ ru: 'Не удалось загрузить README.', en: 'Could not load the README.' }, lang)}</p>
        <a className="btn btn--ghost" href={`https://github.com/ai-iskuzhin/${repo}#readme`} target="_blank" rel="noreferrer">
          <GitHubIcon />
          {t({ ru: 'Открыть на GitHub', en: 'Open on GitHub' }, lang)}
        </a>
      </div>
    )
  }

  return <div className="readme" dangerouslySetInnerHTML={{ __html: state.html }} />
}
