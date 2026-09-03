# Trillet Homepage — "AI Voice Agents" Optimization Spec

**Page:** `https://trillet.ai/` (homepage)
**Primary target keyword:** `ai voice agents` (+ variants: `voice AI agents`, `AI voice agent platform`, `AI phone agent`)
**Source of truth for messaging:** `TrilletPositioningRecommendation.docx` (positioning) + live-page audit (this repo)
**Governing rule:** headline stays human & on-brand; exact-match search terms live in the `<title>`, subhead, section copy, FAQ and schema.

---

## 1. Decision: optimize the homepage, not a new page

The three pages that rank for "ai voice agents" split two ways:

| Competitor | Ranking URL | Why |
|---|---|---|
| Retell | `retellai.com/` (homepage) | Focused voice-AI company — homepage *is* the product page |
| Synthflow | `synthflow.ai/` (homepage) | Same — focused player |
| ElevenLabs | `/voice-agents` (dedicated) | Broad audio-AI company; voice agents are one line of many |

Trillet is a **focused** voice-AI company (like Retell/Synthflow), so the **homepage is the natural target**. Crucially, the new positioning headline already leads with the keyword — *"Voice AI agents for high-stakes conversations…"* — so ranking the homepage for this term does **not** conflict with keeping it positioning-led.

**A separate `/ai-voice-agents` page is explicitly rejected** — it would compete with the homepage for the same term and worsen the apex/www ranking-signal split already documented in `trillet-ai-content-keyword-analysis.md §3`. Dedicated pages are reserved for *modifiers* only (e.g. `/ai-voice-agents/healthcare`), which extend into long-tail rather than duplicate the head term.

---

## 2. Design principle: keep the current page's components

This is a **content + structure + schema** upgrade, not a redesign. Every existing visual component is retained; we relabel some, add copy/schema, and insert a few new blocks between existing ones.

**Reused as-is (design kept):**
- Hero with the animated live-call transcript demo (collections / appointment / legal) + "Demo our AI" email-capture widget
- "Proudly Australian, Globally Trusted" badge + certification badge row (HIPAA · GDPR · ACMA · TCPA · SOC 2 Type II · ISO 27001 · AU Data Residency)
- Stat tiles: 85% resolved · 80% cost-to-serve · 10× lower abandonment · 32% fewer no-shows
- Google Cloud case-study card (Read full case study · error rate <1% · escalations <15%)
- The 4-step **"From conversation to completed outcome"** animated block + its panels (live conversations, identity verification, during-the-call, audit-trail timeline)
- Industry cards (Healthcare / Legal / Finance / Government / Utilities)
- "What makes it different" accordion + connected-systems diagram
- Testimonial (Tim Close, CommsChannel) + Trustpilot 4.6 / 1,200+ businesses / 99.97% uptime
- "Runs where your compliance team needs it to" security bullets
- Final CTA + rich footer nav (Platform / Solutions / Partners / Pricing / Resources / Guides / Compare)

**Key reuse win:** the existing 4-step block (verify identity → act in live systems → close with audit) already *is* the **Verify → Resolve → Record** proof of the positioning line. It needs relabeling and de-duplication, not rebuilding.

---

## 3. Technical SEO (head/metadata)

| Element | Current | Change to |
|---|---|---|
| `<title>` | `AI That Resolves High-Stakes Conversations \| Trillet` | **`AI Voice Agents for High-Stakes Calls — Verified & Resolved \| Trillet`** (exact query order in title) |
| Meta description | "Trillet AI resolves high-stakes conversations end-to-end…" | **"Trillet's AI voice agents answer, verify identity, take action in your live systems and close every call on the record — across voice, SMS and chat. HIPAA, SOC 2, APRA & IRAP compliant."** |
| `<h1>` | "AI that resolves high-stakes conversations end-to-end" | **"Voice AI agents for high-stakes conversations — verified, resolved, and on the record."** (positioning doc verbatim; already keyword-led. Word-order variant vs the title is SEO-equivalent — Google tokenizes both.) |
| Hero subhead | "Verifies identity, connects to your live systems…" | Keep, but ensure it carries **"AI phone agents"** / **"voice AI platform"** in prose |
| `meta keywords` | Australia answering-service block (site-wide template leak) | **Remove template-wide** (leaks onto every page incl. /whitelabel) |
| Robots / canonical | `index,follow` / self-canonical ✅ | No change (but resolve apex↔www duplication per audit §3) |
| Image alt | 25/45 non-empty | Audit the 20 empties; add descriptive alt to hero/feature/logo images |

**Schema stack (currently only `Organization` + `WebSite`):** add
- `SoftwareApplication` (name: Trillet, applicationCategory: BusinessApplication) + `Offer` (price from $49/mo)
- `AggregateRating` (Trustpilot 4.6, populate reviewCount)
- `FAQPage` (from §5 FAQ)
- `WebSite` → add `SearchAction` (sitelinks searchbox)
- `Organization` → populate `sameAs` (LinkedIn, YouTube)

---

## 4. Consolidated section order

Legend: **KEEP** = existing component unchanged · **CHANGE** = existing component, edit copy/labels · **NEW** = net-new block.

