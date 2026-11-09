# Landing page leads to the CRM via Zapier

## What happens when someone submits the form

```
Visitor submits the form on /marketing/automation/
        │
        ▼
WordPress (Divi) emails the lead to:
   • dominic.guinea@qubik.com.au   (as now)
   • the Zapier mailbox             (new, e.g. qubik-leads@robot.zapier.com)
        │                                   Visitor sees the thank-you page
        ▼                                   (Google Ads conversion is recorded)
Zapier Email Parser reads the email and pulls out each field
        │
        ▼
Filter: continue only if there is a name, plus an email or mobile
        │
        ▼
Webhooks by Zapier: POST the lead to the CRM webhook
(the URL lives only inside the Zap)
        │
        ├─ 200/201 → lead is in the CRM with gclid, UTMs and landing page
        └─ error / 503 → Zapier Autoreplay retries; the same submission_id means no duplicate
```

Leads normally reach the CRM within a minute of being submitted.

## Building the Zap (developer, about 15 minutes)

**Step 1. Copy the existing Zap.** Duplicate the Meta leads Zap (Zaps → ⋯ → Duplicate) so the CRM step is already set up. Name the copy `Website landing page → CRM`.

**Step 2. New trigger.** Replace the Meta trigger with **Email Parser by Zapier → New Mail**. Create a mailbox at parser.zapier.com, and copy its address (for example `qubik-leads@robot.zapier.com`).

**Step 3. Connect the form (Vinay or Claude in Chrome).** On WordPress page 588 (`/marketing/automation/`), Section B, the hidden **Contact Form** module → Content → **Email**, add the Zapier address after Dominic's, separated by a comma:
`dominic.guinea@qubik.com.au, qubik-leads@robot.zapier.com`
Save. Nothing else on the page changes.

**Step 4. Send the first lead (Vinay).** Submit the form as **TEST Vinay** from:
`https://qubik.com.au/marketing/automation/?gclid=test123&utm_source=google&utm_campaign=test`

**Step 5. Teach the parser (developer).** In parser.zapier.com, open the TEST Vinay email and highlight each value, naming it as below. This is done once; every later lead email has the same layout.

| Label in the email | Name it |
|---|---|
| Name | `name` |
| Company | `business_name` |
| Email | `email` |
| Mobile | `phone` |
| Annual revenue | `annual_revenue` |
| Staff | `staff` |
| Wants to fix | `wants_to_fix` |
| Timing | `timing` |
| Biggest challenge | `challenge` |
| Their cost estimate | `cost_estimate` |
| Page version | `page_version` |
| Consent | `consent` |
| gclid | `gclid` |
| gbraid | `gbraid` |
| wbraid | `wbraid` |
| utm_source | `utm_source` |
| utm_medium | `utm_medium` |
| utm_campaign | `utm_campaign` |
| utm_term | `utm_term` |
| landing_page | `landing_page` |

Many of these are blank in a given lead (for example gbraid, or utm_term). Highlight the empty spot anyway so the parser knows where they go.

**Step 6. Test the trigger.** Back in the Zap, **Test trigger**. It should pull in the parsed TEST Vinay email.

**Step 7. Add a filter.** **Filter by Zapier**: only continue if `name` **exists**, **and** (`email` exists **or** `phone` exists). This stops stray emails sent to the mailbox reaching the CRM.

**Step 8. CRM step: Webhooks by Zapier → POST** (the step copied from the Meta Zap).
- URL: the CRM webhook URL (stored only here)
- Payload type: form or JSON (the CRM accepts both)
- Data:

| CRM field | Value from the parser |
|---|---|
| `name` | name |
| `email` | email |
| `phone` | phone |
| `business_name` | business_name |
| `gclid`, `gbraid`, `wbraid` | the same names |
| `utm_source`, `utm_medium`, `utm_campaign`, `utm_term` | the same names |
| `landing_page` | landing_page |
| `message` | `Wants to fix: {wants_to_fix} · Staff: {staff} · Revenue: {annual_revenue} · Timing: {timing} · Challenge: {challenge} · Their estimate: {cost_estimate}` |
| `submission_id` | the trigger's email **ID** (unique per email, so retries don't duplicate) |
| `source` | `qubik.com.au landing page` |
| extra fields (optional) | page_version, consent |

**Step 9. Test the action.** **Test step**. TEST Vinay should appear in the CRM with `gclid = test123`, `utm_source = google` and `utm_campaign = test`.

**Step 10. Switch it on.** Turn the Zap **On**. In Zap settings, turn on **Autoreplay**, so Zapier retries automatically if the CRM returns an error such as 503.

**Step 11. One more live test.** Submit a second test lead (for example `TEST Vinay 2`) and confirm it reaches the CRM on its own, without anyone pressing test buttons.

## Good to know
- **Safe:** the CRM webhook URL lives only in the Zap. The Zapier mailbox address is stored in Divi's form settings on the server, and doesn't appear in the page source (checked on the live page).
- **Email layout:** if the form's fields or the Divi email layout change later, re-teach the parser with one new email (Step 5).
- **Backup:** Dominic still receives every lead by email, so nothing is lost if Zapier or the CRM has a problem.
- **Plan:** Webhooks by Zapier and Autoreplay need a paid Zapier plan. The existing Meta Zap probably already uses one.
