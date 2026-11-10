# Claude in Chrome prompt: put the final landing page live

## Before you paste it

1. **Back up the site** (or check that last night's backup exists).
2. **No image upload needed.** Your account isn't allowed to upload files, so the 17 images are served from this project's public GitHub repository through jsDelivr, a free public file host. The links are pinned to a fixed version, so they can't change. If you ever make the repository private or delete it, the images will break, so tell me first and we'll move them into the Media Library (one find-and-replace).
3. **Fill in the two blanks** in the prompt below:
   - `[SALES EMAIL]`: where new leads should go (only used if the live form's email can't be copied).
   - `[CALENDAR LINK]`: the booking link for the thank-you page's "Or pick a time now" button, or `none` to remove the button.
4. Log in to the WordPress admin in Chrome, open the Claude side panel, and paste **everything below the line**.

**How it works on the live site:** the page shows the custom three-step form and passes the answers to a hidden Divi Contact Form. Divi still sends the email, uses the spam protection, and redirects to the thank-you page, just as now. The new page and thank-you page are built as drafts next to the live ones and only swapped in when you say "go live".

**Google Ads links once live:** automation ad groups use `https://qubik.com.au/marketing/automation/`. AI ad groups add `?v=ai` to it. LinkedIn or email traffic adds `?v=dashboards`.

---

You are going to replace the Google Ads landing page and its thank-you page on the Qubik WordPress site (qubik.com.au, Divi theme). I'm logged in to the WordPress admin in this browser.

## Ground rules
- The current page at `https://qubik.com.au/marketing/automation/` (page **Automation**, under the parent page **marketing**) and its thank-you page at `https://qubik.com.au/marketing/automation/thank-you/` are live and receiving ad traffic. Don't edit them until Step 7, and only after I say "go live".
- Work only on the pages named below. Don't touch other pages, menus, widgets, Theme Builder, cache settings or Theme Options.
- Don't install, update or deactivate any plugin or theme.
- If something on screen doesn't match these instructions, stop and tell me what you see instead of guessing.
- Paste the three code blocks in the Appendix exactly as written, apart from the replacements these steps tell you to make. Don't reformat them, add blank lines or "improve" them. After pasting, check each saved in full (first and last lines match).

## My details
- Sales email (fallback only): `[SALES EMAIL]`
- Calendar booking link: `[CALENDAR LINK]`

## Step 0: Check before you start, and report back
Tell me:
1. Confirm the live structure: page **marketing** (`/marketing/`), its child **Automation** (`/marketing/automation/`), and its child **Thank you** (`/marketing/automation/thank-you/`). List any other pages with "automation" in their title or slug (title, slug, parent, status).
2. On the live **Automation** page's Contact Form module: the email address(es) in Content → Email, the redirect URL, and the spam protection settings. Don't change anything.
3. Whether the live **Thank you** page contains any Google Ads or Google tag code (look in its Divi modules for `gtag`, `AW-` or `googletagmanager`, and in its page settings). If it does, copy that code into your report exactly. It must move to the new thank-you page.

Then continue unless something blocks you.

## Step 1: Images
Nothing to do: the code already links to all 17 images, which are hosted outside WordPress. Don't upload or change any images. In Step 6, check that they all show.

## Step 2: Create the new landing page (draft)
1. Pages → Add New. Title: **Automation (new)**. Slug: **automation-new**. Page Attributes → Parent: **marketing**, Template: **Blank Page**. Its address will be `/marketing/automation-new/`. Open it in the Divi Builder and choose **Start Building** (blank).
2. Build three sections, top to bottom:

**Section A: Fullwidth section** (top and bottom padding 0)
- One **Fullwidth Code** module. Paste **Code 1: Styles, header and hero form**.

**Section B: Regular section** (top and bottom padding 0)
- Section → Advanced → CSS Class: `qlp-form-section`
- One row, one column, with one **Contact Form** module, set up as in Step 3. This section is invisible on the page; it's the form that actually sends the email.

**Section C: Fullwidth section** (top and bottom padding 0)
- One **Fullwidth Code** module. Paste **Code 2: Page body and scripts**.

3. Save as draft.

## Step 3: The hidden Contact Form module (Section B)
Start from the live form, so the email and spam settings carry over:
1. Open the live **Automation** page in the Divi Builder in another tab. Right-click its Contact Form module → **Copy Module**. Close that tab **without saving**.
2. In Automation (new), Section B, right-click the empty column → **Paste Module**.
3. If copy and paste doesn't work, add a new Contact Form module and copy the Email, Redirect and Spam Protection settings across by hand from the live form. If the live form has no email set, use `[SALES EMAIL]`.

Then set the module up exactly like this:

**Content → Fields:** exactly these 21 fields, in any order. **Every field is an Input Field, and none is required.** The custom form on the page does all the checking. A required, dropdown, email or checkbox field here could block a submission without the visitor seeing why.
- **Keep** any existing field whose Field ID is in the table, changing its type to Input Field and Required to No.
- **Delete** any field that's not in the table.
- **Add** the missing ones.

| Field ID | Title |
|---|---|
| `name` | Name |
| `company` | Company |
| `email` | Email |
| `phone` | Mobile |
| `role` | Role |
| `revenue` | Annual revenue |
| `staff` | Staff |
| `automate` | Wants to fix |
| `timing` | Timing |
| `challenge` | Biggest challenge |
| `estimate` | Their cost estimate |
| `variant` | Page version |
| `consent` | Consent |
| `gclid` | gclid |
| `gbraid` | gbraid |
| `wbraid` | wbraid |
| `utm_source` | utm_source |
| `utm_medium` | utm_medium |
| `utm_campaign` | utm_campaign |
| `utm_term` | utm_term |
| `landing_page` | landing_page |

**Other settings:**
- **Content → Email:** the same address(es) as the live form. Message Pattern: empty, so the email lists every field.
- **Content → Redirect:** Enable Redirect URL **Yes**, URL `https://qubik.com.au/marketing/automation/thank-you/` (the same as the live form).
- **Content → Spam Protection:** Basic Captcha **No**. The spam protection service the same as the live form.
- **Advanced → CSS Class:** `qlp-divi-form` (remove any other CSS class the pasted module has, such as `qlp-form`).

Save as draft.

## Step 4: Create the new thank-you page (draft)
1. Pages → Add New. Title: **Thank you (new)**. Slug: **thank-you-new**. Page Attributes → Parent: **Automation (new)**, Template: **Blank Page**.
2. Divi Builder → Start Building → one **Fullwidth section** (padding 0) with one **Fullwidth Code** module. Paste **Code 3: Thank-you page**, and:
   - If my calendar link is not `none`, replace `[CALENDAR LINK]` with it.
   - If it is `none`, delete this one line from Code 3: `<a class="btn" href="[CALENDAR LINK]">Or pick a time now</a>`
3. If Step 0 found Google Ads or Google tag code on the old thank-you page, add a second **Fullwidth Code** module below and paste that code into it, exactly as found.
4. If an SEO plugin is active, set this page to **noindex**.
5. Save as draft.

## Step 5: Site header and footer
Nothing to do: the page code hides the site's own header and footer on these two pages. In the Step 6 preview, check that only the page's own navy-and-white header and footer show.

## Step 6: Stop for my review
Send me:
- preview links for both new pages;
- screenshots of the landing page at desktop and phone width, and of the thank-you page;
- confirmation of each of these on the landing page preview:
  - the header stays at the top while scrolling;
  - all images show (the dashboard tabs, the industry tabs, the phone graphic and the footer logo);
  - adding `?v=ai` to the preview link changes the headline to "Practical AI that does the work and shows you everything" and shows a "Practical AI" section;
  - clicking "Next" on step 1 without picking anything shows "Pick at least one…";
- anything that didn't go as described.

**Wait for me to say "test it".**

## Step 7: Test the new page before it replaces the live one
1. Publish **Automation (new)** only. It's at `/marketing/automation-new/`, which no ad points to. Leave Thank you (new) as a draft.
2. Tell me it's published, and **wait for me to confirm the page isn't being cached** before testing. Divi's form uses a security token that expires; a cached copy of the page would make the form fail silently. The live pages are already excluded from the cache, but the new address may not be.
3. Open `https://qubik.com.au/marketing/automation-new/?v=ai&gclid=TEST-FINAL&utm_source=google&utm_campaign=test` in a new tab and:
   1. In the calculator, change "People" to 4.
   2. Form step 1: pick "Too much manual admin" and "Cash flow and forecasting", then Next.
   3. Step 2: any answers; type `Test – please ignore` in the challenge box, then Next.
   4. Step 3: Name `Test Lead final`, Company `Test – please ignore`, Email `test@example.com`, Mobile `0400 000 000`; tick consent; click "Book my free call".
4. Confirm the browser lands on `/marketing/automation/thank-you/` (still the old thank-you page at this stage; that's expected).
5. Ask me to confirm the test email arrived with all 21 fields, including `gclid: TEST-FINAL`, `variant: ai` and an `estimate` starting "A$101,200 a year".

If the browser doesn't reach the thank-you page within 15 seconds, the form shows "Sorry, something went wrong…". In that case stop, and report what the browser console shows and what this returns: `document.querySelector('.qlp-divi-form .et-pb-contact-message').textContent`.

**Wait for me to say "go live".**

## Step 8: Go live (swap the pages)
Ads point at `/marketing/automation/`, so do steps 1 to 4 straight after each other, with no pauses.
1. **Old landing page:** edit the live **Automation** page → slug `automation-previous` (if that's taken, `automation-previous-2`). Keep its parent as **marketing**. Update. Leave it published for now.
2. **New landing page:** edit **Automation (new)** → title **Automation**, slug `automation` (parent stays **marketing**). Update. `/marketing/automation/` is now the new page.
3. **Old thank-you page:** edit the old **Thank you** page (now under Automation-previous) → slug `thank-you-previous`, status **Draft**. Update.
4. **New thank-you page:** edit **Thank you (new)** → title **Thank you**, slug `thank-you`, then **Publish**. It's now at `/marketing/automation/thank-you/`.
5. **Old landing page:** set **Automation-previous** to **Draft**. Update.
6. Open `https://qubik.com.au/marketing/automation/` and `https://qubik.com.au/marketing/automation/thank-you/` and confirm both show the new design (not a 404, not the old page). Also open `https://qubik.com.au/automation/` and confirm it still redirects to `/marketing/automation/`.
7. Tell me the swap is done, and wait for me to confirm the new pages aren't being cached.
8. **Final test:** repeat the Step 7 form test on `https://qubik.com.au/marketing/automation/?gclid=TEST-LIVE&utm_source=google`, with Name `Test Lead live`. Confirm you land on the new thank-you page, and ask me to confirm the email.

If anything in Step 8 fails, put it back: old page slug back to `automation` and Published, old thank-you slug back to `thank-you` and Published. Then tell me.

## Report back
List what you created and changed, the results of both tests, and anything you skipped or couldn't do. Keep the previous pages as drafts; don't delete them.

---

## Appendix: code to paste

### Code 1: Styles, header and hero form (Section A, Fullwidth Code module)

```html
<style>@font-face{font-family:'IBM Plex Sans';font-style:normal;font-weight:400;font-display:swap;src:url(https://cdn.jsdelivr.net/npm/@fontsource/ibm-plex-sans@5.1.1/files/ibm-plex-sans-latin-400-normal.woff2) format('woff2')}@font-face{font-family:'IBM Plex Sans';font-style:normal;font-weight:500;font-display:swap;src:url(https://cdn.jsdelivr.net/npm/@fontsource/ibm-plex-sans@5.1.1/files/ibm-plex-sans-latin-500-normal.woff2) format('woff2')}@font-face{font-family:'IBM Plex Sans';font-style:normal;font-weight:600;font-display:swap;src:url(https://cdn.jsdelivr.net/npm/@fontsource/ibm-plex-sans@5.1.1/files/ibm-plex-sans-latin-600-normal.woff2) format('woff2')}@font-face{font-family:'IBM Plex Sans';font-style:normal;font-weight:700;font-display:swap;src:url(https://cdn.jsdelivr.net/npm/@fontsource/ibm-plex-sans@5.1.1/files/ibm-plex-sans-latin-700-normal.woff2) format('woff2')}@font-face{font-family:'IBM Plex Mono';font-style:normal;font-weight:400;font-display:swap;src:url(https://cdn.jsdelivr.net/npm/@fontsource/ibm-plex-mono@5.1.1/files/ibm-plex-mono-latin-400-normal.woff2) format('woff2')}@font-face{font-family:'IBM Plex Mono';font-style:normal;font-weight:500;font-display:swap;src:url(https://cdn.jsdelivr.net/npm/@fontsource/ibm-plex-mono@5.1.1/files/ibm-plex-mono-latin-500-normal.woff2) format('woff2')}</style>
<style>
.qlp{--navy: #2e4455; --navy-deep: #22333f; --teal: #2e96a0; --teal-ink: #1f7a83; --teal-soft: #e3f1f2; --lime: #c6da2c; --lime-soft: #eef3cf; --page: #f6f7f4; --surface: #ffffff; --ink: #1f2a33; --muted: #5b6b78; --line: #dde3e2; --on-navy: #f3f6f7; --on-navy-muted: #b6c6cd; --ok: #2f8a5b; --bad: #c0392b; --note-bg: #fff6d9; --note-ink: #5e4a00; --font: 'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif; --mono: 'IBM Plex Mono', ui-monospace, Menlo, monospace;}
.qlp *{box-sizing: border-box;}
.qlp [hidden]{display: none !important;}
.qlp{margin: 0; background: var(--page); color: var(--ink); font-family: var(--font); font-size: 17px; line-height: 1.6;}
.qlp h1,.qlp h2,.qlp h3{line-height: 1.15; text-wrap: balance; margin: 0; letter-spacing: -0.01em;}
.qlp p{margin: 0;}
.qlp a{color: var(--teal-ink);}
.qlp img{max-width: 100%; display: block;}
.qlp :focus-visible{outline: 3px solid var(--teal); outline-offset: 2px;}
.qlp .wrap{max-width: 1160px; margin: 0 auto; padding-left: 16px; padding-right: 16px;}
.qlp .top{background: var(--surface); border-bottom: 1px solid var(--line); position: sticky; top: 0; z-index: 30;}
.qlp .top .wrap{display: flex; justify-content: space-between; align-items: center; gap: 16px; padding-block: 10px;}
.qlp .logo{height: 42px; width: auto;}
.qlp .top-right{display: flex; align-items: center; gap: 18px;}
.qlp .phone{font-weight: 600; font-size: 15px; color: var(--navy); text-decoration: none;}
.qlp .phone span{color: var(--muted); font-weight: 400; margin-right: 6px;}
.qlp .btn{font-family: var(--font); font-weight: 600; font-size: 17px; border: 0; border-radius: 8px; padding: 14px 22px; cursor: pointer; background: var(--lime); color: var(--navy-deep); text-decoration: none; display: inline-block; text-align: center; line-height: 1.2;}
.qlp .btn:hover{filter: brightness(1.04);}
.qlp .btn.sm{padding: 10px 16px; font-size: 15px;}
.qlp .btn.navy{background: var(--navy); color: #fff;}
.qlp .btn.line{background: transparent; color: var(--on-navy); box-shadow: inset 0 0 0 1px var(--on-navy-muted);}
.qlp .btn.ghost{background: transparent; color: var(--muted); padding-inline: 8px; font-weight: 500; font-size: 15px;}
.qlp .btn.full{flex: 1;}
.qlp .hero{background: var(--navy); color: var(--on-navy);}
.qlp .hero .wrap{display: grid; grid-template-columns: minmax(0, 1.12fr) minmax(0, 0.88fr); gap: 48px; padding-block: 56px 120px; align-items: start;}
.qlp .eyebrow{font-size: 13px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--lime);}
.qlp .hero h1{font-size: clamp(32px, 4.3vw, 52px); font-weight: 600; margin-top: 14px;}
.qlp .hero .sub{font-size: 19px; color: var(--on-navy-muted); margin-top: 18px; max-width: 32em;}
.qlp .hero-ctas{display: flex; flex-wrap: wrap; gap: 12px; margin-top: 28px;}
.qlp .trust{display: flex; flex-wrap: wrap; gap: 8px 22px; margin: 28px 0 0; padding: 0; list-style: none; font-size: 15px;}
.qlp .trust li{display: flex; gap: 8px; align-items: center;}
.qlp .trust li::before{content: ""; width: 8px; height: 8px; border-radius: 2px; background: var(--lime); flex: none;}
.qlp .formcard{background: var(--surface); color: var(--ink); border-radius: 12px; padding: 28px; box-shadow: 0 18px 40px rgba(10, 25, 35, 0.3); scroll-margin-top: 90px;}
.qlp .progress{display: flex; align-items: center; gap: 10px; font-size: 13px; color: var(--muted); font-weight: 500;}
.qlp .bar{flex: 1; height: 6px; background: var(--line); border-radius: 3px; overflow: hidden;}
.qlp .bar i{display: block; height: 100%; width: 33.3%; background: var(--teal); border-radius: 3px; transition: width .3s ease;}
.qlp fieldset.step{border: 0; padding: 0; margin: 16px 0 0; display: grid; gap: 14px;}
.qlp .step legend{padding: 0; margin-bottom: 8px;}
.qlp .step h2{font-size: 22px; font-weight: 600;}
.qlp .step .lead{color: var(--muted); font-size: 15px;}
.qlp .chips{display: grid; grid-template-columns: 1fr 1fr; gap: 10px;}
.qlp .chip{position: relative;}
.qlp .chip input{position: absolute; opacity: 0; inset: 0; width: 100%; height: 100%; margin: 0; cursor: pointer;}
.qlp .chip span{display: flex; align-items: center; min-height: 54px; padding: 10px 12px; border: 1px solid var(--line); border-radius: 8px; background: var(--page); font-size: 15px; line-height: 1.3; font-weight: 600; transition: border-color .15s, background .15s;}
.qlp .chip span::before{content: ""; width: 18px; height: 18px; border: 2px solid #c3ccd0; border-radius: 5px; margin-right: 10px; flex: none; background: var(--surface);}
.qlp .chip input:checked + span{border-color: var(--teal); background: var(--teal-soft);}
.qlp .chip input:checked + span::before{background: var(--teal); border-color: var(--teal); box-shadow: inset 0 0 0 3px var(--surface);}
.qlp .chip input:focus-visible + span{outline: 3px solid var(--teal); outline-offset: 2px;}
.qlp .chip input:disabled{cursor: not-allowed;}
.qlp .chip input:disabled + span{opacity: .45;}
.qlp .two{display: grid; grid-template-columns: 1fr 1fr; gap: 14px;}
.qlp label.f{display: grid; gap: 5px; font-size: 14px; font-weight: 600;}
.qlp label.f small{font-weight: 400; color: var(--muted);}
.qlp .formcard input:not([type=checkbox]),.qlp .formcard select,.qlp .formcard textarea{font: inherit; font-size: 16px; font-weight: 400; color: var(--ink); background: var(--page); border: 1px solid var(--line); border-radius: 7px; padding: 10px 12px; width: 100%; min-width: 0;}
.qlp .formcard textarea{min-height: 70px; resize: vertical;}
.qlp .formcard input:focus,.qlp .formcard select:focus,.qlp .formcard textarea:focus{border-color: var(--teal); outline: none; box-shadow: 0 0 0 3px rgba(46,150,160,0.25);}
.qlp .consent{display: flex; gap: 10px; align-items: flex-start; font-size: 13px; color: var(--muted); line-height: 1.45;}
.qlp .consent input{width: 18px; height: 18px; margin-top: 2px; flex: none;}
.qlp .actions{display: flex; gap: 10px; align-items: center;}
.qlp .err{font-size: 13px; color: var(--bad);}
.qlp .reassure{display: flex; flex-wrap: wrap; justify-content: center; gap: 4px 14px; margin-top: 14px; font-size: 13px; color: var(--muted);}
.qlp .status{font-size: 14px; color: var(--muted); text-align: center;}
.qlp .band{margin-top: -84px;}
.qlp .screen{background: var(--surface); border-radius: 12px; box-shadow: 0 24px 60px rgba(20, 35, 45, 0.22); overflow: hidden; border: 1px solid var(--line); margin: 0;}
.qlp .screen .chrome{display: flex; align-items: center; gap: 6px; padding: 10px 14px; background: #eef1f0; border-bottom: 1px solid var(--line);}
.qlp .screen .chrome i{width: 10px; height: 10px; border-radius: 50%; background: #cfd6d6;}
.qlp .screen .chrome span{margin-left: 10px; font-size: 12px; color: var(--muted); font-family: var(--mono);}
.qlp .screen img{width: 100%; height: auto;}
.qlp .caption{margin-top: 10px; font-size: 13px; color: var(--muted); text-align: center;}
.qlp .strip{margin-top: 28px; display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 10px; list-style: none; padding: 0;}
.qlp .strip li{display: flex; gap: 10px; align-items: center; font-size: 14px; font-weight: 600; line-height: 1.25; background: var(--surface); border: 1px solid var(--line); border-radius: 10px; padding: 10px 12px;}
.qlp .strip .ic{width: 32px; height: 32px; border-radius: 8px; background: var(--lime-soft); color: var(--navy); display: grid; place-items: center; flex: none;}
.qlp section.block .wrap{padding-block: 80px;}
.qlp section.alt{background: var(--surface); border-block: 1px solid var(--line);}
.qlp .kicker{font-size: 13px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--teal-ink);}
.qlp .block h2{font-size: clamp(27px, 3.2vw, 38px); font-weight: 600; max-width: 24em; margin-top: 8px;}
.qlp .intro{color: var(--muted); margin-top: 14px; max-width: 42em; font-size: 18px;}
.qlp .tick{list-style: none; padding: 0; margin: 0; display: grid; gap: 12px;}
.qlp .tick li{display: grid; grid-template-columns: 26px minmax(0, 1fr); gap: 10px;}
.qlp .tick svg{color: var(--teal); margin-top: 3px;}
.qlp .prompt{margin-top: 40px; display: flex; flex-wrap: wrap; gap: 14px 28px; align-items: center; justify-content: space-between; background: var(--lime-soft); border: 1px solid #dfe8a6; border-radius: 12px; padding: 20px 24px;}
.qlp .prompt p{font-size: 18px; font-weight: 500; max-width: 36em;}
.qlp .prompt p span{display: block; color: var(--muted); font-size: 15px; font-weight: 400; margin-top: 2px;}
.qlp .staff{display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 0.95fr); gap: 48px; align-items: start; margin-top: 34px;}
.qlp .pains{list-style: none; padding: 0; margin: 0; display: grid; gap: 12px;}
.qlp .pains li{display: grid; grid-template-columns: 34px minmax(0, 1fr); gap: 12px; align-items: start; background: var(--surface); border: 1px solid var(--line); border-radius: 10px; padding: 14px 16px;}
.qlp .pains .ic{width: 34px; height: 34px; border-radius: 8px; background: #fbe9e6; color: var(--bad); display: grid; place-items: center;}
.qlp .pains strong{display: block;}
.qlp .pains span{color: var(--muted); font-size: 15px;}
.qlp .calc{background: var(--navy); color: var(--on-navy); border-radius: 14px; padding: 28px; position: sticky; top: 90px;}
.qlp .calc h3{font-size: 22px; font-weight: 600;}
.qlp .calc > p{color: var(--on-navy-muted); font-size: 15px; margin-top: 6px;}
.qlp .calc .inputs{display: grid; gap: 14px; margin-top: 20px;}
.qlp .calc label{display: grid; grid-template-columns: minmax(0, 1fr) 120px; gap: 12px; align-items: center; font-size: 15px;}
.qlp .calc label small{display: block; color: var(--on-navy-muted); font-size: 13px;}
.qlp .calc input{font: inherit; font-family: var(--mono); font-size: 17px; text-align: right; color: var(--ink); background: #fff; border: 0; border-radius: 7px; padding: 9px 12px; width: 100%;}
.qlp .calc .result{margin-top: 22px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,.18);}
.qlp .calc .big{font-family: var(--mono); font-size: clamp(34px, 4vw, 44px); font-weight: 500; color: var(--lime); letter-spacing: -0.02em;}
.qlp .calc .res-sub{color: var(--on-navy-muted); font-size: 15px; margin-top: 4px;}
.qlp .calc .per10{margin-top: 16px; background: rgba(198,218,44,.12); border-radius: 8px; padding: 12px 14px; font-size: 15px;}
.qlp .calc .per10 b{font-family: var(--mono); color: var(--lime); font-weight: 500;}
.qlp .calc .fine{margin-top: 12px; font-size: 12px; color: var(--on-navy-muted);}
.qlp .calc .btn{margin-top: 18px; width: 100%;}
.qlp .auto{margin-top: 34px; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px;}
.qlp .auto-card{background: var(--surface); border: 1px solid var(--line); border-radius: 12px; overflow: hidden; display: grid; grid-template-rows: auto 1fr auto;}
.qlp .auto-card h3{font-size: 19px; font-weight: 600; padding: 18px 20px 0; display: flex; gap: 10px; align-items: center;}
.qlp .auto-card h3 .ic{width: 36px; height: 36px; border-radius: 9px; background: var(--teal-soft); color: var(--teal-ink); display: grid; place-items: center; flex: none;}
.qlp .auto-card .today{padding: 12px 20px 16px; color: var(--muted); font-size: 15px;}
.qlp .auto-card .after{padding: 14px 20px 18px; background: var(--teal-soft); font-size: 15px; border-top: 1px solid #cfe6e8;}
.qlp .lbl{display: block; font-size: 11px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; margin-bottom: 2px;}
.qlp .today .lbl{color: var(--muted);}
.qlp .after .lbl{color: var(--teal-ink);}
.qlp .tabs{display: flex; flex-wrap: wrap; gap: 8px; margin-top: 30px;}
.qlp .tab{font: inherit; font-size: 15px; font-weight: 600; border: 1px solid var(--line); background: var(--surface); color: var(--ink); border-radius: 999px; padding: 8px 16px; cursor: pointer;}
.qlp .tab[aria-selected="true"]{background: var(--navy); border-color: var(--navy); color: #fff;}
.qlp .panel{margin-top: 22px; display: grid; grid-template-columns: minmax(0, 0.42fr) minmax(0, 1.58fr); gap: 32px; align-items: start;}
.qlp .panel h3{font-size: 22px; font-weight: 600;}
.qlp .panel p{color: var(--muted); margin-top: 10px;}
.qlp .panel .pts{margin-top: 18px; font-size: 15px;}
.qlp .act{margin-top: 34px; display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr); gap: 48px; align-items: center;}
.qlp .sua{display: grid; gap: 14px;}
.qlp .sua > div{background: var(--surface); border: 1px solid var(--line); border-radius: 12px; padding: 20px 22px; display: grid; grid-template-columns: 44px minmax(0, 1fr); gap: 14px;}
.qlp .sua > div:last-child{background: var(--navy); border-color: var(--navy); color: var(--on-navy);}
.qlp .sua .n{width: 44px; height: 44px; border-radius: 50%; background: var(--teal-soft); color: var(--teal-ink); display: grid; place-items: center; font-family: var(--mono); font-weight: 500;}
.qlp .sua > div:last-child .n{background: rgba(198,218,44,.18); color: var(--lime);}
.qlp .sua h3{font-size: 20px; font-weight: 600;}
.qlp .sua ul{margin: 8px 0 0; padding-left: 18px; display: grid; gap: 4px; font-size: 15px; color: var(--muted);}
.qlp .sua > div:last-child ul{color: var(--on-navy-muted);}
.qlp .control{margin-top: 18px; font-size: 16px; color: var(--muted); display: flex; gap: 10px; align-items: center;}
.qlp .control svg{color: var(--ok); flex: none;}
.qlp .phone-wrap{position: relative; display: grid; justify-items: center;}
.qlp .device{width: min(300px, 78%); border-radius: 40px; background: #12191f; padding: 12px; box-shadow: 0 30px 60px rgba(20,35,45,.28); position: relative;}
.qlp .device::before{content: ""; position: absolute; top: 20px; left: 50%; width: 76px; height: 20px; margin-left: -38px; border-radius: 12px; background: #12191f; z-index: 2;}
.qlp .device .scr{border-radius: 30px; overflow: hidden; height: 560px; background: #fff; padding-top: 30px;}
.qlp .device .scr img{width: 100%; height: auto;}
.qlp .toast{position: absolute; left: 0; right: 0; margin: 0 auto; width: min(340px, 92%); background: rgba(255,255,255,.97); border: 1px solid var(--line); border-radius: 14px; padding: 12px 14px; box-shadow: 0 14px 30px rgba(20,35,45,.22); display: grid; grid-template-columns: 34px minmax(0, 1fr); gap: 10px; font-size: 14px; line-height: 1.35;}
.qlp .toast .ic{width: 34px; height: 34px; border-radius: 9px; display: grid; place-items: center;}
.qlp .toast b{display: block; font-size: 13px;}
.qlp .toast small{color: var(--muted); font-size: 12px;}
.qlp .toast.alert{top: 90px;}
.qlp .toast.alert .ic{background: #fbe9e6; color: var(--bad);}
.qlp .toast.mail{bottom: 70px;}
.qlp .toast.mail .ic{background: var(--lime-soft); color: var(--navy);}
.qlp .ai-grid{margin-top: 34px; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 18px;}
.qlp .ai-card{background: var(--surface); border: 1px solid var(--line); border-radius: 12px; padding: 22px; display: grid; gap: 8px; align-content: start;}
.qlp .ai-card .ic{width: 44px; height: 44px; border-radius: 10px; background: var(--lime-soft); color: var(--navy); display: grid; place-items: center;}
.qlp .ai-card h3{font-size: 18px; font-weight: 600; margin-top: 6px;}
.qlp .ai-card p{color: var(--muted); font-size: 15px;}
.qlp .sys{margin-top: 34px; display: grid; grid-template-columns: minmax(0, 1fr) 40px minmax(0, 0.9fr) 40px minmax(0, 1fr); align-items: center;}
.qlp .sys .col{display: grid; gap: 10px;}
.qlp .sys .head{font-size: 12px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: var(--muted); margin-bottom: 2px;}
.qlp .sys .box{background: var(--surface); border: 1px solid var(--line); border-radius: 10px; padding: 12px 14px; font-size: 15px;}
.qlp .sys .box b{display: block; font-weight: 600;}
.qlp .sys .box span{color: var(--muted); font-size: 13px;}
.qlp .sys .core{background: var(--navy); color: var(--on-navy); border: 0; padding: 22px; border-radius: 12px;}
.qlp .sys .core b{font-size: 18px;}
.qlp .sys .core span{color: var(--on-navy-muted); font-size: 14px; display: block; margin-top: 6px;}
.qlp .sys .out{border-left: 4px solid var(--lime);}
.qlp .sys .arrow{color: var(--teal); display: grid; place-items: center;}
.qlp .sys-notes{margin-top: 22px; display: flex; flex-wrap: wrap; gap: 10px 26px; font-size: 15px; color: var(--muted);}
.qlp .sys-notes span{display: flex; gap: 8px; align-items: center;}
.qlp .sys-notes svg{color: var(--teal);}
.qlp .vision{background: var(--navy-deep); color: var(--on-navy);}
.qlp .vision .wrap{padding-block: 80px;}
.qlp .vision .kicker{color: var(--lime);}
.qlp .vision h2{font-size: clamp(27px, 3.2vw, 38px); font-weight: 600; margin-top: 8px; max-width: 22em;}
.qlp .vbig{font-size: clamp(19px, 2.1vw, 24px); line-height: 1.45; color: var(--on-navy-muted); margin-top: 16px; max-width: 36em;}
.qlp .vstats{margin: 30px 0 0; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 0; border-top: 1px solid rgba(255,255,255,.16); border-bottom: 1px solid rgba(255,255,255,.16);}
.qlp .vstats div{padding: 18px 18px 18px 0; display: flex; flex-direction: column-reverse; gap: 2px;}
.qlp .vstats dt{color: var(--on-navy-muted); font-size: 14px;}
.qlp .vstats dd{margin: 0; font-size: 24px; font-weight: 600; color: #fff;}
.qlp .vquote{margin-top: 44px; display: grid; grid-template-columns: 120px minmax(0, 1fr); gap: 36px; align-items: start;}
.qlp .vision .avatar{width: 120px; height: 120px; border-radius: 50%; background: var(--navy); color: var(--on-navy); display: grid; place-items: center; font-size: 36px; font-weight: 600; border: 3px solid var(--lime);}
.qlp .vision blockquote{margin: 12px 0 0; font-size: clamp(19px, 2vw, 23px); line-height: 1.5; font-weight: 400;}
.qlp .vision blockquote p + p{margin-top: 16px;}
.qlp .vision cite{display: block; margin-top: 18px; font-style: normal; color: var(--on-navy-muted);}
.qlp .vision cite b{color: var(--lime); font-weight: 600;}
.qlp .testi{margin-top: 34px; display: grid; grid-template-columns: minmax(0, 1.25fr) minmax(0, 0.75fr); gap: 24px; align-items: stretch;}
.qlp .video{position: relative; border-radius: 12px; overflow: hidden; background: #000; aspect-ratio: 16 / 9;}
.qlp .video button{all: unset; cursor: pointer; position: absolute; inset: 0; display: grid; place-items: center;}
.qlp .video button:focus-visible{outline: 3px solid var(--lime); outline-offset: -3px;}
.qlp .video img{position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: .82;}
.qlp .video .play{position: relative; width: 76px; height: 76px; border-radius: 50%; background: var(--lime); display: grid; place-items: center; box-shadow: 0 8px 24px rgba(0,0,0,.35);}
.qlp .video iframe{position: absolute; inset: 0; width: 100%; height: 100%; border: 0;}
.qlp .qcol{display: grid; gap: 18px; align-content: start;}
.qlp .quote{background: var(--surface); border: 1px solid var(--line); border-radius: 12px; padding: 24px;}
.qlp .quote blockquote{margin: 0; font-size: 20px; font-weight: 500; line-height: 1.4;}
.qlp .quote cite{display: block; margin-top: 10px; font-style: normal; color: var(--muted); font-size: 15px;}
.qlp .steps{list-style: none; padding: 0; margin: 34px 0 0; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); counter-reset: s; border-top: 2px solid var(--navy);}
.qlp .steps li{counter-increment: s; padding: 18px 22px 0 0; display: grid; gap: 8px; align-content: start;}
.qlp .steps li::before{content: "Step " counter(s); font-size: 13px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--teal-ink);}
.qlp .steps h3{font-size: 20px; font-weight: 600;}
.qlp .steps p{color: var(--muted); font-size: 16px;}
.qlp .callbox{margin-top: 40px; display: grid; grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr); gap: 32px; align-items: center; background: var(--navy); color: var(--on-navy); border-radius: 14px; padding: 32px;}
.qlp .callbox h3{font-size: 24px; font-weight: 600;}
.qlp .callbox > div > p{color: var(--on-navy-muted); margin-top: 8px;}
.qlp .callbox .btn{margin-top: 18px;}
.qlp .callbox .tick svg{color: var(--lime);}
.qlp .sector-panel{margin-top: 22px;}
.qlp .sector-meta{display: flex; flex-wrap: wrap; gap: 8px 24px; margin-bottom: 14px; font-size: 15px; color: var(--muted);}
.qlp .sector-meta b{color: var(--ink); font-weight: 600;}
.qlp .pricing{margin-top: 32px; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px;}
.qlp .pcard{background: var(--page); border: 1px solid var(--line); border-radius: 12px; padding: 24px; display: grid; gap: 10px; align-content: start;}
.qlp .pcard .label{font-size: 13px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--teal-ink);}
.qlp .pcard h3{font-size: 22px; font-weight: 600;}
.qlp .pcard p{color: var(--muted); font-size: 16px;}
.qlp .drivers{margin-top: 24px; display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 18px;}
.qlp .drivers > div{border-top: 1px solid var(--line); padding-top: 16px;}
.qlp .drivers h3{font-size: 18px; font-weight: 600;}
.qlp .drivers ul{margin: 8px 0 0; padding-left: 18px; color: var(--muted); display: grid; gap: 4px; font-size: 16px;}
.qlp .promise{margin-top: 24px; font-size: 20px; font-weight: 500; display: flex; gap: 12px; align-items: center;}
.qlp .promise svg{color: var(--ok); flex: none;}
.qlp .faq{margin-top: 26px; max-width: 820px; border-top: 1px solid var(--line);}
.qlp .faq details{border-bottom: 1px solid var(--line); padding-block: 16px;}
.qlp .faq summary{cursor: pointer; font-weight: 600; font-size: 18px; list-style: none; display: flex; justify-content: space-between; gap: 16px;}
.qlp .faq summary::-webkit-details-marker{display: none;}
.qlp .faq summary::after{content: "+"; color: var(--teal-ink); font-size: 22px; line-height: 1;}
.qlp .faq details[open] summary::after{content: "–";}
.qlp .faq details p{color: var(--muted); margin-top: 10px; max-width: 44em;}
.qlp .final{background: var(--navy); color: var(--on-navy);}
.qlp .final .wrap{padding-block: 64px; display: flex; flex-wrap: wrap; gap: 20px 40px; align-items: center; justify-content: space-between;}
.qlp .final h2{font-size: clamp(26px, 3vw, 36px); font-weight: 600; max-width: 18em;}
.qlp .final p{color: var(--on-navy-muted); margin-top: 10px; max-width: 34em;}
.qlp .final .ctas{display: flex; flex-wrap: wrap; gap: 12px;}
.qlp footer{background: var(--navy-deep); color: var(--on-navy-muted); font-size: 14px;}
.qlp footer .wrap{padding-block: 28px; display: flex; flex-wrap: wrap; gap: 14px 24px; justify-content: space-between; align-items: center;}
.qlp footer img{height: 34px; width: auto;}
.qlp footer a{color: var(--on-navy-muted);}
.qlp .sticky{display: none;}
@media (max-width: 1080px){.qlp .strip{grid-template-columns: repeat(3, minmax(0, 1fr));}}
@media (max-width: 960px){.qlp .hero .wrap,.qlp .callbox,.qlp .staff,.qlp .panel,.qlp .testi,.qlp .act{grid-template-columns: minmax(0, 1fr); gap: 32px;}.qlp .hero .wrap{padding-bottom: 100px;}.qlp .auto,.qlp .pricing,.qlp .ai-grid{grid-template-columns: repeat(2, minmax(0, 1fr));}.qlp .steps{grid-template-columns: repeat(2, minmax(0, 1fr)); row-gap: 24px;}.qlp .sys{grid-template-columns: minmax(0, 1fr); gap: 10px;}.qlp .sys .arrow{transform: rotate(90deg); height: 34px;}.qlp .calc{position: static;}.qlp .vstats{grid-template-columns: repeat(2, minmax(0, 1fr));}}
@media (max-width: 640px){.qlp{font-size: 16px;}.qlp .top .phone,.qlp .top .btn{display: none;}.qlp .logo{height: 36px;}.qlp .hero .wrap{padding-block: 36px 84px;}.qlp section.block .wrap,.qlp .vision .wrap{padding-block: 52px;}.qlp .two,.qlp .chips,.qlp .auto,.qlp .pricing,.qlp .drivers,.qlp .steps,.qlp .ai-grid{grid-template-columns: minmax(0, 1fr);}.qlp .strip{grid-template-columns: repeat(2, minmax(0, 1fr));}.qlp .formcard,.qlp .callbox,.qlp .calc{padding: 22px;}.qlp .calc label{grid-template-columns: minmax(0, 1fr) 100px;}.qlp .vquote{grid-template-columns: minmax(0, 1fr); gap: 16px; margin-top: 32px;}.qlp .vision .avatar{width: 80px; height: 80px; font-size: 26px;}.qlp .vstats dd{font-size: 20px;}.qlp .tabs{flex-wrap: nowrap; overflow-x: auto; margin-left: -16px; margin-right: -16px; padding: 0 16px 6px; scrollbar-width: thin;}.qlp .tab{flex: none;}.qlp .pains{gap: 8px;}.qlp .pains li{padding: 10px 12px;}.qlp .pains span{font-size: 14px;}.qlp .auto{gap: 12px;}.qlp .auto-card h3{padding: 14px 16px 0; font-size: 17px;}.qlp .auto-card h3 .ic{width: 30px; height: 30px;}.qlp .auto-card .today{padding: 6px 16px 10px; font-size: 14px;}.qlp .auto-card .after{padding: 10px 16px 12px; font-size: 14px;}.qlp .sua{gap: 10px;}.qlp .sua > div{padding: 14px 16px; grid-template-columns: 36px minmax(0, 1fr); gap: 12px;}.qlp .sua .n{width: 36px; height: 36px; font-size: 14px;}.qlp .device{width: 230px; border-radius: 32px; padding: 9px;}.qlp .device .scr{height: 400px; border-radius: 24px;}.qlp .toast{font-size: 13px; padding: 10px 12px;}.qlp .toast.alert{top: 56px;}.qlp .toast.mail{bottom: 44px;}.qlp .sys .col{grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);}.qlp .sys .head{grid-column: 1 / -1;}.qlp .sys .box{padding: 10px 12px; font-size: 14px;}.qlp .steps li{padding-top: 14px;}.qlp .prompt .btn{width: 100%;}.qlp .sticky{display: grid; grid-template-columns: 1fr 1.6fr; gap: 10px; position: fixed; left: 0; right: 0; bottom: 0; z-index: 40; padding: 10px 16px calc(10px + env(safe-area-inset-bottom, 0px)); background: var(--surface); border-top: 1px solid var(--line); box-shadow: 0 -6px 18px rgba(10,25,35,.12); transform: translateY(110%); transition: transform .25s ease;}.qlp .sticky.show{transform: none;}.qlp .sticky .btn{padding: 12px 10px; font-size: 16px;}}
@media (prefers-reduced-motion: reduce){.qlp .bar i,.qlp .sticky{transition: none;}}
html{scroll-behavior:smooth}
.et-l--header,.et-l--footer,#main-header,#top-header,#main-footer{display:none!important}
#page-container{padding-top:0!important}
body.page{background:#f6f7f4}
.qlp p,.qlp li{padding:0}
.qlp ul,.qlp ol{list-style:none;padding:0}
.qlp .sua ul,.qlp .drivers ul,.qlp .prep ul{list-style:disc;padding-left:18px}
.qlp blockquote{margin:0;padding:0;border:0;font-style:normal}
.qlp figure{margin:0}
.qlp h1,.qlp h2,.qlp h3{font-family:var(--font);font-weight:600;padding-bottom:0;color:inherit}
.qlp .top{position:fixed!important;top:0;left:0;right:0;z-index:99}
.qlp .top-spacer{height:63px}
@media (max-width:640px){.qlp .top-spacer{height:57px}}
.qlp-form-section{padding:0!important;height:0;overflow:hidden}
.qlp-divi-form{position:absolute!important;left:-10000px!important;width:600px}
</style>
<div class="qlp">
<header class="top">
  <div class="wrap">
    <img class="logo" src="https://cdn.jsdelivr.net/gh/agrawalnisha096-web/Test-1@0125c626da472733ad87d223b64a2b9f9846f0eb/google-ads/landing-assets/qubik-logo.png" alt="Qubik" width="109" height="42">
    <div class="top-right">
      <a class="phone" href="tel:+61732058938"><span>Talk to us</span>(07) 3205 8938</a>
      <a class="btn sm" href="#book">Book a free call</a>
    </div>
  </div>
</header>
<div class="top-spacer" aria-hidden="true"></div>
<section class="hero">
  <div class="wrap">
    <div>
      <div class="eyebrow" data-v="eyebrow">Business process automation · AI dashboards · Australia-wide</div>
      <h1 data-v="h1">Business process automation that does the work and shows you everything</h1>
      <p class="sub" data-v="sub">We automate the manual work slowing your team down and connect it to live dashboards, built on the systems you already use. Less admin, faster reporting, clearer numbers.</p>
      <div class="hero-ctas">
        <a class="btn" href="#book">Book a free discovery call</a>
        <a class="btn line" href="#automate">See what we automate</a>
      </div>
      <ul class="trust">
        <li>Accountants since 2007</li>
        <li>Xero partner since 2013</li>
        <li>For businesses of 10 to 1,000+ staff</li>
      </ul>
    </div>
    <div class="formcard" id="book">
      <form id="qlp-lead" novalidate>
        <div class="progress" aria-live="polite"><span id="step-label">Step 1 of 3</span><div class="bar" aria-hidden="true"><i id="bar"></i></div></div>
        <fieldset class="step" data-step="1">
          <legend><h2>What's the biggest challenge holding your business back?</h2></legend>
          <p class="lead">Select up to two.</p>
          <div class="chips">
            <label class="chip"><input type="checkbox" name="automate" value="Lack of visibility over performance"><span>Lack of visibility over performance</span></label>
            <label class="chip"><input type="checkbox" name="automate" value="High staff costs &amp; manual work"><span>High staff costs &amp; manual work</span></label>
            <label class="chip"><input type="checkbox" name="automate" value="Falling profits &amp; missed opportunities"><span>Falling profits &amp; missed opportunities</span></label>
            <label class="chip"><input type="checkbox" name="automate" value="Cash flow &amp; late payments"><span>Cash flow &amp; late payments</span></label>
            <label class="chip"><input type="checkbox" name="automate" value="Disconnected systems &amp; reporting"><span>Disconnected systems &amp; reporting</span></label>
            <label class="chip"><input type="checkbox" name="automate" value="Growing without hiring more staff"><span>Growing without hiring more staff</span></label>
          </div>
          <p class="err" data-err hidden>Pick at least one.</p>
          <button class="btn navy" type="button" data-next>Next</button>
        </fieldset>
        <fieldset class="step" data-step="2" hidden>
          <legend><h2>Tell us about your business</h2></legend>
          <p class="lead">So we can bring relevant examples to the call.</p>
          <div class="two">
            <label class="f" for="f-staff">Staff
              <select id="f-staff" name="staff" required>
                <option value="">Select</option><option>Under 10</option><option>10–50</option><option>51–200</option><option>201–1,000</option><option>1,000+</option>
              </select></label>
            <label class="f" for="f-rev">Annual revenue
              <select id="f-rev" name="revenue" required>
                <option value="">Select</option><option>Under A$2M</option><option>A$2–10M</option><option>A$10–50M</option><option>A$50–200M</option><option>Over A$200M</option>
              </select></label>
          </div>
          <label class="f" for="f-when">When would you like this sorted?
            <select id="f-when" name="timing" required>
              <option value="">Select</option><option>Now, ASAP</option><option>This quarter</option><option>Within 6 months</option><option>Just exploring for now</option>
            </select></label>
          <label class="f" for="f-challenge">Your biggest reporting or automation challenge <small>(optional)</small>
            <textarea id="f-challenge" name="challenge" rows="2"></textarea></label>
          <p class="err" data-err hidden>Please answer staff, revenue and timing.</p>
          <div class="actions"><button class="btn ghost" type="button" data-back>Back</button><button class="btn navy full" type="button" data-next>Next</button></div>
        </fieldset>
        <fieldset class="step" data-step="3" hidden>
          <legend><h2>Where should we call you?</h2></legend>
          <p class="lead">We'll call to set up a time that suits you.</p>
          <div class="two">
            <label class="f" for="f-name">Name<input id="f-name" name="name" autocomplete="name" required></label>
            <label class="f" for="f-company">Company<input id="f-company" name="company" autocomplete="organization" required></label>
          </div>
          <div class="two">
            <label class="f" for="f-email">Business email<input id="f-email" name="email" type="email" autocomplete="email" required></label>
            <label class="f" for="f-phone">Mobile<input id="f-phone" name="phone" type="tel" autocomplete="tel" required></label>
          </div>
          <label class="f" for="f-role">Your role
            <select id="f-role" name="role" required>
              <option value="">Select</option><option>Owner / Founder</option><option>CEO / Managing Director</option><option>CFO / Finance</option><option>COO / Operations</option><option>General Manager</option><option>Other</option>
            </select></label>
          <label class="consent" for="f-consent"><input id="f-consent" name="consent" type="checkbox" required> I agree to Qubik contacting me by phone, email or SMS about this enquiry. I can opt out at any time.</label>
          <p class="err" data-err hidden>Please fill in every field and tick the box.</p>
          <div class="actions"><button class="btn ghost" type="button" data-back>Back</button><button class="btn full" type="submit" id="qlp-submit">Book my free call</button></div>
        </fieldset>
        <input type="hidden" name="estimate" id="f-estimate">
        <input type="hidden" name="variant" id="f-variant">
      </form>
      <p class="status" id="qlp-status" role="status" hidden></p>
      <div class="reassure" id="reassure"><span>Free discovery call</span><span>No obligation</span><span>We'll tell you honestly if it's not worth it</span></div>
    </div>
  </div>
</section>
</div>
```

### Code 2: Page body and scripts (Section C, Fullwidth Code module)

```html
<div class="qlp">
<div class="band">
  <div class="wrap">
    <figure class="screen">
      <div class="chrome" aria-hidden="true"><i></i><i></i><i></i><span>Profitability dashboard · overview</span></div>
      <img src="https://cdn.jsdelivr.net/gh/agrawalnisha096-web/Test-1@0125c626da472733ad87d223b64a2b9f9846f0eb/google-ads/landing-assets/screen-overview.webp" width="1400" height="875" alt="Qubik profitability dashboard overview showing profit, margin, revenue against cost and profit by site">
    </figure>
    <p class="caption">A Qubik profitability dashboard · sample data · fictional names</p>
    <ul class="strip" aria-label="What you get">
      <li><span class="ic" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg></span>Complete visibility</li>
      <li><span class="ic" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 17l6-6 4 4 8-8M15 7h6v6"/></svg></span>Greater profitability</li>
      <li><span class="ic" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8"/></svg></span>Intelligent automation</li>
      <li><span class="ic" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3 8-8"/><path d="M20 12v7H4V5h11"/></svg></span>Smarter decisions</li>
      <li><span class="ic" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="13" rx="2"/><circle cx="12" cy="12.5" r="3"/></svg></span>Better cash flow</li>
      <li><span class="ic" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg></span>Growth without the overheads</li>
    </ul>
  </div>
</div>
<section class="block">
  <div class="wrap">
    <div class="kicker">The real cost</div>
    <h2>Your people are your biggest cost. How much of their week goes on spreadsheets?</h2>
    <p class="intro">In most growing businesses, skilled, well-paid people spend hours every week collecting, copying and checking numbers so someone else can make a decision. If any of these sound familiar, your business has outgrown its manual processes.</p>
    <div class="staff">
      <ul class="pains">
        <li><div class="ic" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg></div><div><strong>Reports depend on one person</strong><span>When they're away, or leave, the numbers stop.</span></div></li>
        <li><div class="ic" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg></div><div><strong>Month-end means late nights</strong><span>Overtime and stress just to pull the figures together, weeks after the month ends.</span></div></li>
        <li><div class="ic" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M16 21v-2a4 4 0 0 0-8 0v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M20 8v6M23 11h-6"/></svg></div><div><strong>Hiring admin just to keep up</strong><span>Every new customer or site adds headcount, not just revenue.</span></div></li>
        <li><div class="ic" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M17 7 7 17M7 7h10v10"/></svg></div><div><strong>Good people leave</strong><span>Copy-and-paste work wears people down, and replacing them is expensive.</span></div></li>
        <li><div class="ic" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/></svg></div><div><strong>Systems that don't talk to each other</strong><span>The same data typed into three places, and different answers to the same question.</span></div></li>
        <li><div class="ic" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/></svg></div><div><strong>No clear view of profit</strong><span>You can't easily see which sites, customers or projects make money until it's too late to act.</span></div></li>
      </ul>
      <div class="calc" aria-labelledby="calc-h">
        <h3 id="calc-h">What does manual work cost you?</h3>
        <p>Put in your own numbers. Nothing is sent unless you book a call.</p>
        <div class="inputs">
          <label for="c-people">People doing manual reporting or admin<input id="c-people" type="number" min="0" step="1" value="3" inputmode="numeric"></label>
          <label for="c-hours">Hours a week each, on average<input id="c-hours" type="number" min="0" step="1" value="10" inputmode="numeric"></label>
          <label for="c-rate"><span>Hourly cost per person (A$)<small>Include super and on-costs</small></span><input id="c-rate" type="number" min="0" step="1" value="55" inputmode="numeric"></label>
        </div>
        <div class="result" aria-live="polite">
          <div class="big" id="c-total">A$75,900</div>
          <p class="res-sub">a year on manual work, <span id="c-hrs">1,380</span> hours (about <span id="c-fte">0.8</span> of a full-time role)</p>
          <p class="per10">Every 10% of that work handed to a system is worth <b id="c-10">A$7,590</b> a year, and gives your people that time back.</p>
          <p class="fine">Based on 46 working weeks a year and a 38-hour week. An estimate to start the conversation, not a quote.</p>
          <a class="btn" href="#book">Talk through my numbers on a free call</a>
        </div>
      </div>
    </div>
  </div>
</section>
<section class="block alt" id="automate">
  <div class="wrap">
    <div class="kicker">What we automate</div>
    <h2>The work your team shouldn't be doing by hand</h2>
    <p class="intro">We start with the processes that cost you most, and automate them inside the systems you already use. A few of the most common:</p>
    <div class="auto">
      <div class="auto-card"><h3><span class="ic" aria-hidden="true"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2h9l5 5v15H6z"/><path d="M15 2v5h5M9 13h8M9 17h6"/></svg></span>Supplier bills</h3><p class="today"><span class="lbl">Today</span>Typed into your accounting system one by one, then checked against the order.</p><p class="after"><span class="lbl">Automated</span>Read as they arrive, matched to the order and posted. Only mismatches reach a person.</p></div>
      <div class="auto-card"><h3><span class="ic" aria-hidden="true"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h12"/></svg></span>Customer orders</h3><p class="today"><span class="lbl">Today</span>Re-keyed line by line from emails and PDFs.</p><p class="after"><span class="lbl">Automated</span>Drafted straight into your system, ready for a quick check and approval.</p></div>
      <div class="auto-card"><h3><span class="ic" aria-hidden="true"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg></span>The reporting pack</h3><p class="today"><span class="lbl">Today</span>Days of exporting, copying and formatting at every month-end.</p><p class="after"><span class="lbl">Automated</span>Built and sent automatically, every week, from live data.</p></div>
      <div class="auto-card"><h3><span class="ic" aria-hidden="true"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3 8-8"/><path d="M20 12v7H4V5h11"/></svg></span>Approvals and follow-ups</h3><p class="today"><span class="lbl">Today</span>Chased by email, phone and memory.</p><p class="after"><span class="lbl">Automated</span>Routed to the right person, reminded on time, and logged.</p></div>
      <div class="auto-card"><h3><span class="ic" aria-hidden="true"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 7h10v10H7z"/><path d="M3 3h4M17 3h4M3 21h4M17 21h4"/></svg></span>Data between systems</h3><p class="today"><span class="lbl">Today</span>The same details typed into three different places.</p><p class="after"><span class="lbl">Automated</span>Entered once and kept in sync everywhere it's needed.</p></div>
      <div class="auto-card"><h3><span class="ic" aria-hidden="true"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 5h16v11H8l-4 4z"/></svg></span>Routine enquiries</h3><p class="today"><span class="lbl">Today</span>The same questions answered by hand, often by your busiest people.</p><p class="after"><span class="lbl">Automated</span>Answered straight away. Anything unusual goes to your team.</p></div>
    </div>
    <div class="prompt"><p>Not sure which of your processes are worth automating?<span>That's what the free call is for. We'll point out the two or three that would pay back first.</span></p><a class="btn" href="#book">Book a free discovery call</a></div>
  </div>
</section>
<section class="block" id="dashboards">
  <div class="wrap">
    <div class="kicker">And see all of it</div>
    <h2>One clear view of your whole business</h2>
    <p class="intro">Automation keeps your data clean and current. Dashboards turn it into answers: your financial, sales, operational and staffing numbers in one place, updated automatically.</p>
    <div class="tabs" role="tablist" aria-label="Dashboard views" data-tabs="screens">
      <button class="tab" role="tab" aria-selected="true" aria-controls="p-site" id="t-site">Profit by site</button>
      <button class="tab" role="tab" aria-selected="false" aria-controls="p-heatmap" id="t-heatmap">Margin heatmap</button>
      <button class="tab" role="tab" aria-selected="false" aria-controls="p-metrics" id="t-metrics">Business metrics</button>
      <button class="tab" role="tab" aria-selected="false" aria-controls="p-forecast" id="t-forecast">Forecast</button>
      <button class="tab" role="tab" aria-selected="false" aria-controls="p-alerts" id="t-alerts">Alerts</button>
      <button class="tab" role="tab" aria-selected="false" aria-controls="p-reconcile" id="t-reconcile">Reconciliation</button>
    </div>
    <div class="panel" role="tabpanel" id="p-site" aria-labelledby="t-site">
      <div><span class="lbl" style="color:var(--teal-ink);margin-bottom:6px">Shown for a healthcare group (clinics)</span><h3>Drill down to any site, customer or project</h3><p>One click from the big picture to a single site: its KPIs, cost stack, profit by period and a full P&amp;L for every period.</p></div>
      <figure class="screen"><img src="https://cdn.jsdelivr.net/gh/agrawalnisha096-web/Test-1@0125c626da472733ad87d223b64a2b9f9846f0eb/google-ads/landing-assets/tab-healthcare-site.webp" loading="lazy" width="1400" height="875" alt="Clinic profitability page with KPIs, cost stack and period P&amp;L"></figure>
    </div>
    <div class="panel" role="tabpanel" id="p-heatmap" aria-labelledby="t-heatmap" hidden>
      <div><span class="lbl" style="color:var(--teal-ink);margin-bottom:6px">Shown for a hospitality group (venues)</span><h3>See where margin is leaking</h3><p>Every site across every period, coloured by margin. Problems that hide inside a total stand out at a glance.</p></div>
      <figure class="screen"><img src="https://cdn.jsdelivr.net/gh/agrawalnisha096-web/Test-1@0125c626da472733ad87d223b64a2b9f9846f0eb/google-ads/landing-assets/tab-hospitality-heatmap.webp" loading="lazy" width="1400" height="702" alt="Margin heatmap of every venue across 26 periods"></figure>
    </div>
    <div class="panel" role="tabpanel" id="p-metrics" aria-labelledby="t-metrics" hidden>
      <div><span class="lbl" style="color:var(--teal-ink);margin-bottom:6px">Shown for a logistics business (depots)</span><h3>The numbers behind the numbers</h3><p>Revenue and labour cost per job, contribution margin, break-even headroom and productivity, in your industry's own units.</p></div>
      <figure class="screen"><img src="https://cdn.jsdelivr.net/gh/agrawalnisha096-web/Test-1@0125c626da472733ad87d223b64a2b9f9846f0eb/google-ads/landing-assets/tab-logistics-metrics.webp" loading="lazy" width="1400" height="875" alt="Business metrics page with unit economics per consignment"></figure>
    </div>
    <div class="panel" role="tabpanel" id="p-forecast" aria-labelledby="t-forecast" hidden>
      <div><span class="lbl" style="color:var(--teal-ink);margin-bottom:6px">Shown for a retail group (stores)</span><h3>Look ahead, not just back</h3><p>A rolling forecast built from work that's already booked, so you can see the next six weeks of revenue, labour and profit, not just last month's.</p></div>
      <figure class="screen"><img src="https://cdn.jsdelivr.net/gh/agrawalnisha096-web/Test-1@0125c626da472733ad87d223b64a2b9f9846f0eb/google-ads/landing-assets/tab-retail-forecast.webp" loading="lazy" width="1400" height="875" alt="Six-week forecast page by store"></figure>
    </div>
    <div class="panel" role="tabpanel" id="p-alerts" aria-labelledby="t-alerts" hidden>
      <div><span class="lbl" style="color:var(--teal-ink);margin-bottom:6px">Shown for a facilities services business (contracts)</span><h3>Problems come to you</h3><p>Margin breaches, staffing variances and out-of-date data are flagged automatically, against thresholds you set and can change.</p></div>
      <figure class="screen"><img src="https://cdn.jsdelivr.net/gh/agrawalnisha096-web/Test-1@0125c626da472733ad87d223b64a2b9f9846f0eb/google-ads/landing-assets/tab-facilities-alerts.webp" loading="lazy" width="1400" height="875" alt="Alerts page listing margin, staffing and data feed alerts by contract"></figure>
    </div>
    <div class="panel" role="tabpanel" id="p-reconcile" aria-labelledby="t-reconcile" hidden>
      <div><span class="lbl" style="color:var(--teal-ink);margin-bottom:6px">Shown for a mining and civil services business (sites)</span><h3>Numbers you can trust</h3><p>Dashboard figures are tied back to the closed results in your accounting system every month, with any difference explained. Built by accountants, checked like accountants.</p></div>
      <figure class="screen"><img src="https://cdn.jsdelivr.net/gh/agrawalnisha096-web/Test-1@0125c626da472733ad87d223b64a2b9f9846f0eb/google-ads/landing-assets/tab-mining-reconcile.webp" loading="lazy" width="1400" height="875" alt="Reconciliation page tying dashboard results to the accounting system"></figure>
    </div>
    <p class="caption">Real screens from Qubik's dashboard, each shown in a different industry · sample data · fictional names</p>
    <p class="caption">The same dashboards speak your industry's language: transport and logistics, hospitality, healthcare, mining and civil, retail, facilities services, early learning and aviation services.</p>
    <div class="prompt"><p>Want to see what a dashboard for your business could show?<span>Book a free call and we'll talk through your numbers and your systems.</span></p><a class="btn" href="#book">Book a free discovery call</a></div>
  </div>
</section>
<section class="block alt">
  <div class="wrap">
    <div class="kicker">Insight into action</div>
    <h2>Dashboards that don't just report. They act.</h2>
    <p class="intro">Seeing a problem is only half the job. Your dashboards, AI and automation work together, so the follow-through happens too.</p>
    <div class="act">
      <div>
        <div class="sua">
          <div><div class="n">01</div><div><h3>Know what's happening</h3><ul><li>Live figures, not month-end reports</li><li>Every site, customer and period in one place</li></ul></div></div>
          <div><div class="n">02</div><div><h3>Understand why</h3><ul><li>Drill from the total to the transaction</li><li>Unusual trends and exceptions highlighted</li></ul></div></div>
          <div><div class="n">03</div><div><h3>Act on it, automatically</h3><ul><li>Alerts to the right person when a number moves outside its range</li><li>Reports built and sent without anyone touching them</li><li>Approvals, follow-ups and data entry handled for you</li></ul></div></div>
        </div>
        <p class="control"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M7.5 12.5l3 3 6-6.5"/></svg>Your people stay in control: anything the system isn't sure about goes to a person to decide.</p>
      </div>
      <figure class="phone-wrap" style="margin:0" aria-label="Illustration: Monday morning on a phone, with a margin alert and the weekly report already sent">
        <div class="device"><div class="scr"><img src="https://cdn.jsdelivr.net/gh/agrawalnisha096-web/Test-1@0125c626da472733ad87d223b64a2b9f9846f0eb/google-ads/landing-assets/phone-overview.webp" loading="lazy" width="600" height="1298" alt=""></div></div>
        <div class="toast alert" aria-hidden="true"><span class="ic"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/></svg></span><span><b>Margin alert · Townsville</b>4.1% this fortnight, below your 5% threshold.<br><small>Monday 6:58am</small></span></div>
        <div class="toast mail" aria-hidden="true"><span class="ic"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4 6h16v12H4z"/><path d="M4 7l8 6 8-6"/></svg></span><span><b>Weekly profit report</b>Sent automatically to the leadership team.<br><small>Monday 7:00am</small></span></div>
        <figcaption class="caption">Illustration · sample data · fictional names</figcaption>
      </figure>
    </div>
  </div>
</section>
<section class="block" id="ai" data-only="ai" hidden>
  <div class="wrap">
    <div class="kicker">Practical AI</div>
    <h2>AI that earns its keep, not AI for the sake of it</h2>
    <p class="intro">We use AI where it saves real time or money in your business, always with your people in control.</p>
    <div class="ai-grid">
      <div class="ai-card"><div class="ic" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 5h16v11H8l-4 4z"/><path d="M8 10h8"/></svg></div><h3>Ask your numbers questions</h3><p>"Which sites lost margin this month, and why?" Answers in plain English, where supported.</p></div>
      <div class="ai-card"><div class="ic" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2h9l5 5v15H6z"/><path d="M15 2v5h5"/></svg></div><h3>Documents read for you</h3><p>Invoices, orders and forms read and entered automatically, so nobody re-keys them.</p></div>
      <div class="ai-card"><div class="ic" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 17l6-6 4 4 8-8"/><circle cx="21" cy="7" r="1.5"/></svg></div><h3>Problems spotted early</h3><p>Unusual trends and exceptions highlighted before they show up in the month-end numbers.</p></div>
      <div class="ai-card"><div class="ic" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg></div><h3>Drafts, not decisions</h3><p>Replies, summaries and reports drafted by AI, checked and approved by a person.</p></div>
    </div>
  </div>
</section>
<section class="block">
  <div class="wrap">
    <div class="kicker">How it connects</div>
    <h2>Built around your systems, not the other way around</h2>
    <p class="intro">We connect to the software you already run and bring it together around your business rules. Nothing about how your team works in those systems has to change.</p>
    <div class="sys">
      <div class="col">
        <div class="head">Your systems today</div>
        <div class="box"><b>Accounting &amp; ERP</b><span>Xero, MYOB, NetSuite and others</span></div>
        <div class="box"><b>Payroll &amp; rostering</b><span>timesheets, rosters, labour costs</span></div>
        <div class="box"><b>Sales, CRM &amp; operations</b><span>jobs, bookings, orders, inventory</span></div>
        <div class="box"><b>Spreadsheets</b><span>schedules, budgets, the workbook only one person understands</span></div>
      </div>
      <div class="arrow" aria-hidden="true"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></div>
      <div class="core"><b>One trusted model of your business</b><span>Secure, read-only connections. Your costing rules, periods and targets, set up by accountants. Checked back to your accounts every month.</span></div>
      <div class="arrow" aria-hidden="true"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></div>
      <div class="col">
        <div class="head">What you get</div>
        <div class="box out"><b>Automation</b><span>reports, follow-ups and data entry that run themselves</span></div>
        <div class="box out"><b>Dashboards</b><span>for leaders, managers and each site</span></div>
        <div class="box out"><b>Alerts</b><span>pushed to the right person when something needs attention</span></div>
      </div>
    </div>
    <div class="sys-notes">
      <span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg>Read-only access to your systems</span>
      <span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg>Secure sign-in; each person sees only what they should</span>
      <span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg>Your existing systems keep working exactly as they do now</span>
    </div>
  </div>
</section>
<section class="vision">
  <div class="wrap">
    <div class="kicker">Why Qubik</div>
    <h2>Automation and business intelligence, built by accountants</h2>
    <p class="vbig">Most automation firms start with the technology. We start with your numbers: how your business makes money, where time and margin leak, and what's worth fixing first.</p>
    <dl class="vstats">
      <div><dt>Helping Australian businesses</dt><dd>Since 2007</dd></div>
      <div><dt>Xero partner</dt><dd>Since 2013</dd></div>
      <div><dt>Businesses we work with</dt><dd>10 to 1,000+ staff</dd></div>
      <div><dt>Based in Brisbane, QLD</dt><dd>Australia-wide</dd></div>
    </dl>
    <div class="vquote">
      <div class="avatar" aria-hidden="true">DG</div>
      <div>
        <div class="kicker">Our vision</div>
        <blockquote>
          <p>"Having spent years helping business owners navigate challenges and unlock opportunities, I believe we are entering an extraordinary new era where AI and automation will fundamentally redefine what businesses can achieve.</p>
          <p>My vision is to empower ambitious, growing businesses with the intelligence, efficiency and capabilities to compete at the highest level — transforming information into insights, repetitive work into automation, and untapped human potential into extraordinary results."</p>
        </blockquote>
        <cite><b>Dominic Guinea</b>, founder and CEO, Qubik</cite>
      </div>
    </div>
  </div>
</section>
<section class="block">
  <div class="wrap">
    <div class="kicker">From our clients</div>
    <h2>More like a partner in your business</h2>
    <div class="testi">
      <div class="video" id="video">
        <button type="button" aria-label="Play video: Adiel Ben Karmona, Pilpel, on working with Qubik">
          <img src="https://i.ytimg.com/vi/T25_tW_BumY/hqdefault.jpg" alt="" loading="lazy" width="480" height="360">
          <span class="play" aria-hidden="true"><svg width="30" height="30" viewBox="0 0 24 24" fill="#22333f"><path d="M8 5v14l11-7z"/></svg></span>
        </button>
      </div>
      <div class="qcol">
        <div class="quote"><blockquote>"Qubik isn't just an accounting firm, it's really more like a partner in your business. I think their added value is something that doesn't exist in other accounting firms."</blockquote><cite>Adiel Ben Karmona, owner and head chef, Pilpel</cite></div>
        <div class="quote"><blockquote>"Dom has saved us more money than we've spent!"</blockquote><cite>Mike Wikes, Man Group</cite></div>
      </div>
    </div>
    <div class="prompt"><p>Ready to see what's possible for your business?<span>A free discovery call with business experts, not salespeople.</span></p><a class="btn" href="#book">Book a free discovery call</a></div>
  </div>
</section>
<section class="block alt">
  <div class="wrap">
    <div class="kicker">How it works</div>
    <h2>Start with what pays back. See it working before you commit.</h2>
    <ol class="steps">
      <li><h3>Free discovery call</h3><p>We learn how your business runs, where the time goes and what you can't see today.</p></li>
      <li><h3>Scoping and prototype</h3><p>We map your processes and systems, and <strong style="background:var(--lime-soft);color:var(--ink);padding:1px 5px;border-radius:4px">show you a working prototype</strong>, so you can see it and shape it before deciding on the build.</p></li>
      <li><h3>Build</h3><p>We automate and connect your systems to the agreed design, checked against your current reports before go-live.</p></li>
      <li><h3>Support and grow</h3><p>We keep it running as your business changes, and add the next process or dashboard when you're ready.</p></li>
    </ol>
    <div class="callbox">
      <div>
        <h3>What you'll get from the free call</h3>
        <p>Thirty minutes with business experts who understand both the numbers and the technology. The biggest opportunities usually sit where business efficiency and technology efficiency meet, and that's where we look.</p>
        <a class="btn" href="#book">Book my free call</a>
      </div>
      <ul class="tick">
        <li><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg><span>An honest view of what automation and better reporting could be worth to you</span></li>
        <li><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg><span>The two or three opportunities most likely to pay back first</span></li>
        <li><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg><span>A rough idea of what's involved, and what it depends on</span></li>
        <li><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg><span>No obligation, and no hard sell</span></li>
      </ul>
    </div>
  </div>
</section>
<section class="block alt">
  <div class="wrap" id="pricing-anchor">
    <div class="kicker">Pricing</div>
    <h2>How pricing works</h2>
    <p class="intro">Every business is different, so we don't sell packages. We agree the design with you first, then price the build against it, so the price you sign reflects exactly what you approved.</p>
    <div class="pricing">
      <div class="pcard"><span class="label">Scoping &amp; prototype</span><h3>Fixed fee, agreed upfront</h3><p>We map your processes, systems and requirements and <strong style="background:var(--lime-soft);color:var(--ink);padding:1px 5px;border-radius:4px">show you a working prototype</strong>. No obligation to go further: you keep the requirements and findings.</p></div>
      <div class="pcard"><span class="label">Build</span><h3>Fixed price, against the agreed design</h3><p>Priced once the design is agreed, as a fixed project price, staged in phases, or spread as a monthly fee.</p></div>
      <div class="pcard"><span class="label">Ongoing support</span><h3>Optional, monthly</h3><p>Keeps your automation, dashboards and data feeds running and up to date as your business changes.</p></div>
    </div>
    <div class="drivers">
      <div><h3>What affects the cost</h3><ul><li>How many processes, systems and data sources are involved</li><li>How many sites, entities and dashboards</li><li>How much automation and alerting you want</li></ul></div>
      <div><h3>How we keep it low-risk</h3><ul><li>You see a working prototype before the build</li><li>Start with what pays back fastest</li><li>Your existing systems stay exactly as they are</li></ul></div>
    </div>
    <p class="promise"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M7.5 12.5l3 3 6-6.5"/></svg>You'll always know the price before any work starts.</p>
  </div>
</section>
<section class="block">
  <div class="wrap">
    <div class="kicker">Questions</div>
    <h2>Questions we get asked</h2>
    <div class="faq">
      <details><summary>We're not a tech business. Is this for us?</summary><p>Yes. Automation and dashboards are for businesses that want less manual work and clearer numbers, not for tech companies. You don't need technical staff: we build it, explain it in plain English and support it.</p></details>
      <details><summary>Will it work with our software?</summary><p>We can normally work with any software you have: accounting, payroll, rostering, CRM, operational systems and spreadsheets. We'll check your setup on the call.</p></details>
      <details><summary>Do we have to change our systems?</summary><p>No. We connect to your systems with read-only access wherever possible, and your team keeps working in them exactly as they do now.</p></details>
      <details><summary>How long does it take?</summary><p>We're fast, and we move as quickly as your team can handle. You'll see a working prototype early in scoping, which typically takes two to three weeks, and the build moves at the pace your people can test and adopt it. You'll have a timeline before you commit to anything.</p></details>
      <details><summary>What happens on the call?</summary><p>A relaxed 30-minute conversation by phone or video with business experts, not salespeople. We look for both business efficiencies and technology efficiencies; where the two meet is usually the richest source of opportunities. You'll leave with an honest view of what's worth doing.</p></details>
      <details><summary>Will automation replace our staff?</summary><p>It replaces the repetitive part of their work, not the people. Most businesses use the time it frees up to grow without hiring more admin, and to give good people more interesting work.</p></details>
      <details><summary>Is our data safe?</summary><p>Yes. We only use the access the work needs, read-only wherever possible. Dashboards sit behind secure sign-in, and access can be limited so each person sees only what they should, for example a manager seeing only their own site.</p></details>
      <details><summary>Where does AI come in?</summary><p>Where it genuinely helps: reading documents so nobody re-keys them, highlighting unusual trends, and answering questions about your data in everyday language where supported. Your people stay in control of decisions.</p></details>
      <details><summary>What does it cost?</summary><p>It depends on your processes and systems, so we don't publish packages. See <a href="#pricing-anchor">how pricing works</a> above; you'll always know the price before any work starts.</p></details>
    </div>
  </div>
</section>
<section class="final">
  <div class="wrap">
    <div>
      <h2>Discover what's possible for your business</h2>
      <p>You don't need another spreadsheet. You need less manual work, a clearer view of your business and a smarter way to run it.</p>
    </div>
    <div class="ctas"><a class="btn" href="#book">Book a free discovery call</a><a class="btn line" href="tel:+61732058938">Call (07) 3205 8938</a></div>
  </div>
</section>
<footer>
  <div class="wrap">
    <img src="https://cdn.jsdelivr.net/gh/agrawalnisha096-web/Test-1@0125c626da472733ad87d223b64a2b9f9846f0eb/google-ads/landing-assets/qubik-logo-white.png" alt="Qubik" width="88" height="34">
    <span>Qubik Accounting · 18–22 Dixon Street, Strathpine QLD 4500</span>
    <span><a href="tel:+61732058938">(07) 3205 8938</a> · <a href="https://qubik.com.au/privacy-policy/">Privacy policy</a></span>
  </div>
</footer>
<div class="sticky" id="sticky" aria-label="Quick actions">
  <a class="btn navy" href="tel:+61732058938">Call</a>
  <a class="btn" href="#book">Book a free call</a>
</div>
</div>
<script data-no-optimize="1">(function () {
  /* Headline by ad group: ?v=ai or ?v=dashboards; default is automation */
  var VARIANTS = {
    ai: {
      title: 'Practical AI and automation | Qubik',
      eyebrow: 'AI consulting & implementation · Australia-wide',
      h1: 'Practical AI that does the work and shows you everything',
      sub: 'AI and automation put to work on your real processes and numbers, scoped by accountants and built on the systems you already use. Less admin, faster reporting, clearer decisions.'
    },
    dashboards: {
      title: 'AI dashboards and automation | Qubik',
      eyebrow: 'AI dashboards & business process automation · Australia-wide',
      h1: 'See everything happening in your business, and automate what happens next',
      sub: 'Live dashboards and intelligent automation, built on the systems you already use. Stop waiting for month-end reports, and free your team from work a system should be doing.'
    }
  };
  var variant = new URLSearchParams(window.location.search).get('v') || 'automation';
  var copy = VARIANTS[variant];
  if (copy) {
    document.title = copy.title;
    document.querySelectorAll('[data-v]').forEach(function (el) { el.textContent = copy[el.getAttribute('data-v')]; });
  } else {
    variant = 'automation';
  }
  document.querySelectorAll('[data-only]').forEach(function (el) { el.hidden = el.getAttribute('data-only') !== variant; });
  document.getElementById('f-variant').value = variant;
  /* Tabs */
  document.querySelectorAll('[data-tabs]').forEach(function (list) {
    var tabs = list.querySelectorAll('[role=tab]');
    function select(tab) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
      });
    }
    tabs.forEach(function (t, i) {
      t.tabIndex = i === 0 ? 0 : -1;
      t.addEventListener('click', function () { select(t); });
      t.addEventListener('keydown', function (e) {
        var n = null;
        if (e.key === 'ArrowRight') { n = tabs[(i + 1) % tabs.length]; }
        if (e.key === 'ArrowLeft') { n = tabs[(i - 1 + tabs.length) % tabs.length]; }
        if (n) { e.preventDefault(); select(n); n.focus(); }
      });
    });
  });
  /* Staff-cost calculator; the estimate travels with the form */
  var WEEKS = 46, FULL_TIME = 38 * 46, edited = false;
  var money = new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 });
  var num = new Intl.NumberFormat('en-AU', { maximumFractionDigits: 0 });
  function aud(v) { return money.format(v).replace('$', 'A$'); }
  function val(id) { var v = parseFloat(document.getElementById(id).value); return isFinite(v) ? Math.max(v, 0) : 0; }
  function calc() {
    var people = val('c-people'), hrsEach = val('c-hours'), rate = val('c-rate');
    var hours = people * hrsEach * WEEKS;
    var cost = hours * rate;
    document.getElementById('c-total').textContent = aud(cost);
    document.getElementById('c-hrs').textContent = num.format(hours);
    document.getElementById('c-fte').textContent = (hours / FULL_TIME).toFixed(1);
    document.getElementById('c-10').textContent = aud(cost / 10);
    document.getElementById('f-estimate').value = edited ? aud(cost) + ' a year (' + people + ' people x ' + hrsEach + ' h/week x ' + aud(rate) + '/h)' : '';
  }
  ['c-people', 'c-hours', 'c-rate'].forEach(function (id) {
    document.getElementById(id).addEventListener('input', function () { edited = true; calc(); });
  });
  calc();
  /* Video loads only when clicked */
  var video = document.getElementById('video');
  video.querySelector('button').addEventListener('click', function () {
    var frame = document.createElement('iframe');
    frame.src = 'https://www.youtube-nocookie.com/embed/T25_tW_BumY?autoplay=1';
    frame.title = 'Adiel Ben Karmona, Pilpel, on working with Qubik';
    frame.allow = 'autoplay; encrypted-media; picture-in-picture';
    frame.allowFullscreen = true;
    video.textContent = '';
    video.appendChild(frame);
  });
  /* Three-step form (prototype shows thanks; live page hands off to the hidden Divi form) */
  var form = document.getElementById('qlp-lead');
  var steps = form.querySelectorAll('[data-step]');
  var current = 1;
  function show(n) {
    current = n;
    steps.forEach(function (s) { s.hidden = Number(s.getAttribute('data-step')) !== n; });
    document.getElementById('step-label').textContent = 'Step ' + n + ' of 3';
    document.getElementById('bar').style.width = (n / 3 * 100) + '%';
    if (n !== 1) { var first = steps[n - 1].querySelector('input, select'); if (first) { first.focus({ preventScroll: true }); } }
  }
  function valid(n) {
    var s = steps[n - 1], ok;
    if (n === 1) { ok = s.querySelectorAll('input[name=automate]:checked').length !== 0; }
    else { ok = Array.prototype.every.call(s.querySelectorAll('[required]'), function (el) { return el.checkValidity(); }); }
    s.querySelector('[data-err]').hidden = ok;
    return ok;
  }
  var CHIP_MAX = 2;
  var chips = form.querySelectorAll('input[name=automate]');
  function limitChips() {
    var picked = form.querySelectorAll('input[name=automate]:checked').length;
    chips.forEach(function (c) { c.disabled = c.checked ? false : picked >= CHIP_MAX; });
  }
  chips.forEach(function (c) { c.addEventListener('change', limitChips); });
  form.addEventListener('click', function (e) {
    if (e.target.matches('[data-next]')) { if (valid(current)) { show(current + 1); } }
    if (e.target.matches('[data-back]')) { show(current - 1); }
  });
  /* Live form: copy the answers into the hidden Divi Contact Form, which emails them and redirects to the thank-you page */
  var PHONE_MSG = 'Sorry, something went wrong sending your details. Please call us on (07) 3205 8938.';
  function setDivi(id, value) {
    var el = document.querySelector('.qlp-divi-form [data-original_id="' + id + '"]');
    if (el) { el.value = value; }
  }
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!valid(3)) { return; }
    var status = document.getElementById('qlp-status');
    var submitBtn = document.getElementById('qlp-submit');
    var picked = Array.prototype.map.call(form.querySelectorAll('input[name=automate]:checked'), function (el) { return el.value; });
    setDivi('automate', picked.join(', '));
    ['staff', 'revenue', 'timing', 'challenge', 'name', 'company', 'email', 'phone', 'role', 'estimate', 'variant'].forEach(function (k) {
      setDivi(k, form.elements[k].value);
    });
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
  /* Ad click IDs and UTM tags, kept for 90 days, into the hidden Divi fields */
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
  KEYS.concat(['landing_page']).forEach(function (k) { if (saved[k]) { setDivi(k, saved[k]); } });
  /* Sticky mobile bar: after the hero, hidden while the form is on screen */
  var sticky = document.getElementById('sticky');
  var heroGone = false, cardVisible = false;
  function update() { sticky.classList.toggle('show', heroGone ? !cardVisible : false); }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (en) { heroGone = !en[0].isIntersecting; update(); }).observe(document.querySelector('.hero'));
    new IntersectionObserver(function (en) { cardVisible = en[0].isIntersecting; update(); }).observe(document.getElementById('book'));
  }
})();
</script>
```

### Code 3: Thank-you page (Thank you (new), Fullwidth Code module)

```html
<style>@font-face{font-family:'IBM Plex Sans';font-style:normal;font-weight:400;font-display:swap;src:url(https://cdn.jsdelivr.net/npm/@fontsource/ibm-plex-sans@5.1.1/files/ibm-plex-sans-latin-400-normal.woff2) format('woff2')}@font-face{font-family:'IBM Plex Sans';font-style:normal;font-weight:500;font-display:swap;src:url(https://cdn.jsdelivr.net/npm/@fontsource/ibm-plex-sans@5.1.1/files/ibm-plex-sans-latin-500-normal.woff2) format('woff2')}@font-face{font-family:'IBM Plex Sans';font-style:normal;font-weight:600;font-display:swap;src:url(https://cdn.jsdelivr.net/npm/@fontsource/ibm-plex-sans@5.1.1/files/ibm-plex-sans-latin-600-normal.woff2) format('woff2')}@font-face{font-family:'IBM Plex Sans';font-style:normal;font-weight:700;font-display:swap;src:url(https://cdn.jsdelivr.net/npm/@fontsource/ibm-plex-sans@5.1.1/files/ibm-plex-sans-latin-700-normal.woff2) format('woff2')}@font-face{font-family:'IBM Plex Mono';font-style:normal;font-weight:400;font-display:swap;src:url(https://cdn.jsdelivr.net/npm/@fontsource/ibm-plex-mono@5.1.1/files/ibm-plex-mono-latin-400-normal.woff2) format('woff2')}@font-face{font-family:'IBM Plex Mono';font-style:normal;font-weight:500;font-display:swap;src:url(https://cdn.jsdelivr.net/npm/@fontsource/ibm-plex-mono@5.1.1/files/ibm-plex-mono-latin-500-normal.woff2) format('woff2')}</style>
<style>
.qlp{--navy: #2e4455; --navy-deep: #22333f; --teal: #2e96a0; --teal-ink: #1f7a83; --lime: #c6da2c; --lime-soft: #eef3cf; --page: #f6f7f4; --surface: #fff; --ink: #1f2a33; --muted: #5b6b78; --line: #dde3e2; --on-navy: #f3f6f7; --on-navy-muted: #b6c6cd; --ok: #2f8a5b; --note-bg: #fff6d9; --note-ink: #5e4a00; --font: 'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif;}
.qlp *{box-sizing: border-box;}
.qlp{margin: 0; background: var(--page); color: var(--ink); font-family: var(--font); font-size: 17px; line-height: 1.6;}
.qlp h1,.qlp h2,.qlp h3{margin: 0; line-height: 1.2; text-wrap: balance;}
.qlp p{margin: 0;}
.qlp a{color: var(--teal-ink);}
.qlp img{display: block; max-width: 100%;}
.qlp .wrap{max-width: 960px; margin: 0 auto; padding-left: 16px; padding-right: 16px;}
.qlp .top{background: var(--surface); border-bottom: 1px solid var(--line);}
.qlp .top .wrap{display: flex; justify-content: space-between; align-items: center; padding-block: 10px;}
.qlp .top img{height: 42px; width: auto;}
.qlp .top a{font-weight: 600; color: var(--navy); text-decoration: none; font-size: 15px;}
.qlp .hero{background: var(--navy); color: var(--on-navy); text-align: center;}
.qlp .hero .wrap{padding-block: 56px 64px; display: grid; justify-items: center; gap: 14px;}
.qlp .check{width: 64px; height: 64px; border-radius: 50%; background: var(--lime); color: var(--navy-deep); display: grid; place-items: center;}
.qlp .hero h1{font-size: clamp(28px, 4vw, 42px); font-weight: 600;}
.qlp .hero p{color: var(--on-navy-muted); font-size: 19px; max-width: 34em;}
.qlp .btn{font-family: var(--font); font-weight: 600; font-size: 17px; border-radius: 8px; padding: 14px 22px; background: var(--lime); color: var(--navy-deep); text-decoration: none; display: inline-block; margin-top: 8px;}
.qlp section .wrap{padding-block: 56px;}
.qlp h2{font-size: 26px; font-weight: 600;}
.qlp .next{list-style: none; padding: 0; margin: 24px 0 0; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; counter-reset: n;}
.qlp .next li{counter-increment: n; background: var(--surface); border: 1px solid var(--line); border-radius: 12px; padding: 20px; display: grid; gap: 6px; align-content: start;}
.qlp .next li::before{content: counter(n); width: 32px; height: 32px; border-radius: 50%; background: var(--lime-soft); color: var(--navy); display: grid; place-items: center; font-weight: 600;}
.qlp .next h3{font-size: 18px; font-weight: 600;}
.qlp .next p{color: var(--muted); font-size: 15px;}
.qlp .prep{margin-top: 40px; display: grid; grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr); gap: 32px; align-items: center;}
.qlp .prep ul{margin: 14px 0 0; padding-left: 20px; color: var(--muted); display: grid; gap: 6px;}
.qlp .video{position: relative; border-radius: 12px; overflow: hidden; background: #000; aspect-ratio: 16 / 9;}
.qlp .video button{all: unset; cursor: pointer; position: absolute; inset: 0; display: grid; place-items: center;}
.qlp .video button:focus-visible{outline: 3px solid var(--lime); outline-offset: -3px;}
.qlp .video img{position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: .82;}
.qlp .video .play{position: relative; width: 68px; height: 68px; border-radius: 50%; background: var(--lime); display: grid; place-items: center;}
.qlp .video iframe{position: absolute; inset: 0; width: 100%; height: 100%; border: 0;}
.qlp .vcap{margin-top: 8px; font-size: 14px; color: var(--muted);}
.qlp footer{background: var(--navy-deep); color: var(--on-navy-muted); font-size: 14px;}
.qlp footer .wrap{padding-block: 24px; display: flex; flex-wrap: wrap; gap: 12px 24px; justify-content: space-between; align-items: center;}
.qlp footer img{height: 32px; width: auto;}
.qlp footer a{color: var(--on-navy-muted);}
@media (max-width: 760px){.qlp .next,.qlp .prep{grid-template-columns: minmax(0, 1fr);}}
html{scroll-behavior:smooth}
.et-l--header,.et-l--footer,#main-header,#top-header,#main-footer{display:none!important}
#page-container{padding-top:0!important}
body.page{background:#f6f7f4}
.qlp p,.qlp li{padding:0}
.qlp ul,.qlp ol{list-style:none;padding:0}
.qlp .sua ul,.qlp .drivers ul,.qlp .prep ul{list-style:disc;padding-left:18px}
.qlp blockquote{margin:0;padding:0;border:0;font-style:normal}
.qlp figure{margin:0}
.qlp h1,.qlp h2,.qlp h3{font-family:var(--font);font-weight:600;padding-bottom:0;color:inherit}
</style>
<div class="qlp">
<header class="top"><div class="wrap">
  <img src="https://cdn.jsdelivr.net/gh/agrawalnisha096-web/Test-1@0125c626da472733ad87d223b64a2b9f9846f0eb/google-ads/landing-assets/qubik-logo.png" alt="Qubik" width="109" height="42">
  <a href="tel:+61732058938">(07) 3205 8938</a>
</div></header>
<section class="hero"><div class="wrap">
  <div class="check" aria-hidden="true"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6"><path d="M5 12l5 5 9-10"/></svg></div>
  <h1>Thanks, we've got your details</h1>
  <p>We'll call you within one business day to set up your free discovery call.</p>
  <a class="btn" href="[CALENDAR LINK]">Or pick a time now</a>
</div></section>
<section><div class="wrap">
  <h2>What happens next</h2>
  <ol class="next">
    <li><h3>We call you</h3><p>Within one business day, to find a time that suits you.</p></li>
    <li><h3>Your free discovery call</h3><p>Thirty minutes by phone or video. We learn how your business runs and where the time goes.</p></li>
    <li><h3>An honest view</h3><p>The opportunities most likely to pay back first, and whether it's worth doing at all.</p></li>
  </ol>
  <div class="prep">
    <div>
      <h2>To get the most from the call</h2>
      <ul>
        <li>The main systems you use: accounting, payroll, CRM, spreadsheets</li>
        <li>The report you rely on most, or the one you wish you had</li>
        <li>A rough idea of where your team's time goes each week</li>
      </ul>
    </div>
    <div>
      <div class="video" id="video">
        <button type="button" aria-label="Play video: Adiel Ben Karmona, Pilpel, on working with Qubik">
          <img src="https://i.ytimg.com/vi/T25_tW_BumY/hqdefault.jpg" alt="" width="480" height="360">
          <span class="play" aria-hidden="true"><svg width="26" height="26" viewBox="0 0 24 24" fill="#22333f"><path d="M8 5v14l11-7z"/></svg></span>
        </button>
      </div>
      <p class="vcap">While you wait: Adiel from Pilpel on working with Qubik.</p>
    </div>
  </div>
</div></section>
<footer><div class="wrap">
  <img src="https://cdn.jsdelivr.net/gh/agrawalnisha096-web/Test-1@0125c626da472733ad87d223b64a2b9f9846f0eb/google-ads/landing-assets/qubik-logo-white.png" alt="Qubik" width="83" height="32">
  <span>Qubik Accounting · 18–22 Dixon Street, Strathpine QLD 4500</span>
  <span><a href="tel:+61732058938">(07) 3205 8938</a> · <a href="https://qubik.com.au/privacy-policy/">Privacy policy</a></span>
</div></footer>
</div>
<script>(function () {
  var video = document.getElementById('video');
  video.querySelector('button').addEventListener('click', function () {
    var frame = document.createElement('iframe');
    frame.src = 'https://www.youtube-nocookie.com/embed/T25_tW_BumY?autoplay=1';
    frame.title = 'Adiel Ben Karmona, Pilpel, on working with Qubik';
    frame.allow = 'autoplay; encrypted-media; picture-in-picture';
    frame.allowFullscreen = true;
    video.textContent = '';
    video.appendChild(frame);
  });
})();
</script>
```
