const H=require("./int-helpers");
const {eyebrow,H1,H2,H3,kicker,P,t,link,bullet,num,rule,meta,flag,shot,dnote,ans,cta,table,code,build,BRONZE,NAVY,MUTED}=H;
const c=[];
const sec=(n,label,h2)=>{c.push(kicker("Section "+n+" · "+label));if(h2)c.push(P([t("Label:  ",{c:BRONZE,size:15,b:true}),t(label.toUpperCase(),{size:15,b:true,c:MUTED}),t("     H2:  ",{c:BRONZE,size:15,b:true}),t(h2,{size:21,b:true,c:NAVY})]));};

// ---------- BRIEF HEADER ----------
c.push(eyebrow("Trillet · Integration Page · /integrations/gohighlevel"));
c.push(H1("Trillet + GoHighLevel: A Voice Agent That Books Into Your Calendar"));
c.push(P([t("Copy, structure and design spec for ",{c:MUTED,size:18}),t("/integrations/gohighlevel",{mono:true,size:16,c:MUTED}),t(". The integration books appointments into a GoHighLevel calendar during a call and matches or creates the caller's contact. Connected per agent. Figures match the live site, September 2026. A rendered HTML reference ships alongside this doc (Trillet-Integration-GoHighLevel-render.html).",{c:MUTED,size:18})]));
c.push(rule());
c.push(meta("URL","https://trillet.ai/integrations/gohighlevel   (new; 301 the gohighlevel-voice-ai-integration blog here)",{mono:true,size:14}));
c.push(meta("PAGE TYPE","Integration landing page. Primary goal: get started (free trial) or try the live demo."));
c.push(meta("TARGET KEYWORD","gohighlevel voice ai integration"));
c.push(meta("SECONDARY / LSI","gohighlevel appointment booking voice ai · voice ai for gohighlevel · ghl voice agent · book gohighlevel appointments by phone · gohighlevel ai receptionist · trillet gohighlevel integration"));
c.push(meta("PRIMARY CONVERSION","Get started.   Secondary: Try a live demo.   Plan CTAs: Start Studio / Start Agency."));
c.push(meta("VOICE","Product page. Second person, outcome-led, concrete. Australian spelling, zero em-dashes."));
c.push(rule());

// ---------- DESIGN LANGUAGE (Trillet v3, from the live site) ----------
c.push(H2("Design language"));
c.push(P([t("Built on Trillet's live v3 design system, the same one /whitelabel uses: warm cream pages, near-black ink, deep plum for featured and closing moments, and a sunny yellow accent. Soft tinted cards carry features. Compliance and social proof sit close to every CTA.",{size:18})]));
c.push(table([2300,1500,5560],["Token","Value","Where it is used"],[
  ["Cream (page)","#FBF9F5","Page background and most sections"],
  ["Paper","#FFFFFF","Cards, compliance strip, setup band"],
  ["Ink","#191317","Headings, body, primary buttons, step numbers"],
  ["Ink soft / faint","72% / 45% ink","Support copy / meta text and labels"],
  ["Plum","#2B2027","Why-Trillet band, featured Agency card, closing CTA, toasts"],
  ["On plum","#F6EEF2","Text on plum"],
  ["Yellow","#ECCD63","Accent: ticks on plum, the booked slot, focus ring, italic word in the closing H2"],
  ["Butter / Sand","#F0DFAE / #F2E4BC","Short-answer block / hero stage and agency band"],
  ["Pink / Sky","#ECD2E4 / #D6E2F0","Feature card tints, avatar chips"],
  ["Green","#2E5E41","Compliance ticks, live-call pulse, Connected state"],
  ["Radius","8px / 20px","Buttons / cards and blocks"],
]));
c.push(meta("TYPE","Headings: Maven Pro 500, tight tracking (-0.025em), line height 1.06, one italic word for emphasis. Body: Source Sans 3, 17px, line height 1.55. Labels: Maven Pro 600, 12px, uppercase, 0.14em tracking."));
c.push(meta("BUTTONS","Primary: ink fill, cream text, 8px radius, 50px tall, trailing arrow chip that nudges right on hover. Secondary: outline. On plum, the primary flips to cream."));
c.push(meta("CARDS","20px radius, hairline border at 10% ink, lift 4px on hover. Feature cards use the pastel tints, not white."));
c.push(meta("MOTION","Hero call plays on a loop (lines appear, slot offered, slot booked, confirmation toast). Setup steps auto-advance and light up the matching field. Everything respects reduced-motion."));
c.push(dnote("Keep the page light and warm. Use plum in only three places: the Why-Trillet band, the featured Agency card and the closing CTA. Yellow is a spice: ticks, the booked slot and one italic word. Never set body copy in yellow."));
c.push(rule());

