I'm logged in to the Qubik WordPress admin (qubik.com.au) in this browser. Please update the live landing page **Automation** (ID **588**, `/marketing/automation/`) with new versions of its two main code blocks. Work through the WordPress REST API exactly as you did before (Divi shortcodes in the page content, not the Divi Builder), because my account doesn't have the unfiltered HTML permission.

This page is live and receiving Google Ads traffic, so make the change in one save and check it straight away.

## Ground rules
- Change only **Section A** and **Section C** of page 588.
- Leave unchanged:
  - **Section B**, the hidden Contact Form: fields, recipients, redirect and spam settings.
  - **Section D**, tracking code 1.
  - The page's title, slug, status, template and settings.
- Don't touch any other page, plugin, theme, menu or setting. Don't delete anything.
- If something doesn't match these instructions, stop and tell me before saving.

## Step 1: Check the current code is what I expect
Read page 588 with `context=edit`, then decode the Section A and Section C code modules the same way as before. They should match the versions I last gave you:
- **Section A:** 34,621 bytes, SHA-256 `5d33500d34848eca43a8cee278e51849d96af88d1648d500898e1f45a2d3b94c`
- **Section C:** 43,168 bytes, SHA-256 `7cf7fcc1b6e1c4a590d1511de0c9936c421d49c4d59c1070af1e19136e2d35a0`

If either doesn't match, **stop and tell me**, with the lengths you found. Someone may have changed the page since.

## Step 2: Get the new code
These are pinned to a fixed version and can't change. Fetch them with `fetch()` from the admin tab.
- **New Code 1** (Section A): `https://cdn.jsdelivr.net/gh/agrawalnisha096-web/Test-1@2b10d51bfc9ae3c3f23958c8b629fa2207c64f2a/google-ads/divi-code1-update.html`
  - 35,405 bytes
  - SHA-256 `7ac980a35e041fda221c431c6d5de8981c588b4def520abfdacb4b1b74aa87fd`
- **New Code 2** (Section C): `https://cdn.jsdelivr.net/gh/agrawalnisha096-web/Test-1@2b10d51bfc9ae3c3f23958c8b629fa2207c64f2a/google-ads/divi-code2-update.html`
  - 44,485 bytes
  - SHA-256 `1e3e387f80b8ba517208d8db31a480be32048d1b68c2ff135d503de7fd54617a`

Check both sizes and hashes match before going on. Don't edit either file.

## Step 3: Save and check
1. Replace Section A's code module contents with New Code 1, and Section C's with New Code 2. Encode them the same way as before. Save in one update; the status stays Published.
2. Read the page back with `context=edit` and confirm:
   - Section A and Section C now match the new files byte for byte (give me their lengths).
   - Section B and Section D are identical to what they were in Step 1.
   - There are still 4 sections, in the order A, B, C, D.
3. Open `https://qubik.com.au/marketing/automation/` in a new tab and confirm:
   - Form step 1 says "Select any that apply."
   - Clicking "Next" without picking anything shows "Pick at least one.", and the message disappears when you tick an option.
   - Under the form there's the quote "Dom has saved us more money than we've spent!" from Mike Wikes.
   - Adding `?v=ai` to the address still changes the headline to "Practical AI that does the work and shows you everything".

Don't submit the form yet.

**If anything fails in Step 3,** put Sections A and C back to the old versions straight away. They're pinned at:
- `https://cdn.jsdelivr.net/gh/agrawalnisha096-web/Test-1@13d81fd20728477745403be291aef79a2204d745/google-ads/divi-code1-update.html`
- `https://cdn.jsdelivr.net/gh/agrawalnisha096-web/Test-1@13d81fd20728477745403be291aef79a2204d745/google-ads/divi-code2-update.html`

Then tell me what went wrong.

**Report back after Step 3 and wait for me to say "test it".**

## Step 4: Test submission (only when I say "test it")
1. Open `https://qubik.com.au/marketing/automation/?gclid=TEST-AUTO2&utm_source=google&utm_campaign=test&utm_term=business%20process%20automation` in a new tab.
2. Form step 1: pick "Lack of visibility over performance" and "Disconnected systems & reporting", then click Next.
3. Step 2: Staff 51–200, timing "This quarter", leave Annual revenue empty, and type `Test – please ignore` in the last box. Then click Next.
4. Step 3:
   - Name: `TEST Vinay automation`
   - Company: `Test – please ignore`
   - Email: `test@example.com`
   - Phone: `0400 000 000`
   - Leave Role empty.
   - Tick consent and click "Request my free call".
5. Confirm the browser lands on `https://qubik.com.au/marketing/automation/thank-you/`.
6. Then ask me to confirm the lead email arrived with:
   - `gclid: TEST-AUTO2`
   - `utm_term: business process automation`
   - revenue and role empty

If the thank-you page doesn't load within 15 seconds, the form shows "Sorry, something went wrong…". In that case report:
- what the browser console shows;
- what this returns: `document.querySelector('.qlp-divi-form .et-pb-contact-message').textContent`

## Report back
Tell me what you changed, the results of each check, and anything you skipped or couldn't do.
