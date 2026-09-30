# AGENTS.md: handoff for the `trillet-case-study` branch

This file is for an AI coding agent picking up this work with no access to the earlier conversation. Read it fully before changing anything.

- **Repo:** `agrawalnisha096-web/Test-1` (GitHub)
- **Branch to work on:** `trillet-case-study`
- **Last updated:** 2026-09-30

---

## 1. Project summary

Trillet (trillet.ai) is a voice AI company: AI phone agents and receptionists for businesses, a white-label program for agencies, and an enterprise offering for regulated, high-stakes calls. The repo owner is a freelance SEO and content consultant working for Trillet. Most of the repo's other branches hold their SEO, content and website work for Trillet. This branch is for **customer case studies that Trillet publishes as marketing content**, meaning stories about work Trillet did for its own clients. It is not a case study of the consultant's SEO work. The first case study is about **Massimo Motors**, a client Trillet did a voice AI implementation for. So far the branch holds only the intake questionnaire the Trillet account manager uses to collect the facts. The case study itself cannot be written until the account manager returns the answers.

---

## 2. What's been done (files on this branch)

The branch was created on purpose as an **orphan branch**: it shares no history with the other branches and started empty (commit `d9df478`, "Start blank trillet-case-study branch").

| File | What it contains | Status |
|---|---|---|
| `massimo-motors/Massimo-Motors-Case-Study-Questionnaire.docx` | Word questionnaire for the Trillet account manager, to fill in with the client. US Letter, Calibri, teal accent `#0C8577`. Contents: a cover page (contributor fields, "How to use", "What makes a strong case study") and 10 sections. There are 25 REQUIRED questions, each numbered like `1.1` and shown as a question, a grey hint and a blank answer cell. See the section list below. | **Final v1.** Sent to the user. Not yet filled in. Passes XSD validation, but has **never been visually rendered** (see Gotchas). |
| `massimo-motors/build-questionnaire.js` | Node script that builds the .docx above using the `docx` npm package. All questionnaire text lives in this script. Usage: `npm install docx && node build-questionnaire.js [output.docx]`. | **Final.** This is the source of truth: to change the questionnaire, edit the script and rebuild. Don't hand-edit the .docx. |
| `AGENTS.md` | This handoff. | Current. |

**Questionnaire sections** (in `build-questionnaire.js`):
1. Permissions & approvals: naming and logo use, client approver, public listing / IR review, off-limits topics, metric granularity, NDA or publicity clause, where it can appear, embargo date.
2. Account snapshot: filled by the account manager from the CRM. Entity and brand name, business description, regions, size, numbers covered, customer-since and go-live dates, Trillet products, how they found Trillet, partner or agency.
3. The situation before Trillet: caller types, how calls were handled, pain points, cost, baseline, trigger moment, what they tried, risk of doing nothing.
4. Why Trillet: criteria, alternatives, deciding reasons, decision makers, objections, pilot.
5. The implementation: use cases (with motors-business examples: dealer locator, warranty intake, parts enquiries, service booking, after-hours overflow), inbound or outbound, agents and flows, integrations, knowledge sources, human handover, languages and persona, compliance, timeline, effort, challenges, tuning.
6. Results: a 15-row before/after metrics grid (columns: Before, After, Period measured, Source) plus questions on headline results and how they were measured.
7. Real moments: one specific call, transcript permission, a before/after anecdote, caller reactions.
8. Client champion interview: questions to ask for word-for-word quotes.
9. What's next: expansion, reference willingness, video testimonial, public reviews.
10. Assets & sign-off: an asset checklist grid, a sign-off checklist, and signature lines (account manager, Marketing owner, client approver).

### Related work on other branches (read-only context, don't modify from here)

None of these files are on this branch. Read them with `git fetch origin` and then `git show origin/<branch>:<path>`.

