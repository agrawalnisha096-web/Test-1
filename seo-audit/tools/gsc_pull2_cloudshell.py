import os, csv, time, datetime, re
import google.auth
from googleapiclient.discovery import build

PROPERTY = os.environ.get("GSC_PROPERTY", "sc-domain:trillet.ai")
ROOT="https://trillet.ai"; MONTHS=16

PAGES = [
    "/blogs/ai-agency-cold-outreach-templates", "/blogs/ai-agency-lead-generation-facebook-ads-warm-network-referrals", "/blogs/ai-agency-vs-traditional-agency-revenue-model-comparison",
    "/blogs/ai-phone-answering-vs-human-receptionist", "/blogs/ai-receptionist-agency-without-employees", "/blogs/ai-receptionist-for-law-firms-white-label",
    "/blogs/ai-receptionist-for-medical-practices-white-label", "/blogs/ai-receptionist-for-therapists-white-label", "/blogs/ai-receptionist-vs-traditional-answering-service-for-agencies",
    "/blogs/ai-receptionist-vs-virtual-receptionist-comparison", "/blogs/ai-receptionist-white-label-pricing", "/blogs/aira-vs-trillet-comparison",
    "/blogs/assistable-ai-alternative", "/blogs/best-voice-ai-for-agencies", "/blogs/best-white-label-ai-chatbot-for-agencies-2026",
    "/blogs/best-white-label-ai-receptionist-for-agencies-2026", "/blogs/chatdash-alternative", "/blogs/cheapest-white-label-voice-ai",
    "/blogs/convocore-vs-trillet-comparison", "/blogs/custom-voice-cloning-for-agencies", "/blogs/echowin-vs-trillet-comparison",
    "/blogs/four-voice-ai-platforms-duke-it-out-for-the-agency-crown", "/blogs/gohighlevel-voice-ai-integration", "/blogs/gohighlevel-voice-ai-options-built-in-vs-trillet-vs-others",
    "/blogs/hipaa-compliant-ai-voice-assistant-white-label", "/blogs/how-agencies-should-price-voice-ai-services", "/blogs/how-to-choose-white-label-ai-chatbot",
    "/blogs/how-to-start-ai-chatbot-agency", "/blogs/insighto-ai-alternative", "/blogs/marlie-vs-trillet-comparison",
    "/blogs/my-ai-front-desk-alternative-2026", "/blogs/my-ai-front-desk-white-label-alternative", "/blogs/nexa-vs-trillet-comparison",
    "/blogs/phonely-vs-trillet-comparison", "/blogs/playai-alternatives-2026", "/blogs/retell-ai-white-label-alternative",
    "/blogs/smith-ai-alternative-2026", "/blogs/stammer-ai-alternative", "/blogs/synthflow-alternative-for-agencies",
    "/blogs/synthflow-vs-trillet-comparison", "/blogs/top-10-white-label-voice-ai-platforms-for-agencies-2026", "/blogs/trillet-vs-dialzara-comparison-2026",
    "/blogs/trillet-vs-goodcall-comparison-2026", "/blogs/trillet-vs-hey-rosie-comparison", "/blogs/trillet-vs-my-ai-front-desk-comparison-2026",
    "/blogs/trillet-vs-retell-vs-vapi-comparison", "/blogs/trillet-vs-ruby-comparison-2026", "/blogs/trillet-vs-smith-ai-comparison-2026",
    "/blogs/upfirst-vs-trillet-comparison", "/blogs/vapi-alternative-for-agencies", "/blogs/vapi-white-label-options-compared",
    "/blogs/voice-agent-for-dental-practices-reseller", "/blogs/voice-agent-for-insurance-agencies", "/blogs/voice-agent-reseller-program-comparison",
    "/blogs/voice-ai-agency-business-model-canvas", "/blogs/voice-ai-agency-referral-program", "/blogs/voice-ai-for-home-services-agencies",
    "/blogs/voice-ai-for-hvac-companies-reseller", "/blogs/voice-ai-for-vacation-rentals-white-label", "/blogs/voice-ai-market-size-and-agency-opportunity-2026",
    "/blogs/voice-ai-use-cases-for-agencies", "/blogs/voice-ai-vs-ivr-comparison", "/blogs/voice-ai-vs-text-chatbot-comparison",
    "/blogs/voice-ai-white-label-pricing-breakdown-2026", "/blogs/voice-first-vs-chat-first-platforms", "/blogs/voiceaiwrapper-alternative",
    "/blogs/voicerr-alternative", "/blogs/voicerr-vs-full-platforms", "/blogs/voicify-alternative",
    "/blogs/what-is-white-label-ai-chatbot", "/blogs/white-label-ai-analytics-dashboard", "/blogs/white-label-ai-chatbot-pricing-comparison",
    "/blogs/white-label-ai-chatbot-roi-calculator", "/blogs/white-label-ai-competitive-positioning", "/blogs/white-label-ai-for-automotive-dealerships",
    "/blogs/white-label-ai-for-debt-collection", "/blogs/white-label-ai-for-plumbers", "/blogs/white-label-ai-onboarding-best-practices",
    "/blogs/white-label-ai-profit-margins", "/blogs/white-label-ai-receptionist-vs-voice-ai-platform", "/blogs/white-label-ai-scalability-considerations",
    "/blogs/white-label-ai-support-levels", "/blogs/white-label-ai-telephony-requirements", "/blogs/white-label-ai-training-and-documentation",
    "/blogs/white-label-ai-with-built-in-compliance", "/blogs/white-label-chatgpt-alternative-for-agencies", "/blogs/white-label-voice-ai-features-checklist",
    "/blogs/white-label-voice-ai-side-hustle-recurring-revenue", "/blogs/white-label-voice-ai-with-free-trial", "/blogs/white-label-vs-custom-ai-chatbot-development",
    "/partners", "/whitelabel", "/whitelabel/pricing",
]
MONEY = [
    "white label voice ai",
    "white label ai voice agent",
    "white label voice",
    "white label ai platform",
    "white label ai receptionist",
    "ai receptionist white label",
    "white label ai chatbot",
    "white label chatbot",
    "cheapest white label voice ai",
    "white label voice ai pricing",
    "ai voice agent white label",
    "white label ai agent",
    "voice ai for agencies",
    "white label ai for agencies",
    "resell voice ai",
]

