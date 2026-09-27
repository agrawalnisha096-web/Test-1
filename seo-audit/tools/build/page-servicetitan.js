const H=require("./int-helpers");
const {eyebrow,H1,H2,H3,kicker,P,t,link,bullet,num,rule,meta,flag,shot,dnote,ans,cta,table,code,build,BRONZE,NAVY,MUTED}=H;
const c=[];
const sec=(n,label,h2)=>{c.push(kicker("Section "+n+" · "+label));if(h2)c.push(P([t("Label:  ",{c:BRONZE,size:15,b:true}),t(label.toUpperCase(),{size:15,b:true,c:MUTED}),t("     H2:  ",{c:BRONZE,size:15,b:true}),t(h2,{size:21,b:true,c:NAVY})]));};

// ---------- BRIEF HEADER ----------
c.push(eyebrow("Trillet · Integration Page · /integrations/servicetitan"));
c.push(H1("Trillet + ServiceTitan: The AI Receptionist That Fills Your Booking Queue"));
c.push(P([t("Copy, structure and design spec for ",{c:MUTED,size:18}),t("/integrations/servicetitan",{mono:true,size:16,c:MUTED}),t(". The integration recognises returning customers, offers open times for the business unit and job type you choose, and sends bookings into ServiceTitan: to the office queue for approval by default, or straight onto the dispatch board if you allow it. Figures match the live site, September 2026. A rendered HTML reference ships alongside (Trillet-Integration-ServiceTitan-render.html).",{c:MUTED,size:18})]));
c.push(rule());
c.push(meta("URL","https://trillet.ai/integrations/servicetitan   (new)",{mono:true,size:14}));
c.push(meta("PAGE TYPE","Integration landing page. Primary goal: get started (free trial) or try the live demo."));
c.push(meta("TARGET KEYWORD","servicetitan ai receptionist"));
c.push(meta("SECONDARY / LSI","servicetitan voice ai integration · ai answering service for servicetitan · servicetitan call booking ai · ai phone agent servicetitan · book jobs into servicetitan by phone · ai receptionist for hvac and plumbing"));
c.push(meta("AUDIENCE","Trades businesses running ServiceTitan (HVAC, plumbing, electrical, roofing) and agencies that serve them."));
c.push(meta("PRIMARY CONVERSION","Get started.   Secondary: Try a live demo.   Plan CTAs: Start Studio / Start Agency."));
c.push(meta("VOICE","Product page. Second person, outcome-led, concrete. Australian spelling in copy; product UI labels quoted exactly as they appear in Trillet. Zero em-dashes."));
c.push(meta("POSITIONING","Win on control: nothing lands on a technician's schedule until the office confirms, unless you choose otherwise. Do not name or compare other ServiceTitan voice products on this page."));
c.push(rule());

// ---------- DESIGN LANGUAGE ----------
c.push(H2("Design language"));
c.push(P([t("Same Trillet v3 system as the GoHighLevel page (tokens in that doc: cream, ink, plum, yellow, pastel tints; Maven Pro headings, Source Sans 3 body; 8px buttons, 20px cards). This page varies the accents so the two read as siblings, not copies.",{size:18})]));
c.push(table([2600,6760],["Choice","This page"],[
  ["Hero stage","Sky #D6E2F0 with a butter circle (GoHighLevel uses sand with pink)"],
  ["Hero visual","A call card beside a ServiceTitan booking queue, not a calendar"],
  ["Signature component","Permission switches with live summary (“You stay in control” section)"],
  ["New components","Credential checklist cards (mono format hints) and a trades tile row"],
  ["Plum moments","Why-Trillet band, featured Agency card, closing CTA (same three as GoHighLevel)"],
]));
c.push(dnote("Keep plum to those three moments and yellow to ticks, the new queue item and one italic word per heading. The permissions section is the page's centrepiece; give it the most space and the only interactive state outside the setup panel."));
c.push(rule());

// ================= THE PAGE =================
c.push(H2("The page"));

c.push(kicker("Section 0 · Nav and breadcrumb"));
c.push(P([t("Standard site nav, Integrations active. Breadcrumb: Home / Integrations / ServiceTitan.")]));

