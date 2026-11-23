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
