# Thermer Google Ads: Weekly Report, Week 2

Reporting period: Nov 3–11, 2026 (9 days), compared with Oct 27 – Nov 2 (7 days) · Report date: Nov 12, 2026

## Executive summary

1. **Higher bids did not buy more users.** Raising the target CPA from ₹2.60 to ₹2.75 increased cost per in-app action by 11% (₹2.84 → ₹3.15). Installs did not rise. I am reverting the target to ₹2.60.
2. **Google Ads sees about 1 in 10 real purchases.** GA4 records 39–56 purchases a day from Google Ads users. Google Ads records about 5, mostly valued at ₹1. The bidder is optimising almost blind on revenue. The fix requires no app change: import GA4's `in_app_purchase` event into Google Ads.
3. **Early November softness is market-wide, not caused by the campaign.** Organic new users fell 10% and organic purchases 25% in the same period. Google Ads new users fell 11% and their purchases 29%. Paid users still activate better than organic users (71% vs 64%).
4. **Two Bahasa Indonesia ad groups and four new English assets went live on Nov 10.** All are approved and delivering. Two days of data is too little to judge; first read on Nov 17.

## 1. Performance

**Google Ads, campaign "New || Indonesia || In-app action || Targeting"** (excluding GST; per-day figures because the windows differ in length)

| Metric | Oct 27 – Nov 2 | Nov 3–11 | Change |
|---|---|---|---|
| Spend per day | ₹3,718 | ₹3,738 | +1% |
| Installs per day | 1,993 | 1,894 | −5% |
| Cost per install | ₹1.87 | ₹1.97 | +5% |
| CPC | ₹1.38 | ₹1.48 | +7% |
| First_Print per day (events) | 1,298 | 1,182 | −9% |
| First_Print per install | 65.1% | 62.4% | −2.7 pts |
| Cost per in-app action | ₹2.84 | ₹3.15 | +11% |
| Purchases recorded in Google Ads, per day | 9.0 | 5.0 | under-counted (insight 2) |

**GA4, by first user source** (per day)

| Metric | Google Ads, Oct 27 – Nov 2 | Google Ads, Nov 3–11 | Organic, Oct 27 – Nov 2 | Organic, Nov 3–11 |
|---|---|---|---|---|
| New users | 1,749 | 1,564 (−11%) | 2,096 | 1,876 (−10%) |
| First_Print users ÷ new users | 73.1% | 71.0% | 67.4% | 64.3% |
| Purchases (in_app_purchase) | 55.7 | 39.4 (−29%) | 54.7 | 41.0 (−25%) |
| Purchase revenue | ₹23,347 | ₹15,890 (−32%) | ₹27,699 | ₹20,370 (−26%) |

**What the numbers mean**

- **Demand fell everywhere, not just in paid.** Organic and paid new users fell by the same 10–11%, and purchases fell 25–29% in both. A drop of the same size in organic traffic, which no ad change touches, means the cause is outside the campaign. The likely drivers are the payday cycle (late-October payday lifted the previous week) and the 11.11 shopping festival, which raises ad auction prices across Indonesia. Both are hypotheses; I will check them against the same dates next month.
- **The campaign held its share.** Google Ads installs fell only 5% while total new users fell about 10%, so paid acquisition kept its position in a weaker market.
- **What the campaign did control got worse: cost.** CPC rose from ₹1.38 to ₹1.48, reaching ₹1.68 on Nov 11. Part is auction pressure; part is our own higher target CPA (Section 2). Both push the same way, which is why reverting the target now matters.
- **User quality held.** Google Ads users still activate better than organic users (71% vs 64%). The lower First_Print per install in Google Ads (65% → 62%) is mostly the last two days, which are still filling in.
- **Against month-1 goals:** installs 1,894/day (goal ≥ 1,900, just under); cost per install ₹1.97 (goal ≤ ₹1.70, not met).

## 2. Changes, evidence and decisions

### Target CPA ₹2.70 → ₹2.75 (Nov 6, 23:52)

