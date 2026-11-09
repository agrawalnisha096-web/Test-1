# Google Ads setup: Qubik automation campaign

This sets up Google Ads end to end: account settings, conversion tracking on the website, the Search campaign with six ad groups, negative keywords, ads and assets. The campaign is left **paused** until you've checked it and the tracking test has passed.

## Part A: What only you can do (about 15 minutes)

**A1. Make sure the final landing page is live first.** Run the landing page instructions (`claude-in-chrome-landing-page-final-prompt.md`) through to "go live" before this. The tracking code goes onto the live pages at `/marketing/automation/` and `/marketing/automation/thank-you/`. If you replace those pages later, the tracking has to be added again.

**A2. Create the Google Ads account.**
1. Go to `ads.google.com` and sign in with the Google account Qubik will own long-term (for example the qubikads Gmail).
2. When Google pushes you to create a campaign straight away, look for **"Switch to Expert Mode"** (small link at the bottom), then **"Create an account without a campaign"**. Smart campaigns can't use our keyword and tracking setup.
3. Account details. These **can't be changed later**:
   - Billing country: **Australia**
   - Time zone: **(GMT+10:00) Brisbane**
   - Currency: **Australian Dollar (AUD)**
4. Add the billing details (card or bank). Only you should enter payment details.
5. Note the **Customer ID** at the top right (format `123-456-7890`).
6. If Google asks for advertiser verification (identity or business documents), complete it. Ads won't run without it.

**A3. Fill in the blanks** in the prompt below:
- `[DAILY BUDGET]`: the plan recommends **55** (A$55 a day, about A$1,670 a month).
- `[CALL HOURS]`: when someone can answer (07) 3205 8938, for example `Monday to Friday, 8:30am to 5:00pm`.

**A4. Have the two logo files ready.** Claude in Chrome can't upload files, so it will ask you to upload these when it gets to the logo step. They're in the repo under `google-ads/ads-assets/`:
- `qubik-logo-square-1200.png`
- `qubik-logo-landscape-1200x300.png`

**A5.** Log in to both Google Ads and WordPress in the same Chrome window, open the Claude side panel, and paste **everything below the line**.

---

You are going to set up Google Ads for Qubik (qubik.com.au), an Australian accounting firm selling business process automation, AI dashboards and AI consulting. The goal is phone calls booked through the landing page at `https://qubik.com.au/marketing/automation/`. I'm logged in to Google Ads and to the WordPress admin in this browser.

## Ground rules
- **Never** enter, change or view payment details. **Never** accept legal terms (customer data terms, advertiser verification, policy agreements) on my behalf. Stop and ask me.
- Create only what's listed here. Don't create other campaigns, don't apply Google's "recommendations", and turn down offers to "boost", "optimise" or "let Google decide" (AI Max, broad match, automatically created assets, final URL expansion, Performance Max upsells).
- Keep the campaign **paused** until I say "launch".
- In WordPress, only add the two tracking modules described in Step 3. Don't change anything else on any page.
- Google Ads menus move around. If a menu name differs, find the closest equivalent that does the same thing. If you're unsure whether a setting would spend money or widen targeting, stop and ask me.
- Type all text (keywords, ads, assets) exactly as written here.

## My settings
- Daily budget: A$`[DAILY BUDGET]`
- Call hours for the call asset (Brisbane time): `[CALL HOURS]`

## Step 0: Check the account and report back
Tell me:
1. The Customer ID, currency and time zone (expect AUD and Brisbane).
2. Whether any campaigns already exist. If Google created a Smart campaign during sign-up, **pause** it and tell me its name.
3. Whether the account is in Expert mode (the left menu shows Campaigns, Goals, Tools, Billing, Admin). If it's in Smart mode, tell me and stop.

## Step 1: Account settings
1. **Admin → Account settings → Auto-tagging:** turn **on** ("Tag the URL that people click through from my ad"). It adds the click ID the landing page saves with each lead.
2. **Admin → Account settings → Call reporting:** turn **on**.
3. **Recommendations → Auto-apply:** turn **off** every auto-apply option.

## Step 2: Conversion actions
Go to **Goals → Conversions → Summary → + Create conversion action → Website**. Enter `qubik.com.au`, scan, then choose to **add a conversion action manually**.

**2a. Lead form submitted** (the main goal)
- Goal and action optimisation: **Submit lead form**, set as a **Primary** action
- Conversion name: `Lead form submitted`
- Value: **Don't use a value**
- Count: **One**
- Click-through conversion window: **90 days**; view-through: **1 day**
- Attribution: **Data-driven**

