# Thermer Google Ads: Weekly Update, Week 1

Reporting period: Oct 27 – Nov 2, 2026 · Sent Nov 3, 2026

**Summary.** Week 1 was mostly setup and research, with a first round of English copy changes and a small target CPA adjustment on Oct 29–31. It's too early to judge those changes; I'll read them on Nov 7–9. The two biggest findings: our best-performing ad group of the past year was in Bahasa Indonesia and was dropped when campaigns were consolidated in June, and purchase values are being recorded as 1 again, so revenue isn't visible in Google Ads.

## 1. Performance

Campaign "New || Indonesia || In-app action || Targeting", Google Ads data, excluding GST.

| Metric | Oct 25–31 (7 days) | Daily average | Month-1 goal |
|---|---|---|---|
| Spend | ₹25,220 | ₹3,603 | Within approved ceiling |
| Installs | 13,968 | 1,995 | ≥ 1,900/day |
| Cost per install | ₹1.81 | | ≤ ₹1.70 |
| First_Print (events) | 8,763 | 1,252 | |
| Purchases | 37 | 5.3 | |
| Cost per in-app action | ₹2.87 | | |

- **Trend:** volume softened through the week. Installs fell from about 2,100–2,250/day (Oct 26–29) to 1,799 on Oct 31, and cost per install rose from ₹1.65–1.80 to ₹1.96. Click-through rate started slipping on Oct 26, before any changes were made.
- **Oct 26–28 vs Oct 29–31:** installs −11%, cost per install ₹1.75 → ₹1.88, purchases flat (18 vs 17). The Oct 31 changes only have a few hours in this window.
- **Immature data:** D7/D30 retention and unique-user first-print rate need Firebase access (pending). First_Print in Google Ads counts every print, not users.

## 2. Changes made

| Date (IST) | Where | Change | Why |
|---|---|---|---|
| Oct 29 | New | Headline "Print Fast, Print Smart" → "Print Fast From Your Phone" | Clearer benefit |
| Oct 29 | Bluetooth Printers app | Description reworded ("…Connect once and start printing.") | Cleaner wording |
| Oct 31 | New | 1 headline and 3 descriptions replaced, incl. "No cashier machine needed. Just your phone and a Bluetooth printer, receipts in seconds." | Lean on speed and "just your phone", the themes behind our best assets |
| Oct 31 | OCR | 2 headlines (incl. "Share Receipt. Print Instantly", our biggest-spending Low headline) and 3 descriptions replaced | Replace weak, high-spend assets; less jargon |
| Oct 31 | Campaign | Target CPA ₹2.60 → ₹2.70 (+4%) | Campaign limited by bid strategy and installs slipping; small step to protect volume |

No budget, conversion-goal or ad group status changes. All changes are in the account's change history.

## 3. Experiments

| Experiment | Hypothesis | Spend so far | Result | Next |
|---|---|---|---|---|
| English copy refresh (New, OCR) | Replacing Low-rated, high-spend assets lowers cost per install without hurting First_Print | Under ₹110 on new assets (all "Learning") | Too early | Read Nov 7–9; keep, revert or iterate |
| Target CPA ₹2.60 → ₹2.70 | A small step restores install volume at an acceptable cost | ~6 hours of data | Too early | Rollback to ₹2.60 if cost per install stays above ₹2.10 for 2 days |

## 4. Research and insights

- **Cost per install doubled after May 19.** The campaign moved to Maximize conversions with no target, and cost per install went from about ₹1.33 (Jan–May) to ₹2.58 (Jun–Sep). Restoring a target CPA on Oct 5 brought it back to about ₹1.89. *Confidence: high.*
- **Bahasa Indonesia ads performed best.** In the paused Indonesia Revenue campaign, the Bahasa ad group "OCRIndonesian" (bank and transfer receipts) was the cheapest ad group from Jun 2025 to May 2026: ₹1.63 per install vs ₹1.73–1.84 for English ad groups running at the same time, with the highest retained rate and the largest share of budget. It wasn't carried over in the June consolidation; all current ad text is English. *Confidence: medium (not a controlled test).*
- **Competitors all advertise in Bahasa.** Kasir Pintar, Olsera and Majoo (31–85 Google ads each) use Bahasa, "gratis", social proof ("2,5 juta UMKM") and pain-first hooks. Thermer's ads use none of these. *Confidence: medium.*
- **Open opportunities.** Payment agents printing transfer receipts ("cetak struk" searches) are a clear segment that no one advertises to; no Bluetooth printer app runs Meta ads in Indonesia. *Confidence: medium.*
- **Copy pattern.** Short, concrete lines win ("Quick Bluetooth Printing" ₹1.22 per install); long feature lists cost ₹6–9 per install. *Confidence: medium.*
- **Play Store.** Thermer ranks #1 for "printer bluetooth" and "printer thermal". One listing screenshot says "Bukti Transaksi **Saham**" (saham = shares/stocks), which reads oddly to Indonesian users and is worth fixing.

## 5. Risks and issues

- **Purchase value tracking (needs action).** Purchases are recorded with a value of 1 each (17 purchases = value 17 on Oct 29–31). Earlier in October they came through with real values (about ₹430 on average). Please ask the developer to check the Firebase purchase event (value and IDR currency). Until fixed, revenue and ROAS can't be read in Google Ads, and I'd ignore Google's Target ROAS recommendation.
- **Delivery softening.** Campaign is "Limited by bid strategy" and volume dipped this week; I'm watching daily with the rollback condition above.
- None identified on policy: no disapproved assets or policy warnings.

## 6. Plan for next week (Nov 3–9)

1. Monitor daily; read the Oct 29–31 changes on Nov 7–9 and decide keep, revert or iterate.
2. Prepare two Bahasa ad groups, built paused so they don't affect the read: "OCR – ID" (reusing the proven OCRIndonesian copy) and "New – ID" (general message).
3. After the read: switch on the Bahasa ad groups, pause the two weakest ad groups (Bluetooth Printers app, Problem-Solution), and refresh AI-Oriented copy (4 of 5 headlines rated Low).
4. Document this week's experiments and insights in Confluence.

## 7. Approvals and access needed

- **Approval:** launch the two Bahasa ad groups and pause Bluetooth Printers app and Problem-Solution, within the existing budget (no budget increase).
- **Developer:** purchase value fix (above), and First_Print counted once per user.
- **Access:** Firebase, Play Console, AdMob and Confluence, for the baseline report (unique-user first-print rate, D7/D30, revenue).

## 8. Hours

| Work | Hours (approx.) |
|---|---|
| Account review and data analysis | 3 |
| Competitor research | 2 |
| Historical Bahasa ad group analysis | 1.5 |
| Copy drafting and account changes | 2 |
| Monitoring | 1 |
| Reporting and documentation | 1.5 |
| **Total** | **~11** (planned 10–12 for week 1) |
