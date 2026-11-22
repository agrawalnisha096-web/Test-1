// DevZero + Nautili SEO audit, roadmap, content plan and pricing (A4, multi-page).
// Usage: node build-seo-audit.js <outDir>
const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType,
  ShadingType, BorderStyle, AlignmentType, LevelFormat, PageBreak, Footer, PageNumber,
} = require('docx');

const outDir = process.argv[2] || '.';
const FONT = 'Arial';
const NAVY = '1F3A5F', ACCENT = '2F7DBA', LIGHT = 'E8F1F8', LINE = 'C5D6E5', GREY = '5B6B75';
const M = 760;
const W = 11906 - 2 * M;
const sz = pt => Math.round(pt * 2);
const thin = { style: BorderStyle.SINGLE, size: 4, color: LINE };
const none = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };

// ---------- pricing (edit rates here; totals are computed) ----------
const RATE = {
  seoLead: 40,      // USD / hour, technical SEO lead
  dev: 45,          // USD / hour, Next.js developer
  post: 300,        // standard technical article, 1,800–2,500 words
  pillar: 550,      // pillar or data-led article, 3,500+ words
  refresh: 120,     // update of an existing article
  compare: 250,     // comparison / alternatives page
  integration: 200, // integration page
  glossary: 50,     // glossary entry, 300–600 words
  templateSpec: 600,// SEO spec + copy for one programmatic template
  analytics: 1200,  // GTM + GA4 + key events + dashboard, both sites
  report: 2000,     // original-data report incl. charts and outreach kit
  link: 300,        // one editorial link / listicle placement (average)
};
const usd = n => '$' + n.toLocaleString('en-US');
const setup = [
  ['Technical fixes, both sites (redirect maps, metadata, schema, llms.txt, sitemaps, canonicals)', 'Developer, ~70 h', 70 * RATE.dev],
  ['Specification, QA and Search Console validation of the fixes', 'SEO lead, ~30 h', 30 * RATE.seoLead],
  ['Analytics: GTM, GA4 key events, cross-domain, HubSpot/Calendly events, dashboard', 'Fixed', RATE.analytics],
  ['Template specs: instance, region and model pages (3 templates)', 'Fixed, 3 × ' + usd(RATE.templateSpec), 3 * RATE.templateSpec],
];
const setupTotal = setup.reduce((a, r) => a + r[2], 0);
const plan = (name, items) => ({ name, items, total: items.reduce((a, r) => a + r[1] * r[2], 0) });
const core = plan('Core', [
  ['Technical SEO lead retainer (monitoring, fixes, reporting)', 1, 40 * RATE.seoLead],
  ['DevZero new articles', 4, RATE.post],
  ['DevZero article refreshes', 4, RATE.refresh],
  ['Nautili new articles', 3, RATE.post],
  ['Nautili comparison or integration pages', 2, RATE.compare],
  ['Editorial links and list placements', 4, RATE.link],
]);
const growth = plan('Growth', [
  ['Technical SEO lead retainer (monitoring, fixes, reporting)', 1, 60 * RATE.seoLead],
  ['DevZero new articles', 5, RATE.post],
  ['DevZero pillar / data-led article', 1, RATE.pillar],
  ['DevZero article refreshes', 6, RATE.refresh],
  ['Nautili new articles', 5, RATE.post],
  ['Nautili comparison or integration pages', 3, RATE.compare],
  ['Glossary entries', 8, RATE.glossary],
  ['Developer hours for template and page builds', 20, RATE.dev],
  ['Editorial links and list placements', 8, RATE.link],
]);

