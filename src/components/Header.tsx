import { useState } from 'react'
import type { Lang } from '../content/types'
import { ui, t } from '../i18n'
import {
  type RouteMatch,
  alternateRoute,
  pathForRoute,
  homePath,
  librariesPath,
  blogPath,
} from '../routes'
import { Link, useRouter } from '../router'
import { useTheme, type ThemeMode } from '../useTheme'
import { SunIcon, MoonIcon, SparkIcon } from './Icons'

const themeButtons: { mode: ThemeMode; label: L; icon: typeof SunIcon }[] = [
  { mode: 'light', label: { ru: 'Светлая тема', en: 'Light theme' }, icon: SunIcon },
  { mode: 'dark', label: { ru: 'Тёмная тема', en: 'Dark theme' }, icon: MoonIcon },
  { mode: 'system', label: { ru: 'Системная тема', en: 'System theme' }, icon: SparkIcon },
]

type L = Record<Lang, string>

export function Header({ route }: { route: RouteMatch }) {
  const lang = route.lang
  const { navigate } = useRouter()
  const { mode, setMode } = useTheme()
  const [open, setOpen] = useState(false)

  const navLinks = [
    { to: `${homePath(lang)}#about`, label: ui.nav.about },
    { to: librariesPath(lang), label: ui.nav.openSource },
    { to: `${homePath(lang)}#experience`, label: ui.nav.experience },
    { to: blogPath(lang), label: ui.nav.blog },
    { to: `${homePath(lang)}#contact`, label: ui.nav.contact },
  ]

  const switchLang = (target: Lang) => {
    if (target === lang) return
    navigate(pathForRoute(alternateRoute(route, target)))
  }

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link to={homePath(lang)} className="brand" onClick={() => setOpen(false)}>
          <span className="brand__mark">AI</span>
          <span className="brand__name">iskuzhin.dev</span>
        </Link>

        <nav className={`primary-nav${open ? ' is-open' : ''}`} aria-label="Primary">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} onClick={() => setOpen(false)}>
              {t(link.label, lang)}
            </Link>
          ))}
        </nav>

        <div className="header-controls">
          <div className="lang-switch" role="group" aria-label="Language">
            {(['ru', 'en'] as Lang[]).map((code) => (
              <button
                key={code}
                type="button"
                className={code === lang ? 'is-active' : undefined}
                aria-pressed={code === lang}
                onClick={() => switchLang(code)}
              >
                {t(ui.langName, code)}
              </button>
            ))}
          </div>

          <div className="theme-switch" role="group" aria-label={lang === 'ru' ? 'Тема' : 'Theme'}>
            {themeButtons.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.mode}
                  type="button"
                  className={mode === item.mode ? 'is-active' : undefined}
                  aria-pressed={mode === item.mode}
                  aria-label={t(item.label, lang)}
                  title={t(item.label, lang)}
                  onClick={() => setMode(item.mode)}
                >
                  <Icon />
                </button>
              )
            })}
          </div>

          <button
            type="button"
            className={`menu-toggle${open ? ' is-open' : ''}`}
            aria-expanded={open}
            aria-label={lang === 'ru' ? 'Меню' : 'Menu'}
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  )
}
