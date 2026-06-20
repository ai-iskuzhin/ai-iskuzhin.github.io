import type { Lang } from '../content/types'
import { ui, t } from '../i18n'
import { getPost, type Block } from '../content/posts'
import { blogPath } from '../routes'
import { Link } from '../router'
import { NotFound } from './NotFound'
import { CodeBlock } from '../components/CodeBlock'
import { ArrowIcon } from '../components/Icons'

function formatDate(date: string, lang: Lang): string {
  const [y, m, d] = date.split('-')
  const months =
    lang === 'ru'
      ? ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
      : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  return lang === 'ru' ? `${Number(d)} ${months[Number(m) - 1]} ${y}` : `${months[Number(m) - 1]} ${Number(d)}, ${y}`
}

function BlockView({ block, lang }: { block: Block; lang: Lang }) {
  switch (block.type) {
    case 'h2':
      return <h2>{t(block.text, lang)}</h2>
    case 'p':
      return <p>{t(block.text, lang)}</p>
    case 'ul':
      return (
        <ul className="bullets">
          {block.items.map((item, index) => (
            <li key={index}>{t(item, lang)}</li>
          ))}
        </ul>
      )
    case 'code':
      return <CodeBlock code={block.code} language={block.language} lang={lang} />
  }
}

export function BlogPost({ lang, slug }: { lang: Lang; slug: string }) {
  const post = getPost(slug)
  if (!post) return <NotFound lang={lang} />

  return (
    <article className="page post-page">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link to={blogPath(lang)}>{t(ui.blogMeta.all, lang)}</Link>
        <span aria-hidden="true">/</span>
        <span>{post.title[lang]}</span>
      </nav>

      <header className="post-page__head">
        <span className="post-card__meta">
          {formatDate(post.date, lang)} · {post.readingMinutes} {t(ui.blogMeta.readingTime, lang)}
        </span>
        <h1>{post.title[lang]}</h1>
        <ul className="tag-list">
          {post.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </header>

      <div className="prose post-page__body">
        {post.body[lang].map((block, index) => (
          <BlockView key={index} block={block} lang={lang} />
        ))}
      </div>

      <div className="library-page__foot">
        <Link to={blogPath(lang)} className="section__cta">
          <ArrowIcon style={{ transform: 'rotate(180deg)' }} />
          {t(ui.blogMeta.all, lang)}
        </Link>
      </div>
    </article>
  )
}