// 1 HERO
c.push(kicker("Section 1 · Hero"));
c.push(P([t("Lockup:  ",{c:BRONZE,size:15,b:true}),t("[Trillet mark] + [ST mark]  Trillet for ServiceTitan  • Native",{size:17})]));
c.push(P([t("H1:  ",{c:BRONZE,size:15,b:true}),t("The AI receptionist for ServiceTitan. Every call lands in your booking queue.",{size:24,b:true,c:NAVY})]));
c.push(P([t("Subhead:  ",{c:BRONZE,size:15,b:true}),t("Trillet answers every call, greets returning customers by name from their ServiceTitan record, offers real open times for the right business unit and job type, and sends the booking into ServiceTitan with the gate code and access notes attached. Your office confirms it, or you let it go straight to the board.",{size:19})]));
c.push(cta("Get started","Try a live demo"));
c.push(P([t("Trust line:  ",{c:BRONZE,size:15,b:true}),t("[AU flag] Proudly Australian owned   ·   ★ 4.6 on Trustpilot   ·   3,900+ businesses",{size:17})]));
c.push(dnote("Two-column hero on cream, H1 as two stacked sentences with “every” in italic. Right column: sky stage holding a live call card and, overlapping it, a “ServiceTitan booking queue” card where the new request slides in at the top with a yellow Pending pill. A plum toast below confirms the request and the saved note."));
c.push(shot("The looping hero: a returning customer calls about an AC that has stopped cooling; the agent greets him by name, offers Thursday morning or Friday afternoon, asks for access details, and the caller gives a gate code. A new row appears in the queue (customer, job type, time, “Gate code saved”, Pending) and a plum toast reads “Booking request created in ServiceTitan. Awaiting office approval.”"));

// 2 COMPLIANCE
sec(2,"Compliance on every plan",null);
c.push(P([t("Pills:  ",{c:BRONZE,size:15,b:true}),t("SOC 2 Type II · ISO 27001 · HIPAA · GDPR · ACMA · TCPA · AU data residency",{size:16,b:true})]));
c.push(P([t("Line:  ",{c:BRONZE,size:15,b:true}),t("Your ServiceTitan credentials are stored encrypted, and every call keeps a recording, transcript and audit trail.")]));
c.push(dnote("Same quiet white strip as the GoHighLevel page; only the right-hand line changes, to speak to data access rather than HIPAA."));

// 3 WHAT IT DOES
sec(3,"What it does","Your phones, working for your dispatch board.");
c.push(ans("The Trillet and ServiceTitan integration puts an AI receptionist on your phones that works from your ServiceTitan data. It recognises returning customers by the number they call from, offers open appointment times for the business unit and job type you choose, and creates a booking in ServiceTitan with call notes such as gate codes and access instructions attached. By default each booking goes to your office queue for approval, so nothing reaches a technician's schedule until your team confirms it. You can also let it book straight onto the dispatch board."));
c.push(P([t("Most missed jobs in the trades are missed calls: a tech on a roof, a CSR on another line, a burst pipe at 9pm. Trillet picks up every one, captures what your team needs, and puts it where your dispatchers already look.")]));
c.push(dnote("Butter short-answer block with the ink “?” tile, as on GoHighLevel. Keep it one paragraph for answer engines."));

// 4 CONTROL (signature)
sec(4,"You stay in control","You decide what the agent can touch.");
c.push(P([t("Intro:  ",{c:BRONZE,size:15,b:true}),t("Switch each ability on or off. Anything switched off is never offered to the agent. Out of the box, bookings wait in your office queue.")]));
c.push(table([3700,1300,4360],["Permission (label as in Trillet)","Default","What it does"],[
  ["Recognize the caller","On","Matches the caller to their ServiceTitan record by the number they call from, so returning customers are greeted by name"],
  ["Offer appointment times","On","Reads open slots for the selected business unit and job type"],
  ["Take booking requests","On","Creates a booking request in your ServiceTitan queue for the office to confirm"],
  ["Book directly onto the schedule","Off","Skips the office queue and books the job straight onto the dispatch board"],
  ["Save call notes","On","Attaches gate codes, access instructions and caller details to bookings"],
  ["Find the account by service address","Off","Looks up the account for the address the caller gives, and only confirms the account name"],
  ["Create jobs","Off","Creates a job with an appointment window, with no technician assigned"],
]));
c.push(P([t("Privacy line:  ",{c:BRONZE,size:15,b:true}),t("The agent only works with the caller it is speaking to. It never reads out other customers' details, jobs or bookings.")]));
c.push(dnote("A white card listing the seven permissions as rows with real toggles set to their defaults. Above the list, a live summary line: “Bookings go to: your office queue for approval.” When a visitor switches on Book directly onto the schedule, it changes to “Bookings go to: the dispatch board, no approval step.” Labels match the product UI verbatim (hence the US spelling of “Recognize”). The privacy line sits under the card with a lock icon."));

