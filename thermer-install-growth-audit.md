# Thermer Google Ads: Install Growth Audit and Plan

Nov 15, 2026 · Data: Google Ads (Jan 1 – Nov 13, 2026), GA4 (Sep 1 – Nov 14), Google Play listing (Nov 15)

## Summary

**The account is buying fewer installs for more money than it did at the start of the year.** January to April averaged **69,600 installs a month for ₹89,000** (₹1.28 each). June to October averaged **58,400 for ₹1,42,700** (₹2.44 each): 60% more spend for 16% fewer installs. The decline isn't a recent slide in paid traffic. Google Ads installs have held at about 1,900–2,100 a day since September. Total installs are falling because **organic installs fell 17%** over the same period.

The gap comes from four structural limits, all fixable:

1. **One campaign, built for quality only.** Until June, two campaigns ran side by side, and the paused "Indonesia Revenue" campaign supplied 37–61k installs a month at ₹1.46–1.53. Today one campaign bids only for users Google predicts will print. That pool tops out around 2,000 installs a day.
2. **Almost no inventory beyond Search and Play.** 91% of spend goes to Google Search and Play. YouTube gets 0.3%, because every video is a 10-second portrait clip. One image delivers nearly all image traffic.
3. **The Bahasa test can't get spend.** The two Bahasa ad groups received 2.1% of spend in 14 days. Inside a campaign with established English ad groups, Google won't give them enough delivery to prove themselves.
4. **Paid traffic runs in one country only,** while Mexico and the Philippines already show stronger buyers than Indonesia, without any ads.

**Plan:** add a second Indonesia campaign for install volume (in Bahasa), open YouTube and Display with new video and image assets, and test Mexico. Together these should lift paid installs from about 1,900 to **2,700–3,100 a day** within 4–6 weeks, at a blended cost of about ₹2.0–2.3 per install, with activation and purchase guardrails on every step. Raising the target CPA is kept as a last resort: it's the most expensive way to buy installs.

## 1. Where installs are being lost

### Finding 1: the setup that produced volume was dismantled in May–June

| Period | Campaigns running | Installs/month | Spend/month | Cost per install |
|---|---|---|---|---|
| Jan–Apr 2026 | Indonesia Revenue + live campaign, both bidding on "retained" | 69,600 | ₹89,000 | ₹1.28 |
| Jun–Oct 2026 | Live campaign only, bidding on First_Print + Purchase | 58,400 | ₹1,42,700 | ₹2.44 |
| Oct 2026 (best recent month) | Live campaign only, target CPA restored | 61,094 | ₹1,19,311 | ₹1.95 |

- **What changed:**
  - On May 19 the live campaign switched to First_Print bidding with no target.
  - On Jun 10 "Indonesia Revenue" was paused (correctly, because its purchase data was unreliable).
  - Its installs were never replaced: it had been supplying 37–61k a month at ₹1.46–1.53.
- **Why it matters:** two campaigns with different goals reach different users. A campaign bidding on First_Print narrows Google's search to likely printers. A volume campaign reaches everyone likely to install. Running only the first leaves part of the market unreached.

### Finding 2: higher bids buy volume, but at a steep price

Google's simulator (Nov 4–10, current target ₹2.73–2.75):

| Target CPA | In-app actions/week | Cost/week | Extra volume | Extra cost | Cost of each extra install |
|---|---|---|---|---|---|
| ₹2.73 (now) | 8,835 | ₹25,670 | – | – | – |
| ₹3.41 | 9,756 | ₹35,408 | +10% | +38% | about ₹6.90 |
| ₹4.10 | 10,461 | ₹45,729 | +18% | +78% | about ₹8.00 |

Each extra install bought by raising the bid costs ₹7–8, about four times today's average. That's affordable on GA4's value of a paid user (about ₹19.6 over 120 days), but only if those users are truly extra and as good as current ones. Neither is guaranteed at the margin. Structural levers come first; this is the fallback.

### Finding 3: YouTube and Display are almost unused

| Network (Sep 1 – Nov 13) | Share of cost | Impressions |
|---|---|---|
| Google Search (includes Play) | 90.6% | 845,017 |
| Display | 8.8% | 433,598 |
| YouTube | 0.3% | 16,573 |
| Search partners | 0.2% | 20,477 |

