# Meta audience validation: Australian importer-distributors

**Date:** 18 Oct 2026
**Method:** Read-only Meta Marketing API calls (`targetingsearch`, `reachestimate`, `delivery_estimate`, Graph API v23.0) on my own ad account. Settings: Advantage+ audience off, Australia, ages 30–65 unless noted.
**What was not done:** no campaign was created or published, no money was spent, and no customer data was used.

## 1. Which signals exist

| Signal | Exists? | Note |
|---|---|---|
| Xero, MYOB, Unleashed, Cin7 | ✗ | Not available as interests. The closest is "Accounting software" (generic). |
| Canton Fair, customs broker, freight forwarding (interest) | ✗ | |
| International trade, Supply chain management, Freight transport, Wholesale, Distribution, Procurement, Warehouse, Alibaba.com | ✓ | Broad interests |
| Small business owners, Business Page admins | ✓ | Behaviours, and the best "owner" proxy available |
| Job titles (Import Export Manager, Importer, Wholesaler, Purchasing/Procurement Manager…) | ✓ but tiny | All 11 combined return Meta's floor of ~1,000 in Australia, so they're unusable |
| "Business decision makers" (industry) | ✓ but tiny | About 1,000 in Australia |

## 2. Australian audience sizes (Meta estimates)

| Audience | Estimated size |
|---|---|
| Australia, 30–65 (baseline) | 14.6M – 17.2M |
| Small business owners (behaviour) | 468k – 551k |
| Business Page admins (behaviour) | 416k – 489k |
| International trade (interest) | 720k – 847k |
| Alibaba.com (interest) | 71k – 84k |
| Procurement (interest) | 356k – 419k |
| All 10 trade interests (any) | 7.3M – 8.6M |
| **All trade interests AND (small business owner OR page admin)** | **551k – 648k** |
| All trade interests AND small business owner only | 313k – 368k |
| Core 4 (intl trade, Alibaba, wholesale, SCM) AND owner/admin | 341k – 401k |

**By age** (trade interests AND owner/admin):

| Age | Estimated size |
|---|---|
| 25–34 | 119k – 140k |
| 35–44 | 172k – 203k |
| 45–54 | 135k – 159k |
| 55–65 | 172k – 203k |

**Warehouse-estate pins** (1-mile radius, ages 30–65):

| Pin | Estimated size |
|---|---|
| Eagle Farm (Brisbane) | 41k – 48k |
| Wetherill Park (Sydney) | 46k – 54k |
| Dandenong South (Melbourne) | 52k – 62k |
| Kewdale (Perth) | 41k – 48k |
| All 4 pins | 174k – 205k |
| All 4 pins AND owner/admin | 10.5k – 12.3k |

## 3. What it means

1. **The audience exists.** Australian business owners or page admins with trade-related interests number about **550–650k**. That is plenty for A$900 over 14 days.
2. **Most of them aren't buyers.** ABS puts importing wholesalers in the band at about 6,700 firms. At 2–3 decision-makers each, that's roughly 15–20k real targets, or about **3% of the audience**. This is measured support for the plan's approach: the hook and the lead form do the filtering, not the targeting.
3. **Older owners are there.** People aged 45–65 make up about half of the owner audience (307k–362k), as many as the 25–44 group. The assumption that "owners use Facebook personally" holds.
4. **Job-title targeting is useless in Australia.** Every relevant title combined returns about 1,000 people. Software interests (Unleashed, Cin7, MYOB, Xero) don't exist. This matches the 2025 targeting cutback.
5. **The pin test is viable but narrow.** The four warehouse-estate pins combined with owner/admin give about 11–12k people. That's a sharp audience for test 2, but too small for the first A$900, which confirms the single broad ad set as test 1.
6. **Alibaba.com (71–84k) is the sharpest single interest.** It's also where dropshippers sit, so it's only worth using alongside the revenue question on the form.
7. **On a Leads campaign, Ads Manager forces Advantage+ audience.** Even this audience would only act as a suggestion there, which is another reason the filtering has to happen in the creative and the form.

**Limits.** Meta's numbers are estimates of monthly active people, given as ranges. Interests are inferred by Meta, not declared by users. The API returned no estimate of daily leads, because that needs a live Page and a lead form, so CPL is still the brief's assumption.
