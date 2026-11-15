I'm logged in to the Qubik WordPress admin (qubik.com.au) in this browser. Please build a new Google Ads landing page for AI consulting as a copy of the live page **Automation** (ID **588**, `/marketing/automation/`), with new page code. Work through the WordPress REST API exactly as you did when you built pages 588 and 589: Divi shortcodes in the page content, not the Divi Builder. My account doesn't have the unfiltered HTML permission, so the Builder refuses `<style>` and `<script>`.

## Ground rules
- Don't change pages 588 or 589, or any other existing page. Only read them.
- Don't install or change plugins, themes, menus, Theme Builder, cache settings or Theme Options.
- Don't delete anything.
- If something doesn't match these instructions, stop and tell me what you see instead of guessing.

## My details
- ABN for the page footer: `[ABN]`. If I've left this as `[ABN]` or written `none`, remove the text ` · ABN [ABN]` from the code instead.

## Step 0: Check first and report
1. Confirm nothing exists yet at `/marketing/ai-consulting/`. Look for any page (any status) with the slug `ai-consulting`.
2. Read page 588 with `context=edit`. List its top-level sections in order, with what each contains. I expect:
   - **Section A:** fullwidth code module (styles, header and hero form).
   - **Section B:** the hidden Contact Form, CSS class `qlp-divi-form`, with 21 fields and a redirect to `/marketing/automation/thank-you/`.
   - **Section C:** fullwidth code module (page body and scripts).
   - **Section D:** code module (tracking code 1, containing `AW-18559003494`).
3. Report page 588's template and any page meta you copied when you built it, such as the Divi builder flags and page layout.

Continue unless something is different from what I expect.

## Step 1: Get the new code
Download the two new code blocks. They're pinned to a fixed version and can't change.
- **Code 1** (replaces Section A): `https://cdn.jsdelivr.net/gh/agrawalnisha096-web/Test-1@4135f3954e9abc907d0f0fa11d320876bd103679/google-ads/divi-ai-code1.html`
  - 35,662 bytes
  - SHA-256 `e76595f1f3cececed1fd2f9286e3c4926b8a0b2c264cf59b0dcd46e740f74ba5`
- **Code 2** (replaces Section C): `https://cdn.jsdelivr.net/gh/agrawalnisha096-web/Test-1@4135f3954e9abc907d0f0fa11d320876bd103679/google-ads/divi-ai-code2.html`
  - 31,353 bytes
  - SHA-256 `56840e9cd94dcdb33abe6bcafaa17c2d3d1edf0325a5da98439a2f80cb20a0da`

Fetch them with `fetch()` from the WordPress admin tab; jsDelivr allows this. Check that both sizes and SHA-256 hashes match before going on. In Code 2, apply the ABN change from "My details". It's the only edit allowed to either file.

## Step 2: Create the page as a draft
Create a new page:
- Title: **AI Consulting & Implementation**
- Slug: `ai-consulting`
- Parent: **marketing** (ID 563)
- Status: **draft**
- Template and page meta: the same as page 588.
- Content: page 588's content with exactly these changes:
  - **Section A:** replace the code module's contents with Code 1.
  - **Section B:** keep the whole Contact Form module exactly as it is on page 588. That includes the 21 fields, the email recipients, the message pattern, spam protection, the redirect to `https://qubik.com.au/marketing/automation/thank-you/` and the CSS class `qlp-divi-form`.
  - **Section C:** replace the code module's contents with Code 2.
  - **Section D:** keep tracking code 1 exactly as it is on page 588.

Encode the code modules the same way you did on page 588.

If the REST API accepts Yoast fields for this page, also set:
- SEO title: `AI Consulting & Implementation | Qubik`
- Meta description: `AI consulting and implementation for Australian businesses of 10 to 1,000+ staff. Find where AI pays back, see it working before you commit. Free 30-minute AI readiness call.`

If it doesn't accept them, just tell me.

## Step 3: Check the save
Read the new page back with `context=edit` and confirm:
- Section A and Section C, decoded the same way, match Code 1 and the edited Code 2 byte for byte. Give me their lengths.
- Section B's Contact Form module is identical to page 588's.
- Section D is identical to page 588's.
- There are 4 sections, in the order A, B, C, D.

## Step 4: Stop for my review
Open the draft's preview and send me:
- the page ID and preview link;
- screenshots at desktop and phone width.

Confirm each of these:
- The headline reads "AI consulting and implementation that works inside your business".
- Only the page's own white header and dark footer show, not the site's header and footer.
- The header stays at the top while scrolling.
- The logo, the phone graphic and the footer logo all show.
- Clicking "Next" on step 1 without picking anything shows "Pick at least one."

**Don't publish. Wait for me to say "publish".**

## Step 5: Publish
When I say "publish", publish the page so it's at `https://qubik.com.au/marketing/ai-consulting/`. Then tell me, and **wait for me to confirm the page isn't being cached** before testing. Divi's form uses a security token that expires, so a cached copy of the page makes the form fail silently.

## Step 6: Test submission
When I say "test it":
1. Open `https://qubik.com.au/marketing/ai-consulting/?gclid=TEST-AI&utm_source=google&utm_campaign=test&utm_term=ai%20consulting` in a new tab.
2. In the calculator, change "People doing manual reporting or admin" to 4.
3. Form step 1: pick "Not sure where AI fits our business" and "Customer enquiries take too much time", then click Next.
4. Step 2: Staff 51–200, timing "This quarter", and type `Test – please ignore` in the last box. Then click Next.
5. Step 3:
   - Name: `TEST Vinay AI`
   - Company: `Test – please ignore`
   - Email: `test@example.com`
   - Phone: `0400 000 000`
   - Role: Other
   - Tick consent and click "Request my free call".
6. Confirm the browser lands on `https://qubik.com.au/marketing/automation/thank-you/`.
7. Then ask me to confirm the lead email arrived with these values:
   - `variant: ai-page`
   - `gclid: TEST-AI`
   - `utm_term: ai consulting`
   - `landing_page` starting `https://qubik.com.au/marketing/ai-consulting/`
   - `estimate` starting "A$101,200 a year"

If the thank-you page doesn't load within 15 seconds, the form shows "Sorry, something went wrong…". In that case stop, and report:
- what the browser console shows;
- what this returns: `document.querySelector('.qlp-divi-form .et-pb-contact-message').textContent`

## Report back
List what you created, the page ID, the results of each check, and anything you skipped or couldn't do.