- **Evidence before the change:** after the Oct 31 step (₹2.60 → ₹2.70), spend rose 7% while installs stayed flat. The campaign was still labelled "Limited by bid strategy", which suggested more bid headroom would release volume.
- **Why this change:** a second, small step was the cheapest way to test whether that label was true, before drawing a conclusion about bid limits.
- **Result:** on matching days (Saturday to Monday), installs fell 6% (1,901 → 1,780 a day) and cost per install rose from ₹1.94 to ₹2.00. Over both steps, cost per in-app action rose from ₹2.62 to ₹3.15.
- **Conclusion:** the label was misleading. Higher bids bought the same users at higher prices. The campaign's volume is limited by the reach of its current ads, not by its bid. This matches the founder's history: around ₹4,200 a day, cost per install rose to about ₹2.
- **Decision:** revert to ₹2.60 on Nov 13. I originally planned to wait until Nov 17 to keep the Bahasa launch read clean. The Bahasa ad groups are judged against the English ad groups in the same campaign, so a campaign-wide bid change does not distort that comparison, and each extra day at ₹2.75 costs money during a period of rising auction prices.

### Problem-Solution ad group paused (Nov 7, 00:13)

- **Evidence:** it was the most expensive active ad group: ₹2.50 per install on Nov 3–9, against ₹1.81 for New. Its message (designing custom receipts) duplicates New and AI-Oriented, so it competed for the same users at a higher price.
- **Why this change:** removing an overlapping, expensive ad group sends its spend (3% of the campaign) to cheaper ones without losing an audience.
- **Result:** the remaining ad groups absorbed the spend. There is no sign of lost volume beyond the market-wide dip.
- **Decision:** keep paused. Final review Nov 14.

### Four English assets replaced in New and OCR (Nov 10, 18:22–18:24)

- **Evidence:** the four assets replaced had been rated Low by Google for 10 days and cost ₹2.48–3.15 per install, against ad group averages of ₹1.81 (New) and ₹2.15 (OCR). Their messages ("Print Receipts in Seconds", "Snap a receipt photo…") repeated the speed claim that other assets in the same ads already made.
- **Why these replacements:** each new line adds a reason to install that the ad lacked, with evidence behind it:

| Ad group | Removed | Added | Evidence for the new line |
|---|---|---|---|
| New | Print Receipts in Seconds | Free Receipt Printing App | This headline ran in an older OCR ad group averaging ₹1.68 per install. Every major local competitor (Kasir Pintar, Olsera, Majoo) leads with "gratis" |
| New | Print professional receipts directly from your phone. | Free to start. Print professional receipts from most Bluetooth thermal printers. | Answers the two doubts before install: cost and whether it works with the user's printer |
| OCR | Print Receipts in Seconds | Print Bank Receipts Faster | Bank and transfer receipt copy averaged about ₹1.65 per install in the old campaign; money-transfer agents are a primary persona in Confluence |
| OCR | Snap a receipt photo and reprint it in seconds… | Free to start. Print transfer receipts quickly on your thermal printer. | Same proven use case, plus "free" |

- **Accuracy:** "free" is used only as "free app" and "free to start". That matches the product: the first 10 receipts are free, then daily limits apply.
- **Early result (2 days, under ₹80 each):** the two "Free to start" descriptions are at ₹1.51–1.59 per install, below their ad group averages. The samples are too small to call.
- **Decision:** read on Nov 24, after at least 14 days.

### Bahasa Indonesia ad groups "OCR – ID" and "New – ID" (Nov 10, 18:32–18:35)

- **Evidence:** every ad in the account was in English, while the campaign targets only Indonesia and every local competitor advertises in Bahasa. The account's own history is stronger evidence: in the paused "Indonesia Revenue" campaign, the Bahasa ad group "OCRIndonesian" was the cheapest ad group from June 2025 to May 2026 (₹1.63 per install vs ₹1.73–1.84 for English ad groups running at the same time) and received the largest share of budget. It was not carried over when campaigns were consolidated in June.
- **Why now:** Section 2 shows higher bids cannot add volume. New volume has to come from users the current ads do not reach. Users who respond better to their own language are the clearest such group, with past results to support it.
- **Structure:** one ad group per primary persona from Confluence:
  - **OCR – ID**, for money-transfer agents and others printing imported receipts, reusing the proven OCRIndonesian copy ("Cetak Bukti Transaksi Bank").
  - **New – ID**, for small businesses making custom receipts ("Cetak Struk dari HP", "Gratis, Langsung Cetak").
  - Same video and images as their English versions, so the language is the only difference.