**2b. Phone number click** (tracked, but not what Google bids toward)
- Goal: **Contact**, set as a **Secondary** action
- Conversion name: `Phone number click (website)`
- Value: **Don't use a value**; Count: **One**; Click-through window: **30 days**

**2c. Get the tag details.** When Google shows how to install the tag, choose **"Install the tag yourself"** (not Google Tag Manager). Don't install anything yet; just record:
- the **Google tag ID**, which looks like `AW-123456789`;
- for each conversion action, the **label**: the part after the slash in `send_to: 'AW-123456789/AbC-dEfGhIjK'`.

Tell me all three values.

**2d. Enhanced conversions for leads:** **Goals → Settings → Enhanced conversions for leads** → turn on → method **Google tag** (code on the website). If Google asks to accept the **customer data terms**, stop and ask me to accept them.

**2e. Tidy up other goals:** if there are other conversion actions (for example ones Google created automatically, like "Page view"), set them to **Secondary**. Only `Lead form submitted` should be Primary.

## Step 3: Add the tracking code to the website
In both code blocks in the Appendix, replace:
- every `[AW-ID]` with the Google tag ID (for example `AW-123456789`);
- `[CALL-LABEL]` with the label of **Phone number click (website)**;
- `[FORM-LABEL]` with the label of **Lead form submitted**.

Then, in WordPress:
1. **Landing page:** Pages → **Automation** (under the parent page "marketing", address `/marketing/automation/`) → open in the Divi Builder. Add a new **Fullwidth section** at the very **bottom** of the page (padding 0), containing one **Fullwidth Code** module. Paste **Tracking code 1** into it. Save. This page is live, so saving publishes it; that's expected for this addition only.
2. **Thank-you page:** Pages → **Thank you** (address `/marketing/automation/thank-you/`) → Divi Builder → same: a new Fullwidth section at the very bottom with one Fullwidth Code module, then paste **Tracking code 2**. Save.
3. Don't change any other module on either page.

## Step 4: Test the tracking
1. Open `https://qubik.com.au/marketing/automation/?gclid=TEST-TRACKING` in a new tab. In the browser console, run `typeof gtag`. It should return `"function"`.
2. Submit a test lead:
   - Step 1: pick any option.
   - Step 2: any answers.
   - Step 3: Name `Test Lead tracking`, Company `Test – please ignore`, Email `test@example.com`, Mobile `0400 000 000`; tick consent.
3. On the thank-you page, run this in the console:
   `window.dataLayer.filter(function (x) { return x[0] === 'event' || x[0] === 'set'; })`
   It should show a `user_data` entry with `email: "test@example.com"` and `phone_number: "+61400000000"`, and a `conversion` event whose `send_to` ends with the Lead form label.
4. Refresh the thank-you page and run the same line again. There should be **no** second conversion event.
5. This test also sends one lead email to the sales inbox. That's expected; don't wait for me to confirm it. I'll check the email later.
6. In Google Ads, **Goals → Conversions**: the status of the two actions may say "Unverified" or "No recent conversions" for a few hours. That's normal. Tell me what it shows.

If `typeof gtag` isn't `"function"` or the conversion event is missing, stop and tell me what you see.

## Step 5: Build the campaign
**Campaigns → + New campaign.** Choose the objective **Leads** (or "Create a campaign without a goal's guidance"), campaign type **Search**. If asked for conversion goals, keep only **Submit lead forms** (using `Lead form submitted`). If asked for a website, enter `https://qubik.com.au/marketing/automation/`.

**Campaign settings**
- Campaign name: `Search | AU | Automation & AI | Phase 1`
- Bidding: focus on **Clicks**, with **maximum CPC bid limit A$20**. If Google defaults to Conversions, change it to Clicks; the account has no conversion data yet.
- Networks: **untick** Google Search Partners **and** Display Network.
- Locations: **Australia**. Location options: **Presence: people in or regularly in your included locations** (not "presence or interest").
- Languages: **English**
- Audience segments: none
- Broad match: **off**. AI Max for Search: **off**. Automatically created assets: **off**. Final URL expansion and text customisation: **off**.
- Start date: today; no end date; no ad schedule.
- EU political advertising: **No**.

**Ad groups and keywords.** Create these six ad groups. Paste each keyword list as written: quotes mean phrase match, square brackets mean exact match.