- **Videos:** all 7 are 10-second clips. 6 are portrait, and the only landscape one sits in a paused ad group. Google is flagging 6 ad groups for missing landscape and square video.
- **Images:** 58 in total. One landscape image (1344×703) produced 9,527 impressions and 1,378 installs in 30 days. The other 57 together produced under 700 impressions. 7 never served.
- **AI-Oriented** has no video at all, and its ad strength is Poor.
- **Why it matters:** YouTube is the largest pool of users not yet reached. App campaigns can only show there with suitable videos, so the missing formats directly cap reach.

### Finding 4: the Bahasa test is starved of delivery

| Ad group (Nov 1–14) | Spend | Share | Cost per install |
|---|---|---|---|
| New – ID | ₹679 | 1.3% | ₹2.35 |
| OCR – ID | ₹393 | 0.8% | ₹2.67 |

New ad groups inside a mature campaign compete with English ad groups that have months of history, so Google keeps favouring the established ones. At 2% of spend, the test can't reach a result in any reasonable time.

### Finding 5: other markets already show strong buyers, without ads

GA4, Oct 16 – Nov 14 (all organic outside Indonesia):

| Country | New users | Purchases per printing user | Revenue per new user |
|---|---|---|---|
| Indonesia | 73,176 | 4.9% | ₹15.9 |
| **Mexico** | 1,771 | **7.4%** | **₹36.4** |
| Philippines | 1,414 | 2.8% | ₹18.1 |
| India | 9,610 | 0.9% | ₹3.6 |
| Brazil | 5,806 | 0.9% | ₹2.5 |

Mexico's users buy 50% more often than Indonesian users, and each is worth about 2.3× as much, with no ads and no Spanish marketing. India and Brazil bring many users but few buyers. The 2024 Philippines (₹7.65 per install) and Brazil (₹57) campaigns ran without a clear setup and shouldn't be taken as the market's ceiling.

### Finding 6: organic is falling, and the store listing may be part of it

- **The decline:** Play organic new users fell from about 2,400 a day (early September) to about 2,000 (November), −17%.
- **Recent reviews are critical of the latest update:** "free version now only allows 5 entries", "preview and font choice are gone", "the previous version was better".
- **The listing has fixable faults:**
  - the main banner is in English;
  - screenshot 2 says "Bukti Transaksi **Saham**" ("saham" means stock shares);
  - the short line mentions shipping labels, which aren't supported yet.
- **Why it matters for paid:** every paid click lands on this page. Installs per click are steady at about 75% for now, but falling ratings would lower it and raise cost per install across the board.

### Finding 7: measurement is close to fixed

- **What's done:** the GA4 `in_app_purchase` event was imported into Google Ads on Nov 13 (Primary, data-driven attribution).
- **What's still wrong:** the campaign still bids on the faulty "Purchase" event. It's set as Secondary and its value collapsed from ₹10–25k a week to about ₹2k from late October.
- **What to watch:** only 5 purchases were recorded in the first 3 days, as Google typically reports imported conversions with a delay. Watch for 7 days before switching the campaign over.

## 2. Growth plan

| # | Lever | What exactly | Expected extra installs/day | Extra spend/day | Guardrails | Approval |
|-|-----|------------|----|----|-------|----|
| 1 | **Second Indonesia campaign for volume, in Bahasa** | New App campaign: Indonesia, focus on install volume with "users likely to perform in-app actions", target cost per install ₹1.60 to start. Move all Bahasa copy into it and add Bahasa versions of New, OCR and Bluetooth Printers app | +500 to +800 | ₹1,000–1,500 | Cost per install ≤ ₹2.00; GA4 First_Print rate ≥ 60%; live campaign installs must not fall more than 10% | Yes (new campaign, extra budget) |
| 2 | **Video and image assets** | 3 videos (15–20 s) × landscape, square and portrait, plus 10 images in all three formats, made with AI (ChatGPT for images, Gemini for video, per the SOP). Add to every ad group, including AI-Oriented | +200 to +400 (YouTube/Display reach) | Within current budget | Installs per click ≥ 70%; First_Print rate held | Creative scope (you said no creatives for now) |
| 3 | **Mexico test** | New App campaign, Mexico, Spanish copy, focus on in-app actions (First_Print plus in_app_purchase), ₹1,000/day for 21 days | +200 to +400 | ₹1,000 | Stop if cost per purchase > ₹600 after ₹15,000 spend, or GA4 purchases per printing user < 4% | Yes (new market, extra budget) |
| 4 | **Switch quality campaign to real purchases** | After 7 days of matching data, replace "Purchase" with `in_app_purchase` as a selected action, with target reset in the same edit | 0 (quality, not volume) | 0 | Installs/day not more than 10% below prior week | No |
| 5 | **Store listing fixes** (product team) | Bahasa banner, fix "Saham", remove the label claim, respond to update reviews; run a Play Store listing experiment on the first screenshots | Lifts paid and organic conversion | 0 | Rating trend | Product team |
| 6 | **Bid step (fallback)** | Target CPA ₹2.75 → ₹3.30 on the quality campaign, only if levers 1–3 fall short | about +1,150/week (+8%) | about ₹1,100 | Stop if extra installs cost > ₹8 or First_Print rate falls > 3 pts | Within current budget |

