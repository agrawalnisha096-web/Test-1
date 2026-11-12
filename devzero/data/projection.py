# 12-month organic traffic projection (monthly visits at month 12).
# Method: addressable US search volume per cluster (DataForSEO, variant-deduped, brand/noise removed)
#   x blended CTR for the average position we think is reachable in 12 months (CTR curve below)
#   + uplift on existing long-tail rankings (DevZero only, from ranked_keywords ETV)
#   then x non-US multiplier (DataForSEO ETV is US-only; dev-tool audiences are global).
import json
CTR={1:.28,2:.15,3:.10,4:.07,5:.05,6:.04,7:.03,8:.025,9:.02,10:.02,15:.01,20:.005}
S={r['cluster']:r for r in json.load(open('cluster-summary.json'))}
def v(c): return S[c]['addressable_us_monthly']
# (cluster, share of addressable volume we expect to rank for, avg position low, avg position target)
P={
 'devzero':{'baseline_us_etv':821,'nonus_mult':(1.5,2.0),'clusters':[
   ('K8s cost optimisation & rightsizing',1.0,8,4),
   ('Autoscaling education (HPA, VPA, Karpenter)',0.6,15,8),
   ('Cloud, instance and GPU pricing',0.4,15,8),   # calculators owned by AWS/Azure/Google; assume only 40% reachable
   ('Competitor vs & alternatives',1.0,6,3)],
   # existing instance-page long tail: 90k US volume, avg pos ~16, ETV 636 -> lift by improving pages
   'longtail':('instance/spot pages long tail',636,1.5,2.5),
   'brand_capture':(8010,0.005,0.01)},  # small share of competitor brand searches via vs/alternatives pages
 'nautili':{'baseline_us_etv':0,'nonus_mult':(1.5,2.0),'clusters':[
   ('LLM gateway, AI gateway, LLM router',0.7,20,9),
   ('OpenRouter, Portkey and LiteLLM alternatives',1.0,9,4),
   ('AI coding cost (Claude Code, Cursor, Codex)',0.5,15,7),
   ('Model API pricing (Claude, GPT, Gemini)',0.5,20,10)],
   'longtail':None,
   'brand_capture':(173610,0.001,0.003)},
}
out={}
for site,p in P.items():
    res={'clusters':[]}; lo=hi=0
    for c,share,plo,phi in p['clusters']:
        a=v(c)*share*CTR[plo]; b=v(c)*share*CTR[phi]
        res['clusters'].append(dict(cluster=c,addressable_us=v(c),share=share,pos_low=plo,pos_target=phi,visits_low=round(a),visits_target=round(b))); lo+=a; hi+=b
    if p['longtail']:
        n,base,ml,mh=p['longtail']; res['longtail']=dict(name=n,current_etv=base,mult_low=ml,mult_target=mh,visits_low=round(base*ml),visits_target=round(base*mh)); lo+=base*ml; hi+=base*mh
    bv,bl,bh=p['brand_capture']; res['brand_capture']=dict(competitor_brand_us=bv,low=round(bv*bl),target=round(bv*bh)); lo+=bv*bl; hi+=bv*bh
    res['us_low']=round(lo); res['us_target']=round(hi)
    ml,mh=p['nonus_mult']; res['all_markets_low']=round(lo*ml); res['all_markets_target']=round(hi*mh)
    res['baseline_us_etv']=p['baseline_us_etv']; res['ctr_curve']=CTR
    out[site]=res
    print(site, json.dumps({k:res[k] for k in ('us_low','us_target','all_markets_low','all_markets_target')}))
    for c in res['clusters']: print('  ',c)
    print('  ',res.get('longtail'),res['brand_capture'])
json.dump(out,open('projection.json','w'),indent=1)
