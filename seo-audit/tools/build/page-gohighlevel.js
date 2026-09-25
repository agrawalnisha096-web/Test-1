const H=require("./int-helpers");
const {eyebrow,H1,H2,H3,kicker,P,t,link,bullet,num,rule,meta,okline,flag,shot,ans,cta,table,spec,code,build,BRONZE,NAVY,MUTED}=H;
const c=[];

// ---------- BRIEF HEADER (for the copy team, not the live page) ----------
c.push(eyebrow("Trillet · Integration Page · /integrations/gohighlevel"));
c.push(H1("Trillet + GoHighLevel: Voice AI That Works Inside Your CRM"));
c.push(P([t("Build spec for ",{c:MUTED,size:18}),t("/integrations/gohighlevel",{mono:true,size:16,c:MUTED}),t(". This page is the 301 target for the ",{c:MUTED,size:18}),t("gohighlevel-voice-ai-integration",{mono:true,size:15,c:MUTED}),t(" blog, so it must own that query set: a branded voice agent that reads and writes GoHighLevel contacts, fires workflows, and rebills through sub-accounts. Product-page voice, every figure reconciled to the live site, September 2026.",{c:MUTED,size:18})]));
c.push(rule());
c.push(meta("URL","https://trillet.ai/integrations/gohighlevel   (new; 301 the gohighlevel-voice-ai-integration blog here)",{mono:true,size:14}));
c.push(meta("PAGE TYPE","Integration landing page. Primary goal: start free or book a demo with GoHighLevel intent."));
c.push(meta("TARGET KEYWORD","gohighlevel voice ai integration"));
c.push(meta("SECONDARY / LSI","trillet gohighlevel integration · voice ai for gohighlevel · ghl voice agent · gohighlevel voice ai for agencies · sync gohighlevel contacts voice ai · gohighlevel workflow trigger voice"));
c.push(meta("PRIMARY CONVERSION","Start risk free.   Secondary: Book a demo.   Tertiary: See pricing."));
c.push(meta("VOICE","Product page. Second person, outcome-led, concrete. Australian spelling, zero em-dashes, no founder story."));
c.push(rule());

// ================= THE PAGE =================
c.push(H2("The page"));

// 1 HERO
c.push(kicker("Section 1 · Hero"));
c.push(P([t("H1:  ",{c:BRONZE,size:15,b:true}),t("GoHighLevel voice AI that lives inside your CRM",{size:24,b:true,c:NAVY})]));
c.push(P([t("Subhead:  ",{c:BRONZE,size:15,b:true}),t("Connect Trillet to GoHighLevel and your voice agent works straight from live sub-account data. It reads the contact before it answers, updates the record as it talks, and fires the workflow the moment the call ends. No exported spreadsheets, no copy-paste, no missed follow-up.",{size:19})]));
c.push(cta("Start risk free","Book a demo"));
c.push(shot("A live Trillet call panel docked beside a GoHighLevel contact record: the agent is on a call with “Sarah Nguyen”, and her GHL fields (last appointment, pipeline stage, tags) update in real time as the conversation moves. Trillet branding, your agency logo, GHL clearly the CRM underneath."));

// 2 TRUST STRIP
c.push(kicker("Section 2 · Trust strip"));
c.push(P([t("Native GoHighLevel integration.",{size:19,b:true}),t("   Compliance on every plan: ",{c:MUTED,size:16}),t("SOC 2 Type II · ISO 27001 · HIPAA · GDPR · ACMA · TCPA · AU Data Residency",{size:16,b:true})]));
c.push(P([t("One quiet line. GoHighLevel gates HIPAA behind a paid add-on; Trillet includes it on every plan, which matters the moment a client is a clinic or a law firm.",{c:MUTED,size:16})]));

// 3 WHAT THE INTEGRATION DOES
c.push(H2("What the integration does"));
c.push(ans("The Trillet + GoHighLevel integration lets a branded voice agent read and write GoHighLevel contacts, trigger GHL workflows from live calls, and log every conversation to the record, all at the sub-account level. Agencies build it once, save it as a snapshot, and roll it out to every client. Because Trillet runs its own telephony and compliance, you get a voice agent that is native to the CRM without paying for a HIPAA add-on."));
c.push(P([t("GoHighLevel is where agencies already run their pipelines, calendars and follow-up. The gap has always been the phone: someone still has to answer it, qualify the caller, and get the details back into the CRM before the lead goes cold. Trillet closes that gap. Your agent answers in your brand's voice, works from the same sub-account data your team sees, and leaves the record cleaner than a human would."),{after:80}]));

// 4 USE CASES (GHL-SPECIFIC)
c.push(H2("What you can build"));