// 5 HOW IT WORKS
sec(5,"How it works on a call","From ring to booking request in one call.");
c.push(num([t("It knows who is calling. ",{b:true}),t("Returning customers are matched to their ServiceTitan record by phone number and greeted by name.")],"st-flow"));
c.push(num([t("It offers times you can keep. ",{b:true}),t("Open slots for the right business unit and job type, inside your booking window and after your minimum notice.")],"st-flow"));
c.push(num([t("It gets the details your tech needs. ",{b:true}),t("Gate codes, access instructions and caller details are saved to the booking.")],"st-flow"));
c.push(num([t("It hands over cleanly. ",{b:true}),t("A booking request lands in your queue for the office to confirm, or on the board if you allow it. Booking details such as the job number are ready for your follow-up.")],"st-flow"));
c.push(dnote("Four numbered white cards joined by a dashed line, same component as GoHighLevel, with trades-specific copy."));

// 6 USE CASES
sec(6,"What you can build","Built for how a ServiceTitan shop runs.");
c.push(H3("After-hours and overflow booking"));
c.push(P([t("Nights, weekends and the Monday-morning rush. Every caller gets answered and every booking lands in ServiceTitan for your team to confirm when they are back.")]));
c.push(H3("Returning customers, greeted by name"));
c.push(P([t("The agent matches the caller's number to their ServiceTitan record, so regulars are recognised the moment they call instead of starting from scratch.")]));
c.push(H3("Access notes on every booking"));
c.push(P([t("Gate codes, parking and access instructions are captured on the call and attached to the booking, so your tech arrives knowing how to get in.")]));
c.push(H3("Follow-up that fills itself in"));
c.push(P([t("Booking details such as {{servicetitan_job_number}} fill in after each booking, ready for post-call texts, email summaries, webhooks and workflows.")]));
c.push(dnote("Two by two tinted cards (sky, butter, pink, soft blue), ordered differently from GoHighLevel so the grids do not mirror each other. Show the job-number variable as a small mono chip inside the fourth card."));

// 7 BEFORE YOU START
sec(7,"Before you start","What you need from ServiceTitan.");
c.push(P([t("Four values from your ServiceTitan account. Ask your ServiceTitan admin to create them under Settings, Integrations, API Application Access.")]));
c.push(table([2300,2600,4460],["Value","Looks like","Notes"],[
  ["Tenant ID","Numbers only, e.g. 3141592653","Identifies your ServiceTitan account"],
  ["Application Key","Starts with ak1","Identifies the API application"],
  ["Client ID","Starts with cid","Paired with the secret"],
  ["Client Secret","Often starts with cs1","Keep it private; Trillet stores it encrypted"],
]));
c.push(P([t("The API application needs access to: ",{b:true}),t("Settings, CRM, Job Planning & Management, Dispatch, Marketing and Memberships. That lets the agent read and create the records it works with.")]));
c.push(dnote("Four small credential cards in a row, each with the value name, a mono format hint and a one-line note. Below them, the access areas as outline pills. This section answers “what does my account need first?”, which most ranking pages skip."));