**AG1 Automation consultant & services** (19 keywords, uses Ad 1)

```
"automation consultant"
[automation consultant]
"process automation consulting"
[process automation consulting]
"process automation consultant"
[process automation consultant]
"workflow automation services"
[workflow automation services]
"business process automation services"
"business automation services"
"business process automation companies"
"workflow automation companies"
"business automation companies"
"business process automation consultant"
"business automation consultant"
"workflow automation consultant"
"small business automation consultant"
"business process automation australia"
"workflow automation for small business"
```

**AG2 Business process automation** (4 keywords, uses Ad 1)

```
"business process automation"
[business process automation]
"ai workflow automation"
[ai workflow automation]
```

**AG3 AI consulting** (12 keywords, uses Ad 2)

```
"ai consulting"
[ai consulting]
"ai consulting services"
[ai consulting services]
"ai consulting company"
[ai consulting company]
"ai strategy consulting"
[ai strategy consulting]
"ai business consulting"
[ai business consulting]
"ai transformation consulting"
"ai management consulting"
```

**AG4 AI consulting - cities/AU** (14 keywords, uses Ad 2)

```
"ai consultant sydney"
[ai consultant sydney]
"ai agency australia"
[ai agency australia]
"ai consulting melbourne"
[ai consulting melbourne]
"ai consulting australia"
[ai consulting australia]
"ai automation sydney"
[ai automation sydney]
"ai consultant brisbane"
"ai consultant perth"
"ai automation agency sydney"
"artificial intelligence consultant adelaide"
```

**AG5 AI implementation & agents** (11 keywords, uses Ad 2)

```
"ai implementation consultants"
[ai implementation consultants]
"ai integration services"
[ai integration services]
"ai implementation services"
"ai implementation company"
"ai agent development"
[ai agent development]
"ai agent development company"
"custom ai development"
"custom ai development company"
```

**AG6 Readiness assessment** (2 keywords, uses Ad 2)

```
"ai readiness assessment"
[ai readiness assessment]
```

**Ads.** Create one responsive search ad in each ad group: **Ad 1** in AG1 and AG2, **Ad 2** in AG3, AG4, AG5 and AG6. Pin **headline 1 to position 1** in both ads; don't pin anything else.

**Ad 1: Process automation (AG1, AG2)**

- Final URL: `https://qubik.com.au/marketing/automation/`
- Display path: `Automation` / `Free-Call`

| # | Headline | Chars |
|---|---|---|
| 1 | Business Process Automation (pin to position 1) | 27 |
| 2 | Automation Consultants | 22 |
| 3 | Automate the Manual Work | 24 |
| 4 | Automation + Live Dashboards | 28 |
| 5 | See Profit by Site, Live | 24 |
| 6 | Cut Admin Costs, Not People | 27 |
| 7 | Book a Free Discovery Call | 26 |
| 8 | Xero Partner Since 2013 | 23 |
| 9 | Accountants Since 2007 | 22 |
| 10 | Works With Your Systems | 23 |
| 11 | Built by Accountants | 20 |
| 12 | Invoices, Orders & Reporting | 28 |
| 13 | For 10 to 1,000+ Staff | 22 |
| 14 | See It Working Before You Buy | 29 |
| 15 | Price Agreed Upfront | 20 |

| # | Description | Chars |
|---|---|---|
| 1 | We automate the manual work slowing your team down and connect it to live dashboards. | 85 |
| 2 | Supplier bills, orders, reporting and approvals, automated inside the systems you use. | 86 |
| 3 | Accountants since 2007. We start with your numbers and show what is worth fixing first. | 87 |
| 4 | Free 30-minute discovery call with business experts. No obligation, no hard sell. | 81 |

**Ad 2: AI consulting & implementation (AG3 to AG6)**

- Final URL: `https://qubik.com.au/marketing/automation/?v=ai`
- Display path: `AI` / `Free-Call`

| # | Headline | Chars |
|---|---|---|
| 1 | AI Consulting for Business (pin to position 1) | 26 |
| 2 | Practical AI for Business | 25 |
| 3 | AI Consultants, Australia-Wide | 30 |
| 4 | AI That Does the Work | 21 |
| 5 | AI Implementation Services | 26 |
| 6 | AI Built by Accountants | 23 |
| 7 | Start With Your Numbers | 23 |
| 8 | Book a Free Discovery Call | 26 |
| 9 | Xero Partner Since 2013 | 23 |
| 10 | AI Dashboards & Automation | 26 |
| 11 | See It Working Before You Buy | 29 |
| 12 | Your People Stay in Control | 27 |
| 13 | Free AI Readiness Call | 22 |
| 14 | Accountants Since 2007 | 22 |
| 15 | Less Admin, Clearer Numbers | 27 |

