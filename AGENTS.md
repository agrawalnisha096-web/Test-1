# AGENTS.md: handoff for `claude/trillet-seo-audit-v4wngt`

> Branch: `claude/trillet-seo-audit-v4wngt`. All work lives under `seo-audit/`.
> This file was written from the files on this branch only. The original chat session did not
> write it, so anything discussed but never saved to a file is missing. Where this file infers
> something, it says so.

## 1. Project summary

Trillet (https://trillet.ai) is a voice AI platform: AI receptionists and voice agents with
compliance (HIPAA, TCPA, ACMA, GDPR) included on every plan, sold to SMBs, agencies (white-label)
and enterprise. This branch is the **first Trillet workstream** (July 8–14, 2026): a consultant-style
SEO / AEO / GEO audit of trillet.ai, a 12-month Search Console analysis, a content revamp brief, a
consolidated master report, and then a **response memo plus a 7-day / 30-day operating plan**
written after Trillet's team reviewed and pushed back on the audit. The goal was to diagnose why the
site ranks but barely gets clicked, and to hand the client a sorted, owner-assigned plan.

Later Trillet branches build on this one and are newer. For current strategy, read those first:
- `claude/trillet-agency-seo-analysis-jb9ffo`: white-label/agency content programme (newest and largest)
- `claude/trillet-parasite-seo-strategy-5j2nvf`: SEO/GEO + distribution strategy with DataForSEO data
- `claude/trillet-about-page-research-yd7jab`: About page and off-page kit
- `trillet-case-study`: customer case study
Treat this branch as the **baseline evidence and the original plan**.

## 2. What's been done (every file, with status)

All paths are under `seo-audit/`. Listed in the order they were written.

| File | What it is | Status |
|---|---|---|
| `trillet-ai-seo-audit.md` | First audit (Jul 8): technical SEO, on-page, AEO, GEO, content, off-page, first-visitor view, competitors, 17 prioritized recommendations. Built without live crawling (network blocked), from `site:` searches and DNS. | SUPERSEDED in part. Useful for the reasoning. Some claims were later corrected (see §7). |
| `trillet-ai-content-keyword-analysis.md` | 12-month GSC analysis (Jul 7 2025 – Jul 7 2026): headline numbers, the 2026 content flood, click sources, the apex/www split proven with data, blog template breakdown, worst-CTR posts, industry page rankings, geography and devices. | FINAL (data). The "~4,000 clicks" line was later reframed (see §3). |
| `trillet-ai-content-revamp-brief.md` | Content and keyword brief: an 8-point revamp checklist, non-brand query clusters with CTR, comparison-cluster cannibalization, a per-page revamp table. | FINAL (directional). Fixes are directional, not literal rewrites. |
| `Trillet-SEO-Master-Report.pdf` | 6-page PDF that combines the three reports above into one prioritized plan (Jul 8). | FINAL for the first round. Superseded by the response and plan. |
| `Trillet-Revised-Response-and-Plan.pdf` | v1 of the response memo + 7/30-day plan (Jul 13). | OUTDATED. Kept for history. |
| `Trillet-Revised-Response-and-Plan-v2.pdf` | v2: verified findings added, four workstreams (Jul 13). | OUTDATED. |
| `Trillet-Revised-Response-and-Plan-v3.pdf` | **v3, the latest client deliverable (Jul 14).** 12 pages. Part 1: point-by-point response to 12 review comments. Part 2: 7-day plan (7D·1–7D·6). Part 3: 30-day plan in six workstreams (A–F). Part 4: trackers and seed baselines. Every action has asset, evidence, motion, mechanism, owner, dependency, success metric, window and failure condition. | **FINAL: the current plan.** |
| `trillet-ai-revised-response-memo.md` | Written (long-form) version of v3 Part 1, the response to the review, in first person. | FINAL (matches v3). |
| `trillet-task-tracker.csv` | Task tracker: ID, phase, workstream, task, owner, depends on, status, window, success metric. 17 rows (7D-1…7D-6, A1–A4, B1–B3, C1, D1, E1, F1). All "Not started". | FINAL template. Meant to be pasted into Google Sheets. |
| `trillet-metrics-tracker.csv` | Metrics tracker: KPI, scope, source, baseline, target, four update columns, linked task. 11 KPIs. | FINAL template, with a known ID mismatch (see §7). |

Not in the repo: the raw GSC export (`Pages.csv`, `Queries.csv`, `Chart.csv`, `Countries.csv`,
`Devices.csv`, `Search appearance.csv`), the two matched-window exports (Sep–Nov 2025, Mar–May 2026),
the GA4 export, and the robots.txt / sitemap / view-source captures used in v2/v3. They were supplied
in chat. Ask the user for them if you need to re-run any number.

## 3. Key findings and decisions

**The core diagnosis.** The site ranks (weighted avg position 8.5 on 1.88M impressions) but doesn't
get clicked (0.75% site CTR). 14,100 clicks in 12 months, **93.3% brand**. The blog (305 posts) holds
84% of impressions and 21% of clicks. The homepage earns 65% of clicks.

**Headline numbers (GSC, Web, Jul 2025 – Jul 2026, top-1,000-query export cap):**
- Non-brand: ~3.5% of clicks (497 of 14,100) [Verified]. The keyword analysis separately counts 584 non-brand clicks on 219,143 impressions (0.27% CTR); the gap is a difference in brand-filter definition.
- Monthly CTR fell from 9–16% (Jul–Nov 2025) to under 1% from Jan 2026, while impressions rose 8–40×. December 2025 is the turning point.
- Matched cohort (Sep–Nov 2025 vs Mar–May 2026): **93% of the blended CTR drop is composition.** 292 new pages entered at 0.20% CTR and hold 91% of impressions; pages present in both windows held CTR (3.98%→3.74%) and position (5.32→5.23). **Decision:** it's a scoped opportunity, not a site-wide snippet failure. This replaced the first audit's "relevance/snippet failure at scale" framing.
- Host split: 216 of 432 URL paths indexed on more than one host; 89.6% of impressions sit on split paths; 7 hostnames (apex, www, docs, app, security, certification, bootstrapps). Homepage: www pos 3.9 (7,863 clicks) vs apex 5.5 (1,094).
- Striking distance (non-brand, pos ~3–20): 155,009 impressions at ~0.4% CTR. At 2–2.5% that's ~3,100–3,875 clicks. **Decision:** present this as *opportunity sizing, not a forecast*. The client pushed back on the earlier "~4,000+ clicks" line.
- `/industries/plumbers`: 9,095 impressions, pos 22.3 (www 19.8 / apex 27.9).
- Query clusters: cost/pricing 49,503 impr @ 0.09% CTR; compliance 5,885 impr @ **0 clicks**; white-label/agency 16,019 @ 0.39% (best); industry 34,712 @ 0.07%; competitor 19,851 @ 0.16%; generic head terms rank on page 3–5.
- GA4 (Jun 15 – Jul 12): 562 users, key events = 0 (not configured).
- Trustpilot 4.6/5 from 20 reviews. No G2 / Capterra / Product Hunt presence.

**Decisions in the v3 plan (and why):**
1. **Canonical host = apex (`trillet.ai`); 301 www→apex, plus a GSC removal request as an accelerator.** All on-site signals (canonicals, sitemap) already declare apex and no 301 exists [Verified in v2/v3]. The removal request is temporary, so it's used alongside the 301, never instead of it.
2. **The other subdomains (docs/security/certification) go under "evaluate, then decide" (A3), not a mandate.** It's an AI-visibility judgment call. Default is to defer until apex settles.
3. **"Crawl budget" was reframed as crawl efficiency / index freshness** after the client challenged it. The site is too small for true budget limits.
4. **Meta-description truncation bug:** descriptions are cut mid-word at ~200 chars and reused in OG/Twitter tags [Verified on 1 page]. Fix: a word-boundary trim at ≤155 chars in the template. 7D·3 confirms whether it's site-wide.
5. **"Answering service" terms are treated as winnable switch-intent**, not generic head terms. This is based on the user's own experience running the same play for **Insighto.ai**. The long tail (`cheap` / `roofing` / `plumbing answering service`) already ranks on page 1. Capture it now; build toward the broad term later. Don't chase `ai answering service` head terms with more volume.
6. **AEO is test-measure-scale, not a checklist.** FAQPage rich results are now gov/health-only and HowTo is retired, so schema is for machine-readability. Run experiments (schema, answer-first, `/llms.txt`, robots tokens for PerplexityBot / ClaudeBot / OAI-SearchBot) and scale what moves AI-referral traffic.
7. **Instrument now, analyze funnels later.** Configure GA4 key events (/pricing view, /demo-en view, signup-start). Don't draw revenue conclusions from thin non-brand data.
8. **Source-of-truth register gates every claim.** Every pricing/product/compliance claim goes claim → source → approved owner. Compliance claims need legal sign-off (a hard gate). Product/docs study (7D·1) comes before any content work.
9. **Consolidate before expanding.** Merge duplicates and 301 them; no new industry pages or comparisons until the existing ones are fixed. Known duplicate clusters: profit-margins ×2, sell-ai-chatbots ×2, data-residency ×3, My-AI-Front-Desk ×3, Smith.ai ×2, Vapi ×3, the white-label pricing cluster.
10. **Lean into agency/white-label and "AI receptionist" framing, not "chatbot".** Receptionist/voice wording converts; chatbot variants don't.
11. **Rejected:** treating the 4,000-click figure as a forecast; a blended-average CTR diagnosis; mandating subdomain consolidation; a fixed AEO checklist; expanding `/industries/*` before fixing it; chasing generic head terms; incentivized reviews (against platform ToS).

**30-day workstreams (v3):** A Technical (A1 ship 301 + meta trim; A2 `?fpc=` params + bootstrapps
subdomain; A3 subdomain decision; A4 AEO experiments) · B Content revamp (B1 nine priority pages, B2
merge duplicates, B3 `/industries` vs `/blogs` overlap) · C Main pages (homepage, `/pricing` +
`/plans` consolidation, `/agency`) · D Interlinking (hub-and-spoke, ≥5 internal links per money page,
0 orphans) · E New content (cost hub, `trillet-vs-voicify` + `/compare` hub, compliance pillar) · F
Marketplace profiles (G2, Capterra/GetApp/Software Advice, TrustRadius, Product Hunt; ≥10 reviews
each on G2 and Capterra by day 30).

**B1 priority pages (pos / CTR):** `white-label-ai-profit-margins` (4.2 / 0.04%),
`comparing-no-code-phone-agents-for-outbound-calling-in-2026` (6.7 / 0.01%),
`best-voice-ai-for-contact-centers` (6.6 / 0.03%), `smith-ai-alternative-2026` (6.4 / 0.03%),
`how-to-sell-ai-chatbots-local-businesses` (6.0 / 0.24%), `white-label-ai-chatbot-pricing-comparison`
(6.0 / 0.11%), `ai-receptionist-white-label-pricing` (5.2 / 0.13%), `cheapest-ai-phone-answering-service`
(7.0 / 0.26%), `best-ai-receptionist-for-small-business-2026` (~7 / 0.23%, the highest-impression page).

## 4. Sources and methods

- **The sandbox network blocked direct crawling of trillet.ai** (proxy 403 on every non-allowlisted host; WebFetch also failed). The first audit used Google `site:` searches, Google's indexed view of each page, and **DNS lookups**: apex, www and docs all resolve to **Vercel**.
- **Trillet's own GSC export**, supplied by the user: 12 months plus two matched windows. Pages and Queries were separate reports with no join key, so query→page mappings in the brief are *topical inference*. A combined Page+Query export was requested and would make them exact.
- **v2/v3 used robots.txt, sitemap.xml, page view-source and a GA4 export**, which the user supplied. That's how rendering, canonicals, schema and the meta-truncation bug moved from unverified to verified.
- Confidence labels **VERIFIED / INFERRED / UNVERIFIED** are used on every claim. This was a direct client requirement (review point #11).
- Access posture: **read-only analysis and planning**. Scoped site changes (301, meta trim) go through the client's dev PR workflow only after repo access and sign-off.
- Didn't work: live crawling, WebFetch, and any proxy workaround (deliberately not attempted).

## 5. Preferences and conventions

- **Client-facing voice is first person, as the user** ("I'd recommend…", "from running this for Insighto.ai"). v3 was rewritten into this voice. Keep it.
- Respond to pushback **point by point**, conceding where fair and defending with data or stated experience. Say plainly when something is a judgment call.
- **Label every figure and conclusion** Verified / Inferred / Unverified, with source, date range and filters.
- Every plan action needs the full field set: asset, evidence, product motion, mechanism, owner, dependency, success metric, window, failure condition. Technical items follow **evaluate → change or pass**.
- **Owners are role placeholders** in brackets (`[Content/SEO]`, `[Dev]`, `[Web/Vercel]`, `[Analytics]`, `[Product Marketing]`, `[Compliance/Legal]`), not names.
- Deliverables: polished PDF for the client, a Markdown version alongside, CSV trackers for Google Sheets. Versioned files (`-v2`, `-v3`) rather than overwriting.
- Sizing numbers are "opportunity", never "forecast". Export caps mean non-brand figures are floors.
- The memo ends with an AI-assistance disclosure line. Keep it on client documents.

## 6. Open items and next steps (priority order)

Nothing in the plan has been executed yet (all tracker rows "Not started" as of Jul 14). Check with
the user, and against the newer Trillet branches, for what has happened since.
1. Find out how the client responded to v3, and whether repo/GA4 access and sign-off were granted.
2. 7-day items: 7D·1 product/docs capabilities reference → 7D·2 source-of-truth register → 7D·3 meta-truncation scope → 7D·4 stage 301 + meta-trim PRs → 7D·5 GA4 key events → 7D·6 merge map + interlinking audit.
3. Fix the metrics tracker's "Linked task" column to use the task tracker IDs (see §7).
4. Get a combined Page+Query GSC export to make query→page mappings exact.
5. Then the 30-day workstreams A–F as in the v3 PDF.
6. Smaller open checks from the first round: the Pakistan traffic anomaly (20% CTR, #2 country by clicks); why mobile CTR (2.03%) beats desktop (0.76%); the `/blogs/VoiceAICustomerService` non-kebab slug; ask startuphub.ai to correct the "$388M raised" figure (a name collision with Rillet/Triller); link the LinkedIn and `github.com/TrilletAI` footer profiles (the GitHub org is unverified).

## 7. Gotchas

- **The first audit has known errors.** It said there was no Trustpilot presence; Trillet has 4.6/5 from 20 reviews (corrected in the revamp brief). It treated rendering, canonicals and schema as unknowns; v3 verified them. It called the CTR drop a site-wide snippet failure; the cohort analysis showed it's composition. Prefer v3 and the memo wherever they differ.
- **"~4,000+ additional clicks"** in the keyword analysis is superseded by the 155,009-impression / 2–2.5% sizing in v3. Don't quote it as a forecast.
- **Canonical host:** the first audit leaned apex for brevity. v3 confirms apex because the site's own signals declare it, even though www currently earns more clicks. Don't reverse this without new evidence.
- **Metrics tracker IDs don't match the task tracker.** `trillet-metrics-tracker.csv` "Linked task" uses v2-era IDs (T1, CR1, CR3, CR4, NC1, D4, MP2, MP3). The task tracker uses v3 IDs (7D-1…7D-6, A1–A4, B1–B3, C1, D1, E1, F1). Rough mapping: T1→A1, CR1→B1, CR3→B3, MP2→F1, MP3→7D-5/F1.
- **Pricing figures** ($49 Basic / $99 Studio / $299 Agency; Smith.ai $95–292.50) came from early research and marketing pages, not an approved source. The newer branches have a later source of truth for pricing. Don't publish these numbers without the register.
- **Compliance claims need legal sign-off.** Never ship one without it.
- GSC Queries export is capped at 1,000 rows, so every non-brand number is a floor.
- `?fpc=` tracking URLs may carry referral attribution. Preserve the attribution while canonicalizing (A2).
- Several auto-created branches (`BB`, `claude/clean-up-hm9zbn`) point at this branch's old head commit. The user asked to leave them alone.
- The PDFs are generated outputs. Their build scripts/HTML are not on this branch, so edits mean regenerating from the Markdown.
