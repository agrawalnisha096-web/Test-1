# Thermer Google Ads: Weekly Update, Week 2

Reporting period: Nov 3–9, 2026 (changes through Nov 10) · Sent Nov 11, 2026

**Summary.** Two findings shape the next month. First, raising the target CPA did not buy more installs: two steps (₹2.60 → ₹2.75) added cost per action but no volume, so more growth has to come from new audiences, not higher bids. Second, Google Ads sees only about 1 in 10 real purchases: GA4 records about 50 purchases a day from Google Ads users, Google Ads about 5. On Nov 10 I launched two Bahasa Indonesia ad groups and replaced four weak English assets. My next priority is getting real purchase data into Google Ads.

## 1. Performance

Campaign "New || Indonesia || In-app action || Targeting". Google Ads data excludes GST. Recent days are still updating, so First_Print and purchases for Nov 7–9 will rise slightly.

| Metric | Oct 27 – Nov 2 | Nov 3–9 | Change |
|---|---|---|---|
| Spend | ₹26,026 | ₹26,101 | 0% |
| Installs per day | 1,992 | 1,928 | −3% |
| Cost per install | ₹1.87 | ₹1.93 | +3% |
| CPC | ₹1.38 | ₹1.45 | +5% |
| First_Print per day (events) | 1,291 | 1,199 | −7% |
| Cost per in-app action | ₹2.86 | ₹3.10 | +8% |
| Purchases in Google Ads | 62 | 32 | −48% |

GA4, users whose first source is Google Ads (google / cpc):

| Metric | Oct 26 – Nov 1 | Nov 2–9 |
|---|---|---|
| New users per day | 1,767 | 1,699 |
| First_Print users ÷ new users | 72.3% | 74.1% |
| Purchases per day (in_app_purchase) | 53.6 | 48.6 |
| Purchase revenue per day | ₹22,806 | ₹19,605 |

- **Volume and cost:** installs dipped 3% and cost per install rose 3%, mainly after the Nov 6 target step and over the weekend (Nov 7–8). Monday Nov 9 recovered to 1,989 installs.
- **Quality held:** in GA4, Google Ads users' first-print rate rose (72.3% → 74.1%) and purchases dipped only 9%. The 48% purchase drop in Google Ads is a tracking problem (Section 4), not fewer buyers.
- **Against month-1 goals:** installs 1,928/day (goal ≥ 1,900, met). Cost per install ₹1.93 (goal ≤ ₹1.70, not met; see Section 2).

## 2. Changes this week and what they showed

| Date (IST) | Change | Observation → reasoning | Result so far | Decision |
|--------|----------|--------------------|-------------|----------|
| Nov 6, 23:52 | Target CPA ₹2.70 → ₹2.75 | After the Oct 31 step installs were flat; tested whether one more small step would unlock volume | On matching days (Sat–Mon), installs fell 6% (1,901 → 1,780/day) and cost per install rose from ₹1.94 to ₹2.00 | Didn't work. Revert to ₹2.60 on Nov 17 (deferred so the Bahasa launch reads cleanly) |
| Nov 7, 00:13 | Paused Problem-Solution | Cost per install ₹2.20–2.50, above New (₹1.65–1.81). Its custom-receipt message overlaps New and AI-Oriented | 3 days of data, too early. Its 3–4% of spend moved to other ad groups | Keep paused; review Nov 14 |
| Nov 10, 18:22–18:24 | 4 English assets replaced in New and OCR (below) | The replaced assets were rated Low at ₹2.48–3.15 per install vs ad group averages of ₹1.81 (New) and ₹2.15 (OCR). "Free" and bank-receipt messages have past evidence | Under review | Review Nov 24 |
| Nov 10, 18:32–18:36 | New Bahasa ad groups "OCR – ID" and "New – ID" | All ad text was English. In the old campaign, the Bahasa ad group was the cheapest (₹1.63 vs ₹1.73–1.84 for English at the same time). Higher bids added cost, not volume | Under review | Review Nov 17 and Nov 24 |

**Asset swaps on Nov 10:**

