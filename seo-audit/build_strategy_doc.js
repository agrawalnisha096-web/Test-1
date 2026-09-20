const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, TableOfContents,
  Table, TableRow, TableCell, WidthType, BorderStyle, ShadingType, AlignmentType,
  PageBreak, PageOrientation, LevelFormat
} = require('docx');

const OUTDIR = path.join(__dirname, 'trillet_dfs_out');
const CONTENT_W = 9360; // US Letter, 1" margins

// ---- tiny CSV parser (handles quoted fields) ----
function parseCSV(file) {
  const text = fs.readFileSync(path.join(OUTDIR, file), 'utf8').replace(/\r/g, '');
  const rows = [];
  let row = [], cur = '', q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"' && text[i + 1] === '"') { cur += '"'; i++; }
      else if (c === '"') q = false;
      else cur += c;
    } else {
      if (c === '"') q = true;
      else if (c === ',') { row.push(cur); cur = ''; }
      else if (c === '\n') { row.push(cur); rows.push(row); row = []; cur = ''; }
      else cur += c;
    }
  }
  if (cur.length || row.length) { row.push(cur); rows.push(row); }
  const header = rows.shift();
  return rows.filter(r => r.length > 1 && r.some(x => x !== ''))
             .map(r => Object.fromEntries(header.map((h, i) => [h, r[i] ?? ''])));
}

// ---- style helpers ----
const NAVY = '1F3A5F', ACCENT = '2E6B8A', LIGHT = 'EAF1F6', GREY = '6B7683', BORDER = 'C9D3DB';
function t(text, opts = {}) { return new TextRun({ text, ...opts }); }
function p(children, opts = {}) {
  return new Paragraph({ children: Array.isArray(children) ? children : [children], spacing: { after: 120, line: 276 }, ...opts });
}
function body(text, opts = {}) { return p([t(text)], { spacing: { after: 140, line: 288 }, ...opts }); }
function h1(text) { return new Paragraph({ text, heading: HeadingLevel.HEADING_1, spacing: { before: 320, after: 160 } }); }
function h2(text) { return new Paragraph({ text, heading: HeadingLevel.HEADING_2, spacing: { before: 240, after: 120 } }); }
function bullet(text, level = 0, runs = null) {
  return new Paragraph({ children: runs || [t(text)], numbering: { reference: 'bl', level }, spacing: { after: 80, line: 276 } });
}
function cell(text, { w, head = false, bold = false, align = AlignmentType.LEFT, shade = null, color = null, size = 18 } = {}) {
  return new TableCell({
    width: { size: w, type: WidthType.DXA },
    shading: shade ? { type: ShadingType.CLEAR, fill: shade, color: 'auto' } : undefined,
    margins: { top: 40, bottom: 40, left: 90, right: 90 },
    children: [new Paragraph({
      alignment: align,
      spacing: { after: 0, line: 240 },
      children: [t(String(text), { bold: head || bold, color: head ? 'FFFFFF' : (color || '222222'), size })],
    })],
  });
}
function table(headers, rows, widths) {
  const thin = { style: BorderStyle.SINGLE, size: 4, color: BORDER };
  const trh = new TableRow({
    tableHeader: true,
    children: headers.map((hd, i) => cell(hd, { w: widths[i], head: true, align: i === 0 ? AlignmentType.LEFT : AlignmentType.LEFT })),
  });
  const trs = rows.map((r, ri) => new TableRow({
    children: r.map((c, i) => cell(c, { w: widths[i], shade: ri % 2 ? LIGHT : null })),
  }));
  return new Table({
    columnWidths: widths,
    width: { size: CONTENT_W, type: WidthType.DXA },
    borders: { top: thin, bottom: thin, left: thin, right: thin, insideHorizontal: thin, insideVertical: thin },
    rows: [trh, ...trs],
  });
}

// ---- load data ----
const ent = parseCSV('enterprise_placement_targets.csv');
const rec = parseCSV('receptionist_placement_targets.csv');
const bl  = parseCSV('competitor_backlinks_autocalls_dofollow.csv');

