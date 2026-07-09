import type { Lang } from '../content/types'
import { ui, t } from '../i18n'
import { profile, experience, projects, socials, contactEmail, prettyHref } from '../content/profile'
import { libraries } from '../content/libraries'
import { librariesPath, verificahubPath } from '../routes'
import { Link } from '../router'
import { LibraryCard } from '../components/LibraryCard'
import { SocialIcon } from '../components/SocialIcon'
import { Ticker } from '../components/Ticker'
import { Typewriter } from '../components/Typewriter'
import { VerificaHubLogo, VerificaHubWordmark } from '../components/VerificaHubLogo'
import { ArrowIcon, ExternalIcon, MailIcon } from '../components/Icons'

const packageCount = libraries.reduce((total, lib) => total + 1 + (lib.nugetFamily?.length ?? 0), 0)

// The first phrase is what prerendered HTML and crawlers see, so it carries the
// positioning; the rest rotate on the client.
const phrases: Record<Lang, string[]> = {
  ru: [
    'Разработчик IT-продуктов — от идеи до продакшена',
    'Финтех, платёжные интеграции и эквайринг',
    'ASP.NET Core · React · TypeScript · PostgreSQL',
    'Пишу open-source .NET SDK для финтеха',
    'API для верификации и приёма платежей',
  ],
  en: [
    'IT product developer — from idea to production',
    'Fintech, payment integrations and acquiring',
    'ASP.NET Core · React · TypeScript · PostgreSQL',
    'I build open-source .NET SDKs for fintech',
    'APIs that verify, charge and scale',
  ],
}

