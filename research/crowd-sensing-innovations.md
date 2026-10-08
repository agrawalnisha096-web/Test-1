# Measuring crowds without buying data: innovative signals

**Date:** 8 October 2026 · Companion to [`crowd-app-india-research-report.md`](crowd-app-india-research-report.md)

Labels: **[Verified]** = published source; **[Inferred]** = reasoning from verified facts;
**[Untested]** = plausible but we haven't tried it on a device or at a temple.

## The core idea

Earlier we said "one phone can't count the people around it". That's only half true. A
phone **can't see the operator's tower counts**, but it **can sense its surroundings**:
Bluetooth devices nearby, how loaded the mobile network is, how fast its owner is moving, and
how long they've been in line. Each one is a noisy signal. Put several together from several
pilgrims, check them against a few known numbers, and we get a **measured estimate**, not a
guess.

Six signal families follow, from strongest to most experimental, then how to combine them and
how to test it cheaply.

---

## 1. Queue maths: turning wait time into a headcount (strongest)

**How:** the app notes when a user's phone enters the queue area (geofence or a cell tower
from OpenCelliD) and when it leaves the sanctum. That's a **measured wait time W**. Two or three
users an hour are enough, the way RailYatri needs only a few phones on a train.

**The innovation is Little's Law** (a standard queueing result): people in a queue =
throughput × wait.

```
L  =  λ × W
people in queue  =  people darshan handles per hour  ×  hours of waiting
```

- **W** comes from our users' phones (measured).
- **λ** (throughput) is fairly stable per temple, because the sanctum lets people through at a
  steady pace. We can calibrate it once from published totals. Example: Kashi Vishwanath had
  **11+ lakh devotees on Mahashivratri 2025** [Verified, ETV Bharat], which over ~24 h is
  ≈ **45,000 per hour** of throughput capacity [Inferred].
- So a measured 2-hour wait on a peak day → **≈ 90,000 people in the queue system** [Inferred example].

**Why it's strong:** it uses real measurements plus one constant per temple, and gives an
actual number. **Limit:** λ differs on VIP or closure days; re-calibrate when official totals
are published. [Inferred]

## 2. Walking speed → crowd density (open areas: corridors, ghats, approach roads)

**How:** pedestrians physically slow down as density rises. This is the **pedestrian
"fundamental diagram"** (Weidmann 1993, a summary of 25 studies; maximum ~5.4 people/m²)
[Verified]. A phone measures its owner's speed (GPS + step counter), so speed gives an estimate
of density.

Weidmann's curve, with commonly cited parameters (to be checked against the original):
`v = 1.34 × [1 − exp(−1.913 × (1/ρ − 1/5.4))]`

| Density (people/m²) | Expected walking speed |
|---|---|
| 1 | ~1.06 m/s (comfortable) |
| 2 | ~0.61 m/s |
| 3 | ~0.33 m/s |
| 4 | ~0.16 m/s (shuffling) |

[Computed from the formula; Inferred]

Multiply density by the measured area of the corridor or ghat → **number of people**.

**Limits:** the curve varies with location and type of crowd (published jam densities range from
3.8 to 10 people/m²), so calibrate per site [Verified]. **Don't use it inside managed queues**,
where speed is set by the gate, not density. Use Little's Law there. [Inferred]

**Bonus: early warning (for authorities only).** Sudden stop-and-go patterns in many phones'
accelerometers at high density are a known precursor of dangerous crowd turbulence. This could
be a B2B safety alert for temple boards, never a public "safe/unsafe" label. [Inferred; needs
expert review]

## 3. Bluetooth scanning: each phone counts devices around it

**How:** phones, earbuds and smartwatches broadcast Bluetooth (BLE) signals. Our app scans for a
few seconds and counts distinct nearby devices. Several users' scans together → local density.

**Evidence [Verified]:**
- Airport study (LMU Munich): raw Bluetooth counts correlated only weakly with true pedestrian
  flow (r = 0.53); improved methods reached **r = 0.75**.
- Tokyo (Bessho & Sakamura, 2021): counting BLE signals in shopping streets was judged highly
  accurate against manual counts in 30-minute windows.
- Collaborative phone-to-phone methods (Weppner & Lukowicz) avoid relying on absolute counts.

**Limits:** devices change their Bluetooth address over time, so counts need short windows and
calibration. On Android 12+, Bluetooth scanning can be requested **without location
permission** (the "never for location" flag). Background scanning is throttled, so it works best
while the app is open, or during a brief scan when the user checks in. [Inferred from Android
docs; Untested]

**Use it as:** a "denser than usual here" signal that improves as more users scan.