const num = x => { const n = parseInt(x, 10); return isNaN(n) ? 99999 : n; };
function topTargets(rows, n) {
  return rows
    .map(r => ({ d: r.domain, g: r.google_best_rank || '—', l: r.llm_cites || '0', a: r.ai_overview_cites || '0', pg: r.example_page || '' }))
    .sort((x, y) => (num(y.l) + num(y.a) * 1) - (num(x.l) + num(x.a) * 1) || num(x.g) - num(y.g))
    .slice(0, n);
}
const entTop = topTargets(ent, 18);
const recTop = topTargets(rec, 18);
const dirs = bl.map(r => r.referring_domain)
               .sort((a, b) => 0).slice(0, 40);

function short(u) { return u.length > 62 ? u.slice(0, 60) + '…' : u; }

// ================= DOCUMENT =================
const cover = [
  new Paragraph({ spacing: { before: 1400, after: 0 }, children: [t('TRILLET', { bold: true, size: 60, color: NAVY })] }),
  new Paragraph({ spacing: { after: 40 }, children: [t('Voice-AI SEO & GEO Strategy', { size: 40, color: ACCENT })] }),
  new Paragraph({ spacing: { after: 400 }, children: [t('Search & AI-Answer Visibility — Findings, Targets, and Roadmap', { size: 26, color: GREY, italics: true })] }),
  new Paragraph({ border: { top: { style: BorderStyle.SINGLE, size: 12, color: NAVY } }, spacing: { after: 200 }, children: [t('')] }),
  new Paragraph({ spacing: { after: 60 }, children: [t('Prepared for: Management review', { size: 24, color: '222222' })] }),
  new Paragraph({ spacing: { after: 60 }, children: [t('Scope: White-label · Enterprise · AI answering / receptionist', { size: 24, color: '222222' })] }),
  new Paragraph({ spacing: { after: 60 }, children: [t('Data source: DataForSEO — SERP, Labs, LLM (ChatGPT / Perplexity / Gemini / Claude), Backlinks', { size: 24, color: '222222' })] }),
  new Paragraph({ spacing: { after: 60 }, children: [t('Date: 20 September 2026', { size: 24, color: '222222' })] }),
  new Paragraph({ children: [new PageBreak()] }),
];

const toc = [
  h1('Contents'),
  new TableOfContents('Contents', { hyperlink: true, headingStyleRange: '1-2' }),
  new Paragraph({ children: [new PageBreak()] }),
];

const execSummary = [
  h1('1. Executive summary'),
  body('This audit maps where Trillet appears — and does not appear — across Google search results and AI-assistant answers (ChatGPT, Perplexity, Gemini, Claude) for 20 buyer keywords and 14 buyer questions spanning our three priority clusters: white-label/agency, enterprise, and AI answering/receptionist.'),
  p([t('The central finding: ', { bold: true }), t('Trillet is winning the AI-answer game and losing the Google-organic game. ', { bold: true, color: NAVY }), t('Trillet is the single most-cited source in AI answers for white-label queries, yet is largely absent from Google’s organic results, where third-party "parasite" sites (Reddit, YouTube) dominate. The strategic response is to lead with GEO — Generative Engine Optimization, i.e. getting Trillet cited inside AI answers — and to treat the organic/parasite problem as a separate, secondary track.')]),
  h2('Five decisions this document supports'),
  bullet('Reallocate effort toward GEO. 83% of AI citations point to third-party pages, not vendor homepages — so visibility is won by getting Trillet onto trusted third-party pages, not by optimising trillet.ai.'),
  bullet('Run an AI-tool directory saturation sweep now. It is free, fast, and is demonstrably how a smaller competitor (autocalls.ai) reached citation parity with the category leader.'),
  bullet('Defend and extend white-label — our proven strength (named in 9 of 16 AI answers).'),
  bullet('Attack enterprise and receptionist — our two whitespaces (named in 0 of 6 answers each) — via specific capability and vertical angles, not head-to-head with incumbents.'),
  bullet('Stand up a modest newswire PR cadence — AI assistants cite syndicated press releases, and competitors are already exploiting this.'),
  p([t('Audit cost: ', { bold: true }), t('approximately $0.76 of a $1.00 DataForSEO credit. All underlying data is delivered as CSV files alongside this document.')]),
];

