# SFL Worldwide (sflworldwide.com): Technical and On-Page SEO Audit

**Audit date:** 23 September 2026
**Scope:** All 455 URLs in `https://www.sflworldwide.com/sitemap.xml`, plus every internal link found on them, `robots.txt`, `llms.txt`, and the `rates.`, `hub.`, `track.` and `pay.` subdomains.
**Method:** Every figure below was measured directly from the live site on the audit date. Nothing is estimated or taken from the site's own claims. Raw evidence is in [`data/`](data/).

---

## 0. What this audit can and cannot tell you

**Measured directly**
- **Crawl:** HTTP status, redirects, titles, meta descriptions, canonicals, meta robots, hreflang, headings, word counts, structured data, Open Graph tags, images, the internal link graph and broken links. All were taken from the raw server HTML fetched with a Googlebot user agent.
- **Speed:** Lighthouse 12 lab tests (mobile) on 6 representative pages.

**Not measured, because it needs access I don't have**
- Rankings, impressions, clicks and indexed-page counts (these need Google Search Console).
- Traffic and conversions (these need Google Analytics).
- Backlinks (these need Ahrefs, Semrush or Search Console).
- Real-user Core Web Vitals (CrUX field data). The PageSpeed Insights API was over quota.

**Consequence:** this audit shows what is broken or weak on the site. It cannot show how much each issue currently costs in traffic. Section 12 lists the data to pull next to put numbers on that.

**Caveats**
- **Speed tests:** Lighthouse ran once per page from a cloud container. Treat the scores as directional, not exact.
- **Rendering:** the site is Next.js with server-side rendering, and the raw HTML already contains the full page text, links and structured data. So the raw-HTML crawl reflects what Googlebot receives. I did not compare against a JavaScript-rendered DOM.

---

## 1. Executive summary

The site has a solid technical base. All 455 sitemap URLs return 200, HTTPS and www redirect correctly, and pages are server-rendered with unique titles, one H1 each and alt text on every image. The 51 country pages are substantial, with a median of about 2,900 words.

Seven issues block much of that value:

| # | Issue | Severity | Evidence |
|---|---|---|---|
| 1 | **Five core service pages declare the homepage as their canonical.** Google is being told not to index FedEx, DHL, UPS, USPS and Domestic Shipping as separate pages. Domestic Shipping is linked from every page. | Critical | §3.1 |
| 2 | **~236 blog posts are hard to discover through internal links.** The blog index shows 9 posts and loads the rest with a JavaScript "Load More" button. `?page=2` returns the same page. The HTML sitemap links to 0 posts. 187 of 245 posts have 2 or fewer internal inlinks. | Critical | §4.2 |
| 3 | **Large-scale content removal left broken links behind.** 144 URLs listed in `llms.txt` return 410 or 404, including posts titled "2026". 41 removed URLs are still linked from 69 places on live pages, 11 of them from the HTML sitemap. | High | §4.3 |
| 4 | **Slow mobile performance.** Lighthouse mobile performance is 41–68. LCP is 5.2–8.7 s on 5 of 6 pages. Total Blocking Time is 820–1,680 ms. The Google Tag Manager container alone is 522 KB. | High | §6 |
| 5 | **Blog posts have no structured data at all.** None of the 245 posts has Article/BlogPosting, BreadcrumbList or Person markup. There is no LocalBusiness markup for the 5 offices. | High | §5 |
| 6 | **The India and Canada sections are mostly copies of US pages,** and hreflang is incomplete. 12 page pairs are 100% identical. 31 of the 72 locale pages have no hreflang. `/en-in/blog` is an empty page that is in the sitemap. | Medium–High | §7 |
| 7 | **The sitemap carries misleading signals.** 435 of 455 `lastmod` dates are the same timestamp. It includes a noindex page and the 5 pages canonicalised to the homepage. It leaves out the author pages. | Medium | §3.3 |

---

## 2. Site facts (as crawled)

