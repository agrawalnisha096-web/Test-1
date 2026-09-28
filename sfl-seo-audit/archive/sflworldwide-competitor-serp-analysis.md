# SFL Worldwide: Competitor, Search Results and Ranking-Drop Analysis

**Date:** 23 September 2026
**Companion to:** [`sflworldwide-seo-audit.md`](sflworldwide-seo-audit.md) (technical and on-page audit)
**Evidence:** [`data/serp-results.csv`](data/serp-results.csv) and [`data/competitor-pages.csv`](data/competitor-pages.csv)

---

## 0. Read this first: how this was measured, and its limits

| What | How | Limit |
|---|---|---|
| Search results | 40 non-brand queries matching SFL's services and main content, plus 5 brand queries. Top 9–10 organic results were recorded for each. | **This is not Google.** Google blocks scripted access (it requires JavaScript, and a browser couldn't be used here). Results come from the search tool available in this environment (US results), with one snapshot per query. Bing's scripted results were checked and discarded because they ignored the query. Treat positions as indicative; Google's order will differ. |
| Competitor pages | 34 ranking pages fetched and measured (word count, headings, structured data, prices, tools, dates) with the same crawler used on SFL. | DHL, one Cargonaija page and one Universal Relocations page blocked the crawler. |
| Authority proxy | Tranco top-1M list (a popularity ranking combined from several traffic sources), downloaded 23 Sep 2026. | It measures popularity, not backlinks. There was no backlink data. |
| Site history | **Not available.** The environment's network policy blocks `web.archive.org` and `index.commoncrawl.org`. | Everything in §5 about *what changed* comes from evidence visible on the live site today, not from archived snapshots. |
| The ranking drop itself | Reported by you. **I haven't verified it**, because there's no Search Console access. | The causes in §5 are ranked by strength of evidence, not proven. §7 lists the data needed to confirm them. |

---

## 1. Summary

1. **Outside India, SFL doesn't rank for its main services.** SFL appeared for **11 of 40** non-brand queries, and **10 of those 11 are India-related.** It didn't appear for any of the 12 "shipping to [country]" queries for other countries, even though it has a dedicated 2,500–4,850-word page for each (UK, Canada, Australia, UAE, Pakistan, Nigeria, Ghana, Germany, New Zealand, China, Mexico, Philippines). It didn't appear for any generic service query either ("international shipping company", "cheapest international shipping", "discounted FedEx/DHL/UPS rates", "package forwarding", "international moving companies", "auto transport companies").
2. **Even in India it's losing the head term.** SFL isn't in the results for "shipping to india from usa". It ranks #3–#5 for 8 of 13 long-tail India queries and never reaches #1 or #2 in this sample.
3. **Some of the rankings it still has point to deleted pages.** Of the 12 SFL URLs returned for non-brand queries, 2 now return **410 Gone**:
   - `/blog/international-car-shipping-from-usa`, #5 for "ship a car overseas from usa".
   - `/blog/is-it-worth-shipping-tv-from-usa-to-india`, #3 for "how to ship a tv from usa to india".

   Across the brand queries, at least **9 SFL URLs in the index now return 404 or 410.** These rankings will disappear as search engines re-crawl, so part of the decline is self-inflicted and still happening.
4. **The top results are held by three types of site, and SFL doesn't fully match any of them:**
   - **Multi-carrier rate platforms** (Easyship, Parcel Monkey, Shippo, ShipStation) with a live quote calculator and a concrete "from $X" price.
   - **Carriers** (DHL, FedEx).
   - **Specialists for a single diaspora corridor or service** (Meest, Qwintry, Cargonaija, Aquantuo, LBC for Philippine boxes, Schumacher Cargo, Seven Seas Worldwide, WCS for cars, Allied and United for moving).
