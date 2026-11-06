# Claude in Chrome prompt: replace the automation landing page with v2

## Before you paste it

1. **Back up the site** (or check that last night's backup exists).
2. **Get Qubik's sign-off on the v2 prototype** (`google-ads/landing-page-v2.html`), especially:
   - the "How pricing works" section: no dollar figures; builds offered as fixed price, phased, or monthly. Remove any model sales won't quote.
   - the trust facts: "Works best for 10–50 staff", "Based in Strathpine, QLD", "Australian-owned, Queensland-based".
3. **Fill in the blanks** in the prompt below:
   - `[FOUNDER NOTE]`: one or two sentences from Dominic, in his own words, about why Qubik does automation. If there's no approved note yet, write `none`.
   - `[DOMINIC PHOTO]`: the photo's file name in the WordPress Media Library, or `none` to keep the "DG" initials.
4. Log in to the WordPress admin in Chrome, open the Claude side panel, and paste **everything below the line**.

**What's different from v1:** the form now has three steps. Divi's own Contact Form can't do steps, so the page shows a custom three-step form and passes the answers to a hidden Divi Contact Form. Divi still sends the email and redirects to the thank-you page, exactly as now.

**Nothing changes on the live page until you say "go live".** v2 is built as a separate draft first.

---

You are going to replace the Google Ads landing page on the Qubik WordPress site (qubik.com.au, Divi theme) with a new version. I'm logged in to the WordPress admin in this browser.

## Ground rules
- The current page at `https://qubik.com.au/automation/` is live and receiving ad traffic. Do not edit it until Step 6, and only after I say "go live".
- Work only on the pages, Theme Builder template and cache setting named below. Do not touch other pages, menus, widgets or Theme Options.
- Do not install, update or deactivate any plugin or theme.
- If something on screen doesn't match these instructions, stop and tell me what you see instead of guessing.
- Paste the two code blocks in the Appendix exactly as written. Do not reformat them, add blank lines, or "improve" them. After pasting, check they saved in full (first and last lines match).

## Founder details (filled in by me)
- Founder note: `[FOUNDER NOTE]`
- Dominic photo: `[DOMINIC PHOTO]`

## Step 0: Check before you start, and report back
Tell me:
1. Whether the live page **Automation** (`/automation/`) and the page **Thank you** (`/automation/thank-you/`) exist, and that Thank you's parent is Automation.
2. On the live Automation page's Contact Form module: the email address(es) in Content → Email, whether Content → Spam Protection uses a spam protection service (reCAPTCHA), and whether Basic Captcha is off. Don't change anything.
3. Whether a Divi Theme Builder template is assigned to the Automation and Thank you pages (to hide the site header and footer).
4. Whether LiteSpeed Cache → Cache → Excludes → Do Not Cache URIs contains `/automation/`.
5. Whether a page with the slug `automation-v2` already exists.

Then continue unless something blocks you.

## Step 1: Create the v2 page (draft)
1. Pages → Add New. Title: **Automation v2**. Slug: **automation-v2**. Page Attributes → Template: **Blank Page**. Open in the Divi Builder and choose **Start Building** (blank).
2. Build three sections, top to bottom:

**Section A: Fullwidth section** (top and bottom padding 0)
- One **Fullwidth Code** module. Paste **Code 1: Styles, header and hero form**.

**Section B: Regular section** (top and bottom padding 0)
- Section → Advanced → CSS Class: `qlp-form-section`
- One row, one column, containing one **Contact Form** module, set up as in Step 2.
- This section is invisible on the page. It's the form that actually sends the email.

**Section C: Fullwidth section** (top and bottom padding 0)
- One **Fullwidth Code** module. Paste **Code 2: Page body, footer and scripts**.

3. **Founder card** (inside Code 2):
   - If the founder note above is not `none`, replace `[FOUNDER NOTE]` with that text, keeping the quote marks around it.
   - If it is `none`, delete this whole block from Code 2, and nothing else:
     ```html
           <div class="quote">
             <div class="founder">
               <div class="avatar" aria-hidden="true">DG</div>
               <div>
                 <p>"[FOUNDER NOTE]"</p>
                 <p class="name">Dominic Guinea, founder and CEO</p>
               </div>
             </div>
           </div>
     ```
   - If a Dominic photo is named above, find it in the Media Library, copy its file URL, and replace `<div class="avatar" aria-hidden="true">DG</div>` with `<img class="avatar" src="PHOTO-URL" alt="Dominic Guinea">`.
4. Save as draft.

## Step 2: The hidden Contact Form module (Section B)
Start from the live form so the email and spam settings carry over:
1. Open the live **Automation** page in the Divi Builder in another tab. Right-click its Contact Form module → **Copy Module**. Close that tab **without saving**.
2. In Automation v2, Section B, right-click the empty column → **Paste Module**.
3. If copy and paste doesn't work, add a new Contact Form module and copy these settings across by hand from the live form: Email, Redirect, Spam Protection.

Then change the pasted module as follows.

**Content → Fields:** the module must have exactly these 17 fields, in any order. **Every field is an Input Field, and none is required.** The custom form on the page does the checking, and a required or dropdown field here would block the submission without the visitor seeing why.
- For fields that already exist (`name`, `company`, `email`, `phone`, `revenue`, `staff`, `automate`, `timing`, `consent` and the hidden ones), keep the Field ID.
- Change Field Type to **Input Field** where it's a Select Dropdown, Email Field or Checkboxes.
- Set Required to **No**.

| Field ID | Title |
|---|---|
| `name` | Name |
| `company` | Company |
| `email` | Email |
| `phone` | Mobile |
| `revenue` | Annual revenue |
| `staff` | Staff |
| `automate` | Wants to automate |
| `timing` | Timing |
| `consent` | Consent |
| `gclid` | gclid |
| `gbraid` | gbraid |
| `wbraid` | wbraid |
| `utm_source` | utm_source |
| `utm_medium` | utm_medium |
| `utm_campaign` | utm_campaign |
| `utm_term` | utm_term |
| `landing_page` | landing_page |

**Check these settings (they should match the live form):**
- **Content → Email:** the same address(es) as the live form. Message Pattern: empty.
- **Content → Redirect:** Enable Redirect URL **Yes**, URL `https://qubik.com.au/automation/thank-you/`.
- **Content → Spam Protection:** Basic Captcha **No**. The spam protection service the same as the live form.
- **Advanced → CSS Class:** `qlp-divi-form`. If the pasted module still has `qlp-form` from v1, replace it.

Save as draft.

## Step 3: Theme Builder
Divi → Theme Builder. Open the template that hides the header and footer for the Automation pages (from Step 0). In its **Use On** settings, also tick **Automation v2**. Save. Don't change anything else in the template.

## Step 4: Stop for my review
Send me:
- the preview link for Automation v2;
- screenshots at desktop width and phone width;
- a confirmation that clicking "Next" on step 1 without choosing anything shows the message "Pick at least one…";
- anything that didn't go as described.

**Wait for me to say "test it".**

## Step 5: Test v2 before it replaces the live page
1. Publish **Automation v2** (it's at `/automation-v2/`, which no ad points to).
2. In LiteSpeed Cache → Cache → Excludes → Do Not Cache URIs, add `/automation-v2/` on its own line. Save, then Purge All.
3. Open `https://qubik.com.au/automation-v2/?gclid=TEST-V2&utm_source=google&utm_campaign=test` in a new tab and go through the form:
   1. Step 1: pick "Customer orders" and "Reporting and month-end", then Next.
   2. Step 2: any answers, then Next.
   3. Step 3: Name `Test Lead v2`, Company `Test – please ignore`, Email `test@example.com`, Mobile `0400 000 000`; tick consent; click "Book my free call".
4. Confirm the browser lands on `/automation/thank-you/`.
5. Ask me to confirm the test email arrived and shows all 17 fields, including `gclid: TEST-V2` and `automate: Customer orders, Reporting and month-end`.

If the browser does not reach the thank-you page within 15 seconds, the page will show "Sorry, something went wrong…". In that case, stop. Report what the browser console shows, and the hidden form's message (`document.querySelector('.qlp-divi-form .et-pb-contact-message').textContent`).

**Wait for me to say "go live".**

## Step 6: Go live (swap the pages)
Do these in order, without long pauses between them. The ads point to `/automation/`, so the gap between steps 1 and 3 should be as short as possible.
1. **Old page:** edit the live **Automation** page → change its slug to `automation-v1`, then set it to **Draft**. Update.
2. **Thank-you page:** edit **Thank you** → Page Attributes → Parent: **Automation v2**. Update. Its address will briefly read `/automation-v2/thank-you/`; that's expected.
3. **New page:** edit **Automation v2** → change the title to **Automation** and the slug to `automation`. Update. The thank-you page is now back at `/automation/thank-you/`.
4. Open `https://qubik.com.au/automation/thank-you/` and confirm it loads (not a 404).
5. **Cache:** in LiteSpeed's Do Not Cache URIs, check `/automation/` is still listed and remove the `/automation-v2/` line. Save, then Purge All.
6. **Theme Builder:** confirm the header/footer template still applies to Automation and Thank you, and untick Automation v1. Save.
7. **Final test:** repeat the Step 5 form test on `https://qubik.com.au/automation/?gclid=TEST-LIVE&utm_source=google`, with Name `Test Lead live`. Confirm the redirect, and ask me to confirm the email.

If anything in Step 6 fails, put things back: Automation v1 slug back to `automation` and Published; Thank you's parent back to it. Then tell me.

## Report back
List what you changed (pages, Theme Builder template, cache setting), the results of both tests, and anything you skipped or couldn't do. Keep the Automation v1 draft. Don't delete it.

---

## Appendix: code to paste

### Code 1: Styles, header and hero form (Section A, Fullwidth Code module)

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700&family=Lato:wght@400;700&family=IBM+Plex+Mono:wght@400;500&display=swap">
<style>
.qlp{--navy: #2e4455; --navy-deep: #22333f; --teal: #7ebec5; --teal-ink: #2f7f88; --teal-soft: #e6f2f3; --paper: #f4f8f8; --surface: #ffffff; --ink: #1d2c37; --muted: #566873; --line: #d5e1e3; --on-navy: #f2f7f8; --on-navy-muted: #b8cbd1; --ok: #2f8a5b; --flag: #b7791f; --note-bg: #fff6d9; --note-ink: #5e4a00; --font-display: 'Rubik', 'Helvetica Neue', Arial, sans-serif; --font-body: 'Lato', 'Helvetica Neue', Arial, sans-serif; --font-mono: 'IBM Plex Mono', ui-monospace, Menlo, monospace;}
.qlp *{box-sizing: border-box;}
.qlp [hidden]{display: none !important;}
.qlp{margin: 0; background: var(--paper); color: var(--ink); font-family: var(--font-body); font-size: 17px; line-height: 1.6;}
.qlp h1,.qlp h2,.qlp h3{font-family: var(--font-display); line-height: 1.15; text-wrap: balance; margin: 0;}
.qlp p{margin: 0;}
.qlp a{color: var(--teal-ink);}
.qlp :focus-visible{outline: 3px solid var(--teal); outline-offset: 2px;}
.qlp .wrap{max-width: 1120px; margin: 0 auto; padding-left: 16px; padding-right: 16px;}
.qlp .top{background: var(--navy-deep); color: var(--on-navy);}
.qlp .top .wrap{display: flex; justify-content: space-between; align-items: center; gap: 16px; padding-block: 14px;}
.qlp .logo{font-family: var(--font-display); font-weight: 700; font-size: 26px; letter-spacing: -0.02em; display: flex; align-items: baseline; gap: 10px; color: var(--on-navy); text-decoration: none;}
.qlp .logo small{font-weight: 400; font-size: 13px; color: var(--on-navy-muted); letter-spacing: 0.04em;}
.qlp .phone{font-family: var(--font-display); font-weight: 500; font-size: 15px; color: var(--on-navy); text-decoration: none;}
.qlp .phone span{color: var(--on-navy-muted); font-weight: 400; margin-right: 6px;}
.qlp .hero{background: var(--navy); color: var(--on-navy);}
.qlp .hero .wrap{display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr); gap: 48px; padding-block: 56px 64px; align-items: start;}
.qlp .eyebrow{font-family: var(--font-display); font-size: 13px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; color: var(--teal);}
.qlp .hero h1{font-size: clamp(32px, 4.4vw, 50px); font-weight: 600; margin-top: 14px; letter-spacing: -0.015em;}
.qlp .hero .sub{font-size: 19px; color: var(--on-navy-muted); margin-top: 18px; max-width: 32em;}
.qlp .trust{display: flex; flex-wrap: wrap; gap: 8px 22px; margin: 26px 0 0; padding: 0; list-style: none; font-size: 15px;}
.qlp .trust li{display: flex; gap: 8px; align-items: center;}
.qlp .trust li::before{content: ""; width: 7px; height: 7px; border-radius: 50%; background: var(--teal); flex: none;}
.qlp .hero-points{margin-top: 30px; display: grid; gap: 10px; padding: 0; list-style: none; max-width: 34em;}
.qlp .hero-points li{display: grid; grid-template-columns: 24px minmax(0, 1fr); gap: 10px; color: var(--on-navy);}
.qlp .hero-points svg{color: var(--teal); margin-top: 3px;}
.qlp .formcard{background: var(--surface); color: var(--ink); border-radius: 12px; padding: 28px; box-shadow: 0 18px 40px rgba(10, 25, 35, 0.28); scroll-margin-top: 16px;}
.qlp .progress{display: flex; align-items: center; gap: 10px; font-size: 13px; color: var(--muted); font-family: var(--font-display); font-weight: 500;}
.qlp .bar{flex: 1; height: 6px; background: var(--line); border-radius: 3px; overflow: hidden;}
.qlp .bar i{display: block; height: 100%; width: 33.3%; background: var(--teal-ink); border-radius: 3px; transition: width .3s ease;}
.qlp .formcard h2{font-size: 23px; font-weight: 600; margin-top: 14px;}
.qlp .formcard .lead{color: var(--muted); font-size: 15px; margin-top: 6px;}
.qlp .step{display: grid; gap: 14px; margin-top: 18px;}
.qlp .chips{display: grid; grid-template-columns: 1fr 1fr; gap: 10px;}
.qlp .chip{position: relative;}
.qlp .chip input{position: absolute; opacity: 0; inset: 0; width: 100%; height: 100%; margin: 0; cursor: pointer;}
.qlp .chip span{display: flex; align-items: center; min-height: 52px; padding: 10px 12px; border: 1px solid var(--line); border-radius: 8px; background: var(--paper); font-size: 15px; line-height: 1.3; font-weight: 700; transition: border-color .15s, background .15s;}
.qlp .chip span::before{content: ""; width: 18px; height: 18px; border: 2px solid var(--line); border-radius: 5px; margin-right: 10px; flex: none; background: var(--surface);}
.qlp .chip input:checked + span{border-color: var(--teal-ink); background: var(--teal-soft);}
.qlp .chip input:checked + span::before{background: var(--teal-ink); border-color: var(--teal-ink); box-shadow: inset 0 0 0 3px var(--surface);}
.qlp .chip input:focus-visible + span{outline: 3px solid var(--teal); outline-offset: 2px;}
.qlp .two{display: grid; grid-template-columns: 1fr 1fr; gap: 14px;}
.qlp label.f{display: grid; gap: 5px; font-size: 14px; font-weight: 700;}
.qlp input:not([type=checkbox]),.qlp select{font: inherit; font-size: 16px; font-weight: 400; color: var(--ink); background: var(--paper); border: 1px solid var(--line); border-radius: 7px; padding: 10px 12px; width: 100%; min-width: 0;}
.qlp input:focus,.qlp select:focus{border-color: var(--teal-ink); outline: none; box-shadow: 0 0 0 3px rgba(126,190,197,0.35);}
.qlp .consent{display: flex; gap: 10px; align-items: flex-start; font-size: 13px; color: var(--muted); line-height: 1.45;}
.qlp .consent input{width: 18px; height: 18px; margin-top: 2px; flex: none;}
.qlp .actions{display: flex; gap: 10px; align-items: center;}
.qlp .btn{font-family: var(--font-display); font-weight: 600; font-size: 17px; border: 0; border-radius: 8px; padding: 14px 20px; cursor: pointer; background: var(--teal); color: #13232d; text-decoration: none; display: inline-block; text-align: center;}
.qlp .btn:hover{filter: brightness(1.05);}
.qlp .btn.full{flex: 1;}
.qlp .btn.ghost{background: transparent; color: var(--muted); padding-inline: 8px; font-weight: 500; font-size: 15px;}
.qlp .btn.line{background: transparent; color: var(--on-navy); border: 1px solid var(--on-navy-muted);}
.qlp .fine{font-size: 13px; color: var(--muted); text-align: center;}
.qlp .err{font-size: 13px; color: #b3261e;}
.qlp .reassure{display: flex; flex-wrap: wrap; justify-content: center; gap: 4px 14px; margin-top: 14px; font-size: 13px; color: var(--muted);}
.qlp .thanks{text-align: center; padding: 18px 4px; display: grid; gap: 10px;}
.qlp .thanks h2{font-size: 22px; color: var(--ok);}
.qlp section.block .wrap{padding-block: 72px;}
.qlp section.alt{background: var(--surface); border-block: 1px solid var(--line);}
.qlp .kicker{font-family: var(--font-display); font-size: 13px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; color: var(--teal-ink);}
.qlp .block h2{font-size: clamp(26px, 3vw, 36px); font-weight: 600; max-width: 22em; margin-top: 8px;}
.qlp .intro{color: var(--muted); margin-top: 14px; max-width: 40em; font-size: 18px;}
.qlp .explain{display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 48px; align-items: start;}
.qlp .explain .plain{font-size: 19px; margin-top: 18px; max-width: 30em;}
.qlp .explain .plain + .plain{margin-top: 14px; color: var(--muted); font-size: 17px;}
.qlp .flow{display: grid; gap: 12px;}
.qlp .flow .stage{display: grid; grid-template-columns: 48px minmax(0, 1fr); gap: 16px; align-items: start; background: var(--surface); border: 1px solid var(--line); border-radius: 12px; padding: 16px 18px;}
.qlp .flow .n{width: 48px; height: 48px; border-radius: 50%; background: var(--teal-soft); color: var(--teal-ink); display: grid; place-items: center;}
.qlp .flow h3{font-size: 19px; font-weight: 600;}
.qlp .flow p{color: var(--muted); font-size: 15px; margin-top: 2px;}
.qlp .flow .stage.person{background: var(--navy); border-color: var(--navy); color: var(--on-navy);}
.qlp .flow .stage.person p{color: var(--on-navy-muted);}
.qlp .flow .stage.person .n{background: rgba(126,190,197,.18); color: var(--teal);}
.qlp .ba{margin-top: 34px; display: grid; gap: 14px;}
.qlp .ba-row{display: grid; grid-template-columns: 200px minmax(0, 1fr) minmax(0, 1fr); gap: 0; border: 1px solid var(--line); border-radius: 12px; overflow: hidden; background: var(--surface);}
.qlp .ba-row > div{padding: 18px 20px;}
.qlp .ba-row .what{background: var(--navy); color: var(--on-navy); font-family: var(--font-display); font-weight: 600; font-size: 18px; display: flex; align-items: center;}
.qlp .ba-row .lbl{display: block; font-family: var(--font-display); font-size: 12px; font-weight: 500; letter-spacing: .1em; text-transform: uppercase; margin-bottom: 4px;}
.qlp .ba-row .before .lbl{color: var(--muted);}
.qlp .ba-row .after{background: var(--teal-soft);}
.qlp .ba-row .after .lbl{color: var(--teal-ink);}
.qlp .ba-row .before p{color: var(--muted);}
.qlp .ba-head{display: grid; grid-template-columns: 200px minmax(0, 1fr) minmax(0, 1fr); padding: 0 20px; font-family: var(--font-display); font-size: 13px; font-weight: 500; letter-spacing: .1em; text-transform: uppercase; color: var(--muted);}
.qlp .ba-head span:first-child{visibility: hidden;}
.qlp .log{margin-top: 28px; background: var(--navy-deep); color: var(--on-navy); border: 1px solid rgba(126,190,197,0.35); border-radius: 10px; padding: 16px 18px; font-family: var(--font-mono); font-size: 13.5px; line-height: 1.75; font-variant-numeric: tabular-nums; overflow-x: auto;}
.qlp .log .hd{display: flex; justify-content: space-between; gap: 12px; color: var(--on-navy-muted); font-size: 12px; letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 6px;}
.qlp .log .row{display: grid; grid-template-columns: 64px minmax(0, 1fr); gap: 10px; white-space: nowrap;}
.qlp .log .t{color: var(--on-navy-muted);}
.qlp .log .done{color: var(--teal);}
.qlp .log .flag{color: #f2c46d;}
.qlp .log .cap{margin-top: 8px; font-family: var(--font-body); font-size: 13px; color: var(--on-navy-muted); white-space: normal;}
.qlp .ready{display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 48px; align-items: start;}
.qlp .checks{list-style: none; padding: 0; margin: 0; display: grid; gap: 12px;}
.qlp .checks li{display: grid; grid-template-columns: 28px minmax(0, 1fr); gap: 12px; background: var(--paper); border: 1px solid var(--line); border-radius: 10px; padding: 14px 16px;}
.qlp .checks svg{color: var(--teal-ink); margin-top: 2px;}
.qlp .notsure{margin-top: 22px; padding: 18px 20px; border-left: 3px solid var(--teal); background: var(--teal-soft); border-radius: 0 10px 10px 0;}
.qlp .notsure strong{font-family: var(--font-display);}
.qlp .myths{margin-top: 32px; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px;}
.qlp .myth{background: var(--surface); border: 1px solid var(--line); border-radius: 12px; padding: 22px;}
.qlp .myth h3{font-size: 19px; font-weight: 600;}
.qlp .myth h3 s{text-decoration-color: var(--teal-ink); text-decoration-thickness: 2px; color: var(--muted); font-weight: 500;}
.qlp .myth p{color: var(--muted); margin-top: 8px; font-size: 16px;}
.qlp .why{display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr); gap: 48px; align-items: start;}
.qlp .why .big{font-family: var(--font-display); font-size: clamp(22px, 2.4vw, 28px); font-weight: 500; line-height: 1.35; margin-top: 18px; max-width: 26em;}
.qlp .facts{margin: 0; border-top: 2px solid var(--navy);}
.qlp .facts div{display: flex; justify-content: space-between; gap: 16px; padding-block: 12px; border-bottom: 1px solid var(--line); font-size: 16px;}
.qlp .facts dt{color: var(--muted);}
.qlp .facts dd{margin: 0; font-weight: 700; text-align: right;}
.qlp .steps{list-style: none; padding: 0; margin: 34px 0 0; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 0; counter-reset: s; border-top: 2px solid var(--navy);}
.qlp .steps li{counter-increment: s; padding: 18px 20px 0 0; display: grid; gap: 8px; align-content: start;}
.qlp .steps li::before{content: "Step " counter(s); font-family: var(--font-display); font-size: 13px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: var(--teal-ink);}
.qlp .steps h3{font-size: 20px; font-weight: 600;}
.qlp .steps p{color: var(--muted); font-size: 16px;}
.qlp .callbox{margin-top: 40px; display: grid; grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr); gap: 32px; align-items: center; background: var(--navy); color: var(--on-navy); border-radius: 14px; padding: 32px;}
.qlp .callbox h3{font-size: 24px; font-weight: 600;}
.qlp .callbox > div > p{color: var(--on-navy-muted); margin-top: 8px;}
.qlp .callbox ul{list-style: none; padding: 0; margin: 0; display: grid; gap: 10px;}
.qlp .callbox li{display: grid; grid-template-columns: 24px minmax(0, 1fr); gap: 10px;}
.qlp .callbox li svg{color: var(--teal); margin-top: 3px;}
.qlp .callbox .btn{margin-top: 18px;}
.qlp .pricing{margin-top: 32px; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px;}
.qlp .pcard{background: var(--paper); border: 1px solid var(--line); border-radius: 12px; padding: 24px; display: grid; gap: 10px; align-content: start;}
.qlp .pcard .label{font-family: var(--font-display); font-size: 13px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; color: var(--teal-ink);}
.qlp .pcard h3{font-size: 22px; font-weight: 600;}
.qlp .pcard p{color: var(--muted); font-size: 16px;}
.qlp .pcard ul{margin: 0; padding-left: 18px; color: var(--muted); font-size: 16px; display: grid; gap: 4px;}
.qlp .drivers{margin-top: 24px; display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 18px;}
.qlp .drivers > div{border-top: 1px solid var(--line); padding-top: 16px;}
.qlp .drivers h3{font-size: 18px; font-weight: 600;}
.qlp .drivers ul{margin: 8px 0 0; padding-left: 18px; color: var(--muted); display: grid; gap: 4px; font-size: 16px;}
.qlp .promise{margin-top: 24px; font-family: var(--font-display); font-size: 20px; font-weight: 500; display: flex; gap: 12px; align-items: center;}
.qlp .promise svg{color: var(--ok); flex: none;}
.qlp .proof-grid{margin-top: 32px; display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 24px; align-items: stretch;}
.qlp .quote{background: var(--surface); border: 1px solid var(--line); border-radius: 12px; padding: 26px; display: grid; gap: 14px; align-content: start;}
.qlp .quote blockquote{margin: 0; font-family: var(--font-display); font-size: 22px; font-weight: 500; line-height: 1.35;}
.qlp .quote cite{font-style: normal; color: var(--muted); font-size: 15px;}
.qlp .founder{display: grid; grid-template-columns: 88px minmax(0, 1fr); gap: 18px; align-items: start;}
.qlp .avatar{width: 88px; height: 88px; border-radius: 50%; background: var(--navy); color: var(--on-navy); display: grid; place-items: center; font-family: var(--font-display); font-weight: 600; font-size: 28px;}
.qlp .founder p{color: var(--muted);}
.qlp .founder .name{color: var(--ink); font-family: var(--font-display); font-weight: 600; margin-top: 10px;}
.qlp .badges{margin-top: 24px; display: flex; flex-wrap: wrap; gap: 12px;}
.qlp .badge{display: flex; gap: 10px; align-items: center; background: var(--surface); border: 1px solid var(--line); border-radius: 999px; padding: 8px 16px 8px 10px; font-size: 15px; font-weight: 700;}
.qlp .badge i{width: 28px; height: 28px; border-radius: 50%; background: var(--teal-soft); color: var(--teal-ink); display: grid; place-items: center; font-style: normal;}
.qlp .case{margin-top: 24px; padding: 22px; color: var(--muted);}
.qlp .faq{margin-top: 26px; max-width: 800px; border-top: 1px solid var(--line);}
.qlp .faq details{border-bottom: 1px solid var(--line); padding-block: 16px;}
.qlp .faq summary{cursor: pointer; font-family: var(--font-display); font-weight: 500; font-size: 18px; list-style: none; display: flex; justify-content: space-between; gap: 16px;}
.qlp .faq summary::-webkit-details-marker{display: none;}
.qlp .faq summary::after{content: "+"; color: var(--teal-ink); font-size: 22px; line-height: 1;}
.qlp .faq details[open] summary::after{content: "–";}
.qlp .faq details p{color: var(--muted); margin-top: 10px; max-width: 42em;}
.qlp .final{background: var(--navy); color: var(--on-navy);}
.qlp .final .wrap{padding-block: 60px; display: flex; flex-wrap: wrap; gap: 20px 40px; align-items: center; justify-content: space-between;}
.qlp .final h2{font-size: clamp(24px, 3vw, 34px); font-weight: 600; max-width: 20em;}
.qlp .final p{color: var(--on-navy-muted); margin-top: 8px;}
.qlp .final .ctas{display: flex; flex-wrap: wrap; gap: 12px;}
.qlp footer{background: var(--navy-deep); color: var(--on-navy-muted); font-size: 14px;}
.qlp footer .wrap{padding-block: 24px; display: flex; flex-wrap: wrap; gap: 8px 24px; justify-content: space-between;}
.qlp footer a{color: var(--on-navy-muted);}
.qlp .sticky{display: none;}
@media (max-width: 960px){.qlp .hero .wrap,.qlp .why,.qlp .explain,.qlp .ready,.qlp .callbox,.qlp .proof-grid{grid-template-columns: minmax(0, 1fr); gap: 32px;}.qlp .steps{grid-template-columns: repeat(2, minmax(0, 1fr)); row-gap: 24px;}.qlp .pricing{grid-template-columns: minmax(0, 1fr);}.qlp .ba-head{display: none;}.qlp .ba-row{grid-template-columns: minmax(0, 1fr);}.qlp .ba-row .what{padding-block: 12px;}}
@media (max-width: 640px){.qlp{font-size: 16px;}.qlp .hero .wrap{padding-block: 36px 44px;}.qlp section.block .wrap{padding-block: 48px;}.qlp .two,.qlp .myths,.qlp .drivers,.qlp .chips{grid-template-columns: minmax(0, 1fr);}.qlp .steps{grid-template-columns: minmax(0, 1fr);}.qlp .phone span{display: none;}.qlp .formcard,.qlp .callbox{padding: 22px;}.qlp .log .row{white-space: normal;}.qlp .founder{grid-template-columns: minmax(0, 1fr);}.qlp .sticky{display: grid; grid-template-columns: 1fr 1.6fr; gap: 10px; position: fixed; left: 0; right: 0; bottom: 0; z-index: 20; padding: 10px 16px calc(10px + env(safe-area-inset-bottom, 0px)); background: var(--surface); border-top: 1px solid var(--line); box-shadow: 0 -6px 18px rgba(10,25,35,.12); transform: translateY(110%); transition: transform .25s ease;}.qlp .sticky.show{transform: none;}.qlp .sticky .btn{padding: 12px 10px; font-size: 16px;}.qlp .sticky .call{background: var(--navy); color: var(--on-navy);}}
@media (prefers-reduced-motion: reduce){.qlp .bar i,.qlp .sticky{transition: none;}}
body.page{background:#f4f8f8}
.qlp p,.qlp li{padding:0}
.qlp ul,.qlp ol{list-style:none;padding:0}
.qlp .pcard ul,.qlp .drivers ul{list-style:disc;padding-left:18px}
.qlp blockquote{margin:0;padding:0;border:0;font-style:normal}
.qlp h1,.qlp h2,.qlp h3{padding-bottom:0;color:inherit}
.qlp .formcard h2,.qlp .myth h3,.qlp .pcard h3,.qlp .drivers h3,.qlp .flow .stage:not(.person) h3,.qlp .steps h3,.qlp .block h2{color:var(--ink)}
.qlp .hero h1{color:var(--on-navy)}
.qlp fieldset{border:0;padding:0;margin:18px 0 0}
.qlp legend{padding:0}
.qlp .step h2{margin:0}
.qlp .step .lead{margin-top:-6px}
.qlp .status{font-size:14px;color:var(--muted);text-align:center}
.qlp img.avatar{object-fit:cover;padding:0}
.qlp-form-section{padding:0!important;height:0;overflow:hidden}
.qlp-divi-form{position:absolute!important;left:-10000px!important;width:600px}
</style>
<div class="qlp">
<header class="top">
  <div class="wrap">
    <a class="logo" href="https://qubik.com.au/">qubik <small>AI &amp; Automation</small></a>
    <a class="phone" href="tel:+61732058938"><span>Talk to us</span>(07) 3205 8938</a>
  </div>
</header>
<section class="hero">
  <div class="wrap">
    <div>
      <div class="eyebrow">Business process automation · Australia-wide</div>
      <h1>Business process automation for growing Australian businesses</h1>
      <p class="sub">Hand the repetitive copying, checking and chasing to software that works inside the systems you already use, so your team can get on with the work that needs them.</p>
      <ul class="trust">
        <li>Accountants since 2007</li>
        <li>Xero partner since 2013</li>
        <li>Your data stays in your systems</li>
      </ul>
      <ul class="hero-points">
        <li><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg><span>No new software for your team to learn</span></li>
        <li><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg><span>Start with one process and see it pay back before doing more</span></li>
        <li><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg><span>A person always approves anything the system isn't sure about</span></li>
      </ul>
    </div>
    <div class="formcard" id="book">
      <form id="qlp-lead" novalidate>
        <div class="progress" aria-live="polite"><span id="step-label">Step 1 of 3</span><div class="bar" aria-hidden="true"><i id="bar"></i></div></div>
        <fieldset class="step" data-step="1">
          <legend><h2>What's taking up your team's time?</h2></legend>
          <p class="lead">Pick any that apply. It helps us prepare for your free 30&#8209;minute call.</p>
          <div class="chips">
            <label class="chip"><input type="checkbox" name="automate" value="Supplier invoices and bills"><span>Supplier invoices and bills</span></label>
            <label class="chip"><input type="checkbox" name="automate" value="Customer orders"><span>Customer orders</span></label>
            <label class="chip"><input type="checkbox" name="automate" value="Reporting and month-end"><span>Reporting and month&#8209;end</span></label>
            <label class="chip"><input type="checkbox" name="automate" value="Customer enquiries"><span>Customer enquiries</span></label>
            <label class="chip"><input type="checkbox" name="automate" value="Typing data between systems"><span>Typing data between systems</span></label>
            <label class="chip"><input type="checkbox" name="automate" value="Not sure yet"><span>Not sure yet</span></label>
          </div>
          <p class="err" data-err hidden>Pick at least one, or "Not sure yet".</p>
          <button class="btn" type="button" data-next>Next</button>
        </fieldset>
        <fieldset class="step" data-step="2" hidden>
          <legend><h2>Tell us about your business</h2></legend>
          <p class="lead">So we can bring relevant examples to the call.</p>
          <div class="two">
            <label class="f" for="f-staff">Staff
              <select id="f-staff" name="staff" required>
                <option value="">Select</option><option>Under 10</option><option>10–25</option><option>26–50</option><option>50+</option>
              </select></label>
            <label class="f" for="f-rev">Annual revenue
              <select id="f-rev" name="revenue" required>
                <option value="">Select</option><option>Under A$2M</option><option>A$2–5M</option><option>A$5–10M</option><option>Over A$10M</option>
              </select></label>
          </div>
          <label class="f" for="f-when">When would you like this sorted?
            <select id="f-when" name="timing" required>
              <option value="">Select</option><option>This quarter</option><option>Within 6 months</option><option>Just exploring for now</option>
            </select></label>
          <p class="err" data-err hidden>Please answer all three.</p>
          <div class="actions"><button class="btn ghost" type="button" data-back>Back</button><button class="btn full" type="button" data-next>Next</button></div>
        </fieldset>
        <fieldset class="step" data-step="3" hidden>
          <legend><h2>Where should we call you?</h2></legend>
          <p class="lead">We'll call to set up a time that suits you.</p>
          <div class="two">
            <label class="f" for="f-name">Name<input id="f-name" name="name" autocomplete="name" required></label>
            <label class="f" for="f-company">Company<input id="f-company" name="company" autocomplete="organization" required></label>
          </div>
          <div class="two">
            <label class="f" for="f-email">Work email<input id="f-email" name="email" type="email" autocomplete="email" required></label>
            <label class="f" for="f-phone">Mobile<input id="f-phone" name="phone" type="tel" autocomplete="tel" required></label>
          </div>
          <label class="consent" for="f-consent"><input id="f-consent" name="consent" type="checkbox" required> I agree to Qubik contacting me by phone, email or SMS about this enquiry. I can opt out at any time.</label>
          <p class="err" data-err hidden>Please fill in every field and tick the box.</p>
          <div class="actions"><button class="btn ghost" type="button" data-back>Back</button><button class="btn full" type="submit" id="qlp-submit">Book my free call</button></div>
        </fieldset>
      </form>
      <p class="status" id="qlp-status" role="status" hidden></p>
      <div class="reassure" id="reassure"><span>Free 30&#8209;minute call</span><span>No obligation</span><span>We'll tell you honestly if it's not worth it</span></div>
    </div>
  </div>
</section>
</div>
```

### Code 2: Page body, footer and scripts (Section C, Fullwidth Code module)

```html
<div class="qlp">
<section class="block">
  <div class="wrap explain">
    <div>
      <div class="kicker">In plain English</div>
      <h2>What is business process automation?</h2>
      <p class="plain">Most businesses have jobs that follow the same steps every time: open the email, type the invoice into Xero, check it against the order, chase someone if it doesn't match.</p>
      <p class="plain">Automation is software that does those steps for you, inside the systems you already use. It works around the clock, doesn't get bored, and doesn't make typing mistakes. Your team stays in charge.</p>
    </div>
    <div class="flow" aria-label="How automation handles a task">
      <div class="stage"><div class="n"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 6h16v12H4z"/><path d="M4 7l8 6 8-6"/></svg></div><div><h3>It reads</h3><p>Emails, PDFs, forms and spreadsheets, the way a person would.</p></div></div>
      <div class="stage"><div class="n"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 11l3 3 8-8"/><path d="M20 12v7H4V5h11"/></svg></div><div><h3>It checks</h3><p>Against your orders, price lists and rules.</p></div></div>
      <div class="stage"><div class="n"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></div><div><h3>It acts</h3><p>Posts to Xero, updates your systems, sends the email or the report.</p></div></div>
      <div class="stage person"><div class="n"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg></div><div><h3>And asks a person when it isn't sure</h3><p>Anything unusual goes to your team to decide, with the details attached.</p></div></div>
    </div>
  </div>
</section>
<section class="block alt">
  <div class="wrap">
    <div class="kicker">What changes day to day</div>
    <h2>The same jobs, without the manual work</h2>
    <p class="intro">A few of the processes we see most often in growing businesses. Yours might look different, and that's what the call is for.</p>
    <div class="ba">
      <div class="ba-head" aria-hidden="true"><span>Process</span><span>Today</span><span>With automation</span></div>
      <div class="ba-row"><div class="what">Supplier invoices</div><div class="before"><span class="lbl">Today</span><p>Someone opens each email, types the invoice into Xero and checks it against the order.</p></div><div class="after"><span class="lbl">With automation</span><p>Invoices are read as they arrive, matched to the order and posted. Only mismatches reach a person.</p></div></div>
      <div class="ba-row"><div class="what">Customer orders</div><div class="before"><span class="lbl">Today</span><p>Orders arrive by email or PDF and are re-keyed into your system, line by line.</p></div><div class="after"><span class="lbl">With automation</span><p>Orders are drafted into your system automatically, ready for a quick check and approval.</p></div></div>
      <div class="ba-row"><div class="what">Month-end reporting</div><div class="before"><span class="lbl">Today</span><p>Someone spends days exporting, copying and formatting spreadsheets.</p></div><div class="after"><span class="lbl">With automation</span><p>Margin, cash and stock numbers update themselves every week, so problems show up early.</p></div></div>
      <div class="ba-row"><div class="what">Customer enquiries</div><div class="before"><span class="lbl">Today</span><p>The same questions answered by hand, every day, often by your busiest people.</p></div><div class="after"><span class="lbl">With automation</span><p>Routine questions are answered straight away. Anything unusual goes to your team.</p></div></div>
    </div>
    <div class="log" aria-label="Example of an automated supplier invoice">
      <div class="hd"><span>Example: one supplier invoice, start to finish</span><span>Mon 09:14</span></div>
      <div class="row"><span class="t">09:14:02</span><span>Invoice INV-20817 arrives by email (PDF)</span></div>
      <div class="row"><span class="t">09:14:09</span><span>Read: supplier, 14 lines, A$18,442.60 inc GST</span></div>
      <div class="row"><span class="t">09:14:12</span><span>Matched to purchase order PO-4471</span></div>
      <div class="row"><span class="t">09:14:15</span><span class="flag">2 line prices differ from PO: sent for approval</span></div>
      <div class="row"><span class="t">09:31:40</span><span class="done">Approved by Sam · posted to Xero</span></div>
      <p class="cap">Illustrative example. Your team approves anything the system isn't sure about.</p>
    </div>
  </div>
</section>
<section class="block">
  <div class="wrap ready">
    <div>
      <div class="kicker">Is it right for you?</div>
      <h2>Signs your business is ready for automation</h2>
      <p class="intro">You don't need a tech team or a big budget to start. Most of our conversations begin with one of these.</p>
      <div class="notsure"><strong>Not sure if any of this applies?</strong> That's exactly what the free call is for. We'll tell you honestly whether automation is worth it for you.</div>
    </div>
    <ul class="checks">
      <li><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg><span>Someone spends hours a week typing the same information into different systems.</span></li>
      <li><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg><span>Invoices, orders or reports pile up when one person is away.</span></li>
      <li><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg><span>You're hiring admin staff just to keep up with growth.</span></li>
      <li><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg><span>You only find out about margin, cash or stock problems at month-end.</span></li>
      <li><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg><span>Your systems don't talk to each other, so spreadsheets fill the gaps.</span></li>
    </ul>
  </div>
</section>
<section class="block alt">
  <div class="wrap">
    <div class="kicker">Common worries</div>
    <h2>What automation isn't</h2>
    <div class="myths">
      <div class="myth"><h3><s>New software to learn</s></h3><p>We build inside Xero and the tools you already use. Your team keeps working the way they do now, with less typing.</p></div>
      <div class="myth"><h3><s>Replacing your team</s></h3><p>It takes the repetitive work off their plate so they can spend time on customers, suppliers and decisions.</p></div>
      <div class="myth"><h3><s>A chatbot guessing answers</s></h3><p>It follows your rules. Anything uncertain is sent to a person, with the details attached.</p></div>
      <div class="myth"><h3><s>A big-bang IT project</s></h3><p>Most businesses start with one process, see the payback, and add more when they're ready.</p></div>
    </div>
  </div>
</section>
<section class="block">
  <div class="wrap why">
    <div>
      <div class="kicker">Why Qubik</div>
      <h2>Automation, scoped by accountants</h2>
      <p class="big">Most automation firms start with the technology. We start with your numbers: what each process costs you today, and what you'd save. We only recommend building what pays back.</p>
    </div>
    <dl class="facts">
      <div><dt>Helping Australian businesses since</dt><dd>2007</dd></div>
      <div><dt>Xero partner since</dt><dd>2013</dd></div>
      <div><dt>Works best for</dt><dd>10–50 staff</dd></div>
      <div><dt>Based in</dt><dd>Strathpine, QLD</dd></div>
      <div><dt>Working with</dt><dd>Businesses Australia-wide</dd></div>
    </dl>
  </div>
</section>
<section class="block alt">
  <div class="wrap">
    <div class="kicker">How it works</div>
    <h2>Start small, prove it pays, then grow</h2>
    <ol class="steps">
      <li><h3>Free 30-minute call</h3><p>We listen to how your business runs and where the time goes.</p></li>
      <li><h3>Assessment</h3><p>We map the processes worth automating, measure what they cost you today, and give you a plan with the payback in dollars.</p></li>
      <li><h3>Build</h3><p>We automate the first process inside your existing systems and test it on your real data, with your team.</p></li>
      <li><h3>Support and grow</h3><p>We keep it running as your business changes, and add the next process when you're ready.</p></li>
    </ol>
    <div class="callbox">
      <div>
        <h3>What you'll get from the free call</h3>
        <p>Thirty minutes with someone who understands both the numbers and the technology.</p>
        <a class="btn" href="#book">Book my free call</a>
      </div>
      <ul>
        <li><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg><span>An honest view of whether automation is worth it for your business</span></li>
        <li><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg><span>The two or three processes most likely to pay back first</span></li>
        <li><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg><span>A rough idea of what it would involve, and what it depends on</span></li>
        <li><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg><span>No obligation, and no hard sell</span></li>
      </ul>
    </div>
  </div>
</section>
<section class="block">
  <div class="wrap" id="pricing-anchor">
    <div class="kicker">Pricing</div>
    <h2>How pricing works</h2>
    <p class="intro">Every business runs differently, so we don't sell packages. We work out the right approach with you, and agree the price before any work starts.</p>
    <div class="pricing">
      <div class="pcard"><span class="label">Assessment</span><h3>Fixed fee, agreed upfront</h3><p>We map your processes and show you the payback in dollars. If you go ahead with a build, the fee is credited towards it.</p></div>
      <div class="pcard"><span class="label">Build</span><h3>Priced the way that suits you</h3><ul><li>a fixed project price</li><li>staged in phases</li><li>or spread as a monthly fee</li></ul></div>
      <div class="pcard"><span class="label">Ongoing support</span><h3>Optional, monthly</h3><p>Keeps your automations running and up to date as your business, suppliers and systems change.</p></div>
    </div>
    <div class="drivers">
      <div><h3>What affects the cost</h3><ul><li>How many processes and systems are involved</li><li>How much volume runs through them</li><li>How many exceptions need a person to decide</li></ul></div>
      <div><h3>How we keep it low-risk</h3><ul><li>Start with the process that pays back fastest</li><li>You see the expected payback before you commit</li><li>No lock-in: the automations run in your systems</li></ul></div>
    </div>
    <p class="promise"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M7.5 12.5l3 3 6-6.5"/></svg>You'll always know the price before any work starts.</p>
  </div>
</section>
<section class="block alt">
  <div class="wrap">
    <div class="kicker">Who you'll work with</div>
    <h2>A Brisbane firm that's been looking after businesses since 2007</h2>
    <div class="proof-grid">
      <div class="quote">
        <blockquote>"Dom has saved us more money than we've spent!"</blockquote>
        <cite>Mike Wikes, Man Group</cite>
      </div>
      <div class="quote">
        <div class="founder">
          <div class="avatar" aria-hidden="true">DG</div>
          <div>
            <p>"[FOUNDER NOTE]"</p>
            <p class="name">Dominic Guinea, founder and CEO</p>
          </div>
        </div>
      </div>
    </div>
    <div class="badges">
      <span class="badge"><i>✓</i>Xero partner since 2013</span>
      <span class="badge"><i>✓</i>Accountants since 2007</span>
      <span class="badge"><i>✓</i>Australian-owned, Queensland-based</span>
    </div>
  </div>
</section>
<section class="block">
  <div class="wrap">
    <div class="kicker">Questions</div>
    <h2>Questions we get asked</h2>
    <div class="faq">
      <details><summary>We're not a tech business. Is this for us?</summary><p>Yes. Automation is built for businesses whose team spends time on repetitive admin, not for tech companies. You don't need technical staff: we handle the build and explain everything in plain English.</p></details>
      <details><summary>How do we know what's worth automating?</summary><p>That's what the free call and the assessment are for. We look at where your team's time goes and what each process costs, then recommend the ones that pay back fastest.</p></details>
      <details><summary>Will it work with our software?</summary><p>Usually. We work with Xero, MYOB and most tools that have email, an online login or an export. We'll check your setup on the call.</p></details>
      <details><summary>Do we need IT staff to run it?</summary><p>No. Your team sees the results in the systems they already use, and approves anything the automation isn't sure about.</p></details>
      <details><summary>What happens if something goes wrong?</summary><p>Anything uncertain goes to a person rather than being guessed. With ongoing support, we monitor the automations and fix issues as your systems change.</p></details>
      <details><summary>Is our data safe? Is AI involved?</summary><p>Your data stays in your own systems; we only access what the automation needs. Where AI is used, it's for reading documents and drafting replies, with a person in control.</p></details>
      <details><summary>What does it cost?</summary><p>It depends on the processes involved, so we don't publish packages. See <a href="#pricing-anchor">how pricing works</a> above; you'll always know the price before any work starts.</p></details>
      <details><summary>How long does it take?</summary><p>It depends on the process and your systems. The assessment gives you a timeline before you commit to anything.</p></details>
      <details><summary>What happens on the call?</summary><p>A relaxed 30-minute conversation by phone or video. We ask how your business runs, you ask us anything, and we tell you honestly whether automation is worth it for you.</p></details>
    </div>
  </div>
</section>
<section class="final">
  <div class="wrap">
    <div>
      <h2>See what's worth automating in your business</h2>
      <p>A free 30-minute call, with no obligation.</p>
    </div>
    <div class="ctas"><a class="btn" href="#book">Book my free call</a><a class="btn line" href="tel:+61732058938">Call (07) 3205 8938</a></div>
  </div>
</section>
<footer>
  <div class="wrap">
    <span>Qubik Accounting · 18–22 Dixon Street, Strathpine QLD 4500</span>
    <span><a href="tel:+61732058938">(07) 3205 8938</a> · <a href="https://qubik.com.au/privacy-policy/">Privacy policy</a></span>
  </div>
</footer>
<div class="sticky" id="sticky" aria-label="Quick actions">
  <a class="btn call" href="tel:+61732058938">Call</a>
  <a class="btn" href="#book">Book a free call</a>
</div>
</div>
<script>
(function () {
  var form = document.getElementById('qlp-lead');
  if (!form) { return; }
  var steps = form.querySelectorAll('[data-step]');
  var label = document.getElementById('step-label');
  var bar = document.getElementById('bar');
  var status = document.getElementById('qlp-status');
  var submitBtn = document.getElementById('qlp-submit');
  var current = 1;
  var PHONE_MSG = 'Sorry, something went wrong sending your details. Please call us on (07) 3205 8938.';
  function show(n) {
    current = n;
    steps.forEach(function (s) { s.hidden = Number(s.getAttribute('data-step')) !== n; });
    label.textContent = 'Step ' + n + ' of 3';
    bar.style.width = (n / 3 * 100) + '%';
    if (n !== 1) {
      var first = steps[n - 1].querySelector('input, select');
      if (first) { first.focus({ preventScroll: true }); }
    }
  }
  function valid(n) {
    var s = steps[n - 1];
    var ok;
    if (n === 1) {
      ok = s.querySelectorAll('input[name=automate]:checked').length !== 0;
    } else {
      ok = Array.prototype.every.call(s.querySelectorAll('[required]'), function (el) { return el.checkValidity(); });
    }
    s.querySelector('[data-err]').hidden = ok;
    return ok;
  }
  form.addEventListener('click', function (e) {
    if (e.target.matches('[data-next]')) { if (valid(current)) { show(current + 1); } }
    if (e.target.matches('[data-back]')) { show(current - 1); }
  });
  function diviField(id) { return document.querySelector('.qlp-divi-form [data-original_id="' + id + '"]'); }
  function setDivi(id, value) { var el = diviField(id); if (el) { el.value = value; } }
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!valid(3)) { return; }
    var picked = Array.prototype.map.call(form.querySelectorAll('input[name=automate]:checked'), function (el) { return el.value; });
    setDivi('automate', picked.join(', '));
    setDivi('staff', form.elements.staff.value);
    setDivi('revenue', form.elements.revenue.value);
    setDivi('timing', form.elements.timing.value);
    setDivi('name', form.elements.name.value);
    setDivi('company', form.elements.company.value);
    setDivi('email', form.elements.email.value);
    setDivi('phone', form.elements.phone.value);
    setDivi('consent', 'Yes: agreed to be contacted by phone, email or SMS');
    var diviSubmit = document.querySelector('.qlp-divi-form .et_pb_contact_submit');
    status.hidden = false;
    if (!diviSubmit) { status.textContent = PHONE_MSG; return; }
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';
    status.textContent = '';
    diviSubmit.click();
    var waited = 0;
    var timer = setInterval(function () {
      waited += 500;
      var msg = document.querySelector('.qlp-divi-form .et-pb-contact-message');
      var text = msg ? msg.textContent.trim() : '';
      if (text) { status.textContent = text; }
      if (waited === 15000) {
        clearInterval(timer);
        status.textContent = PHONE_MSG;
        submitBtn.disabled = false;
        submitBtn.textContent = 'Book my free call';
      }
    }, 500);
  });
  var KEYS = ['gclid', 'gbraid', 'wbraid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term'];
  var MAX_AGE = 90 * 24 * 60 * 60 * 1000;
  var params = new URLSearchParams(window.location.search);
  var here = window.location.href.split('#')[0];
  var saved = {};
  try { saved = JSON.parse(window.localStorage.getItem('qlp_attr') || '{}'); } catch (err) { saved = {}; }
  var fresh = KEYS.some(function (k) { return params.get(k); });
  if (fresh) {
    saved = { landing_page: here, ts: Date.now() };
    KEYS.forEach(function (k) { if (params.get(k)) { saved[k] = params.get(k); } });
    try { window.localStorage.setItem('qlp_attr', JSON.stringify(saved)); } catch (err) {}
  }
  if (saved.ts) { if (Date.now() - saved.ts > MAX_AGE) { saved = {}; } }
  if (!saved.landing_page) { saved.landing_page = here; }
  function fillAttribution() {
    KEYS.concat(['landing_page']).forEach(function (k) { if (saved[k]) { setDivi(k, saved[k]); } });
  }
  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', fillAttribution); } else { fillAttribution(); }
  var sticky = document.getElementById('sticky');
  var hero = document.querySelector('.qlp .hero');
  var card = document.getElementById('book');
  var heroGone = false;
  var cardVisible = false;
  function update() { sticky.classList.toggle('show', heroGone ? !cardVisible : false); }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (en) { heroGone = !en[0].isIntersecting; update(); }).observe(hero);
    new IntersectionObserver(function (en) { cardVisible = en[0].isIntersecting; update(); }).observe(card);
  }
})();
</script>
```
