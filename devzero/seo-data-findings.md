# DevZero & Nautili: SEO Data Findings

*Pulled 12 Nov 2026 from DataForSEO API v3 (Labs, Google Ads Keywords Data, Backlinks). Location United States (2840), language English unless stated. Raw responses are in `data/raw/`; tidy tables are in `data/*.csv`/`*.json`. The figures in the two analysis files and one-pagers come from this report.*

> **How to read these numbers**
> - **Traffic = DataForSEO "ETV" (estimated traffic value in visits)**: modelled from each ranking × search volume × a CTR curve. It is US-only and usually *undercounts* real clicks (brand, long tail, non-US). Treat it as a like-for-like benchmark between domains, not as analytics.
> - **Search volumes** are Google Ads monthly averages (last 12 months) via DataForSEO Labs; Google Ads is used directly where Labs has no record. Low-volume terms are bucketed (10, 20, 30…) and noisy.
> - **Cluster totals are "addressable"**: close variants are collapsed (e.g. *kubernetes hpa* / *hpa kubernetes*, *price* / *pricing*), bare competitor brand names are counted separately (navigational, not capturable), and three noise terms were excluded (*requesty*, a misspelling bucket for "request" at 1M/month worldwide; *densify*, a common verb; *stormforge*, ambiguous). Each cluster is a sample of 23–25 representative head terms, so the totals are a **floor**, not the full long tail.
> - **KD** = DataForSEO keyword difficulty (0–100). "KD (weighted)" = volume-weighted average across the cluster.

---

## 1. Data sources

| Source | Status | Notes |
|---|---|---|
| Google Search Console | **Not accessible** | The service account `gsc-reader@gsc-access-513417.iam.gserviceaccount.com` has no access to devzero.io or nautili.ai. Adding it as a Restricted user on `sc-domain:devzero.io` and `sc-domain:nautili.ai` gives access to real clicks, impressions, queries and pages. |
| DataForSEO Labs: domain overview, ranked keywords, competitors | OK | 12 domains, US + worldwide for the two client sites |
| DataForSEO Backlinks summary | OK | 12 domains, plus referring domains for Nautili and most-linked pages for DevZero |
| Keyword volumes (Labs keyword_overview + Google Ads search_volume, US and worldwide) | OK | 188 keywords across 8 clusters; 21 not in Labs were filled from Google Ads |
| Who ranks now (SERPs) | OK | DataForSEO Labs SERP snapshots, the latest per keyword (Jul–Nov 2026). Nautili's domain was first seen on 13 Oct 2026, so older snapshots predate it. |

---

## 2. Where each site stands vs competitors (US)

| Domain | Ranking keywords | Top-10 keywords | Est. organic visits/mo (ETV) | Referring domains | Backlinks | Domain rank* |
|---|---:|---:|---:|---:|---:|---:|
| **devzero.io** | **1,013** | **455** | **821** | **526** | 5,018 | 272 |
| cast.ai | 10,369 | 406 | 1,692 | 3,665 | 20,651 | 355 |
| zesty.co | 1,660 | 553 | 1,081 | 1,174 | 4,276 | 262 |
| sedai.io | 1,514 | 371 | 754 | 873 | 5,081 | 279 |
| scaleops.com | 239 | 119 | 484 | 558 | 2,748 | 270 |
| perfectscale.io | 574 | 86 | 456 | 820 | 4,642 | 334 |
| **nautili.ai** | **0** | **0** | **0** | **6** | 10 | 51 |
| openrouter.ai | 7,941 | 4,287 | 61,871 | 23,362 | 1.38M | 564 |
| litellm.ai | 1,381 | 441 | 11,838 | 7,616 | 662k | 490 |
| truefoundry.com | 4,233 | 1,412 | 9,043 | 3,115 | 115k | 373 |
| portkey.ai | 1,794 | 367 | 3,344 | 3,027 | 37k | 348 |
| helicone.ai | 948 | 326 | 1,098 | 2,879 | 19k | 339 |

\*DataForSEO domain rank (0–1000, backlink-based authority).