| Branch | What's there | Why it matters here |
|---|---|---|
| `claude/trillet-about-page-research-yd7jab` | `about-trillet.html`, `about-trillet-handoff.md` / `.docx`, `trillet-offpage-submission-kit.docx` | Source of the approved-to-confirm company facts, the Trustpilot testimonials and the About page design system (jade-teal). |
| `claude/trillet-agency-seo-analysis-jb9ffo` | Newest and largest Trillet branch (last commit 2026-09-27): white-label blogs 1–4, `/whitelabel` hub rebuild, homepage copy and schema, integration page specs and renders (GoHighLevel, ServiceTitan, Cal.com, Google Calendar), cluster atlas, 16-competitor keyword gap, GSC data | `seo-audit/Trillet-Integration-GoHighLevel-render.html` and `...-ServiceTitan-render.html` use **Trillet's live "v3" design system**. Use it if the case study becomes a web page. `Trillet-Cluster-Atlas.html` records "Case studies: none present on the site", which is the gap this branch fills. |
| `claude/trillet-parasite-seo-strategy-5j2nvf` | `seo-audit/TRILLET_SEO_GEO_STRATEGY.md` and the DataForSEO outputs in `seo-audit/trillet_dfs_out/` | SEO and AI-answer strategy. Relevant for where to syndicate the case study. |
| `claude/trillet-seo-audit-v4wngt` | July 2026 SEO audit, response memo, 7/30-day plan PDFs, task and metrics trackers | Background numbers (see §3). |
| `claude/seo-tracking-template-8lc748`, `research`, `sfl`, `claude/chatx-ai-a5caa8`, `claude/professional-editable-format-2vefed`, `claude/india-client-pricing-u5uljl`, `claude/onlinejobs-ph-understanding-j87391`, `claude/discord-community-setup-h7p4ag` | Other projects (SEO tracker, a publishing pipeline, an audit for a different client "SFL", unrelated research, a portfolio deck) | Not part of the Trillet case-study work. Ignore them. |
| `claude/loving-dirac-1uq6se`, `claude/clean-up-hm9zbn`, `BB` | All point to the same commit (`219ddac`) as `claude/trillet-seo-audit-v4wngt` | Auto-created session branches with nothing unique. The user asked to **leave them alone**. Don't delete them. |

---

## 3. Key findings and decisions

### Decisions on this branch (and why)
- **Branch name is `trillet-case-study`.** The user asked for "trillet case study". Git names can't contain spaces, so hyphens were used.
- **The branch is blank / orphan.** It was first created as a copy of `claude/loving-dirac-1uq6se`, which carried the SEO audit files. The user said "I want it to be blank", so it was rebuilt as an orphan and force-pushed. *Rejected:* branching from the SEO work, or from `main` (there is no `main` on the remote).
- **This is Trillet marketing content about a Trillet client**, not a portfolio piece about the consultant's own SEO work. The user said so explicitly. *Rejected framings:* "how I ran Trillet's SEO program" (portfolio) and a process-only story.
- **No invented client facts or results.** Nothing about Massimo Motors exists in the repo, so the first deliverable was an intake questionnaire rather than a draft story. That matches the sourcing policy used across the Trillet work: every claim traces to a source, and live-changing figures and compliance claims are flagged CONFIRM.
- **Questionnaire format: Word (.docx).** An account manager can fill it in, email it and track changes. It was built from a script so it can be regenerated. *Rejected for this step:* a web page or artifact, and a PDF (not fillable).
- **Questionnaire workflow:** the account manager fills Sections 1–2 from the CRM, then runs a ~45-minute client call for Sections 3–9, recorded with permission. REQUIRED marks the minimum for a publishable story. Every metric needs a baseline, a period and a source. Nothing publishes until Section 1 (permissions) and Section 10 (sign-off) are done.
- **The four must-haves** for a strong case study: a specific "before" moment, a clear reason they chose Trillet, one or two headline numbers with a baseline, and a client quote in their own words.
- **Public-company caution:** Massimo Motors *may* be tied to a publicly listed company. This was **not verified**. The questionnaire asks (Q1.4) whether IR or Legal review is needed. Don't state any corporate facts about Massimo until the account manager confirms them.

### Trillet company facts already in circulation (all need confirmation before publishing)
From `about-trillet-handoff.md` on `claude/trillet-about-page-research-yd7jab`:
- 1,200+ businesses, 7M+ calls handled in 2025, 85% resolution, 80% cost reduction, 99.97% uptime, SOC 2, ISO 27001, Trustpilot 4.6/5 (20 reviews). Every one is marked **CONFIRM**.
- **Conflict:** the GoHighLevel render on `claude/trillet-agency-seo-analysis-jb9ffo` says **"3,900+ businesses"**. It isn't resolved which figure is current. Ask before using either.
- Founded in Melbourne and operated globally. Positioning: "enterprise voice AI for high-stakes, regulated conversations".
- Public Trustpilot testimonials used on the About page: Santiago at AutoCall (AU), Mason Anderson at an automation firm (US), Rasheem Barnett, agency principal (US). These are **not** Massimo Motors and must not be presented as such.
- **Never use "$50M raised / $130M valuation".** Those figures come from name collisions on aggregator sites ("Rillet", "Triller") and are not Trillet's.
- Trillet had **no case studies on its site** as of the September 2026 cluster atlas.