5. **Length isn't the problem.** SFL's country pages are *longer* than most pages that outrank them: 4,851 words on India against Meest 2,829, Easyship 2,228 and Parcel Monkey 1,101. What SFL lacks compared with the winners:
   - **Current data.** SFL's Pakistan and Nigeria pages say their rates "were verified and updated in November 2023". The India page still says "latest 2025 prices". Shippo's UK guide shows 2026 rates and 2026 rule changes.
   - **Original, page-specific substance.** After swapping out the country name, **~32% of each SFL country page's text also appears on 10 or more other SFL country pages.** New Zealand and Saudi Arabia share 68%.
   - **Brand authority.** Easyship, Shippo, ShipStation, DHL, Meest and Qwintry are all in the Tranco top 200k. SFL isn't in the top 1M.
   - **A single clear angle per page.** Winners are either the calculator or the definitive data guide. SFL's pages try to be both a sales page and a guide, with the same "Cheapest Shipping to X" framing on 50+ pages.

---

## 2. Where SFL appears in the results

### 2.1 Visibility by cluster

| Cluster | Queries | SFL present | Best position |
|---|---|---|---|
| India (parcel, cost, rules, boxes, TV, moving) | 13 | **8** | #3 |
| Other country parcel shipping (UK, Canada, Australia, UAE, Pakistan, Nigeria, Ghana, Germany, NZ, China, Mexico, Philippines) | 12 | **0** | none |
| International moving (general, Australia, Germany, Ireland) and domestic (NY to TX) | 5 | 1 (Ireland cost blog) | #4 |
| Car shipping (overseas, USA to UK, auto transport, car to Ghana) | 4 | 1 (**a URL that now returns 410**) | #5 |
| Generic services (international shipping company, cheapest international shipping, discounted carrier rates, package forwarding, dimensional weight) | 5 | **0** | none |
| India to USA food rules | 1 | 1 (an `/en-in/` FAQ page) | #5 |
| **Total** | **40** | **11** | |

### 2.2 Every SFL result that was found

| Query | Pos. | SFL URL | Status today |
|---|---|---|---|
| cheapest way to ship to india from usa | 5 | /worldwide-destinations/shipping-to-india | 200 |
| courier from usa to india | 3 | /worldwide-destinations/shipping-to-india | 200 |
| shipping boxes to india from usa | 3 | /worldwide-destinations/shipping-to-india/shipping-boxes-to-india | 200 |
| how to ship a tv from usa to india | 3 | /blog/is-it-worth-shipping-tv-from-usa-to-india | **410** |
| (same query) | 4, 5 | /blog/how-to-ship-a-tv-from-usa-to-india-a-complete-guide; /worldwide-destinations/shipping-to-india/shipping-tv-to-india | 200 (three SFL pages compete for one query) |
| usa to india shipping cost per kg | 4 | /blog/usa-to-india-shipping-cost-per-kg | 200 |
| how long does it take to ship from usa to india | 4 | /blog/how-long-does-it-take-to-ship-from-the-usa-to-india | 200 |
| moving to india from usa relocation guide | 4 | /blog/moving-to-india-from-the-usa-a-complete-relocation-guide | 200 |
| items not allowed to ship to india from usa | 5 | /blog/what-items-are-not-allowed-to-ship-to-india-from-the-usa | 200 |
| cost to move to ireland from usa | 4 | /blog/how-much-is-it-to-move-to-ireland-from-us | 200 |
| ship a car overseas from usa | 5 | /blog/international-car-shipping-from-usa | **410** |
| shipping food items from india to usa allowed | 5 | /en-in/faq/faqs-about-food-courier-service-from-india-to-usa | 200 |

### 2.3 Brand-query check: dead URLs still in the index

The results for "SFL Worldwide FedEx…", "…shipping to UK", "…domestic shipping" and "…car shipping" returned these SFL URLs that are now dead:

| URL still listed | Status now |
|---|---|
| /blog/international-priority-shipping-with-fedex | 410 |
| /blog/seamless-shipping-from-usa-to-uk-your-ultimate-guide-with-sfl-worldwide | 410 |
| /worldwide-destinations/shipping-to-uk/electronics-iteams | 410 |
| /en-in/blog/shipping-oversized-items-to-uk/ | 308 → 410 |
| /how-domestic-shipping-services-work-in-the-usa | 404 (with the homepage title and conflicting robots tags) |
| /beginners-guide-to-domestic-shipping-in-the-usa | 404 (same) |
| /blog/international-car-shipping-from-usa | 410 |
| /blog/is-it-worth-shipping-tv-from-usa-to-india | 410 |
| *(also)* track.sflworldwide.com | 200, a generic "SFL Worldwide" app page indexed for "SFL Worldwide car shipping" |

**Why it matters:** each of these URLs ranked, and so had some value. Returning 410 without a redirect throws that value away.

---

## 3. Who is winning, and why

### 3.1 Domains appearing most often (40 queries)

| Domain | Queries present | Of which top 3 | Tranco rank | Type |
|---|---|---|---|---|
| easyship.com | 14 | 10 | 124,112 | Multi-carrier rate platform with calculator pages and data guides |
| parcelmonkey.com | 13 | 8 | 497,662 | Multi-carrier booking platform, "from $X" per country |
| dhl.com | 11 | 6 | 1,966 | Carrier |
| **sflworldwide.com** | **11** | **3** | **not in top 1M** | Reseller, mover and forwarder |
| us.meest.com | 9 | 8 | 177,530 (meest.com) | Diaspora parcel specialist, flat per-lb pricing |
| jioworldwide.com | 9 | 0 | not in top 1M | **Same model as SFL** (see §3.4) |
| goshippo.com | 7 | 5 | 55,613 | Shipping software; data-heavy 2026 guides |
| universalrelocations.com | 7 | 0 | not in top 1M | India-corridor mover |
| quora.com / community.ebay.com | 7 each | 0 | n/a | Forums (user-generated content) |
| schumachercargo.com | 5 | 4 | not in top 1M | Car shipping and international moving specialist since 1977 |
| sevenseasworldwide.com | 4 | 4 | 513,774 | International baggage and moving specialist |
| allied.com / movebuddha.com / wcshipping.com | 3 each | 3 each | 191k / 164k / n/a | Moving and car-shipping specialists |

Full rows are in `data/serp-results.csv`.

### 3.2 What the winning pages have in common (measured)

| Page | Words | What it leads with | Structured data |
|---|---|---|---|
| **SFL** /shipping-to-india | **4,851** | "Reliable International Shipping to India from USA Fast & Secure"; quote form; rate table (the page itself says "latest 2025 prices") | Breadcrumb, FAQ, HowTo, Service, Video |
| Meest /delivery-to-india | 2,829 | Meta description: **"$35 / 5 lb"**, "Up to €45 without customs clearance", "$60 cargo insurance"; H2 "Calculate your shipping cost to India" | Breadcrumb, FAQ |
| Easyship /usa-to-india calculator | 2,228 | Live calculator; "Compare India Shipping Quotes"; import duty section | Breadcrumb |
| Parcel Monkey /india | 1,101 | **"Compare reliable shipping services to India from just $26.82"**; calculator above the fold | Product, FAQ, Organization, WebSite |
| Easyship blog "cheap shipping to India" | 4,551 | 3 data tables, 39 price points | **Article**, rating 4.3 from 1,493 reviews |
| Shippo UK guide | 3,304 | **7 tables, 35 prices, "2026"** in title; covers the £135 VAT rule and "What's changing for UK imports" | **BlogPosting** |
| WCS international car shipping | 1,711 | H1 "Car Shipping Calculator & Guide", instant rates | FAQ |
| Schumacher car shipping | 2,643 | Quote form; since 1977 | Product with **rating 4.7 from 6,445 reviews** |
| Qwintry Pakistan | 1,921 | Shop-and-ship calculator | **Review** schema, 4.8 from 10,000 |

