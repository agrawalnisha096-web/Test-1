const H=require("./int-helpers");
const {eyebrow,H1,H2,H3,kicker,P,t,link,bullet,num,rule,meta,okline,flag,shot,ans,cta,table,spec,code,build,BRONZE,NAVY,MUTED}=H;
const c=[];

// ---------- BRIEF HEADER ----------
c.push(eyebrow("Trillet · Integration Page · /integrations/cal-com"));
c.push(H1("Trillet + Cal.com: Voice Booking for Teams and Open-Source Stacks"));
c.push(P([t("Build spec for ",{c:MUTED,size:18}),t("/integrations/cal-com",{mono:true,size:16,c:MUTED}),t(". Distinct from the Google Calendar page: the angle here is teams and open source, round-robin and collective events, and Cal.com's self-hostable, developer-first nature. Product-page voice, figures reconciled to the live site, September 2026.",{c:MUTED,size:18})]));
c.push(rule());
c.push(meta("URL","https://trillet.ai/integrations/cal-com   (new)",{mono:true,size:14}));
c.push(meta("PAGE TYPE","Integration landing page. Primary goal: start free or book a demo with team-scheduling intent."));
c.push(meta("TARGET KEYWORD","cal.com voice ai booking"));
c.push(meta("SECONDARY / LSI","trillet cal.com integration · voice ai cal.com scheduling · round-robin voice booking · open source scheduling voice agent · team scheduling ai receptionist · cal.com ai phone booking"));
c.push(meta("PRIMARY CONVERSION","Start risk free.   Secondary: Book a demo.   Tertiary: See pricing."));
c.push(meta("VOICE","Product page. Second person, outcome-led, concrete. Australian spelling, zero em-dashes."));
c.push(rule());

// ================= THE PAGE =================
c.push(H2("The page"));

// 1 HERO
c.push(kicker("Section 1 · Hero"));
c.push(P([t("H1:  ",{c:BRONZE,size:15,b:true}),t("Voice AI booking on top of Cal.com",{size:24,b:true,c:NAVY})]));
c.push(P([t("Subhead:  ",{c:BRONZE,size:15,b:true}),t("Connect Trillet to Cal.com and your callers book against the same event types your team already runs. The agent honours round-robin assignment, collective availability and every rule you have set, whether you use Cal.com's cloud or host it yourself. The scheduling logic stays where you built it. The phone stops being the gap.",{size:19})]));
c.push(cta("Start risk free","Book a demo"));
c.push(shot("A Trillet call panel beside a Cal.com dashboard: the caller is booking a “Discovery Call” event type, and Cal.com's round-robin has just assigned it to the next available team member, whose name the agent reads back on the call."));

// 2 TRUST STRIP
c.push(kicker("Section 2 · Trust strip"));
c.push(P([t("Native Cal.com integration.",{size:19,b:true}),t("   Compliance on every plan: ",{c:MUTED,size:16}),t("SOC 2 Type II · ISO 27001 · HIPAA · GDPR · ACMA · TCPA · AU Data Residency",{size:16,b:true})]));

// 3 WHAT THE INTEGRATION DOES
c.push(H2("What the integration does"));
c.push(ans("The Trillet + Cal.com integration puts a voice agent in front of your Cal.com scheduling. Callers book, reschedule and cancel by talking, and the agent respects the event types, availability and assignment rules you have already configured in Cal.com, including round-robin and collective events. Because Cal.com is open source and self-hostable, the integration suits teams that want their scheduling logic under their own control while still taking bookings by phone."));
c.push(P([t("Cal.com is the scheduling layer for teams who want to own it, whether that means the managed cloud or a self-hosted deployment. What it has never done is answer the phone. Trillet does, and it books against the exact event types and rules your team already trusts, so the person who calls gets the same routing as the person who clicks your booking link.")],{after:80}));

// 4 USE CASES (CAL.COM-SPECIFIC)
c.push(H2("What you can build"));

c.push(H3("Round-robin, assigned by voice"));
c.push(P([t("When a caller books a round-robin event type, Cal.com decides who gets it and the agent reads that person's name back on the call. Bookings spread across the team the same way they do online, so no one is overloaded and no caller waits on a single person's diary. Collective event types work too, where a slot needs several people free at once.")]));
c.push(shot("A Cal.com round-robin event type mid-booking: the assignment logic picks the next rep, the agent confirms “you are booked with Priya on Tuesday”, and the event lands on Priya's connected calendar."));

