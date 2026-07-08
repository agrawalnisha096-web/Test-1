# Trillet.ai — SEO, AEO & GEO Audit

**Date:** July 8, 2026
**Scope:** trillet.ai (apex + www), docs.trillet.ai, blog and industry landing pages
**Prepared via:** search-intelligence analysis + DNS/infrastructure verification (see Methodology)

---

## Methodology & the access question (read this first)

You asked specifically why direct access was failing and whether it's a technical issue on Trillet's side. Short answer: **no — it's this sandbox, not Trillet.** Here's the proof, not just an assertion.

**Test 1 — is it trillet.ai specifically, or everything?** I ran the same request against three domains that have nothing to do with Trillet: `example.com`, `vercel.com`, and `ipinfo.io`. All three were denied identically:

```
curl: (56) CONNECT tunnel failed, response 403
```

The proxy's own diagnostic log confirmed it — every one of those hosts shows up as a `connect_rejected` policy denial, on the same timestamp, same as trillet.ai did earlier. This session's outbound network policy only allows a short allowlist of dev-infrastructure domains (npm, PyPI, GitHub, Anthropic) through — everything else, including totally unrelated sites, is blocked. This is a general property of how this Claude Code environment's network access was configured, unrelated to Trillet.ai in any way.

**Test 2 — is WebFetch (a separate, Anthropic-hosted tool) also broken?** Yes, but not because of Trillet either — it returned `403 Forbidden` on `en.wikipedia.org` too, a page that is obviously not blocking anyone. So WebFetch is non-functional in this session right now, independent of any target site.

**What did work — DNS.** DNS resolution isn't covered by the HTTPS proxy policy, so I could look up how Trillet's domains actually resolve, and this gave real, verified infrastructure data:

| Host | Resolves to | Confirms |
|---|---|---|
| `trillet.ai` | `216.150.1.1` | Consistent with Vercel's newer edge IP ranges |
| `www.trillet.ai` | CNAME → `bf25bd6b0c657998.vercel-dns-016.com` | **Vercel** hosting, confirmed by hostname |
| `docs.trillet.ai` | `76.76.21.22` | Vercel's classic anycast IP — also Vercel |

So: **the entire trillet.ai property (apex, www, and docs) is hosted on Vercel.** That's a real, useful finding in its own right (see §1.5 below) and it's independently verifiable — you don't need to take my word for it, `nslookup`/`dig` will show the same thing from any machine.