// ================= THE PAGE =================
c.push(H2("The page"));

// 0 NAV + BREADCRUMB
c.push(kicker("Section 0 · Nav and breadcrumb"));
c.push(P([t("Standard site nav with Integrations marked active. Breadcrumb under the nav: Home / Integrations / GoHighLevel.")]));
c.push(dnote("Nav links use the site's underline-on-hover. The breadcrumb matches the BreadcrumbList schema and helps visitors step back to the integrations index."));

// 1 HERO
c.push(kicker("Section 1 · Hero"));
c.push(P([t("Lockup:  ",{c:BRONZE,size:15,b:true}),t("[Trillet mark] + [GHL mark]  Trillet for GoHighLevel  • Native",{size:17})]));
c.push(P([t("H1:  ",{c:BRONZE,size:15,b:true}),t("GoHighLevel voice AI. Booked before they hang up.",{size:24,b:true,c:NAVY})]));
c.push(P([t("Subhead:  ",{c:BRONZE,size:15,b:true}),t("Your agent answers the phone, checks your GoHighLevel calendar for real openings, and books the appointment while the caller is still on the line. It recognises returning callers, creates a contact for new ones, and can reschedule or cancel on the same call.",{size:19})]));
c.push(cta("Get started","Try a live demo"));
c.push(P([t("Trust line:  ",{c:BRONZE,size:15,b:true}),t("[AU flag] Proudly Australian owned   ·   ★ 4.6 on Trustpilot   ·   3,900+ businesses",{size:17})]));
c.push(dnote("Two-column hero on cream. H1 set as two stacked sentences, the site's pattern, with “before” in italic. Right column: a sand stage with a pink circle, holding a live call card, a GoHighLevel calendar card overlapping it, and a plum confirmation toast beneath. The call animates on a loop."));
c.push(shot("The looping hero: caller asks for a check-up; agent offers Thursday 2pm or Friday 10am (both slots ring in yellow); caller picks Thursday; the Thursday slot flips to ink with yellow text; a plum toast reads “Appointment booked in GoHighLevel. Contact matched: Sarah Nguyen.”"));

// 2 COMPLIANCE
sec(2,"Compliance on every plan",null);
c.push(P([t("Pills:  ",{c:BRONZE,size:15,b:true}),t("SOC 2 Type II · ISO 27001 · HIPAA · GDPR · ACMA · TCPA · AU data residency",{size:16,b:true})]));
c.push(P([t("Line:  ",{c:BRONZE,size:15,b:true}),t("GoHighLevel sells HIPAA as a paid add-on. Trillet includes it on every plan, so clinics and law firms are covered from day one.")]));
c.push(dnote("White strip with hairline rules above and below. Label left, pills centre (cream fill, green tick), the one-line note right. Quiet proof, not a banner."));

// 3 WHAT IT DOES
sec(3,"What it does","Your phone, finally connected to your calendar.");
c.push(ans("The Trillet and GoHighLevel integration lets a voice agent book appointments into your GoHighLevel calendar during a call. It checks real availability before it offers a time, so it never double-books, and it follows the opening hours, slot lengths and booking rules you already set in GoHighLevel. It finds the caller's contact by email or phone, or creates one, and books against it. It can also reschedule or cancel on the same call. You connect it per agent."));
c.push(P([t("GoHighLevel already runs your pipelines, calendars and follow-up. The gap has always been the phone: someone still has to answer it and get the booking in before the caller gives up. Trillet answers instead, works from the calendar your team already sees, and books in real time.")]));
c.push(dnote("The short answer sits in a butter-tinted block with an ink “?” tile, 20px radius. It is the answer-engine snippet, so keep it one paragraph. Support paragraph below in ink-soft."));

