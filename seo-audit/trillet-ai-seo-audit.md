# Trillet.ai — SEO Audit

**Date:** July 8, 2026
**Scope:** trillet.ai (apex + www), docs.trillet.ai, blog and industry landing pages
**Prepared via:** search-intelligence analysis (see Methodology)

---

## Methodology & limitations (read this first)

This environment's outbound network policy blocks direct HTTP(S) connections to `trillet.ai` (confirmed via the egress proxy's policy log — a deliberate denial, not an error), and the Wayback Machine was unreachable. Google's PageSpeed Insights API was reachable but returned a `429` (daily quota exhausted on the shared project — no API key configured).

That means this audit does **not** include a raw HTML crawl, direct inspection of `robots.txt` / `sitemap.xml`, response headers, rendered Core Web Vitals, or schema markup validation. Instead, findings below are built from what Google has actually indexed and surfaced for the domain — page titles, indexed URL patterns, `site:` operator footprints, and third-party mentions — which is real, verifiable evidence of how the site currently appears in search, just not a full technical crawl.

Everything below is either **directly evidenced** (cited URLs/titles as Google indexes them) or explicitly flagged as **not verifiable in this session**. Nothing is fabricated — no invented DA/traffic/backlink numbers.

---

## Executive summary

| Priority | Finding |
|---|---|
| 🔴 High | Apex (`trillet.ai`) and `www.trillet.ai` are **both independently indexed** with duplicate pages (homepage, `/enterprise`, `/partners`, etc.) — classic split link-equity issue |
| 🔴 High | Tracking query parameters (`?fpc=...`) are being indexed as separate URLs on `/industries/*` pages — crawl-budget waste and duplicate-content risk |
| 🟠 Medium | Two competing pricing URLs indexed — `/pricing` and `/plans` |
| 🟠 Medium | Homepage title carries no primary commercial keyword ("AI voice agent," "AI receptionist") |
| 🟠 Medium | Many blog/comparison titles exceed ~60 characters and will truncate in SERPs |
| 🟡 Low | No indexed presence found on G2, Capterra, Trustpilot, or Product Hunt |
| 🟡 Low | Third-party aggregator data about Trillet appears polluted by name collisions with similarly named companies |
| ✅ Strength | Large, deliberate programmatic content footprint: dozens of industry landing pages + a competitor-comparison blog cluster targeting bottom-funnel "X vs Trillet" searches |

---

## 1. Technical SEO

### 1.1 Apex vs. `www` duplication — 🔴 High priority

Google has indexed the same pages under both hosts. Evidence from `site:` searches:

| Page | Indexed as apex | Indexed as `www` |
|---|---|---|
| Homepage | `https://trillet.ai/` | (title "Trillet: The Voice Operating Layer" also resolves under www) |
| Enterprise | — | `https://www.trillet.ai/enterprise` |
| Partners | — | `https://www.trillet.ai/partners` |
| Blog index | `https://trillet.ai/blogs/...` (multiple posts) | `https://www.trillet.ai/blogs` |
| Solutions | — | `https://www.trillet.ai/solutions` |

Individual blog and industry URLs were found indexed under **both** `trillet.ai/...` and `www.trillet.ai/...` in the same search session (e.g., `blogs/best-ai-receptionist-for-small-business-2026` appears as apex in one query and as `www` in another). This pattern is only safe if every non-canonical variant carries a correct 301 redirect and a self-referencing canonical tag pointing at one chosen host. I could not verify the redirect/canonical status directly (blocked from fetching headers), but dual indexation of both hosts for the *same content* is itself evidence this is not fully resolved.

