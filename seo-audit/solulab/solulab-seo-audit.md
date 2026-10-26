# SoluLab.com: Technical, On-Page, Content and AEO/GEO SEO Audit

**Date:** October 26, 2026
**Site:** https://www.solulab.com (WordPress + Yoast SEO Premium 28.7, custom `solu-lab` theme, behind Cloudflare)
**Scope:** All 2,142 URLs in the XML sitemaps, plus 531 linked URLs that aren't in the sitemaps. Lighthouse lab tests on 3 templates. Robots, sitemaps, `llms.txt`, redirects, structured data, internal linking, content inventory, AI-crawler access.

---

## 0. How this audit was done (read first)

Unlike earlier audits in this repo, this one is based on a **live crawl**. Every URL in the sitemaps was fetched directly, without JavaScript, the way Googlebot first sees a page and the way most AI crawlers always see it.

| Input | What was collected |
|---|---|
| Sitemap crawl | 2,142 URLs from 6 Yoast sitemaps. Status, headers, title, meta, canonical, robots, H1–H3, word count, images, JSON-LD types, internal and external links, author and dates. |
| Link-target check | 531 internal URLs that pages link to but the sitemap doesn't list. Each was checked for status, and every redirect chain was followed to its end. |
| Lighthouse 12 (mobile, simulated throttling) | Homepage, `/blockchain-development-company/` and one blog post. Desktop homepage too. |
| Probes | http/https and apex/www redirects, trailing slash, uppercase URLs, parameters, archives, pagination, 404 handling, crawler user agents (Googlebot, Bingbot, GPTBot, ClaudeBot, PerplexityBot, CCBot). |
| Off-site | Public search results for reviews and brand mentions. |

**Confidence labels** used throughout:
- **[Verified]** means measured directly in this crawl. The CSV files in this folder have the URL-level evidence.
- **[Inferred]** means a reasoned conclusion from verified data.
- **[Unverified]** means it needs data I don't have.

**What this audit could not see:**
- Google Search Console (clicks, impressions, index coverage, crawl stats)
- GA4
- Backlink data (Ahrefs, Semrush)
- CrUX field Core Web Vitals. The PageSpeed API quota was exhausted.

That means **no traffic or ranking claims are made here**. Every finding is about the site itself. Section 9 lists the exports that would let me size the impact.

The Lighthouse numbers are **lab** numbers from a cloud datacenter. Treat them as directional, not as the field CWV that Google uses.

---

## 1. Executive summary

SoluLab has strong foundations. The site is server-rendered WordPress, so content is in the raw HTML for every crawler. It has a clean apex→www and http→https setup, self-referencing canonicals on 99.9% of pages, an explicit allow-list for AI crawlers, an `llms.txt` file, and a large topical footprint across AI and blockchain. Someone has clearly already run an "AEO sprint": the robots.txt comments say so.

The problems are **hygiene at scale** and **template-level waste**. One template bug or one stale menu link gets repeated on all 2,127 pages. The biggest issues:

| # | Priority | Finding | Evidence |
|---|---|---|---|
| 1 | 🔴 Critical | **Sitewide menu and footer links point at redirects.** 14 links that appear on every page go through a 301, and one goes through a 2-hop chain. That's **~31,400 redirecting internal links**. Overall, 372 linked URLs redirect and 24 are multi-hop chains. | [Verified] `solulab-redirecting-internal-links.csv` |
| 2 | 🔴 Critical | **111 broken internal link targets** (47 return 404, 64 return 410), linked **349 times**. 10 more redirect into a 404 or 410. Typo paths such as `/case-stuides/…`, `/ai-agent-developemnt-company/` and a URL glued onto another URL show links aren't QA'd. | [Verified] `solulab-broken-internal-links.csv` |
| 3 | 🔴 Critical | **Mobile performance is very poor.** The homepage scores 33 in Lighthouse, with LCP 17.5 s, TBT 16 s and **54 MB** transferred. A **49 MB hero video** is *preloaded* on every visit. Service pages and blog posts score 34–36, with LCP 10–13 s and TBT 4.5–5.5 s. | [Verified, lab] |
| 4 | 🔴 High | **Huge HTML documents.** 121 pages are over 500 KB of HTML, 60 are over 1 MB, and 2 are over 2 MB (the largest is **8.2 MB**). The cause is base64 PNGs embedded inside inline SVGs (Figma exports). `/generative-ai-development-company/`, a key service page, is 3.3 MB. Googlebot may index only the start of an oversized HTML file. | [Verified] sizes; [Inferred] indexing risk |
| 5 | 🔴 High | **465 sitemap URLs (22%) are orphans.** No crawled page links to them: 339 posts, 79 case studies and 47 service or other pages. These include `/ai-consultancy-uk/`, `/dapp-development-company/` (reachable only through a 2-hop redirect), `/crypto-banking-solutions/` and `/custom-saas-development/`. | [Verified] `solulab-orphan-pages.csv` |
| 6 | 🟠 High | **Self-serving `AggregateRating` (4.9/55) is on 1,877 pages** inside the Organization schema, and **FAQPage schema is on 1,628 pages**. Google doesn't show review stars for an organization's ratings of itself, and it limits FAQ rich results to authoritative government and health sites. Bulk markup like this is a manual-action risk with no visible upside. | [Verified] markup; [Inferred] risk |
| 7 | 🟠 High | **E-E-A-T and authorship are weak for a site this large.** 65% of posts (1,124 of 1,725) are credited to one author, "Shipra". **All author archives are `noindex`.** Team bio pages sit at root slugs (`/rajatlala/`, `/amansharma-2/`) with no meta description. Posts carry no BreadcrumbList (6 of 1,725 do). | [Verified] |
| 8 | 🟠 High | **Content flood and self-ranking listicles.** 728 posts were published in 2026 so far (~2.4 a day). 92 posts are "Top X … Companies" rankings that put SoluLab among the picks with no stated methodology or disclosure. 209 posts are legacy NFT, metaverse or ICO-era content, and many have stale years in the title (2019–2023). | [Verified] counts; [Inferred] quality risk |
| 9 | 🟠 Medium | **Duplicate `<title>` tag on 2,125 of 2,127 pages.** The theme's `header.php` prints a `<title>` before Yoast prints its own. Both are identical today, but it's invalid HTML and a trap for any future title change. | [Verified] |
| 10 | 🟠 Medium | **Cannibalizing service pages.** There are four chatbot service pages, three Gen-AI development pages, two "hire web3" pages (one has 62 words and a title made from its URL slug), and seven tokenization pages. `/best-custom-software-development/` canonicalizes elsewhere but is still in the sitemap. | [Verified] |
| 11 | 🟡 Medium | **Entity inconsistency.** The meta description and FAQ say "US-based". The Organization schema gives Ahmedabad, India as the main address with a +91 phone number. Some templates call the Organization `["Organization","ProfessionalService"]` and the homepage calls it `Organization`. On Clutch, SoluLab appears to have several separate profiles reporting different review counts (39, 42, 55). | [Verified] on-site; [Inferred] off-site |
| 12 | 🟡 Medium | **Sitemap hygiene.** The sitemaps list 15 URLs that redirect (two redirect to `http://`), one non-canonical URL, two `nofollow` posts, and an empty `lp-sitemap.xml`. 293 posts share one `lastmod` date (2026-09-22), which suggests a bulk update and makes `lastmod` less trustworthy as a freshness signal. | [Verified] `solulab-sitemap-issues.csv` |

