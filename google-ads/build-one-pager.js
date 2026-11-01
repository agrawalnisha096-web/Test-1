// One-page Google Ads proposal for Qubik (A4, single page).
const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType,
  ShadingType, BorderStyle, AlignmentType, LevelFormat,
} = require('docx');

const out = process.argv[2];
const FONT = 'Arial';
const NAVY = '2E4455', TEAL = '3F8F98', LIGHT = 'EAF3F4', GREY = '5B6B75';
const M = 680; // ~12mm margins
const W = 11906 - 2 * M;
const sz = pt => Math.round(pt * 2);

const run = (text, o = {}) => new TextRun({ text, font: FONT, size: sz(o.pt || 9.5), bold: o.bold, color: o.color, italics: o.italics });
const p = (children, o = {}) => new Paragraph({ children: Array.isArray(children) ? children : [run(children, o)], spacing: { after: o.after ?? 40, before: o.before ?? 0, line: 250 }, alignment: o.align });
const h = text => new Paragraph({ children: [run(text, { pt: 11, bold: true, color: NAVY })], spacing: { before: 120, after: 50 }, border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: 'BFCFD3', space: 1 } } });
const bullet = (parts, ref = 'b') => new Paragraph({ children: parts.map(x => typeof x === 'string' ? run(x) : x), numbering: { reference: ref, level: 0 }, spacing: { after: 20, line: 245 } });
const none = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
const thin = { style: BorderStyle.SINGLE, size: 4, color: 'C9D8DB' };

function cell(children, width, o = {}) {
  return new TableCell({
    width: { size: width, type: WidthType.DXA },
    shading: o.fill ? { fill: o.fill, type: ShadingType.CLEAR, color: 'auto' } : undefined,
    borders: o.borders || { top: thin, bottom: thin, left: thin, right: thin },
    margins: { top: o.pad ?? 50, bottom: o.pad ?? 50, left: 90, right: 90 },
    children,
  });
}

// KPI band
const kpis = [
  ['~A$1,400', 'monthly ad spend (~A$46/day)'],
  ['150–180', 'clicks a month'],
  ['5–14', 'leads a month'],
  ['A$100–280', 'per lead'],
];
const kw = Math.floor(W / 4);
const kpiTable = new Table({
  width: { size: kw * 4, type: WidthType.DXA },
  columnWidths: [kw, kw, kw, kw],
  rows: [new TableRow({ children: kpis.map(([n, l]) => cell([
    p([run(n, { pt: 16, bold: true, color: NAVY })], { after: 0, align: AlignmentType.CENTER }),
    p([run(l, { pt: 8.5, color: GREY })], { after: 0, align: AlignmentType.CENTER }),
  ], kw, { fill: LIGHT, borders: { top: none, bottom: none, left: { style: BorderStyle.SINGLE, size: 12, color: 'FFFFFF' }, right: { style: BorderStyle.SINGLE, size: 12, color: 'FFFFFF' } }, pad: 90 })) })],
});

// Expected numbers table
const eW = [Math.floor(W * 0.34), Math.floor(W * 0.22), Math.floor(W * 0.22)];
eW.push(W - eW.reduce((a, b) => a + b, 0));
const eRows = [
  ['', 'Lower case', 'Expected (Google forecast)', 'Basis'],
  ['Clicks a month', '40–70', '150–180', 'Planner forecast: 181 clicks at ~A$48/day'],
  ['Average cost per click', 'A$14–18', '~A$8', 'Forecast and Planner bid ranges'],
  ['Leads a month (3–8% of clicks)', '1–6', '5–14', 'Landing page conversion, my estimate'],
  ['Qualified leads (40–60% of leads)', '1–3', '2–8', 'Right size, decision-maker, real need'],
  ['Cost per qualified lead', 'A$300–1,400', 'A$175–700', 'Firmed up from real data after week 2'],
];
const eTable = new Table({
  width: { size: W, type: WidthType.DXA }, columnWidths: eW,
  rows: eRows.map((r, i) => new TableRow({ children: r.map((c, j) => cell([p([run(c, { pt: 8.8, bold: i === 0 || j === 0, color: i === 0 ? NAVY : undefined })], { after: 0 })], eW[j], { fill: i === 0 ? LIGHT : undefined, pad: 30 })) })),
});

