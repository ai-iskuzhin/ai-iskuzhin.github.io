# Playbook: evaluating a partner program

Generalised from the Yandex analysis, for the next program — Yandex's own
Distribution umbrella also carries Market, Travel, Go and Games referral programs,
and the payment providers behind the SDKs in [src/content/libraries.ts](../../src/content/libraries.ts)
run partner programs of their own.

Work the gates in order. Most programs die at gate 2, and dying there costs an hour
instead of a month.

## Gate 1 — Audience match

> Would this reader want this product *before* they knew you were paid for it?

Not "could they be persuaded". Would they want it. An affiliate link converts when it
shortens a decision the reader had already started making; it fails when it starts one.

The test that matters: **imagine the offer paid nothing.** Would you still mention it
to this audience? If no, the offer is buying your recommendation and the reader will
eventually notice.

Applied here: a browser banner to developers fails. A payment-provider referral on the
page of an SDK *for that provider* passes cleanly — a developer reading
[yookassanet](../../src/content/libraries.ts) is, by definition, mid-way through
choosing a payment provider.

That last observation is the most valuable thing in this document. The natural
affiliate inventory of this site is **the payment providers its SDKs wrap**, not
anything Yandex sells. That audience is small, but it is exactly, unusually,
commercially aligned — and the referral fees in payments dwarf 600 ₽.

## Gate 2 — Expected value, including the credibility term

```
EV = traffic × CTR × conversion × payout  −  credibility cost
```

The first four terms are easy and usually produce a number in the tens of roubles.
The last term has no formula and dominates.

Ask: what is one visitor worth in this site's *primary* funnel? For a portfolio whose
job is hiring and contracting, a visitor is worth some fraction of a 10⁵–10⁶ ₽
conversion. An affiliate placement that makes 1 in 200 such visitors think "this
person monetises their CV" has to earn a lot to break even. It will not.

**Corollary:** partner links belong on surfaces whose primary funnel is weak or absent
— a deep blog post, a documentation page — and never on the surfaces that carry the
primary funnel: the home page, the header, the global footer.

## Gate 3 — Eligibility traps

Read the terms specifically hunting for **one-way doors**: conditions that can be
satisfied now but never later.

Yandex's B2B program has a live one: you may not join after performing corporate
installs. Others in the wild: "no prior integration", "new customers only", "must not
have an existing account", cookie-window exclusivity, category exclusivity.

When you find one, the decision is not "should I join this program" — it is "should I
preserve the option". Joining is usually free and reversible. Acting is not. **Enrol
early, decide later.** That inverts the natural instinct to defer paperwork, and it is
the correct inversion.

## Gate 4 — Attribution model

Determine, before writing any markup:

- **Link parameter or `Referer` header?** Decides whether `rel="noreferrer"` is safe.
  Getting this wrong produces a link that works, tracks nothing, and fails silently.
- **Attribution window?** A 24-hour cookie and a 90-day cookie are different businesses.
- **Is there a `subid`?** Without one, two placements share one number and you can
  never learn which earns. Insist on it before building a second placement.
- **What is the qualifying event?** Click, install, activation, or sustained use.
  Yandex's six-days-in-two-weeks rule is at the far end of that spectrum and means the
  cash arrives long after the click, on a different device, invisible to your analytics.

That last point deserves its own line: **your analytics can never see the conversion.**
Metrika counts intent; the cabinet counts money; only a `subid` string joins them.

## Gate 5 — Legal and disclosure

For anything aimed at Russian consumers, assume:

- `erid` token from an ОРД, «Реклама» marker, advertiser identification, ЕРИР reporting;
- the 3% levy on income from distributing internet advertising;
- ask whether the vendor's cabinet issues the token or whether you need your own ОРД
  contract — this is the difference between a checkbox and a quarterly filing.

Then ask the question that actually decides it: **is the reporting overhead larger than
the revenue?** For a program paying a few thousand roubles a year, it often is. That is
a complete and sufficient reason to decline, and it is the reason most personal sites
should decline most affiliate programs.

Separately, and outside the law: if the placement sits inside a client relationship
rather than on a public page, disclose it to the client in writing before acting. See
the argument in [compliance.md](compliance.md); it is the section of this analysis with
the highest ratio of consequence to word count.

## Gate 6 — Technical cost in this repo

From [integration.md](integration.md), the constraints that generalise:

- no server → no redirect hop, no cloaking, no dynamic link rewriting;
- a new route costs edits in `routes.ts`, `og.mjs`, and the sitemap — so don't add one;
- blog posts are a **closed block union**, not Markdown; a link needs a schema change;
- every remote asset (QR image, tracking pixel) is a DNS round trip and a privacy leak
  on a site whose value proposition is that it loads instantly.

Budget the schema change honestly. If a program clears gates 1–5 but needs a day of
type surgery to earn 600 ₽/year, it has not actually cleared gate 2.

## Gate 7 — Kill criteria, written down in advance

Before shipping, write the number that ends the experiment:

> If after 3 months the placement has produced fewer than N qualified conversions, it
> is removed.

Without this, a dead affiliate link stays on a page for years, quietly taxing every
visitor's impression of the site, because nobody ever scheduled the moment to look at it.
Set the date. Put it in the post's frontmatter, or in this file.

## Summary card

| Gate | Kills the program if… |
| --- | --- |
| 1. Audience | you wouldn't recommend it unpaid |
| 2. EV | credibility cost exceeds tens of roubles |
| 3. Traps | a one-way door has already closed |
| 4. Attribution | you can't tell which placement earned |
| 5. Legal | filing overhead exceeds the revenue |
| 6. Technical | the schema change costs more than a year of income |
| 7. Kill criteria | you can't name the number that would end it |