const method = [
  h1('2. Methodology & data scope'),
  body('Data was collected programmatically via the DataForSEO API across five endpoint families. Costs were metered against the live "cost" field returned on each response and hard-capped to stay within a $1 budget.'),
  table(
    ['Data layer', 'What it measures', 'Coverage'],
    [
      ['SERP (Google organic + AI Overview)', 'Who ranks in the top 20, and what Google’s AI Overview cites', '20 keywords'],
      ['Labs (ranked keywords)', 'Keyword footprint per domain, search volumes', 'Trillet + 3 rivals'],
      ['LLM responses', 'Whether Trillet is named and which domains are cited', '14 prompts × up to 4 engines'],
      ['Backlinks', 'Where a competitor earns its third-party placements', 'autocalls.ai (671 ref. domains)'],
    ],
    [3400, 3960, 2000]
  ),
  h2('Caveats management should weigh'),
  bullet('The LLM-citation sample (~28 answers) is directionally reliable but small; individual domain counts should be read as signal, not precise share.'),
  bullet('ChatGPT returned almost no citations (1 of 10 answers); usable AI-citation signal is mostly Perplexity, Gemini, and Claude.'),
  bullet('Gemini and Claude were sampled on the white-label cluster only; enterprise and receptionist LLM data is from ChatGPT + Perplexity.'),
  bullet('AI-assistant model coverage and citations change frequently; treat this as a point-in-time baseline to be re-run quarterly.'),
];

const thesis = [
  h1('3. Strategic thesis: organic vs. AI answers'),
  body('Trillet’s visibility diverges sharply by channel. This divergence is the most important strategic fact in the audit.'),
  table(
    ['Channel', 'Trillet’s position', 'Who wins instead'],
    [
      ['Google organic (top-20)', 'Weak — 7 listings across 20 keywords', 'Reddit & YouTube (parasites)'],
      ['AI-answer citations (256 total)', 'Strong in white-label — #1 cited domain', 'Third-party sites (83% of citations)'],
      ['Google AI Overview', 'Cited once; fires mainly for receptionist', 'smith.ai, getAira, RingCentral'],
    ],
    [2700, 3660, 3000]
  ),
  p([t('Citation ownership across all four AI engines (256 citations): ', {}), t('third-party sites 83%, competitors 11%, Trillet 5%, parasites 1%. ', { bold: true }), t('The takeaway is that AI visibility is a placement game played on other people’s pages.')]),
];

function clusterTargetTable(rows) {
  return table(
    ['Placement target', 'Google rank', 'AI cites', 'Example page to get listed on'],
    rows.map(r => [r.d, r.g, `${r.l}${r.a !== '0' ? ' (+' + r.a + ' AIO)' : ''}`, short(r.pg || '—')]),
    [2200, 1200, 1200, 4760]
  );
}

const clusters = [
  h1('4. Cluster strategy & placement targets'),
  body('Each cluster has a distinct competitive structure and therefore a distinct placement playbook. Full target lists (97 enterprise, 96 receptionist, 132 directory targets) accompany this document as CSV files; the tables below show the highest-value entries.'),

  h2('4.1 White-label / agency — DEFEND & EXTEND (our strength)'),
  p([t('AI answers name Trillet in ', {}), t('9 of 16', { bold: true }), t(' white-label prompts, and trillet.ai is the most-cited domain. The reproducible tactic, reverse-engineered from autocalls.ai, is ', {}), t('AI-tool directory saturation', { bold: true }), t(' — 130+ self-serve directory listings that AI assistants ingest heavily.')]),
  bullet('Immediate, free action: submit Trillet to the directories in Appendix A.'),
  bullet('Editorial listicles to pursue: botpenguin.com, convocore.ai, dvaarik.com ("best white-label AI voice platform" posts).'),
  bullet('Risk if ignored: this is our only current AI-visibility moat — competitors are actively submitting to the same directories.'),

  h2('4.2 Enterprise — WHITESPACE via capability angles'),
  p([t('Trillet is named in ', {}), t('0 of 6', { bold: true }), t(' enterprise answers and has zero organic listings. Direct competition (Salesforce, Genesys, NICE, Aircall) is not winnable head-to-head. The citations instead cluster around two capability lanes where the field is thin:')]),
  bullet('HIPAA / healthcare compliance — a wide-open lane (getprosper.ai, usehello.ai, coval.ai, murf.ai, parloa.com, voiceai.guide/hipaa). Requires a HIPAA/BAA story.'),
  bullet('CRM integration — "voice AI + CRM" content and placements (monday.com, justcall.io, twig.so, respond.io).'),
  body('Highest-value enterprise placement targets (appearing in Google and/or AI answers):'),
  clusterTargetTable(entTop),

  h2('4.3 AI answering / receptionist — WHITESPACE, GEO-critical'),
  p([t('Trillet is named in ', {}), t('0 of 6', { bold: true }), t(' receptionist answers, but this cluster is the ', {}), t('only one where Google’s AI Overview fires heavily', { bold: true }), t(' — so AI-Overview optimisation matters most here. Crucially, the voice-AI competitors barely rank; the field is receptionist specialists (smith.ai, goodcall, heyrosie) plus parasites.')]),
  bullet('Beatable listicle targets: smith.ai, getnextphone.com, withallo.com, dapta.ai, vellum.ai, cloudtalk.io, getvoip.com, upfirst.ai.'),
  bullet('Vertical niche lane: dental & HVAC listicles (dentalintel.com, dentistryiq.com) — low-competition entry via "AI receptionist for dental office / HVAC".'),
  body('Highest-value receptionist placement targets:'),
  clusterTargetTable(recTop),
];

