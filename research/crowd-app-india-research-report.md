# Crowd prediction app for Indian religious sites: research report

**Date:** 8 October 2026 · **Branch:** `claude/mobile-app-research` · **Status:** first research pass

Confidence labels: **[Verified]** = stated by a primary or reputable source (linked);
**[Inferred]** = my reasoning from verified facts; **[Unverified]** = single weak source, a
company's own claim, or not confirmed. All web research was done on 8 Oct 2026. Nothing here
has been tested on a device yet.

---

## Executive summary

1. **The need is real and urgent.** Indian religious sites see very large, very spiky crowds
   (Tirupati ~25.5M visitors a year, Kashi Vishwanath ~28.6M, Ram Mandir ~135M in 2024), and
   crowd crushes keep happening: at least seven temple or religious-gathering crushes in 2025
   alone, including Tirupati (Jan) and Kasibugga (Nov). [Verified]
2. **Nobody owns "how crowded is this temple right now, and when should I go?" for pilgrims.**
   Temple boards run their own systems for the authorities (CCTV/AI, RFID, virtual queues) and
   only a few, like TTD, publish wait times. The one consumer product found, CrowdWise India, is
   a web-only, pattern-based forecaster (stated 65–75% accuracy) with no live signal. Google Maps
   busyness is patchy for Indian temples and has no official API. [Verified / Inferred]
