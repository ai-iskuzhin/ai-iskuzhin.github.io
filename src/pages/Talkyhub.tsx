import type { Lang, L } from '../content/types'
import { t } from '../i18n'
import { ExternalIcon, GitHubIcon, CheckIcon } from '../components/Icons'
import { ProductLogo } from '../components/ProductLogo'



const steps: { title: L; body: L }[] = [
  {
    title: { ru: 'Обращения сходятся в инбокс', en: 'Messages converge into the inbox' },
    body: {
      ru: 'Входящие из каждого канала попадают в один поток — с фильтрами, поиском и приоритетами.',
      en: 'Incoming messages from every channel land in one stream — with filters, search and priorities.',
    },
  },
  {
    title: { ru: 'Контакт объединяет историю', en: 'The contact unifies history' },
    body: {
      ru: 'Параллельные разговоры из разных каналов привязываются к единому профилю клиента.',
      en: 'Parallel conversations from different channels are linked to a single customer profile.',
    },
  },
  {
    title: { ru: 'Команда отвечает как одно целое', en: 'The team replies as one' },
    body: {
      ru: 'Автоназначение, заметки и макросы дают согласованный ответ — без переключения между приложениями.',
      en: 'Auto-assignment, notes and macros give a consistent answer — without switching between apps.',
    },
  },
]

const features: { title: L; body: L }[] = [
  {
    title: { ru: 'Telegram, VK, MAX и почта', en: 'Telegram, VK, MAX and email' },
    body: {
      ru: 'VK и MAX подключены нативно, без сторонних коннекторов. Почта — по IMAP/SMTP.',
      en: 'VK and MAX are native, with no third-party connectors. Email works over IMAP/SMTP.',
    },
  },
  {
    title: { ru: 'Единый инбокс', en: 'One inbox' },
    body: {
      ru: 'Фильтры, поиск, метки, приоритеты, отложенные и автоматически закрываемые диалоги.',
      en: 'Filters, search, labels, priorities, snoozed and auto-resolved conversations.',
    },
  },
  {
    title: { ru: 'Рабочее место команды', en: 'A team workspace' },
    body: {
      ru: 'Команды, доступ по инбоксам, автоназначение на наименее загруженного оператора, SLA, заметки и макросы.',
      en: 'Teams, per-inbox access, auto-assignment to the least busy agent, SLA policies, notes and macros.',
    },
  },
  {
    title: { ru: 'Обновления в реальном времени', en: 'Live updates' },
    body: {
      ru: 'Новые сообщения и смена статусов приходят операторам сразу, без перезагрузки страницы.',
      en: 'New messages and status changes reach agents straight away, without a page reload.',
    },
  },
  {
    title: { ru: 'API на событиях', en: 'An event-driven API' },
    body: {
      ru: 'Каждое изменение в системе — типизированное событие. Подписанные webhook-и и журнал доставки.',
      en: 'Every change in the system is a typed event. Signed webhooks and a delivery log.',
    },
  },
  {
    title: { ru: 'Одна понятная цена', en: 'One clear price' },
    body: {
      ru: 'Два параметра вместо конфигуратора: размер команды и срок хранения истории. Все каналы включены, сообщения без лимита.',
      en: 'Two dials instead of a configurator: team size and how long history is kept. All channels included, unlimited messages.',
    },
  },
]

export function Talkyhub({ lang }: { lang: Lang }) {
  return (
    <article className="page product-page">
      <header className="page-hero product-hero">
        <ProductLogo src="/logos/talkyhub.svg" alt="TalkyHub" size={92} />
        <p className="eyebrow">{t({ ru: 'Флагманский продукт', en: 'Flagship product' }, lang)}</p>
        <h1>TalkyHub</h1>
        <p className="page-hero__lead">
          {t(
            {
              ru: 'Омниканальная платформа поддержки: обращения из Telegram, VK, MAX и почты собираются в один инбокс, а команда отвечает на них из единого рабочего места. Вся команда и вся история переписки — по одной понятной цене.',
              en: 'An omnichannel support platform: messages from Telegram, VK, MAX and email land in one inbox, and the team answers them from a single workspace. Your whole team and full history — for one clear price.',
            },
            lang,
          )}
        </p>
        <div className="library-hero__actions">
          <a className="btn btn--primary" href="https://app.talkyhub.ru" target="_blank" rel="noreferrer">
            <ExternalIcon />
            {t({ ru: 'Открыть приложение', en: 'Open the app' }, lang)}
          </a>
          <a className="btn btn--ghost" href="https://talkyhub.ru" target="_blank" rel="noreferrer">
            <ExternalIcon />
            talkyhub.ru
          </a>
          <a className="btn btn--ghost" href="https://docs.talkyhub.ru" target="_blank" rel="noreferrer">
            <ExternalIcon />
            {t({ ru: 'Документация', en: 'Docs' }, lang)}
          </a>
          <a className="btn btn--ghost" href="https://github.com/talkyhub" target="_blank" rel="noreferrer">
            <GitHubIcon />
            github.com/talkyhub
          </a>
        </div>
      </header>

      <section className="library-section">
        <h2>{t({ ru: 'Как это работает', en: 'How it works' }, lang)}</h2>
        <p className="prose">
          {t(
            {
              ru: 'Разные каналы — один клиент. Идея выросла из собственной нужды: VerificaHub и Moonlume VPN нужна поддержка в мессенджерах, и самодельный Telegram-бот, превращавший сообщения в темы форума, просился стать настоящим продуктом.',
              en: 'Different channels — one customer. The idea grew from a need of my own: VerificaHub and Moonlume VPN need support over messengers, and a homemade Telegram bot that turned messages into forum topics was begging to become a real product.',
            },
            lang,
          )}
        </p>
        <ol className="steps">
          {steps.map((step, index) => (
            <li key={index}>
              <span className="steps__num" aria-hidden="true">
                {index + 1}
              </span>
              <div>
                <strong>{t(step.title, lang)}</strong>
                <p>{t(step.body, lang)}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="library-section">
        <h2>{t({ ru: 'Что внутри', en: "What's inside" }, lang)}</h2>
        <ul className="feature-grid feature-grid--rich">
          {features.map((feature, index) => (
            <li key={index}>
              <CheckIcon />
              <span>
                <strong>{t(feature.title, lang)}.</strong> {t(feature.body, lang)}
              </span>
            </li>
          ))}
        </ul>
      </section>

    </article>
  )
}
