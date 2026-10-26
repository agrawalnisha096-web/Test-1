# SoluLab.com: AI Visibility Audit (AEO / GEO)

**Date:** October 26, 2026
**Companion to:** `solulab-seo-audit.md`. This document expands that audit's §6. Read the main audit first for crawl-wide issues such as redirects, broken links and performance.
**Question answered:** When someone asks ChatGPT, Perplexity, Gemini, Copilot or Google AI Overviews/AI Mode for an AI or blockchain development partner, or asks a question SoluLab writes about, can those systems **reach**, **read**, **trust** and **cite** solulab.com? And what's in the way?

---

## 0. How this was measured

| Layer | Method | Sample |
|---|---|---|
| Access | robots.txt review. Fetched pages as Googlebot, Bingbot, GPTBot, ClaudeBot, PerplexityBot and CCBot. | Site-wide |
| Discovery | Bing verification, sitemap, stale-URL behaviour. Looked at how solulab.com URLs appear in a third-party search index (the one behind this session's web search tool, which isn't Google). | Site-wide + 7 queries |
| Extraction | Raw HTML (no JavaScript) for each page: byte offset of the H1, `<head>` size, words of menu text before the H1, semantic landmarks, HTML size. Playwright render on 2 pages to compare. | **929 pages**: all 274 service/other pages, all 128 case studies, and 527 posts sampled in proportion to publish year |
| Content citability | Answer-first opening, Key Takeaways box, question-style H2s, lists and tables, statistics, outbound citations (authoritative domains flagged), first-hand experience language, links to case studies, company claims. | Same 929 pages; manual checks on 25 posts |
| Entity and reputation | Organization schema, `sameAs`, on-site fact consistency, third-party profiles, and whether SoluLab appears in third-party results for 7 buyer-intent searches. | 7 searches |

**Labels:** **[Verified]** means measured directly. **[Inferred]** means a reasoned conclusion. **[Unverified]** means it needs data I don't have.

**What this audit could not see:**
- I didn't query ChatGPT, Perplexity or Gemini directly, so **share-of-voice inside AI answers isn't measured here.**
- I had no server logs, so actual AI-bot crawl volume is unknown.
- The third-party search results are a proxy for what retrieval systems can find. They aren't Google rankings.

§6 gives the prompt panel to set up a real baseline.

---

## 1. Summary scorecard

| Layer | What AI systems need | SoluLab today | Grade |
|---|---|---|---|
| **1. Access** | Bots allowed, not blocked by the CDN | robots.txt explicitly allows 13 AI user agents. All UA tests returned 200. | 🟢 Strong |
| **2. Discovery and freshness** | Indexed in Google *and* Bing, stale URLs cleaned up, visible updated dates | Bing verified. But third-party indexes still hold stale or noindexed SoluLab URLs, some labelled "Talk to an Expert". `/lgxcarousel/` 404s are blocked from recrawl. The modified date isn't shown on posts. | 🟠 Needs work |
| **3. Extraction** | Main content early in the HTML, lean documents, clean landmarks | H1 sits **66–78% of the way into the HTML**, after ~813 words of mega-menu text. Some documents are 2–8 MB. Service and case-study pages have no `<main>`. | 🟠 Needs work |
| **4. Understanding (entity)** | One consistent set of company facts everywhere | On-site claims conflict (1,500+ vs 500+ vs 150+ projects; "US-based" vs an Indian HQ in schema). Off-site headcount ranges from 50 to 250+. Duplicate directory profiles. No Wikipedia, Wikidata, Crunchbase or G2 entry found. | 🔴 Weak |
| **5. Citability (content)** | Direct answers, verifiable data, first-hand evidence | 2026 posts have the right *skeleton*: a Key Takeaways box on 92%, and 53% question-style H2s. But openings are hooks, not answers. The median post has **0** percentage statistics. 82% have no first-hand experience language. Only 29% cite an authoritative source. | 🟠 Mixed |
| **6. Corroboration (off-site)** | Independent sources that mention and recommend the brand | Clutch 4.9. Appears in some third-party "top" lists (blockchain, stablecoin). Absent from sampled third-party results for RWA tokenization and AI agents, where competitors fill syndicated listicles. Glassdoor 3.3 from 163 reviews. No Reddit footprint found. | 🟠 Needs work |
| **7. Measurement** | AI referral tracking and a prompt panel | No evidence of either. | 🔴 Missing |

**Bottom line:** the technical door is open. The robots policy, `llms.txt` and server-side rendering are all done right. Visibility is held back further up the stack:
- AI systems get **mixed signals about who SoluLab is.**
- They find **few verifiable facts** to quote in the content.
- **Third-party corroboration** is thin exactly where buyers ask.