**Strengths to keep:** [Verified]
- Server-rendered HTML with content present without JavaScript
- HSTS with preload; X-Frame-Options and nosniff headers
- One-hop apex→www redirect over https
- Uppercase and parameter variants canonicalize correctly
- Search, tag, category and author archives are `noindex, follow`
- Correct 404 and 410 status codes
- AI crawlers explicitly allowed; Googlebot, Bingbot, GPTBot, ClaudeBot, PerplexityBot and CCBot user agents all get 200 responses
- `llms.txt` present with 121 links in 20 sections
- 99.9% of posts carry an H1, a meta description and BlogPosting schema
- Median blog post is 2,237 words, with a table of contents and FAQs

---

## 2. Technical SEO

### 2.1 Hosts, protocols and redirects [Verified]

| Request | Result | Verdict |
|---|---|---|
| `http://solulab.com` | 301 → `https://solulab.com/` → 301 → `https://www.solulab.com/` | ⚠️ 2 hops. Make it a single 301 straight to `https://www.` (a Cloudflare redirect rule). |
| `http://www.solulab.com` | 301 → `https://www.solulab.com/` | ✅ |
| `https://solulab.com` | 301 → `https://www.solulab.com/` | ✅ |
| `/blockchain-development-company` (no slash) | 301 → with slash | ✅ but see 2.3: menu links use the no-slash form |
| `/BLOCKCHAIN-DEVELOPMENT-COMPANY/` | 200, canonical → lowercase | ✅ acceptable |
| `/…/?utm_source=x` | 200, canonical → clean URL | ✅ |
| `/?p=70469` | 301 → pretty permalink | ✅ |
| `/index.html` | 404 | ✅ |
| `/blog`, `/blog/` | 301 → `/blogs/` | ✅ |
| Nonexistent URL | 404 (353 KB error page) | ✅ status. ⚠️ The 404 page is heavy. |
| `/wp-login.php` | 200, publicly reachable | Not an SEO issue. Flagged for security: rate-limit it or move it behind Cloudflare Access. |

### 2.2 robots.txt [Verified]

- The file allows all named AI and answer-engine crawlers (GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, Claude-User, Claude-SearchBot, PerplexityBot, Perplexity-User, Google-Extended, GoogleOther, Applebot-Extended, Amazonbot, CCBot). It applies the same disallows to them as to `*`. This is a good, deliberate setup.
- It disallows `/*?blog_page=`, `/*?viewType=`, `/*?pb=`, `/wp-json/`, `/lgxcarousel/` and feed URLs.
- ⚠️ **`/wp-json/` is disallowed.** This is usually harmless. But if any Elementor widget, form or embed loads content from the REST API at render time, Googlebot can't fetch it. Spot-check in GSC's URL Inspection, under rendered HTML. [Unverified]
- Points to `sitemap_index.xml`. ✅

### 2.3 Internal links: redirects, chains and broken links [Verified]

This is the single most fixable problem on the site.

**Sitewide menu and footer links that redirect** (each appears on ~2,125 pages):

| Link in the menu or footer | Goes to | Hops |
|---|---|---|
| `/dapps-development-services/` | `/dapps-development-company/` → `/dapp-development-company/` | **2** |
| `/ai-application-development-company/` | `/ai-development-company/` | 1 |
| `/ai-software-development-company/` | `/ai-development-company/` | 1 |
| `/ethereum-token-development-company/` | `/erc20-token-development-company/` | 1 |
| `/generative-ai-integration-services/` | `/ai-integration-services/` | 1 |
| `/hire-generative-ai-developers/` | `/hire-ai-developers/` | 1 |
| `/nft-token-development-company/` | `/nft-development-company/` | 1 |
| `/hire-blockchain-developers-in-saudi-arabia/` | `/blockchain-development-company/` | 1 |
| `/case-studies/morpheus-network/` | `/case-study/morpheus-network/` | 1 |
| `/about-us`, `/blogs`, `/case-studies`, `/ai-powered-solutions`, `/ai-agent-development-company` | the same URL with a trailing slash | 1 |
| `https://www.solulab.com` (logo) | the same URL with a trailing slash | n/a (fine) |

