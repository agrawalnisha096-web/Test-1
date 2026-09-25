const fs=require("fs");
const {Document,Packer,Paragraph,TextRun,AlignmentType,BorderStyle,Table,TableRow,TableCell,WidthType,ShadingType}=require("docx");
const NAVY="16223C",INK="24303F",MUTED="5A6675",BRONZE="9A6B3F",GREEN="2E7D5B",RED="B4442E",RULE="D9DEE8",CODE="F4F5F7",ANS="EEF3F0",SHOT="EDF1F6";
const SERIF="Georgia",SANS="Calibri",MONO="Consolas";const CW=9360;const LINK="1B5E86";
function bd(c){const b={style:BorderStyle.SINGLE,size:4,color:c};return{top:b,bottom:b,left:b,right:b,insideHorizontal:b,insideVertical:b};}
function eyebrow(x){return new Paragraph({spacing:{after:50},children:[new TextRun({text:x.toUpperCase(),font:MONO,size:15,bold:true,color:BRONZE,characterSpacing:18})]});}
function H1(x){return new Paragraph({spacing:{after:70},children:[new TextRun({text:x,font:SERIF,size:34,bold:true,color:NAVY})]});}
function H2(x){return new Paragraph({spacing:{before:170,after:50},children:[new TextRun({text:x,font:SERIF,size:25,bold:true,color:NAVY})]});}
function H3(x){return new Paragraph({spacing:{before:110,after:16},children:[new TextRun({text:x,font:SANS,size:20,bold:true,color:NAVY})]});}
function kicker(x){return new Paragraph({spacing:{before:130,after:30},children:[new TextRun({text:x.toUpperCase(),font:MONO,size:14,bold:true,color:BRONZE,characterSpacing:12})]});}
function P(runs,o={}){return new Paragraph({spacing:{after:o.after??110,line:o.line??278},children:Array.isArray(runs)?runs:[new TextRun({text:runs,font:SANS,size:20,color:o.c??INK})]});}
function t(x,o={}){return new TextRun({text:x,font:o.mono?MONO:SANS,size:o.size??20,color:o.c??INK,bold:!!o.b,italics:!!o.i});}
function link(a,tg){return [new TextRun({text:a,font:SANS,size:20,color:LINK,underline:{}}),new TextRun({text:" ["+tg+"]",font:MONO,size:12,color:MUTED})];}
function bullet(runs){return new Paragraph({bullet:{level:0},spacing:{after:50,line:272},children:Array.isArray(runs)?runs:[new TextRun({text:runs,font:SANS,size:20,color:INK})]});}
function rule(){return new Paragraph({spacing:{before:120,after:120},border:{bottom:{style:BorderStyle.SINGLE,size:6,color:RULE}},children:[new TextRun("")]});}
function meta(l,v,o={}){return new Paragraph({spacing:{after:26},children:[new TextRun({text:l+"   ",font:MONO,size:14,bold:true,color:BRONZE}),new TextRun({text:v,font:o.mono?MONO:SANS,size:o.size??17,color:INK,bold:!!o.b})]});}
function okline(x){return new Paragraph({spacing:{after:40},children:[new TextRun({text:"✓ ",font:SANS,size:16,bold:true,color:GREEN}),new TextRun({text:x,font:SANS,size:16,color:MUTED})]});}
function flag(x){return new Paragraph({spacing:{after:40},children:[new TextRun({text:"⚑ ",font:SANS,size:16,bold:true,color:RED}),new TextRun({text:x,font:SANS,size:16,color:MUTED})]});}
// product-shot callout: tells the designer what product moment to render here
function shot(x){return new Table({width:{size:CW,type:WidthType.DXA},columnWidths:[CW],borders:{left:{style:BorderStyle.SINGLE,size:18,color:BRONZE},top:{style:BorderStyle.NONE},bottom:{style:BorderStyle.NONE},right:{style:BorderStyle.NONE}},
  rows:[new TableRow({children:[new TableCell({width:{size:CW,type:WidthType.DXA},shading:{type:ShadingType.CLEAR,fill:SHOT,color:"auto"},margins:{top:90,bottom:90,left:150,right:150},borders:{left:{style:BorderStyle.SINGLE,size:18,color:BRONZE},top:{style:BorderStyle.NONE},bottom:{style:BorderStyle.NONE},right:{style:BorderStyle.NONE}},
    children:[new Paragraph({spacing:{after:0,line:264},children:[new TextRun({text:"PRODUCT SHOT.  ",font:MONO,size:13,bold:true,color:BRONZE}),new TextRun({text:x,font:SANS,size:17,color:INK})]})]})]})]});}
