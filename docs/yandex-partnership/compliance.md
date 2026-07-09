# Compliance

Three separate obligations, plus one ethical one that has no statute behind it and
matters more than any of them.

> **This is not legal advice.** It is a map of what to ask a lawyer and what to ask
> Yandex support. The ad-labelling rules changed in 2025 and their application to
> affiliate links is contested. Where something is unsettled, this document says so
> rather than guessing confidently.

## 1. Ad labelling: erid, ОРД, ЕРИР

Since 2022, and with the rules tightened again in 2025, internet advertising aimed
at consumers in Russia must be:

- registered with an **ОРД** (оператор рекламных данных), which issues an **`erid`**
  token per creative;
- marked with the word **«Реклама»** plus identification of the **advertiser**;
- reported into **ЕРИР**, the unified registry, which Roskomnadzor uses for enforcement.

The token goes inside the clickable link, e.g. `https://example.ru/?erid=2Vfnxx…`.

**Does a referral link count as advertising?** The prevailing industry reading is
yes: the partner agreement is the contract in the advertising chain, the partner is
the рекламораспространитель, and the referral link is the creative. Affiliate
networks and referral programs (Prodamus, Kontur, Yandex Market's own referral
program) publish erid instructions for their partners, which is a strong practical
signal about how the market interprets the law.

There is a genuine counter-argument — that a personal, unpaid-for recommendation in
editorial content is not advertising — but you are paid per conversion, which is
exactly the fact pattern that defeats it.

**Who issues the token?** Yandex operates its own ОРД. The Yandex Market referral
program's help documents a labelling flow where the token is obtained through the
Distribution cabinet. Whether the Browser program's cabinet does the same is
**unverified** — the corresponding help page did not resolve when checked. This is
the first question to ask support, because the answer decides whether you need your
own ОРД contract and your own quarterly ЕРИР reporting, or whether Yandex carries it.

Note the advertiser is **Yandex**, not you. The «Реклама» marker must identify ООО
«Яндекс» and its ИНН. The ИП block already rendered in
[src/components/Footer.tsx:55](../../src/components/Footer.tsx#L55) identifies the
*publisher*, and does not satisfy this.

Penalties for unmarked advertising run to hundreds of thousands of roubles for a
legal entity. For an ИП earning 500 ₽ an install, an unmarked link is not a risk
worth carrying.

## 2. The 3% advertising levy

From Q2 2025 there is a **3% levy on income received from distributing internet
advertising** to users in Russia. It is not a tax on advertising spend; it is a
charge on the revenue of the party that distributes the ad — which, in the reading
above, includes an affiliate earning referral commission. Quarterly, paid by the
fifth of the third month of the following quarter, enforced by Roskomnadzor against
ЕРИР data.

At the volumes discussed in [fit.md](fit.md) this is arithmetically trivial — 3% of
10 000 ₽ is 300 ₽ — but it is a **filing obligation**, and filing obligations are
expensive in attention regardless of the amount. Ask the accountant whether
Distribution income is classified as ad-distribution revenue for this purpose, and
whether the ИП's ОКВЭД needs an advertising code added.

If the B2B revenue is going to be a few thousand roubles a year, the honest question
is whether the reporting overhead exceeds the income. It might. That's a legitimate
reason to skip the website placement and take only the client-side installs, which
are a service rendered under a client contract rather than an ad distributed to the
public — a different, and much simpler, characterisation. **Confirm that distinction
with a lawyer; it's the crux of the whole compliance story.**

## 3. Yandex's distribution policy

The partner agreement carries a Политика дистрибуции. It was not fetchable during
this analysis, so read it in the cabinet. The universal rules across such policies,
which you should assume apply until you read otherwise:

- the user must **consent** to the install; no silent, bundled, or pre-ticked installs;
- no misrepresenting what is being installed, or who publishes it;
- no incentivising installs with rewards the program didn't authorise;
- no automated, emulated, or otherwise fabricated installs.

The six-days-in-two-weeks qualification rule already makes fraud unprofitable. Treat
that as the design intent rather than a hurdle to engineer around: an install that
someone uninstalls the next day was never worth 500 ₽ to Yandex and shouldn't be
worth it to you.

Violations end with unpaid balances and termination, and the eligibility bar means
there is no second account to fall back on.

## 4. Client consent — the one that actually matters

You install software on a client's machines. Yandex pays you 500 ₽ per machine. The
client does not know.

There is no statute here, and that is not the point. The point is that a contractor
who takes an undisclosed per-unit payment from a vendor for putting the vendor's
software on the client's fleet has taken a kickback, and it will be described that
way if it ever surfaces. It surfaces easily: the organisation must register its own
ИНН with Yandex to qualify the install, so the client's own paperwork records the
arrangement you didn't mention.

The rule is therefore simple and non-negotiable:

- **Tell the client before installing.** In writing, in the engagement scope.
- **Only install where the organisation independently wants the browser.** If it
  wouldn't be your recommendation absent the fee, the fee is what's making the
  recommendation.
- **Let them decline** and install anyway if they want it. Then no referral link.
- **Never make the install a condition** of anything else in the engagement.

Disclosed, this is unremarkable — vendors pay integrators for deployments constantly,
and clients understand it. Undisclosed, it's the sort of thing that ends the ИП's
reputation in a city the size of Ufa. The 500 ₽ is not close to worth it.

## Practical disclosure on the site

If a referral link ships in a blog post:

- a visible «Реклама» marker adjacent to the link, plus advertiser identification;
- the `erid` token in the `href`, unstripped — see [integration.md](integration.md);
- `rel="nofollow sponsored"` so search engines see it as paid;
- a plain-language line in the post explaining that a click that leads to an install
  earns the author money. The law requires a marker; a reader deserves a sentence.

Russian-language pages only. The obligations attach to advertising directed at
Russian consumers, and the `/en` audience is neither the target nor the payer.

## Questions to resolve before anything ships

1. Does the Browser Distribution cabinet issue `erid` tokens, or must you contract
   your own ОРД? *(Yandex support)*
2. Is referral commission from Distribution "income from distributing internet
   advertising" for the 3% levy? *(accountant)*
3. Does a referral install performed under a client services contract count as
   advertising at all, or as a service to the client? *(lawyer — this one changes
   the whole shape)*
4. Does the ИП's ОКВЭД cover this revenue? *(accountant)*
5. What does the Политика дистрибуции forbid that isn't listed above? *(read it)*
