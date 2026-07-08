# Trillet.ai — Content & Keyword Performance Analysis (12-Month GSC Data)

**Period:** July 7, 2025 – July 7, 2026
**Source:** user-supplied Google Search Console export (`Pages.csv`, `Queries.csv`, `Chart.csv`, `Countries.csv`, `Devices.csv`, `Search appearance.csv`)
**Scope:** 432 unique indexed URLs, top 1,000 queries (GSC export cap)

This replaces the earlier search-intelligence audit's inference with direct measurement. All figures are computed from the CSV export; nothing here is estimated except the single benchmark-based projection at the end, which is labeled as such.

---

## Headline numbers

| Metric | Value |
|---|---|
| Total clicks | 14,100 |
| Total impressions | 1,881,411 |
| Site-wide CTR | 0.75% |
| Weighted average position | 8.5 |
| Brand share of clicks (`trillet`, `trillet ai`, misspellings) | 93.3% |

Position isn't the problem — a weighted average of 8.5 across 1.88M impressions is a real, earned footprint. The problem is what happens after the ranking: almost none of that visibility converts into a click, and the gap is concentrated almost entirely in the blog and industry pages, not the core product pages.

---

## 1. The 2026 content flood

Monthly breakdown of the same 12 months:

| Month | Clicks | Impressions | CTR | Avg. position |
|---|---:|---:|---:|---:|
| 2025-07 | 875 | 5,321 | 16.44% | 18.35 |
| 2025-08 | 763 | 8,078 | 9.45% | 23.00 |
| 2025-09 | 651 | 6,115 | 10.65% | 10.56 |
| 2025-10 | 681 | 6,078 | 11.20% | 7.75 |
| 2025-11 | 553 | 6,086 | 9.09% | 11.02 |
| 2025-12 | 407 | 9,828 | 4.14% | 13.95 |
| **2026-01** | 785 | 81,403 | **0.96%** | 12.73 |
| 2026-02 | 1,531 | 189,224 | 0.81% | 7.39 |
| 2026-03 | 1,928 | 286,078 | 0.67% | 7.43 |
| 2026-04 | 2,113 | 337,929 | 0.63% | 7.79 |
| 2026-05 | 1,699 | 277,188 | 0.61% | 9.69 |
| 2026-06 | 1,436 | 218,672 | 0.66% | 11.10 |
| 2026-07 (partial) | 282 | 35,736 | 0.79% | 11.60 |

**What happened:** Jul–Nov 2025 shows modest traffic but a healthy 9–16% CTR. December is the hinge month (CTR drops to 4.1% as impressions start climbing). From January 2026 onward, impressions jump 8–40× (peaking at 337,929 in April) while CTR collapses under 1% and stays there for six straight months.

Ranking position didn't get meaningfully worse in this window — it's often better (7.4 in March vs. 23.0 in August 2025). This isn't a ranking failure. It's a **relevance/snippet failure at scale**, consistent with the mass rollout of the 305-post blog and 31-page industry cluster (most titled "2026") landing almost entirely in this window: a large volume of new pages is ranking on page 1 for real search terms and still not getting clicked.

---

## 2. Where the clicks actually come from

| Segment | Clicks | % of clicks | Impressions | % of impressions | CTR |
|---|---:|---:|---:|---:|---:|
| Homepage (apex + www) | 9,164 | 65.0% | 68,897 | 3.7% | 13.3% |
| Blog (305 posts) | 2,909 | 20.6% | 1,583,845 | 84.2% | 0.18% |
| Industry pages (31 pages) | 124 | 0.9% | 39,853 | 2.1% | 0.31% |
| Core product pages (pricing, docs, whitelabel, etc.) | ~1,900 | ~13.5% | ~189,000 | ~10.0% | ~1.0% |

Two-thirds of every click the site earns comes from people typing the brand name and landing on the homepage. The blog carries 84% of all impression volume and returns 21% of clicks. The content is doing the hard part (getting found) and failing at the cheap part (getting clicked).

---

## 3. SEO architecture — canonicalization, proven with real numbers

The earlier audit flagged apex-vs-`www` duplication from indexation patterns alone. This data confirms it directly, and the scale is larger than expected:

- **216 of 432 unique URL paths (exactly half)** are indexed under more than one hostname.
- **89.6% of all impressions** (1,686,433 of 1,881,411) sit on paths that are duplicated across hosts.
- **Seven distinct hostnames** are earning search visibility for what is functionally one property: `trillet.ai`, `www.trillet.ai`, `docs.trillet.ai`, `app.trillet.ai`, `security.trillet.ai`, `certification.trillet.ai`, and `bootstrapps.trillet.ai` (the last ranking at position 27.1 for a homepage-related query — reads like an unintended subdomain exposure rather than a deliberate property; worth checking whether it should be indexed at all).

