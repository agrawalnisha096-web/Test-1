// Two client-facing SEO one-pagers (A4, single page each): DevZero and Nautili.
// Usage: node build-seo-one-pagers.js <outDir>
const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType,
  ShadingType, BorderStyle, AlignmentType, LevelFormat,
} = require('docx');

const outDir = process.argv[2] || '.';
const FONT = 'Arial';
const GREY = '5B6B75';
const M = 680; // ~12mm margins
const W = 11906 - 2 * M;
const sz = pt => Math.round(pt * 2);
const none = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };

function build(c) {
  const { NAVY, ACCENT, LIGHT, LINE } = c.colors;
  const thin = { style: BorderStyle.SINGLE, size: 4, color: LINE };
  const run = (text, o = {}) => new TextRun({ text, font: FONT, size: sz(o.pt || 9), bold: o.bold, color: o.color, italics: o.italics });
  // Strings may contain **bold** segments.
  const rich = (s, o = {}) => s.split(/(\*\*[^*]+\*\*)/).filter(Boolean).map(t => t.startsWith('**') ? run(t.slice(2, -2), { ...o, bold: true }) : run(t, o));
  const p = (children, o = {}) => new Paragraph({ children: typeof children === 'string' ? rich(children, o) : children, spacing: { after: o.after ?? 30, before: o.before ?? 0, line: o.line ?? 240 }, alignment: o.align });
  const h = text => new Paragraph({ children: [run(text, { pt: 10.5, bold: true, color: NAVY })], spacing: { before: 110, after: 45 }, border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: LINE, space: 1 } } });
  const bullet = (s, ref) => new Paragraph({ children: rich(s, { pt: 8.8 }), numbering: { reference: ref, level: 0 }, spacing: { after: 18, line: 235 } });
  const cell = (children, width, o = {}) => new TableCell({
    width: { size: width, type: WidthType.DXA },
    shading: o.fill ? { fill: o.fill, type: ShadingType.CLEAR, color: 'auto' } : undefined,
    borders: o.borders || { top: thin, bottom: thin, left: thin, right: thin },
    margins: { top: o.pad ?? 35, bottom: o.pad ?? 35, left: 85, right: 85 },
    children,
  });
  const grid = (rows, fracs, o = {}) => {
    const ws = fracs.slice(0, -1).map(f => Math.floor(W * f));
    ws.push(W - ws.reduce((a, b) => a + b, 0));
    return new Table({
      width: { size: W, type: WidthType.DXA }, columnWidths: ws,
      rows: rows.map((r, i) => new TableRow({ children: r.map((t, j) => cell([p(t, { pt: 8.6, after: 0, line: 230, bold: i === 0 || (o.boldFirst && j === 0), color: i === 0 || (o.boldFirst && j === 0) ? NAVY : undefined })], ws[j], { fill: i === 0 ? LIGHT : undefined })) })),
    });
  };

  // KPI band
  const kw = Math.floor(W / c.kpis.length);
  const white = { style: BorderStyle.SINGLE, size: 12, color: 'FFFFFF' };
  const kpiTable = new Table({
    width: { size: kw * c.kpis.length, type: WidthType.DXA }, columnWidths: c.kpis.map(() => kw),
    rows: [new TableRow({ children: c.kpis.map(([n, l]) => cell([
      p([run(n, { pt: 15, bold: true, color: NAVY })], { after: 0, align: AlignmentType.CENTER }),
      p([run(l, { pt: 8, color: GREY })], { after: 0, align: AlignmentType.CENTER }),
    ], kw, { fill: LIGHT, borders: { top: none, bottom: none, left: white, right: white }, pad: 80 })) })],
  });

  // Strengths / gaps
  const half = Math.floor(W / 2);
  const col = (title, items, ref) => [p([run(title, { pt: 9.5, bold: true, color: ACCENT })], { after: 30 }), ...items.map(x => bullet(x, ref))];
  const twoCol = new Table({
    width: { size: half * 2, type: WidthType.DXA }, columnWidths: [half, half],
    rows: [new TableRow({ children: [
      cell(col('What is working', c.strengths, 'a'), half, { borders: { top: none, bottom: none, left: none, right: thin }, pad: 0 }),
      cell(col('What is holding it back', c.gaps, 'b'), half, { borders: { top: none, bottom: none, left: none, right: none }, pad: 0 }),
    ] })],
  });

  const doc = new Document({
    numbering: { config: ['a', 'b', 'n'].map(ref => ({ reference: ref, levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 230, hanging: 160 } } } }] })) },
    styles: { default: { document: { run: { font: FONT, size: sz(9) } } } },
    sections: [{
      properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: M, bottom: M, left: M, right: M } } },
      children: [
        p([run(c.title, { pt: 17, bold: true, color: NAVY })], { after: 20 }),
        p([run(c.subtitle, { pt: 10, color: GREY })], { after: 90 }),
        kpiTable,
        h('Where the site stands'),
        twoCol,
        h('SEO interventions needed'),
        grid([['Priority', 'Intervention', 'Why it matters'], ...c.interventions], [0.13, 0.42, 0.45], { boldFirst: true }),
        h('Traffic opportunity'),
        grid([['Topic area', 'Est. monthly searches', 'Role'], ...c.traffic], [0.42, 0.2, 0.38]),
        p(c.trafficNote, { pt: 8, color: GREY, before: 40, after: 0 }),
        h('Plan and what we need from you'),
        grid([['When', 'Focus'], ...c.timeline], [0.15, 0.85], { boldFirst: true }),
        p('**What we need from you:** ' + c.needs, { pt: 8.8, before: 60, after: 0 }),
      ],
    }],
  });
  return Packer.toBuffer(doc);
}

