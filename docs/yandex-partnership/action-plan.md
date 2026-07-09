# Action plan

What to do, in what order, and where the decision gates are. Ordered by
irreversibility: the cheap, reversible things first, the one-way doors flagged
explicitly.

> Nothing here has been applied. This is a plan, not a changelog.

## Stage 0 — Preserve the option (do this first, this week)

The B2B program's terms:

> Participation is only possible if you did not perform corporate browser
> installations before joining the program.

Enrolling is free, reversible, and takes an evening. Performing a corporate install
before enrolling is **permanent and disqualifying**. These two facts are not
symmetric, and the asymmetry decides the ordering of the entire plan.

1. Register in Яндекс Дистрибуция with the Yandex ID.
2. Enrol in **«Яндекс Браузер для организаций»**, as ИП. Pass moderation.
3. Read the actual contract and the Политика дистрибуции — the landing page is
   explicitly not an offer ([programs.md](programs.md)).
4. Do **not** enrol in the B2C program yet. There's no deadline pressure there and no
   one-way door; see [fit.md](fit.md).

This costs an evening and buys an option worth 500 ₽ per client machine, indefinitely.
Do it before the next engagement that touches a client's fleet, not after.

## Stage 1 — Answer the five questions

None of this needs code. All of it gates whether any code is worth writing. The
questions are listed in full at the end of [compliance.md](compliance.md).

| # | Question | Ask |
| --- | --- | --- |
| 1 | Does the cabinet issue `erid`, or do you need your own ОРД? | Yandex support |
| 2 | Is referral income "ad distribution revenue" for the 3% levy? | Accountant |
| 3 | Is a referral install under a client contract advertising at all? | Lawyer |
| 4 | Does the ИП's ОКВЭД cover this revenue? | Accountant |
| 5 | Link-parameter or `Referer` attribution? Is there a `subid`? | Cabinet / support |

**Question 3 is the fork.** If a client-contract install is a service rendered rather
than advertising distributed, then the whole erid/ЕРИР/3% apparatus applies only to
the *website* placement, and the client-side business — which is where nearly all the
money is — is simply consulting income. If that's the answer, Stage 3 becomes optional
and probably isn't worth doing.

Question 5 has a silent-failure mode: if attribution is by `Referer` and you ship
`rel="noreferrer"`, the link works, nothing is ever attributed, and you discover it a
month later with an empty cabinet.

## Stage 2 — The client-side business (where the revenue is)

Independent of the website. Gated only on Stage 0 and question 3.

For each client engagement that involves configuring workstations:

1. **Disclose in writing, before installing.** In the engagement scope: that Yandex
   pays a per-machine referral fee, how much, and that the client may decline and have
   the browser installed anyway.
2. Install only where the organisation independently wants it. If the fee is what's
   making the recommendation, don't make it.
3. Register the organisation (name, ИНН, machine count) as the program requires.
4. Expect payment only for machines actually used ≥6 days in the first 2 weeks. Don't
   invoice hope.

A twenty-machine office is 10 000 ₽. Two or three engagements a year is real money for
an evening of setup, and it is entirely orthogonal to the website.

The disclosure step is not optional and not a formality. The organisation registers its
own ИНН with Yandex, so the arrangement is already in the client's records. They will
find out. The only variable is whether they find out from you.

## Stage 3 — The article (optional, gated on Stage 1)

Only if question 3 comes back "yes, the website placement is advertising, and here is
how to label it" *and* the filing overhead is acceptable.

Write **«Яндекс Браузер для организаций: раскатка в офисе через GPO и MSI»** — real
deployment mechanics, policy templates, what breaks, what the licence permits. One
disclosed referral link where a reader who has just decided to deploy would want it.

Why this and not a banner is argued in [fit.md](fit.md). Briefly: it attracts the
sysadmin the program pays for instead of interrupting the recruiter the portfolio is
for; it's a portfolio asset on its own merits; and it gives
[docs/ya-ru/plan-deystviy.md](../ya-ru/plan-deystviy.md) the second blog article that
its Stage 4 says the site needs.

Implementation, from [integration.md](integration.md):

1. Add a `partnerLink` variant to `Block` in [src/content/posts.ts](../../src/content/posts.ts).
   A post body is a closed union today and **cannot contain a link at all** — this is
   the blocking technical fact.
2. Render it through one component owning the anchor, `rel="nofollow sponsored noopener"`,
   the «Реклама» marker naming ООО «Яндекс», and the click goal.
3. Place the block in `body.ru` only. Never `body.en`.
4. Add `trackPartnerClick()` to [src/analytics.ts](../../src/analytics.ts).
5. `npm run build`, then grep `dist/` to confirm the `rel` attributes and the `erid`
   query parameter survived into the static HTML.

No new route. No `/partners/` page. No header entry. Reasons in
[integration.md](integration.md#seo-guardrails).

## Stage 4 — Never

For the record, so it isn't relitigated:

- B2C banners on the home page, header, or footer. Argued in [fit.md](fit.md); the
  expected value is negative by two orders of magnitude.
- Anything partner-related on `/en`.
- A `/partners/` or `/recommendations/` page built to hold outbound links.
- A `/go/*` redirect route. No server, and it reads as cloaking.

## Kill criterion

Per [playbook.md](playbook.md), written down before shipping rather than after:

> If, six months after the article ships, it has produced fewer than **3 qualified
> installs**, the referral link is removed from the post. The article stays — it earns
> its place on content alone.

Put that date in the calendar the day the post goes live. Nobody ever schedules the
moment to look at a dead affiliate link, which is why they sit on pages for years.

## What to expect

Most of the money is Stage 2, and Stage 2 has nothing to do with this website. The
website's contribution is one article that might, if the SEO work in
[docs/ya-ru/](../ya-ru/) succeeds, put a referral link in front of a few sysadmins a
month.

The realistic annual figure from the site is a few thousand roubles. The realistic
figure from client engagements is 10 000–30 000 ₽. The realistic figure from putting a
browser banner on the portfolio is negative, because it is denominated in lost contracts
rather than roubles.

Stage 0 costs an evening and is the only step with a deadline. Do that one and let the
rest wait for the lawyer.