## 4. Mobile network load measured from the phone

**How:** LTE phones report signal **quality (RSRQ)** as well as strength. RSRQ includes the
traffic of everyone else on the cell, so **it drops as the tower gets busier**. Combined with
SINR (also readable on the phone), researchers estimate the cell's load without operator data.
NEC validated this in an experimental LTE network [Verified]. Android exposes both values to
apps (`CellSignalStrengthLte.getRsrq()`, `getRssnr()`) [Inferred; check device support].

**This is the closest we can get to "tower crowd data" for free.** We can't see how many phones
are on the tower, but we can see how loaded it is, from inside it. Data speed and latency tests
in the background add another load signal.

**Limits:** values vary by phone model and are mixed with interference, so the output is
**relative** (busier than this tower usually is at this hour). Operators also add temporary
towers (COWs) at big festivals, which changes the baseline. [Verified/Inferred]

## 5. Public live video → AI head count

**How:** many big temples **livestream darshan and aarti** (Kashi Vishwanath on its website and
YouTube, Siddhivinayak on its site, Mahakal; aggregators like Temple360) [Verified]. Open-source
crowd-counting models (**CSRNet**, packaged ready to use in **PeekingDuck**, with separate models
for sparse and dense crowds) estimate counts and heat maps from video [Verified].

**Limits:** livestreams often show the deity, not the queue. Model accuracy drops below ~10
people. **Legal:** reusing streams needs the temple's or platform's permission; best pitched as
a partnership ("we'll put your cameras to work showing pilgrims the crowd"). Running counts on
the **temple's own CCTV**, as Mahakal's Trinetra does, is the B2B version. [Inferred]

## 6. Leading indicators: predicting tomorrow's crowd from public demand signals

These give **forecasts with evidence** for the days ahead:

| Signal | Why it predicts crowds | Access |
|---|---|---|
| **Darshan / pooja slot availability** (TTD ₹300 slots, Sabarimala Virtual-Q, Kashi Sugam Darshan) | Slots selling out = booked demand | Public booking pages; partnership preferred over scraping |
| **Train waitlists into temple towns** (to Katra, Tirupati, Varanasi, Ujjain) | Long waitlists 1–7 days before = arrivals coming | Public seat-availability pages / third-party rail APIs |
| **Hotel/dharamshala prices and availability** in the temple town | Price spikes = demand (CrowdWise already uses hotel demand) | OTA pages / partners |
| **Google search interest** ("Kashi Vishwanath darshan", "Tirupati darshan booking") | Searches rise before visits | **Google Trends API (alpha, application-only)** launched Jul 2025 [Verified] |
| **Panchang + festival calendar + weather** | Known peak days | Free APIs |

[Signals Inferred as predictors; must be validated against real crowd figures]

## 7. Human sensors (India-specific, low-tech)

- **Local reporters:** pay flower sellers, shoe-stand attendants, auto drivers or volunteers a
  small amount to send a 10-second **WhatsApp** report every hour (crowd level + photo). This
  gives guaranteed coverage at launch, before there are enough app users. [Inferred]
- **Shoe-stand and cloakroom tokens:** token numbers issued per hour = a measured arrival rate
  (λ) at temples where everyone leaves their shoes. One photo of the token counter each hour
  works. [Inferred; a partnership with the stand operator]
- **WhatsApp bot instead of an app** for reporting: no download, reaches older pilgrims.

---

## Putting it together: sensor fusion

```
             ┌───────────── leading indicators (bookings, waitlists, searches, calendar)
 FORECAST ───┤                       → crowd expected tomorrow / this week
             └───────────── historical patterns per temple

             ┌─ queue times from phones ──► Little's Law ──► people in queue
             ├─ walking speed ───────────► fundamental diagram ──► density × area
 NOW ────────┼─ Bluetooth counts ─────────► relative density
             ├─ network load (RSRQ/SINR) ─► relative load vs usual
             ├─ reports (app + WhatsApp) ─► crowd level
             └─ video counts (partners) ──► head count
                           │
                 weighted fusion (e.g. a Kalman/Bayesian filter):
                 each signal weighted by how reliable it has been at this temple
                           │
       "~40,000 people · ~2.5 h wait · ±25% · from 6 sources, 10 min ago"
```

Key properties [Inferred design]:
- **Calibrated per temple** against known numbers (TTD wait times, published daily totals,
  manual counts on a few test days).
- **Shows a range and its source**, never a falsely precise number.
- **Gets better on its own:** every measured wait time corrects the forecast and the weights.

## What it costs

