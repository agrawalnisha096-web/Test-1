const path=require("path");
const H=require("./int-helpers");
const {eyebrow,H1,H2,H3,kicker,P,t,link,bullet,num,rule,meta,flag,shot,dnote,ans,cta,table,code,build,BRONZE,NAVY,MUTED}=H;
const c=[];
const sec=(n,label,h2)=>{c.push(kicker("Section "+n+" · "+label));if(h2)c.push(P([t("Label:  ",{c:BRONZE,size:15,b:true}),t(label.toUpperCase(),{size:15,b:true,c:MUTED}),t("     H2:  ",{c:BRONZE,size:15,b:true}),t(h2,{size:21,b:true,c:NAVY})]));};

// ---------- BRIEF HEADER ----------
c.push(eyebrow("Trillet · Integration Page · /integrations/google-calendar"));
c.push(H1("Trillet + Google Calendar: The AI Receptionist for Businesses That Run on Google Calendar"));
c.push(P([t("Copy, structure and design spec for ",{c:MUTED,size:18}),t("/integrations/google-calendar",{mono:true,size:16,c:MUTED}),t(". The integration lets an AI receptionist check a Google Calendar for free time, book appointments as events on the calendar you choose, and reschedule or cancel them on a call. Google emails the caller an invite. Connected per agent. Figures match the live site, October 2026. A rendered HTML reference ships alongside (Trillet-Integration-Google-Calendar-render.html).",{c:MUTED,size:18})]));
c.push(rule());
c.push(meta("URL","https://trillet.ai/integrations/google-calendar   (new; the hub's Google Calendar card links here instead of to /integrations#google-calendar)",{mono:true,size:14}));
c.push(meta("PAGE TYPE","Integration landing page. Primary goal: start the AI Receptionist (Try risk free). Secondary: agencies start white-label (Get started)."));
c.push(meta("TARGET KEYWORD","ai receptionist google calendar"));
c.push(meta("SECONDARY / LSI","google calendar ai receptionist · ai receptionist that books appointments · ai receptionist appointment booking · ai receptionist appointment scheduling · can an ai receptionist book appointments in my calendar · voice ai google calendar integration · ai phone answering google calendar"));
c.push(meta("AUDIENCE","Small, appointment-based businesses whose day already runs in Google Calendar (primary). Agencies serving them (secondary)."));
c.push(meta("PRIMARY CONVERSION","Try risk free (AI Receptionist).   Secondary: Try a live demo.   Agencies: Get started (white-label)."));
c.push(meta("VOICE","Product page. Second person, outcome-led, plain-spoken for small-business owners. Australian spelling in copy; product UI labels quoted exactly as they appear in Trillet. Zero em-dashes."));
c.push(rule());

// ---------- DESIGN LANGUAGE ----------
c.push(H2("Design language"));
c.push(P([t("Same Trillet v3 system as the GoHighLevel and ServiceTitan pages (cream, ink, plum, yellow, pastel tints; Maven Pro headings, Source Sans 3 body; 8px buttons, 20px cards). This page varies the accents so the three read as siblings, not copies.",{size:18})]));
c.push(table([2600,6760],["Choice","This page"],[
  ["Hero stage","Pink #ECD2E4 with a sky circle (GoHighLevel uses sand, ServiceTitan uses sky)"],
  ["Hero visual","A call card, a Google Calendar day view, and the caller's Google invite email arriving"],
  ["Signature component","“Your calendar is the rulebook”: an interactive day view where blocking time and changing appointment length updates the times the agent would offer"],
  ["New component","An invite email card (what the caller receives)"],
  ["Pricing","Two cards side by side: AI Receptionist (featured, plum) and White-label (white)"],
  ["Plum moments","Why-Trillet band, featured AI Receptionist card, closing CTA"],
]));
c.push(dnote("Keep plum to those three moments and yellow to ticks, the newly booked event and one italic word per heading. The rulebook day view is the page's centrepiece; give it the most space."));
c.push(rule());

