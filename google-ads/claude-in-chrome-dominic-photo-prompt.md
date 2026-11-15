I'm logged in to the Qubik WordPress admin (qubik.com.au). Please update **Section C** (the page body and scripts code module) on two landing pages, so the "Our vision" quote shows Dominic's photo instead of the "DG" initials. Work through the WordPress REST API exactly as before (Divi shortcodes in the page content, not the Divi Builder).

## Ground rules
- Change only the Section C code module on pages **588** and **608**.
- Leave everything else on both pages exactly as it is: Sections A, B and D, the title, slug, status, template and page meta.
- Don't touch any other page or setting. Don't delete anything.
- If something doesn't match these instructions, stop and tell me before saving.

## Pages and code

| | Page 588 (Automation, `/marketing/automation/`) | Page 608 (AI Consulting, `/marketing/ai-consulting/`) |
|---|---|---|
| **Current Section C** should be | 44,485 bytes, SHA-256 `1e3e387f80b8ba517208d8db31a480be32048d1b68c2ff135d503de7fd54617a` | 31,341 bytes, SHA-256 `694377fd26f0915af6c0321b37575adb1f37ab3e946b219c7cf05ea744ddd3b5` (if you removed the ABN text with its leading space, it's instead 31,340 bytes, SHA-256 `e523c2c82173d3b003c9f84c61807d7f6dddc6e9cf8cb6ab1545d163a42192a2`) |
| **New Section C** | `https://cdn.jsdelivr.net/gh/agrawalnisha096-web/Test-1@a5b3cec2c548d16711f8de6359c5416fc4fdd4d0/google-ads/divi-code2-update.html` | `https://cdn.jsdelivr.net/gh/agrawalnisha096-web/Test-1@a5b3cec2c548d16711f8de6359c5416fc4fdd4d0/google-ads/divi-ai-code2.html` |
| **New file** should be | 44,783 bytes, SHA-256 `acef69741581e0ab9fd8badc24495a1f113ef198663d5f7b9189d9d64c218072` | 31,638 bytes, SHA-256 `a5027bbeeb7e1adc35b5e184c919b2aa6b6f8a2a824ad52add61c4762191d7a6` |

## Steps (do page 588 first, then page 608)
1. Read the page with `context=edit`, then decode Section C the same way as before. Check it matches the "Current Section C" size and hash. If it doesn't, stop and tell me the length you found. Keep a copy of it as the rollback.
2. Fetch the new file with `fetch()`, and check its size and SHA-256 match. Don't edit it.
3. Replace Section C's code module contents with the new file, encoded the same way as before. Save in one update; the status stays Published.
4. Read the page back and confirm:
   - Section C matches the new file byte for byte.
   - Sections A, B and D are unchanged.
   - There are still 4 sections, in the order A, B, C, D.
5. Open the live page in a new tab (page 608 may still be cached, so add `?nocache=1` to its address). Scroll to the "Our vision" quote and confirm Dominic's photo shows in the circle with the lime border, on desktop and phone width. Take a screenshot of that section for each page.

**If any check fails,** put the rollback copy back on that page straight away, then tell me what went wrong. No form test is needed; the form code hasn't changed.

## Report back
For each page, tell me:
- the Step 1 and Step 4 results;
- that the photo shows;
- anything you skipped.

Include the two screenshots.