// ---------- helpers ----------
const run = (text, o = {}) => new TextRun({ text, font: FONT, size: sz(o.pt || 9.5), bold: o.bold, color: o.color, italics: o.italics });
const rich = (s, o = {}) => String(s).split(/(\*\*[^*]+\*\*)/).filter(Boolean).map(t => t.startsWith('**') ? run(t.slice(2, -2), { ...o, bold: true }) : run(t, o));
const p = (s, o = {}) => new Paragraph({ children: typeof s === 'string' ? rich(s, o) : s, spacing: { after: o.after ?? 80, before: o.before ?? 0, line: o.line ?? 264 }, alignment: o.align, keepNext: o.keepNext });
const h1 = t => new Paragraph({ children: [run(t, { pt: 15, bold: true, color: NAVY })], spacing: { before: 120, after: 100 }, border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: ACCENT, space: 2 } }, keepNext: true });
const h2 = t => new Paragraph({ children: [run(t, { pt: 11.5, bold: true, color: ACCENT })], spacing: { before: 200, after: 80 }, keepNext: true });
const bullet = (s, ref = 'b') => new Paragraph({ children: rich(s), numbering: { reference: ref, level: 0 }, spacing: { after: 50, line: 260 } });
const num = s => bullet(s, 'n');
const pageBreak = () => new Paragraph({ children: [new PageBreak()] });
const note = s => p(s, { pt: 8, color: GREY, before: 40, after: 60 });
function grid(rows, fracs, o = {}) {
  const ws = fracs.slice(0, -1).map(f => Math.floor(W * f));
  ws.push(W - ws.reduce((a, b) => a + b, 0));
  const pt = o.pt || 8.3;
  return new Table({
    width: { size: W, type: WidthType.DXA }, columnWidths: ws,
    rows: rows.map((r, i) => new TableRow({
      tableHeader: i === 0, cantSplit: true,
      children: r.map((t, j) => new TableCell({
        width: { size: ws[j], type: WidthType.DXA },
        shading: i === 0 ? { fill: LIGHT, type: ShadingType.CLEAR, color: 'auto' } : (o.totalRow && i === rows.length - 1 ? { fill: 'F4F7FA', type: ShadingType.CLEAR, color: 'auto' } : undefined),
        borders: { top: thin, bottom: thin, left: thin, right: thin },
        margins: { top: 40, bottom: 40, left: 80, right: 80 },
        children: String(t).split('\n').map(line => new Paragraph({
          children: rich(line, { pt, bold: i === 0 || (o.boldFirst && j === 0) || (o.totalRow && i === rows.length - 1), color: i === 0 ? NAVY : undefined }),
          alignment: (o.right || []).includes(j) && i > 0 ? AlignmentType.RIGHT : (o.right || []).includes(j) ? AlignmentType.RIGHT : undefined,
          spacing: { after: 0, line: 240 },
        })),
      })),
    })),
  });
}
function kpis(items) {
  const kw = Math.floor(W / items.length);
  const white = { style: BorderStyle.SINGLE, size: 12, color: 'FFFFFF' };
  return new Table({
    width: { size: kw * items.length, type: WidthType.DXA }, columnWidths: items.map(() => kw),
    rows: [new TableRow({ children: items.map(([n, l]) => new TableCell({
      width: { size: kw, type: WidthType.DXA }, shading: { fill: LIGHT, type: ShadingType.CLEAR, color: 'auto' },
      borders: { top: none, bottom: none, left: white, right: white }, margins: { top: 90, bottom: 90, left: 80, right: 80 },
      children: [new Paragraph({ children: [run(n, { pt: 15, bold: true, color: NAVY })], alignment: AlignmentType.CENTER }),
        new Paragraph({ children: [run(l, { pt: 8, color: GREY })], alignment: AlignmentType.CENTER })],
    })) })],
  });
}
const space = (n = 60) => new Paragraph({ children: [], spacing: { after: n } });

// ---------- content ----------
const changeCols = [0.27, 0.25, 0.22, 0.09, 0.17];
const changeHdr = ['Change', 'Evidence', 'How (stack)', 'When', 'Expected impact'];

