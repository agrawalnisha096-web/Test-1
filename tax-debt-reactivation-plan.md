# Qubik Accounting: Tax-Debt Lead Reactivation Plan

**Prepared for:** Qubik Accounting
**Prepared by:** Vinaygopal Mawandia · 3 November 2026
**Data:** Qubik lead-flow export, 3 November 2026. 509 tax-debt leads from June to November 2026, with full call, SMS and email history.
**Goal:** turn stalled and lost tax-debt leads into clients through one email and SMS funnel, starting with the leads closest to signing.

*Counts come from the export. Conversion figures marked "estimate" are planning assumptions, replaced by real results after the first sends.*

<!-- Cover page ends. Pages 1–3 below. -->

## 1. What the data shows

| Measure | Result |
|---|---|
| Active leads (excluding 13 deleted) | 496 |
| Became opportunities | 168 (34%) |
| Became clients | 31 (6.2%); the most complete cohort, July, reached 7.6% |
| Estimated value per client | Median about A$2,100; average about A$8,700 |
| Time to client | Median 4 days to opportunity, 28 days to client |
| Opportunities stuck at ID verification | 61 of 124 open opportunities (60 contactable) |
| Open leads with no next step recorded | 126 of 170, median age 62 days |
| Leads reached by phone vs never reached | 38.5% vs 5.7% become opportunities |

**Two conclusions shape the plan:**
1. **Most of the quick revenue is inside the pipeline already.** It sits with people who started but stopped at ID verification or an unsigned proposal.
2. **Calling more won't fix the rest.** Leads already average 11 calls each, and only 30% of calls connect. Email and SMS let people come back when they're ready.

## 2. Segments

Every lead is placed in exactly one segment. The lead-by-lead list is supplied separately as a CSV keyed by lead reference, ready to import into the email platform.

| Segment | Who | Leads | Email OK | SMS OK | High priority (A$50k+ debt) |
|---|---|---|---|---|---|
| **T1 Stuck at ID verification** | Opportunities that stopped at the ID check | 60 | 60 | 60 | 37 |
| **T2 Proposal sent, not accepted** | Final proposal sent or awaiting acceptance in Ignition | 18 | 18 | 17 | 12 |
| **T3 Open lead, never reached** | Enquired, never spoke to anyone; median age 18 days | 47 | 45 | 47 | 22 |
| **T4 Open lead, reached but stalled** | Spoke to the team, no next step; median age 70 days | 123 | 120 | 123 | 44 |
| **T5 Lost: chose not to proceed** | Said no; median 90 days ago | 95 | 93 | 58 | 27 |
| **T6 Lost: other reason** | Lost for "other" or unrecorded reasons | 41 | 40 | 9 | 9 |
| **Total to reactivate** | | **384** | **376** | **314** | **151** |

**Excluded (125):**
- current clients (27);
- active opportunities that sales is still working (38);
- "not a target" or "did not enquire" (46);
- deleted records (13);
- do-not-contact (1).

Within each segment, **A$50k+ debt goes first**. Those leads reach opportunity most often (55% for A$100k+, 43% for A$50–100k). Leads from the old form's "A$0–50k" band convert worst (21%), so they get the lighter sequences.

**Channel rules:**
- Email to everyone who hasn't bounced or opted out.
- SMS only where consent is recorded and the person hasn't opted out (13 have opted out).
- The do-not-contact lead is excluded from everything.

## 3. Offers and hooks that fit tax debt

People with ATO debt want certainty and a way out, not a discount, so there is **no Black Friday or sale branding**. The seasonal moments are used as deadlines and reasons to act.

| Hook | Message | Used for |
|---|---|---|
| Free tax-debt review | "A free 30-minute online review of where you stand with the ATO and what your options are." | T3, T4, T5 |
| Finish what you started | "You're one step away: complete your ID check so we can act on your file." | T1 |
| Your proposal is ready | "Your plan is waiting. Here's what happens once you accept, and the answers to common questions." | T2 |
| Interest now costs more | Since 1 July 2025, ATO interest charges are no longer tax-deductible, so carrying ATO debt costs more than it used to. | T4, T5, T6 |
| Lodge even if you can't pay | Lodging on time avoids extra penalties, even when payment needs a plan. Agent BAS date 25 November; quarter-two BAS due 1 March 2027. | T3–T6 |
| Before the Christmas break | "Know your options before we close for Christmas." | T3–T5 |
| New Year plan | "Start 2027 with a plan for your ATO debt." | T4–T6 |

**Options a review can cover:** payment plans, requests to remit penalties or interest, catching up on overdue lodgements, and restructuring options where Qubik offers them and the client is eligible.

All wording must meet the Tax Practitioners Board's rules: no guaranteed outcomes and no promises about what the ATO will do. Dominic signs off the final copy.

## 4. Sequences by segment

| Segment | Day 0 | Day 2–3 | Day 6–7 | Day 10–14 | Then |
|---|---|---|---|---|---|
| **T1 ID check** | SMS: "2 minutes to finish your ID check" + link | Email: how to do it, and why it's needed | SMS reminder | Email: "Stuck? Reply and we'll help" | Sales notified on completion; monthly email if no action |
| **T2 Proposal** | Email: proposal recap and next steps | SMS: "Your plan is ready to accept" + link | Email: answers to common questions | Email: "Shall we keep your file open?" | Monthly email |
| **T3 Never reached** | Email: "Sorry we missed you" + online booking | SMS with booking link | Email: "Your options with ATO debt, explained" | SMS: last reminder | Seasonal emails |
| **T4 Reached, stalled** | Email: "Has anything changed?" + review offer | — | Email: interest-deductibility change | SMS (if they opened or clicked): booking link | Seasonal emails |
| **T5 Chose not to proceed** | Email: "No pressure: here's what's changed" | — | Email: free review, before Christmas | SMS only to people who clicked | New Year email |
| **T6 Lost, other** | Email: free review offer | — | — | — | Monthly email only |