function cta(primary,secondary){return new Paragraph({spacing:{before:40,after:60},children:[
  new TextRun({text:"  "+primary+"  ",font:SANS,size:18,bold:true,color:"FFFFFF",highlight:"darkBlue"}),
  new TextRun({text:"    "+secondary,font:SANS,size:18,color:LINK,underline:{}})]});}
function table(cols,headers,rows){const mk=(x,i,head)=>new TableCell({width:{size:cols[i],type:WidthType.DXA},shading:{type:ShadingType.CLEAR,fill:head?NAVY:"FFFFFF",color:"auto"},margins:{top:58,bottom:58,left:90,right:90},borders:bd(RULE),
    children:String(x).split("\n").map(line=>new Paragraph({spacing:{after:0,line:246},children:[new TextRun({text:line,font:SANS,size:head?14:13,bold:head,color:head?"FFFFFF":INK})]}))});
  return new Table({width:{size:cols.reduce((a,b)=>a+b,0),type:WidthType.DXA},columnWidths:cols,borders:bd(RULE),
    rows:[new TableRow({tableHeader:true,children:headers.map((h,i)=>mk(h,i,true))}),...rows.map(r=>new TableRow({children:r.map((cc,i)=>mk(cc,i,false))}))]});}
function code(lines){return new Table({width:{size:CW,type:WidthType.DXA},columnWidths:[CW],borders:bd(RULE),
  rows:[new TableRow({children:[new TableCell({width:{size:CW,type:WidthType.DXA},shading:{type:ShadingType.CLEAR,fill:CODE,color:"auto"},margins:{top:90,bottom:90,left:120,right:120},borders:bd(RULE),
    children:lines.map(l=>new Paragraph({spacing:{after:0,line:230},children:[new TextRun({text:l||" ",font:MONO,size:13,color:INK})]}))})]})]});}

const c=[];

// ---------- COVER / BRIEF ----------
c.push(eyebrow("Trillet · Product Page Rebuild · v3 · /whitelabel"));
c.push(H1("White-Label Voice AI: Product Page"));
c.push(P([t("Rebuild of ",{c:MUTED,size:18}),t("/whitelabel",{mono:true,size:16,c:MUTED}),t(" as what it is: a conversion-first product page, not an article. The job is to show the platform and get the agency to start, with SEO riding along. Structure follows what actually ranks and converts for this term (Vapify, Autocalls, byVoice) and the voice follows the Trillet homepage: outcome-led, second person, confident. Every figure reconciled to the live site, September 2026.",{c:MUTED,size:18})]));
c.push(rule());

c.push(meta("URL","https://trillet.ai/whitelabel   (evergreen, keep as-is)",{mono:true,size:15}));
c.push(meta("PAGE TYPE","Product / service landing page. Primary goal: start free or book a demo. SEO is secondary to conversion."));
c.push(meta("HEAD TERM","white label voice ai  (~pos 27). Also: white label voice ai platform / for agencies, ai voice agent white label."));
c.push(meta("PRIMARY CONVERSION","Start risk free (self-serve signup).   Secondary: Book a demo.   Tertiary: See pricing."));
c.push(meta("VOICE","Trillet homepage voice. Outcome-led, second person, confident, concrete. No founder story, no teaching, no hedging. Australian spelling, zero em-dashes."));
c.push(rule());

// ---------- WHAT WENT WRONG / PRINCIPLE ----------
c.push(H3("What this version fixes"));
c.push(okline("Cut the founder narrative (“we sold it ourselves”) and the buyer's teaching checklist. Both are blog moves; they buried the product and stalled the transaction. The checklist lives on the comparison blog, linked."));
c.push(okline("Product is now visible in every section: each block carries a PRODUCT SHOT note telling the designer exactly what platform moment to render."));
c.push(okline("Reordered to a converting product page: hero → proof → how it works → the platform → economics → the edge → verticals → pricing → testimonials → FAQ → close. CTAs repeat down the page."));
c.push(rule());

// ================= THE PAGE =================
c.push(H2("The page"));

