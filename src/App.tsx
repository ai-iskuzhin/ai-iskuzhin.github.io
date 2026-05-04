import { useEffect, useState } from 'react'
import heroImg from './assets/hero.png'
import './App.css'

type ThemeMode = 'light' | 'dark' | 'system'

const navItems = [
  { href: '#about', label: 'Обо мне' },
  { href: '#experience', label: 'Опыт' },
  { href: '#projects', label: 'Проекты' },
  { href: '#links', label: 'Ссылки' },
  { href: '#contact', label: 'Контакты' },
]

const experience = [
  {
    period: 'Январь 2026 - настоящее время',
    duration: 'сейчас',
    role: 'Инженер-программист',
    company: 'Башкирский регистр социальных карт, ОАО',
    companyHref: 'https://brsc.ru',
    focus: 'Карта жителя РБ',
    summary:
      'Работаю над сервисами и интеграциями проекта «Карта жителя РБ»: развитие прикладной функциональности, поддержка backend-сервисов и участие в сопровождении промышленного контура.',
    highlights: [
      'Развиваю сервисы проекта и участвую в поддержке пользовательских и внутренних сценариев.',
      'Работаю с интеграциями, backend-логикой и инфраструктурными задачами в рамках действующей системы.',
    ],
    skills: ['.NET', 'Backend', 'Интеграции', 'PostgreSQL', 'Linux', 'Git'],
  },
  {
    period: 'Январь 2023 - Декабрь 2024',
    duration: '2 года',
    role: 'Ведущий разработчик .NET',
    company: 'Башкирский регистр социальных карт, ОАО',
    companyHref: 'https://brsc.ru',
    focus: 'Социальная карта Башкортостана',
    summary:
      'Отвечал за развитие сервисов проекта «Социальная карта Башкортостана»: поддерживал legacy-контур, проектировал новые интеграции, развивал backend на .NET 5/6 и участвовал в инфраструктурной модернизации.',
    highlights: [
      'Спроектировал и реализовал сервис интеграции с банком Совкомбанк.',
      'Участвовал в переходе от монолита к распределенному монолиту и сервисной архитектуре.',
      'Автоматизировал бизнес-процессы и внедрял CI/CD для стабильного развертывания на разных средах.',
      'Участвовал в миграциях MS SQL -> PostgreSQL и Windows Server/IIS -> Linux/systemd.',
      'Проектировал внутренние контракты и коммуникацию между сервисами через gRPC и HTTP.',
    ],
    skills: [
      'jQuery',
      'ASP.NET MVC',
      '.NET Framework',
      '.NET 5/6',
      'MSSQL',
      'PostgreSQL',
      'IIS',
      'Linux',
      'YARP',
      'nginx',
      'Redis',
      'gRPC',
    ],
  },
  {
    period: 'Август 2024 - Октябрь 2024',
    duration: '3 месяца',
    role: 'C-разработчик',
    company: 'Башкирский регистр социальных карт, ОАО',
    companyHref: 'https://brsc.ru',
    focus: 'UNIX POS-терминалы',
    summary:
      'Разработал кассовое ПО для UNIX POS-терминала NEW8210: сценарий оплаты школьного буфета по MIFARE-картам с интеграцией во внешний буфетный API.',
    highlights: [
      'Работал с периферией терминала через SDK производителя.',
      'Разработал SSL-клиент для взаимодействия с HTTP API.',
      'Реализовал интерфейс на DirectFB и обработку ввода с клавиатуры терминала.',
    ],
    skills: ['C', 'UNIX', 'HTTP JSON', 'SSL', 'DirectFB', 'MIFARE', 'POS SDK'],
  },
  {
    period: 'Июнь 2022 - Февраль 2023',
    duration: '9 месяцев',
    role: '.NET-разработчик',
    company: 'ООО Фулсофт',
    companyHref: 'https://fulsoft.ru',
    focus: 'Payment Gateway',
    summary:
      'Разрабатывал платежный шлюз с унифицированным API для предпроцессинга платежей, биллинга и интеграций с эквайрингом и отраслевыми системами.',
    highlights: [
      'Интегрировал Тинькофф, Qiwi, ГПБ и биллинг-системы ЖКХ, транспорта и других категорий.',
      'Разработал сервис постпроцессинга платежей на Hangfire с обработкой результата оплаты по категории услуги.',
    ],
    skills: ['Linux', '.NET 6', 'MediatR', 'Hangfire', 'PostgreSQL', 'EF Core', 'Redis', 'nginx', 'systemd'],
  },
  {
    period: 'Декабрь 2022 - Январь 2023',
    duration: '2 месяца',
    role: 'Ведущий разработчик .NET',
    company: 'Башкирский регистр социальных карт, ОАО',
    companyHref: 'https://brsc.ru',
    focus: 'ГИС АИС «Образование»',
    focusHref: 'https://elschool.ru',
    summary:
      'Временно исполнял обязанности тимлида команды из 4 .NET-разработчиков на проекте ГИС АИС «Образование» и электронного дневника Elschool.',
    highlights: [
      'Спроектировал и разработал единый сервис авторизации SSO по OAuth2 с обратной совместимостью со старыми системами.',
      'Менторил развертывание Moodle и разработку сервисов «Башкирская цифровая школа», «Портфолио ученика» и интеграции портфолио.',
      'Внедрил CI/CD с использованием nginx, systemd и rsync для развертывания сервисов в рамках одного домена.',
      'Внедрял MediatR и FluentValidation в процессы разработки.',
    ],
    skills: ['.NET 6', 'OAuth2', 'MediatR', 'FluentValidation', 'Linux', 'nginx', 'systemd', 'PostgreSQL', 'CI/CD'],
  },
  {
    period: 'Апрель 2022 - Январь 2023',
    duration: '10 месяцев',
    role: 'Программист .NET',
    company: 'Башкирский регистр социальных карт, ОАО',
    companyHref: 'https://brsc.ru',
    focus: 'Карта жителя «Алга»',
    summary:
      'Сопровождал системы проекта «Социальная карта Башкортостана» и карты жителя «Алга»: анализировал доработки, писал код, тестировал, документировал, готовил отчеты и участвовал в развертывании.',
    highlights: [
      'Участвовал в полном цикле разработки проекта пополнения Единого социального проездного билета.',
      'Разработал Windows Forms-плагин для интеграции пополнения ЕСПБ в модульной платформе ЕАС Почты России.',
      'Участвовал в миграции сервиса WCF на .NET 6.',
    ],
    skills: ['ASP.NET MVC 3', '.NET Framework 4.5', 'jQuery', 'Razor', 'MS SQL Server', 'IIS', 'SOAP', 'WCF', 'Git'],
  },
  {
    period: 'Январь 2022 - Январь 2023',
    duration: '1 год',
    role: 'Самозанятый / self-employed разработчик',
    company: 'Фриланс и собственные проекты',
    companyHref: 'https://www.faforever.com',
    focus: 'FAForever Launcher',
    summary:
      'Разрабатывал десктопный лаунчер для игрового сообщества FAForever: клиентские сценарии в реальном времени, сетевые интеграции, визуализация данных и удобный desktop UX.',
    highlights: [
      'Работал с IRC, TCP, REST API и WS Streaming для клиентских сценариев в реальном времени.',
      'Разрабатывал интерфейс и логику десктопного приложения на WPF/.NET.',
    ],
    skills: ['WPF', '.NET', 'IRC', 'TCP', 'API', 'WS Streaming', 'Data visualization'],
  },
]

