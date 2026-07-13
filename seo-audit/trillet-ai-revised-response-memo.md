# Re: Audit review — precision layer, now evidence-complete

Following your review, we pulled the direct sources (page HTML, robots.txt, sitemap, and two matched Search Console windows). That moves the remaining items from *inferred* to *verified*, and surfaced two concrete, high-leverage findings that weren't visible from search data alone. Below is the reconciliation, updated to what the raw evidence now proves.

Labels: **[Verified]** = confirmed from Trillet's own data/source; **[Inferred]** = reasoned from indirect evidence; **[Unverified]** = still requires access not yet granted. Source for figures: GSC export (Web; two windows, Sep 1–Nov 30 2025 and Mar 1–May 31 2026), the site's robots.txt/sitemap.xml, and page view-source.

---

### 1. Organic asset base
Trillet holds a substantial organic footprint — 432 ranking URLs, 1.88M impressions, 14,100 clicks **[Verified]**. The opportunity is converting non-brand visibility to clicks: non-brand captures 584 clicks on 219,143 impressions (0.27% CTR) **[Verified]**. The 93.3% brand share is measured on the capped top-1,000-query export and over-weights brand — so the non-brand base is *larger* than the headline implies, not smaller **[Inferred]**.

### 2. Rendering & AI-crawler access — now confirmed
The site is **server-side rendered** (Next.js; full article HTML present before JavaScript) **[Verified]**. Every page's content is readable by AI answer-engine crawlers — the earlier "client-side rendering could make Trillet invisible to GPTBot/ClaudeBot/PerplexityBot" risk is **closed**. robots.txt explicitly allows GPTBot, Google-Extended, Perplexity, CCBot, cohere-ai, Applebot, Bingbot and more, and the `*` default allows the rest **[Verified]**. Two small token cleanups (not blocking anything today, since the wildcard covers them): the crawler tokens are `PerplexityBot` and `ClaudeBot`, not `Perplexity`/`Claude-Web`.

### 3. Canonicalization — direction now settled
Every signal Trillet emits already names **apex** as canonical: robots.txt `Host: https://trillet.ai`, the sitemap lists only apex URLs, and page `rel=canonical` tags point to apex **[Verified]**. Yet GSC shows **www** ranking and taking the impressions (homepage www at position 3.9 vs apex 5.5 for identical content) **[Verified]**. The single missing piece is enforcement: there is **no 301 redirect** www→apex, so Google indexes www off link authority despite every hint. The fix is therefore low-risk — a 301 www→apex aligns reality to the intent already declared, no directional bet required. (The `Host:` directive itself is deprecated and ignored by Google; the 301 + rel=canonical are what act.)

### 4. Duplicate-signal mechanism
The operative issue across hosts and `?fpc=` parameters is **ranking-signal dilution / index hygiene**, not crawl budget (a constraint only at 10k–1M+ URL scale) **[Verified]**. The sitemap is clean (apex-only, no parameters), so the `?fpc=` variants are a runtime tracking artifact to canonicalize, not a sitemap problem **[Verified]**.

### 5. CTR trend — decomposed with matched cohorts
Running the two windows as a fixed cohort settles this precisely:

| Cohort | Sep–Nov 2025 | Mar–May 2026 |
|---|---|---|
| Blended (all pages) | 3.97% CTR / pos 5.33 | 0.52% CTR / pos 7.98 |
| **Stable pages (in both)** | 3.98% CTR / pos 5.32 | **3.74% CTR / pos 5.23** |
| New pages (Mar–May only) | — | **0.20% CTR / pos 8.26** |

The blended CTR fell 3.45 points; **93% of that is composition** — 292 new pages entered at 0.20% CTR and now hold 91% of impressions — while the **established cohort held its CTR and position** **[Verified]**. So this was never a site-wide snippet failure; the pre-flood pages are healthy. The snippet opportunity is a *scoped* set of specific well-ranked new pages (below), not the whole blog.

