# Phased plan: one non-developer founder + Claude

**Date:** 8 October 2026 · Builds on [`../research/crowd-app-india-research-report.md`](../research/crowd-app-india-research-report.md)
and [`../research/crowd-sensing-innovations.md`](../research/crowd-sensing-innovations.md)

## Constraints this plan is built around
- **One person, not a developer.** Claude writes all code; you make decisions, create accounts,
  test on your own phone, and publish.
- **No field team.** All checking against reality has to be remote, or done by you at a temple
  near you, or by the app's own users.
- **Small budget.** Free tiers first; pay only when a phase proves itself.

## The combination of approaches (what goes in, and when)

| Approach | Gives | Needs people on site? | Phase |
|---|---|---|---|
| Festival + lunar calendar forecast | Expected crowd any day | No | 0 |
| Official published data (TTD wait times, Sabarimala caps, advisories) | Real numbers at a few temples **and free ground truth** | No | 0 |
| Bought/free busyness data (BestTime; Google's data via SerpApi) | "Busier than usual" now, and hourly patterns | No | 0 |
| Leading indicators (slot sell-outs, train waitlists, search interest) | Crowd expected in coming days | No | 1 |
| User reports (web + WhatsApp) | Live crowd level | Users | 1 |
| Measured wait times from the app + Little's Law | Wait time and a headcount estimate | Users (a few) | 2 |
| Walking speed, Bluetooth counts, network load (logged quietly first) | Density signals | Users | 2 (collect) → 3 (use) |
| Paid local reporters, recruited online and paid by UPI | Guaranteed coverage at pilot temples | Locals (not you) | 3 |
| Temple-board partnerships (CCTV counts, booking data) | Real headcounts | Partners | 4 |

**How we check accuracy without a field team:**
1. **TTD's daily published wait times** for Tirumala. We record them every day automatically and
   test our forecasts and measurements against them. This is free, ongoing ground truth.
2. **Temple livestreams** as a visual sanity check on peak days.
3. **You**, a couple of times a month at the busiest temple in your own city.
4. **Users' own reports**, once there are users.

---

## Phase 0: prove the data works (weeks 1–3). No app yet.
**Goal:** find out whether forecast + free/bought data can predict real crowds.

Claude builds (in this repo):
- A small data collector that runs automatically every hour on GitHub Actions (free): records
  TTD published wait times, busyness for ~20 target temples from BestTime/SerpApi, and weather.
- A festival/lunar calendar for those temples.
- A first forecast model and an **accuracy report**: how well does the forecast match TTD's
  real wait times?

You do: sign up for BestTime and SerpApi free tiers (Claude walks you through it), add the keys
to GitHub settings, read the weekly accuracy report.

**Go/no-go:** the forecast is within one crowd level of TTD's reality ≥ 70% of the time.
**Cost:** ~₹0–2,000 (only if free tiers run out). [Inferred]

## Phase 1: launch a simple website (weeks 4–8)
**Goal:** find out whether people want it, before building an app.

Claude builds:
- A mobile-friendly website (works like an app, installable on the home screen; no Play Store
  needed): temple pages with hour-by-hour forecast, "best time this week", festival warnings,
  official advisories, live busyness where available.
- A one-tap "how's the crowd?" report form, and a **WhatsApp report bot** (number + photo).
- Hindi + English; pages built to show up on Google for "[temple] crowd today" searches.

You do: buy a domain (~₹800/yr), connect hosting (Vercel free tier), share it in pilgrim
Facebook/WhatsApp groups and Instagram, check incoming reports.

**Go/no-go:** ≥ 1,000 visitors/month and people submitting reports without being paid.
**Cost:** ~₹1,000–3,000. [Inferred]

## Phase 2: Android app with phone sensing (months 3–5)
**Goal:** start **measuring**, not just predicting.

Claude builds:
- A Flutter app (Android first, same code later runs on iPhone). Cloud builds via GitHub Actions or Codemagic, so you don't
  need to install developer tools. You install the test version straight on your phone.
- **Wait-time measurement:** automatic geofence detection at the temple (with OpenCelliD tower
  data as a low-battery backup), plus "I'm in the queue" / "Done" buttons. Little's Law turns
  measured waits into a headcount estimate.
- **Quiet research logging** (with clear consent): walking speed, Bluetooth device counts,
  network signal quality. Not shown to users yet; collected to calibrate Phase 3.
- Consent screens and a privacy policy that meet India's data protection rules.

You do: Google Play developer account (US$25 one-time), test on your phone at your local
temple, fill in Play Store forms (Claude drafts all text, including the location disclosure).

**Go/no-go:** measured wait times at Tirumala within ±30% of TTD's published waits.
**Cost:** ~₹2,000 + optional ~₹5,000–15,000 for a freelance developer to do a one-off security
and privacy review before public launch (recommended). [Inferred]

## Phase 3: sensor fusion and coverage (months 5–8)
**Goal:** a confident live number at the pilot temples.

Claude builds:
- The fusion model: combines forecast, official data, busyness, measured waits, reports, and
  whichever sensing signals Phase 2 showed to work, each weighted by its proven accuracy per
  temple. Output: "~40,000 people · ~2.5 h wait · ±25%".
- Tools to manage paid local reporters (recruit via online ads/WhatsApp groups, pay via UPI,
  hourly WhatsApp reports, quality scoring).
- Crowd alerts ("Mahakal is quieter than usual right now").

You do: recruit 1–2 reporters per pilot temple, decide which temples to expand to.

**Cost:** ~₹3,000–9,000/month per temple for reporters [Inferred], hosting on paid tiers if traffic grows.

## Phase 4: partnerships and revenue (month 8+)
**Goal:** real headcounts and a business.

Claude prepares: a pitch deck and a dashboard demo for temple boards and district
administrations, API docs for travel/devotional apps, the CCTV/video counting integration
when a partner says yes.

You do: the outreach and meetings. This part can't be delegated to Claude.

---

## Can Claude build the whole app end to end?

**Short answer: Claude can write nearly all of it. You still have to be the owner and operator.**

**Claude can do:**
- Write all the code: app, website, backend, database, data collectors, forecast and fusion models.
- Set up automatic builds and tests on GitHub, so code turns into an installable app without you
  installing developer tools.
- Fix bugs from your description, screenshots or error messages.
- Write the privacy policy draft, Play Store listing text, consent screens, and documentation.
- Explain every step in plain language, one click at a time.

**You must do (Claude can guide but can't do it for you):**
- **Create and own accounts:** Google Play, GitHub, hosting, Supabase/Firebase, BestTime/SerpApi,
  domain. Enter payment details and keep the passwords.
- **Test on a real phone.** Claude can't hold a phone or stand in a temple queue.
- **Publish and answer the stores.** Submit the app, handle Play's reviews and rejections (Claude
  drafts the replies).
- **Make the decisions:** which temples, what the app says, what's safe to show.
- **Legal sign-off:** have a lawyer glance at the privacy policy and terms before public launch,
  especially because of location data and crowd-safety liability.

**Where non-developers usually get stuck, and how to avoid it:**
| Risk | Mitigation |
|---|---|
| Too much at once | Follow the phases; each one ships something small and working |
| Things break when you're not watching | Simple managed services (Vercel, Supabase), automatic alerts to your email |
| Security/privacy mistakes with location data | Collect as little as possible; one paid expert review before launch |
| Losing track of how it works | Claude keeps a plain-language `HANDOFF.md` updated in the repo after every session |
| App store rejection over location | Start foreground-only; ask for background location only when the wait-time feature is proven |

**Recommended stack** (chosen for least maintenance, not fashion) [Inferred]:
- Website: Next.js on Vercel (free tier)
- Database + login + storage: Supabase (Postgres with map support; free tier)
- Scheduled jobs: GitHub Actions (free for small use)
- Mobile app: Flutter (one codebase for Android **and** iPhone), built in the cloud. Launch on
  Android first (~95% of Indian phones [approximate, StatCounter]); release on iPhone once
  Android proves itself (Apple developer account US$99/yr, testing via TestFlight, no Mac needed
  with cloud builds). iPhones can't read cell-tower or network-quality data, so the iPhone version
  uses geofencing, wait times, walking speed, Bluetooth and reports; the fusion model treats the
  missing signals as unavailable.
- WhatsApp bot: WhatsApp Business Platform via a provider (pay per conversation)

*Costs are rough estimates (Oct 2026) and must be checked when signing up.*
