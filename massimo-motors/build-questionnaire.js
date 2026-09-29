// Builds the Massimo Motors case-study intake questionnaire (.docx).
// Usage: npm install docx && node build-questionnaire.js [output.docx]
const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType,
  ShadingType, BorderStyle, AlignmentType, HeadingLevel, LevelFormat, Footer,
  PageNumber, TableLayoutType, VerticalAlign,
} = require("docx");

const OUT = process.argv[2] || "Massimo-Motors-Case-Study-Questionnaire.docx";

const ACCENT = "0C8577";
const ACCENT_SOFT = "E3F1EE";
const INK = "0E1B22";
const MUTED = "52646A";
const LINE = "C9D5D6";
const REQ = "B3261E";
const FONT = "Calibri";

const PAGE_W = 12240, MARGIN = 1080, CONTENT_W = PAGE_W - 2 * MARGIN; // 10080

const border = { style: BorderStyle.SINGLE, size: 4, color: LINE };
const borders = { top: border, bottom: border, left: border, right: border };
const cellMargins = { top: 90, bottom: 90, left: 120, right: 120 };

const t = (text, o = {}) => new TextRun({ text, font: FONT, size: 20, color: INK, ...o });
const p = (children, o = {}) =>
  new Paragraph({ children: Array.isArray(children) ? children : [t(children)], spacing: { after: 120, line: 276 }, ...o });
const bullet = (text) => new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 60 }, children: [t(text)] });
const h1 = (text) => new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text })] });
const h2 = (text) => new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun({ text })] });

function cell(children, width, o = {}) {
  return new TableCell({
    borders, width: { size: width, type: WidthType.DXA }, margins: cellMargins,
    verticalAlign: VerticalAlign.TOP, ...o,
    children: Array.isArray(children) ? children : [children],
  });
}

// Question table: # | Question (+ hint, priority tag) | Answer
const QW = [620, 4100, 5360];
let qCounter = {};
function questions(sectionNo, rows) {
  qCounter[sectionNo] = 0;
  const header = new TableRow({
    tableHeader: true,
    children: ["#", "Question", "Answer / notes"].map((h, i) =>
      cell(new Paragraph({ children: [t(h, { bold: true, color: "FFFFFF", size: 18 })] }), QW[i],
        { shading: { fill: ACCENT, type: ShadingType.CLEAR, color: "auto" } })),
  });
  const body = rows.map(([q, hint, req]) => {
    const n = `${sectionNo}.${++qCounter[sectionNo]}`;
    const qParas = [new Paragraph({ spacing: { after: hint ? 60 : 0 }, children: [
      t(q, { bold: true }),
      ...(req ? [t("  REQUIRED", { bold: true, color: REQ, size: 14 })] : []),
    ] })];
    if (hint) qParas.push(new Paragraph({ children: [t(hint, { color: MUTED, size: 17, italics: true })] }));
    return new TableRow({ cantSplit: true, children: [
      cell(new Paragraph({ children: [t(n, { color: MUTED, size: 18 })] }), QW[0]),
      cell(qParas, QW[1]),
      cell([new Paragraph({ children: [t("")] }), new Paragraph({ children: [t("")] })], QW[2]),
    ] });
  });
  return new Table({ width: { size: CONTENT_W, type: WidthType.DXA }, columnWidths: QW, layout: TableLayoutType.FIXED, rows: [header, ...body] });
}

// Generic grid with header row and blank rows
function grid(headers, widths, rows) {
  const head = new TableRow({ tableHeader: true, children: headers.map((h, i) =>
    cell(new Paragraph({ children: [t(h, { bold: true, color: "FFFFFF", size: 18 })] }), widths[i],
      { shading: { fill: ACCENT, type: ShadingType.CLEAR, color: "auto" } })) });
  const body = rows.map((r) => new TableRow({ cantSplit: true, children: widths.map((w, i) =>
    cell(new Paragraph({ children: [t(r[i] || "", { size: 18, bold: i === 0 && !!r[i] })] }), w)) }));
  return new Table({ width: { size: CONTENT_W, type: WidthType.DXA }, columnWidths: widths, layout: TableLayoutType.FIXED, rows: [head, ...body] });
}

