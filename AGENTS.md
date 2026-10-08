# AGENTS.md: handoff for the next agent (Codex)

You are picking up an **SEO and content engagement for Trillet.ai** partway through. You have only the files on this branch, with no chat history, so read this whole file first. It merges handoffs from the two Claude sessions that worked here: one on the white-label cluster (blogs, hub, redirects, research) and one on integration landing pages. Section 7 lists traps that will silently overwrite finished work.

- Branch: `claude/trillet-agency-seo-analysis-jb9ffo` (repo `agrawalnisha096-web/Test-1`). All work lives under `seo-audit/`.
- Source of truth for **Trillet pricing and proof**: section 3a of this file. It matches the facts section of `seo-audit/tools/build/README-integration-pages.md`.
- Source of truth for **what each integration does**: `seo-audit/sources/trillet-integration-guides-2026-09-25.md`.
- Last updated 8 Oct 2026.

---

## 1. Project summary

Trillet (https://trillet.ai) is an Australian-owned **voice AI platform for high-stakes, regulated phone conversations** (clinics, dentists, law firms, trades, finance). Its market wedge is **compliance and an auditable record of every call**, included on every plan: SOC 2 Type II, ISO 27001, HIPAA, GDPR, ACMA, TCPA and AU data residency. It sells through three funnels:
- a $49/month AI Receptionist for small businesses (the biggest organic funnel, about 127k impressions);
- a white-label platform that agencies resell under their own brand (Studio $99/month, Agency $299/month; about 16k impressions);
- enterprise.

This branch is a consultant-style SEO and content programme for the **white-label and agency funnel**: an audit, a hub-and-spoke content cluster (blogs, a `/whitelabel` product-page rebuild, integration landing pages), a redirect and consolidation map, a competitor keyword-gap analysis and topical cluster maps. The goals are to rank the head term "white label voice ai" (the `/whitelabel` hub, about position 27), build the cluster around it, remove cannibalisation, and add conversion surfaces such as `/integrations/*`.

Every deliverable is a **spec** (docx, xlsx or HTML) for Trillet's dev and content team to implement; nothing here touches the live site. The most recent workstream is the integration pages: GoHighLevel, ServiceTitan and Google Calendar are finished (Trillet has already shipped live pages built from the first two), while Cal.com is an outdated draft with no product source.

---

## 2. What's been done (every file, with status)

**Status legend:**
- **FINAL**: reviewed or approved, safe to use.
- **SPEC**: ready for dev or content to implement.
- **DRAFT**: usable but has known open items.
- **OLDER**: early work, partly superseded by later decisions; read it with section 3 in mind.
- **OUTDATED**: contains wrong facts; do not use as a reference or template.
- **REFERENCE**: input data.

### 2a. Blogs (copy-and-structure specs in `seo-audit/`)
- `Article-01-White-Label-Partnerships-Guide.docx`: Blog 1, keyword "white label partnerships", slug `/blogs/white-label-partnerships-guide`. **FINAL.** The one intentionally **first-person founder-narrative** piece. Needs a real founder byline before publishing.
- `Article-02-White-Label-Reseller-Programs.docx`: Blog 2, "white label reseller programs", `/blogs/best-white-label-reseller-programs`. **FINAL** on content, but **still in founder "I" voice**; convert it to team "we" (section 6).
- `Article-03-White-Label-SaaS-Platforms.docx`: Blog 3, "white label saas", `/blogs/best-white-label-saas-platforms-to-resell`. **FINAL.** A named-platform listicle: 13 platforms, each with its own profile and a 5-row spec card (Best for / Pricing / White-label / Compliance / Watch for), grouped by category, with a comparison table on top. Team "we" voice. Trillet facts corrected 26 Sep.
- `Article-04-White-Label-Tools-for-Agencies.docx`: Blog 4, "white label tools for agencies", `/blogs/white-label-tools-for-agencies`. **FINAL.** The agency **operating stack by job to be done**, deliberately different from Blog 3. 16 named tools across 6 jobs, sourced from Trillet's Skool community of agency founders. Team "we" voice.
- `Brief-01-White-Label-Partnerships-Guide.docx`: the writer brief for Blog 1. OLDER, reference only.

### 2b. White-label product and hub page
- `Trillet-Whitelabel-Hub-Rebuild.docx`: **SPEC (v3)** rebuilding `/whitelabel` as a **conversion-first product page**. Sections: hero and CTA, trust strip, how it works in 3 steps, platform showcase with PRODUCT SHOT callouts, economics, compliance edge, verticals, pricing, proof, FAQ, close. Includes the head-term H1, a new meta, Service + FAQPage + BreadcrumbList JSON-LD, an internal-link map and a "structure at a glance" table. Pricing corrected 26 Sep. v1 and v2 were rejected (section 3). **Known leftovers:** the CTAs still say "Start risk free" / "Book a demo" (the live site uses "Get started" / "Try a live demo"), and its native-integrations line omits ServiceTitan.

### 2c. Integration pages
| File | What it is | Status |
|---|---|---|
| `Trillet-Integration-GoHighLevel.docx` | Spec for `/integrations/gohighlevel`, the **301 merge target** for `/blogs/gohighlevel-voice-ai-integration` (18,923 impressions, 34 clicks, best position 7.6). Keyword "gohighlevel voice ai integration". H1 "GoHighLevel voice AI. Booked before they hang up." Contains a Design language token table, 14 sections each with a DESIGN NOTE, 7 FAQs, JSON-LD and internal links. | **FINAL** |
| `Trillet-Integration-GoHighLevel-render.html` | Self-contained HTML design reference in Trillet's live v3 design system (cream, ink, plum, yellow; see 3d): animated hero call, tinted cards, an interactive setup stepper, a plum pricing card, accordion FAQ and a mobile sticky CTA. Verified at 1360px and 390px wide. | **FINAL** (visual reference, not production code) |
| `Trillet-Integration-ServiceTitan.docx` | Spec for `/integrations/servicetitan`. Keyword "servicetitan ai receptionist". H1 "The AI receptionist for ServiceTitan. Every call lands in your booking queue." 16 sections plus a mobile note, 10 FAQs, a 5-step HowTo. | **FINAL** (see open items 3 to 5 before publishing) |
| `Trillet-Integration-ServiceTitan-render.html` | HTML design reference: a sky hero stage with a booking-queue visual, **interactive permission switches** with a live "Bookings go to" summary, credential checklist cards, a 5-step settings panel and trades tiles. Verified at 1360px and 390px, with no JS errors. | **FINAL** (visual reference) |
| `Trillet-Integration-Index.docx` | Light `/integrations` hub: 4 native integrations plus webhook and API, a "Which one fits" table, 4 FAQs, CollectionPage and ItemList schema. GoHighLevel and ServiceTitan copy and pricing are correct. | **DRAFT**: re-check the Google Calendar and Cal.com rows after those rebuilds. The Cal.com row is unverified. |
| `Trillet-Integration-Google-Calendar.docx` | Spec for `/integrations/google-calendar` (rebuilt 8 Oct). Keyword "ai receptionist google calendar". H1 "Your Google Calendar knows when you're free. Now it answers the phone." Sections include the signature "Your calendar is the rulebook", "What your caller gets" (the Google invite), six appointment-business industry tiles, two-path pricing (AI Receptionist and white-label side by side), 10 FAQs and a 4-step HowTo. Its build script writes to a relative path. | **FINAL** (see open item 1 before publishing) |
| `Trillet-Integration-Google-Calendar-render.html` | HTML design reference: pink hero stage with a call, a Google Calendar day view and the caller's invite email; an **interactive rulebook day view** (block lunch, close at 3pm, 15/30/45/60-minute slots recompute the offered times); a caller-side invite and reschedule block; a 4-step settings panel; two pricing cards. Verified at 1360px and 390px, with no JS errors. | **FINAL** (visual reference) |
| `Trillet-Integration-Cal-com.docx` | First-pass Cal.com spec. | **OUTDATED**. It has the old figures, and its round-robin, collective-event and self-hosted claims are Cal.com platform features, not verified Trillet integration capabilities. |
| `sources/trillet-integration-guides-2026-09-25.md` | **Authoritative product guide:** Trillet's help-centre guides for Google Calendar, GoHighLevel and ServiceTitan, "written against dev, 25 Sep 2026, and audited against the frontend, backend and call-agent source". Each guide ends with a screenshot list for Ming, the Trillet team member who publishes help-centre pages. | **REFERENCE** |

Each integration page is deliberately different (its own keyword, H1, hero story, use cases, setup, FAQ and schema) so none of them reads as a templated doorway page.

### 2d. Strategy, redirects and planning
- `Trillet-WhiteLabel-Redirect-Map.xlsx`: **the central artifact.** 191 white-label URLs across 3 sheets (Redirect map / Summary / Data findings), with columns for action, target, 16-month impressions and clicks, CTR, best position, revamp tier, cannibalisation overlap and live HTTP status.
  - **Its REDIRECT/REFRAME split predates a later revision** (section 3c).
  - Rows 4 and 5 add `/integrations` and `/integrations/gohighlevel` as NEW.
  - Row 58 merges the GHL blog into `/integrations/gohighlevel`.
- `Trillet-WhiteLabel-Implementation-Timeline.docx`: 4-week sprint, 14 Sep to 11 Oct 2026. Week 2 dev: build `/integrations/gohighlevel` before its Wave-2 redirect, plus the `/integrations` directory if capacity allows. **OLDER:** Wave 2 still lists the big chatbot pages as redirects; re-sync it to the revised split.
- `Trillet-WhiteLabel-Master-Plan.docx`, `Trillet-WhiteLabel-Strategy-Plan.docx`, `Trillet-WhiteLabel-Cluster-Gap.docx`: OLDER white-label strategy. The core diagnosis (a sprawl problem of about 130 pages; consolidate to hub and spoke; add an `/integrations` hub and a canonical GHL page) still holds.
- `Trillet-Snippet-Changes.xlsx`: **FINAL.** 8 title and meta edits across 7 pages, changes only.
- `Trillet-CTR-Revamp-Worklist.docx`: title and meta CTR revamp list for Tier-A pages. SPEC.

### 2e. Competitor and keyword analysis
- `Trillet-Competitor-Keyword-Gap.xlsx`: **FINAL.** Sheets: Summary / Trillet striking-distance (97 keywords at positions 11 to 20) / Gap quick wins / All gaps (about 3,143). Built from Semrush exports for 19 domains.
- `Trillet-Competitor-Keyword-Gap-Analysis.docx`: the write-up.
- `data-competitor-keyword-gap.csv`, `data-trillet-striking-distance.csv`, `data-competitor-cluster-matrix.json`: supporting data.

### 2f. Topical cluster maps
- `Trillet-Cluster-Atlas.docx`, `Trillet-Cluster-Atlas.html`, `cluster-atlas.html`: **FINAL.** Interactive competitor × cluster coverage atlas (10 clusters; also published as a claude.ai artifact).
- `Trillet-Topical-Cluster-Architecture.docx`, `Trillet-Topical-Cluster-Map.docx`, `Trillet-Sitewide-Topical-Map.docx` (488 URLs, 3 funnels): cluster architecture docs. Mix of FINAL and OLDER.

### 2g. Homepage (earliest work, OLDER)
- `Trillet-Homepage.docx`, `Trillet-Homepage-Copy-Deck.docx`, `Trillet-Homepage-Schema.docx`, `trillet-homepage-schema.html`, `homepage-ai-voice-agents-spec.md`: homepage optimisation for "ai voice agents". The spec keeps competitor names off the homepage body. That rule also shaped the ServiceTitan decision not to name ServiceTitan's own products. Its figures ("1,200+") are older.

### 2h. Audit and memos (earliest, OLDER; they predate the "three funnels" correction)
- `trillet-ai-seo-audit.md`, `trillet-ai-content-revamp-brief.md`, `trillet-ai-content-keyword-analysis.md`, `trillet-ai-revised-response-memo.md`, `Trillet-SEO-Master-Report.pdf`, `Trillet-Revised-Response-and-Plan.pdf` / `-v2.pdf` / `-v3.pdf` (v3 is the latest).
- `trillet-task-tracker.csv` (7-day and 30-day tasks, all "Not started") and `trillet-metrics-tracker.csv` (KPI baselines, e.g. non-brand CTR 0.27%, `/industries/plumbers` position 22.3, Trustpilot 4.6 from 20 reviews). Neither was maintained later.

### 2i. Data inputs (REFERENCE)
- `gsc-16mo-2026-09-09.zip`: 16-month Search Console export (`Queries.csv` about 1,040 rows, `Pages.csv`, `Countries.csv`, `Devices.csv`, `Chart.csv`, `Filters.csv`, `Search appearance.csv`).
- `data-tierA_page_queries.csv`, `data-tierA_summary.csv`, `data-money_term_pages.csv`, `data-live_status.csv`, `data-canonical_robots_check.csv`, `gsc_overlap_results.csv`: GSC-derived.
- `tools/gsc_query_overlap.py`, `tools/gsc_overlap_cloudshell.py`, `tools/gsc_pull2_cloudshell.py`: GSC API scripts, meant to run in Google Cloud Shell.

### 2j. Build harness (`seo-audit/tools/build/`)
- `README-integration-pages.md`: the integration-page brief. The "one hard rule" is that every page must be genuinely different. Also covers voice rules and reconciled facts (updated 25 and 27 Sep). **DRAFT:** the "Task" section still lists only the original four pages, and the "Git" footer lines belong to a Claude session (Gotcha 6).
- `int-helpers.js`: shared docx-js helpers for integration specs:
  - text and structure: `eyebrow`, `H1`/`H2`/`H3`, `kicker`, `P`, `t`, `link`, `bullet`, `num` (real numbered lists), `rule`, `meta`, `okline`, `flag`;
  - callouts: `shot` (PRODUCT SHOT, bronze bar), `dnote` (DESIGN NOTE, navy bar), `ans` (green short-answer box);
  - blocks: `cta`, `table`, `spec`, `name`, `code`;
  - output: `build(outFile, children, numberingRefs)`.
  **FINAL.**
- `page-gohighlevel.js`, `page-servicetitan.js`, `page-index.js`: build scripts for the current integration docs. FINAL.
- `page-google-calendar.js`, `page-cal-com.js`: build scripts for the outdated drafts. **OUTDATED**; rewrite rather than patch.
- `product-page-helpers.example.js` (the `/whitelabel` hub build, with `shot()`) and `listicle-helpers.example.js` (the Blog 3 build, with `spec()`, `table()`, `name()`, `ans()`): readable helper patterns only. **Never run them** (Gotcha 1).
- `package.json` pins docx-js (`docx ^9.7.1`). `node_modules/` and `package-lock.json` are git-ignored; run `npm install` here first.
- The blog and hub build scripts (`build_article*.js`, `build_wlhub_v3.js`) were written in a session scratchpad and **never committed**. The ServiceTitan render was also assembled from an uncommitted template. To change a blog or hub doc, rebuild it from its committed content using the helper patterns; to change a render, edit the committed HTML directly.

---

## 3. Key findings and decisions (with why, and the rejected options)

### 3a. Verified Trillet facts (re-checked on trillet.ai/whitelabel and /pricing, 25 to 26 Sep 2026; re-verify before publishing)
- Pricing:
  - AI usage **$0.12/min** after included minutes, covering platform, STT, LLM and TTS.
  - Telephony is separate: **US Trillet telephony from $0.014/min**; web calls have no telephony fee. Transferred-call minutes are $0.05/min. SMS costs $0.02 each, or $0.01 on a bring-your-own Twilio or Telnyx number.
  - **Studio $99/month**: up to 3 workspaces, **1,000** included minutes, 3 free numbers, white-label branding.
  - **Agency $299/month**: unlimited workspaces, **3,000** included minutes, 10 free numbers, own domain and branded emails, set your own client rates.
  - White-label plans: **7-day free trial, no contracts, no setup fees.** The **28-day money-back guarantee belongs to the $49/month AI Receptionist** (150 minutes, then $0.20/min), not to white-label.
- **Compliance on every plan:** SOC 2 Type II, ISO 27001, HIPAA, GDPR, ACMA, TCPA, AU data residency, with audit trails and call recordings and transcripts. **Carrier-level call forwarding** goes live in about 30 seconds with no number porting.
- Proof: **Rated 4.6 on Trustpilot**, **3,900+ businesses**, "Proudly Australian owned. A global leader."
- Live CTAs: **"Get started"** and **"Try a live demo"**; plan CTAs **"Start Studio"** and **"Start Agency"**.
- **Stale figures that were wrong and have since been fixed; never reintroduce them:**
  - 100/300 included minutes (now 1,000/3,000);
  - "28-day money-back" on white-label (now the 7-day free trial);
  - "1,200+ businesses" (now 3,900+);
  - the "Start risk free" CTA.
- **AI Receptionist plan** (live on trillet.ai/receptionist, 8 Oct): $49/month, 150 minutes included (about 75 calls), $0.20/min over with no plan change, 24/7 call handling, calendar booking, call summaries by email, keep your existing number, 28-day money-back guarantee, no contracts, no setup fee. Its CTA is **"Try risk free"** (correct for this plan; "Start risk free" is the stale white-label wording). Real quotes on that page: Dylan (DPMP Media) and Ethan (Bull Digital), used verbatim on the Google Calendar page.
- **Live integrations (checked 6 to 8 Oct):** `/integrations`, `/integrations/gohighlevel` and `/integrations/servicetitan` now return 200, built from this branch's specs (the ServiceTitan title matches ours word for word). Google Calendar only has a card on the hub (`/integrations#google-calendar`, "Discuss your setup"); the hub also has a "Your own API" (custom API actions) card. The site footer lists All integrations, ServiceTitan, GoHighLevel, Google Calendar and Custom API actions. **Cal.com is no longer on the hub or in the footer.** The `/platform` page names Zoho CRM, Salesforce, Stripe, Google Calendar, Cal.com and GoHighLevel, plus PBX and telephony (Avaya, Cisco CUCM, Mitel, Asterisk, SIP trunks, CTI bridges), "connected through your system's API during onboarding".
- Earlier live URL status (checked 25 to 27 Sep; the integration rows above supersede it):
  - These returned 404: `/integrations`, `/security`, `/compare`, `/industries/electrical`, `/industries/roofers`, `/industries/home-services`.
  - These return 200: `/industries/hvac`, `/industries/plumbers`, `/industries/electricians`, `/industries/roofing`, `/blogs/ai-answering-service-for-hvac`, `/blogs/ai-answering-service-for-plumbers`, `/blogs/voice-ai-for-hvac-companies-reseller`, `/blogs/hvac-missed-call-cost`, `/receptionist/industries/hvac`.
  - ServiceTitan was mentioned nowhere on trillet.ai (it now is; see above).
- Real customer quotes live on trillet.ai/whitelabel (use them verbatim):
  - Ian Strange (UC Marketing): "Great platform, excellent granular control for building highly functional agents. API integration tools make connecting CRMs really easy."
  - Lori Mars (Linx AI Agency): "This is better than building it myself with Make and Retell and connecting everything up manually."
  - Others on the site: Tom Gallop (Beverly Hills Teusch), Troy Bundy (Fanomenal), Marcel Heinze, Mason Anderson (Automate What), Tim Close (Founder, CommsChannel).
  - No trades-specific quote exists yet.

### 3b. What each integration actually does (from the product guide)
- **GoHighLevel:**
  - Connected **per agent**; you pick the sub-account at connect time.
  - Works against one GHL calendar, which needs a Calendar ID from the calendar's booking link.
  - Functions: check availability, book, reschedule, cancel. It uses the GHL calendar's own availability, slot length and booking rules.
  - Booking needs first name, last name and email. It finds the caller's contact by email or phone, or creates one, and books against it.
  - Agent Location (Timezone) is required and should match the GHL calendar.
  - Each function's instructions can be edited (Reset returns the default), and you can set what the agent says while it works.
- **Google Calendar:**
  - Per agent. One selected calendar (primary by default).
  - Slot Duration: 15, 30, 45 or 60 minutes, or custom (default 30).
  - Agent Location (Timezone) is required and is the business's timezone.
  - Functions: check availability, book, reschedule, cancel.
  - **Any time without an event counts as free**, so closed hours must be blocked in Google Calendar or added to the agent's prompt.
  - Booking needs name and email, and Google emails the caller an invite. Reschedule and cancel find the appointment by time plus name, email or phone.
  - "Details to include" controls what is written into the event. There are Reconnect and Disconnect controls, plus the documented error messages.
- **ServiceTitan:**
  - **Setup:** a ServiceTitan admin creates four credentials under Settings > Integrations > API Application Access: Tenant ID (numbers only), Application Key (starts ak1), Client ID (starts cid) and Client Secret (often starts cs1). The API app needs access to Settings, CRM, Job Planning & Management, Dispatch, Marketing and Memberships. Verify & Connect loads business units, job types and campaigns; credentials are stored encrypted.
  - **Seven agent permissions (defaults):**
    - Recognize the caller: on.
    - Offer appointment times: on.
    - Take booking requests: on (to the office queue for approval).
    - Book directly onto the schedule: off.
    - Save call notes: on (gate codes, access instructions, caller details).
    - Find the account by service address: off (confirms the account name only).
    - Create jobs: off (appointment window, no technician).
  - **Privacy:** the agent only works with the caller it's speaking to.
  - **Booking settings:** window of 3, 7, 14 or 30 days (default 7); minimum notice none, 2h, 4h, 1d or 2d (default 2h); business unit; default job type; campaign.
  - **Variables:** e.g. `{{servicetitan_job_number}}` feed post-call texts, email summaries, webhooks and workflows.
  - **Test and Live data:** Test shows "Connection healthy", and Live data shows what the agent can read.
  - **Rollout:** the guide says ServiceTitan is **rolling out gradually** and the tile may need support to turn it on.
- **Cal.com, webhook and API:** listed as native on trillet.ai/whitelabel, but **there is no product guide for them**, so treat every capability claim as unverified.

### 3c. White-label cluster decisions (from the white-label session)
- **The site is three funnels, not one** (see section 1). Early docs framed everything as white-label; that was corrected. This branch works the white-label funnel.
- **Head term and hub:** "white label voice ai" (about position 27), with `/whitelabel` as the hub. Blogs (spokes) link up to it; it links down to money and vertical pages.
- **Keyword gap:** Trillet ranks for about 598 US keywords, against about 7,397 for answerconnect and about 14,576 for smith.ai. The biggest gap is the SMB answering-service cluster. The **97 striking-distance keywords** (positions 11 to 20) are the cheapest wins.
- **Redirect map revision (not fully reflected in the xlsx or the timeline yet):**
  - Original summary: KEEP 145, CANONICAL 13, MERGE 14, REDIRECT 8, REFRAME 2, REVAMP 2, NEW 6, DONE 1.
  - **Revised to REDIRECT 5 and REFRAME 3** (MERGE stays 14).
  - Why: three chatbot blogs rank on page 1 with big impressions: `best-white-label-ai-chatbot-for-agencies-2026` (44,467 impressions, position 6.3), `what-is-white-label-ai-chatbot` (17,258, position 17.8) and `white-label-ai-chatbot-pricing-comparison` (14,823, position 4.9).
  - **Rule: never 301 a page ranking at position 10 or better (or with about 5k+ impressions) to an off-intent target**, because Google treats that as a soft 404 and drops the ranking. These three are **reframed in place**: keep the URL, pivot the content to "chatbot vs voice, why voice wins", and link internally to the voice canonical.
  - *Rejected:* the original blanket chatbot-to-voice 301s.
  - **The 19 URLs that change** are the 5 redirects plus the 14 merges.
  - **Survivor decision:** `white-label-voice-ai-wrappers-vs-native-platforms` (13 queries) merges into `voice-ai-wrapper-vs-native-platform` (2 queries, also the target of MERGE #14). Move the source's winning content onto the target, then 301 the source. This is decided.
- **Voice decisions** (a user priority, corrected several times):
  - **Product and landing pages use second person, outcome-led, conversion-first copy, with no founder "I" and no teaching essays.** v1 and v2 of the hub were rejected as "too blog-like, too much information, product invisible, doesn't inspire the transaction". v3 was rebuilt against what ranks and converts (Vapify, Autocalls, byVoice) and Trillet's homepage voice. *Rejected:* a founder-story hero, and a generic buyer's checklist as a body section.
  - **Blogs and roundups use team "we"**, which scales across writers and matches the product voice. Singular "I" is kept only for the signed Blog 1.
  - **First-party sourcing:** Trillet builds white-label voice AI **and runs a Skool community of agency founders**, and blogs cite this honestly. Never fabricate specific quotes, names or stats.
  - **Blog 3 vs Blog 4:** Blog 3 answers "what to **resell**" (products); Blog 4 answers "what's my operating **stack**, by function". Overlapping jobs stay short in Blog 4 and cross-link to Blog 3.
- **Meta and snippets:** the "missing title tag P0" was a **curl render artifact**, not real. Only `/whitelabel`'s meta genuinely needed a change (it was 186 characters). There are 8 snippet edits in the xlsx. **Evergreen slugs: the year goes in the title only, never in the slug.**
- **Technical:** AI crawlers are allowed (GPTBot, ClaudeBot, PerplexityBot, Google-Extended). `/security` and `/compare` 404 and are structural gaps.
- **Competitor facts (verified Sep 2026, used in Blogs 3 and 4):**
  - Voice AI:
    - Synthflow: SOC 2, HIPAA, GDPR, ISO; white-label at enterprise tier (about $2,000/month pay-as-you-go or about $30k/year); about $0.15 to 0.24/min.
    - VoiceAIWrapper: SOC 2, GDPR, HIPAA (BAA on Pro); from $29; wraps Vapi, Retell and ElevenLabs.
    - Stammer: **GDPR only, no HIPAA**; about $197/month; $0.11 to 0.17/min.
    - Autocalls: about $0.09/min; white-label about $419/month; unlimited sub-accounts.
  - Agency platforms:
    - GoHighLevel: SOC 2 Type II; **HIPAA is a paid add-on (about $297/month) with a BAA**; plans $97 / $297 (white-label) / $497 (SaaS).
    - Vendasta: SOC 2 Type II; $99 / $499 / $999 with marketplace offset.
    - Duda: White Label $149/month.
    - Simvoly: from about $59/month.
    - SE Ranking: Core about $129 plus the Agency Pack at about $69.
    - AgencyAnalytics: from about $59; full white-label on the Agency plan (about $179 to 239), plus about $12 to 14 per client.
    - DashThis: Professional $139.
    - Sendible: from about $299.
    - SocialPilot: from about $100.
    - SuperOkay: Solo+ about $29.
    - ManyRequests: $29 / $59 / $99.
    - SPP: custom pricing.
    - TextUs: white-label and OEM SMS.

### 3d. Integration-page decisions (from the integration session)
1. **Every integration claim must be grounded in the product guide.** The first GoHighLevel draft invented features from generic web research about GoHighLevel's own product: workflow triggers from calls, sub-account snapshot rollout and rebilling, and tags, custom fields and recordings written to the contact. The guide contradicted all of them, and the brief forbids invented capabilities, so they were removed. *Rejected:* inferring Trillet's features from competitors or from what the partner platform can do.
2. **One genuinely distinct page per integration** (the brief's "one hard rule", because Google penalises near-duplicate doorway pages). Shared blocks (pricing, compliance strip, CTA, `/whitelabel` link) stay small.
3. **GoHighLevel:**
   - Keyword "gohighlevel voice ai integration", because the page absorbs the 18,923-impression blog's query set.
   - Ranking pages (GHL Experts, ghlcentral, HighLevel's help centre) all follow what it is → how it works on a call → features → setup → FAQ, with calendar booking as the spine, which matches the real product.
   - Keeps one light agency band linking to `/whitelabel`, with no rebilling mechanics.
   - States that GoHighLevel sells HIPAA as a paid add-on.
4. **ServiceTitan** (planned with SERP and competitor research, then approved by the user):
   - **Keyword:** "servicetitan ai receptionist", because competitor titles use it (AgentZap, OneDash Zero, Epiphany Dynamics, Nora); it also keeps the page distinct from GoHighLevel.
   - **Positioning, control first:** the office approval queue is the default and direct booking is optional. The incumbent, ServiceTitan's own AI Voice Agent / Virtual Agent (Pro suite, demo-gated, "compatible with any phone system", books against Adaptive Capacity, "20 minutes" to set up), is strong on native booking. So Trillet wins on control, public self-serve pricing, compliance with encrypted credentials, and agencies being able to white-label it.
   - **Rollout:** publish as generally available, **with no rollout mention** (the user's choice). *Rejected:* an "early access" badge (the integration session's recommendation) and noindex until GA. This depends on open item 3.
   - **Plans:** included on **Studio and Agency** (the user's choice). *Rejected:* Agency and Enterprise only, or "available on request".
   - **Don't name or compare ServiceTitan's own voice products** on the page; capture that intent with a separate comparison blog. *Rejected:* a short side-by-side block.
   - **Claims deliberately left out** because the guide doesn't support them: Adaptive Capacity, membership recognition, pricebook quoting, emergency triage, Spanish, reading the caller's address back.
   - **Signature sections:**
     - "You stay in control": the 7 permissions as switches.
     - "What you need from ServiceTitan": a credentials checklist; only Epiphany covers this in the SERP.
     - "Built for the trades": links into the trades cluster.
5. **Renders use Trillet's live v3 design system (`.v3-root`, as on `/whitelabel`), not the report palette.** An earlier render used the report styling (navy `#16223C` and bronze `#9A6B3F` with a Georgia serif), and the user rejected it for missing Trillet's colours.
   - **Tokens:**
     - Colours: cream `#fbf9f5`, paper `#ffffff`, ink `#191317` (soft 72%, faint 45%), plum `#2b2027` and plum-soft `#3a2d35`, on-plum `#f6eef2`, yellow `#eccd63`, yellow-soft `#f0dfae`, sand `#f2e4bc`, pink `#ecd2e4`, sky `#d6e2f0`, blue-soft `#a8c2e4`, green `#2e5e41`, tick `#e07a56`, blue `#0062e9`.
     - Type: **Maven Pro** 500 for headings (tracking -0.025em, line height 1.06, one italic word for emphasis), **Source Sans 3** at 17px / 1.55 for body, and Maven Pro 600 12px uppercase labels tracked 0.14em.
     - Shape: 8px button radius and 20px card radius. Ink buttons carry a trailing arrow chip.
   - **Rules:**
     - Plum appears in exactly three places: the Why-Trillet band, the featured Agency card and the closing CTA.
     - H1s are two short stacked sentences.
     - Each page gets its own hero stage: GoHighLevel uses sand with pink; ServiceTitan uses sky with butter.
   - *Rejected:* the homepage's `.home-trial` variant (navy `#102b4e`, blue `#1769e8`, Source Serif 4 headings), because integration pages are siblings of `/whitelabel`. Any note elsewhere calling the v3 tokens "navy/teal" is wrong.
6. **Partner logos are placeholders:** neutral text monograms ("GHL", "ST") until brand-guideline permission is confirmed.
7. **Conversion order for integration pages:**
   1. Outcome hero.
   2. Compliance and proof high up.
   3. A plain short answer (for AI answers and People Also Ask).
   4. How it works on a call.
   5. Use cases.
   6. Setup (HowTo).
   7. Why Trillet.
   8. Pricing.
   9. FAQ.
   10. Closing CTA.

   CTAs repeat down the page.
8. **Google Calendar** (planned with GSC, SERP and competitor research, then decided by the user on 8 Oct):
   - **Keyword:** "ai receptionist google calendar" (122 impressions, position 14.4), with the booking cluster around it. The searcher is a small appointment business whose day runs in Google Calendar, which is the $49 AI Receptionist audience, not the agency audience of the GoHighLevel page.
   - **Pricing: both paths side by side** (the user's choice): AI Receptionist $49 (featured, plum, "Try risk free") and White-label from $99 (Studio and Agency rows, "Get started"). *Rejected:* receptionist only (the recommendation) and white-label only.
   - **H1: calendar-led** (the user's choice): "Your Google Calendar knows when you're free. Now it answers the phone." *Rejected:* invite-led (the recommendation) and busy-owner-led.
   - **Hook nobody else leads with:** Google emails the caller a real invite. **Signature section:** "Your calendar is the rulebook", which explains honestly that any time without an event counts as free.
   - **Claims left out** because the guide doesn't support them (competitors advertise them): several calendars or team routing, buffers, reading Google's working-hours settings, reminders, round-robin. "Native, not a workaround" contrasts with Aira's Zapier-only connection; "Calendar booking included" contrasts with Voka's $9.99/month add-on (neither competitor is named on the page).

### 3e. Research numbers not saved elsewhere
- **Competitor integration pages** (sitemaps of the 20 repo competitors, 6 Oct): Smith.ai 147 `/integrates-with/*` pages plus 7 category pages (733 integration keywords, 42 on page 1, the leader); My AI Front Desk 166 programmatic `/connect/a-to-b` pages (368 keywords); Retell 80 curated pages (54, 20 on page 1); Bland 19 pages (59, **28** on page 1, the most efficient); Autocalls 265 thin pages (23 keywords, **0** on page 1); Aira 56 (trades, legal, phone systems); AnswerConnect 46; Dapta 42; Ruby 24; Prosper 11 (healthcare record systems); Synthflow 5. Trillet ranks for 2 integration keywords. Most common integrations across the 13 competitors with pages: HubSpot 11, Salesforce 10, Slack 8, Microsoft Teams 7, Pipedrive 7, Zapier 6, Calendly 6, Airtable 6, Shopify 6, GoHighLevel 5, Zoho 5, Keap 5, Twilio 5, Google Calendar 4, Cal.com 4, Clio 4, Stripe 4, ServiceTitan 3. Lesson: page count does not equal rankings; build a modest set of distinct, real integrations, never programmatic pairs or thin catalogues.
- **Google Calendar demand (GSC):** ai receptionist google calendar 122 (14.4); ai receptionist appointment booking 314 (18.0); ai receptionist appointment scheduling 278 (14.3); ai receptionist that books appointments 154 (18.3); can an ai receptionist book appointments for me in my calendar? 140 (6.8). Pages: `/blogs/can-ai-receptionist-schedule-appointments` about 11.9k impressions across apex and www (positions 8.8 to 10.9); `/blogs/voice-ai-appointment-scheduling-integration` about 1.1k.
- **Google Calendar SERP (8 Oct):** Smith.ai 583 words, AgentVoice 494, Ruby 232, Kickcall 1,154, TalkerIQ 1,016; Voka is strongest (2,857 words, problem-led, Google Calendar is a $9.99/month add-on); Aira connects via Zapier only. Front Desk Review's tracker names Trillet among 5 AI receptionists with Google Calendar booking but lists it "from $99/mo", flagged stale.
- GSC trades demand (16 months, `Queries.csv`), as impressions with average position in brackets:
  - roofing answering service: 7,620 (9.6)
  - plumbing answering service: 3,724 (12.6)
  - answering service for plumbers: 2,379
  - ai receptionist for contractors: 1,315 (14.0)
  - ai receptionist for hvac: 1,281 (10.4)
  - answering service for hvac company: 1,137
  - ai answering service for plumbers: 936
  - ai receptionist for plumbers: 812 (8 clicks)
  - Pages: `/blogs/ai-answering-service-for-hvac` about 19.6k at position 10.7; `/blogs/ai-answering-service-for-plumbers` about 12.6k at 12.7.
  - There are no ServiceTitan queries yet.
- ServiceTitan SERP (26 Sep):
  - Third-party pages are thin, about 540 to 1,350 words: AgentZap 847 (from $109/month, the only public price), AgentVoice 587, OneDash 1,343, Smith.ai 537.
  - ServiceTitan's own page runs about 2,300 words.
  - Common pattern: hero → call-to-booked-job flow → feature grid → trades grid → FAQ.
  - Avoca AI is a ServiceTitan Marketplace partner. Sameday (gosameday.com) ranks with a comparison post.
  - People Also Ask themes: certified app? account prerequisites? need a developer? works with my number? turn access off? setup time?

---

## 4. Sources and methods
- **Product truth:** `seo-audit/sources/trillet-integration-guides-2026-09-25.md`. When anything else conflicts, the guide wins.
- **Google Search Console:** the 16-month export (`gsc-16mo-2026-09-09.zip`) and derived CSVs, analysed with grep, sort and Python.
- **Semrush:** organic positions exports for 19 domains, used for the keyword-gap work. The integration workstream had no Semrush access.
- **Live site:** `sitemap.xml` (about 488 URLs, about 422 blogs), `/whitelabel`, `/pricing` and the homepage, fetched with `curl -sSL -A "Mozilla/5.0"` (add `-m 30` and retry, because trillet.ai sometimes times out) plus Python HTML parsing and WebFetch. **Design tokens** came from the Next.js CSS bundles (`/_next/static/css/*.css`, linked in the page HTML): grep for `--v3-*`, `.v3-display`, `.v3-label` and font-family declarations.
- **SERP and competitors:** WebSearch (US results) and WebFetch. Competitor pages were fetched with curl, and their `<title>`, meta description, H1 to H3, word count and schema `@type`s extracted with Python regex. Every external fact was verified before inclusion.
- **Tooling:**
  - docx-js (Node) for `.docx`; openpyxl (Python) for `.xlsx`.
  - To read an existing `.docx`, unzip `word/document.xml` and regex the `<w:t>` runs (python-docx is not installed).
  - HTML renders are hand-written, self-contained single files.
- **Visual QA:**
  - Playwright via Node (`require('/opt/node22/lib/node_modules/playwright')`, Chromium in `/opt/pw-browsers`) at 1360x900 and 390x844 (device scale 2).
  - Assert `document.documentElement.scrollWidth === 390` on mobile, list elements whose `getBoundingClientRect().right > 391`, and capture `pageerror` events.
  - Test interactions too (e.g. click a permission switch and read the summary text).
- **What didn't work, or pitfalls learned:**
  - curl on client-side-rendered pages returns inconsistent `<title>` and meta tags, which caused a false "missing title" P0.
  - docx-js `columnSpan` cells are **silently dropped by some Word viewers**; use the stacked or bordered table patterns in the helpers.
  - Trillet pricing drifted between an early scrape and the live site; always re-verify.
  - In the sandbox, headless Chromium couldn't load Google Fonts (`net::ERR_CERT_AUTHORITY_INVALID` from the proxy). The fix: download the CSS and woff2 files with curl, which trusts the proxy CA, and serve them through Playwright's `page.route`. **Never disable TLS verification.**
  - PIL isn't installed; use Playwright's `clip` for section screenshots.
  - The redirect map `.xlsx` uses inline strings, so there is no `sharedStrings.xml`.
  - A `sed` replacement containing `&` inserts the matched text; use Python for those.
  - Pushes were rejected twice because another session had pushed first; `git pull --rebase` fixed it.

---

## 5. Preferences and conventions (how the user likes it)
- **Workflow: one page at a time, plan before building.** For each new page:
  1. Read the product guide.
  2. Run SERP and competitor analysis plus GSC.
  3. Present a plan (keyword, H1, section table, design, how it stays distinct) and ask only the genuinely open decisions.
  4. Build once it's approved.
- **Formats:** Word `.docx` for documents, `.xlsx` for sheets, standalone `.html` for shareable or interactive pieces. For **each integration page, deliver both** `Trillet-Integration-<Name>.docx`, built by `seo-audit/tools/build/page-<name>.js`, **and** `Trillet-Integration-<Name>-render.html`. The user wants to see the page, so the render isn't optional. These are specs, not live code.
- **Spec docs must be clean:** no rationale or "thinking" and no references to earlier drafts or corrections (the user explicitly asked for this). Use labelled **DESIGN NOTE** callouts for how each section looks, **PRODUCT SHOT** callouts for what to screenshot, and a **Design language** section near the top.
- **Tone:** Trillet brand voice: plain, confident, outcome-led, concrete, with the compliance and audit wedge up front. No hype, no hedging, no AI fingerprints. Product pages use second person; blogs and roundups use team "we".
- **Zero em-dashes and zero en-dashes** (a hard rule). Verify every build by unzipping `word/document.xml` and grepping the HTML.
- **Australian spelling** in copy. Product UI labels are quoted exactly as they appear in Trillet (e.g. "Recognize the caller").
- **Content conventions:**
  - Name the actual companies and give each its own profile and spec card; don't bunch them.
  - Include a comparison table, an **AEO "short answer" block**, question-format FAQs and JSON-LD.
  - Evergreen slugs, with the year in the title only.
  - Verify each external fact, then state it plainly without caveats.
  - Cite first-party experience honestly.
  - Keep meta titles to 60 characters or fewer and descriptions to about 155 or fewer, and record the counts in the doc.
- **Things the user corrected (don't repeat them):**
  - Give dev only the changes, not what's being kept.
  - Don't 301 page-1 rankings to off-intent targets.
  - A product page must inspire the transaction, not read like an essay.
  - Name the companies, and make the profiles valuable.
  - Use "we", not "I", for roundups.
  - Never invent integration capabilities; ground them in the product guide.
  - Use Trillet's real brand colours in renders.
  - Strip rationale and version history from deliverable docs.
  - Surface the delivered file itself, not just the commit.
- **Git:**
  - Commit each page with a clear message and **push to this branch**. **Never open a PR unless asked.**
  - Earlier commits carry Claude attribution footers (`Co-Authored-By` plus a `Claude-Session` link). Those are specific to Claude sessions; use your own host's attribution convention, or ask the user.
  - Don't put model identifiers in docs or artifacts.

---

## 6. Open items and next steps (priority order)

**Integration pages (the active workstream the user was driving page by page):**
1. **Google Calendar is built (8 Oct).** Before publishing, confirm with Trillet that the AI Receptionist plan's "Calendar booking" uses this Google Calendar connection (the pricing card and Why section say so). Once live, point the hub's Google Calendar card at the page, link the two scheduling blogs to it, and send Front Desk Review the page for re-verification of its stale "$99/mo".
2. **Cal.com:** get a source of truth from the user or Trillet for what the Cal.com integration does, and confirm it's live. Don't publish the current doc before then.
3. **Confirm ServiceTitan GA readiness with Trillet.** The page reads as generally available, but the guide says the rollout is gradual. Support must switch it on for anyone who asks.
4. **Real screenshots** for the PRODUCT SHOT callouts, using the screenshot lists for Ming in the guide (Google Calendar 7, GoHighLevel 6, ServiceTitan 6). The renders use illustrative mocks.
5. **Swap in a trades customer quote** on ServiceTitan when one is approved.
6. **Refresh `Trillet-Integration-Index.docx`** after item 2, and against the live hub (Cal.com removed, "Your own API" card). Consider adding an index render.
7. **Backlog blog:** "AI receptionists for ServiceTitan compared".
7a. **Next integration candidates** (from the competitor inventory in 3e), only with a product source for each: Salesforce, Zoho CRM and Stripe (named on `/platform`); one combined "Telephony and phone systems" page (Avaya, Cisco CUCM, Mitel, Asterisk, SIP, BYO Twilio or Telnyx); HubSpot and Zapier/Make only if Trillet confirms it supports them; named healthcare, legal or practice-management systems once Trillet lists them.

**White-label cluster (the parallel session's workstream; check whether it's still in progress before starting):**
8. **Blog 5, "Best AI White-Label Services to Resell 2026"** (keyword "ai white label services"), and **Blog 6, "Best White-Label Digital Products"** (keyword "white label digital products"). Not started as of the last handoff. Use "we" voice with named, individually profiled items, and state the distinct angle against Blogs 2 to 4 first.
9. **Convert Blog 2 to "we" voice.**
10. **Execute the redirect waves** per the redirect map, using the **revised split: 5 redirects + 3 reframes + 14 merges**. Reframe the 3 chatbot pages in place. Fire in gated waves, dead and low-traffic pages first. `/integrations/gohighlevel` is now live (6 Oct), so the 301 from `/blogs/gohighlevel-voice-ai-integration` can fire in its wave.
11. **Re-sync the timeline doc** and the redirect map's REDIRECT/REFRAME counts to the revised split.
12. **Implement `/whitelabel` v3:**
    - It needs real testimonials (don't invent them) and server-side rendering of the H1 and FAQ.
    - **Update its CTAs** to "Get started" / "Try a live demo".
    - **Add ServiceTitan** to its integrations line.
    - Don't regenerate it from `product-page-helpers.example.js`.
13. **Apply the 8 snippet and meta edits** (`Trillet-Snippet-Changes.xlsx`).
14. **Internal linking once the pages are live:**
    - Link `/industries/hvac`, `/plumbers`, `/electricians`, `/roofing` and the HVAC and plumbers answering-service blogs to `/integrations/servicetitan`.
    - Link the GHL spoke blogs (`ghl-trillet-agency-workflow-guide`, `ghl-voice-ai-lock-in-risks`, `trillet-vs-gohighlevel-voice-ai`) up to `/integrations/gohighlevel`.
15. **Striking-distance content worklist** (97 keywords in the gap xlsx). Not started.
16. **`/security` and `/compare` hub specs** (both currently 404). Not started.
17. **Real author byline** on every blog before publishing (the schema uses a `<real founder>` placeholder).
18. **Housekeeping:** make the build output paths relative (Gotcha 2), and update the README's "Task" and "Git" sections. Webhook and API pages are optional later.

---

## 7. Gotchas
1. **Never run `seo-audit/tools/build/product-page-helpers.example.js` or `listicle-helpers.example.js`.** They write straight to `seo-audit/Trillet-Whitelabel-Hub-Rebuild.docx` and `seo-audit/Article-03-White-Label-SaaS-Platforms.docx`. That would overwrite the corrected files with old content that still has 100/300 minutes and the 28-day guarantee.
2. **Most build scripts hard-code absolute paths** (`/home/user/Test-1/seo-audit/...` in `page-gohighlevel.js`, `page-servicetitan.js`, `page-index.js`, `page-cal-com.js`; `page-google-calendar.js` already uses a relative path). In another checkout, change them to e.g. `require('path').join(__dirname,'../../Trillet-Integration-X.docx')` first.
3. **`npm install`** in `seo-audit/tools/build` before building; `node_modules` isn't committed.
4. **`num()` numbered lists need their references registered:** pass every reference you use (e.g. `["st-flow","st-setup"]`) as the third argument to `build()`.
5. **More than one agent pushes to this branch.** Always `git fetch` and `git pull --rebase origin claude/trillet-agency-seo-analysis-jb9ffo` before pushing, and don't edit the other workstream's files without checking. If the branch's PR has been merged, restart the branch from the latest default branch per repo policy rather than stacking on merged history.
6. **Commit footers:** the README's "Git" section and earlier commits use Claude-specific attribution lines. Don't copy them.
7. **Stale sources:** the Cal.com doc and script, the README's original task list, the audit and homepage figures, and any "1,200+", "100/300 minutes", white-label "28-day money-back" or "Start risk free" are outdated. Use section 3a.
8. **Don't confuse the partner platform with Trillet's integration.** GoHighLevel has workflows, snapshots and custom fields; Cal.com has round-robin; ServiceTitan has Adaptive Capacity and memberships. None of those are Trillet integration features unless the guide says so.
9. **Keep the spec and render FAQs identical**, because FAQPage schema must mirror the visible copy. If you edit one, edit both.
10. **Schema caveat:** Google stopped showing HowTo rich results in 2023 and limits FAQ rich results to authoritative government and health sites. The markup is still valid and useful for answer engines, but don't promise rich snippets.
11. **Renders are design references, not production code.** The dark "Design reference" bar at the top must not ship; product visuals, IDs, queue rows and credential values are illustrative; partner marks are placeholders.
12. **The dash check covers U+2014 (em) and U+2013 (en).** Check the built output, not the source (the build scripts use `\u` escapes). The accordion minus sign is U+2212, which is fine.
13. **CSS pitfall:** `all: unset` on a padded element needs `box-sizing: border-box; width: 100%` added back, or it overflows on mobile (this caused a 7px horizontal scroll once).
14. **Sandbox screenshots may show fallback fonts** (section 4). In a normal browser, Maven Pro and Source Sans 3 load from Google Fonts.
15. **Never 301 a page-1 ranking** (position 10 or better, or about 5k+ impressions) to an off-intent target; reframe it in place.
16. **Blogs 3 and 4 must stay distinct** (reselling vs operating stack). Any new blog must state its distinct angle up front.
17. **These are specs, not the live site.** Don't assume a change is live because a doc exists. Don't publish, open PRs or contact third parties; ask the user before any outward-facing action.