// 1 HERO
c.push(kicker("Section 1 · Hero"));
c.push(P([t("H1:  ",{c:BRONZE,size:15,b:true}),t("White-label voice AI, ready to sell under your brand",{size:24,b:true,c:NAVY})]));
c.push(P([t("Subhead:  ",{c:BRONZE,size:15,b:true}),t("Launch your own branded voice AI platform in minutes. Your domain, your pricing, your clients. We run the technology and the compliance. You keep the relationship and the margin.",{size:19})]));
c.push(cta("Start risk free","Book a demo"));
c.push(shot("The agency dashboard on app.youragency.com: a client list (Acme Dental, Harbor Law) each in its own workspace, your logo top-left. This is the first thing they should see, the product as theirs."));

// 2 SOCIAL PROOF STRIP
c.push(kicker("Section 2 · Trust strip  (directly under hero)"));
c.push(P([t("1,200+ businesses run on Trillet.",{size:19,b:true}),t("   Badge row: ",{c:MUTED,size:16}),t("SOC 2 Type II · ISO 27001 · HIPAA · GDPR · ACMA · TCPA · AU Data Residency",{size:16,b:true})]));
c.push(P([t("Keep it one quiet line. It buys credibility before the visitor scrolls, and the compliance badges do double duty as the differentiator preview.",{c:MUTED,size:16})]));

// 3 HOW IT WORKS
c.push(kicker("Section 3 · How it works, three steps"));
c.push(H3("H2:  From a website to a live agent, in minutes"));
c.push(P([t("Brand it. ",{b:true}),t("Add your logo, colours and domain. Clients log in to your product and never see Trillet.")]));
c.push(P([t("Build it. ",{b:true}),t("Paste a client's website and we build a trained voice agent from it, ready to answer calls.")]));
c.push(P([t("Bill it. ",{b:true}),t("Connect Stripe, set your own per-minute price, and keep the margin. Every client runs in its own isolated workspace.")]));
c.push(shot("Three-step strip with a mini screenshot each: (1) branding panel with colour pickers, (2) the paste-a-URL build screen with “Agent live, fully trained”, (3) the Stripe rebilling toggle with a margin figure."));

// 4 THE PLATFORM
c.push(kicker("Section 4 · The platform  (feature showcase)"));
c.push(H3("H2:  Everything you sell, running under your brand"));
c.push(bullet([t("Full white-label. ",{b:true}),t("Your domain, dashboard and billing. Your clients log in to your product.")]));
c.push(bullet([t("Isolated client workspaces. ",{b:true}),t("Every client has its own agents, numbers and data, managed from one place. Nothing bleeds between accounts.")]));
c.push(bullet([t("One-click agent deployment. ",{b:true}),t("Paste a site, get a trained agent in minutes.")]));
c.push(bullet([t("Ready-to-go templates. ",{b:true}),t("Reception, qualification, booking and follow-up, pre-built.")]));
c.push(bullet([t("Native integrations. ",{b:true}),t("GoHighLevel, Google Calendar and Cal.com, plus webhook and API.")]));
c.push(bullet([t("Branded analytics. ",{b:true}),t("Call volumes, bookings and answer rates in a report that carries your logo.")]));
c.push(shot("The multi-tenant control panel: several client workspaces side by side, each marked “Isolated”, plus a branded monthly client report (calls handled, bookings, answer rate). This is the “where is the product” anchor of the page."));

// 5 ECONOMICS
c.push(kicker("Section 5 · Economics  (the money)"));
c.push(H3("H2:  Set your price. Keep the margin."));
c.push(P([t("No per-seat fees. Usage is a flat $0.12 a minute, and you set the retail price your clients pay. Keep the difference every month a client stays. Priced sensibly, agencies hold margins in the 70s.")]));
c.push(P([t("This is how agencies build recurring revenue without building software.",{b:true})]));
c.push(shot("The interactive margin calculator (keep the live one). Default view: 5 clients at $300/mo, ~2-minute calls, Agency plan, showing $1,500 revenue, $383 cost, 74% margin. Sliders for clients and price."));

// 6 THE EDGE
c.push(kicker("Section 6 · The edge  (differentiator, product-framed)"));
c.push(H3("H2:  Sell to clients your competitors can't"));
c.push(P([t("Compliance is built into every workspace, not sold as an add-on. SOC 2 Type II, ISO 27001, and operation under HIPAA, GDPR, ACMA and TCPA, with full audit trails and a verifiable record of every call. On-premise and private cloud for enterprise, and data stored onshore.")]));
c.push(P([t("When your clients are clinics, law firms or financial services, that is what wins you the business. Most platforms make you buy it separately, or cannot offer it at all.")]));
c.push(shot("A call-record view: transcript plus recording plus an audit-trail timeline (who accessed, when), with the compliance badge row beneath. Shows the record is a real product surface, not a claim."));

