import type { CSSProperties } from 'react'
import type { Library, Lang } from '../content/types'
import { t } from '../i18n'
import { libraryPath } from '../routes'
import { Link } from '../router'
import { NugetBadge } from './NugetBadge'
import { ArrowIcon } from './Icons'

type LibraryCardProps = {
  library: Library
  lang: Lang
}

export function LibraryCard({ library, lang }: LibraryCardProps) {
  const style = {
    '--accent-from': library.accent[0],
    '--accent-to': library.accent[1],
  } as CSSProperties

  return (
    <Link to={libraryPath(lang, library.slug)} className="library-card" style={style}>
      <div className="library-card__glow" aria-hidden="true" />
      <div className="library-card__top">
        <img
          className="library-card__logo"
          src={library.icon}
          alt={`${library.name} logo`}
          width={56}
          height={56}
          loading="lazy"
        />
        <div className="library-card__heading">
          <span className="library-card__category">{t(library.category, lang)}</span>
          <h3 className="library-card__name">{library.name}</h3>
          <p className="library-card__tagline">{t(library.tagline, lang)}</p>
        </div>
      </div>
      <p className="library-card__summary">{t(library.summary, lang)}</p>
      <div className="library-card__footer">
        <div className="library-card__badges">
          {/* The card itself is an <a>, so these must not be anchors too. */}
          <NugetBadge pkg={library.nuget} kind="version" linked={false} />
          <NugetBadge pkg={library.nuget} kind="downloads" linked={false} />
        </div>
        <span className="library-card__more">
          {t({ ru: 'Детали', en: 'Details' }, lang)}
          <ArrowIcon />
        </span>
      </div>
    </Link>
  )
}
