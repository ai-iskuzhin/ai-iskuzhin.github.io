# Does this site fit?

Analysis of the two programs against what this site actually is: a personal
portfolio for a .NET developer specialising in fintech and payment integrations,
run by an ИП, with a Russian and an English edition.

## What the site is for

The portfolio exists to convert one of two readers: a hiring manager, or a client
looking for an integration contractor. Both conversions are worth somewhere between
10⁵ and 10⁶ ₽. Every element on the page is either helping that or competing with it.

That framing decides most of what follows. The question is never "does this earn
anything" — it is "does this earn more than it costs in credibility".

## The B2C program on this portfolio: no

Three independent reasons, each sufficient on its own.

**The traffic isn't there.** The site is new. [docs/ya-ru/analiz-sayta.md](../ya-ru/analiz-sayta.md)
established that Yandex hasn't even formed quick links for it, which happens only
once a section accumulates real visits. The blog holds one article. A program that
pays per attracted user pays nothing when there are no users to attract.

**The audience is inverted.** The visitors are developers, recruiters, and technical
clients. Developers have a strongly-held browser preference and are the demographic
least likely to install one from a banner. The B2C program's productive channels —
a repair shop's front desk, a download site, a café's QR code — all share a property
this site lacks: an audience that is *not* opinionated about software.

**The credibility cost is asymmetric.** Run the arithmetic charitably. Say the site
grows to 500 visits/month. A tasteful banner draws maybe 0.5% → 2–3 clicks. Suppose
an unusually good 5% of those install and stay active → 0.1 qualified users/month →
roughly **60 ₽/month** at the 600 ₽ ceiling. Now price the downside: one hiring
manager who reads a browser ad on a portfolio as "this person monetises their CV"
and closes the tab. A single lost conversation costs more than a decade of that
banner. The expected value is negative and it is not close.

This holds even if the traffic estimate is off by 10×. 600 ₽/month does not change
the conclusion.

## The B2B program: yes, and it's the real opportunity

«Яндекс Браузер для организаций» pays 500 ₽ per qualified install on a company
machine. Three things line up:

**It pays for work already being done.** As an ИП doing integration work, you touch
client infrastructure. Yandex's own eligible-participant list names sysadmins,
integrators, and software installers. A twenty-machine office is **10 000 ₽** for
something adjacent to an engagement already in progress.

**The audience matches, if the site is used correctly.** The portfolio's technical
readers are the people who *run* office fleets or advise those who do. That's the
demographic the B2B program pays for — unlike the B2C one.

**Qualification is honest.** The six-days-in-two-weeks rule means you get paid only
if the organisation actually uses the browser. That removes the temptation to
game it, and it means the program only earns when the recommendation was genuine.

Two conditions attach.

*The one-way door.* You cannot join after having done corporate installs. Enrol
before the next client engagement that would involve one, or the option closes. See
[action-plan.md](action-plan.md).

*Client consent.* Installing software on a client's machines while collecting a
per-machine fee from the vendor is a conflict of interest unless the client knows.
It is also the kind of thing that ends a contracting relationship when discovered
later rather than disclosed earlier. Treated properly in [compliance.md](compliance.md).

## The English edition earns nothing

The `/en` tree is for a non-Russian audience. Yandex Browser referral has no value
there, and Russian ad-labelling obligations attach to advertising directed at
consumers in Russia. Any placement must be gated on `lang === 'ru'`, the same way
the ИП legal block already is in [src/components/Footer.tsx:55](../../src/components/Footer.tsx#L55).

This also means: never put a partner element anywhere shared between the two
editions, such as the header or the global footer.

## The placement that actually works

Not a banner. **One article.**

A genuinely useful Russian post — *«Яндекс Браузер для организаций: раскатка в
офисе через GPO и MSI»* — covering the deployment mechanics, the policy templates,
what breaks, and what the licence actually permits. One disclosed referral link in
the body, where a reader who has just decided to deploy would want it.

Why this beats every banner:

- It **attracts** the sysadmin the B2B program pays for, rather than interrupting
  the recruiter the portfolio is for. The traffic it earns is the traffic that converts.
- It is a portfolio asset in its own right. A post demonstrating fleet-deployment
  competence helps the hiring-manager conversion instead of taxing it.
- It feeds the SEO work already underway in [docs/ya-ru/](../ya-ru/). That plan is
  blocked on exactly one thing — *«Раздел из одной статьи не наберёт переходов»* —
  and this is a second article aimed at a real query.
- The referral link sits in a context where it's a service to the reader, which is
  the only condition under which an affiliate link doesn't cost credibility.

The B2C program can ride along in the same post if it's honest to do so, but it
should not get its own surface.

## Interaction with the SEO work in `docs/ya-ru/`

The quick-links plan wants Yandex to see a small site with clean internal links and
a few well-trafficked sections. Partner content can undermine that:

- outbound partner links must be `nofollow` so the site isn't seen to sell link
  equity ([integration.md](integration.md));
- no doorway pages — a thin `/partners/` page built to host links is precisely what
  the quick-links plan is trying to avoid creating;
- do not add a partner entry to the header menu. The menu currently holds only two
  real pages and [docs/ya-ru/plan-deystviy.md](../ya-ru/plan-deystviy.md) is
  spending that scarce resource on VerificaHub. A partner link would be a *worse*
  quick-link candidate than anything already queued.

## Verdict

| Surface | B2C | B2B |
| --- | --- | --- |
| Home page | No | No |
| Header / footer | No | No |
| Library pages | No | No |
| Blog post, in context | Acceptable | **Yes — this is the placement** |
| Off-site (client work, direct) | Marginal | **Yes — this is where the money is** |

Most of the B2B revenue will come from client engagements, not from the website.
The website's job is to be the credential that makes those engagements happen, plus
one article that puts the referral link in front of the right reader.