// 4 HOW IT WORKS
sec(4,"How it works on a call","Four moments. One conversation.");
c.push(P([t("Intro:  ",{c:BRONZE,size:15,b:true}),t("No hold music, no callback, no typing it in afterwards.")]));
c.push(num([t("It checks before it offers. ",{b:true}),t("The agent reads open times from your GoHighLevel calendar and only offers slots that are genuinely free.")],"ghl-flow"));
c.push(num([t("It knows who is calling. ",{b:true}),t("It finds the caller's contact by email or phone. Returning clients are matched; new callers get a contact created.")],"ghl-flow"));
c.push(num([t("It books against the contact. ",{b:true}),t("It takes first name, last name and email, then writes the appointment onto your calendar against that contact.")],"ghl-flow"));
c.push(num([t("It can move or cancel too. ",{b:true}),t("With reschedule and cancel switched on, callers change or drop a booking on the same call and the slot frees up.")],"ghl-flow"));
c.push(dnote("Four white cards in a row joined by a dashed line, each topped by an ink circle numbered 01 to 04 in yellow. Two by two on tablet, stacked on mobile."));

// 5 WHAT YOU CAN BUILD
sec(5,"What you can build","Built around how GoHighLevel already works.");
c.push(H3("A 24/7 booking line"));
c.push(P([t("Bookings around the clock, at lunch, and whenever every line is busy. Opening hours, slot length and booking rules stay exactly where you set them in GoHighLevel.")]));
c.push(H3("Callers recognised, contacts tidy"));
c.push(P([t("Returning clients are matched by phone or email and never asked twice. New callers get a contact created and booked against, so your CRM stays current.")]));
c.push(H3("Reschedules by voice"));
c.push(P([t("The agent finds the caller's existing appointment, moves it or cancels it, and frees the slot. A call, a hold and a manual edit becomes one conversation.")]));
c.push(H3("Tuned to how you book"));
c.push(P([t("Edit each function's instructions, choose what the agent collects before it books, and set what it says while it works. You decide which functions it has.")]));
c.push(dnote("Two by two grid of tinted cards: butter, sky, pink, soft blue, matching the /whitelabel feature cards. Each card has a white icon tile top-left (calendar check, user check, refresh, sliders), then H3 and copy anchored to the bottom. Lift on hover."));

// 6 SETUP
sec(6,"Setup","Connected in four steps. No code.");
c.push(P([t("Intro:  ",{c:BRONZE,size:15,b:true}),t("Connect the agent that takes bookings, point it at a calendar, and publish. Each agent connects separately.")]));
c.push(num([t("Connect the account. ",{b:true}),t("Advanced Settings, Integrations, GoHighLevel, Connect. Sign in, pick the sub-account, approve access.")],"ghl-setup"));
c.push(num([t("Find your Calendar ID. ",{b:true}),t("In GoHighLevel, Settings, Calendars. Copy the ID from the end of your calendar's booking link.")],"ghl-setup"));
c.push(num([t("Turn on Calendar Booking. ",{b:true}),t("Switch it on, paste the Calendar ID, and set Agent Location (Timezone) to match your calendar.")],"ghl-setup"));
c.push(num([t("Choose functions and publish. ",{b:true}),t("Add check availability, book, reschedule and cancel. Click Done, then Publish Changes.")],"ghl-setup"));
c.push(dnote("White band. Steps on the left as selectable rows; the active step gets a cream fill, an ink left edge and an ink number. On the right, a sticky mock of the real GoHighLevel settings panel: Connection (Connected), Calendar Booking toggle, Calendar ID, Agent Location (Timezone), four functions marked Added, and a Publish Changes button. Selecting a step lights up its fields with a yellow focus ring. Steps auto-advance until the visitor clicks."));
c.push(shot("Replace the mock with real screenshots of the Trillet GoHighLevel settings in the same layout: Calendar Booking on, Calendar ID pasted, timezone set, all four functions Added."));

