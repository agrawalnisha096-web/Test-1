const H=require("./int-helpers");
const {eyebrow,H1,H2,H3,kicker,P,t,link,bullet,num,rule,meta,okline,flag,shot,dnote,ans,cta,table,spec,code,build,BRONZE,NAVY,MUTED}=H;
const c=[];

// ---------- BRIEF HEADER ----------
c.push(eyebrow("Trillet · Integration Page · /integrations/gohighlevel"));
c.push(H1("Trillet + GoHighLevel: A Voice Agent That Books Into Your Calendar"));
c.push(P([t("Copy-and-structure spec for ",{c:MUTED,size:18}),t("/integrations/gohighlevel",{mono:true,size:16,c:MUTED}),t(", with design notes for the build. The integration books appointments into a GoHighLevel calendar during a call and matches or creates the caller's contact. Connected per agent. Every figure reconciled to the live site.",{c:MUTED,size:18})]));
c.push(rule());
c.push(meta("URL","https://trillet.ai/integrations/gohighlevel   (new; 301 the gohighlevel-voice-ai-integration blog here)",{mono:true,size:14}));
c.push(meta("PAGE TYPE","Integration landing page. Primary goal: start free or book a demo with GoHighLevel intent."));
c.push(meta("TARGET KEYWORD","gohighlevel voice ai integration"));
c.push(meta("SECONDARY / LSI","gohighlevel appointment booking voice ai · voice ai for gohighlevel · ghl voice agent · book gohighlevel appointments by phone · gohighlevel ai receptionist · trillet gohighlevel integration"));
c.push(meta("PRIMARY CONVERSION","Start risk free.   Secondary: Book a demo.   Tertiary: See pricing."));
c.push(meta("VOICE","Product page. Second person, outcome-led, concrete. Australian spelling, zero em-dashes, no founder story."));
c.push(rule());

// ---------- DESIGN LANGUAGE ----------
c.push(H2("Design language"));
c.push(P([t("Trillet's look: deep navy, a bronze accent, generous white space, and compliance worn openly. The HTML render supplied alongside this doc shows the page built to these rules; the DESIGN NOTE callouts below mark the treatment for each section.",{size:18})]));
c.push(meta("PALETTE","Navy #16223C (dark bands, headings) · Bronze #9A6B3F (eyebrows, rules, secondary CTA) · Ink #24303F (body) · Muted #5A6675 (support text) · Green #2E7D5B (compliance ticks) · Rule #D9DEE8 (borders) · backgrounds white and #F7F8FA",{mono:true,size:13}));
c.push(meta("TYPE","Serif display for H1/H2 (Georgia family); clean sans for body and UI (Inter/Calibri family); mono for eyebrows and labels."));
c.push(meta("COMPONENTS","Rounded cards with a hairline border and soft shadow; a mono eyebrow above each section H2; bronze hairline rules; navy hero and closing bands; a compliance badge row; two-up plan cards; an accordion FAQ."));
c.push(meta("MOTION","Restrained. The hero call-and-calendar visual may animate a slot being offered then booked. Everything else static or a gentle fade on scroll."));
c.push(dnote("Ship the page light (white and #F7F8FA sections) with two navy full-bleed bands: the hero backdrop and the closing CTA. Keep one bronze accent per section at most, so it reads premium rather than busy."));
c.push(rule());

// ================= THE PAGE =================
c.push(H2("The page"));

// 1 HERO
c.push(kicker("Section 1 · Hero"));
c.push(P([t("H1:  ",{c:BRONZE,size:15,b:true}),t("GoHighLevel voice AI that books straight into your calendar",{size:24,b:true,c:NAVY})]));
c.push(P([t("Subhead:  ",{c:BRONZE,size:15,b:true}),t("Connect Trillet to GoHighLevel and your agent answers the phone, checks your calendar for real openings, and books the appointment while the caller is still on the line. It recognises returning callers, creates a contact for new ones, and can reschedule or cancel on the same call. Your calendar fills itself, day and night.",{size:19})]));
c.push(cta("Start risk free","Book a demo"));
c.push(dnote("Navy hero band. Left column: eyebrow, serif H1 in white, subhead in a soft grey-white, then a solid bronze primary button and a ghost secondary button. Right column: the call-and-calendar visual below. Compliance badge row sits just beneath the fold as its own light strip."));
c.push(shot("A live Trillet call panel beside a GoHighLevel calendar: the agent has just offered “Thursday 2pm or Friday 10am”, the caller picks Thursday, and the appointment appears on the GoHighLevel calendar booked against the caller's contact. Your agency logo on the Trillet panel, GHL clearly the calendar underneath."));