**Other notable chains** (linked from body content):
- `/ai-agent-developemnt-company/` → `/ai-agent-developement-company/` → `/ai-agent-development-company/`. This typo chain is linked from **69 pages**, plus 64 more links to the middle hop.
- `/guide-to-chatbot-development/` (25 pages, 2 hops)
- `/enterprise-blockchain-technology-development-company/` (70 pages)
- `/real-world-asset-tokenization-guide/` (63 pages)
- `/artificial-intelligence-ai-development-company-in-usa/` (52 pages)

**Broken targets.** The worst offenders:

| URL | Status | Linking pages |
|---|---|---|
| `/case-studies/ai-powered-chatbot-for-travel/` | 410 | 39 |
| `/hire-nft-developers/` | 410 | 20 |
| `/case-studies/obortech/` | 404 | 19 |
| `/case-stuides/ai-build/` (typo) | 410 | 19 |
| `/cross-platform-mobile-app-development-company/` | 410 | 12 |
| `/blockchain-in-retail/` | 410 | 11, plus 2 redirects into it |
| `/case-studies/digital-quest/` → 410 | 301 → 410 | 10 |
| `/token-development-company/https://www.solulab.com/best-defi-platforms/` | 404 | 1 (malformed href) |

**Why it matters:**
- Every redirecting link costs a crawl request.
- Each hop adds latency for users.
- Links to 404 and 410 pages waste link equity and send a "neglected site" signal at scale.

With 31k redirecting links, a meaningful share of Googlebot's fetches on solulab.com are redirects rather than content. [Inferred] Confirm this in GSC: Crawl stats → By response.

**Fix ([Dev], ~1 day):**
1. Update the WordPress menus and footer to the final URLs, with trailing slashes.
2. Run a database search-and-replace (e.g. WP-CLI `search-replace`) for every row in `solulab-redirecting-internal-links.csv`, swapping in its `final_url`.
3. For every row in `solulab-broken-internal-links.csv`, either relink to the closest live page or remove the link.
4. Flatten all chains at the server so each old URL 301s directly to its final destination.
5. Add a link check to the publishing workflow so this doesn't come back. Screaming Frog scheduled crawls or a CI link checker on the staging site both work.

### 2.4 Orphan pages [Verified]

465 of 2,127 live sitemap URLs (22%) have **no internal link from any crawled page**:

| Type | Orphans | Notes |
|---|---|---|
| Blog posts | 339 | 106 from 2026, 75 from 2022, 36 from 2019 |
| Case studies | 79 | 62% of all case studies. Proof assets with no links to them. |
| Service, landing and other pages | 47 | e.g. `/ai-consultancy-uk/`, `/ai-governance-consulting/`, `/ai-medical-scribe-development/`, `/crypto-banking-solutions/`, `/custom-saas-development/`, `/data-annotation-services/`, `/dot-net-development-company/`, `/ruby-on-rails-development-company/`, `/generative-ai-software-development-company/`, `/digital-transformation-4/` |

Some pages count as orphans only because every link to them goes through a redirect. For example, `/dapp-development-company/` is linked only via the 2-hop `/dapps-development-services/` chain. Fixing 2.3 fixes those.

The rest need a decision:
- **Link it** from the relevant hub or service page.
- **Merge** it into a stronger page and 301.
- **Retire** it: 410, and remove it from the sitemap.

Blog pagination also works against discovery. `/blogs/page/2/` through `/blogs/page/123/` all canonicalize to `/blogs`, a URL without the trailing slash that itself 301s. So older posts rely on the sitemap and internal links alone.

**Fix:**
- Each paginated page should self-canonicalize.
- Point the `/blogs/` canonical at `/blogs/`, with the trailing slash.
- Category archives are currently `noindex`. Consider turning the 6–10 main categories into indexable, curated hub pages: AI agents, tokenization/RWA, DeFi, crypto exchanges, Gen AI, and so on.

### 2.5 XML sitemaps [Verified]

| Sitemap | URLs | Notes |
|---|---|---|
| `post-sitemap.xml` + `post-sitemap2.xml` | 1,733 | 293 posts share `lastmod` 2026-09-22, and another 132 share 2026-06-19 |
| `page-sitemap.xml` | 278 | 7 redirect, plus 1 non-canonical (`/best-custom-software-development/`) |
| `case-study-sitemap.xml` | 129 | Includes `/case-study/`, which 301s to `/case-studies/` |
| `pr-sitemap.xml` | 2 | |
| `lp-sitemap.xml` | **0** | Empty. Remove it from the index or noindex the post type. |

The 15 redirecting sitemap URLs are in `solulab-sitemap-issues.csv`. Two of them, `/resources/white-paper/` and `/resources/ebook/`, redirect to `http://www.solulab.com/resources/`, which adds a protocol hop.

The `lastmod` clustering suggests template-wide re-saves or bulk edits. Google uses `lastmod` only when it's "consistently and verifiably accurate". Update it only on a meaningful content change. [Inferred]

### 2.6 Canonicals, indexability, duplicate titles [Verified]

- 2,125 of 2,127 pages have exactly one self-referencing canonical. ✅
- Exceptions:
  - `/blogs/` canonicalizes to `/blogs`, which is a 301.
  - `/best-custom-software-development/` canonicalizes to `/custom-software-development-company/`. Remove it from the sitemap and 301 it.
- `index, nofollow` on two posts: `/what-is-defi/` and `/all-you-need-to-know-about-initial-exchange-offering/`. This is almost certainly accidental, since it stops link equity flowing out of two evergreen topics.
- **Duplicate `<title>` tag sitewide.** One comes from the theme's `header.php` (line 9 of the HTML) and one from Yoast (line 34). Fix: delete the hard-coded `<title>` from `header.php` and keep `add_theme_support('title-tag')` so Yoast owns it.
- The homepage `og:title` is "#1 Blockchain, AI & Web3 Development Company | SoluLab **| SoluLab**". The brand is doubled, and the text doesn't match the `<title>`.

### 2.7 Performance and Core Web Vitals [Verified, lab]

