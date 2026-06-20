import type { Lang } from '../content/types'
import { ui, t } from '../i18n'
import { homePath } from '../routes'
import { Link } from '../router'

export function NotFound({ lang }: { lang: Lang }) {
  return (
    <div className="page not-found">
      <p className="not-found__code">404</p>
      <h1>{t(ui.notFound.title, lang)}</h1>
      <p>{t(ui.notFound.body, lang)}</p>
      <Link to={homePath(lang)} className="btn btn--primary">
        {t(ui.notFound.home, lang)}
      </Link>
    </div>
  )
}