const parasite = [
  h1('5. The parasite problem (Google-organic only)'),
  body('Third-party "parasite" hosts dominate Trillet’s organic search landscape — but barely register in AI answers (2 of 256 citations). This confirms the parasite issue is a Google-organic problem, not an AI-answer problem, and should be resourced accordingly.'),
  table(
    ['Parasite host', 'Top-20 listings', 'Keywords', 'In top 10', 'Note'],
    [
      ['reddit.com', '23', '18', '17', 'Highest-impact — ranks where buyers click'],
      ['youtube.com', '39', '13', '6', 'Highest volume, lower positions'],
      ['medium.com / quora.com', '2', '2', '1', 'Minor'],
    ],
    [2300, 1700, 1500, 1400, 2460]
  ),
  bullet('Parasite density is worst in the receptionist cluster (YouTube 20, Reddit 7 listings).'),
  bullet('If pursued, focus parasite tactics (targeted Reddit threads, YouTube content) on receptionist keywords only.'),
];

const mechanics = [
  h1('6. How competitors earn AI citations (reproducible mechanics)'),
  body('The audit identified three distinct, copyable channels that feed AI-answer citations, in ascending order of effort and authority.'),
  table(
    ['Channel', 'How it works', 'Effort / cost', 'Priority'],
    [
      ['AI-tool directories', 'Self-serve submissions; AI assistants ingest them at scale', 'Low / free', 'Do first'],
      ['Newswire PR', 'AI assistants cite syndicated press releases (USA Today, Digital Journal, EIN, Business Wire, Cision)', 'Medium / paid', 'Do next'],
      ['Editorial "best-of" listicles', 'Outreach to be added to roundups (Rasa, Chatbase, Deepgram, AssemblyAI)', 'Medium / high effort', 'Ongoing'],
    ],
    [2300, 4160, 1600, 1300]
  ),
  p([t('Note on link quality: ', { bold: true }), t('most competitor backlinks are nofollow. This is fine for AI citations (assistants read the page regardless of link attribute) but contributes little to Google ranking — a further reason to treat GEO and classic SEO as separate tracks.')]),
];

