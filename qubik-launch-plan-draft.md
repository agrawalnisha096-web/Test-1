# Qubik AI & Automation: Launch Plan

**Segment:** Australian make-to-order ("job-shop") manufacturers, A$3–10M revenue
**Problem:** Quote-to-margin leakage. Quotes are slow and manual, and nobody checks the quote against actual cost.
**Candidate:** ⟦YOUR NAME⟧ · ⟦DATE⟧

Labels: **[F]** fact, sourced · **[E]** estimate or assumption · **[R]** recommendation

<!-- Cover page ends here. Pages 1–3 below. -->

---

## 1. Buyer and problem

**Organisation [R].** An Australian manufacturer that makes to order: steel and metal fabrication, aluminium and glazing, joinery and cabinetry, trailer and truck bodies, machine shops. Revenue is A$3–10M, typically with 15–50 staff. Every job is quoted from a drawing or spec. They differ in product but share one operating model and one problem.

**Market size [F/E].** ABS counts for June 2025 show 7,687 manufacturers at A$2–5M and 3,390 at A$5–10M [F]. I estimate ~6,500 in the A$3–10M range, ~2,300 of them job shops, and ~1,280 manufacturers in Qubik's home state of Queensland [E: A$3–10M = all of the A$5–10M band plus 40% of the A$2–5M band]. Twenty implementations a year would be under 1% of the segment.

**Decision-maker.** The owner or MD signs. They are often the founder and often still the estimator. The GM or operations manager and the finance or office manager (or an external bookkeeper) influence the decision.

**Problem [E].**
1. **Estimating bottleneck.** One or two people build quotes by hand from drawings, and turnaround takes days.
2. **No quoted-vs-actual check.** Timesheet hours and material bills are not reconciled to the quote. Loss-making job types keep getting quoted the same way.
3. **Re-keying.** The same data is typed again into quote spreadsheets, job cards, purchase orders and Xero.

**Likely cost [E: illustrative for a A$6M shop; the diagnostic replaces these numbers with the client's own].**
- **Quoting time:** 40 quotes a month × 3 hours = ~1,440 hours a year, or ~A$94k at A$65/hour fully loaded.
- **Margin leakage:** a 2-point gross-margin leak from under-quoted jobs and unbilled variations is ~A$120k a year.
- **Total:** ~A$150–210k a year at stake, against a A$57–90k implementation.

**Buying triggers.** The estimator resigns or is overloaded. There is a quote backlog. Steel or energy costs squeeze margins. A large contract is won. The business outgrows "the owner quotes everything", typically at 15–20 staff. An EOFY margin review with the accountant. A Made in Queensland grant round, which is matched co-funding of A$50k+ [F; 2026 round dates unverified].

**Ability to pay.** These owners already buy A$100–300k machines on a payback basis. A A$73.5k implementation is ~1.2% of revenue for a A$6M shop [E]. Cash is screened in qualification.

**Why this segment [R].**
1. **The right-size share is higher than in trades.** 12–20% of businesses in these ANZSIC classes turn over A$2–10M, versus 7% for service trades [F, ABS cube 3]. Meta cannot target by company size, so this share drives the qualification rate.
2. **The problem fits both an accountant and AI.** Job costing and margin are an accountant's home ground, and Qubik is a Xero Platinum partner [F]. Reading drawings and PDFs into draft quotes is a genuine AI task.
3. **Little competition [E].** Few AI-automation advertisers target these owners. I would check this in the Meta Ad Library before launch.

**Rejected:** service trades (low right-size share, crowded front-office offers) and pubs and clubs (27% right-size share, but a weaker AI fit). Pubs are kept as the fallback.

**Why Meta can reach them.** These owners are reachable as people, not as companies. They are typically 40–65, use Facebook personally, and are reached on Meta at a far lower cost than on LinkedIn [E]. Meta's 2025 changes made interests and job titles "suggestions" rather than hard filters [F, secondary sources]. Reach therefore comes from three things:
- a callout creative that the owner recognises themselves in;
- required form questions that filter out employees and sole operators;
- seed signals (industry media and associations).

I would confirm audience size with Ads Manager reach estimates before launch. That costs nothing and launches nothing.

## 2. Offer and proof

**Quote-to-Margin Diagnostic: A$3,500 + GST, founding-client price [R].** Fixed fee and fixed scope, delivered in 3 weeks. The client receives:
1. **Job margin audit.** 20–30 recently completed jobs, quoted vs actual (labour from timesheets, materials from supplier bills in Xero), broken down by job type and customer.
2. **Quote process time study.** Steps, hours per quote, turnaround and win rate, taken from their quote register.
3. **Systems and data map.** Xero, the quoting tool or spreadsheet, the job system, and where data is re-keyed.
4. **Automation business case.** Three ranked opportunities, each with cost, payback and risk, plus a fixed-price proposal for the first.
5. **A 60-minute readout** with the owner and operations lead, and a written report.

The client provides read-only Xero access, the job files and timesheets, and about 2 hours of the estimator's and owner's time.

**Pricing language [R].** Under Australian Consumer Law, a "was A$7,500" comparison must be a genuine price the service was previously offered at [F, ACCC]. Until the diagnostic has actually sold at A$7,500, I would advertise it as *"founding-client price A$3,500; standard price A$7,500 from {date}"* rather than as a markdown.

**Proof available at launch, without inventing results:**
- **Qubik's credentials [F, verify]:** Xero Platinum partner since 2013, Xero payroll certified, members of CA ANZ and CPA Australia.
- **Qubik's in-house AI and automation specialist**, named, with real prior builds ⟦ask Qubik⟧.
- **The method shown openly:** a sample report page built on clearly labelled synthetic data.
- **A founding-client programme:** the first 5 diagnostics at A$3,500 in exchange for permission to publish anonymised before-and-after numbers. Proof is built, not claimed.
- **Not used:** testimonials, "save 30%" claims or vendor statistics.

**Bridge to implementation.** The diagnostic measures the client's own leakage and quoting hours, and that number becomes the business case. The fee is credited in full against an implementation signed within 30 days. The implementation (an AI estimating assistant drafting quotes at the client's own rates, plus job-cost sync to Xero and over-budget alerts) is scoped and priced *inside* the diagnostic. The same team delivers it. The A$57–90k range is scoped from what the diagnostic found.