c.push(H3("Team and collective scheduling"));
c.push(P([t("Point the agent at your team's event types and it books against shared availability, not one person's. A consultation that needs two staff, a service that rotates across a roster, a duty line that should always reach whoever is on: the rules live in Cal.com, and the agent simply follows them. Reschedules and cancellations flow back the same way, freeing the slot for the next caller.")]));

c.push(H3("Open-source and self-hosted friendly"));
c.push(P([t("Cal.com can run on its cloud or on your own infrastructure under an open-source licence. Trillet connects to either, so a team that self-hosts for control or data-residency reasons keeps that setup and still gets voice booking on top. Pair it with Trillet's own onshore data residency and included compliance and you have a phone-booking stack you can actually put in front of regulated clients.")]));
c.push(shot("A connection screen offering both paths: “Cal.com Cloud” and “Self-hosted instance (enter your URL)”, with a green tick once connected and the imported list of event types beneath."));

// 5 SETUP (HowTo)
c.push(H2("How to connect Trillet to Cal.com"));
c.push(P([t("Three steps, no code. Cloud or self-hosted.",{c:MUTED,size:18})]));
c.push(num([t("Connect Cal.com. ",{b:true}),t("In Trillet, open Integrations, choose Cal.com, and authorise your account. If you self-host, point Trillet at your instance. Trillet imports your event types.")],"cal-setup"));
c.push(num([t("Choose event types. ",{b:true}),t("Pick which event types the agent can book, including round-robin and collective ones. Your existing availability, assignment rules and buffers carry across as-is.")],"cal-setup"));
c.push(num([t("Point the number. ",{b:true}),t("Use a Trillet number or forward your existing line. Carrier-level call forwarding goes live in about 30 seconds with no number porting.")],"cal-setup"));
c.push(shot("The Trillet Integrations screen: Cal.com connected with a green tick, three event types selected (Discovery Call round-robin, Onboarding collective, Support 1:1), and a note that availability rules were imported."));

// 6 WHY TRILLET
c.push(H2("Why teams pair Trillet with Cal.com"));
c.push(bullet([t("Your scheduling logic, untouched. ",{b:true}),t("Round-robin, collective events, availability and buffers stay in Cal.com. The agent follows them rather than replacing them.")]));
c.push(bullet([t("Cloud or self-hosted. ",{b:true}),t("Connect Cal.com's managed cloud or your own instance. Teams that self-host for control or data residency keep that.")]));
c.push(bullet([t("Compliance included. ",{b:true}),t("SOC 2 Type II, ISO 27001, HIPAA, GDPR, ACMA and TCPA on every plan, with audit trails and a call record, plus onshore data residency.")]));
c.push(bullet([t("Full booking lifecycle. ",{b:true}),t("Book, reschedule and cancel by voice, with the change reflected in Cal.com and on the assigned team member's calendar.")]));

// 7 PRICING
c.push(H2("Pricing"));
c.push(P([t("No per-seat charges. Usage is $0.12 a minute (platform, STT, LLM, TTS). Telephony is separate: US Trillet telephony from $0.014 a minute, web calls no telephony fee.",{size:18})]));
c.push(table([1500,3930,3930],["Plan","Studio, $99/mo","Agency, $299/mo"],[
  ["Workspaces","Up to 3","Unlimited"],
  ["Included minutes","100 / month","300 / month"],
  ["Free phone numbers","3","10"],
  ["Cal.com integration","Included","Included"],
]));
c.push(P([t("28-day money-back guarantee. No contracts, cancel anytime.",{size:17,c:MUTED})]));
c.push(cta("Start risk free","See pricing"));

