# Trillet: SEO / AEO analysis for "voice infrastructure", "voice API" and "OEM voice API"

**Market:** United States, English · **Data pulled:** October 28, 2026 · **Source:** DataForSEO (Labs, SERP, On-Page, Backlinks, AI Optimization) · **Spend:** $2.01
**Product fit:** *unconfirmed*. Where this report cites Trillet pages, it reports what the pages say, not what the product does.

Confidence labels: **[Verified]** = read directly from the data or page · **[Inferred]** = my reading of the data · **[Unverified]** = needs a source or sign-off.

---

## 1. The short version

1. **None of the three keywords is a traffic play.** US demand is small: "voice API" gets 260 searches a month, "voice infrastructure" 20, and "OEM voice API" has no measurable volume [Verified]. "Voice API" carries a $56.82 CPC [Verified], so the few people who search it are high-value buyers. The value here is lead quality and AI-answer visibility, not volume [Inferred].
2. **Trillet is invisible on the generic terms in both Google and AI answers.** It ranks #70 for "voice API" and isn't in the top 20 for any of the 15 queries I pulled [Verified]. It's mentioned in **0 of 42** AI answers to generic voice-API / infrastructure questions [Verified].
3. **Trillet already wins the OEM / white-label angle in AI search.** It's mentioned in **9 of 18** AI answers to OEM, white-label and reseller questions [Verified]. Perplexity cites `trillet.ai/partners/oem` in both runs, and Gemini names Trillet as an "OEM tier" vendor [Verified]. Google has no clear answer for this intent yet [Inferred from the mismatched results page]. **This is the opening.**
4. **"Voice API" belongs to the carrier and CPaaS players** (communications platforms that sell calling and messaging APIs): Twilio, Vonage, Telnyx, Flowroute, Bandwidth. Their pages hold 79–139 referring domains, against 0 for Trillet's best page [Verified], and their domain rank is 48–77 against Trillet's 33 [Verified]. I wouldn't chase the head term. I'd go after the AI-agent variant of it ("voice agent API", "voice AI API"), where the results are mixed and difficulty is lower.
5. **The adjacent white-label cluster has the volume the three seeds lack.** "White label AI platform" gets 1,600 searches a month at difficulty 0, and Trillet sits at #41 with a chatbot post [Verified]. "White label AI voice agent" gets 110 a month at a $36 CPC, and Trillet doesn't rank [Verified].

**Recommended order:** (1) make `/partners/oem` the canonical "OEM / white-label voice AI API" page. (2) Build one "voice agent API" developer page off `docs.trillet.ai`. (3) Publish a definitional "voice infrastructure for AI agents" explainer, aimed at getting cited by AI engines rather than at clicks. (4) Earn inclusion in the third-party listicles the AI engines cite.

---

## 2. Method and spend

| Step | What was pulled | Actual cost |
|---|---|---|
| 1. Keyword universe | Overview for 60 seed/adjacent terms, phrase suggestions for "voice api" (300) and "voice infrastructure", related keywords. Cleaned to **313 terms** in 10 clusters | $0.157 |
| 2. Google results | 15 queries, top 10 desktop (top 20 + mobile for the 3 seeds), with AI Overview and People Also Ask | $0.025 |
| 3. Competitors | Competing domains across 92 cluster keywords; Trillet's ranked keywords (filtered); traffic estimates for 20 domains | $0.043 |
| 4. Page crawl | 23 pages (top-ranking competitor pages + Trillet pages) | $0.003 |
| 4b. Backlinks | Domain rank for 20 domains; referring domains for 17 ranking pages | $0.049 |
| 5. AI answers | 10 buyer questions × ChatGPT 2 runs, Perplexity 2 runs, Gemini 1 run, Claude 1 run = **60 answers** | $1.705 |
| ChatGPT scraper (not returned) | 21 tasks queued; none returned in ~45 min, so I fell back to the API | $0.025 |
| **Total** | | **$2.01** (balance $49.87 → $47.87) |

**Limits to keep in mind**
- **ChatGPT answers came from the API, not the consumer ChatGPT interface.** The scraper tasks never returned, so I used GPT-5.4-mini with web search; one answer, P1 run 1, used GPT-5.5. Answers in the consumer app can differ [Verified that this was the method].
- **The AI-answer sample is directional.** With 1–2 runs per engine per question, answers vary from run to run, so treat percentages as a baseline to re-measure, not a fixed share.
- **Gemini's citations come back as Google redirect links**, so the cited domains couldn't be resolved. The brand mentions in its answers are still valid.
- **Low volumes are floors.** DataForSEO reports small numbers in 10-search buckets, and "no data" means below the reporting threshold, not literally zero.
- **The "voice call api" results page returned google.com redirect URLs** for its organic results, so I used the page titles to identify who ranks.