// 8 SETUP
sec(8,"Setup","Connected in five steps. No developer.");
c.push(num([t("Get your API credentials. ",{b:true}),t("Your ServiceTitan admin creates the Tenant ID, Application Key, Client ID and Client Secret under API Application Access.")],"st-setup"));
c.push(num([t("Verify and connect. ",{b:true}),t("In your agent, open Advanced Settings, then Integrations, and click the ServiceTitan tile. Paste the four values and click Verify & Connect. Trillet checks them with ServiceTitan and loads your business units, job types and campaigns.")],"st-setup"));
c.push(num([t("Choose what the agent can do. ",{b:true}),t("Under Agent permissions, switch each ability on or off.")],"st-setup"));
c.push(num([t("Set your booking rules. ",{b:true}),t("Pick the booking window (3, 7, 14 or 30 days), minimum notice, business unit, default job type and campaign.")],"st-setup"));
c.push(num([t("Test and publish. ",{b:true}),t("Click Test to see “Connection healthy”, check Live data, make a test call from a customer's number, then Publish Changes.")],"st-setup"));
c.push(dnote("Same interactive split as GoHighLevel: steps left, sticky settings panel right. The panel shows ServiceTitan fields: four credential inputs (masked secret), a Verify & Connect button turning into “Connection healthy”, permission toggles, booking settings (window, minimum notice, business unit, job type, campaign) and Publish Changes. Each step lights up its fields."));
c.push(shot("Replace the mock with real screenshots in the same layout: the connect form with the four fields, the connected panel with Agent permissions and Booking settings, and the Live data window."));

// 9 TRADES
sec(9,"Built for the trades","Answering for every trade on your board.");
c.push(bullet([t("HVAC. ",{b:true})].concat(link("AI receptionist for HVAC","/industries/hvac"))));
c.push(bullet([t("Plumbing. ",{b:true})].concat(link("AI receptionist for plumbers","/industries/plumbers"))));
c.push(bullet([t("Electrical. ",{b:true})].concat(link("AI receptionist for electricians","/industries/electricians"))));
c.push(bullet([t("Roofing. ",{b:true})].concat(link("AI receptionist for roofing","/industries/roofing"))));
c.push(dnote("Four compact tiles with a trade icon and an arrow, linking to the live industry pages. Passes authority into the trades cluster, which already earns impressions for HVAC, plumbing and roofing answering queries."));

// 10 PROOF
sec(10,"What operators are saying","Operators who stopped stitching tools together.");
c.push(P([t("Quote 1:  ",{c:BRONZE,size:15,b:true}),t("“This is better than building it myself with Make and Retell and connecting everything up manually.”  Lori Mars, Linx AI Agency",{i:true})]));
c.push(P([t("Quote 2:  ",{c:BRONZE,size:15,b:true}),t("“Great platform, excellent granular control for building highly functional agents. API integration tools make connecting CRMs really easy.”  Ian Strange, UC Marketing",{i:true})]));
c.push(P([t("Score card:  ",{c:BRONZE,size:15,b:true}),t("Trustpilot 4.6. 3,900+ businesses trust Trillet with their calls.")]));
c.push(dnote("Same three-column proof row as GoHighLevel, quotes in the opposite order. Both quotes are live on trillet.ai/whitelabel. Swap in a trades customer's quote as soon as one is approved."));

// 11 WHY
sec(11,"Why Trillet on ServiceTitan","Built to be trusted with your board.");
c.push(bullet([t("Control by default. ",{b:true}),t("Bookings wait for your office unless you choose otherwise, and every ability can be switched off.")]));
c.push(bullet([t("Only the caller. ",{b:true}),t("The agent works with the person on the line and never reads out other customers' details.")]));
c.push(bullet([t("Compliance included. ",{b:true}),t("SOC 2 Type II, ISO 27001, HIPAA, GDPR, ACMA and TCPA on every plan, credentials stored encrypted, recordings and transcripts on every call.")]));
c.push(bullet([t("Keep your number. ",{b:true}),t("Forward your existing line; carrier-level forwarding is live in about 30 seconds, with no porting. US Trillet telephony from $0.014 a minute.")]));
c.push(dnote("Plum band with four yellow-tick columns, same component as GoHighLevel, different copy."));

// 12 AGENCY
sec(12,"Serving contractors",null);
c.push(P([t("Serve contractors on ServiceTitan? ",{b:true}),t("Connect one Trillet agent per client, each in its own isolated workspace, and sell it under your own brand. ")].concat(link("White-label voice AI","/whitelabel")).concat([t("  ·  ")]).concat(link("Voice AI for HVAC companies","/blogs/voice-ai-for-hvac-companies-reseller"))));
c.push(dnote("Slim sand band, two text links on the right."));

