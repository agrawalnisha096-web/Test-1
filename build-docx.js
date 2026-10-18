// Convert qubik-launch-plan-v4.md into a formatted A4 Word document.
const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType,
  ShadingType, BorderStyle, AlignmentType, LevelFormat, PageBreak, HeadingLevel,
} = require('docx');

const [src, out, bodyPt = '9.5', marginMm = '13'] = process.argv.slice(2);
const md = fs.readFileSync(src, 'utf8');

const FONT = 'Arial';
const BODY = Math.round(parseFloat(bodyPt) * 2);       // half-points
const SMALL = BODY - 2;
const MARGIN = Math.round(parseFloat(marginMm) * 56.7); // DXA
const PAGE_W = 11906;                                   // A4 width DXA
const CONTENT_W = PAGE_W - 2 * MARGIN;
const ACCENT = '1F4E79';

// Inline markdown: **bold**, *italic*, `code`, ⟦placeholder⟧ (highlighted)
function runs(text, base = {}) {
  const out = [];
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|⟦[^⟧]*⟧)/g;
  let last = 0, m;
  const push = (t, o = {}) => { if (t) out.push(new TextRun({ text: t, font: FONT, size: base.size || BODY, ...base, ...o })); };
  while ((m = re.exec(text))) {
    push(text.slice(last, m.index));
    const tok = m[0];
    if (tok.startsWith('**')) {
      // allow placeholders inside bold
      runs(tok.slice(2, -2), { ...base, bold: true }).forEach(r => out.push(r));
    } else if (tok.startsWith('`')) push(tok.slice(1, -1));
    else if (tok.startsWith('⟦')) push(tok, { highlight: 'yellow' });
    else push(tok.slice(1, -1), { italics: true });
    last = m.index + tok.length;
  }
  push(text.slice(last));
  return out;
}

const para = (text, opts = {}) => new Paragraph({
  children: runs(text, opts.run || {}),
  spacing: { after: opts.after ?? 60, before: opts.before ?? 0, line: opts.line ?? 240 },
  ...opts.p,
});

const border = { style: BorderStyle.SINGLE, size: 4, color: 'BFBFBF' };
const borders = { top: border, bottom: border, left: border, right: border };

function table(rows) {
  const header = rows[0];
  const n = header.length;
  // column weights by table shape
  let weights;
  if (n === 4) weights = [4, 18, 60, 18];
  else if (n === 3 && /CPL/.test(header.join(''))) weights = [44, 28, 28];
  else if (n === 3 && /^By$/.test(header[0].trim())) weights = [16, 50, 34];
  else if (n === 3) weights = [17, 40, 43];
  else weights = Array(n).fill(100 / n);
  const total = weights.reduce((a, b) => a + b, 0);
  const widths = weights.map(w => Math.floor(CONTENT_W * w / total));
  widths[n - 1] += CONTENT_W - widths.reduce((a, b) => a + b, 0);
  const mkRow = (cells, isHead) => new TableRow({
    tableHeader: isHead,
    children: cells.map((c, i) => new TableCell({
      borders,
      width: { size: widths[i], type: WidthType.DXA },
      shading: isHead ? { fill: 'DCE6F1', type: ShadingType.CLEAR, color: 'auto' } : undefined,
      margins: { top: 15, bottom: 15, left: 70, right: 70 },
      children: [new Paragraph({
        children: runs(c.trim(), { size: SMALL, bold: isHead || undefined }),
        spacing: { after: 0, line: 240 },
      })],
    })),
  });
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: widths,
    rows: rows.map((r, i) => mkRow(r, i === 0)),
  });
}

