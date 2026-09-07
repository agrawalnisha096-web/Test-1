# Trillet, About Page · Publish-Ready Build & Developer Handoff

**Reference build:** `about-trillet.html` (in this repo)
**Live preview:** https://claude.ai/code/artifact/ce9540c1-9e3e-4b7d-89f4-2545fc1131e1
**Status:** Copy and structure are final. The page is publish-ready once the items in **§9 Pre-publish confirmation gate** are cleared (metrics/cert wording, pronouns, real URLs, assets).

This document is self-contained: a developer can build the page from it. `about-trillet.html` is the working reference implementation of everything below.

Legend for inline callouts:
- **DESIGN**, a design decision or constraint to preserve.
- **DEV**, an implementation instruction.
- **CONFIRM**, a fact the Trillet team must verify before publish (nothing here is invented; these are figures/claims taken from Trillet's own site, Trustpilot, or the founders' LinkedIn profiles that should be re-checked as current).
- **ASSET**, a file the client needs to supply.

---

## 1. Sourcing & accuracy policy

Every claim on the page traces to one of: Trillet's own website (`trillet.ai`, `/enterprise`, `/ai-info`), the September 2025 press release, the Trustpilot profile, or the three founders' LinkedIn profiles supplied by the client. **No figures were invented.** Anything that is a live-changing number or a compliance claim is flagged **CONFIRM** so Legal/Marketing can sign off.

Do **not** add the "$50M raised / $130M valuation" figures that circulate on third-party aggregators, they are a name-collision with unrelated companies ("Rillet"/"Triller") and are not used anywhere on this page.

---

## 2. Page metadata & `<head>`

**DEV**, The reference file is an Artifact, whose host injects `<title>`, charset, and viewport automatically. On the production site, use a full head. Recommended:

```html
<title>About Trillet | Enterprise Voice AI for High-Stakes Conversations</title>
<meta name="description" content="Trillet is enterprise voice AI that resolves high-stakes, regulated conversations from start to finish, authenticating identity, acting in your systems of record, and closing the loop with a full audit trail. Founded in Melbourne.">
<link rel="canonical" href="https://www.trillet.ai/about"><!-- DEV: match your canonical host; see SEO note §6 -->
<meta name="robots" content="index,follow">

<!-- Open Graph / social share -->
<meta property="og:type" content="website">
<meta property="og:title" content="About Trillet, Enterprise Voice AI">
<meta property="og:description" content="Voice AI that resolves high-stakes, regulated conversations from start to finish. Founded in Melbourne, globally operated.">
<meta property="og:url" content="https://www.trillet.ai/about">
<meta property="og:image" content="https://www.trillet.ai/og/about.png"><!-- ASSET: 1200×630 share image -->
<meta name="twitter:card" content="summary_large_image">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,600;12..96,700&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&display=swap">
```

**DESIGN**, Exactly one `<h1>` on the page (the hero). Every other section heading is `<h2>`; sub-items are `<h3>`. Keep this hierarchy for SEO and screen readers.

---

## 3. Design system

Preserve these tokens; they're defined once in `:root` and re-declared for dark mode. **DESIGN**, the palette is a deliberate jade-teal on a cool neutral (not a default startup blue/purple). Keep the accent as the single bold colour; everything else stays quiet.

### Colour tokens

| Token | Light | Dark | Role |
|---|---|---|---|
| `--ink` | `#0E1B22` | `#E7F0EF` | Primary text |
| `--bg` | `#F2F5F5` | `#091316` | Page ground |
| `--surface` | `#FFFFFF` | `#0F1E22` | Cards / alternating bands |
| `--surface-2` | `#E8EFEF` | `#16282E` | Insets, chips |
| `--muted` | `#52646A` | `#9AADB2` | Secondary text |
| `--faint` | `#7F9095` | `#6C8087` | Labels, captions |
| `--line` | `#D6E0E1` | `#21333A` | Hairlines / borders |
| `--accent` | `#0C8577` | `#33D3BF` | Single accent |
| `--accent-ink` | `#064A40` | `#9CEEE1` | Accent deep / dark-mode figures |
| `--accent-soft` | `#D6ECE7` | `#113632` | Accent tint fills |
| `--gold` | `#B8791E` | `#E0A94A` | Review stars only |

