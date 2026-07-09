import type { L } from './types'

export const profile = {
  name: { ru: 'Айгиз Искужин', en: 'Aigiz Iskuzhin' } as L,
  /** Short: it follows the name in <title> and is the JSON-LD jobTitle. */
  role: {
    ru: 'Разработчик IT-продуктов',
    en: 'IT product developer',
  } as L,
  /** Carries the keywords the broader role no longer states outright. */
  specialty: {
    ru: 'Финтех, платёжные интеграции и open-source .NET SDK',
    en: 'Fintech, payment integrations and open-source .NET SDKs',
  } as L,
  tagline: {
    ru: 'Разрабатываю IT-продукты на .NET: платёжные интеграции, backend и инфраструктура. Четыре года коммерческого опыта и девять open-source SDK.',
    en: 'I build IT products on .NET: payment integrations, backend and infrastructure. Four years of commercial experience and nine open-source SDKs.',
  } as L,
  location: { ru: 'Уфа, Россия · удалённо', en: 'Ufa, Russia · remote' } as L,
  about: {
    ru: [
      'Разрабатываю прикладные системы, где важны надёжность, понятная архитектура и аккуратная интеграция с внешними сервисами. Есть опыт поддержки legacy-систем, постепенной миграции на современный стек и внедрения процессов, которые ускоряют доставку изменений.',
      'Сильнее всего мне интересны backend-разработка, платёжные и социальные сервисы, инфраструктура развёртывания, автоматизация бизнес-процессов и практичные инструменты с открытым кодом для других разработчиков.',
    ],
    en: [
      'I build line-of-business systems where reliability, a clear architecture and careful integration with external services matter. I have hands-on experience maintaining legacy systems, migrating them onto a modern stack step by step, and putting in place the processes that make shipping safe.',
      'I am most drawn to backend development, payment and social services, deployment infrastructure, business-process automation and practical open-source tooling for other developers.',
    ],
  } as Record<'ru' | 'en', string[]>,
}

export type Experience = {
  period: L
  duration: L
  role: L
  company: L
  companyHref: string
  focus: L
  focusHref?: string
  summary: L
  highlights: L[]
  skills: string[]
}