function callout(title, lines) {
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA }, columnWidths: [CONTENT_W],
    rows: [new TableRow({ children: [cell([
      new Paragraph({ spacing: { after: 80 }, children: [t(title, { bold: true, color: ACCENT })] }),
      ...lines.map((l) => new Paragraph({ spacing: { after: 60 }, children: [t(l, { size: 19 })] })),
    ], CONTENT_W, { shading: { fill: ACCENT_SOFT, type: ShadingType.CLEAR, color: "auto" },
      borders: { top: border, bottom: border, right: border, left: { style: BorderStyle.SINGLE, size: 24, color: ACCENT } } })] })],
  });
}

const gap = () => new Paragraph({ spacing: { after: 120 }, children: [] });

// ---------------------------------------------------------------- content
const S = [];

// Cover
S.push(
  new Paragraph({ spacing: { before: 600, after: 80 }, children: [t("TRILLET · CUSTOMER STORY INTAKE", { bold: true, color: ACCENT, size: 18, characterSpacing: 40 })] }),
  new Paragraph({ spacing: { after: 120 }, children: [t("Massimo Motors: Voice AI Case Study Questionnaire", { bold: true, size: 44 })] }),
  p([t("For the account manager. Complete this with the client team so Marketing can write a publish-ready case study without a second round of questions.", { color: MUTED, size: 22 })], { spacing: { after: 300 } }),
  grid(["Field", "Details"], [3000, 7080], [
    ["Account manager", ""], ["Client champion (name, title)", ""], ["Other client contributors", ""],
    ["Trillet contributors (CSM, solutions, engineering)", ""], ["Date completed", ""], ["Return to (Marketing owner)", ""],
  ]),
  gap(),
  callout("How to use this questionnaire", [
    "1. Fill in Sections 1–2 yourself from the CRM and account notes. Most of this needs no client input.",
    "2. Send Sections 3–9 ahead of a 45-minute call with the client champion, or walk through them live and record the call (with permission).",
    "3. Questions marked REQUIRED are the minimum for a publishable story. Everything else makes it stronger.",
    "4. Every number needs a source and a date range. \"Roughly\" is fine for now; Marketing will confirm before publishing.",
    "5. Nothing goes public until Section 1 (permissions) and Section 10 (sign-off) are complete.",
  ]),
  gap(),
  callout("What makes a strong case study", [
    "A specific \"before\" moment (a missed call, a lost sale, a weekend backlog), a clear reason they chose Trillet, one or two headline numbers with a baseline, and a quote in the client's own words. If you only get four things, get those.",
  ]),
);

// 1. Permissions
S.push(h1("1. Permissions & approvals"),
  p("Settle this first. It decides whether we can name the client, use their logo and publish numbers.", { spacing: { after: 160 } }),
  questions(1, [
    ["Can we name Massimo Motors publicly?", "Options: full name + logo / name only / anonymised (e.g. \"a US powersports manufacturer\").", true],
    ["Can we use their logo, product images and brand colours?", "If yes, who supplies the files and are there brand guidelines?", true],
    ["Who at the client must approve the final draft?", "Name, title, email. Include Legal, Marketing or Communications if they need to review.", true],
    ["Is the company publicly listed or does it have investor-relations rules on what can be shared?", "Listed companies often need IR or Legal review of any performance figures.", true],
    ["Are there topics, figures or systems we must NOT mention?", "e.g. vendor names, revenue, headcount, pricing paid, internal tools."],
    ["Can we publish specific metrics, or only percentages or ranges?", "e.g. \"12,400 calls\" vs \"thousands of calls\" vs \"+40%\"."],
    ["Does the contract or NDA restrict publicity?", "Check the MSA/order form for a publicity or logo-use clause."],
    ["Where can the story appear?", "Trillet website, sales decks, LinkedIn, press release, paid ads, award entries, analyst briefings."],
    ["Is there a date before which we can't publish?", "e.g. product launch, earnings, dealer event."],
  ]));

