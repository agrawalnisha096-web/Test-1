const H=require("./int-helpers");
const {eyebrow,H1,H2,H3,kicker,P,t,link,bullet,num,rule,meta,okline,flag,shot,ans,cta,table,spec,code,build,BRONZE,NAVY,MUTED}=H;
const c=[];

// ---------- BRIEF HEADER ----------
c.push(eyebrow("Trillet · Integration Page · /integrations/google-calendar"));
c.push(H1("Trillet + Google Calendar: A Voice Agent That Actually Books"));
c.push(P([t("Build spec for ",{c:MUTED,size:18}),t("/integrations/google-calendar",{mono:true,size:16,c:MUTED}),t(". Distinct from the GoHighLevel page: this one is about the calendar itself, checking real availability live, booking, rescheduling and cancelling, and getting time zones right. Product-page voice, figures reconciled to the live site, September 2026.",{c:MUTED,size:18})]));
c.push(rule());
c.push(meta("URL","https://trillet.ai/integrations/google-calendar   (new)",{mono:true,size:14}));
c.push(meta("PAGE TYPE","Integration landing page. Primary goal: start free or book a demo with booking intent."));
c.push(meta("TARGET KEYWORD","google calendar ai receptionist booking"));
c.push(meta("SECONDARY / LSI","trillet google calendar integration · voice ai google calendar booking · ai receptionist book appointments · voice agent reschedule appointment · real-time availability voice ai · google calendar appointment booking ai"));
c.push(meta("PRIMARY CONVERSION","Start risk free.   Secondary: Book a demo.   Tertiary: See pricing."));
c.push(meta("VOICE","Product page. Second person, outcome-led, concrete. Australian spelling, zero em-dashes."));
c.push(rule());

// ================= THE PAGE =================
c.push(H2("The page"));

// 1 HERO
c.push(kicker("Section 1 · Hero"));
c.push(P([t("H1:  ",{c:BRONZE,size:15,b:true}),t("A voice agent that books straight into Google Calendar",{size:24,b:true,c:NAVY})]));
c.push(P([t("Subhead:  ",{c:BRONZE,size:15,b:true}),t("Connect Trillet to Google Calendar and callers book, reschedule and cancel by talking. The agent reads your real availability the moment it is asked, offers only slots that are genuinely free, and writes the appointment in the caller's time zone. No double bookings, no phone tag, no after-hours voicemail.",{size:19})]));
c.push(cta("Start risk free","Book a demo"));
c.push(shot("Split view: a caller on the phone with the Trillet agent, and a Google Calendar week filling in live. The agent has just offered “Thursday 2pm or Friday 10am” and, as the caller picks Thursday, a new event appears on the calendar with the caller's name and phone number."));

// 2 TRUST STRIP
c.push(kicker("Section 2 · Trust strip"));
c.push(P([t("Native Google Calendar integration.",{size:19,b:true}),t("   Compliance on every plan: ",{c:MUTED,size:16}),t("SOC 2 Type II · ISO 27001 · HIPAA · GDPR · ACMA · TCPA · AU Data Residency",{size:16,b:true})]));

// 3 WHAT THE INTEGRATION DOES
c.push(H2("What the integration does"));
c.push(ans("The Trillet + Google Calendar integration turns your calendar into a live booking line. The voice agent checks real-time availability before it offers a time, books the appointment directly into Google Calendar, and can reschedule or cancel an existing one on the same call. It reads free and busy across the calendars you connect, respects buffers and working hours, and confirms times in the caller's own time zone so nobody turns up an hour out."));
c.push(P([t("A booking form only works when someone is willing to type. Plenty of callers will not: they ring because it is faster, or because it is after hours and they want it handled now. Trillet answers that call, works from the same Google Calendar your team already lives in, and books the slot before the caller hangs up.")],{after:80}));

// 4 USE CASES (CALENDAR-SPECIFIC)
c.push(H2("What you can build"));

c.push(H3("Real-time availability, never a double booking"));
c.push(P([t("The agent queries Google Calendar at the moment of the call, so it only ever offers times that are actually open. If a slot fills between two calls, it is gone from the next caller's options automatically. Connect more than one calendar and the agent reads busy time across all of them, so a shared resource or a clinician who works across two diaries is never booked twice.")]));
c.push(shot("The agent's slot-finding view over a Google Calendar: greyed-out busy blocks, three green open slots it is about to offer, and a buffer setting (“15 min between appointments”) applied automatically."));