// ================= THE PAGE =================
c.push(H2("The page"));
c.push(kicker("Section 0 · Nav and breadcrumb"));
c.push(P([t("Standard site nav, Integrations active. Breadcrumb: Home / Integrations / Google Calendar.")]));

// 1 HERO
c.push(kicker("Section 1 · Hero"));
c.push(P([t("Lockup:  ",{c:BRONZE,size:15,b:true}),t("[Trillet mark] + [GC mark]  AI receptionist for Google Calendar  • Native",{size:17})]));
c.push(P([t("H1:  ",{c:BRONZE,size:15,b:true}),t("Your Google Calendar knows when you're free. Now it answers the phone.",{size:24,b:true,c:NAVY})]));
c.push(P([t("Subhead:  ",{c:BRONZE,size:15,b:true}),t("Trillet's AI receptionist checks your Google Calendar while the caller is on the line, offers times that are genuinely free, and books the appointment straight into it. Google emails your caller the invite, and they can move or cancel it later with a quick call.",{size:19})]));
c.push(cta("Try risk free","Try a live demo"));
c.push(P([t("Trust line:  ",{c:BRONZE,size:15,b:true}),t("[AU flag] Proudly Australian owned   ·   ★ 4.6 on Trustpilot   ·   3,900+ businesses",{size:17})]));
c.push(dnote("Two-column hero on cream, H1 as two stacked sentences with “answers” in italic. Right column: pink stage holding a live call card, a Google Calendar day view overlapping it where the 2pm slot turns into a new event, and an invite email card sliding in beneath. The call loops."));
c.push(shot("The looping hero: a new caller asks for a massage on Thursday; the agent offers 10am or 2pm (both free in the day view, lunch shown as a blocked event); the caller picks 2pm and gives her name and email; a yellow-edged event appears at 2pm; an email card arrives reading “Invitation: Massage with Calm Hands Studio. Thu 9 Oct, 2pm to 3pm.” Illustrative business and names."));

// 2 TRUST
sec(2,"Compliance on every plan",null);
c.push(P([t("Pills:  ",{c:BRONZE,size:15,b:true}),t("SOC 2 Type II · ISO 27001 · HIPAA · GDPR · ACMA · TCPA · AU data residency",{size:16,b:true})]));
c.push(P([t("Line:  ",{c:BRONZE,size:15,b:true}),t("When you connect, Google asks you to allow two things: seeing your calendars, and creating and editing events. That is what lets Trillet find free times and book.")]));
c.push(dnote("Same quiet white strip as the other integration pages; the right-hand line explains the Google permissions in plain words."));

// 3 WHAT IT DOES
sec(3,"What it does","One calendar. Every call answered.");
c.push(ans("Trillet's Google Calendar integration lets your AI receptionist book appointments into Google Calendar during a call. It checks the calendar for free time before offering a slot, books the appointment as an event on the calendar you choose, and Google emails the caller an invite. Callers can also move or cancel an appointment by phone. You set the appointment length (15, 30, 45 or 60 minutes, or your own) and bookings use your business's timezone. You connect it per agent, with a Google account that can edit the calendar."));
c.push(P([t("If your day already lives in Google Calendar, you don't need a CRM or a separate booking app to take bookings by phone. The calendar you check every morning becomes the one your receptionist books into, even when you're with a client, on the tools or closed for the night.")]));
c.push(dnote("Butter short-answer block with the ink “?” tile, as on the other integration pages. One paragraph, written to be lifted into an answer box."));

