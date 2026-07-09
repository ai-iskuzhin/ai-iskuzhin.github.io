import type { Lang } from '../content/types'
import { ui, t } from '../i18n'
import { socials, profile, legal, prettyHref } from '../content/profile'
import { librariesPath, verificahubPath, homePath } from '../routes'
import { Link } from '../router'
import { SocialIcon } from './SocialIcon'

export function Footer({ lang }: { lang: Lang }) {
  const year = '2026'
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <p className="site-footer__name">{profile.name[lang]}</p>
          <p className="site-footer__role">{profile.role[lang]}</p>
        </div>

        <nav className="site-footer__links" aria-label="Footer">
          <Link to={homePath(lang)}>{t(ui.nav.about, lang)}</Link>
          <Link to={librariesPath(lang)}>{t(ui.nav.openSource, lang)}</Link>
          <Link to={verificahubPath(lang)}>VerificaHub</Link>
        </nav>

        <div className="site-footer__social">
          {socials
            .filter((social) => /^https?:/.test(social.href))
            .map((social) => (
              <a
                key={`${social.type}-${social.href}`}
                className="tip"
                data-tip={prettyHref(social.href)}
                href={social.href}
                target="_blank"
                // rel="me" ties these profiles to this identity (IndieWeb / Mastodon verification).
                rel="me noreferrer"
                aria-label={`${social.label} — ${prettyHref(social.href)}`}
              >
                <SocialIcon type={social.type} />
              </a>
            ))}
        </div>
      </div>

      <div className="site-footer__legal">
        <span>© {year} {profile.name[lang]}. {t(ui.footer.rights, lang)}</span>
        <img
          className="ghpvc"
          src="https://komarev.com/ghpvc/?username=ai-iskuzhin&style=for-the-badge&color=6D28D9&label=PROFILE+VIEWS"
          alt="Profile views"
          loading="lazy"
          decoding="async"
        />
      </div>

      {lang === 'ru' ? (
        <p className="site-footer__entity">
          {legal.form[lang]} {profile.name[lang]} · ИНН {legal.inn} · ОГРНИП {legal.ogrnip} · ОКВЭД{' '}
          {legal.okved} — {legal.okvedLabel[lang]}
        </p>
      ) : null}
    </footer>
  )
}