// Do / Need two-column table
const half = Math.floor(W / 2);
const col = (title, items, ref) => [p([run(title, { pt: 10.5, bold: true, color: TEAL })], { after: 40 }), ...items.map(x => bullet(x, ref))];
const doItems = [
  ['Set up tracking on qubik.com.au (it has none today): Tag Manager, GA4, Google Ads conversions, enhanced conversions.'],
  ['Build two landing pages (process automation; AI implementation) on the existing site, hidden from the menu, with a lead form that records which ad and keyword brought each lead.'],
  ['Build the campaign: 26 high-intent keywords in 4 ad groups, 138 negative keywords to block software shoppers, job seekers and students, ads and extensions.'],
  ['Optimise twice a week: search terms, negatives, bids, ad copy.'],
  ['Send a weekly report (spend, leads, qualified leads, cost per qualified lead, meetings) and a day-30 recommendation: scale, adjust or stop.'],
];
const needItems = [
  ['A Google Ads account owned by Qubik, in AUD and Brisbane time, with Qubik\'s billing. I work in it as a manager.'],
  ['Ad budget approved: about A$1,400 a month, paid directly to Google.'],
  ['WordPress admin access, a current backup, and approval to add Tag Manager and one form plugin (Fluent Forms).'],
  ['Sign-off on the offer and what the page may say: free 30-minute call, assessment price, Xero partner wording, Dominic\'s photo and testimonial.'],
  ['A named person who calls new leads within 15 minutes in business hours, and tells me weekly which leads were qualified.'],
  ['Privacy policy updated to cover analytics and ad tracking.'],
];
const twoCol = new Table({
  width: { size: half * 2, type: WidthType.DXA }, columnWidths: [half, half],
  rows: [new TableRow({ children: [
    cell(col('What I will do', doItems, 'b'), half, { borders: { top: none, bottom: none, left: none, right: thin }, pad: 0 }),
    cell(col('What I need from Qubik', needItems, 'n'), half, { borders: { top: none, bottom: none, left: none, right: none }, pad: 0 }),
  ] })],
});

// Timeline
const tW = [Math.floor(W * 0.18)]; tW.push(W - tW[0]);
const tRows = [
  ['Week 1', 'Access, tracking, landing pages built and tested'],
  ['Week 2', 'Campaign live; first search-term clean-up after 3–4 days'],
  ['Weeks 3–4', 'Optimise; first qualified leads and meetings'],
  ['Day 30', 'Review with Qubik. Scale if a qualified lead costs A$750 or less; stop if it is above A$1,000 after clean-up'],
];
const tTable = new Table({
  width: { size: W, type: WidthType.DXA }, columnWidths: tW,
  rows: tRows.map(r => new TableRow({ children: r.map((c, j) => cell([p([run(c, { pt: 8.8, bold: j === 0 })], { after: 0 })], tW[j], { pad: 30 })) })),
});

const doc = new Document({
  numbering: { config: ['b', 'n'].map(ref => ({ reference: ref, levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 240, hanging: 170 } } } }] })) },
  styles: { default: { document: { run: { font: FONT, size: sz(9.5) } } } },
  sections: [{
    properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: M, bottom: M, left: M, right: M } } },
    children: [
      p([run('Qubik AI & Automation · Google Search Ads', { pt: 18, bold: true, color: NAVY })], { after: 30 }),
      p([run('A 30-day test to win business process automation and AI implementation leads across Australia', { pt: 10.5, color: GREY })], { after: 120 }),
      kpiTable,
      p([run('Expected figures for the first month, from Google\'s own forecast. Estimates until real data replaces them in week 2.', { pt: 8, italics: true, color: GREY })], { before: 50, after: 40 }),
      h('Who we reach'),
      p('Australian businesses actively searching for help, not browsing: "business process automation", "automation consultant", "workflow automation services", "AI implementation consultants", "AI agent development", "AI readiness assessment". About 990 searches a month (Google Keyword Planner, November 2026). Each ad leads to a page that matches the search, with a free 30-minute call as the next step.'),
      h('Expected numbers'),
      eTable,
      p([run('The lower case applies if Google shows the ads only on the exact phrases; the forecast includes close variants of each phrase. The forecast was pulled for December, so it will be re-run for a normal month before launch.', { pt: 8, italics: true, color: GREY })], { before: 40, after: 20 }),
      new Paragraph({ spacing: { before: 60, after: 0 }, children: [] }),
      twoCol,
      h('Timeline and decision'),
      tTable,
      p([run('Prepared by Vinaygopal Mawandia · ⟦DATE⟧', { pt: 8, color: GREY })], { before: 80, after: 0 }),
    ],
  }],
});
Packer.toBuffer(doc).then(b => { fs.writeFileSync(out, b); console.log('wrote', out); });