- **Status:** approved and delivering. See Section 3 for early numbers.

### Review of the Oct 29–31 changes

- **"Print Fast From Your Phone" (New):** the account's best headline: ₹1.19 per install over Oct 29 – Nov 9, ₹1.30 on Nov 10–11. It works because it makes one concrete promise (print from the phone the user already has). Keep.
- **Other Oct 31 assets:** most were rated Low after 10 days and four were replaced on Nov 10 (above). "Receipt photos to printable receipts in seconds." (Good) stays.

## 3. Bahasa launch: first two days

| Ad group | Spend | Share of campaign | Installs | Cost per install | In-app actions per install |
|---|---|---|---|---|---|
| New – ID | ₹314 | 4.2% | 137 | ₹2.29 | 55% |
| OCR – ID | ₹136 | 1.8% | 59 | ₹2.31 | 51% |
| English ad groups (same days) | | | | ₹2.03–2.54 | 58–63% |

- **Interpretation:** Google is still learning which users to show them to, which typically takes 5–7 days for a new ad group. In-app actions also arrive late, so the 51–55% will rise. Nothing can be concluded yet.
- **Success criteria (decided now, judged later):**
  - **Nov 17:** both ad groups receiving at least 10% of spend combined.
  - **Nov 24:** cost per install no more than 10% above the English twin, and First_Print per install within 5 points of it. If both hold, Bahasa expands to the remaining ad groups.
- **Rollback:** pause both if campaign installs fall more than 10% below the organic trend for 3 days running.
- **Early asset signals:** "Cetak Bukti Transaksi Bank" (₹1.98), "Cetak Tanda Terima Pelanggan" (₹1.93) and "Cetak Bluetooth Cepat" (₹1.97) are leading. "Cetak Struk Transaksi Bank" (₹4.04, 2 installs) trails. All are on under ₹75 of spend.

## 4. Insights

Written in the App Insights format for Confluence.

**1. The campaign is limited by reach, not by bid** · Category: Bidding · Data-backed · Confidence: High
- **Observation:** two target CPA increases (₹2.60 → ₹2.75, Oct 31 and Nov 6) raised cost per in-app action from ₹2.62 to ₹3.15 while installs stayed flat, then fell 6% on matching days. The "Limited by bid strategy" label stayed on throughout.
- **Learning:** at its current ads, this campaign reaches about 2,000 installs a day in Indonesia. Bidding higher only pays more for the same users.
- **Implication:** grow volume through new reach (language, personas, messages), not bids. Treat "Limited by bid strategy" as unreliable for this campaign.

**2. Google Ads records about 1 in 10 purchases** · Category: Tracking · Data-backed · Confidence: High
- **Observation:** Nov 3–11, Google Ads recorded 45 purchases (5 a day), most valued at ₹1. GA4 recorded 355 purchases worth ₹1.43 lakh from Google Ads users. The custom "Purchase" event fires on only 40–50% of real purchases from app version 6.4.8.42 onwards and carries no value. Google's automatic `in_app_purchase` event captures every purchase with its value.
- **Learning:** this also explains the paused "Indonesia Revenue" campaign. It optimised on the faulty event, so its revenue could not be trusted.
- **Implication:** import `in_app_purchase` from GA4 into Google Ads. No app release is needed. This is the single change most likely to improve user quality, because it lets Google bid for buyers rather than printers.

**3. Market-wide demand moves both paid and organic** · Category: Acquisition · Data-backed · Confidence: Medium
- **Observation:** Nov 3–11 vs the week before: organic new users −10%, organic purchases −25%. Google Ads new users −11%, purchases −29%. CPC rose to ₹1.68 on Nov 11.
- **Learning:** short-term swings in paid results are largely market-driven: payday timing and festival auction pressure (11.11, then 12.12) are the likely causes.
- **Implication:** always judge campaign changes against organic over the same days. Avoid scaling or raising bids around 11.11 and 12.12.

