# mostagroup.com: pages and architecture for a lead-generating site (27 Nov 2026)

**Goal:** every paid click lands on a page that matches the exact problem in the ad, and leads to one action: book the free 30-minute review.

## Sitemap

```
/                               Home (problem-first)
/solutions/                     Problems we solve (index)
  /solutions/faster-month-end         CFO: month-end and reporting
  /solutions/grow-without-hiring      Owner/CEO: admin grows with sales
  /solutions/ai-plan                  CEO/board: where AI pays back
  /solutions/multi-site               COO: one view across sites
  /solutions/spreadsheet-risk         Owner/finance: key-person spreadsheets
/services/
  /services/ai-consulting
  /services/ai-implementation
  /services/process-automation
/case-studies/                  index + one page per case study
/about                          Dominic, team, Qubik link, since 2007
/partners                       Accounting firms and IT providers (own form)
/free-review                    The offer, the form, optional calendar
/thank-you                      Conversion page (noindex, not in menu)
/contact
/privacy  /terms                Required for ads and lead forms
/insights/                      Later: articles for SEO and LinkedIn
```

## Phase 1: minimum before ads go live (about 13 pages)

| Page | Why it is needed |
|---|---|
| Home | Brand, LinkedIn and direct traffic; problem picker |
| AI consulting, AI implementation, Process automation | Destinations for the existing search ad groups (AG1 to AG6) |
| Faster month-end | Strongest fit with Qubik's expertise; CFO search and LinkedIn ads |
| AI plan | Destination for "AI consulting / AI strategy" searchers and CEO LinkedIn ads |
| Free review | The single offer every ad and page points to |
| Thank you | Fires the conversions; offers a calendar slot straight away |
| About | Buyers check who is behind it before they enquire |
| One case study | The biggest gap today: no proof (Clarity showed visitors leaving) |
| Contact, Privacy, Terms | Trust; Google Ads and LinkedIn require a privacy policy for lead capture |

**Phase 2:** the other three problem pages, partners page, more case studies, insights, and an "AI readiness scorecard" (a 10-question quiz) as a softer offer for cold LinkedIn and Meta traffic.

## Page types: which to build (added 27 Nov)

**Rule:** build a page only if an ad group or LinkedIn audience points to it, or we have proof that makes it different. Thin look-alike pages hurt Quality Score and SEO.

| Page type | Build? | Examples | Why |
|---|---|---|---|
| Service pages | Yes, 3 at launch | AI consulting, AI implementation, Process automation | Catch "hire" searches: "ai consultant", "ai consulting company", "automation consultant" |
| "Hire an AI consultant" style pages | **No** separate pages | | Same intent as the service pages; separate pages would be near-duplicates. Match the ad wording with a headline swap on the service page (as on the Qubik page, `?v=ai`) |
| City pages | Only Brisbane, later | AI consultant Brisbane | Only where there is a real office and clients; other cities are covered by the ads' location targeting |
| Problem (solution) pages | Yes, 2 at launch, 6 in total | Faster month-end, AI that pays back, Grow without hiring, Multi-site, Spreadsheet risk, Where to start with AI | LinkedIn audiences by role, and problem searches |
| Use-case pages | Phase 2, 3 to 4 | Accounts payable automation, Xero automation and dashboards, AI document processing, AI customer-service assistant | Specific searches with clearer buying intent than "ai agency" |
| Industry pages | Phase 2, only 2 | Pick the two industries where Qubik has clients and a case study (for example healthcare clinics, multi-site services, construction and trades, professional services) | Strong for LinkedIn targeting by industry and for credibility; weak without proof |
| Country pages | Later | /nz/, /uk/ | When those markets open, with local proof |
| Lead magnet | Phase 2 | AI readiness scorecard | Softer offer for cold LinkedIn and Meta traffic |

**Menu:** Solutions (by problem) · Services · Industries (from phase 2) · Results · About · For partners · [Free 30-min review]

**Launch count:** about 13 pages (phase 1 above). Full site after phase 2: about 30.

## Ads to pages

| Traffic | Lands on |
|---|---|
| Search: "ai consulting", "ai consultant", "ai strategy" | /solutions/ai-plan (or /services/ai-consulting, A/B test) |
| Search: "ai implementation", "ai agents for business" | /services/ai-implementation |
| Search: "business process automation", "workflow automation" | /services/process-automation |
| Search: "accounts payable automation", "month end close", "xero automation" | /solutions/faster-month-end |
| LinkedIn, CFOs on the target list | /solutions/faster-month-end |
| LinkedIn, CEOs and owners | /solutions/ai-plan or /solutions/grow-without-hiring |
| LinkedIn, COOs of multi-site businesses | /solutions/multi-site |
| LinkedIn, accounting firms and IT providers | /partners |
| Meta retargeting | /free-review or the scorecard |

## Every landing page uses one template
1. Headline in the searcher's words (matches the ad, which also lifts Quality Score).
2. The problem, "today vs with Mosta", and what the free review gives them.
3. Proof: case study result, since 2007, Xero partner since 2013.
4. How it works: Review, Prove, Roll out.
5. Objections answered (cost, systems, data, staff).
6. The form, repeated at the bottom; phone number in the header.
Full menu stays (Google rates navigable pages better); one CTA colour, one offer.

## Architecture

- **Build:** static site (for example Astro) in this repo, deployed to Qubik's hosting or Vercel. Fast pages, no plugins, no cache fights like WordPress had.
- **One form component** on every page: name, email or mobile, "the job you'd like gone", plus hidden fields for page, problem chosen, gclid, gbraid, wbraid, li_fat_id, fbclid, utm_* and landing page (kept 90 days, as on the Qubik pages).
- **Form handling:** a small serverless function sends the lead to email and the CRM. The CRM webhook URL lives in an environment variable, never in this public repo.
- **Tracking from day one:** Google tag with enhanced conversions, GA4, LinkedIn Insight Tag, Meta pixel, Microsoft Clarity, phone-click tracking, and Consent Mode v2 (needed before UK/EU traffic).
- **Conversions:** primary = form submitted and booked call; then import "qualified lead" and "deal won" from the CRM back into Google Ads and LinkedIn, so bidding learns from real leads, not form fills.
- **SEO basics:** one H1 per page, meta descriptions, Organization and Service schema, sitemap.xml, thank-you page noindex.
- **Later, for global growth:** /nz/ and /uk/ pages when those markets open (local proof, currency, phone number).

## Needs from Dominic before build
The offer and monthly capacity, one case study with a number, phone and email, CRM details, and the privacy policy (Qubik's can be the starting point, adapted by their adviser).