These are content and PR fixes more than engineering fixes, and most cost little.

---

## 2. How AI answers pick sources

This explains why each finding below matters.

1. **Crawl and index.**
   - Google AI Overviews and AI Mode draw on Google's index.
   - ChatGPT search relies heavily on Bing plus OpenAI's own OAI-SearchBot.
   - Perplexity uses PerplexityBot plus third-party indexes.
   - Copilot uses Bing.
   - If a page isn't indexed (or is indexed stale) in **both** Google and Bing, it's invisible to some engines.
2. **Live fetch.** Some answers fetch the page at question time (ChatGPT-User, Perplexity-User, Claude-User). These fetchers have short timeouts and token budgets, and they **don't run JavaScript**.
3. **Extraction and chunking.** The fetched HTML is converted to text and split into passages. Passages that state a self-contained answer, with a number, a definition or a named source, are the ones that get selected.
4. **Trust and selection.** Engines prefer sources that are consistent, corroborated by independent sites, and specific.
5. **Model memory.** For brand questions ("Is SoluLab good?", "Who are the top tokenization firms?"), the model's background knowledge comes from training data: directories, reviews, Wikipedia/Wikidata, news, forums. Inconsistent facts there become inconsistent answers.

---

## 3. Technical findings

### 3.1 Access ✅ [Verified]

- robots.txt has a dedicated block allowing GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, Claude-User, Claude-SearchBot, PerplexityBot, Perplexity-User, Google-Extended, GoogleOther, Applebot-Extended, Amazonbot and CCBot. It applies the same parameter and junk-URL exclusions as for `*`. This is the right policy for a services firm that wants to be cited.
- Requests with each bot's user agent returned HTTP 200 with the full ~495 KB page, and no Cloudflare challenge. So there's **no user-agent-based blocking**.
- **[Unverified] Cloudflare bot rules for real bot IPs.** Cloudflare's AI Crawl Control, "Block AI bots" and AI Labyrinth act on *verified* bot traffic, which a test from a datacenter IP can't trigger. Check two things:
  1. Cloudflare dashboard → Security / AI Crawl Control: confirm the AI crawlers are set to **Allow**.
  2. Server or Cloudflare logs for the last 30 days: confirm GPTBot, OAI-SearchBot, PerplexityBot and ClaudeBot hits return 200, not 403 or 429.

### 3.2 Discovery, stale index entries and freshness

**a) Stale SoluLab URLs in third-party indexes** [Verified that they're shown; Inferred cause]

In the 7 buyer-intent searches, the search index used by this session showed SoluLab URLs like these:

| URL shown | Title shown | Status today |
|---|---|---|
| `solulab.com/tag/top-10-blockchain-platforms` | "Talk to an Expert" | 200, `noindex` |
| `solulab.com/tag/asset-tokenization-companies` | "Talk to an Expert" | 200, `noindex` |
| `solulab.com/top-asset-tokenization-development-companies/` | "Talk to an Expert" | 200. The real title is "Top 10 Real World Asset (RWA) Tokenization Companies". |
| `solulab.com/client-testimonial` | "Talk to an Expert" | 200 |
| `solulab.com/?p=74950` | "Top 10 Asset Tokenization Development Companies in 2025" | 301 → the post (a 2025 title is still cached) |
| `solulab.com/lgxcarousel/chris-mills-7/`, `/lgxcarousel/page/20` | Testimonial-carousel items | **404, but blocked in robots.txt** |

The current HTML and the JavaScript-rendered DOM no longer contain "Talk to an Expert" (checked with Playwright). So these are **stale snapshots** from an older template, where a CTA heading was apparently taken as the page title.

The `/lgxcarousel/` case is self-inflicted. robots.txt `Disallow: /lgxcarousel/` stops crawlers from re-fetching those URLs. They can never see the 404, so the indexed entries persist. The same logic applies to any URL that's both noindexed and disallowed.

**Fix:**
1. Remove `Disallow: /lgxcarousel/` so crawlers can see the 404. Better still, return **410** for that path.
2. Submit the sitemap index in **Bing Webmaster Tools**. The `msvalidate.01` tag is present, so the site is verified. Then use URL Submission or IndexNow for the top ~200 commercial URLs to force a refresh.
3. Confirm Yoast Premium's **IndexNow** integration is on, so every update pings Bing, Yandex, Seznam and Naver within minutes. [Unverified whether it's enabled.] This matters more than usual because ChatGPT search and Copilot lean on Bing's index.
4. Recheck the tag-page snapshots after 30 days. If they persist, use Bing's "Block URLs" tool for `/tag/` and `/lgxcarousel/`.

**b) Freshness signals** [Verified]

