# mostagroup.com: full site plan (v1, 27 Nov 2026)

Front-loaded build: all planned pages at launch. Every page is written for one buyer and one search intent, and leads to one action: **book the free 30-minute review**.

Copy for every page is in `site/copy/`. Placeholders in [BRACKETS] need facts from Dominic. Nothing in the copy invents results, clients or quotes.

## 1. Sitemap (34 pages)

| # | URL | Type | Primary search intent | Main traffic |
|---|---|---|---|---|
| 1 | / | Home | brand, "ai and automation consulting" | Direct, LinkedIn, brand search |
| 2 | /services/ai-consulting | Service | ai consulting, ai consultant, ai consulting company | Search AG3 |
| 3 | /services/ai-implementation | Service | ai implementation, ai agents for business | Search AG5 |
| 4 | /services/process-automation | Service | business process automation, automation consultant | Search AG1, AG2 |
| 5 | /solutions | Index | | Internal |
| 6 | /solutions/faster-month-end | Problem | month end close automation, finance automation | Search, LinkedIn CFOs |
| 7 | /solutions/grow-without-hiring | Problem | automate admin, reduce admin workload | LinkedIn owners/CEOs |
| 8 | /solutions/ai-that-pays-back | Problem | ai roi, ai productivity for business | LinkedIn CEOs |
| 9 | /solutions/where-to-start-with-ai | Problem | ai readiness, ai strategy for business | Search AG6, LinkedIn |
| 10 | /solutions/multi-site-visibility | Problem | multi-site reporting, franchise reporting | LinkedIn COOs |
| 11 | /solutions/spreadsheet-risk | Problem | replace spreadsheets, spreadsheet automation | Search, LinkedIn |
| 12 | /use-cases | Index | | Internal |
| 13 | /use-cases/accounts-payable-automation | Use case | accounts payable automation, invoice automation | Search |
| 14 | /use-cases/xero-automation | Use case | xero automation, xero dashboards, xero reporting | Search |
| 15 | /use-cases/ai-document-processing | Use case | ai document processing, ai data entry | Search |
| 16 | /use-cases/ai-customer-service | Use case | ai customer service assistant, ai chatbot for business | Search |
| 17 | /industries | Index | | Internal |
| 18 | /industries/healthcare-clinics | Industry | ai for medical practices, clinic automation | LinkedIn by industry (confirm industry) |
| 19 | /industries/construction-trades | Industry | automation for construction companies | LinkedIn by industry (confirm industry) |
| 20 | /ai-consultant-brisbane | Location | ai consultant brisbane, ai consulting brisbane | Search AG4, SEO |
| 21 | /ai-consultant-sydney | Location | ai consultant sydney, ai consulting sydney | Search AG4, SEO |
| 22 | /ai-consultant-melbourne | Location | ai consultant melbourne, ai consulting melbourne | Search AG4, SEO |
| 23 | /case-studies | Index | | All |
| 24 | /case-studies/[client-slug] | Case study | | All (needs one real case) |
| 25 | /about | Trust | mosta group, qubik ai | All |
| 26 | /partners | Partner | ai partner for accountants, referral partner | LinkedIn partners |
| 27 | /ai-readiness-scorecard | Lead magnet | ai readiness assessment, ai readiness checklist | LinkedIn, Meta, SEO |
| 28 | /free-review | Offer | | Every CTA |
| 29 | /thank-you | Conversion | | noindex |
| 30 | /contact | Trust | | All |
| 31 | /insights | Index + 3 starter articles | informational | SEO, LinkedIn posts |
| 32 | /privacy | Legal | | Required for ads |
| 33 | /terms | Legal | | |
| 34 | /404 | Utility | | |

**Target keywords are a starting list, not measured.** Volumes, bids and competition come from Keyword Planner: run `google-ads/claude-in-chrome-mosta-keyword-volumes-prompt.md`, then we drop or merge any page whose keyword has almost no searches.

## 2. Menu and footer

- **Menu:** Solutions ▾ (6 problems) · Services ▾ (3) · Industries ▾ (2) · Results · About · **Free 30-min review** (button). Phone number in a slim top bar.
- **Mobile:** a sticky bottom bar with "Free review" and "Call".
- **Footer:** all services, solutions, use cases, industries, the three city pages, partners, scorecard, insights, about, contact, privacy, terms; "Mosta Group is a Mosta International company"; Brisbane address [ADDRESS]; phone; email.

## 3. Page templates (conversion first)

**A. Landing template** (services, problems, use cases, industries, cities):
1. Hero: H1 in the searcher's words · one-line promise · primary button "Book my free review" · secondary "See how it works" · trust line ("Business advisers since 2007 · Xero partner since 2013"). On paid-traffic pages, a 3-field form in the hero on desktop.
2. The problem: 3 to 4 symptoms they recognise.
3. Today vs with Mosta: 3 rows.
4. What we do: 3 to 5 deliverables.
5. Proof: case study result or [RESULT] placeholder + logos.
6. How it works: Review (free) → Prove (fixed price, one process) → Roll out.
7. FAQs (4 to 6, also as FAQ schema).
8. Final CTA: "Tell us the job you'd like gone" form.
9. Related links: 2 problems, 1 service, 1 use case.

**B. Home:** problem picker hero (built), why us, services, how it works, proof, FAQs, form.

**Conversion rules on every page:** one offer (free 30-minute review); the same form everywhere (job, name, email or mobile; hidden page, problem, click IDs, UTMs); the button repeated after every second section; phone number visible; no stock photos (real photos of Dominic and team); load in under 2.5 seconds on mobile.

## 4. SEO rules

- One H1 per page holding the primary keyword; title tag ≤ 60 characters; meta description ≤ 155 (both drafted in the copy files).
- **Location pages are not copies.** Each has its own local business mix, how we work there, its own FAQs and, when we have one, a local client story. We say honestly that we are based in Brisbane and work with [Sydney/Melbourne] businesses on-site and remotely. **Confirm with Dominic that on-site visits outside Queensland are offered.** No Google Business Profile in a city without a real address.
- Internal links: every problem page links to its service and use case; every location page links to the three services; the footer links everything.
- Schema: Organization and ProfessionalService (home, about, location pages with areaServed), Service (service pages), FAQPage (all landing pages), Article (insights), BreadcrumbList (all).
- Technical: sitemap.xml, robots.txt, canonical URLs, thank-you noindex, Open Graph images per page, fast static build.

## 5. Build order

1. Keyword Planner check (prompt above) and Dominic's answers (offer, result, phone, industries, on-site visits).
2. Templates and components: header, footer, form, FAQ, problem picker, CTA band.
3. Pages in this order: Free review, Thank you, Home, 3 services, 6 problems, 3 cities, 4 use cases, 2 industries, About, Contact, Partners, Scorecard, Case studies, Insights, legal, 404.
4. Tracking (Google tag, enhanced conversions, GA4, LinkedIn, Meta, Clarity, consent), then a full test lead from every template.
5. Point the ads: each ad group to its page (table in `brand/site-architecture.md`).

## 6. Open items for Dominic
- Free offer wording and monthly capacity.
- One case study with a number (needed by every page's proof block).
- Phone, email, Brisbane address.
- The two industries (healthcare clinics and construction/trades are placeholders).
- On-site visits in Sydney and Melbourne: yes or no.
- Systems we integrate with, besides Xero.
- Privacy policy and terms: written or checked by their adviser; we only provide the structure.
