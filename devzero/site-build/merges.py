"""Changes our research makes to the seed data (colleague's roadmaps and plan).

Seed: seed/seed.json (tasks and content plans from the two roadmap workbooks,
keywords from the colleague's plan page). Everything here is applied on top.
"""

# ---------------------------------------------------------------- tasks
NEW_TASKS = {
    'devzero': [
        dict(area='Technical', priority='P0', impact='High', effort='1 day', hours=8, owner='DevZero eng', when='Week 1', status='Pending',
             task='Map the 47 legacy URLs that now redirect to /blog: restore the 9 with 100+ clicks (minikube-vs-kind-vs-k3s, nix-vs-docker, docker-desktop and codespaces alternatives…), 301 the rest to the closest live page or return 410',
             why='They earned 3,623 clicks in 12 months (18% of all clicks) and hold 153 linking domains; a redirect to /blog counts as a soft 404',
             verified='21 Nov: all 47 still 308 to /blog (12-month Search Console export + live check); top 9 earned 3,018 clicks'),
        dict(area='On-page', priority='P0', impact='High', effort='4 hrs', hours=4, owner='SurgeX', when='Week 1', status='Pending',
             task='Rewrite titles and meta on the pricing guides (EKS, GKE, AKS, S3, AWS vs Azure vs GCP): current price in the title, a one-line answer, 2026',
             why='They hold 889k impressions a year at 0.25% CTR from positions 7–12',
             verified='eks-pricing still titled "(2025 Guide)": 238,509 impressions, 0.22% CTR over 12 months'),
        dict(area='Programmatic', priority='P1', impact='High', effort='4 hrs', hours=4, owner='DevZero eng', when='Week 2', status='Pending',
             task='Put the price in instance page titles, e.g. "g5.xlarge pricing: $1.006/hr, 4 vCPU, 16 GiB, A10G"',
             why='Instance pages have 2.46M impressions a year at 0.25% CTR; g5.xlarge alone 127,681 impressions and 73 clicks',
             verified='Template title "… — AWS EC2 Instance Pricing & Specs" carries no price'),
        dict(area='Technical', priority='P1', impact='Low', effort='1 hr', hours=1, owner='DevZero eng', when='Week 2', status='Pending',
             task='Redirect the 12 old docs URLs that land on the /docs root to their matching pages',
             why='A redirect to a section root is a soft 404; these URLs still have impressions',
             verified='21 Nov: e.g. /docs/k8s-automation and the Azure DNS and database guides 308 to /docs'),
        dict(area='Content', priority='P2', impact='Medium', effort='3 days', hours=24, owner='SurgeX writers', when='Month 2', status='Pending',
             task='Glossary: 50 Kubernetes cost terms, each linked to the matching product page',
             why='Zesty runs 228 glossary pages; definitions are cheap traffic and get cited in AI answers',
             verified='/glossary returns 404'),
        dict(area='Programmatic', priority='P2', impact='Medium', effort='1 day', hours=8, owner='DevZero eng', when='Month 2', status='Pending',
             task='Improve the existing GPU pricing pages (/instances/gpu, /instances/gpu/h100) for "h100 price per hour"-type searches: cross-cloud price table and price history',
             why='GPU price searches are growing; the pages exist but "h100 costs" ranks #26',
             verified='/instances/gpu live ("GPU Cloud Pricing — Compare All GPU Models")'),
        dict(area='On-page', priority='P2', impact='Low', effort='15 min', hours=0.25, owner='DevZero eng', when='Week 2', status='Pending',
             task='Homepage canonical with a trailing slash; pricing H1 "over provisioned" → "overprovision"',
             why='Small consistency fixes on the two most-visited commercial pages',
             verified='23 Nov: canonical "https://www.devzero.io"; pricing H1 still says "over provisioned"'),
    ],
    'nautili': [
        dict(area='Product check', priority='P0', impact='High', effort='2 hrs', hours=2, owner='DevZero eng + SurgeX', when='Week 1', status='Pending',
             task='Test before writing integration pages: Claude Code routed to non-Anthropic models; Cursor with a custom base URL (chat vs agent mode); Cline, Roo Code, Kilo Code, OpenCode, OpenWebUI, LibreChat; MCP support',
             why='A page that promises a set-up that does not work loses trust and converts badly',
             verified='Not yet tested; Reddit reports Cursor restricted bring-your-own-key'),
        dict(area='Off-page', priority='P1', impact='High', effort='1 hr', hours=1, owner='DevZero', when='Week 2', status='Pending',
             task='Ask to be listed on the Claude Code docs "LLM gateway" page (code.claude.com)',
             why='That page ranks #2 for "claude code litellm"; an official listing is worth more than ranking for the keyword',
             verified='Lists LiteLLM today; Nautili absent'),
    ],
}

