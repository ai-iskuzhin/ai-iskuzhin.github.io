import type { L, Lang } from './content/types'

export function t(value: L, lang: Lang): string {
  return value[lang]
}

export const ui = {
  nav: {
    about: { ru: 'Обо мне', en: 'About' },
    openSource: { ru: 'Open Source', en: 'Open Source' },
    experience: { ru: 'Опыт', en: 'Experience' },
    projects: { ru: 'Проекты', en: 'Projects' },
    blog: { ru: 'Блог', en: 'Blog' },
    contact: { ru: 'Контакты', en: 'Contact' },
  },
  hero: {
    eyebrow: { ru: 'Разработчик IT-продуктов · финтех', en: 'IT product developer · fintech' },
    ctaProjects: { ru: 'Открытый код', en: 'Open source' },
    ctaContact: { ru: 'Связаться', en: 'Get in touch' },
    stats: {
      years: { ru: 'года в проде', en: 'years in production' },
      packages: { ru: 'NuGet-пакетов', en: 'NuGet packages' },
      products: { ru: 'свои продукты', en: 'own products' },
    },
  },
  sections: {
    about: { ru: 'Обо мне', en: 'About me' },
    openSource: { ru: 'Open-source .NET SDK', en: 'Open-source .NET SDKs' },
    openSourceLead: {
      ru: 'Библиотеки с минимумом зависимостей под лицензией MIT. Только HttpClient и System.Text.Json, мульти-таргет netstandard2.0 · net8.0 · net10.0.',
      en: 'MIT-licensed libraries that keep dependencies to a minimum. Just HttpClient and System.Text.Json, multi-targeting netstandard2.0 · net8.0 · net10.0.',
    },
    flagship: { ru: 'Флагманский продукт', en: 'Flagship product' },
    flagships: { ru: 'Флагманские продукты', en: 'Flagship products' },
    experience: { ru: 'Опыт работы', en: 'Work experience' },
    projects: { ru: 'Проекты', en: 'Projects' },
    blog: { ru: 'Блог', en: 'Blog' },
    contact: { ru: 'Контакты', en: 'Contact' },
  },
  library: {
    install: { ru: 'Установка', en: 'Installation' },
    quickstart: { ru: 'Быстрый старт', en: 'Quick start' },
    features: { ru: 'Возможности', en: 'Features' },
    methods: { ru: 'Основные методы', en: 'Key methods' },
    targets: { ru: 'Платформы', en: 'Targets' },
    license: { ru: 'Лицензия', en: 'License' },
    viewOnGithub: { ru: 'Открыть на GitHub', en: 'View on GitHub' },
    viewOnNuget: { ru: 'Открыть в NuGet', en: 'View on NuGet' },
    family: { ru: 'Пакеты семейства', en: 'Package family' },
    allLibraries: { ru: 'Все библиотеки', en: 'All libraries' },
    backHome: { ru: 'На главную', en: 'Back home' },
  },
  blogMeta: {
    readingTime: { ru: 'мин чтения', en: 'min read' },
    readMore: { ru: 'Читать', en: 'Read' },
    all: { ru: 'Все статьи', en: 'All posts' },
  },
  contact: {
    heading: { ru: 'Есть проект, вакансия или идея?', en: 'Have a project, role or idea?' },
    body: {
      ru: 'Напишите коротко о задаче, сроках и контексте — я предпочитаю прямую коммуникацию и конкретику.',
      en: 'Drop a short note about the task, timeline and context — I prefer direct, concrete communication.',
    },
    write: { ru: 'Написать', en: 'Email me' },
    call: { ru: 'Позвонить', en: 'Call me' },
    telegram: { ru: 'Telegram', en: 'Telegram' },
    vk: { ru: 'ВКонтакте', en: 'VK' },
    or: { ru: 'или напишите в мессенджер', en: 'or message me' },
  },
  footer: {
    rights: { ru: 'Все права защищены.', en: 'All rights reserved.' },
  },
  notFound: {
    title: { ru: 'Страница не найдена', en: 'Page not found' },
    body: { ru: 'Такой страницы нет или она была перемещена.', en: 'This page does not exist or has moved.' },
    home: { ru: 'На главную', en: 'Go home' },
  },
  langName: { ru: 'RU', en: 'EN' } as L,
  copy: { ru: 'Скопировать', en: 'Copy' },
  copied: { ru: 'Скопировано', en: 'Copied' },
} as const