The two dark bands (**Outcomes**, **Mission**) use `#050D0B` in dark mode.

### Typography

- **Display:** Bricolage Grotesque (600/500), headings, figures, pull-quotes.
- **Body:** IBM Plex Sans (400/500/600), running text.
- **Utility/mono:** IBM Plex Mono (400/500), eyebrows, labels, stats keys, data.
- **DESIGN**, headings use `letter-spacing:-0.02em` and `text-wrap:balance`; body sits ~62–65ch; uppercase labels get `.1–.18em` tracking. Digits in columns use `font-variant-numeric:tabular-nums`.

### Layout, motion, theme

- Max width `1160px`; fluid gutter `clamp(20px,5vw,68px)`; section rhythm `clamp(52px,7.5vw,100px)`; radius `16px`.
- **DESIGN**, sections alternate `--bg` / `--surface`, punctuated by the two dark bands. Order of grounds is intentional; keep it if you re-order.
- **Theme:** three states, bare `:root` = light; `@media (prefers-color-scheme:dark)` guarded by `:root:not([data-theme="light"])`; and `:root[data-theme="dark"]` for the manual toggle. **DEV**, if the main site already has a theme controller, drop the in-page toggle button and let the site controller stamp `data-theme`.
- **Motion:** hero waveform (canvas) + the "Resolving" pulse only. All motion is disabled under `prefers-reduced-motion`. **DEV**, keep that guard.

---

## 4. Section-by-section spec

Order top to bottom. Each heading below = one `<section>`.

### 4.1 Sticky nav
Brand wordmark + waveform mark · links: Platform (`#how`), Security (`#security`), Industries (`#industries`), Leadership (`#story`) · Theme toggle · **Book a demo** button.
**DEV**, point links at real routes if these become standalone pages; wire "Book a demo" to the demo/booking flow.

### 4.2 Hero, the only `<h1>`
- **H1:** *Enterprise voice AI that **resolves** your high-stakes conversations.* ("resolves" is the accent word.)
- **Sub:** *Trillet handles complex, regulated interactions from start to finish. It authenticates the caller, acts inside your systems of record, and closes the loop with a full audit trail. It is built for organisations that measure every conversation in risk, compliance, and cost to serve.*
- **CTAs:** Book a demo · See how it works.
- **Proof strip:** ★ 4.6 Trustpilot · 1,200+ businesses · 7M+ calls handled in 2025 · SOC 2 · ISO 27001. **CONFIRM** all four.
- **Right, "resolution card":** an illustrative call resolving end-to-end (Identity authenticated → Record retrieved → Payment processed → Confirmation + audit log). **DESIGN**, carries the "Illustrative, not a customer record" caption; **keep that caption** so it's never mistaken for real data.

### 4.3 Customer logo bar
Caption: *Relied on for regulated, high-stakes conversations across financial services, healthcare, legal & government.*
Names: Aargon · Taylor Rose · HRCovered · ConsumerAffairs · Autopay · Go To Court · Strata Blue · CommsChannel.
- **CONFIRM**, these are drawn from Trillet's own enterprise page; confirm each customer is OK to name publicly.
- **ASSET / DEV**, replace text wordmarks with real mono/greyscale SVG logos where permission exists; keep a consistent optical height and the muted treatment.

### 4.4 The challenge (problem)
- **H2:** *Your most valuable conversations carry the most risk.*
- Body (two paragraphs) + an "Our thesis" callout: *A voice agent earns its place when it can do what your best specialist does: authenticate the caller, take authorised action in live systems, and leave a record you can stand behind. Until it can, it is deflecting the call rather than resolving it.*

