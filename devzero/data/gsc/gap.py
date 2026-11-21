import json,glob,re,collections,csv,sys
D='/home/user/Test-1/devzero/data/raw2'
K={}
for f in glob.glob(D+'/gap_ranked_lowkd_*.json'):
    dom=f.split('gap_ranked_lowkd_')[1][:-5]
    for it in json.load(open(f))['tasks'][0]['result'][0]['items'] or []:
        kd=it['keyword_data']; k=kd['keyword']; s=it['ranked_serp_element']['serp_item']
        e=K.setdefault(k,dict(keyword=k,vol=kd['keyword_info'].get('search_volume') or 0,kd=(kd.get('keyword_properties') or {}).get('keyword_difficulty'),cpc=kd['keyword_info'].get('cpc'),intent=(kd.get('search_intent_info') or {}).get('main_intent'),comps={}))
        e['comps'][dom]=min(e['comps'].get(dom,999),s['rank_group'])
        e.setdefault('urls',{})[dom]=s.get('relative_url')
# buckets
B=[('alternatives / vs',r'alternativ|\bvs\.?\b|versus|compar|competitor'),
   ('gateway / router / proxy',r'gateway|router|routing|proxy|load balanc|fallback|failover|unified api|one api|multi.?model|byok|bring your own key'),
   ('coding agents (setup, cost, config)',r'claude code|cursor|codex|copilot|cline|roo code|kilo code|windsurf|opencode|aider|continue\.dev|gemini cli|openwebui|open webui|librechat|n8n'),
   ('cost / pricing / tokens',r'pric|cost|token|billing|spend|budget|calculator|rate limit|cheap|free (api|tier|model)'),
   ('observability / governance / guardrails',r'observab|monitor|logging|trac(e|ing)|eval|guardrail|governance|pii|redact|audit|prompt (management|injection)'),
   ('self-host / open source / deploy',r'self.?host|open.?source|on.?prem|helm|kubernetes|docker|deploy'),
   ('models (name queries)',r'gpt|claude|gemini|llama|deepseek|qwen|mistral|grok|kimi|glm|opus|sonnet|haiku|gemma|o\d\b|minimax')]
def bucket(k):
    for n,rx in B:
        if re.search(rx,k): return n
    return None
rows=[]
for e in K.values():
    b=bucket(e['keyword'])
    if not b: continue
    e['bucket']=b; e['n_comp']=len(e['comps']); e['best_pos']=min(e['comps'].values()); rows.append(e)
json.dump(rows,open('/home/user/Test-1/devzero/data/nautili-keyword-gap.json','w'))
with open('/home/user/Test-1/devzero/data/nautili-keyword-gap.csv','w',newline='') as f:
    w=csv.writer(f); w.writerow(['bucket','keyword','us_volume','kd','cpc_usd','intent','competitors_ranking','best_competitor_position','competitor_positions'])
    for e in sorted(rows,key=lambda e:(e['bucket'],-e['vol'])):
        w.writerow([e['bucket'],e['keyword'],e['vol'],e['kd'],e['cpc'],e['intent'],e['n_comp'],e['best_pos'],'; '.join(f'{d}:{p}' for d,p in sorted(e['comps'].items(),key=lambda x:x[1]))])
print('total kw',len(K),'relevant',len(rows))
for b,_ in B:
    rs=sorted([e for e in rows if e['bucket']==b],key=lambda e:-e['vol'])
    print(f'\n=== {b}: {len(rs)} kw, vol {sum(e["vol"] for e in rs)}')
    for e in rs[:int(sys.argv[1]) if len(sys.argv)>1 else 25]:
        print(f"  {e['keyword'][:48]:48} {e['vol']:>6} kd{e['kd']!s:>3} cpc{e['cpc'] or 0:>6.2f} {str(e['intent'])[:5]:5} {', '.join(f'{d.split('.')[0]}#{p}' for d,p in sorted(e['comps'].items(),key=lambda x:x[1]))}")