// 4 RULEBOOK (signature)
sec(4,"Your calendar is the rulebook","If it's on your calendar, it's off the table.");
c.push(P([t("Intro:  ",{c:BRONZE,size:15,b:true}),t("The agent treats any time without an event as free. So you control what callers can book the same way you already run your day: in Google Calendar.")]));
c.push(bullet([t("Block it and it's never offered. ",{b:true}),t("Lunch, days off, school pick-up, closed hours: add them as events and the agent won't offer those times.")]));
c.push(bullet([t("Or set your hours in the agent. ",{b:true}),t("Prefer not to block time? Add your opening hours to the agent's instructions instead.")]));
c.push(bullet([t("Pick the appointment length. ",{b:true}),t("15, 30, 45 or 60 minutes, or your own. The default is 30.")]));
c.push(bullet([t("Change your mind, change the calendar. ",{b:true}),t("The agent checks for free time before every offer, so a new event you add is respected on the next call.")]));
c.push(dnote("A white card holding a one-day Google Calendar view (8am to 6pm) with a few existing events. Two controls above it: toggles for “Block lunch (12 to 1)” and “Close at 3pm”, and a segmented control for appointment length (15 / 30 / 45 / 60). Free slots the agent would offer are shown as green pills and recompute instantly. Caption: “Illustrative. Your agent reads your real calendar.”"));

// 5 CALLER'S SIDE
sec(5,"What your caller gets","A real invite, not a voicemail.");
c.push(P([t("To book, the agent asks for the caller's name and email address. It books the appointment and Google emails them a calendar invite, ready to add to their own calendar.")]));
c.push(P([t("Need to move it? They call back. The agent finds the booking from the time they give and their name, email or phone number, then offers a new time or cancels it, and the slot opens up for the next caller.")]));
c.push(dnote("Split block: left, an email card styled like a calendar invite (business name, appointment title, date and time, timezone). Right, a short three-line call transcript of a caller moving that appointment, with the event sliding to its new time."));

// 6 HOW IT WORKS
sec(6,"How it works on a call","From hello to invite.");
c.push(num([t("It checks before it offers. ",{b:true}),t("Only times with no event in your calendar are offered.")],"gc-flow"));
c.push(num([t("It takes the details. ",{b:true}),t("Name and email for the invite, plus anything else you've asked it to collect.")],"gc-flow"));
c.push(num([t("It books, Google invites. ",{b:true}),t("The appointment lands on the calendar you chose and Google emails the caller.")],"gc-flow"));
c.push(num([t("It moves or cancels on request. ",{b:true}),t("Found by the time plus the caller's name, email or phone number.")],"gc-flow"));
c.push(dnote("The shared four-card timeline component, with this page's copy and a pink tint behind the numbers."));

// 7 MAKE IT YOURS
sec(7,"Make it yours","Booked your way.");
c.push(H3("Details to include"));
c.push(P([t("List what the agent should collect and write into the Google Calendar event, such as the caller's address or the type of service. You open the event and everything is there.")]));
c.push(H3("Instructions for each action"));
c.push(P([t("Each action comes with Trillet's instructions for when and how to use it. Edit them to fit how you work, switch them off, or click Reset to go back to the default.")]));
c.push(H3("What it says while it works"));
c.push(P([t("Set the line the agent uses while it checks, books, moves or cancels, such as “One moment, let me check what's available.”")]));
c.push(H3("Only the actions you want"));
c.push(P([t("Check availability, Book an appointment, Reschedule and Cancel. Add or remove each one, so the agent does exactly what you want and nothing you don't.")]));
c.push(dnote("Two by two tinted cards (butter, sky, soft blue, sand). The first card shows a mini event with “Address” and “Service” lines filled in."));
c.push(shot("Book an appointment's settings showing Details to include, and a function's settings showing Additional instructions with Reset and the switch."));