// 2. Account snapshot
S.push(h1("2. Account snapshot"),
  p("The account manager can usually complete this from the CRM.", { spacing: { after: 160 } }),
  questions(2, [
    ["Legal entity name and the brand name customers know", "e.g. parent company vs. trading name.", true],
    ["What the business does, in one or two sentences", "Products, who buys them and how (direct, through dealers, online).", true],
    ["Headquarters and the regions / countries served", "", true],
    ["Company size", "Employees, number of locations, dealers or service centres, annual call volume if known."],
    ["Website and main public phone numbers covered by Trillet", ""],
    ["Customer since (contract signed) and go-live date", "", true],
    ["Trillet products and plan in use", "e.g. AI receptionist, inbound voice agents, outbound campaigns, enterprise, white-label.", true],
    ["How did they find Trillet?", "Inbound search, referral, partner/agency, event, outbound, AI assistant recommendation."],
    ["Was a partner or agency involved?", "If so, name and role. Check they are happy to be mentioned."],
  ]));

// 3. Before
S.push(h1("3. The situation before Trillet"),
  p("We want a vivid, specific picture of the problem. Ask for real examples, not just adjectives.", { spacing: { after: 160 } }),
  questions(3, [
    ["Who was calling, and why?", "Break down by caller type: retail buyers, current owners, dealers, parts or warranty, service, sales leads, suppliers. Rough % of each.", true],
    ["How were calls handled before?", "In-house team, call centre, answering service, voicemail, IVR menu, dealers. Hours covered.", true],
    ["What was going wrong?", "Missed or abandoned calls, long hold times, after-hours gaps, seasonal spikes, slow lead follow-up, repetitive questions tying up staff, inconsistent answers.", true],
    ["What did that cost them?", "Lost sales or leads, staff overtime, answering-service fees, dealer complaints, poor reviews, missed warranty or service revenue."],
    ["Baseline numbers before Trillet", "Complete the baseline column in Section 6. Ask what they were tracking at the time."],
    ["Is there a specific moment that made them act?", "e.g. a peak-season weekend, a launch that flooded the phones, a lost dealer, a bad review. Ask for the story."],
    ["What had they already tried?", "More staff, a call centre, IVR, chatbots, other voice AI vendors. Why didn't it work?"],
    ["What was the risk of doing nothing?", "In their words: what would have happened if the problem continued another year?"],
  ]));

// 4. Choosing Trillet
S.push(h1("4. Why Trillet"),
  questions(4, [
    ["What were they looking for in a solution?", "Their buying criteria: call quality, natural voice, integrations, speed to launch, cost, compliance, languages, reporting.", true],
    ["Which alternatives did they consider?", "Other voice AI platforms, call centres, answering services, hiring. We may not name them, but it helps the narrative."],
    ["Why did they pick Trillet over those options?", "The two or three deciding reasons. Get this in the client's own words if possible.", true],
    ["Who was involved in the decision?", "Roles, e.g. COO, head of customer service, IT, dealer network manager."],
    ["What concerns or objections did they have?", "e.g. \"Will customers hate talking to AI?\", data security, integration effort. How were they resolved?"],
    ["Was there a pilot or proof of concept?", "Scope, length and what result convinced them to go ahead."],
  ]));