3. **The "map signal" idea needs one correction.** Where Is My Train uses cell-tower IDs to
   find *where your own phone is*. One phone cannot sense *how many other people* are near it.
   Crowd counting needs **many phones aggregated** (your users, like Google's Popular Times), or
   **operator-side data** (Jio/Airtel/Vi), or **sensors at the venue**. [Inferred, from how both
   systems are documented]
4. **Recommended data approach: a layered hybrid that works from day one.**
   - **L1 Forecast engine (day 1):** a temple-specific calendar model built on the Hindu lunar
     calendar (tithi, Ekadashi, Purnima, Shivratri, Navratri), weekday deity patterns (Monday for
     Shiva, Tuesday/Saturday for Hanuman), school holidays, weather and past peaks. This is the
     core differentiator over generic forecasters.
   - **L2 Official signals (day 1, where public):** TTD wait times and token-slot status,
     Sabarimala daily caps, shrine-board advisories and suspensions.
   - **L3 Crowdsourced + passive app data (after launch):** one-tap "how's the crowd" reports,
     plus opt-in, *foreground-only*, aggregated location visits from app users. Lightweight
     on-device cell-tower reading, in the spirit of Where Is My Train, can work as a low-battery
     location fix.
   - **L4 Venue partnerships (later):** temple-board camera counts (like Mahakal's Trinetra), queue
     and token data, Wi-Fi counts. This turns the app into a B2B product.
   - **Not for the MVP:** buying telecom tower data (no commercial product found, DPDP consent
     limits), scraping Google Popular Times (ToS risk, and it may be disappearing), and Wi-Fi
     probe sniffing (MAC randomisation, privacy).
5. **MVP:** start in **one temple city (Varanasi)** so crowdsourced reports reach useful density,
   then add Ujjain and Tirumala. Show "best time to go" forecasts, a live crowd level when
   confident, and official advisories. Android first, Hindi + English. Present it as **planning
   help, never as a safety advisory**.
6. **Legal:** the DPDP Rules were notified in Nov 2025, and the consent and notice duties apply
   from about **May 2027**. Build them in from day one anyway. Play Store restricts background
   location, which is a further reason to stay foreground-only at first.

**Verdict:** buildable, with a clear gap in the market. The risk is not the technology, it's
**cold-start data density** and **liability around safety**. Both are handled by the layered
design and a single-city launch.

---

## 1. How the reference apps work, and what transfers

### Where Is My Train (WIMT)
- Built by Sigmoid Labs (Bengaluru), **bought by Google around Dec 2018** (price undisclosed;
  press estimates $30–40M) under the "Next Billion Users" effort. [Verified: TechCrunch,
  VentureBeat]
- **Works offline:** it locates the train using **cell-tower information** plus an offline copy
  of the Indian Railways timetable, not GPS or mobile data. The reasoning: GPS and the internet
  are unreliable and drain the battery on trains. [Verified: Skift, Entrackr]
- About 10M registered users and eight languages at the time of the acquisition. [Verified:
  company claim, 2018]
- The exact cell-matching method isn't public. Pages describing a "tower-to-track database" and
  triangulation are low quality. [Unverified]

**What transfers:** the India-first design principles: works on weak networks, low battery use,
offline-first, many languages. On-device cell info (Android `TelephonyManager.getAllCellInfo()`,
which needs location permission) can tell the app *the user is at Kashi Vishwanath* cheaply.
[Verified that the API exists and needs location permission; exact permission level should be
checked against current Android docs]

**What doesn't transfer:** WIMT answers "where am I?" A crowd app answers "how many people are
there?" That needs aggregation across many devices. [Inferred]

### Google Maps Popular Times / live busyness
- Built from **aggregated, anonymised Location History from opted-in users**, protected with
  differential privacy. Shown only when a place gets enough visits; otherwise nothing is shown.
  Busyness is *relative* to the place's own busiest hour. [Verified: Google blog 2020, Maps Help]
- **No official API.** The Places API doesn't return Popular Times. Third-party scrapers exist but
  likely breach Google's ToS. [Verified]
- Aug 2026: users report Popular Times disappearing from the Maps Android app; unclear whether
  intentional. [Verified that it was reported; cause Unverified]

**What transfers:** the model to copy for L3: aggregate opted-in visits, show *relative*
busyness against the venue's own peak, and **show nothing when the data is thin** rather than
guess.

### Temple boards' own systems
| Site | What exists | Public to pilgrims? |
|---|---|---|
| **Tirumala (TTD)** | Slotted Sarva Darshan (SSD) tokens, ₹300 special entry, compartment queue complex; partnership with Google (2025); live token-slot status on the website; re-entry passes (May 2026). Waits range from 2–3 h (slotted) to 24 h (free darshan, summer peak). | **Yes, partly:** slot status and published wait times. [Verified] |
| **Sabarimala (TDB)** | Virtual-Q online booking; daily caps (70k in 2024; HC-set caps of 30–55k on peak Jan 2026 days; 75k ceiling upheld for 2026-27); spot booking capped at 5k; AI crowd system planned. | **Caps and bookings yes; live crowd no.** [Verified] |
| **Vaishno Devi (SMVDSB)** | Mandatory registration with an **RFID Yatra Access Card**, 700+ CCTV cameras, real-time MIS reporting; yatra suspended when crowds peak (e.g. 21 Mar 2026, ~39k gathered). 91.25 lakh pilgrims in 2022. | **Advisories only.** [Verified] |
| **Mahakaleshwar, Ujjain** | "Trinetra" AI on PTZ cameras at pressure points: density, congestion, unusual behaviour. Won a National e-Governance Award. | **No, used by authorities only.** [Verified] |
| **Maha Kumbh 2025** | ~1,800–2,750 CCTV cameras, of which only a portion had AI (reports conflict); density per m²; RFID wristbands and app GPS tracking were planned. Official 66 crore attendance figure is disputed. | **No.** [Verified, with conflicting figures noted] |

**Takeaway:** the authorities are investing heavily in *monitoring*, but almost none of it reaches
pilgrims as "should I go now?". Those official systems are both a **data source** (L2/L4) and the
**B2B buyer**. [Inferred]

---

## 2. Demand: religious sites in India

**Volumes [Verified unless marked]:**
- Religious tourism: 105M visits (2020) → 1,439M (2022) (KPMG, Aug 2025). India has 2M+ temples.
- Ram Mandir, Ayodhya: 135.5M visitors in 2024 (KPMG); Ayodhya city 160M+ in 2024 (Invest UP).
- Kashi Vishwanath: 28.6M visitors (KPMG). Sawan 2025 expected ~1.5 crore; non-festival record of
  636,975 in one day (31 Mar 2024). Before the corridor opened: ~20k a day.
- Tirupati: 25.5M visitors (KPMG).
- Maha Kumbh 2025: 66 crore official figure (disputed by The Wire).
- Market: India religious and spiritual market ~$70B in 2025 (IMARC); spiritual tourism projected
  at $59B by 2028 (KPMG). [Commercial estimates; treat as directional]

**Why crowds are predictable (the basis for L1) [Inferred, supported by the reports above]:**
- Peaks follow the **Hindu lunar calendar**, not the Gregorian one: Mahashivratri, Navratri,
  Ekadashi, Purnima, Sawan Mondays, Makaravilakku, Kumbh bathing days.
- **Weekday deity patterns:** Mondays (Shiva), Tuesdays and Saturdays (Hanuman), Thursdays
  (Sai Baba at Shirdi).
- **School holidays and long weekends** (TTD's 24-hour waits in summer holidays).
- **Spillover events** (Maha Kumbh pushing record numbers to Kashi: 14M in one month).
- **Weather and suspensions** (Vaishno Devi halted by rain and by crowds).

**Safety context: crowd crushes at religious sites [Verified; tolls vary by source]:**
| Date | Place | Deaths |
|---|---|---|
| 2 Jul 2024 | Hathras, UP (religious congregation) | ~116–121 |
| 12 Aug 2024 | Baba Siddheshwar Nath, Jehanabad, Bihar | 7 |
| 8 Jan 2025 | Tirupati, token distribution | 6 |
| 29 Jan 2025 | Maha Kumbh, Prayagraj | ~30 (official) |
| 2 May 2025 | Lairai Zatra, Shirgao, Goa | 6 |
| 27 Jul 2025 | Mansa Devi, Haridwar | 6+ |
| 1 Nov 2025 | Venkateswara temple, Kasibugga, AP | 9 (temple capacity ~2–3k, ~20k came) |
| 2026 | Ashok Dham, Lakhisarai, Bihar | 7+ |

This is the strongest reason a better information tool matters. It's also the biggest liability
risk (see §5).

---

## 3. Data sources compared

Full scoring: [`data-source-comparison.csv`](data-source-comparison.csv).

| # | Source | What it gives | Cold-start | Cost | Legal / policy risk | MVP? |
|---|---|---|---|---|---|---|
| 1 | **Calendar + historical model** | Hour-by-day forecast for any temple | None, works day 1 | Low | Low | **Yes (L1)** |
| 2 | **Official board data** (TTD wait/slots, Sabarimala caps, advisories) | Ground truth at a few big sites | None where public | Low (manual or feed) | Low–medium (check site terms; prefer partnerships) | **Yes (L2)** |
| 3 | **Crowdsourced reports** ("crowded / OK / empty", wait estimate, photo) | Live signal | High: needs users on site | Low | Low (moderation needed) | **Yes (L3)** |
| 4 | **App users' opt-in location visits** (foreground, aggregated) | Live and relative busyness, dwell time | High: needs scale per site | Low–medium | Medium (DPDP consent; Play policy if background) | **Yes, foreground only (L3)** |
| 5 | On-device cell-tower / network reading (WIMT-style) | Cheap, offline location fix; maybe a network-congestion proxy | Same as #4 | Low | Medium (location permission) | **As a helper to #4** |
| 6 | Third-party busyness APIs (e.g. BestTime) | Relative hourly forecasts; claims 150+ countries | None | Paid per venue | Low | **Test only.** India temple coverage unconfirmed; needs about 100+ visitors a day |
| 7 | Google Popular Times scraping | Relative busyness | None | Low | **High** (ToS); feature may be going away | **No** |
| 8 | Telecom operator data (Jio/Airtel/Vi tower counts) | Best headcount proxy in theory | None | Unknown, probably high | **High**: no commercial product found; DPDP limits reuse of subscriber data | **No.** Revisit as a partnership |
| 9 | Venue sensors: CCTV/AI counts, RFID, turnstiles | Accurate live counts | Needs a partnership | Board-funded | Low if the board shares aggregates | **Later (L4)** |
| 10 | Wi-Fi / BLE probe counting | Relative trends | Needs hardware | Medium | Medium–high (MAC randomisation, privacy) | **No** |

Key facts behind the scoring:
- Cell APIs: `getAllCellInfo()` returns the serving and neighbouring cells and needs location
  permission; `getNeighboringCellInfo` is deprecated. [Verified, secondary sources]
- Telecom: Jio handled 20M voice and 400M data requests on the Kumbh peak day. That was a network
  statistic, not a headcount. No source confirms the government used tower data for official
  counts. Legal commentary says the DPDP Act limits telcos from reusing KYC/service data without
  consent. [Verified]
- Wi-Fi probes: Android 10+ and iOS 14+ randomise MAC addresses, so absolute counts are
  unreliable and need calibrating against cameras. Regulators treat even randomised MACs as
  personal data. [Verified, academic + vendor]
- BestTime: relative scores only (100 = the venue's own weekly peak), not headcounts; live data
  not always available. [Verified, vendor docs]

### Recommended design: the layered "confidence ladder"
```
L4 venue/partner feeds    ──► highest confidence (B2B, later)
L3 live app signals       ──► reports + aggregated opt-in visits (after launch, per site)
L2 official signals       ──► published waits, caps, suspensions (day 1, big sites)
L1 calendar forecast      ──► always on, every temple (day 1)
```
The app always shows L1 and **upgrades the label** when higher layers have enough data
("Forecast" → "Live, based on 23 reports in the last hour"). This follows Google's rule of
staying silent or falling back when data is thin, rather than guessing. [Inferred design]

Possible future proxy (needs testing): mobile network congestion at a site (latency, throughput
and signal quality reported by app users) rises with crowd density. [Inferred, untested]

---

## 4. Competitors and gaps

| Player | What it does | Gap |
|---|---|---|
| **CrowdWise India** (crowdwise.in) | Free, web-only, beta; 1,047–1,206 destinations including temples; weighted pattern model (time, weekday, season, holidays, social, hotel demand); states 65–75% accuracy; "Crowd Alerts" coming soon; operator not named | No app, no live signal, generic rather than temple-calendar specific. **Closest competitor; watch it.** [Verified] |
| **Google Maps** | Popular Times / live busyness where data suffices | Patchy coverage for temples, no festival awareness, no API, may be getting pulled. [Verified/Inferred] |
| **Temple board apps and portals** (TTD, Sabarimala Virtual-Q, SMVDSB) | Booking, tokens, some wait times | One temple each; built for booking, not "when should I go?" [Verified] |
| **Sri Mandir** (AppsForBharat) | Devotional app: online pujas, chadhava, 70+ temples; claims 30M+ downloads, ₹100 Cr run rate FY25; ~$50M raised; plans darshan tickets and spiritual tourism | Not doing crowds, but has the audience. **A likely partner or acquirer, and a possible future competitor.** [Verified funding; usage figures Unverified] |
| **Government AI systems** (Trinetra, Kumbh ICCC, Sabarimala AI tender) | Monitoring for authorities | Not public. These are the **B2B buyers and data partners**. [Verified] |
| Academic prototypes (camera + IR + ESP32 counters) | Technical ideas | Not products. [Verified] |

**The gap:** a multi-temple, multilingual mobile app that tells a pilgrim **the best time to go**
(using lunar-calendar-aware forecasts), shows **live crowd level when known**, and gathers
**official advisories** in one place. [Inferred]

---

## 5. Legal, policy and liability

- **DPDP Act 2023 + DPDP Rules 2025** (notified ~13–14 Nov 2025). Phased: Data Protection
  Board immediately; consent-manager rules after about 1 year; **notice, consent, security and
  breach rules after 18 months (about 14 May 2027)**. Notices must list each data item and its
  purpose, use plain language, and make withdrawing consent as easy as giving it. Children's
  data needs verifiable parental consent. [Verified: law-firm and Big-4 summaries; check the
  primary text before launch]
  → **Design implication:** location is personal data. Collect it with an itemised, purpose-specific
  consent ("to show live crowd levels to other pilgrims"), aggregate on the server, hold no
  per-user trails beyond a short window, and offer one-tap withdrawal. [Inferred]
- **Google Play background location:** allowed only when it's core to the app; needs a
  declaration, a video demo, a prominent in-app disclosure and a privacy policy. Without
  approval, the app can be blocked or removed. [Verified: Play Console Help]
  → **MVP uses foreground-only location** (while the app is open or on a check-in). [Inferred]
- **Telecom data:** telcos are data fiduciaries and likely Significant Data Fiduciaries; reusing
  subscriber data needs consent. Whether aggregated data falls outside DPDP is unresolved.
  [Verified commentary; legal question open]
- **Scraping:** Google Maps scraping likely breaches its ToS. Temple websites: check each one's
  terms, and prefer written permission or partnerships. [Verified/Inferred]
- **Safety liability (the biggest non-technical risk):** if the app says "not crowded" and people
  go into a crush, the reputational and possibly legal exposure is serious. Mitigations: label
  every number as an estimate with its confidence and data age; never route people *toward* a
  site during an official advisory; always show official advisories above the app's own
  estimate; add a "follow police and temple staff instructions" banner on peak days; get legal
  review of the terms. [Inferred]

---

## 6. Business model

Ranked by how realistic each is early on [Inferred]:
1. **B2B / B2G dashboards and APIs** for temple trusts, district administrations and state
   tourism boards: crowd forecasts for staffing, and a pilgrim-facing widget for their own
   sites. The buyers are already spending (Trinetra, Sabarimala AI tender, Kumbh). The data
   from L3 users becomes the asset.
2. **Partnerships / distribution** with devotional and travel apps (Sri Mandir, IRCTC-adjacent
   travel apps, OTAs) that license a "best time to visit" widget.
3. **Contextual local offers** (hotels, dharamshalas, cabs, prasad delivery) when someone plans a
   visit. Keep it light, given the religious context.
4. **Premium for pilgrims** (alerts when the crowd drops, multi-temple yatra planner): small
   willingness to pay in India; a later add-on, not the core.

---

## 7. MVP recommendation

**Pilot geography:** **Varanasi first.** Kashi Vishwanath plus nearby high-traffic sites (Sankat
Mochan, Kaal Bhairav, Dashashwamedh Ghat Ganga Aarti). One city keeps crowdsourced reports dense
enough to be useful. Then **Ujjain (Mahakaleshwar)**, then **Tirumala** (official data is rich,
so the forecast can be checked against TTD's own numbers). [Inferred]

**Core features (v1):**
1. Temple page: today's **hour-by-hour crowd forecast** + **"best time to go this week"**.
2. **Festival calendar** per temple (lunar-calendar aware), with "expect very heavy crowds"
   warnings in advance.
3. **Live crowd level** when L2/L3 data is sufficient, with the source and age shown.
4. **One-tap crowd report** on arrival (crowd level + wait estimate), with light points/badges.
5. **Official advisories** pulled to the top (suspensions, caps, slot status).
6. Hindi + English first; offline-friendly; small APK; works on low-end Android.

**Not in v1:** background tracking, telecom data, Wi-Fi sensors, iOS (unless cheap via a
cross-platform build), monetisation.

**Rough tech stack [Inferred]:** Flutter or React Native (Android first, iOS later); a backend
on a managed Postgres + PostGIS; geofences per temple; forecasting starts as a rules-based
calendar model plus a gradient-boosted model once there's data; server-side aggregation with a
k-anonymity threshold (e.g. publish only when ≥ N reports/visits); India-region hosting.

**Success metrics for a 3-month pilot:**
- Forecast accuracy: the forecast level matches observed reports ≥ 70% of the time (beats
  CrowdWise's claimed 65–75%).
- Report density: ≥ 1 report an hour at the main temple during opening hours.
- D30 retention among users who visited; number of "planned visit at suggested time" actions.
- One temple trust or district administration conversation that leads to a data-sharing pilot.

**Top risks and mitigations:**
| Risk | Mitigation |
|---|---|
| Cold start: no live data | L1 forecast always available; single-city launch; reward reports |
| Safety liability | Estimates labelled with confidence; official advisories override; legal review |
| Fake or spam reports | Geofence check (must be on site); rate limits; reputation weighting |
| Privacy / DPDP | Foreground-only, itemised consent, server-side aggregation, short retention |
| A large player enters (Google, Sri Mandir, government apps) | Move fast on temple-calendar depth and board partnerships; position as the B2B data layer they'd license or buy |

---

## Open questions for you
1. Pilot city: Varanasi as recommended, or somewhere you have local reach?
2. Should the long-term business lean **B2B (temple boards / government)** or **consumer**?
3. Next step: an MVP spec and screen flows, or first a quick test of how far the forecast-only
   model gets against TTD's published wait times?

---

## Sources
- Where Is My Train / Google acquisition: [TechCrunch](https://techcrunch.com/?p=1756506) ·
  [VentureBeat](https://venturebeat.com/ai/google-acquires-sigmoid-labs-developer-of-popular-indian-app-where-is-my-train) ·
  [Skift](https://skift.com/?p=317246) · [Entrackr](https://entrackr.com/?p=26436) ·
  [Technology Magazine](https://technologymagazine.com/digital-transformation/google-acquires-sigmoid-labs-maker-indian-app-where-my-train)
- Google busyness: [Google blog: popular times & live busyness](https://blog.google/products/maps/maps101-popular-times-and-live-busyness-information/) ·
  [Maps Help](https://support.google.com/maps/answer/11323117?hl=en) ·
  [Android Authority, Aug 2026](https://androidauthority.com/google-maps-popular-times-2-3698496) ·
  [BestTime: Popular Times API alternative](https://blog.besttime.app/popular-times-api-alternative-for-developers/) ·
  [BestTime docs](https://documentation.besttime.app/)
- Android cell APIs: [NeighboringCellInfo reference](https://Developer.android.com/reference/android/telephony/NeighboringCellInfo) ·
  [AOSP: deprecate getNeighboringCellInfo](https://android.googlesource.com/platform/frameworks/base/+/748e9d5%5E%21/) ·
  [MIT App Inventor forum](https://community.appinventor.mit.edu/t/telephony-manager-extention-cellid/150069)
- Tirumala: [ETV Bharat, re-entry facility](https://www.etvbharat.com/en/state/ttd-introduces-re-entry-facility-to-end-long-queues-of-devotees-enn26052601958) ·
  [ETV Bharat, summer rush](https://www.etvbharat.com/en/bharat/summer-rush-smoother-darshan-ttd-cuts-waiting-time-at-tirumala-enn26050502701) ·
  [Sakshi Post, 20-hour wait](https://www.sakshipost.com/news/andhrapradesh/tirupati-20-hour-wait-time-srivari-darshan-summer-holidays-begin-404079) ·
  [Hindutone, TTD–Google](https://hindutone.com/tirumala/tirupati-temple-ai-partnership-google-2025-smart-darshan/)
- Sabarimala: [Onmanorama 2024 cap](https://onmanorama.com/news/kerala/2024/10/16/mandala-season-sabarimala-opens-virtual-queue-booking.html) ·
  [ETV Bharat, HC spot-booking cap](https://www.etvbharat.com/en/state/sabarimala-pilgrimage-kerala-hc-caps-spot-bookings-to-5000-amid-surge-enn25111905220) ·
  [Verdictum, 75k cap](https://www.verdictum.in/court-updates/high-courts/kerala-high-court/suo-motu-v-state-of-kerala-wpc-no-8529-of-2026-caps-daily-devotees-at-75000-sabarimala-pilgrimage-1611632) ·
  [Onmanorama, Makaravilakku 2026](https://www.onmanorama.com/news/kerala/2026/01/10/sabarimala-temple-makaravilakku-preparations.amp.html) ·
  [Madhyamam, AI system](https://madhyamamonline.com/kerala/sabarimala-to-get-ai-powered-crowd-management-system-1530564)
- Vaishno Devi: [ETV Bharat](https://www.etvbharat.com/en/bharat/vaishno-devi-shrine-board-updates-yatra-registration-guidelines-ahead-of-new-year-rush-enn25122305434) ·
  [Tribune, 700 cameras](https://www.tribuneindia.com/news/j-k/vaishno-devi-shrine-sets-up-dedicated-network-of-over-700-cameras-for-e-surveillance-474077) ·
  [SMVDSB blog](https://maavaishnodevi.org/blog/yatra-registration)
- Mahakal Trinetra: [Indian Masterminds](https://indianmasterminds.com/feature-stories-on-bureaucrats-changemakers/mahakal-trinetra-ai-crowd-management-mahakaleshwar-temple-216614/)
- Kumbh: [The Statesman](https://www.thestatesman.com/india/mahakumbh-2025-setting-a-global-benchmark-in-event-headcount-with-advanced-technology-1503374303.html) ·
  [Drishti IAS](https://drishtiias.com/state-pcs-current-affairs/ai-in-maha-kumbh-2025) ·
  [MediaNama](https://www.medianama.com/2025/01/223-ai-surveillance-mahakumbh-tracking-pilgrims/) ·
  [WION](https://www.wionews.com/india-news/maha-kumbh-2025-organisers-use-ai-to-prevent-stampedes-and-ensure-safety-of-400-million-pilgrims-8631920/amp) ·
  [The Wire, numbers](https://m.thewire.in/article/government/66-crore-visitors-30-dead-in-stampede-why-govts-maha-kumbh-numbers-dont-add-up) ·
  [Bharat Express](https://english.bharatexpress.com/india/technological-methods-help-accurately-estimate-crowd-numbers-at-maha-kumbh-2025-189831) ·
  [Business Standard, Jio](https://www.business-standard.com/industry/news/jio-handled-20-mn-voice-and-400-mn-data-requests-during-maha-kumbh-125022701017_1.html) ·
  [Nashik Simhastha 2027](https://www.freepressjournal.in/pune/nashik-digital-kumbh-to-bring-ai-qr-codes-and-smart-technology-to-simhastha-2027)
- Crowd crushes: [Wikipedia list](https://en.wikipedia.org/wiki/List_of_human_stampedes_in_Hindu_temples) ·
  [WION list](https://www.wionews.com/india-news/from-mumbai-railway-station-to-maha-kumbh-list-10-of-major-stampedes-in-india-1749111708402/amp) ·
  [The Wire, Kasibugga](https://m.thewire.in/article/society/kasibugga-andhra-stampede-at-least-eighth-major-such-incident-this-year) ·
  [Peninsula, Haridwar](https://thepeninsulaqatar.com/article/27/07/2025/six-crushed-to-death-in-india-temple-stampede) ·
  [Ahram, Hathras](https://english.ahram.org.eg/News/526485.aspx)
- Demand: [KPMG, Faith and Flow (Aug 2025)](https://kpmg.com/in/en/insights/2025/08/faith-and-flow-navigating-crowds-in-indias-sacred-spaces.html) ·
  [IMARC](https://www.imarcgroup.com/india-religious-spiritual-market) ·
  [HVS Anarock](https://www.hvs.com/article/10520/hvs-anarock-insights-the-rise-of-faith-led-hospitality-in/) ·
  [IANS, Kashi Sawan](https://ianslive.in/kashi-vishwanath-temple-gears-up-for-sawan-rush-15-crore-devotees-expected--20250705162724)
- Competitors: [CrowdWise India](https://crowdwise.in/) ·
  [Entrepreneur, AppsForBharat Series C](https://india.entrepreneur.com/news-and-trends/appsforbharat-raises-usd-20-mn-in-series-c-round-to-scale/494059) ·
  [Outlook Business, Series B](https://www.outlookbusiness.com/news/appsforbharat-raises-18-million-in-funding-round-led-by-nandan-nilekani-backed-fundamentum)
- Wi-Fi counting: [ESPCI/Sensors 2023 paper](https://www.institut-langevin.espci.fr/biblio/2023/7/23/2032/files/sensors-23-06142-v2.pdf) ·
  [CDRC footfall method](https://data.cdrc.ac.uk/node/2742)
- Legal: [Mondaq, DPDP Rules notified](https://www.mondaq.com/india/data-protection/1708164/digital-personal-data-protection-rules-2025-notified) ·
  [KPMG DPDP Rules guide](https://assets.kpmg.com/content/dam/kpmgsites/in/pdf/2025/11/dpdp-rules-2025-guidance-to-dpdp-act-implementation.pdf) ·
  [Anantam IAS timeline](https://anantamias.com/current-affairs/dpdp-rules-2025-notified/?pdf=1) ·
  [King Stubb & Kasiva, telecom](https://ksandk.com/data-protection-and-data-privacy/data-privacy-risks-telecom-ott/) ·
  [exchange4media, telcos & data](https://www.exchange4media.com/digital-news/can-telcos-become-the-new-data-powerhouses-in-india-154328.html) ·
  [Play Console Help, background location](https://support.google.com/googleplay/android-developer/answer/9799150?hl=en)

*Researched and drafted with AI assistance (Claude). Check key figures against the primary
sources before using them externally.*
