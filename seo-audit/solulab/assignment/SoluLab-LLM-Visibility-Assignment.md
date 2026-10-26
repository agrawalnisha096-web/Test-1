# Practical Assignment: LLM Visibility & Growth Consultant (SoluLab)

> **Before submitting, delete this box.**
> - **Task 1** must be your own case study with your own evidence. Every `[[ … ]]` field is yours to fill. Nothing in it has been invented.
> - **Task 2** needs real, dated runs. Run the 5 prompts in `task2-prompts.csv` on ChatGPT and Perplexity, 3 fresh runs each, using the protocol below. Or run it automatically through DataForSEO: `python run_dataforseo_task2.py --runs 3` tests ChatGPT, Google AI Mode and Perplexity and writes `runs.csv` plus `summary.md`. Optionally also run `run_claude_prompts.py` for Claude. Log everything in `task2-results-log.csv` and paste the summary into the Task 2 tables. The "opportunity" column is pre-drafted from my site audit of solulab.com. Revise it once you see which URLs the engines actually cite.
> - **Tasks 3 and 4** are complete drafts built on the solulab.com crawl evidence (`../solulab-seo-audit.md`, `../solulab-ai-visibility-audit.md`). Plug in your Task 2 baselines where marked.

---

## Task 1: A previous success