const projects = [
  {
    title: 'Moonlume VPN',
    description:
      'Проект интернет-приватности: VPN-сервис для безопасного подключения, защиты трафика и удобного управления доступом.',
    stack: ['VPN', 'Privacy', 'Infrastructure', 'Web'],
    links: [{ label: 'moonlumevpn.ru', href: 'https://moonlumevpn.ru' }],
  },
  {
    title: 'AI Personal Website',
    description:
      'Персональный сайт-портфолио для презентации опыта, проектов, профессиональных ссылок и контактов.',
    stack: ['React', 'TypeScript', 'GitHub Pages'],
    links: [{ label: 'GitHub', href: 'https://github.com/ai-iskuzhin' }],
  },
  {
    title: 'Платежный шлюз',
    description:
      'Промышленный платежный шлюз с унифицированным API, постпроцессингом оплат и интеграциями с эквайрингом и биллинг-системами.',
    notes: [
      'Зарегистрирован в реестре отечественного ПО / ИТ-проектов.',
      'Используется в промышленном контуре yurtarb.ru для приема платежей.',
    ],
    stack: ['.NET 6', 'Hangfire', 'PostgreSQL', 'Redis'],
    links: [
      { label: 'Страница продукта', href: 'https://fulsoft.ru/payment-gateaway.html' },
      { label: 'yurtarb.ru', href: 'https://yurtarb.ru' },
    ],
  },
  {
    title: 'FAForever Launcher',
    description:
      'Десктопный лаунчер для игрового сообщества с real-time обменом данными, API-интеграциями и визуализацией.',
    stack: ['WPF', '.NET', 'IRC', 'TCP', 'WS Streaming'],
    links: [{ label: 'FAForever', href: 'https://www.faforever.com' }],
  },
]

