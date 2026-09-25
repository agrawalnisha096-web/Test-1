const H=require("./int-helpers");
const {eyebrow,H1,H2,H3,kicker,P,t,link,bullet,num,rule,meta,okline,flag,shot,ans,cta,table,spec,code,build,BRONZE,NAVY,MUTED}=H;
const c=[];

// ---------- BRIEF HEADER ----------
c.push(eyebrow("Trillet · Integration Index · /integrations"));
c.push(H1("Trillet Integrations: Connect Your Voice Agent to the Tools You Run"));
c.push(P([t("Build spec for the light ",{c:MUTED,size:18}),t("/integrations",{mono:true,size:16,c:MUTED}),t(" hub. Its job is to route intent to each native integration page and pass authority down. Keep it short: it is a directory, not another long page. Webhook and API are connection paths, covered briefly here, no full page each yet. Figures reconciled to the live site, September 2026.",{c:MUTED,size:18})]));
c.push(rule());
c.push(meta("URL","https://trillet.ai/integrations   (new hub)",{mono:true,size:14}));
c.push(meta("PAGE TYPE","Integration index / hub. Goal: route to the right integration, then to start free."));
c.push(meta("TARGET KEYWORD","trillet integrations"));
c.push(meta("SECONDARY / LSI","voice ai integrations · trillet gohighlevel · trillet google calendar · trillet cal.com · voice ai webhook · voice ai api"));
c.push(meta("VOICE","Product page. Second person, concise, concrete. Australian spelling, zero em-dashes."));
c.push(rule());

// ================= THE PAGE =================
c.push(H2("The page"));

// 1 HERO
c.push(kicker("Section 1 · Hero"));
c.push(P([t("H1:  ",{c:BRONZE,size:15,b:true}),t("Integrations that put your voice agent to work",{size:24,b:true,c:NAVY})]));
c.push(P([t("Subhead:  ",{c:BRONZE,size:15,b:true}),t("Trillet connects to the CRM and calendars you already run, so a call turns into a booking, a synced contact or a triggered workflow without anyone retyping it. Native integrations below, plus webhook and API for everything else.",{size:19})]));
c.push(cta("Start risk free","Book a demo"));

// 2 NATIVE INTEGRATIONS DIRECTORY
c.push(H2("Native integrations"));
c.push(P([t("Three deep, native connections, each with its own setup and its own strengths. Pick the one your clients live in.",{c:MUTED,size:18})]));

c.push(H3("GoHighLevel"));
c.push(P([t("Two-way contact sync, workflow triggers from live calls, and sub-account rollout for agencies. The agent reads the GHL record before it answers and writes the outcome back after. ")].concat(link("GoHighLevel integration","/integrations/gohighlevel"))));

c.push(H3("Google Calendar"));
c.push(P([t("Real-time availability, plus book, reschedule and cancel by voice, with time zones handled for you. Best when bookings land on one or a few calendars. ")].concat(link("Google Calendar integration","/integrations/google-calendar"))));

c.push(H3("Cal.com"));
c.push(P([t("Team scheduling on open-source rails: round-robin, collective events, and self-hosted or cloud. Best when a booking needs to route across a team. ")].concat(link("Cal.com integration","/integrations/cal-com"))));

c.push(shot("Three integration tiles in a row, each with the partner logo, a one-line strength (“CRM sync”, “Calendar booking”, “Team scheduling”), and a click-through to its page."));

// 3 AT A GLANCE TABLE
c.push(H2("Which one fits"));
c.push(table([2200,3580,3580],["Integration","Best for","What it does"],[
  ["GoHighLevel","Agencies running client pipelines in GHL","Sync contacts, trigger workflows, rebill across sub-accounts"],
  ["Google Calendar","Single teams booking into their own calendars","Live availability, book, reschedule and cancel, time zones"],
  ["Cal.com","Teams needing routed or shared scheduling","Round-robin and collective events, cloud or self-hosted"],
]));

// 4 WEBHOOK + API (brief)
c.push(H2("Connect anything else: webhook and API"));
c.push(P([t("Beyond the native integrations, Trillet exposes a webhook and an API so you can wire calls into the rest of your stack.")]));
c.push(bullet([t("Webhook. ",{b:true}),t("Trillet posts call events and outcomes to an endpoint you define, so another system can act on a booking, a lead or a transcript the moment a call ends.")]));
c.push(bullet([t("API. ",{b:true}),t("Configure agents and pull call data programmatically to build a connection to a tool that is not on the native list.")]));
c.push(P([t("These are connection paths rather than turnkey integrations, so they suit teams with a developer on hand. Deeper native connections are on the roadmap.",{c:MUTED,size:17})]));

