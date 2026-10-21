# Thermer Google Ads: what I'd change and why

Oct 21, 2026

## What I noticed

Cost per install roughly doubled this year, and it wasn't the market. From January to May, Indonesia installs cost about ₹1.33. On May 19 the live campaign moved to Maximize conversions with no target, and from June to September installs cost ₹2.58. Spend per month went up about 75% while installs actually fell. When a target CPA was put back on Oct 5, cost per install dropped to ₹1.89 within days, with only about 5% fewer installs.

The other big issue is purchase tracking. Until October most purchase events came through at ₹1, so I don't trust that data. Since Oct 5 there have been 56 purchases (about 0.27% of installs) at roughly ₹1,037 each. On subscription revenue alone an install is worth about ₹1, but the app also earns from ads, and that isn't visible in Google Ads. So right now nobody can say for sure whether the campaign pays back.

*(Numbers from the account, read-only, through Oct 20, 2026, excluding GST.)*

## 1. Campaign and bidding

**Bidding: lower the target CPA from ₹2.60 to ₹2.08.** The Oct 5 change shows the target is what's keeping costs down. Google's simulator says ₹2.08 would cut spend about 27% for about 10% fewer in-app actions; those last actions cost around ₹8 each, three times the average. I'd keep the move to 20% so learning doesn't reset badly, then hold it for two weeks. I'd watch cost per install and installs per day. The simulator is only an estimate, so the real drop in volume could differ.

**Conversion goals: fix purchase tracking before bidding on it.** Purchase is set as Secondary, counted every time, and falls back to ₹1. Installs are tracked twice, and First_Print is counted every time, which is why conversion rate shows over 100%. I'd get the developer to send real purchase values in IDR (and check them against Play Console), and link AdMob so we can see ad revenue per install. Only then would I make Purchase a Primary action. The catch is that this needs dev time.

**Structure: keep one campaign, cut two ad groups.** All Indonesia spend has been in one campaign since June, and with this little purchase data I wouldn't split it. But "Bluetooth Printers app" and "Problem-Solution" cost ₹3.14–3.18 per install against ₹2.31 for "New", with no better purchase rate, so I'd pause them once the new assets are live. I'd also hold off relaunching the Purchase campaign: at about ₹1,000 per purchase it would get one or two a day, too few for target CPA to learn.

**Budget: bring it down to ₹4,000 a day.** The campaign is set to ₹5,200 but only spends about ₹3,600, because the bid is the limit. A lower cap costs nothing now and stops a repeat of June if the bid strategy changes again. I'd also slow the edits down: there were 56 bid, budget or goal changes in 18 months, and each one resets learning.

## 2. Ad text

Every headline and description in the account is in English, though the campaign only targets Indonesia. I'd add Bahasa copy to New and OCR (about 82% of spend), swapping out the Low-rated English assets and keeping the Best ones, so the asset report shows which language works better.

**New** (general receipt printing). The best English assets are about speed and simplicity, so I kept that and added "will it work with my printer?" and "is it free?"

| Headlines | Descriptions |
| --- | --- |
| Cetak Struk dari HP *(print receipts from your phone)* | Sambungkan printer thermal Bluetooth dan cetak struk dalam hitungan detik. *(connect a Bluetooth printer and print in seconds)* |
| Cetak Bluetooth Cepat *(fast Bluetooth printing)* | Buat struk dengan logo toko, QR code dan barcode. Tanpa laptop, cukup dari HP. *(receipts with your logo, QR and barcode, no laptop needed)* |
| Untuk Printer 58mm & 80mm *(for 58/80mm printers)* | Struk rapi untuk warung, kafe dan toko online. Mulai gratis. *(neat receipts for shops, cafés and online stores, start free)* |
| Gratis, Langsung Cetak *(free, print right away)* | Lebih dari 5 juta unduhan, rating 4,6 di Google Play. *(5M+ downloads, rated 4.6 on Google Play)* |

**OCR** (scan and reprint). Shop owners don't search for "OCR", so the copy leads with the result: a neat printed receipt from a handwritten bill.

| Headlines | Descriptions |
| --- | --- |
| Foto Nota, Cetak Ulang *(photograph a bill, reprint it)* | Foto struk atau nota, ubah jadi teks yang bisa diedit, lalu cetak ulang lewat Bluetooth. *(photo to editable text to reprint)* |
| Salin Struk Tanpa Ketik Ulang *(copy receipts without retyping)* | Nota tulisan tangan jadi struk cetak yang rapi dan mudah dibaca. *(handwritten bills become neat printed receipts)* |
| Buat Struk Otomatis dengan AI *(make receipts automatically with AI)* | Perlu salinan struk? Scan dan cetak ulang dalam hitungan detik. *(need a copy? scan and reprint in seconds)* |

After two weeks I'd compare cost per install for Bahasa vs. English assets. App campaigns mix assets together, so if the gap is small I'd confirm it with an experiment before dropping English.

## 3. Creatives

Video is barely running: five 10-second videos have spent about ₹47 in three months. I'd test three 15–20 second videos in portrait, landscape and square, each aimed at a different user, with Bahasa text and voice-over and a simple phone-shot (UGC-style) look.

1. **"Customer wants a receipt"** (warung and small shop owners). A customer asks for a struk, the owner taps their phone, and a receipt with the shop logo prints in seconds. It's the core use case and matches the best ad group, New. *Hypothesis:* showing the real moment in a shop gets cheaper installs than the current generic videos.
2. **"Labels in a minute"** (online sellers). A pile of parcels with handwritten labels, then the phone printing product and shipping labels one after another. Sellers who print a lot have more reason to pay for Pro. *Hypothesis:* installs may cost more, but more of these users subscribe. (Need to confirm label printing works well on Android first.)
3. **"From nota to struk"** (laundries, workshops, caterers). A handwritten bill is scanned and comes out as a clean printed receipt. It's the only concept built on the premium features (OCR and AI). *Hypothesis:* fewer installs, but a higher share go on to pay.

I'd give each at least two weeks. Concepts 2 and 3 can only be judged properly on purchase rate, which is another reason the tracking fix comes first.

## Final recommendation

**First three changes:**

1. Lower the target CPA to ₹2.08 and cap the budget at ₹4,000 a day, then leave it for two weeks.
2. Fix purchase tracking and link AdMob, so we know what an install is actually worth.
3. Add Bahasa copy and new videos to New and OCR, and pause the two weakest ad groups.

**What I wouldn't change yet:** bidding on purchases only or Target ROAS (about 3.5 purchases a day is far too few, and the data was unreliable until October); more budget (the bid is the limit, and extra spend from June to September bought almost nothing); excluding Display (it brings in purchase value in line with its 9% of spend); and new countries (no better on cost, and payback in Indonesia isn't proven yet).

**What I'd want to know before bigger decisions:** ad revenue per install from AdMob; Play Console orders and subscription mix (weekly, monthly, yearly) with renewal rates; how many paid installs are people who'd have found the app anyway; and what a paying user is worth to the business, i.e. the payback target.