const links = [
  { label: 'GitHub', href: 'https://github.com/ai-iskuzhin', type: 'github' },
  { label: '@mrx_eternal', href: 'https://t.me/mrx_eternal', type: 'telegram' },
  { label: '@mrx_eternal', href: 'https://vk.ru/mrx_eternal', type: 'vk' },
  { label: 'Канал @ebashit_rb', href: 'https://vk.ru/ebashit_rb', type: 'vk' },
  { label: 'Канал @ebashit_rb', href: 'https://t.me/ebashit_rb', type: 'telegram' },
  {
    label: 'Резюме на HH',
    href: 'https://ufa.hh.ru/resume/77a83487ff0dbf65920039ed1f646d774f4868',
    type: 'hh',
  },
  { label: 'Email', href: 'mailto:hello@example.com' },
  { label: 'Телефон', href: 'tel:+79279383562' },
]

const themeModes: Array<{ label: string; mode: ThemeMode }> = [
  { label: 'Светлая', mode: 'light' },
  { label: 'Темная', mode: 'dark' },
  { label: 'Системная', mode: 'system' },
]

const shortMonthNames: Record<string, string> = {
  Апрель: '04',
  Август: '08',
  Декабрь: '12',
  Июнь: '06',
  Октябрь: '10',
  Февраль: '02',
  Январь: '01',
}

function formatShortPeriod(period: string) {
  return Object.entries(shortMonthNames).reduce(
    (result, [month, value]) => result.replaceAll(month, value),
    period.replace('настоящее время', 'live'),
  )
}

