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