### DevZero: mid-pack on traffic, carried by pricing pages
- **Traffic is comparable to direct competitors.** ~821 est. US visits/mo puts DevZero ahead of Sedai, ScaleOps and PerfectScale and at about half of Cast AI. Worldwide, DataForSEO finds another ~150 visits/mo (mostly India and the UK).
- **77% of that traffic comes from the programmatic instance pages** (`/instances/*`: 746 keywords, ETV 636, average position 12.8). Blog posts: 186 keywords, ETV 69. The homepage gets 111, mostly brand searches ("devzero" 390/mo US, 2,400/mo worldwide).
- **The money pages get essentially no search traffic.** `/kubernetes-cost-optimization` ranks **#59** for its own head term and gets ETV 0. Many of the 14 keywords it does rank for are CDE-era queries ("codespace alternative", "docker desktop alternative", "kasm alternative"), which confirms that old dev-environment URLs and signals were consolidated into it. `/pod-rightsizing`, `/vpa` and `/karpenter-optimization` do not appear in the US rankings at all.
- **Pricing guides are DevZero's best editorial content:** GKE pricing #3, EKS pricing #7, AKS pricing #6–8, "why is eks so expensive" #10.
- **Its real search competitors are cloud-pricing sites, not the vendors.** Labs `competitors_domain` (overlap of ranking keywords) ranks cloudzero.com (767 shared keywords), vantage.sh (681), cloudprice.net, economize.cloud, cloudoptimo.com, holori.com, bigbell.ai, aws-pricing.com and doit.com above any K8s-optimisation vendor. Cast AI is 25th (140 shared keywords).
- **Authority gap: 526 referring domains vs 3,665 for Cast AI.** Of the 60 most-linked DevZero URLs, **27 legacy CDE-era URLs holding 153 referring domains now 308 to `/blog` or 404** (e.g. `/blog/best-developer-productivity-in-2024` with 20 domains, `/cloud-development-environment` with 10, `/blog/5-alternatives-to-docker-desktop` with 10). Fixing these redirects is the cheapest authority win available. See `data/devzero-linked-pages.csv`.

### Nautili: not yet visible in search
- **No organic rankings** in DataForSEO's US or worldwide index, and not in the top ~70–100 for any of the 10 Nautili target keywords checked.
- **6 referring domains, all low-value** (getsafety.com, stackscope.dev, a few directory or spam-like sites; spam score 31). The domain was first seen by the crawler on **13 Oct 2026**. **No link from devzero.io** was found.
- Competitors have roughly 500 to 4,000 times as many linking domains (Portkey 3,027, OpenRouter 23,362). That makes the devzero.io → nautili.ai redirects and links (devzero.io has 526 referring domains) the single most important action.
- Labs `competitors_domain` for Portkey (used as a proxy, since Nautili has no rankings) shows the SERP neighbourhood is GitHub, dev.to, Hacker News, claude.com/anthropic.com, openai.com, TrueFoundry, OpenRouter, getmaxim.ai (Bifrost), llmgateway.io, apidog.com and artificialanalysis.ai.

---

## 3. Real cluster volumes vs the initial estimates

*"Initial estimate" is the directional figure in the first version of the one-pagers, made before any search data was available.*

### DevZero