c.push(H3("Two-way contact sync"));
c.push(P([t("The agent looks up the caller in GoHighLevel before it speaks, so a returning client is greeted by name and never re-asked what they already told you. As the call runs, it writes back: it creates a contact for a new caller, updates fields on an existing one, adds tags, and attaches the recording and transcript to the record. Your CRM stays current without anyone touching a keyboard.")]));
c.push(shot("A GoHighLevel contact timeline after a Trillet call: a new note with the transcript, a call recording attachment, updated custom fields (“Service requested: crown”, “Preferred day: Thursday”), and two new tags. All written by the agent."));

c.push(H3("Workflow triggers from live calls"));
c.push(P([t("Every call becomes a signal your GoHighLevel automations can act on. A booked appointment fires the confirmation-and-reminder workflow. A qualified lead drops into the nurture sequence. A caller who asked for a callback moves to the right pipeline stage and pings the account owner. The agent passes the variables the workflow needs, so the automation you already built just runs.")]));

c.push(H3("Sub-account rollout and rebilling"));
c.push(P([t("Build the agent and its GoHighLevel connection once, save it into a sub-account snapshot, and push it to every new client account you spin up. Trillet keeps each client in its own isolated workspace, so numbers, agents and data never bleed between accounts. You set your own per-minute retail price on top of the flat $0.12 a minute usage rate and keep the margin, the same recurring-revenue model agencies already run in GoHighLevel, now on the phone.")]));
c.push(shot("The agency view: a list of GoHighLevel sub-accounts (Acme Dental, Harbor Law, Coastal Plumbing), each with a Trillet workspace attached, a per-minute retail price set, and a monthly margin figure beside it."));

// 5 HOW IT WORKS / SETUP (HowTo)
c.push(H2("How to connect Trillet to GoHighLevel"));
c.push(P([t("Four steps, no code. Most agencies have the first client live the same afternoon.",{c:MUTED,size:18})]));
c.push(num([t("Connect the account. ",{b:true}),t("In Trillet, open Integrations, choose GoHighLevel, and authorise the sub-account you want to connect. Trillet reads and writes only the contacts and workflows in that sub-account.")],"ghl-setup"));
c.push(num([t("Map your fields. ",{b:true}),t("Tell the agent which GoHighLevel fields to read before a call and which to write after it, and pick the workflows it can trigger. Templates cover reception, qualification and booking out of the box.")],"ghl-setup"));
c.push(num([t("Point the number. ",{b:true}),t("Use a Trillet number or forward the client's existing line. Carrier-level call forwarding goes live in about 30 seconds with no number porting.")],"ghl-setup"));
c.push(num([t("Snapshot and roll out. ",{b:true}),t("Save the configured agent into a sub-account snapshot and apply it to every new client account. One build, every client.")],"ghl-setup"));
c.push(shot("The Trillet Integrations screen mid-setup: GoHighLevel connected with a green tick, a field-mapping table (GHL field → agent variable), and a workflow picker with three GHL workflows selected."));

// 6 WHY TRILLET FOR GHL
c.push(H2("Why agencies run Trillet on GoHighLevel"));
c.push(bullet([t("Compliance included, not gated. ",{b:true}),t("GoHighLevel charges for HIPAA as an add-on with per-sub-account setup. Trillet includes SOC 2 Type II, ISO 27001, HIPAA, GDPR, ACMA and TCPA on every plan, with audit trails and a recording and transcript of every call.")]));
c.push(bullet([t("Its own telephony. ",{b:true}),t("Trillet runs the call layer, so you are not stacking a third-party voice provider on top of GHL. US Trillet telephony is from $0.014 a minute; web calls carry no telephony fee.")]));
c.push(bullet([t("Isolated per client. ",{b:true}),t("Every sub-account maps to its own Trillet workspace. Numbers, agents and data stay separate, which is what regulated clients ask about first.")]));
c.push(bullet([t("You keep the margin. ",{b:true}),t("Flat $0.12 a minute usage, your retail price on top, billed through the same client relationship you already own in GoHighLevel.")]));

// 7 PRICING (shared, compact)
c.push(H2("Pricing"));
c.push(P([t("No per-seat charges. Usage is $0.12 a minute (platform, STT, LLM, TTS). Telephony is separate: US Trillet telephony from $0.014 a minute, web calls no telephony fee.",{size:18})]));
c.push(table([1500,3930,3930],["Plan","Studio, $99/mo","Agency, $299/mo"],[
  ["Workspaces","Up to 3","Unlimited"],
  ["Included minutes","100 / month","300 / month"],
  ["Free phone numbers","3","10"],
  ["GoHighLevel integration","Included","Included"],
]));
c.push(P([t("28-day money-back guarantee. No contracts, cancel anytime.",{size:17,c:MUTED})]));
c.push(cta("Start risk free","See pricing"));

