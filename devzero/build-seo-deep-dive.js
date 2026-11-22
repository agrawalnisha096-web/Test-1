// Nautili-first SEO deep dive (70% Nautili, 30% DevZero) + work items CSV.
// Usage: node build-seo-deep-dive.js <outDir>
const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType,
  ShadingType, BorderStyle, AlignmentType, LevelFormat, PageBreak, Footer, PageNumber,
} = require('docx');

const outDir = process.argv[2] || '.';
const FONT = 'Arial';
const NAVY = '24324A', ACCENT = '7A4FC4', LIGHT = 'F0EBF9', LINE = 'D6CCEA', GREY = '5B6B75';
const DZ = '2F7DBA', DZLIGHT = 'E8F1F8';
const M = 760;
const W = 11906 - 2 * M;
const sz = pt => Math.round(pt * 2);
const thin = { style: BorderStyle.SINGLE, size: 4, color: LINE };
const none = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };

const run = (text, o = {}) => new TextRun({ text, font: FONT, size: sz(o.pt || 9.5), bold: o.bold, color: o.color, italics: o.italics });
const rich = (s, o = {}) => String(s).split(/(\*\*[^*]+\*\*)/).filter(Boolean).map(t => t.startsWith('**') ? run(t.slice(2, -2), { ...o, bold: true }) : run(t, o));
const p = (s, o = {}) => new Paragraph({ children: typeof s === 'string' ? rich(s, o) : s, spacing: { after: o.after ?? 80, before: o.before ?? 0, line: o.line ?? 264 }, keepNext: o.keepNext });
const h1 = (t, c = ACCENT) => new Paragraph({ children: [run(t, { pt: 15, bold: true, color: NAVY })], spacing: { before: 140, after: 100 }, border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: c, space: 2 } }, keepNext: true });
const h2 = (t, c = ACCENT) => new Paragraph({ children: [run(t, { pt: 11.5, bold: true, color: c })], spacing: { before: 200, after: 80 }, keepNext: true });
const bullet = s => new Paragraph({ children: rich(s), numbering: { reference: 'b', level: 0 }, spacing: { after: 50, line: 260 } });
const num = s => new Paragraph({ children: rich(s), numbering: { reference: 'n', level: 0 }, spacing: { after: 50, line: 260 } });
const note = s => p(s, { pt: 8, color: GREY, before: 40, after: 60 });
const pageBreak = () => new Paragraph({ children: [new PageBreak()] });
function grid(rows, fracs, o = {}) {
  const ws = fracs.slice(0, -1).map(f => Math.floor(W * f));
  ws.push(W - ws.reduce((a, b) => a + b, 0));
  return new Table({
    width: { size: W, type: WidthType.DXA }, columnWidths: ws,
    rows: rows.map((r, i) => new TableRow({
      tableHeader: i === 0, cantSplit: true,
      children: r.map((t, j) => new TableCell({
        width: { size: ws[j], type: WidthType.DXA },
        shading: i === 0 ? { fill: o.light || LIGHT, type: ShadingType.CLEAR, color: 'auto' } : undefined,
        borders: { top: thin, bottom: thin, left: thin, right: thin },
        margins: { top: 40, bottom: 40, left: 80, right: 80 },
        children: String(t).split('\n').map(line => new Paragraph({
          children: rich(line, { pt: o.pt || 8.3, bold: i === 0 || (o.boldFirst && j === 0), color: i === 0 ? NAVY : undefined }),
          alignment: (o.right || []).includes(j) ? AlignmentType.RIGHT : undefined, spacing: { after: 0, line: 240 },
        })),
      })),
    })),
  });
}
function kpis(items, fill = LIGHT) {
  const kw = Math.floor(W / items.length);
  const white = { style: BorderStyle.SINGLE, size: 12, color: 'FFFFFF' };
  return new Table({
    width: { size: kw * items.length, type: WidthType.DXA }, columnWidths: items.map(() => kw),
    rows: [new TableRow({ children: items.map(([n, l]) => new TableCell({
      width: { size: kw, type: WidthType.DXA }, shading: { fill, type: ShadingType.CLEAR, color: 'auto' },
      borders: { top: none, bottom: none, left: white, right: white }, margins: { top: 90, bottom: 90, left: 80, right: 80 },
      children: [new Paragraph({ children: [run(n, { pt: 15, bold: true, color: NAVY })], alignment: AlignmentType.CENTER }),
        new Paragraph({ children: [run(l, { pt: 8, color: GREY })], alignment: AlignmentType.CENTER })],
    })) })],
  });
}
const space = (n = 60) => new Paragraph({ children: [], spacing: { after: n } });