// 7 VERTICALS
c.push(kicker("Section 7 · Verticals"));
c.push(H3("H2:  One platform, every client vertical"));
c.push(P([t("Healthcare, legal, financial services, home services, real estate and local business. Each links to its own page.",{size:19})]));
c.push(shot("Six vertical tiles, each a click through to the vertical landing page (passes hub authority down)."));

// 8 PRICING
c.push(kicker("Section 8 · Pricing"));
c.push(H3("H2:  Simple, transparent pricing"));
c.push(P([t("No per-seat charges. Usage is $0.12 a minute (platform, STT, LLM, TTS). Telephony is separate: US Trillet telephony from $0.014 a minute, web calls no telephony fee.",{size:18})]));
c.push(table([1500,3930,3930],["Plan","Studio, $99/mo","Agency, $299/mo"],[
  ["Branding","Full white-label, custom branding","Everything in Studio, plus:"],
  ["Workspaces","Up to 3","Unlimited"],
  ["Included minutes","100 / month","300 / month"],
  ["Free phone numbers","3","10"],
]));
c.push(P([t("28-day money-back guarantee, no questions asked. No contracts, cancel anytime.",{size:17,c:MUTED})]));
c.push(cta("Start risk free","Compare all features"));

// 9 TESTIMONIALS
c.push(kicker("Section 9 · Proof"));
c.push(H3("H2:  Trusted by agencies"));
c.push(P([t("Two or three short agency quotes with name, agency and a number (clients signed, margin, launch time). If real testimonials are not ready, use a logo wall plus the 1,200+ figure rather than inventing quotes.",{c:MUTED,size:17})]));
c.push(shot("Testimonial cards with headshot, agency name and a result stat; or a logo wall if quotes are not yet available."));

// 10 FAQ
c.push(H2("FAQ  (operational, the questions buyers actually ask)"));
c.push(P([t("Modelled on what ranking pages answer, plus the definition query for the head term. Short, concrete, in the page's voice.",{c:MUTED,size:16})]));
const faq=[
 ["What is white-label voice AI?","A voice agent platform you sell under your own brand. You set the price, own the client, and run it on your domain. Trillet stays behind the scenes, and compliance and a call record come built in."],
 ["What is included in the white-label?","Your domain and branding, isolated client workspaces, the agent builder, native integrations, branded client dashboards, and Stripe rebilling. Compliance is included on every plan."],
 ["Do I need technical skills?","No. You build agents by pasting a client's website and adjusting a few settings. No code, no infrastructure to run."],
 ["How fast can I launch?","Minutes to brand the platform and build a first agent. Clients keep their existing phone numbers, so going live takes about 30 seconds per client via call forwarding."],
 ["Can I run unlimited client accounts?","Yes, on the Agency plan. Studio covers up to 3 workspaces; Agency is unlimited."],
 ["How does billing my clients work?","Connect Stripe, set your own per-minute rate per client, and Trillet takes its usage rate while the rest lands in your account."],
 ["Is it compliant enough for regulated clients?","Yes, and it is included, not an add-on. SOC 2 Type II, ISO 27001, HIPAA, GDPR, ACMA and TCPA, with audit trails on every workspace and onshore data residency."],
 ["How much can I earn?","You keep the gap between the $0.12/min usage rate and your retail price. A common setup is a $300 monthly retainer per client; at typical usage that holds margins in the 70s. Model it in the calculator above."],
];
faq.forEach(([q,a])=>{c.push(H3(q));c.push(P([t(a)]));});
c.push(P([t("Last reviewed: September 2026.",{c:MUTED,i:true,size:16})]));

// 11 CLOSE
c.push(kicker("Section 11 · Final CTA"));
c.push(P([t("H2:  ",{c:BRONZE,size:15,b:true}),t("Ready to launch your own voice AI platform?",{size:22,b:true,c:NAVY})]));
c.push(P([t("Your branding, your pricing, your clients. Start today, or talk to us about a formal reseller, referral or OEM arrangement in the ")].concat(link("partner program","/partners")).concat([t(".")])));
c.push(cta("Start risk free","Book a demo"));
c.push(rule());