I did **not** attempt to route around this session's network policy with proxy workarounds — that's an explicit instruction I follow (report a policy denial, don't circumvent it). If you want a live crawl (robots.txt, sitemap.xml, rendered HTML, Core Web Vitals, screenshots), the fastest path is either (a) re-run this in a Claude Code environment configured with broader network access, or (b) paste the raw content of `trillet.ai/robots.txt`, `trillet.ai/sitemap.xml`, and a page-source view directly into the chat and I'll analyze it in full.

Everything below is either **directly evidenced** (cited indexed URLs/titles, or the DNS results above) or explicitly flagged as **unverified — needs direct access**. Nothing is fabricated.

---

## Executive summary

| Priority | Finding |
|---|---|
| 🔴 High | Apex (`trillet.ai`) and `www.trillet.ai` are **both independently indexed** with duplicate pages — split link-equity issue |
| 🔴 High | Tracking query parameters (`?fpc=...`) are being indexed as separate URLs on `/industries/*` pages |
| 🟠 Medium | Two competing pricing URLs indexed — `/pricing` and `/plans` |
| 🟠 Medium | Homepage title carries no primary commercial keyword ("AI voice agent," "AI receptionist") |
| 🟠 Medium | Many blog/comparison titles exceed ~60 characters and will truncate in SERPs |
| 🟠 Medium (GEO) | Entire site is Vercel-hosted; if rendering is client-side, non-browser AI crawlers (GPTBot, ClaudeBot, PerplexityBot) may see an empty page — needs direct verification |
| 🟡 Low | No indexed presence found on G2, Capterra, Trustpilot, or Product Hunt — hurts both trust and GEO citation odds |
| 🟡 Low | Zero Reddit/Quora/Hacker News discussion found — a real gap for GEO, since AI answer engines lean heavily on forum consensus |
| 🟡 Low | Third-party aggregator data about Trillet appears polluted by name collisions with similarly named companies |
| ✅ Strength | Real, independent YouTube presence (third-party creator videos, not just brand-published) |
| ✅ Strength | Large, deliberate programmatic content footprint: dozens of industry pages + a competitor-comparison blog cluster |

---

## 1. Technical SEO

### 1.1 Apex vs. `www` duplication — 🔴 High priority

Google has indexed the same pages under both hosts. Evidence from `site:` searches:

| Page | Indexed as apex | Indexed as `www` |
|---|---|---|
| Homepage | `https://trillet.ai/` | title "Trillet: The Voice Operating Layer" also resolves under www |
| Enterprise | — | `https://www.trillet.ai/enterprise` |
| Partners | — | `https://www.trillet.ai/partners` |
| Blog index | `https://trillet.ai/blogs/...` (multiple posts) | `https://www.trillet.ai/blogs` |
| Solutions | — | `https://www.trillet.ai/solutions` |

This is only safe if every non-canonical variant carries a 301 and a self-referencing canonical tag pointing at one chosen host. Dual indexation of the *same content* under both hosts is evidence this isn't fully resolved.

**Fix:** pick one canonical host (apex `trillet.ai` is shorter and shows up more often in indexed listings), 301 the other at the Vercel project's domain settings (Vercel makes this a one-toggle "redirect to primary domain" setting), set self-referencing canonicals site-wide, sitemap lists only the canonical host.

### 1.2 Tracking parameters getting indexed — 🔴 High priority

Two industry pages are indexed **with tracking query strings intact**:

- `https://www.trillet.ai/industries/accounting-tax-services?fpc=d3df61fc-c484-472c-8b12-1bc8c633b8c3--bWljcm9sYXVuY2g%3D`
- `https://www.trillet.ai/industries/car-detailing?fpc=d3df61fc-c484-472c-8b12-1bc8c633b8c3--dHJpc3Rhbjky`

Looks like a referral/microlaunch tracking token. Without a canonical tag pointing at the clean URL, Google can index an unbounded number of parameter permutations of the same page.

**Fix:** self-referencing canonicals on all `/industries/*` pages, plus GSC URL-parameter handling or a targeted `Disallow` as backstop.

### 1.3 Duplicate pricing pages — 🟠 Medium priority

Both `trillet.ai/pricing` ("Pricing | Trillet") and `trillet.ai/plans` ("Plans & Pricing | Trillet") are indexed — competing for the same commercial query instead of consolidating authority.

**Fix:** pick one, 301 the other, update every internal link to the survivor.

### 1.4 Could not verify directly — flagged for tooling

`robots.txt` / sitemap contents · actual canonical tag values · JSON-LD schema (Organization/Product/FAQ) · Core Web Vitals & Lighthouse scores · redirect chains & broken links · security headers · exact GSC coverage counts.

**How to get these yourself in under 5 minutes:** since the site is Vercel-hosted, log into the Vercel dashboard for this project → Deployments → View Source, or simply visit `trillet.ai/robots.txt` and `trillet.ai/sitemap.xml` directly in a browser and paste the contents here — I'll analyze them immediately. Alternatively, run Google Search Console (coverage + CWV field data) or a Screaming Frog crawl.

### 1.5 Hosting: fully on Vercel — 🟠 Medium priority (verify)

Apex, `www`, and `docs` all resolve to Vercel infrastructure (see Methodology table above). This matters for two concrete reasons:

1. **Domain consolidation is a Vercel dashboard setting, not custom redirect code.** Fixing §1.1 (apex/www split) should be quick — Vercel's project domain settings let you assign one "primary" domain and auto-redirect the rest.
2. **Rendering mode determines AI-crawler visibility.** If the site is a client-side-rendered Next.js app (data fetched in the browser after JS executes) rather than server-rendered/statically generated, most AI answer-engine crawlers — GPTBot, ClaudeBot, PerplexityBot, and most others — do **not** execute JavaScript. They'd receive a near-empty HTML shell and be unable to read page content at all, even if Googlebot (which does render JS) indexes the site fine. This is the single highest-leverage thing to verify for GEO (see §3). Check: view-source on a few key pages — if the meaningful text (headlines, pricing, FAQ answers) is present in the raw HTML response before JS runs, you're fine; if it only appears after client-side rendering, that's a real fix (switch to SSR/SSG for at least the primary marketing/blog/industry pages — Next.js supports this natively and it's likely already partially in place given the blog is indexed well).

---

## 2. On-page SEO

**Homepage title:** *"Trillet: The Voice Operating Layer"* — distinctive tagline, but no head commercial term ("AI voice agent," "AI receptionist," "AI phone answering"). The homepage is likely under-optimized for the exact terms the blog already has authority to win.