| Cluster (one-pager row) | Initial estimate | **Real: US / worldwide per month (addressable)** | KD (weighted) | YoY (Sep 26 vs Sep 25) | Biggest terms (US/mo, KD) |
|---|---|---|---:|---:|---|
| K8s cost optimisation & rightsizing | 5–10k | **460 / 1,150** | 8 | −52% | kubernetes cost optimization 90 (0), kubernetes cost 70 (36), …tools 50 (0), kubernetes cost monitoring 50 (8). *pod rightsizing, in-place pod resize, kubernetes rightsizing: no measurable volume* |
| Autoscaling education (HPA, VPA, Karpenter) | 30–60k | **10,510 / 62,790** | 23 | −19% | keda 3,600 (16), karpenter 1,900 (44), eks auto mode 880 (4), kubernetes hpa 720 (9), criu 590 (18) |
| Cloud, instance & GPU pricing | 100k+ (long tail) | **41,510 / 203,050** in 25 sampled head terms, **plus ~90k** US volume across the 746 instance keywords DevZero already ranks for | 25 | −47%† | aws / azure pricing calculator 14,800 each (30/25), ec2 pricing 2,400 (27), h100 price 1,900 (21), m5 large 1,900 (0) |
| Competitor "vs" & "alternatives" | 1–3k | **100 / 420** for alternatives/vs/pricing intent; **8,010 US** for bare competitor brands (cast ai 1,900, komodor 1,900, scaleops 1,300, kubecost 880, …) | 8 | flat | kubecost pricing 40, kubecost alternatives 20, cast ai pricing 20, cast ai alternatives 10 |

†The pricing-cluster decline is mostly the two calculator terms; the GPU terms grew (h100 price 1,600 → 1,900).

**What changed:** the bottom-of-funnel head terms are about **10–20× smaller** than the initial estimate, and "alternatives" searches in this category are **tiny (~100/mo US)**. The volume is in education (KEDA, Karpenter, HPA) and, above all, **pricing and instance lookups**, which is exactly where DevZero already earns its traffic. The vs/alternatives pages are still worth having, because the few searches are the highest-intent ones and because AI assistants cite them, but they will not drive volume.

### Nautili

| Cluster (one-pager row) | Initial estimate | **Real: US / worldwide per month (addressable)** | KD (weighted) | YoY (Sep 26 vs Sep 25) | Biggest terms (US/mo, KD) |
|---|---|---|---:|---:|---|
| LLM gateway, AI gateway, LLM router | 10–20k | **10,000 / 41,960** (+6,180 US for Cloudflare/Vercel/Kong AI Gateway brand terms) | 31 | **+164%** | ai gateway 2,900 (53), mcp gateway 2,400 (20), llm gateway 1,600 (29), llm router 720 (18), llm observability 590 (19) |
| OpenRouter, Portkey & LiteLLM alternatives | 5–10k (rising) | **3,290 / 18,700** for alternative/vs/pricing intent; **173,610 US** for bare brands (openrouter 135k, litellm 27k, portkey 5.4k) | **7** | **+185%** | openrouter pricing 1,600 (12), openrouter alternative 880 (1), litellm alternatives 390 (0), litellm vs openrouter 260 (0). openrouter alternative grew 320 → 1,300 YoY |
| AI coding cost (Claude Code, Cursor, Codex) | 20–60k | **101,330 / 635,940** | 24 | +16% | claude code pricing 27,100 (30), claude pro price 14,800 (24), claude max 12,100 (0), cursor pricing 9,900 (21), codex pricing 8,100 (9), cursor vs claude code 8,100 (2) |
| Model API pricing (Claude, GPT, Gemini) | 100k+ (long tail) | **97,580 / 604,100** | 35 | +67% | claude pricing 40,500 (34), openai api pricing 12,100 (51), claude api pricing 8,100 (15), gemini pricing 8,100 (42), deepseek api pricing 3,600 (15) |

**What changed:** the category terms were about right, the alternatives cluster is smaller than estimated but **growing fastest and is the easiest to rank for (KD 7)**, and the AI-coding-cost cluster is **about 2× bigger** than the initial upper estimate. The two pricing clusters are large but dominated by vendor pages (claude.com, openai.com, cursor.com) and Reddit, so a new domain will get a small share.

---

## 4. Top keyword opportunities

### DevZero

