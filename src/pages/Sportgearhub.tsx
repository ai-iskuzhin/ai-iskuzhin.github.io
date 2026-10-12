import type { Lang, L } from '../content/types'
import { t } from '../i18n'
import { ExternalIcon, GitHubIcon, CheckIcon } from '../components/Icons'
import { ProductLogo } from '../components/ProductLogo'



const steps: { title: L; body: L }[] = [
  {
    title: { ru: 'Выберите снаряжение', en: 'Pick the gear' },
    body: {
      ru: 'Каталог прокатов вашего города: тип, размер, цена.',
      en: 'A catalogue of the rentals in your city: type, size, price.',
    },
  },
  {
    title: { ru: 'Забронируйте онлайн', en: 'Book online' },
    body: {
      ru: 'Дата и время, цена и залог — до оплаты. Карта или СБП.',
      en: 'Date and time, with the price and the deposit shown before you pay. Card or SBP.',
    },
  },
  {
    title: { ru: 'Заберите в прокате', en: 'Pick it up at the rental' },
    body: {
      ru: 'Бронь и чек уже в телефоне.',
      en: 'The booking and the receipt are already on your phone.',
    },
  },
]

const features: { title: L; body: L }[] = [
  {
    title: { ru: 'Каталог по видам активности', en: 'A catalogue by activity' },
    body: {
      ru: 'Вода, велосипеды, зима, походы и активный отдых — страницы собираются из живых предложений прокатов.',
      en: 'Water, cycling, winter, hiking and active leisure — pages are built from the rentals’ live offers.',
    },
  },
  {
    title: { ru: 'Онлайн-бронь и оплата', en: 'Online booking and payment' },
    body: {
      ru: 'Карта, СБП или Мир. Чеки отправляются автоматически, возвраты идут по правилам отмены конкретного проката.',
      en: 'Card, SBP or Mir. Fiscal receipts go out automatically, and refunds follow each rental’s own cancellation rules.',
    },
  },
  {
    title: { ru: 'Проверенные прокаты', en: 'Verified rentals' },
    body: {
      ru: 'Каждый прокат проходит проверку документов, прежде чем попасть в каталог.',
      en: 'Every rental has its documents checked before it reaches the catalogue.',
    },
  },
  {
    title: { ru: 'Кабинет для прокатов', en: 'A console for rentals' },
    body: {
      ru: 'Карточки с фото, ценами на 2 часа, полдня и сутки, залогом и правилами неявки. Мгновенная бронь или с подтверждением.',
      en: 'Listings with photos, prices for 2 hours, half a day and a day, a deposit and no-show rules. Instant booking or booking on confirmation.',
    },
  },
  {
    title: { ru: 'Выдача по QR', en: 'QR handover' },
    body: {
      ru: 'Выдача и возврат по QR-коду, поиск по штрихкоду, пункты проката с часами работы и роли сотрудников.',
      en: 'Handover and return by QR code, barcode search, rental points with opening hours and staff roles.',
    },
  },
  {
    title: { ru: 'Автоматические выплаты', en: 'Automatic payouts' },
    body: {
      ru: 'Деньги приходят прокату по СБП или на счёт. Без абонентской платы — только комиссия. Для самозанятых, ИП и организаций.',
      en: 'Money reaches the rental by SBP or bank transfer. No subscription — commission only. Open to the self-employed, sole traders and companies.',
    },
  },
]

export function Sportgearhub({ lang }: { lang: Lang }) {
  return (
    <article className="page product-page">
      <header className="page-hero product-hero">
        <ProductLogo src="/logos/sportgearhub.svg" alt="Sportgearhub" size={92} />
        <p className="eyebrow">{t({ ru: 'Флагманский продукт', en: 'Flagship product' }, lang)}</p>
        <h1>Sportgearhub</h1>
        <p className="page-hero__lead">
          {t(
            {
              ru: 'Маркетплейс проката спортивного снаряжения: велосипеды, SUP-доски, лыжи и походное снаряжение от проверенных прокатов. Бронь за пару минут, оплата онлайн — а прокатам клиенты, оплата, чеки и выплаты без ручной работы.',
              en: 'A sports gear rental marketplace: bikes, SUP boards, skis and hiking gear from verified rentals. Book in a couple of minutes and pay online — while the rentals get customers, payments, receipts and payouts with no manual work.',
            },
            lang,
          )}
        </p>
        <div className="library-hero__actions">
          <a className="btn btn--primary" href="https://sportgearhub.ru" target="_blank" rel="noreferrer">
            <ExternalIcon />
            sportgearhub.ru
          </a>
          <a className="btn btn--ghost" href="https://seller.sportgearhub.ru" target="_blank" rel="noreferrer">
            <ExternalIcon />
            {t({ ru: 'Кабинет проката', en: 'Seller console' }, lang)}
          </a>
          <a className="btn btn--ghost" href="https://github.com/sportgearhub" target="_blank" rel="noreferrer">
            <GitHubIcon />
            github.com/sportgearhub
          </a>
        </div>
      </header>

      <section className="library-section">
        <h2>{t({ ru: 'Как это работает', en: 'How it works' }, lang)}</h2>
        <p className="prose">
          {t(
            {
              ru: 'Sportgearhub собирает предложения локальных прокатов, показывает честные цены и условия, принимает оплату и защищает обе стороны сделки. Для клиента это три шага.',
              en: 'Sportgearhub gathers offers from local rentals, shows honest prices and terms, takes the payment and protects both sides of the deal. For a customer it is three steps.',
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
