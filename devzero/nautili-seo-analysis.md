# Nautili (nautili.ai): SEO, Competitor & Market Analysis

*Prepared 12 Nov 2026. Based on a live crawl of nautili.ai (robots.txt, llms.txt, sitemaps, on-page tags on 15+ URLs), competitor sitemaps and homepages, live search results, and **DataForSEO data pulled 12 Nov 2026** (Labs rankings and traffic estimates, Google Ads search volumes, Backlinks; US unless stated). Companion to `devzero-seo-analysis.md`; full data in `seo-data-findings.md` and `data/`.*

> **Data note:** Traffic, ranking, volume and backlink figures come from DataForSEO (12 Nov 2026). Traffic is DataForSEO's modelled US estimate (ETV). **Search Console is not connected yet:** the service account `gsc-reader@gsc-access-513417.iam.gserviceaccount.com` needs Restricted access to `sc-domain:nautili.ai`.

### Search data at a glance (US, DataForSEO)
| Metric | nautili.ai | OpenRouter | LiteLLM | TrueFoundry | Portkey | Helicone |
|---|---:|---:|---:|---:|---:|---:|
| Ranking keywords | **0** | 7,941 | 1,381 | 4,233 | 1,794 | 948 |
| Est. organic visits/mo | **0** | 61,871 | 11,838 | 9,043 | 3,344 | 1,098 |
| Referring domains | **6** | 23,362 | 7,616 | 3,115 | 3,027 | 2,879 |

- **Nautili has no rankings yet** in DataForSEO's US or worldwide index and is outside the top ~70–100 for all 10 target keywords checked.
- **Its 6 referring domains are low-value** (spam score 31). The crawler first saw the domain on **13 Oct 2026**, and **no link from devzero.io** (526 referring domains) was found.
- **Demand is growing fast:** gateway terms +164% and alternatives terms +185% year on year (Sep 2026 vs Sep 2025); "openrouter alternative" went from 320 to 1,300 searches/month.

---

## 1. What Nautili is

**Nautili is DevZero's LLM inference product, launched under its own brand and domain.** Its `llms.txt` says so directly: *"Nautili is DevZero's LLM inference platform"*, and the footer reads "Built by DevZero". It is the stand-alone version of the "Optimize Inference (Beta)" section on devzero.io. Both sites run on the same stack: identical `robots.txt` rules (including DevZero app paths such as `/studio`, `/dashboard`), the same sitemap scheme and the same careers pages.

| | |
|---|---|
| **Category** | LLM / AI gateway, also called an inference control plane | | ~10k (KD 31), +164% YoY: ai gateway 2,900, mcp gateway 2,400, llm gateway 1,600, llm router 720
| **Title / H1** | "Nautili — Inference, under control" / "Inference, under control." |
| **Meta description** | "Nautili is one gateway for all your LLM traffic. Attribute spend, set budgets and access, and route every request to the right model, in your network or hosted." |
| **Product** | One OpenAI/Anthropic/Gemini-compatible endpoint (change only the base URL and key). Spend attribution by team, developer, key or tool. Budgets and model access controls. Routing profiles and Auto Mode. Failover. Evals (datasets, trials, experiments). Guardrails (PII, secrets). Self-host via Helm or Docker Compose, a dedicated hosted gateway, or a shared gateway. "Nautili Harness" desktop and terminal app. |
| **Works with** | OpenAI, Anthropic and Gemini SDKs; LangChain; Vercel AI SDK; Claude Code; Codex; Cursor; Continue.dev; Gemini CLI |
| **Catalogue** | 500+ models from 70+ providers |
| **Pricing** | Demo tier: $0 with starter credit and no card. Pay-as-you-go: **4% platform fee** on inference, tokens at provider list price, bring your own keys or your own GPUs. |
| **Audiences** | Platform teams, engineering leaders who need spend control, B2C/self-serve teams that attribute cost per feature |
| **Proof** | Codilas (CTO quote: "rollout took about an afternoon") and Opsee. That is thin. |

---

## 2. Site inventory

| Sitemap | URLs | What's in it |
|---|---:|---|
| `catalog.xml` | **573** | Programmatic model pages (e.g. `/models/anthropic/claude-opus-4.8`) and provider pages. OpenAI has 107 entries, Google 45, Qwen 44, Anthropic 35, Mistral 29. |
| `pages.xml` | 91 | Product pages, 2 compare pages (Portkey, OpenRouter), 1 integration page (Claude Code), 1 feature page (spend attribution), 13 guides, about 50 docs and API-reference pages |
| `blog.xml` | 53 | About 46 posts and 6 category pages. **Only about 7 posts are about LLMs or AI gateways; the other ~39 are DevZero's Kubernetes posts** (see issue #1). |
| **Total** | **~717** | |

