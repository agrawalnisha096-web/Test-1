# Landing page leads to the Lead CRM, without a plugin

**How it works:** the landing page's hidden Divi form already emails each lead. We add a second recipient, a private Make.com "mailhook" address. Make reads the email and posts the lead to the CRM webhook from Make's servers. The CRM webhook URL is stored only inside Make: never in the page source, never in this repository.

**Trade-offs compared with the server plugin (`qubik-leadcrm-webhook.php`):** it depends on the email arriving (usually seconds, sometimes a minute or two) and on a Make account. Don't run both at once: each would send the lead with a different `submission_id`, creating duplicates.

## Part 1: Make.com scenario (you, about 15 minutes)
Create a free account at make.com. Then **Create a new scenario** and add these modules in order.

**1. Webhooks → Custom mailhook**
- Add a new mailhook, name it `Qubik landing page leads`, save.
- Copy the email address it shows (it looks like `abc123@hook.eu2.make.com`). You need it in Part 2.

**Filter between module 1 and module 2** (click the link between them → Set up a filter)
- Label: `Only Qubik lead emails`
- Condition: Mailhook → `Text` · **Text operators: Contains** · `QUBIK-LEAD`

**2. Text parser → Match pattern**
- Pattern (copy exactly, as one line):

```
QUBIK-LEAD[ \t]*(?:\r?\n|<br\s*/?>)+[ \t]*name: (?<name>[^\r\n<]*)[ \t]*(?:\r?\n|<br\s*/?>)+[ \t]*email: (?<email>[^\r\n<]*)[ \t]*(?:\r?\n|<br\s*/?>)+[ \t]*phone: (?<phone>[^\r\n<]*)[ \t]*(?:\r?\n|<br\s*/?>)+[ \t]*business_name: (?<business_name>[^\r\n<]*)[ \t]*(?:\r?\n|<br\s*/?>)+[ \t]*wants_to_fix: (?<wants_to_fix>[^\r\n<]*)[ \t]*(?:\r?\n|<br\s*/?>)+[ \t]*staff: (?<staff>[^\r\n<]*)[ \t]*(?:\r?\n|<br\s*/?>)+[ \t]*annual_revenue: (?<annual_revenue>[^\r\n<]*)[ \t]*(?:\r?\n|<br\s*/?>)+[ \t]*timing: (?<timing>[^\r\n<]*)[ \t]*(?:\r?\n|<br\s*/?>)+[ \t]*challenge: (?<challenge>[^\r\n<]*)[ \t]*(?:\r?\n|<br\s*/?>)+[ \t]*cost_estimate: (?<cost_estimate>[^\r\n<]*)[ \t]*(?:\r?\n|<br\s*/?>)+[ \t]*page_version: (?<page_version>[^\r\n<]*)[ \t]*(?:\r?\n|<br\s*/?>)+[ \t]*consent: (?<consent>[^\r\n<]*)[ \t]*(?:\r?\n|<br\s*/?>)+[ \t]*gclid: (?<gclid>[^\r\n<]*)[ \t]*(?:\r?\n|<br\s*/?>)+[ \t]*gbraid: (?<gbraid>[^\r\n<]*)[ \t]*(?:\r?\n|<br\s*/?>)+[ \t]*wbraid: (?<wbraid>[^\r\n<]*)[ \t]*(?:\r?\n|<br\s*/?>)+[ \t]*utm_source: (?<utm_source>[^\r\n<]*)[ \t]*(?:\r?\n|<br\s*/?>)+[ \t]*utm_medium: (?<utm_medium>[^\r\n<]*)[ \t]*(?:\r?\n|<br\s*/?>)+[ \t]*utm_campaign: (?<utm_campaign>[^\r\n<]*)[ \t]*(?:\r?\n|<br\s*/?>)+[ \t]*utm_term: (?<utm_term>[^\r\n<]*)[ \t]*(?:\r?\n|<br\s*/?>)+[ \t]*landing_page: (?<landing_page>[^\r\n<]*)[ \t]*(?:\r?\n|<br\s*/?>)+[ \t]*END-LEAD
```

- Global match: **No** · Case sensitive: **Yes** · Multiline: **No** · Singleline: **No**
- Text: Mailhook → `Text`