## 3. Meta acquisition

**Objective [R].** Leads, using an Instant Form set to "Higher intent" (adds a review screen). Qualified, attended and purchased outcomes are sent back from the CRM to Meta via the Conversions API, so later campaigns can optimise for qualified leads, not raw leads. Placements: Facebook and Instagram feeds and Reels, **excluding Audience Network** [E: a common source of low-quality leads]. Budget: A$900 over 14 days, ~A$64 a day.

**Audience logic [R].**
- Australia, ages 30–65+.
- A broad / Advantage+ audience with seed signals: manufacturing and metal-fabrication interests, Weld Australia, Ai Group, Manufacturers' Monthly, Austech.
- Exclude Qubik's existing clients (custom audience).
- The creative and the form do the filtering. The targeting doesn't.

**Creative angle [R].** Loss aversion aimed at the person who signs off quotes: *"Which of your last 30 jobs lost money?"* The format is a static image plus a 30-second talking-head video from a real Qubik accountant. No finished artwork is needed.

**First test [R].** One variable: the angle. **A, margin leak** ("which jobs lost money") vs **B, estimator bottleneck** ("your estimator is your bottleneck"). Same form, same audience. I judge it on **cost per qualified lead**, not CPL. Reading after ~A$450 per angle is directional only, and I would say so to Qubik.

**Sample ad (A) [R]. 102 words:**
> **Do you know which of your last 30 jobs lost money?**
> If you quote from experience and rarely check quotes against actual hours and materials, margin can leak for months before the year-end accounts show it.
> Qubik's Quote-to-Margin Diagnostic compares quoted vs actual cost on 20–30 of your recent jobs, measures how long each quote really takes, and shows where automation would pay back first.
> Run by Xero Platinum partner accountants with our in-house automation specialist. Fixed scope, 3 weeks. Founding-client price A$3,500 + GST, credited to any implementation.
> For Australian manufacturers with 10+ staff. 60 seconds to check if you qualify.

**Lead-form questions (contact fields: name, mobile, work email, company, postcode, plus SMS/email consent):**

| Tests | Question | Options |
|---|---|---|
| Need | How do you mainly price jobs today? | Spreadsheet · Estimating software · Experience / rule of thumb · Other |
| Need | After a job is finished, do you compare quoted vs actual cost? | Every job · Some jobs · Rarely · Never |
| Fit | Annual revenue | Under A$2M · A$2–5M · A$5–10M · Over A$10M |
| Authority | Your role | Owner/MD · GM/Operations · Finance/Office · Estimator · Other |
| Urgency | When would you want quoting and job costing fixed? | This quarter · 3–6 months · Just researching |
| Budget | If the diagnostic showed payback under 12 months, could the business fund a A$50–90k project this financial year? | Yes · Possibly, with finance or a grant · No |

## 4. Qualification, nurture and handover

**Scoring (0–100) [R].**

| Dimension | Points |
|---|---|
| Revenue | A$5–10M 25 · A$2–5M 20 · over A$10M 15 · under A$2M 0 |
| Role | Owner/GM 25 · Finance 12 · other 5 |
| Need | Rarely or never compares 20 · Some jobs 10 · Every job 0 |
| Urgency | This quarter 15 · 3–6 months 8 · Researching 0 |
| Budget | Yes 15 · Possibly 8 · No 0 |

