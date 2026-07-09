import type { CSSProperties } from 'react'
import type { Lang } from '../content/types'
import { ui, t } from '../i18n'
import { getLibrary } from '../content/libraries'
import { librariesPath } from '../routes'
import { Link } from '../router'
import { NotFound } from './NotFound'
import { CodeBlock } from '../components/CodeBlock'
import { NugetBadge } from '../components/NugetBadge'
import { ReadmeViewer } from '../components/ReadmeViewer'
import { GitHubIcon, NuGetIcon, ExternalIcon, ArrowIcon, CheckIcon } from '../components/Icons'

export function LibraryDetail({ lang, slug }: { lang: Lang; slug: string }) {
  const library = getLibrary(slug)
  if (!library) return <NotFound lang={lang} />

  const style = {
    '--accent-from': library.accent[0],
    '--accent-to': library.accent[1],
  } as CSSProperties

  const githubUrl = `https://github.com/ai-iskuzhin/${library.repo}`

  return (
    <article className="page library-page" style={style}>
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link to={librariesPath(lang)}>{t(ui.library.allLibraries, lang)}</Link>
        <span aria-hidden="true">/</span>
        <span>{library.name}</span>
      </nav>

      <header className="library-hero">
        <div className="library-hero__top">
          <img
            className="library-hero__logo"
            src={library.icon}
            alt={`${library.name} logo`}
            width={72}
            height={72}
          />
          <div className="library-hero__heading">
            <span className="library-hero__category">{t(library.category, lang)}</span>
            <h1>{library.name}</h1>
            <p className="library-hero__tagline">{t(library.tagline, lang)}</p>
          </div>
        </div>

        <div className="library-hero__badges">
          <NugetBadge pkg={library.nuget} kind="version" />
          <NugetBadge pkg={library.nuget} kind="downloads" />
          <span className="meta-badge">MIT</span>
          <span className="meta-badge">{library.language}</span>
        </div>

        <div className="library-hero__targets">
          {library.targets.map((target) => (
            <span key={target} className="target-chip">
              {target}
            </span>
          ))}
        </div>

        <div className="library-hero__actions">
          <a className="btn btn--primary" href={githubUrl} target="_blank" rel="noreferrer">
            <GitHubIcon />
            {t(ui.library.viewOnGithub, lang)}
          </a>
          <a className="btn btn--ghost" href={`https://www.nuget.org/packages/${library.nuget}`} target="_blank" rel="noreferrer">
            <NuGetIcon />
            {t(ui.library.viewOnNuget, lang)}
          </a>
          {library.docsUrl ? (
            <a className="btn btn--ghost" href={library.docsUrl} target="_blank" rel="noreferrer">
              <ExternalIcon />
              {library.docsLabel ? t(library.docsLabel, lang) : t({ ru: 'Документация', en: 'Docs' }, lang)}
            </a>
          ) : null}
        </div>
      </header>

      <section className="library-section">
        <h2>{t(ui.library.features, lang)}</h2>
        <ul className="feature-grid">
          {library.features.map((feature, index) => (
            <li key={index}>
              <CheckIcon />
              <span>{t(feature, lang)}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="library-section">
        <h2>{t(ui.library.install, lang)}</h2>
        <CodeBlock code={library.install} language="bash" lang={lang} />
      </section>

      <section className="library-section">
        <h2>{t(ui.library.quickstart, lang)}</h2>
        <CodeBlock code={library.quickstart.code} language={library.quickstart.language} lang={lang} />
      </section>

      {library.methods && library.methods.length > 0 ? (
        <section className="library-section">
          <h2>{t(ui.library.methods, lang)}</h2>
          <div className="method-table">
            {library.methods.map((method) => (
              <div className="method-row" key={method.name}>
                <code>{method.name}</code>
                <span>{t(method.desc, lang)}</span>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {library.nugetFamily && library.nugetFamily.length > 0 ? (
        <section className="library-section">
          <h2>{t(ui.library.family, lang)}</h2>
          <div className="family-grid">
            {[library.nuget, ...library.nugetFamily].map((pkg) => (
              <a key={pkg} className="family-chip" href={`https://www.nuget.org/packages/${pkg}`} target="_blank" rel="noreferrer">
                <NuGetIcon />
                {pkg}
              </a>
            ))}
          </div>
        </section>
      ) : null}

      <section className="library-section">
        <details className="readme-details" open>
          <summary>
            <span>README</span>
            <span className="readme-details__hint">github.com/ai-iskuzhin/{library.repo}</span>
          </summary>
          <ReadmeViewer repo={library.repo} lang={lang} />
        </details>
      </section>

      <div className="library-page__foot">
        <Link to={librariesPath(lang)} className="section__cta">
          <ArrowIcon style={{ transform: 'rotate(180deg)' }} />
          {t(ui.library.allLibraries, lang)}
        </Link>
      </div>
    </article>
  )
}
