# Qubik: Google Ads Strategy for AI & Automation Leads

**Data:** Google Keyword Planner, Australia, English, pulled 1 November 2026 (186 keywords). Bid figures are Google's top-of-page bid ranges, not guaranteed CPCs. All conversion and CPC assumptions below are estimates to replace with real data after two to three weeks.
**Build file:** `Qubik-Google-Ads-Build.xlsx` holds keywords by ad group and match type, negatives, ad copy, assets, budget scenarios and the next research pull.

---

## 1. What the keyword data tells us

1. **The market is small and concentrated.** The high-intent terms worth building on total about **2,920 searches a month across all of Australia**. The biggest pool is "AI consulting" (about 1,340 a month, plus about 590 for city variants). Next come "business process automation" (370) and "automation consultant" style terms (360). Brisbane on its own is tiny: "ai consultant brisbane" gets about 20 a month. **So target the whole of Australia, not Brisbane.**
2. **The cheapest high-intent terms are service terms, not software terms.**
   - "automation consultant": 140 a month at A$5.70–14.
   - "ai consultant sydney": 140 a month at A$5.90–15.
   - "ai agency australia": 140 a month at A$5.60–25.
   - Software terms such as "workflow automation software" and "business workflow software" bid at A$20–155. Those are people shopping for software, not buyers of a service, so they are negatives.
3. **Several terms sound relevant but mean something else.**
   - "ai consulting business": people who want to *start* an AI consultancy.
   - "ai in accounting firms": research.
   - "ai software developer": hiring.
   - "industrial automation consultant": factory automation.
   - Healthcare AI: academic research.

   That is 82 negatives from the sheet plus about 56 generic ones (138 in total), loaded from day one.
4. **"AI readiness assessment" (50 a month) matches Qubik's offer almost exactly.** It's small but should convert well, and it gives the offer its name on Google.
5. **What the sheet doesn't cover:** back-office searches like "invoice processing automation", "accounts payable automation", "Xero automation" and "order entry automation" aren't in it. Those are closest to Qubik's real edge and to the distributor plan. **Run them through Planner next** (list on the "Research gaps" tab) before deciding on a third ad group.

## 2. Campaign structure (phase 1)

One Search campaign covering Australia. Phrase and exact match only. No Display, no Search Partners, no broad match until there is conversion data.

| Ad group | Example keywords | Searches/mo | Weighted bid range (A$) | Landing page |
|---|---|---|---|---|
| AG1 Automation consultant & services | automation consultant · process automation consultant · workflow automation services · business automation services | ~360 | 6–17 | /business-process-automation |
| AG2 Business process automation | business process automation · ai workflow automation | ~370 | 11–32 | /business-process-automation |
| AG3 AI consulting | ai consulting · ai consulting services · ai consulting company · ai strategy consulting | ~1,340 | 10–29 | /ai-consulting |
| AG4 AI consulting: cities/AU | ai consultant sydney · ai consulting melbourne · ai agency australia · ai consulting australia | ~590 | 6–21 | /ai-consulting |
| AG5 AI implementation & agents | ai implementation consultants · ai integration services · ai agent development · custom ai development | ~210 | 10–30 | /ai-consulting |
| AG6 Readiness assessment | ai readiness assessment | ~50 | 14–39 | /ai-consulting (assessment section) |

**Phase 2 tests,** once phase 1 has conversion data: ai automation agency (390, cheap but low quality), process automation / business automation / workflow automation (~590), ai for small business (210), digital transformation consulting (140), ai for logistics (70, which fits distributors). Put them in a separate campaign with its own budget, so they can't drain phase 1.

**Positioning risk:** people searching "AI consulting" may expect a technology firm. Qubik's answer is the difference itself: *AI and automation scoped by accountants who start with your numbers and show the payback in dollars.* That goes in the ads and at the top of the landing page.

## 3. Budget and expectations (estimates)

| Daily budget | Monthly | Clicks at A$12–18 average CPC | Leads at 5–8% conversion | Cost per lead |
|---|---|---|---|---|
| A$40 | ~A$1,220 | 68–101 | 3–8 | ~A$150–360 |
| A$60 | ~A$1,820 | 101–152 | 5–12 | ~A$150–360 |
| A$80 | ~A$2,430 | 135–203 | 7–16 | ~A$150–360 |

**The ceiling:** at roughly a 5% click-through rate, phase 1 delivers about 146 clicks a month even with 100% impression share. Spending much above about A$60–70 a day will hit that limit, so scale by adding phase 2 terms, not by raising the budget. **Start at A$50–60 a day.**

**Bidding:** Maximise Clicks with a maximum CPC of A$20 for weeks 1–3. Switch to Maximise Conversions after about 15–30 tracked conversions, then add a target CPA.

## 4. Landing pages: two variants of one template

Both pages go on qubik.com.au using Divi's Blank Page template, kept out of the menu and set to noindex in Yoast. Same layout; only the headline, intro and examples change, so each ad group lands on the language it searched for (this also helps Quality Score).

| | /ai-consulting (AG3–AG6) | /business-process-automation (AG1–AG2) |
|---|---|---|
| H1 | **AI consulting that pays for itself** | **Business process automation for growing Australian businesses** |
| Sub-head | Practical AI and automation for Australian businesses, scoped by accountants who start with your numbers. | We find the manual work costing you most, automate it, and show you the payback in dollars. |
| Examples emphasised | AI agents for enquiries and documents, AI readiness, reporting | Invoices and bills, order entry, approvals, reporting |

**Shared sections, top to bottom:**