| # | Description | Chars |
|---|---|---|
| 1 | Practical AI and automation, scoped by accountants and built on the systems you use. | 84 |
| 2 | Documents read, problems flagged, reports built. Your people approve anything unsure. | 85 |
| 3 | See a working prototype before you commit. You know the price before any work starts. | 85 |
| 4 | Free 30-minute discovery call with business experts. No obligation, no hard sell. | 81 |

**Budget:** A$`[DAILY BUDGET]` per day.

Review the summary, then **Publish**. Straight after publishing, set the campaign to **Paused**. New ads go through Google's review first (usually within a business day), so nothing is spent before you pause it.

## Step 6: Negative keywords
1. **Tools → Shared library → Exclusion lists → Negative keyword lists → +**
2. Name: `Qubik negatives – phase 1`
3. Paste this list (quotes are phrase match, plain words are broad match):

```
"ai in consulting"
"ai consulting business"
"ai consulting startups"
"ai consulting services market"
"ai for consulting"
"accenture ai consulting"
"mckinsey ai consulting"
"deloitte ai consulting"
"ey ai consulting"
"ibm ai consulting"
"forrester wave ai consultancies"
"business process automation software"
"business process automation tools"
"industrial automation consultant"
"marketing automation consultant"
"robotic consultant"
"digital consulting business"
"ai call center"
"ai software developer"
"ai software developers"
"create ai chatbot"
"create a chat bot"
"build ai chatbot"
"creating an ai chatbot"
"ai crm software"
"ai software for law firms"
"ai software for lawyers"
"law firms using ai"
"using ai in law firms"
"ai in accounting firms"
"ai in logistics and supply chain"
"ai adoption"
"ai adopt"
"best ai for small business"
"ai in small business"
"ai software for small business"
"workflow automation tools"
"work flow software"
"workflow management software"
"accounting workflow software"
"workflow automation software"
"nintex k2"
"best workflow management software"
"process automation software"
"zapier workflow"
"workflow platform"
"nintex workflow cloud"
"nintex automation cloud"
"appian workflow"
"business automation software"
"business workflow software"
"crm with workflow automation"
"ap workflow"
"best workflow automation software"
"best rpa software"
"business automation tools"
"approval workflow software"
"business process software"
"process workflow software"
"ibm business automation workflow"
"ibm baw"
"medical ai"
"medical artificial intelligence"
"ai for healthcare"
"artificial intelligence in healthcare"
"ai and healthcare"
"ai in medicine"
"ai medical diagnosis"
"ai for health"
"health ai"
"ai in healthcare course"
"ai scribe medical"
"ai medical imaging"
"ai and medicine"
"ai for medicine"
"ai in medical field"
"artificial intelligence in medical field"
"use of ai in healthcare"
"machine learning in healthcare"
"ai in healthcare examples"
"healthcare ai companies"
"medical scribe ai"
jobs
job
careers
career
salary
internship
course
courses
certification
certificate
training
tutorial
learn
degree
university
pdf
template
examples
definition
"what is"
software
tool
tools
app
platform
"free download"
"free trial"
"open source"
github
python
reddit
accenture
deloitte
mckinsey
kpmg
pwc
ey
ibm
nintex
appian
uipath
zapier
"power automate"
"automation anywhere"
"blue prism"
make.com
healthcare
medical
medicine
industrial
plc
robotics
"marketing automation"
"accounting firms"
"for accountants"
"chatbot builder"
```

4. Save, then apply the list to the campaign `Search | AU | Automation & AI | Phase 1`.

## Step 7: Assets (campaign level)
**Sitelinks** (4):

| Sitelink text | Final URL | Description line 1 | Description line 2 |
|---|---|---|---|
| Book a Free Call | `https://qubik.com.au/marketing/automation/#book` | 30 minutes, no obligation | Business experts, not sales |
| What We Automate | `https://qubik.com.au/marketing/automation/#automate` | Bills, orders, reports & more | Inside the systems you use |
| See a Live Dashboard | `https://qubik.com.au/marketing/automation/?v=dashboards#dashboards` | Real screens, sample data | Profit by site and forecasts |
| Client Testimonials | `https://qubik.com.au/testimonials/` | Hear from Qubik clients | Including Pilpel's story |