// 2 TRUST STRIP
c.push(kicker("Section 2 · Trust strip"));
c.push(P([t("Native GoHighLevel integration.",{size:19,b:true}),t("   Compliance on every plan: ",{c:MUTED,size:16}),t("SOC 2 Type II · ISO 27001 · HIPAA · GDPR · ACMA · TCPA · AU Data Residency",{size:16,b:true})]));
c.push(P([t("One quiet line. GoHighLevel gates HIPAA behind a paid add-on; Trillet includes it on every plan, which matters the moment a client is a clinic or a law firm.",{c:MUTED,size:16})]));
c.push(dnote("A single centred row of badges on a white strip, hairline rule top and bottom. Badges are quiet: muted labels, small green tick, no colour blocks. This is a whisper of proof, not a banner."));

// 3 WHAT IT DOES
c.push(H2("What the integration does"));
c.push(ans("The Trillet + GoHighLevel integration lets a voice agent book appointments into your GoHighLevel calendar during a call. It checks your calendar's real availability before it offers a time, so it never double-books, and it works within the opening hours, slot lengths and booking rules you have already set in GoHighLevel. It finds the caller's contact by email or phone, or creates one if there is no match, and books the appointment against it. On the same call it can also reschedule or cancel an existing appointment. You connect it per agent, so the agent that answers a client's phone is the one that books into that client's calendar."));
c.push(P([t("GoHighLevel already runs your pipelines, calendars and follow-up. The gap has always been the phone: someone still has to answer it and get the booking into the calendar before the caller loses patience or hangs up. Trillet answers instead, works from the same calendar your team sees, and books in real time.")],{after:80}));
c.push(dnote("Lead with the green-barred short-answer block (the AEO snippet), then one supporting paragraph. Green left bar signals the direct answer; keep it to five or six lines so it lifts cleanly into an answer box."));

// 4 HOW IT WORKS ON A CALL
c.push(H2("How it works on a call"));
c.push(P([t("Four moments, all inside one conversation. No hold music, no callback, no manual entry afterwards.",{c:MUTED,size:18})]));
c.push(bullet([t("It checks before it offers. ",{b:true}),t("The agent reads open times from your GoHighLevel calendar and only offers slots that are genuinely free, so two callers are never given the same one.")]));
c.push(bullet([t("It knows who is calling. ",{b:true}),t("It looks up the caller's contact in GoHighLevel by email or phone. A returning client is matched to their record; a new caller gets a contact created for them.")]));
c.push(bullet([t("It books against the contact. ",{b:true}),t("To book it takes the caller's first name, last name and email, then writes the appointment onto your calendar against their contact.")]));
c.push(bullet([t("It can move or cancel too. ",{b:true}),t("Give the agent the reschedule and cancel functions and a caller can change or drop an appointment on the same call, freeing the slot for the next person.")]));
c.push(dnote("Render as a four-step horizontal timeline (numbered 01 to 04) with a thin connecting line, not plain bullets. Each step: bronze number, bold lead-in, one line of support. On mobile it stacks vertically with the line running down the left."));
c.push(shot("A four-beat strip of one call: (1) agent reading GHL availability, (2) matching the caller to a GoHighLevel contact, (3) the new appointment written to the calendar, (4) a rescheduled event moving to a new time. The GoHighLevel calendar visible throughout."));