// 8 FAQ (GHL-SPECIFIC)
c.push(H2("GoHighLevel integration FAQ"));
const faq=[
 ["Does Trillet integrate natively with GoHighLevel?","Yes. GoHighLevel is a native Trillet integration, alongside Google Calendar and Cal.com, plus webhook and API. You connect a sub-account from the Integrations screen; there is no middleware to maintain."],
 ["Can the voice agent update GoHighLevel contacts?","Yes. The agent reads the contact before the call and writes back during and after it: it creates or updates the record, adds tags, sets custom fields, and attaches the recording and transcript."],
 ["Can a call trigger a GoHighLevel workflow?","Yes. The agent passes the variables your automation needs, so a booking, a qualified lead or a callback request can fire the GHL workflow you have already built, in real time as the call ends."],
 ["Does it work across sub-accounts for my agency?","Yes. Configure the agent once, save it into a sub-account snapshot, and roll it out to every client account. Each client runs in its own isolated Trillet workspace."],
 ["Is it HIPAA compliant for healthcare clients?","Yes, and it is included on every plan rather than a paid add-on. Trillet carries SOC 2 Type II, ISO 27001, HIPAA, GDPR, ACMA and TCPA, with audit trails and call records on every workspace."],
 ["Do I need to port phone numbers?","No. Use a Trillet number or forward the client's existing line. Carrier-level call forwarding goes live in about 30 seconds with no porting."],
 ["How do I make money reselling this?","You set your own per-minute retail price above the flat $0.12 a minute usage rate and keep the difference every month, billed through the client relationship you already own in GoHighLevel."],
];
faq.forEach(([q,a])=>{c.push(H3(q));c.push(P([t(a)]));});
c.push(P([t("Last reviewed: September 2026.",{c:MUTED,i:true,size:16})]));

// 9 CLOSE
c.push(kicker("Section 9 · Final CTA"));
c.push(P([t("H2:  ",{c:BRONZE,size:15,b:true}),t("Put a voice agent inside every GoHighLevel account you run",{size:22,b:true,c:NAVY})]));
c.push(P([t("Connect your first sub-account today, or sell the whole platform under your own brand from the ")].concat(link("white-label voice AI platform","/whitelabel")).concat([t(" page.")])));
c.push(cta("Start risk free","Book a demo"));
c.push(rule());

// ---------- SEO / SCHEMA NOTES ----------
c.push(H2("SEO / AEO notes"));
c.push(H3("Meta title  (58)"));
c.push(P([t("GoHighLevel Voice AI Integration | Trillet",{mono:true,size:16})]));
c.push(H3("Meta description  (147)"));
c.push(P([t("Connect Trillet voice AI to GoHighLevel. Sync contacts, trigger workflows and rebill across sub-accounts, with HIPAA compliance included on every plan.",{mono:true,size:15})]));
c.push(flag("301 the gohighlevel-voice-ai-integration blog to this URL once live. Render H1, intro and FAQ server-side."));
c.push(H3("Structured data: SoftwareApplication + HowTo + FAQPage + BreadcrumbList"));
c.push(code([
 '<script type="application/ld+json">',
 '{ "@context":"https://schema.org","@graph":[',
 '  {"@type":"SoftwareApplication","name":"Trillet Voice AI for GoHighLevel",',
 '   "applicationCategory":"BusinessApplication","operatingSystem":"Web",',
 '   "offers":[{"@type":"Offer","name":"Studio","price":"99","priceCurrency":"USD"},',
 '             {"@type":"Offer","name":"Agency","price":"299","priceCurrency":"USD"}],',
 '   "provider":{"@id":"https://trillet.ai/#org"},"url":"https://trillet.ai/integrations/gohighlevel"},',
 '  {"@type":"HowTo","name":"Connect Trillet to GoHighLevel","step":[',
 '    {"@type":"HowToStep","name":"Connect the account"},',
 '    {"@type":"HowToStep","name":"Map your fields"},',
 '    {"@type":"HowToStep","name":"Point the number"},',
 '    {"@type":"HowToStep","name":"Snapshot and roll out"}]},',
 '  {"@type":"FAQPage","mainEntity":[ /* 7 Q&As, verbatim from the page */ ]},',
 '  {"@type":"BreadcrumbList","itemListElement":[',
 '    {"@type":"ListItem","position":1,"name":"Home","item":"https://trillet.ai/"},',
 '    {"@type":"ListItem","position":2,"name":"Integrations","item":"https://trillet.ai/integrations"},',
 '    {"@type":"ListItem","position":3,"name":"GoHighLevel"}]}',
 ']}',
 '</script>',
]));
c.push(H3("Internal links"));
c.push(P([t("Up to ")].concat(link("Integrations","/integrations")).concat([t(" and ")]).concat(link("white-label voice AI","/whitelabel")).concat([t(". Across to ")]).concat(link("Google Calendar","/integrations/google-calendar")).concat([t(" and ")]).concat(link("Cal.com","/integrations/cal-com")).concat([t(".")])));

build("/home/user/Test-1/seo-audit/Trillet-Integration-GoHighLevel.docx",c,["ghl-setup"]);