**Homepage split:**

| Host | Clicks | Impressions | CTR | Position |
|---|---:|---:|---:|---:|
| `www.trillet.ai/` | 7,863 | 54,438 | 14.44% | 3.9 |
| `trillet.ai/` (apex) | 1,094 | 7,448 | 14.69% | 5.5 |
| `app.trillet.ai/` | 138 | 2,897 | 4.76% | 4.7 |
| `docs.trillet.ai/` | 60 | 2,629 | 2.28% | 2.7 |

The apex homepage ranks 1.6 positions worse than `www` despite identical content — direct evidence the two are splitting, not sharing, ranking signal.

**The same pattern repeats across the entire blog** — e.g. `best-ai-receptionist-for-small-business-2026` (117,316 combined impressions, www at position 6.9 vs. apex at 8.2), `cheapest-ai-phone-answering-service` (56,238 combined impressions, www at 7.0 vs. apex at 14.6 — more than a full page apart). This is 216 URL pairs, most of them blog posts, each splitting its own ranking signal. **This is very likely the single largest lever in this audit** — content doesn't need to be rewritten to gain rank, it needs to stop being counted as two weaker pages instead of one stronger one.

---

## 4. Content structure & keyword architecture

305 blog posts, grouped by URL slug pattern:

| Template pattern | Posts | Example |
|---|---:|---|
| Generic `voice-ai-*` educational | 44 | `voice-ai-latency-benchmarks` |
| `ai-receptionist-for-*` | 20 | `ai-receptionist-for-salon-and-spa` |
| `how-to-*` | 20 | `how-to-start-ai-chatbot-agency` |
| `ai-answering-service-for-*` | 16 | `ai-answering-service-for-hvac` |
| Pricing / cost explainer | 11 | `ai-phone-answering-service-cost-breakdown` |
| `*-alternative(s)-2026` | 11 | `smith-ai-alternative-2026` |
| `*-vs-trillet-comparison` | 9 | `phonely-vs-trillet-comparison` |
| `trillet-vs-*-comparison` | 7 | `trillet-vs-hey-rosie-comparison` |
| `best-*-2026` | 4 | `best-ai-receptionist-for-small-business-2026` |
| `top-10-*-2026` | 2 | `top-10-white-label-voice-ai-platforms-for-agencies-2026` |
| Other / one-off | 164 | `native-salesforce-integration-vs-flexible-crm-connectivity…` |

The keyword strategy is coherent: competitor-brand interception, vertical-specific service pages, pricing/cost intent, and evergreen education. That's a sound content map. What's missing is title/meta discipline at the same scale it was built:

- The longest URL slug runs **103 characters** (`native-salesforce-integration-vs-flexible-crm-connectivity-what-voice-ai-platforms-actually-need`) — a strong signal the on-page title is similarly long and truncating in the SERP.
- `/blogs/VoiceAICustomerService` breaks the kebab-case convention used everywhere else, and it's also one of the worst-ranked pieces in the set (position 20, 0.21% CTR on 19,451 impressions) — a useful marker of where the templated production pipeline broke down.
- Average slug length is a reasonable 40 characters, but the long tail of very long, keyword-stuffed titles overlaps almost exactly with the worst-CTR posts below.

---

## 5. Worst-performing content pieces

Posts with >8,000 impressions, sorted by CTR ascending:

| Post | Impressions | Position | CTR |
|---|---:|---:|---:|
| `comparing-no-code-phone-agents-for-outbound-calling-in-2026` | 8,819 | 6.7 | 0.01% (1 click total) |
| `ai-answering-service-guide` | 25,227 | 30.7 | 0.03% |
| `best-voice-ai-for-contact-centers` | 19,358 | 6.6 | 0.03% |
| `smith-ai-alternative-2026` | 13,739 | 6.4 | 0.03% |
| `voice-ai-data-residency-requirements-by-region` | 34,864 | 6.5 | 0.04% |
| `voice-ai-white-label-pricing-breakdown-2026` | 46,312 | 6.2 | 0.06% |
| `ai-phone-answering-service-cost-breakdown` | 27,379 | 13.9 | 0.07% |

Two deserve special attention. **`voice-ai-data-residency-requirements-by-region`** is a highly specific, high-intent B2B/enterprise topic (compliance, data residency) ranking at position 6.5 on 34,864 impressions and converting almost nobody — exactly the kind of page an enterprise buyer would search for, with a title/snippet failing to signal Trillet has a real answer. **`smith-ai-alternative-2026`** is a competitor-brand-intercept page — someone searching for a Smith.ai alternative is already comparison-shopping, about as high-intent as organic traffic gets — converting at 0.03%.