// ---------- work items (also exported as CSV) ----------
// [id, site, area, task, owner, effort, week]
const WORK = [
  ['N1', 'nautili.ai', 'Positioning', 'Rewrite homepage title, H1 subline and meta description to name the category (LLM gateway) and the spend-control wedge', 'SEO + founder', 'S', 'Wk 1'],
  ['N2', 'nautili.ai', 'Technical', '301 the 39 duplicated Kubernetes posts to devzero.io; remove from blog.xml; change existing 307s to 308', 'Dev', 'S', 'Wk 1'],
  ['N3', 'nautili.ai', 'Technical', 'JSON-LD on the 89 pages without it: SoftwareApplication + Offer (home, pricing), HowTo/TechArticle (12 guides), FAQPage (integrations, features), Product/Dataset (models, providers)', 'Dev', 'M', 'Wk 1–2'],
  ['N4', 'nautili.ai', 'Technical', 'Fix duplicate H1 on 36 pages (heading anchor component); add meta descriptions to 16 pages', 'Dev', 'S', 'Wk 1'],
  ['N5', 'nautili.ai', 'On-page', 'Retitle /integrations/claude-code ("Claude Code | Nautili"); expand into a landing page for routing Claude Code through a gateway (after the product check in N20)', 'Content', 'S', 'Wk 1'],
  ['N6', 'nautili.ai', 'Internal links', 'Link every LLM post to /pricing/inference, /features/spend-attribution and the relevant /compare and /integrations pages; link model pages to compare pages and the fee calculator', 'Content + Dev', 'S', 'Wk 2'],
  ['N7', 'nautili.ai', 'On-page', 'Model and provider page titles: "<Model> API pricing: $in / $out per 1M tokens"; provider pages "<Provider> API pricing"', 'Dev', 'S', 'Wk 2'],
  ['N8', 'nautili.ai', 'Analytics', 'GTM container + GA4 key events (sign-up, key created, first request, demo, calculator use); filter tencent##### queries in reporting', 'Dev', 'M', 'Wk 1–2'],
  ['N9', 'both', 'Authority', '301 devzero.io/inference, /pricing/inference, /lp/inference to nautili.ai; "Nautili by DevZero" in devzero.io nav and footer; sameAs schema both ways', 'Dev', 'S', 'Wk 2'],
  ['N10', 'nautili.ai', 'New pages', 'Alternatives pages: OpenRouter, LiteLLM, Portkey (3)', 'Content', 'M', 'Wk 2–3'],
  ['N11', 'nautili.ai', 'New pages', 'Compare pages: LiteLLM, Requesty, Helicone, Bifrost, TrueFoundry, Cloudflare AI Gateway, Vercel AI Gateway, Kong (8)', 'Content', 'L', 'Wk 3–6'],
  ['N12', 'nautili.ai', 'New pages', 'Integration pages: Cursor (BYOK), Codex, Cline, Roo Code, Kilo Code, OpenCode, OpenWebUI, LibreChat, n8n, Gemini CLI (10)', 'Content', 'L', 'Wk 3–8'],
  ['N13', 'nautili.ai', 'Tools', 'Token / LLM cost calculator (new, per model); move the existing fee calculator out of /compare/openrouter into an "OpenRouter pricing and fees" page', 'Dev + Content', 'L', 'Wk 4–8'],
  ['N14', 'nautili.ai', 'New pages', 'Model vs model pages for the top 30 pairs (haiku vs sonnet, opus vs fable, gpt vs claude…) from the catalogue data', 'Dev + Content', 'M', 'Wk 5–8'],
  ['N15', 'nautili.ai', 'Content', 'Blog cohort 1 (8 pieces, see the cohort table): checked for intent and for overlap with existing posts', 'Content', 'L', 'Wk 2–6'],
  ['N16', 'nautili.ai', 'Off-page', 'Listings: G2, Capterra/GetApp, TrustRadius, SaaSHub, AlternativeTo, StackShare, Product Hunt, AWS Marketplace, Artifact Hub (Helm), Docker Hub', 'SEO', 'M', 'Wk 2–6'],
  ['N17', 'nautili.ai', 'Off-page', 'AI directories and comparison sites already listing 2+ competitors (Toolify, Toolradar, Toolscout, apis.io, Agentic Index, gatewayscore.com, llmpricing.dev, cheapestllmapi.com, selfhost.directory)', 'SEO', 'M', 'Wk 2–8'],
  ['N18', 'nautili.ai', 'Off-page', 'Become a listed provider: PRs or partner requests to Cline, Roo Code, Kilo Code, OpenCode, OpenWebUI, LibreChat, Continue, n8n, LangChain, Vercel AI SDK community providers', 'Dev + founder', 'L', 'Wk 3–12'],
  ['N19', 'nautili.ai', 'Off-page / GEO', 'Community: Show HN, Reddit (r/ClaudeAI, r/cursor, r/LocalLLaMA, r/LLMDevs) answers with data, LinkedIn posts from founders, outreach to "best LLM gateway" list authors', 'Founder + SEO', 'M', 'Ongoing'],
  ['N20', 'nautili.ai', 'Product check', 'Confirm before writing: Claude Code routed to non-Anthropic models; Cursor with a custom base URL (chat vs agent mode); Cline, Roo, Kilo, OpenCode, OpenWebUI, LibreChat with an OpenAI-compatible endpoint; MCP support', 'Product + SEO', 'S', 'Wk 1'],
  ['N21', 'nautili.ai', 'Off-page', 'Ask to be listed on the Claude Code docs "LLM gateway" page (code.claude.com, ranks #2 for "claude code litellm")', 'Founder', 'S', 'Wk 2'],
  ['D1', 'devzero.io', 'Cannibalisation', 'AKS: merge /blog/azure-kubernetes-service-pricing into /blog/aks-pricing (301); point the 31 internal links at /blog/aks-pricing', 'Content + Dev', 'S', 'Wk 1'],
  ['D2', 'devzero.io', 'Cannibalisation', 'Split intent: /blog/*-pricing = price; /blog/*-cost-optimization = how-to; /solutions/aws-eks, /gcp-gke = product. Retitle and cross-link EKS, GKE and AKS sets', 'Content', 'M', 'Wk 2–3'],
  ['D3', 'devzero.io', 'Cannibalisation', 'VPA: merge /vpa and /compare/vpa (same intent); keep /compare/vpa, 301 /vpa', 'Dev', 'S', 'Wk 1'],
  ['D4', 'devzero.io', 'Cannibalisation', 'Karpenter: /blog/karpenter-guide = what it is; /guides/karpenter-on-eks = setup; /karpenter-optimization = product; /compare/karpenter = vs. Retitle and interlink', 'Content', 'S', 'Wk 2'],
  ['D5', 'devzero.io', 'Cannibalisation', 'Merge near-duplicates: which-kubernetes-workloads-to-use → kubernetes-workload-types; GPU "Part 2/3/5" posts → GPU utilisation guide; two savings-plans posts into one', 'Content + Dev', 'M', 'Wk 2–4'],
  ['D6', 'devzero.io', 'Internal links', 'Contextual links into the 13 product pages with at most one in-content link (/pod-rightsizing, /vpa, /solutions/*, /product/*, /kubernetes-management…) from the top 20 posts', 'Content', 'M', 'Wk 2–3'],
  ['D7', 'devzero.io', 'Internal links', 'Link the 14 orphan posts (incl. aws-s3-pricing, azure-container-apps-pricing, kubernetes-pricing) from related posts and the blog hub', 'Content', 'S', 'Wk 2'],
  ['D8', 'devzero.io', 'Internal links', 'Link pricing posts to /tools calculators and /instances pages; link KEDA and Karpenter guides from autoscaling posts and compare pages', 'Content', 'S', 'Wk 2'],
  ['D9', 'devzero.io', 'Pruning', 'Decide on 5 vague product pages with no links and no impressions (/kubernetes-management, -infrastructure-platform, -infrastructure-operations, /product/multi-cloud, /product/kubernetes-monitoring): merge, link or noindex', 'SEO + founder', 'S', 'Wk 2'],
  ['D10', 'devzero.io', 'Technical', 'Legacy redirects (47 URLs, appendix of the audit), 404 fixes, llms.txt, titles with prices, 2025 → 2026 titles, duplicate H1 on 79 pages', 'Dev', 'M', 'Wk 1–2'],
];