export const experience: Experience[] = [
  {
    period: { ru: 'Январь 2026 — настоящее время', en: 'January 2026 — present' },
    duration: { ru: 'сейчас', en: 'now' },
    role: { ru: 'Инженер-программист', en: 'Software engineer' },
    company: { ru: 'Башкирский регистр социальных карт, ОАО', en: 'Bashkir Register of Social Cards' },
    companyHref: 'https://brsc.ru',
    focus: { ru: 'Карта жителя РБ', en: 'Resident Card of Bashkortostan' },
    summary: {
      ru: 'Развиваю сервисы и интеграции проекта «Карта жителя РБ»: прикладную функциональность, backend-сервисы и сопровождение промышленного контура.',
      en: 'Developing services and integrations for the “Resident Card” project: application features, backend services and production support.',
    },
    highlights: [
      { ru: 'Развиваю сервисы и поддерживаю пользовательские и внутренние сценарии.', en: 'Grow the services and support user-facing and internal scenarios.' },
      { ru: 'Работаю с интеграциями, backend-логикой и инфраструктурными задачами.', en: 'Work across integrations, backend logic and infrastructure tasks.' },
    ],
    skills: ['.NET', 'Backend', 'Integrations', 'PostgreSQL', 'Linux', 'Git'],
  },
  {
    period: { ru: 'Январь 2023 — Декабрь 2024', en: 'January 2023 — December 2024' },
    duration: { ru: '2 года', en: '2 years' },
    role: { ru: 'Ведущий разработчик .NET', en: 'Lead .NET developer' },
    company: { ru: 'Башкирский регистр социальных карт, ОАО', en: 'Bashkir Register of Social Cards' },
    companyHref: 'https://brsc.ru',
    focus: { ru: 'Социальная карта Башкортостана', en: 'Social Card of Bashkortostan' },
    summary: {
      ru: 'Отвечал за развитие сервисов проекта: поддерживал legacy-контур, проектировал интеграции, развивал backend на .NET 5/6 и участвовал в инфраструктурной модернизации.',
      en: 'Owned the evolution of the project’s services: maintained the legacy estate, designed integrations, grew the .NET 5/6 backend and drove infrastructure modernization.',
    },
    highlights: [
      { ru: 'Спроектировал и реализовал сервис интеграции с банком Совкомбанк.', en: 'Designed and built the Sovcombank integration service.' },
      { ru: 'Участвовал в переходе от монолита к сервисной архитектуре.', en: 'Helped move from a monolith to a service-oriented architecture.' },
      { ru: 'Автоматизировал бизнес-процессы и внедрял CI/CD.', en: 'Automated business processes and introduced CI/CD.' },
      { ru: 'Участвовал в миграциях MS SQL → PostgreSQL и Windows/IIS → Linux/systemd.', en: 'Took part in MS SQL → PostgreSQL and Windows/IIS → Linux/systemd migrations.' },
      { ru: 'Проектировал контракты и коммуникацию между сервисами через gRPC и HTTP.', en: 'Designed inter-service contracts over gRPC and HTTP.' },
    ],
    skills: ['ASP.NET MVC', '.NET 5/6', 'MSSQL', 'PostgreSQL', 'IIS', 'Linux', 'YARP', 'nginx', 'Redis', 'gRPC'],
  },
  {
    period: { ru: 'Август 2024 — Октябрь 2024', en: 'August 2024 — October 2024' },
    duration: { ru: '3 месяца', en: '3 months' },
    role: { ru: 'C-разработчик', en: 'C developer' },
    company: { ru: 'Башкирский регистр социальных карт, ОАО', en: 'Bashkir Register of Social Cards' },
    companyHref: 'https://brsc.ru',
    focus: { ru: 'UNIX POS-терминалы', en: 'UNIX POS terminals' },
    summary: {
      ru: 'Разработал кассовое ПО для UNIX POS-терминала NEW8210: оплата школьного буфета по MIFARE-картам с интеграцией во внешний буфетный API.',
      en: 'Built point-of-sale software for the NEW8210 UNIX POS terminal: school-canteen payments via MIFARE cards integrated with an external canteen API.',
    },
    highlights: [
      { ru: 'Работал с периферией терминала через SDK производителя.', en: 'Drove the terminal peripherals through the vendor SDK.' },
      { ru: 'Разработал SSL-клиент для HTTP API.', en: 'Wrote an SSL client for the HTTP API.' },
      { ru: 'Реализовал интерфейс на DirectFB и обработку ввода.', en: 'Implemented a DirectFB UI and keypad input handling.' },
    ],
    skills: ['C', 'UNIX', 'HTTP JSON', 'SSL', 'DirectFB', 'MIFARE', 'POS SDK'],
  },
  {
    period: { ru: 'Июнь 2022 — Февраль 2023', en: 'June 2022 — February 2023' },
    duration: { ru: '9 месяцев', en: '9 months' },
    role: { ru: '.NET-разработчик', en: '.NET developer' },
    company: { ru: 'ООО «Фулсофт»', en: 'Fulsoft LLC' },
    companyHref: 'https://fulsoft.ru',
    focus: { ru: 'Платёжный шлюз', en: 'Payment gateway' },
    summary: {
      ru: 'Разрабатывал платёжный шлюз с унифицированным API для предпроцессинга платежей, биллинга и интеграций с эквайрингом и отраслевыми системами.',
      en: 'Built a payment gateway with a unified API for payment pre-processing, billing and integrations with acquirers and industry systems.',
    },
    highlights: [
      { ru: 'Интегрировал Тинькофф, Qiwi, ГПБ и биллинг-системы ЖКХ и транспорта.', en: 'Integrated Tinkoff, Qiwi, Gazprombank and utility/transport billing systems.' },
      { ru: 'Сервис постпроцессинга платежей на Hangfire по категории услуги.', en: 'Built a Hangfire-based payment post-processing service keyed by service category.' },
    ],
    skills: ['Linux', '.NET 6', 'MediatR', 'Hangfire', 'PostgreSQL', 'EF Core', 'Redis', 'nginx', 'systemd'],
  },
  {
    period: { ru: 'Декабрь 2022 — Январь 2023', en: 'December 2022 — January 2023' },
    duration: { ru: '2 месяца', en: '2 months' },
    role: { ru: 'И.о. тимлида .NET', en: 'Acting .NET team lead' },
    company: { ru: 'Башкирский регистр социальных карт, ОАО', en: 'Bashkir Register of Social Cards' },
    companyHref: 'https://brsc.ru',
    focus: { ru: 'ГИС АИС «Образование»', en: 'State education information system' },
    focusHref: 'https://elschool.ru',
    summary: {
      ru: 'Временно возглавлял команду из 4 .NET-разработчиков на проекте ГИС АИС «Образование» и электронного дневника Elschool.',
      en: 'Temporarily led a team of 4 .NET developers on the state education information system and the Elschool e-diary.',
    },
    highlights: [
      { ru: 'Спроектировал единый SSO-сервис на OAuth2 с обратной совместимостью.', en: 'Designed a unified OAuth2 SSO service with backward compatibility.' },
      { ru: 'Менторил развёртывание Moodle и сервисы «Цифровая школа» и «Портфолио ученика».', en: 'Mentored the Moodle rollout and the “Digital School” and “Student Portfolio” services.' },
      { ru: 'Внедрил CI/CD на nginx, systemd и rsync.', en: 'Set up CI/CD with nginx, systemd and rsync.' },
    ],
    skills: ['.NET 6', 'OAuth2', 'MediatR', 'FluentValidation', 'Linux', 'nginx', 'systemd', 'PostgreSQL', 'CI/CD'],
  },
  {
    period: { ru: 'Январь 2022 — Январь 2023', en: 'January 2022 — January 2023' },
    duration: { ru: '1 год', en: '1 year' },
    role: { ru: 'Самозанятый разработчик', en: 'Self-employed developer' },
    company: { ru: 'Фриланс и собственные проекты', en: 'Freelance & personal projects' },
    companyHref: 'https://www.faforever.com',
    focus: { ru: 'FAForever Launcher', en: 'FAForever Launcher' },
    summary: {
      ru: 'Разрабатывал десктопный лаунчер для игрового сообщества FAForever: real-time сценарии, сетевые интеграции и визуализация данных.',
      en: 'Built a desktop launcher for the FAForever gaming community: real-time scenarios, network integrations and data visualization.',
    },
    highlights: [
      { ru: 'Работал с IRC, TCP, REST API и WS Streaming.', en: 'Worked with IRC, TCP, REST API and WS streaming.' },
      { ru: 'Разрабатывал интерфейс и логику на WPF/.NET.', en: 'Built the UI and logic on WPF/.NET.' },
    ],
    skills: ['WPF', '.NET', 'IRC', 'TCP', 'REST API', 'WS Streaming'],
  },
]