| Page (mobile) | Perf | FCP | LCP | TBT | CLS | Page weight | DOM elements |
|---|---|---|---|---|---|---|---|
| Homepage | **33** | 2.6 s | **17.5 s** | **16,000 ms** | 0.033 | **53.9 MB** | 5,615 |
| `/blockchain-development-company/` | 34 | 2.9 s | 13.3 s | 4,460 ms | 0 | 5.0 MB | 5,259 |
| Blog post (metaverse opportunities) | 36 | 2.1 s | 10.1 s | 5,470 ms | 0 | 2.3 MB | 5,490 |
| Homepage (desktop) | 58 | 0.6 s | 1.8 s | 1,300 ms | 0.048 | 65.1 MB | 5,611 |

Lighthouse SEO scores were 92–100 and Accessibility 88–93.

**Root causes, in order of impact:**

1. **`HomeHero.mp4` (49 MB) is `<link rel="preload">`-ed and autoplays as the LCP element on mobile.** Fix:
   - Use a compressed poster image (AVIF or WebP, under 100 KB) as the LCP element.
   - Serve a short, muted video under 2 MB, using HLS or WebM.
   - Load it only on desktop or after interaction.
   - Remove the preload.
2. **Third-party tags block the main thread for 11.6 s on the homepage.** These are GTM (843 KB), Facebook, HubSpot, Hotjar, Clarity, Taboola, Bing, Google Ads and openai.com. GTM loads both GA4 and Ads gtag. Fix:
   - Audit the GTM container.
   - Delay non-essential tags until user interaction (Partytown or a delay-JS plugin).
   - Pick one heatmap tool, either Hotjar or Clarity.
3. **A broken GTM tag on every page.** A script from `pageimprove.io` fails with a CORS error. Remove it, or fix its configuration.
4. **Inline base64 images in SVGs.** See 2.8.
5. **A placeholder asset 404s on every service page.** The theme CSS references `…/solu-lab/dist/YOUR_BG_IMAGE_URL`, so each service page loads a 353 KB 404 page as a "background image". Fix the CSS.
6. **Images:**
   - ~2 MB of offscreen images aren't lazy-loaded.
   - ~1.6 MB could be saved with responsive `srcset`.
   - Images are missing `width` and `height` attributes.
   - The service-page LCP hero isn't prioritized. Add `fetchpriority="high"` and drop lazy-loading on the hero.
7. **Very large DOMs** (5,200–5,600 elements) and ~100 KB of inline JS plus ~88 KB of inline CSS on the homepage.
8. **HTML isn't cached at the edge.** Every one of the 2,127 HTML responses was `cf-cache-status: DYNAMIC`. Every response also sets ~13 cookies (the HandL UTM Grabber plugin), which effectively blocks HTML caching. Median TTFB is fine (0.42 s from US-East), but Lighthouse saw 760–780 ms server time. Fix:
   - Move UTM capture into client-side JS.
   - Enable Cloudflare APO or a cache rule for anonymous HTML.
9. **139 static resources have short cache lifetimes.**

**Before acting:** pull **CrUX field data** for the origin and the top templates, from PSI or the CrUX API with an API key. Lab LCP from a cloud box overstates real-world numbers. Field data decides whether CWV is actually failing. [Unverified]

### 2.8 HTML weight [Verified]

| URL | HTML size | Cause |
|---|---|---|
| `/case-study/real-estate-tokenization-with-blockchain-and-ai/` | **8.2 MB** | 10 base64 rasters in inline SVG (7.5 MB) |
| `/generative-ai-development-company/` | **3.3 MB** | 15 base64 rasters (2.1 MB) |
| `/chatgpt-development-company/` | 2.0 MB | same pattern |
| `/best-custom-software-development/` | 1.9 MB | same pattern |
| `/crypto-banking-solutions/`, `/hire-blockchain-developers/`, `/asset-tokenization-development-company/`, `/hire-ai-developers/` | 1.45–1.6 MB | same pattern |

60 pages are over 1 MB and 121 are over 500 KB. Median page HTML is 411 KB, which is itself heavy.

Google documents a size limit on the HTML Googlebot processes, and content past the limit is ignored. On the 2–8 MB pages, the FAQ, CTA and footer links near the bottom are at risk. [Inferred]

Fix: export these SVGs as `<img src>` WebP or AVIF files, or as real vector SVGs without embedded rasters. Then add an HTML-size check to the publishing QA.

### 2.9 Security headers and HTTP [Verified]

- **Present:** HSTS (`max-age=31536000; includeSubDomains; preload`), `X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`, HTTP/2 and HTTP/3.
- **Missing:** `Content-Security-Policy`, `Referrer-Policy` and `Permissions-Policy`. These aren't ranking factors, but they're cheap to add at Cloudflare.
- **Lighthouse Best Practices: 75.** This reflects console errors and 24 third-party cookies.

### 2.10 International and hreflang [Verified]

No `hreflang` is used, which is fine because the site is English-only. There are location pages: `/ai-development-company-in-dubai/`, `/ai-development-company-in-saudi-arabia/`, `/ai-consultancy-uk/` (orphaned), and several "in USA" titles.

If location targeting matters, build these pages properly: a local proof point, a named local office or contact, and local case studies. Link them from a "Locations" hub. As they stand they look like doorway-style pages. [Inferred]

---

## 3. On-page SEO [Verified]

### 3.1 Metadata overview

| Metric | Posts (1,725) | Service and other pages (274) | Case studies (128) |
|---|---|---|---|
| Median title length | 53 | 50 | 55 |
| Titles over 60 characters | 110 | 41 | 36 |
| Missing meta description | 2 | **23** | **29** |
| Meta description over 160 characters | 18 | 35 | 2 |
| Missing H1 | 0 | 5 | 0 |
| Multiple H1s | 10 | 2 | 0 |
| Duplicate titles | 2 pairs in total | | |

