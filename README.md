# ai-iskuzhin.github.io

Personal site of **Aigiz Iskuzhin** — .NET engineer and open-source SDK author.

🌐 **https://ai-iskuzhin.github.io**

Bilingual (RU / EN) portfolio with dedicated, SEO-optimized pages for each open-source
.NET SDK (YooKassaNet, TBankAcquiringNet, AtolOnlineNet, TelegramGatewayNet, RsqlParserNet),
the VerificaHub product, and a blog.

## Stack

- React 19 + TypeScript + Vite
- Tiny custom router (zero runtime routing deps)
- Build-time static pre-rendering: per-route `<head>` (title, description, canonical,
  hreflang, Open Graph, Twitter, JSON-LD) + `sitemap.xml` + `robots.txt`
- Library README content fetched live from each GitHub repo and rendered with `marked`

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # client build + SSR head build + prerender → dist/
npm run preview  # preview the production build
```

Deployment is automated via GitHub Actions on push to `production` (see
`.github/workflows/deploy-pages.yml`).