**Funnel rules:**
- A booking or ID completion stops all reminders.
- Any reply pauses the sequence, and a person answers within one business day.
- STOP or unsubscribe removes the person from every channel immediately.
- A bounce removes the address.
- Anyone with no clicks after 4 emails is moved to a sunset list.

**Sending rules:**
- Weekdays only; SMS between 10am and 6pm.
- No more than 2 emails and 1 SMS a week per person.
- Every message identifies Qubik and has a working opt-out.

## 5. Calendar

| Dates | What runs |
|---|---|
| Mon 9 Nov | T1 and T2 start; sales gets a daily list of T1 completions |
| Mon 16 Nov | T3 starts; T4 email 1 |
| Mon 23 Nov | "Lodge even if you can't pay" email before the 25 November agent BAS date (T3–T6) |
| 30 Nov – 18 Dec | T5 starts; "before the Christmas break" review offer (T3–T5) with SMS to people who engaged |
| 21 Dec – 4 Jan | Pause |
| 5 – 29 Jan | "Start 2027 with a plan" (T4–T6); T1 and T2 follow-up for anyone still open |
| February | Reminder that the quarter-two BAS is due 1 March; monthly nurture continues |

## 6. Expected results (estimate)

| Segment | Leads | Next step | Assumption (conservative – base) | New clients |
|---|---|---|---|---|
| T1 ID check | 60 | Complete ID | 30–45% complete; 25–40% of those sign | 4–11 |
| T2 Proposal | 18 | Accept | 20–35% accept | 4–6 |
| T3 Never reached | 47 | Book a review | 10–20% book; about 40–50% of those become opportunities; 20–25% of opportunities sign | 0–1 |
| T4 Reached, stalled | 123 | Book a review | 5–10% book; then as T3 | 1 |
| T5 Chose not to proceed | 95 | Re-open | 3–6% re-open; 25–30% sign | 1–2 |
| T6 Lost, other | 41 | Re-open | 2–4% re-open; 25–30% sign | 0–1 |
| **Total** | **384** | | | **about 10–22** |

**What it's worth:**

| Basis | Range for 10–22 clients |
|---|---|
| Median client value (~A$2,100) | about A$21,000–46,000 |
| Average client value (~A$8,700, lifted by a few large files) | about A$87,000–191,000 |

**About 80% of the expected clients come from T1 and T2**, which is why they start first.

## 7. Thresholds

| Signal | Keep going | Change something | Stop |
|---|---|---|---|
| T1: ID checks completed within 7 days | 30%+ | 15–30%: simplify the instructions, add a short how-to video | Under 15%: check whether the ID tool itself is the blocker |
| Bookings or replies (T3–T6, per send) | 2%+ | 1–2%: change the subject, hook or offer | Under 1% across two sends |
| Bounces | Under 2% | 2–5%: re-verify | Over 5%: pause and clean |
| Spam complaints | Under 0.1% | 0.1–0.3%: slow down | Over 0.3%: stop the segment |
| Unsubscribes | Under 1% | 1–2%: reduce frequency | Over 2%: stop and review |

## 8. Fixes to the lead flow itself

The same data shows why leads stall in the first place. Fixing these protects every new lead from now on:
- **Speed to first contact.** The median is 15 hours, and a quarter of leads wait more than 3.7 days. Leads contacted within an hour reach opportunity about twice as often as leads first contacted after 1–3 days (about 43% against 20%). Send an automatic SMS and email within 5 minutes, then call.
- **Call timing.** Calls connect about 40% of the time from 8 to 10am, against 23–28% in the afternoon. Tuesday is the best day.
- **ID verification.** Half of open opportunities stop here. Review the step: number of screens, mobile experience, and whether a short how-to video helps.
- **Next steps.** 126 open leads have no sub-status. Every open lead should have a next action and date.
- **Data hygiene:**
  - standardise state (missing for 54%, inconsistent where present) and debt bands (three formats);
  - fix the AI qualification, which returns "unclear" for every lead;
  - populate the empty reactivation fields so this campaign can be tracked.
- **Ads.** Ad "Image Batch 2-1" and ad set "Finance #3" convert best so far (about 50% to opportunity), and the June 2026 form with verification brings better leads than the October 2025 form (45% against 29%).

## 9. Weekly report

By segment, each week:
- emails and SMS delivered;
- click and reply rates;
- bounces, complaints and unsubscribes;
- ID checks completed (T1);
- proposals accepted (T2);
- reviews booked and held;
- new clients and estimated value;
- spend.

## 10. What I need to start

- **Offer and copy sign-off** from Dominic: the free review and the wording on options.
- **Systems:** email platform access (or approval to set one up), a separate sending domain with DNS access, and an SMS sender.
- **Links:** the ID-verification link and the proposal (Ignition) link format for T1 and T2 messages, plus an online booking link for reviews.
- **A daily hand-off:** who in sales receives T1 completions and T2 acceptances.
- **Confirmation** that Qubik's privacy adviser is comfortable with the consent basis for SMS and email.