| # | Section (H2) | Status | Reuses / notes | SEO purpose · target terms |
|---|---|---|---|---|
| 1 | Hero — H1 + subhead + transcript demo | CHANGE | Keep demo widget & badge; swap H1/subhead | Head term in H1/subhead; engagement |
| 2 | Social-proof bar (Trustpilot 4.6 · 1,200+ · 99.97%) | CHANGE | Lift a compact version up from mid-page | Trust; feeds AggregateRating |
| 3 | **What is an AI voice agent?** | NEW | 2–3 prose paragraphs | Captures informational intent on the product page; "voice AI", "conversational AI", "AI phone agent", "vs IVR" |
| 4 | Proven impact / results | KEEP | Stat tiles + Google Cloud card; add 3–4 sentences of case-study context | ROI proof; E-E-A-T |
| 5 | **How Trillet works: Verify → Resolve → Record** | CHANGE | Relabel the existing 4-step block to the 3 pillars; **de-duplicate** (currently rendered twice in DOM) | Differentiator; "identity verification", "audit trail" |
| 6 | **Capabilities** | NEW | 5 groups (below) | Feature long-tail: "AI appointment booking", "AI that takes payments", "CRM integration", "outbound AI calling" |
| 7 | Built for industries (5 cards) | CHANGE | Keep cards; add search term to each subhead + link to `/industries/*` | Vertical long-tail; internal links to page-3 industry pages |
| 8 | **One standard, every tier** (SMB / Agency / Enterprise) | NEW | 3 cards, positioning-doc headlines; link to `/ai-receptionist`, `/whitelabel`, `/enterprise` | Audience orientation; internal-link equity to money pages |
| 9 | What makes it different | CHANGE | Keep accordion; tighten to 3 differentiators so it doesn't repeat Capabilities | Positioning (why), not features (what) |
| 10 | Integrations | CHANGE | Pull the connected-systems diagram out as its own labeled section; name real CRM/telephony/PMS/payment systems | "AI receptionist that works with [system]" |
| 11 | Security & compliance | KEEP | Security bullets + cert badge row | Compliance intent; the moat: compliance at every tier + AU residency |
| 12 | **FAQ** | NEW | + `FAQPage` schema | Definitional + product intent; AEO/GEO; rich results |
| 13 | Final CTA | KEEP | "Ready to resolve…" + Speak to sales | Conversion |

### Capabilities section (§6) — 5 groups
1. **Answer & engage across every channel** — 24/7 inbound + outbound; voice/SMS/web chat/email in one thread; human-like voice (optional cloning); warm transfer + call forwarding without number porting.
2. **Verify before it acts** — identity to your compliance standard (name+DOB, reference number, callback match); RBAC.
3. **Resolve in your live systems** — booking/reschedule, payments & plans, lead capture/qualification, case updates, recovery — written into telephony/CRM/PMS/payments/calendars *during* the call.
4. **Close it on the record** — timestamped audit trail; post-call summaries/confirmations (SMS/email); recordings & transcripts with AU data residency.
5. **Build & deploy fast** — build by scanning your website, live in minutes; prebuilt templates; workflow orchestration from one trigger; cloud / private cloud / on-premise + in-country LLM hosting.

### Segment cards (§8) — positioning-doc copy
- **Small business** — "The AI receptionist for calls you can't get wrong." — live in 5 minutes, from $49/mo → `/ai-receptionist`
- **Agencies** — "Resell voice AI agents that pass your clients' compliance review." → `/whitelabel`
- **Enterprise** — "Agents that verify, act, and pass the audit — HIPAA, SOC 2, APRA, IRAP, on-premise." → `/enterprise`

---

## 5. FAQ (§12) — questions for FAQPage schema

Blend definitional + product intent (this is what Retell/Synthflow both do on-page):

1. What is an AI voice agent?
2. How do AI voice agents work?
3. How are AI voice agents different from a traditional IVR / phone tree?
4. Is Trillet HIPAA and SOC 2 compliant?
5. Can Trillet's voice AI agents book appointments and take payments?
6. Does it integrate with my CRM / practice management system?
7. Can I keep my existing phone number?
8. How fast can I go live?
9. Can I white-label Trillet and resell it?
10. Where is my call data stored? (AU data residency / on-premise)

Each answer: 2–4 sentences of keyword-varied prose. Mirror the visible copy in the `FAQPage` JSON-LD.

---

## 6. Schema scaffolding (drop-in, populate values)

```json
[
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Trillet",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "description": "AI voice agents for high-stakes conversations — verified, resolved, and on the record.",
    "offers": { "@type": "Offer", "price": "49", "priceCurrency": "USD" },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.6",
      "reviewCount": "REPLACE_WITH_TRUSTPILOT_COUNT"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "What is an AI voice agent?",
        "acceptedAnswer": { "@type": "Answer", "text": "REPLACE with the visible on-page answer." } }
    ]
  }
]
```
Keep the existing `Organization` + `WebSite` blocks; add `SearchAction` to `WebSite` and `sameAs` to `Organization`.

---

## 7. Word-count & internal linking
- **Target:** 2,500–3,500 words of *indexable prose* (current ~1,413, most of it UI micro-copy). §3, §6 and §12 do most of the lift.
- **Links out (keyword anchors):** `/ai-receptionist`, `/whitelabel`, `/enterprise`, `/pricing`, `/security`, each `/industries/*`, and the `/compare/*` pages (footer only — no competitor names in body, per decision).

## 8. Out of scope / dependencies
- **Apex ↔ www duplication** (`trillet-ai-content-keyword-analysis.md §3`) must be fixed for this page to consolidate its ranking signal — highest-leverage technical item, independent of this spec.
- Competitor comparison stays **off the homepage body** (kept to `/compare/*` pages) — deliberate: do not surface competitor names to leads.