// 5 WHAT YOU CAN BUILD
c.push(H2("What you can build"));
c.push(H3("A 24/7 booking line on your GoHighLevel calendar"));
c.push(P([t("Point the agent at your calendar and it takes bookings around the clock, at lunch, and whenever every line is busy. Because it reads your GoHighLevel calendar's own availability, opening hours, slot length and booking rules stay exactly where you set them. A missed call stops being a lost booking.")]));
c.push(H3("Callers recognised, contacts kept tidy"));
c.push(P([t("The agent matches the caller to their GoHighLevel contact by phone or email, so a returning client is not asked again for what you already hold. When someone new calls, it creates the contact and books against it, so your CRM stays current without anyone typing after the call.")]));
c.push(H3("Reschedules and cancellations handled by voice"));
c.push(P([t("Turn on the reschedule and cancel functions and the agent finds the caller's existing appointment, moves it or drops it, and frees the slot. The work that used to mean a call, a hold and a manual calendar edit finishes in one conversation.")]));
c.push(H3("An agent tuned to how your business books"));
c.push(P([t("Every function ships with Trillet's default instructions, and you can edit each one to fit your business, decide what the agent collects before it books, and set what it says while it checks availability or confirms. You choose which functions the agent has, so it does exactly what you want and nothing you do not.")]));
c.push(dnote("Two-by-two card grid. Each card: bronze icon, serif H3, two or three lines. Equal-height cards, hairline border, soft shadow, generous inner padding. This is the feature showcase, so give it room."));
c.push(shot("A function's settings open in Trillet: Book an appointment selected, editable Additional instructions with a Reset control and an on/off switch, a Details to include list, and a What the agent says while this runs field."));

// 6 SETUP
c.push(H2("How to connect Trillet to GoHighLevel"));
c.push(P([t("No code. Connect the agent that takes bookings, point it at a calendar, and publish. You connect each agent to GoHighLevel separately.",{c:MUTED,size:18})]));
c.push(num([t("Connect the account. ",{b:true}),t("In your agent, open Advanced Settings, then Integrations, click the GoHighLevel tile and Connect. Sign in, choose the sub-account the agent should work in, and approve access. You will see “GoHighLevel connected successfully.”")],"ghl-setup"));
c.push(num([t("Find your Calendar ID. ",{b:true}),t("In GoHighLevel, go to Settings, then Calendars, open your calendar's share link, and copy the ID from the end of the booking link.")],"ghl-setup"));
c.push(num([t("Turn on Calendar Booking. ",{b:true}),t("Back in the GoHighLevel integration settings, switch on Calendar Booking, paste in the Calendar ID, and set Agent Location (Timezone) to match your GoHighLevel calendar. The timezone is required; bookings will not work without it.")],"ghl-setup"));
c.push(num([t("Choose the functions and publish. ",{b:true}),t("Under Functions, add what the agent can do: check availability, book, reschedule and cancel. Click Done, then Publish Changes. Nothing reaches live calls until you publish.")],"ghl-setup"));
c.push(dnote("A numbered vertical stepper on a light #F7F8FA band. Bronze step numbers in circles down the left, connected by a thin rule; each step's title bold, body muted. Keep it visually calmer than the feature grid so it reads as reassuringly simple."));
c.push(shot("The Trillet GoHighLevel integration screen after setup: connected with a green tick, Calendar Booking on, a Calendar ID pasted in, Agent Location (Timezone) set, and all four functions marked Added."));

// 7 WHY TRILLET FOR GHL
c.push(H2("Why agencies and teams run Trillet on GoHighLevel"));
c.push(bullet([t("Compliance included, not gated. ",{b:true}),t("GoHighLevel charges for HIPAA as an add-on. Trillet includes SOC 2 Type II, ISO 27001, HIPAA, GDPR, ACMA and TCPA on every plan, with audit trails and a recording and transcript of every call.")]));
c.push(bullet([t("Its own telephony. ",{b:true}),t("Trillet runs the call layer, so you are not stacking a third-party voice provider on top of GHL. US Trillet telephony is from $0.014 a minute; web calls carry no telephony fee.")]));
c.push(bullet([t("Your calendar rules stay in GoHighLevel. ",{b:true}),t("The agent books within your existing availability, slot lengths and rules. You change how you book in GoHighLevel, the way you always have.")]));
c.push(bullet([t("Keep your number. ",{b:true}),t("Use a Trillet number or forward your existing line. Carrier-level call forwarding goes live in about 30 seconds with no porting.")]));
c.push(dnote("Navy band, reversed out. Four short items in a two-by-two grid, white text, a small bronze tick or rule marking each. This is the differentiator moment, so let it carry the page's second dark band and sit right before pricing."));

