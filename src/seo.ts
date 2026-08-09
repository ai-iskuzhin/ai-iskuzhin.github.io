import type { Lang } from './content/types'
import { getLibrary, libraries } from './content/libraries'
import { getPost } from './content/posts'
import { contactEmail, contactPhone, legal, profile, socials } from './content/profile'
import {
  SITE,
  LANGS,
  type RouteMatch,
  alternateRoute,
  blogPath,
  feedPath,
  homePath,
  librariesPath,
  libraryPath,
  ogImagePath,
  pathForRoute,
} from './routes'

const OG_LOCALE: Record<Lang, string> = { ru: 'ru_RU', en: 'en_US' }
export const HTML_LANG: Record<Lang, string> = { ru: 'ru', en: 'en' }

export type HeadData = {
  lang: string
  title: string
  description: string
  tags: string
}

function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function clamp(value: string, max = 160): string {
  const text = value.replace(/\s+/g, ' ').trim()
  return text.length <= max ? text : `${text.slice(0, max - 1).trimEnd()}…`
}

export function absolute(path: string): string {
  if (path === '/') return `${SITE.baseUrl}/`
  // Page URLs get a trailing slash; file assets (e.g. /me.jpg) must not.
  const isFile = /\.[a-z0-9]+$/i.test(path)
  const suffix = path.endsWith('/') || isFile ? '' : '/'
  return `${SITE.baseUrl}${path}${suffix}`
}

export type Meta = { title: string; description: string; type: 'website' | 'article' | 'profile' }

export function metaFor(route: RouteMatch): Meta {
  const lang = route.lang
  const name = SITE.name[lang]
  switch (route.kind) {
    case 'home':
      return {
        title: `${name} — ${profile.role[lang]}`,
        description: clamp(profile.tagline[lang]),
        type: 'profile',
      }
    case 'libraries': {
      // Name the packages from the source of truth — the list has grown past the
      // five that used to be hardcoded here.
      const names = libraries.map((library) => library.name).join(', ')
      return {
        title: lang === 'ru' ? `Open-source .NET SDK — ${name}` : `Open-source .NET SDKs — ${name}`,
        description: clamp(
          lang === 'ru'
            ? `${libraries.length} открытых .NET SDK для платежей, эквайринга, фискализации и верификации: ${names}.`
            : `${libraries.length} open-source .NET SDKs for payments, acquiring, fiscalization and verification: ${names}.`,
        ),
        type: 'website',
      }
    }
    case 'library': {
      const library = getLibrary(route.slug)
      if (!library) return { title: name, description: '', type: 'website' }
      return {
        title: `${library.name} — ${library.tagline[lang]}`,
        description: clamp(library.summary[lang]),
        type: 'website',
      }
    }
    case 'verificahub':
      return {
        title: lang === 'ru' ? `VerificaHub — верификация пользователей в одном API` : `VerificaHub — user verification in one API`,
        description: clamp(
          lang === 'ru'
            ? 'Платформа верификации пользователей: звонки, SMS, голос, мессенджеры и многое другое — в одном API. Флагманский продукт Айгиза Искужина.'
            : 'A user-verification platform: calls, SMS, voice, social apps and more — in one API. The flagship product by Aigiz Iskuzhin.',
        ),
        type: 'website',
      }
    case 'pir2pir':
      return {
        title: lang === 'ru' ? `Пир2Пир — найти пира для проверки проекта Школы 21` : `Pir2Pir — find a peer to review your School 21 project`,
        description: clamp(
          lang === 'ru'
            ? 'Платформа взаимных проверок для участников Школы 21: назовите проект — платформа сама спросит подходящих пиров и откроет чат при согласии. Продукт Айгиза Искужина на SDK School21Net.'
            : 'A peer-review platform for School 21 students: name a project and it asks suitable peers for you, opening a chat on the first yes. A product by Aigiz Iskuzhin, built on the School21Net SDK.',
        ),
        type: 'website',
      }
    case 'blog':
      return {
        title: lang === 'ru' ? `Блог — ${name}` : `Blog — ${name}`,
        description: clamp(
          lang === 'ru'
            ? 'Заметки о .NET, backend-разработке, платёжных интеграциях и открытом коде.'
            : 'Notes on .NET, backend development, payment integrations and open source.',
        ),
        type: 'website',
      }
    case 'post': {
      const post = getPost(route.slug)
      if (!post) return { title: name, description: '', type: 'article' }
      return { title: `${post.title[lang]} — ${name}`, description: clamp(post.excerpt[lang]), type: 'article' }
    }
    case 'notFound':
      return { title: lang === 'ru' ? `Страница не найдена — ${name}` : `Page not found — ${name}`, description: '', type: 'website' }
  }
}