**4. Google Ads users are as valuable as organic users** · Category: Revenue · Observation · Confidence: Medium
- **Observation:**
  - **Activation:** Google Ads users activate at 71–74%, against 64–68% for organic.
  - **Retention:** D1, D7 and D30 retention are the same for both.
  - **Value:** GA4 values a Google Ads user at about ₹19.6 over 120 days (organic ₹21.6), against about ₹2 per install.
- **Limitations:** gross revenue; some cohorts haven't reached 120 days.
- **Implication:** the campaign is acquiring the right users. The open question is not quality but how many of them would have installed anyway (insight 5).

**5. Some paid installs may replace organic ones** · Category: Acquisition · Observation · Confidence: Low–Medium
- **Observation:** in May–June, Google Ads new users fell from about 14,000 to 11,000 a week while organic rose from about 13,500 to 16,000. The total stayed near 27,000. Thermer already ranks #1 on Play for "printer bluetooth" and "printer thermal".
- **Implication:** the true return is lower than GA4's figure. A controlled spend test is needed before any budget increase.

**6. Bahasa ads were the account's best performer and were dropped by accident** · Category: Messaging · Data-backed · Confidence: Medium
- **Observation:** see Section 2. "OCRIndonesian" was the cheapest ad group for a year and was not carried over in the June consolidation.
- **Implication:** retested from Nov 10. If it holds, Bahasa becomes the default language for Indonesia.

**7. Editing a winning asset resets its history** · Category: Creative · Data-backed · Confidence: High
- **Observation:** adding a full stop to "Perfect for shops, cafés and small businesses" (₹1.59 per install) created a new asset, now rated Low.
- **Implication:** never edit a winner, even its punctuation. Add a new variant beside it.

## 5. Risks and issues

- **Purchase measurement (high):** see insight 2. Until `in_app_purchase` is imported, bidding ignores revenue and every purchase figure in Google Ads understates reality.
- **Rising auction prices (medium):** CPC reached ₹1.68 on Nov 11. Expect similar pressure around 12.12. Mitigation: target back to ₹2.60, no bid increases during festivals.
- **Re-saving an app ad removes Google's auto-generated assets (low):** each edit removed an auto-generated image and a video with about ₹47 of spend in 3 months. The ad copy is unaffected.
- **Bahasa ad groups have fewer images than their English twins (low):** 4–5 vs 13–14, because the others were cropped versions. Images receive very little spend in this campaign.

## 6. Next steps

| Date | Action | Purpose |
|---|---|---|
| Nov 13 | Target CPA ₹2.75 → ₹2.60 | Stop paying more for the same users (insight 1) |
| Nov 13 | Import `in_app_purchase` from GA4 as a Secondary conversion | Start measuring real purchases in Google Ads without changing bidding |
| Nov 14 | Final review of the Problem-Solution pause | Confirm no volume loss |
| Nov 17 | First read of the Bahasa ad groups | Check delivery and share of spend |
| Nov 20 | If `in_app_purchase` matches GA4 for 7 days, make it the optimisation event in place of "Purchase" | Let Google bid for paying users |
| Nov 24 | Full read of the Bahasa ad groups and Nov 10 assets | Keep, expand or stop, against the criteria in Section 3 |
| After Nov 17 | Refresh AI-Oriented copy (ad strength Poor; 8 of 10 assets rated Low) | Improve the weakest active ad group |

## 7. Hours

| Work | Hours (approx.) |
|---|---|
| GA4 and Confluence review | 2 |
| Data pulls, evaluation and analysis | 2.5 |
| Account changes (Bahasa ad groups, asset swaps, pause) | 1.5 |
| Monitoring | 1 |
| Purchase tracking spec | 1 |
| Reporting and documentation | 1.5 |
| **Total** | **~9.5** (planned 6–7; extra time went on GA4 and Confluence onboarding) |
