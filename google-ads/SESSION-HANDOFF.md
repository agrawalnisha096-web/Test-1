# Session handoff: Qubik landing page and Google Ads (as of 15 Nov 2026)

Read this first. It summarises the previous session so work can continue without re-deriving anything.

## Who and what
- **Client:** Qubik Accounting (qubik.com.au, Brisbane). Selling business process automation and AI dashboards to established Australian businesses (10 to 1,000+ staff). Founder and CEO: Dominic Guinea.
- **User:** Vinay (marketing). Works through **Claude in Chrome** for anything in WordPress or Google Ads; this session writes the prompts, code and analysis and checks the live site from outside.
- **Branch:** `qubik`. All work lives in `google-ads/`.

## The live landing page
- **URL:** `https://qubik.com.au/marketing/automation/` (WordPress page 588, parent page "marketing" 563). Thank-you page: `/marketing/automation/thank-you/` (page 589). `/automation/` 301-redirects to it. Old pages 578/579 kept as drafts.
- **Built with:** Divi, but the user's WordPress account is a **Contributor**: no Media upload, no plugins, no Theme Options, no LiteSpeed settings, no "unfiltered HTML" in the Divi Builder. All page edits are done by Claude in Chrome **through the WordPress REST API** (the Divi Builder refuses to save `<style>`/`<script>`).
- **Page structure (588):** Section A = Code 1 (styles, fixed header, hero, 3-step form); Section B = hidden Divi Contact Form (class `qlp-divi-form`, 21 Input fields, none required, redirect to thank-you); Section C = Code 2 (body + scripts); Section D = Tracking code 1.
- **Source of truth for page code:** `landing-page-final.html` (prototype) → generated Divi blocks `divi-code1-update.html`, `divi-code2-update.html` (what is live). Generator scripts lived in the old session's scratchpad and are gone; regenerate by hand-editing the `divi-code*-update.html` files if needed.
- **Rules for page code:** no `&&` and no `<` inside inline JS (Divi mangles them); no blank lines; every `<script>` carries `data-no-optimize="1"` (LiteSpeed delays scripts on phones otherwise); fonts load via `@font-face` from jsDelivr @fontsource (LiteSpeed strips Google Fonts); images served from jsDelivr pinned to commit `0125c626…` of this repo (`landing-assets/`). **The repo is public**: never commit secrets (the CRM webhook URL especially).
- **Headline variants by URL:** default = automation; `?v=ai` = AI headline + "Practical AI" section; `?v=dashboards`.
- **Form:** step 1 "What's the biggest challenge holding your business back?" (6 options, max 2); step 2 staff, revenue, timing (incl. "Now, ASAP"), optional challenge; step 3 name, company, email, mobile, role, consent. Page script copies answers into the hidden Divi form (`setDivi`), captures gclid/gbraid/wbraid/utm_source/medium/campaign/term + landing_page (90-day localStorage), and the staff-cost calculator estimate.
- **Lead emails:** Divi form sends to `dominic.guinea@qubik.com.au, vinaymawandia95@gmail.com` (not visible in page source; checked).
- **Caching:** both live pages are excluded from LiteSpeed cache (no-cache), which Divi's form nonce needs.

## Tracking
- Google tag **AW-18559003494**. Conversion labels: **Lead form submitted** `VlbwCMOpx7QdEObWz5FF` (fires on thank-you page with enhanced-conversions user_data and transaction_id from sessionStorage `qlp_lead`); **Phone number click (website)** `UfM9CMapx7QdEObWz5FF` (fires on tel: link clicks). Code: `tracking-code-1-live.html` (page 588 Section D), `tracking-code-2-live.html` (page 589). Verified working on phones without interaction.
- "Phone number click" shows **Misconfigured: never received a tag ping** because nobody has clicked a phone link yet; a phone-click test (open page, click header number, check dataLayer) was prepared but not confirmed done.