// 5 SHARED VALUE + COMPLIANCE
c.push(H2("The same on every integration"));
c.push(P([t("Whichever you connect, the platform underneath is the same: your own branded agent, isolated client workspaces, carrier-level call forwarding that goes live in about 30 seconds with no number porting, and compliance built in rather than sold as an add-on. SOC 2 Type II, ISO 27001, HIPAA, GDPR, ACMA and TCPA on every plan, with audit trails and a recording and transcript of every call.")]));
c.push(P([t("Usage is a flat $0.12 a minute (platform, STT, LLM, TTS). Telephony is separate: US Trillet telephony from $0.014 a minute, web calls no telephony fee. Studio is $99/mo, Agency $299/mo, with a 28-day money-back guarantee and no contracts.",{size:18})]));

// 6 FAQ (short)
c.push(H2("Integrations FAQ"));
const faq=[
 ["What does Trillet integrate with?","Natively with GoHighLevel, Google Calendar and Cal.com, plus a webhook and an API for connecting anything else."],
 ["Are integrations included in the price?","Yes. All native integrations are included on both the Studio and Agency plans at no extra charge."],
 ["Which integration should I use for booking?","Google Calendar for booking into one or a few calendars; Cal.com when a booking needs to route across a team with round-robin or collective events."],
 ["Can I connect a tool that is not listed?","Yes, through the webhook and API. These are connection paths for teams with a developer, rather than turnkey integrations."],
];
faq.forEach(([q,a])=>{c.push(H3(q));c.push(P([t(a)]));});
c.push(P([t("Last reviewed: September 2026.",{c:MUTED,i:true,size:16})]));

// 7 CLOSE
c.push(kicker("Section 7 · Final CTA"));
c.push(P([t("H2:  ",{c:BRONZE,size:15,b:true}),t("Connect your first integration today",{size:22,b:true,c:NAVY})]));
c.push(P([t("Start free, or sell the whole platform under your own brand from the ")].concat(link("white-label voice AI platform","/whitelabel")).concat([t(" page.")])));
c.push(cta("Start risk free","Book a demo"));
c.push(rule());

// ---------- SEO / SCHEMA ----------
c.push(H2("SEO / AEO notes"));
c.push(H3("Meta title  (44)"));
c.push(P([t("Trillet Integrations for Voice AI | Trillet",{mono:true,size:16})]));
c.push(H3("Meta description  (142)"));
c.push(P([t("Connect Trillet voice AI to GoHighLevel, Google Calendar and Cal.com, plus webhook and API. Native integrations included on every plan.",{mono:true,size:15})]));
c.push(flag("Keep this page light. It is a hub that passes authority to the three integration pages; do not duplicate their bodies."));
c.push(H3("Structured data: CollectionPage + ItemList + FAQPage + BreadcrumbList"));
c.push(code([
 '<script type="application/ld+json">',
 '{ "@context":"https://schema.org","@graph":[',
 '  {"@type":"CollectionPage","name":"Trillet Integrations","url":"https://trillet.ai/integrations"},',
 '  {"@type":"ItemList","name":"Trillet native integrations","itemListElement":[',
 '    {"@type":"ListItem","position":1,"name":"GoHighLevel","url":"https://trillet.ai/integrations/gohighlevel"},',
 '    {"@type":"ListItem","position":2,"name":"Google Calendar","url":"https://trillet.ai/integrations/google-calendar"},',
 '    {"@type":"ListItem","position":3,"name":"Cal.com","url":"https://trillet.ai/integrations/cal-com"}]},',
 '  {"@type":"FAQPage","mainEntity":[ /* 4 Q&As, verbatim from the page */ ]},',
 '  {"@type":"BreadcrumbList","itemListElement":[',
 '    {"@type":"ListItem","position":1,"name":"Home","item":"https://trillet.ai/"},',
 '    {"@type":"ListItem","position":2,"name":"Integrations"}]}',
 ']}',
 '</script>',
]));

build("/home/user/Test-1/seo-audit/Trillet-Integration-Index.docx",c,[]);