const PERSON_ID = `${SITE.baseUrl}/#person`
const WEBSITE_ID = `${SITE.baseUrl}/#website`

/** The Person node — the entity every other node points back at. */
function personNode(lang: Lang): object {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: profile.name[lang],
    jobTitle: profile.role[lang],
    description: profile.specialty[lang],
    url: SITE.baseUrl,
    image: absolute('/me.jpg'),
    email: `mailto:${contactEmail}`,
    telephone: contactPhone.tel,
    sameAs: socials.filter((s) => /^https?:/.test(s.href)).map((s) => s.href),
    knowsAbout: ['.NET', 'C#', 'ASP.NET Core', 'PostgreSQL', 'Payments', 'Fintech', 'Backend'],
    address: {
      '@type': 'PostalAddress',
      addressLocality: legal.city[lang],
      addressRegion: legal.region[lang],
      addressCountry: legal.country,
    },
    // schema.org allows taxID on Person, so the ИП needs no separate
    // Organization node. ОГРНИП and ОКВЭД have no native property.
    taxID: legal.inn,
    identifier: [
      { '@type': 'PropertyValue', propertyID: 'OGRNIP', name: 'ОГРНИП', value: legal.ogrnip },
      { '@type': 'PropertyValue', propertyID: 'OKVED', name: 'ОКВЭД', value: legal.okved },
    ],
  }
}

function websiteNode(lang: Lang): object {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: SITE.name[lang],
    url: SITE.baseUrl,
    inLanguage: HTML_LANG[lang],
    publisher: { '@id': PERSON_ID },
    // No potentialAction/SearchAction: Google removed the sitelinks searchbox
    // in 2024, and the site has no search endpoint anyway.
  }
}

function crumbs(items: { name: string; path?: string }[]): object {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      // The final crumb may omit `item`, per Google's breadcrumb spec.
      ...(item.path ? { item: absolute(item.path) } : {}),
    })),
  }
}

function jsonLdFor(route: RouteMatch): object[] {
  const lang = route.lang
  const url = absolute(pathForRoute(route))
  const meta = metaFor(route)
  const home = { name: SITE.name[lang], path: homePath(lang) }
  const graph: object[] = [personNode(lang), websiteNode(lang)]

  const page = (type: string, extra: object = {}) => ({
    '@type': type,
    '@id': `${url}#page`,
    url,
    name: meta.title,
    description: meta.description,
    inLanguage: HTML_LANG[lang],
    isPartOf: { '@id': WEBSITE_ID },
    ...extra,
  })

  switch (route.kind) {
    case 'home':
      graph.push(page('ProfilePage', { mainEntity: { '@id': PERSON_ID } }))
      break

    case 'libraries':
      graph.push(
        page('CollectionPage', { about: { '@id': PERSON_ID } }),
        crumbs([home, { name: 'Open Source' }]),
        {
          '@type': 'ItemList',
          itemListElement: libraries.map((library, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: library.name,
            url: absolute(libraryPath(lang, library.slug)),
          })),
        },
      )
      break

    case 'library': {
      const library = getLibrary(route.slug)
      if (!library) break
      graph.push(
        page('WebPage'),
        crumbs([home, { name: 'Open Source', path: librariesPath(lang) }, { name: library.name }]),
        {
          '@type': 'SoftwareSourceCode',
          '@id': `${url}#software`,
          name: library.name,
          description: library.summary[lang],
          codeRepository: `https://github.com/ai-iskuzhin/${library.repo}`,
          programmingLanguage: library.language,
          runtimePlatform: '.NET',
          license: 'https://opensource.org/licenses/MIT',
          author: { '@id': PERSON_ID },
          url,
        },
      )
      break
    }

    case 'verificahub':
      graph.push(page('WebPage'), crumbs([home, { name: 'VerificaHub' }]), {
        '@type': 'Organization',
        '@id': 'https://verificahub.ru/#organization',
        name: 'VerificaHub',
        url: 'https://verificahub.ru',
        description: meta.description,
        founder: { '@id': PERSON_ID },
      })
      break

    case 'pir2pir':
      graph.push(page('WebPage'), crumbs([home, { name: 'Пир2Пир' }]), {
        '@type': 'WebApplication',
        '@id': 'https://pir2pir.ru/#app',
        name: 'Пир2Пир',
        alternateName: 'Pir2Pir',
        url: 'https://pir2pir.ru',
        applicationCategory: 'EducationalApplication',
        operatingSystem: 'Web, Telegram, MAX',
        inLanguage: ['ru', 'en', 'uz'],
        description: meta.description,
        offers: { '@type': 'Offer', price: 0, priceCurrency: 'RUB' },
        author: { '@id': PERSON_ID },
      })
      break

    case 'blog':
      graph.push(
        {
          '@type': 'Blog',
          '@id': `${url}#blog`,
          url,
          name: meta.title,
          description: meta.description,
          inLanguage: HTML_LANG[lang],
          author: { '@id': PERSON_ID },
          isPartOf: { '@id': WEBSITE_ID },
        },
        crumbs([home, { name: lang === 'ru' ? 'Блог' : 'Blog' }]),
      )
      break

    case 'post': {
      const post = getPost(route.slug)
      if (!post) break
      graph.push(
        {
          '@type': 'BlogPosting',
          '@id': `${url}#post`,
          headline: post.title[lang],
          description: post.excerpt[lang],
          datePublished: post.date,
          dateModified: post.date,
          inLanguage: HTML_LANG[lang],
          keywords: post.tags.join(', '),
          image: absolute(ogImagePath(route)),
          author: { '@id': PERSON_ID },
          publisher: { '@id': PERSON_ID },
          isPartOf: { '@id': WEBSITE_ID },
          mainEntityOfPage: url,
        },
        crumbs([
          home,
          { name: lang === 'ru' ? 'Блог' : 'Blog', path: blogPath(lang) },
          { name: post.title[lang] },
        ]),
      )
      break
    }

    case 'notFound':
      return []
  }

  return [{ '@context': 'https://schema.org', '@graph': graph }]
}