**Patterns**
1. **A tool or concrete price shows in the search result.** The winners' titles and descriptions carry a number: "$35 / 5 lb", "from just $26.82", "starts at just $29.99", "Starting at $995", "(2026)". SFL's meta descriptions carry none, for example "Ship from the USA to India with affordable courier and shipping services. Fast, secure, and door-to-door delivery".
2. **Current data and news.** Shippo and Easyship guides are organised around this year's rates and rule changes: UK VAT £135, Germany removing the duty-free threshold from 1 July 2026, China retaliatory tariffs, and the 2026 carrier general rate increases. SFL's rate notes are dated **November 2023** (Pakistan, Nigeria) and **2025** (India).
3. **Blog posts on winning sites carry Article or BlogPosting markup.** Easyship and Shippo do. SFL's 245 posts have none (see the audit, §5).
4. **Specialists win when they own one corridor or service.** Meest (India, Ghana, Pakistan), Qwintry (Pakistan), Cargonaija (Nigeria), Aquantuo (Ghana), LBC and other balikbayan-box shippers (Philippines), and WCS and Schumacher (cars) are each built around one lane. SFL has pages for 51 countries built from one template.
5. **Big brands take the generic head terms.** DHL (Tranco 1,966), Shippo (55k), ShipStation (14k), Allied and United Van Lines. SFL can't realistically out-rank these on authority alone.

### 3.3 Content originality and templating (measured on SFL's 51 country pages)

- Word 8-grams compared after replacing each page's country name with "X".
- **Median page: 32% of its text also appears on at least 10 other SFL country pages** (range 11–38%).
- Most similar pairs: New Zealand and Saudi Arabia **68%**, Colombia and New Zealand 58%, Haiti and Jamaica 56%, Denmark and Finland 54%.
- Shared H2 pattern across the pages: "Get an Instant Quote" (51 pages), "Looking X? Explore Here!" (51), "Why use SFL Worldwide?" (49), "Shipping X" (46), "An Easier Way X" (43), "How Long Does it Take X?" (39), "Which Carriers Ship X?" (38).
- For comparison, SFL's India page shares only ~1% of its 6-grams with Jio Worldwide's India page and ~0.1% with Meest's. **SFL's text isn't copied from competitors or by them.** The problem is the templating across SFL's own pages.

Google's guidance says ranking systems favour content with original, substantial value for each page, and its spam policies name "scaled content abuse" (published March 2024). A set of 51 pages with this much shared text and the same "Cheapest Shipping to X" framing fits the risk profile. With only India pages ranking, the other 50 country pages look like they aren't considered strong enough to rank.

### 3.4 A lookalike competitor: Jio Worldwide

`jioworldwide.com` appears 9 times and uses the same URL scheme and pitch as SFL:
- URLs: `/worldwide-destination/shipping-india/`, `/worldwide-moving/moving-to-india/`.
- H2: "Get Quote and **Save UPTO 70%** on Your Next USA to India Shipping", which is SFL's own tagline.
- Scope: documents to "full households".
- Trustpilot: claimed December 2024, 58 reviews, 4.3, address in Mount Laurel NJ.
- Its text doesn't copy SFL's (about 1% overlap).

Its pages add details SFL's don't have:
- Price-led titles ("Cheap Shipping to UK from USA – Shipping starts at just $29.99").
- "4.7 Reviews on Google" above the fold.
- Visible "updated" dates.
- Separate pages for single items and use cases (TV, electronics, boxes, house moving).

I can't tell whether it's related to SFL. If it isn't, it's a direct competitor built on SFL's own playbook, and it holds positions #4–#7 on 9 queries (India, UK and China).

### 3.5 Reputation signals