**Title length:** several comparison titles run long before the `| Trillet Blog` suffix even applies:
- *"AIRA vs Trillet: Which AI Receptionist Actually Handles Complex Calls? (2026)"*
- *"Phonely vs Trillet: Which AI Receptionist Should You Choose? (2026)"*

Both will truncate in the SERP.

**What's working:** titles follow a consistent template (`{Page} | Trillet`, `{Post} | Trillet Blog`) — good for brand recognition. The "vs" comparison naming convention is a deliberate, well-executed bottom-funnel keyword strategy (see §4.2). Year-stamped content ("...2026") is a solid freshness/CTR tactic, but it's a recurring obligation — real content refreshes, not just a title-year bump, or these pages visibly stale out.

---

## 3. AEO — Answer Engine Optimization (featured snippets, Google AI Overviews, People Also Ask)

AEO targets the answer boxes that sit *above* the traditional blue links — Google's AI Overviews, featured snippets, and "People Also Ask." These reward content that states a direct answer in the first 1–2 sentences, then supports it.

**What Trillet already has going for it:**
- The blog is already structured around question-shaped titles ("Which AI Receptionist Should You Choose?", "Why Most Voice AI Comparison Articles Are Written by the Platforms They Recommend") — this is the right shape for AEO, Google just needs the first paragraph under each heading to state the answer plainly before elaborating.
- Comparison tables (platform-vs-platform, pricing-vs-pricing) are exactly the format Google likes to lift directly into an AI Overview or a featured snippet — if these are marked up as real `<table>` elements (not images or divs), that's a strong AEO asset already in place.
- Concrete, specific numbers already appear in the content (e.g. "local businesses are losing $50,000+ annually to missed calls," "62% still answering calls manually") — statistics like this are exactly what gets pulled into answer boxes and cited by AI Overviews, *if* they're attributed to a checkable source. Unverified/unsourced statistics are less likely to be trusted and reused — worth confirming Trillet cites where those two numbers come from.

**Gaps to close (unverified — needs direct access to confirm current state):**
- **FAQPage schema** on pricing, industry, and comparison pages — this is the single biggest AEO lever available and I can't confirm whether it's implemented without seeing the page source.
- **HowTo schema** on the "5-minute setup" narrative — Trillet's own strongest claim ("build an agent in 5 minutes by scanning your website") is exactly the kind of step-based content HowTo markup is built for, and it's currently a differentiator that isn't obviously structured to be machine-extractable.
- **Direct-answer openers.** Confirm that comparison and "best of" posts lead with a one-sentence verdict before the explanation (e.g., "Trillet is the better choice for agencies needing white-label sub-accounts; Phonely is better for solo operators on a tight budget" as sentence one, not paragraph five) — this is what actually gets lifted into an Overview.

---

## 4. GEO — Generative Engine Optimization (ChatGPT, Perplexity, Gemini, Claude citations)

GEO is about whether an AI assistant, when asked "what's a good AI receptionist for a plumbing company" or "Trillet vs Retell AI," actually cites Trillet in its answer. This depends less on classic ranking factors and more on: can AI crawlers technically read the page, and does independent third-party content about Trillet exist for the model to draw on.