**Specific fixes:**

- **Titles built from URL slugs:**
  - `hire-metaverse-developers | SoluLab - Blockchain & AI Development Company`
  - `omnisoft-a-metaverse-meeting-platform | …`
  - `metalegal-take-things-to-the-next-level-in-a-virtual-law-firm | …`
  - `/hire-web3/`: "hire web3 | SoluLab…"
- **Long default suffix.** The Yoast suffix " | SoluLab - Blockchain & AI Development Company" (48 characters) is on 60 titles: 33 case studies and 25 pages. Change the Yoast site title, or the `%%sitename%%` setting, to plain "SoluLab".
- **Legacy case-study title:** "Rigel | Blockchain Technology, Mobility, AI and IoT Development Company USA, Canada".
- **Pages with no meta description:**
  - Commercial pages: `/conversational-ai-consulting-services/`, `/custom-saas-development/`, `/business-process-automation-services/`, `/agentic-ai-for-customer-service/`, `/offshore-software-development/`, `/mvp-app-development-company/`, `/extended-reality-app-development-company/`, `/hire-mobile-app-developers/`
  - Team bios, the privacy page, and 29 case studies
- **Missing H1:**
  - `/become-our-partner/`
  - `/nft-lending-platform-development/`
  - `/hire-web3/`
  - `/digital-transformation-4/`
  - `/mvp-app-development-company/`
- **Second H1 used as a section header.** Examples: `/cryptocurrency-development-company/` ("Explore The Diverse Crypto Assets We Excel In"), `/ai-chatbot-development-services/`, and several posts where "FAQs" is an H1.
- **Duplicate pages:**
  - `/case-study/blockchain-powered-framework-for-emr/` and `/case-study/blockchain-powered-framework-emr/` have the same title and H1. Merge them and 301 one to the other.
  - Two pages share the H1 "A Grading System built for the Future.", and two share "Web Development Company".
- **Stale years in titles.** 39 titles carry a year before 2026. Examples:
  - "Best ICO websites List: Top 10 ICO Review Sites 2022"
  - "How to Develop an NFT Marketplace in 2023"
  - "Top 10 Software Development Companies in Canada 2024"
  - "Cryptocurrency wallet trends to watchout for in 2019"

  Either refresh the content properly and update the year, or remove the year from the title and slug. Don't just bump the number. 15 slugs also contain years; keep those URLs and change only the titles.

### 3.2 Homepage

- **Title:** "#1 AI, Blockchain & Digital Transformation Company | SoluLab" (61 characters).
  - The "#1" is an unsupported superlative.
  - "Digital Transformation Company" isn't the head term people search for.
  - Suggestion: "AI & Blockchain Development Company | SoluLab".
- **H1:** "We Build What AI, Blockchain & Web3 Make Possible!" is a tagline, not a service term. Keep it as the visual headline. Add a descriptive H1, or put the head term in the subhead.
- **Meta description:** good. It's 151 characters and covers proof points and a CTA.
- **Page structure:** 21 H2s. A long homepage is fine, but each H2 should earn its place.

### 3.3 Content depth [Verified]

- **Posts.** Median 2,237 words. 15 posts are under 600 words and 59 are over 4,000. Most posts have a table of contents and an FAQ section.
- **Service pages.** Median ~1,900 words.
  - `/hire-web3/` has 62 words, a slug title and no meta description, and it overlaps `/hire-web3-developers/`. 301 it.
  - `/medical-healthcare-mobile-app-development-company/` has ~308 words.
- **Case studies.** Median ~700 words. 32 are under 600.
  - Thinnest: `/case-study/automotive-blockchain-development/` (241 words), `/alacrity…/` (309), `/collection-grading/` (357), `/ar-in-healthcare/` (360).
  - Case studies are the main proof asset for E-E-A-T and AI citation. Give each one the problem, the approach, the stack, **quantified outcomes**, the timeline and a client quote.

### 3.4 Images [Verified]

Every page has at least one image without alt text, usually decorative icons such as `trust-check.svg`. In total, 6,198 of 77,368 `<img>` tags have no alt text.

Decorative images should have `alt=""` (empty, which is correct). Product screenshots and diagrams on posts and case studies need descriptive alt text.

---

## 4. Structured data [Verified]

| Schema | Pages | Assessment |
|---|---|---|
| Organization (custom, sitewide) | 2,127 | ✅ Present with founders, address, sameAs and contactPoint. ⚠️ Typed as `Organization` on the homepage but `["Organization","ProfessionalService"]` on 246 posts and on team pages, under the same `@id`. Pick one definition and output it from one place. |
| `AggregateRating` on the Organization (4.9 from 55) | **1,877** | ❌ **Remove.** Ratings an organization gives itself aren't eligible for stars. Putting the same rating on every URL looks like rich-result manipulation. If you want to show reviews, link to Clutch and embed the Clutch widget. |
| FAQPage | **1,628** (1,455 posts, 173 pages) | ⚠️ FAQ rich results are limited to well-known government and health sites, so there's no SERP benefit. It's harmless as machine-readable Q&A for AI engines, as long as every Q&A is visible on the page. The homepage FAQ includes "What Is the Best Blockchain Development Company?". Keep these answers genuinely neutral, or remove them. |
| BlogPosting | 1,724 of 1,725 posts | ✅ Add `dateModified`, an `author.url` pointing to an **indexable** author page, and `author.sameAs` (LinkedIn). |
| BreadcrumbList | pages 167 of 274, case studies 38 of 128, **posts 6 of 1,725** | ❌ Turn on Yoast breadcrumbs for posts and case studies. |
| Service, Offer, PriceSpecification | 115 / 36 / 23 pages | ✅ Good start. Make sure the prices match the visible content. |
| **Invalid JSON-LD** | 7 pages | ❌ `/ar-vr-app-development-company/`, `/p2e-game-development-company/`, `/augmented-reality-app-development-company/`, `/eos-blockchain-development-company/`, `/web3-game-development-company/` and 2 more. Fix the syntax. |
| Legacy hand-coded `"@type":"product"` | 2 pages | ❌ On `/ai-chatbot-development-services/` and one other page: the type is lowercase, the context is `http://www.schema.org`, and the name is "SoluLab - Blockchain Development Company" on a chatbot page. Delete it. |
| WebSite | 29 pages only | ⚠️ Output it once, on the homepage, with `publisher` pointing to `#organization`. |
| Case study | `Article` on 33, a custom `CaseStudy` type on 1, none on the rest | Use `Article` (or `CreativeWork`) with `about`, `mentions` (the client Organization) and a measurable result in the description. |

