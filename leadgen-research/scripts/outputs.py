import json,csv,collections,statistics
rows=json.load(open("../data/_classified.json"))
S=json.load(open("../data/_serp_summary.json"))
TIER1={"roofing","plumbing","hvac","electrical","painting","landscaping","pest control","moving","house cleaning","commercial cleaning","remodeling","solar","general contractor","junk removal"}
# keyword map
with open("../keyword-map.csv","w",newline="") as f:
    w=csv.writer(f)
    w.writerow(["keyword","monthly_volume_us","keyword_difficulty","cpc_usd","intent","section","trade","cluster","target_page","target","serp_features","serp_top5","competitors_ranking_top20","source"])
    for r in rows:
        s=S.get(r["keyword"],{})
        w.writerow([r["keyword"],r["volume"],r["kd"] if r["kd"] is not None else "",r["cpc"],r["intent"] or "",r["section"],r["trade"],r["cluster"],r["target_page"],
                    "no (navigational brand)" if r["note"] else "yes","|".join(s.get("features",[])),"|".join(s.get("top5",[])),r["competitors_ranking"],r["source"]])
# page map
P=collections.defaultdict(list)
for r in rows:
    if not r["note"]: P[r["target_page"]].append(r)
pages=[]
for p,rs in P.items():
    rs.sort(key=lambda r:-r["volume"]); vol=sum(r["volume"] for r in rs)
    value=sum(r["volume"]*(r["cpc"] or 0) for r in rs)
    kds=[r["kd"] for r in rs if r["kd"] is not None]
    kdw=round(sum((r["kd"] or 0)*r["volume"] for r in rs)/vol) if vol else 0
    sec=rs[0]["section"]; tr=rs[0]["trade"]
    if p.startswith("/learn/"): typ="guide"
    elif p.startswith("/compare/"): typ="comparison"
    elif p.startswith("/tools/"): typ="tool"
    elif p.startswith("/services/"): typ="service"
    elif p.count("/")==3: typ="trade child"
    elif sec=="trade": typ="trade hub"
    else: typ="core"
    pages.append(dict(page=p,type=typ,trade=tr,keywords=len(rs),volume=vol,weighted_kd=kdw,ad_value_usd=round(value),primary_keyword=rs[0]["keyword"],
                      top_keywords="; ".join(r["keyword"] for r in rs[:6])))
# priority
for pg in pages:
    v=pg["ad_value_usd"]
    if pg["type"]=="guide": pg["wave"]=3 if pg["volume"]<300 else 2
    elif pg["type"] in("core",) or pg["page"] in("/services/local-services-ads/","/compare/angi/","/compare/thumbtack/","/pricing/"): pg["wave"]=1
    elif pg["type"]=="trade hub": pg["wave"]=1 if pg["trade"] in TIER1 else (2 if pg["volume"]>=300 else 3)
    elif pg["type"]=="trade child": pg["wave"]=2 if pg["volume"]>=500 else 3
    else: pg["wave"]=2
pages.sort(key=lambda x:(x["wave"],-x["ad_value_usd"]))
with open("../page-map.csv","w",newline="") as f:
    w=csv.DictWriter(f,fieldnames=["wave","page","type","trade","primary_keyword","keywords","volume","weighted_kd","ad_value_usd","top_keywords"]); w.writeheader(); w.writerows(pages)
c=collections.Counter((p["wave"],p["type"]) for p in pages)
print(sorted(c.items()))
for wv in (1,2,3):
    ps=[p for p in pages if p["wave"]==wv]; print("wave",wv,len(ps),"pages vol",sum(p["volume"] for p in ps),"value",sum(p["ad_value_usd"] for p in ps))
for p in pages[:45]: print(p["wave"],p["type"],p["page"],p["volume"],p["weighted_kd"],p["ad_value_usd"],"|",p["primary_keyword"])
# cluster summary
C=collections.defaultdict(lambda:[0,0,0])
for r in rows:
    if r["note"]: continue
    m=r["cluster"].rsplit("-",1)[-1] if r["section"] in("trade","core") else r["cluster"]
    key=(r["section"],m); C[key][0]+=1; C[key][1]+=r["volume"]; C[key][2]+=r["volume"]*(r["cpc"] or 0)
print()
for k,v in sorted(C.items(),key=lambda x:-x[1][1]): print(k,v[0],v[1],round(v[2]))
