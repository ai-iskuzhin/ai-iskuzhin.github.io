import { useState } from 'react'
import type { Lang } from '../content/types'
import { ui, t } from '../i18n'
import { CopyIcon, CheckIcon } from './Icons'

type CodeBlockProps = {
  code: string
  language?: string
  lang: Lang
}

export function CodeBlock({ code, language = 'csharp', lang }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      // clipboard may be unavailable — ignore
    }
  }

  return (
    <div className="code-block">
      <div className="code-block__bar">
        <span className="code-block__lang">{language}</span>
        <button type="button" className="code-block__copy" onClick={copy} aria-label={t(ui.copy, lang)}>
          {copied ? <CheckIcon /> : <CopyIcon />}
          <span>{copied ? t(ui.copied, lang) : t(ui.copy, lang)}</span>
        </button>
      </div>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  )
}