// 7 PROOF
sec(7,"What operators are saying","Connecting your CRM, minus the glue work.");
c.push(P([t("Quote 1:  ",{c:BRONZE,size:15,b:true}),t("“Great platform, excellent granular control for building highly functional agents. API integration tools make connecting CRMs really easy.”  Ian Strange, UC Marketing",{i:true})]));
c.push(P([t("Quote 2:  ",{c:BRONZE,size:15,b:true}),t("“This is better than building it myself with Make and Retell and connecting everything up manually.”  Lori Mars, Linx AI Agency",{i:true})]));
c.push(P([t("Score card:  ",{c:BRONZE,size:15,b:true}),t("Trustpilot 4.6. 3,900+ businesses trust Trillet with their calls.")]));
c.push(dnote("Three columns: two white quote cards (quote set in Maven Pro, initials avatar in a tint) and an ink score card with a large yellow 4.6. Both quotes are live on trillet.ai/whitelabel; keep them verbatim."));

// 8 WHY
sec(8,"Why Trillet on GoHighLevel","More than a voice add-on.");
c.push(bullet([t("Compliance included. ",{b:true}),t("SOC 2 Type II, ISO 27001, HIPAA, GDPR, ACMA and TCPA on every plan, with audit trails, recordings and transcripts.")]));
c.push(bullet([t("Its own telephony. ",{b:true}),t("No third-party voice provider stacked on GHL. US Trillet telephony from $0.014 a minute; web calls carry no telephony fee.")]));
c.push(bullet([t("Your rules stay in GHL. ",{b:true}),t("The agent books within your existing availability, slot lengths and rules. Change how you book in GoHighLevel, as always.")]));
c.push(bullet([t("Keep your number. ",{b:true}),t("Use a Trillet number or forward your line. Carrier-level forwarding is live in about 30 seconds, with no porting.")]));
c.push(dnote("Plum band inset from the page edge with 28px rounded corners. Four columns, each with a yellow tick disc, a hairline top rule, a white H3 and copy in on-plum faint. Two by two on tablet, stacked on mobile."));

// 9 AGENCY
sec(9,"Running GoHighLevel for clients",null);
c.push(P([t("Running GoHighLevel for clients? ",{b:true}),t("Connect one Trillet agent per client, each in its own isolated workspace, and sell it all under your own brand. ")].concat(link("White-label voice AI","/whitelabel"))));
c.push(dnote("A slim sand band, one line of copy and an underlined text link on the right. Deliberately small so it routes agencies to /whitelabel without pulling focus from booking."));

// 10 PRICING
sec(10,"Pricing","Simple pricing. Integration included.");
c.push(P([t("No per-seat charges. After included minutes, AI usage is $0.12 a minute (platform, STT, LLM and TTS). Telephony is separate: US Trillet telephony from $0.014 a minute, and web calls have no telephony fee.",{size:18})]));
c.push(table([2200,3580,3580],["","Studio, $99/month","Agency, $299/month  (Most popular)"],[
  ["Pitch","Launch your offer and onboard your first clients.","Grow your client base with unlimited workspaces."],
  ["Workspaces","Up to 3","Unlimited"],
  ["Included minutes","1,000 a month","3,000 a month"],
  ["Free phone numbers","3","10"],
  ["GoHighLevel integration","Included","Included"],
  ["CTA","Start Studio  (7-day free trial)","Start Agency  (7-day free trial)"],
]));
c.push(P([t("Under the cards:  ",{c:BRONZE,size:15,b:true}),t("No contracts and no setup fees. Cancel anytime.",{c:MUTED})]));
c.push(dnote("Two cards, full width. Studio on white with green ticks and an ink button. Agency on plum with yellow ticks, a yellow “Most popular” pill and a cream button. “7-day free trial” sits under each button, as on /whitelabel."));