| Keyword | US vol/mo | KD | DevZero now | Who ranks top 3 now | Action |
|---|---:|---:|---|---|---|
| east-1 / east 1 / us-east1 (region page) | 14,800 + 14,800 + 3,600 | 5–13 | #16–18 (`/instances/aws/regions/us-east-1`) | aws.amazon.com and docs | Biggest single upside: enrich region pages (price index by region, latency, instance availability) and link to them internally |
| h100 price / h100 costs | 1,900 / 1,000 | 14–21 | #26 (`/instances/gpu/h100`) | reddit, silicondata.com, jarvislabs.ai | GPU price index page with monthly updates |
| karpenter (+ karpenter kubernetes, helm chart) | 1,900 + 480 + 260 | 20–45 | #22–29 (`/blog/karpenter-guide`) | karpenter.sh, AWS docs, GitHub | Refresh the guide (2026, EKS Auto Mode), add a diagram and a comparison table |
| keda | 3,600 | 16 | not in top 90 | keda.sh, GitHub, CNCF, Microsoft, zesty.co #5 | New KEDA guide (Zesty proves a vendor can rank) |
| eks auto mode | 880 | 4 | not in top 99 | AWS, Reddit, Pulumi, CloudBolt #6, Zesty #10 | New post: EKS Auto Mode vs Karpenter, with cost |
| m5 large and other instance terms | 1,900 | 0 | #31 | AWS, instances.vantage.sh, CloudZero advisor | Make instance pages more unique (price history, equivalents) |
| eks / aks / gke pricing | 210 / 70 / 110 | 0–8 | #7 / #8 / #3 | AWS/Azure docs, cloudchipr, cloudzero, sedai | Defend; refresh years and add calculators |
| kubernetes cost optimization | 90 | 0 | #59 | cast.ai, apptio.com, cloudbolt.io | Rebuild the page for this intent; remove CDE-era signals; build links |
| kubernetes cost optimization tools | 50 | 0 | not in top 84 | scaleops.com, spot.rackspace.com, cast.ai | Listicle inclusion and outreach; low volume but feeds AI answers |
| kubecost alternatives / cast ai alternatives | 20 / 10 | 0 | not ranking | reddit, nops.io, cloudzero.com, perfectscale.io | Cheap pages; expect conversions, not traffic |

47 DevZero keywords with ≥200 US searches sit at positions 11–30 (49k combined volume). That is the "striking distance" list in `data/devzero-ranked-keywords-us.csv`.

### Nautili

| Keyword | US vol/mo | KD | Who ranks top 3 now | Action |
|---|---:|---:|---|---|
| openrouter alternative(s) | 880 (WW 4,400) | 1 | no snapshot yet (new term); for *openrouter pricing*: openrouter.ai, reddit, costgoat.com | Publish now: "OpenRouter alternatives after the Stripe deal", fee calculator |
| litellm alternatives / litellm vs openrouter | 390 / 260 | 0 | reddit, truefoundry.com, mlflow.org | Compare pages; KD 0, so ranks fast with a few links |
| openrouter pricing / fees | 1,600 / 70 | 12–24 | openrouter.ai, reddit, costgoat.com, truefoundry.com | Stand-alone fee calculator (4% vs 5.5%) |
| cursor vs claude code / claude code vs cursor | 8,100 / 6,600 | 0–2 | reddit, ksred.com, a Substack, builder.io | Data-led comparison using gateway spend data. Very low KD, high volume |
| codex pricing | 8,100 | 9 | (not checked) | Cost-per-developer page for Codex |
| claude code pricing / cost | 27,100 / 5,400 | 30–38 | claude.com, claude.ai, support.claude.com, finout.io #4 | Update `/blog/claude-code-cost` monthly; Finout proves a third party can reach #4 |
| claude api pricing | 8,100 | 15 | claude.com, reddit, metacto.com | Make model pages the best price comparison (cross-provider prices) |
| deepseek api pricing | 3,600 | 15 | (not checked) | Model page enrichment |
| llm gateway | 1,600 | 29 | llmgateway.io, GitHub, truefoundry.com | Pillar page + "best LLM gateways 2026" |
| mcp gateway | 2,400 | 20 | GitHub, konghq.com, truefoundry.com | Only if Nautili ships MCP gateway features. A fast-growing term |
| ai gateway | 2,900 | 53 | vercel.com, ibm.com, cloudflare.com | Hard; target via the pillar page over time |

---