---

## 5. Content strategy and quality

### 5.1 Inventory [Verified]

| Segment | Count | Share |
|---|---|---|
| Blockchain, crypto, Web3, DeFi, NFT and token topics (by title) | 866 posts | 50% |
| AI, Gen AI, agents, LLM and chatbot topics | 562 posts | 33% |
| App and software development | 69 posts | 4% |
| Other | 228 posts | 13% |
| Metaverse, NFT, ICO, IEO and GameFi-era topics | 209 posts | 12% |

**Publishing pace by year:**

| Year | Posts |
|---|---|
| 2018 | 25 |
| 2019 | 87 |
| 2020 | 34 |
| 2021 | 55 |
| 2022 | 149 |
| 2023 | 246 |
| 2024 | 145 |
| 2025 | 255 |
| **2026 (to Oct 26)** | **728** |

In 2026 the pace is 46–108 posts a month.

### 5.2 Risks [Inferred unless marked]

1. **Scaled-content risk.** Publishing nearly triples year on year, mostly under one byline, so this is the profile Google's scaled-content-abuse and helpful-content systems look for. Combined with the self-ranking listicles, it can drag down how the whole domain is assessed. On a comparable site (see the Trillet audit in this repo), a 2026 content flood added impressions and diluted CTR almost entirely through new low-CTR pages. Check whether the same is happening here with a GSC cohort split: pages first seen before 2026 vs in 2026. [Unverified until GSC]
2. **Self-ranking listicles.** There are 92 "Top X … Companies" posts [Verified]. Examples:
   - "Top 15 Blockchain Development Companies in 2026", which has a "Where SoluLab Can Be the Best Fit" section
   - "Top 10 Software Development Companies Los Angeles 2025"
   - "Top 10 NFT Marketplace Development Companies In The UK"

   None states a methodology or discloses that SoluLab is the author's own firm [Verified on a sample of 2]. Google's reviews guidance and its site-reputation enforcement increasingly discount these pages, and AI answer engines tend to cite independent sources over a vendor's self-ranking. Recommendation:
   - Keep the handful that drive leads (check this in GSC).
   - Add a transparent methodology and disclosure, with real evaluation criteria.
   - Consolidate the regional and year variants.
   - Retire the rest.
3. **Legacy topic debt.** 209 metaverse, NFT and ICO posts and dozens of 2018–2022 posts (e.g. "What's new in the store of Microsoft Office 2019" and "GITEX 2018 – See you there") dilute topical focus. 75 orphaned posts from 2022 and 36 from 2019 are prime candidates to prune. Use GSC clicks and backlinks for the decision:
   - 0 clicks in 12 months and no links: 410.
   - Topically relevant: merge and 301.
   - Still earning: refresh.
4. **Single-author concentration.** Shipra is the byline on 1,124 posts, and author archives are `noindex`. For YMYL-adjacent topics (crypto, DeFi, stablecoin regulation, legal AI), Google's quality raters look for named experts with visible credentials. Fix:
   - Make the author pages indexable, with a bio, credentials, LinkedIn and topic focus.
   - Add a technical reviewer field ("Reviewed by [CTO / Blockchain Lead]") on technical posts.
   - Move the team bios (`/rajatlala/` and similar) under `/our-team/<name>/`, add meta descriptions, and give them Person schema with `sameAs`.

### 5.3 Cannibalization clusters [Verified URLs; Inferred overlap]

| Intent | Competing URLs | Recommendation |
|---|---|---|
| AI chatbot development | `/chatbot-development-company/`, `/ai-chatbot-development-company/`, `/ai-chatbot-development-services/`, `/enterprise-ai-chatbot-development-company/` | One primary page (`/ai-chatbot-development-company/`). Keep the enterprise page only if it's genuinely different. 301 the others. |
| Gen AI development | `/generative-ai-development-company/`, `/generative-ai-software-development-company/` (orphan), plus Gen AI consulting | Merge the software page into the development page. |
| Hire Web3 | `/hire-web3/` (62 words), `/hire-web3-developers/` | 301 `/hire-web3/`. |
| Custom software | `/best-custom-software-development/` (canonicalized), `/custom-software-development-company/` | 301 the first, and remove it from the sitemap. |
| Tokenization | `/asset-tokenization-development-company/` (title "RWA Tokenization…"), `/tokenization-platform-development-company/`, `/real-estate-tokenization-development-company/`, `/resources/product-guide/real-estate-tokenization-solulab/`, plus gold and fund variants | Make the asset/RWA page the hub. Keep the vertical pages (real estate, gold, fund) as spokes with distinct intent. Noindex or merge the product-guide page. |
| AI consulting | `/ai-consulting-company/`, `/ai-and-machine-learning-consulting/` (orphan), `/ai-management-consulting/` (orphan), `/ai-consultancy-uk/` (orphan) | Consolidate into the main page, unless the UK page gets real local substance. |
| Blog vs service | e.g. `/top-blockchain-development-companies/` vs `/blockchain-development-company/` | Once GSC is available, check which URL Google ranks for "blockchain development company". If it's the listicle, retarget the listicle to "best blockchain development companies" and point its links at the service page. |
| Near-duplicate posts | "How to launch successful ICO?" vs "How to Launch a Successful ICO in 2026?"; "Top 10 NFT Marketplace Development Companies In The UK" vs "Top NFT Marketplace Development Companies"; "Top AI Crypto Wallet…" vs "Top 10 Crypto Wallet…" | Merge each pair. |