// 5. Implementation
S.push(h1("5. The implementation"),
  p("Solutions or engineering can help here. Keep it factual; Marketing will simplify the language.", { spacing: { after: 160 } }),
  questions(5, [
    ["Which call types and tasks does the voice AI handle?", "List each use case, e.g. product questions, dealer locator, order or shipping status, warranty intake, parts enquiries, service booking, lead capture and qualification, after-hours overflow.", true],
    ["Inbound, outbound or both?", "For outbound: what campaigns (follow-ups, reminders, lead re-engagement)?"],
    ["How many agents, numbers or call flows were set up?", "Include departments or brands if separate."],
    ["Which systems does Trillet connect to?", "CRM, dealer management, ticketing or helpdesk, calendar, telephony or PBX, e-commerce, SMS, email. Name them and say what data moves each way.", true],
    ["What knowledge does the agent draw on?", "Product catalogue, FAQs, manuals, warranty policy, dealer list, pricing. How is it kept up to date?"],
    ["How and when do calls hand over to a person?", "Warm transfer, callback, ticket created, SMS summary. Which situations always go to a human?"],
    ["Languages, voice and persona", "Languages supported, voice chosen, agent name, tone of voice."],
    ["Compliance and security requirements", "Call recording consent, data retention, PII handling, payment data, SOC 2 / ISO review, TCPA for outbound. Anything that needed sign-off."],
    ["Timeline from kickoff to go-live", "Key milestones and dates. Was it phased (e.g. after-hours first, then daytime)?", true],
    ["Who worked on it on each side, and how much of the client's time did it take?", "e.g. \"two hours a week from the service manager for three weeks\"."],
    ["What was harder than expected, and how was it solved?", "An honest challenge makes the story credible. e.g. accents, model names, edge cases, a legacy phone system."],
    ["How was the agent tested and tuned after launch?", "Call reviews, script changes, knowledge updates, feedback loops."],
  ]));

// 6. Results
S.push(h1("6. Results"),
  p("This is the most important section. Fill in every metric you can, and delete the rows that don't apply. Each figure needs a baseline, a result, a date range and a source.", { spacing: { after: 160 } }),
  grid(["Metric", "Before", "After", "Period measured", "Source"], [3080, 1500, 1500, 2000, 2000], [
    ["Total calls handled by Trillet"],
    ["Answer rate / missed or abandoned calls"],
    ["Average wait or hold time"],
    ["Calls resolved without a person (%)"],
    ["Calls transferred to staff (%)"],
    ["After-hours / weekend calls captured"],
    ["Leads captured or qualified"],
    ["Appointments or service bookings made"],
    ["Speed to lead (time to first response)"],
    ["Revenue influenced or attributed"],
    ["Cost per call / total call-handling cost"],
    ["Staff hours freed per week or month"],
    ["Customer satisfaction (CSAT / NPS / reviews)"],
    ["Dealer satisfaction or complaints"],
    ["Peak-season capacity (max calls per day)"],
    [""], [""],
  ]),
  gap(),
  questions(6, [
    ["What are the one or two headline results they are proudest of?", "These become the case-study headline and stat callouts.", true],
    ["How were the numbers measured?", "Trillet dashboard, client CRM, phone system, finance. Who can confirm them?", true],
    ["What changed for staff day to day?", "What are they doing now instead of answering repetitive calls?"],
    ["What changed for customers and dealers?", "Faster answers, 24/7 access, fewer callbacks, better experience. Any feedback or comments?"],
    ["Any unexpected benefits?", "e.g. insights from call data, discovering common product questions, better demand forecasting."],
    ["How long did it take to see results?", "First week, first month, first peak season."],
    ["Did they expand usage after launch?", "More call types, numbers, departments, languages or outbound campaigns."],
  ]));

// 7. Stories
S.push(h1("7. Real moments"),
  p("One concrete example brings the whole story to life. Anonymise callers and remove personal details.", { spacing: { after: 160 } }),
  questions(7, [
    ["Describe a specific call that shows the value", "e.g. a 2 a.m. call that became a sale, a warranty issue resolved in one call, a dealer finding stock instantly.", true],
    ["Can we use a short, anonymised call excerpt or transcript?", "Needs client approval and caller consent under their recording policy."],
    ["Is there a before/after moment from the team?", "e.g. \"Last spring we had 300 voicemails on Monday morning. This spring we had none.\""],
    ["Anything surprising about how callers reacted to the AI?", "e.g. callers thanking the agent, not noticing it was AI, preferring it after hours."],
  ]));