creds,_ = google.auth.default(scopes=["https://www.googleapis.com/auth/webmasters.readonly"])
svc = build("searchconsole","v1",credentials=creds,cache_discovery=False)
end   = datetime.date.today()-datetime.timedelta(days=3)
start = end-datetime.timedelta(days=int(MONTHS*30.4))

def qy(body):
    for a in range(4):
        try: return svc.searchanalytics().query(siteUrl=PROPERTY, body=body).execute().get("rows",[])
        except Exception as e:
            if a==3: print("  ! error:",e); return []
            time.sleep(2**a)

def bucket(q):
    q=q.lower()
    if "chatbot" in q or "chat bot" in q or "chatgpt" in q: return "chatbot"
    if "trillet" in q: return "brand"
    if re.search(r"voice|receptionist|ai agent|ai voice|ai phone|phone|call|answering|white.?label|whitelabel|agenc|reseller|resell|ivr|appointment|booking|oem", q): return "convertible"
    return "other"

# ---- Part 1: Tier-A page -> queries ----
det=open("tierA_page_queries.csv","w",newline=""); dw=csv.writer(det)
dw.writerow(["page","query","impressions","clicks","position","bucket"])
summ=open("tierA_summary.csv","w",newline=""); sw=csv.writer(summ)
sw.writerow(["page","total_impr","%convertible","%chatbot","%brand","%other","top_query"])
print("Part 1: Tier-A page queries (%d pages)"%len(PAGES))
for p in PAGES:
    url=ROOT+p
    rows=qy({"startDate":start.isoformat(),"endDate":end.isoformat(),"dimensions":["query"],"rowLimit":60,"dataState":"final",
             "dimensionFilterGroups":[{"filters":[{"dimension":"page","operator":"equals","expression":url}]}]})
    agg={"convertible":0.0,"chatbot":0.0,"brand":0.0,"other":0.0}; tot=0.0; top=("",0)
    for r in rows:
        q=r["keys"][0]; imp=r["impressions"]; b=bucket(q); agg[b]+=imp; tot+=imp
        if imp>top[1]: top=(q,imp)
        dw.writerow([p,q,int(imp),int(r.get("clicks",0)),round(r.get("position",0),1),b])
    pc=lambda k:(round(agg[k]/tot*100,1) if tot else 0)
    sw.writerow([p,int(tot),pc("convertible"),pc("chatbot"),pc("brand"),pc("other"),top[0]])
    print("  %-60s tot=%6d  conv=%4s%%  chat=%4s%%"%(p[:60],int(tot),pc("convertible"),pc("chatbot")))
det.close(); summ.close()

# ---- Part 2: money term -> pages ----
mt=open("money_term_pages.csv","w",newline=""); mw=csv.writer(mt)
mw.writerow(["query","rank_in_list","page","impressions","clicks","position"])
print("\nPart 2: money terms -> which pages rank (%d terms)"%len(MONEY))
for term in MONEY:
    rows=qy({"startDate":start.isoformat(),"endDate":end.isoformat(),"dimensions":["page"],"rowLimit":25,"dataState":"final",
             "dimensionFilterGroups":[{"filters":[{"dimension":"query","operator":"equals","expression":term}]}]})
    if not rows: print("  %-32s (no data)"%term); mw.writerow([term,"","(none)","","",""]); continue
    for i,r in enumerate(rows,1):
        mw.writerow([term,i,r["keys"][0].replace(ROOT,""),int(r["impressions"]),int(r.get("clicks",0)),round(r.get("position",0),1)])
    best=rows[0]
    print("  %-32s -> %s (pos %.1f)"%(term,best["keys"][0].replace(ROOT,""),best.get("position",0)))
mt.close()
print("\nSaved: tierA_page_queries.csv, tierA_summary.csv, money_term_pages.csv")