// 8 SETUP
sec(8,"Setup","Connected in four steps. Signed in with Google.");
c.push(num([t("Connect your Google account. ",{b:true}),t("In your agent, open Advanced Settings, then Integrations, click the Google Calendar tile and Connect Google Calendar. Sign in with the account that owns the calendar and allow Trillet to see your calendars and to create and edit events.")],"gc-setup"));
c.push(num([t("Choose the calendar, length and timezone. ",{b:true}),t("Select Calendar (your primary calendar until you change it), Slot Duration, and Agent Location (Timezone). The timezone is required; Trillet fills it in from your calendar when it can.")],"gc-setup"));
c.push(num([t("Choose what the agent can do. ",{b:true}),t("Check availability, Book an appointment, Reschedule and Cancel. Optionally set what it says and the details to include.")],"gc-setup"));
c.push(num([t("Save, publish and test. ",{b:true}),t("Click Save settings, then Publish Changes. Make a test call, book a time you know is free, and check the event lands at the right local time. Then move it and cancel it.")],"gc-setup"));
c.push(dnote("Interactive split as on the other pages: steps left, sticky settings panel right showing Connected (Google account), Select Calendar, Slot Duration, Agent Location (Timezone), the four functions marked Added, and Save settings / Publish Changes. Each step lights up its fields."));
c.push(shot("Replace the mock with real screenshots in the same layout: the Integrations tile, Google's permission screen, the connected window with Select Calendar, Slot Duration, Agent Location (Timezone) and Functions, and a booked test event in Google Calendar."));

// 9 WHO IT'S FOR
sec(9,"Built for appointment businesses","For businesses that run on Google Calendar.");
c.push(bullet([t("Massage therapists. ",{b:true})].concat(link("AI receptionist for massage therapists","/receptionist/industries/massage-therapists"))));
c.push(bullet([t("Physiotherapists. ",{b:true})].concat(link("AI receptionist for physiotherapists","/receptionist/industries/physiotherapists"))));
c.push(bullet([t("Therapists. ",{b:true})].concat(link("AI receptionist for therapists","/receptionist/industries/therapists"))));
c.push(bullet([t("Accountants. ",{b:true})].concat(link("AI receptionist for accountants","/receptionist/industries/accountants"))));
c.push(bullet([t("Real estate. ",{b:true})].concat(link("AI receptionist for real estate","/receptionist/industries/real-estate"))));
c.push(bullet([t("Car detailing. ",{b:true})].concat(link("AI receptionist for car detailing","/receptionist/industries/car-detailing"))));
c.push(dnote("Six compact tiles in two rows of three, each with a tinted icon and an arrow, linking to the live AI Receptionist industry pages."));

// 10 PROOF
sec(10,"What business owners are saying","Answered, even when you're flat out.");
c.push(P([t("Quote 1:  ",{c:BRONZE,size:15,b:true}),t("“Six months ago I wasn't sure about voice AI. Now my phone gets answered every time, even when I'm flat out. It's been a game-changer.”  Dylan, DPMP Media",{i:true})]));
c.push(P([t("Quote 2:  ",{c:BRONZE,size:15,b:true}),t("“When I first tried it, I just got it straight away. It actually makes sense how to set things up. Way simpler than anything I'd looked at before.”  Ethan, Bull Digital",{i:true})]));
c.push(P([t("Score card:  ",{c:BRONZE,size:15,b:true}),t("Trustpilot 4.6. 3,900+ businesses trust Trillet with their calls.")]));
c.push(dnote("Same three-column proof row as the other pages. Both quotes are live on trillet.ai/receptionist; keep them verbatim."));

// 11 WHY
sec(11,"Why Trillet for Google Calendar","Simple to start. Built to be trusted.");
c.push(bullet([t("Native, not a workaround. ",{b:true}),t("Connects straight to Google Calendar with a Google sign-in. No automation tools in the middle.")]));
c.push(bullet([t("Calendar booking included. ",{b:true}),t("Part of the $49 AI Receptionist plan, and included on white-label plans.")]));
c.push(bullet([t("Keep your number. ",{b:true}),t("Forward your existing line; carrier-level forwarding is live in about 30 seconds, with no porting.")]));
c.push(bullet([t("Compliance included. ",{b:true}),t("SOC 2 Type II, ISO 27001, HIPAA, GDPR, ACMA and TCPA on every plan, with recordings and transcripts of every call.")]));
c.push(dnote("Plum band with four yellow-tick columns, the shared component with this page's copy."));

