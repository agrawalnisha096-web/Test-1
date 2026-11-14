# DevZero (devzero.io): SEO, Competitor & Market Analysis

*Prepared 12 Nov 2026. Based on a live crawl of devzero.io (robots.txt, sitemaps, on-page tags), competitor sitemaps and homepages, live search results, and **DataForSEO data pulled 12 Nov 2026** (Labs rankings and traffic estimates, Google Ads search volumes, Backlinks; US unless stated). Full data: `seo-data-findings.md` and `data/`.*

> **Data note:** Traffic, ranking, volume and backlink figures come from DataForSEO (12 Nov 2026). Traffic is DataForSEO's modelled US estimate (ETV), useful for comparing domains but not a substitute for analytics. **Search Console is not connected yet** (see `seo-data-findings.md` §1 for the access needed).

### Search data at a glance (US, DataForSEO)
| Metric | devzero.io | Cast AI | Zesty | Sedai | ScaleOps | PerfectScale |
|---|---:|---:|---:|---:|---:|---:|
| Ranking keywords | **1,013** | 10,369 | 1,660 | 1,514 | 239 | 574 |
| Keywords in top 10 | **455** | 406 | 553 | 371 | 119 | 86 |
| Est. organic visits/mo | **821** | 1,692 | 1,081 | 754 | 484 | 456 |
| Referring domains | **526** | 3,665 | 1,174 | 873 | 558 | 820 |