function GitHubIcon() {
  return (
    <svg
      className="github-icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  )
}

function TelegramIcon() {
  return (
    <svg
      className="telegram-icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="#26a5e4"
      aria-hidden="true"
    >
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  )
}

function VkIcon() {
  return (
    <svg
      className="vk-icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M0 23.04C0 12.1788 0 6.74826 3.37413 3.37413C6.74826 0 12.1788 0 23.04 0H24.96C35.8212 0 41.2517 0 44.6259 3.37413C48 6.74826 48 12.1788 48 23.04V24.96C48 35.8212 48 41.2517 44.6259 44.6259C41.2517 48 35.8212 48 24.96 48H23.04C12.1788 48 6.74826 48 3.37413 44.6259C0 41.2517 0 35.8212 0 24.96V23.04Z"
        fill="#0077FF"
      />
      <path
        d="M25.54 34.5801C14.6 34.5801 8.3601 27.0801 8.1001 14.6001H13.5801C13.7601 23.7601 17.8 27.6401 21 28.4401V14.6001H26.1602V22.5001C29.3202 22.1601 32.6398 18.5601 33.7598 14.6001H38.9199C38.0599 19.4801 34.4599 23.0801 31.8999 24.5601C34.4599 25.7601 38.5601 28.9001 40.1201 34.5801H34.4399C33.2199 30.7801 30.1802 27.8401 26.1602 27.4401V34.5801H25.54Z"
        fill="white"
      />
    </svg>
  )
}

function HhIcon() {
  return (
    <svg
      className="hh-icon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1000 1000"
      fill="none"
      aria-hidden="true"
    >
      <g>
        <path
          fill="#FF0002"
          d="M500,1000c276.1499634,0,500-223.8500366,500-500S776.1499634,0,500,0S0,223.8500061,0,500S223.8500061,1000,500,1000z"
        />
        <path
          fill="#FFFFFF"
          d="M743.25,426.2499695c-15.125-15.6000061-36.625-24.125-62.875-24.125c-32.625,0-57.6749878,13.2500305-72.1000366,38.0750122V317H532.625v337.5999756h75.6500244V535.9000244c0-27.6499634,5.6749878-45.3750305,14.2000122-55.7749634c8.25-10.4000244,19.8500366-14.4250183,32.375-14.4250183c11.125,0,19.8500366,3.5500183,26,9.9249878c6.1500244,6.625,9.7000122,16.8000183,9.7000122,30.9750061v147.75h75.6500244V491.7000427c0-27.6500244-8.0500488-50.125-22.9249878-65.5000305L743.25,426.2499695z M404.9749756,402.1249695c-32.625,0-57.7000122,13.2500305-72.0999756,38.0750122V317h-75.6500244v337.5999756H332.875V535.9000244c0-27.6499634,5.6499939-45.3750305,14.1749878-55.7749634c8.25-10.4000244,19.8500061-14.4250183,32.3999939-14.4250183c11.1000061,0,19.8500061,3.5500183,25.9999695,9.9249878c6.1250305,6.625,9.6749878,16.8000183,9.6749878,30.9750061v147.75h75.6499634V491.7000427c0-27.6500244-8.0249634-50.125-23.1499939-65.7250061c-14.9000244-15.6000061-36.4250183-23.875-62.6500244-23.875L404.9749756,402.1249695z"
        />
      </g>
    </svg>
  )
}

function LinkIcon({ type }: { type?: string }) {
  if (type === 'github') {
    return <GitHubIcon />
  }

  if (type === 'telegram') {
    return <TelegramIcon />
  }

  if (type === 'vk') {
    return <VkIcon />
  }

  if (type === 'hh') {
    return <HhIcon />
  }

  return null
}

function ThemeIcon({ mode }: { mode: ThemeMode }) {
  if (mode === 'light') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
    )
  }

  if (mode === 'dark') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
        <path d="M21 12.79A8.5 8.5 0 1 1 11.21 3 6.5 6.5 0 0 0 21 12.79z" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4" />
    </svg>
  )
}