### 6. Click-upside — rebuilt on Trillet's own CTR curve
Trillet's actual CTR-by-position curve (Mar–May, query-level) is 29% at position 1 (brand) then **0.1–0.6% across positions 2–10** **[Verified]** — far below a normal curve, which points to intent mismatch and/or AI Overviews absorbing non-brand clicks. Scoping realistically to the ~10 pages that rank ≤10 yet sit well below even that curve, and modeling them to curve-expected CTR, yields **~113 incremental clicks/month (~1,360/year)** — smaller than the earlier 2%-benchmark figure, and defensible from Trillet's own data. Presented as a sizing scenario, not a forecast.

### 7. A verified, systematic on-page bug worth its own line
The meta description is **truncated mid-word at ~200 characters** (e.g. "…value-added **servi**"), and the same cut string is reused for the OG tag, Twitter tag, *and* the visible on-page subtitle **[Verified]**. If site-wide (very likely — it's template behaviour), **every search snippet ends mid-word**, suppressing CTR across the whole site. This is one code fix with site-wide reach — plausibly a bigger CTR lever than any individual title rewrite.

### 8. AEO / structured data
Pages carry Article + BreadcrumbList JSON-LD with a real, schema'd author (good E-E-A-T) **[Verified]**, but pages with a literal "Frequently Asked Questions" section carry **no FAQPage schema** **[Verified]** — a gap for AI parsing (rich-result value is limited post-2023, but the markup still aids answer engines). HowTo rich results are retired; effort routes elsewhere. Measurable AI surfaces: GSC Search Appearance, AI-Overview impressions folded into the aggregate, and AI-engine referrals in GA4.

### 9. Content sprawl & cannibalization — mapped from the sitemap
The sitemap (~300+ blog posts) exposes concrete near-duplicate clusters — e.g. `white-label-ai-profit-margins` **/** `-profit-margin-analysis`; `how-to-sell-ai-chatbots-local-businesses` **/** `-to-local-businesses`; a data-residency trio (`by-region` / `by-country` / `configurable-`); three My-AI-Front-Desk posts — plus a **systematic overlap** where `/industries/{trade}` competes with `/blogs/ai-answering-service-for-{trade}` and `/blogs/white-label-ai-for-{trade}` **[Verified]**. This self-competition fits the industry pages being stuck (plumbers at position 22). Consolidation is now a bigger lever than new volume.

### 10. Full-funnel measurement
GA4 + PostHog + GTM are all installed **[Verified]**. The current GA4 export (4 weeks) shows a thin funnel — 562 active users, concentrated on homepage and `/pricing` — and **Key Events = 0 on every row**, so pricing intent isn't measurable until events are configured **[Verified]**. Once configured, the join `GSC query → landing page → GA4 engaged session → /pricing & /demo-en views → signup start` goes live (payment stage deliberately Phase 2, per scope).

### 11. Trust signals
Trillet has a **Trustpilot listing (4.6/5, 20 reviews)** **[Verified]** — real proof not surfaced in on-site content. It has **no G2 / Capterra / TrustRadius / Product Hunt presence** **[Verified]** — a gap in trust signals, backlinks, review rich-snippets, and (critically) AI-answer-engine citations, since those platforms are what LLMs lean on for "best software" queries. Addressed as a dedicated workstream in the plan.

### 12. Source of truth
Every pricing/compliance/product claim currently traces to marketing surfaces **[Unverified as canonical]**. The plan gates each behind a register — *claim → source → approved owner* — with compliance routed to legal sign-off before any republication.

---

**Net:** the structural questions are answered from real evidence. The two highest-leverage, low-risk moves are now clear and concrete — **301 www→apex** and the **site-wide meta-description truncation fix** — neither of which requires a content bet. The operating plan (attached) sequences those alongside content consolidation, a small set of strategic new pieces, and the marketplace-profile workstream.

Still open, and the only things gating full execution: **GA4 Key Events configured** (for intent measurement), **named owners/approved sources** (§12), and repository access for the scoped changes through your dev PR workflow.

*Prepared with AI assistance; figures traced to the GSC export, robots.txt/sitemap, and page source, labeled by confidence. Please verify before onward use.*