**3. HTTP → Make a request**
- URL: **paste the CRM webhook URL from your developer here.** Type it only into Make, nowhere else.
- Method: **POST**
- Body type: **application/x-www-form-urlencoded**. Make encodes the values safely, and the CRM accepts this format.
- Fields (add one per row: key on the left, mapped value on the right):

| Key | Value |
|---|---|
| `name` | Text parser → `name` |
| `email` | Text parser → `email` |
| `phone` | Text parser → `phone` |
| `business_name` | Text parser → `business_name` |
| `gclid` | Text parser → `gclid` |
| `gbraid` | Text parser → `gbraid` |
| `wbraid` | Text parser → `wbraid` |
| `utm_source` | Text parser → `utm_source` |
| `utm_medium` | Text parser → `utm_medium` |
| `utm_campaign` | Text parser → `utm_campaign` |
| `utm_term` | Text parser → `utm_term` |
| `landing_page` | Text parser → `landing_page` |
| `message` | `Wants to fix: ` Text parser → `wants_to_fix` `, Staff: ` → `staff` `, Revenue: ` → `annual_revenue` `, Timing: ` → `timing` `, Challenge: ` → `challenge` `, Their estimate: ` → `cost_estimate` |
| `submission_id` | `{{md5(` Mailhook → `Text` `)}}`: type `md5(` from the functions panel and map the mailhook's Text inside it |
| `wants_to_fix` | Text parser → `wants_to_fix` |
| `staff` | Text parser → `staff` |
| `annual_revenue` | Text parser → `annual_revenue` |
| `timing` | Text parser → `timing` |
| `challenge` | Text parser → `challenge` |
| `cost_estimate` | Text parser → `cost_estimate` |
| `page_version` | Text parser → `page_version` |
| `consent` | Text parser → `consent` |
| `source` | `qubik.com.au landing page` (typed as text) |

- Evaluate all states as errors (except 2xx and 3xx): **Yes**
- Timeout: 40

**Retries on errors** (the CRM asks for retries on a 503):
- Right-click the HTTP module → **Add error handler → Break**. Automatically complete execution: **Yes**. Number of attempts: **5**. Interval between attempts: **5** minutes.
- Scenario settings (the gear at the bottom): **Allow storing of incomplete executions: Yes**.
- Retries reuse the same `submission_id`, so the CRM won't create duplicates.

**Turn the scenario ON**, with scheduling **Immediately as data arrives**.

## Part 2: Divi form change (Claude in Chrome or you)
Page **588** (Automation, `/marketing/automation/`), **Section B**, the hidden **Contact Form** module (CSS class `qlp-divi-form`):

1. **Content → Email:** keep Dominic's address and add the Make mailhook address after it, separated by a comma:
   `dominic.guinea@qubik.com.au, <mailhook address>`
2. **Content → Message Pattern:** replace it with exactly this (22 lines):

```
QUBIK-LEAD
name: %%name%%
email: %%email%%
phone: %%phone%%
business_name: %%company%%
wants_to_fix: %%automate%%
staff: %%staff%%
annual_revenue: %%revenue%%
timing: %%timing%%
challenge: %%challenge%%
cost_estimate: %%estimate%%
page_version: %%variant%%
consent: %%consent%%
gclid: %%gclid%%
gbraid: %%gbraid%%
wbraid: %%wbraid%%
utm_source: %%utm_source%%
utm_medium: %%utm_medium%%
utm_campaign: %%utm_campaign%%
utm_term: %%utm_term%%
landing_page: %%landing_page%%
END-LEAD
```

3. Save. Change nothing else.

Dominic's lead emails will now use this same `field: value` layout. It's still easy to read, and every lead email contains the click ID and UTM tags.

## Part 3: Test
1. Open `https://qubik.com.au/marketing/automation/?gclid=test123&utm_source=google&utm_campaign=test` and submit the form with the name **TEST Vinay**.
2. In Make, open the scenario's **History**: the run should show the Text parser with all fields, and the HTTP module with status **200** or **201**.
3. Ask your developer to confirm the lead landed with `gclid=test123`, `utm_source=google` and `utm_campaign=test`.

If the Text parser finds no match, open the run, copy the mailhook's Text output, and send it to me. Divi may have formatted the email differently from what was tested.
