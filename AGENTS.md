# AGENTS.md — Handoff for the next agent (Codex)

You are picking up an **SEO + content engagement for Trillet.ai**, mid-flight. This
file is the single source of truth for continuing it. You have only the files on this
branch, no chat history, so read this first, then `seo-audit/tools/build/README-integration-pages.md`
(the reconciled-facts source of truth), then the specific deliverable you are asked to touch.

Branch: `claude/trillet-agency-seo-analysis-jb9ffo`. All work lives under `seo-audit/`.

---

## 1. Project summary
Trillet.ai is a **voice-AI platform for high-stakes, regulated phone conversations** (dentists,
clinics, law firms, trades, finance). Its market wedge is **compliance and an auditable record of
every call**, not raw features. This branch is a consultant-style **SEO/content programme for
Trillet's white-label / agency funnel**: an audit, a hub-and-spoke content cluster (blogs, a
`/whitelabel` product-page rebuild, integration pages), a redirect/consolidation map, a competitor
keyword-gap analysis, and topical cluster maps. **Goal:** rank the head term "white label voice ai"
(the `/whitelabel` hub, ~position 27), build the cluster around it, kill cannibalisation by
consolidating overlapping blogs, and grow the white-label organic funnel. **Every deliverable is a
spec (docx/xlsx/html) for a dev + content team to implement — this branch does not touch the live
site code.**

---

## 2. What's been done (file by file, with status)

**Status legend:** FINAL = reviewed/approved; DRAFT/SPEC = ready for dev/content to implement;
OLDER = produced early in the engagement, superseded in part by later decisions — read with §3 in mind.

### Blogs (copy-and-structure specs, `seo-audit/`)
- `Article-01-White-Label-Partnerships-Guide.docx` — Blog 1, "white label partnerships". **FINAL.** The one intentionally **first-person founder-narrative** piece (see voice note in §3). Needs a real founder byline before publish.
- `Article-02-White-Label-Reseller-Programs.docx` — Blog 2, "white label reseller programs". **FINAL** on content, but **still in founder "I" voice** — should be converted to team "we" for consistency (see §6).
- `Article-03-White-Label-SaaS-Platforms.docx` — Blog 3, "white label saas". **FINAL.** Named-platform listicle: 13 platforms, each with an individual profile + a 5-row spec card (Best for / Pricing / White-label / Compliance / Watch for), grouped by category, comparison table on top. Team "we" voice. Trillet facts corrected.
- `Article-04-White-Label-Tools-for-Agencies.docx` — Blog 4, "white label tools for agencies". **FINAL.** The agency **operating stack by job-to-be-done** (deliberately different from Blog 3 — see §3). 16 named tools across 6 jobs, first-party Skool-community sourcing. Team "we" voice. `Brief-01-White-Label-Partnerships-Guide.docx` is the earlier brief for Blog 1 (OLDER, reference only).

### Product / hub page
- `Trillet-Whitelabel-Hub-Rebuild.docx` — **FINAL v3 spec** for rebuilding the `/whitelabel` page as a **conversion-first product/landing page** (hero + CTA, trust strip, how-it-works 3 steps, platform showcase with PRODUCT SHOT callouts, economics, compliance edge, verticals, pricing, proof, FAQ, close). Includes head-term H1, new meta, Service+FAQ+Breadcrumb JSON-LD, internal-link map, "structure at a glance" table. Trillet facts corrected. (v1/v2 were rejected — see §3.)

### Integration pages (specs + design renders) — built by a forked session
- `Trillet-Integration-GoHighLevel.docx` (+ `-render.html`) — **SPEC + HTML render.** Priority page; it is the 301 **merge target** for the `gohighlevel-voice-ai-integration` blog. HTML render uses Trillet's **live v3 design tokens** (navy/teal), and the docx has a "Design language" section.
- `Trillet-Integration-Google-Calendar.docx` — SPEC.
- `Trillet-Integration-Cal-com.docx` — SPEC.
- `Trillet-Integration-ServiceTitan.docx` (+ `-render.html`) — SPEC + HTML render (added beyond the original 3; a home-services vertical integration).
- `Trillet-Integration-Index.docx` — SPEC for the light `/integrations` directory/index page.
- Each page is **deliberately differentiated** (unique keyword, H1, use cases, setup steps, FAQ, schema) to avoid doorway-page duplication.

