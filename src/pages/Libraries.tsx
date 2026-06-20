import type { Lang } from '../content/types'
import { ui, t } from '../i18n'
import { libraries } from '../content/libraries'
import { LibraryCard } from '../components/LibraryCard'

export function Libraries({ lang }: { lang: Lang }) {
  return (
    <div className="page">
      <header className="page-hero">
        <p className="eyebrow">{t({ ru: 'Открытый код', en: 'Open source' }, lang)}</p>
        <h1>{t(ui.sections.openSource, lang)}</h1>
        <p className="page-hero__lead">{t(ui.sections.openSourceLead, lang)}</p>
      </header>
      <div className="library-grid library-grid--wide">
        {libraries.map((library) => (
          <LibraryCard key={library.slug} library={library} lang={lang} />
        ))}
      </div>
    </div>
  )
}
