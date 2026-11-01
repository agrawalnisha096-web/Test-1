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
  ['A$600', 'test budget'],
  ['10–15 days', 'A$40–60 a day'],
  ['~75', 'clicks'],
  ['2–6', 'leads'],
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
const eW = [Math.floor(W * 0.44), Math.floor(W * 0.28)];
eW.push(W - eW.reduce((a, b) => a + b, 0));
const eRows = [
  ['For A$600', 'Lower case', 'Expected (Google forecast)'],
  ['Clicks', '33–43', '~75'],
  ['Average cost per click', 'A$14–18', '~A$8'],
  ['Leads (3–8% of clicks)', '1–3', '2–6'],
  ['Cost per lead', 'A$175–600', 'A$100–270'],
  ['Qualified leads (40–60% of leads)', '0–2', '1–4'],
  ['Cost per qualified lead', 'A$300+', 'A$150–670'],
];
const eTable = new Table({
  width: { size: W, type: WidthType.DXA }, columnWidths: eW,
  rows: eRows.map((r, i) => new TableRow({ children: r.map((c, j) => cell([p([run(c, { pt: 9, bold: i === 0 || j === 0, color: i === 0 ? NAVY : undefined })], { after: 0 })], eW[j], { fill: i === 0 ? LIGHT : undefined, pad: 35 })) })),
});

// Do / Need two-column table
const half = Math.floor(W / 2);
const col = (title, items, ref) => [p([run(title, { pt: 10.5, bold: true, color: TEAL })], { after: 40 }), ...items.map(x => bullet(x, ref))];
const doItems = [
  ['Set up tracking on qubik.com.au: Tag Manager, GA4, Google Ads conversions.'],
  ['Build two landing pages (process automation; AI implementation) with a lead form that records the ad and keyword behind each lead.'],
  ['Build the campaign: 26 high-intent keywords, 4 ad groups, 138 negative keywords, ads and extensions.'],
  ['Clean up search terms on days 3 and 7; adjust bids and ads.'],
  ['Report results within 2 business days of the test ending, with a recommendation.'],
];
const needItems = [
  ['A Google Ads account owned by Qubik, in AUD on Brisbane time, with Qubik\'s billing and manager access for me.'],
  ['A$600 test budget approved, paid directly to Google.'],
  ['WordPress admin access, a current backup, and approval for Tag Manager and Fluent Forms.'],
  ['Sign-off on the offer and page wording: free 30-minute call, assessment price, Xero partner wording, Dominic\'s photo and testimonial.'],
  ['Someone to call new leads within 15 minutes in business hours and mark which ones qualify.'],
  ['Privacy policy updated for analytics and ad tracking.'],
];
const twoCol = new Table({
  width: { size: half * 2, type: WidthType.DXA }, columnWidths: [half, half],
  rows: [new TableRow({ children: [
    cell(col('What I will do', doItems, 'b'), half, { borders: { top: none, bottom: none, left: none, right: thin }, pad: 0 }),
    cell(col('What I need from Qubik', needItems, 'n'), half, { borders: { top: none, bottom: none, left: none, right: none }, pad: 0 }),
  ] })],
});

// Timeline
const tW = [Math.floor(W * 0.2)]; tW.push(W - tW[0]);
const tRows = [
  ['Before launch', 'About 5 working days: access, tracking, landing pages built and tested'],
  ['Days 1–3', 'Campaign live; first search-term clean-up'],
  ['Days 4–10', 'Optimise; mid-test check on day 7'],
  ['Days 10–15', 'Test ends; report and recommendation within 2 business days'],
];
const tTable = new Table({
  width: { size: W, type: WidthType.DXA }, columnWidths: tW,
  rows: tRows.map(r => new TableRow({ children: r.map((c, j) => cell([p([run(c, { pt: 9, bold: j === 0 })], { after: 0 })], tW[j], { pad: 35 })) })),
});

// Decision rules
const dW = [Math.floor(W * 0.2)]; dW.push(W - dW[0]);
const dRows = [
  ['Scale', '1+ qualified lead, average cost per click A$15 or less, search terms relevant'],
  ['Fix', 'Clicks arrive but no leads: change the landing page or offer, then re-test'],
  ['Stop', 'Cost per click above A$20, or mostly irrelevant search terms after clean-up'],
];
const dTable = new Table({
  width: { size: W, type: WidthType.DXA }, columnWidths: dW,
  rows: dRows.map(r => new TableRow({ children: r.map((c, j) => cell([p([run(c, { pt: 9, bold: j === 0, color: j === 0 ? NAVY : undefined })], { after: 0 })], dW[j], { pad: 35 })) })),
});

const doc = new Document({
  numbering: { config: ['b', 'n'].map(ref => ({ reference: ref, levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 240, hanging: 170 } } } }] })) },
  styles: { default: { document: { run: { font: FONT, size: sz(9.5) } } } },
  sections: [{
    properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: M, bottom: M, left: M, right: M } } },
    children: [
      p([run('Qubik AI & Automation · Google Search Ads Test', { pt: 18, bold: true, color: NAVY })], { after: 30 }),
      p([run('Business process automation and AI implementation leads, Australia-wide', { pt: 10.5, color: GREY })], { after: 120 }),
      kpiTable,
      h('Keywords'),
      p('26 high-intent searches, such as "business process automation", "automation consultant", "workflow automation services", "AI implementation consultants", "AI agent development" and "AI readiness assessment". About 990 searches a month in Australia (Google Keyword Planner).'),
      h('Expected numbers'),
      eTable,
      p([run('A$600 is a signal test. It shows whether the searches, clicks and landing page convert before a larger budget is committed.', { pt: 9 })], { before: 50, after: 20 }),
      new Paragraph({ spacing: { before: 60, after: 0 }, children: [] }),
      twoCol,
      h('Timeline'),
      tTable,
      h('Decision after the test'),
      dTable,
    ],
  }],
});
Packer.toBuffer(doc).then(b => { fs.writeFileSync(out, b); console.log('wrote', out); });