const TRAFFIC_NOTE = 'Search volumes are directional estimates, to be confirmed with Ahrefs/Semrush and Search Console data in week 1.';

const devzero = {
  file: 'DevZero-SEO-One-Pager.docx',
  colors: { NAVY: '1F3A5F', ACCENT: '2F7DBA', LIGHT: 'E8F1F8', LINE: 'C5D6E5' },
  title: 'DevZero · SEO Priorities',
  subtitle: 'devzero.io: Kubernetes and GPU compute optimisation for platform and infrastructure teams',
  kpis: [
    ['~5,500', 'indexable pages'],
    ['67', 'blog posts (leaders: 250–550)'],
    ['11', 'competitor comparison pages'],
    ['20–50k', 'est. monthly visits in 12 months'],
  ],
  strengths: [
    '**Solid technical base:** fast server-rendered pages, clean canonicals, rich structured data, AI crawlers allowed.',
    '**Unique pricing tools:** 5,200+ instance, spot and GPU pricing pages that no direct competitor matches.',
    '**Clear money pages:** cost optimisation, pod rightsizing, VPA, Karpenter, GPU, plus 11 "vs" pages.',
    '**Ranks well for:** "VPA alternative", "rightsizing without restarts" and "EKS cost optimization".',
  ],
  gaps: [
    '**The pivot left traces:** old dev-environment URLs redirect to /blog, which wastes their backlink value.',
    '**AI summary file (llms.txt) is out of date:** it still describes MicroVMs and dev environments.',
    '**Off-topic pages indexed:** Python and JavaScript webinars dilute the site\'s focus on Kubernetes.',
    '**Missing from "best Kubernetes cost tools" lists** and review sites, where buyers and AI assistants look.',
  ],
  interventions: [
    ['Now', 'Clean up after the pivot: redirect old posts to relevant pages, refresh llms.txt, remove off-topic pages, fix "2025" titles and heading errors.', 'Recovers lost authority and tells Google and AI assistants clearly what DevZero does today.'],
    ['Now', 'Take back the ~39 Kubernetes posts duplicated on nautili.ai.', 'Stops the two sites competing with each other for the same searches.'],
    ['1–3 mo', 'Add "alternatives" pages (Cast AI, Kubecost, ScaleOps, PerfectScale, Zesty, Spot Ocean) and an AKS/OKE solution page.', 'The highest-converting searches in the category; competitor acquisitions are creating demand.'],
    ['1–3 mo', 'Get listed: outreach to "best tools 2026" list authors, plus G2, Gartner and Capterra profiles.', 'These lists dominate page one and feed the answers AI assistants give.'],
    ['1–3 mo', 'Launch a GPU price index and a "State of Kubernetes Waste" report from cluster-analyser data.', 'Original data earns links and press; GPU pricing is a fast-growing search.'],
    ['3+ mo', 'Publish twice a week across rightsizing, GPU, autoscaling, cloud and pricing topics; make instance pages more unique.', 'Closes the content gap with Cast AI and PerfectScale and keeps programmatic pages indexed.'],
  ],
  traffic: [
    ['Kubernetes cost optimisation and rightsizing', '5–10k', 'Bottom of funnel: demos'],
    ['Autoscaling education (HPA, VPA, Karpenter)', '30–60k', 'Awareness, internal links'],
    ['Cloud, instance and GPU pricing', '100k+ (long tail)', 'Volume, links, tool usage'],
    ['Competitor "vs" and "alternatives"', '1–3k', 'Highest conversion'],
  ],
  trafficNote: TRAFFIC_NOTE + ' A single DevZero customer is worth five to six figures a year, so a small number of extra demos justifies the investment.',
  timeline: [
    ['Weeks 1–4', 'Technical clean-up, separate content from Nautili, baseline rankings and traffic'],
    ['Months 2–3', 'Alternatives pages, list and review-site outreach, GPU price index'],
    ['Months 4–12', 'Publish twice a week, data report, improve programmatic pages, track AI assistant mentions'],
  ],
  needs: 'Search Console and analytics access, CMS access (or a developer contact for redirects), an Ahrefs/Semrush seat, anonymised cluster-analyser data for the report, and sign-off on which pages move to Nautili.',
};