1. **Hero:** H1, sub-head, the form on desktop (a button that jumps to the form on mobile), and the phone number.
   Trust strip: *Accountants since 2007 · Xero partner since 2013 · Fixed-fee assessment · Australia-wide.*
2. **"Sound familiar?"** Three pains in the owner's own words:
   - "We type the same numbers into three systems."
   - "Supplier invoices and orders eat someone's whole week."
   - "We only find out margins slipped at month end."
3. **What we automate:**
   - Supplier invoices and bills: read, matched and posted to Xero.
   - Customer orders: drafted straight into your system from email.
   - Reporting: margin and cash numbers weekly, not monthly.
   - Enquiries and documents: AI agents that answer and file.
4. **How it works:**
   1. **Free 30-minute call.** We listen and tell you honestly whether automation is worth it for you.
   2. **AI & Automation Readiness Assessment.** A three-week fixed fee. We map your processes, measure what manual work costs, and give you a priced plan with payback.
   3. **Build and support.** We build the first automation inside your existing systems, and your team approves anything uncertain.
5. **Why an accounting firm.** "Most AI agencies start with the technology. We start with your numbers: what each process costs, and what you'd save. Your data stays in your own systems, and we only build what pays back."
6. **Who it's for:** Australian businesses turning over A$3–10M with 10–50 staff, using Xero or similar, and growing faster than their admin team.
7. **Proof:** Dominic Guinea, founder and CEO (photo), and the real testimonial *"Dom has saved us more money than we've spent!"* (Man Group). Replace with automation case studies as they come.
8. **Pricing, stated openly:** the assessment is A$3,500 + GST for the first ten clients, A$7,500 after that, and credited to the build if you go ahead. *(Confirm with Qubik. Being open about price filters out people who were never going to buy.)*
9. **FAQ:**
   - Do we need new software?
   - What data do you need?
   - How long does a build take?
   - What does a build typically cost? (A$57–90k, scoped in the assessment.)
   - Do you work outside Queensland?
10. **The form again,** then the footer.

**Rules for the copy:**
- No claims Qubik can't back: no "AI agency awards", no guaranteed ROI.
- Leave the Xero tier out until it's confirmed: the website shows Gold, Xero's directory shows Platinum.

## 5. The form

Use **Fluent Forms** (free), on the landing pages only. The site's existing Divi forms stay untouched.

- **Visible fields:**
  - name, work email, mobile, company;
  - annual revenue (under A$2M / A$2–5M / A$5–10M / over A$10M);
  - staff (under 10 / 10–25 / 26–50 / 50+);
  - "What would you most like to automate?" (supplier invoices and bills / customer orders / reporting / enquiries and documents / not sure yet);
  - "When would you want this fixed?" (this quarter / within 6 months / just exploring);
  - a consent tick box.
- **Hidden fields:** gclid, gbraid, wbraid, utm_source, utm_medium, utm_campaign, utm_term, landing page.
- **On submit:**
  - redirect to `/automation/thank-you`, which carries a calendar link to book the 30-minute call;
  - email sales instantly;
  - create a CRM record (HubSpot free, or a Google Sheet to start).
- **Spam:** honeypot plus reCAPTCHA v3.

Revenue and staff are **not used to block** anyone. They tell sales who to call first; under-A$2M leads get a polite resources email.

## 6. Tracking: the site currently has none

1. Back up the site.
2. Install Google Tag Manager via **Divi → Theme Options → Integration** (head and body code). No plugin needed.
3. In LiteSpeed Cache, exclude `googletagmanager.com` and `gtm.js` from JS delay and combine, then purge the cache.
4. In GTM, add:
   - the GA4 Google tag;
   - the Google Ads Conversion Linker;
   - a Google Ads conversion on the thank-you page, with **enhanced conversions** on;
   - consent mode defaults.
5. Conversion actions:
   - **Primary:** form submitted.
   - **Secondary:** calls from ads lasting 60 seconds or more (call asset), and booked calls.
   - **Later:** import **Qualified lead**, **Assessment sold** (A$3,500) and **Build sold** from the CRM via the stored GCLID, then switch the primary goal to Qualified lead.
6. Add Google Analytics and Ads cookies to the privacy policy.
7. Test with GTM Preview and Tag Assistant before spending anything.

## 7. Launch and optimisation

| When | Action |
|---|---|
| Week 1 | Tracking, landing pages, form, test conversions; run the back-office keyword research |
| Week 2 | Upload the build file in Google Ads Editor; launch at A$50–60 a day |
| Twice weekly, weeks 2–6 | Read the search terms report and add negatives; pause keywords with spend above A$150 and no leads |
| Weekly | Sales rates every lead (qualified or not, and why); feed it back into negatives and copy |
| After ~15–30 conversions | Switch to Maximise Conversions; start the CRM import |
| Month 2–3 | Phase 2 test campaign; possibly a back-office ad group once the research pull is in |

**Kill or keep rules:**
- An ad group that spends 3× the target cost per lead with no qualified lead gets paused and rethought.
- A keyword with click-through above 5% but no leads points to a landing-page problem, not a keyword problem.

## 8. Decisions needed

1. **The offer on Google:** a free 30-minute call leading to the paid assessment (recommended for search intent), or straight to the paid assessment?
2. **Who edits WordPress** (for GTM, the pages and Fluent Forms), and **which CRM?**
3. **The Xero tier** (Gold or Platinum), and whether founding-client pricing can be shown publicly.
4. **Whether to run the back-office keyword pull,** to decide on an invoice and order automation ad group.