- **77% of DevZero's search traffic comes from the instance pages** (746 keywords, ETV 636). The blog brings 69; the money pages bring almost nothing (`/kubernetes-cost-optimization` ranks #59 for its own term).
- **Its real search competitors are cloud-pricing sites** (CloudZero, Vantage, cloudprice.net, Economize, CloudOptimo, Holori), not the K8s vendors.
- **27 legacy CDE-era URLs holding 153 referring domains** redirect to `/blog` or return 404 (see issue #1).

---

## 1. Who DevZero is today

| | |
|---|---|
| **What they sell** | Autonomous Kubernetes and AI workload optimisation: live rightsizing of CPU, memory and GPU with no pod restarts (uses CRIU checkpoint/restore plus in-place resize), cost-aware scheduling and binpacking, node autoscaling, cost monitoring, and an LLM inference router/cache (beta). |
| **Homepage title** | "Cut Kubernetes Cloud Spend with Live Rightsizing \| DevZero" |
| **H1** | "Autonomously optimize Kubernetes and AI" |
| **Main claims (vendor-reported)** | 30–60% lower compute bill within 2 weeks; install in under 45 seconds; $0 upfront |
| **Pricing** | Free monitoring tier; optimisation at **$5/CPU/month** (up to 20k cores); Enterprise custom. Messaging: "DevZero doesn't tax your savings", aimed at the % of savings model used by some competitors. |
| **Proof** | Databahn (75% AWS saving), Fi Money, Personality Pool, OpenObserve; SOC 2 Type II, CNCF Silver, NVIDIA Inception, AWS Marketplace |
| **Company** | Seattle-based, founded by ex-Uber engineers; raised $26M in Jan 2023 (Foundation Capital seed, Anthos Capital Series A). No new round found. |

### The pivot is the most important SEO fact
DevZero started out as a **cloud development environment (CDE)** company competing with Codespaces, Gitpod and Coder. In 2025 it **pivoted to Kubernetes cost optimisation**. The domain's history, backlinks (2023 funding press in GeekWire and SiliconANGLE) and early content were all about developer environments. The site has been rebuilt for the new positioning, but **leftovers from the CDE era are still visible to Google and to AI answer engines** (see section 3).

---

## 2. Site inventory (from the XML sitemaps)

| Sitemap | URLs | What's in it |
|---|---:|---|
| `instances.xml` | **5,223** | Programmatic pages, one per cloud instance type (e.g. `/instances/aws/t3.nano`) with price, specs, FAQ and breadcrumb schema |
| `pages.xml` | 143 | Product/solution pages, 11 `/compare/*` pages, 6 case studies, ~70 docs pages, guides, events |
| `spot-instances.xml` | 106 | Spot availability pages |
| `blog.xml` | 67 | Blog posts (oldest Dec 2024, newest Oct 2026) plus 8 category pages |
| **Total** | **~5,540** | About 94% of indexable URLs are programmatic instance and spot pages |

**Free tools** (good for links and top-of-funnel traffic): Analyze Cluster (`npx devzero@latest analyze-cluster`), Browse/Compare Instances, GPU Pricing, Spot Availability, AWS and Azure pricing calculators.

---

## 3. Technical & on-page SEO audit

### What's working
- **Clean crawl setup.** `devzero.io` redirects with a 308 to `www.devzero.io`. `robots.txt` blocks only app routes (`/api`, `/auth`, `/dashboard`…). The sitemap index is declared.
- **Server-rendered HTML.** Titles, meta descriptions, canonicals and body copy are all in the initial HTML, with no reliance on client-side rendering. Pages respond in about 0.2–0.6 seconds.
- **Self-referencing canonicals** on every page sampled.
- **Rich structured data.** Organization and FAQPage on the homepage; FAQPage on product and compare pages; BlogPosting with Person/Organization on posts; BreadcrumbList and FAQPage on instance pages.
- **Built for AI answer engines (AEO).** `robots.txt` explicitly allows GPTBot, ClaudeBot, PerplexityBot, Google-Extended and others, and the site publishes an `llms.txt`. That is ahead of most competitors.
- **Strong commercial-intent architecture.** Separate pages target money keywords: `/kubernetes-cost-optimization` (about 3.3k words, meta "Customers save 53% on average"), `/kubernetes-cost-monitoring`, `/kubernetes-gpu-optimization`, `/pod-rightsizing`, `/karpenter-optimization`, `/vpa`, `/solutions/aws-eks`, `/solutions/gcp-gke`, `/solutions/openshift`.
- **A complete set of "vs" pages:** Cast AI, Sedai, Kubecost, ScaleOps, PerfectScale, Komodor, VPA, HPA, KEDA, Karpenter, Cluster Autoscaler. Old `/vs/*` URLs correctly 308 to `/compare/*`.
- **Good showings in some live searches.** DevZero appeared in the results for *"kubernetes VPA alternative"* (positions 1 and 4), *"rightsizing without restarts / in-place pod resize"* (four DevZero URLs) and *"EKS cost optimization"*. DataForSEO shows these terms have **no measurable US volume**, though. The rankings that bring traffic are the pricing guides (GKE pricing #3, EKS pricing #7, AKS pricing #6–8) and the instance pages (455 keywords in the top 10).

### Problems to fix (highest impact first)

| # | Issue | Evidence | Fix |
|---|---|---|---|
| 1 | **Legacy CDE URLs redirect to `/blog`.** Google treats a redirect to an unrelated page as a soft 404, so the backlink value from the CDE era is lost. | `/blog/alternatives-to-github-codespaces`, `/blog/5-alternatives-to-docker-desktop`, `/blog/nix-vs-docker`, `/blog/minikube-vs-kind-vs-k3s` all 308 to `/blog`. They still appear in search results under the title "Kubernetes Cost optimization". **DataForSEO Backlinks: 27 of the 60 most-linked URLs are legacy redirects or 404s, holding 153 referring domains** (e.g. `/blog/best-developer-productivity-in-2024` 20, `/cloud-development-environment` 10, `/blog/5-alternatives-to-docker-desktop` 10). `/kubernetes-cost-optimization` still ranks for "codespace alternative" and "docker desktop alternative". | Check which old URLs have backlinks and redirect each to the closest relevant page. For example, `minikube-vs-kind-vs-k3s` → a Kubernetes guide, and `docker-desktop` → a dev-cluster cost post. Let the rest return a 410. Or bring back the high-link posts with a Kubernetes angle. |
| 2 | **`llms.txt` is out of date and contradicts the current positioning.** This matters because AI bots are explicitly invited in. | It describes "MicroVMs" and "Cloud Development Environment", and lists dead or redirected URLs: `/drafts/styleguide` (404), `/vs/what-is-coder` (404), `/build-time`, `/burstable-workloads`, `/videos`, `/kubecon` "North America 2024". | Regenerate it from the current sitemap with the current positioning (live rightsizing, GPU, inference). AI engines quote this file, so a small edit has a large effect. |
| 3 | **Off-topic CDE-era webinars are still indexed.** They weaken topical authority. | `/webinars/introduction-to-python-webinar`, `advanced-javascript-techniques`, `web-development-essentials`, `git-and-version-control`, `coding-best-practices`: about 155 words each, in the sitemap, with no noindex. | Remove and return a 410 (or noindex) and take them out of `pages.xml`. Keep only the GPU webinar. |
| 4 | **Stale years in titles** cut click-through on "2026" searches. | "EKS Cost Optimization Guide: Best Practices and Tips for **2025**", "Karpenter vs. Cluster Autoscaler: How They Compare in **2025**". | Refresh the content and update titles to 2026, along with the `dateModified` in the schema. |
| 5 | **Duplicate H1.** | `/blog/eks-cost-optimization` has two H1s; the second is an anchor-link duplicate ending in "#". | Fix the heading anchor component across the site so it doesn't render a second H1. |
| 6 | **Thin blog hub.** | `/blog` has about 154 words, one H2 and no schema. The H1 says "Kubernetes Resource Center" but the title says "Blog". | Turn it into a real hub: intro copy, topic clusters (Rightsizing, GPU, Autoscaling, EKS/GKE/AKS, Pricing) and links to the guides. |
| 7 | **Typo in the pricing H1.** | "Pay for what you use,not what you over provisioned" | Change to "Pay for what you use, not what you overprovision." |
| 8 | **Risk of thin content at scale on the 5.2k instance pages.** | Each page is about 626 words of mostly templated text. | Make each page unique: real price history, cross-cloud equivalents, "best Kubernetes node use", spot interruption rate, and links to the matching rightsizing content. Watch the Search Console "Crawled – not indexed" count. If it's high, prune or consolidate the long-tail SKUs. |
| 9 | **Canonical inconsistency (minor).** | The homepage canonical is `https://www.devzero.io` but the page is served at `/`. | Make it `https://www.devzero.io/`. |

---

## 4. Competitive landscape

### Who's in the market
**Automated optimisation (DevZero's direct competitors)**

| Competitor | Status / funding | Homepage positioning | Content footprint (sitemap URLs) |
|---|---|---|---|
| **Cast AI** | Market leader; about $272M raised including a $108M Series C (Apr 2025); about $850M valuation | "Kubernetes workloads, cloud and AI infrastructure, tuned together" | ~550: 303 posts, 87 press releases, 42 case studies, 29 webinars, "Automation Academy" |
| **ScaleOps** | $130M Series C (Insight Partners); about $800M valuation | "Autonomous Orchestration for AI Infrastructure" | ~160: 88 posts, 33 resources |
| **PerfectScale** (by DoiT) | Acquired by DoiT, Feb 2025 | "Kubernetes Cost Optimization & Rightsizing" | ~460: 253 blog posts, 102 team pages |
| **Zesty** | VC-backed | "Autonomous Kubernetes Optimization Platform" | ~590: 210 posts, **228 FinOps glossary** pages, 80 FinOps Academy pages |
| **Sedai** | VC-backed | "The Optimization Platform for Cloud & AI" | ~530 |
| **StormForge** (CloudBolt) | Acquired | "Kubernetes automation at the speed of trust" | Moved onto cloudbolt.io |
| **Komodor, Kubex/Densify, Spot/Flexera Ocean, Harness CCM** | Adjacent | Rightsizing as one feature of a broader platform | Large, established domains |

**Visibility/FinOps (they rank for "cost monitoring" keywords)**
- **IBM Kubecost** (IBM bought it in Sept 2024; now on apptio.com with 1,000+ URLs)
- **OpenCost** (CNCF open source)
- **Finout, CloudZero, Vantage, Amnic** (FinOps platforms that publish a lot of "best tools" listicles)

### How DevZero stacks up in SEO terms
1. **Content volume.** DevZero has 67 blog posts against 250–300 for Cast AI and PerfectScale, plus Zesty's 300+ glossary and academy pages. DevZero is 4–5× behind on editorial content. It makes up for this with 5k+ programmatic tool pages, which no direct competitor has on this scale. Those pages are why DevZero's estimated search traffic (821/mo US) is **already ahead of Sedai, ScaleOps and PerfectScale and about half of Cast AI's**.
2. **Domain authority.** DevZero has **526 referring domains** against 3,665 for Cast AI, 1,174 for Zesty and 873 for Sedai (similar to ScaleOps at 558). The most-linked pages are the homepage, case studies and CDE-era posts, so little of that authority reaches Kubernetes cost pages.
3. **The "best tools" listicle problem.** In live results for *"best Kubernetes cost optimization tools 2026"*, every result came from a vendor or aggregator (Cast AI, PerfectScale, Zesty, Finout, Amnic, Rackspace Spot, Metoro, CubeAPM, CostBench), and **DevZero did not appear in the results returned** (DataForSEO's latest snapshot: not in the top 84; the term has ~50 US searches/month). Each vendor ranks its own listicle, and **DevZero is often missing from competitors' lists**. That costs it both SEO visibility and AI-answer citations, because LLMs build their recommendations from these lists.
4. **Alternative searches.** *"Cast AI alternatives"* is dominated by directories (Capterra, GetApp, G2, Gartner, AlternativeTo, SaaSHub, Toolradar). Getting listed and reviewed there is the way to show up for these searches. Volumes are small: about **100 US searches/month** across all alternatives/vs/pricing queries, against about 8,000 for the competitors' brand names themselves (cast ai 1,900, komodor 1,900, scaleops 1,300, kubecost 880).
5. **Differentiation is clear and searchable.** "No restarts" (CRIU live migration), GPU rightsizing and sharing, flat $/CPU pricing instead of a share of savings, and inference routing. Native Kubernetes in-place resize going GA in v1.35 makes "rightsizing without restarts" a hot topic. Cast AI, ScaleOps, Zesty, Komodor and PerfectScale all now claim in-place resize, so DevZero needs to say clearly what CRIU adds beyond it (memory changes on cgroup v1, QoS class changes, node-to-node migration).

---

## 5. Market context

- **Market size (analyst estimates vary):** FinOps for Kubernetes is about **$1.4B (2025) → $1.7B (2026)**, a CAGR of about 26% (The Business Research Company). Broader cloud FinOps is about **$17B (2026) → $33B (2031)** (MarketsandMarkets).
- **The top buyer priority is waste reduction.** The FinOps Foundation's *State of FinOps 2026* again lists workload optimisation and waste reduction as the number one priority.
- **Demand is shifting to GPU and AI.** Reported GPU utilisation of about 5%, AWS raising GPU prices by about 15% in Jan 2026, and AI's growing share of cloud spend. Competitors are rebranding around AI infrastructure: ScaleOps ("AI Infrastructure"), Cast AI ("AI infrastructure"), Sedai ("Cloud & AI"), Finout ("Agentic Era"). DevZero's "Kubernetes **and AI**" positioning keeps pace.
- **Consolidation.** Kubecost went to IBM, PerfectScale to DoiT, StormForge to CloudBolt. Cast AI and ScaleOps are the well-funded independents. Content that offers "safe hands after an acquisition" (for example, *Kubecost alternatives after the IBM acquisition*, *PerfectScale alternatives*) targets buyers who are actively looking.
- **The search category is splitting into three groups:**
  1. Visibility/allocation ("kubernetes cost monitoring", "kubecost alternative")
  2. Automated rightsizing ("pod rightsizing", "VPA alternative", "in-place resize")
  3. Pricing research ("EKS pricing", "H100 price per hour", "c7g vs m7g")

  DevZero is the only vendor with **assets in all three**, thanks to its instance and GPU pricing database.

---

## 6. Keyword & content opportunities

| Cluster | Example target queries | US searches/mo (KD)* | DevZero asset today | Gap / action |
|---|---|---|---|---|
| **Category head terms** | kubernetes cost optimization, kubernetes cost optimization tools, k8s cost management | ~460 incl. rightsizing (KD 8); kubernetes cost optimization 90, #59 today | `/kubernetes-cost-optimization`, 2026 tools post | Get into third-party listicles; build links to these two URLs |
| **Rightsizing** | pod rightsizing, rightsizing without restarts, in-place pod resize, VPA alternative, VPA vs HPA | no measurable volume for pod rightsizing / in-place resize | Strong (`/pod-rightsizing`, `/vpa`, v1.35 post, VPA alternatives post) | Defend these. Add a "CRIU vs in-place resize" explainer with benchmarks |
| **Alternatives & vs** | cast ai alternatives, kubecost alternatives, scaleops vs cast ai, perfectscale alternatives | ~100 (KD 8); +8k for bare competitor brands | 11 `/compare/*` pages | Add `/alternatives/{competitor}` pages (a different search intent from "vs"), plus Zesty, Sedai-alternative, StormForge, Spot Ocean, Densify/Kubex, OpenCost |
| **Cloud-specific** | eks / gke / aks cost optimization, eks pricing, aks pricing | eks pricing 210 (#7), gke pricing 110 (#3), aks pricing 70 (#8), eks auto mode 880 (not ranking) | Posts and `/solutions/aws-eks`, `/solutions/gcp-gke` | Add `/solutions/azure-aks` and `/solutions/oci-oke`. Refresh the 2025 posts |
| **GPU / AI** | gpu utilization kubernetes, gpu sharing MIG time-slicing, llm inference cost, h100 price per hour | h100 price 1,900 (#26 for "h100 costs"), gpu utilization 480 (#25) | GPU guides, `/instances/gpu`, `/inference` | Build a live **"GPU price index"** page with monthly updates and a press-friendly chart. It's a link magnet against GMI Cloud, IntuitionLabs and FrenzyCap |
| **Programmatic pricing** | `{instance} pricing`, `{a} vs {b}`, `{instance} spot price` | ~41.5k sampled head terms (KD 25) + ~90k long tail already ranking; us-east-1 terms ~33k at #16–18 | 5.2k instance pages, compare tool | Make the pages more unique; add indexable `/instances/compare/{a}-vs-{b}` for the most-searched pairs |
| **FinOps education (top of funnel)** | what is kubernetes rightsizing, requests vs limits, binpacking | autoscaling education ~10.5k (KD 23): keda 3,600, karpenter 1,900, hpa 720 | Some posts | A glossary like Zesty's (about 50 terms to start), linked to product pages |
| **Brand / AEO** | "devzero vs cast ai", "is devzero good", "devzero pricing" | devzero 390 (2,400 worldwide) | Compare pages and pricing | Fix `llms.txt`; get G2, Gartner Peer Insights and Capterra reviews; get on the Reddit (r/kubernetes) and CNCF landscape listings that LLMs cite |

*DataForSEO, US, 12 Nov 2026; variant-deduped. Cluster detail and difficulty in `seo-data-findings.md` §3–4.*

**What the data shows:** the bottom-of-funnel terms are small (about 460 US searches/month combined), so they should be won for conversion rather than counted on for traffic. The volume sits in pricing and instance lookups and in autoscaling education, where DevZero already ranks. The biggest traffic opportunities are the region and instance pages (47 keywords with ≥200 searches each sit at positions 11–30), a GPU price index, and KEDA / Karpenter / EKS Auto Mode guides.

---

## 7. Prioritised action plan

**Next 30 days (quick technical wins)**
1. Regenerate `llms.txt` (remove MicroVM/CDE wording and dead URLs).
2. Redirect legacy CDE posts to relevant pages instead of `/blog`; return a 410 for the rest. Start with the 27 linked URLs in `data/devzero-linked-pages.csv` (153 referring domains).
3. Remove or noindex the off-topic Python/JS/Git webinars.
4. Fix the duplicate H1 component, the pricing H1 typo, the homepage canonical trailing slash, and "2025" titles.
5. Expand the `/blog` hub into a topic-cluster page.

**30–90 days (catch up on content and authority)**
6. Create `/alternatives/*` pages for Cast AI, Kubecost, ScaleOps, PerfectScale, Zesty and Spot Ocean.
7. Run a listicle-inclusion campaign: contact the authors of the "best K8s cost tools 2026" lists (Metoro, CubeAPM, CostBench, Rackspace, Amnic, Finout) and offer data, a demo or a free tier.
8. Build out review-site profiles (G2, Gartner, Capterra, TrustRadius) to win "alternatives" searches.
9. Launch a GPU price index plus an annual "State of Kubernetes Waste" report using anonymised `analyze-cluster` data. The 2026 tools post already cites "115 real production clusters", which is a strong original-data angle for links.

**90+ days (compounding growth)**
10. Grow to about 150 posts with a two-per-week cadence across the five clusters.
11. Improve the quality of the programmatic instance and region pages and add vs-pair pages. They carry 77% of current search traffic, and `us-east-1` alone has ~33k US searches/month at positions 16–18.
12. Publish a glossary and an academy-style learning track.
13. Track citations in AI answer engines (ChatGPT, Perplexity, Google AI Overviews) for "best kubernetes cost optimization tool" as a KPI next to rankings.

---

## Sources
- Search data: DataForSEO API v3 (Labs domain overview, ranked keywords, competitors, historical SERPs; Google Ads search volume; Backlinks summary), pulled 12 Nov 2026. See `seo-data-findings.md`.
- DevZero: [homepage](https://www.devzero.io), [pricing](https://www.devzero.io/pricing), [compare hub](https://www.devzero.io/compare), [vs Cast AI](https://www.devzero.io/compare/cast-ai), [launch post](https://www.devzero.io/blog/devzero-launches-autonomous-kubernetes-ai-compute-inference-platform), robots.txt, llms.txt and sitemaps (crawled 12 Nov 2026)
- Funding and pivot: [GeekWire 2023](https://www.geekwire.com/2023/former-uber-engineers-raise-26m-for-devops-startup-devzero/), [IT Brief](https://itbrief.com.au/story/devzero-launches-autonomous-kubernetes-rightsizing-platform), [Dealroom](https://dealroom.co/companies/devzero/)
- Competitor funding and M&A (secondary sources, verify before quoting): [ScaleOps $130M](https://www.woodenscale.ai/blogs/scaleops-funding-lands-130m-for-cloud-efficiency/), [Usage.ai Cast AI alternatives](https://www.usage.ai/blogs/finops/tools/cast-ai-alternatives/), [Kubernetes Guru 2026](https://kubernetesguru.com/kubernetes-cost-optimization-tools-2026/)
- Search landscape: [Cast AI listicle](https://cast.ai/blog/best-kubernetes-cost-optimization-tools/), [PerfectScale listicle](https://www.perfectscale.io/article/kubernetes-cost-optimization-tools-top-8-in-2026), [Zesty](https://zesty.co/blog/best-kubernetes-cost-optimization-tools-comparison-2026/), [Metoro](https://metoro.io/blog/kubernetes-cost-optimization-tools), [Finout](https://www.finout.io/blog/kubernetes-cost-management-tools), [Toolradar DevZero alternatives](https://toolradar.com/alternatives/devzero)
- Market: [FinOps for Kubernetes market](https://natlawreview.com/press-releases/finops-kubernetes-market-projected-grow-444-billion-2030), [MarketsandMarkets Cloud FinOps](https://www.marketsandmarkets.com/Market-Reports/cloud-finops-market-197106360.html), [FinOps Foundation](https://www.finops.org/wg/scaling-kubernetes-for-ai-ml-workloads-with-finops/)
