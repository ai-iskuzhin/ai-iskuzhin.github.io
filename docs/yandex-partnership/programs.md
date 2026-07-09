# The programs

Notes on what Yandex actually publishes, separated from what we infer. Fetched
July 2026; re-check before acting, because the terms carry validity windows.

## Two programs under one umbrella

Both live inside **Яндекс Дистрибуция**, the same cabinet that hosts referral
programs for Market, Travel, Go and Games. Registration is one Yandex ID, then
moderation, then per-program enrolment. You may join both browser programs at
once, and the wider umbrella matters later — see [playbook.md](playbook.md).

| | «Браузер, Поиск и приложения Яндекса» | «Яндекс Браузер для организаций» |
| --- | --- | --- |
| Audience | Private individuals | Organisations (legal entities and ИП) |
| Headline payout | **up to 600 ₽** per attracted user | **500 ₽** per qualified install |
| What varies the payout | Tool used, device type, user activity | Nothing — flat, but qualification is strict |
| Tools | Referral link, banner, QR code, direct install | One referral link, for bulk install |
| Gate | None stated beyond moderation | Organisation's ИНН + machine count + sustained use |
| Payout cadence | Monthly, per reporting period | Monthly, per reporting period |

### B2C: «Браузер, Поиск и приложения Яндекса»

Pays for a user who installs *and uses* Yandex Browser or the Яндекс — с Алисой AI
app via your referral link, banner, or QR code. The landing page's personas —
service technician, sysadmin, webmaster, blogger, offline business owner — are the
distribution channels it has in mind: a repair shop that sets up laptops, a site
with a download section, a café with a QR code by the till.

"Up to 600 ₽" is a ceiling, not a rate. Yandex states it depends on the tool, the
device type, and the user's subsequent activity, and publishes no breakdown. The
sub-pages for desktop distribution advertise "до 500 ₽" — so the 600 ₽ headline
presumably requires a specific tool/device combination that isn't spelled out.

The distribution sub-page also carried, verbatim:

> Условия оплаты действуют на период с 01 января по 30 сентября 2025 года

That window is a design signal: rates are re-set periodically. Do not build a
revenue model on any published figure.

### B2B: «Яндекс Браузер для организаций»

Flat **500 ₽ per qualified install** on a computer belonging to a legal entity or
an ИП. Qualification, as published:

- the machine has **no prior installation** of Yandex Browser;
- the company's machines reach the open internet (so an air-gapped or
  heavily-filtered network won't register);
- **the browser is used on at least 6 days within 2 weeks** of installation.

Attribution runs through a personal referral link. The organisation then registers
its name, **ИНН**, and number of computers, and downloads the browser from the
partner's section. So the paying event is not "an installer ran" — it is "a real
company, identified by tax number, put the browser on real machines that real
people then used for six days". This is a deliberate anti-fraud design and it
means ghost installs pay nothing.

Explicitly eligible: sysadmins and IT technicians who install software, integrators
and distributors, tech bloggers. Legal form may be ИП, самозанятый, or юрлицо.

**The eligibility bar, quoted:**

> Participation is only possible if you did not perform corporate browser
> installations before joining the program.

This is the single most consequential line in the terms. It converts "I'll sign up
later, once I have a client to install for" into a way to disqualify yourself. See
[action-plan.md](action-plan.md).

## What is *not* published

Things a revenue model would need, which Yandex does not state publicly and which
must be read from the cabinet or asked of support:

- the payout table behind "up to 600 ₽" (per tool, per device, per activity tier);
- the attribution window between click and install;
- whether attribution is by link parameter or by HTTP `Referer` — this changes the
  `rel` attribute you can safely put on the link ([integration.md](integration.md));
- whether a `subid`-style parameter exists for splitting one link across placements;
- who registers the ad creative with an ОРД, and whether the Distribution cabinet
  issues the `erid` ([compliance.md](compliance.md));
- what happens to a qualified install if the organisation later uninstalls.

## The disclaimer, which is load-bearing

The landing page's own footnote:

> Информация не является публичной офертой, частью договора или заверениями об
> обстоятельствах. Полные условия сотрудничества вы можете найти в договоре,
> который заключили с Яндексом.

Everything above is marketing copy, not contract. The contract is what you sign in
Дистрибуция. Read it before quoting any number to anyone, including yourself.