function App() {
  const [activeSection, setActiveSection] = useState(navItems[0].href)
  const [activeExperienceIndex, setActiveExperienceIndex] = useState(0)
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    const storedTheme = localStorage.getItem('theme-mode')

    if (storedTheme === 'light' || storedTheme === 'dark' || storedTheme === 'system') {
      return storedTheme
    }

    return 'system'
  })

  useEffect(() => {
    if (themeMode === 'system') {
      document.documentElement.removeAttribute('data-theme')
      localStorage.setItem('theme-mode', themeMode)
      return
    }

    document.documentElement.dataset.theme = themeMode
    localStorage.setItem('theme-mode', themeMode)
  }, [themeMode])

  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((section): section is HTMLElement => section !== null)

    let frame = 0

    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + Math.min(220, window.innerHeight * 0.38)
      const currentSection = sections.reduce((current, section) => {
        const sectionTop = section.getBoundingClientRect().top + window.scrollY

        if (sectionTop <= scrollPosition) {
          return section
        }

        return current
      }, sections[0])

      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        setActiveSection(`#${sections[sections.length - 1].id}`)
        return
      }

      setActiveSection(`#${currentSection.id}`)
    }

    const handleScroll = () => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(updateActiveSection)
    }

    updateActiveSection()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>('[data-experience-index]'))

    let frame = 0

    const updateActiveExperience = () => {
      const scrollPosition = window.scrollY + Math.min(260, window.innerHeight * 0.42)
      const currentItem = items.reduce((current, item) => {
        const itemTop = item.getBoundingClientRect().top + window.scrollY

        if (itemTop <= scrollPosition) {
          return item
        }

        return current
      }, items[0])

      const index = currentItem?.getAttribute('data-experience-index')

      if (index !== undefined && index !== null) {
        setActiveExperienceIndex(Number(index))
      }
    }

    const handleScroll = () => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(updateActiveExperience)
    }

    updateActiveExperience()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  return (
    <main className="site-shell">
      <aside className="intro-panel" aria-label="Краткая информация">
        <div className="profile-hero">
          <img className="profile-photo" src="/me.jpg" alt="Айгиз Искужин" />

          <div className="theme-switcher" aria-label="Цветовая тема">
            {themeModes.map((item) => (
              <button
                type="button"
                className={themeMode === item.mode ? 'active' : undefined}
                key={item.mode}
                onClick={() => setThemeMode(item.mode)}
                aria-label={`${item.label} тема`}
                aria-pressed={themeMode === item.mode}
                title={`${item.label} тема`}
              >
                <ThemeIcon mode={item.mode} />
              </button>
            ))}
          </div>

          <div className="intro-copy">
            <p className="eyebrow">Персональное портфолио</p>
            <h3 id="top">Айгиз Искужин</h3>
            <h4>.NET-разработчик с 4 годами опыта, включая продуктовую разработку и self-employment.</h4>
          </div>
        </div>
        <div className="intro-description">
            <p>
              Разрабатываю и сопровождаю веб-сервисы, платежные интеграции,
              внутренние API и инфраструктуру развертывания. Работал с legacy
              системами, сервисной архитектурой, Linux, CI/CD и промышленными
              интеграциями.
            </p>
        </div>

        <nav className="section-nav" aria-label="Разделы">
          {navItems.map((item) => (
            <div className="nav-group" key={item.href}>
              <a
                className={activeSection === item.href ? 'active' : undefined}
                href={item.href}
                onClick={() => setActiveSection(item.href)}
                aria-current={activeSection === item.href ? 'true' : undefined}
              >
                <span />
                {item.label}
              </a>
              {item.href === '#projects' && activeSection === '#projects' ? (
                <div className="nested-nav" aria-label="Список проектов">
                  {projects.map((project, index) => (
                    <a href={`#project-${index}`} key={project.title}>
                      <strong>{project.title}</strong>
                    </a>
                  ))}
                </div>
              ) : null}
              {item.href === '#experience' && activeSection === '#experience' ? (
                <div className="nested-nav" aria-label="Список опыта">
                  {experience.map((entry, index) => (
                    <a
                      className={activeExperienceIndex === index ? 'active' : undefined}
                      href={`#experience-${index}`}
                      key={`${entry.period}-${entry.role}`}
                    >
                      <strong>{entry.focus}</strong>
                      <small>
                        {formatShortPeriod(entry.period)} · {entry.company}
                      </small>
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </nav>

        <div className="social-row" aria-label="Внешние ссылки">
          {links.slice(0, 3).map((link) => (
            <a
              className="icon-link"
              href={link.href}
              key={link.label}
              target="_blank"
              rel="noreferrer"
              aria-label={link.label}
            >
              <LinkIcon type={link.type} />
              <span>{link.label}</span>
            </a>
          ))}
        </div>
      </aside>

      <section className="content-panel">
        <section className="hero-card" aria-label="Ключевой профиль">
          <div>
            <p className="eyebrow">Опыт работы: 4 года</p>
            <p>
              Основной фокус: .NET backend, интеграции, платежные сервисы,
              инфраструктура, интернет-приватность и надежная доставка изменений через CI/CD.
            </p>
          </div>
          <img src={heroImg} alt="" />
        </section>

        <section className="content-section" id="about">
          <p className="section-kicker">Обо мне</p>
          <div className="section-body">
            <p>
              Я занимаюсь разработкой прикладных систем, где важны надежность,
              понятная архитектура и аккуратная интеграция с внешними сервисами.
              Есть опыт поддержки старых систем, постепенной миграции на современный
              стек и внедрения процессов, которые ускоряют доставку изменений.
            </p>
            <p>
              Сильнее всего мне интересны backend-разработка, платежные и социальные
              сервисы, инфраструктура развертывания, автоматизация бизнес-процессов
              и практичные инструменты для командной разработки.
            </p>
          </div>
        </section>

        <section className="content-section" id="experience">
          <p className="section-kicker">Опыт работы</p>
          <div className="timeline">
            {experience.map((item, index) => (
              <article
                className={`timeline-item${activeExperienceIndex === index ? ' active' : ''}`}
                data-experience-index={index}
                id={`experience-${index}`}
                key={`${item.period}-${item.role}`}
              >
                <div>
                  <div className="role-heading">
                    <div>
                      <p className="project-label">
                        {item.focusHref ? (
                          <a href={item.focusHref} target="_blank" rel="noreferrer">
                            {item.focus}
                          </a>
                        ) : (
                          item.focus
                        )}
                      </p>
                      <h3>
                        {item.role}{' '}
                        <span>
                          <a href={item.companyHref} target="_blank" rel="noreferrer">
                            {item.company}
                          </a>
                        </span>
                      </h3>
                      <p className="role-period">
                        <span>{item.period}</span>
                        <span>{item.duration}</span>
                      </p>
                    </div>
                  </div>
                  <p>{item.summary}</p>
                  <ul className="highlight-list">
                    {item.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                  <ul className="tag-list" aria-label={`${item.role} skills`}>
                    {item.skills.map((skill) => (
                      <li key={skill}>{skill}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section" id="projects">
          <p className="section-kicker">Проекты</p>
          <div className="project-list">
            {projects.map((project, index) => (
              <article className="project-card" id={`project-${index}`} key={project.title}>
                <div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  {project.notes ? (
                    <ul className="project-notes">
                      {project.notes.map((note) => (
                        <li key={note}>{note}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
                <ul className="tag-list">
                  {project.stack.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className="project-links">
                  {project.links.map((link) => (
                    <a href={link.href} key={link.href} target="_blank" rel="noreferrer">
                      {link.label}
                      <span aria-hidden="true">-&gt;</span>
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section" id="links">
          <p className="section-kicker">Ссылки</p>
          <div className="link-grid">
            {links.map((link) => (
              <a href={link.href} key={link.label} target="_blank" rel="noreferrer">
                <span>
                  <LinkIcon type={link.type} />
                  {link.label}
                </span>
                <span aria-hidden="true">-&gt;</span>
              </a>
            ))}
          </div>
        </section>

        <section className="contact-section" id="contact">
          <p className="section-kicker">Контакты</p>
          <h2>Есть проект, вакансия или идея для сотрудничества?</h2>
          <p>
            Напишите коротко о задаче, сроках и контексте. Я предпочитаю прямую
            коммуникацию и конкретные вводные.
          </p>
          <a className="primary-link" href="mailto:hello@example.com">
            Написать
          </a>
        </section>
      </section>
    </main>
  )
}

export default App