**Can AI crawlers even read the site? — flagged, needs direct verification (see §1.5).** This is the most consequential open question in this audit. If rendering is client-side, Trillet could be fully indexed by Google (which renders JS) while being functionally invisible to GPTBot, ClaudeBot, PerplexityBot, and OAI-SearchBot (which mostly don't). That would mean strong classic SEO and near-zero GEO presence simultaneously — worth checking this week, not eventually.

**`robots.txt` AI-crawler directives — unverified, could not fetch.** Modern robots.txt files increasingly carry explicit rules for `GPTBot`, `ClaudeBot`, `Google-Extended`, `PerplexityBot`, `CCBot`, `Amazonbot`, and others — some sites block training crawlers while explicitly allowing the *search/answer* variants (`OAI-SearchBot`, `Claude-SearchBot`, `PerplexityBot`) so they can still be cited without having their content used for model training. I could not read Trillet's actual `robots.txt` this session (see Methodology) — recommend checking it directly and deciding a deliberate policy rather than leaving it to defaults.

**`llms.txt` — not found.** No evidence of an `/llms.txt` file (the emerging, still-optional convention some sites use to give AI crawlers a curated, high-signal summary of the site). This is a low-cost, genuinely useful addition for a product this dependent on being accurately described by AI assistants — a short markdown file at `trillet.ai/llms.txt` summarizing what Trillet is, its pricing tiers, and its key differentiators (auto callback delivery, honeypot detection, multi-channel) would give answer engines a clean, unambiguous source instead of having to reconstruct that from marketing copy.

**Third-party citation surface — this is the real gap.**
- **Zero Reddit, Quora, or Hacker News discussion found.** AI answer engines (and increasingly Google itself, which now surfaces Reddit threads in AI search) weight forum consensus heavily for "best X for Y" queries. Right now, if someone asks ChatGPT or Perplexity "what do people on Reddit say about Trillet," there's nothing for the model to retrieve.
- **No G2, Capterra, or Trustpilot listings found** (also flagged in §5) — these aren't just trust badges, they're structured, frequently-crawled sources that GEO-focused tools and AI answer engines treat as high-authority for software comparison queries specifically.
- **YouTube presence is a genuine strength** — independent, third-party creator videos exist (e.g. "How I Build & Sell Voice AI Agents," "This Tool Builds AI Receptionists From Just a Website URL"), not just brand-published content. YouTube transcripts are a source AI answer engines do draw on. Worth actively encouraging more of this (creator seeding, affiliate/referral programs for agencies already reviewing white-label tools) since it's working and is comparatively rare for a company this size.
- **Self-authored "vs" content cuts against GEO credibility the same way it cuts against E-E-A-T** (§4.2 below) — AI answer engines increasingly discount comparison claims that only exist on the vendor's own domain.

**Practical GEO priority order:** (1) confirm AI crawlers can actually read the pages, (2) decide and publish an explicit robots.txt policy for AI bots, (3) close the third-party citation gap (reviews + forum presence) since that's the part no amount of on-site optimization can substitute for, (4) add `llms.txt` as a low-cost clarity layer once the above is settled.

---

## 5. Content strategy & site architecture

### 5.1 Programmatic industry pages — strength with a risk attached

Confirmed indexed under `/industries/*`: plumbers, HVAC, electricians, real estate, accountants/CPAs, garage door repair, junk removal, car detailing, landscaping, wildlife removal, biohazard cleanup, therapists, and more — a deliberate, large-scale vertical SEO play for long-tail "AI answering service for [trade]" searches.

**Risk:** at this scale, templated pages (same structure, swapped nouns) are vulnerable to a thin/near-duplicate pattern search engines increasingly discount, and — separately — can read as generic "doorway pages" to a human visitor who lands on one from search (see §7).

### 5.2 Competitor-comparison blog cluster — strong capture, one credibility gap

An active "X vs Trillet" cluster targets competitor brand names directly: Phonely, AIRA, Echowin, Hey Rosie, Assistable.ai, My AI Front Desk, Bland AI. Effective interception of users already comparing vendors.

Notably, Trillet's own blog publishes *"Why Most Voice AI Comparison Articles Are Written by the Platforms They Recommend"* — implicitly conceding the exact credibility problem in its own comparison content. Useful for capture, but reads as biased to both users, quality raters, and — per §4 — AI answer engines.

**Fix:** pair the self-authored cluster with at least one independent third-party comparison to link to.

### 5.3 `docs.trillet.ai` on a separate subdomain

Subdomains are largely treated as separate properties for ranking-signal consolidation. If developer documentation is a meaningful organic entry point, a subfolder (`trillet.ai/docs`) would let that content contribute to root-domain authority instead of building a second, disconnected footprint.

---

## 6. Off-page / authority & trust signals

**Review platforms:** no indexed presence found on G2, Capterra, Trustpilot, or Product Hunt. Competing platforms — Retell AI, Vapi, Bland AI, Synthflow — are actively reviewed on these. Real gap in trust signals, review-rich-snippet eligibility, backlink sourcing, and GEO citation surface (§4).

**Community discussion:** no Reddit, Quora, or Hacker News threads found discussing Trillet.

**Existing footprint:** a LinkedIn company page and a GitHub organization (`github.com/TrilletAI`) both exist — good foundation. Confirm both are linked from the site footer for entity consistency.

**Brand-name collision:** a third-party directory (startuphub.ai) lists "Trillet AI" with a "$388M raised" figure — implausible at this stage, almost certainly conflated with similarly-named companies ("Rillet," an AI ERP startup that raised $70M, and/or "Triller," the social app). Not a Trillet-caused defect, but worth monitoring — bad aggregator data can leak into AI answer engines and knowledge-panel-style results. Recommend requesting a correction.

---

## 7. From a first-time visitor's perspective

I can't render the live page in this session (see Methodology), so this section is built from the structural and messaging evidence above, not a click-through — flagged clearly, and I'd rather tell you that than fake a UX walkthrough. Three things are visible even from titles/URLs alone:

**1. The brand tagline may not orient a first-time visitor.** "The Voice Operating Layer" is memorable but abstract — it doesn't tell a plumber landing from a Google search, an agency owner, or an enterprise buyer which of those three very different offers applies to them. Combined with the homepage title carrying no commercial keyword (§2), a first-time visitor's first few seconds may be spent figuring out *what this is* before they can figure out *if it's for them*. Worth checking whether the homepage clearly branches SMB / Agency / Enterprise visitors within the first screen.

**2. Fragmented pricing is a real user-trust risk, not just a crawl-budget one.** Across `/pricing`, `/plans`, and blog mentions, figures cited include $29, $49, $99, and $299/month across different plan names (Basic, Studio, Agency) — plausible if these are genuinely different tiers, but a visitor comparing two pages that both claim to be "the" pricing page, potentially showing different numbers, will trust the site less, not more. Recommend one canonical pricing page (ties directly to the §1.3 technical fix) with every other mention linking to it rather than restating numbers.

**3. Programmatic industry pages risk feeling like doorway pages to a human, even where they help SEO.** A visitor who searches "AI answering service for wildlife removal" and lands on a templated page that reads like every other `/industries/*` page (same structure, swapped noun) may bounce faster than one who lands on a page with even one genuinely vertical-specific detail — a real example call, a relevant compliance note, a testimonial from that trade. This is the same finding as §5.1, viewed from the visitor's side instead of the crawler's: the fix (add unique per-vertical substance) solves both problems at once.

**What I'd need to go further:** a live browser session, screenshots, or a Loom/video walkthrough would let me evaluate actual navigation flow, mobile layout, load perceived speed, and CTA clarity — none of which can be responsibly assessed from titles and URLs alone. Happy to do that pass the moment either the environment's network access is broadened or you share screenshots/recordings.

---

## 8. Competitive landscape (context)

| Platform | Positioning |
|---|---|
| **Trillet** | Compliance-included, callback delivery, honeypot detection, voice+SMS+WhatsApp on every plan |
| Retell AI | Inbound-focused, code-first, best-in-class latency (~600ms) |
| Vapi | Most flexible, bring-your-own ASR/LLM/TTS, longer build time |
| Bland AI | Outbound-at-scale specialist, fastest dialer |
| Synthflow | No-code visual builder, fastest time-to-first-call |

---

## 9. Prioritized recommendations

**Do first — technical, high blast radius:**
1. Confirm whether AI crawlers can read rendered content (§1.5/§4) — the single highest-leverage unknown in this audit.
2. Canonicalize apex vs. `www` via Vercel's domain settings; 301 + self-referencing canonicals; update sitemap.
3. Canonicalize/strip the `?fpc=` tracking parameter from indexable `/industries/*` URLs.
4. Consolidate `/pricing` and `/plans` into one canonical URL.

**Do next — on-page & AEO:**
5. Rewrite the homepage title/meta to lead with a primary commercial keyword while keeping the brand tagline.
6. Trim comparison-post titles under ~60 characters.
7. Add FAQPage schema to pricing/industry/comparison pages; HowTo schema on the 5-minute setup flow.
8. Confirm comparison/best-of posts open with a one-sentence direct answer before the explanation.

**Do next — GEO:**
9. Decide and publish an explicit `robots.txt` policy for AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc.) rather than leaving it to defaults.
10. Add an `/llms.txt` summarizing the product, pricing, and differentiators.
11. Get listed and actively collecting reviews on G2, Capterra, and Trustpilot.
12. Seed genuine third-party discussion (Reddit, relevant subreddits/communities, creator videos) — the YouTube presence already shows this works.

**Ongoing:**
13. Secure or link to at least one independent third-party comparison to offset the self-authored "vs" cluster.
14. Add vertical-specific substance to the thinnest `/industries/*` pages — solves both the thin-content SEO risk and the doorway-page UX risk at once.
15. One canonical pricing page, linked everywhere else, to remove the visitor-facing number inconsistency.
16. Annual refresh cadence for year-stamped ("2026") content.
17. Request a correction from startuphub.ai (and similar aggregators) on the incorrect funding figure.

**Recommended follow-up:** Google Search Console (coverage + Core Web Vitals), a full Screaming Frog/Sitebulb crawl, an Ahrefs/Semrush backlink + keyword pull, and — critically for the GEO questions above — a direct view-source check on whether marketing/blog/industry pages render meaningful content without JavaScript.
