# Thermer Google Ads: Update

Nov 1, 2026 · Covers changes made Oct 29–31, 2026

**Summary.** I refreshed the English ad copy in three ad groups and nudged the target CPA from ₹2.60 to ₹2.70. It's too early to judge any of it: the main changes went live on the evening of Oct 31. The campaign had been softening since Oct 26, before any changes, so I'm holding everything steady until a proper read around Nov 7–9. One thing needs attention now: purchases are being recorded with a value of 1 again.

## What I changed

| Date (IST) | Where | Change | Why |
|---|---|---|---|
| Oct 29, 09:36 | New | "Print Fast, Print Smart" → "Print Fast From Your Phone" | Clearer benefit; the old line read awkwardly |
| Oct 29, 09:39 | Bluetooth Printers app | Description reworded to "Works with most Bluetooth thermal printers. Connect once and start printing." | Cleaner wording, same message |
| Oct 31, 17:48 | New | "Bluetooth Printing Made Simple" → "Print Receipts in Seconds"; 3 descriptions replaced, incl. "No cashier machine needed. Just your phone and a Bluetooth printer, receipts in seconds." | Lean on speed and "just your phone", the themes behind the best performers; drop vague lines ("A portable app for high-quality thermal prints on the go.") |
| Oct 31, 17:50 | OCR | "Share Receipt. Print Instantly" (Low, our biggest-spending weak headline) and "Photo to Receipt in Seconds" replaced with "One Tap, Instant Receipts" and "Print Receipts in Seconds"; 3 descriptions rewritten to lead with "no manual typing" | Replace weak, high-spend assets; less jargon |
| Oct 31, 17:51 | Campaign | Target CPA ₹2.60 → ₹2.70 (+4%) | The campaign is limited by bid strategy and installs had been slipping since Oct 26; a small step to protect volume |

Some automatically created ("system-enhanced") images were removed as part of these edits. No budget, conversion-goal or ad group status changes were made. All changes are in the account's change history.

## Early numbers (too early to judge)

| Metric | Oct 26–28 | Oct 29–31 | Change |
|---|---|---|---|
| Cost | ₹11,342 | ₹10,863 | −4% |
| Installs | 6,496 | 5,772 | −11% |
| Cost per install | ₹1.75 | ₹1.88 | +8% |
| First_Print | 4,071 | 3,527 | −13% |
| Cost per in-app action | ₹2.77 | ₹3.07 | +11% |
| Purchases | 18 | 17 | flat |

- **The decline started before the changes.** Click-through rate was already falling from Oct 26, and the Oct 31 changes only have about six hours in this window. I can't attribute the dip to any one change yet.
- **New assets are all still "Learning".** Most have spent under ₹5. The only one with real data, "Print Fast From Your Phone", brought 78 installs at ₹1.31 on ₹102 of spend: promising, but far too small to call.
- **Against the month-1 goals:** installs average about 1,920 a day (goal ≥ 1,900, but trending down: 1,799 on Oct 31) and cost per install is ₹1.88 (goal ≤ ₹1.70).

## Needs attention: purchase value

Android Purchase is currently recording a value of 1 per purchase (17 purchases = value 17). Earlier in October, purchases came through with real values (about ₹430 on average). This looks like the purchase value has stopped being sent, so revenue isn't visible in Google Ads right now. I'd ask the developer to check the Firebase purchase event (value and IDR currency) this week. Until it's fixed, I'd ignore Google's Target ROAS recommendation.

## Next steps

1. **Hold steady until Nov 7–9.** No further bid or copy changes, so the Oct 31 changes get a clean read. Then compare cost per install, First_Print and purchases against Oct 26–28.
2. **If installs keep falling after the read**, take another small target step (≤ 10%). If cost per install improves with volume holding, step the target back down towards ₹2.35 as planned.
3. **Next copy batch:** AI-Oriented (4 of 5 headlines rated Low) and the weaker lines in Bluetooth Printers app and Problem-Solution.
4. **Bahasa Indonesia ad groups:** set up after the Nov 7–9 read, so their effect isn't mixed with this week's changes.
5. **Developer:** fix purchase value tracking (above), and the First_Print count-once change from the month-1 plan.