---

## 3. Technical & on-page SEO audit

### What's working
- **Clean setup:** `nautili.ai` redirects with a 308 to `www.nautili.ai`, HTTPS is enforced, `sitemap.xml` 308s to `sitemap-index.xml`, and canonicals are self-referencing.
- **Server-rendered and fast:** pages respond in about 0.3–0.8 seconds, all images have alt text, and `lang="en"` is set.
- **Good structured data:** Organization and WebPage on the homepage; **Dataset** schema on `/models` and `/providers`; FAQPage plus BreadcrumbList on compare pages; BlogPosting with Person and FAQPage on posts.
- **An accurate `llms.txt`.** Unlike DevZero's, it matches the product and lists the current docs. AI crawlers are explicitly allowed.
- **Strong commercial titles:**
  - "Nautili.ai vs OpenRouter: Which LLM Gateway Fits?" (includes a fee calculator)
  - "Nautili.ai vs Portkey: LLM Gateway Comparison"
  - "AI spend management and cost attribution"
  - "Claude Code Cost in 2026: Plans, API Prices, Per-Developer Tracking" (about 3.5k words)
  - "Best Open Source LLM Gateways in 2026: 5 Options Compared" (about 4.4k words)
- **A smart niche choice:** posts on the cost of AI coding agents (`/blog/claude-code-cost`, `/blog/cursor-cost-per-developer`, `/blog/claude-code-proxy`) target a fast-growing and still lightly contested query space where engineering leaders are searching right now.

### Problems to fix (highest impact first)

