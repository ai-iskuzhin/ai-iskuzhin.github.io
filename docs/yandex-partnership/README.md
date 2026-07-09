# Yandex partner programs

Analysis of the Yandex Distribution partner programs (`partner.browser.yandex.ru`)
and what, if anything, this site should do about them. Some files are notes on
Yandex's published terms, some are analysis of this repository, and one is a
reusable checklist for the next partner program that comes along.

Written in English because the reusable parts are meant to outlive this specific
offer. Everything user-facing that comes out of this is Russian-only — see
[fit.md](fit.md).

## Contents

| File | What's inside |
| --- | --- |
| [programs.md](programs.md) | Yandex's terms: the two programs, payouts, qualification rules, sources |
| [fit.md](fit.md) | Does this site fit? Expected revenue, B2C vs B2B, credibility cost |
| [compliance.md](compliance.md) | Russian ad-labelling law (erid/ORD), the 3% levy, disclosure, client consent |
| [integration.md](integration.md) | How to wire a partner link into *this* codebase without breaking prerender or SEO |
| [playbook.md](playbook.md) | Reusable framework for evaluating any partner program, for other projects |
| [action-plan.md](action-plan.md) | What to do, in what order, with the decision gates |

> Nothing here has been applied. This is analysis and a plan, not a changelog.

## Short version

There are two programs, and they are not the same business.

**«Браузер, Поиск и приложения Яндекса»** (B2C) pays *up to* 600 ₽ per attracted
user. It wants traffic. This site has approximately none — see the traffic
argument in [fit.md](fit.md) — and the traffic it does have is developers, who
are the single worst audience on earth for a "install this browser" banner.
Realistic revenue is on the order of tens of roubles a month, against a portfolio
whose actual job is to convert a hiring manager or a client worth five to six
figures. **Verdict: do not put B2C banners on the portfolio.**

**«Яндекс Браузер для организаций»** (B2B) pays 500 ₽ per qualified install on a
company machine. This one fits, because it is paid for something you already do
— configuring software for client organisations as an ИП — and because a
sysadmin audience is exactly who it targets. A twenty-machine office is 10 000 ₽.

The B2B program has a **one-way door** in its terms: you can only join if you
have *not* previously done corporate Yandex Browser installs. Joining is free and
reversible; having already installed is not. That asymmetry is the whole reason
this document exists — see [action-plan.md](action-plan.md).

The highest-value thing the *website* can do is not a banner. It is one genuinely
useful Russian-language blog post about rolling out Yandex Browser in an office
(GPO/MSI, policies, what breaks), carrying one disclosed referral link. That
attracts the sysadmin the B2B program pays for, instead of interrupting the
recruiter the portfolio is for.

## Two things that will bite

1. **Ad-labelling law.** A referral link is, on the prevailing reading, advertising
   under ФЗ-38: it needs an `erid` token from an ОРД, a «Реклама» marker, and
   advertiser details, with reporting into ЕРИР. Since Q2 2025 there is also a 3%
   levy on income from distributing internet advertising. Neither is settled for
   this exact case and neither should be taken from this document as legal advice
   — [compliance.md](compliance.md) lays out what's verified and what needs a
   lawyer.

2. **The numbers are not an offer.** Yandex's own landing page says so, and the
   500 ₽ figure on the distribution pages carried an explicit validity window
   (1 Jan – 30 Sep 2025). Treat all payout figures as indicative and re-check them
   in the cabinet before building anything around them.

## Sources

Fetched July 2026. Figures quoted in [programs.md](programs.md) come from these.

- [partner.browser.yandex.ru](https://partner.browser.yandex.ru/) — program landing
- [partner.browser.yandex.ru/corp](https://partner.browser.yandex.ru/corp) — B2B terms
- [partner.browser.yandex.ru/distrib/programmes](https://partner.browser.yandex.ru/distrib/programmes) — program comparison
- [yandex.ru/project/distribution](https://yandex.ru/project/distribution/information/) — the wider Distribution umbrella (Market, Travel, Go, Games)
- [Маркировка рекламы 2025: erid, ОРД, ЕРИР](https://cleverdata.ru/blog/statii/markirovka-internet-reklamy-erir-ord-erid)
- [3% сбор с доходов от интернет-рекламы](https://buh.ru/articles/novyy-sbor-s-dokhodov-ot-reklamy-s-1-aprelya-2025-goda-kto-i-v-kakom-razmere-budet-platit.html)