// 8 FAQ (CAL.COM-SPECIFIC)
c.push(H2("Cal.com integration FAQ"));
const faq=[
 ["Does Trillet book against my Cal.com event types?","Yes. The agent imports your event types and books against them, honouring the availability, buffers and assignment rules you have already set in Cal.com."],
 ["Does it support round-robin and collective events?","Yes. For a round-robin event type, Cal.com assigns the booking and the agent reads the assigned person back to the caller. Collective events that need several people free at once are supported too."],
 ["Can I use it with a self-hosted Cal.com instance?","Yes. Cal.com is open source and self-hostable. Trillet connects to the managed cloud or to your own instance, so teams that self-host keep that setup and add voice booking on top."],
 ["Can callers reschedule and cancel?","Yes. On the call, the agent finds the existing booking, offers new times, and updates or cancels it in Cal.com, freeing the slot and updating the assigned team member's calendar."],
 ["How is this different from the Google Calendar integration?","Google Calendar is for booking into one or more calendars directly. Cal.com adds team scheduling logic on top: round-robin, collective events and shared availability. Choose Cal.com when bookings need to route across a team."],
 ["Do I need to port my phone number?","No. Use a Trillet number or forward your existing line. Carrier-level call forwarding goes live in about 30 seconds with no porting."],
 ["Is it compliant for regulated teams?","Yes. Compliance is included on every plan: SOC 2 Type II, ISO 27001, HIPAA, GDPR, ACMA and TCPA, with audit trails, a call record, and onshore data residency."],
];
faq.forEach(([q,a])=>{c.push(H3(q));c.push(P([t(a)]));});
c.push(P([t("Last reviewed: September 2026.",{c:MUTED,i:true,size:16})]));

// 9 CLOSE
c.push(kicker("Section 9 · Final CTA"));
c.push(P([t("H2:  ",{c:BRONZE,size:15,b:true}),t("Add voice booking to your Cal.com stack",{size:22,b:true,c:NAVY})]));
c.push(P([t("Connect it today, or compare the other native integrations on the ")].concat(link("Integrations","/integrations")).concat([t(" page.")])));
c.push(cta("Start risk free","Book a demo"));
c.push(rule());

// ---------- SEO / SCHEMA ----------
c.push(H2("SEO / AEO notes"));
c.push(H3("Meta title  (52)"));
c.push(P([t("Cal.com Voice AI Booking Integration | Trillet",{mono:true,size:16})]));
c.push(H3("Meta description  (149)"));
c.push(P([t("Connect Trillet voice AI to Cal.com. Callers book by voice against your event types, with round-robin, collective and self-hosted scheduling supported.",{mono:true,size:15})]));
c.push(flag("Render H1, intro and FAQ server-side. Keep round-robin and self-hosting as the wedge; do not repeat the Google Calendar body."));
c.push(H3("Structured data: SoftwareApplication + HowTo + FAQPage + BreadcrumbList"));
c.push(code([
 '<script type="application/ld+json">',
 '{ "@context":"https://schema.org","@graph":[',
 '  {"@type":"SoftwareApplication","name":"Trillet Voice AI for Cal.com",',
 '   "applicationCategory":"BusinessApplication","operatingSystem":"Web",',
 '   "offers":[{"@type":"Offer","name":"Studio","price":"99","priceCurrency":"USD"},',
 '             {"@type":"Offer","name":"Agency","price":"299","priceCurrency":"USD"}],',
 '   "provider":{"@id":"https://trillet.ai/#org"},"url":"https://trillet.ai/integrations/cal-com"},',
 '  {"@type":"HowTo","name":"Connect Trillet to Cal.com","step":[',
 '    {"@type":"HowToStep","name":"Connect Cal.com"},',
 '    {"@type":"HowToStep","name":"Choose event types"},',
 '    {"@type":"HowToStep","name":"Point the number"}]},',
 '  {"@type":"FAQPage","mainEntity":[ /* 7 Q&As, verbatim from the page */ ]},',
 '  {"@type":"BreadcrumbList","itemListElement":[',
 '    {"@type":"ListItem","position":1,"name":"Home","item":"https://trillet.ai/"},',
 '    {"@type":"ListItem","position":2,"name":"Integrations","item":"https://trillet.ai/integrations"},',
 '    {"@type":"ListItem","position":3,"name":"Cal.com"}]}',
 ']}',
 '</script>',
]));
c.push(H3("Internal links"));
c.push(P([t("Up to ")].concat(link("Integrations","/integrations")).concat([t(". Across to ")]).concat(link("Google Calendar","/integrations/google-calendar")).concat([t(" for single-calendar booking, and ")]).concat(link("GoHighLevel","/integrations/gohighlevel")).concat([t(" for CRM sync.")])));

build("/home/user/Test-1/seo-audit/Trillet-Integration-Cal-com.docx",c,["cal-setup"]);