### Strategy / redirect / planning
- `Trillet-WhiteLabel-Redirect-Map.xlsx` — **central artifact.** 191 white-label URLs, 3 sheets (Redirect map / Summary / Data findings), 14 columns incl. action, target, 16-mo impressions, cannibalisation overlap, live HTTP. **Note: the REDIRECT/REFRAME split in this file predates a later revision — see §3.**
- `Trillet-WhiteLabel-Implementation-Timeline.docx` — 4-week sprint plan (starts 14 Sep 2026). **OLDER:** its Wave-2 still lists the big chatbot pages as redirects; re-sync to the revised split (§3, §6).
- `Trillet-WhiteLabel-Master-Plan.docx`, `Trillet-WhiteLabel-Strategy-Plan.docx`, `Trillet-WhiteLabel-Cluster-Gap.docx` — OLDER white-label strategy docs; superseded in parts by the cluster atlas and later decisions.
- `Trillet-Snippet-Changes.xlsx` — **FINAL.** 8 title/meta edits across 7 pages (changes-only format for dev).
- `Trillet-CTR-Revamp-Worklist.docx` — Tier-A title/meta CTR revamp list. SPEC.

### Competitor & keyword analysis
- `Trillet-Competitor-Keyword-Gap.xlsx` — **FINAL.** Sheets: Summary / Trillet striking-distance (97 kw, pos 11-20) / Gap quick wins / All gaps (~3,143). Built from Semrush exports for 19 domains.
- `Trillet-Competitor-Keyword-Gap-Analysis.docx` — the write-up.
- `data-competitor-keyword-gap.csv`, `data-trillet-striking-distance.csv`, `data-competitor-cluster-matrix.json` — supporting data.

### Topical cluster maps
- `Trillet-Cluster-Atlas.docx` + `Trillet-Cluster-Atlas.html` + `cluster-atlas.html` — **FINAL.** Interactive/shareable competitor × cluster coverage atlas (also published as a claude.ai artifact).
- `Trillet-Topical-Cluster-Architecture.docx`, `Trillet-Topical-Cluster-Map.docx`, `Trillet-Sitewide-Topical-Map.docx` — cluster architecture docs (FINAL/OLDER overlap).

### Homepage (earliest work, OLDER)
- `Trillet-Homepage.docx`, `Trillet-Homepage-Copy-Deck.docx`, `Trillet-Homepage-Schema.docx`, `trillet-homepage-schema.html`, `homepage-ai-voice-agents-spec.md`.

### Audit + memos (earliest, OLDER — pre-date the "three funnels" correction in §3)
- `trillet-ai-seo-audit.md`, `trillet-ai-content-revamp-brief.md`, `trillet-ai-content-keyword-analysis.md`, `trillet-ai-revised-response-memo.md`, `trillet-metrics-tracker.csv`, `trillet-task-tracker.csv`, and the `*.pdf` reports.

### Data files (`seo-audit/`, inputs)
- `data-tierA_page_queries.csv`, `data-tierA_summary.csv`, `data-money_term_pages.csv`, `data-live_status.csv`, `data-canonical_robots_check.csv`, `gsc_overlap_results.csv` — GSC-derived.

### Build harness (`seo-audit/tools/build/`)
- `README-integration-pages.md` — **READ THIS: reconciled-facts source of truth + integration-page brief.**
- `int-helpers.js`, `product-page-helpers.example.js` — integration/product-page docx + HTML render helpers (incl. `shot()`).
- `listicle-helpers.example.js` — blog helpers (`spec()`, `table()`, `name()`, `ans()`, `facts()`).
- `page-gohighlevel.js`, `page-google-calendar.js`, `page-cal-com.js`, `page-servicetitan.js`, `page-index.js` — the integration-page build scripts.
- `package.json` — docx-js dependency. Run `npm install` in this dir before building.

> The blog/hub build scripts (`build_article*.js`, `build_wlhub_v3.js`) were authored in a
> session scratchpad and are **not committed**. Re-generate any docx from its committed content
> using the committed helper patterns if you need to rebuild; do not assume the build scripts exist.

---

## 3. Key findings and decisions (with WHY, and rejected options)

**The site is three funnels, not one.** SMB AI-receptionist (~127k impressions, the biggest),
white-label/agency (~16k), and enterprise. Early docs framed everything as white-label; that was
corrected. This branch works the **white-label funnel**.

**Head term & hub.** "white label voice ai" (~pos 27). Hub page = `/whitelabel`. The cluster's
spokes (blogs) link up to it; it links down to money/vertical pages.

**Keyword gap.** Trillet ranks ~598 US keywords vs answerconnect ~7,397 and smith.ai ~14,576. The
biggest gap is the SMB answering-service cluster. **97 striking-distance keywords** (pos 11-20) are
the cheapest wins (in the gap xlsx).