// 11 FAQ
sec(11,"FAQ","GoHighLevel integration questions.");
c.push(P([t("Under the H2:  ",{c:BRONZE,size:15,b:true}),t("Still unsure? Try a live demo.")]));
const faq=[
 ["Does Trillet integrate natively with GoHighLevel?","Yes. GoHighLevel is a native Trillet integration, alongside Google Calendar and Cal.com, plus webhook and API. You connect it from the agent that takes bookings; there is no middleware to maintain."],
 ["What can the voice agent do in GoHighLevel?","It books appointments into your GoHighLevel calendar during a call, and can reschedule or cancel them. It checks your calendar's real availability first, and finds or creates the caller's contact to book against."],
 ["How does it avoid double bookings?","It reads open times from your GoHighLevel calendar at the moment of the call and only offers slots that are free, within the opening hours, slot lengths and booking rules you set in GoHighLevel."],
 ["Does it create or find the caller's contact?","Yes. It looks up the caller by email or phone and matches them to their GoHighLevel contact, or creates one if there is no match, then books the appointment against it."],
 ["Do I connect it once for my whole account?","You connect it per agent. Each agent has its own connection, so the agent that answers a client's phone is the one that books into that client's calendar and sub-account."],
 ["Is it HIPAA compliant for healthcare clients?","Yes, and it is included on every plan rather than sold as an add-on. Trillet carries SOC 2 Type II, ISO 27001, HIPAA, GDPR, ACMA and TCPA, with audit trails and call records on every workspace."],
 ["Do I need to port phone numbers?","No. Use a Trillet number or forward the existing line. Carrier-level call forwarding goes live in about 30 seconds with no porting."],
];
faq.forEach(([q,a])=>{c.push(H3(q));c.push(P([t(a)]));});
c.push(P([t("Last reviewed: September 2026.",{c:MUTED,i:true,size:16})]));
c.push(dnote("Two columns: heading and the demo link on the left, accordion on the right. The first answer is open. Each row has a round plus control that turns into an ink and yellow cross when open. Mirror the copy verbatim in FAQPage schema."));

// 12 MORE INTEGRATIONS
sec(12,"More integrations","Booking somewhere else too?");
c.push(bullet([t("Google Calendar. ",{b:true}),t("Book, move and cancel straight into the Google calendar you choose. ")].concat(link("See the integration","/integrations/google-calendar"))));
c.push(bullet([t("Cal.com. ",{b:true}),t("Voice booking on top of your Cal.com event types and team scheduling. ")].concat(link("See the integration","/integrations/cal-com"))));
c.push(bullet([t("Webhook and API. ",{b:true}),t("Send call outcomes anywhere else in your stack. ")].concat(link("All integrations","/integrations"))));
c.push(dnote("Three white tiles with a tinted monogram, H3, one line and an arrow link. Keeps visitors on the site and passes link equity across the integration cluster."));

// 13 CLOSE
sec(13,"Get started","Let your GoHighLevel calendar book itself.");
c.push(P([t("Line:  ",{c:BRONZE,size:15,b:true}),t("Connect an agent today and take your next booking while you sleep.")]));
c.push(cta("Get started","Try a live demo"));
c.push(dnote("Inset plum band, centred, with two soft decorative circles. “book itself” in yellow italic. Cream primary button and an outline secondary."));

// 14 MOBILE
c.push(kicker("Mobile"));
c.push(dnote("Below 760px a sticky ink bar appears after the hero (“Book into GoHighLevel by voice” plus a cream Get started button) and hides again when the closing CTA is on screen. No horizontal scroll at 390px."));
c.push(rule());

// ---------- SEO / SCHEMA NOTES ----------
c.push(H2("SEO / AEO notes"));
c.push(H3("Meta title  (41)"));
c.push(P([t("GoHighLevel Voice AI Integration | Trillet",{mono:true,size:16})]));
c.push(H3("Meta description  (146)"));
c.push(P([t("Connect Trillet voice AI to GoHighLevel. Your agent books, reschedules and cancels in your calendar on the call, with HIPAA compliance on every plan.",{mono:true,size:15})]));
c.push(flag("301 the gohighlevel-voice-ai-integration blog to this URL once live. Render H1, the short answer and FAQ server-side."));
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
 '    {"@type":"HowToStep","name":"Choose functions and publish"}]},',
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

build("/home/user/Test-1/seo-audit/Trillet-Integration-GoHighLevel.docx",c,["ghl-flow","ghl-setup"]);
