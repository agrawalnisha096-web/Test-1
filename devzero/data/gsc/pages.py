import csv,sys,collections,re
D=sys.argv[1]; host=sys.argv[2]
def rd(n):
    rows=list(csv.reader(open(f'{D}/{n}',encoding='utf-8-sig'))); out=[]
    for r in rows[1:]:
        d=dict(zip(['k','Clicks','Impressions','CTR','Position'],r))
        d['Clicks']=int(d['Clicks'].replace(',','')); d['Impressions']=int(d['Impressions'].replace(',','')); d['Position']=float(d['Position']); out.append(d)
    return out
P=rd('Pages.csv'); Q=rd('Queries.csv')
print('pages rows',len(P),'clicks in top pages',sum(p['Clicks'] for p in P),'queries rows',len(Q),'clicks',sum(q['Clicks'] for q in Q))
def sec(u):
    p=re.sub(r'https?://[^/]+','',u).split('?')[0]
    parts=p.strip('/').split('/')
    if p in('','/'): return '/'
    if parts[0]=='instances': return '/instances/'+(parts[1] if len(parts)>1 else '')+('/regions' if 'regions' in parts else '/families' if 'families' in parts else '')
    return '/'+parts[0]
S=collections.defaultdict(lambda:[0,0,0])
for p in P:
    a=S[sec(p['k'])]; a[0]+=1; a[1]+=p['Clicks']; a[2]+=p['Impressions']
print('== sections')
for k,a in sorted(S.items(),key=lambda x:-x[1][1])[:20]: print(f'  {k:30} pages {a[0]:4} clicks {a[1]:6} impr {a[2]:8} ctr {a[1]/max(1,a[2])*100:.2f}%')
print('== top pages by clicks')
for p in sorted(P,key=lambda x:-x['Clicks'])[:30]: print(f"  {p['Clicks']:5} {p['Impressions']:7} {p['CTR']:>7} {p['Position']:5.1f} {re.sub('https?://[^/]+','',p['k'])[:80]}")
print('== top pages by impressions')
for p in sorted(P,key=lambda x:-x['Impressions'])[:20]: print(f"  {p['Clicks']:5} {p['Impressions']:7} {p['CTR']:>7} {p['Position']:5.1f} {re.sub('https?://[^/]+','',p['k'])[:80]}")
print('== hosts', collections.Counter(re.match(r'https?://([^/]+)',p['k']).group(1) for p in P))