| Field | Detail |
|---|---|
| Company / sector (anonymize if needed) | [[e.g. B2B SaaS, AI voice agents]] |
| My role, and what others did | [[e.g. I designed and executed the content and distribution work. The client's dev team shipped the template changes. A freelance writer drafted 2 of the 6 pages.]] |
| Platforms measured | [[e.g. ChatGPT (search on), Perplexity, Google AI Overviews]] |
| Measurement period | [[baseline dates → follow-up dates]] |
| How it was measured | [[e.g. a fixed prompt set, N runs per platform per round, screenshots plus saved share links, logged in a sheet]] |

**Three commercial queries, before and after:**

| Query (exact prompt) | Platform | Before (date) | After (date) | Cited URL(s) after | Evidence |
|---|---|---|---|---|---|
| [[ ]] | [[ ]] | [[not mentioned / mentioned #x / cited]] | [[ ]] | [[ ]] | [[screenshot or share-link file names]] |
| [[ ]] | [[ ]] | [[ ]] | [[ ]] | [[ ]] | [[ ]] |
| [[ ]] | [[ ]] | [[ ]] | [[ ]] | [[ ]] | [[ ]] |

**The three interventions that mattered most** (what I personally did):
1. [[e.g. Rewrote the comparison page answer-first, with a sourced pricing table. Shipped on <date>.]]
2. [[e.g. Got the brand added to 4 of the third-party lists the engines were citing. List the URLs.]]
3. [[ ]]

**One failed experiment and the lesson:** [[What I tried, what I expected, what happened (with data), and what I changed as a result.]]

**Commercial outcome, if any:** [[e.g. AI-referral sessions, self-reported "found you on ChatGPT" leads, or opportunities, with how they were attributed]]

*Evidence pack: [[link to a folder of redacted screenshots and the results log]]. Confidential client details removed.*

---

## Task 2: SoluLab's current visibility audit

### Method

- **Platforms:**
  - ChatGPT with search on (logged out, or a clean profile with memory off)
  - Perplexity (default model, logged out)
  - Optional third: Claude via API with web search, using the script `run_claude_prompts.py`, which logs cited URLs automatically
- **Runs:** each prompt is run **3 times in fresh sessions** on each platform. Results are reported as rates (e.g. "mentioned in 2 of 3 runs"). A single answer is not a ranking.
- **Location:** US prompts from a US connection. GCC prompts from a UAE or KSA VPN exit, or with the location stated in the prompt. The location used is recorded.
- **Logged per run:** date and time (UTC), whether SoluLab is mentioned, recommended or cited, the SoluLab URL cited, list position, competitor brands, all cited URLs, whether the facts about SoluLab are correct, and the screenshot file name. Template: `task2-results-log.csv`.
- **Test date(s):** [[YYYY-MM-DD]]

### Queries

| ID | Market | Cluster | Exact prompt | SoluLab page that should win |
|---|---|---|---|---|
| Q1 | US | AI agent development | "Which companies should a US enterprise consider to build custom AI agents? Give me a shortlist with a reason for each." | `/ai-agent-development-company/` |
| Q2 | US | Generative AI | "What are the best generative AI development companies in the USA for building an enterprise LLM application?" | `/generative-ai-development-company/` |
| Q3 | UAE | AI development | "What are the top AI development companies in Dubai for enterprise projects?" | `/ai-development-company-in-dubai/` |
| Q4 | KSA | AI consulting | "Recommend AI consulting firms in Saudi Arabia that can help a company with AI strategy and implementation." | `/ai-development-company-in-saudi-arabia/` |
| Q5 | US | AI agent cost / vendor | "How much does it cost to hire a company to build an AI agent, and which firms offer this service?" | `/how-much-does-it-cost-to-build-an-ai-agent/` |

### Results

Fill in from the log. Show rates across the 3 runs.

| ID | Platform | Date | Mentioned | Recommended | Cited (URL) | Competitors observed | Third-party URLs cited |
|---|---|---|---|---|---|---|---|
| Q1 | ChatGPT | [[ ]] | [[x/3]] | [[x/3]] | [[x/3 · URL]] | [[ ]] | [[ ]] |
| Q1 | Perplexity | [[ ]] | | | | | |
| Q2 | ChatGPT | | | | | | |
| Q2 | Perplexity | | | | | | |
| Q3 | ChatGPT | | | | | | |
| Q3 | Perplexity | | | | | | |
| Q4 | ChatGPT | | | | | | |
| Q4 | Perplexity | | | | | | |
| Q5 | ChatGPT | | | | | | |
| Q5 | Perplexity | | | | | | |

### One opportunity per query

These come from my crawl of solulab.com on Oct 26, 2026. Confirm each against the cited URLs observed.

| ID | Opportunity | Evidence on the site today |
|---|---|---|
| Q1 | **Get onto the third-party shortlists the engines cite, and give `/ai-agent-development-company/` quotable proof.** List queries get built from third-party lists, so a vendor page alone rarely gets SoluLab named. | The page has 0 citations of authoritative sources and few quantified outcomes. In the third-party search results I sampled for "best AI agent development companies", SoluLab didn't appear. Those results were dominated by listicles from other vendors and analysts. |
| Q2 | **Fix and consolidate the Gen-AI page before promoting it.** It's 3.3 MB of HTML (embedded base64 images), has no cost or timeline section, and competes with an orphaned duplicate. | `/generative-ai-development-company/` is 3,207 KB. `/generative-ai-software-development-company/` overlaps it and has 0 internal links. |
| Q3 | **Give the Dubai page real local substance: local proof plus GCC third-party presence.** At the moment it reads as a location page with no local footprint. | The page is filed in the *post* sitemap, has 9 internal links, ~1 MB of HTML, 0 authoritative sources and 1 statistic. The site lists no UAE office (offices: US, India, Canada, Australia). A SoluLab "Top AI development companies in Dubai" post ranks SoluLab itself. |
| Q4 | **Build KSA relevance with sourced, Vision 2030 / SDAIA-aligned content, a KSA case study, and inclusion in KSA directories.** | `/ai-development-company-in-saudi-arabia/` has 6 internal links, 0 statistics and 0 authoritative sources. A "Why choose SoluLab… Saudi Arabia" post is self-promotional. |
| Q5 | **Consolidate the AI-agent cost content into one answer-first hub with SoluLab's real price bands.** Cost questions are where engines most readily cite vendor pages, because they need numbers. | 3 overlapping cost posts: `/how-much-does-it-cost-to-build-an-ai-agent/`, `/autonomous-ai-agent-cost-per-month/` and `/ai-agent-mvp-cost-for-small-businesses/`. Openings are hooks ("it depends"). Median post has 0–1 sourced statistics. No visible "updated" date. |

**Cross-cutting issue that affects every query: entity consistency.**
- The site gives conflicting company facts: 1,500+ vs 500+ vs 150+ projects delivered, and 11+ vs 10+ years.
- It says "US-based" while the Organization schema gives Ahmedabad as the main address.
- Directories list headcount anywhere from 50 to 250+.

Engines blend these sources, so the conflict weakens every recommendation.

---

## Task 3: The three experiments I'd run first

The order is by expected effect on **commercial** prompts per hour of effort. E1 is the distribution experiment the assignment asks for.

### E1. Get onto the third-party sources the engines already cite (distribution)

| | |
|---|---|
| **Hypothesis** | For "best / top X companies" prompts, ChatGPT and Perplexity build the answer from a small set of retrieved third-party pages: directories, editorial listicles, analyst roundups. If SoluLab is present and well described on the sources already cited for its cluster, its mention rate on those prompts goes up. |
| **Target cluster** | Vendor selection, US and GCC: Q1, Q3 and Q4, plus 6 variants (e.g. "AI agent development company USA", "best AI development company UAE", "AI consulting firm Riyadh"). 9 prompts in total. |
| **Exact action** | 1. Take every third-party URL cited in the Task 2 baseline for these prompts. Rank them by how many runs cited them. 2. Sort each into a type: **Directory** (Clutch, GoodFirms, DesignRush, TechBehemoths), **Editorial list**, **Analyst or media**, **Forum / Q&A**, or **Competitor self-list** (skip these). 3. For the top 15 by frequency: **Directories**: complete SoluLab's AI and Gen-AI service focus, add UAE and KSA service areas and portfolio items, and get 5 new verified reviews from AI and agent clients (Clutch first; it's already in SoluLab's `sameAs`). **Editorial lists**: pitch the author for inclusion or an update, using an evidence pack (2 AI case studies with metrics, Clutch rating, one named expert, and a two-line differentiator). **Media**: one bylined expert article in a US publication and one in a GCC publication. **Forums**: genuine, disclosed answers from named engineers. No link drops. |
| **Why I expect it to work** | (a) In my sampled third-party searches for "best AI agent development companies" and "RWA tokenization companies", the results were almost entirely third-party lists, and SoluLab was absent or present only on its own pages. (b) Engines discount a vendor's own "Top 10" lists. SoluLab has 92 of them, and they don't fill this gap. (c) This changes the sources the engines actually retrieve, rather than hoping a new page gets picked up. |
| **Baseline** | From Task 2, mention rate on the 9 prompts × 2 platforms × 3 runs (54 runs) = [[x%]]. Presence on the top-15 cited sources = [[n/15]]. |
| **Success metric** | **Leading:** SoluLab present on ≥6 of the top-15 sources by week 6. **Primary:** mention rate up ≥15 percentage points over baseline at both week 6 and week 8 (two re-measures, to rule out noise). **Commercial:** ≥2 inquiries that self-report an AI assistant or arrive from an AI-referrer, by week 10. |
| **Evaluation period** | 8 weeks (6 for execution, plus 2 re-measures). |
| **Effort / owner** | About 30 hours over 6 weeks. Owner: marketing executive, following the SOP in Task 4. I review weekly. Delivery or sales supplies the client reference requests for reviews. |
| **If it fails** | If inclusions land but mention rate doesn't move, re-check which sources are now cited (the engines may have switched sets), weight effort toward directories with review velocity, and run E3 first. If inclusions don't land, change the offer from "please add us" to something the author wants (original data, an expert quote, a correction to their list) and re-pitch. |

### E2. Answer-first, evidence-dense rewrite of the AI agent cost cluster (on-site content)

| | |
|---|---|
| **Hypothesis** | Cost prompts make engines cite pages that state a concrete price range with a scope and timeline breakdown. Rewriting SoluLab's AI-agent cost content answer-first, with real price bands and sourced statistics, will raise the citation rate of solulab.com on cost prompts. |
| **Target cluster** | Q5 plus: "AI agent development cost", "cost to build an AI customer service agent", "monthly cost of running an AI agent", "AI agent MVP cost". 5 prompts. |
| **Exact action** | 1. Make `/how-much-does-it-cost-to-build-an-ai-agent/` the hub. Keep `/autonomous-ai-agent-cost-per-month/` (run cost) and `/ai-agent-mvp-cost-for-small-businesses/` (MVP) as spokes with distinct intent. Merge any true duplicate and 301 it. 2. Open with a 50-word answer that states SoluLab's actual range. 3. Add a scope × cost × timeline table built from **real SoluLab quotes from the last 12 months** (sales provides these). 4. Add a "From our projects" box with 3 anonymized engagements. 5. Add 3–5 statistics, each linked to its primary source. 6. Show the "Updated" date. 7. Add the same table to `/ai-agent-development-company/`. 8. Submit through IndexNow and Bing Webmaster Tools, and request indexing in GSC. **Control:** leave the LLM-development-cost post untouched. |
| **Why I expect it to work** | (a) Research on generative-engine optimization (Aggarwal et al., *GEO: Generative Engine Optimization*, KDD 2024, arXiv:2311.09735) found that adding statistics, citations and quotations raised a source's visibility in generative answers, by up to roughly 40% in their benchmark. (b) The audit shows SoluLab's openings are hooks ("the honest answer is: it depends"). Posts have a median of 0–1 sourced statistics and no visible updated date, so there's a clear gap to close. (c) Cost answers need numbers, and vendor pages are a natural source for them. |
| **Baseline** | solulab.com citation rate on 5 prompts × 3 platforms × 3 runs = [[x%]]. GSC impressions and CTR for the hub over the last 28 days = [[ ]]. Same metrics for the control. |
| **Success metric** | solulab.com cited in ≥25% of runs, or +15 points over baseline, in weeks 4–6, while the control doesn't move. GSC CTR on the hub is not down. |
| **Evaluation period** | 6 weeks after publishing (re-measure at weeks 2, 4 and 6). |
| **Effort / owner** | About 14 hours: writer 10 h, sales input 2 h, dev 1 h, my review 1 h. Owner: content lead. |
| **If it fails** | First check the page is re-crawled and indexed in Bing and Google with the new content. If it's indexed but not cited, the engines are getting cost data elsewhere. Look at which URLs they cite, then distribute the same table through a named-expert LinkedIn article and a submission to a cited third-party cost guide, which is E1-style. |

### E3. One set of company facts everywhere (entity consistency)

| | |
|---|---|
| **Hypothesis** | Buyers vet vendors by asking AI ("Is SoluLab legit?", "Where is SoluLab based?"). Aligning SoluLab's facts across its site, schema and top external profiles will raise the accuracy and confidence of those answers. That protects deals that are already in the pipeline, which is the fastest route to the Q1 closure target. |
| **Target cluster** | Brand and vetting prompts: "What is SoluLab?", "Is SoluLab a good company to work with?", "SoluLab reviews", "Where is SoluLab based and how big is it?", "SoluLab vs LeewayHertz". |
| **Exact action** | 1. Write a one-page fact sheet: legal entities, HQ and offices, founding year, headcount band, projects delivered (one defined number), certifications with IDs, and core services. 2. Fix the conflicting numbers on the site: replace the per-template stats strips with one shared component, and resolve "US-based" vs the schema address. 3. Update the About page, the Organization schema (address, `location`, `numberOfEmployees`, a complete `sameAs`) and `llms.txt`. 4. Update the external profiles to match, and ask Clutch, IoT ONE and Celent to merge duplicate listings: Clutch, GoodFirms, DesignRush, Built In, IoT ONE, Celent, Crunchbase, LinkedIn. 5. Publish a Reviews page that links out to Clutch. |
| **Why I expect it to work** | The facts are verifiably inconsistent today (Task 2, cross-cutting issue). Search-enabled answers retrieve these pages directly, and every fix here is fully under SoluLab's control. |
| **Baseline** | Fact-accuracy score: 5 prompts × 2 platforms × 3 runs, each answer scored on 5 facts (HQ, size, founding year, core services, rating) = [[x%]]. Contradictions observed = [[n]]. |
| **Success metric** | Fact accuracy ≥80% and 0 contradictions in search-on answers by week 8. Model-memory answers lag, so they're tracked separately. |
| **Evaluation period** | 8 weeks. |
| **Effort / owner** | About 12 hours of marketing time plus 2 hours of dev. Owner: marketing executive. |
| **If it fails** | Look at the URLs cited in the wrong answers and fix those specific sources. If wrong facts come from model memory, not retrieval, accept the lag and keep re-measuring quarterly. |

---

## Task 4: SOP for E1, getting onto cited third-party sources

**Purpose:** get SoluLab included, accurately, on the third-party pages AI engines cite for the vendor-selection prompts we care about, and measure the effect.
**Owner:** marketing executive. **Reviewer:** LLM visibility lead. **Cadence:** a 2-week cycle, repeated.

**Inputs:**
- The prompt panel (`task2-prompts.csv` plus the cluster variants)
- The results log
- The evidence pack: 2 AI case studies with metrics, Clutch link and rating, an expert bio, a 2-line differentiator, and approved logos
- The canonical fact sheet (E3)

**Tools:** ChatGPT, Perplexity (plus the Claude script), Google Sheets, the Clutch / GoodFirms / DesignRush dashboards, an email-finder, HubSpot.

**Deliverables:** a source tracker sheet, outreach log, updated profiles, and a fortnightly one-page report.

**Steps:**
1. **Measure.** Run each prompt 3 times per platform in fresh sessions, following the protocol in Task 2. Save screenshots as `Q#_platform_run#_YYYYMMDD.png`. Log every cited URL.
2. **Build the source list.** In the tracker, list each cited third-party URL with columns: domain, type (Directory / Editorial / Media / Forum / Competitor self-list), how many runs cited it, whether SoluLab is present (Y/N), and whether the description is accurate (Y/N). Drop competitor self-lists.
3. **Prioritize.** Score each source as *times cited × feasibility*. Feasibility: directory = 3, editorial with a contact = 2, media = 1. Work the top 15.
4. **Directories (week 1).** Bring each profile in line with the fact sheet. Add the AI, Gen-AI and AI-agent focus, UAE and KSA service areas, and 3 AI portfolio items. Ask 5 recent AI clients for verified reviews, using the template in the evidence pack. Sales picks the clients.
5. **Editorial and media (weeks 1–2).** Find the author. Send a short pitch: why the list's readers would benefit, one specific fact or data point, and the evidence pack. Offer an expert quote or original data rather than a plain "add us" request. Follow up once after 5 working days.
6. **Forums (ongoing).** A named engineer answers relevant open questions with real detail and discloses the affiliation. Never post from anonymous or brand-new accounts.
7. **Log everything** in the outreach log: date, contact, ask, response, and the live URL once included.
8. **Re-measure** in week 6 and week 8 with the same prompts, platforms and run count. Update the tracker.

**Quality-control checklist** (the reviewer signs off before anything goes out):
- [ ] Every fact matches the fact sheet. No unapproved client names or numbers.
- [ ] No paid or "sponsored" placements presented as editorial. Any paid listing is disclosed and tagged in the tracker.
- [ ] No posting on platforms where SoluLab would be ranking itself (e.g. user-generated "Top 10" posts on third-party forums).
- [ ] Review requests follow the platform's rules: no incentives, no gating.
- [ ] Screenshots and run logs saved for every measurement round.
- [ ] The outreach is personalized: it names the list and why SoluLab fits its readers.

**Measurement and reporting** (fortnightly, one page):
- Sources: present now vs baseline (n/15).
- Mention rate by platform and prompt (rates, not single answers), with the change since baseline.
- New cited sources that appeared, and sources that dropped out.
- GA4 "AI referrals" channel sessions and conversions, plus HubSpot inquiries where "How did you hear about us?" = AI assistant.
- Actions planned for the next cycle.

**Repeat, improve or stop:**
- **Repeat and scale** to the next cluster (Gen-AI US, RWA, stablecoin) if presence is ≥6/15 *and* mention rate is up ≥15 points at two consecutive re-measures.
- **Improve** if presence is up but mention rate is flat: re-check cited sources, shift effort to the sources cited most, and run E3.
- **Stop or redesign** if fewer than 3 of 15 inclusions land after 2 cycles (the offer isn't working), or if a platform or editorial policy issue comes up.

### From visibility to the $30k Q1 and $250k annual closure targets

**Attribution setup** (week 1, using tools SoluLab already runs; the site loads HubSpot and the HandL UTM Grabber):
- A GA4 channel group for AI referrers (chatgpt.com, perplexity.ai, gemini.google.com, copilot.microsoft.com, claude.ai).
- HandL's first-touch referrer and landing page passed into HubSpot hidden fields.
- A required "How did you hear about us?" field with an "AI assistant (ChatGPT, Perplexity…)" option. Many AI-influenced buyers never click, so this is the only way to see them.
- Sales asks the same question on discovery calls and tags deals "AI-influenced".

**Commercial math.** These are planning assumptions, to be replaced with SoluLab's own CRM rates.
- Clutch shows SoluLab's most common project size at $50k–$199k. So $250k a year is roughly **3–5 closed deals**, and $30k in Q1 is about **one discovery, MVP or first-phase deal**.
- At a 20–25% SQL-to-close rate, that needs about **15–20 AI-influenced SQLs a year** (4–5 a quarter).
- At about 30% inquiry-to-SQL, that's about **50–65 qualified inquiries a year**.

**Q1 sequencing.** B2B cycles of 60–120 days mean Q1 revenue must come from buyers already in motion. So in the first 6 weeks I'd prioritize:
1. **E3**, because accurate answers to "Is SoluLab legit?" help close deals already in the pipeline.
2. **E1 on vendor-selection prompts**, because those buyers are shortlisting now.
3. **E2 on cost prompts**, because those buyers are budgeting.

Reported weekly to the team:
- Prompt-panel mention and citation rates
- AI-referral sessions
- AI-influenced inquiries and SQLs
- Pipeline value
- Closed revenue against the $30k / $250k targets

That way visibility work is judged on pipeline, not on screenshots.

---

*Prepared with AI assistance for crawling and analysis of solulab.com. All site figures come from my crawl on Oct 26, 2026 (method and data in the linked audit). AI-platform results come only from the dated runs logged in Task 2.*