### Background SEO/GEO numbers (context only, not for the case study)
- The 12-month GSC export (Jul 2025 – Jul 2026) shows 14,100 clicks, 1,881,411 impressions, 0.75% CTR and a weighted average position of 8.5. Brand queries are 93.3% of clicks. Non-brand is about 3.5% (497 clicks in the top-1,000-query export).
- The CTR drop is **93% composition**: 292 new pages entered at 0.20% CTR and now hold 91% of impressions. Pages present in both windows held steady: 3.98% → 3.74% CTR, position 5.32 → 5.23.
- Striking-distance non-brand pages (positions 3–20) carry 155,009 impressions, a ~2,700–3,450-click opportunity at 2–2.5% CTR. That is a sizing scenario, not a forecast.
- DataForSEO (Sept 2026): Trillet is the **#1 cited domain** in AI answers for white-label (named in 9 of 16 answers), but in **0 of 6** for enterprise and **0 of 6** for AI receptionist. In Google organic, Reddit and YouTube dominate. The strategy is to get Trillet onto third-party pages (directories, "best-of" listicles, newswire PR). *Implication for this branch:* once published, a Massimo Motors case study is strong material for third-party placement and PR, and a named customer story helps enterprise credibility, where Trillet is currently absent from AI answers.

---

## 4. Sources and methods

- **Context gathering:** everything came from the other branches in this repo, read via `git show origin/<branch>:<path>` and `git grep` across all remote branches (search terms: case study, testimonial, success story, Trustpilot). No web research on Massimo Motors was done.
- **Document build:** Node 22 plus the `docx` npm package. It isn't installed globally in the container, so it was installed in a scratch directory. The build script is `massimo-motors/build-questionnaire.js`.
- **Validation:** Anthropic's docx skill validator (`scripts/office/validate.py`) passed after `pip install defusedxml lxml`. Structure was checked with `python-docx`: 10 H1 sections, 15 tables, 25 REQUIRED tags.
- **What didn't work:**
  - **LibreOffice (`soffice`) can't convert anything in this container**, not even a `.txt` file ("source file could not be loaded"). A fresh profile and running outside the sandbox didn't help. So the .docx was never rendered to PDF or images for a visual check.
  - `pdftoppm` and `pandoc` aren't installed.
  - Earlier sessions (July audit) found outbound web access blocked by the sandbox proxy for most sites, so live-site checks weren't possible then. Don't assume you can fetch trillet.ai or Massimo's site. Test first.
- **Earlier Trillet work used:** Google Search Console exports supplied by the user, GA4 exports, robots.txt and sitemap, page source, DNS lookups, and DataForSEO (SERP, Labs, LLM responses and backlinks, about $0.76 spent).

---

## 5. Preferences and conventions

- **Account names:** the repo owner's own account is `agrawalnisha096-web`. The client is Trillet; Trillet's client is Massimo Motors. Keep those three levels straight in all writing.
- **Deliverable formats:** Word `.docx` for anything a Trillet person fills in or reviews, generated from a script committed next to it. Web pages are HTML matching Trillet's v3 design system (see Gotchas). Markdown is for internal notes and handoffs.
- **Writing style used across the Trillet work** (taken from commit history on the other branches, where drafts were revised toward this):
  - No em dashes in published copy.
  - No hype, no "not X but Y" negation constructions, no AI fingerprints.
  - Plain, specific, factual. Enterprise-credible tone.
  - Trillet's own content uses a team "we" voice. Earlier SEO memos to Trillet were first-person.
  - Spell it "voice AI" (an earlier commit fixed this spelling in the submission kit).
  - Label every figure verified / inferred / unverified, and give its source and date range.
  - Don't overstate. Sizing scenarios aren't forecasts.
- **Sourcing:** never invent clients, quotes or numbers. Anything live-changing or compliance-related is flagged CONFIRM for Trillet Legal or Marketing.
- **Git:** work on `trillet-case-study`. Don't delete or clean up other branches without asking. Don't open pull requests unless the user asks.
- **Communication:** ask before assuming scope (for example, who the case study is for and what format). Both points were clarified by asking the user, not assumed.