// 12 PRICING
sec(12,"Pricing","Two ways to start.");
c.push(table([2200,3580,3580],["","For your own business","For agencies"],[
  ["Plan","AI Receptionist, $49/month  (featured)","White-label, from $99/month"],
  ["Pitch","AI answers your phone when you can't.","Sell AI reception and booking under your own brand."],
  ["Included","150 minutes (about 75 calls); calendar booking; call summaries by email; keep your existing number","Studio $99: up to 3 workspaces, 1,000 minutes, 3 numbers. Agency $299: unlimited workspaces, 3,000 minutes, 10 numbers. Google Calendar integration included"],
  ["After included minutes","$0.20/min, no plan change","AI usage $0.12/min; US Trillet telephony from $0.014/min"],
  ["Terms","28-day money-back guarantee. No contracts, no setup fee","7-day free trial. No contracts, no setup fees"],
  ["CTA","Try risk free","Get started  (links to /whitelabel pricing)"],
]));
c.push(dnote("Two cards side by side. AI Receptionist on plum with yellow ticks and a cream button. White-label on white with green ticks and an ink button, showing Studio and Agency as two short rows inside one card. Each card ends in its own CTA."));

// 13 FAQ
sec(13,"FAQ","Google Calendar integration questions.");
const faq=[
 ["Does Trillet work with my existing Google Calendar?","Yes. Sign in with a Google account that can edit the calendar, choose which calendar bookings go into (your primary calendar until you change it), and the agent works from what is already there."],
 ["How does it avoid double bookings?","It checks your calendar for free time before it offers a slot, so times already taken by an event are not offered."],
 ["How does it know my opening hours?","Any time without an event counts as free. Block closed hours, breaks and days off in Google Calendar, or add your opening hours to the agent's instructions."],
 ["What does the caller receive?","The agent asks for their name and email address, books the appointment, and Google emails them a calendar invite."],
 ["Can callers reschedule or cancel?","Yes, when the Reschedule and Cancel functions are switched on. The agent finds the appointment from the time the caller gives and their name, email or phone number, then moves or cancels it."],
 ["How long are appointments?","You choose: 15, 30, 45 or 60 minutes, or your own length. The default is 30 minutes."],
 ["Which timezone does it use?","Your business's timezone, set as Agent Location (Timezone). It is required, and Trillet fills it in from your Google calendar when it can. If bookings land at the wrong time, check this setting."],
 ["Can it add details to the calendar event?","Yes. Under Details to include, list what the agent should collect and write into the event, such as the caller's address or the type of service."],
 ["Can I connect more than one calendar?","Each agent has its own Google connection and books into the calendar you select for it."],
 ["How do I disconnect or switch accounts?","Click Reconnect to switch to a different Google account, or Disconnect to stop the agent booking. Disconnecting removes the connection and its calendar settings from that agent only."],
];
faq.forEach(([q,a])=>{c.push(H3(q));c.push(P([t(a)]));});
c.push(P([t("Last reviewed: October 2026.",{c:MUTED,i:true,size:16})]));
c.push(dnote("Same two-column accordion as the other pages. Mirror the copy verbatim in FAQPage schema."));

// 14 MORE + CLOSE
sec(14,"More integrations","Booking somewhere else too?");
c.push(bullet([t("GoHighLevel. ",{b:true}),t("Book into your GoHighLevel calendar and find or create the contact. ")].concat(link("See the integration","/integrations/gohighlevel"))));
c.push(bullet([t("ServiceTitan. ",{b:true}),t("Send bookings into your ServiceTitan queue for the office to confirm. ")].concat(link("See the integration","/integrations/servicetitan"))));
c.push(bullet([t("Your own API. ",{b:true}),t("Custom API actions for the systems you already run. ")].concat(link("All integrations","/integrations"))));
sec(15,"Get started","Let your calendar take the call.");
c.push(P([t("Line:  ",{c:BRONZE,size:15,b:true}),t("Connect Google Calendar and take your next booking while you're with a client.")]));
c.push(cta("Try risk free","Try a live demo"));
c.push(dnote("Inset plum closing band; “take the call” in yellow italic."));
c.push(kicker("Mobile"));
c.push(dnote("Sticky ink bar after the hero: “Bookings by phone, 24/7” plus Try risk free. The rulebook controls stack above the day view. No horizontal scroll at 390px."));
c.push(rule());

