import type { Lang } from './content/types'
import { getLibrary, libraries } from './content/libraries'
import { getPost } from './content/posts'
import { profile, socials } from './content/profile'
import {
  SITE,
  LANGS,
  type RouteMatch,
  alternateRoute,
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

function jsonLdFor(route: RouteMatch): object[] {
  const lang = route.lang
  const person = {
    '@type': 'Person',
    name: profile.name[lang],
    jobTitle: profile.role[lang],
    url: SITE.baseUrl,
    image: absolute('/me.jpg'),
    sameAs: socials.filter((s) => /^https?:/.test(s.href)).map((s) => s.href),
    knowsAbout: ['.NET', 'C#', 'ASP.NET Core', 'PostgreSQL', 'Payments', 'Fintech', 'Backend'],
  }

  switch (route.kind) {
    case 'home':
      return [
        {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: SITE.name[lang],
          url: SITE.baseUrl,
          inLanguage: HTML_LANG[lang],
          author: { '@type': 'Person', name: profile.name[lang] },
        },
        { '@context': 'https://schema.org', ...person },
      ]
    case 'library': {
      const library = getLibrary(route.slug)
      if (!library) return []
      return [
        {
          '@context': 'https://schema.org',
          '@type': 'SoftwareSourceCode',
          name: library.name,
          description: library.summary[lang],
          codeRepository: `https://github.com/ai-iskuzhin/${library.repo}`,
          programmingLanguage: library.language,
          runtimePlatform: '.NET',
          license: 'https://opensource.org/licenses/MIT',
          author: { '@type': 'Person', name: profile.name[lang], url: SITE.baseUrl },
          url: absolute(pathForRoute(route)),
        },
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: SITE.name[lang], item: absolute(route.lang === 'en' ? '/en' : '/') },
            { '@type': 'ListItem', position: 2, name: 'Open Source', item: absolute(route.lang === 'en' ? '/en/open-source' : '/open-source') },
            { '@type': 'ListItem', position: 3, name: library.name, item: absolute(pathForRoute(route)) },
          ],
        },
      ]
    }
    case 'verificahub':
      return [
        {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'VerificaHub',
          url: 'https://verificahub.ru',
          description: metaFor(route).description,
          founder: { '@type': 'Person', name: profile.name[lang], url: SITE.baseUrl },
        },
      ]
    case 'post': {
      const post = getPost(route.slug)
      if (!post) return []
      return [
        {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title[lang],
          description: post.excerpt[lang],
          datePublished: post.date,
          dateModified: post.date,
          inLanguage: HTML_LANG[lang],
          keywords: post.tags.join(', '),
          author: { '@type': 'Person', name: profile.name[lang], url: SITE.baseUrl },
          mainEntityOfPage: absolute(pathForRoute(route)),
        },
      ]
    }
    default:
      return []
  }
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

  const altLocale = OG_LOCALE[lang === 'ru' ? 'en' : 'ru']
  const imageAlt = esc(SITE.name[lang])

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