c.push(H3("Book, reschedule and cancel on one call"));
c.push(P([t("Booking is only half of it. A caller who needs to move an appointment can do it by voice: the agent finds their existing event, offers new times, updates Google Calendar, and sends the caller and your team the amended details. A cancellation frees the slot immediately, so the next caller can take it. The work that used to mean a call, a hold, and a manual calendar edit now finishes in one conversation.")]));

c.push(H3("Time zones handled for you"));
c.push(P([t("The agent confirms the appointment in the caller's time zone and stores it correctly in your Google Calendar, which stays in yours. For a clinic with patients across states, or a consultant taking calls from other countries, that removes the single most common booking error: the right time in the wrong zone. Working hours and blackout dates are respected, so nobody books a 3am slot.")]));
c.push(shot("A confirmation moment: the caller hears “That is 10am Thursday your time, which I have booked”, and the Google Calendar event shows the correct local time with both time zones noted in the description."));

// 5 SETUP (HowTo)
c.push(H2("How to connect Trillet to Google Calendar"));
c.push(P([t("Three steps, no code. Live in a few minutes.",{c:MUTED,size:18})]));
c.push(num([t("Connect Google Calendar. ",{b:true}),t("In Trillet, open Integrations, choose Google Calendar, and sign in with the Google account whose calendars you want the agent to book into. Pick one calendar or several.")],"gc-setup"));
c.push(num([t("Set the rules. ",{b:true}),t("Choose appointment types and lengths, buffers between bookings, working hours and blackout dates. Decide whether the agent can reschedule and cancel as well as book.")],"gc-setup"));
c.push(num([t("Point the number. ",{b:true}),t("Use a Trillet number or forward your existing line. Carrier-level call forwarding goes live in about 30 seconds with no number porting, so the calendar starts filling the same day.")],"gc-setup"));
c.push(shot("The Trillet Integrations screen: Google Calendar connected with a green tick, two calendars selected, and a rules panel showing appointment length, buffer, working hours and a reschedule/cancel toggle."));

// 6 WHY TRILLET
c.push(H2("Why teams book with Trillet"));
c.push(bullet([t("It reads live, not cached. ",{b:true}),t("Availability is checked at the moment of the call, so the slot it offers is the slot that is free.")]));
c.push(bullet([t("Full booking lifecycle. ",{b:true}),t("Book, reschedule and cancel by voice, with confirmations to the caller and your team.")]));
c.push(bullet([t("Compliance included. ",{b:true}),t("SOC 2 Type II, ISO 27001, HIPAA, GDPR, ACMA and TCPA on every plan, with a recording and transcript of every call. That matters when the calendar is a clinic's.")]));
c.push(bullet([t("Answers when you cannot. ",{b:true}),t("After hours, at lunch, or when every line is busy, the agent still books. A missed call is a booking your competitor takes.")]));

// 7 PRICING
c.push(H2("Pricing"));
c.push(P([t("No per-seat charges. Usage is $0.12 a minute (platform, STT, LLM, TTS). Telephony is separate: US Trillet telephony from $0.014 a minute, web calls no telephony fee.",{size:18})]));
c.push(table([1500,3930,3930],["Plan","Studio, $99/mo","Agency, $299/mo"],[
  ["Workspaces","Up to 3","Unlimited"],
  ["Included minutes","100 / month","300 / month"],
  ["Free phone numbers","3","10"],
  ["Google Calendar integration","Included","Included"],
]));
c.push(P([t("28-day money-back guarantee. No contracts, cancel anytime.",{size:17,c:MUTED})]));
c.push(cta("Start risk free","See pricing"));