---

## 6. AEO / GEO (AI answer-engine visibility)

**What's in place** [Verified]:
- AI crawlers are allowed in robots.txt.
- Content is fully server-rendered, so no JavaScript is needed to read it.
- `llms.txt` exists with 121 curated links.
- FAQ blocks are on most pages.
- Posts have answer-style intros, "Key Takeaways" boxes and comparison tables.

**Gaps:**

1. **`llms.txt` quality** [Verified]:
   - 10 of its 121 links are redirects. These are the same stale menu URLs, plus `/about-us` without a slash.
   - It lists only service pages: no case studies, research, guides or pricing pages. AI systems cite **evidence**, so add a "Case studies" and a "Guides" section with the 10–20 strongest of each.
   - Optionally add an `llms-full.txt`, which currently returns 404.
2. **Entity consistency.** LLMs build an entity profile from many sources. Today SoluLab's own signals conflict:
   - "US-based" vs an Indian primary address and phone in the schema.
   - 250+ specialists vs third-party profiles listing 51–200 or 230 employees.
   - Several separate Clutch profiles reporting different review counts (39, 42, 55).

   Fix:
   - Choose a canonical description (HQ, founding year, headcount, offices) and use it everywhere: schema, About page, LinkedIn, Clutch, GoodFirms, Crunchbase, Built In.
   - Ask Clutch to merge the duplicate profiles.
   - In the schema, use `address` for the legal HQ and `location` or `department` for the other offices.
3. **Third-party corroboration.** AI answers lean on independent reviews and lists, Reddit, and analyst coverage. SoluLab's own "Top X" posts can't play that role. Prioritize:
   - Clutch and GoodFirms review velocity
   - G2 for any productized offerings
   - Inclusion in genuinely independent rankings
   - Practitioner content: GitHub repos, conference talks, and engineering posts with real code
4. **Answer formatting.** Many posts already open with key takeaways. Standardize on:
   - A 40–60 word direct answer under each H2 question
   - Dated stats with sources
   - Clear "cost", "timeline" and "how it works" sections. Cost and timeline queries are where AI answers most often cite vendors.