| Item | Value |
|---|---|
| Platform | Next.js (`x-powered-by: Next.js`) behind Cloudflare, HSTS enabled |
| Legacy platform | WordPress. `robots.txt` still has `/wp-json/`, `/wp-admin/` and `?page_id=` rules, and image paths use `/assets/uploads/2022/…` |
| URLs in XML sitemap | 455 (single file, no sitemap index) |
| Sitemap sections | blog 244 · worldwide-destinations 82 · en-in 42 · en-ca 28 · root-level 23 · services 9 · faq 7 · resources 6 · worldwide-moving 6 · carriers 4 · about-us 2 · contact-us 2 |
| Status of sitemap URLs | 455 × 200 · 0 redirects · 0 errors |
| `<html lang>` | en-US 383 · en-IN 43 · en-CA 29 |
| Median server response time (crawl) | 0.49 s (p90 0.61 s) |
| Median raw HTML size | **690 KB** (maximum 878 KB) |
| Blog authors | 2 (Punit Manchanda 131 posts, Maria Hernandez 115) |
| Blog publish years | 2019: 4 · 2020: 5 · 2021: 2 · 2022: 23 · 2023: 42 · 2024: 73 · 2025: 57 · 2026: 40 |

---

## 3. Indexing and crawl controls

### 3.1 CRITICAL: five service pages canonicalised to the homepage

Each of these pages has unique content (1,255–2,629 words) and its own `og:url`. However, `<link rel="canonical">` points to `https://www.sflworldwide.com`. Their hreflang tags also point to the homepage variants (`/`, `/en-in`, `/en-ca`).

| URL | Title | Words | Canonical |
|---|---|---|---|
| /carriers/shipping-with-fedex | FedEx International Shipping \| SFL Worldwide | 1,521 | homepage |
| /carriers/shipping-with-dhl | Ship with DHL: Reliable Global Delivery Services | 1,429 | homepage |
| /carriers/shipping-with-ups | Shipping Solutions with UPS: Reliable and Fast | 1,564 | homepage |
| /carriers/shipping-with-usps | Reliable Shipping With USPS Services \| SFL Worldwide | 1,255 | homepage |
| /services/domestic-shipping | Professional Domestic Shipping Services USA \| SFL Worldwide | 2,629 | homepage |

**Effect:** Google usually honours a canonical when the pages are similar. When the content is this different it may ignore it, but you can't rely on that. Either way, these pages can't reliably rank for carrier queries like "FedEx international shipping discount" or for "domestic shipping services". `/services/domestic-shipping` is in the site-wide navigation on all 383 US pages.

**Fix:** make each page's canonical point to itself. Give hreflang the page's own locale alternates, or remove it if none exist. This is most likely a template bug: the metadata falls back to homepage values for these routes.

### 3.2 Meta robots and noindex

- 454 of 455 sitemap URLs are `index, follow`.
- `/shipping-moving-to-india-from-the-usa` is **`noindex, nofollow` but listed in the sitemap**. It has 0 internal inlinks.
- `/shipping-moving-to-usa-from-india` is also `noindex, nofollow`, is not in the sitemap, and uses the homepage's `<title>`.
- Both look like paid-ad landing pages. That's fine, but the first should be removed from the sitemap.
- **The 404 template has two conflicting robots tags:** `<meta name="robots" content="noindex"/>` and `<meta name="robots" content="index, follow"/>`. It also uses the homepage title. The HTTP status is correctly 404, so the impact is low. Still, the template should output one `noindex` and a "Page not found" title.

### 3.3 XML sitemap

| Finding | Detail |
|---|---|
| `lastmod` is not meaningful | **435 of 455** URLs have `lastmod` 2026-09-21 (generated at build time). The homepage says 2024-12-17 and `/about-us` says 2022-10-31. Google ignores `lastmod` values it finds unreliable, so fresh-content signals are lost. |
| Includes pages that shouldn't be indexed | the noindex page above, plus the 5 pages canonicalised to the homepage (§3.1) |
| Includes thin or empty pages | `/en-in/blog` ("No blog posts available yet") and `/carriers` (10 words) |
| Leaves out indexable pages | `/author/punit-manchanda` and `/author/maria-hernandez` return 200, are indexable, and are linked 393 and 345 times, but aren't in the sitemap |
| `changefreq` and `priority` | `weekly` and `0.8` on almost everything. Google ignores both, so this is harmless. |

### 3.4 robots.txt