const nautili = {
  file: 'Nautili-SEO-One-Pager.docx',
  colors: { NAVY: '24324A', ACCENT: '7A4FC4', LIGHT: 'F0EBF9', LINE: 'D6CCEA' },
  title: 'Nautili · SEO Priorities',
  subtitle: 'nautili.ai: the LLM gateway for routing, spend attribution and governance of AI traffic',
  kpis: [
    ['~717', 'indexable pages'],
    ['~7', 'posts on LLM topics (of 46)'],
    ['2', 'competitor comparison pages'],
    ['10–30k', 'est. monthly visits in 12 months'],
  ],
  strengths: [
    '**Solid technical base:** fast pages, clean canonicals, Dataset and FAQ structured data, an accurate llms.txt.',
    '**573 model and provider pages** that give a base for model-pricing searches.',
    '**Strong early content:** OpenRouter and Portkey comparisons, open-source gateways roundup, Claude Code cost.',
    '**Clear pricing advantage:** a 4% fee versus about 5.5% on OpenRouter, with your own keys or GPUs.',
  ],
  gaps: [
    '**Brand not yet visible:** a search for "nautili.ai" returns unrelated "Nautilus" companies.',
    '**~39 DevZero Kubernetes posts duplicated** on the blog, off-topic for an LLM gateway.',
    '**devzero.io sells the same product** on its own /inference pages without mentioning Nautili.',
    '**Thin coverage:** 2 comparison pages and 1 integration page; missing from "best LLM gateway" lists.',
  ],
  interventions: [
    ['Now', 'Remove the duplicated Kubernetes posts (redirect each to its devzero.io original).', 'Gives Nautili a clear AI-gateway focus and ends competition between the two sites.'],
    ['Now', 'Redirect devzero.io/inference pages to nautili.ai and add a "Nautili by DevZero" link on devzero.io.', 'Transfers DevZero\'s authority to the new domain, the fastest way to make the brand visible.'],
    ['Now', 'Set up Search Console, brand schema (sameAs links), consistent "Nautili" naming, heading fixes.', 'Helps Google recognise Nautili as a distinct brand rather than a typo for "Nautilus".'],
    ['1–3 mo', 'Add 8+ comparison and "alternatives" pages (OpenRouter, Portkey, LiteLLM, Helicone, Bifrost, Cloudflare, Vercel, Kong).', 'Portkey (Palo Alto Networks) and OpenRouter (Stripe) acquisitions are pushing buyers to look elsewhere.'],
    ['1–3 mo', 'Add integration pages (Cursor, Codex, Gemini CLI, LangChain, Vercel AI SDK) and a stand-alone fee calculator.', 'Captures searches from developers already using those tools, plus a shareable, link-earning tool.'],
    ['3+ mo', 'Own "AI coding spend": cost-per-developer content and a data report from gateway traffic; add live price and latency data to model pages.', 'A fast-growing, lightly contested topic that engineering leaders with budgets are searching for.'],
  ],
  traffic: [
    ['LLM gateway, AI gateway, LLM router', '10–20k', 'Category intent'],
    ['OpenRouter, Portkey and LiteLLM alternatives', '5–10k (rising)', 'Highest conversion'],
    ['AI coding cost (Claude Code, Cursor, Codex)', '20–60k', 'Engineering leaders with budgets'],
    ['Model API pricing (Claude, GPT, Gemini)', '100k+ (long tail)', 'Volume; highly competitive'],
  ],
  trafficNote: TRAFFIC_NOTE + ' Nautili is self-serve, so search volume turns directly into sign-ups on the free Demo tier.',
  timeline: [
    ['Weeks 1–4', 'Remove duplicates, redirects from devzero.io, Search Console and brand set-up, alternatives pages'],
    ['Months 2–3', 'Comparison and integration pages, fee calculator, Product Hunt and Hacker News launch, list outreach'],
    ['Months 4–12', 'AI coding spend cluster and report, richer model pages, case studies, track AI assistant mentions'],
  ],
  needs: 'Search Console and analytics access, CMS access, an Ahrefs/Semrush seat, sign-off on moving inference pages from devzero.io, 3–5 customer stories, and anonymised gateway data for the spend report.',
};

Promise.all([devzero, nautili].map(async c => {
  const f = path.join(outDir, c.file);
  fs.writeFileSync(f, await build(c));
  console.log('wrote', f);
}));