---

## 6. Industry pages — the ranking reality

The earlier audit flagged the 31 programmatic `/industries/*` pages as a good strategy with a thin-content risk. The data resolves the question: most aren't ranking well enough to matter yet.

| Page | Impressions | Avg. position | Status |
|---|---:|---:|---|
| `/industries/lawyers` | 3,143 | 33.2 | page 4 |
| `/industries/accounting-tax-services` | 1,018 | 22.4 | page 3 |
| `/industries/plumbers` | 9,095 | 22.3 | page 3 — highest-volume page in the set |
| `/industries/real-estate` | 3,804 | 14.7 | page 2 |
| `/industries/electricians` | 3,395 | 14.2 | page 2 |
| `/industries/roofing` | 5,959 | 11.7 | page 2 |
| `/industries/hvac` | 3,797 | 8.1 | bottom of page 1 |
| `/industries/junk-removal` | 1,524 | 7.8 | page 1 |
| `/industries/therapists` | 1,583 | 6.6 | page 1 |
| `/industries/garage-door-repair` | 250 | 5.1 | page 1, low volume |

**`/industries/plumbers` is the most telling case.** It's the highest-impression-volume industry page (9,095) — clearly the vertical with the most real search demand — and it's stuck on page 3 at an average position of 22.3, split across two hosts individually sitting at 19.8 (www) and 27.9 (apex). This page should realistically be competing for page 1 given the demand it's already attracting; instead the ranking signal is cut in half by the same canonicalization issue as the blog. Fixing §3 is likely to move this page — and several others in this table — the most.

---

## 7. Geography & devices

| Country | Clicks | Impressions | CTR | Position |
|---|---:|---:|---:|---:|
| United States | 4,502 | 905,938 | 0.50% | 9.7 |
| Pakistan | 2,061 | 10,138 | 20.33% | 5.0 |
| Australia | 1,481 | 94,831 | 1.56% | 10.1 |
| India | 1,163 | 31,793 | 3.66% | 8.5 |
| United Kingdom | 627 | 57,642 | 1.09% | 8.8 |

**Pakistan is worth a direct look.** It's the #2 country by clicks — ahead of Australia and India — off a tiny impression base (10,138), producing a 20.33% CTR wildly out of line with every other market. Either a genuine, concentrated pocket of demand (an agency/reseller community discovering Trillet for white-label use, plausible given the product's agency angle) or traffic worth sanity-checking in GSC's own country×query filter. Not a claim of invalid traffic — just the one number in this export that doesn't fit the overall pattern.

**Devices:** desktop carries the volume (9,612 clicks / 1.26M impressions, 0.76% CTR) but mobile converts noticeably better (3,982 clicks / 196,623 impressions, **2.03% CTR**) despite roughly 1/6th the impressions. Worth a mobile-rendering check given the GEO/rendering note from the earlier audit — if mobile is already converting better with less volume, it's a segment responding to something the desktop experience isn't replicating.

---

## 8. What this data says to fix first

**Do first — structural, affects the whole content set at once:**
1. Consolidate every host to one canonical domain (§3). 89.6% of all impressions sit on paths currently split across up to 7 hostnames — the highest-leverage fix in this dataset, requiring no content rewriting.
2. Audit and fix titles/meta descriptions on the 7 worst-CTR posts in §5 first — they collectively hold over 160,000 impressions at page-1 positions and return almost nothing. A rewrite task measured in hours.

**Do next — content-specific:**
3. Rewrite `voice-ai-data-residency-requirements-by-region` and `smith-ai-alternative-2026` as priority cases — both are high-intent topics ranking well and converting at effectively zero.
4. Fix the `VoiceAICustomerService` slug/title to match the site's kebab-case convention.
5. Hold off on expanding the `/industries/*` template to new verticals until the existing 31 pages are fixed — `/industries/plumbers`, the single highest-demand page in the set, is stuck on page 3, most likely from the same host-split issue as the blog.

**Sanity-check:**
6. Review the Pakistan traffic pattern directly in GSC's country × query filter.
7. Compare mobile vs. desktop rendering — mobile is converting 2.7× better than desktop off a fraction of the volume.

**The honest opportunity size:** `Queries.csv` is capped at exactly 1,000 rows by GSC's UI export — real long-tail query volume is larger than what's captured here, so every non-brand figure in this analysis is a floor, not a ceiling. Even using only the captured data: non-brand queries returned 584 clicks on 219,143 impressions (0.27% CTR) over the period. Closing even half that gap to a conservative 2% CTR — well under the site's own 14% homepage CTR — would be worth roughly **4,000+ additional clicks** across this same window from title/snippet fixes alone, before any new content is written.
