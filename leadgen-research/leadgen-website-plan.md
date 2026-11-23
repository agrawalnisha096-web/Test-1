# Lead-gen website plan: selling leads and marketing to US contractors

*Research run: November 23, 2026. Market: United States, all trades. DataForSEO spend: **$1.44** (cap $5). Full cost log in `data/cost_log.csv`.*

**Labels used:** **[V]** Verified (read directly from a source or API) · **[I]** Inferred (my analysis of verified data) · **[U]** Unverified (a competitor's own claim).

---

## 1. Summary

1. **The niche is soft.** 99 Calls, the model closest to ours, gets about **981 estimated organic visits a month** [V, DataForSEO]. It has 4,114 indexed URLs and 730 referring domains. 33 Mile Radius gets about 638 visits a month. Low-authority sites rank top 5 for money terms: Built Right Digital (518 referring domains) is #4 for "roofing seo" [V]. Nobody owns these results pages.
2. **Demand is spread across trades, and each click is expensive.** I mapped 1,305 keywords (about 273K searches a month once the navigational brand terms are removed) to 226 candidate pages [V].
   - Trade "leads" and "marketing" keywords together are about 70K searches a month, with **weighted difficulty of 0–15 and CPCs of $30–110** [V].
   - Example: "roofing leads" and "leads for roofers" are 1,000/mo each, KD 0–6, $57 CPC.
   - Low difficulty with high CPC is the opening: ads are expensive, organic is cheap to win.
3. **Programmatic location pages don't work here, so don't build them first.**
   - 99 Calls has 2,744 `/locations/{State}/{Trade}-Leads.htm` pages, and its homepage still earns about 47% of its traffic.
   - Abstrakt has 1,147 industry × city pages, and its homepage earns 75%.
   - The pages that do earn traffic are **trade hubs**: Scorpion `/hvac/`, 33 Mile Radius `/hvac-leads/`, 99 Calls `/Plumbing-Leads.htm` [V/I].
4. **Google LSA is the largest single topic**: 89,000 searches a month across 37 keywords ("local services ads" 49.5K, "google local services ads" 33.1K) [V]. Contractors researching LSA are exactly our buyer. The current top results are small agencies' blog posts [V].
5. **The results pages are full of video, Reddit and AI.** Across 98 checked keywords [V]:
   - An **AI Overview** shows on 97.
   - **YouTube** ranks top 10 on 56.
   - **Facebook** on 26, **Reddit** on 21.
   - A local pack on 14 (the "X marketing agency" terms).

   Ranking needs answer-first pages with concrete numbers, plus a YouTube video and a Reddit presence alongside the site.
6. **Positioning gap:** only 99 Calls and Service Direct publish per-lead prices [V]. Agencies charge $2K–8K a month on 12-month contracts (Hook, Scorpion) [V]. A brand with **published per-trade lead pricing, no contract, and clear rules on which calls are billable** would stand out in every comparison. That's a business decision for you (see §8).

---

## 2. Competitor landscape

Full matrix: `competitor-matrix.csv`. Estimated organic traffic is DataForSEO's estimate for the US.

| Company | Model | Pricing published? | Contract | Est. organic traffic/mo | Referring domains | Indexed URLs |
|---|---|---|---|---|---|---|
| 99 Calls | Exclusive leads + agency | Yes ($12.99–$129.99/lead, $99–$4,999/mo) | None | 981 | 730 | 4,114 |
| 33 Mile Radius | Pay-per-call | No ("varies by area") | None | 638 | 362 | 222 |
| Service Direct | Pay-per-call marketplace | Yes (CPL ranges by trade) | None | 3,314 | 1,913 | 428 |
| Hook Agency | Agency | Yes ($2K–$3.75K/mo per service) | 12 months | 9,174 | 3,466 | 1,425 |
| Scorpion | Agency + tech | No | 12 months | 3,460 | 8,846 | n/a (blocked) |
| Built Right Digital | Agency | Yes ($499–$4,999/mo) | Month-to-month | 639 | 518 | 1,535 |
| Abstrakt | B2B lead gen | No | n/a | 1,760 | 1,719 | 2,242 |
| Angi / Thumbtack / Networx / Modernize | Shared-lead marketplaces | No | n/a | 37K–860K (consumer traffic) | 4.6K–60K | n/a |

**Lessons from their site structures [I]:**
- **Copy:** Hook's and Scorpion's **trade hub + channel child** pattern (`/hvac-marketing/seo/`, `/hvac/ppc-hvac-marketing/`). Both children rank on their own.
- **Copy:** 99 Calls' **LSA cost estimator** (26 trade pages) and its **"vs competitor" pages**.
- **Avoid:** 99 Calls' and Abstrakt's state/city × trade pages. Thousands of near-duplicate pages, almost no traffic.
- **Avoid:** generic agency terms ("seo company", "digital marketing agency"). WebFX holds them with 39K referring domains.
- **Note:** Service Direct gets calls to resell by ranking homeowner DIY content ("why is my light switch shocking me"). That's a second, consumer-side SEO play. It's out of scope here, but worth knowing if you ever produce leads yourself.

**Trust claims competitors lead with [U]:**
- 99 Calls: "2.5M leads", BBB A+.
- Service Direct: "2.4M+ call leads", "8,300+ clients", "8.5X ROI".
- Hook: "$240M+ revenue driven".
- Scorpion: "$3B+ attributed revenue".
- Modernize: "1,000+ businesses".

You'll need your own proof points (case studies, lead counts) before launch.

---

## 3. Keyword opportunity by cluster

Full map: `keyword-map.csv`, 1,305 keywords. Columns: volume, KD, CPC, intent, cluster, target page, top 5 results and features, and competitor positions. "Ad value" = volume × CPC: what that traffic would cost in Google Ads. It's a value signal, not revenue.

| Cluster | Keywords | Searches/mo | Ad value/mo | Typical KD | Main intent | Example |
|---|---|---|---|---|---|---|
| Google LSA (guide + management) | 37 | 89,000 | $1.04M | ~31 | Informational / commercial | local services ads (49.5K) |
| Trade × marketing / advertising / agency | 388 | 41,420 | $1.30M | 0–15 | Commercial | plumbing marketing agency (720) |
| Trade × leads / lead generation | 301 | 28,060 | $1.31M | 0–10 | Transactional / commercial | roofing leads (1,000), hvac leads (720) |
| Trade × SEO | 107 | 19,530 | $739K | 0–15 | Commercial | roofing seo / seo for roofers (1,900 each) |
| Competitor brands (reviews, cost, vs) | 102 | ~50,000* | $355K | 20–40 | Informational / commercial | angi leads (5,400), networx leads (390) |
| Generic leads (contractor / home service) | 88 | 11,930 | $536K | ~11 | Commercial | lead generation services (1,300), contractor leads (480) |
| Generic marketing (home service / contractor) | 97 | 12,330 | $305K | ~7 | Commercial | home service marketing (720) |
| Trade × websites | 51 | 8,610 | $118K | 10–25 | Commercial / informational | websites for painters (2,400) |
| Pay-per-call | 48 | 2,310 | $103K | ~4 | Informational | pay per call (390) |
| Missed-call text back | 15 | 1,330 | $29K | ~4 | Commercial | missed call text back (480) |
| Cost per lead | 22 | 1,930 | $13K | low | Informational | how to calculate cost per lead (140) |

\*The Thumbtack share (about 38K) is mostly "what is thumbtack" or "is thumbtack legit", which is mixed consumer and pro intent. Realistically about a third of it is contractors.

**Top trade hubs by ad value [V]:**
- plumbing (8,720/mo), roofing (9,620), hvac (8,150)
- solar (2,890, very high CPC), pest control, landscaping, remodeling, moving, electrical, house cleaning, painting, junk removal

**Caveats:**
- Volumes are Google Ads monthly averages from DataForSEO.
- Competitor data is capped at their top 1,000 keywords in positions 1–20, so totals are minimums.
- Two results checks didn't finish.
- Low-volume trades (chimney, irrigation, water treatment) show 10–20 searches a month. Build them as hubs only for completeness, after the strong trades.

---

## 4. Site architecture

```
/                                   Home: "Exclusive leads + marketing for home service contractors"
├── /leads/                         How our leads work: exclusive, billing rules, quality, credits
├── /pricing/                       Published per-lead pricing by trade + plans (main differentiator)
├── /get-leads/                     Lead form (2-step)
├── /{trade}/                       ~55 trade hubs: leads + marketing + advertising intents
│   ├── /{trade}/seo/               Only where the cluster is ≥500/mo (wave 2: roofing, plumbing, hvac,
│   │                               electrical, moving, cleaning, pest control); others later
│   └── /{trade}/websites/          Only where ≥500/mo (painting, plumbing, general contractor, landscaping)
├── /services/
│   ├── /local-services-ads/        LSA management + the definitive LSA guide (89K/mo cluster)
│   ├── /google-ads/
│   ├── /seo/                       Contractor / home service SEO
│   ├── /websites/                  Contractor website design
│   ├── /pay-per-call-leads/
│   └── /missed-call-text-back/     (+ AI answering)
├── /compare/
│   ├── /exclusive-vs-shared-leads/
│   └── /angi/ /thumbtack/ /homeadvisor/ /networx/ /99-calls/
├── /tools/
│   ├── /cost-per-lead-calculator/
│   └── /lsa-cost-estimator/{trade}/    (data from our CPC/LSA research)
├── /learn/                         Guides ("how to get roofing leads"), 86 candidates, wave 3
├── /results/                       Case studies by trade
└── /about/  /contact/
```

**Rules:**
- **Each keyword goes to exactly one page** (`target_page` in the keyword map), so pages don't compete with each other.
- **A child page only gets built if its cluster is ≥500 searches a month.** Otherwise the content is a section on the hub.
- **No city/state pages at launch.** Test 5 city pages for the 2 best trades after month 3, and expand only if they rank.
- **Internal links:**
  - Every hub links to its children, `/pricing/`, `/services/local-services-ads/` and its comparison page.
  - Every guide links up to its hub.
  - Breadcrumbs on every page.
- **Schema:**
  - `Organization` + `Service` on hubs, `FAQPage` for answer blocks.
  - `BreadcrumbList` everywhere.
  - Pricing tables as HTML tables, not images, so AI Overviews can quote them.

### Trade hub template (the page we'll build about 55 times, so it has to be good)

Avoiding thin pages depends on giving each trade its own data. Every hub carries:

1. **H1:** "Exclusive {Trade} Leads & Marketing". Title tag aimed at "{trade} leads | {trade} marketing".
2. **Answer-first block (40–60 words):** what a {trade} lead costs with us, what counts as billable, and how fast leads start.
3. **Per-trade data table:**
   - our price per lead
   - Google Ads CPC for this trade's keywords (from this research, e.g. "roofing leads" ≈ $57/click)
   - LSA cost estimate
   - typical close rate
4. **The channels we use for this trade:** SEO, LSA, Google Ads. Each links to its child page or service page.
5. **A sample lead**, anonymised: what the contractor actually receives.
6. **A trade case study** or testimonial, once you have one.
7. **FAQ**, 4–6 questions taken from the People Also Ask boxes, which show on 86 of 98 checked keywords.
8. **Form with the trade preselected,** plus click-to-call.
9. **An embedded YouTube video** of 2–4 minutes ("How much do roofing leads cost in 2026?").

### Conversion setup

Competitor forms run from 1 field (99 Calls) to 10 (Modernize).

- **Step 1:** trade, ZIP, phone, email.
- **Step 2:** name, company, monthly lead goal, current lead sources (Angi / Thumbtack / ads / none).
- **Sticky click-to-call bar on mobile.**
- **GA4 key events:**
  - `form_start`
  - `form_submit`
  - `call_click`
  - `pricing_view`
- **Call tracking** on the phone number.

---

## 5. Content waves (from `page-map.csv`)

| Wave | Pages | What | Searches/mo covered | Ad value/mo |
|---|---|---|---|---|
| **1: launch** | 19 + pricing/form/about | Home, `/leads/`, `/pricing/`, LSA service + guide, 14 top trade hubs, `/compare/angi/`, `/compare/thumbtack/` | ~210K | ~$4.3M |
| **2: weeks 7–10** | 44 | 14 trade children (SEO/websites ≥500/mo), 21 trade hubs, `/services/*`, 4 comparisons, cost-per-lead tool | ~51K | ~$1.5M |
| **3: weeks 11+** | 163 | Remaining small hubs and children, 86 `/learn/` guides | ~11.5K | ~$0.2M |

These figures are *opportunity sizing, not a forecast*. Wave 1 volume is dominated by the LSA cluster, which has the highest difficulty of anything here.

**Wave 1 trade hubs:**
- roofing, plumbing, hvac, electrical
- painting, landscaping, pest control, moving
- house cleaning, commercial cleaning, remodeling, solar
- general contractor, junk removal

---

## 6. 90-day plan

| Weeks | Workstream | Actions | Done when |
|---|---|---|---|
| 1–2 | **Foundations** | Brand + domain; pricing and billing rules decided (§8); tech stack; GA4 + Search Console + call tracking; Google Business Profile (local pack shows on "X marketing agency" terms); CRM/lead routing | Form → CRM tested end to end; key events firing |
| 2–4 | **Templates** | Build the hub, child, comparison, service and guide templates with schema, breadcrumbs and pricing tables; populate per-trade data from `keyword-map.csv` | Lighthouse ≥90 on mobile; one hub signed off |
| 3–6 | **Wave 1 content** | 19 pages + `/pricing/`; LSA guide is the flagship (3,000+ words, original screenshots, cost-by-trade table) | All indexed in Search Console |
| 4–8 | **Video + community** | One YouTube video per wave-1 hub, embedded; answer in r/Roofing, r/HVAC, r/sweatystartup and Facebook contractor groups (helpful answers, no spam) | 14 videos live |
| 5–12 | **Links** | One linkable data asset: "2026 Contractor Lead Cost Report: CPC and LSA cost by trade" built from this dataset; trade-association and supplier directories; podcast guesting; expert-quote platforms (Qwoted, Featured) | 30–50 referring domains by day 90 (99 Calls has 730, 33 Mile Radius 362) |
| 7–10 | **Wave 2** | 44 pages, including tools | Indexed; internal links audited (0 orphans, each hub ≥5 inbound links) |
| 11–13 | **Review + Wave 3** | Search Console review: pages on page 2 get refreshed; start `/learn/` guides; test 5 city pages | Decision log on what to scale |

**KPIs to track** (baseline is 0 at launch):
- indexed pages
- non-brand impressions and clicks
- keywords in the top 10 / top 3
- form submits and call clicks by trade
- cost per acquired contractor
- referring domains

---

## 7. Risks

- **Fulfilment comes before marketing.** A site that sells exclusive leads needs a way to produce them: your own rank-and-rent sites, LSA/Ads management, or buying calls. If fulfilment lags, reviews will suffer fast.
- **Comparison pages must be factual.** Use competitors' published terms, date-stamp the pages, and avoid trademarked logos.
- **LSA cluster:** most of the 89K is informational, and Google's own help pages and big agencies compete. Treat it as a branding and link magnet, not quick revenue.
- **Solar** is a crowded, high-CPC lead market with heavy TCPA compliance exposure. Any SMS or call consent must be TCPA-compliant across all trades.
- **AI Overviews on 97% of results pages** will cut clicks on informational queries. Weight the plan toward commercial and transactional pages, which it already does.

---

## 8. Decisions I need from you

1. **Brand name and domain.**
2. **Offer:** exclusive pay-per-lead (like 99 Calls), pay-per-call (like Service Direct), a retainer agency (like Hook), or a hybrid? This sets the copy on `/pricing/` and every hub.
3. **Fulfilment:** how leads are produced (see §7).
4. **Tech stack.** My recommendation is **Astro or Next.js (static) on Vercel with Markdown/MDX content**: fast, cheap, and easy to generate about 55 hubs from one data file. A WordPress alternative is fine if non-developers will edit.

---

## Method and files

| File | What |
|---|---|
| `keyword-map.csv` | 1,305 keywords: volume, KD, CPC, intent, cluster, target page, results features, top 5, competitor ranks |
| `page-map.csv` | 226 candidate pages with wave, primary keyword, volume, weighted KD, ad value |
| `competitor-matrix.csv` | 12 competitors: model, pricing, contract, traffic, authority, site structure, takeaways |
| `data/cost_log.csv` | Every DataForSEO call and its cost |
| `data/raw-dataforseo.tar.gz` | Raw API responses + sitemaps (extract into `data/` to re-run scripts) |
| `scripts/` | `dfs.py` (client with $5 cap), `grid.py` (trade × modifier grid), `build_master.py`, `classify.py`, `outputs.py`, `sitemaps.py`, `serp_fetch.py` |

**DataForSEO calls made [V]:**
- Competitors Domain ×3
- Ranked Keywords ×8 (top 1,000, positions ≤20; topic-filtered for Scorpion, Hook, Jobber and WebFX)
- Keyword Overview on a 896-keyword trade × modifier grid
- Keyword Ideas ×2 (discarded: off-topic results, $0.19)
- Keyword Suggestions ×20
- Google results ×100 (standard queue, with AI Overview)
- Backlinks bulk ranks + referring domains ×15 domains

**Free sources:** competitor sitemaps (6 sites) and manual reads of pricing and offer pages (10 sites; Angi, Thumbtack, Networx and Inquirly were partly blocked).