- **SFL:** Trustpilot 4.2 from **520** reviews (claimed 2015; 82% 5-star, 9% 1-star), BBB A+, Yelp 80 reviews, MoveAdvisor 60, reviews.io.
- The site claims "1,600+ verified reviews", but no page shows a live rating widget, and there's no Review markup.
- Competitors that rank for moving and car queries show large review counts (Schumacher 6,445, Qwintry 10,000, Easyship 1,493).
- Google doesn't show star ratings for reviews a business publishes about itself on its own Organization or LocalBusiness pages. The value here is trust for users and for how Google judges the site's credibility, not stars in results.

---

## 4. SFL's own pages compared with the winners

| Factor | SFL | Typical winner | Gap |
|---|---|---|---|
| Content length | 2,500–4,850 words | 1,100–5,200 | none (SFL is longer) |
| Concrete price in title or description | ✗ | ✓ ("from $26.82", "$35/5 lb", "$29.99") | **High** |
| Current data (2026 rates, rule changes) | ✗ (Nov 2023 / 2025) | ✓ | **High** |
| Original content per page | ~32% template overlap | page-specific | **High** |
| Working pages (no deleted URLs with rankings) | ✗ (at least 9 indexed URLs dead) | ✓ | **High** |
| Article or BlogPosting schema on guides | ✗ | ✓ (Shippo, Easyship) | Medium |
| Calculator in the page | ✓ (a quote form, but results are on `rates.` subdomain) | ✓ (inline results) | Low–Medium |
| Domain popularity | not in top 1M | 2k–500k | Structural |
| Mobile speed (lab LCP) | 5.2–8.7 s on 5 of 6 pages | not measured | Medium (see audit §6) |

---

## 5. Why rankings fell over the past year: likely causes, strongest evidence first

These are **hypotheses based on today's evidence.** Confirm each one against Search Console data (§7) before acting on it.

### H1. Large-scale deletion of ranking content without redirects (strong evidence)
- `llms.txt` still lists 509 URLs, of which **129 return 410 and 15 return 404** (audit §4.3). Many were recent "2026" posts, such as "How Much to Ship a Car to Texas: Cost & Tips 2026" and "How to Move to Sweden from the USA".
- The search index sampled here still ranks several of these dead URLs (§2.2–2.3), including a #3 and a #5 position.
- Search engines drop a 410 URL quickly and don't pass its value to other pages unless it's 301-redirected.
- **Expected effect:** a stepwise loss of long-tail traffic that continues as each dead URL drops out.

### H2. A platform migration from WordPress to Next.js with SEO regressions (strong evidence of the migration, date unknown)
**Evidence that a migration happened:**
- `robots.txt` still carries WordPress rules (`/wp-json/`, `/wp-admin/admin-ajax.php`, `/blog/tag/`, `/blog/page/`, `?page_id=`, `/wp-content/plugins/wp-sfl-cft/`).
- Media paths keep the WordPress multisite structure (`/assets/uploads/sites/2/2024/11/…`).
- Old trailing-slash URLs still appear in the index and now 308-redirect.
- The site now reports `x-powered-by: Next.js`.

**Regressions that match a migration:**
- Five service pages canonicalised to the homepage.
- Blog pagination lost. The old `/blog/page/N` is disallowed in robots.txt, and the new blog only has a JavaScript "Load More" button.
- The HTML sitemap has 11 dead links.
- The 404 template has conflicting robots tags.
- The sitemap `lastmod` is a single build timestamp.
- Every "Last updated" date equals the publish date.
- There's no Article schema on posts.

Without archive access I **can't date the migration.** If Search Console shows the drop starting when the new site launched, this is the main cause.

### H3. Templated country pages judged as low-value (moderate evidence)
- About 32% of each country page's text is shared with 10 or more sibling pages, with the same "Cheapest Shipping to X" title pattern on 50+ pages.
- **Result:** in this sample, none of the 12 non-India country pages rank for their own main query.
- This matches the direction of Google's quality and spam updates since 2024, which demote scaled pages with little unique value.