---

## 3. Keyword findings

### 3.1 Seeds [Verified, DataForSEO Labs, US]

| Keyword | US vol/mo | Difficulty | CPC | Intent | Search features | Trillet |
|---|---|---|---|---|---|---|
| voice api | 260 (+260 for "api voice", same results) | 39 | $56.82 | informational | AI Overview, PAA | #70 (`/blogs/voice-ai-platform-api-comparison-for-developers`) |
| voice infrastructure | 20 | 21 | n/a | informational | featured snippet, AI Overview, PAA, video | not top 100 |
| oem voice api | no data | n/a | n/a | n/a | AI Overview | not top 20 |

### 3.2 Cluster view (313 cleaned terms)

| Cluster | Terms | US vol/mo | Median difficulty | Read |
|---|---|---|---|---|
| OEM / white-label | 18 | 2,530 | 0 | **Best fit plus volume.** Led by "white label ai platform" (1,600, Trillet #41) |
| Calling / telephony API | 19 | 1,910 | 15 | CPaaS territory. "cpaas" (1,000, $136 CPC) is a telecom buyer, not Trillet's [Inferred] |
| Competitor alternatives | 4 | 1,420 | 0 | "twilio alternative" 880, "vapi alternative" 480; both difficulty 0 |
| Voice API (core) | 44 | 1,150 | 49 | Head term plus a long tail of dev-niche variants |
| Voice AI platform / build | 3 | 930 | 41 | "voice ai platform" 880 at a **$85.68 CPC** |
| Voice AI / agent API | 23 | 460 | 40 | "voice agent api" 50 (difficulty 0), "voice ai api" 50, "conversational ai api" 50 (difficulty 0) |
| Voice infrastructure | 4 | 50 | 21 | Almost no search demand |
| Speech (STT/TTS) API | 72 | 28,600 | 40 | Large, but a different product (speech-to-text / text-to-speech engines). Out of scope |
| Vendor-branded / competitor brand | 126 | 132,520 | n/a | Navigational (e.g. "twilio voice api", "retell ai"). Not targets |

Zero-volume terms worth noting, because AI search covers them even if Google doesn't: "white label voice api", "voice ai infrastructure", "voice agent infrastructure", "embedded voice ai", "sip trunking api", "realtime voice api", "voice api providers" [Verified: no data].

**What this means [Inferred].** The way the market searches doesn't match the way the industry talks. Vendors say "voice infrastructure" and "OEM", but buyers search "white label AI…", "voice agent API" and "[competitor] alternative". I'd use the industry terms as the *positioning language* on pages and in AI answers, and the searched terms as the *targeting language* in titles, H1s and URLs.

---

## 4. Google results-page findings [Verified, SERP snapshot Oct 28 2026]

**AI Overviews appear on all 15 queries. Trillet isn't cited in any of them.**

| Query | Who wins | Page types (top 10) | AI Overview cites |
|---|---|---|---|
| voice api | Twilio, Vonage, Telnyx, Orange, GetStream, Flowroute, OpenAI, Bandwidth, RingCentral, MDN | 5 docs, 3 product, 2 editorial | Twilio, Vonage, Telnyx (+ Orange, Microsoft, GetStream, Flowroute, Bandwidth, OpenAI on mobile) |
| voice infrastructure | Aircall (VoIP), Forbes, Sangoma, Tiatra, TelcoBridges, dev.to, Deepgram, DRING, Voicing AI | 5 editorial, 3 product, 2 forum | YouTube, Aircall (mobile: Sangoma, Tiatra, TelcoBridges, Reddit, Genesys) |
| oem voice api | Reddit, AttractGroup, ZegoCloud, RevenueBase, eesel, plus *automotive OEM* results | 6 editorial, 3 product | Reddit, AttractGroup, VideoSDK (mobile: Vapi, Retell, Cartesia, VoiceAIWrapper…) |
| white label voice api | Crescendo, Retell partner page, My AI Front Desk, OpenMic, Reddit, YouTube, Voicerr | listicles, partner pages, video | YouTube, Retell |
| white label ai voice agent | Crescendo, Reddit, YouTube, Blck Alpaca, Autocalls, Echo, My AI Front Desk, Synthflow | listicles + product | Reddit, Autocalls, byVoice |
| voice ai api / voice agent api | voice.ai, Vapi, Reddit, xAI, OpenAI, AssemblyAI, Cekura / Vonage, Cekura, OpenAI, Deepgram, Retell | product + "best X APIs" listicles | AI Overview shown, no citations returned |
| vapi alternative | Venture Harbour, Reddit, **Insighto.ai (#3)**, Dograh, YouTube | comparisons | YouTube, Venture Harbour, CloudTalk |
| twilio alternative | TechnologyAdvice, Reddit, Voiso, Medium, Bluereacher | listicles | Reddit, Plivo, Telnyx |

**Authority gap [Verified, Backlinks API]**

| Page | Referring domains | Word count |
|---|---|---|
| twilio.com/en-us/voice (#1 voice api) | 139 | 2,797 |
| flowroute.com "What is a voice API" (#6) | 131 | 2,649 |
| telnyx.com/products/voice-api (#3) | 79 | 1,525 |
| developer.vonage.com voice overview (#2) | 19 | 194 |
| getstream.io glossary (#5) | 0 | 1,732 |
| Voice-infrastructure top pages (Aircall, Sangoma, Tiatra, dev.to) | 0–3 | 690–2,425 |
| White-label top pages (Crescendo, Retell partner, Blck Alpaca) | 0–4 | 480–6,260 |
| **Trillet `/blogs/voice-ai-platform-api-comparison-for-developers`** | **0** | 3,953 |
| **Trillet `/whitelabel`** | **1** | 2,823 |

Domain rank (0–100 scale): Trillet **33** · Twilio 77 · Vonage 69 · Bandwidth/Aircall 60 · Sangoma/Deepgram 59 · Vapi 58 · Telnyx/Retell 56 · Synthflow 53 · Plivo 52 · My AI Front Desk/Crescendo 50 · Flowroute 48 · Insighto 41 · Autocalls 38.

**What this means [Inferred]**
- **"Voice API":** the top pages win on domain authority plus documentation, not on content quality. GetStream ranks #5 with zero links to the page, but on a domain rank of 54. At domain rank 33, Trillet won't break into this top 10 on content alone.
- **"Voice infrastructure" and "OEM / white-label":** the top pages have almost no links (0–4 referring domains). That's beatable with a well-targeted page and internal links.
- **The "oem voice api" results are confused** (automotive OEM pages, generic real-time API listicles). That means Google has no page that fits the intent. A page that answers it squarely has a real shot, despite the tiny volume.

---

## 5. AI-search (AEO / GEO) findings [Verified, 60 answers, Oct 28 2026]

### 5.1 Brand share across all 60 answers

| Brand | Mentioned in | | Brand | Mentioned in |
|---|---|---|---|---|
| Vapi | 83% | | Synthflow | 25% |
| Retell | 80% | | LiveKit | 22% |
| Twilio | 55% | | AssemblyAI | 20% |
| OpenAI | 53% | | VoiceAIWrapper | 20% |
| ElevenLabs | 52% | | Cartesia | 17% |
| Deepgram | 47% | | **Trillet** | **15%** |
| Telnyx | 42% | | Autocalls | 13% |
| Bland | 33% | | Plivo / Pipecat | 12% |

### 5.2 Where Trillet shows up, by question (6 answers each)

| # | Question | Trillet | Brands that dominate |
|---|---|---|---|
| P1 | What is voice infrastructure for AI voice agents, and which companies provide it? | 0/6 | Retell, Twilio, Vapi, AssemblyAI, Deepgram |
| P2 | Best voice APIs for building AI voice agents in 2026? | 0/6 | Deepgram, ElevenLabs, OpenAI, Vapi |
| P3 | Which voice API to add AI phone calling to my SaaS? | 0/6 | Twilio, Retell, Vapi, Telnyx |
| **P4** | **Is there an OEM or white-label voice AI API I can embed under my brand?** | **3/6** | Deepgram, OpenAI, Vapi, Voicerr, VoiceAIWrapper, **Trillet** |
| **P5** | **Best white-label voice AI platforms for agencies?** | **5/6** | Retell, Synthflow, Autocalls, **Trillet**, Stammer |
| P6 | Twilio vs Telnyx vs Vapi vs Retell for an AI phone agent? | 0/6 | (named brands) |
| P7 | Voice AI platforms with an API and HIPAA compliance for healthcare? | **0/6** | Twilio, Retell, Vapi, Bland |
| P8 | Cheapest voice API for AI phone agents at scale? | 0/6 | Deepgram, Retell, Vapi, Bland |
| P9 | What is a programmable voice API and how does it work? | 0/6 | Plivo, Telnyx, Twilio, Vonage |
| **P10** | **Which voice AI platform lets me resell agents to clients via API?** | **1/6** | Retell, Vapi, VoiceAIWrapper, Autocalls |

**What the engines say about Trillet [Verified, quoted from the answers]**
- Perplexity, P4 (both runs): *"Trillet: partner-focused OEM integrations with voice and messaging, APIs, webhooks, and in-call access; availability is scoped through an approved partnership rather than self-serve signup."* Cites `trillet.ai/partners/oem`.
- Gemini, P4: lists *"Trillet AI / Monobot CX (OEM Tier)… embed their conversational engine, channel integrations and compliance framework directly into your product."*
- Perplexity, P5: puts Trillet first on its agency shortlist and quotes a "$299/month Agency plan" figure. **[Unverified]** That pricing hasn't been checked against the source-of-truth register.
- Claude, P5: *"most of these comparisons are published by the vendors themselves (Trillet, Autocalls, Retell…), so each tends to rank itself first."* AI engines are starting to discount vendor-written listicles.

**Most-cited domains** (all engines except Gemini): retellai.com 16 · telnyx.com 13 · deepgram.com 11 · twilio.com 11 · developers.openai.com 10 · docs.vapi.ai 8 · autocalls.ai 8 · bland.ai 8 · **trillet.ai 6** · voiceaiwrapper.com 6 · dasha.ai 6 · assemblyai.com 6. Third-party listicles also recur: frejun, ringlyn, cloudtalk, forasoft, clawcall, wotnot, cekura, producthunt.

**What this means [Inferred]**
1. **The AI engines file Trillet under "white-label / OEM for agencies and SaaS", not "voice API / infrastructure".** That's consistent with the site's own content. Strengthening that position is cheaper than fighting for the generic category.
2. **The HIPAA question (P7) is the clearest miss.** Compliance is one of Trillet's main differentiators, yet it got 0 of 6 mentions while Bland, Retell, Vapi and Twilio got cited. This matches the earlier audit finding that compliance queries get impressions but no clicks. Fixing it needs compliance content that has been through legal sign-off.
3. **Developer docs get cited heavily.** docs.vapi.ai, developers.openai.com and Retell's docs and glossary account for much of the ChatGPT and Claude citations. `docs.trillet.ai` exists ("a powerful REST API…") but wasn't cited once.
4. **Third-party lists are the lever off the site.** The engines lean on independent "best voice AI API" lists. Getting Trillet included in those lists does more for AI visibility than another post on Trillet's own blog.

---

## 6. Trillet's current assets [Verified, crawled Oct 28 2026]

| URL | Title / H1 | Relevance |
|---|---|---|
| `/partners/oem` | "OEM Conversation AI for Software Platforms" / "Build conversation AI into your product." 963 words. H3s include *APIs & webhooks*, *Carrier-level telephony*, *Separate customer workspaces*, *Controls for regulated use cases* | **The natural page for "OEM voice API".** Its title and H1 use "conversation AI" and never say "voice API", "white-label" or "embed" |
| `/partners` | "Partner Program: Bring Trillet Solutions to Market" | Hub covering reseller, referral and OEM partnerships |
| `docs.trillet.ai` | "Trillet AI provides a powerful REST API to create human-like voice and messaging experiences at scale." 245 words; canonical points to `/documentation/introduction` | The natural base for a "voice agent API" page. Thin landing page |
| `/blogs/voice-ai-platform-api-comparison-for-developers` | "Voice AI Platform API Comparison for Developers in 2026". 3,953 words, includes "Trillet API: best for agency automation" and "MCP Server Support" | Ranks #70 for "voice API" and #63 for "ai voice api"; 0 referring domains |
| `/whitelabel` | "White-Label Voice AI Platform for Agencies" | 1 referring domain; ranks #68 for "white label call center" |
| `/blogs/top-10-white-label-voice-ai-platforms-for-agencies-2026` | Vendor top-10 list | #13 for "white label voice ai"; cited by Perplexity and Claude |
| `/api`, `/developers` | **404** | No developer landing page on the main domain |

---

## 7. Recommendations

The register gate from the earlier plan applies to all of these: every product, pricing and compliance claim goes claim → source → approved owner, and compliance claims need legal sign-off. Product fit is unconfirmed, so **R1 and R2 start with a fit check.**

### R1. Make `/partners/oem` the OEM / white-label voice API page. Priority: **High**
- **Asset:** `trillet.ai/partners/oem` (existing).
- **Evidence:** Perplexity already cites it on P4. "oem voice api" has no page in Google that fits the intent. Pages ranking for "white label voice api" have 0–4 referring domains. Trillet is mentioned in 9/18 OEM / white-label AI answers.
- **Change:**
  - Retitle to the searched language while keeping the positioning. For example: *"OEM & White-Label Voice AI API for Software Platforms | Trillet"*, with an H1 that says "embed voice AI agents in your product".
  - Add an answer-first paragraph defining OEM vs white-label vs reseller, plus a short "what's in the API" block (endpoints, webhooks, telephony, workspaces) that links into docs.
  - Add an FAQ (who it's for, how access works, where the data lives, compliance scope). Mark up Organization and Product schema for machine-readability, not for rich results.
- **Owner:** [Product Marketing] for the fit check and claims · [Content/SEO] for the page · [Compliance/Legal] for the regulated-use and data-residency wording.
- **Depends on:** confirming that Trillet sells an embeddable API under OEM terms, and what self-serve vs partner-only access looks like.
- **Success metric:** indexed and ranking top 10 for "oem voice api", "white label voice api" and "white label ai voice agent"; Trillet named in ≥4/6 runs of P4 and ≥2/6 of P10 at re-measure.
- **Window:** 30 days to ship, 60–90 days to measure.
- **Failure condition:** not top 20 for "white label ai voice agent" after 90 days. Then the page needs links (R4), not more copy.

### R2. Build one "voice agent API" developer page. Priority: **High (if fit is confirmed)**
- **Asset:** a new `trillet.ai/voice-agent-api` page, or a strengthened `docs.trillet.ai` introduction. `/api` and `/developers` currently 404.
- **Evidence:**
  - "voice agent api" gets 50/mo at difficulty 0 and a $40.67 CPC; "voice ai api" 50/mo at difficulty 39; "conversational ai api" 50/mo at difficulty 0.
  - Those results pages mix product pages and "best voice AI APIs" listicles, not carrier docs.
  - Developer docs are the most-cited source type in ChatGPT and Claude answers.
- **Change:**
  - Write a product page for builders: what you can do through the API (create agents, place calls, webhooks, MCP), a code sample, rate and limit notes, and a link to the docs.
  - Expand the docs introduction beyond 245 words.
  - Link the existing API comparison post to this page instead of having the post try to rank for "voice API" itself.
- **Owner:** [Product Marketing] + [Dev] for the code samples · [Content/SEO].
- **Success metric:** top 10 for "voice agent api" and "voice ai api"; Trillet mentioned in ≥1/6 runs of P2 and P3.
- **Window:** 30–60 days.
- **Failure condition:** if the fit check says the API is agency-automation only, not a builder API, drop this item and fold the wording into R1.

### R3. Publish a "voice infrastructure for AI agents" explainer. Priority: **Medium (AEO, not traffic)**
- **Evidence:** only 20 searches a month, but the top pages have 0–3 referring domains and the results show a featured snippet and PAA. P1 AI answers mention Retell, Twilio, Vapi and Deepgram, and Trillet 0/6.
- **Change:**
  - Write one definitional pillar page. Lead with a 40–60-word definition that can be lifted straight into an AI answer.
  - Lay out the stack (telephony/SIP → real-time transport → STT → LLM → TTS → orchestration → compliance and monitoring), with a comparison of native vs wrapper architecture. Trillet's existing "native vs wrapper" story fits here.
  - Link to R1 and R2.
- **Owner:** [Content/SEO].
- **Success metric:** wins the featured snippet or a top-3 spot for "voice infrastructure"; Trillet mentioned in ≥1/6 runs of P1.
- **Window:** 30 days to ship.
- **Failure condition:** no AI citation after 90 days. Then don't expand the infrastructure cluster.

### R4. Earn inclusion in the third-party lists the AI engines cite. Priority: **High (off-page)**
- **Evidence:** the AI engines repeatedly cite independent lists (Cekura "best voice AI APIs", frejun, ringlyn, forasoft, cloudtalk, wotnot, Product Hunt), and Claude explicitly discounts vendor-written comparisons.
- **Change:** pitch Trillet's OEM / white-label angle to the authors of the cited "best voice AI API / white-label voice AI" lists, launch on Product Hunt, and keep marketplace profiles current (workstream F of the existing plan). No paid or incentivized placements.
- **Owner:** [Product Marketing].
- **Success metric:** ≥3 third-party lists include Trillet; referring domains to `/partners/oem` and `/whitelabel` ≥5 each.
- **Window:** 30–60 days.

### R5. Close the HIPAA gap in AI answers. Priority: **Medium (gated)**
- **Evidence:** P7 (API plus HIPAA for healthcare) gave Trillet 0/6, while Bland, Twilio and ElevenLabs were cited.
- **Change:** a compliance-scoped "HIPAA-ready voice AI API" section on R1 and R2, plus a citable compliance page. This ties into the compliance pillar in workstream E of the existing plan.
- **Owner:** [Compliance/Legal] (hard gate) · [Content/SEO].
- **Failure condition:** no legal sign-off means nothing ships.

### R6. Comparison pages with high CPC and zero difficulty. Priority: **Medium (consolidate first)**
- **Evidence:** "twilio alternative" 880/mo, difficulty 0, $47.67 CPC; "vapi alternative" 480/mo, difficulty 0, $48.82 CPC. Insighto.ai ranks #3 for "vapi alternative" with the same play.
- **Change:** in line with the existing "consolidate before expanding" decision, merge the existing Vapi comparison posts (three duplicates in the earlier audit) into one canonical "Vapi alternative" page before writing anything new. Then evaluate "Twilio alternative for AI voice agents" as the one new comparison.
- **Owner:** [Content/SEO].

### Not recommended
- **Chasing "voice API" or "cpaas" as head terms.** The intent is carrier/CPaaS buyers (Inferred), the gap in authority is 79–139 referring domains, and domain rank is 33 vs 56–77.
- **The STT/TTS cluster** (28,600/mo). It's a different product category.
- **Separate pages for every zero-volume variant.** "White label voice api", "embedded voice ai" and similar belong as sections and FAQs on R1.

---

## 8. Opportunity sizing (not a forecast)

If R1–R3 reach positions 3–5 on their target terms, a typical 5–10% CTR at those positions gives roughly **100–200 clicks/month** from about 2,000 searches/month: "white label ai platform" (1,600), the white-label voice terms (~250) and the voice-agent API terms (~150). If R6 is pursued, the two "alternative" terms add 1,360 searches/month, or about 70–135 more clicks. "Voice api" is excluded because page 2 at best earns almost nothing. Low volume, but at $20–85 CPCs [Verified] this is buyer traffic [Inferred]. The larger upside is AI-answer share on P1–P4, P7 and P10, which these volumes don't capture.

---

## 9. Re-measurement baseline

| KPI | Baseline (Oct 28 2026) | Target | Source |
|---|---|---|---|
| Trillet rank: "voice api" | #70 | top 20 | DataForSEO SERP |
| Trillet rank: "white label ai platform" | #41 | top 10 | DataForSEO SERP |
| Trillet rank: "white label ai voice agent" / "oem voice api" / "voice agent api" | not ranking | top 10 | DataForSEO SERP |
| AI Overview citations across the 15 queries | 0 | ≥3 | DataForSEO SERP |
| AI answer share, generic questions (P1–P3, P6–P9) | 0/42 | ≥5/42 | DataForSEO AI Optimization, same 10 questions |
| AI answer share, OEM / white-label questions (P4, P5, P10) | 9/18 | ≥12/18 | same |
| Referring domains: `/partners/oem` · `/whitelabel` | not pulled · 1 | ≥5 each | Backlinks API |

Re-running the same 10 questions and 15 queries costs about $2 at current prices.

---

## Files
- `trillet-voice-api-keyword-universe.csv`: 313 cleaned keywords with cluster, volume, difficulty, CPC, intent, 12-month trend and Trillet position.
- `trillet-voice-api-serp-snapshot.csv`: 15 queries, organic results with page type, word count, referring domains, search features and AI Overview citations.
- `trillet-voice-api-ai-visibility-log.csv`: 60 AI answers with engine, model, run, Trillet mention, Trillet URLs cited, brands mentioned and cited domains.

*Prepared with AI assistance (Claude) using DataForSEO data; figures and conclusions reviewed against the raw pulls.*