const children = [
  p([run('Nautili and DevZero', { pt: 22, bold: true, color: NAVY })], { after: 20 }),
  p([run('SEO deep dive: positioning, buying-intent keywords, off-page, internal links and cannibalisation', { pt: 13, color: ACCENT })], { after: 60 }),
  p('Prepared 21 Nov 2026. Focus split: about 70% Nautili, 30% DevZero. Sources: Search Console exports, DataForSEO (keywords, competitor rankings, backlinks; US), and a crawl of all 373 sitemap pages on both sites plus competitor sitemaps on 21 Nov 2026. Task IDs in brackets (N1–N21, D1–D10) refer to the companion document "Nautili and DevZero: SEO work items".', { pt: 9, color: GREY, after: 140 }),

  h1('1. Summary'),
  kpis([['50+', 'low-difficulty buying-intent keywords picked for Nautili'], ['6 → 40+', 'Nautili referring domains: 3-month target'], ['13', 'DevZero product pages with at most one internal link'], ['4', 'DevZero topic clusters cannibalising each other']]),
  space(100),
  num('**Nautili does not say what it is.** Every competitor puts the category in the homepage title ("AI Gateway & LLM Router", "Open-Source LLM API Gateway", "LLM Proxy"). Nautili\'s title is "Inference, under control". Fixing the title and messaging around "LLM gateway" plus a spend-control angle is a one-day change with the biggest effect on relevance.'),
  num('**There is a real bottom-of-funnel opening.** "openrouter alternative" grew from 390 to 1,600 searches a month in a year at difficulty 0, and "litellm vs openrouter" from 110 to 590 (0); both show comparison listicles, which Nautili can write. "codex cost" grew from 390 to 1,300 (difficulty 10). "claude code router" (2,900, difficulty 6) looks attractive but mostly means an open-source GitHub project, so it is a guide opportunity, not a buying query (section 9).'),
  num('**Competitors grow through distribution as much as content.** Requesty has 20 integration pages, for Cline, Roo Code, Kilo Code, OpenCode, OpenWebUI, LibreChat, n8n and Codex, because those tools list it as a provider. Helicone runs 3,500 model-comparison pages; Maxim (Bifrost) runs 3,000 cost-calculator pages; LLMGateway has token and Copilot cost calculators and a glossary. Nautili has 2 compare pages and 1 integration page.'),
  num('**Off-page is close to zero.** 6 referring domains, all low value. Among the top 400 referring domains of each of Requesty, LLMGateway, Helicone and Portkey, 293 link to two or more of them; most are directories and comparison sites that take submissions.'),
  num('**DevZero\'s problem is internal structure, not content volume.** 13 product pages (pod rightsizing, VPA, EKS/GKE/OpenShift solutions, product pages) have at most one in-content link and almost no search impressions. AKS, EKS, GKE and Karpenter content is split across 2–5 URLs each. Internal links point at the weaker page: /blog/azure-kubernetes-service-pricing gets 31 links, /blog/aks-pricing (which ranks #8) gets 11.'),
  num('**A correction to the earlier audit:** DevZero already has a 5,620-word KEDA guide and a Karpenter-on-EKS guide (/guides). They do not rank because they have 1–2 internal links each, not because they are missing. They need links and refreshes, not rewrites.'),
  note('From the meeting notes: "governance" and "model routing profiles" are Nautili features, so they are covered under Nautili here. The competitor set used is OpenRouter, Portkey, LiteLLM, Bifrost (Maxim), Requesty, Helicone, TrueFoundry and LLMGateway.'),

  pageBreak(),
  h1('2. Nautili: positioning'),
  h2('2.1 How competitors describe themselves'),
  grid([
    ['Product', 'Homepage title', 'Headline'],
    ['OpenRouter', 'OpenRouter', 'The future is multi-model ("the unified interface for every model")'],
    ['Requesty', 'Requesty: AI Gateway & LLM Router for 600+ Models', 'The AI Gateway for Production'],
    ['LLMGateway.io', 'LLM Gateway — Open-Source LLM API Gateway for 250+ Models', 'One API for 40+ providers'],
    ['LiteLLM', 'LiteLLM — Open-Source AI Gateway & LLM Proxy', 'The AI Gateway for platform teams'],
    ['Bifrost (Maxim)', 'Enterprise AI Gateway Built for Scale', 'The Fastest Enterprise AI Gateway ("50x faster than LiteLLM")'],
    ['TrueFoundry', 'Enterprise AI Gateway', 'AI Gateway: Built-in Governance & Monitoring For Enterprises'],
    ['Helicone', 'AI Gateway & LLM Observability', 'Build Reliable AI Apps'],
    ['Portkey', 'Production Stack for Gen AI Builders', 'Portkey is now Prisma AIRS AI Gateway (Palo Alto Networks)'],
    ['**Nautili**', '**Nautili — Inference, under control**', '**Inference, under control.**'],
  ], [0.18, 0.42, 0.4], { boldFirst: true }),
  h2('2.2 Recommended positioning'),
  p('Everyone claims routing, failover and "one API". The open space is **spend control**: knowing which team, developer, tool or feature spent what, setting budgets, and routing to cheaper models without breaking quality. Nautili already sells this (spend attribution, budgets, routing profiles, 4% fee vs about 5.5% on OpenRouter, bring your own keys or GPUs, self-host). Use the words developers search: "LLM cost", "LLM spend", "AI coding spend", "cost per developer". Avoid "AI spend management": Google shows finance spend-management software (Zylo, Ramp, Concur) for it.'),
  grid([
    ['Element', 'Today', 'Recommended'],
    ['Title tag', 'Nautili — Inference, under control', 'Nautili: LLM Gateway for AI Spend Control and Model Routing'],
    ['H1', 'Inference, under control.', 'Keep as the line; add a sub-headline: "The LLM gateway that shows who spent what, and routes every request to the right model."'],
    ['Meta description', 'One gateway for all your LLM traffic…', 'One OpenAI-compatible endpoint for 500+ models. Attribute spend by team, developer and tool, set budgets, route to cheaper models. 4% fee, bring your own keys, self-host with Helm.'],
    ['Category word', 'Gateway, inference, harness used interchangeably', '"LLM gateway" everywhere (1,900 searches/month on average; 1,000 in Oct 2025, 2,400 in Oct 2026); "AI gateway" as a synonym in copy'],
    ['Proof points', 'Two logos, one quote', 'Fee comparison table vs OpenRouter, a spend screenshot, 3 customer numbers (e.g. "% of spend moved to cheaper models")'],
  ], [0.16, 0.3, 0.54], { boldFirst: true }),
  h2('2.3 Message pillars mapped to search demand'),
  grid([
    ['Pillar', 'Searches it can win (US/month, difficulty)', 'Page that owns it'],
    ['Route Claude Code, Cursor and Codex through one gateway', 'claude code router 2,900 (6; guide intent), claude code proxy 590 (18; existing post), cursor byok 320 (5; needs product check)', '/integrations/claude-code, /blog/claude-code-proxy, /integrations/cursor'],
    ['See and cap AI coding spend per developer', 'codex cost 1,600 (10), claude code analytics 170 (6), claude code usage dashboard 170 (16); existing claude-code-cost and cursor-cost-per-developer posts', '/features/spend-attribution, cost-per-developer posts'],
    ['A cheaper, independent OpenRouter or LiteLLM', 'openrouter alternative(s) 880, rising to 1,600 (0), litellm vs openrouter 320–590 (0), litellm alternatives 390 (0)', '/alternatives/openrouter, /alternatives/litellm, /compare/*'],
    ['Routing profiles and governance', 'model routing 320 → 880 (24), llm router 720 (18), ai router 1,000 (10), llm governance 50 (0)', '/blog/llm-routing-profiles, /blog/llm-governance, feature pages'],
    ['Know the real price of every model', 'deepseek api pricing 3,600 (15), anthropic api pricing 2,900 (20), kimi pricing 880 (8), groq pricing 590 (0), token cost calculator 210 (1)', '/models/*, /providers/*, cost calculator'],
  ], [0.26, 0.47, 0.27], { boldFirst: true }),

  h1('3. Nautili: buying-intent keywords to start with'),
  p('Selected from 2,792 relevant keywords that the eight competitors rank for (DataForSEO), plus a direct check of 100 gateway, spend and coding-agent terms. Filter: difficulty 20 or lower, clear buying or setup intent, and a page Nautili can credibly own. Full list in data/nautili-keyword-gap.csv.'),
  h2('3.1 Tier 1: build or fix in the first 6 weeks'),
  grid([
    ['Keyword', 'US/mo', 'KD', 'What Google shows', 'Nautili page', 'Exists?'],
    ['openrouter alternative(s)', '880 (1,600 in Oct 26)', '0', 'Comparison listicles + Reddit', 'Listicle at /alternatives/openrouter', 'No'],
    ['litellm vs openrouter', '320–590', '0', 'Comparison articles, both vendors', 'Neutral comparison post', 'No'],
    ['litellm alternatives', '390', '0', 'Listicles; LiteLLM supply-chain attack thread #1', '/alternatives/litellm (security angle)', 'No'],
    ['openrouter pricing / fees', '1,600 + 70', '12–24', 'OpenRouter docs, then TrueFoundry and Costgoat explainers', 'Pricing-and-fees page with the existing calculator', 'Calculator exists in /compare/openrouter'],
    ['codex cost', '1,600', '10', 'Codex pricing page, then third-party explainers at #5–8', 'Codex cost per developer post', 'No'],
    ['llm proxy', '390', '0', 'LiteLLM docs, explainers', 'Glossary / "LLM proxy vs gateway"', 'No'],
    ['llm router / model routing', '720 + 320', '18–24', '"Best LLM routers" listicles, explainers', 'Retarget /blog/llm-routing-profiles; routing feature page', 'Post exists'],
    ['claude code router', '2,900', '6', 'Open-source GitHub project #1; setup guides below', 'Guide: open-source router vs managed gateway', 'Integration page exists (thin)'],
    ['claude code proxy', '590', '18', 'Open-source proxies, Claude network docs', 'Existing post', 'Yes'],
    ['token cost calculator', '210', '1', 'Calculator tools', 'New calculator', 'No'],
    ['portkey alternatives / portkey vs litellm', '30 + 50', '0', 'Vendor comparisons', '/alternatives/portkey', 'No'],
  ], [0.2, 0.12, 0.06, 0.24, 0.24, 0.14]),
  h2('3.2 Tier 2: months 2–3'),
  grid([
    ['Group', 'Examples (US/month, difficulty)', 'Page type'],
    ['Model pricing (programmatic)', 'deepseek api pricing 3,600 (15), anthropic api pricing 2,900 (20), aws bedrock pricing 2,400 (13), kimi pricing 880 (8), groq pricing 590 (0), haiku pricing 320 (16), claude opus api pricing 590 (8)', 'Retitled model and provider pages (N7)'],
    ['Model vs model', 'opus 5 vs fable 5 2,400 (0), haiku vs sonnet 1,000 (0), fable vs opus 1,000 (0), model compare 1,000 (8), comparison of models 1,300 (9)', 'Programmatic /models/compare pages (N14)'],
    ['Coding-agent comparisons (top of funnel)', 'cursor vs claude code 8,100 (2), github copilot vs cursor 590 (9)', 'Data-led posts using gateway spend data; developer-opinion results, so only with original numbers'],
    ['Model and provider pages', 'claude code analytics / usage dashboard 170 each (Torii listicle ranks)', 'Pitch for listicle inclusion; Claude Code section on /features/spend-attribution'],
    ['Self-host', 'self hosted llm gateway (small), openrouter self hosted 70 (0)', 'Existing Helm guide and docs; no new page yet'],
  ], [0.22, 0.53, 0.25], { boldFirst: true }),
  note('KD = DataForSEO keyword difficulty, 0–100. Volumes are Google Ads US monthly averages; trends compare October 2025 with October 2026. Competitor-brand searches ("openrouter" 135k) are excluded as navigational.'),

  h1('4. Nautili: pages to build, using competitors as templates'),
  grid([
    ['Page type', 'Competitor example', 'Nautili today', 'Build (3 months)'],
    ['Comparison (/compare/x)', 'Requesty /vs/: Portkey, OpenRouter, LiteLLM, Vercel, Helicone, Kong, Cloudflare; LLMGateway /compare/: 7', '2 (OpenRouter, Portkey)', '+8'],
    ['Alternatives (/alternatives/x)', 'Portkey /alternatives/openrouter, /litellm, /cloudflare; TrueFoundry 300+ alternatives posts', '0', '3–4'],
    ['Integrations', 'Requesty: 20 (Cline, Roo, Kilo, OpenCode, OpenWebUI, LibreChat, n8n, Codex, Copilot, Cursor…); Helicone: 64', '1 page (Claude Code); Cursor, Codex, Continue set-up already in /docs/gateway/coding-tools; Gemini CLI guide exists', '+10 (4 from existing docs)'],
    ['Cost calculators', 'Bifrost: LLM cost calculator per provider and model (3,000 URLs); LLMGateway: token cost, Copilot cost calculators, token counter', '0 (fee calculator inside a compare page)', '2 tools + per-model variants'],
    ['Model comparisons', 'Helicone 3,500 /comparison pages; LLMGateway /models/compare', '0', 'Top 30 pairs, then expand'],
    ['Glossary', 'LLMGateway: ai-gateway, llm-routing, provider-fallback, byok, rate-limit…; TrueFoundry 1,185 entries', '0', '20 entries'],
    ['Migration guide', 'LLMGateway /migration', '0', '"Move from OpenRouter / LiteLLM in 10 minutes"'],
  ], [0.18, 0.44, 0.18, 0.2], { boldFirst: true }),
  h2('4.1 Fixes on existing Nautili pages'),
  bullet('**89 of 144 sitemap pages have no structured data.** The 12 guides, pricing, integrations, how-it-works and careers pages have none. JSON-LD helps both Google rich results and AI answer engines (flagged as high value in the meeting).'),
  bullet('**36 pages have two H1s** (the blog heading-anchor component) and 16 have no meta description.'),
  bullet('**/integrations/claude-code is titled "Claude Code | Nautili"**: no keyword, 1,397 words. It should become the landing page for routing Claude Code through a gateway (budgets, attribution, model choice), linked from the claude-code-proxy and claude-code-cost posts.'),
  bullet('**/features/spend-attribution has no in-content links from any page.** The LLM posts link to each other and to docs, but not to pricing, features or compare pages. Model pages link to nothing editorial.'),
  bullet('**The 7 LLM posts are strong** (3,200–4,500 words, FAQ schema). They need links pointing at them and out to product pages, not rewrites.'),

  pageBreak(),
  h1('5. Nautili: off-page, listings and marketplaces'),
  p('Nautili has 6 referring domains; Requesty has 802 and LLMGateway 698 (spam score under 30), mostly from listings and comparison sites, not press. The plan below is ordered by how much each source matters for buyers and for AI answers.'),
  grid([
    ['Channel', 'Where', 'Why', 'When'],
    ['Built-in provider lists (highest value)', 'Cline, Roo Code, Kilo Code, OpenCode, Continue, OpenWebUI, LibreChat, n8n, Dify, LangChain community providers, Vercel AI SDK community providers', 'Requesty and OpenRouter reach users inside these tools; each listing brings sign-ups, a docs link and an integration page to rank', 'Start week 3; PRs take 2–8 weeks'],
    ['Cloud marketplaces', 'AWS Marketplace (DevZero is already listed), then Azure and Google Cloud Marketplace', 'Lets enterprises buy on existing cloud commit; marketplace pages rank for "<product> pricing"', 'Weeks 3–8'],
    ['Developer registries', 'GitHub (public Helm chart and examples repo), Artifact Hub, Docker Hub, awesome lists (LLMOps, AI gateways, Claude Code, self-hosted)', 'Where self-hosting buyers look; GitHub repos are cited by AI answers', 'Weeks 2–4'],
    ['Software review sites', 'G2, Capterra and GetApp, TrustRadius, Gartner Peer Insights, SaaSHub, AlternativeTo (as an alternative to OpenRouter, LiteLLM, Portkey), StackShare', 'They rank for "X alternatives" and feed AI shortlists; reviews from the two named customers to start', 'Weeks 2–6'],
    ['AI directories and comparison sites', 'Sites already listing 2+ competitors: Toolify, Toolradar, Toolscout, apis.io, Agentic Index, Agent Stack Directory, gatewayscore.com, llmpricing.dev, cheapestllmapi.com, selfhost.directory', 'Fast, mostly free submissions; many compare gateway fees directly', 'Weeks 2–8'],
    ['Launches', 'Product Hunt, Show HN, Hacker News comments on gateway threads', 'Concentrated traffic and links in one week', 'After N1–N10 are live'],
    ['Lists and articles', 'Authors of "best LLM gateway 2026", "OpenRouter alternatives", "LiteLLM alternatives" (dev.to, Medium, DataCamp, Merge, Dupple) — not competitor-owned lists', 'These lists dominate page one and are what LLMs cite', 'Weeks 4–12'],
    ['Community (GEO)', 'r/ClaudeAI, r/cursor, r/LocalLLaMA, r/LLMDevs, r/ChatGPTCoding; LinkedIn posts by founders; YouTube setup walkthroughs', 'AI answers draw on Reddit and LinkedIn as much as blogs; answer with numbers, not pitches', 'Ongoing, 2–3 posts a week'],
    ['DevZero', 'Redirect devzero.io/inference pages; "Nautili by DevZero" in nav and footer; link from relevant DevZero GPU and inference posts', 'Transfers authority from 526 referring domains', 'Week 2'],
  ], [0.18, 0.36, 0.3, 0.16], { boldFirst: true }),

  h1('6. Nautili: 3-month targets'),
  grid([
    ['Measure', 'Now', 'End of month 3'],
    ['Referring domains (DataForSEO)', '6', '40–60'],
    ['Listings live (marketplaces, review sites, directories)', '0', '25+'],
    ['Provider listings in coding tools (merged or approved)', '0', '2–4'],
    ['New indexable pages (compare, alternatives, integrations, tools, posts)', '—', '35–45'],
    ['Tier 1 keywords in top 20 / top 10', '0 / 0', '8 / 4'],
    ['Non-brand search clicks per month (tencent queries excluded)', '~10', '300–800'],
    ['Sign-ups attributed to organic search', 'not tracked', 'tracked weekly'],
  ], [0.6, 0.15, 0.25], { boldFirst: true }),
  note('The meeting estimate of about 6 weeks to reach the top 10 for a keyword cluster is realistic for the difficulty 0–10 terms in Tier 1, provided the devzero.io redirects and the first 20–30 links are in place. Higher-difficulty terms ("llm gateway", 41; "ai gateway", 53) are 6–12 month goals.'),

  pageBreak(),
  h1('7. DevZero: internal links and cannibalisation', DZ),
  h2('7.1 Internal links', DZ),
  grid([
    ['Finding', 'Detail', 'Fix'],
    ['13 product pages get at most one in-content link', '/pod-rightsizing, /vpa, /karpenter-optimization (1), /solutions/aws-eks, /gcp-gke, /openshift, /product/cluster-autoscaling, /kubernetes-monitoring, /gpu-sharing, /multi-cloud, /kubernetes-management, -infrastructure-platform, -operations. None had more than 300 impressions in 12 months.', 'Link each from the 3–5 most related posts with descriptive anchors; decide on the 5 vague pages (D9)'],
    ['26 of 58 posts link to no product page', 'Including karpenter-vs-cluster-autoscaler, both CRIU posts (355 clicks), the GPU price-rise post and kubernetes-v1-34', 'One contextual product link per post, matched to the topic'],
    ['14 orphan posts', 'aws-s3-pricing (95k impressions), azure-container-apps-pricing, kubernetes-pricing, aws-cloudwatch-pricing, kubernetes-resource-requests-and-limits, kubernetes-gpu-optimization-platform-2026 and others only reachable through /blog', 'Link from related posts; add a "Pricing guides" block to the blog hub'],
    ['Links favour the weaker page', '/blog/azure-kubernetes-service-pricing: 31 internal links; /blog/aks-pricing (ranks #8): 11', 'Merge and repoint (D1)'],
    ['Guides are under-linked', '/guides/keda-autoscaling (5,620 words) and /guides/karpenter-on-eks (4,875) have 1–2 internal links each; /guides/how-to-reduce-your-kubernetes-spend… has 40k impressions and 2 links', 'Link from autoscaling posts, compare pages (/compare/keda, /compare/karpenter) and the cost optimisation page'],
    ['Calculators are not linked from pricing posts', '/tools/aws-pricing-calculator (42k impressions) and the Azure calculator have 1 in-content link each', 'Add calculator call-outs to every pricing post'],
  ], [0.22, 0.48, 0.3], { boldFirst: true, light: DZLIGHT }),
  h2('7.2 Cannibalisation map', DZ),
  grid([
    ['Topic', 'Competing URLs', 'Evidence', 'Action'],
    ['AKS pricing', '/blog/aks-pricing · /blog/azure-kubernetes-service-pricing · /blog/aks-cost-optimization', 'All three in the "aks pricing" results (#8, #31, #45)', 'Merge azure-kubernetes-service-pricing into aks-pricing (301); keep aks-cost-optimization as the how-to'],
    ['EKS', '/blog/eks-pricing · /blog/eks-cost-optimization · /solutions/aws-eks', 'Two URLs in "eks pricing" (#7, #34); solutions page titled "AWS EKS Cost Optimization", same as the blog post', 'Pricing = price only; blog = practical guide; solutions = product. Retitle /solutions/aws-eks "Automated EKS cost optimization with DevZero"'],
    ['GKE', '/blog/gke-pricing · /blog/gke-cost-optimization · /solutions/gcp-gke', 'gke-cost-optimization: 44,600 impressions, 12 clicks', 'Same split as EKS; refresh the "2025" title'],
    ['Karpenter', '/blog/karpenter-guide · /guides/karpenter-on-eks · /karpenter-optimization · /compare/karpenter · /blog/karpenter-vs-cluster-autoscaler', 'Guide #24 and karpenter-on-eks #50 and #83 for "karpenter"', 'One intent per URL (what / setup / product / vs); cross-link; guide is the hub'],
    ['VPA and rightsizing', '/vpa · /compare/vpa · /blog/kubernetes-vpa · /blog/best-kubernetes-vpa-alternatives-production · /pod-rightsizing · /blog/automated-pod-rightsizing-without-restarts', '/vpa ("VPA vs DevZero") and /compare/vpa ("DevZero vs Kubernetes VPA") target the same search', '301 /vpa to /compare/vpa; /pod-rightsizing is the product page, the two posts link to it'],
    ['Workload types', '/blog/kubernetes-workload-types · /blog/which-kubernetes-workloads-to-use', 'Same subject, 1,066 and 852 words', 'Merge into kubernetes-workload-types'],
    ['GPU utilisation', '/guides/complete-guide-to-measuring-and-fixing-gpu-utilization · Part 2, 3 and 5 posts (641–1,131 words)', 'Thin series overlapping the guide', 'Fold the parts into the guide, 301 them'],
    ['Savings plans', '/blog/cloud-bill-is-on-fire-why-savings-plans-wont-save-you · /blog/the-economics-of-cloud-commitments-why-savings-plans-exist', 'Same topic, opposite angles', 'Merge into one "do savings plans work" post'],
    ['Instances hub', '/instances · /instances/compare', 'Identical title tags', 'Give each a distinct title and purpose'],
  ], [0.13, 0.33, 0.27, 0.27], { boldFirst: true, light: DZLIGHT }),
  h2('7.3 DevZero keyword focus for the next 3 months', DZ),
  bullet('**Defend and lift pricing pages** (eks, gke, aks, s3 and cloud comparison: 889k impressions at 0.25% CTR). Target: top 5 for eks pricing, gke pricing and aks pricing, CTR above 0.6%.'),
  bullet('**Autoscaling guides already written:** KEDA (3,600 searches/month, KD 16), Karpenter (1,900, KD 44), EKS Auto Mode (880, KD 4; new post). Internal links first, then refresh.'),
  bullet('**Commercial pages:** rebuild /kubernetes-cost-optimization and link the 13 under-linked product pages. Volumes are small (about 460 US searches/month) but this is where demos come from.'),
  bullet('**Target by month 3:** devzero.io from ~2,100 to 2,600–2,900 clicks a month; 3 cannibalising clusters merged; 0 product pages without links.'),

  h1('8. Plan review: intent and page-existence check'),
  p('Every keyword in this plan and the audit (46 for Nautili, 16 for DevZero) was checked against the latest Google results (DataForSEO SERP snapshots, Jul–Nov 2026) and DataForSEO intent labels, and every proposed page against the live sites. Full table with the evidence: data/plan-review-keywords.csv.'),
  grid([
    ['Result', 'Count', 'Examples'],
    ['Keep', '20', 'openrouter alternatives, litellm vs openrouter, litellm alternatives, codex cost, llm router, token cost calculator, model pricing pages, eks/gke/aks pricing'],
    ['Reframe or downgrade', '13', 'claude code router (open-source project intent), openai api alternative (people want other model vendors), cursor usage (individuals; overlaps an existing post), h100 price (improve existing GPU page), us-east-1 (news and console logins)'],
    ['Drop', '12', 'ai proxy, agent router, cursor api key, codex api key, claude code gemini, claude usage limits, openai rate limits, ai governance tools, on prem llm, ai spend management, openrouter for claude code'],
  ], [0.18, 0.08, 0.74], { boldFirst: true }),
  h2('Corrections this check made'),
  bullet('**"claude code router" is not a buying query.** The #1 result is the open-source GitHub project of that name. It stays as a guide (open-source router vs a managed gateway), with a realistic target of positions 5–10.'),
  bullet('**Do not position on "AI spend management".** Google shows finance spend-management software for it. Use "LLM cost", "LLM spend" and "AI coding spend".'),
  bullet('**The us-east-1 opportunity was overstated** in the audit and DevZero one-pager. Most of the ~33k searches are outage news and AWS console logins; only pricing-type queries fit the region page. Corrected in both.'),
  bullet('**Several "new" pages partly exist already:** Cursor, Codex, Continue and Claude Code set-up is in /docs/gateway/coding-tools; the Gemini CLI guide exists; the OpenRouter fee calculator and switching guide are inside /compare/openrouter; the GPU pricing page (/instances/gpu) exists; the KEDA and Karpenter guides exist. These become upgrades, not new builds.'),
  bullet('**Two planned posts would have cannibalised existing ones** ("Cursor usage per developer" vs /blog/cursor-cost-per-developer; "Claude Code with DeepSeek" vs /blog/claude-code-proxy). They become sections in the existing posts.'),
  bullet('**Product checks needed before publishing (N20):** routing Claude Code to non-Anthropic models, Cursor with a custom base URL (Reddit reports Cursor restricted bring-your-own-key), the coding tools listed in N18, and MCP support.'),
  bullet('**New off-page opportunity found:** the Claude Code documentation has an "LLM gateway" page that ranks #2 for "claude code litellm". Getting listed there (N21) is worth more than ranking for the keyword.'),
  note('Not checked: "ai finops", "portkey alternatives", "gke pricing" and "minikube vs kind vs k3s" had no stored SERP snapshot. Search Console data shows DevZero already earns clicks for the last two.'),
];