### 4.5 The platform, how it works
- **H2:** *An operating layer for your most consequential conversations.*
- 4-step pipeline: **Authenticate → Integrate → Execute → Reconcile.** **DESIGN**, this is a real sequence, which is why it's numbered 01–04 with arrows; don't reuse numbered markers on non-sequential sections.

### 4.6 Measurable outcomes (dark band)
- **H2:** *Results you can measure.*
- Stats: **85%** complex calls resolved end-to-end · **80%** reduction in cost-to-serve · **7M+** calls in 2025 · **99.97%** uptime. **CONFIRM** all.
- Three testimonials (real, attributed): Santiago · AutoCall (AU); Mason Anderson · Automation firm (US); Rasheem Barnett · Agency principal (US).
- Source line: *Independently verified reviews via Trustpilot · 4.6 / 5 average.*
- **CONFIRM**, testimonial wording is lightly tightened from public Trustpilot reviews; confirm the reviewers are comfortable being quoted on the site, or link each quote to its Trustpilot source.

### 4.7 Security, compliance & governance
- **H2:** *Built to pass your security review.*
- Three cards: Deploy within your boundary (on-prem / private cloud / managed, AU data residency) · A record of every call (audit trails) · Integrates with systems of record.
- Chips: SOC 2 Type II · ISO 27001 · HIPAA · GDPR · TCPA · ACMA · AU data residency.
- **CONFIRM (important)**, mark which certifications are **currently held** vs **in progress**. If any are in progress, change the wording (e.g. a chip label "SOC 2 Type II, in progress", or move to an "Aligned to" grouping). Over-claiming certs is the highest-risk item on the page for an enterprise buyer.

### 4.8 The technology
- **H2:** *Voice engineered for live, regulated calls.*
- Four cards: Human-quality voice · Real-time latency (sub-2s) · Unified channels (voice/SMS/WhatsApp/Messenger/email) · Callback orchestration.

### 4.9 Deflection vs. resolution (comparison)
- **H2:** *The difference between answering a call and resolving it.*
- Table: "Conventional voice bot" vs "Trillet" across 7 capabilities.
- **DESIGN/DEV**, built as an accessible grid with `role="table"` and per-cell `data-label` for the mobile stacked view. If your CMS prefers, re-author as a semantic `<table>`, either way keep it as real text (not an image) so it's eligible for AI Overviews / featured snippets.

### 4.10 Industries
- **H2:** *Purpose-built for regulated, high-consequence industries.*
- Six cards (financial services & collections first): Financial services & collections · Healthcare · Legal · Government · Utilities · Automotive & retail.
- **DEV**, each "Explore →" should link to the matching `/industries/*` page.

### 4.11 Why we exist & who's behind it (MERGED story + leadership)
- **H2:** *Founded by people who have run, engineered, and scaled these conversations.*
- Three combined cards, each founder shown once with monogram, name, role, a **vantage** label (The operator / engineer / builder), a one-line **perspective**, then full bio + tags:
  - **Rob Petreski, CEO** (The operator)
  - **Laurence Latin, Co-Founder & CTO** (The engineer)
  - **Ming Xu, Co-Founder & COO** (The builder)
- Closing statement: *Trillet is what results when the person who has run the operation, the person who has engineered the critical systems, and the person who has scaled the voice AI set out to build the platform none of them could buy.*
- **ASSET**, replace RP/LL/MX monograms with real headshots (see §8).
- **CONFIRM**, **pronouns** for each founder. The bios are currently written to read cleanly without third-person pronouns; if headshots + names are added, confirm pronouns so any future edits stay correct.

### 4.12 Mission (dark band)
- **H2:** *To make end-to-end resolution the standard for every conversation that **matters**.*