export function Home({ lang }: { lang: Lang }) {
  return (
    <>
      <Ticker lang={lang} />

      <section className="hero" aria-label={profile.name[lang]}>
        <div className="hero__bg" aria-hidden="true">
          <div className="hero__orb hero__orb--1" />
          <div className="hero__orb hero__orb--2" />
        </div>
        <div className="hero__inner">
          <div className="hero__text">
            <p className="eyebrow">{t(ui.hero.eyebrow, lang)}</p>
            <h1 className="hero__name">
              <span className="gradient-text">{profile.name[lang]}</span>
            </h1>
            <p className="hero__role">
              <Typewriter key={lang} phrases={phrases[lang]} />
            </p>
            <p className="hero__tagline">{t(profile.tagline, lang)}</p>

            <div className="hero__actions">
              <Link to={librariesPath(lang)} className="btn btn--primary">
                {t(ui.hero.ctaProjects, lang)}
                <ArrowIcon />
              </Link>
              <a href={`mailto:${contactEmail}`} className="btn btn--ghost">
                <MailIcon />
                {t(ui.hero.ctaContact, lang)}
              </a>
            </div>

            <div className="hero__socials">
              {socials
                .filter((social) => /^https?:/.test(social.href))
                .map((social) => (
                  <a
                    key={`${social.type}-${social.href}`}
                    className="tip"
                    data-tip={prettyHref(social.href)}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${social.label} — ${prettyHref(social.href)}`}
                  >
                    <SocialIcon type={social.type} />
                  </a>
                ))}
            </div>
          </div>

          <div className="hero__aside">
            <div className="hero__photo">
              <img src="/me.jpg" alt={profile.name[lang]} width={220} height={220} loading="eager" />
            </div>
            <div className="hero__stats">
              <div className="stat">
                <span className="stat__value">4+</span>
                <span className="stat__label">{t(ui.hero.stats.years, lang)}</span>
              </div>
              <div className="stat">
                <span className="stat__value">{packageCount}</span>
                <span className="stat__label">{t(ui.hero.stats.packages, lang)}</span>
              </div>
              <div className="stat">
                <span className="stat__value">{libraries.length}</span>
                <span className="stat__label">{t({ ru: 'open-source SDK', en: 'open-source SDKs' }, lang)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="about">
        <div className="section__head">
          <p className="section__kicker">{t(ui.sections.about, lang)}</p>
        </div>
        <div className="about-grid">
          <div className="about-copy">
            {profile.about[lang].map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          <aside className="about-meta">
            <div>
              <span className="about-meta__label">{t({ ru: 'Локация', en: 'Location' }, lang)}</span>
              <span>{t(profile.location, lang)}</span>
            </div>
            <div>
              <span className="about-meta__label">{t({ ru: 'Стек', en: 'Stack' }, lang)}</span>
              <span>.NET · ASP.NET Core · PostgreSQL · React</span>
            </div>
            <div>
              <span className="about-meta__label">{t({ ru: 'Фокус', en: 'Focus' }, lang)}</span>
              <span>{t({ ru: 'Backend · Платежи · Open Source', en: 'Backend · Payments · Open Source' }, lang)}</span>
            </div>
          </aside>
        </div>
      </section>

      <section className="section" id="open-source">
        <div className="section__head">
          <p className="section__kicker">{t(ui.sections.openSource, lang)}</p>
          <p className="section__lead">{t(ui.sections.openSourceLead, lang)}</p>
        </div>
        <div className="library-grid">
          {libraries.map((library) => (
            <LibraryCard key={library.slug} library={library} lang={lang} />
          ))}
        </div>
        <Link to={librariesPath(lang)} className="section__cta">
          {t({ ru: 'Все библиотеки и документация', en: 'All libraries and docs' }, lang)}
          <ArrowIcon />
        </Link>
      </section>

      <section className="section" id="flagship">
        <div className="section__head">
          <p className="section__kicker">{t(ui.sections.flagship, lang)}</p>
        </div>
        <Link to={verificahubPath(lang)} className="flagship-card">
          <VerificaHubLogo size={68} />
          <div className="flagship-card__body">
            <h3><VerificaHubWordmark size={26} /></h3>
            <p>
              {t(
                {
                  ru: 'Платформа верификации пользователей: звонки, SMS, голос, мессенджеры и многое другое — в одном API.',
                  en: 'A user-verification platform: calls, SMS, voice, social apps and more — in one API.',
                },
                lang,
              )}
            </p>
            <div className="flagship-card__stack">
              {['ASP.NET Core', 'FastEndpoints', 'EF Core 10', 'PostgreSQL', 'Redis'].map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
          <span className="flagship-card__more">
            {t({ ru: 'Подробнее', en: 'Learn more' }, lang)}
            <ArrowIcon />
          </span>
        </Link>
      </section>

      <section className="section" id="experience">
        <div className="section__head">
          <p className="section__kicker">{t(ui.sections.experience, lang)}</p>
        </div>
        <div className="timeline">
          {experience.map((item, index) => (
            <article className="timeline-item" key={`${item.period[lang]}-${index}`}>
              <div className="timeline-item__marker" aria-hidden="true" />
              <div className="timeline-item__body">
                <p className="timeline-item__focus">
                  {item.focusHref ? (
                    <a href={item.focusHref} target="_blank" rel="noreferrer">
                      {t(item.focus, lang)}
                    </a>
                  ) : (
                    t(item.focus, lang)
                  )}
                </p>
                <h3>
                  {t(item.role, lang)} ·{' '}
                  <a href={item.companyHref} target="_blank" rel="noreferrer">
                    {t(item.company, lang)}
                  </a>
                </h3>
                <p className="timeline-item__period">
                  {t(item.period, lang)} <span>· {t(item.duration, lang)}</span>
                </p>
                <p className="timeline-item__summary">{t(item.summary, lang)}</p>
                <ul className="bullets">
                  {item.highlights.map((highlight, hi) => (
                    <li key={hi}>{t(highlight, lang)}</li>
                  ))}
                </ul>
                <ul className="tag-list">
                  {item.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="projects">
        <div className="section__head">
          <p className="section__kicker">{t(ui.sections.projects, lang)}</p>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.title.en}>
              <h3>{t(project.title, lang)}</h3>
              <p>{t(project.description, lang)}</p>
              {project.notes ? (
                <ul className="bullets bullets--compact">
                  {project.notes.map((note, ni) => (
                    <li key={ni}>{t(note, lang)}</li>
                  ))}
                </ul>
              ) : null}
              <ul className="tag-list">
                {project.stack.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="project-card__links">
                {project.links.map((link) => (
                  <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                    {link.label}
                    <ExternalIcon />
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section contact" id="contact">
        <div className="contact__card">
          <p className="section__kicker">{t(ui.sections.contact, lang)}</p>
          <h2>{t(ui.contact.heading, lang)}</h2>
          <p>{t(ui.contact.body, lang)}</p>
          <a className="btn btn--primary" href={`mailto:${contactEmail}`}>
            <MailIcon />
            {t(ui.contact.write, lang)}
          </a>
          <p className="contact__email">{contactEmail}</p>
        </div>
      </section>
    </>
  )
}