# field edits on existing seed tasks, by task number
TASK_EDITS = {
    'nautili': {
        15: dict(task='Compare pages: LiteLLM, Helicone, Kong, Cloudflare and Vercel AI Gateway first, then Requesty, Bifrost and TrueFoundry'),
        24: dict(verified='22 Nov: key events demo_booked, qualify_lead, close_convert_lead show no data in 28 days; only harness_download fires (2); form_start fires but no form submit. GA4 loads through DevZero\'s GTM by script, so a raw-HTML check does not show it'),
    },
    'devzero': {},
}

# ---------------------------------------------------------------- content plans
NEW_CONTENT = {
    'nautili': [
        dict(title='Claude Code Router: Open-Source Router vs a Managed Gateway', keyword='claude code router', volume=2900, type='Guide', priority='P1', status='Pending',
             note='Mostly searches for the open-source GitHub project; aim for positions 5–10. Upgrade /integrations/claude-code as the landing page; link /blog/claude-code-proxy'),
        dict(title='Best LLM Routers in 2026', keyword='llm router', volume=720, type='Listicle', priority='P1', status='Pending',
             note='Results are "best LLM routers" listicles; link /blog/llm-routing-profiles'),
    ],
    'devzero': [
        dict(title='EKS vs AKS vs GKE: Managed Kubernetes Compared', keyword='eks vs aks', volume=90, type='Post', priority='P2', status='Pending',
             note='Features and fit; link /blog/kubernetes-pricing for cost detail'),
        dict(title='Kubernetes Bin Packing: How It Works and What It Saves', keyword='kubernetes bin packing', volume=30, type='Post', priority='P2', status='Pending',
             note='Vendor explainers rank (Sedai); link /kubernetes-cost-optimization'),
    ],
}