If Google rejects the three landing-page sitelinks as duplicates (they share a page), change their URLs to `https://qubik.com.au/contact-us/` (Book a Free Call) and `https://qubik.com.au/` (What We Automate, See a Live Dashboard), and tell me.

**Callouts** (6): `Free Discovery Call` · `Xero Partner Since 2013` · `Accountants Since 2007` · `Australia-Wide` · `See It Before You Build` · `Price Agreed Upfront`

**Structured snippet:** header **Services**, values: `Process automation` · `Business dashboards` · `AI implementation` · `Reporting automation` · `System integration`

**Call asset:**
- Country: Australia; phone number: `(07) 3205 8938`
- Call reporting: **on**; conversion action: **Calls from ads**, counted as a conversion when the call lasts **60 seconds** or more. Set it to **Secondary** in Goals afterwards.
- Schedule: `[CALL HOURS]` (Brisbane time)

**Business name:** `Qubik`

**Business logo:** go to the logo asset upload, then ask me to upload `qubik-logo-square-1200.png` and `qubik-logo-landscape-1200x300.png` (you can't upload files from my computer). Continue once I say they're done.

## Step 8: Final check and report (campaign stays paused)
Report back:
1. Account: Customer ID, auto-tagging on, call reporting on, auto-apply off.
2. Conversions: the three actions, which one is Primary, enhanced conversions status, and the tracking test result.
3. Campaign: status (Paused), budget, bidding, networks, location option, and a count of ad groups, keywords and ads.
4. Negatives: list name, number of keywords, applied to the campaign (yes/no).
5. Assets: sitelinks, callouts, snippet, call asset, business name, logo, and any that are disapproved or under review.
6. Anything you skipped, couldn't do, or changed from these instructions.

**Wait for me to say "launch".** Then set the campaign to **Enabled** and tell me the status of each ad ("Eligible", "Under review" or "Disapproved", with the reason).

---

## Appendix: tracking code

### Tracking code 1: landing page (new Fullwidth Code module at the bottom)

```html
<script data-no-optimize="1" async src="https://www.googletagmanager.com/gtag/js?id=[AW-ID]"></script>
<script data-no-optimize="1">
window.dataLayer = window.dataLayer || [];
function gtag() { window.dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', '[AW-ID]');
(function () {
  var form = document.getElementById('qlp-lead');
  if (form) {
    form.addEventListener('submit', function () {
      try {
        window.sessionStorage.setItem('qlp_lead', JSON.stringify({
          email: String(form.elements.email.value || '').trim().toLowerCase(),
          phone: String(form.elements.phone.value || ''),
          id: 'qlp-' + Date.now() + '-' + Math.floor(Math.random() * 100000)
        }));
      } catch (err) {}
    }, true);
  }
  document.querySelectorAll('a[href^="tel:"]').forEach(function (link) {
    link.addEventListener('click', function () {
      gtag('event', 'conversion', { send_to: '[AW-ID]/[CALL-LABEL]' });
    });
  });
})();
</script>
```

### Tracking code 2: thank-you page (new Fullwidth Code module at the bottom)

```html
<script data-no-optimize="1" async src="https://www.googletagmanager.com/gtag/js?id=[AW-ID]"></script>
<script data-no-optimize="1">
window.dataLayer = window.dataLayer || [];
function gtag() { window.dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', '[AW-ID]');
(function () {
  var lead = null;
  try { lead = JSON.parse(window.sessionStorage.getItem('qlp_lead') || 'null'); } catch (err) { lead = null; }
  if (!lead) { return; }
  var phone = String(lead.phone || '').replace(/[^0-9+]/g, '');
  if (phone.indexOf('+') !== 0) {
    if (phone.indexOf('61') === 0) { phone = '+' + phone; }
    else if (phone.indexOf('0') === 0) { phone = '+61' + phone.slice(1); }
  }
  var userData = {};
  if (lead.email) { userData.email = lead.email; }
  if (phone.length !== 0) { userData.phone_number = phone; }
  gtag('set', 'user_data', userData);
  gtag('event', 'conversion', { send_to: '[AW-ID]/[FORM-LABEL]', transaction_id: lead.id });
  try { window.sessionStorage.removeItem('qlp_lead'); } catch (err) {}
})();
</script>
```