### 4.13 How we operate (values)
Four principles: Resolution over conversation · Compliance is foundational · Action in real systems · Earn trust on the hardest calls.

### 4.14 Milestones (timeline)
2024 founded · Sept 2025 Smart Voice Agents launch · 2025 7M+ calls · 2026 Rob Petreski appointed CEO. **CONFIRM** dates/figures.

### 4.15 In the press
Laurence Latin quote from the September 2025 launch. **DEV**, link "Read the announcement →" to the real press release URL. **CONFIRM** the quote against the final release.

### 4.16 Buyer FAQ
Seven Q&As (What is Trillet · vs conventional automation · data handling & residency · certifications · deployment & integration · industries · who's behind it). **DEV**, the visible FAQ **must stay in sync** with the FAQPage JSON-LD in §5; if you edit one, edit both.

### 4.17 Contact
Trillet HQ address (The Commons Cremorne, 10–20 Gwynne St, Cremorne, Melbourne VIC 3121) + four routes: Sales · Security (request documentation) · Partnerships · Careers.
- **DEV**, wire each route: Sales → demo flow; Security → security/trust page or a doc-request form; Partnerships → partner page; Careers → careers page (remove if not hiring). **CONFIRM** the address is current and OK to publish.

### 4.18 Closing CTA + footer
CTA: *Let's talk about your hardest conversations.* Footer: brand blurb + Industries / Platform / Company link groups + copyright.
- **DEV**, add the standard legal links (Privacy, Terms, and a security/trust link) to the footer per site conventions.

---

## 5. Structured data (JSON-LD)

**DEV**, place both blocks before `</body>`. Keep the FAQ block identical to the visible FAQ text.

**DESIGN/SEO note**, Do **not** add a self-referential `aggregateRating` to the Organization schema (Google disallows self-serving review markup and it can trigger a manual action). Let the 4.6 rating live on-page attributed to Trustpilot, and let Trustpilot host the rating markup. Add a `logo` property once a hosted logo URL exists, and add the GitHub org to `sameAs` if you want it associated.

### Organization
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Trillet",
  "alternateName": "Trillet AI",
  "url": "https://www.trillet.ai/",
  "description": "Trillet is an enterprise voice-AI platform that resolves high-stakes, regulated conversations end-to-end, authenticating identity, acting inside systems of record, and following through across voice, SMS, chat, and email with a full audit trail.",
  "foundingDate": "2024",
  "foundingLocation": "Melbourne, Australia",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "10-20 Gwynne St, Cremorne",
    "addressLocality": "Melbourne",
    "addressRegion": "VIC",
    "postalCode": "3121",
    "addressCountry": "AU"
  },
  "founder": [
    { "@type": "Person", "name": "Laurence Latin", "jobTitle": "Co-Founder & CTO" },
    { "@type": "Person", "name": "Ming Xu", "jobTitle": "Co-Founder & COO" }
  ],
  "employee": [
    { "@type": "Person", "name": "Rob Petreski", "jobTitle": "Chief Executive Officer" }
  ],
  "knowsAbout": ["Voice AI", "Conversational AI", "Contact centre automation", "Identity verification", "Regulated industry compliance"],
  "sameAs": [
    "https://www.linkedin.com/company/trillet-ai/",
    "https://www.trustpilot.com/review/trillet.ai"
  ]
}
```

### FAQPage
The full block is in `about-trillet.html` (search `"@type": "FAQPage"`). It mirrors the seven visible FAQ answers verbatim. Copy it as-is.

---

## 6. SEO / GEO / AEO notes

These close several items from the earlier `seo-audit/` report:

- **Canonical host**, pick one host (apex vs `www`) site-wide and set `<link rel="canonical">` accordingly; this page assumes `www.trillet.ai`.
- **FAQ schema**, implemented here; it targets Google "People Also Ask" and AI Overviews.
- **Comparison table**, kept as real text (not an image) so answer engines can lift it.
- **Internal links**, the footer + industry cards distribute link equity; make the industry "Explore →" links real `/industries/*` URLs.
- **One H1, clean heading tree**, as built.
- **`llms.txt`** (recommended, low cost), add `https://www.trillet.ai/llms.txt` summarising what Trillet is, industries, differentiators, and this About page URL, so AI crawlers get a clean source. Not part of this page but worth shipping alongside.
- **OG image**, supply a branded 1200×630 (see §8) so shared links render well.

---

## 7. Accessibility & performance

- Colour contrast meets WCAG AA in both themes (accent chosen for contrast on white and on the dark bands).
- Visible keyboard focus via `:focus-visible`; **DEV** keep it.
- All motion respects `prefers-reduced-motion`.
- Hero canvas is `aria-hidden`; decorative waveform mark is `aria-hidden`.
- **DEV**, real headshots need descriptive `alt` (e.g. `alt="Rob Petreski, CEO of Trillet"`); monograms stay `aria-hidden`.
- **DEV**, `font-display:swap` is set via the Google Fonts URL; self-host the two families if you want to drop the third-party request and improve LCP.
- **DEV**, lazy-load headshots/logos below the fold (`loading="lazy"`).

---

## 8. Assets required from the client

| Asset | Spec | Used in |
|---|---|---|
| **ASSET** 3 founder headshots | Square, ≥600×600, consistent crop/background | §4.11 Leadership |
| **ASSET** Customer logos | Mono/greyscale SVG, transparent bg | §4.3 Logo bar |
| **ASSET** OG share image | 1200×630 PNG, branded | §2 head |
| **ASSET** Favicon | Existing site favicon | §2 head |

---

## 9. Pre-publish confirmation gate

The page ships the moment these are cleared. **None are code problems, they're facts and assets only Trillet can confirm.**

- [ ] **Metrics**, 1,200+ businesses · 7M+ calls (2025) · 85% resolution · 80% cost reduction · 99.97% uptime · 4.6 Trustpilot (20 reviews). Confirm each is current and public.
- [ ] **Certifications**, state which of SOC 2 Type II / ISO 27001 / HIPAA / GDPR / TCPA / ACMA are **held** vs **in progress**, and adjust wording (§4.7).
- [ ] **Pronouns** for Rob, Laurence, Ming.
- [ ] **Headshots** supplied (§8).
- [ ] **Customer names/logos** cleared for public display (§4.3).
- [ ] **Testimonials** cleared / linked to Trustpilot sources (§4.6).
- [ ] **Real URLs** wired for every placeholder `#` link (§10).
- [ ] **Press link** to the September 2025 release.
- [ ] **Contact routes** + a real contact email/booking flow.
- [ ] **Legal footer** links (Privacy, Terms, Security/Trust).

---

## 10. Placeholder links in the reference build

Every `href="#"` (no anchor) is a deliberate placeholder to be wired:

- Hero + CTA: **Book a demo**, **Talk to our team** → demo/booking flow.
- Industries "Explore →" (×6) → `/industries/*`.
- Press "Read the announcement →" → press release URL.
- Contact: Sales / Security / Partnerships / Careers → respective routes.
- Footer "Customers" → a customers/case-studies page if one exists.

In-page anchor links (`#how`, `#security`, `#industries`, `#story`, `#faq`, `#contact`, `#cta`, `#top`) are functional and can stay as-is on a single-page About, or be re-pointed if sections become separate pages.

---

## 11. Provenance

Content assembled from: `trillet.ai` (home, `/enterprise`, `/ai-info`), the Trillet Smart Voice Agents press release (September 2025), the Trillet Trustpilot profile, and the LinkedIn profiles of Rob Petreski, Laurence Latin, and Ming Xu supplied by the client. Structure informed by current best practice for enterprise/B2B SaaS About pages (origin → outcomes → trust → people). No funding/valuation figures were used (aggregator data is unreliable due to name collisions).