| Signal | Cost | Needs users? | Needs partners? |
|---|---|---|---|
| Queue times + Little's Law | Free | Yes (few) | No |
| Walking speed | Free | Yes | No |
| Bluetooth counts | Free | Yes | No |
| Network load (RSRQ) | Free | Yes | No |
| Video head counts | Free models; compute cost | No | Yes (streams/CCTV) |
| Leading indicators | Free to low | No | Helpful |
| Human sensors | ~₹100–300 per reporter per day [Inferred] | No | No |

## How to test this in 4 weeks without building the full app

1. **Week 1: a data-logger app** (Android, internal only): logs location, cell info
   (RSRQ/SINR), Bluetooth counts, steps and speed, with tap buttons for "joined queue" and "had
   darshan".
2. **Week 2: field test at one temple** with 3–5 people visiting at different times, including
   one peak day. **Ground truth:** the temple's published figures where they exist, plus manual
   counts (count people crossing a line for 5 minutes, or count heads in a photo of a marked area).
3. **Week 3: analysis.** Which signals track the ground truth? Fit Little's Law λ, the
   speed–density curve and the RSRQ baseline for this site.
4. **Week 4: decision.** Keep the 2–3 signals that work, drop the rest, and design the MVP around them.

**Best test site:** **Tirumala**, because TTD publishes wait times every day, which gives free
ground truth to check our measured waits against. [Inferred]

## Sources
- Little's Law and Kashi throughput: [ETV Bharat, 11 lakh on Mahashivratri 2025](https://etvbharat.com/en/!bharat/over-11-lakh-devotees-offer-prayers-at-kashi-vishwanath-on-mahashivaratri-enn25022704468)
- Fundamental diagram: [Seyfried et al., arXiv physics/0506170](https://web3.arxiv.org/pdf/physics/0506170) ·
  [Bosina & Weidmann, STRC 2018](https://strc.ch/2018/Bosina_Weidmann.pdf) ·
  [ETH thesis](https://research-collection.ethz.ch/handle/20.500.11850/296226) ·
  [Measurement methods, arXiv 0911.2165](https://arxiv.org/pdf/0911.2165)
- Bluetooth sensing: [Schauer, Werner & Marcus (TUM PDF)](https://www.bgd.ed.tum.de/pdf/2014_CROWDDENSITIES_Werner.pdf) ·
  [Weppner & Lukowicz (DFKI)](https://www.dfki.de/web/forschung/projekte-publikationen/publikation/7832) ·
  [IEEE 6526732](https://ieeexplore.ieee.org/document/6526732) ·
  [IEICE BLECE](https://ken.ieice.org/ken/paper/20220526WCKF/eng/)
- Network load from RSRQ: [Unpaywall 10.1145/3646547.3689665](https://unpaywall.org/10.1145%2F3646547.3689665) ·
  [Load estimation in a UE (patent)](https://image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/9137692) ·
  [Cell utilization estimation (patent)](https://image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/9949153) ·
  [IEICE (NEC)](https://ken.ieice.org/ken/paper/20160721DbjE/eng/)
- Video counting: [CSRNet paper](https://arxiv.org/pdf/1802.10062) ·
  [PeekingDuck crowd counting](https://peekingduck.readthedocs.io/en/stable/use_cases/crowd_counting.html) ·
  [LCDnet lightweight model](https://arxiv.org/pdf/2302.05374)
- Temple livestreams: [ETV Bharat, Kashi live](https://www.etvbharat.com/en/!state/maha-shivratri-2024-kashi-vishwanath-live-darshan-here-is-how-you-can-watch-enn24030702720) ·
  [The Week, Shravan streaming](https://www.theweek.in/wire-updates/national/2025/07/13/des88-up-shravan-varanasi.html) ·
  [india.gov.in, Siddhivinayak](https://services.india.gov.in/service/detail/live-darshan-to-the-shree-siddhivinayak-ganapati-temple-maharashtra) ·
  [utsav.gov.in Kashi](https://www.utsav.gov.in/view-darshan/kashi-vishwanath-live-darshan-1)
- Google Trends API: [Google Search Central, Jul 2025](https://developers.google.com/search/blog/2025/07/trends-api) ·
  [Search Engine Journal](https://www.searchenginejournal.com/google-trends-api-alpha-launching-breaking-news/551935/)
- Cell-tower databases: [OpenCelliD](https://www.wikipedia.org/wiki/OpenCellID) ·
  [Mozilla MLS retirement](https://discourse.mozilla.org/t/retiring-the-mozilla-location-service/128693)

*Researched and drafted with AI assistance (Claude). The formulas and thresholds need checking
by a crowd-safety expert before any safety-related use.*
