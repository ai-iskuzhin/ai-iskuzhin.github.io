export type Lang = 'ru' | 'en'

/** A string available in both site languages. */
export type L = Record<Lang, string>

/** A list of strings available in both site languages. */
export type LList = Record<Lang, string[]>

export type CodeSample = {
  language: 'csharp' | 'bash' | 'http' | 'json'
  code: string
}

export type LibraryMethod = {
  name: string
  desc: L
}

export type Library = {
  slug: string
  name: string
  /** Short kebab descriptor used in URLs / og images. */
  repo: string
  nuget: string
  /** Extra NuGet package ids that belong to the same family. */
  nugetFamily?: string[]
  docsUrl?: string
  docsLabel?: L
  category: L
  /** Path to the SDK logo under /public. */
  icon: string
  tagline: L
  summary: L
  targets: string[]
  license: string
  language: string
  install: string
  quickstart: CodeSample
  features: L[]
  methods?: LibraryMethod[]
  /** Two-tone accent used for the card / hero gradient. */
  accent: [string, string]
  /** simple-icons slug used for the badge logo, when relevant. */
  logo?: string
}
