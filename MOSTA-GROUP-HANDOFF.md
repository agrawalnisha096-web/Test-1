# Handoff: Qubik ads → Mosta Group (as of 27 Nov 2026)

Read this first, then `google-ads/SESSION-HANDOFF.md` for full technical detail of the Qubik setup. Branch: `qubik`. The repo is **public**: never commit secrets (above all the CRM webhook URL).

## Who
- **User:** Vinay (marketing). Works through **Claude in Chrome** for WordPress, Google Ads, Clarity and Keyword Planner. This session writes the prompts, code and analysis, and checks live pages from outside.
- **Client and founder:** Dominic Guinea, founder and CEO of Qubik Accounting (Brisbane, since 2007, Xero partner since 2013).
- **New venture:** an AI consulting and implementation business under **Mosta International** (the registered company name), with global ambitions.
- **Final domain:** **mostagroup.com**. It showed as registered on 27 Nov, presumably by Mosta International. mostagroup.ai had no DNS records (probably free); recommend registering it and mostagroup.com.au too.

## Working style the user expects
- Complete, paste-ready Claude in Chrome prompts in chat ("give me the full prompt here"). Save each prompt in the repo too.
- Short, practical answers. Be honest about data limits and confidence, and give a clear recommendation.
- Check live pages from outside after every change.
- Claude in Chrome must never enter payment details or accept legal terms. Use read-only prompts unless a change is intended.
- Don't send the user's email or other personal details to external services.

## Current Qubik setup (live)
- **Automation landing page:** `https://qubik.com.au/marketing/automation/` (WordPress page **588**).
  - Code: `google-ads/divi-code1-update.html` and `google-ads/divi-code2-update.html`; prototype source `google-ads/landing-page-final.html`.
  - Has the CRO form fixes (revenue and role optional, specific errors, "Request my free call", call-back promise) and Dominic's photo.
- **AI landing page:** `https://qubik.com.au/marketing/ai-consulting/` (page **608**).
  - Code: `google-ads/divi-ai-code1.html` and `google-ads/divi-ai-code2.html`; source `google-ads/landing-page-ai.html`.
  - Leads are tagged `variant: ai-page`.
- **Shared thank-you page:** `/marketing/automation/thank-you/` (page **589**).
- **Hidden form and tracking:**
  - A hidden Divi form (21 fields) sends leads to Dominic and vinaymawandia95@gmail.com.
  - Google tag `AW-18559003494`. Lead conversion label `VlbwCMOpx7QdEObWz5FF`; phone-click label `UfM9CMapx7QdEObWz5FF`.
  - Enhanced conversions use the sessionStorage item `qlp_lead`.
  - Tested end to end, and **verified working on 21 Nov**.
- **Constraints:**
  - The user's WordPress account is a Contributor. Page code is changed through the REST API by Claude in Chrome, with SHA-256-pinned files from jsDelivr at a fixed commit.
  - The developer handles admin tasks. They excluded `/marketing/` from the LiteSpeed cache.
- **Still pending with the developer:**
  - Yoast meta descriptions for pages 588 and 608 (text in the chat history and below).
  - Add `clarity.ms` and `clarity` to LiteSpeed **JS Delayed Excludes**, so Clarity records visitors who leave without interacting.
- **Microsoft Clarity:** installed by the WordPress plugin, project `zcqn6g4kkg`.
- **Meta descriptions to add:**
  - 608: "AI consulting and implementation for Australian businesses of 10 to 1,000+ staff. Find where AI pays back, see it working before you commit. Free 30-minute AI readiness call."
  - 588: "Business process automation and live dashboards for Australian businesses of 10 to 1,000+ staff. Built on the systems you already use. Free 30-minute discovery call."

## Google Ads (account 501-682-6184, campaign `Search | AU | Automation & AI | Phase 1`)
- **Settings:** Maximise clicks, A$25 CPC cap, A$45/day, exact match. Six ad groups: AG1–AG2 automation, AG3–AG6 AI.
- **Since 17 Nov:** AG3–AG6 final URLs point to `/marketing/ai-consulting/`.
- **New negatives added:** elyos, agentix, alternatives, reviews, [workflow ai]. The testimonials sitelink was moved to `/marketing/automation/#video` (prompt sent; confirm it was done).
- **AI ad-group sitelinks prompt:** `claude-in-chrome-ai-sitelinks-prompt.md`. Not confirmed done.
- **Results to 21 Nov:** about A$504, 44 clicks, **0 conversions and 0 calls**.
- **Impression share:** ~28%. Lost to rank ~50%, lost to budget ~21%.
- **Quality Scores:** 1–3, with expected CTR and landing page experience **below average** almost everywhere.
- **Campaign status:** the user thought it was paused for weekends, but on 21 Nov it was still live. **Check its status**, and suggest an ad schedule of weekdays during business hours.