- **Hard gates:** revenue A$2M or more, and role is not "Other".
- **70 or more = qualified:** booking link sent and handed to sales.
- **45–69 = uncertain:** human review.
- **Under 45 = long-term nurture.** No sales time is spent.

**Six events from capture to handover:**

| # | Event and timing | What happens | Owner |
|---|---|---|---|
| 1 | **Capture** (T+0) | Form → CRM in under 1 minute. Normalise phone number and email, deduplicate, score, log consent, tag the ad and angle. | Automation |
| 2 | **First response** (T+5 min) | Qualified: SMS + email with a booking link for a 20-minute "margin check" call. Uncertain: a human-review task. Low score: educational nurture only. | Automation; copy by Marketing |
| 3 | **Clarify** (within 1 business day) | Uncertain leads get one human-sent clarifying question (e.g. revenue or role). They are re-scored on reply. | Marketing |
| 4 | **Book** (day 0–6) | The calendar booking suppresses all chasers immediately. A 3-question pre-call form: quoting tool, jobs per month, Xero? Unbooked qualified leads get: day 1 email, day 3 SMS, day 6 final email, then monthly nurture. | Automation |
| 5 | **Confirm and remind** | Email 24 hours before, SMS 2 hours before, each with a self-serve reschedule link. No-show: SMS 10 minutes after the start time, email the next day, a human call on day 3, then nurture. | Automation; Sales makes the call |
| 6 | **Handover** (on booking, refreshed 2 hours before) | Sales receives a one-page lead brief: answers, score, ad seen, reply history. Sales **accepts within 1 business day or rejects with a reason**. Outcomes are fed back to the CRM and Meta. | Sales; Marketing reviews rejections weekly |

**Rules [R]:**
- **Duplicates.** Match on mobile, email, or company plus domain. Merge the records, keep the first source and the latest answers, and never restart a sequence. If the lead is an existing Qubik client, route it to their accountant. If an opportunity is already open, notify the rep who owns it.
- **Replies.** Any inbound reply pauses automation. AI may classify the reply (question, booking intent, not interested, out of office) and draft a response. A person sends anything that isn't logistics, within 2 business hours.
- **Opt-outs.** STOP on SMS and the email unsubscribe link are actioned immediately across all channels (the Spam Act allows 5 working days [F]). Every message identifies Qubik [F].
- **Booking suppression.** Once a call is booked, only reminders run.
- **Rescheduling.** Self-serve up to 2 hours before. A second reschedule triggers a human check-in.
- **Uncertain responses.** Answers like "Possibly", A$2–5M or "Finance" go to human review. Borderline leads are never auto-rejected.
- **Human escalation.** Triggered by a score of 85 or more (call within 1 business hour), a complaint, a privacy or data question, a pricing negotiation, or a failed automation.

**Who owns what.**
- **Marketing (me):** ads, form, scoring rules, copy, nurture content, weekly funnel report, lead-quality loop.
- **Automation (Qubik specialist and IT):** CRM integration, deduplication, routing, SMS and email, consent and opt-out records, Conversions API, monitoring.
- **Sales (Qubik):** calls, accept or reject within SLA, outcome logging, diagnostic close, implementation proposal.

**Email (event 2, qualified):**
> **Subject:** Your margin check, {FirstName}
> Hi {FirstName}, thanks for your details. From your answers, {Company} looks like a good fit for our Quote-to-Margin Diagnostic. The next step is a 20-minute call with {Rep}, one of our accountants, to look at how you quote and cost jobs today and whether the diagnostic would pay for itself. Pick a time: {link}. If none of those suit, just reply with what works.
> {Rep}, Qubik Accounting · {unsubscribe}

**SMS (event 2, ~110 characters, one segment):**
> Hi {FirstName}, {Rep} from Qubik re your margin check. Book a 20-min call: {short link} Reply STOP to opt out

## 5. Economics and downside

**Working.** All rates are applied to *qualified* leads, as the brief specifies. Implementation value is the A$73.5k midpoint, with the A$57–90k range shown separately.

| Step | A$150 CPL | A$225 CPL |
|---|---|---|
| Leads = 900 ÷ CPL | **6.0** | **4.0** |
| Qualified = leads × 30% | **1.8** | **1.2** |
| Attended = qualified × 70% | **1.26** | **0.84** |
| Diagnostics = qualified × 50% | **0.9** → A$3,150 | **0.6** → A$2,100 |
| Implementations = qualified × 25% | **0.45** → A$33,075 | **0.3** → A$22,050 |
| **Gross attributed revenue** | **A$36,225** (A$28,800–43,650) | **A$24,150** (A$19,200–29,100) |
| Revenue ÷ spend | 40× | 27× |
| Cost per qualified lead | A$500 | A$750 |

