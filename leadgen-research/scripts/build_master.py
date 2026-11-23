import json,glob,re,csv
from grid import grid, TRADES
g=grid()
M={}
def add(it,src,kw=None):
    kd=it.get("keyword_data",it)
    k=kw or kd["keyword"]; ki=kd.get("keyword_info") or {}
    r=M.setdefault(k,{"keyword":k,"volume":ki.get("search_volume") or 0,"cpc":round(ki.get("cpc") or 0,2),
        "kd":(kd.get("keyword_properties") or {}).get("keyword_difficulty"),
        "intent":(kd.get("search_intent_info") or {}).get("main_intent"),"sources":set(),"ranking":{}})
    r["sources"].add(src); return r
for fn in glob.glob("../data/grid_overview_*.json"):
    for it in json.load(open(fn))["tasks"][0]["result"][0]["items"] or []: add(it,"grid")
for fn in glob.glob("../data/sugg_*.json"):
    for it in json.load(open(fn))["tasks"][0]["result"][0]["items"] or []: add(it,"suggest")
for fn in glob.glob("../data/ranked_*.json"):
    dom=fn.split("ranked_")[1][:-5]
    for it in json.load(open(fn))["tasks"][0]["result"][0]["items"] or []:
        r=add(it,"competitor"); s=it["ranked_serp_element"]["serp_item"]; r["ranking"][dom]=s["rank_group"]
trade_words="|".join(sorted({w for k,(t,p) in TRADES.items() for w in (k,t,p.split()[0])},key=len,reverse=True))
REL=re.compile(rf"(lead|marketing|seo|advertis|website|web design|google ads|ppc|local services ads|lsa|pay per call|missed call|answering|receptionist|angi|homeadvisor|thumbtack|networx|99 calls|modernize|porch|bark|yelp|nextdoor|cost per lead|customers|clients|grow)")
TRADE=re.compile(rf"\b({trade_words}|contractor|home service|home improvement)")
BAD=re.compile(r"loan|99 missed|contractor work|electrical lead$|wire|login|log in|phone number|customer service|jobs?\b|salary|careers?|servicio|stock|ecg|ekg|dog|pencil|apple|insurance|mortgage|real estate|lawyer|attorney|legal|dentist|realtor|life\b|meme|sign in|app\b|apps\b|application")
keep=[]
for r in M.values():
    k=r["keyword"]
    if BAD.search(k) and "grid" not in r["sources"]: continue
    if "grid" in r["sources"]: ok=r["volume"]>0 and not re.search(r"electrical lead$",k)
    else: ok=bool(REL.search(k)) and (bool(TRADE.search(k)) or re.search(r"angi|homeadvisor|thumbtack|networx|99 calls|modernize|local services ads|pay per call|missed call|exclusive leads|cost per lead|lead generation services",k)) and not BAD.search(k) and r["volume"]>=20
    if ok: keep.append(r)
json.dump([{**r,"sources":sorted(r["sources"])} for r in keep],open("../data/_master.json","w"))
print(len(M),"->",len(keep),"total vol",sum(r["volume"] for r in keep))