**Redirect map — IMPORTANT revision (not fully reflected in the xlsx/timeline yet).**
- Original summary: KEEP 145, CANONICAL 13, MERGE 14, **REDIRECT 8, REFRAME 2**, REVAMP 2, NEW 6, DONE 1.
- **Revised to: REDIRECT 5, REFRAME 3** (MERGE stays 14). WHY: three chatbot blogs rank on page 1
  with big impressions — `best-white-label-ai-chatbot-for-agencies-2026` (44,467 impr, pos 6.3),
  `what-is-white-label-ai-chatbot` (17,258, pos 17.8), `white-label-ai-chatbot-pricing-comparison`
  (14,823, pos 4.9). **Rule: never 301 a page ranking pos ≤10 (or ≥~5k impressions) to an
  off-intent target — Google treats it as a soft-404 and drops the ranking.** So these 3 are
  **REFRAMED in place** (keep the URL, pivot the content to "chatbot vs voice, why voice wins",
  internal-link to the voice canonical), not redirected. Rejected option: the original blanket
  chatbot→voice 301 (would have thrown away the best-ranking pages).
- **The 19 URLs that change** = 5 redirects + 14 merges (reframes keep their URLs). Full list with
  targets and per-URL GSC data is in `Trillet-WhiteLabel-Redirect-Map.xlsx`.
