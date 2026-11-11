# Claude in Chrome prompt: search terms analysis and keyword expansion

Paste everything below the line into Claude in Chrome, with Google Ads open. This is **analysis only**: nothing is changed in the account until you approve the recommendations.

---

You are going to analyse the first days of Qubik's Google Ads campaign, find better keywords, and give me a clear conclusion. **Don't change anything in Google Ads**: don't add or remove keywords or negatives, don't change bids, budgets or statuses, and don't save Keyword Planner plans to the account. Only read data and report.

## Context
- **Business:** Qubik, an Australian accounting firm (since 2007, Xero partner since 2013) that sells **business process automation and AI dashboards**. Scoping is done by accountants, the work is built on the client's existing systems, and they see a working prototype before the build.
- **Who we want:** established Australian businesses (10 to 1,000+ staff) looking for a **service provider** to automate back-office work (invoices, orders, reporting, approvals, data between systems) or get better management reporting and dashboards.
- **Who we don't want:** people looking for software or tools to do it themselves, students, job seekers, people researching definitions or examples, and other meanings of "automation" (industrial, home, marketing tools, RPA product training).
- **Landing page:** `https://qubik.com.au/marketing/automation/`. Its sections cover the cost of staff time spent on manual work, what we automate (supplier bills, customer orders, the reporting pack, approvals, data between systems, routine enquiries), dashboards (profit by site, margin, forecast, alerts, reconciliation), a free discovery call, and pricing explained without figures.
- **Account:** Customer ID 501-682-6184, campaign `Search | AU | Automation & AI | Phase 1`. Only the **AG2 Business process automation** ad group is enabled now. The other ad groups were paused because they mostly matched irrelevant searches.
  - AG2 keywords (phrase and exact): ai workflow automation, business process automation
  - AG1 Automation consultant & services (paused): automation consultant, business automation companies, business automation consultant, business automation services, business process automation australia, business process automation companies, business process automation consultant, business process automation services, process automation consultant, process automation consulting, small business automation consultant, workflow automation companies, workflow automation consultant, workflow automation for small business, workflow automation services
  - AG3 to AG6 (AI consulting, cities, AI implementation, readiness; paused)
  - Shared negative list `Qubik negatives – phase 1` (138 keywords: jobs, courses, software/tool/app/platform, templates, competitors and similar) is applied.

## Step 1: Collect the data (since the campaign started)
1. **Campaign and ad groups:** for every ad group (including paused), get impressions, clicks, CTR, average CPC, cost, conversions and cost per conversion. Note the date the other ad groups were paused, if the change history shows it.
2. **Keywords:** the same metrics for every keyword, with match type and status.
3. **Search terms** (Insights and reports → Search terms): every search term with at least one impression. For each, get the ad group, the keyword that matched it, match type, whether it's already added or excluded, impressions, clicks, cost and conversions.
4. **Conversions:** how many "Lead form submitted", phone clicks and calls from ads, and which search terms they came from (if any).

## Step 2: Classify every search term
Put each search term in one bucket:
- **A. Right buyer:** wants a provider or service to automate or improve their own business (for example "business process automation consultant", "automation services australia", "invoice automation for small business").
- **B. Unclear:** generic category searches that could be a buyer or a researcher (for example "business process automation", "workflow automation").
- **C. Wrong:** software or tool shopping (product names, "software", "tool", "app", "platform", "free", "best … tool"), learning (what is, examples, course, certification, pdf), jobs and salaries, other meanings of automation (industrial, home, marketing tools), competitor brands, or research and market reports.

For every **C** term, propose a negative keyword. Use a single word when it's safe (it must not block any A or B term or any of our keywords), otherwise a phrase. Skip anything already in `Qubik negatives – phase 1` (open the list and check).

Then explain **why** the wrong searches matched: which keyword or match type let them in (for example a phrase-match keyword with a broad meaning, or "ai workflow automation" matching AI-tool searches).

## Step 3: Research better keywords (Keyword Planner, read only)
Tools → Planning → **Keyword Planner → Discover new keywords**. Location **Australia**, language **English**, network **Google**, last 12 months. Run these seed groups (several seeds per search is fine):

1. **Service-intent BPA:** business process automation services, business process automation consultant, business process automation company, process automation consultant, automation consultant, business automation services, workflow automation consultant, workflow automation services, automation agency australia
2. **Back-office (earlier research we never ran):** invoice processing automation, accounts payable automation, automate invoice data entry, automate data entry, xero automation, xero automation consultant, myob automation, purchase order automation, order entry automation, sales order automation, automate bookkeeping, ai bookkeeping, document automation
3. **Location:** automation consultant brisbane, business automation brisbane, business process automation sydney, business process automation melbourne
4. **Reporting and dashboards (closest to the page's dashboard section):** reporting automation, automated financial reporting, management reporting automation, management reporting services, kpi dashboard consultant, business intelligence consultant, power bi consultant, virtual cfo, outsourced cfo services
5. **Earlier "phase 2" candidates, to re-check** (earlier volumes per month): process automation (210), business automation (170), workflow automation (210), ai automation agency (390), ai automation services (90), digital transformation consulting (140)

For every candidate, record: average monthly searches, competition, and top-of-page bid (low and high).

## Step 4: Shortlist
Score each candidate on:
- **Intent:** does the wording suggest someone hiring a provider (consultant, services, company, agency, "for my business", a city), rather than buying software or learning?
- **Fit with the page:** process or back-office automation, reporting or dashboards. Skip anything the page doesn't talk about.
- **Volume:** at least 10 searches a month, unless the intent is very strong.
- **Cost:** top-of-page bids that work under the A$20 maximum CPC.

For each, recommend one of: **add to AG2** (phrase and/or exact), **new ad group** (name it, and say whether the current ad copy fits or needs its own ad), **test later**, or **skip**, with a one-line reason.

Also give a view on **AG1 (Automation consultant & services)**: is it closer to the page than the AI groups, and should it be re-enabled with tighter keywords or negatives?

## Step 5: Report and conclusion
Send me:
1. **Results so far:** a table by ad group and the top keywords (impressions, clicks, CTR, average CPC, cost, conversions).
2. **Search terms:** buckets A, B and C, as tables, with the keyword that matched each one.
3. **Negatives to add:** a ready-to-paste list (with quotes for phrase match, plain for broad), each with a short reason. Confirm none of them blocks an A or B term or our own keywords.
4. **Keyword research:** a table of candidate, searches per month, bid range, intent and fit rating, and recommendation.
5. **Recommended changes, in priority order:** what to change, the expected effect, and the risk.
6. **Conclusion** (5 sentences at most): is running BPA only the right call for now; which keywords and negatives to add first; whether to bring back AG1; what to watch over the next two weeks. Say how confident you are, given how little data there is so far.

**Wait for my approval before changing anything.**