const workChildren = [
  p([run('Nautili and DevZero', { pt: 22, bold: true, color: NAVY })], { after: 20 }),
  p([run('SEO work items', { pt: 13, color: ACCENT })], { after: 60 }),
  p('Prepared 22 Nov 2026 for the Tuesday working session. Companion to "Nautili and DevZero: SEO deep dive", which has the evidence behind each item. N = nautili.ai, D = devzero.io.', { pt: 9, color: GREY, after: 140 }),
  h1('1. Work items'),
  p('Itemised list of site fixes and builds, from the SEO deep dive. Effort: S = under a day, M = 2–4 days, L = a week or more. Also in data/seo-work-items.csv for import into a tracker.'),
  grid([['ID', 'Site', 'Area', 'Task', 'Owner', 'Effort', 'When'], ...WORK],
    [0.05, 0.09, 0.1, 0.5, 0.1, 0.06, 0.1], { pt: 7.8 }),
  pageBreak(),
  h1('2. Content cohort 1 (first 8 Nautili pieces, weeks 2–6)'),
  p('Each piece was checked against current Google results for intent and against existing pages for overlap (deep dive, section 8).'),
  grid([
    ['Piece', 'Main keyword (US/mo, KD)', 'Overlap check'],
    ['OpenRouter alternatives in 2026 (listicle, after the Stripe deal)', 'openrouter alternative (880 → 1,600, 0)', 'New'],
    ['LiteLLM vs OpenRouter: hosted vs self-hosted gateways', 'litellm vs openrouter (320–590, 0)', 'New'],
    ['LiteLLM alternatives (security and self-host angle)', 'litellm alternatives (390, 0)', 'New'],
    ['OpenRouter pricing and fees explained (with the calculator)', 'openrouter pricing (1,600, 12)', 'Reuses calculator from /compare/openrouter'],
    ['Codex cost per developer: plans, API prices, tracking', 'codex cost (1,600, 10)', 'New; sibling of claude-code-cost'],
    ['Claude Code router: open-source router vs a managed gateway', 'claude code router (2,900, 6)', 'Links to /blog/claude-code-proxy, does not repeat it'],
    ['Best LLM routers in 2026', 'llm router (720, 18)', 'Links to /blog/llm-routing-profiles'],
    ['LLM proxy vs LLM gateway', 'llm proxy (390, 0)', 'New'],
  ], [0.46, 0.3, 0.24]),

];