// ---------- SEO NOTES ----------
c.push(H2("SEO / AEO notes  (ride-along, not the driver)"));
c.push(H3("Meta title  (keep)"));
c.push(P([t("White-Label Voice AI for Agencies & Partners | Trillet  (52)",{mono:true,size:16})]));
c.push(H3("Meta description  (new, 144)"));
c.push(P([t("White-label voice AI you sell under your own brand. Full branding, isolated client workspaces, and compliance built in, not billed as an add-on.",{mono:true,size:16})]));
c.push(P([t("Head-term coverage: H1 carries “white-label voice AI”; the FAQ definition and the feature and pricing copy seed the LSI (platform, for agencies, multi-tenant, reseller). Because the page is now product-first, the definition sits in the FAQ, not the body.",{c:MUTED,size:17})]));
c.push(flag("Render the hero, H1 and FAQ server-side, or the head term will not rank."));
c.push(H3("Structured data"));
c.push(P([t("Service (named, priced offering) + FAQPage + BreadcrumbList. This is the graph the live page is missing.",{c:MUTED,size:17})]));
c.push(code([
 '<script type="application/ld+json">',
 '{ "@context":"https://schema.org","@graph":[',
 '  {"@type":"Service","name":"White-Label Voice AI Platform",',
 '   "serviceType":"White-label voice AI for agencies",',
 '   "provider":{"@id":"https://trillet.ai/#org"},"url":"https://trillet.ai/whitelabel",',
 '   "areaServed":["AU","US","GB"],',
 '   "offers":[{"@type":"Offer","name":"Studio","price":"99","priceCurrency":"USD"},',
 '             {"@type":"Offer","name":"Agency","price":"299","priceCurrency":"USD"}]},',
 '  {"@type":"FAQPage","mainEntity":[ /* 8 Q&As, verbatim from the page */ ]},',
 '  {"@type":"BreadcrumbList","itemListElement":[',
 '    {"@type":"ListItem","position":1,"name":"Home","item":"https://trillet.ai/"},',
 '    {"@type":"ListItem","position":2,"name":"White-Label Voice AI"}]}',
 ']}',
 '</script>',
]));
c.push(H3("Internal links"));
c.push(P([t("Down from the hub: comparison roundup, profit margins, /partners, and each vertical page. Up to the hub: every consolidating spoke in the redirect map carries one exact-match link here before it is merged or retired.",{c:MUTED,size:17})]));
c.push(P([t("Comparison (for buyers still shopping): ")].concat(link("best white-label voice AI","/blogs/best-white-label-voice-ai")).concat([t("   ·   Margins: ")]).concat(link("white-label profit margins","/blogs/white-label-ai-profit-margins")).concat([t("   ·   Partner tracks: ")]).concat(link("partner program","/partners"))));
c.push(rule());

// ---------- STRUCTURE-AT-A-GLANCE ----------
c.push(H2("Structure at a glance"));
c.push(table([600,3200,5560],["#","Section","Job on the page"],[
  ["1","Hero + CTA","Head-term H1, the promise, first Start button, product-as-theirs shot"],
  ["2","Trust strip","1,200+ businesses and compliance badges, instant credibility"],
  ["3","How it works","Brand it, build it, bill it. Kills the “is this hard?” objection"],
  ["4","The platform","Show the product: multi-tenant control, agent build, branded reports"],
  ["5","Economics","Margin calculator and the recurring-revenue promise"],
  ["6","The edge","Compliance built in = sell to clients others can't"],
  ["7","Verticals","Who you can sell to; passes authority to vertical pages"],
  ["8","Pricing","Studio and Agency, guarantee, second CTA"],
  ["9","Proof","Agency testimonials or logo wall"],
  ["10","FAQ","Operational questions + the definition for SEO/AEO"],
  ["11","Final CTA","Last Start button + /partners for formal deals"],
]));

const doc=new Document({styles:{default:{document:{run:{font:SANS,size:20,color:INK}}}},sections:[{properties:{page:{margin:{top:1000,bottom:1000,left:1000,right:1000}}},children:c}]});
Packer.toBuffer(doc).then(b=>{fs.writeFileSync("/home/user/Test-1/seo-audit/Trillet-Whitelabel-Hub-Rebuild.docx",b);console.log("docx bytes:",b.length);});
