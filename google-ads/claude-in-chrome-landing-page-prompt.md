# Claude in Chrome prompt: build the automation landing page in Divi

## Before you paste it

1. **Back up the site** (or check that last night's backup exists).
2. **Fill in the two blanks** in the prompt below:
   - `[SALES EMAIL]`: where new leads should be emailed (comma-separate several).
   - `[CALENDAR LINK]`: the booking link for the 30-minute call, or delete that line if you don't have one yet.
3. **Confirm the copy with Qubik** (these were flagged in the prototype):
   - founding-client price A$3,500, standard price A$7,500, build range A$57–90k;
   - "six to ten weeks" build time and "we'll call within one business day";
   - the client quote from Mike Wikes (Man Group) is approved for use.
4. Log in to the WordPress admin in Chrome, open the Claude side panel, and paste **everything below the line**.

This builds the "Process automation ads" version of the page. Google Ads tracking is a separate step, done after this page is live.

---

You are going to build a Google Ads landing page and its thank-you page on the Qubik WordPress site (qubik.com.au), which uses the Divi theme. I'm logged in to the WordPress admin in this browser.

## Ground rules
- Work on the two new pages only. Do not edit, delete or republish any other page, menu, widget or Theme Options setting unless a step below says so.
- Do not install, update or deactivate any plugin or theme.
- Save both pages as **drafts**. Do not publish anything until I've reviewed the preview and said "publish".
- If something on screen doesn't match these instructions (a menu is missing, a setting has a different name, Divi looks different), stop and tell me what you see instead of guessing.
- Paste the code blocks in the Appendix exactly as written. Do not reformat them, add blank lines, or "improve" them. After pasting each one, check it saved in full (first and last lines match).

## What we're building
| Page | Title | URL | Template |
|---|---|---|---|
| Landing page | Automation | `https://qubik.com.au/automation/` | Divi Builder, page template "Blank Page" |
| Thank-you page | Thank you | `https://qubik.com.au/automation/thank-you/` (parent page: Automation) | Divi Builder, page template "Blank Page" |

The landing page is navy and teal, with its own header and footer bar, so it must not show the site's normal header, menu or footer.

## Step 0: Check before you start, and report back
Tell me:
1. Which Divi version is installed (Divi → Theme Options, or Appearance → Themes).
2. Whether Divi → Theme Builder has a global header or footer assigned to all pages.
3. Whether an SEO plugin (Yoast, Rank Math, etc.) is active.
4. Whether LiteSpeed Cache is active.
5. Whether Divi → Theme Options → Spam Protection has reCAPTCHA v3 keys filled in (yes or no only; don't show me the keys).
6. Whether pages with the slugs `automation` or `thank-you` already exist.

Then continue unless something blocks you.

## Step 1: Create the landing page (draft)
1. Pages → Add New. Title: **Automation**. Slug: **automation**. Page Attributes → Template: **Blank Page**. Open in the Divi Builder and choose **Start Building** (blank).
2. Build these four sections, top to bottom:

**Section A: Fullwidth section** (top and bottom padding 0)
- One **Fullwidth Code** module. Paste **Code 1: Styles and header** from the Appendix.

**Section B: Regular section**
- Section → Advanced → CSS Class: `qlp-hero`
- One row with the **3/5 + 2/5** column layout.
  - Row → Design → Sizing: Use Custom Width = Yes, Width 100%, Max Width 1120px. Row → Spacing: padding 0 on all sides.
- **Left column (3/5):** one **Code** module. Paste **Code 2: Hero copy**.
- **Right column (2/5):**
  - Column settings → Advanced → CSS ID: `book`, CSS Class: `qlp-card`
  - First, a **Code** module. Paste **Code 3: Form heading**.
  - Then a **Contact Form** module, set up exactly as in Step 2.
  - Then a **Code** module. Paste **Code 4: Form fine print**.

**Section C: Fullwidth section** (top and bottom padding 0)
- One **Fullwidth Code** module. Paste **Code 5: Page body, footer and form script**.

3. Save as draft.

## Step 2: Contact Form module settings
**Content → Text:** Title: leave empty. Submit Button text: `Book my free call`.

**Content → Fields:** delete the default fields and add these in this order. For each field set the **Field ID** exactly as written (lowercase). Set **Required** and **Make Fullwidth** as shown.

| # | Field ID | Field type | Title (shown as placeholder) | Required | Make Fullwidth | Options |
|---|---|---|---|---|---|---|
| 1 | `name` | Input Field | Name | Yes | No (half) | |
| 2 | `company` | Input Field | Company | Yes | No (half) | |
| 3 | `email` | Email Field | Work email | Yes | No (half) | |
| 4 | `phone` | Input Field | Mobile | Yes | No (half) | |
| 5 | `revenue` | Select Dropdown | Annual revenue | Yes | No (half) | Under A$2M · A$2–5M · A$5–10M · Over A$10M |
| 6 | `staff` | Select Dropdown | Staff | Yes | No (half) | Under 10 · 10–25 · 26–50 · 50+ |
| 7 | `automate` | Select Dropdown | What would you most like to automate? | Yes | Yes | Supplier invoices and bills · Customer orders · Reporting · Enquiries and documents · Not sure yet |
| 8 | `timing` | Select Dropdown | When would you want this fixed? | Yes | Yes | This quarter · Within 6 months · Just exploring |
| 9 | `consent` | Checkboxes | Consent | Yes | Yes | One option: `I agree to Qubik contacting me by phone, email or SMS about this enquiry. I can opt out at any time.` |
| 10 | `gclid` | Input Field | gclid | No | Yes | |
| 11 | `gbraid` | Input Field | gbraid | No | Yes | |
| 12 | `wbraid` | Input Field | wbraid | No | Yes | |
| 13 | `utm_source` | Input Field | utm_source | No | Yes | |
| 14 | `utm_medium` | Input Field | utm_medium | No | Yes | |
| 15 | `utm_campaign` | Input Field | utm_campaign | No | Yes | |
| 16 | `utm_term` | Input Field | utm_term | No | Yes | |
| 17 | `landing_page` | Input Field | landing_page | No | Yes | |

Fields 10–17 are hidden from visitors by the page's CSS and filled automatically by the page's script. They record which ad the lead came from. Don't skip them.

**Content → Email:** Email: `[SALES EMAIL]`. Message Pattern: leave empty, so the email lists every field.

**Content → Redirect:** Enable Redirect URL: **Yes**. Redirect URL: `https://qubik.com.au/automation/thank-you/`.

**Content → Success Message:** `Thanks, we've got your details.`

**Content → Spam Protection:**
- Use Basic Captcha: **No** (the maths question costs leads).
- If Step 0 found reCAPTCHA v3 keys: Use a Spam Protection Service = **Yes**, Service = reCAPTCHA v3, minimum score 0.5.
- If there are no keys, leave it off and tell me in your report.

**Advanced → CSS Class:** `qlp-form`

Save as draft.

## Step 3: Create the thank-you page (draft)
1. Pages → Add New. Title: **Thank you**. Slug: **thank-you**. Page Attributes → Parent: **Automation**, Template: **Blank Page**.
2. Divi Builder → Start Building → one **Fullwidth section** (padding 0) with one **Fullwidth Code** module. Paste **Code 6: Thank-you page**.
3. If an SEO plugin is active, set this page to **noindex** (it should not appear in Google search). Leave the landing page indexable.
4. Save as draft.

## Step 4: Hide the site header and footer on both pages
Preview both drafts. If the site's normal header, menu or footer still shows (this happens when Divi's Theme Builder has a global header or footer):
1. Divi → Theme Builder → Add New Template → Build New Template.
2. Use On: **Specific Pages** → tick **Automation** and **Thank you**.
3. In the new template, set Header and Footer to **disabled** (the eye icon), leave Body as the default. Save changes.

Do not edit the existing global template.

## Step 5: Stop for my review
Send me:
- the preview links for both pages;
- a screenshot of the landing page at desktop width and at phone width (Divi's responsive preview is fine);
- anything that didn't go as described.

**Wait for me to say "publish".**

## Step 6: After I say "publish"
1. Publish the **Thank you** page first, then the **Automation** page.
2. **LiteSpeed Cache** (if active): LiteSpeed Cache → Cache → Excludes → **Do Not Cache URIs**, add `/automation/` on its own line, save, then Purge All.
   Reason: Divi's form includes a security token that expires after about a day. If the page is cached longer than that, every form submission silently fails.
3. **Test the form:**
   1. Open `https://qubik.com.au/automation/?gclid=TEST-123&utm_source=google&utm_medium=cpc&utm_campaign=test` in a new tab.
   2. In the browser console, run `document.querySelector('[data-original_id="gclid"]').value` and confirm it returns `TEST-123`.
   3. Check that fields 10–17 are not visible on the page.
   4. Submit the form with: Name `Test Lead`, Company `Test – please ignore`, Email `test@example.com`, Mobile `0400 000 000`, and any dropdown answers, with consent ticked.
   5. Confirm the browser lands on `/automation/thank-you/`.
4. Ask me to confirm the test email arrived at `[SALES EMAIL]` and that it shows the gclid `TEST-123`.
5. Open the landing page on a phone-sized window and check that "Book a free 30-minute call" scrolls down to the form.

## Report back
List what you created (with URLs), every setting you changed outside the two pages (Theme Builder template, LiteSpeed exclusion), the test result, and anything you skipped or couldn't do.

---

## Appendix: code to paste

### Code 1: Styles and header (Section A, Fullwidth Code module)

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700&family=Lato:wght@400;700&family=IBM+Plex+Mono:wght@400;500&display=swap">
<style>
:root{--q-navy:#2e4455;--q-navy-deep:#22333f;--q-teal:#7ebec5;--q-teal-ink:#2f7f88;--q-paper:#f4f8f8;--q-surface:#ffffff;--q-ink:#1d2c37;--q-muted:#566873;--q-line:#d5e1e3;--q-on-navy:#f2f7f8;--q-on-navy-muted:#b8cbd1;--q-ok:#2f8a5b;--q-display:'Rubik','Helvetica Neue',Arial,sans-serif;--q-body:'Lato','Helvetica Neue',Arial,sans-serif;--q-mono:'IBM Plex Mono',Menlo,monospace}
body.page{background:var(--q-paper)}
.qlp{font-family:var(--q-body);font-size:17px;line-height:1.6;color:var(--q-ink)}
.qlp *{box-sizing:border-box}
.qlp h1,.qlp h2,.qlp h3{font-family:var(--q-display);line-height:1.15;margin:0;padding:0;color:inherit}
.qlp p{margin:0;padding:0}
.qlp ul,.qlp ol{list-style:none;margin:0;padding:0}
.qlp li{padding:0}
.qlp a{color:var(--q-teal-ink)}
.qlp .wrap{max-width:1120px;margin:0 auto;padding-left:16px;padding-right:16px}
.qlp .top{background:var(--q-navy-deep);color:var(--q-on-navy)}
.qlp .top .wrap{display:flex;justify-content:space-between;align-items:center;gap:16px;padding-top:14px;padding-bottom:14px}
.qlp .logo{font-family:var(--q-display);font-weight:700;font-size:26px;letter-spacing:-.02em;display:flex;align-items:baseline;gap:10px;color:var(--q-on-navy);text-decoration:none}
.qlp .logo small{font-weight:400;font-size:13px;color:var(--q-on-navy-muted);letter-spacing:.04em}
.qlp .phone{font-family:var(--q-display);font-weight:500;font-size:15px;color:var(--q-on-navy);text-decoration:none}
.qlp .phone span{color:var(--q-on-navy-muted);font-weight:400;margin-right:6px}
.qlp-hero{background:var(--q-navy)!important;padding:56px 0 64px!important}
.qlp-hero .et_pb_row{width:100%!important;max-width:1120px!important;padding:0 16px!important;box-sizing:border-box!important}
.qlp-hero .qlp{color:var(--q-on-navy)}
.qlp .eyebrow{font-family:var(--q-display);font-size:13px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:var(--q-teal)}
.qlp h1{font-size:clamp(32px,4.4vw,50px);font-weight:600;margin-top:14px;letter-spacing:-.015em}
.qlp .sub{font-size:19px;color:var(--q-on-navy-muted);margin-top:18px;max-width:34em}
.qlp .trust{display:flex;flex-wrap:wrap;gap:8px 22px;margin-top:26px;font-size:15px}
.qlp .trust li{display:flex;gap:8px;align-items:center}
.qlp .trust li:before{content:"";width:7px;height:7px;border-radius:50%;background:var(--q-teal);flex:none}
.qlp .log{margin-top:34px;background:var(--q-navy-deep);border:1px solid rgba(126,190,197,.35);border-radius:10px;padding:16px 18px;font-family:var(--q-mono);font-size:13.5px;line-height:1.75;max-width:560px;overflow-x:auto}
.qlp .log .hd{display:flex;justify-content:space-between;gap:12px;color:var(--q-on-navy-muted);font-size:12px;letter-spacing:.06em;text-transform:uppercase;margin-bottom:6px}
.qlp .log .row{display:grid;grid-template-columns:64px minmax(0,1fr);gap:10px;white-space:nowrap}
.qlp .log .t{color:var(--q-on-navy-muted)}
.qlp .log .done{color:var(--q-teal)}
.qlp .log .flag{color:#f2c46d}
.qlp .log .cap{margin-top:8px;font-family:var(--q-body);font-size:13px;color:var(--q-on-navy-muted);white-space:normal}
.qlp .btn{font-family:var(--q-display);font-weight:600;font-size:17px;border:0;border-radius:8px;padding:14px 20px;background:var(--q-teal);color:#13232d;text-decoration:none;display:inline-block;text-align:center}
.qlp .btn:hover{filter:brightness(1.05)}
.qlp .mobile-cta{display:none}
.qlp-card{background:var(--q-surface);border-radius:12px;padding:28px!important;box-shadow:0 18px 40px rgba(10,25,35,.28);scroll-margin-top:16px}
.qlp-card .qlp{color:var(--q-ink)}
.qlp-card h2{font-size:23px;font-weight:600}
.qlp .lead{color:var(--q-muted);font-size:15px;margin-top:6px}
.qlp .fine{font-size:13px;color:var(--q-muted);text-align:center}
.qlp-card .et_pb_module{margin-bottom:0!important}
.qlp-form{margin-top:20px!important;margin-bottom:14px!important}
.qlp-form .et_pb_contact p .input,.qlp-form .et_pb_contact select.input{font-family:var(--q-body)!important;font-size:16px!important;color:var(--q-ink)!important;background:var(--q-paper)!important;border:1px solid var(--q-line)!important;border-radius:7px!important;padding:10px 12px!important}
.qlp-form .et_pb_contact .input::placeholder{color:var(--q-muted)!important}
.qlp-form .et_pb_contact .input:focus{border-color:var(--q-teal-ink)!important;box-shadow:0 0 0 3px rgba(126,190,197,.35)}
.qlp-form .et_pb_contact_field_options_title{display:none!important}
.qlp-form .et_pb_contact_field_options_list label{font-size:13px!important;color:var(--q-muted)!important;line-height:1.45!important}
.qlp-form p[data-id="gclid"],.qlp-form p[data-id="gbraid"],.qlp-form p[data-id="wbraid"],.qlp-form p[data-id="utm_source"],.qlp-form p[data-id="utm_medium"],.qlp-form p[data-id="utm_campaign"],.qlp-form p[data-id="utm_term"],.qlp-form p[data-id="landing_page"]{display:none!important}
.qlp-form .et_contact_bottom_container{float:none!important;display:block!important;margin-top:6px;text-align:left}
.qlp-form .et_pb_contact_submit,.qlp-form .et_pb_contact_submit:hover{width:100%;margin:0!important;font-family:var(--q-display)!important;font-weight:600!important;font-size:17px!important;border:0!important;border-radius:8px!important;padding:14px 20px!important;background:var(--q-teal)!important;color:#13232d!important}
.qlp-form .et_pb_contact_submit:after{display:none!important}
.qlp .block .wrap{padding-top:64px;padding-bottom:64px}
.qlp .alt{background:var(--q-surface);border-top:1px solid var(--q-line);border-bottom:1px solid var(--q-line)}
.qlp .block h2{font-size:clamp(26px,3vw,34px);font-weight:600;max-width:22em}
.qlp .intro{color:var(--q-muted);margin-top:12px;max-width:40em}
.qlp blockquote{margin:0;padding:0;border:0;font-style:normal}
.qlp .quotes{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;margin-top:30px}
.qlp .quotes blockquote{font-family:var(--q-display);font-size:19px;font-weight:500;line-height:1.4;padding-left:16px;border-left:3px solid var(--q-teal)}
.qlp .grid4{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px 36px;margin-top:30px}
.qlp .item{display:grid;grid-template-columns:44px minmax(0,1fr);gap:14px;align-items:start;padding-top:16px;padding-bottom:16px;border-top:1px solid var(--q-line)}
.qlp .ico{width:44px;height:44px;border-radius:10px;background:var(--q-paper);border:1px solid var(--q-line);display:grid;place-items:center;color:var(--q-teal-ink)}
.qlp .item h3{font-size:19px;font-weight:600}
.qlp .item p{color:var(--q-muted);margin-top:4px;font-size:16px}
.qlp .steps{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px;margin-top:32px}
.qlp .steps li{display:grid;gap:8px;align-content:start}
.qlp .steps .num{font-family:var(--q-display);font-size:13px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:var(--q-teal-ink)}
.qlp .steps h3{font-size:21px;font-weight:600}
.qlp .steps .meta{font-family:var(--q-mono);font-size:13px;color:var(--q-muted)}
.qlp .steps p{color:var(--q-muted);font-size:16px}
.qlp .why{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,.8fr);gap:48px;align-items:start}
.qlp .big{font-family:var(--q-display);font-size:clamp(22px,2.4vw,28px);font-weight:500;line-height:1.35;margin-top:18px;max-width:26em}
.qlp .facts{margin:0;border-top:2px solid var(--q-navy)}
.qlp .facts div{display:flex;justify-content:space-between;gap:16px;padding-top:12px;padding-bottom:12px;border-bottom:1px solid var(--q-line);font-size:16px}
.qlp .facts dt{color:var(--q-muted);font-weight:400}
.qlp .facts dd{margin:0;font-weight:700;text-align:right}
.qlp .proof{display:grid;grid-template-columns:96px minmax(0,1fr);gap:24px;align-items:center;margin-top:28px;max-width:760px}
.qlp .avatar{width:96px;height:96px;border-radius:50%;background:var(--q-navy);color:var(--q-on-navy);display:grid;place-items:center;font-family:var(--q-display);font-weight:600;font-size:30px}
.qlp .proof blockquote{font-family:var(--q-display);font-size:24px;font-weight:500;line-height:1.35}
.qlp .proof cite{display:block;margin-top:8px;font-style:normal;color:var(--q-muted);font-size:15px}
.qlp .price{margin-top:28px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px}
.qlp .pcard{background:var(--q-paper);border:1px solid var(--q-line);border-radius:12px;padding:24px;display:grid;gap:8px;align-content:start}
.qlp .pcard .label{font-family:var(--q-display);font-size:13px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:var(--q-teal-ink)}
.qlp .pcard .amt{font-family:var(--q-display);font-size:34px;font-weight:600}
.qlp .pcard .amt small{font-size:16px;font-weight:400;color:var(--q-muted)}
.qlp .pcard p{color:var(--q-muted);font-size:16px}
.qlp .faq{margin-top:26px;max-width:760px;border-top:1px solid var(--q-line)}
.qlp .faq details{border-bottom:1px solid var(--q-line);padding-top:16px;padding-bottom:16px}
.qlp .faq summary{cursor:pointer;font-family:var(--q-display);font-weight:500;font-size:18px;list-style:none;display:flex;justify-content:space-between;gap:16px}
.qlp .faq summary::-webkit-details-marker{display:none}
.qlp .faq summary:after{content:"+";color:var(--q-teal-ink);font-size:22px;line-height:1}
.qlp .faq details[open] summary:after{content:"–"}
.qlp .faq details p{color:var(--q-muted);margin-top:10px;max-width:40em}
.qlp .final{background:var(--q-navy);color:var(--q-on-navy)}
.qlp .final .wrap{padding-top:56px;padding-bottom:56px;display:flex;flex-wrap:wrap;gap:20px 40px;align-items:center;justify-content:space-between}
.qlp .final h2{font-size:clamp(24px,3vw,32px);font-weight:600;max-width:20em}
.qlp .final p{color:var(--q-on-navy-muted);margin-top:8px}
.qlp .foot{background:var(--q-navy-deep);color:var(--q-on-navy-muted);font-size:14px}
.qlp .foot .wrap{padding-top:24px;padding-bottom:24px;display:flex;flex-wrap:wrap;gap:8px 24px;justify-content:space-between}
.qlp .foot a{color:var(--q-on-navy-muted)}
.qlp .ty{max-width:640px;margin:0 auto;padding:72px 16px;text-align:center;display:grid;gap:16px;justify-items:center}
.qlp .ty h1{color:var(--q-ok);font-size:clamp(28px,4vw,40px)}
.qlp .ty p{color:var(--q-muted);font-size:18px}
@media (max-width:980px){.qlp-hero{padding:36px 0 44px!important}.qlp .why{grid-template-columns:minmax(0,1fr);gap:32px}.qlp .quotes,.qlp .steps,.qlp .price{grid-template-columns:minmax(0,1fr)}}
@media (max-width:640px){.qlp{font-size:16px}.qlp .grid4{grid-template-columns:minmax(0,1fr)}.qlp .block .wrap{padding-top:44px;padding-bottom:44px}.qlp .proof{grid-template-columns:minmax(0,1fr)}.qlp .phone span{display:none}.qlp-card{padding:22px!important}.qlp .mobile-cta{display:block;margin-top:24px}.qlp .log .row{white-space:normal}.qlp .log{font-size:12.5px}}
</style>
<div class="qlp">
<header class="top"><div class="wrap">
<a class="logo" href="https://qubik.com.au/">qubik <small>AI &amp; Automation</small></a>
<a class="phone" href="tel:+61732058938"><span>Talk to us</span>(07) 3205 8938</a>
</div></header>
</div>
```

### Code 2: Hero copy (Section B, left column, Code module)

```html
<div class="qlp">
<div class="eyebrow">Business process automation · Australia-wide</div>
<h1>Business process automation for growing Australian businesses</h1>
<p class="sub">We find the manual work costing you most, automate it inside the systems you already use, and show you the payback in dollars before you commit.</p>
<ul class="trust">
<li>Accountants since 2007</li>
<li>Xero partner since 2013</li>
<li>Fixed-fee assessment</li>
<li>Your data stays in your systems</li>
</ul>
<a class="btn mobile-cta" href="#book">Book a free 30&#8209;minute call</a>
<div class="log" aria-label="Example of an automated supplier invoice">
<div class="hd"><span>Example: one supplier invoice</span><span>Mon 09:14</span></div>
<div class="row"><span class="t">09:14:02</span><span>Invoice INV-20817 arrives by email (PDF)</span></div>
<div class="row"><span class="t">09:14:09</span><span>Read: supplier, 14 lines, A$18,442.60 inc GST</span></div>
<div class="row"><span class="t">09:14:12</span><span>Matched to purchase order PO-4471</span></div>
<div class="row"><span class="t">09:14:15</span><span class="flag">2 line prices differ from PO: sent for approval</span></div>
<div class="row"><span class="t">09:31:40</span><span class="done">Approved by Sam · posted to Xero</span></div>
<p class="cap">Illustrative example. Your team approves anything the system isn't sure about.</p>
</div>
</div>
```

### Code 3: Form heading (Section B, right column, Code module above the form)

```html
<div class="qlp">
<h2>Book a free 30&#8209;minute automation call</h2>
<p class="lead">Tell us a little about your business. We'll call within one business day.</p>
</div>
```

### Code 4: Form fine print (Section B, right column, Code module below the form)

```html
<div class="qlp">
<p class="fine">No obligation. We'll tell you honestly if automation isn't worth it for you.</p>
</div>
```

### Code 5: Page body, footer and form script (Section C, Fullwidth Code module)

```html
<div class="qlp">
<section class="block"><div class="wrap">
<h2>Sound familiar?</h2>
<div class="quotes">
<blockquote>"We type the same numbers into three different systems."</blockquote>
<blockquote>"Supplier invoices and orders take up someone's whole week."</blockquote>
<blockquote>"We only find out margins slipped when the month-end report lands."</blockquote>
</div>
</div></section>
<section class="block alt"><div class="wrap">
<h2>What we automate</h2>
<p class="intro">The repetitive back-office work that grows with every new customer and supplier.</p>
<div class="grid4">
<div class="item"><div class="ico" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2h9l5 5v15H6z"/><path d="M15 2v5h5M9 13h8M9 17h6"/></svg></div><div><h3>Supplier invoices and bills</h3><p>Read from the inbox, checked against purchase orders and posted to Xero. Exceptions go to a person.</p></div></div>
<div class="item"><div class="ico" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h12"/></svg></div><div><h3>Customer orders</h3><p>Orders that arrive by email or PDF are drafted straight into your system, ready for a quick check.</p></div></div>
<div class="item"><div class="ico" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg></div><div><h3>Reporting</h3><p>Margin, cash and stock numbers every week, without anyone building a spreadsheet.</p></div></div>
<div class="item"><div class="ico" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 5h16v11H8l-4 4z"/></svg></div><div><h3>Enquiries and documents</h3><p>AI agents that answer routine questions, sort documents and hand anything unusual to your team.</p></div></div>
</div>
</div></section>
<section class="block"><div class="wrap">
<h2>How it works</h2>
<ol class="steps">
<li><span class="num">Step 1</span><h3>Free 30-minute call</h3><span class="meta">This week · no cost</span><p>We hear how your business runs and tell you honestly whether automation is worth doing.</p></li>
<li><span class="num">Step 2</span><h3>Automation Readiness Assessment</h3><span class="meta">3 weeks · fixed fee</span><p>We map your processes, measure what the manual work costs, and give you a priced plan with the payback spelled out.</p></li>
<li><span class="num">Step 3</span><h3>Build and support</h3><span class="meta">Scoped in the assessment</span><p>We build the first automation inside your existing systems. Your team approves anything the system isn't sure about.</p></li>
</ol>
</div></section>
<section class="block alt"><div class="wrap why">
<div>
<h2>Why an accounting firm?</h2>
<p class="big">Most automation firms start with the technology. We start with your numbers: what each process costs you today, and what you'd save. We only build what pays back.</p>
</div>
<dl class="facts">
<div><dt>Helping Australian businesses since</dt><dd>2007</dd></div>
<div><dt>Xero partner since</dt><dd>2013</dd></div>
<div><dt>Best fit: annual revenue</dt><dd>A$3–10M</dd></div>
<div><dt>Best fit: team size</dt><dd>10–50 staff</dd></div>
<div><dt>Where</dt><dd>Brisbane · Australia-wide</dd></div>
</dl>
</div></section>
<section class="block"><div class="wrap">
<h2>From our clients</h2>
<div class="proof">
<div class="avatar" aria-hidden="true">DG</div>
<div>
<blockquote>"Dom has saved us more money than we've spent!"</blockquote>
<cite>Mike Wikes, Man Group, about Dominic Guinea, Qubik founder and CEO</cite>
</div>
</div>
</div></section>
<section class="block alt"><div class="wrap">
<h2>Pricing, upfront</h2>
<div class="price">
<div class="pcard">
<span class="label">Automation Readiness Assessment</span>
<span class="amt">A$3,500 <small>+ GST</small></span>
<p>Founding-client price for our first ten clients (A$7,500 after that). Credited in full if you go ahead with a build within 30 days.</p>
</div>
<div class="pcard">
<span class="label">Build</span>
<span class="amt">Fixed price <small>scoped in the assessment</small></span>
<p>Most first builds land between A$57,000 and A$90,000 + GST, depending on how many systems and processes are involved.</p>
</div>
</div>
</div></section>
<section class="block"><div class="wrap">
<h2>Questions we get asked</h2>
<div class="faq">
<details><summary>Do we need new software?</summary><p>Usually not. We build around Xero and the systems you already use, and only suggest a new tool where it clearly pays for itself.</p></details>
<details><summary>What do you need from us?</summary><p>Read-only access to your accounting system, a sample of recent invoices or orders, and about two hours of your team's time across the assessment.</p></details>
<details><summary>How long does a build take?</summary><p>Most first builds take six to ten weeks. The assessment gives you a timeline before you commit.</p></details>
<details><summary>Is our data safe?</summary><p>Your data stays in your own systems. We only access what the automation needs, and your team approves anything the system isn't sure about.</p></details>
<details><summary>Do you work outside Queensland?</summary><p>Yes. We're based in Brisbane and work with businesses across Australia, by video and in person where it helps.</p></details>
</div>
</div></section>
<section class="final"><div class="wrap">
<div>
<h2>See what's worth automating first</h2>
<p>A free 30-minute call, with no obligation.</p>
</div>
<a class="btn" href="#book">Book my free call</a>
</div></section>
<footer class="foot"><div class="wrap">
<span>Qubik Accounting · 18–22 Dixon Street, Strathpine QLD 4500</span>
<span><a href="tel:+61732058938">(07) 3205 8938</a> · <a href="https://qubik.com.au/privacy-policy/">Privacy policy</a></span>
</div></footer>
</div>
<script>
(function () {
  var KEYS = ['gclid', 'gbraid', 'wbraid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term'];
  var MAX_AGE = 90 * 24 * 60 * 60 * 1000;
  var params = new URLSearchParams(window.location.search);
  var here = window.location.href.split('#')[0];
  var saved = {};
  try { saved = JSON.parse(window.localStorage.getItem('qlp_attr') || '{}'); } catch (e) { saved = {}; }
  var fresh = KEYS.some(function (k) { return params.get(k); });
  if (fresh) {
    saved = { landing_page: here, ts: Date.now() };
    KEYS.forEach(function (k) { if (params.get(k)) { saved[k] = params.get(k); } });
    try { window.localStorage.setItem('qlp_attr', JSON.stringify(saved)); } catch (e) {}
  }
  if (saved.ts) { if (Date.now() - saved.ts > MAX_AGE) { saved = {}; } }
  if (!saved.landing_page) { saved.landing_page = here; }
  function fill() {
    KEYS.concat(['landing_page']).forEach(function (k) {
      var el = document.querySelector('[data-original_id="' + k + '"]');
      if (el) { if (saved[k]) { el.value = saved[k]; } }
    });
  }
  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', fill); } else { fill(); }
})();
</script>
```

### Code 6: Thank-you page (Fullwidth Code module)

Before pasting, replace `[CALENDAR LINK]` with the booking link, or delete the whole line containing it if there's no link yet.

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Rubik:wght@500;600;700&family=Lato:wght@400;700&display=swap">
<style>
:root{--q-navy:#2e4455;--q-navy-deep:#22333f;--q-teal:#7ebec5;--q-teal-ink:#2f7f88;--q-paper:#f4f8f8;--q-ink:#1d2c37;--q-muted:#566873;--q-on-navy:#f2f7f8;--q-on-navy-muted:#b8cbd1;--q-ok:#2f8a5b;--q-display:'Rubik','Helvetica Neue',Arial,sans-serif;--q-body:'Lato','Helvetica Neue',Arial,sans-serif}
body.page{background:var(--q-paper)}
.qlp{font-family:var(--q-body);font-size:17px;line-height:1.6;color:var(--q-ink)}
.qlp h1{font-family:var(--q-display);line-height:1.15;margin:0;padding:0}
.qlp p{margin:0;padding:0}
.qlp .wrap{max-width:1120px;margin:0 auto;padding-left:16px;padding-right:16px}
.qlp .top{background:var(--q-navy-deep);color:var(--q-on-navy)}
.qlp .top .wrap{display:flex;justify-content:space-between;align-items:center;gap:16px;padding-top:14px;padding-bottom:14px}
.qlp .logo{font-family:var(--q-display);font-weight:700;font-size:26px;letter-spacing:-.02em;color:var(--q-on-navy);text-decoration:none}
.qlp .logo small{font-weight:400;font-size:13px;color:var(--q-on-navy-muted);letter-spacing:.04em;margin-left:10px}
.qlp .phone{font-family:var(--q-display);font-weight:500;font-size:15px;color:var(--q-on-navy);text-decoration:none}
.qlp .ty{max-width:640px;margin:0 auto;padding:72px 16px 96px;text-align:center;display:grid;gap:18px;justify-items:center}
.qlp .ty h1{color:var(--q-ok);font-size:clamp(28px,4vw,40px);font-weight:600}
.qlp .ty p{color:var(--q-muted);font-size:18px}
.qlp .ty a{color:var(--q-teal-ink)}
.qlp .btn{font-family:var(--q-display);font-weight:600;font-size:17px;border-radius:8px;padding:14px 22px;background:var(--q-teal);color:#13232d!important;text-decoration:none;display:inline-block}
.qlp .foot{background:var(--q-navy-deep);color:var(--q-on-navy-muted);font-size:14px}
.qlp .foot .wrap{padding-top:24px;padding-bottom:24px}
</style>
<div class="qlp">
<header class="top"><div class="wrap">
<a class="logo" href="https://qubik.com.au/">qubik<small>AI &amp; Automation</small></a>
<a class="phone" href="tel:+61732058938">(07) 3205 8938</a>
</div></header>
<main class="ty">
<h1>Thanks, we've got your details</h1>
<p>We'll call you within one business day to set up your free 30-minute automation call.</p>
<a class="btn" href="[CALENDAR LINK]">Or pick a time now</a>
<p>Want to talk sooner? Call <a href="tel:+61732058938">(07) 3205 8938</a>.</p>
</main>
<footer class="foot"><div class="wrap">Qubik Accounting · 18–22 Dixon Street, Strathpine QLD 4500</div></footer>
</div>
```