export function buildHead(route: RouteMatch): HeadData {
  const lang = route.lang
  const meta = metaFor(route)
  const canonical = absolute(pathForRoute(route))
  const title = esc(meta.title)
  const description = esc(meta.description)
  const ogImage = absolute(ogImagePath(route))
  const noindex = route.kind === 'notFound'

  const lines: string[] = [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<link rel="canonical" href="${canonical}" />`,
  ]

  // Start the body font before the stylesheet that declares it has been parsed.
  // Only Russian pages paint Cyrillic, and `crossorigin` is required on font
  // preloads even same-origin, or the fetch is made twice.
  const fontSubsets = lang === 'ru' ? ['inter-cyrillic', 'inter-latin'] : ['inter-latin']
  for (const subset of fontSubsets) {
    lines.push(
      `<link rel="preload" href="/fonts/${subset}.woff2" as="font" type="font/woff2" crossorigin />`,
    )
  }

  if (noindex) {
    lines.push(`<meta name="robots" content="noindex, follow" />`)
  } else {
    lines.push(
      `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />`,
    )
    // hreflang alternates
    for (const altLang of LANGS) {
      const alt = absolute(pathForRoute(alternateRoute(route, altLang)))
      lines.push(`<link rel="alternate" hreflang="${altLang}" href="${alt}" />`)
    }
    lines.push(`<link rel="alternate" hreflang="x-default" href="${absolute(pathForRoute(alternateRoute(route, 'ru')))}" />`)
  }

  // The blog and its posts advertise the feed; Googlebot has crawled feeds for
  // discovery since 2009.
  if (route.kind === 'blog' || route.kind === 'post') {
    lines.push(
      `<link rel="alternate" type="application/rss+xml" title="${esc(SITE.name[lang])} — Blog" href="${absolute(feedPath(lang))}" />`,
    )
  }

  const altLocale = OG_LOCALE[lang === 'ru' ? 'en' : 'ru']
  const imageAlt = esc(meta.title)

  // Open Graph
  lines.push(
    `<meta property="og:type" content="${meta.type}" />`,
    `<meta property="og:site_name" content="${esc(SITE.name[lang])}" />`,
    `<meta property="og:locale" content="${OG_LOCALE[lang]}" />`,
    `<meta property="og:locale:alternate" content="${altLocale}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${ogImage}" />`,
    `<meta property="og:image:type" content="image/png" />`,
    `<meta property="og:image:width" content="${SITE.ogImageWidth}" />`,
    `<meta property="og:image:height" content="${SITE.ogImageHeight}" />`,
    `<meta property="og:image:alt" content="${imageAlt}" />`,
  )

  // Twitter
  lines.push(
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${ogImage}" />`,
    `<meta name="twitter:image:alt" content="${imageAlt}" />`,
  )

  // JSON-LD
  for (const block of jsonLdFor(route)) {
    lines.push(`<script type="application/ld+json">${JSON.stringify(block)}</script>`)
  }

  return {
    lang: HTML_LANG[lang],
    title: meta.title,
    description: meta.description,
    tags: lines.join('\n    '),
  }
}