## Diagnosis (agreed with the user, 21 Nov)
- **Clarity, 25 ad sessions (14–21 Nov):**
  - 17 had no clicks; 10 lasted 40 seconds or less; average scroll depth 42%.
  - Many desktop visitors opened the ad in a background tab and never looked at it.
  - Form funnel: 3 started, 2 reached step 2, 1 reached step 3 ("Where should we call you?"), and 0 submitted.
  - No bugs found.
- **The root causes are not technical:**
  1. **Targeting:** generic "ai agency" and "ai consulting" searchers compare specialist AI agencies, and an accounting-firm page lacks credibility with them.
  2. **Offer:** "free discovery call" is generic and a high commitment.
  3. **Proof:** there's no AI or automation result anywhere.
- **Search demand is small:** Australia has about 2,400 buyer searches a month across the core AI and automation terms.

## Market research (Keyword Planner, 21 Nov; saved in chat, prompts in `google-ads/`)
- **Finance and Xero keywords:** mostly people working in Xero (bookkeepers) or tiny volumes. Not a better pool.
  - Exception: CFO-services terms, "virtual cfo" 260, "cfo services" 90, "outsourced cfo" 70 a month.
- **Buyer search volume by country** (excluding "ai agency" and "ai for business"):

  | Country | Searches a month | Typical high bid |
  |---|---|---|
  | US | ~23,000 | A$40–78 |
  | UK | ~4,400 | A$35–100 |
  | Canada | ~2,400 | |
  | Australia | ~2,400 | |
  | Singapore, UAE, NZ | ~400–530 each | |

  - New Zealand: "ai consulting" 140 a month (+133%), "business process automation" 90.
- **Agreed strategy direction:**
  - Search is a small capture channel. Deals come from:
    - partner and referral channels (accounting and Xero firms, IT providers);
    - Qubik's existing clients;
    - founder-led outreach plus account-based LinkedIn ads to a defined target list;
    - one or two industry verticals (for example multi-site businesses).
  - Market order: Australia and New Zealand first (proof and case studies) → UK (about April) → Singapore and UAE through partners → US last, with proof and a niche.

## The new brand
- **Mosta International**, trading as **Mosta Group** (domain mostagroup.com).
- **Name research:** see `brand/domain-name-shortlist.md`.
  - **Warning:** an existing AI company, **Mosta.ai** ("Portfolio Intelligence for Capital Markets", AI analytics for finance), uses the Mosta name. MostaAI and Mosta Intelligence were advised against.
  - Mosta Group is less AI-specific, but still recommend trademark searches before branding: IP Australia, WIPO, and EUIPO (Malta and the EU).
- **Positioning idea:** "AI and automation by business experts. Founded by the team behind Qubik, advising Australian businesses since 2007."
- **Website plan:** a lean, fast standalone site built in this repo, on hosting Qubik controls, with no WordPress limits. Per service: AI consulting, AI implementation, process automation. Plus case studies, the free offer, the form to email and CRM, Google Ads conversion tracking and Clarity from day one.

## Open decisions and next steps
1. **Dominic must decide:**
   - **The concrete offer**, for example "free profit dashboard from your own Xero data in 5 days", or "free automation audit: the 3 processes worth automating, with hours saved". How many can Qubik deliver a month?
   - **One real proof point:** a client result or Qubik's own automation story, with a number.
   - Does Qubik sell Virtual CFO or advisory services (for a possible search ad group)?
   - Appetite for LinkedIn ads and founder-led outreach.
   - Answers on the AI page: are all six use cases deliverable; in-person visits outside Queensland; keep, shorten or replace the vision quote; label the Adiel video.
2. **Brand and site:** register mostagroup.ai and mostagroup.com.au, run the trademark search, choose hosting, then build the Mosta Group site (structure and copy can be drafted with placeholders until the offer and proof arrive).
3. **Partner programme draft:** what Mosta Group offers accounting firms and IT providers, referral terms, a one-page pitch.
4. **Google Ads:** confirm the campaign status and schedule. Keep spend small (about A$25/day, weekdays, clear buying terms only) until the offer and proof exist, then point the AI ad groups at the Mosta Group site. Decision point was about A$900 total spend.
5. **CRM:** when the developer gives the send.qubik.com.au address, set the Divi message pattern (see `google-ads/SESSION-HANDOFF.md`) and add the address as a form recipient.
6. **Other session:** a separate session produced the paid social and Meta ads material in `paid-social/` (strategy, sample creatives, presentation).