# ---------------------------------------------------------------- keyword intent check
# What Google shows today (latest SERP snapshot) and what that means for the plan.
INTENT = {
    'nautili': {
        'claude code pricing': 'Anthropic holds the top 3; third parties (Finout) reach #4. Realistic: 4–10',
        'claude code cost': 'Pricing explainers and guides rank: a calculator fits',
        'cursor vs claude code': 'Opinion pieces and Reddit: top of funnel; needs original spend data',
        'codex cost': 'Codex pricing page, then explainers at #5–8: fits',
        'ai gateway': 'Vercel, IBM, Cloudflare: hard (difficulty 53)',
        'llm gateway': 'Partly navigational: llmgateway.io is a brand of the same name',
        'openrouter alternative': 'Comparison listicles: fits a listicle',
        'litellm alternative': 'Listicles; a Reddit thread on the LiteLLM supply-chain attack ranks #1: lead with security',
        'claude api pricing': 'claude.com, then explainers: fits a pricing page',
        'anthropic api pricing': 'Vendor first, explainers at #3–8: fits',
        'deepseek api pricing': 'Vendor first, then third-party breakdowns and OpenRouter at #4–7',
        'model compare': 'Tools own it (Artificial Analysis, OpenRouter): hard',
        'token cost calculator': 'Calculator tools: fits',
        'llm router': '"Best LLM routers" listicles and explainers: fits',
        'claude code proxy': 'Open-source proxies and Claude network docs: mixed',
        'llm proxy': 'LiteLLM docs #1, then explainers: fits a pillar section',
        'model routing': 'Explainers (Not Diamond, Hugging Face): fits',
        'claude code router': 'Mostly the open-source GitHub project: guide, not a buying query',
        'litellm': 'Navigational: compare page and ads, top 10 unlikely',
        'portkey': 'Navigational: compare page and ads',
        'helicone': 'Navigational: compare page and ads',
        'litellm vs openrouter': 'Comparison articles from both vendors: fits',
        'openrouter pricing': 'OpenRouter docs, then explainers at #3–5: fits',
        'claude code usage dashboard': 'Anthropic docs and open-source dashboards; Torii listicle ranks: pitch it',
        'claude code analytics': 'Anthropic docs first: pitch the listicles that rank',
        'claude code usage limits': 'Consumer-plan intent: a section, not a page',
    },
    'devzero': {
        'kubernetes cost optimization': 'Vendor pages and guides: fits',
        'kubernetes cost optimization tools': 'Vendor listicles: fits',
        'cast ai': 'Navigational: ads and compare page, top 10 unlikely',
        'scaleops': 'Navigational: ads and compare page, top 10 unlikely',
        'kubecost': 'Navigational: ads and compare page, top 10 unlikely',
        'sedai': 'Navigational: ads and compare page',
        'opencost': 'Navigational: ads and compare page',
        'perfectscale': 'Navigational: ads and compare page',
        'karpenter': 'Official docs top 3; vendor guides at #4–6',
        'keda': 'Official docs top 3; Zesty at #5',
        'eks auto mode': 'AWS docs and Reddit: comparison angle fits',
        'aks automatic': 'Microsoft docs, then explainers: fits',
        'opencost vs kubecost': 'Vendor comparisons (Cast AI, nOps, CloudZero): fits',
        'kubecost alternative': 'Vendor listicles: fits',
        'cast ai alternatives': 'Directories and vendor lists: fits a listicle',
        'eks pricing': 'AWS pricing, then guides; DevZero already #7',
        'gke pricing': 'DevZero already ranks; add a CTA',
        'aks pricing': 'Azure pricing, then guides; DevZero #8',
        'criu': 'Project docs and Wikipedia; DevZero #7–10',
    },
}

# ---------------------------------------------------------------- Search Console additions (12-month export)
GSC_FINDINGS_EXTRA = {
    'devzero': [
        ('Legacy URLs redirect to /blog', '47 URLs; 3,623 clicks and 875k impressions in 12 months (18% of clicks)', 'Restore the top 9, map the rest (P0)'),
        ('Pricing guides seen but not clicked', '889k impressions a year at 0.25% CTR, positions 7–12', 'Titles with prices and a one-line answer (P0)'),
        ('Instance pages: huge reach, low CTR', '2.46M impressions a year at 0.25%; g5.xlarge 127,681 impressions, 73 clicks', 'Price in the title (P1)'),
        ('US converts worst', '53% of impressions but 26% of clicks (CTR 0.17%)', 'US rankings on pricing terms are the upside'),
        ('Mobile ranks lower', 'Average position 13.2 on mobile vs 8.9 on desktop', 'Phone speed task (P1)'),
    ],
    'nautili': [],
}

# extra bullets for the "What changed and what's open" cards
WHAT_CHANGED_EXTRA = {
    'devzero': ['18% of the last 12 months\' clicks came from 47 old URLs that now redirect to /blog; restoring the top 9 protects about 300 clicks a month'],
    'nautili': ['Before writing integration pages, test what actually works (Claude Code to other models, Cursor with a custom base URL)'],
}