## 5. Realistic 12-month traffic projection

**Method** (`data/projection.py`, output in `data/projection.json`):
1. Start from the addressable US volume per cluster in section 3.
2. Assume what share of that volume each site can realistically rank for, and the average position it reaches by month 12, in a **low** and a **target** scenario (target assumes the action plan is executed: redirects fixed, 2 posts/week, links from list outreach and data reports).
3. Convert position to clicks with a standard organic CTR curve: #1 28%, #2 15%, #3 10%, #4 7%, #5 5%, #6–7 3–4%, #8–10 2–2.5%, #15 1%, #20 0.5%.
4. For DevZero, add uplift on the existing instance-page long tail (current ETV 636 × 1.5 low / × 2.5 target), because the cluster samples don't cover those ~90k searches.
5. Add a small capture of competitor-brand searches through vs/alternatives pages (DevZero 0.5–1% of 8k; Nautili 0.1–0.3% of 174k).
6. Multiply by **1.5 (low) / 2.0 (target)** for non-US traffic. DataForSEO's ETV is US-only, and the worldwide volumes in these clusters are 3–6× US, so this is conservative.

| | Today (US ETV) | Month 12, US only | **Month 12, all markets** | Initial estimate |
|---|---:|---:|---:|---:|
| **DevZero** | 821 (≈1.2–1.6k all markets) | 1,240 – 2,290 | **≈1.9k – 4.6k visits/mo** | 20–50k |
| **Nautili** | 0 | 1,030 – 3,390 | **≈1.5k – 6.8k visits/mo** | 10–30k |

Key cluster assumptions (target scenario): DevZero autoscaling 60% of volume at avg #8, pricing head terms 40% at #8, rightsizing at #4, alternatives at #3. Nautili alternatives at #4, AI coding cost 50% at #7, model pricing 50% at #10, gateway 70% at #9.

**Why the projection is far below the initial estimates.** The initial figures assumed the bottom-of-funnel K8s terms had 5–10k/month of volume (they have ~460) and that a new domain could take a meaningful share of 100k+ pricing searches dominated by AWS, Anthropic and OpenAI. With real volumes, DevZero's realistic upside is roughly **2–3× today's traffic** in a year, mostly from pricing/instance pages and autoscaling education. For both sites, the commercial case should rest on lead quality (a DevZero customer is worth five to six figures a year), not on visit counts.

**What would move it higher:** the `us-east-1` region-page opportunity alone (~33k US searches/month at #16–18) is worth 1–2k visits/month if it reaches the top 5. For Nautili, a data-backed "Cursor vs Claude Code cost" page reaching the top 3 for ~15k searches/month would add ~1.5k visits/month.

**Validate in month 1:** once Search Console access is granted, replace the ETV baseline with real 90-day clicks and recalibrate the CTR assumptions.

---

## 6. Files in `data/`

| File | Contents |
|---|---|
| `domain-overview.csv` | Section 2 table: Labs overview plus backlinks summary for all 12 domains |
| `keyword-clusters.json` | The 188 keywords by site and cluster |
| `keyword-volumes.csv` | Per keyword: US volume (Labs, then Google Ads), US and worldwide Google Ads volume, KD, CPC, intent, class (addressable / brand / noise), variant group |
| `cluster-summary.json`, `cluster-yoy.json` | Cluster totals (raw and addressable) and Sep-2026 vs Sep-2025 trend |
| `devzero-ranked-keywords-us.csv` | All 1,013 US keywords devzero.io ranks for, with position, volume, KD and URL |
| `devzero-linked-pages.csv` | 60 most-linked devzero.io URLs, their HTTP status and referring domains |
| `serp-top20-summary.json` | Latest Labs SERP snapshot (top 20 domains) for 22 priority keywords |
| `projection.py`, `projection.json` | 12-month projection model and output |
| `build_cluster_table.py` | Rebuilds the keyword CSV and cluster summary from raw files |
| `gsc-access-check.json` | Search Console access result |
| `raw/` | Raw DataForSEO responses (large ones gzipped) |