- Sitemap declared correctly. Blocks Amazonbot, Applebot-Extended and Bytespider (Cloudflare-managed AI rules). Googlebot, Bingbot and the other main crawlers are allowed.
- It contains Cloudflare's "Content-Signal" preamble comments but **no actual `Content-Signal:` directive**, so the comment block does nothing.
- The legacy WordPress rules (`/wp-json/`, `/blog/tag/`, `/blog/page/`, `?page_id=` and others) are harmless now but are leftovers.

### 3.5 URL normalisation (tested)

| Request | Result |
|---|---|
| `http://sflworldwide.com/` | 301 → `https://sflworldwide.com/` → 301 → `https://www.` (**2 hops**; could be 1) |
| `http://www.sflworldwide.com/` | 301 → https www ✔ |
| `/about-us/` (trailing slash) | 308 → `/about-us` ✔ |
| `/About-Us` (uppercase) | 404 (acceptable) |
| `/?utm_source=x` | 200 with canonical to clean URL ✔ |

### 3.6 Subdomains

| Host | Status | robots.txt | Title | Notes |
|---|---|---|---|---|
| rates.sflworldwide.com | 200 | **returns the HTML app shell, not a robots file** | "SFL Worldwide - Get Quote" | A JavaScript app linked 2,398 times from the main site |
| hub.sflworldwide.com | 200 | `Disallow: /` + `noindex` | "SFL Worldwide" | Correctly blocked |
| track.sflworldwide.com | 200 | allow all | "SFL Worldwide" | Indexable app shell with a generic title |
| pay.sflworldwide.com | 200 | allow all | "SFL Worldwide" | Indexable payment app with a generic title |

**Fix:** add `noindex` to `track.` and `pay.` (or block them in robots.txt), and serve a real `robots.txt` on `rates.`.

---

## 4. Site architecture and internal linking

### 4.1 Navigation

- Every US page carries the same **41 internal links** in the header and footer. These cover the main services, 8 "Shipping to X" countries, 6 "Moving to X" countries, and the About, Contact, FAQ, Resources and Blog pages.
- **The homepage links to only 42 unique internal URLs.** That is essentially just the navigation: no links to the other 43 country pages, the 29 destination sub-guides, or any blog post.
- Internal links per page: median 67, range 6–156.

### 4.2 CRITICAL: blog posts are hard to find through links