// 13 PRICING
sec(13,"Pricing","Simple pricing. ServiceTitan included.");
c.push(P([t("No per-seat charges. After included minutes, AI usage is $0.12 a minute (platform, STT, LLM and TTS). Telephony is separate: US Trillet telephony from $0.014 a minute, and web calls have no telephony fee.",{size:18})]));
c.push(table([2200,3580,3580],["","Studio, $99/month","Agency, $299/month  (Most popular)"],[
  ["Pitch","Launch your offer and onboard your first clients.","Grow your client base with unlimited workspaces."],
  ["Workspaces","Up to 3","Unlimited"],
  ["Included minutes","1,000 a month","3,000 a month"],
  ["Free phone numbers","3","10"],
  ["ServiceTitan integration","Included","Included"],
  ["CTA","Start Studio  (7-day free trial)","Start Agency  (7-day free trial)"],
]));
c.push(P([t("Under the cards:  ",{c:BRONZE,size:15,b:true}),t("No contracts and no setup fees. Cancel anytime.",{c:MUTED})]));
c.push(dnote("Identical pricing component to GoHighLevel; only the integration row changes."));

// 14 FAQ
sec(14,"FAQ","ServiceTitan integration questions.");
const faq=[
 ["Does Trillet integrate with ServiceTitan?","Yes. ServiceTitan is a native Trillet integration. You connect it from your agent's Integrations settings using API credentials your ServiceTitan admin creates, with no middleware to run."],
 ["Will the AI book straight onto my dispatch board?","Only if you want it to. By default the agent creates booking requests in your ServiceTitan queue for the office to confirm, so nothing reaches a technician's schedule without approval. Switch on Book directly onto the schedule to skip the queue."],
 ["What do I need from ServiceTitan to connect?","Four values created by a ServiceTitan admin under API Application Access: Tenant ID, Application Key, Client ID and Client Secret. The API application needs access to Settings, CRM, Job Planning & Management, Dispatch, Marketing and Memberships."],
 ["Do I need a developer?","No. Your admin creates the credentials, you paste them into Trillet and click Verify & Connect. Trillet checks them and loads your business units, job types and campaigns."],
 ["Can it recognise existing customers?","Yes. It matches the caller to their ServiceTitan record by the number they are calling from, so returning customers are greeted by name."],
 ["Will the agent share other customers' details?","No. The agent only works with the caller it is speaking to. It never reads out other customers' details, jobs or bookings."],
 ["Can I limit bookings to one business unit or job type?","Yes. Choose a business unit to limit availability and bookings to it, and set the default job type new bookings use unless the call points to a different one."],
 ["How far ahead will it book?","You set the booking window (the next 3, 7, 14 or 30 days; 7 by default) and the minimum notice (none, 2 hours, 4 hours, 1 day or 2 days; 2 hours by default)."],
 ["Can I use booking details in texts and workflows?","Yes. Variables such as the ServiceTitan job number fill in after each booking, so you can use them in post-call texts, email summaries, webhooks and workflows."],
 ["Is my ServiceTitan data secure?","Your credentials are stored encrypted, and Trillet carries SOC 2 Type II, ISO 27001, HIPAA, GDPR, ACMA and TCPA on every plan. Disconnecting removes the saved credentials and booking settings from that agent."],
];
faq.forEach(([q,a])=>{c.push(H3(q));c.push(P([t(a)]));});
c.push(P([t("Last reviewed: September 2026.",{c:MUTED,i:true,size:16})]));
c.push(dnote("Same two-column accordion as GoHighLevel. Mirror the copy verbatim in FAQPage schema."));

