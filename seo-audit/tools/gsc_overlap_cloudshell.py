#!/usr/bin/env python3
"""
Query-overlap validator for the white-label merge/redirect pairs — Cloud Shell edition.

Runs entirely in Google Cloud Shell (browser). Authenticates as YOU via
Application Default Credentials, so no service account and no "Add user" step:
your own Google account already has Search Console access.

SETUP (all in the browser):
  1. console.cloud.google.com -> pick/create a project.
  2. APIs & Services -> Library -> enable "Google Search Console API".
  3. Open Cloud Shell (terminal icon, top-right).
  4. Authenticate with the Search Console scope:
       gcloud auth application-default login \
         --scopes=https://www.googleapis.com/auth/webmasters.readonly,https://www.googleapis.com/auth/cloud-platform
     gcloud auth application-default set-quota-project YOUR_PROJECT_ID
  5. pip3 install --user google-api-python-client google-auth
  6. Put this file in Cloud Shell (e.g.  cloudshell edit gsc_overlap.py  and paste),
     set your property if it isn't a domain property, then:
       export GSC_PROPERTY="sc-domain:trillet.ai"      # or https://www.trillet.ai/
       python3 gsc_overlap.py
  7. Download the result:  cloudshell download gsc_overlap_results.csv
     ...and send gsc_overlap_results.csv back.
"""
import os, csv, time, datetime
import google.auth
from googleapiclient.discovery import build

PROPERTY = os.environ.get("GSC_PROPERTY", "sc-domain:trillet.ai")
ROOT     = "https://trillet.ai"
TOPN     = 100          # top queries per page (by impressions)
MONTHS   = 16

# source -> target for every MERGE/REDIRECT in the redirect map (24 pairs)
PAIRS = [
    ("/blogs/ai-chatbot-agency-business-model", "/blogs/voice-ai-agency-business-model-canvas"),
    ("/blogs/ai-receptionist-white-label-pricing", "/blogs/voice-ai-white-label-pricing-breakdown-2026"),
    ("/blogs/best-voice-ai-for-agencies", "/blogs/top-10-white-label-voice-ai-platforms-for-agencies-2026"),
    ("/blogs/best-white-label-ai-chatbot-for-agencies-2026", "/blogs/top-10-white-label-voice-ai-platforms-for-agencies-2026"),
    ("/blogs/best-white-label-ai-receptionist-for-agencies-2026", "/blogs/top-10-white-label-voice-ai-platforms-for-agencies-2026"),
    ("/blogs/four-voice-ai-platforms-duke-it-out-for-the-agency-crown", "/blogs/top-10-white-label-voice-ai-platforms-for-agencies-2026"),
    ("/blogs/ghl-v3-native-ai-vs-dedicated-voice-ai", "/blogs/trillet-vs-gohighlevel-voice-ai"),
    ("/blogs/gohighlevel-voice-ai-integration", "/integrations/gohighlevel"),
    ("/blogs/gohighlevel-voice-ai-options-built-in-vs-trillet-vs-others", "/blogs/trillet-vs-gohighlevel-voice-ai"),
    ("/blogs/how-do-white-label-chatbots-work", "/blogs/what-is-white-label-ai-receptionist"),
    ("/blogs/how-much-money-can-you-make-with-ai-voice-agency", "/blogs/ai-voice-agency-economics-real-numbers"),
    ("/blogs/how-to-choose-white-label-ai-chatbot", "/blogs/white-label-voice-ai-features-checklist"),
    ("/blogs/how-to-start-ai-chatbot-agency", "/blogs/60-day-ai-voice-agency-launch-plan"),
    ("/blogs/monthly-revenue-breakdown-5-vs-20-vs-50-clients", "/blogs/ai-voice-agency-economics-real-numbers"),
    ("/blogs/voice-ai-architecture-native-vs-wrapper-vs-developer", "/blogs/voice-ai-wrapper-vs-native-platform"),
    ("/blogs/voice-ai-vs-text-ai-for-customer-service", "/blogs/voice-first-vs-chat-first-platforms"),
    ("/blogs/voice-ai-vs-text-chatbot-comparison", "/blogs/voice-first-vs-chat-first-platforms"),
    ("/blogs/what-is-white-label-ai-chatbot", "/blogs/what-is-white-label-ai-receptionist"),
    ("/blogs/white-label-ai-chatbot-pricing-comparison", "/blogs/voice-ai-white-label-pricing-breakdown-2026"),
    ("/blogs/white-label-ai-chatbot-roi-calculator", "/blogs/voice-ai-agency-roi-model"),
    ("/blogs/white-label-ai-profit-margin-analysis", "/blogs/white-label-ai-profit-margins"),
    ("/blogs/white-label-chatgpt-alternative-for-agencies", "/whitelabel"),
    ("/blogs/white-label-voice-ai-wrappers-vs-native-platforms", "/blogs/voice-ai-wrapper-vs-native-platform"),
    ("/blogs/white-label-vs-custom-ai-chatbot-development", "/blogs/build-on-vapi-retell-vs-buy-white-label"),
]

creds, _ = google.auth.default(scopes=["https://www.googleapis.com/auth/webmasters.readonly"])
svc = build("searchconsole", "v1", credentials=creds, cache_discovery=False)
end   = datetime.date.today() - datetime.timedelta(days=3)   # GSC lag
start = end - datetime.timedelta(days=int(MONTHS * 30.4))

def page_queries(url):
    body = {"startDate": start.isoformat(), "endDate": end.isoformat(),
            "dimensions": ["query"], "rowLimit": TOPN, "dataState": "final",
            "dimensionFilterGroups": [{"filters": [
                {"dimension": "page", "operator": "equals", "expression": url}]}]}
    for a in range(4):
        try:
            rows = svc.searchanalytics().query(siteUrl=PROPERTY, body=body).execute().get("rows", [])
            return {r["keys"][0]: r["impressions"] for r in rows}
        except Exception as e:
            if a == 3:
                print("  ! error on", url, "->", e); return {}
            time.sleep(2 ** a)

cache = {}
def q(path):
    u = path if path.startswith("http") else ROOT + path
    if u not in cache: cache[u] = page_queries(u)
    return cache[u]

print(f"Property: {PROPERTY}  |  {start} to {end}\n")
out = []
for src, tgt in PAIRS:
    sq, tq = q(src), q(tgt)
    ss, ts = set(sq), set(tq)
    inter  = ss & ts
    pct    = (len(inter) / len(ss) * 100) if ss else 0
    verdict = ("SOURCE HAS NO QUERIES - safe to redirect" if not ss else
               "HIGH - merge confirmed"   if pct >= 40 else
               "MEDIUM - review shared"    if pct >= 20 else
               "LOW - keep both (different intent)")
    shared = ", ".join(sorted(inter, key=lambda k: -sq.get(k, 0))[:8])
    out.append([src, tgt, len(ss), len(ts), len(inter), round(pct, 1), verdict, shared])
    print(f"{pct:5.1f}%  {verdict.split(' -')[0]:>7}  {src}  ->  {tgt}")

with open("gsc_overlap_results.csv", "w", newline="") as f:
    w = csv.writer(f)
    w.writerow(["Source", "Target", "Src queries", "Tgt queries", "Shared",
                "% of source shared", "Verdict", "Top shared queries"])
    w.writerows(out)
print("\nSaved gsc_overlap_results.csv  ->  cloudshell download gsc_overlap_results.csv")