- Posts **show the published date** (24 of 25 sampled) but **not the modified date** (1 of 25). Meanwhile, `article:modified_time`, the sitemap `lastmod` and BlogPosting `dateModified` all claim recent updates. For example, `/top-blockchain-development-companies/` shows "March 10, 2026" while its metadata says it was modified September 15, 2026.
- AI engines heavily prefer recent sources for fast-moving topics (stablecoin rules, RWA, agent frameworks). A visible "Updated October 2026" line beside a substantively updated page is a direct, cheap freshness signal for live fetchers.
- **Fix:** show "Updated on {date}" when a post has had a substantive edit, controlled by an editor checkbox so cosmetic re-saves don't trigger it. Keep the `lastmod` honest, as in main audit §2.5.

### 3.3 Extraction: what an AI fetcher actually reads [Verified]

| Metric (median) | Posts (527) | Service pages (274) | Case studies (128) |
|---|---|---|---|
| HTML size | 412 KB | 448 KB | 400 KB |
| `<head>` size | 81 KB | 66 KB | 65 KB |
| **H1 position in the HTML** | **300 KB (73% of the document)** | 302 KB (66%) | 316 KB (78%) |
| **Menu and other text before the H1** | **817 words** | 813 words | 813 words |
| Share of all page text that comes before the H1 | 24% | 27% | **49%** |
| `<main>` landmark | ✅ present | ❌ missing | ❌ missing |

Every page's text output starts the same way:

> "Skip to content About Us Our Services Blockchain Web3 Solutions AI & ML Generative AI Software Development RWA Tokenization Cryptocurrency Solutions White Label Solutions Neo Banking Blockchain Blockchain Development Blockchain Consulting…"

That continues for ~810 words before the page's own topic appears.

