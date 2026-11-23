import json,base64,os,urllib.request
auth=base64.b64encode(f"{os.environ['DATAFORSEO_LOGIN']}:{os.environ['DATAFORSEO_PASSWORD']}".encode()).decode()
def get(p):
    r=urllib.request.Request("https://api.dataforseo.com/v3/"+p,headers={"Authorization":"Basic "+auth}); return json.load(urllib.request.urlopen(r,timeout=60))
ids=json.load(open("../data/_serp_ids.json")); out=json.load(open("../data/serp_results.json")); pend=0
done={v.get("_id") for v in out.values()}
for i in ids:
    if i in done: continue
    t=get(f"serp/google/organic/task_get/advanced/{i}")["tasks"][0]
    if t["status_code"]!=20000: pend+=1; continue
    res=t["result"][0]; res["_id"]=i; out[res["keyword"]]=res
json.dump(out,open("../data/serp_results.json","w")); print(len(out),"fetched,",pend,"pending")
