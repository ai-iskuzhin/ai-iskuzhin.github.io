import type { Lang } from '../content/types'
import { ui, t } from '../i18n'
import { posts } from '../content/posts'
import { postPath } from '../routes'
import { Link } from '../router'
import { ArrowIcon } from '../components/Icons'

function formatDate(date: string, lang: Lang): string {
  const [y, m, d] = date.split('-')
  const months =
    lang === 'ru'
      ? ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек']
      : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return lang === 'ru' ? `${Number(d)} ${months[Number(m) - 1]} ${y}` : `${months[Number(m) - 1]} ${Number(d)}, ${y}`
}

export function Blog({ lang }: { lang: Lang }) {
  return (
    <div className="page">
      <header className="page-hero">
        <p className="eyebrow">{t(ui.sections.blog, lang)}</p>
        <h1>{t(ui.sections.blog, lang)}</h1>
        <p className="page-hero__lead">
          {t(
            {
              ru: 'Заметки о .NET, backend-разработке, платёжных интеграциях и открытом коде.',
              en: 'Notes on .NET, backend development, payment integrations and open source.',
            },
            lang,
          )}
        </p>
      </header>

      <div className="post-list post-list--page">
        {posts.map((post) => (
          <Link to={postPath(lang, post.slug)} className="post-card" key={post.slug}>
            <span className="post-card__meta">
              {formatDate(post.date, lang)} · {post.readingMinutes} {t(ui.blogMeta.readingTime, lang)}
            </span>
            <h2>{post.title[lang]}</h2>
            <p>{post.excerpt[lang]}</p>
            <ul className="tag-list">
              {post.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
            <span className="post-card__more">
              {t(ui.blogMeta.readMore, lang)}
              <ArrowIcon />
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