# ---------------------------------------------------------------- verification pass (23 Nov 2026)
# Intent check for every keyword taken from the colleague's plan (latest SERP snapshot per keyword).
NC = 'No results snapshot yet: not checked'
INTENT['nautili'].update({
    'aws bedrock pricing': 'AWS first, then explainers (CloudForecast, Caylent): fits the Bedrock provider page',
    'best llm for coding': 'Benchmark and ranking sites (BenchLM, DataCamp): fits only with original cost-per-PR data',
    'best llm gateway': 'Listicles (Orq, TrueFoundry, DigitalOcean, OpenRouter, Portkey): fits a listicle',
    'claude code max plan': 'Anthropic help pages and Reddit: consumer intent, a section only',
    'cloudflare ai gateway': 'Navigational: Cloudflare docs hold the top 4; compare page and ads',
    'codex pricing': 'ChatGPT pricing pages, then MindStudio #4: fits the comparison post',
    'cursor pricing': 'cursor.com #1, then Finout, nocode.mba, Vantage at #2–6: fits well',
    'cursor team pricing': 'Cursor docs dominate; third parties #3 and #6: a section fits',
    'gemini api pricing': 'Google first, Costgoat #3: fits the Google AI Studio provider page',
    'github copilot pricing': 'GitHub docs dominate; Finout #6: harder, comparison post only',
    'grok api pricing': 'xAI docs, then OpenRouter #4: fits the xAI provider page',
    'litellm proxy': 'Navigational: LiteLLM docs hold the top 3; a section on /compare/litellm',
    'llm api pricing': 'Price aggregators (pricepertoken, Costgoat, BenchLM, Helicone): fits one comparison table page',
    'llm cost': 'Per-token price calculators and aggregators: fits the pricing table and calculator, not the spend page',
    'llm guardrails': 'Datadog, Guardrails AI, LangChain guides: fits the existing guardrails guide',
    'llm observability': 'Datadog, Langfuse, IBM: competitive; the existing post fits',
    'llm routing': 'Open-source library, Braintrust listicle, AWS: the existing post fits',
    'openai api pricing': 'OpenAI first, then calculators at #2 and #4: fits the OpenAI provider page',
    'openai compatible api': 'OpenAI, Modular and Gemini docs: fits a docs page (one exists)',
    'openai usage dashboard': 'Navigational: people want OpenAI\'s own dashboard; weak fit',
    'token cost': 'Token price indexes and calculators: fits the calculator',
    'vercel ai gateway': 'Navigational: Vercel holds the top results; compare page and ads',
    'windsurf pricing': 'Windsurf/Devin first, explainers at #4–6: fits the comparison post',
    'kong ai gateway': NC, 'llm cost tracking': NC, 'llm pricing comparison': NC, 'portkey alternative': NC,
})
INTENT['devzero'].update({
    'aws cost optimization': 'AWS\'s own pages hold most of the top 5; Flexera, CloudZero: long-term only',
    'aws s3 pricing': 'AWS first, then Cloudchipr, CloudZero guides: the existing post fits',
    'aws spot instances': 'AWS docs hold most of the top 6: hard',
    'cast ai pricing': 'Cast AI\'s own pages, then software directories and nOps: fits a post',
    'cloud cost optimization': 'Definitions (Oracle, IBM, Akamai) and tool lists: broad, top-50 only',
    'cluster autoscaler': 'GitHub and AWS docs; ScaleOps #6: refresh fits',
    'crashloopbackoff': 'Vendor troubleshooting guides (Sysdig, groundcover): fits, weaker link to rightsizing',
    'eks cost optimization': 'AWS docs, then vendors; DevZero already #4',
    'eks vs aks': 'Comparisons from Qovery, Sedai, SentinelOne: fits',
    'finops': 'Definitional: finops.org and "what is FinOps" pages; not a target',
    'goldilocks kubernetes': 'Navigational to the Fairwinds tool: a comparison post can rank lower',
    'gpu utilization': 'Mixed (gaming and data-centre): the existing post fits for the Kubernetes angle',
    'horizontal pod autoscaler': 'kubernetes.io and AWS docs dominate: hard',
    'hpa vs vpa': 'Reddit, ScaleOps #4, nOps: fits a section',
    'karpenter consolidation': 'karpenter.sh docs top 3, CloudBolt #4: a section fits',
    'karpenter vs cluster autoscaler': 'ScaleOps #1, nOps #2: refresh fits',
    'kubecost pricing': 'IBM/Apptio, then nOps and Finout explainers: fits a section',
    'kubernetes autoscaling': 'kubernetes.io dominates: hard; use the existing post as the hub',
    'kubernetes bin packing': 'kubernetes.io, then explainers incl. Sedai: fits',
    'kubernetes cost': 'Official GKE/AKS pricing pages and Reddit: mixed',
    'kubernetes gpu': 'kubernetes.io and NVIDIA docs: hard',
    'kubernetes hpa': 'kubernetes.io dominates: hard; refresh the existing post',
    'kubernetes resource limits': 'kubernetes.io, then Zesty #4 and ScaleOps #5: fits the existing post',
    'llm inference cost': 'API cost comparisons: closer to Nautili than DevZero',
    'nvidia gpu operator': 'NVIDIA docs, then Spectro Cloud #4: a set-up guide fits',
    'oomkilled': 'Troubleshooting guides (Komodor #2, Fairwinds): fits',
    'vertical pod autoscaler': 'kubernetes.io and GitHub, Reddit #4: refresh the existing post',
    'vllm': 'Navigational to vLLM: not a target',
    'vllm kubernetes': 'vLLM docs, CNCF, ScaleOps #4: fits a new post',
    'vpa kubernetes': 'kubernetes.io, Reddit, Kubex #5: same page as "vertical pod autoscaler"',
    'finops tools': NC, 'in place pod resize': NC, 'pod rightsizing without restart': NC, 'scaleops alternative': NC,
})

