import type { Lang } from '../content/types'
import { t } from '../i18n'
import { ExternalIcon, GitHubIcon, CheckIcon } from '../components/Icons'
import { VerificaHubLogo, VerificaHubWordmark } from '../components/VerificaHubLogo'

const stack = ['ASP.NET Core', 'FastEndpoints', 'EF Core 10', 'PostgreSQL (Npgsql)', 'Redis', 'Docker', 'React', 'TypeScript']

const channels: Record<Lang, string[]> = {
  ru: ['Звонки (flash-call)', 'SMS', 'Голосовые сообщения', 'Мессенджеры', 'Социальные приложения'],
  en: ['Calls (flash-call)', 'SMS', 'Voice messages', 'Messengers', 'Social apps'],
}

export function Verificahub({ lang }: { lang: Lang }) {
  return (
    <article className="page verificahub-page">
      <header className="page-hero verificahub-hero">
        <VerificaHubLogo size={92} />
        <p className="eyebrow">{t({ ru: 'Флагманский продукт', en: 'Flagship product' }, lang)}</p>
        <h1><VerificaHubWordmark size={40} /></h1>
        <p className="page-hero__lead">
          {t(
            {
              ru: 'Платформа верификации пользователей: звонки, SMS, голос, мессенджеры и многое другое — в одном API.',
              en: 'A user-verification platform: calls, SMS, voice, social apps and more — in one API.',
            },
            lang,
          )}
        </p>
        <div className="library-hero__actions">
          <a className="btn btn--primary" href="https://verificahub.ru" target="_blank" rel="noreferrer">
            <ExternalIcon />
            verificahub.ru
          </a>
          <a className="btn btn--ghost" href="https://github.com/verificahub" target="_blank" rel="noreferrer">
            <GitHubIcon />
            github.com/verificahub
          </a>
        </div>
      </header>

      <section className="library-section">
        <h2>{t({ ru: 'Как это работает', en: 'How it works' }, lang)}</h2>
        <p className="prose">
          {t(
            {
              ru: 'v1 — входящая верификация по flash-call: пользователь звонит на выданный номер, звонок сбрасывается, а caller-id сопоставляется с открытой сессией. Никаких исходящих вызовов и никто не отвечает на звонок — это дешевле и надёжнее классической отправки SMS.',
              en: 'v1 ships inbound flash-call verification: a user dials a number we hand out, the call is rejected, and the caller-id is matched to an open session. No outbound dialing and no answered calls — cheaper and more reliable than classic SMS delivery.',
            },
            lang,
          )}
        </p>
      </section>

      <section className="library-section">
        <h2>{t({ ru: 'Каналы', en: 'Channels' }, lang)}</h2>
        <ul className="feature-grid">
          {channels[lang].map((channel) => (
            <li key={channel}>
              <CheckIcon />
              <span>{channel}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="library-section">
        <h2>{t({ ru: 'Технологии', en: 'Tech stack' }, lang)}</h2>
        <ul className="tag-list tag-list--lg">
          {stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </article>
  )
}