**Why it matters:**
- Extractors that respect `<header>` and `<nav>` (Readability-style; Google's) strip this correctly. The menu *is* wrapped in `<header>`/`<nav>`, leaving only 5 words before the H1.
- Simpler HTML-to-text pipelines used by some live fetchers and RAG tools don't strip it. Under a token budget they spend it on menu text, and on case studies half the page text is menu.
- On the 2–8 MB pages (main audit §2.8), a byte or token cap can cut off the FAQ and conclusion entirely. [Inferred]

**Fix ([Dev], low risk):**
1. **Add `<main>` around the primary content** on the service-page and case-study templates. Posts already have it. Also add `<article>` on case studies. This is a one-line template change that helps every extractor.
2. **Slim the mega-menu.** 147 sitewide links, ~800 words, and inline SVG icons for every item. Keep the top-level categories and hub links in the HTML. Load the deep third-level lists with a lightweight `<details>` pattern or a CSS-only flyout that uses plain text with no inline SVGs. Don't move it to client-side JavaScript, because that would hide internal links from crawlers.
3. **Shrink `<head>`.** 65–93 KB of inline CSS, JS and JSON comes before any content. Move the critical-CSS remainder and the inline scripts into cached external files.
4. **Remove base64 images inside inline SVGs.** See main audit §2.8.

### 3.4 Structured data, read through an AI lens [Verified]

| Item | Status | Action |
|---|---|---|
| FAQ answers in schema vs on the page | ✅ 132 of 132 sampled answers are visible on the page | Keep. Don't add schema-only Q&A. |
| BlogPosting `author` | Points to `/author/<name>/`, which is **noindex** | Make the author pages indexable. Add `author.sameAs` (LinkedIn) and `jobTitle`, plus `knowsAbout` on the Person. |
| Organization `sameAs` | LinkedIn, X, Facebook, Instagram, YouTube, Medium, Clutch, GitHub | Add Crunchbase, GoodFirms, DesignRush and Built In, plus Wikidata once an item exists (§4.3). Fix the regional LinkedIn URL (`in.linkedin.com` → `www.linkedin.com`). |
| Organization facts | `foundingDate` 2014 and founders present. No `numberOfEmployees`, `award`, `knowsAbout`, `hasCredential` or `iso6523Code`. | Add them, with values that match §4.1's canonical fact sheet. Mark up ISO 9001, SOC 2 and CMMI as `hasCredential` only if the certificates are current and linkable. |
| Self-serving `AggregateRating` on 1,877 pages | ❌ | Remove (main audit §4). AI engines and Google both discount ratings a company gives itself. Point to Clutch instead. |
| Case-study markup | Mostly none | `Article` with `about` (the service), `mentions` (the client Organization) and a measurable result in the description. |

### 3.5 llms.txt [Verified]

| Check | Result |
|---|---|
| Present | ✅ `/llms.txt`, 195 lines, 121 links, 20 sections |
| Links that redirect | ❌ 10 of 121 (the same stale menu URLs, plus `/about-us` without a trailing slash) |
| Content types covered | Service pages only. **0 case studies, 0 guides, 0 research or data pages, 0 pricing or engagement-model pages** |
| `llms-full.txt` | 404 |

**A realistic view:** no major AI engine has confirmed that it uses `llms.txt` for ranking or retrieval. It's cheap to maintain and some agent tools read it, so keep it accurate. But don't expect it to move visibility by itself.

**Fix:**
1. Point every link at its final URL.
2. Add "Case studies" (the 15 strongest, with outcome numbers), "Guides" (the 15 best evergreen explainers) and "Company facts" (the canonical fact sheet from §4.1).

### 3.6 Live-fetch performance [Verified / Inferred]

- Median TTFB is 0.42 s and HTML isn't edge-cached (main audit §2.7). That's fine for live fetchers today.
- The risk is document weight. 60 pages have over 1 MB of HTML, including `/generative-ai-development-company/` (3.3 MB) and `/asset-tokenization-development-company/` (1.4 MB). These are exactly the pages you'd want quoted for "Gen AI development company" and "RWA tokenization company" prompts. [Inferred]

---

## 4. Content findings

### 4.1 Entity consistency: SoluLab describes itself in several ways [Verified on-site; Inferred off-site]

| Fact | Where | Value |
|---|---|---|
| Projects delivered | Homepage, `llms.txt`, Organization schema | **1,500+** |
| | `/our-team/`, `/services/`, `/cloud-computing-consulting-services/`, `/workflow-automation-services/` | **500+** |
| | `/stablecoin-development-company/`, `/smart-contract-development-company/`, `/white-label-crypto-exchange-platform/`, `/saas-product-application-development-company/` and others | **150+ Projects Delivered**, shown in the company stats strip |
| Experience | 178 sampled pages | **11+ years** |
| | `/our-team/`, `/fintech-app-development-company/`, `/white-label-neo-bank-development-company/` and others | **10+ / 10Y+** |
| Location | Meta description, homepage FAQ, `llms.txt` | "**US-based**" |
| | Organization schema `address`, `contactPoint` | Ahmedabad, India; +91 phone |
| | Third-party directories (Built In, IoT ONE) | Los Angeles HQ |
| Headcount | Site, schema description | 250+ specialists |
| | Built In / IoT ONE / DesignRush | 230 / 51–200 / 50–99 |
| Duplicate profiles | IoT ONE (`solulab` and `solulab-official`), Celent (`solulab` and `solulabinc`), several Clutch listings with different review counts (39, 42, 55) | |

**Why it matters for AI:** models answer "How big is SoluLab?" or "Where is SoluLab based?" by blending these sources. Conflicting numbers lead to hedged or wrong answers, and they lower the model's confidence when deciding whether to recommend the firm at all.

**Fix ([Marketing], about a week):**
1. Write a **one-page canonical fact sheet**: legal name, HQ and offices, founding year, founders, headcount band, projects delivered (one number, with a definition), certifications (with IDs), core services and industries. Publish it on `/about-us/` and in `llms.txt`.
2. Replace the per-template stats strips with one shared component fed from the fact sheet, so every service page shows the same numbers. Service-specific numbers are fine if they're labelled, e.g. "50+ stablecoin projects".
3. Decide the location story. If the legal HQ is the LA entity, put LA in the schema `address` and list the Ahmedabad delivery center as a `location`. If it's India, drop "US-based" and say "US office in Los Angeles".
4. Update Clutch (and ask Clutch to merge the duplicate listings), GoodFirms, DesignRush, Built In, IoT ONE, Celent, LinkedIn and Crunchbase to match.

### 4.2 Answer-first structure: the skeleton is right, the openings aren't [Verified]

| Signal | Posts ≤2023 (200) | Posts 2024–25 (116) | **Posts 2026 (211)** | Service pages | Case studies |
|---|---|---|---|---|---|
| "Key Takeaways" / TL;DR box near the top | 6% | 11% | **92%** | 1% | 2% |
| Question-style H2s (What/How/Why/Can…) | 31% | 34% | **53%** | 27% | 9% |
| Median lists per page | n/a | n/a | 6 (all posts) | 1 | 1 |
| Pages with at least one table | n/a | n/a | 31% (all posts) | 14% | **0%** |

The 2026 template clearly reflects an AEO playbook. The gap is **the first paragraph**: it's usually a narrative hook rather than the answer. Sampled 2026 "What/How" posts:

| Title | First paragraph (truncated) |
|---|---|
| "What is LLMOps? A Complete Guide for Enterprise AI Systems" | "Many organizations find it difficult to move large language models from experimentation to reliable production systems…" (doesn't define LLMOps) |
| "How Much Does Custom LLM Development Cost in 2026?" | "'How much is this going to cost me?' That's usually the first thing a business asks… the honest answer is: it depends." |
| "How AI Grading Tools Are Transforming Higher Education in 2026" | "You manage a university or higher education institution, and faculty members are spending countless hours grading." |
| "How to Build a Multi Asset Tokenization Platform" | "The enterprise race for Real-World Asset (RWA) market share is exposing a fatal flaw in traditional finance…" |
| "Top 15 Blockchain Development Companies in 2026" | "The global blockchain market hit around $62 billion this year… with a crazy 50% CAGR…" |

**Fix (editorial standard for every new and refreshed post):**
1. **First 40–60 words directly answer the title question**, in a standalone, quotable form. For example: "LLMOps is the set of practices for deploying, monitoring and governing large language models in production, covering prompt and model versioning, evaluation, cost and latency monitoring, and guardrails."
2. **Under each question H2, the first sentence is the answer.** Detail and examples follow.
3. **Cost posts lead with a range table** (scope tier × cost × timeline) before any discussion. 89 posts have "cost" in the title, so this is a large, high-intent set.
4. Keep the Key Takeaways box, but make each bullet a fact, not a teaser.
5. Keep the tone neutral. "A crazy 50% CAGR" reads as marketing copy, and AI engines skip promotional passages.

### 4.3 Evidence density: little that can be quoted or checked [Verified]

| Signal (median per page unless stated) | Posts ≤2023 | Posts 2024–25 | **Posts 2026** | Service pages | Case studies |
|---|---|---|---|---|---|
| Percentage statistics in the body | 0 | 1 | **1** | 1 | 0 |
| "According to / source / survey" attributions | 0 | 0 | 0 | 0 | 0 |
| Pages citing at least one authoritative source (regulator, standards body, analyst, research, official docs, tier-1 press) | 12% | 32% | **43%** | 6% | 1% |
| Pages with zero outbound links in the content | 46% | 18% | 2% | 1% | 0% |
| Case studies with any % outcome metric | n/a | n/a | n/a | n/a | **37 of 128 (29%)** |

The authoritative-domain list used for this check includes .gov/.edu, regulators (SEC, BIS, IMF, EU), standards bodies (W3C, NIST, ethereum.org), analysts (Gartner, McKinsey, Statista, Grand View and others), on-chain data (DefiLlama, rwa.xyz, Chainalysis, Messari), official vendor docs, and tier-1 crypto and tech press.

The money pages have the same gap. `/blockchain-development-company/`, `/ai-development-company/`, `/ai-agent-development-company/` and `/stablecoin-development-company/` each cite **0** authoritative sources.

**Why it matters:** passages with a specific number and a named source are the most likely to be lifted into an AI answer and credited. A page that only says "AI is transforming industries" offers nothing to cite.

**Fix:**
1. **Data box per post:** 3–5 dated statistics, each linked to its primary source (e.g. "RWA on-chain value: $X B, rwa.xyz, Oct 2026").
2. **Service pages:** add a "By the numbers" section with SoluLab's own verifiable delivery data. Examples: median MVP timeline, audit pass rate, typical team size, the cost bands shown on the homepage. Link to the case studies that prove them.
3. **Case studies:** every one needs an outcomes table (metric, before, after, timeframe). 91 of 128 currently have no percentage outcome at all. This is the single most citable asset type a services firm has.
4. **Original research, once or twice a year.** For example, a "State of RWA Tokenization 2027" or "Enterprise AI Agent Adoption" report built from SoluLab's project data and a client survey. Original data is what independent sites (and therefore AI answers) link to and quote.

### 4.4 First-hand experience: not visible [Verified]

- **82%** of sampled posts contain no first-hand delivery language ("we built", "our team deployed", "for one of our clients", "in our experience"). 2026 posts are no better at 81%.
- Only **20%** of posts link to a case study, while 81% link to a service page. They sell, but don't prove.
- 1,124 of 1,725 posts carry one byline, and author pages are noindexed (main audit §5.2).

**Why it matters:** Google's helpful-content systems, and AI engines selecting among near-identical vendor blogs, reward *information gain*: something the reader can't get from the other ten "What is RWA tokenization?" posts. SoluLab's 1,500 projects are its information-gain advantage, and it barely shows up in the content.

**Fix:**
1. A **"From our projects" box** in every technical post, 80–150 words: a specific lesson, number or architecture decision from a named (or anonymized) engagement, linked to the case study.
2. A **named expert reviewer** on technical posts ("Technically reviewed by [Name], Head of Blockchain"), with an indexable bio page.
3. Use real artefacts where possible: architecture diagrams, code snippets (link the GitHub org that's already in `sameAs`), audit checklists, sample timelines.

### 4.5 Coverage of high-intent prompts [Verified counts; Inferred gaps]

| Prompt type | Example prompt | SoluLab coverage |
|---|---|---|
| "What is X" | "What is ERC-3643?" | 78 posts. Good. |
| Cost | "How much does an AI agent cost to build?" | 89 cost posts. **Only 56 of 274 service pages have a cost section.** `/asset-tokenization-development-company/`, `/stablecoin-development-company/` and `/generative-ai-development-company/` have none. |
| **Timeline** | "How long does it take to build a crypto exchange?" | **Only 1 post** has "how long" or "timeline" in its title. A clear gap. |
| Comparison | "Hyperledger vs Ethereum for enterprise" | 69 "vs" posts. Good. |
| Vendor selection | "Best RWA tokenization companies" | 92 self-ranking listicles. Low credibility (§4.6). |
| Brand evaluation | "Is SoluLab legit?", "SoluLab reviews", "SoluLab pricing" | No dedicated page. AI answers will fall back to Glassdoor (3.3 from 163 reviews, including a 1-star review alleging fake reviews) and scattered directories. |

**Fix:**
1. Add a cost-and-timeline section (range table plus drivers) to the top 30 service pages.
2. Create 10–15 "How long does it take to build X" pages for the core offerings.
3. Publish a transparent **"Engagement models and pricing"** page (the homepage already has "How We Engage: Models, Timelines and Typical Budgets", so promote it to its own URL).
4. Publish a **"Why clients choose SoluLab / reviews"** page that links out to Clutch, GoodFirms and others, so AI answers to brand questions have an owned, factual source.

### 4.6 Self-ranking listicles and the third-party picture [Verified on samples; Inferred effect]

**What the sampled third-party results show** (search index used in this session, October 26, 2026):

| Query | Is SoluLab in third-party results? | Who dominates |
|---|---|---|
| "top blockchain development companies 2026" | Mentioned in passing within third-party lists | Vendor listicles by PixelPlex, Debut Infotech, Yudiz, IdeaSoft, 10Clouds, DashDevs, Interexy |
| "stablecoin development company" | Named in some third-party lists | Suffescom, LeewayHertz, Debut Infotech, Bacancy |
| "best real world asset tokenization development companies" | **Only SoluLab's own pages** (one shown as "Talk to an Expert") | Third-party lists placed on `xchange.avixa.org`, Debut Infotech, a `support.billsby.com` forum post |
| "best AI agent development companies for enterprises" | **Not present** | IBM, Accenture, Deloitte, TCS, EPAM; listicles on `xchange.avixa.org` and `forum.linuxfoundation.org` |
| "how much does it cost to build a crypto exchange" | **Not present** | Purrweb, Synodus, B2Broker, Rock'n'Block, forum posts |
| "SoluLab reviews / reddit" | Clutch, Glassdoor, SoluLab's own testimonials. **No Reddit discussion.** | n/a |

**Readings:**
1. **SoluLab's 92 "Top X companies" posts can't stand in for third-party lists.** AI engines discount a vendor ranking itself, and the posts have no stated methodology or disclosure.
2. **Competitors are filling user-generated platforms** (`xchange.avixa.org` posts, forum threads on Billsby and the Linux Foundation forum) with "Top 10" listicles that rank themselves. Some AI retrieval does pick these up today. **I'd recommend against copying this tactic.** It's parasite content: platforms remove it, and Google's site-reputation-abuse policy targets it. It's fragile and a reputational risk if exposed.
3. **The durable route** is earned inclusion. That means analyst and directory rankings (Clutch Leaders matrices, GoodFirms categories, DesignRush, Everest/ISG-type vendor reports if within budget), genuine guest contributions on industry publications, conference talks, and podcast appearances. Each placement is a sentence an AI model can learn: "SoluLab, an RWA tokenization firm that built X for Y…".

**Fix for the existing listicles:**
- Add a methodology section and a clear disclosure ("SoluLab is the publisher and is included in this list"). Use criteria SoluLab could defend publicly.
- Consolidate the regional and year variants.
- Retire thin ones. See main audit C2.

### 4.7 Reputation inputs AI models ingest [Verified on samples; Unverified completeness]

| Source | Signal |
|---|---|
| Clutch | 4.9/5. Praised for expertise and communication. Recurring criticism: timelines, scope, PM handovers. Several listings. |
| Glassdoor | 3.3/5 from 163 reviews. Mixed, including an allegation that positive reviews are fake. |
| Reddit / Quora / Hacker News | No meaningful discussion found |
| Wikipedia / Wikidata / Crunchbase / G2 | None found in search results. Direct checks were rate-limited or returned 403. |
| Directories | Built In, IoT ONE (×2), Celent (×2), DesignRush, Bulldogjob, with inconsistent facts |

**Fix:**
1. **Wikidata item:** create one only if notability sources exist (independent press coverage). Wikidata is lower-bar than Wikipedia and feeds many knowledge graphs. Don't create a Wikipedia article without independent coverage. It will be deleted and can backfire.
2. **Crunchbase profile:** claim or update it, matching the fact sheet.
3. **G2:** list any productized offerings (white-label exchange, tokenization platform, AI products). G2 is heavily cited in AI answers about software vendors.
4. **Reddit:** this is community participation, not promotion. Have named engineers answer technical questions in r/ethdev, r/defi, r/LocalLLaMA and r/MachineLearning with genuinely useful replies, under their own profiles. Disclose the affiliation whenever SoluLab comes up.
5. **Glassdoor:** respond professionally to reviews. Employer reputation leaks into "Is SoluLab a good company?" answers.

---

## 5. Prioritized AI-visibility plan

Owners are role placeholders. Effort: S = under 1 day, M = 1–5 days, L = over 1 week. IDs continue from the main audit's plan.

### Weeks 1–2: Quick wins

| ID | Action | Owner | Effort | Success metric |
|---|---|---|---|---|
| AV-1 | Remove `Disallow: /lgxcarousel/` and return 410 there. Submit the sitemap in Bing Webmaster Tools. Confirm IndexNow is on. Submit the top 200 commercial URLs. | [Dev] / [Content/SEO] | S | Bing index shows current titles for the top 200 URLs |
| AV-2 | Check Cloudflare AI Crawl Control and the last 30 days of logs: confirm AI crawlers get 200. | [Web/Cloudflare] | S | 0 bot-related 403s or 429s for allowed AI bots |
| AV-3 | Add `<main>` (and `<article>` on case studies) to the service-page and case-study templates. | [Dev] | S | `<main>` on 100% of templates |
| AV-4 | Write the canonical fact sheet. Fix the conflicting stats strips (1,500+ / 500+ / 150+; 11+ / 10+). Resolve "US-based" vs the schema address. | [Marketing] / [Dev] | M | One value per fact site-wide |
| AV-5 | Show "Updated on" for substantively updated posts. | [Dev] / [Content/SEO] | S | Visible modified date on refreshed posts |
| AV-6 | Fix `llms.txt`: 10 redirecting links; add Case studies, Guides and Company facts sections. | [Content/SEO] | S | 100% of links return 200; 3 new sections |
| AV-7 | Set up a GA4 AI-referral channel group (chatgpt.com, perplexity.ai, gemini.google.com, copilot.microsoft.com, claude.ai, and so on) and the prompt panel in §6. | [Analytics] / [Content/SEO] | S | Baseline recorded |

### Weeks 3–8: Make the content quotable

| ID | Action | Owner | Effort | Success metric |
|---|---|---|---|---|
| AV-8 | Editorial standard (answer-first opening, answer-first H2s, data box with sourced stats, "From our projects" box, expert reviewer). Apply it to all new posts. | [Content/SEO] | S to set up | 100% of new posts comply |
| AV-9 | Refresh the top 50 posts by GSC impressions to the standard, starting with the 89 cost posts and the 78 "What is" posts. | [Content/SEO] | L | 50 refreshed; AI-referral sessions to them tracked |
| AV-10 | Top 30 service pages: cost-and-timeline table, "By the numbers" with verifiable delivery data, at least 2 authoritative citations, links to 2–3 case studies. Fix the HTML weight on `/generative-ai-development-company/` and `/asset-tokenization-development-company/` first. | [Content/SEO] / [Dev] | L | 30 pages done; HTML under 500 KB |
| AV-11 | Case-study outcomes tables for all 128 (91 currently have no metric). Add Article schema with `about` and `mentions`. | [Content/SEO] / [Delivery] | L | 100% of case studies have at least one quantified outcome |
| AV-12 | New "How long does it take to build X" pages for 10–15 core offerings, plus a standalone Engagement models and pricing page and a Reviews page. | [Content/SEO] | M | Pages live and indexed in Google and Bing |
| AV-13 | Indexable author and expert pages with Person schema (`sameAs`, `jobTitle`, `knowsAbout`). | [Dev] / [Content/SEO] | M | Author pages indexed |

### Weeks 6–12+: Earn corroboration

| ID | Action | Owner | Effort | Success metric |
|---|---|---|---|---|
| AV-14 | Align external profiles with the fact sheet. Merge the duplicate Clutch, IoT ONE and Celent profiles. Claim Crunchbase. Add G2 listings for productized offerings. | [Marketing] | M | Consistent facts on the top 10 profiles |
| AV-15 | Methodology and disclosure on the kept listicles. Consolidate or retire the rest. | [Content/SEO] | M | Disclosure on 100% of the ones kept |
| AV-16 | One original research report per half-year from project data plus a client survey. Pitch it to industry press. | [Marketing] / [Delivery] | L | At least 10 independent citations per report |
| AV-17 | Earned inclusion: Clutch and GoodFirms category leadership (review velocity), guest articles, talks, podcasts. Named engineers participate in Reddit and Stack Exchange with disclosure. | [Marketing] / [Engineering leads] | L | SoluLab is mentioned in independent sources for RWA, AI agents and stablecoin prompts |
| AV-18 | Wikidata item, once there's independent press coverage to cite. | [Marketing] | S | Item live with `official website` and `sameAs` |

---

## 6. Prompt panel for the baseline

Run these prompts monthly in **ChatGPT (search on), Perplexity, Gemini, Copilot, and Google AI Mode/Overviews**. Log, for each answer:
- Whether SoluLab is mentioned
- Whether solulab.com is cited, and which URL
- The position in the list
- Which competitors appear
- Whether the facts are accurate

**Vendor selection (commercial):**
1. Best RWA tokenization development companies
2. Top blockchain development companies for enterprises
3. Best AI agent development companies
4. Stablecoin development company recommendations
5. Who can build a white-label crypto exchange?
6. Best generative AI development company for a fintech
7. Top DeFi development companies
8. Asset tokenization platform development partner in the US
9. Best smart contract development and audit firms
10. AI development company in Dubai

**Cost and timeline:**
11. How much does it cost to build a tokenization platform?
12. How much does an AI agent cost to develop?
13. Crypto exchange development cost
14. How long does it take to build a stablecoin?
15. Cost to build an LLM-powered chatbot for enterprise

**Informational (topic authority):**
16. What is ERC-3643 and when should I use it?
17. How does RWA tokenization work?
18. What is LLMOps?
19. Stablecoin regulations in the US / EU (MiCA) explained
20. Agentic AI vs AI agents: what's the difference?
21. How to build a multi-asset tokenization platform
22. Hyperledger vs Ethereum for enterprise blockchain
23. How to choose a blockchain development company

**Brand:**
24. What is SoluLab?
25. Is SoluLab a good company to work with?
26. SoluLab reviews
27. Where is SoluLab based and how big is it?
28. SoluLab vs LeewayHertz
29. SoluLab vs Debut Infotech
30. What has SoluLab built? (notable projects)

**Targets after 90 days:**
- Correct facts in 100% of brand answers (prompts 24–27).
- SoluLab cited in at least 30% of the informational prompts (16–23).
- SoluLab mentioned in at least 3 of the 10 vendor-selection prompts.

These targets assume AV-4, AV-8 to AV-11 and AV-14 have shipped.

---

## 7. What's already right (keep it)

- An explicit AI-crawler allow-list in robots.txt, with sensible exclusions. [Verified]
- Server-side rendering: the content is in the raw HTML, so no JavaScript is needed. [Verified]
- The mega-menu is wrapped in `<header>`/`<nav>` landmarks, and posts have `<main>`. [Verified]
- FAQ schema answers match the visible text (132 of 132 sampled). [Verified]
- The 2026 post template: Key Takeaways box on 92%, question-style H2s on 53%, outbound links on 98%. [Verified]
- `llms.txt` is published and well structured. [Verified]
- Bing Webmaster Tools is verified (`msvalidate.01`). [Verified]
- `max-snippet:-1` and `max-image-preview:large` allow full snippets. [Verified]

---

## Appendix: method notes

- **Sample:** 929 pages, fetched October 26, 2026 without JavaScript. The 527 posts were sampled in proportion to publish year (seed fixed), with at least 20 per year.
- **"Words before H1":** visible text (scripts, styles and SVG removed) from the start of `<body>` up to the H1 text.
- **Authoritative domains:** .gov/.edu, regulators, standards bodies, research publishers, major analysts and consultancies, on-chain data providers, official vendor docs, and tier-1 business, tech and crypto press. The full regex is in the extraction script and can be shared on request.
- **"Experience language":** a phrase list such as "we built", "we developed", "our team", "our clients", "in our experience", "for one of our clients", "at SoluLab we".
- **Third-party search observations** come from the search tool available in this session, which isn't Google. They show what that index holds, not Google or AI-engine rankings.
- **Not measured:** actual AI answer share-of-voice (§6 sets this up), server-log bot activity, and Bing and Google index coverage counts (pull them from Bing Webmaster Tools and GSC).

*This audit was prepared with AI assistance (crawling, extraction and analysis). All figures come from the crawl data described above and are labeled by confidence.*