// 15 MORE + CLOSE
sec(15,"More integrations","Running more than ServiceTitan?");
c.push(bullet([t("GoHighLevel. ",{b:true}),t("Book into your GoHighLevel calendar and find or create the contact. ")].concat(link("See the integration","/integrations/gohighlevel"))));
c.push(bullet([t("Google Calendar. ",{b:true}),t("Book, move and cancel straight into the Google calendar you choose. ")].concat(link("See the integration","/integrations/google-calendar"))));
c.push(bullet([t("Everything else. ",{b:true}),t("Cal.com, webhook and API. ")].concat(link("All integrations","/integrations"))));
sec(16,"Get started","Turn every call into a ServiceTitan booking.");
c.push(P([t("Line:  ",{c:BRONZE,size:15,b:true}),t("Answer every call tonight. Confirm the bookings in the morning.")]));
c.push(cta("Get started","Try a live demo"));
c.push(dnote("Inset plum closing band; “every call” in yellow italic."));
c.push(kicker("Mobile"));
c.push(dnote("Sticky ink bar after the hero: “Answer every ServiceTitan call” plus Get started. The permissions card stacks to full width with toggles on the right. No horizontal scroll at 390px."));
c.push(rule());

// ---------- SEO ----------
c.push(H2("SEO / AEO notes"));
c.push(H3("Meta title  (52)"));
c.push(P([t("ServiceTitan AI Receptionist & Integration | Trillet",{mono:true,size:16})]));
c.push(H3("Meta description  (152)"));
c.push(P([t("Trillet\'s AI receptionist answers every call, recognises ServiceTitan customers and books into your office queue or dispatch board. Compliance included.",{mono:true,size:15})]));
c.push(flag("Render H1, the short answer, the permissions table and the FAQ server-side. Add ServiceTitan to the /integrations index and link here from /industries/hvac, /industries/plumbers and the HVAC and plumbers answering-service blogs."));
c.push(H3("Structured data: SoftwareApplication + HowTo + FAQPage + BreadcrumbList"));
c.push(code([
 '<script type="application/ld+json">',
 '{ "@context":"https://schema.org","@graph":[',
 '  {"@type":"SoftwareApplication","name":"Trillet AI Receptionist for ServiceTitan",',
 '   "applicationCategory":"BusinessApplication","operatingSystem":"Web",',
 '   "offers":[{"@type":"Offer","name":"Studio","price":"99","priceCurrency":"USD"},',
 '             {"@type":"Offer","name":"Agency","price":"299","priceCurrency":"USD"}],',
 '   "provider":{"@id":"https://trillet.ai/#org"},"url":"https://trillet.ai/integrations/servicetitan"},',
 '  {"@type":"HowTo","name":"Connect Trillet to ServiceTitan","step":[',
 '    {"@type":"HowToStep","name":"Get your API credentials"},',
 '    {"@type":"HowToStep","name":"Verify and connect"},',
 '    {"@type":"HowToStep","name":"Choose what the agent can do"},',
 '    {"@type":"HowToStep","name":"Set your booking rules"},',
 '    {"@type":"HowToStep","name":"Test and publish"}]},',
 '  {"@type":"FAQPage","mainEntity":[ /* 10 Q&As, verbatim from the page */ ]},',
 '  {"@type":"BreadcrumbList","itemListElement":[',
 '    {"@type":"ListItem","position":1,"name":"Home","item":"https://trillet.ai/"},',
 '    {"@type":"ListItem","position":2,"name":"Integrations","item":"https://trillet.ai/integrations"},',
 '    {"@type":"ListItem","position":3,"name":"ServiceTitan"}]}',
 ']}',
 '</script>',
]));
c.push(H3("Internal links"));
c.push(P([t("Up to ")].concat(link("Integrations","/integrations")).concat([t(" and ")]).concat(link("white-label voice AI","/whitelabel")).concat([t(". Down to ")]).concat(link("HVAC","/industries/hvac")).concat([t(", ")]).concat(link("plumbers","/industries/plumbers")).concat([t(", ")]).concat(link("electricians","/industries/electricians")).concat([t(", ")]).concat(link("roofing","/industries/roofing")).concat([t(". Blogs: ")]).concat(link("AI answering service for HVAC","/blogs/ai-answering-service-for-hvac")).concat([t(", ")]).concat(link("for plumbers","/blogs/ai-answering-service-for-plumbers")).concat([t(".")])));
c.push(H3("Backlog"));
c.push(P([t("Comparison blog: “AI receptionists for ServiceTitan compared”, to capture comparison queries without naming other ServiceTitan voice products on this page.",{c:MUTED})]));

build("/home/user/Test-1/seo-audit/Trillet-Integration-ServiceTitan.docx",c,["st-flow","st-setup"]);