// 8 AGENCIES CROSS-LINK
c.push(H2("Running this for clients"));
c.push(P([t("Agencies whose clients live in GoHighLevel connect one Trillet agent per client, each in its own isolated workspace. To sell the whole platform under your own brand, with your domain, dashboard and pricing, see the ")].concat(link("white-label voice AI platform","/whitelabel")).concat([t(".")])));
c.push(dnote("A slim single-line band, not a full section: one sentence and the link, on white with a bronze left rule. Small by design so it points to /whitelabel without competing with the booking story."));

// 9 PRICING
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
c.push(dnote("Two plan cards side by side, Agency marked as the emphasis card (navy header or a bronze “most popular” tab). Usage line above the cards, guarantee line quietly beneath. Each card ends in its own Start button."));

// 10 FAQ
c.push(H2("GoHighLevel integration FAQ"));
const faq=[
 ["Does Trillet integrate natively with GoHighLevel?","Yes. GoHighLevel is a native Trillet integration, alongside Google Calendar and Cal.com, plus webhook and API. You connect it from the agent that takes bookings; there is no middleware to maintain."],
 ["What can the voice agent do in GoHighLevel?","It books appointments into your GoHighLevel calendar during a call, and can reschedule or cancel them. It checks your calendar's real availability first, and finds or creates the caller's contact to book against."],
 ["How does it avoid double bookings?","It reads open times from your GoHighLevel calendar at the moment of the call and only offers slots that are free, working within the opening hours, slot lengths and booking rules you set in GoHighLevel."],
 ["Does it create or find the caller's contact?","Yes. It looks up the caller by email or phone and matches them to their GoHighLevel contact, or creates one if there is no match, then books the appointment against it."],
 ["Do I connect it once for my whole account?","You connect it per agent. Each agent has its own connection, so the agent that answers a given client's phone is the one that books into that client's calendar and sub-account."],
 ["Is it HIPAA compliant for healthcare clients?","Yes, and it is included on every plan rather than a paid add-on. Trillet carries SOC 2 Type II, ISO 27001, HIPAA, GDPR, ACMA and TCPA, with audit trails and call records on every workspace."],
 ["Do I need to port phone numbers?","No. Use a Trillet number or forward the client's existing line. Carrier-level call forwarding goes live in about 30 seconds with no porting."],
];
faq.forEach(([q,a])=>{c.push(H3(q));c.push(P([t(a)]));});
c.push(P([t("Last reviewed: September 2026.",{c:MUTED,i:true,size:16})]));
c.push(dnote("Accordion on white. Each question a row with a bronze plus/minus control; first item open by default. Serif questions, sans answers. Mirror this copy verbatim into the FAQPage schema."));

// 11 CLOSE
c.push(kicker("Section 11 · Final CTA"));
c.push(P([t("H2:  ",{c:BRONZE,size:15,b:true}),t("Let your GoHighLevel calendar book itself",{size:22,b:true,c:NAVY})]));
c.push(P([t("Connect an agent today, or sell the whole platform under your own brand from the ")].concat(link("white-label voice AI platform","/whitelabel")).concat([t(" page.")])));
c.push(cta("Start risk free","Book a demo"));
c.push(dnote("Full-bleed navy closing band, centred. Serif H2 in white, one supporting line, then the bronze primary button and a ghost secondary. This is the page's second and final dark band, bookending the hero."));
c.push(rule());

// ---------- SEO / SCHEMA NOTES ----------
c.push(H2("SEO / AEO notes"));
c.push(H3("Meta title  (58)"));
c.push(P([t("GoHighLevel Voice AI Integration | Trillet",{mono:true,size:16})]));
c.push(H3("Meta description  (146)"));
c.push(P([t("Connect Trillet voice AI to GoHighLevel. Your agent books, reschedules and cancels in your calendar on the call, with HIPAA compliance on every plan.",{mono:true,size:15})]));
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
 '    {"@type":"HowToStep","name":"Find your Calendar ID"},',
 '    {"@type":"HowToStep","name":"Turn on Calendar Booking"},',
 '    {"@type":"HowToStep","name":"Choose the functions and publish"}]},',
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
