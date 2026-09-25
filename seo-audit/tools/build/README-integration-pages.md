# Trillet integration pages — build brief and context

This folder carries the docx build harness and the context needed to produce
Trillet's **integration pages** in the established house style.

## Task
Create integration page copy-and-structure specs (one .docx each) in
`seo-audit/`, priority order:
1. `/integrations/gohighlevel` — PRIORITY. It is the Week-2 dev item and the
   301 merge target for the `gohighlevel-voice-ai-integration` blog in the
   redirect map, so it must exist and absorb that blog's intent and queries.
2. `/integrations/google-calendar`
3. `/integrations/cal-com`
4. A light `/integrations` index page linking to each. Webhook + API are
   connection paths (mentioned on the live site); cover briefly, no full page each yet.

## The one hard rule: keep every page genuinely different
No templated doorway pages (Google penalises near-duplicates). Each page earns
its existence with:
- Its own target keyword (e.g. "GoHighLevel voice AI integration"; "Google
  Calendar AI receptionist booking"; "Cal.com voice AI booking").
- Unique H1, intro and body written for that integration, not a template with
  the name swapped.
- Integration-specific use cases: GoHighLevel (contact sync, workflow triggers,
  sub-account rebilling) differs from Google Calendar (real-time availability,
  book/reschedule/cancel, timezones) differs from Cal.com (open-source,
  round-robin, team scheduling).
- Integration-specific setup/how-it-works steps, FAQ, and PRODUCT SHOT callouts.
- Unique schema (SoftwareApplication or HowTo for setup + FAQPage + Breadcrumb).
- Shared CTA / compliance strip / cross-link to /whitelabel are fine but must be
  a small fraction of each page.

## Voice & standards (non-negotiable)
- Product/landing-page voice: second person, outcome-led, confident, concrete.
  No founder story, no "I", no teaching essays. Company "we" is fine.
- Zero em-dashes. Australian spelling. No AI fingerprints.
- These match the /whitelabel product-page rebuild (see
  `product-page-helpers.example.js` for the exact helpers incl. `shot()`).
  Listicle/spec-table helpers are in `listicle-helpers.example.js`
  (`spec()`, `table()`, `name()`).

## Reconciled Trillet facts (verified to the live site, Sep 2026)
- Usage $0.12/min (platform, STT, LLM, TTS). Telephony separate: US Trillet
  from $0.014/min; web calls no telephony fee.
- Studio $99/mo (up to 3 workspaces, 100 min, 3 numbers). Agency $299/mo
  (unlimited workspaces, 300 min, 10 numbers). 28-day money-back, no contracts.
- Compliance on every plan: SOC 2 Type II, ISO 27001, HIPAA, GDPR, ACMA, TCPA,
  AU data residency; audit trails + call recordings/transcripts.
- Carrier-level call forwarding (~30s, no number porting).
- Native integrations: GoHighLevel, Google Calendar, Cal.com, plus webhook + API.
- Do NOT invent integration features. If unsure a capability exists, keep it
  general or verify with a web search before stating it.

## Build
- `cd` into this folder, `npm install` (docx), then write a build script per page
  (reuse the example helpers) that writes the .docx into `seo-audit/`.
- Name files e.g. `Trillet-Integration-GoHighLevel.docx`.
- Sanity-check each: 0 em-dashes; figures reconciled; each page's body genuinely
  distinct from the others (no copy-paste sections).

## Git
- Branch: `claude/trillet-agency-seo-analysis-jb9ffo`.
- Commit each with footer lines:
  `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`
  `Claude-Session: https://claude.ai/code/session_01UhVChLeNNjFDr6eASTMGhh`
- `git push origin claude/trillet-agency-seo-analysis-jb9ffo`. Do NOT open a PR.
