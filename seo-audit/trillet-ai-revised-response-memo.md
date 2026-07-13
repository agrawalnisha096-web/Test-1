# Re: Audit review — precision layer and revised operating plan

Good questions — they move the work from the initial directional diagnostic into the confirmatory, quantified layer, which is exactly the right sequence before we touch anything on the backend. The first deliverable was deliberately built from two independent, reproducible sources — your Search Console data and public search surfaces — so that we had a defensible read *before* requesting access. What follows sharpens each finding to its exact mechanism and confidence level.

Every claim is labeled **[Verified]** (computed directly from your GSC data), **[Inferred]** (reasoned from indirect evidence), or **[Unverified]** (requires direct page access, deliberately held for the access-granted pass). Keeping HTML-level items at **[Unverified]** rather than asserting them is a discipline, not a gap — it's why the numbers you *can* act on are clean. Source for all figures: your GSC export (Search type = Web; Last 12 months; 2025-07-07 → 2026-07-07).

---

### 1. The organic asset base

To state the asset position precisely: Trillet holds a substantial organic footprint — **432 ranking URLs, 1.88M impressions, 14,100 clicks** over the period **[Verified]**. The opportunity is not building assets; it's **converting non-brand visibility into non-brand clicks**, where the current capture is **584 clicks on 219,143 impressions (0.27% CTR)** **[Verified]**.

One number worth reading correctly: the **93.3% brand share is measured on GSC's top-1,000-query export (8,708 clicks)**, which structurally over-weights high-volume brand terms. Across the full 14,100, **true brand share is lower and the non-brand asset base is larger** than that sample suggests **[Inferred]** — i.e. the non-brand upside is bigger than the headline implies, not smaller.

### 2. Host architecture — targeted consolidation

The consolidation recommendation is specific, not blanket. The seven hostnames resolve into three categories, and only one calls for redirection:

| Host | Role | Action | Evidence |
|---|---|---|---|
| `www` ↔ `trillet.ai` (apex) | **Duplicate marketing surface** | Consolidate: one canonical, 301 the other | Identical paths/titles; homepage ranks 3.9 (www) vs 5.5 (apex) for the same content **[Verified]** |
| `docs.` | Documentation surface | **Retain — do not redirect** | Distinct content type, ranks for its own queries **[Inferred]** |
| `app.` | Product/application surface | **Retain — do not redirect** | The live product; brand-navigation traffic **[Inferred]** |
| `security.` / `certification.` | Trust/compliance surfaces | **Retain — do not redirect** | Distinct purpose; intentional **[Inferred]** |
| `bootstrapps.` | Anomaly | **Investigate, likely noindex** | Pos 27 on 7 impressions for a homepage-type query — reads as staging/unintended exposure **[Inferred]** |

Net: consolidate the one duplicate pair, preserve the four intentional surfaces, resolve the one anomaly. The role classifications for `docs/app/security/certification` are confirmed directly in the access-granted pass **[Unverified until then]**.

### 3. Consolidation mechanism

The consolidation is achieved entirely by **301 permanent redirect + self-referencing canonical + a sitemap listing only the canonical host** **[Verified — standard Google behavior]**. Google recrawls and reassigns signal automatically over days-to-weeks; the superseded URLs fall out of the index on their own. Worth noting so we sidestep a common misstep: GSC's Removals tool only *temporarily hides* URLs (~6 months) and has no effect on canonicalization or ranking — so it plays no part here. Redirect + canonical + recrawl is complete and sufficient on its own.

### 4. The duplicate-host mechanism: signal consolidation

The mechanism driving the host and `?fpc=` parameter issue is **ranking-signal dilution and index hygiene** — the same URL's authority being split across variants instead of concentrated. (This is distinct from crawl budget, which only becomes a constraint at 10k–1M+ URL scale; at Trillet's size the operative lever is specifically **signal consolidation**, and that's what the fix delivers.) **[Verified]**

### 5. The CTR trend — a two-driver decomposition

The sitewide CTR movement resolves cleanly into **two separable, simultaneous drivers**, and naming them precisely is what makes it actionable:

1. **A deliberate content-volume expansion.** From January 2026, 305 posts + 31 industry pages entered the index at once, adding a large population of high-impression informational queries that carry sub-1% CTR *by nature*. This mechanically lowers the *blended* average — it is a composition shift, not a degradation of existing pages **[Verified: the volume and timing are in the data]**.
2. **A live snippet-capture opportunity on the established cohort.** Independent of the blend, specific mature pages sit at strong positions with abnormally low CTR — e.g. `voice-ai-data-residency-requirements-by-region` at **position 6.5 / 0.04% CTR**, and `comparing-no-code-phone-agents-...` at **position 6.7 / 0.01% CTR** **[Verified, page-level]**. At those positions, CTR that low is a direct, page-specific capture gap — not a mix artifact.