// 8 FAQ (CALENDAR-SPECIFIC)
c.push(H2("Google Calendar integration FAQ"));
const faq=[
 ["Can the voice agent book appointments in Google Calendar?","Yes. The agent checks real-time availability, offers open slots, and writes the appointment straight into the Google Calendar you connect, with the caller's name and number on the event."],
 ["Can it reschedule or cancel existing appointments?","Yes. On the same call, the agent finds the caller's existing event, offers new times, and updates or cancels it in Google Calendar, then confirms the change to the caller and your team."],
 ["How does it avoid double bookings?","It reads your calendar live at the moment of the call and only offers slots that are free, applying your buffers and working hours. Connect several calendars and it reads busy time across all of them."],
 ["Does it handle time zones?","Yes. The agent confirms the time in the caller's time zone and stores the event correctly in yours, so cross-state and cross-border bookings land at the right time."],
 ["Can I connect more than one calendar?","Yes. Connect one or several. The agent respects busy time across every connected calendar, which suits shared resources and staff who work across multiple diaries."],
 ["Do I need to change my phone number?","No. Use a Trillet number or forward your existing line. Carrier-level call forwarding goes live in about 30 seconds with no porting."],
 ["Is it safe for a healthcare calendar?","Yes. Compliance is included on every plan: SOC 2 Type II, ISO 27001, HIPAA, GDPR, ACMA and TCPA, with audit trails and a call record on every workspace."],
];
faq.forEach(([q,a])=>{c.push(H3(q));c.push(P([t(a)]));});
c.push(P([t("Last reviewed: September 2026.",{c:MUTED,i:true,size:16})]));

// 9 CLOSE
c.push(kicker("Section 9 · Final CTA"));
c.push(P([t("H2:  ",{c:BRONZE,size:15,b:true}),t("Turn your Google Calendar into a booking line",{size:22,b:true,c:NAVY})]));
c.push(P([t("Connect it today, or see the other native integrations on the ")].concat(link("Integrations","/integrations")).concat([t(" page.")])));
c.push(cta("Start risk free","Book a demo"));
c.push(rule());

// ---------- SEO / SCHEMA ----------
c.push(H2("SEO / AEO notes"));
c.push(H3("Meta title  (57)"));
c.push(P([t("Google Calendar AI Booking & Receptionist | Trillet",{mono:true,size:16})]));
c.push(H3("Meta description  (146)"));
c.push(P([t("Connect Trillet voice AI to Google Calendar. Callers book, reschedule and cancel by voice, with live availability and time zones handled automatically.",{mono:true,size:15})]));
c.push(flag("Render H1, intro and FAQ server-side. Do not claim two-way CRM sync here; that is the GoHighLevel page's job."));
c.push(H3("Structured data: SoftwareApplication + HowTo + FAQPage + BreadcrumbList"));
c.push(code([
 '<script type="application/ld+json">',
 '{ "@context":"https://schema.org","@graph":[',
 '  {"@type":"SoftwareApplication","name":"Trillet Voice AI for Google Calendar",',
 '   "applicationCategory":"BusinessApplication","operatingSystem":"Web",',
 '   "offers":[{"@type":"Offer","name":"Studio","price":"99","priceCurrency":"USD"},',
 '             {"@type":"Offer","name":"Agency","price":"299","priceCurrency":"USD"}],',
 '   "provider":{"@id":"https://trillet.ai/#org"},"url":"https://trillet.ai/integrations/google-calendar"},',
 '  {"@type":"HowTo","name":"Connect Trillet to Google Calendar","step":[',
 '    {"@type":"HowToStep","name":"Connect Google Calendar"},',
 '    {"@type":"HowToStep","name":"Set the rules"},',
 '    {"@type":"HowToStep","name":"Point the number"}]},',
 '  {"@type":"FAQPage","mainEntity":[ /* 7 Q&As, verbatim from the page */ ]},',
 '  {"@type":"BreadcrumbList","itemListElement":[',
 '    {"@type":"ListItem","position":1,"name":"Home","item":"https://trillet.ai/"},',
 '    {"@type":"ListItem","position":2,"name":"Integrations","item":"https://trillet.ai/integrations"},',
 '    {"@type":"ListItem","position":3,"name":"Google Calendar"}]}',
 ']}',
 '</script>',
]));
c.push(H3("Internal links"));
c.push(P([t("Up to ")].concat(link("Integrations","/integrations")).concat([t(". Across to ")]).concat(link("Cal.com","/integrations/cal-com")).concat([t(" for team and round-robin scheduling, and ")]).concat(link("GoHighLevel","/integrations/gohighlevel")).concat([t(" for CRM sync.")])));

build("/home/user/Test-1/seo-audit/Trillet-Integration-Google-Calendar.docx",c,["gc-setup"]);