## Google Ads
- **Account:** Customer ID **501-682-6184** (AUD, Brisbane time zone), login vinaymawandia95@gmail.com. Advertiser verification done. Daily report "Qubik – daily campaign report" (PDF, 7:00 AM) to vinaymawandia95@gmail.com and qubikads@gmail.com; Dominic's user invite pending.
- **Campaign:** `Search | AU | Automation & AI | Phase 1`, Search only, Australia (presence), budget **A$45/day**, bid strategy **Maximise clicks, max CPC A$25** (switched back on 14 Nov 22:20 AEST after Maximise conversions with zero conversions produced zero impressions). Final URL suffix `utm_source=google&utm_medium=cpc&utm_campaign=search-au-automation-ai-phase1&utm_term={keyword}`.
- **Goals:** campaign-specific: Submit lead forms (Lead form submitted, Primary) and Phone call leads (Calls from ads (60s+), Primary). Diagnostic "targeted goal is missing a primary conversion action" (names the Contacts goal) persists until the phone-click tag fires.
- **Ad groups / keywords (43 enabled):** AG1 Automation consultant & services (phrase + some exact); AG2 Business process automation; AG3 AI consulting (exact only; [ai consulting] and [ai consulting company] paused for later); AG4 AI cities/AU (exact); AG5 AI implementation (exact; agent/custom-dev terms paused); AG6 Readiness (exact). Shared negative list `Qubik negatives – phase 1` (186 keywords; "free" deliberately not added).
- **Rules:** Rule A pauses keywords with Cost > A$100 and no conversions in 14 days (**recommended raising to A$300 / 30 days; not confirmed done**). Rule B emails when keyword avg CPC > A$20 (7 days).
- **Ads:** v2 ads, one per ad group, written around what each searcher cares about (no "scoped by accountants" in AI ads): `rsa-v2-per-ad-group.md`. The user says the ads were changed, but it isn't confirmed whether they match v2 exactly or whether old ads were paused.
- **Earlier findings:** 85–90% of impressions lost to ad rank, not budget; Quality Scores 1–7, landing page experience "Below average" everywhere (page speed is fine: LCP ≈ 2.8–3.0 s on throttled mobile; likely relevance/newness). Page title changed to "Business Process Automation & AI Dashboards".

## Where things stand right now (open items)
1. **CPC jumped to about A$20** after the switch to Maximise clicks with the A$25 cap. Likely cause: cheap junk clicks (competitor brands via phrase match) are gone, so only real buyer auctions remain (Google's forecast predicted A$21–28 for exact). A **read-only check prompt** was sent to Claude in Chrome covering: every ad's status/approval/strength, when new ads were added and old ones paused, the exact live ad text, and per-keyword CPC, search terms and impression share since 14 Nov 22:20. **Next step: review that report**, compare live ads with `rsa-v2-per-ad-group.md`, and recommend at most one change (pause weak expensive keywords, lower cap to A$18–20, or wait a week).
2. Phone-click test and Rule A threshold change: confirm done.
3. Business name "Qubik" asset and logo upload (`ads-assets/qubik-logo-square-1200.png`, `qubik-logo-landscape-1200x300.png`); the user uploads logos.
4. **CRM:** developer's CRM will receive leads by email at an address on `send.qubik.com.au` (waiting on DNS). Plan: set the Divi form's Message Pattern to the developer's layout with a combined message line (see below), add the CRM address as a third recipient, then send test "TEST Vinay" from `?gclid=test123&utm_source=google`. Message Pattern to use:
   ```
   name: %%name%%
   email: %%email%%
   phone: %%phone%%
   message: Company: %%company%% | Role: %%role%% | Wants to fix: %%automate%% | Staff: %%staff%% | Revenue: %%revenue%% | Timing: %%timing%% | Challenge: %%challenge%% | Estimate: %%estimate%% | Page: %%variant%%
   gclid: %%gclid%%
   utm_source: %%utm_source%%
   utm_medium: %%utm_medium%%
   utm_campaign: %%utm_campaign%%
   utm_term: %%utm_term%%
   landing_page: %%landing_page%%
   ```
5. Re-check around **21–22 Nov**: CTR (target 3–5%), Quality Score parts, impression share lost to rank, day-of-week (weekends decision), conversions. Switch back to Maximise conversions only after 5–10 real conversions.
6. Later ideas: separate AI landing page (headline in HTML, not script) for landing page relevance; Xero/finance and "AI automation agency" ad groups; re-enable [ai consulting company] then [ai consulting] once search terms are clean.

## Expectations agreed with the user
At A$45/day: roughly 60–130 clicks and 3–6 leads a month (cost per lead ≈ A$270–450); volume-limited market. One Stage 1 scoping sale (A$3,500) covers about two months of spend.

## Working style the user expects
Give complete prompts for Claude in Chrome in chat (they often ask "show the full prompt here"); check live pages from outside after each change; keep answers short and practical; be honest about confidence and data limits.