### H4. Stale information on money pages (moderate evidence)
- Pricing notes are dated November 2023 (Pakistan, Nigeria) and 2025 (India).
- Blog "Last updated" dates never differ from the publish date.
- Pages that win the same queries lead with 2026 data and rule changes.

### H5. The results pages changed shape, and SFL's authority didn't keep up (moderate evidence; can't be measured without backlink data)
- Head terms are now held by carriers and rate platforms with far more authority (Tranco top 200k, against SFL outside the top 1M).
- Forums (Quora, eBay community, Reddit-type threads) take 7+ positions.
- SFL's remaining visibility has narrowed to India long-tail queries, where it has the most experience and reviews.

### H6. Page experience (weak to moderate evidence)
- Lab LCP is 5.2–8.7 s on 5 of 6 pages and TBT is 820–1,680 ms (audit §6).
- Page speed is rarely the main cause of a large drop, but it adds to the others. Confirm with Search Console's Core Web Vitals (field data) report.

---

## 6. What to do: recovery plan based on these findings

| # | Action | Addresses |
|---|---|---|
| 1 | **Stop the losses now.** Export Search Console and backlink data for the 144 dead URLs. 301-redirect every one that has clicks, impressions or links to its closest live equivalent. For example, `/blog/international-car-shipping-from-usa` → `/services/auto-transport` or a new international car page, and `/blog/is-it-worth-shipping-tv-from-usa-to-india` → `/blog/how-to-ship-a-tv-from-usa-to-india-a-complete-guide`. Stop pruning until this review is done. | H1 |
| 2 | Fix the migration regressions listed in the audit: self-canonicals on the 5 service pages, crawlable blog pagination, HTML sitemap links, the 404 template, real `lastmod` dates and real "Last updated" dates. | H2 |
| 3 | **Rebuild the India cluster around one strong page per intent** and merge the overlapping pages:<br>• One "Shipping to India from USA" page covering prices, calculator, customs and prohibited items.<br>• One cost page merging per-kg, cargo and container.<br>• One prohibited-items page.<br>• One TV page instead of three. | H3, cannibalisation |
| 4 | **Put 2026 data on every money page:**<br>• A dated rate table ("rates checked [month] 2026") built from real quotes for 0.5/5/25/50 lb.<br>• Current duty and tax rules for each country.<br>• A lowest price in the title and meta description (for example "Ship to India from $X").<br>• A process to refresh these every quarter. | H4 |
| 5 | **Pick the countries worth competing for** (corridors where SFL has volume and reviews). Rewrite those pages with country-specific content: real transit data, local customs rules, example quotes, customer stories from that corridor. Merge or noindex the country pages SFL can't support. | H3 |
| 6 | Launch the missing high-intent pages that competitors own and SFL now lacks: international car shipping (the removed page used to rank #5), and item-specific India pages (electronics, luggage) linked from the India hub. | H1, H5 |
| 7 | Use the reputation SFL already has: show the Trustpilot 4.2/520 widget on key pages, add Person schema for the authors, and actively collect reviews for the priority corridors. | H5 |
| 8 | Performance work from the audit (GTM cleanup, edge caching, LCP image). | H6 |

---

## 7. Data needed to confirm the causes

1. **Google Search Console (16 months):**
   - Clicks and impressions by week, annotated with the site launch date and the dates the pages were removed. This confirms H1 and H2.
   - Performance by page: which dead URLs had clicks.
   - Performance by query: which non-India country queries used to bring impressions.
2. **Backlink export** (Ahrefs, Semrush or Search Console Links) for the 144 dead URLs.
3. **The migration launch date** and a copy of the old site's URL list (a WordPress export or the old XML sitemap).
4. **Network access for `web.archive.org`** in this environment (Network access → allowed domains). With it I could compare the old and new versions of each key page directly.
5. A **rank tracker on real Google results** (for example Semrush, Ahrefs or SE Ranking) for the 40 queries in `data/serp-results.csv`, to replace this proxy snapshot with Google positions and history.