| # | Issue | Evidence | Fix |
|---|---|---|---|
| 1 | **About 39 DevZero Kubernetes posts are copied onto nautili.ai with self-referencing canonicals.** That is cross-domain duplicate content: the two sites compete with each other for the same queries, Google has to choose one, and Nautili's topical focus on LLM gateways is diluted. | `nautili.ai/blog/kubernetes-cost-optimization-tools-2026` is identical to the devzero.io post (same 115-cluster dataset, about 5.4k words) and canonicalises to nautili.ai. The same applies to `eks-cost-optimization` (including the stale "**2025**" title), `karpenter-guide`, `kubernetes-vpa`, `gke-pricing` and more. | **Remove them from nautili.ai** (301 each one to its devzero.io URL), or at minimum set `rel=canonical` to devzero.io and drop them from `blog.xml`. Keep only the inference and GPU-inference posts. |
| 2 | **The brand is not discoverable.** A search for "nautili.ai" returned **no Nautili pages**; the results were Nautilus, Nautil.io, Nautilida and unrelated companies. DataForSEO confirms both causes: the domain is new (first crawled 13 Oct 2026) and has almost no authority (6 low-value referring domains, 0 ranking keywords). | Live search on 12 Nov 2026; DataForSEO Labs and Backlinks | Verify in Search Console and submit the sitemap. Add `sameAs` links (LinkedIn, GitHub, X, Crunchbase, G2) to the Organization schema. Link from devzero.io (see #3). Launch on Product Hunt, Hacker News and r/LocalLLaMA. Get listed on review sites. |
| 3 | **Overlap with devzero.io's own inference pages.** The two sites split authority and confuse buyers. devzero.io has 526 referring domains; nautili.ai has 6. | `devzero.io/inference` (about 2.6k words), `devzero.io/pricing/inference` and `devzero.io/lp/inference` sell the same product and **never mention Nautili**. The devzero.io homepage still pitches "Optimize Inference (Beta)". | Decide on one home. Recommended: **301 `devzero.io/inference` and `/pricing/inference` to nautili.ai**, and add a "Nautili by DevZero" module with a link on the devzero.io homepage and navigation. That passes DevZero's authority to the new domain and fixes #2. |
| 4 | **Only 2 compare pages and 1 integration page**, even though the homepage claims many more integrations. | `/compare/portkey`, `/compare/openrouter`, `/integrations/claude-code` | Add compare pages for LiteLLM, Helicone, Cloudflare AI Gateway, Vercel AI Gateway, Kong, TrueFoundry, Bifrost and Requesty. Add integration pages for Cursor, Codex, Continue, Gemini CLI, LangChain, Vercel AI SDK, OpenAI SDK, Anthropic SDK and LlamaIndex. These pages convert well and are cheap to produce. |
| 5 | **Thin programmatic model pages** competing with OpenRouter's 35k URLs | `/models/anthropic/claude-opus-4.8` has about 521 words of mostly templated text | Make them unique: live cross-provider price comparison for the model, latency and uptime from gateway traffic, cheaper alternatives, a code snippet. Original data is the only way to compete with OpenRouter on these queries. |
| 6 | **H1 spacing when the HTML is read without CSS** | "Inference,under control." and "Nautili.aivsPortkey" appear as glued text in the raw markup | Put a real space or `<br>` inside the H1 rather than relying on CSS layout. It is small, but it is what Google and LLMs read. |
| 7 | **Inconsistent brand name** | "Nautili" in some titles, "Nautili.ai" in others | Use "Nautili" everywhere. Use "Nautili.ai" only where it's needed to tell the brand apart from Nautilus. |
| 8 | **No schema on pricing or how-it-works** | `/pricing/inference` (962 words) and `/how-it-works` (723 words) have no JSON-LD | Add `SoftwareApplication` with `Offer` on pricing, and FAQPage on both. |
| 9 | **Thin social proof** | Two logos and one quote | Add 3–5 case studies with numbers, such as "% of spend moved to cheaper models" and "$ saved per developer". |
| 10 | **Leftover robots rules from DevZero** | `Disallow: /studio` and similar paths that don't exist on Nautili | Harmless, but tidy them so the file reflects Nautili's own app paths. |

---

## 4. Competitive landscape (LLM / AI gateways)

| Competitor | Status (2026) | Positioning | Indexable URLs |
|---|---|---|---:|
| **OpenRouter** | $113M Series B (May 2026, CapitalG) at about $1.3B. **Stripe agreed to acquire it in Aug 2026** (reported price varies). | Managed multi-model marketplace; about a 5.5% fee on credits | **~35,500** |
| **Portkey** | $15M Series A (Feb 2026). **Acquired by Palo Alto Networks (May 2026, about $117–130M).** | "Production Stack for Gen AI Builders"; governance and observability | ~660 |
| **TrueFoundry** | VC-backed | "Enterprise AI Gateway & MCP Gateway" | ~9,800 |
| **Bifrost (Maxim AI)** | VC-backed | "Enterprise AI Gateway Built for Scale"; open source and Go-based | ~8,000 |
| **Helicone** | VC-backed | "AI Gateway & LLM Observability"; open source | ~5,200 |
| **Requesty** | Startup | "AI Gateway & LLM Router for 600+ Models" | ~2,300 |
| **LLMGateway.io** | Open source | Publishes many "X alternatives" posts | ~840 |
| **LiteLLM** | Open source (BerriAI) | Self-hosted Python proxy and SDK; the default open-source choice | ~20 on the marketing site; ranks through GitHub and docs |
| **Cloudflare AI Gateway, Vercel AI Gateway, Kong AI Gateway** | Large platforms | A gateway as a feature of a wider platform | Very large, high-authority domains |
| **Martian, Not Diamond** | Funded routing specialists | Intelligent model routing | — |
| **Nautili** | New; backed by DevZero ($26M raised in 2023) | "Inference, under control"; spend attribution, governance, self-host, 4% fee | **~717** |

*Organic footprint (DataForSEO, US): OpenRouter ~61.9k est. visits/mo and 23.4k referring domains; LiteLLM 11.8k / 7.6k; TrueFoundry 9.0k / 3.1k; Portkey 3.3k / 3.0k; Helicone 1.1k / 2.9k; Nautili 0 / 6. Portkey's SERP neighbours (Labs competitors) are GitHub, dev.to, Hacker News, claude.com, openai.com, TrueFoundry, OpenRouter, getmaxim.ai (Bifrost) and llmgateway.io.*

### What the search results look like
- **"Best LLM gateway 2026" and "OpenRouter / Portkey / LiteLLM alternatives"** are dominated by vendor-written listicles that rank themselves first: Requesty, LLMGateway.io, nexos.ai, Merge, Pinggy, Dupple, dev.to, and Portkey's own "OpenRouter alternatives" page. **Nautili appeared in none of them.**
- The names that keep recurring are LiteLLM, Portkey, OpenRouter, Helicone, Bifrost, Cloudflare, Vercel, Kong and TrueFoundry. Being included in these lists matters for search and also for AI answers, since LLMs draw on the same lists.

### Where Nautili can win
1. **Fallout from acquisitions.** Portkey now belongs to Palo Alto Networks and OpenRouter is joining Stripe. Searches for *"Portkey alternatives"* and *"OpenRouter alternatives"* are growing (DataForSEO: *openrouter alternative* 320 → 1,300/month and *portkey alternatives* 10 → 90/month year on year; KD 0–1), and buyers who want an independent, self-hostable option are a natural fit. Write the "after the acquisition" pages now.
2. **A cheaper fee than OpenRouter.** 4% versus about 5.5%, plus bring-your-own-keys. The OpenRouter compare page already has a fee calculator; make it a stand-alone tool at something like `/tools/llm-gateway-fee-calculator`.
3. **AI coding-agent spend.** Claude Code, Cursor, Codex and Gemini CLI cost per developer is a new, fast-growing topic with few authoritative pages. It is also the **largest addressable cluster (~101k US searches/month)**: *claude code pricing* 27,100 (KD 30), *cursor pricing* 9,900 (KD 21), *codex pricing* 8,100 (KD 9), and *cursor vs claude code* 8,100 at **KD 2**, where the top results are Reddit and personal blogs. Nautili already has 3 posts. Build a full cluster: a cost per developer for each tool, a "Cursor vs Claude Code cost" comparison, setup guides for budgets per developer, and an "AI coding spend report" built from anonymised gateway data.
4. **Self-hosting plus governance.** Covers the enterprise needs LiteLLM leaves open (attribution, budgets, evals) without running Python yourself. Target *"self-hosted LLM gateway"*, *"LiteLLM alternative"* and *"LLM gateway Helm"*.
5. **The DevZero connection.** It lets Nautili offer GPU and Kubernetes inference cost (route to your own GPUs) as one story. No other gateway owns the "inference cost from GPU to token" angle.

---

## 5. Market context

- **Rapid consolidation in 2026:** Palo Alto Networks bought Portkey (May), Stripe agreed to buy OpenRouter (Aug) and Martian is reportedly near a $1.3B valuation. The gateway layer is becoming must-have infrastructure, but the independent mid-market players are disappearing, which opens a gap for neutral, self-hostable options.
- **Spend is the buyer's pain.** FinOps teams now treat AI and token cost as a core area (FinOps Foundation working groups on AI cost). Products are converging on three things: cost allocation, model routing and governance. Nautili's message ("route, attribute, govern, observe") fits this.
- **Coding agents are the fastest-growing source of spend** in engineering organisations, so CTOs and VPs of Engineering are searching for per-developer controls.
- **Free is the baseline:** LiteLLM, Helicone, Bifrost and LLMGateway.io are open source. Nautili is closed source but self-hostable, and has to sell what the open-source tools lack: attribution, governance, evals and support. Its "open source LLM gateways" post already frames it this way.

---

## 6. Keyword & content map

| Cluster | Target queries | US searches/mo (KD)* | Nautili asset | Action |
|---|---|---|---|---|
| **Category** | llm gateway, ai gateway, llm router, llm proxy | ~10k (KD 31), +164% YoY: ai gateway 2,900, mcp gateway 2,400, llm gateway 1,600, llm router 720 | Homepage, open-source gateways post | A pillar page "What is an LLM gateway" and a "Best LLM gateways 2026" post that includes Nautili |
| **Alternatives & vs** | openrouter alternative, portkey alternative, litellm alternative, helicone vs portkey | ~3.3k (KD 7), +185% YoY: openrouter pricing 1,600, openrouter alternative 880, litellm alternatives 390 | 2 compare pages | 8–10 more `/compare/*` pages and `/alternatives/*` pages with an "after the acquisition" angle |
| **Coding-agent cost** | claude code cost, cursor cost per developer, claude code proxy, track ai coding spend | ~101k (KD 24): claude code pricing 27,100, cursor pricing 9,900, cursor vs claude code 8,100 (KD 2) | 3 strong posts, Claude Code integration | Add Codex, Gemini CLI, Copilot and Windsurf cost posts, one integration page per tool, and a data-driven benchmark report |
| **Spend / FinOps for AI** | llm cost tracking, ai spend management, llm budget per team, token cost attribution | small: llm cost tracking, ai spend management under 100 each; llm observability 590 | `/features/spend-attribution` | Feature pages for budgets, routing, failover and evals; a glossary |
| **Model pricing (programmatic)** | `{model} pricing`, `{model} api cost`, `{model} vs {model}` | ~98k (KD 35), +67% YoY: claude pricing 40,500, openai api pricing 12,100, claude api pricing 8,100 | 573 catalogue pages | Add real cross-provider prices and latency; add vs-pages for popular model pairs; an LLM price-change tracker |
| **Self-hosting** | self hosted llm gateway, llm gateway helm, on-prem ai gateway | open source llm gateway 70, self hosted llm gateway 10 | Helm guide, self-hosting docs | A dedicated landing page and a comparison with the LiteLLM and Bifrost self-host setup |
| **Governance / security** | llm governance, pii redaction llm, llm guardrails | llm guardrails 320 | Governance post, guardrails guide | Pages focused on compliance (SOC 2 carried over from DevZero; data retention policy) |


*DataForSEO, US, 12 Nov 2026; variant-deduped, competitor brand names excluded (bare brand searches: openrouter 135k, litellm 27k, portkey 5.4k). Detail in `seo-data-findings.md` §3–4.*

---

## 7. Prioritised action plan

**Next 2–4 weeks**
1. Remove or canonicalise the ~39 duplicated Kubernetes posts so they point to devzero.io.
2. Redirect `devzero.io/inference` and its pricing and landing pages to nautili.ai, and add links from devzero.io to Nautili.
3. Set up Search Console and Bing Webmaster Tools, add `sameAs` brand schema, and fix the H1 spacing and the "Nautili / Nautili.ai" naming.
4. Publish "Portkey alternatives" and "OpenRouter alternatives" pages framed around the acquisitions.

**1–3 months**
5. Add 8 more compare pages and 8 integration pages.
6. Publish the stand-alone fee calculator and an LLM price tracker built from catalogue data.
7. Build out the coding-agent cost cluster and publish a "State of AI Coding Spend" report from gateway data. Use it for PR and link building.
8. Launch on Product Hunt and Hacker News; create G2 and SaaSHub profiles; contact the authors of the "best LLM gateway" lists.

**3 months and beyond**
9. Enrich model pages with live price, latency and uptime data from the gateway.
10. Publish two posts a week across the clusters above, with case studies alongside.
11. Track citations in AI answer engines for "best LLM gateway" and "OpenRouter alternative" as KPIs.

---

## Sources
- Search data: DataForSEO API v3 (Labs domain overview, ranked keywords, competitors, historical SERPs; Google Ads search volume; Backlinks summary and referring domains), pulled 12 Nov 2026. See `seo-data-findings.md`.
- Nautili: [homepage](https://www.nautili.ai/), [pricing](https://www.nautili.ai/pricing/inference), [vs OpenRouter](https://www.nautili.ai/compare/openrouter), [vs Portkey](https://www.nautili.ai/compare/portkey), [Claude Code cost](https://www.nautili.ai/blog/claude-code-cost), [open-source LLM gateways](https://www.nautili.ai/blog/open-source-llm-gateways), plus robots.txt, llms.txt and sitemaps (crawled 12 Nov 2026)
- Duplicate example: [nautili.ai copy](https://www.nautili.ai/blog/kubernetes-cost-optimization-tools-2026) vs [devzero.io original](https://www.devzero.io/blog/kubernetes-cost-optimization-tools-2026)
- Market and funding (secondary sources, verify before quoting): [OpenRouter Series B analysis](https://newmarketpitch.com/blogs/news/openrouter-series-b-analysis), [AI Insiders on OpenRouter's $1.3B valuation](https://aiinsiders.net/article/openrouter-doubles-to-dollar13b-valuation-as-multi-model), [Nadir on AI routing funding](https://getnadir.com/blog/250m-ai-routing-funding-mandatory-infrastructure/), [Kosmoy Portkey vs OpenRouter](https://www.kosmoy.com/resources/blog/portkey-vs-openrouter/), [LLM gateway market report](https://growthmarketreports.com/report/llm-gateway-market)
- Search landscape: [Requesty](https://www.requesty.ai/blog/litellm-vs-portkey-vs-openrouter-best-llm-gateway-2026), [LLMGateway.io OpenRouter alternatives](https://llmgateway.io/blog/openrouter-alternatives), [nexos.ai Portkey alternatives](https://nexos.ai/blog/portkey-alternatives/), [Dupple best LLM gateways](https://dupple.com/learn/best-llm-gateways), [Portkey OpenRouter alternatives](https://portkey.ai/alternatives/openrouter-alternatives)