// ---------- SEO ----------
c.push(H2("SEO / AEO notes"));
c.push(H3("Meta title  (45)"));
c.push(P([t("AI Receptionist for Google Calendar | Trillet",{mono:true,size:16})]));
c.push(H3("Meta description  (152)"));
c.push(P([t("Trillet's AI receptionist answers your calls, checks your Google Calendar and books free times while the caller is on the line. Google sends the invite.",{mono:true,size:15})]));
c.push(flag("Render H1, the short answer and the FAQ server-side. Point the hub's Google Calendar card at this URL."));
c.push(flag("Before publishing, confirm with product that the AI Receptionist plan's calendar booking uses this Google Calendar connection, as the pricing card and Why section state."));
c.push(H3("Structured data: SoftwareApplication + HowTo + FAQPage + BreadcrumbList"));
c.push(code([
 '<script type="application/ld+json">',
 '{ "@context":"https://schema.org","@graph":[',
 '  {"@type":"SoftwareApplication","name":"Trillet AI Receptionist for Google Calendar",',
 '   "applicationCategory":"BusinessApplication","operatingSystem":"Web",',
 '   "offers":[{"@type":"Offer","name":"AI Receptionist","price":"49","priceCurrency":"USD"},',
 '             {"@type":"Offer","name":"Studio","price":"99","priceCurrency":"USD"},',
 '             {"@type":"Offer","name":"Agency","price":"299","priceCurrency":"USD"}],',
 '   "provider":{"@id":"https://trillet.ai/#org"},"url":"https://trillet.ai/integrations/google-calendar"},',
 '  {"@type":"HowTo","name":"Connect Trillet to Google Calendar","step":[',
 '    {"@type":"HowToStep","name":"Connect your Google account"},',
 '    {"@type":"HowToStep","name":"Choose the calendar, length and timezone"},',
 '    {"@type":"HowToStep","name":"Choose what the agent can do"},',
 '    {"@type":"HowToStep","name":"Save, publish and test"}]},',
 '  {"@type":"FAQPage","mainEntity":[ /* 10 Q&As, verbatim from the page */ ]},',
 '  {"@type":"BreadcrumbList","itemListElement":[',
 '    {"@type":"ListItem","position":1,"name":"Home","item":"https://trillet.ai/"},',
 '    {"@type":"ListItem","position":2,"name":"Integrations","item":"https://trillet.ai/integrations"},',
 '    {"@type":"ListItem","position":3,"name":"Google Calendar"}]}',
 ']}',
 '</script>',
]));
c.push(H3("Internal links"));
c.push(P([t("Up to ")].concat(link("Integrations","/integrations")).concat([t(" and ")]).concat(link("AI receptionist","/receptionist")).concat([t(". Down to the six industry pages above. Supporting blogs that should link here: ")]).concat(link("Can an AI receptionist schedule appointments?","/blogs/can-ai-receptionist-schedule-appointments")).concat([t(" and ")]).concat(link("Voice AI appointment scheduling integration","/blogs/voice-ai-appointment-scheduling-integration")).concat([t(". Across to ")]).concat(link("GoHighLevel","/integrations/gohighlevel")).concat([t(" and ")]).concat(link("ServiceTitan","/integrations/servicetitan")).concat([t(".")])));
c.push(H3("After launch"));
c.push(P([t("Front Desk Review's tracker of AI receptionists with Google Calendar booking lists Trillet “from $99/mo” (flagged stale). Once this page is live, it is the page to point them to for re-verification.",{c:MUTED})]));

build(path.join(__dirname,"../../Trillet-Integration-Google-Calendar.docx"),c,["gc-flow","gc-setup"]);