**Fix:** Pick one canonical host (recommend `https://trillet.ai` since it's shorter and already used in more indexed listings), 301-redirect the other at the server/CDN level, set self-referencing canonical tags site-wide, and make sure the XML sitemap only lists the canonical host.

### 1.2 Tracking parameters getting indexed — 🔴 High priority

Two industry pages were indexed **with tracking query strings intact**:

- `https://www.trillet.ai/industries/accounting-tax-services?fpc=d3df61fc-c484-472c-8b12-1bc8c633b8c3--bWljcm9sYXVuY2g%3D`
- `https://www.trillet.ai/industries/car-detailing?fpc=d3df61fc-c484-472c-8b12-1bc8c633b8c3--dHJpc3Rhbjky`

If these `?fpc=` parameters (looks like a referral/partner-tracking token, possibly from a microlaunch or affiliate campaign) don't carry a canonical tag pointing to the clean URL, Google is crawling and indexing an unbounded number of parameter permutations of the same page — wasted crawl budget and diluted signals for the real URL.

**Fix:** Add self-referencing canonical tags on all `/industries/*` pages pointing to the parameter-free URL, and use Google Search Console's URL parameter handling (or a `Disallow` rule for the parameter pattern) as a backstop.

### 1.3 Duplicate pricing pages — 🟠 Medium priority

Both `https://trillet.ai/pricing` ("Pricing | Trillet") and `https://trillet.ai/plans` ("Plans & Pricing | Trillet") are indexed. If both are live, active, and similar in content, they compete for the same commercial-intent query ("trillet pricing") instead of consolidating authority into one page.

**Fix:** Decide which URL is canonical, 301 the other, and update all internal links (nav, footer, CTAs) to point only at the surviving URL.

### 1.4 Could not verify directly — flagged for tooling

The following require either direct site access or licensed tooling I didn't have in this session. Treat these as the immediate next audit pass:

- `robots.txt` directives and XML sitemap completeness/accuracy
- Actual canonical tag values (vs. the indexation pattern inferred above)
- Structured data / JSON-LD (Organization, Product, FAQ, BreadcrumbList schema)
- Core Web Vitals (LCP, INP, CLS) and PageSpeed/Lighthouse scores, mobile vs. desktop
- Redirect chains, 404s, and internal broken links
- Security headers, HSTS, mixed-content issues
- Exact crawl/index coverage counts in Google Search Console

Run these with: Google Search Console (coverage + Core Web Vitals field data), Screaming Frog or Sitebulb (full crawl — canonicals, redirects, schema, broken links), PageSpeed Insights with an authenticated API key or web.dev.

---

## 2. On-page SEO

**Homepage title:** *"Trillet: The Voice Operating Layer"* — this is a distinctive brand tagline but contains no head commercial term (e.g. "AI voice agent," "AI receptionist," "AI phone answering"). For a site that already ranks organically for comparison and category terms via its blog, the homepage itself is likely under-optimized for the exact terms it has the most authority to win.

**Title length:** Several blog/comparison titles run long, e.g.:
- *"AIRA vs Trillet: Which AI Receptionist Actually Handles Complex Calls? (2026)"* — well over 60 characters before the `| Trillet Blog` suffix, will truncate in Google's SERP.
- *"Phonely vs Trillet: Which AI Receptionist Should You Choose? (2026)"* — same issue.

**What's working:** Title formatting is consistent and templated (`{Page} | Trillet`, `{Post} | Trillet Blog`), which is good for brand consistency and CTR pattern recognition. The "vs" comparison naming convention is a deliberate, well-executed bottom-funnel keyword strategy (see §3.2).

**Year-stamped content** ("...for Small Business 2026," "...for Agencies 2026") is a solid freshness/CTR tactic but creates an annual maintenance obligation — these pages need a real content refresh (not just a title-year bump) each year or they'll visibly stale out and lose the freshness signal that earned the ranking.

---

## 3. Content strategy & site architecture

### 3.1 Programmatic industry pages — strength with a risk attached

Confirmed indexed pages under `/industries/*` include: plumbers, HVAC, electricians, real estate, accountants/CPAs, garage door repair, junk removal & hauling, car detailing, landscaping, wildlife removal, biohazard cleanup, therapists, and more. This is a deliberate, large-scale local/vertical SEO play — genuinely good strategy for capturing long-tail "AI answering service for [trade]" searches.

**Risk:** at this scale, templated industry pages are vulnerable to a thin/near-duplicate content pattern (same structure, swapped nouns) that search engines increasingly discount. Each page needs enough unique substance — vertical-specific call scenarios, pricing context, testimonials, or example transcripts — to justify separate indexation rather than reading as a mail-merged template.

### 3.2 Competitor-comparison blog cluster — strong demand capture, one credibility gap

Trillet runs an active cluster of "X vs Trillet" posts targeting competitor brand names directly: Phonely, AIRA, Echowin, Hey Rosie, Assistable.ai, My AI Front Desk, Bland AI. This is an effective bottom-funnel SEO tactic — it intercepts users already comparing vendors.

Notably, Trillet's own blog publishes *"Why Most Voice AI Comparison Articles Are Written by the Platforms They Recommend"* — implicitly conceding the credibility problem inherent in self-authored "vs" content. That's a real E-E-A-T tension: self-published comparisons are useful for SEO capture but read as biased to both users and Google's quality raters.

**Fix:** Pair the self-authored comparison cluster with at least one independent, third-party comparison or review (G2, a niche industry publication, YouTube reviewer) that Trillet can link to or cite — this is the credibility counterweight the content strategy is currently missing.

### 3.3 `docs.trillet.ai` on a separate subdomain

Documentation lives on a subdomain rather than a subfolder (e.g. `trillet.ai/docs`). Subdomains are treated largely as separate properties for ranking-signal consolidation purposes. If developer/API documentation is a meaningful organic entry point (it often is for dev-facing tools), consolidating under a subfolder would let that content contribute to the root domain's overall authority instead of building a second, disconnected footprint.

---

## 4. Off-page / authority & trust signals

**Review-platform presence:** No indexed presence was found on G2, Capterra, Trustpilot, or Product Hunt. For a paid SaaS product competing against Retell AI, Vapi, Bland AI, and Synthflow — all of which are actively reviewed on these platforms — this is a real gap in third-party trust signals, review-rich-snippet eligibility, and backlink sourcing.

**Existing entity footprint:** A LinkedIn company page (`linkedin.com/company/trillet-ai`) and a GitHub organization (`github.com/TrilletAI`) both exist — good foundation. Confirm both are consistently linked from the site footer/about page for entity/knowledge-graph consistency.

**Brand-name collision risk:** A third-party startup directory (startuphub.ai) currently lists "Trillet AI" with a "$388M raised" figure. That number is implausible for a company at this product/pricing stage and almost certainly reflects data conflated with similarly-named companies — "Rillet" (an AI ERP startup that raised $70M) and/or "Triller" (the social video app). This is a name-collision problem, not a Trillet-caused SEO defect, but it's worth active monitoring: inaccurate third-party data like this can leak into AI answer engines and knowledge-panel-style results and misrepresent the company. Recommend requesting a correction from the listing site.

---

## 5. Competitive landscape (context)

| Platform | Positioning |
|---|---|
| **Trillet** | Compliance-included, callback delivery, honeypot detection, native voice+SMS+WhatsApp on every plan |
| Retell AI | Inbound-focused, code-first, best-in-class latency (~600ms) |
| Vapi | Most flexible, bring-your-own ASR/LLM/TTS, longer build time |
| Bland AI | Outbound-at-scale specialist, fastest dialer |
| Synthflow | No-code visual builder, fastest time-to-first-call |

Trillet's differentiated claims (auto callback delivery, honeypot/trap-number detection, unified multi-channel context) are genuinely distinct positioning angles worth reinforcing in title tags and schema (e.g., FAQ markup answering "does Trillet support SMS and WhatsApp on every plan?").

---

## 6. Prioritized recommendations

**Do first (technical, high blast radius):**
1. Canonicalize apex vs. `www` — pick one host, 301 the other, self-referencing canonicals, update sitemap.
2. Canonicalize/strip the `?fpc=` tracking parameter from indexable `/industries/*` URLs.
3. Consolidate `/pricing` and `/plans` into one canonical URL.

**Do next (on-page):**
4. Rewrite the homepage title/meta to lead with a primary commercial keyword while keeping the brand tagline.
5. Trim comparison-post titles under ~60 characters so they stop truncating in SERPs.
6. Verify/add Organization, Product, and FAQ schema (needs direct site access to confirm current state).

**Ongoing:**
7. Get Trillet listed and actively collecting reviews on G2, Capterra, and Trustpilot.
8. Secure or link to at least one independent third-party comparison to offset the self-authored "vs" cluster.
9. Spot-check `/industries/*` pages for uniqueness/depth; add vertical-specific proof points to the thinnest ones.
10. Set an annual refresh cadence for year-stamped ("2026") content.
11. Request a correction from startuphub.ai (and any similar aggregator) on the incorrect funding figure.

**Recommended follow-up audit:** Run Google Search Console (coverage + Core Web Vitals), a full Screaming Frog/Sitebulb crawl (canonicals, redirects, schema, broken links), and an Ahrefs/Semrush backlink + keyword-ranking pull once direct site/API access is available — this session's findings are search-intelligence-based and should be cross-checked against a real crawl.
