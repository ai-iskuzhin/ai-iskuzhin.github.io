import type { L, Lang } from './types'

export type Block =
  | { type: 'p'; text: L }
  | { type: 'h2'; text: L }
  | { type: 'ul'; items: L[] }
  | { type: 'code'; language: string; code: string }

export type Post = {
  slug: string
  /** ISO date — kept as a plain string so builds stay deterministic. */
  date: string
  readingMinutes: number
  title: L
  excerpt: L
  tags: string[]
  body: Record<Lang, Block[]>
}

export const posts: Post[] = [
  {
    slug: 'open-source-dotnet-sdks',
    date: '2026-06-21',
    readingMinutes: 4,
    title: {
      ru: 'Зачем я пишу dependency-light .NET SDK для финтеха',
      en: 'Why I build dependency-light .NET SDKs for fintech',
    },
    excerpt: {
      ru: 'Пять открытых библиотек для платежей, фискализации и верификации — и принципы, по которым они сделаны.',
      en: 'Five open-source libraries for payments, fiscalization and verification — and the principles behind them.',
    },
    tags: ['.NET', 'Open Source', 'Fintech', 'NuGet'],
    body: {
      ru: [
        {
          type: 'p',
          text: {
            ru: 'За время работы с платёжными интеграциями я раз за разом писал один и тот же клиентский код для российских сервисов. В какой-то момент стало понятно: это нужно вынести в аккуратные, переиспользуемые SDK с открытым кодом.',
            en: '',
          },
        },
        {
          type: 'h2',
          text: { ru: 'Принципы', en: '' },
        },
        {
          type: 'ul',
          items: [
            { ru: 'Минимум зависимостей — только HttpClient и System.Text.Json.', en: '' },
            { ru: 'Мульти-таргет: netstandard2.0, net8.0 и net10.0.', en: '' },
            { ru: 'Типобезопасность вместо «магических строк».', en: '' },
            { ru: 'Предсказуемая модель ошибок и идемпотентность там, где это важно.', en: '' },
          ],
        },
        {
          type: 'p',
          text: {
            ru: 'Сегодня это пять библиотек: YooKassaNet, TBankAcquiringNet, AtolOnlineNet, TelegramGatewayNet и RsqlParserNet. Все они опубликованы в NuGet под лицензией MIT.',
            en: '',
          },
        },
        {
          type: 'code',
          language: 'bash',
          code: 'dotnet add package YooKassaNet',
        },
      ],
      en: [
        {
          type: 'p',
          text: {
            ru: '',
            en: 'Working on payment integrations, I kept writing the same client code for Russian services over and over. At some point it was obvious: this belongs in clean, reusable, open-source SDKs.',
          },
        },
        {
          type: 'h2',
          text: { ru: '', en: 'Principles' },
        },
        {
          type: 'ul',
          items: [
            { ru: '', en: 'Minimal dependencies — just HttpClient and System.Text.Json.' },
            { ru: '', en: 'Multi-targeting: netstandard2.0, net8.0 and net10.0.' },
            { ru: '', en: 'Type safety instead of “magic strings”.' },
            { ru: '', en: 'A predictable error model and idempotency where it matters.' },
          ],
        },
        {
          type: 'p',
          text: {
            ru: '',
            en: 'Today that is five libraries: YooKassaNet, TBankAcquiringNet, AtolOnlineNet, TelegramGatewayNet and RsqlParserNet. All of them are published on NuGet under the MIT license.',
          },
        },
        {
          type: 'code',
          language: 'bash',
          code: 'dotnet add package YooKassaNet',
        },
      ],
    },
  },
]

export function getPost(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug)
}