5. **Measure it.** In GA4, create a channel group for AI referrers (chatgpt.com, perplexity.ai, gemini.google.com, copilot.microsoft.com, claude.ai). Track a fixed set of 30 prompts across ChatGPT, Perplexity, Gemini and Google AI Overviews every month, noting whether SoluLab is mentioned or cited and which URL. [Unverified: the baseline doesn't exist yet]

---

## 7. Off-page and reputation

All of this is [Unverified] without backlink data.

- **Clutch:** about 4.9/5. Reviewers praise blockchain and AI expertise and communication. Recurring criticism covers timeline and scope management and PM handovers. Several separate profiles appear for the same company. See section 6.
- **Third-party profiles** (Built In, IoT ONE, Celent, Bulldogjob and others) show inconsistent headcount and HQ details.
- **A forum post** on `support.billsby.com/discuss/…` appeared in search for "best AI development companies 2026". If it was placed by SoluLab or an agency, that's a low-quality, parasite-style link pattern that Google discounts and that can cause reputation issues. [Unverified whether it mentions SoluLab]
- **Backlinks: next step.** Pull referring domains from Ahrefs or Semrush, plus GSC → Links. Then:
  1. Find the top linked pages that now 404, 410 or redirect, and 301 each to its closest live equivalent. Many of the 410 case studies probably have links.
  2. Disavow only for clear manipulative patterns.
  3. Build links to the service hubs through digital PR: original data such as an annual "State of RWA tokenization" report, which SoluLab is well placed to publish.

---

## 8. Prioritized action plan

Owners are role placeholders. Effort: S = under 1 day, M = 1–5 days, L = over 1 week.

### Week 1–2: Fix the template-level waste

| ID | Action | Owner | Effort | Success metric |
|---|---|---|---|---|
| T1 | Update the menu, footer and logo links to final URLs with trailing slashes. Flatten the `/dapps-development-services/` chain. | [Dev] | S | 0 redirecting sitewide links |
| T2 | Database search-and-replace for all 372 redirecting link targets. Fix or remove the 111 broken targets and the 10 redirect-to-410 links (CSV files provided). | [Dev] + [Content/SEO] | M | 0 internal 3xx/4xx in the recrawl |
| T3 | Remove the hard-coded `<title>` from `header.php`. Fix the doubled brand in the homepage `og:title`. | [Dev] | S | 1 `<title>` per page |
| T4 | Remove the `AggregateRating` from the sitewide Organization schema. Fix the 7 invalid JSON-LD blocks. Delete the legacy `product` schema. Unify the Organization type. | [Dev] | S | Schema validator: 0 errors |
| T5 | Homepage hero: poster image as the LCP element, remove the 49 MB preload, serve a video under 2 MB on desktop only. | [Dev] | S | Homepage weight under 3 MB, lab LCP under 4 s |
| T6 | Fix the `YOUR_BG_IMAGE_URL` CSS 404. Remove or fix the `pageimprove.io` GTM tag. | [Dev] / [Analytics] | S | 0 console errors |
| T7 | Sitemap cleanup: remove 15 redirects, 1 non-canonical URL and the empty `lp-sitemap`. Fix the `/blogs/` canonical. Remove `nofollow` on 2 posts. | [Dev] / [Content/SEO] | S | 100% of sitemap URLs return 200 and self-canonicalize |
| T8 | One-hop `http://solulab.com` → `https://www.solulab.com/` redirect (Cloudflare rule). | [Web/Cloudflare] | S | 1 hop |
| T9 | Pull GSC (12 months of Pages and Queries, plus Page+Query), Crawl stats, CrUX and backlinks so the next phase can be sized. | [Analytics] | S | Exports delivered |

### Weeks 3–6: Performance, architecture, E-E-A-T

| ID | Action | Owner | Effort | Success metric |
|---|---|---|---|---|
| P1 | Replace base64-in-SVG graphics with external WebP/AVIF images on the 121 pages over 500 KB. Start with the 8 pages over 1.4 MB. | [Dev] / [Design] | M | No HTML over 500 KB |
| P2 | GTM audit: delay non-essential tags until interaction, keep one heatmap tool, remove duplicate gtag. | [Analytics] / [Dev] | M | Lab TBT under 600 ms on templates |
| P3 | Edge HTML caching: move HandL UTM capture to client-side, enable Cloudflare APO or a cache rule. | [Dev] / [Web/Cloudflare] | M | `cf-cache-status: HIT` on anonymous HTML |
| P4 | Images: `fetchpriority` on the hero, lazy-load below the fold, `srcset`, width and height. | [Dev] | M | Lighthouse image audits pass |
| A1 | Orphan triage for 465 URLs: link, merge (301) or retire (410). Re-link the 79 orphaned case studies from the matching service pages. | [Content/SEO] | M | Orphans under 2% |
| A2 | Hub structure: indexable category hubs for the main topics, self-canonical pagination, breadcrumbs on posts and case studies. | [Dev] / [Content/SEO] | M | BreadcrumbList on 100% of posts |
| A3 | Consolidate the cannibalization clusters in 5.3. | [Content/SEO] | M | 1 URL per primary intent |
| E1 | Indexable author pages with credentials and `sameAs`; a "Reviewed by" field on technical posts; team bios moved under `/our-team/`. | [Content/SEO] / [Dev] | M | Author pages indexed |
| E2 | Metadata: 54 missing descriptions, slug-like titles, the long site-name suffix, 5 missing H1s, duplicate case studies. | [Content/SEO] | S | 0 missing meta on commercial pages |

### Weeks 6–12: Content quality and AI visibility

| ID | Action | Owner | Effort | Success metric |
|---|---|---|---|---|
| C1 | Content audit of 1,725 posts against GSC (12 months of clicks and impressions) and backlinks: keep, refresh, merge or remove. Start with the 209 legacy NFT, metaverse and ICO posts and the 39 posts with stale years. | [Content/SEO] | L | 20–30% fewer posts, with no loss of clicks |
| C2 | The 92 "Top X Companies" listicles: keep the top performers with a methodology and disclosure, consolidate the regional and year variants, retire the rest. | [Content/SEO] / [Marketing lead] | M | Disclosure on 100% of the ones kept |
| C3 | Slow publishing to a quality-gated pace. Every new post needs a named expert, original insight or data, and a reviewer. | [Marketing lead] | n/a | Pace governed by a quality checklist |
| C4 | Rebuild the case studies with quantified outcomes, stack, timeline and a quote. Start with the 32 under 600 words. | [Content/SEO] / [Delivery] | L | Every case study has at least one metric |
| G1 | `llms.txt`: fix the 10 redirecting links, add Case studies and Guides sections, publish `llms-full.txt`. | [Content/SEO] | S | 100% of `llms.txt` links return 200 |
| G2 | Entity cleanup: one canonical company description everywhere, Clutch profiles merged, schema addresses fixed. | [Marketing] | M | Consistent NAP and headcount across the top 10 profiles |
| G3 | AI-visibility tracking: a GA4 AI-referrer channel plus a monthly 30-prompt panel. | [Analytics] / [Content/SEO] | S | Baseline recorded |

---

## 9. Data needed for the next phase

1. **GSC** (Web, last 12 months):
   - Pages, Queries, and a combined Page+Query export. Use the API or Looker Studio to get past the 1,000-row cap.
   - Crawl stats by response and by file type.
   - Page indexing report: "Crawled – currently not indexed", "Duplicate without user-selected canonical", and so on.
2. **CrUX:** origin plus URL-level field data (LCP, INP, CLS) for the homepage, service, blog and case-study templates.
3. **Backlinks:** referring domains and top linked pages from Ahrefs or Semrush, to recover equity from the 404, 410 and redirected URLs.
4. **GA4:** landing-page conversions (contact form, consultation bookings) by template, so content pruning protects pages that drive leads.

With these I can:
- Size the opportunity (striking-distance queries, CTR gaps).
- Test whether the 2026 publishing surge diluted CTR.
- Decide keep or prune for each URL with real data rather than proxies.

---

## Appendix: files in this folder

| File | Contents |
|---|---|
| `solulab-page-inventory.csv` | One row for each of the 2,127 live sitemap URLs: type, title and length, meta description length, H1, word count, published and modified dates, author, internal inlinks, schema types, HTML size, images missing alt |
| `solulab-redirecting-internal-links.csv` | 372 internal link targets that 301, with the number of linking pages, hops, final URL and status |
| `solulab-broken-internal-links.csv` | 121 broken targets (404, 410, or a redirect into either), with the number of linking pages |
| `solulab-orphan-pages.csv` | 465 sitemap URLs with no internal link from any crawled page |
| `solulab-sitemap-issues.csv` | Redirects, non-canonical and nofollow URLs in the sitemaps, and the empty sitemap |

**Method notes:**
- The crawl ran October 26, 2026, from a US-East cloud IP, without JavaScript, using a desktop browser user agent, 6 concurrent requests.
- Word counts exclude the header, nav, footer, scripts and SVG.
- An "orphan" means no `<a href>` link from any of the 2,127 crawled pages. Links that reach a page only through a redirect don't count.
- Lighthouse 12.x mobile used the default simulated throttling.
- Lab metrics aren't field Core Web Vitals.

*This audit was prepared with AI assistance (data collection, crawling and analysis). All figures come from the crawl data in this folder and are labeled by confidence.*
