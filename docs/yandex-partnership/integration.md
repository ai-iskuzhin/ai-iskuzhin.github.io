# Integrating a partner link into this codebase

How a referral link would actually ship here, given that this is a statically
prerendered React site on GitHub Pages with no server. Written so it generalises to
any partner program, not just Yandex's.

Read [fit.md](fit.md) first: the conclusion there is that exactly one placement is
worth building — a link inside a Russian blog post. The rest of this document exists
so that when you build it, you don't quietly break the prerender, the sitemap, or
the SEO work in [docs/ya-ru/](../ya-ru/).

## The constraint that shapes everything

There is no server. `npm run build` renders every route in `allRoutes()` to static
HTML ([scripts/prerender.mjs:54](../../scripts/prerender.mjs#L54)) and generates a
social card per route ([scripts/og.mjs:122](../../scripts/og.mjs#L122)). So:

- **no server-side redirect.** A `/go/yandex-browser` cloaking hop would have to be
  a prerendered HTML page with a client-side redirect. Don't. It's a page Yandex
  will crawl, it looks like cloaking, and it buys nothing a plain link doesn't.
- **adding a route is not free.** A new `RouteMatch` variant means touching
  `pathForRoute`, `ogImagePath`, and `allRoutes()` in [src/routes.ts](../../src/routes.ts),
  plus a card in `scripts/og.mjs`, or the build breaks. `allRoutes()` also feeds
  `sitemap.xml`, so any new route is submitted to Yandex whether you meant it or not.

**Therefore: no new routes.** The link is an anchor inside existing content.

## The blog cannot hold a link yet

This is the finding that reorders the work, so it comes before the markup. Blog posts
are **not Markdown**. A post body is `Record<Lang, Block[]>`, and `Block` is a closed
union ([src/content/posts.ts:3-7](../../src/content/posts.ts#L3-L7)):

```ts
export type Block =
  | { type: 'p'; text: L }
  | { type: 'h2'; text: L }
  | { type: 'ul'; items: L[] }
  | { type: 'code'; language: string; code: string }
```

`BlockView` renders a paragraph as `<p>{t(block.text, lang)}</p>`
([src/pages/BlogPost.tsx:23](../../src/pages/BlogPost.tsx#L23)) — plain text, escaped
by React. There is no inline link support anywhere in the post pipeline. `marked` is
in the dependency tree, but it is used only by
[src/components/ReadmeViewer.tsx:41](../../src/components/ReadmeViewer.tsx#L41) to
render GitHub READMEs, not post bodies.

So the recommended placement from [fit.md](fit.md) — a disclosed referral link inside
a Russian blog post — **requires a schema change before it can exist.** Two options:

**Add a block variant.** A `{ type: 'partnerLink'; … }` block, rendered by a component
that owns the anchor, the `rel` attributes, the «Реклама» marker, and the click goal
in one place. It cannot be misused, because there's nowhere else to put a partner
link. This is the right shape for exactly one kind of link.

**Add general inline-link support** to `p` blocks. More flexible, more work, and it
puts the burden of remembering `rel="nofollow sponsored"` on whoever authors the next
post. Worth doing eventually for ordinary editorial links; wrong to do *first*, and
under time pressure, for a paid link.

Take the first. The narrow type is a feature: a compliance requirement encoded in the
type system is a compliance requirement that can't be forgotten in a rush.

## The anchor

What that component renders.

```tsx
<a
  href="https://partner.browser.yandex.ru/…?ref=…&erid=…"
  target="_blank"
  rel="nofollow sponsored noopener"
>
  Яндекс Браузер для организаций
</a>
```

Four decisions in that markup:

**Use a plain `<a>`, not `Link`.** [src/router.tsx:72](../../src/router.tsx#L72)
short-circuits on non-internal hrefs, so `Link` would work — but it renders through
the router's click handler for no reason and reads as internal navigation to the next
person editing the file.

**`rel="nofollow sponsored"`.** Yandex honours `nofollow`; Google prefers `sponsored`
and treats it as a `nofollow` variant. Include both. Omitting them on a paid link is
the kind of thing that costs a small site its search standing, and this site is in
the middle of trying to earn quick links.

**`noopener`, but think before adding `noreferrer`.** `noreferrer` strips the
`Referer` header. If the program attributes conversions by referer rather than by
link parameter, `noreferrer` silently zeroes your earnings — the link works, nothing
is ever attributed, and you find out a month later. Yandex's model appears to be
parameter-based, which would make `noreferrer` safe, but this is on the unverified
list in [programs.md](programs.md). **Ask before adding it.** `noopener` alone is
enough for the security concern.

**Never strip the query string.** The `erid` token and the referral id both live
there. Nothing in this codebase rewrites outbound hrefs today; keep it that way.

## Measuring it

Yandex.Metrika is already installed with `trackLinks: true`
([index.html:66](../../index.html#L66)), so outbound clicks appear in Webvisor. That
is not the same as a goal you can count, and Metrika cannot see the conversion —
the install happens on Yandex's side, weeks later, on a different device.

Two halves, and they only meet in the partner cabinet:

**Your half.** Add a goal to [src/analytics.ts](../../src/analytics.ts), which
already owns the `ym` global and the counter id:

```ts
/** Outbound click on a partner link. The conversion itself is invisible to us —
 *  it happens in the partner's cabinet, days later. This counts intent only. */
export function trackPartnerClick(program: string, placement: string): void {
  if (typeof window === 'undefined' || typeof window.ym !== 'function') return
  window.ym(YM_ID, 'reachGoal', 'partner_click', { program, placement })
}
```

**Their half.** If the program exposes a `subid`-style parameter, give every
placement a distinct value (`subid=blog-gpo-msi`). That is the only way to learn
which placement earns, because the cabinet reports conversions and Metrika reports
clicks and nothing joins them but that string. Whether Distribution has such a
parameter is unverified — check the cabinet.

Without a subid, one link across two placements yields one undifferentiated number,
and you will never know which one worked. With a single placement, as recommended,
this is moot — but the moment there's a second, it isn't.

## Disclosure markup

The «Реклама» marker and advertiser identification from [compliance.md](compliance.md)
render inside that new block component:

- add strings to [src/i18n.ts](../../src/i18n.ts) under a new `ui.ad` key;
- the marker names **the advertiser** (ООО «Яндекс», ИНН …), not the ИП. The footer's
  ИП block at [src/components/Footer.tsx:55](../../src/components/Footer.tsx#L55)
  identifies the publisher and does not satisfy this.

Language gating comes free: `post.body` is keyed by language, so a `partnerLink`
block placed only in `body.ru` never renders on `/en`. No `lang === 'ru'` conditional
is needed, and none should be added — putting the block in `body.en` would be the bug,
and the absence of a conditional makes that visible in the content file rather than
buried in a component.

## QR codes

The B2C program offers a QR code, and offline placement is its natural home — not
this site. If a QR ever does ship here:

**Generate the SVG at build time** in `scripts/`, alongside `og.mjs`. Do not call an
external QR service at render time. The site currently loads exactly one remote
image, the profile-views badge at [src/components/Footer.tsx:46](../../src/components/Footer.tsx#L46),
and each additional third-party asset costs a DNS round trip, a privacy leak, and a
point of failure on a page whose entire value proposition is that it loads instantly.

## SEO guardrails

From [docs/ya-ru/plan-deystviy.md](../ya-ru/plan-deystviy.md), which is trying to get
Yandex to form quick links for a site with two real pages in its menu:

- **no partner entry in the header.** Menu slots are the scarce resource that plan is
  spending on VerificaHub.
- **no `/partners/` page.** A page whose purpose is to hold outbound links is a
  doorway page. If a partner page ever earns its place, it will be because it has
  content someone searched for.
- **`nofollow` every partner link**, as above.
- **`noindex` is not the answer.** The blog post carrying the link should absolutely
  be indexed — that's the entire point. Today `noindex` is emitted only for
  `notFound` ([src/seo.ts:303](../../src/seo.ts#L303)) and there's no reason to extend it.

## Checklist before shipping a partner link

```
[ ] Placement is a Russian-language blog post, in context      (fit.md)
[ ] partnerLink Block variant added; anchor + rel + marker live only there
[ ] rel="nofollow sponsored noopener"
[ ] noreferrer decision made, based on the program's attribution model
[ ] erid token present in href, query string intact            (compliance.md)
[ ] «Реклама» marker rendered, naming the advertiser (ООО «Яндекс»)
[ ] block present in body.ru only — never body.en
[ ] subid set per placement, if the program supports it
[ ] trackPartnerClick goal fires
[ ] no new route, no sitemap entry, no header item
[ ] npm run build passes; grep dist/ for the link and the rel attributes
```

Last line matters: after building, confirm the attributes survived into the static
HTML rather than assuming, because a rel attribute lost in the Markdown pipeline
fails silently and looks exactly like a working link.