# Keyword plan corrections where their item failed the intent or page-existence check.
KEYWORD_EDITS = {
    'nautili': {
        'llm cost': dict(plan='Target with the LLM API pricing table and calculator; keep /features/spend-attribution for "llm cost tracking"', now='Changed after the intent check'),
        'openai usage dashboard': dict(plan='A section on /features/spend-attribution; no new landing page', now='Downgraded: mostly navigational to OpenAI'),
        'llm guardrails': dict(plan='Refresh /guides/govern-llm-traffic-with-guardrails; no new post', now='Guide exists'),
        'openai compatible api': dict(plan='Retitle the existing Chat Completions docs page ("OpenAI-compatible wire") toward "OpenAI-compatible API"', now='Docs page exists'),
        'llm api pricing': dict(plan='One pricing comparison table page, shared with "llm pricing comparison"'),
    },
    'devzero': {
        'kubernetes resource limits': dict(plan='Refresh /blog/kubernetes-resource-requests-and-limits (4,317 words); no new guide', now='Post exists'),
        'kubernetes autoscaling': dict(plan='Make /blog/kubernetes-autoscaling the autoscaling hub', now='Post exists'),
        'hpa vs vpa': dict(plan='Section in /blog/kubernetes-autoscaling'),
        'aws spot instances': dict(plan='No spot post exists: point to the /spot-instances hub and add a spot section to the EC2 pricing post', now='No post (404)'),
        'aws cost optimization': dict(plan='No AWS cost post exists; AWS holds most of the top 5. Long-term only', now='No post (404)'),
        'finops': dict(plan='Not a target: definitional searches owned by finops.org'),
        'kubernetes gpu': dict(plan='Use /kubernetes-gpu-optimization as the GPU hub', now='Product page exists'),
    },
}

CONTENT_EDITS = {
    'nautili': {18: dict(title='LLM Guardrails: Budgets, Rate Limits and PII Rules (refresh)', type='Refresh',
                         note='Refresh /guides/govern-llm-traffic-with-guardrails, which exists; link /blog/llm-governance. No new post')},
    'devzero': {},
}