| Ad group | Removed (rated Low) | Added | Why |
|----|-----------|-----------|--------------|
| New | Print Receipts in Seconds (₹2.57) | Free Receipt Printing App | Same headline ran in an older OCR ad group averaging ₹1.68; every local competitor leads with "gratis" |
| New | Print professional receipts directly from your phone. (₹2.48) | Free to start. Print professional receipts from most Bluetooth thermal printers. | Answers the two pre-install doubts: cost and printer compatibility |
| OCR | Print Receipts in Seconds (₹3.15) | Print Bank Receipts Faster | Bank and transfer receipt copy cost ~₹1.65 per install in the old campaign; matches money-transfer agents, a primary persona in Confluence |
| OCR | Snap a receipt photo and reprint it in seconds… (₹3.12) | Free to start. Print transfer receipts quickly on your thermal printer. | Same proven angle, plus "free" |

"Free" is used only as "free app" or "free to start", which matches the product: the first 10 receipts are free, then daily limits apply.

**Bahasa ad groups:**
- **OCR – ID** targets money-transfer agents and reuses the proven copy (e.g. "Cetak Bukti Transaksi Bank").
- **New – ID** targets small businesses with custom receipts (e.g. "Cetak Struk dari HP", "Gratis, Langsung Cetak").
- Each uses its English twin's video and 4–5 of its images. The rest were cropped versions that couldn't be reused.
- Expected: 10–20% of spend at ₹1.80 per install or less, and campaign installs above 2,000 a day.
- Rollback: pause both if campaign installs fall more than 10% for 3 days running.

**Review of last week's changes (Oct 29–31):**
- **"Print Fast From Your Phone" (New):** now the best asset in the account, at ₹1.19 per install on ₹3,358 (2,826 installs). Keep.
- **The other Oct 31 assets:** most were rated Low after 10 days, so four were replaced on Nov 10. "Receipt photos to printable receipts in seconds." (Good) stays.
- **Target CPA ₹2.60 → ₹2.70:** spend rose 7% with flat installs. Didn't work; to be reverted (above).

## 3. Experiments

| Experiment | Hypothesis | Spend / sample | Result | Next |
|---|---|---|---|---|
| Target CPA steps (₹2.60 → ₹2.75) | A higher target unlocks more installs | 10 days, ~₹37k | Lost: cost per in-app action ₹2.62 → ₹3.26, installs flat to −6% | Revert to ₹2.60 on Nov 17 |
| English copy refresh (Oct 29–31) | Clearer benefit lines beat Low assets | ~₹5k on new assets | Mixed: 1 clear winner, most others Low | Losers replaced Nov 10 |
| Bahasa ad groups | Bahasa reaches users English misses, at equal or lower cost | Started Nov 10 | Running | Read Nov 17 / Nov 24 |
| "Free" and bank-receipt assets | These angles beat generic speed claims | Started Nov 10 | Running | Read Nov 24 |
| Problem-Solution paused | Its spend works better in other ad groups | 3 days | Too early | Review Nov 14 |

## 4. Insights

Written in the App Insights format, ready to add to Confluence.

**1. Higher target CPA doesn't buy volume** (Bidding · Data-backed · Confidence: High)
- Observation: two steps (₹2.60 → ₹2.75) raised cost per in-app action from ₹2.62 to ₹3.26. Installs went flat, then fell 6%. The campaign stayed "Limited by bid strategy" and spent well under budget.
- Learning: this campaign tops out at about 2,000 installs a day with its current ads. That matches the founder's history, where cost per install rose to about ₹2 above ₹4,200/day. More volume needs new audiences or messages, not higher bids.

**2. Google Ads sees only about 1 in 10 purchases** (Tracking · Data-backed · Confidence: High)
- Observation: Oct 22 – Nov 9, Google Ads recorded 132 purchases, most valued at 1. GA4 recorded about 50 purchases a day (in_app_purchase) from Google Ads users. The custom "Purchase" event fires on only about 40–50% of purchases from app version 6.4.8.42 onwards.
- Learning: this also explains why the paused "Indonesia Revenue" campaign showed revenue that couldn't be trusted. The fix needs no new code: import in_app_purchase into Google Ads.