**Combined effect** if levers 1–3 perform as expected:
- **Installs:** paid rises from about 1,900 to **2,700–3,100 a day**.
- **Spend:** rises from about ₹3,700 to **₹5,700–6,200 a day**.
- **Cost per install:** blended about ₹2.0–2.3.

The founder's notes say spend above about ₹5,500 a day was historically hard to scale efficiently. That's why levers 1 and 3 add *new* reach rather than pushing the existing campaign harder.

**Order:**
1. **Week 1:** lever 1 (largest, lowest-risk volume) and lever 5 (free).
2. **Week 2:** lever 2.
3. **Week 3:** lever 3.
4. **Lever 4:** as soon as purchase data matches.
5. **Lever 6:** only if needed.

One change per campaign per week keeps every result readable.

## 3. Why a separate campaign, not more ad groups

- **Budget control:** a campaign has its own budget, so the volume test is guaranteed delivery. Ad groups compete inside one budget, which is why the Bahasa ad groups got 2%.
- **Different goals need different campaigns:** one campaign can't optimise for both "as many installs as possible" and "only likely printers". The account ran this two-campaign structure from January to May and got its best volume and cost of the year.
- **Clean measurement:** each campaign's installs, cost and GA4 quality can be read separately, and the volume campaign can be paused without touching the quality campaign.

## 4. Risks and how they're controlled

- **Lower-quality users from the volume campaign:** watched daily through GA4 First_Print rate by campaign. Pause if it falls below 60% (Google Ads users are at 71% today, organic at 64%).
- **The two campaigns competing for the same users:** watched through the live campaign's installs. If they fall more than 10% while total installs don't rise, the new campaign is mostly taking existing users, and it gets cut back.
- **Paid installs replacing organic ones:** watched through organic new users in GA4. If total new users don't rise with paid, the extra spend isn't adding users.
- **Festival auction prices (12.12):** new campaigns launch after 12.12, or with capped targets.

## 5. Approval request (for the Founder)

- **Current:** one campaign, ₹5,200/day budget, about ₹3,700/day actual spend, about 1,900 paid installs a day.
- **Proposed:**
  - **Campaign A (Indonesia, volume, Bahasa):** ₹1,500/day budget.
  - **Campaign B (Mexico test):** ₹1,000/day for 21 days.
  - **Total account budget:** from ₹5,200 to ₹7,700/day. Expected actual spend about ₹5,700–6,200/day.
- **Evidence:**
  - The January–April two-campaign setup delivered 69,600 installs a month at ₹1.28, against 58,400 at ₹2.44 since June.
  - Mexico users buy 7.4% of the time and are worth ₹36 each, against 4.9% and ₹16 in Indonesia.
  - GA4 values a paid Indonesian user at about ₹19.6 over 120 days.
- **Expected benefit:** about +800 to +1,200 paid installs a day, at about ₹2.0–2.3 each.
- **Monitoring:** daily for the first week, then twice weekly. Results go in the weekly report.
- **Rollback:**
  - Campaign A pauses if cost per install stays above ₹2.00 for 5 days, or if its users' First_Print rate drops below 60%.
  - Campaign B stops at ₹15,000 spend if cost per purchase is above ₹600.