function blocks(text) {
  const lines = text.split('\n');
  const out = [];
  let i = 0;
  while (i < lines.length) {
    const l = lines[i];
    if (!l.trim() || /^---\s*$/.test(l) || l.startsWith('<!--')) { i++; continue; }
    if (l.startsWith('## ')) {
      out.push(new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun({ text: l.slice(3), font: FONT, size: BODY + 5, bold: true, color: ACCENT })],
        spacing: { before: 90, after: 40 }, keepNext: true,
        border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: 'BFBFBF', space: 1 } },
      }));
      i++; continue;
    }
    if (l.startsWith('|')) {
      const rows = [];
      while (i < lines.length && lines[i].startsWith('|')) {
        if (!/^\|[\s|:-]+\|$/.test(lines[i].trim())) rows.push(lines[i].trim().slice(1, -1).split('|'));
        i++;
      }
      out.push(table(rows));
      out.push(new Paragraph({ children: [], spacing: { after: 0, line: 160 } }));
      continue;
    }
    if (l.startsWith('>')) {
      const q = [];
      while (i < lines.length && lines[i].startsWith('>')) { q.push(lines[i].replace(/^>\s?/, '')); i++; }
      // group into paragraphs separated by empty quote lines
      const paras = q.join('\n').split(/\n\s*\n/).map(s => s.replace(/\n/g, ' ').trim()).filter(Boolean);
      paras.forEach((p, k) => out.push(new Paragraph({
        children: runs(p),
        indent: { left: 240 },
        shading: { fill: 'F2F2F2', type: ShadingType.CLEAR, color: 'auto' },
        border: { left: { style: BorderStyle.SINGLE, size: 18, color: '8EA9C1', space: 6 } },
        spacing: { after: k === paras.length - 1 ? 80 : 20, line: 240 },
      })));
      continue;
    }
    let m;
    if ((m = l.match(/^(\s*)- (.*)$/))) {
      out.push(new Paragraph({ children: runs(m[2]), numbering: { reference: 'bullets', level: m[1].length ? 1 : 0 }, spacing: { after: 20, line: 240 } }));
      i++; continue;
    }
    if ((m = l.match(/^(\d+)\. (.*)$/))) {
      out.push(new Paragraph({ children: runs(m[2]), numbering: { reference: 'numbers-' + numberingGroup, level: 0 }, spacing: { after: 20, line: 240 } }));
      i++;
      if (!(lines[i] && /^\d+\. /.test(lines[i]))) numberingGroup++;
      continue;
    }
    out.push(para(l));
    i++;
  }
  return out;
}
let numberingGroup = 0;

// Split the markdown into cover / body / sources
const [coverMd, rest] = md.split('<!-- Cover page ends. Pages 1–3 below. -->');
const [bodyMd, sourcesMd] = rest.split('## Sources');

const coverLines = coverMd.split('\n').filter(s => s.trim());
const title = coverLines[0].replace(/^# /, '');
const cover = [
  new Paragraph({ children: [], spacing: { before: 2600 } }),
  new Paragraph({ children: [new TextRun({ text: title, font: FONT, size: 44, bold: true, color: ACCENT })], spacing: { after: 200 } }),
  new Paragraph({ children: [], border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: ACCENT, space: 1 } }, spacing: { after: 240 } }),
  ...coverLines.slice(1).map(l => para(l.replace(/^\*(.*)\*$/, '_$1_').replace(/^_(.*)_$/, '*$1*'), { run: { size: 22 }, after: 140 })),
  new Paragraph({ children: [new PageBreak()] }),
];

const body = blocks(bodyMd);
const sources = [
  new Paragraph({ children: [new PageBreak()] }),
  new Paragraph({ children: [new TextRun({ text: 'Sources', font: FONT, size: BODY + 5, bold: true, color: ACCENT })], spacing: { after: 100 } }),
  ...blocks(sourcesMd),
];

// count numbered-list groups used
const numberingConfigs = [{
  reference: 'bullets',
  levels: [
    { level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 300, hanging: 200 } } } },
    { level: 1, format: LevelFormat.BULLET, text: '–', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 600, hanging: 200 } } } },
  ],
}];
for (let g = 0; g <= numberingGroup; g++) numberingConfigs.push({
  reference: 'numbers-' + g,
  levels: [{ level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 300, hanging: 240 } } } }],
});

const doc = new Document({
  creator: 'Qubik launch plan',
  styles: { default: { document: { run: { font: FONT, size: BODY } } } },
  numbering: { config: numberingConfigs },
  sections: [{
    properties: { page: { size: { width: PAGE_W, height: 16838 }, margin: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN } } },
    children: [...cover, ...body, ...sources],
  }],
});

Packer.toBuffer(doc).then(b => { fs.writeFileSync(out, b); console.log('wrote', out); });
