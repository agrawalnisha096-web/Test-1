# Merge Labs keyword_overview (US) + Google Ads (US, worldwide) into keyword-volumes.csv and print cluster totals.
import json,csv,re
C=json.load(open('keyword-clusters.json'))
lab={i['keyword']:i for i in json.load(open('raw/keyword_overview_us_clusters.json'))['tasks'][0]['result'][0]['items']}
def ads(f): return {i['keyword']:i for i in json.load(open(f))['tasks'][0]['result']}
us=ads('raw/google_ads_volume_us_clusters.json'); ww=ads('raw/google_ads_volume_worldwide_clusters.json')
rows=[]
for site,cl in C.items():
    for c,ks in cl.items():
        for k in ks:
            L=lab.get(k,{}); ki=L.get('keyword_info',{}); kp=L.get('keyword_properties') or {}
            si=L.get('search_intent_info') or {}
            a=us.get(k,{}); w=ww.get(k,{})
            vol_us=ki.get('search_volume') if ki.get('search_volume') is not None else a.get('search_volume')
            rows.append(dict(site=site,cluster=c,keyword=k,volume_us=vol_us or 0,volume_us_google_ads=a.get('search_volume'),volume_worldwide_google_ads=w.get('search_volume'),
              keyword_difficulty=kp.get('keyword_difficulty'),cpc_usd=ki.get('cpc') or a.get('cpc'),competition=ki.get('competition_level') or a.get('competition'),intent=si.get('main_intent'),source='labs' if ki else 'google_ads'))
with open('keyword-volumes.csv','w',newline='') as f:
    w=csv.DictWriter(f,fieldnames=list(rows[0])); w.writeheader(); w.writerows(rows)
summ={}
for r in rows:
    s=summ.setdefault((r['site'],r['cluster']),{'n':0,'us':0,'ww':0,'kd':[],'top':[]})
    s['n']+=1; s['us']+=r['volume_us'] or 0; s['ww']+=r['volume_worldwide_google_ads'] or 0
    if r['keyword_difficulty'] is not None: s['kd'].append((r['keyword_difficulty'],r['volume_us'] or 0))
    s['top'].append((r['volume_us'] or 0,r['keyword'],r['keyword_difficulty']))
out=[]
# --- addressable view: drop noise, separate navigational brand terms, collapse close variants
NOISE={'requesty':'misspelling bucket for "request" (1M worldwide)','densify':'common English verb','stormforge':'ambiguous term (not only the K8s vendor)'}
BRAND={'cast ai','kubecost','opencost','scaleops','perfectscale','sedai','komodor','kubex','devzero','spot ocean','zesty kubernetes',
 'openrouter','portkey','portkey ai','litellm','litellm proxy','helicone','truefoundry','martian router','not diamond','bifrost llm gateway',
 'cloudflare ai gateway','vercel ai gateway','kong ai gateway'}
SYN={'pricing':'price','prices':'price','cost':'price','costs':'price','alternatives':'alternative','k8s':'kubernetes','vs':'','versus':'','how':'','much':'','does':'','what':'','is':''}
def norm(k): return ' '.join(sorted(t for t in (SYN.get(w,w) for w in re.split(r'\W+',k.lower())) if t))
for r in rows:
    r['class']='noise' if r['keyword'] in NOISE else 'brand_navigational' if r['keyword'] in BRAND else 'addressable'
    r['variant_group']=norm(r['keyword'])
with open('keyword-volumes.csv','w',newline='') as f:
    w=csv.DictWriter(f,fieldnames=list(rows[0])); w.writeheader(); w.writerows(rows)
for (site,c),s in summ.items():
    rs=[r for r in rows if r['site']==site and r['cluster']==c]
    grp={}
    for r in rs:
        if r['class']!='addressable': continue
        g=grp.get(r['variant_group'])
        if not g or (r['volume_us'] or 0)>(g['volume_us'] or 0): grp[r['variant_group']]=r
    ad=list(grp.values())
    s['addr_us']=sum(r['volume_us'] or 0 for r in ad); s['addr_ww']=sum(r['volume_worldwide_google_ads'] or 0 for r in ad)
    s['brand_us']=sum(r['volume_us'] or 0 for r in rs if r['class']=='brand_navigational')
    s['addr_kd']=round(sum((r['keyword_difficulty'] or 0)*(r['volume_us'] or 0) for r in ad if r['keyword_difficulty'] is not None)/max(1,sum(r['volume_us'] or 0 for r in ad if r['keyword_difficulty'] is not None)))
    s['top']=[((r['volume_us'] or 0),r['keyword'],r['keyword_difficulty']) for r in ad]
for (site,c),s in summ.items():
    kdw=round(sum(k*v for k,v in s['kd'])/max(1,sum(v for k,v in s['kd']))) if s['kd'] else None
    top=sorted(s['top'],reverse=True)[:6]
    out.append(dict(site=site,cluster=c,keywords=s['n'],raw_us_monthly=s['us'],raw_worldwide_monthly=s['ww'],addressable_us_monthly=s['addr_us'],addressable_worldwide_monthly=s['addr_ww'],brand_navigational_us_monthly=s['brand_us'],addressable_vol_weighted_kd=s['addr_kd'],top=[f'{k} {v} (KD {d})' for v,k,d in top]))
    print(f"{site:8} {c:45} n={s['n']} rawUS={s['us']:>7} addrUS={s['addr_us']:>6} addrWW={s['addr_ww']:>7} brandUS={s['brand_us']:>6} KDw={s['addr_kd']}\n   "+'; '.join(out[-1]['top']))
json.dump(out,open('cluster-summary.json','w'),indent=1)