| Evidence | Value |
|---|---|
| Post links on `/blog` | **9** |
| How older posts load | JavaScript "Load More" button (no `<a href>` pagination) |
| `/blog?page=2` | 200, **same posts as page 1** |
| Blog posts in the HTML sitemap (`/sitemap`, 127 links) | **0** |
| Blog posts with ≤2 internal inlinks (a post's link to itself counts) | **187 of 245** |
| Country pages with ≤2 inlinks | 37 of 53 |
| Destination sub-guides with ≤2 inlinks | 18 of 29 |

Outside the 9 on the index page, most posts can only be found through the XML sitemap and occasional in-text links. Google can still find them that way. However, internal links are the main way to show which pages matter, and these posts pass and receive almost none of that value.

**Orphan pages** (in the sitemap, 0 internal links from any sitemap page):
- `/best-usa-to-india-courier-services-for-fast-and-affordable-delivery`
- `/shipping-moving-to-india-from-the-usa` (noindex)
- `/worldwide-destinations/shipping-to-australia/restricted-items`
- `/worldwide-destinations/shipping-to-china/sending-documents`
- `/worldwide-destinations/shipping-to-france/detailed-shipping-guide`
- `/worldwide-destinations/shipping-to-france/restricted-prohibited-items`
- `/worldwide-destinations/shipping-to-nigeria/prohibited-and-restricted-items-for-shipping-to-nigeria`
- `/worldwide-destinations/shipping-to-pakistan/shipping-documents-to-pakistan`
- `/worldwide-destinations/shipping-to-singapore/comprehensive-guide`

**Fix:**
- Add real paginated archive URLs (`/blog/page/2` or `?page=2` that render different posts, linked with `<a href>`). Note that robots.txt currently disallows `/blog/page/` and `/blog/*/page/`, so remove those rules if you use that URL pattern.
- Add category hubs (India, Car Shipping, Moving, Customs, Packing) and link them from the blog index.
- Link each country page to its related blog posts and sub-guides, and link each post back to its country page and service page.
- Add a "Latest guides" block to the homepage.

### 4.3 HIGH: removed content, broken links and a stale llms.txt

- `/llms.txt` lists 509 URLs. **Of these, 129 return 410, 15 return 404 and 2 redirect.** Many of the removed ones were recent. Examples:
  - `/blog/how-much-to-ship-a-car-to-texas` ("How Much to Ship a Car to Texas: Cost & Tips 2026")
  - `/blog/moving-to-sweden-from-usa-shipping-guide`
  - `/blog/cost-of-moving-to-sweden-from-usa-air-sea-freight`
  - `/blog/local-vs-nationwide-car-shipping-find-the-best-option`
- 410 ("Gone") is a legitimate way to retire content. But none of these URLs redirect to a surviving equivalent. For example, `/blog/what-is-the-cost-of-shipping-from-usa-to-india` is 410 while `/blog/usa-to-india-shipping-cost-per-kg` exists. Any backlinks or rankings those URLs had are lost. Check them in Search Console and a backlink tool before deciding which to redirect.
- **41 removed URLs are still linked from 69 places on live pages** (full list in `data/broken-internal-links.csv`). Examples:
  - `/services/reliable-international-relocation-services`, `/about-us` and `/worldwide-moving/moving-to-india` link "READ MORE" to 410 `/blog/top-10-benefits-of-an-international-relocation`.
  - `/worldwide-destinations/shipping-to-india` links to 410 `/blog/what-is-the-cost-of-shipping-from-usa-to-india` and 410 `/blog/top-10-challenges-when-shipping-to-india-from-the-usa`.
  - **The HTML sitemap `/sitemap` has 11 dead links:** `/introducing-ship-smart`, `/search`, `/accreditations`, `/trusted-reviews`, `/contact-support`, `/locations`, `/carriers/dhl`, `/carriers/fedex`, `/carriers/ups` and `/carriers/usps` return 404. The correct URLs exist under `/about-us/…`, `/contact-us/…` and `/carriers/shipping-with-…`.
  - Cloudflare email obfuscation creates links to `/cdn-cgi/l/email-protection` (404) on 3 pages.
- 92 live sitemap URLs are missing from `llms.txt`.

**Fix:**
- 301-redirect removed posts that have a close surviving equivalent.
- Update every internal link in `broken-internal-links.csv`.
- Fix the HTML sitemap links.
- Regenerate `llms.txt` from the live sitemap.

### 4.4 Anchor text and crawlable links

- "READ MORE" is used as anchor text **72 times**, including on the main India page and the Worldwide Shipping page.
- On blog posts, Lighthouse found `<a tabindex="0">` elements with no `href`. These are clickable controls that search engines can't follow.

---

## 5. Structured data (JSON-LD)

| Type | Pages |
|---|---|
| BreadcrumbList | 201 |
| FAQPage | 112 (1,022 questions) |
| VideoObject | 18 |
| Organization | 9 |
| Service | 6 |
| HowTo | 1 |
| **No JSON-LD at all** | **253 pages, including all 245 blog posts** |

Findings:
1. **Blog posts:** there is no `BlogPosting`/`Article` (headline, dates, author, image), no `BreadcrumbList` even though a breadcrumb is shown on the page, and no `Person` markup for the two author pages. Visible "Published on / Last updated" dates and author names exist, but only as plain text.
2. **Organization** (homepage) has name, logo and contactPoint. It lacks `sameAs` (the social profiles are linked in the footer on every page), `address`, `foundingDate` and identifiers (FMC and DOT numbers).
3. **No `LocalBusiness`/`MovingCompany`** markup for the 5 office addresses on `/contact-us/locations`.
4. **No `WebSite`** markup.
5. **`Service` markup** is on only 6 of the 51 country pages.
6. **FAQ quality:** 2 questions have an **empty `acceptedAnswer`**:
   - "How to avoid customs charges in India?" on `/worldwide-destinations/shipping-to-india`
   - "What is the approximate cost of shipping from the USA to Australia?" on `/worldwide-destinations/shipping-to-australia`

   5 FAQ questions on `/en-in/resources/guide-to-custom-duty-calculator` aren't visible on the page, which breaks Google's structured-data guidelines.

   Note that since 2023 Google shows FAQ rich results only for well-known government and health sites. FAQ markup here is useful for machine readability, not for rich results.

**Fix:** add BlogPosting + BreadcrumbList + Person to the blog template, LocalBusiness (or `MovingCompany`) per office, WebSite, and a complete Organization. Fill in or remove the empty FAQ answers.

---

## 6. Performance (Lighthouse 12, mobile, single run)

| Page | Perf | A11y | Best practices | SEO | FCP | LCP | TBT | CLS | Weight |
|---|---|---|---|---|---|---|---|---|---|
| Home | **41** | 96 | 75 | 100 | 2.7 s | **6.4 s** | **1,680 ms** | 0 | 1.67 MB |
| Shipping to India | 68 | 86 | 75 | 92 | 1.4 s | 1.7 s | 960 ms | **0.201** | 2.30 MB |
| Blog: electronics to India | 51 | 88 | 75 | 92 | 2.6 s | **5.2 s** | 1,060 ms | 0 | 2.08 MB |
| Worldwide Shipping | 50 | 86 | 75 | 92 | 2.1 s | **7.9 s** | 820 ms | 0.073 | 2.22 MB |
| Auto Transport | **41** | 92 | 75 | 100 | 2.7 s | **8.7 s** | 1,330 ms | 0 | 1.59 MB |
| /en-in | 52 | 96 | 75 | 100 | 1.3 s | **6.1 s** | 930 ms | 0.091 | 2.13 MB |

Thresholds for "good": LCP ≤ 2.5 s, CLS ≤ 0.1, TBT (lab) ≤ 200 ms.

**Main causes (from the Lighthouse diagnostics):**
- **Third-party scripts:**
  - Google Tag Manager: **~522 KB**, 640–790 ms main-thread blocking per page.
  - Facebook Pixel: ~253 KB, 450–710 ms blocking.
  - Microsoft Clarity: 115–180 ms blocking.
  - Bing Ads, DoubleClick, ipdata.co (on some pages) and a DMCA badge script.
- **Unused JavaScript:** about 325 KB per page.
- **Large HTML:** the homepage document is 760 KB, of which **443 KB is the inline Next.js RSC payload** (`self.__next_f`). Every page is 690 KB of HTML on average.
- **No caching of HTML:** `cache-control: private, no-cache, no-store` and `cf-cache-status: DYNAMIC`, so Cloudflare never caches pages even though the content is static.
- **Images:** 28,152 `<img>` tags across 455 pages (about 62 per page). Of these, 13,910 are SVG icons and 7,084 PNG. Only 938 are WebP and 1,182 go through `next/image`. Lighthouse flags offscreen images (up to 431 KB on /en-in), unsized images (which cause CLS), and missing modern formats.
- **LCP element problems:** on `/en-in` the LCP image is `loading="lazy"`, which delays it. On `/services/auto-transport` the LCP is a full-bleed background image with `alt="Background"`.
- **Homepage console error:** React hydration error #418 (the server HTML doesn't match what the client renders). This causes extra re-rendering work.
- The CSP blocks a Facebook frame on every page, which causes a console error.

**Fix, in order of impact:**
1. Audit the GTM container: remove unused tags and load marketing tags after user interaction or consent.
2. Make HTML cacheable at the edge (ISR/SSG with `s-maxage`).
3. Serve the hero or LCP image through `next/image` with `priority` and never lazy-load it.
4. Convert PNGs to WebP or AVIF and set width and height on images.
5. Reduce the client components that inflate the RSC payload.
6. Fix the hydration mismatch.

Confirm improvements with CrUX field data in Search Console.

---

## 7. International setup (en-US / en-IN / en-CA)

- **Structure:** subfolders `/en-in/` (43 pages) and `/en-ca/` (29 pages). The US site is at the root. `lang` and `og:locale` are set correctly per locale.
- **hreflang:** 68 of 455 pages have it (en-US, en-IN, en-CA, x-default). Every existing pair checked was reciprocal, except the 5 carrier and domestic pages that point to the homepage.
- **31 of the 72 locale pages have no hreflang**, including key commercial pages:
  - `/en-in/services/international-shipping-from-india`
  - `/en-in/worldwide-destinations/shipping-to-usa-from-india`
  - `/en-ca/services/international-shipping-from-canada`
  - `/en-ca/worldwide-destinations/shipping-to-india-from-canada`

  These pages are unique to their market (no US equivalent), so they need no hreflang. However, if they have partial equivalents, add them. Either way, keep the templates consistent.
- **Duplication:** 12 page pairs are 100% identical and 26 pairs are 83% or more similar (6-word shingle Jaccard). Examples:
  - Identical: `/contact-us`, `/en-in/contact-us` and `/en-ca/contact-us`; the security and terms pages in all 3 locales.
  - Near-identical: `/resources/cft-calculator` vs `/en-ca/resources/cft-calculator` (0.97); `/en-in/your-trusted-partner-in-employee-relocation` vs its US version (0.92).

  With hreflang in place this is acceptable. Without hreflang (as on many locale pages) it's duplicate content.
- **Empty or thin locale pages in the sitemap:**
  - `/en-in/blog`: "No blog posts available yet", 14 words.
  - `/en-ca/blog`: 84 words.
  - `/en-in/worldwide-destinations`: 95 words.
- **Locale title pattern:** some India titles append " - Best Shipping and Moving Services across India" to unrelated pages, for example "Cookie Policy - Best Shipping and Moving Services across India".

**Fix:**
- Decide which pages each locale really needs (services, local destinations, contact details).
- Localise their content (prices in INR/CAD, local offices, local phone numbers). Noindex or remove the pure copies (legal pages, calculators) or canonicalise them to the US version.
- Remove the empty blog pages from the sitemap.

---

## 8. On-page elements

### 8.1 Titles (455 pages)
- One `<title>` per page. Length: 436 are 30–60 characters, 9 are over 60 and 10 under 30.
- Duplicates:
  - "Sitemap - SFL Worldwide" ×3 and "Request a Call Back - SFL Worldwide" ×2 (locale copies; acceptable with hreflang).
  - "Prohibited and Restricted Items For Shipping to Nigeria" ×2: `/blog/prohibited-and-restricted-items-for-shipping-to-nigeria` and `/worldwide-destinations/shipping-to-nigeria/prohibited-and-restricted-items-for-shipping-to-nigeria`. **These are two separate pages on the same topic.**
- `/worldwide-moving` has the title **"worldwide-moving"**, the raw URL slug. This is the hub page for the whole moving section, and it's linked from every page.
- **"Cheapest" (or cheap/affordable) appears in 67 titles**, including almost every country page ("Cheapest Shipping to X from USA"). The keyword is relevant, but using the same pattern everywhere gives the pages no way to stand out in search results.
- Stale years: "Best Shipping Options For from the USA to China in 2023" (also ungrammatical), "Shipping Vitamins: … (2023)", "Logistics Industry Trends 2023".
- Grammar errors in titles: "…Shipping to the Singapore", "What are the the Benefits of Multi-Carrier Shipping?".

### 8.2 Meta descriptions
- All 455 pages have one. 453 are 70–160 characters and 2 are over 160 (homepage 162, `/en-in/your-trusted-partner-in-employee-relocation` 163). 3 duplicate sets, all from the locale copies and the Nigeria pair above.

### 8.3 Headings
- Exactly one H1 on all 455 pages.
- The homepage H1 is "International Shipping & Moving Company". Its H2s are generic section labels ("What We Offer", "Who We Are", "Our US Offices").
- Lighthouse flags `heading-order` errors (skipped levels) on the India and Worldwide Shipping pages.
- Every country page repeats the same boilerplate H2s: "Get an Instant Quote", "Looking X? Explore Here!", "Accredited By", "See our Trusted Reviews" and "Our US Offices".

### 8.4 Images
- **All 28,152 images have alt text**, but much of it is generic or repeated:
  - "star" appears 4,840 times.
  - "question symbol" appears 1,011 times.
  - Social icons appear about 700 times each.
  - "Background" is used as the alt for the Auto Transport hero image.

  Lighthouse also flags `image-redundant-alt`. Decorative images should use `alt=""`.

### 8.5 Social and Open Graph
- `og:title` is on all pages and `og:image` on 453. **However, 438 pages share one `og:image`** (`/assets/uploads/2023/08/home-ship.png`), so shared links all show the same picture.
- 2 of the newest posts have no `og:image`:
  - `/blog/shipping-electronics-from-usa-to-india`
  - `/blog/moving-from-new-york-to-texas-cost-and-tips-guide`
- `twitter:card` is `summary` (small image). `summary_large_image` would suit articles better.
- The 3 HTML sitemap pages have no `og:url`.

---

## 9. Content quality and topic coverage

### 9.1 Content depth
| Page type | Median words (main content) |
|---|---|
| All pages | 1,460 |
| Country pages (51) | 2,921 (min 2,467) |
| Blog posts | 1,482 |
| Homepage | **497** |

Thin pages (under 300 words): `/carriers` (10), `/en-in/blog` (14), `/resources/docs` (34), `/contact-us/locations` (54, and 48 and 51 for the locale versions), the 3 HTML sitemaps, the 3 security pages (99 each), the 3 contact pages (103 each), `/en-ca/blog` (84) and `/en-in/worldwide-destinations` (95).

### 9.2 Keyword cannibalisation: the India cluster
**25 indexable URLs** target "shipping from USA to India" variants. These include:
- `/worldwide-destinations/shipping-to-india` ("Shipping to India from US - Door-to-Door, Cheapest and Fastest")
- `/best-usa-to-india-courier-services-for-fast-and-affordable-delivery` (orphan, root-level)
- `/worldwide-moving/moving-to-india` and `/blog/moving-to-india-from-the-usa-a-complete-relocation-guide`
- `/blog/usa-to-india-shipping-cost-per-kg`, `/blog/shipping-cargo-from-usa-to-india-cost-process-delivery-time`, `/blog/usa-to-india-container-shipping-cost` (three separate "cost" pages)
- `/blog/international-shipping-to-india-what-you-can-and-cannot-send` and `/blog/what-items-are-not-allowed-to-ship-to-india-from-the-usa` (two "prohibited items" pages)

Search Console data would show which of these compete for the same queries. On URLs and titles alone, the "cost" and "prohibited items" pairs overlap directly and should be merged or clearly differentiated.

The same pattern appears for Nigeria prohibited items (a blog post and a destination sub-page with an identical title).

### 9.3 Freshness and trust signals (E-E-A-T)
- **"Published on" equals "Last updated" on all 246 blog posts,** so the site never shows that a post has been updated, even on posts from 2019–2023.
- Two authors are credited with every post back to 2019. The author pages exist (about 220 words each, with job titles) but have no Person schema, and the posts don't link to credentials.
- **The site contradicts itself about its experience.** It mentions "18 years" 9 times, "15 years" 7 times and "20 years" once. `/is-sfl-worldwide-legit` says "Over 15 Years of Experience", while the About page says the company was founded in 2005 (21 years). Pick one figure and use it everywhere.
- The reviews figure is "1,600+ verified reviews". `/about-us/trusted-reviews` has 421 words, and no Review or AggregateRating markup was found.
- The FAQ on `/worldwide-destinations/shipping-to-india` answers "Is FedEx shipping to India?" with "Contact FedEx directly for more information on its rates". That sends a buyer away from the site's own quote tool.
- Some blog topics are far from the core business: automated replenishment, logistics ERP software, carbon-neutral shipping, and "What will Trump's win mean for the logistics industry" (the last is now 410).

### 9.4 Local SEO and NAP consistency
`/contact-us/locations` lists the offices under city names, but the street addresses are in other cities:

| Label | Address on page |
|---|---|
| Atlanta, GA | 180 Cason Way, **McDonough**, GA 30253 |
| Dallas, TX (HQ) | 3364 Garden Brook Drive, **Farmers Branch**, TX 75234 |
| Los Angeles, CA | 2189 S Grand Avenue, **Santa Ana**, CA 92705 |
| Newark, NJ | 337 Sherman Ave, Newark, NJ 07114 |
| San Francisco, CA | 44137 Fremont Blvd, **Fremont**, CA 94538 |

These names must match the Google Business Profiles exactly; I couldn't verify the profiles themselves. There are no individual location pages and no LocalBusiness schema. The page also shows Canada (+1-647-947-8480) and India (92-0101-9090) phone numbers.

---

## 10. What's working (verified)

- All 455 sitemap URLs return 200 with no redirect chains. HTTPS and www are consolidated.
- Server-side rendering: the full text, links and JSON-LD are in the raw HTML.
- Unique titles and descriptions on almost every page, one H1 per page, `lang` set per locale, viewport set.
- Alt text on 100% of images. Lighthouse SEO score 92–100 and accessibility 86–96.
- BreadcrumbList on 201 pages. FAQ content on 112 pages (1,022 Q&As, all but 2 answered).
- Deep country pages (median about 2,900 words) with consistent sections: cost, transit time, carriers, prohibited items and FAQs.
- An active blog (40 posts published in 2026 so far) that targets long-tail cost and process queries.
- Good security headers (HSTS, CSP, X-Frame-Options, nosniff).

---

## 11. Prioritised action plan

| Priority | Action | Effort | Section |
|---|---|---|---|
| **P0** | Fix self-canonicals and hreflang on the 4 carrier pages and `/services/domestic-shipping` | Small (template) | 3.1 |
| **P0** | Fix the 11 dead links in the HTML sitemap and the 69 broken in-content links | Small | 4.3 |
| **P0** | Remove the noindex, canonicalised and empty pages from the XML sitemap; output real `lastmod` dates | Small | 3.3 |
| **P1** | Add crawlable blog pagination and category hubs, and remove the conflicting `robots.txt` disallows | Medium | 4.2 |
| **P1** | Add BlogPosting, BreadcrumbList and Person schema to the blog template; add LocalBusiness, WebSite and a complete Organization | Medium | 5 |
| **P1** | GTM and third-party cleanup; make HTML cacheable at the edge; fix LCP images and the hydration error | Medium–Large | 6 |
| **P1** | 301-redirect removed posts to their closest live equivalent (after checking backlinks and Search Console) | Medium | 4.3 |
| **P2** | Fix the `/worldwide-moving` title; vary the "Cheapest…" title pattern; fix the stale-year and ungrammatical titles | Small | 8.1 |
| **P2** | Merge the overlapping India "cost" and "prohibited items" pages and the Nigeria duplicate; link the orphan pages in | Medium | 9.2, 4.2 |
| **P2** | Localise or trim the `/en-in` and `/en-ca` sections; complete hreflang or canonicalise the copies | Medium | 7 |
| **P2** | Link country pages to related posts and sub-guides; replace the 72 "READ MORE" anchors with descriptive text | Medium | 4.1, 4.4 |
| **P3** | Use one experience figure everywhere; show real "last updated" dates; fill the 2 empty FAQ answers; rewrite the FedEx answer | Small | 9.3, 5 |
| **P3** | Unique `og:image` per page; `summary_large_image`; decorative `alt=""` | Small | 8.4, 8.5 |
| **P3** | Add `noindex` to `track.` and `pay.`; add a real robots.txt on `rates.`; reduce the non-www HTTP redirect to 1 hop; fix the 404 template's robots tags and title | Small | 3.6, 3.5, 3.2 |
| **P3** | Regenerate `llms.txt` from the live sitemap | Small | 4.3 |

---

## 12. Data needed to put numbers on the impact (next step)

1. **Google Search Console:**
   - Performance by page and query for the last 16 months: to size the carrier and domestic canonical issue, the India cannibalisation, and the traffic lost from the 410'd posts.
   - Page indexing report: to confirm the "Alternate page with proper canonical" and "Crawled – currently not indexed" counts.
   - Core Web Vitals report (field data).
2. **Backlink export** (Ahrefs, Semrush or Search Console Links): which 410 and 404 URLs have external links, so you know which to 301 first.
3. **GA4:** landing-page sessions and conversions, to rank fixes by revenue.
4. **Google Business Profile listings** for the 5 offices: to check that the NAP details match.

---

## Appendix: evidence files

| File | Contents |
|---|---|
| `data/page-inventory.csv` | One row per sitemap URL: status, title, description length, canonical, robots, lang, hreflang count, H1, H2 count, word count, schema types, internal inlinks, image count, og:image |
| `data/broken-internal-links.csv` | Every live page that links to a 404 or 410 URL, with the anchor text |
| `data/llms-txt-link-status.csv` | HTTP status of all 509 URLs listed in `/llms.txt` |
| `data/near-duplicate-pairs.csv` | 92 page pairs with ≥50% content overlap (6-word shingle Jaccard on main content) |
| `data/lighthouse-mobile.csv` | Lighthouse mobile scores and metrics for the 6 tested pages |