If the diagnostic fee is credited against implementation, net revenue falls by 0.45 × A$3,500 = A$1,575 at A$150 CPL, and by A$1,050 at A$225 CPL.

**What I would point out to Qubik [E]:**
1. **The model's rates don't line up.** A 50% diagnostic purchase rate with 70% attendance means 71% of attendees buy. A 25% implementation rate means half of all diagnostic clients go on to implement. Both are optimistic.
2. **The test produces fractions of a customer.** A$900 yields 4–6 leads, so actual revenue will be either A$0 or a single sale. **A$900 is a signal test, not a revenue test.**
3. **Implementations drive the result.** They are ~91% of modelled revenue, and the cash arrives 2–4 months after the diagnostic.

**Main commercial risk.** Lead quality: Meta delivers employees and small operators, and the 30% qualification rate fails. That risk compounds into the second one, diagnostic-to-implementation conversion. CPL matters much less. Expected revenue per lead is ~A$6,000 at the brief's rates, so even a A$600 CPL works if qualification holds. In a downside case (15% qualification, 25% diagnostic purchase, 10% implementation, A$225 CPL), revenue is ~A$4,900.

**What I'd change first if below plan.** I would diagnose by funnel stage, and fix the qualification filter first:
- **Qualification under 30%:** move revenue and role to the first questions, strengthen the "owners only" callout and add a third review screen. This is the cheapest lever and where Meta most likely fails.
- **CPL above A$225 with healthy qualification:** change the hook and creative.
- **Qualified leads not booking:** speed to lead and the call offer.
- **Attended but not buying:** proof and offer, e.g. founding-client terms.

## 6. Priorities, assumptions and AI

**First 14 days [R]:**
1. **Days 1–5: validate before spending.**
   - Ads Manager reach estimates and a Meta Ad Library scan.
   - 5 problem interviews via Qubik's existing manufacturing clients and partners ⟦confirm Qubik has these⟧.
   - Confirm with the automation specialist that the diagnostic can be delivered in 3 weeks, at a margin, at A$3,500.
2. **Days 3–8: build and break the funnel.**
   - Form → CRM → scoring → SMS/email → booking → reminders → handover.
   - Test all edge cases above with internal dummy leads only.
   - Agree SLAs with sales.
3. **Days 8–14: run the A$900 angle test.**
   - Daily checks, a read at A$450, and a sales feedback session on every lead.

**Assumptions to validate before launch:**
- The size of the owner audience on Meta.
- That job shops really don't compare quoted vs actual.
- That usable timesheet and Xero data exists at clients.
- Willingness to pay A$3,500 and A$57–90k.
- Sales capacity to respond within 1 hour.
- My 40% band split and the illustrative cost figures.
- Pricing language and SMS/email consent (ACL, Spam Act, Privacy Act).

**What I produced, and how I used AI** ⟦REVIEW AND EDIT, MUST BE ACCURATE⟧.
- **I** chose the segment criteria. The first AI suggestion was service trades. I rejected it as the default answer and proposed manufacturers, then tested pubs and job shops against Meta reach.
- **I** set the offer, scoring weights, test design and risk call ⟦add your own experience: e.g. Meta lead-gen / voice-AI work⟧.
- **Claude (Anthropic), via Claude Code:**
  - summarised the brief;
  - wrote and ran Python against the ABS 8165.0 data cube to count businesses by industry and turnover;
  - ran web searches for sources;
  - drafted section text, which I edited.
- **Checks:**
  - I re-opened the ABS file and spot-checked figures (e.g. structural steel: 249 at A$2–5M, 133 at A$5–10M).
  - I recomputed the economics by hand.
  - I opened every source and removed claims I couldn't verify (e.g. trade late-payment days).
  - I checked the ad word count and the compliance points against ACCC and ACMA guidance.

---

## Sources

1. ABS, *Counts of Australian Businesses, incl. Entries and Exits, Jun 2021–Jun 2025*, cat. 8165.0, data cube 3 (industry class × turnover, June 2025). abs.gov.au
2. Business Queensland, *Made in Queensland* grant program. business.qld.gov.au/industries/manufacturing-retail/manufacturing/grant-programs/made-in-queensland
3. Xero Advisor Directory, *Qubik Accounting* profile. xero.com/advisors/accountant/qubik-accounting-801479b86134
4. ACCC, guidance and enforcement on "was/now" two-price comparisons. accc.gov.au
5. ACMA, *Avoid sending spam* (consent, identification, unsubscribe within 5 working days). acma.gov.au
6. Meta detailed-targeting changes, 2025–26 (secondary sources; confirm in Meta Business Help Centre): pixelmovers.co, involvedigital.com