# Items from our plan that had not flowed in
NEW_TASKS['devzero'].append(dict(area='Tracking', priority='P1', impact='Low', effort='1 hr', hours=1, owner='SurgeX', when='Week 2', status='Pending',
    task='Verify devzero.io in Bing Webmaster Tools, submit the sitemap and turn on IndexNow for new posts',
    why='Bing feeds ChatGPT search and Copilot answers', verified='Not checked'))
NEW_TASKS['nautili'].append(dict(area='Tracking', priority='P1', impact='Low', effort='1 hr', hours=1, owner='SurgeX', when='Week 2', status='Pending',
    task='Verify nautili.ai in Bing Webmaster Tools, submit the sitemap and turn on IndexNow for new posts',
    why='Bing feeds ChatGPT search and Copilot answers', verified='Not checked'))
TASK_EDITS['devzero'][20] = dict(task='301 the ~25 real 404 URLs (e.g. /what-is-cast-ai and /what-is-sedai to their compare pages, /vs/what-is-coder, /inference-platform, 16 instance family pages)')
NEW_CONTENT['nautili'] += [
    dict(title='LLM Proxy vs LLM Gateway: When You Need Which', keyword='llm proxy', volume=390, type='Post', priority='P1', status='Pending',
         note='LiteLLM docs #1, then explainers; link the gateway pillar'),
    dict(title='State of AI Coding Spend (from anonymised gateway data)', keyword='link magnet', volume=None, type='Report', priority='P1', status='Pending',
         note='Needs anonymised gateway spend data; pairs with the DevZero waste report'),
]

TARGETS = {
    'nautili': [('Referring domains', '6', '40–60', '—'), ('Listings live (marketplaces, review sites, directories)', '0', '25+', '—'),
                ('Provider listings in coding tools', '0', '2–4', '—'), ('Tier 1 keywords in top 20 / top 10', '0 / 0', '8 / 4', '—'),
                ('Non-brand search clicks a month (bot queries excluded)', '~10', '300–800', '1,500–7,000 (all traffic)')],
    'devzero': [('Search clicks a month', '~2,100', '2,600–2,900', '3,500–6,000'), ('Cannibalising clusters merged', '0 of 4', '3', '4'),
                ('Product pages with no in-content links', '13', '0', '0'), ('Legacy URLs mapped (of 47)', '0', '47', '47')],
}
INTENT['devzero']['aks / gke / eks cost optimization'] = 'Cloud docs first, then vendor guides; DevZero already #4–8 with no clicks: titles are the fix'
INTENT['devzero']['link magnet'] = 'Not a search target: earns links and press'
INTENT['nautili']['link magnet'] = 'Not a search target: earns links and press'

# ---------------------------------------------------------------- client-ready text polish
# (pattern, replacement) applied to task / content / keyword text and to the rebuilt SEO sections.
POLISH = [
    (r'; reference audit: ', '; '), (r'Reference audit: ', ''),
    (r'No results snapshot yet: not checked', '—'),
    (r', so our 20 Nov raw-HTML check missed it', ''),
    (r' \(not ~1,080 as we reported 18–20 Nov\)', ''),
    (r'Changed after the intent check', '/features/spend-attribution live'),
    (r'Downgraded: mostly navigational to OpenAI', '—'),
    (r'from the audits, the SEO deep dive and Search Console', 'from our audits and Search Console'),
    (r'US monthly searches, Google Ads via DataForSEO, 12-month average, pulled 20 Nov 2026\. ', 'US monthly searches, 12-month average. '),
    (r' \(latest results snapshot, Jul–Nov 2026\)', ''),
    (r'See Search Console tab', 'See the Search Console tab in the workbook'),
    (r'Brand search demand from Google Ads via DataForSEO \(US, 12-month average, 20 Nov 2026\)\. We have not run a full site audit on these yet\.', 'Brand searches: US, 12-month average.'),
    (r' Source: reference SEO deep dive \(Nov 2026\), checked against Google on 23 Nov\.', ''),
    (r'^Not checked$', '—'),
]
POLISH.append((r', so a raw-HTML check does not show it', ''))