export type Project = {
  /** Localized: a mixed "Платёжный шлюз / Payment gateway" string leaked Cyrillic onto /en. */
  title: L
  description: L
  notes?: L[]
  stack: string[]
  links: { label: string; href: string }[]
}

export const projects: Project[] = [
  {
    title: { ru: 'Moonlume VPN', en: 'Moonlume VPN' },
    description: {
      ru: 'Сервис интернет-приватности: безопасное подключение, защита трафика и удобное управление доступом.',
      en: 'An internet-privacy service: secure connectivity, traffic protection and easy access management.',
    },
    stack: ['VPN', 'Privacy', 'Infrastructure', 'Web'],
    links: [{ label: 'moonlumevpn.ru', href: 'https://moonlumevpn.ru' }],
  },
  {
    title: { ru: 'Платёжный шлюз', en: 'Payment gateway' },
    description: {
      ru: 'Промышленный платёжный шлюз с унифицированным API, постпроцессингом оплат и интеграциями с эквайрингом и биллингом.',
      en: 'A production payment gateway with a unified API, payment post-processing and acquirer/billing integrations.',
    },
    notes: [
      { ru: 'Зарегистрирован в реестре отечественного ПО.', en: 'Registered in the national software registry.' },
      { ru: 'Используется в проде на yurtarb.ru для приёма платежей.', en: 'Runs in production on yurtarb.ru to accept payments.' },
    ],
    stack: ['.NET 6', 'Hangfire', 'PostgreSQL', 'Redis'],
    links: [
      { label: 'fulsoft.ru', href: 'https://fulsoft.ru/payment-gateaway.html' },
      { label: 'yurtarb.ru', href: 'https://yurtarb.ru' },
    ],
  },
  {
    title: { ru: 'FAForever Launcher', en: 'FAForever Launcher' },
    description: {
      ru: 'Десктопный лаунчер для игрового сообщества с real-time обменом данными, API-интеграциями и визуализацией.',
      en: 'A desktop launcher for a gaming community with real-time data exchange, API integrations and visualization.',
    },
    stack: ['WPF', '.NET', 'IRC', 'TCP', 'WS Streaming'],
    links: [{ label: 'faforever.com', href: 'https://www.faforever.com' }],
  },
]

export type SocialLink = {
  label: string
  href: string
  type: 'github' | 'telegram' | 'vk' | 'hh' | 'email' | 'phone'
}

export const socials: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/ai-iskuzhin', type: 'github' },
  { label: '@mrx_eternal', href: 'https://t.me/mrx_eternal', type: 'telegram' },
  { label: '@mrx_eternal', href: 'https://vk.ru/mrx_eternal', type: 'vk' },
  { label: '@ebashit_rb', href: 'https://t.me/ebashit_rb', type: 'telegram' },
  { label: 'HH', href: 'https://ufa.hh.ru/resume/77a83487ff0dbf65920039ed1f646d774f4868', type: 'hh' },
  { label: 'aigiz.iskuzhin@yandex.ru', href: 'mailto:aigiz.iskuzhin@yandex.ru', type: 'email' },
]

export const contactEmail = 'aigiz.iskuzhin@yandex.ru'
export const githubUser = 'ai-iskuzhin'

/**
 * Sole-proprietor registration data. Already public in ЕГРИП and printed in the
 * footer. There is no `<meta name="inn">` that any search engine reads; the
 * machine-readable home for these is schema.org — `taxID` for the ИНН (valid on
 * Person, not just Organization) and `identifier`/`PropertyValue` for ОГРНИП and
 * ОКВЭД, which have no native property.
 */
export const legal = {
  form: { ru: 'ИП', en: 'Sole proprietor' } as L,
  inn: '024803896842',
  ogrnip: '326028000044859',
  okved: '62.01',
  okvedLabel: {
    ru: 'Разработка компьютерного программного обеспечения',
    en: 'Computer software development',
  } as L,
  city: { ru: 'Уфа', en: 'Ufa' } as L,
  region: { ru: 'Республика Башкортостан', en: 'Republic of Bashkortostan' } as L,
  country: 'RU',
}

/** A short, human-readable destination for a link (used in tooltips). */
export function prettyHref(href: string): string {
  return href
    .replace(/^mailto:/, '')
    .replace(/^tel:/, '')
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/$/, '')
}