// 8. Client interview
S.push(h1("8. Client champion interview"),
  p("Ask these directly and capture the answers word for word. These become the quotes. Short, specific and personal beats polished.", { spacing: { after: 160 } }),
  questions(8, [
    ["In one sentence, what does Trillet do for your business?", "", true],
    ["What was the hardest part of handling calls before?", ""],
    ["What made you decide to try voice AI, and why Trillet?", ""],
    ["What did your team think at first, and what do they think now?", ""],
    ["What result surprised you most?", "", true],
    ["What would you tell a company like yours that is considering voice AI?", "Often the best closing quote.", true],
    ["Name, title and photo permission for the person quoted", "Exact spelling of name and title as they want it shown.", true],
  ]));

// 9. Future
S.push(h1("9. What's next"),
  questions(9, [
    ["What do they plan to do next with Trillet?", "New use cases, departments, regions, languages, integrations."],
    ["Would they act as a reference for prospects?", "Reference calls, a site visit, a joint webinar or event talk."],
    ["Would they do a video or audio testimonial?", "Remote recording is fine. Note any preferred dates."],
    ["Would they leave a public review?", "G2, Capterra or Trustpilot. Add the link if they have."],
  ]));

// 10. Assets & sign-off
S.push(h1("10. Assets & sign-off"),
  h2("Assets to collect"),
  grid(["Asset", "Available? (Y/N)", "Link or file location"], [4080, 2000, 4000], [
    ["Client logo (vector: SVG or EPS)"], ["Product or team photos (high resolution)"], ["Photo of the person quoted"],
    ["Screenshots of the Trillet dashboard or reports (client data blurred)"], ["Anonymised call recording or transcript"],
    ["Internal report, QBR deck or email that shows the results"], ["Brand guidelines"], ["Video testimonial"],
  ]),
  gap(),
  h2("Sign-off checklist"),
  ...[
    "Section 1 permissions confirmed in writing (email is fine)",
    "Every metric in Section 6 has a baseline, period and source",
    "Quotes checked with the person quoted, name and title spelled correctly",
    "Client-side approver identified and available to review the draft",
    "Legal / IR review arranged if the client is publicly listed",
    "Assets collected and shared with Marketing",
  ].map((x) => new Paragraph({ spacing: { after: 80 }, children: [t("☐  " + x)] })),
  gap(),
  grid(["Role", "Name", "Date"], [3360, 4320, 2400], [["Account manager"], ["Marketing owner"], ["Client approver"]]),
);

// ---------------------------------------------------------------- document
const doc = new Document({
  creator: "Trillet",
  title: "Massimo Motors Case Study Questionnaire",
  styles: {
    default: { document: { run: { font: FONT, size: 20, color: INK } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { font: FONT, size: 30, bold: true, color: INK },
        paragraph: { spacing: { before: 360, after: 120 }, outlineLevel: 0, keepNext: true,
          border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: ACCENT, space: 4 } } } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { font: FONT, size: 24, bold: true, color: ACCENT },
        paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 1, keepNext: true } },
    ],
  },
  numbering: { config: [{ reference: "bullets", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
    style: { paragraph: { indent: { left: 540, hanging: 270 } } } }] }] },
  sections: [{
    properties: { page: { size: { width: PAGE_W, height: 15840 }, margin: { top: 1080, bottom: 1080, left: MARGIN, right: MARGIN } } },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [
      t("Trillet · Massimo Motors case study intake · Internal · Page ", { size: 16, color: MUTED }),
      new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: 16, color: MUTED }),
    ] })] }) },
    children: S,
  }],
});

Packer.toBuffer(doc).then((b) => { fs.writeFileSync(OUT, b); console.log("wrote", OUT); });