**3. Google Ads users are profitable on GA4's numbers** (Revenue · Observation · Confidence: Medium)
- Observation: GA4 values a Google Ads user at about ₹19.6 over 120 days (organic ₹21.6), against about ₹2 per install. Google Ads users print at least as often as organic users (72–74% vs 66–68%), and their D1/D7/D30 retention is about the same.
- Limitations: gross revenue; some cohorts haven't reached 120 days.
- Learning: quality isn't the problem. The open question is how many paid installs are truly extra (insight 5).

**4. Bahasa ads performed best before, then were dropped** (Messaging · Data-backed · Confidence: Medium)
- Observation: the Bahasa "OCRIndonesian" ad group was the cheapest in the old campaign (₹1.63 vs ₹1.73–1.84 for English, Jun 2025 – May 2026) and had the most retained users. It wasn't carried over in the June consolidation. Local competitors all advertise in Bahasa.
- Learning: tested again from Nov 10.

**5. Some paid installs may replace organic ones** (Acquisition · Observation · Confidence: Low–Medium)
- Observation: when Google Ads new users fell from about 14k to 11k a week (May–June), organic rose from about 13.5k to 16k. The total stayed about 27k a week. Thermer already ranks #1 on Play for "printer bluetooth".
- Learning: the real return is below the GA4 figure. A controlled spend test is needed before scaling.

**6. Editing a winning asset throws away its history** (Creative · Data-backed · Confidence: High)
- Observation: adding a full stop to "Perfect for shops…" (₹1.59 per install) made it a new asset, now rated Low.
- Learning: never edit winners, even punctuation; add a new variant instead.

## 5. Risks and issues

- **Purchase tracking (action needed):** see insight 2. The developer spec has been shared. The quickest step is importing in_app_purchase (Section 6).
- **New assets under review:** checked on Nov 11. Any disapproval will be reported straight away.
- **Bahasa ad groups have fewer images than their English twins:** 4–5 vs 13–14. Low impact, since images barely serve in this campaign.
- **Saving an app ad removes Google's auto-generated assets:** each edit removed an auto-generated image and an old video (Zf9rXbYPdKI, about ₹47 of spend in 3 months). This looks like a Google side effect; the ad copy wasn't affected.
- **Target CPA at ₹2.75 until Nov 17:** this costs about ₹0.25–0.40 more per in-app action. Kept on purpose for a clean read of the Bahasa launch.

## 6. Plan for next week (Nov 11–17)

1. **Nov 11:** confirm all new assets are approved and the Bahasa ad groups start delivering.
2. **Import in_app_purchase from GA4 into Google Ads as a Secondary conversion.** This doesn't change bidding. After 7–14 days, if it matches GA4, make it the optimisation event in place of "Purchase".
3. **Nov 14:** review the Problem-Solution pause.
4. **Nov 17:** first read of the Bahasa ad groups and the new assets, and set the target CPA back to ₹2.60.
5. **After Nov 17:** refresh AI-Oriented copy (ad strength Poor; 8 of its 10 assets rated Low).

## 7. Approvals and information needed

- **Information:**
  - How is the 20% activation goal defined? GA4 shows 72–74% of Google Ads users firing First_Print.
  - What is shown to Google Ads users versus organic users? Your message said ads are shown aggressively to Google Ads users, but Confluence documents no difference.
  - Plan prices in IDR.
- **Developer:** purchase tracking per the spec, and First_Print counted once per user.
- **Approval (month 2):** a controlled spend test to measure how many paid installs are truly extra (see insight 5). I'll send a proposal with the hypothesis, metric, guardrails and maximum spend.

## 8. Hours

| Work | Hours (approx.) |
|---|---|
| GA4 and Confluence review | 2 |
| Evaluating changes and analysis | 2 |
| Account changes (Bahasa ad groups, asset swaps) | 1.5 |
| Monitoring | 1 |
| Purchase tracking spec | 1 |
| Reporting and documentation | 1.5 |
| **Total** | **~9** (planned 6–7; extra time went on GA4/Confluence onboarding) |
