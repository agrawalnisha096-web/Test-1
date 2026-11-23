import json,re,csv
from grid import grid,TRADES
g=grid()
m=json.load(open("../data/_master.json"))
slug=lambda s:re.sub(r"[^a-z0-9]+","-",s.lower()).strip("-")
# trade detection: longest phrase match
pats=[]
for key,(t,p) in TRADES.items():
    for w in {key,t,p,p.rstrip("s"),t+"er"}: pats.append((w,key))
pats.sort(key=lambda x:-len(x[0]))
def trade_of(k):
    if k in g: return g[k]
    for w,key in pats:
        if re.search(rf"\b{re.escape(w)}",k): return key
    return None
BRANDS={"thumbtack":"thumbtack","angi":"angi","homeadvisor":"homeadvisor","networx":"networx","99 calls":"99-calls","modernize":"modernize","porch":"porch","bark":"bark","yelp":"yelp","nextdoor":"nextdoor"}
BRAND_OK=re.compile(r"review|worth|legit|cost|charge|price|pricing|vs|alternative|leads|for pros|pro\b|professional|scam|good|how does|what is")
BRAND_NOISE=re.compile(r"pushpin|push pin|png|taskrabbit|near me|house clean|handyman|cleaners|\binc\b|homeadvisor homeadvisor|apple")
def classify(r):
    k=r["keyword"]
    for b,bs in BRANDS.items():
        if re.search(rf"\b{b}\b",k):
            if BRAND_NOISE.search(k) or not BRAND_OK.search(k): return None
            if re.search(r"for pros|pro\b|professional",k) and not re.search(r"review|worth|cost|vs|alternative",k): return ("competitor","navigational-brand",f"/compare/{bs}/","skip-navigational")
            return ("competitor","compare",f"/compare/{bs}/","")
    if re.search(r"local services ads|\blsa\b|google guaranteed",k): return ("service","local-services-ads","/services/local-services-ads/","")
    if re.search(r"pay per call|pay-per-call",k): return ("service","pay-per-call","/services/pay-per-call-leads/","")
    if re.search(r"missed call",k): return ("service","missed-call-text-back","/services/missed-call-text-back/","")
    if re.search(r"cost per lead",k): return ("resource","cost-per-lead","/tools/cost-per-lead-calculator/","")
    t=trade_of(k)
    generic = t in (None,"contractor","home services") 
    if re.search(r"website|web design",k): mod="websites"
    elif re.search(r"\bseo\b",k): mod="seo"
    elif re.search(r"google ads|ppc|pay per click",k): mod="google-ads"
    elif re.search(r"marketing|advertis|agency|customers|clients",k): mod="marketing"
    elif re.search(r"lead",k): mod="leads"
    else: return None
    if re.search(r"^how to|^how do|what is|ideas|tips",k): typ="guide"
    else: typ="money"
    if generic:
        base={"contractor":"contractors","home services":"home-services",None:"contractors"}[t]
        page={"leads":"/leads/","seo":"/services/seo/","google-ads":"/services/google-ads/","marketing":"/","websites":"/services/websites/"}[mod]
        if typ=="guide": page=f"/learn/{slug(k)}/"
        return ("core",f"{base}-{mod}",page,"")
    ts=slug(t)
    page={"leads":f"/{ts}/","seo":f"/{ts}/seo/","google-ads":f"/{ts}/","marketing":f"/{ts}/","websites":f"/{ts}/websites/"}[mod]
    if typ=="guide": page=f"/learn/{slug(k)}/"
    return ("trade",f"{t}-{mod}",page,"")
rows=[]
for r in m:
    c=classify(r)
    if not c: continue
    sec,cluster,page,note=c
    rows.append({"keyword":r["keyword"],"volume":r["volume"],"kd":r["kd"],"cpc":r["cpc"],"intent":r["intent"],"section":sec,
                 "trade":trade_of(r["keyword"]) or "","cluster":cluster,"target_page":page,"note":note,
                 "competitors_ranking":"; ".join(f"{d}:{p}" for d,p in sorted(r["ranking"].items(),key=lambda x:x[1])),"source":",".join(r["sources"])})
rows.sort(key=lambda r:(-r["volume"]))
json.dump(rows,open("../data/_classified.json","w"))
print(len(rows),"kw; vol",sum(r["volume"] for r in rows))
import collections
pg=collections.defaultdict(lambda:[0,0,[]])
for r in rows:
    if r["note"]: continue
    p=pg[r["target_page"]]; p[0]+=r["volume"]; p[1]+=1; p[2].append(r["keyword"])
for p,(v,n,ks) in sorted(pg.items(),key=lambda x:-x[1][0])[:70]: print(v,n,p,ks[:4])
print(len(pg),"pages")