const children = [
  p([run('DevZero and Nautili', { pt: 22, bold: true, color: NAVY })], { after: 20 }),
  p([run('SEO audit, roadmap, content plan and pricing', { pt: 14, color: ACCENT })], { after: 60 }),
  p('Prepared 21 Nov 2026. Based on the Search Console exports for both sites (devzero.io 19 Nov 2025 – 18 Nov 2026; nautili.ai 12 Oct – 18 Nov 2026), DataForSEO keyword, ranking and backlink data (12 Nov 2026), and a live check of both sites on 21 Nov 2026.', { pt: 9, color: GREY, after: 160 }),

  h1('1. Summary'),
  kpis([['20,453', 'devzero.io clicks, last 12 months'], ['~2,100', 'devzero.io clicks/month now (Sep–Nov)'], ['42', 'nautili.ai clicks since 12 Oct'], ['3.5–6k', 'devzero.io clicks/month in 12 months']]),
  space(100),
  h2('The five things that matter most'),
  num('**18% of devzero.io\'s search clicks came from pages that no longer exist.** 47 old URLs earned 3,623 clicks and 875k impressions in the last 12 months and now redirect to /blog, which Google treats as a soft 404. The top nine alone earned 3,018 clicks. Restoring or properly redirecting them protects about 300 clicks a month and the links pointing at them.'),
  num('**The pricing pages are seen often but rarely clicked.** The EKS, GKE, AKS, S3 and cloud-comparison guides had 889k impressions and a 0.25% CTR from positions 7–12. The 5,200 instance pages had 2.46M impressions at 0.25% CTR; g5.xlarge alone had 127,681 impressions and 73 clicks. Better titles, prices in the snippet and a few positions gained are the fastest traffic win on the site.'),
  num('**The two sites compete with each other.** 39 of Nautili\'s 46 posts are copies of DevZero\'s Kubernetes posts, each canonicalised to itself. devzero.io/inference sells the same product as a "self-hosted LLM gateway" without naming Nautili. Nautili has 6 referring domains; devzero.io has 526.'),
  num('**Neither site measures conversions.** devzero.io loads Tag Manager (GTM-W8C6FR4) on every page but the container is close to empty. nautili.ai has no Tag Manager container in its page source and GA4 records no key events. Until this is fixed, SEO work cannot be tied to demos or sign-ups.'),
  num('**Nautili\'s early numbers are mostly noise.** 86% of its query impressions (14,830 of 17,296) are bot-like "tencent#####" lookups landing on /providers/tencent. The real demand so far is model-name searches (Gemini, Opus, Llama) hitting the model pages. Gateway and alternatives keywords have no impressions yet.'),
  h2('Expected outcome'),
  grid([
    ['', 'Now', 'Month 6', 'Month 12', 'Main drivers'],
    ['devzero.io clicks/month', '~2,100', '2,800–3,500', '3,500–6,000', 'Legacy redirects, pricing and instance CTR, 4–6 new articles a month'],
    ['nautili.ai clicks/month', '~30–45', '300–1,500', '1,500–7,000', 'Redirects and links from devzero.io, comparison pages, AI coding cost cluster'],
    ['Conversions tracked', 'None', 'Demo, sign-up, key events on both sites', 'Organic leads reported monthly', 'GTM and GA4 set-up in weeks 1–3'],
  ], [0.22, 0.12, 0.17, 0.15, 0.34], { boldFirst: true }),
  note('Projection method: Search Console baseline (Sep–Nov 2026 average) plus modelled gains from CTR improvements on existing impressions, rank gains from the DataForSEO keyword set and expected traffic from new pages. Low end assumes the technical fixes only partly land; high end assumes the full plan in section 4 is delivered. Section 3 gives the impact of each change.'),

  pageBreak(),
  h1('2. Where the sites stand'),
  h2('2.1 devzero.io (Search Console, 19 Nov 2025 – 18 Nov 2026)'),
  p('Clicks fell from 2,527 in December to 835 in April, then recovered to 2,156 in October. November is running at about 82 clicks a day, a pace of roughly 2,450 for the month. Average position improved from 14.3 in March to 7.1 in October, but CTR stayed low because most impressions come from pricing and instance queries where the snippet does not answer the searcher.'),
  grid([
    ['Month', 'Clicks', 'Impressions', 'CTR', 'Avg position'],
    ['Dec 2025', '2,527', '513,556', '0.49%', '10.7'], ['Jan 2026', '2,276', '642,708', '0.35%', '12.1'], ['Feb 2026', '1,202', '304,510', '0.39%', '12.8'],
    ['Mar 2026', '1,007', '247,962', '0.41%', '14.3'], ['Apr 2026', '835', '315,127', '0.26%', '9.6'], ['May 2026', '1,209', '537,015', '0.23%', '8.6'],
    ['Jun 2026', '1,660', '740,131', '0.22%', '8.1'], ['Jul 2026', '1,652', '589,273', '0.28%', '8.5'], ['Aug 2026', '1,601', '495,399', '0.32%', '9.6'],
    ['Sep 2026', '1,694', '501,025', '0.34%', '7.7'], ['Oct 2026', '2,156', '554,898', '0.39%', '7.1'], ['1–18 Nov 2026', '1,479', '407,800', '0.36%', '7.3'],
  ], [0.28, 0.16, 0.2, 0.16, 0.2], { right: [1, 2, 3, 4] }),
  space(80),
  grid([
    ['Site section (top 1,000 pages)', 'Pages', 'Clicks', 'Impressions', 'CTR'],
    ['Blog (/blog)', '100', '8,418', '2,970,019', '0.28%'],
    ['Homepage (mostly brand searches)', '3', '3,751', '78,253', '4.79%'],
    ['Instance, GPU, region and family pages (/instances)', '809', '6,146', '2,462,088', '0.25%'],
    ['Guides, tools, pricing, docs, spot pages', '44', '661', '194,159', '0.34%'],
  ], [0.46, 0.1, 0.13, 0.17, 0.14], { right: [1, 2, 3, 4] }),
  space(80),
  bullet('**Brand:** "devzero" and "dev zero" brought 3,263 clicks (16% of the total). Search Console only shows the top 1,000 queries, which cover 7,881 of the 20,453 clicks; the rest is long tail.'),
  bullet('**Countries:** the US has 53% of impressions but only 26% of clicks (CTR 0.17%, average position 10.4). India (3,290 clicks), the UK (1,393) and Germany (999) all convert impressions better. US rankings on pricing terms are where the upside is.'),
  bullet('**Devices:** mobile ranks much lower than desktop (average position 13.2 vs 8.9). Mobile Core Web Vitals and layout on the instance and pricing templates need checking.'),
  bullet('**Biggest pages:** homepage 3,742 clicks; minikube-vs-kind-vs-k3s 1,039 (now redirected away); gke-pricing 827; docker-gpu 656 (redirected to a GPU guide); aws-azure-google-price-comparison 608; nix-vs-docker 545 (redirected away); eks-pricing 536.'),
  bullet('**An odd query to check:** "droven io aws vs azure comparison" had 52,837 impressions and 212 clicks at position 1.8, landing on the cloud-comparison post. Another site may be referencing or copying that post; worth confirming before it is counted as real demand.'),
  bullet('**Indexing (from the Page indexing report):** 4,503 pages not indexed, including 2,802 "Crawled – currently not indexed" and 969 "Excluded by noindex". Spot-instance detail pages such as /spot-instances/aws/m5.large return a 404 with a noindex tag, which suggests old links or sitemap entries are feeding the noindex count. A full breakdown needs the indexing export once access is granted.'),

  h2('2.2 nautili.ai (Search Console, 12 Oct – 18 Nov 2026)'),
  bullet('**42 clicks and 23,009 impressions** in the first five weeks. 21 clicks came from model pages, 12 from the homepage.'),
  bullet('**/providers/tencent had 15,275 impressions and no clicks.** 773 of the top 1,000 queries are strings like "tencent33812". These look automated and should be filtered out of reporting so they do not hide real trends.'),
  bullet('**195 of the 493 URLs with impressions carry a ?from=google-ai-studio parameter.** The pages canonicalise correctly to the clean URL, so this is a reporting and crawl-waste issue, not a ranking problem. Internal links and the source of the parameter should be cleaned up.'),
  bullet('**The duplicated Kubernetes posts already compete with devzero.io.** On Nautili they gather impressions for "aws vs azure vs gcp" and "kubernetes hpa" at positions 20–75, the same queries devzero.io ranks for.'),
  bullet('**No gateway, router or alternatives queries yet.** In DataForSEO, Nautili has no ranking keywords and 6 low-quality referring domains, first seen 13 Oct 2026.'),

  h1('3. What needs to change'),
  p('Each change lists the evidence, how to do it in the current stack, when it should happen and the expected impact. Both sites run on **Next.js (App Router) with MDX content, hosted on Vercel**, with HubSpot forms, Calendly and PostHog. Redirects belong in next.config.js (redirects() with permanent: true) or vercel.json; titles, descriptions and canonicals in generateMetadata or MDX frontmatter; sitemaps in app/sitemap.ts; and structured data as JSON-LD in the page layouts.'),
  h2('3.1 Quick fixes (small changes, weeks 1–2)'),
  grid([changeHdr,
    ['**Q1 · Map the 47 legacy URLs.** Restore the 9 posts with 100+ clicks; 301 the rest to the closest current page or return 410.', '3,623 clicks and 875k impressions in 12 months now go to /blog. 153 referring domains point at legacy URLs.', 'next.config.js redirects (permanent); restore MDX files for kept posts with an updated intro and links to K8s content.', 'Week 1–2', 'Protects ~300 clicks/month and recovers link equity. Map in appendix A.'],
    ['**Q2 · Fix 404s on commercial pages:** /what-is-cast-ai, /what-is-sedai, /blog-categories/artificial-intelligence, /templates.', '61 clicks and 31k impressions on the two competitor pages, now 404.', '301 to /compare/cast-ai and /compare/sedai; category to /blog.', 'Week 1', 'Small traffic, high intent; restores competitor-brand visibility.'],
    ['**Q3 · Map docs deep links.** 12 old docs URLs redirect to the /docs root.', 'e.g. /docs/k8s-automation, Azure DNS and database guides.', 'Per-URL redirects to the matching operator docs page, or 410.', 'Week 2', 'Removes soft 404s; better docs discoverability.'],
    ['**Q4 · Regenerate llms.txt.**', 'Still describes MicroVMs and cloud development environments, lists /drafts/styleguide, /vs/what-is-coder, /kubecon (2024).', 'Generate at build time from the sitemap (app/llms.txt/route.ts) with current positioning.', 'Week 1', 'Correct descriptions in ChatGPT, Perplexity and AI Overviews.'],
    ['**Q5 · Titles and descriptions on pricing guides.** Update "2025" titles, add current prices and a one-line answer.', 'eks-pricing: 238,509 impressions, 0.22% CTR, "(2025 Guide)" title. gke, aks, s3, cloud comparison similar.', 'MDX frontmatter + generateMetadata; add FAQ schema and an "updated" date.', 'Week 1–2', '+300–500 clicks/month as CTR moves from 0.25% towards 0.6–0.8%.'],
    ['**Q6 · Instance page titles with the price.** e.g. "g5.xlarge pricing: $1.006/hr, 4 vCPU, 16 GiB, A10G".', 'Template title "g5.xlarge — AWS EC2 Instance Pricing & Specs" has no price; g5.xlarge 127,681 impressions, 0.06% CTR.', 'One change in the instance page template (generateMetadata from the pricing dataset).', 'Week 2', '+250–450 clicks/month across 2.46M impressions.'],
    ['**Q7 · On-page fixes:** duplicate H1 on blog posts, pricing H1 typo, homepage canonical trailing slash, Nautili H1 spacing and "Nautili" vs "Nautili.ai" naming.', 'Found in the crawl.', 'Heading component, page copy, metadata base URL.', 'Week 1', 'Hygiene; clearer signals.'],
    ['**Q8 · Off-topic webinars:** Python, JavaScript, Git and coding-practice pages.', 'About 155 words each, indexed, unrelated to Kubernetes.', 'Return 410 and drop from pages.xml, or noindex.', 'Week 2', 'Topical focus; smaller index.'],
  ], changeCols),
  h2('3.2 Structural changes (broader work, weeks 2–8)'),
  grid([changeHdr,
    ['**S1 · Remove the 39 duplicated posts from nautili.ai.**', '39 of 46 Nautili posts copy devzero.io and canonicalise to themselves; /blog/eks-pricing uses a temporary 307.', '301 each to its devzero.io URL; remove from blog.xml; switch existing 307s to 308.', 'Week 2–3', 'Ends cannibalisation; Nautili gets a clear LLM-gateway focus.'],
    ['**S2 · Move inference to Nautili.** 301 devzero.io/inference, /pricing/inference and /lp/inference to nautili.ai; add "Nautili by DevZero" to the devzero.io navigation and footer.', '/inference sells a "self-hosted LLM gateway" with no mention of Nautili. devzero.io has 526 referring domains; nautili.ai has 6.', 'next.config.js redirects; shared nav component; Organization schema with sameAs links on both sites.', 'Week 2–3 (needs sign-off)', 'The biggest single lever for Nautili rankings; makes the brand findable.'],
    ['**S3 · Indexing clean-up on devzero.io.** Only 200, indexable URLs in sitemaps; consolidate thin instance and spot pages; remove links to 404 spot pages.', '4,503 not indexed (2,802 crawled not indexed, 969 noindex). Spot detail pages return 404 + noindex.', 'app/sitemap.ts filters; generateStaticParams limited to supported SKUs; noindex or merge long-tail SKUs with no impressions.', 'Week 3–6', 'Faster crawling of pages that earn traffic; higher index rate for instance pages.'],
    ['**S4 · Richer instance and region templates.** Price history, cross-cloud equivalents, spot savings, "best for" and links to rightsizing content.', 'Instance pages are 30% of clicks at 0.25% CTR. (us-east-1 has ~33k searches/month, but most are outage news or console logins; only pricing queries fit.)', 'Template components fed from the existing pricing dataset; ISR revalidation daily.', 'Week 4–8', '+100–300 clicks/month from instance and region pages; protects them from thin-content filtering.'],
    ['**S5 · Money pages rebuilt for intent.** /kubernetes-cost-optimization, /pod-rightsizing, /vpa, /karpenter-optimization.', '/kubernetes-cost-optimization ranks #59 for its own term and picks up CDE-era queries.', 'Copy, comparison tables, proof (customer numbers), FAQ schema; internal links from top blog posts.', 'Week 4–8', 'Conversion more than traffic: these terms are small (~460 US searches/month in total) but highest intent.'],
    ['**S6 · Nautili model pages.** Live cross-provider prices, latency, cheaper alternatives, code snippet.', 'Model-name searches are the only real demand so far (Gemini, Opus, Llama).', 'Model template components; data from the gateway catalogue; Dataset/Product schema.', 'Week 4–8', 'Main long-tail traffic source for Nautili; 573 pages to improve with one template.'],
    ['**S7 · Mobile performance.** Check and fix Core Web Vitals on instance, pricing and blog templates.', 'Mobile average position 13.2 vs desktop 8.9.', 'Vercel Speed Insights and PageSpeed; trim third-party scripts (HubSpot, PostHog and others load on every page); lazy-load tables and images.', 'Week 3–6', 'Better mobile rankings; mobile is 15% of clicks.'],
  ], changeCols),
  h2('3.3 Measurement (weeks 1–3)'),
  grid([changeHdr,
    ['**M1 · DevZero Tag Manager set-up.** GA4 configuration, key events: demo booked, sign-up, pricing CTA, "analyze-cluster" command copy, contact form.', 'GTM-W8C6FR4 loads on every page but has almost no tags.', 'GTM + GA4; HubSpot form and Calendly events via dataLayer; consent mode v2.', 'Week 1–2', 'Ties organic traffic to pipeline; needed to judge every other change.'],
    ['**M2 · Nautili analytics.** Install a GTM container; key events: sign-up, API key created, first request, demo booked, fee calculator use.', 'No GTM container in page source; GA4 has zero key events.', 'GTM or @next/third-parties GA4; server-side events from the app for sign-up and first request.', 'Week 1–3', 'Self-serve sign-ups become measurable.'],
    ['**M3 · Cross-domain tracking and reporting.** One dashboard for both sites; filter bot queries.', 'tencent##### queries are 86% of Nautili query impressions.', 'GA4 cross-domain, Search Console API, Looker Studio.', 'Week 3', 'Clean monthly reporting from month 1.'],
    ['**M4 · Bing Webmaster Tools and IndexNow** for both sites.', 'Not checked yet.', 'Verify, submit sitemaps, IndexNow on publish.', 'Week 2', 'Bing feeds ChatGPT search; small extra traffic.'],
  ], changeCols),
  h2('3.4 Growth work (month 2 onwards)'),
  grid([changeHdr,
    ['**G1 · Content programme** (section 5).', 'Volume sits in pricing, autoscaling education and AI coding cost.', 'MDX articles with shared components (tables, calculators, FAQ).', 'Month 2–12', 'Most of the month-12 growth.'],
    ['**G2 · Comparison and alternatives pages.** DevZero: 6 alternatives pages. Nautili: 10 comparison pages.', 'Small volume but highest intent. "openrouter alternative" grew 320 → 1,300 searches/month in a year at difficulty 1.', '/compare and /alternatives routes from one template.', 'Month 2–3', 'Leads more than traffic; fastest wins for Nautili.'],
    ['**G3 · Links and list placements.** Outreach to "best Kubernetes cost tools" and "best LLM gateway" list authors; G2, Capterra, Gartner Peer Insights, SaaSHub profiles.', 'DevZero is not in the top 80 for "kubernetes cost optimization tools"; Nautili is in none of the gateway lists.', 'Outreach, data offers, review requests to customers.', 'Month 2–12', 'Authority for both domains; citations in AI answers.'],
    ['**G4 · Original-data reports.** "State of Kubernetes Waste" from cluster-analyser data; "AI coding spend" from gateway data; a monthly GPU price index.', 'The 2026 tools post already cites 115 production clusters.', 'Data export from the product, charts, press kit.', 'Month 3 and 6', 'Links and press; GPU price searches are growing.'],
  ], changeCols),

  h1('4. Timeline'),
  grid([
    ['When', 'devzero.io', 'nautili.ai', 'Both'],
    ['Week 1', 'Q1 redirect map agreed, Q2 404s, Q4 llms.txt, Q5 titles (top 10 pricing pages), Q7 on-page fixes', 'Q7 H1 and naming', 'M1/M2 tracking plan, access set-up'],
    ['Week 2', 'Q1 redirects live, Q3 docs, Q6 instance titles, Q8 webinars', 'S1 duplicates redirected', 'M1/M2 tags live, M4 Bing'],
    ['Weeks 3–4', 'S3 sitemap and indexing clean-up starts, S7 mobile audit', 'S2 inference pages moved, nav link, schema', 'M3 dashboard, first baseline report'],
    ['Weeks 5–8', 'S4 instance and region templates, S5 money pages', 'S6 model page template, first 4 comparison pages', 'Content programme starts'],
    ['Months 3–4', 'Alternatives pages, GPU price index, refreshes of top 20 posts', 'Remaining comparison and integration pages, fee calculator', 'List and review-site outreach'],
    ['Months 5–6', 'State of Kubernetes Waste report, glossary', 'AI coding spend report', 'Mid-point review against targets'],
    ['Months 7–12', '4–6 articles a month, template iterations', '3–5 articles a month, model page data', 'Monthly reporting and re-prioritisation'],
  ], [0.13, 0.32, 0.3, 0.25], { boldFirst: true }),
  note('Weeks 1–2 depend on Search Console, GA4/GTM publish access and a developer contact (or repository access) for the Next.js code base.'),

  h1('5. Content plan'),
  p('The keyword data points to different jobs for the two sites. devzero.io already earns its traffic from pricing and instance lookups and needs more of that plus autoscaling education, with commercial pages built for conversion. nautili.ai needs to win the few fast-growing, low-difficulty gateway queries first, then the much larger AI-coding-cost topic.'),
  h2('5.1 devzero.io: first targets'),
  grid([
    ['Keyword (US searches/month, difficulty)', 'Where devzero.io is now', 'Action'],
    ['eks pricing / aws eks pricing (210 + 170, KD 5–9)', '24k impressions, positions 7.2–7.4, CTR 0.4%', 'Refresh /blog/eks-pricing: 2026 prices, Auto Mode, calculator'],
    ['gke pricing / gke autopilot pricing (110 + 40, KD 8)', '#3–9; autopilot pricing 152 clicks', 'Refresh; add Autopilot vs Standard table'],
    ['aks pricing / azure kubernetes pricing (70–480, KD 0–12)', '#12–16, 18k impressions', 'Refresh /blog/aks-pricing; merge with azure-kubernetes-service-pricing'],
    ['us-east-1 pricing, ec2 prices by region (small; most us-east-1 searches are news or console logins)', 'Region page #16–18 for the broad terms', 'Region page template (S4), pricing-focused titles'],
    ['aws / azure pricing calculator (14,800 each, KD 25–30)', '#8–10, 18k impressions', 'Improve /tools calculators: speed, export, titles'],
    ['karpenter, karpenter vs cluster autoscaler (1,900 + 110, KD 5–45)', '#10–11 in Search Console; /guides/karpenter-on-eks has 1 internal link', 'Refresh the guide for 2026; link the EKS guide from autoscaling posts'],
    ['keda (3,600, KD 16)', 'Not in top 90; /guides/keda-autoscaling (5,620 words) has 2 internal links', 'Link the existing guide from autoscaling posts and /compare/keda; refresh'],
    ['eks auto mode (880, KD 4)', 'Not ranking', 'New: EKS Auto Mode vs Karpenter, with cost'],
    ['h100 price / h100 costs (1,900 + 1,000, KD 14–21)', '#26', 'Monthly GPU price index page'],
    ['criu (590, KD 18)', '#7–10, 8k impressions', 'Refresh CRIU posts; link to live rightsizing'],
    ['minikube vs kind vs k3s (cluster of terms)', '1,039 clicks, page redirected', 'Restore and update (Q1)'],
    ['kubernetes cost optimization / tools (90 + 50, KD 0)', '#59 / not ranking', 'Rebuild money page (S5); list outreach (G3)'],
  ], [0.38, 0.28, 0.34]),
  h2('5.2 nautili.ai: first targets'),
  grid([
    ['Keyword (US searches/month, difficulty, trend)', 'Who ranks now', 'Action'],
    ['openrouter alternative(s) (880, KD 1, +306% a year)', 'Vendor listicles', '"OpenRouter alternatives after the Stripe deal"'],
    ['openrouter pricing / fees (1,600 + 70, KD 12–24)', 'openrouter.ai, Reddit, costgoat.com', 'Stand-alone fee calculator (4% vs 5.5%)'],
    ['litellm alternatives, litellm vs openrouter (390 + 260, KD 0)', 'Reddit, TrueFoundry, MLflow', 'Two comparison pages'],
    ['portkey alternatives (90, rising)', 'Vendor listicles', 'Comparison page, "after Palo Alto Networks" angle'],
    ['cursor vs claude code (8,100 + 6,600, KD 0–2)', 'Reddit and personal blogs', 'Data-led cost comparison from gateway data'],
    ['claude code pricing / cost (27,100 + 5,400, KD 30–38)', 'claude.com, Finout #4', 'Keep /blog/claude-code-cost updated monthly'],
    ['codex pricing (8,100, KD 9)', 'Not checked', 'Codex cost per developer'],
    ['cursor pricing (9,900, KD 21)', 'cursor.com, reviews', 'Cursor cost per developer (refresh existing post)'],
    ['claude api pricing, deepseek api pricing (8,100 + 3,600, KD 15)', 'Vendor pages, aggregators', 'Model pages with cross-provider prices (S6)'],
    ['llm gateway, llm router (1,600 + 720, KD 18–29, +164%)', 'llmgateway.io, GitHub, TrueFoundry', 'Pillar page plus "best LLM gateways 2026"'],
    ['mcp gateway (2,400, KD 20)', 'GitHub, Kong, TrueFoundry', 'Only if the product supports MCP'],
  ], [0.42, 0.25, 0.33]),
  h2('5.3 How much to produce in the first 12 months'),
  grid([
    ['Content type', 'devzero.io', 'nautili.ai', 'Notes'],
    ['New articles', '48–60 (4–5 a month)', '36–48 (3–4 a month)', 'Each 1,800–2,500 words, technical review by an engineer'],
    ['Pillar and data-led articles', '4–6', '3–4', 'Included in the article count above'],
    ['Refreshes of existing posts', '40–60', '5–10', 'Starting with the pricing guides and the 9 restored posts'],
    ['Comparison and alternatives pages', '6', '10', 'DevZero: Cast AI, Kubecost, ScaleOps, PerfectScale, Zesty, Spot Ocean'],
    ['Integration and solution pages', '2 (AKS, OKE)', '9', 'Nautili: Cursor, Codex, Gemini CLI, LangChain, Vercel AI SDK, OpenAI and Anthropic SDKs, LlamaIndex, Continue'],
    ['Glossary entries', '50', '30', '300–600 words each, linked to product pages'],
    ['Programmatic templates improved', '3 (instance, region, GPU index)', '2 (model, provider)', 'One template change improves hundreds of pages'],
    ['Tools', 'Calculator upgrades', 'Fee calculator', 'Link-earning assets'],
    ['Data reports', '1–2', '1', 'Waste report; AI coding spend report'],
  ], [0.25, 0.21, 0.21, 0.33], { boldFirst: true }),
  note('Search volumes: DataForSEO (Google Ads data), US, Nov 2026. Positions and impressions: Search Console. "KD" is DataForSEO keyword difficulty, 0–100.'),

  pageBreak(),
  h1('6. Pricing'),
  p('All prices in USD, excluding taxes. Hourly work is billed against an agreed estimate; content is billed per piece on delivery.'),
  h2('6.1 Rates'),
  grid([
    ['Line item', 'Price', 'What it includes'],
    ['Technical SEO lead', usd(RATE.seoLead) + ' / hour', 'Audit, specs, QA, Search Console, reporting'],
    ['Developer (Next.js / Vercel)', usd(RATE.dev) + ' / hour', 'Redirects, metadata, templates, schema, tracking code. Not needed if DevZero\'s engineers implement the specs'],
    ['Article', usd(RATE.post) + ' each', '1,800–2,500 words, keyword brief, original screenshots or code, technical review, on-page SEO'],
    ['Pillar or data-led article', usd(RATE.pillar) + ' each', '3,500+ words, original data or benchmarks, diagrams'],
    ['Article refresh', usd(RATE.refresh) + ' each', 'New data and prices, updated title and structure, internal links'],
    ['Comparison or alternatives page', usd(RATE.compare) + ' each', 'Research, comparison table, FAQ, schema'],
    ['Integration page', usd(RATE.integration) + ' each', 'Set-up steps, code sample, FAQ'],
    ['Glossary entry', usd(RATE.glossary) + ' each', '300–600 words, linked to product pages'],
    ['Programmatic template spec', usd(RATE.templateSpec) + ' each', 'SEO specification and copy for one template (development billed hourly)'],
    ['Analytics set-up (both sites)', usd(RATE.analytics) + ' fixed', 'GTM, GA4 key events, cross-domain, HubSpot and Calendly events, dashboard'],
    ['Original-data report', usd(RATE.report) + ' each', 'Analysis, write-up, charts, outreach kit'],
    ['Editorial link or list placement', usd(RATE.link) + ' average', 'Outreach and placement on a relevant site; no paid link schemes'],
  ], [0.3, 0.17, 0.53], { boldFirst: true }),
  h2('6.2 One-off set-up (weeks 1–6)'),
  grid([
    ['Item', 'Basis', 'Cost'],
    ...setup.map(r => [r[0], r[1], usd(r[2])]),
    ['Total set-up', '', usd(setupTotal)],
  ], [0.6, 0.22, 0.18], { right: [2], totalRow: true }),
  h2('6.3 Monthly plans (from month 2)'),
  ...[core, growth].map(pl => [
    p(`**${pl.name}: ${usd(pl.total)} a month**`, { before: 80, after: 40, keepNext: true }),
    grid([['Item', 'Qty', 'Unit', 'Monthly'], ...pl.items.map(r => [r[0], String(r[1]), usd(r[2]), usd(r[1] * r[2])]), ['Total', '', '', usd(pl.total)]],
      [0.58, 0.1, 0.15, 0.17], { right: [1, 2, 3], totalRow: true }),
  ]).flat(),
  space(60),
  bullet('**Core** fits the low end of the projection (about 3,500 devzero.io clicks a month by month 12). **Growth** is the plan behind the high end.'),
  bullet('Tools are not included: an Ahrefs or Semrush seat (about $130–250 a month) and DataForSEO usage (about $20 a month).'),
  bullet('Data reports and extra developer hours are quoted separately when needed.'),

  h1('7. What is needed to start'),
  bullet('**Access:** Search Console (full user) for both domains, GA4 and GTM (publish) for both, Vercel project or GitHub repository access (or a named developer), HubSpot (read), Bing Webmaster Tools.'),
  bullet('**Exports:** the Page indexing report (not-indexed URLs with reasons) for devzero.io.'),
  bullet('**Decisions:** (1) sign-off to move the inference pages from devzero.io to nautili.ai; (2) which of the 9 high-traffic legacy posts to restore; (3) approval to remove the 39 duplicated posts from nautili.ai.'),
  bullet('**Inputs for content:** anonymised cluster-analyser data, anonymised gateway spend data, 3–5 customer stories with numbers, and an engineer for technical review (about 30 minutes per article).'),

  pageBreak(),
  h1('Appendix A. Legacy URL map (devzero.io)'),
  p('URLs that now redirect to /blog, ordered by clicks in the last 12 months. "Restore" means bring the post back at the same URL with an updated introduction and links to current Kubernetes content.'),
  grid([
    ['URL', 'Clicks', 'Impressions', 'Recommended action'],
    ['/blog/minikube-vs-kind-vs-k3s', '1,039', '44,056', 'Restore'],
    ['/blog/nix-vs-docker', '545', '55,872', 'Restore'],
    ['/blog/5-alternatives-to-docker-desktop', '407', '50,348', 'Restore'],
    ['/blog/alternatives-to-github-codespaces', '393', '27,139', 'Restore'],
    ['/blog/how-to-set-up-a-vs-code-server-for-working-remotely', '165', '40,081', 'Restore'],
    ['/blog/how-to-fix-failed-to-solve-with-frontend-dockerfile-v0-error', '146', '25,006', 'Restore'],
    ['/blog/ngrok-alternatives', '114', '43,019', 'Restore'],
    ['/blog/backstage-plugins', '114', '13,885', 'Restore'],
    ['/blog/10-useful-vs-code-shortcuts-that-will-make-your-coding-life-easier', '95', '79,754', 'Restore'],
    ['/blog/docker-microservices', '69', '15,640', '301 to /blog/kubernetes-workload-types'],
    ['/blog/cycle-time-in-agile', '68', '30,610', '410'],
    ['/blog/cloud-based-development-environment', '60', '26,647', '301 to /blog/alternatives-to-github-codespaces'],
    ['/blog/gitpod-vs-codespace', '44', '27,260', '301 to /blog/alternatives-to-github-codespaces'],
    ['/blog/docker-build-args-a-brief-introduction', '33', '22,227', '301 to the restored Dockerfile post'],
    ['/blog/guide-to-microservices-and-containers', '33', '16,521', '301 to /blog/kubernetes-workload-types'],
    ['/blog/10-awesome-gifts-for-developers-to-boost-their-productivity', '29', '3,522', '410'],
    ['/blog/mastering-self-hosted-runners-for-github-actions-setup-benefits-…', '24', '14,542', '410'],
    ['/blog/best-developer-productivity-in-2024', '23', '40,295', 'Restore (20 referring domains)'],
    ['/blog/microservices-best-practices', '22', '96,087', '301 to /blog/kubernetes-workload-types'],
    ['28 further URLs (21 clicks or fewer each)', '200', '202,938', '301 where a close match exists, otherwise 410'],
  ], [0.55, 0.1, 0.13, 0.22], { right: [1, 2] }),
  note('Full list with status codes: data/gsc/devzero-url-status-2026-11-21.csv. The nine posts marked Restore at the top earned 3,018 clicks.'),
  h1('Appendix B. Data sources'),
  bullet('Google Search Console exports for devzero.io (19 Nov 2025 – 18 Nov 2026) and nautili.ai (12 Oct – 18 Nov 2026): queries, pages, countries, devices, daily totals.'),
  bullet('DataForSEO (12 Nov 2026): keyword volumes and difficulty, ranked keywords, competitor domains, backlinks, SERP snapshots.'),
  bullet('Live checks on 21 Nov 2026: HTTP status of all 184 non-instance devzero.io URLs with impressions, all 53 URLs in nautili.ai\'s blog sitemap, page metadata, canonicals and tracking tags.'),
];

const doc = new Document({
  numbering: { config: ['b', 'n'].map(ref => ({ reference: ref, levels: [{ level: 0, format: ref === 'n' ? LevelFormat.DECIMAL : LevelFormat.BULLET, text: ref === 'n' ? '%1.' : '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 300, hanging: 220 } } } }] })) },
  styles: { default: { document: { run: { font: FONT, size: sz(9.5) } } } },
  sections: [{
    properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: M, bottom: M, left: M, right: M } } },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [run('DevZero and Nautili · SEO audit · ', { pt: 7.5, color: GREY }), new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: sz(7.5), color: GREY })] })] }) },
    children,
  }],
});
Packer.toBuffer(doc).then(b => {
  const f = path.join(outDir, 'DevZero-Nautili-SEO-Audit.docx');
  fs.writeFileSync(f, b);
  console.log('wrote', f, '| setup', setupTotal, '| core', core.total, '| growth', growth.total);
});