const makeDoc = (kids, footer) => new Document({
  numbering: { config: ['b', 'n'].map(ref => ({ reference: ref, levels: [{ level: 0, format: ref === 'n' ? LevelFormat.DECIMAL : LevelFormat.BULLET, text: ref === 'n' ? '%1.' : '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 300, hanging: 220 } } } }] })) },
  styles: { default: { document: { run: { font: FONT, size: sz(9.5) } } } },
  sections: [{
    properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: M, bottom: M, left: M, right: M } } },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [run(footer, { pt: 7.5, color: GREY }), new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: sz(7.5), color: GREY })] })] }) },
    children: kids,
  }],
});
Promise.all([
  Packer.toBuffer(makeDoc(children, 'Nautili and DevZero · SEO deep dive · ')),
  Packer.toBuffer(makeDoc(workChildren, 'Nautili and DevZero · SEO work items · ')),
]).then(([a, b]) => {
  fs.writeFileSync(path.join(outDir, 'Nautili-DevZero-SEO-Deep-Dive.docx'), a);
  fs.writeFileSync(path.join(outDir, 'Nautili-DevZero-SEO-Work-Items.docx'), b);
  const esc = v => /[",\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v;
  fs.writeFileSync(path.join(outDir, 'data', 'seo-work-items.csv'), ['id,site,area,task,owner,effort,when', ...WORK.map(r => r.map(esc).join(','))].join('\n') + '\n');
  console.log('wrote deep dive, work items doc and CSV');
});