- **Survivor decision** for one merge: `white-label-voice-ai-wrappers-vs-native-platforms`
  (13 queries) vs target `voice-ai-wrapper-vs-native-platform` (2 queries). Decision: the target is
  the single canonical (it is also MERGE #14's target); **migrate the source's winning content onto
  it, then 301 the source in.** No "confirm later" — this is decided.

**Voice decisions (a user priority, corrected several times).**
- **Product/landing pages (e.g. `/whitelabel`) = second person, outcome-led, conversion-first. No
  founder "I", no teaching essays.** WHY: the v1/v2 hub drafts were rejected as "too blog-like,
  too much information, product invisible, doesn't inspire the transaction." v3 was rebuilt against
  what actually ranks/converts for the term (Vapify, Autocalls, byVoice) and Trillet's own homepage
  voice. Rejected: founder-story hero, a generic buyer's teaching checklist as a body section.
- **Blogs / roundups = team "we" voice** (not founder singular "I"). WHY: "we" scales across many
  posts and multiple writers, matches the product-page voice, and avoids the fiction of a single
  named founder narrating every listicle. Rejected: singular "I" as the default (kept only for the
  one signed narrative piece, Blog 1).
- **First-party sourcing / E-E-A-T:** Trillet **builds white-label voice AI AND runs a community of
  agency founders on Skool.** Blogs cite this as the sourcing method ("what founders in our
  community actually run"). This is real and approved. **Never fabricate specific client quotes,
  names or stats** — general community sentiment is fine; specifics must be user-supplied.
- **Blog 3 vs Blog 4 differentiation** (to avoid cannibalisation, both are agency-tool listicles):
  Blog 3 answers "what to **resell** for revenue" (products, ranked); Blog 4 answers "what's my
  operating **stack**, by function". Overlapping jobs in Blog 4 are kept short and cross-linked to
  Blog 3; unique jobs (client portal/PM/billing, communication/voice) carry the weight.

**Meta / snippet findings.** The metas are largely high quality; the "missing title tag P0" was a
**curl render artifact** (pages render titles client-side; curl caught inconsistent snapshots), not
a real emergency. Only `/whitelabel`'s meta genuinely needed a change (was 186 chars). Snippet
changes = 8 edits (in the xlsx). **Evergreen slugs: year in the title only, never in the slug.**

**Technical/structural.** AI crawlers are allowed (GPTBot, ClaudeBot, PerplexityBot,
Google-Extended) — GEO is fine. `/security` and `/compare` return 404 (structural gaps worth
filling). Design language for renders uses Trillet's **live v3 tokens** (navy/teal), not the
report palette.

**CORRECTED Trillet facts (verified against trillet.ai/whitelabel + /pricing, 26 Sep 2026).**
Earlier docs carried stale figures; these were fixed across Blog 3, Blog 4 and the hub. **Use these,
and re-verify before publish (terms move):**
- Usage **$0.12/min** (covers platform, STT, LLM, TTS). Telephony separate: US Trillet from
  **$0.014/min**; web calls no telephony fee.
- **Studio $99/mo** — up to 3 workspaces, **1,000** included min, 3 numbers.
- **Agency $299/mo** — unlimited workspaces, **3,000** included min, 10 numbers, own domain +
  branded emails, set your own client rates.
- White-label plans: **7-day free trial, no contracts, no setup fees.**
- Compliance on every plan: **SOC 2 Type II, ISO 27001, HIPAA, GDPR, ACMA, TCPA, AU data
  residency**, with audit trails + call recordings/transcripts.
- **Carrier-level call forwarding (~30s, no number porting).**
- Proof: **3,900+ businesses, 4.6 on Trustpilot, "Proudly Australian owned".**
- **STALE figures that were WRONG and are now fixed — do NOT reintroduce:** 100/300 included
  minutes (→ 1,000/3,000); "28-day money-back guarantee" on white-label (→ 7-day free trial; the
  28-day guarantee belongs to the separate **$49/mo AI Receptionist** plan: 150 min, $0.20
  overage); "1,200+ businesses" (→ 3,900+).

**Competitor facts (verified Sep 2026, used in Blogs 3 & 4).** GoHighLevel: SOC 2 Type II, HIPAA a
paid add-on (~$297/mo)+BAA, plans $97/$297(white-label)/$497(SaaS). Vendasta: SOC 2 Type II,
$99/$499/$999 marketplace-offset model. Synthflow: SOC2/HIPAA/GDPR/ISO, white-label is
enterprise-tier (~$2,000/mo PAYG or ~$30k/yr), ~$0.15-0.24/min. VoiceAIWrapper: SOC2/GDPR/HIPAA
(BAA on Pro), from $29, wraps Vapi/Retell/ElevenLabs. Stammer: **GDPR only, no HIPAA**, ~$197/mo,
$0.11-0.17/min. Autocalls: ~$0.09/min, white-label ~$419/mo, unlimited sub-accounts, multi-channel.
Duda: White Label $149/mo. Simvoly: white-label from ~$59/mo. SE Ranking: Core ~$129 + Agency Pack
~$69 for white-label. AgencyAnalytics: from ~$59, full white-label from Agency (~$179-239), ~$12-14/
client. DashThis: Professional $139 = white-label. Sendible: white-label from ~$299. SocialPilot:
white-label from ~$100. SuperOkay: Solo+ ~$29. ManyRequests: $29/$59/$99. SPP (Service Provider
Pro): custom. TextUs: white-label/OEM SMS.

---

## 4. Sources and methods
- **Google Search Console** 16-month export (Queries ~1,040 rows) → `data-tierA_*.csv`,
  `gsc_overlap_results.csv`.
- **Semrush** organic Positions exports for 19 domains (incl. trillet.ai) → competitor keyword-gap
  xlsx/csv + striking-distance.
- **Live site**: `sitemap.xml` (~488 URLs, ~422 blogs), `trillet.ai/whitelabel`, `/pricing`,
  homepage — fetched via curl + Python HTML parsing and via WebFetch.
- **WebSearch / WebFetch** for competitor pricing/compliance (Sep 2026), each fact verified before
  inclusion.
- **Tooling**: docx-js (Node) for `.docx`; openpyxl (Python) for `.xlsx`; standalone HTML for
  shareable/interactive renders. Build scripts + helpers in `seo-audit/tools/build/`.
- **What did not work / pitfalls learned**:
  - `curl` on client-side-rendered pages returns inconsistent/missing `<title>`/meta — do not treat
    a curl snapshot as ground truth (caused a false "missing title" P0).
  - docx-js `columnSpan` cells are **silently dropped by some Word viewers** (figures vanish) — use
    the stacked full-width / bordered box-table pattern in the helpers instead.
  - Trillet pricing had drifted between an early scrape and the live site — always re-verify against
    `/whitelabel` and `/pricing`.

---

## 5. Preferences and conventions (how the user likes it)
- **Deliverable formats**: Word `.docx` for documents, `.xlsx` for sheets, standalone `.html` for
  shareable/interactive pieces and design renders. These are **specs for a dev + content team**, not
  live code.
- **Tone**: Trillet brand voice — plain, confident, outcome-led; lead with the compliance/audit
  wedge; **Australian spelling**; **zero em-dashes** (hard rule — verify every build); no hype, no
  "AI fingerprints". Product pages = second person; blogs/roundups = team "we".
- **Content conventions**: name the actual companies and give each an **individual profile + spec
  card** (never bunch into category one-liners); include a comparison table; an **AEO "short answer"
  block**; **question-format FAQ**; **JSON-LD** (Article / FAQPage / ItemList / Service /
  BreadcrumbList as fits); **evergreen slug (year in title only)**; verify every external fact and
  put it in as fact (no hedge/caveat language in final copy — "check, then include"); cite
  first-party experience (Skool community) honestly, never invent quotes/stats.
- **Things the user explicitly corrected** (do not repeat): don't confuse the dev with "what we're
  keeping" — give only the changes; don't 301 page-1 rankings to off-intent targets; a product page
  must inspire the transaction, not read like an essay; name the companies, don't bunch them; make
  profiles valuable, not thin; use "we" not "I" for roundups; surface the delivered file itself
  (SendUserFile), not just the commit.
- **Git**: commit with a clear message; **push to this branch**; **do NOT open a PR unless asked.**
  Commits in this engagement carried a Claude attribution footer (Co-Authored-By + a session link);
  use your own host's attribution convention going forward. Do not put model identifiers in code,
  docs, commit messages or artifacts.

---

## 6. Open items and next steps (priority order)
1. **Blog 5 — "Best AI White-Label Services to Resell 2026"** (kw "ai white label services") and
   **Blog 6 — "Best White-Label Digital Products"** (kw "white label digital products"). Week-3 gap
   blogs, **not started.** Build in "we" voice, named + individually profiled items, verified facts,
   AEO block + FAQ + schema, and **differentiate from Blogs 2/3/4** (state the distinct angle first,
   as was done for Blog 4).
2. **Convert Blog 2 to "we" voice** (it is still founder "I") for consistency with Blogs 3/4.
3. **Execute the redirect/consolidation waves** per `Trillet-WhiteLabel-Redirect-Map.xlsx` using the
   **revised split: 5 redirects + 3 reframes + 14 merges** (§3). Reframe the 3 big chatbot pages in
   place; build `/integrations/gohighlevel` before merging `gohighlevel-voice-ai-integration` into it
   (the page spec exists). Fire in gated waves (dead/low-traffic first).
4. **Re-sync `Trillet-WhiteLabel-Implementation-Timeline.docx`** and the redirect-map REDIRECT/
   REFRAME counts to the revised split (they predate the revision).
5. **Implement the `/whitelabel` v3 product page** (`Trillet-Whitelabel-Hub-Rebuild.docx`): dev to
   build; needs **real testimonials** (do not invent) and **server-side rendering of the H1 + FAQ**
   or the head term will not rank.
6. **Apply the 8 snippet/meta edits** (`Trillet-Snippet-Changes.xlsx`).
7. **Build the striking-distance content worklist** (97 kw in the gap xlsx) — not started.
8. **`/security` and `/compare` hub specs** (currently 404) — not started.
9. **Real author byline** on every blog before publish (schema uses a `<real founder>` placeholder).
10. Remaining native **integration pages** beyond GoHighLevel/Google Calendar/Cal.com/ServiceTitan/
    Index, if desired — keep each genuinely differentiated (no doorway pages).

---

## 7. Gotchas
- **Trillet facts drift.** Earlier docs said 100/300 minutes, "28-day money-back", "1,200+
  businesses" — all wrong, now fixed. The corrected numbers are in §3 and in
  `seo-audit/tools/build/README-integration-pages.md` ("Reconciled Trillet facts"), which is the
  source of truth. Re-verify against `trillet.ai/whitelabel` + `/pricing` before publishing; terms
  change.
- **28-day money-back ≠ white-label.** It is the separate **$49/mo AI Receptionist** plan.
  White-label = **7-day free trial**.
- **Zero em-dashes** is a hard rule. After building any `.docx`, verify: unzip it and confirm the
  count of `—` in `word/document.xml` is 0.
- **docx-js `columnSpan` cells silently vanish** in some Word viewers. Use the stacked/bordered
  table pattern already in the helpers.
- **Never 301 a page-1 ranking (pos ≤10, or ≥~5k impressions) to an off-intent target** — reframe
  in place instead (soft-404 risk).
- **Blog 3 vs Blog 4 must stay distinct** (resell-products vs operating-stack). Any new blog must
  declare its distinct angle up front.
- **Two helper sets** live in `seo-audit/tools/build/`: blog/listicle (`listicle-helpers.example.js`)
  and integration/product-page (`int-helpers.js`, `product-page-helpers.example.js`). `npm install`
  in that dir (docx-js) before building.
- **The blog/hub build scripts are not committed** (only integration `page-*.js` are). Rebuild from
  committed content + helpers if needed.
- **This branch is pushed to by more than one agent.** Always `git pull --rebase` before pushing.
- **If the PR for this branch has already been merged**, do not stack new commits on merged history —
  restart the branch from the latest default branch per repo policy, then continue.
- These are **specs, not the live site.** Do not assume a change is live because the doc exists.