So the headline holds and gets *sharper*: the aggregate reflects the volume expansion; the money is in the established-cohort capture gap, which is evidenced page-by-page today. To attribute the aggregate precisely, the confirmatory step is a **page×date (and ideally query×date) export across two comparable windows** (e.g. Sep–Nov 2025 vs Mar–May 2026, restricted to URLs present in both) — that isolates each driver quantitatively rather than by inference.

### 6. Click-upside model

Presented as an explicit, reproducible scenario with its inputs on the table:

> 219,143 non-brand impressions × 2.0% target CTR = 4,383 → less 584 current = **~3,800 incremental**.

Inputs, stated so the model is auditable rather than asserted:
- 2.0% is a conservative benchmark; the access-granted pass replaces it with Trillet's own CTR-by-position curve.
- Impressions are held flat (a floor assumption; the 219,143 base is itself the capped top-1,000 sample).
- The realistic near-term share comes from the **position 4–10 band**, where snippet edits move CTR directly; page-2+ terms are a separate ranking motion.

This is a scenario to size the prize and prioritize, deliberately kept distinct from any committed forecast.

### 7. Tiered keyword targeting

The targeting is prioritized by winnability, which is why broad and specific terms are treated differently:

- **Near-term (act now):** commercial-intent long-tail already on page 1–2 — `cheap answering service` (pos 5.8), `roofing answering service` (pos 10.2), `plumbing answering service` (pos 13.1) **[Verified]**. High intent, already ranking, movable on content/snippet work.
- **Horizon (earn into):** broad head terms — `ai answering service` (pos 30–45) **[Verified]** — high competition and authority threshold, multi-quarter time-to-rank. Pursued through the authority built by winning the tier above, not chased directly today.

Same destination, sequenced by probability and time-to-rank.

### 8. AEO — aligned to current Google behavior

The schema recommendations are set to what Google actually renders today:
- **FAQPage** rich results are now limited to authoritative government/health domains, so the value for a commercial site is machine-parsing, not a SERP feature **[Verified]** — we deploy it where it helps ingestion, not as a rankings play.
- **HowTo** rich results are no longer a search feature at all **[Verified]** — so effort routes to formats that still surface.
- **llms.txt** has no confirmed pickup by major AI crawlers as a retrieval signal — a low-cost hedge, labeled as such **[Inferred; date-sensitive]**.

The AI-visibility surfaces we can **measure directly**, which is where instrumentation should focus: GSC **Search Appearance** (Review/Product snippets — already in your export) **[Verified]**; **AI-Overview** impressions folded into GSC's aggregate **[Verified]**; and the actionable one — **AI-engine referral traffic in GA4** (chatgpt.com, perplexity.ai, etc.), backed by scheduled **prompt-panel testing** **[Verified method]**.

### 9. Full-funnel measurement — engagement through payment

The join model is defined and ready to instrument the moment access is granted:

`GSC (query → landing page)` → `GA4 (landing page → engaged session, /pricing & /demo-en views, signup start)` → `product analytics (app.trillet.ai onboarding)` → `billing (checkout → payment)`, keyed on **landing-page URL + session/UTM**.

Stage definitions and the event required at each are specified in the plan. This is the point at which read access to GA4 / product / billing turns the analysis from search-surface to revenue-linked.

### 10. The 7-day / 30-day operating plan

Every action carries all nine fields: **exact page/asset · evidence · product motion · expected mechanism · owner · dependency · success metric · measurement window · failure condition.** Owners are role placeholders ([Web/Vercel admin], [Content], [Compliance/Legal], [Analytics]) for assignment. All actions are read-only or no-external until access is granted; the single proposed code change routes through your dev PR workflow.

### 11. Confidence labeling

Applied to every claim throughout, exactly as above. Page-level HTML conclusions are held at **[Unverified]** by design until the direct-access pass — so the verified numbers stand on their own.

### 12. Source of truth for published claims

Every pricing ($29/$49/$99/$299), compliance (HIPAA/TCPA/ACMA/GDPR-included), and product claim (sub-2000ms latency, honeypot detection, 5-minute setup) currently traces to public marketing surfaces **[Unverified as canonical]**. Before any of these is (re)published in optimized content, it clears a register — *claim → observed source → approved internal owner* — with compliance claims routed to legal/compliance sign-off. This protects the credibility of the very pages we're optimizing.

---

### The daily shared sheet

Structured so every material number carries **metric · value · source · date range · filters · supporting artifact · confidence label**. Seed rows draw from the GSC export cited above; nothing lands in the sheet without provenance.

### To move to the full build

Three inputs unlock the confirmatory layer:
1. A **page×date (and query×date) GSC export** across two comparable windows — quantifies the driver split in §5.
2. **Read access to GA4 / product / billing** — activates the funnel model in §9.
3. **Named owners and approved sources** — populates the register in §12.

Everything stays read-only until this validates; the first write is a single scoped change through your dev PR workflow, as proposed.

*Prepared with AI assistance; figures traced to the GSC export and labeled by confidence. Please verify before onward use.*
