// Writes one social card per route per language into dist/og/. Runs after the
// SSR bundle exists (it reuses the app's own route + content modules) and before
// scripts/prerender.mjs, which cleans the bundle up.

import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { OG_MAX_BYTES, renderCard } from './og-card.mjs'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const distDir = join(root, 'dist')
const ssrEntry = pathToFileURL(join(root, '.prerender/entry-prerender.js')).href

const { allRoutes, ogImagePath, SITE, libraries, posts, profile } = await import(ssrEntry)

const BRAND = ['#8B5CF6', '#3B82F6']
const site = SITE.baseUrl.replace(/^https?:\/\//, '')

const pick = (value, lang) => (typeof value === 'string' ? value : value[lang])

const COPY = {
  openSource: {
    eyebrow: { ru: 'Open Source', en: 'Open source' },
    title: { ru: 'Открытые .NET SDK', en: 'Open-source .NET SDKs' },
    subtitle: {
      ru: 'Платежи, эквайринг, фискализация и верификация — dependency-light библиотеки под MIT.',
      en: 'Payments, acquiring, fiscalization and verification — dependency-light libraries under MIT.',
    },
  },
  verificahub: {
    eyebrow: { ru: 'Продукт', en: 'Product' },
    subtitle: {
      ru: 'Верификация пользователей: звонки, SMS, голос и мессенджеры — в одном API.',
      en: 'User verification: calls, SMS, voice and social apps — in one API.',
    },
  },
  pir2pir: {
    eyebrow: { ru: 'Продукт', en: 'Product' },
    subtitle: {
      ru: 'Платформа взаимных проверок для Школы 21: платформа сама спросит пиров и откроет чат.',
      en: 'A peer-review platform for School 21: it asks peers for you and opens the chat.',
    },
  },
  blog: {
    eyebrow: { ru: 'Блог', en: 'Blog' },
    title: { ru: 'Заметки о .NET и финтехе', en: 'Notes on .NET and fintech' },
    subtitle: {
      ru: 'Backend-разработка, платёжные интеграции и открытый код.',
      en: 'Backend development, payment integrations and open source.',
    },
  },
}

/** Turn a route into the card's copy. Content comes from the app's own modules. */
function cardFor(route) {
  const lang = route.lang

  switch (route.kind) {
    case 'home':
      return {
        eyebrow: pick(profile.role, lang),
        title: pick(profile.name, lang),
        subtitle: pick(profile.specialty, lang),
        chips: ['.NET', 'C#', 'ASP.NET Core', 'PostgreSQL'],
        accent: BRAND,
      }

    case 'libraries':
      return {
        eyebrow: pick(COPY.openSource.eyebrow, lang),
        title: pick(COPY.openSource.title, lang),
        subtitle: pick(COPY.openSource.subtitle, lang),
        chips: [`${libraries.length} SDK`, 'MIT', 'NuGet', '.NET 10'],
        accent: BRAND,
      }

    case 'library': {
      const library = libraries.find((item) => item.slug === route.slug)
      return {
        eyebrow: pick(library.category, lang),
        title: library.name,
        subtitle: pick(library.tagline, lang),
        chips: [library.language, 'MIT', ...library.targets.slice(0, 2)],
        // Each SDK carries its own accent pair; reuse it so the card matches the page.
        accent: library.accent,
      }
    }

    case 'verificahub':
      return {
        eyebrow: pick(COPY.verificahub.eyebrow, lang),
        title: 'VerificaHub',
        subtitle: pick(COPY.verificahub.subtitle, lang),
        chips: ['API', 'SMS', lang === 'ru' ? 'Звонки' : 'Calls', lang === 'ru' ? 'Голос' : 'Voice'],
        accent: BRAND,
      }

    case 'pir2pir':
      return {
        eyebrow: pick(COPY.pir2pir.eyebrow, lang),
        title: lang === 'ru' ? 'Пир2Пир' : 'Pir2Pir',
        subtitle: pick(COPY.pir2pir.subtitle, lang),
        chips: [lang === 'ru' ? 'Школа 21' : 'School 21', 'Web', 'Telegram', 'MAX'],
        // The product's own red-orange, so the card matches the logo.
        accent: ['#E11D48', '#EA580C'],
      }

    case 'blog':
      return {
        eyebrow: pick(COPY.blog.eyebrow, lang),
        title: pick(COPY.blog.title, lang),
        subtitle: pick(COPY.blog.subtitle, lang),
        chips: [`${posts.length} ${lang === 'ru' ? 'статьи' : 'posts'}`, '.NET', 'Fintech'],
        accent: BRAND,
      }

    case 'post': {
      const post = posts.find((item) => item.slug === route.slug)
      return {
        eyebrow: pick(COPY.blog.eyebrow, lang),
        title: pick(post.title, lang),
        subtitle: pick(post.excerpt, lang),
        chips: [post.date, `${post.readingMinutes} ${lang === 'ru' ? 'мин' : 'min'}`, ...post.tags.slice(0, 2)],
        accent: BRAND,
      }
    }

    default:
      return null
  }
}

// One card per distinct image path (routes and paths map 1:1 today, but dedupe
// so an alias can never render the same file twice).
const seen = new Set()
const oversized = []
let written = 0

for (const route of allRoutes()) {
  const path = ogImagePath(route)
  if (seen.has(path)) continue
  seen.add(path)

  const card = cardFor(route)
  if (!card) continue

  const { data, colors } = await renderCard({ ...card, site })
  if (data.length > OG_MAX_BYTES) oversized.push([path, data.length, colors])

  const file = join(distDir, path.replace(/^\//, ''))
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, data)
  written += 1
}

for (const [path, bytes, colors] of oversized) {
  console.warn(
    `warn: ${path} is ${(bytes / 1024).toFixed(0)} KB at ${colors} colours — over the ${OG_MAX_BYTES / 1024} KB budget; WhatsApp may drop it`,
  )
}

console.log(`Rendered ${written} OG images`)
