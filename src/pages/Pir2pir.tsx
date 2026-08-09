import type { Lang, L } from '../content/types'
import { t } from '../i18n'
import { ExternalIcon, GitHubIcon, CheckIcon } from '../components/Icons'
import { Pir2pirLogo } from '../components/Pir2pirLogo'

const stack = ['ASP.NET Core', 'PostgreSQL', 'School21Net', 'Telegram Bot', 'MAX', 'React', 'TypeScript']

const steps: { title: L; body: L }[] = [
  {
    title: { ru: 'Войдите по логину', en: 'Sign in with your login' },
    body: {
      ru: 'Код придёт на студенческую почту. Пароля нет, и никто не оказывается на платформе, не войдя сам.',
      en: 'A code arrives at your student email. There is no password, and nobody ends up here without signing in themselves.',
    },
  },
  {
    title: { ru: 'Выберите проект', en: 'Pick the project' },
    body: {
      ru: 'Проекты подтягиваются из Школы 21 — укажите тот, что ждёт проверки. Или попросите конкретного участника по точному логину.',
      en: 'Projects come from School 21 — choose the one waiting to be reviewed. Or ask one particular peer, by their exact login.',
    },
  },
  {
    title: { ru: 'Дождитесь согласия', en: 'Wait for a yes' },
    body: {
      ru: 'Платформа спрашивает подходящих сама и останавливается на первом «да». Дальше — чат, где вы договоритесь о времени.',
      en: 'The platform does the asking and stops the moment somebody agrees. Then it is a chat, where the two of you settle on a time.',
    },
  },
]

const features: { title: L; body: L }[] = [
  {
    title: { ru: 'Взаимные совпадения', en: 'Reciprocal matches' },
    body: {
      ru: 'Если двое ждут проверки одного проекта, их просто соединяют — согласие уже есть у обоих.',
      en: 'When two people are waiting on the same project, they are simply put together — both already want it.',
    },
  },
  {
    title: { ru: 'Поиск без объявлений', en: 'No posting, no asking around' },
    body: {
      ru: 'Платформа спрашивает подходящих по нескольку за раз, а не всех сразу, и останавливается на первом согласии.',
      en: 'The platform asks likely peers a few at a time rather than everybody at once, and stops as soon as one says yes.',
    },
  },
  {
    title: { ru: 'Имена — только при совпадении', en: 'Names only at the match' },
    body: {
      ru: 'Пока идёт поиск, кандидат видит проект и кампус, но не того, кто просит. Решение — по работе.',
      en: 'While a search is running, a candidate sees the project and the campus, not who is asking. The decision is made on the work.',
    },
  },
  {
    title: { ru: 'Контакты остаются вашими', en: 'Contacts stay yours' },
    body: {
      ru: 'Платформа не выдаёт ничьих контактов — ни Telegram, ни почты. Продолжить в другом месте — только по вашему слову.',
      en: 'It never hands out contact details — not a Telegram, not an email. To carry on elsewhere, you say so yourself.',
    },
  },
  {
    title: { ru: 'Разговоры не копятся', en: 'Conversations do not pile up' },
    body: {
      ru: 'Чат живёт, пока им пользуются, потом истекает и удаляется. С одним человеком — один разговор.',
      en: 'A chat lasts as long as it is being used, then expires and is deleted. One conversation per person.',
    },
  },
  {
    title: { ru: 'Никого не добавляли без спроса', en: 'Nobody was added without asking' },
    body: {
      ru: 'Здесь только те, кто вошёл сам: базу Школы 21 никто не выгружал. Списка участников нет.',
      en: 'Everyone here signed in themselves; the school’s user base was never crawled. There is no member list.',
    },
  },
]

export function Pir2pir({ lang }: { lang: Lang }) {
  return (
    <article className="page pir2pir-page">
      <header className="page-hero pir2pir-hero">
        <Pir2pirLogo size={92} />
        <p className="eyebrow">{t({ ru: 'Флагманский продукт', en: 'Flagship product' }, lang)}</p>
        <h1>{t({ ru: 'Пир2Пир', en: 'Pir2Pir' }, lang)}</h1>
        <p className="page-hero__lead">
          {t(
            {
              ru: 'Пир2Пир находит участника Школы 21, который проверит ваш проект, и даёт место, где об этом договориться. Вместо объявления в общем чате и ожидания ответа.',
              en: 'Pir2Pir finds a School 21 student to review your project, and gives you a place to arrange it. Instead of posting in a group chat and waiting for an answer.',
            },
            lang,
          )}
        </p>
        <div className="library-hero__actions">
          <a className="btn btn--primary" href="https://app.pir2pir.ru" target="_blank" rel="noreferrer">
            <ExternalIcon />
            {t({ ru: 'Открыть приложение', en: 'Open the app' }, lang)}
          </a>
          <a className="btn btn--ghost" href="https://t.me/pir2pirbot" target="_blank" rel="noreferrer">
            <ExternalIcon />
            {t({ ru: 'Бот в Telegram', en: 'Telegram bot' }, lang)}
          </a>
          <a className="btn btn--ghost" href="https://github.com/pir2pir" target="_blank" rel="noreferrer">
            <GitHubIcon />
            github.com/pir2pir
          </a>
        </div>
      </header>

      <section className="library-section">
        <h2>{t({ ru: 'Как это работает', en: 'How it works' }, lang)}</h2>
        <p className="prose">
          {t(
            {
              ru: 'Три шага до разговора с тем, кто проверит ваш проект — в веб-приложении или в Telegram. Сама платформа ничего не проверяет и не оценивает — проверка остаётся между вами и пиром.',
              en: 'Three steps to a conversation with someone who will review your project — in the web app or in Telegram. The platform reviews nothing and grades nothing; the review stays between you and your peer.',
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

      <section className="library-section">
        <h2>{t({ ru: 'Технологии', en: 'Tech stack' }, lang)}</h2>
        <ul className="tag-list tag-list--lg">
          {stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="prose prose--muted">
          {t(
            {
              ru: 'Пир2Пир — проект участника сообщества. Платформа не является АНО «Школа 21», не аффилирована с ней и не действует от её имени.',
              en: 'Pir2Pir is a community member’s project. It is not the “School 21” organization, is not affiliated with it and does not act on its behalf.',
            },
            lang,
          )}
        </p>
      </section>
    </article>
  )
}