const roadmap = [
  h1('7. Prioritised roadmap'),
  body('The plan sequences free, fast wins first, then compounding investments. "GEO" = getting cited in AI answers; "SEO" = classic Google ranking.'),
  table(
    ['#', 'Action', 'Cluster', 'Effort', 'Cost', 'Primary impact'],
    [
      ['1', 'AI-tool directory saturation sweep (Appendix A)', 'All', 'Low', 'Free', 'Broad GEO lift'],
      ['2', 'Outreach to per-cluster "best-of" listicles', 'All', 'Med', 'Free–low', 'Targeted GEO + SEO'],
      ['3', 'Newswire PR cadence (HIPAA + white-label angles)', 'All', 'Med', '$', 'Direct GEO citations'],
      ['4', 'HIPAA + CRM capability pages', 'Enterprise', 'Med', '—', 'Enters uncontested lane'],
      ['5', 'AI-Overview + vertical (dental/HVAC) optimisation', 'Receptionist', 'Med', 'Free–low', 'Most winnable whitespace'],
      ['6', 'Targeted Reddit / YouTube (optional)', 'Receptionist', 'Med', '—', 'Google-organic only'],
    ],
    [500, 3560, 1500, 900, 900, 2000]
  ),
  h2('Suggested sequencing'),
  bullet('Weeks 1–2: Action 1 (free, immediate, broad lift).'),
  bullet('Weeks 2–6: Actions 2 and 5 — pursue the two whitespaces while the directory sweep matures.'),
  bullet('Ongoing / quarterly: Actions 3 and 4 — compounding authority; re-run the full audit each quarter to track share-of-citation movement.'),
];

const appendixA = [
  h1('Appendix A — AI-tool directory submission list'),
  body('Derived from autocalls.ai’s referring-domain profile (the competitor at citation parity with Retell). These are self-serve submission targets; individually low-value, collectively high-coverage for AI-answer visibility. Full 132-domain list in competitor_backlinks_autocalls_dofollow.csv.'),
  table(
    ['Directory / aggregator (top by authority)', 'Directory / aggregator (cont.)'],
    Array.from({ length: Math.ceil(Math.min(dirs.length, 40) / 2) }, (_, i) => [dirs[i * 2] || '', dirs[i * 2 + 1] || '']),
    [4680, 4680]
  ),
];

const appendixB = [
  h1('Appendix B — Delivered data files'),
  body('All raw and processed data accompanies this document as CSV files in the seo-audit/trillet_dfs_out/ directory:'),
  ...[
    ['serp_rankings.csv', 'Top-20 Google results per keyword, domain classification'],
    ['ai_overview.csv', 'Google AI Overview presence and cited domains'],
    ['labs_keywords.csv', 'Ranked keywords + volumes for Trillet vs 3 rivals'],
    ['llm_answers.csv', 'ChatGPT + Perplexity: Trillet named, competitors, citations'],
    ['llm_answers_gemini_claude.csv', 'Gemini + Claude white-label citation probe'],
    ['share_of_voice.csv', 'Cluster-level share-of-voice roll-up'],
    ['enterprise_placement_targets.csv', '97 enterprise placement targets'],
    ['receptionist_placement_targets.csv', '96 receptionist placement targets'],
    ['competitor_backlinks_autocalls.csv / _dofollow.csv', 'Competitor placement/directory footprint'],
    ['cost_log.csv', 'Every metered API call with running spend'],
  ].map(([f, d]) => bullet('', 0, [t(f + ' — ', { bold: true, size: 20 }), t(d, { size: 20 })])),
];

const doc = new Document({
  creator: 'Trillet Growth',
  title: 'Trillet Voice-AI SEO & GEO Strategy',
  description: 'DataForSEO audit findings, placement targets, and roadmap',
  numbering: {
    config: [{
      reference: 'bl',
      levels: [
        { level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 460, hanging: 260 } } } },
        { level: 1, format: LevelFormat.BULLET, text: '–', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 920, hanging: 260 } } } },
      ],
    }],
  },
  styles: {
    default: { document: { run: { font: 'Calibri', size: 22, color: '222222' } } },
    paragraphStyles: [
      { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { font: 'Calibri', size: 30, bold: true, color: NAVY },
        paragraph: { spacing: { before: 320, after: 160 }, border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: BORDER } } } },
      { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { font: 'Calibri', size: 25, bold: true, color: ACCENT },
        paragraph: { spacing: { before: 240, after: 100 } } },
    ],
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 },
      },
    },
    children: [
      ...cover, ...toc, ...execSummary, ...method, ...thesis, ...clusters,
      ...parasite, ...mechanics, ...roadmap, ...appendixA, ...appendixB,
    ],
  }],
});

Packer.toBuffer(doc).then(buf => {
  const out = path.join(OUTDIR, 'Trillet_SEO_GEO_Strategy.docx');
  fs.writeFileSync(out, buf);
  console.log('wrote', out, buf.length, 'bytes');
});