---

## 6. Open items and next steps (priority order)

1. **Wait for the completed questionnaire.** The account manager fills in `Massimo-Motors-Case-Study-Questionnaire.docx` with the client. The user will supply the answers, possibly as rough notes or a call transcript. Nothing else can proceed without them.
2. **Visually check the questionnaire** in Word or Google Docs (or anywhere LibreOffice works) before it's sent. Confirm the fixed-width tables, the teal header rows, the answer cells and the footer page numbers render correctly. Fix anything in `build-questionnaire.js`, rebuild and recommit.
3. **Confirm the output format for the case study.** It hasn't been decided. Likely a web page in the trillet.ai v3 design, a Word version for Trillet's review, or both. Ask the user.
4. **Once answers arrive, draft the case study** in `massimo-motors/`. A suggested structure: headline with one result; at-a-glance box (industry, location, products used, integrations, go-live); the challenge; why Trillet; the implementation; results (stat callouts with period and source); a pull quote; what's next; a CTA. Mark every unconfirmed figure CONFIRM. Add an FAQ block and schema only if the user wants SEO treatment.
5. **Gap check:** after reading the answers, list any REQUIRED items still missing and send them back as a short follow-up list for the account manager.
6. **Approvals:** route the draft to the client approver named in Q1.3 and to Legal or IR if the company is public (Q1.4). Don't publish until the Section 10 sign-off is complete.
7. **Open questions for the user:**
   - Which company-size figure is current, 1,200+ or 3,900+ businesses?
   - Should the case study be anonymised if Massimo won't be named?
   - Will there be a case-study template or hub page on trillet.ai for future stories? If so, build this one as a reusable template.
8. **Later:** use the published story for AI-citation and PR placement (newswire, directories), per `TRILLET_SEO_GEO_STRATEGY.md` on `claude/trillet-parasite-seo-strategy-5j2nvf`.

---

## 7. Gotchas

- **Orphan branch:** `git log`, `git diff main` and merges won't relate to the other branches. There's no `main` branch on the remote. Don't try to merge this branch into or out of the SEO branches.
- **Other branches' files aren't here.** Reference them with `git show origin/<branch>:<path>` after `git fetch origin`. Don't copy the SEO audit files onto this branch; the user wanted it blank.
- **Don't delete `claude/loving-dirac-1uq6se`** or the other duplicate branches. The user explicitly said to leave them.
- **Edit the script, not the .docx.** The .docx is generated. Hand edits will be lost on the next rebuild. `node_modules/` isn't committed, so run `npm install docx` first (or install it outside the repo so it doesn't get committed).
- **docx-js pitfalls already handled in the script:** US Letter page size set explicitly (the default is A4); `ShadingType.CLEAR` (not `SOLID`, which renders black); widths in DXA on both the table and every cell (they must sum to the content width of 10080); fixed table layout. Keep these if you edit.
- **The .docx is unrendered.** It validated, but nobody has looked at it. Check it before calling it final.
- **Two different design systems exist:**
  - The About-page draft uses jade-teal (`--accent #0C8577`, Bricolage Grotesque / IBM Plex).
  - **Trillet's live site ("v3")** uses cream `#fbf9f5`, plum `#2b2027`, yellow `#eccd63`, ink `#191317`, blue `#0062e9`, with Maven Pro (display) and Source Sans 3 (body). See `seo-audit/Trillet-Integration-GoHighLevel-render.html` on `claude/trillet-agency-seo-analysis-jb9ffo`.
  - **Use v3 for any web version of the case study.** The questionnaire's teal is internal-only styling.
- **Name collisions:** third-party data about "Trillet" mixes in unrelated companies (Rillet, Triller), and Massimo Motors may have similarly named entities too. Verify identity with the account manager rather than trusting web search.
- **Don't reuse the About-page Trustpilot testimonials** as Massimo quotes, and don't treat the company-wide stats (7M+ calls, 85% resolution, etc.) as Massimo results.
- **Tooling in this container:** LibreOffice conversion fails; `pandoc` and `pdftoppm` are missing; Python packages `defusedxml`, `lxml`, `python-docx` and `pymupdf` needed `pip install`; web access may be blocked.
