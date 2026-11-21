import csv,sys,collections,re
D=sys.argv[1]; brand=re.compile(sys.argv[2])
Q=[]
for r in list(csv.reader(open(f'{D}/Queries.csv',encoding='utf-8-sig')))[1:]:
    Q.append(dict(q=r[0],c=int(r[1].replace(',','')),i=int(r[2].replace(',','')),p=float(r[4])))
b=[q for q in Q if brand.search(q['q'])]; nb=[q for q in Q if not brand.search(q['q'])]
print('brand',len(b),sum(q['c'] for q in b),sum(q['i'] for q in b),' nonbrand',len(nb),sum(q['c'] for q in nb),sum(q['i'] for q in nb))
topics={'CDE / dev tools (legacy)':r'docker desktop|nix|minikube|kind|k3s|codespace|gitpod|vs ?code|ngrok|backstage|devcontainer|dockerfile|microservice|dora|developer productivity|remote dev|cloud dev|wireguard|docker build|github actions|cde\b',
 'Instances & regions':r'\b[a-z]\d[a-z]*[ .-]?(\d*x?large|medium|small|micro|nano|metal)\b|\b(ec2|instance|east-?1|west-?\d|region|vcpu|n2-|e2-|c3-|standard_|tpu|vm size)',
 'GPU':r'gpu|h100|h200|a100|l40|b200|b300|l4\b|t4\b|cuda|nvidia|mig\b',
 'Cloud pricing (EKS/GKE/AKS/S3/cloud compare)':r'pric|cost|calculator|cheap|aws vs|azure vs|gcp vs|vs azure|vs aws|vs gcp|billing',
 'K8s autoscaling & resources':r'karpenter|hpa|vpa|autoscal|keda|request|limit|kubernetes|k8s|criu|checkpoint|pod',
 'Competitors':r'cast ?ai|kubecost|scaleops|perfectscale|sedai|zesty|komodor|stormforge|densify|spot ocean|opencost'}
agg=collections.OrderedDict((k,[0,0,0]) for k in list(topics)+['other'])
for q in nb:
    for k,rx in topics.items():
        if re.search(rx,q['q']): break
    else: k='other'
    a=agg[k]; a[0]+=1; a[1]+=q['c']; a[2]+=q['i']
print('== non-brand topics (top-1000 queries)')
for k,a in agg.items(): print(f'  {k:45} q {a[0]:4} clicks {a[1]:5} impr {a[2]:8} ctr {a[1]/max(1,a[2])*100:.2f}%')
print('== top non-brand by clicks')
for q in sorted(nb,key=lambda x:-x['c'])[:30]: print(f"  {q['c']:4} {q['i']:6} {q['p']:5.1f} {q['q']}")
print('== top non-brand by impressions')
for q in sorted(nb,key=lambda x:-x['i'])[:30]: print(f"  {q['c']:4} {q['i']:6} {q['p']:5.1f} {q['q']}")
print('== striking distance: pos 4-15, impr>=3000, ctr<1%')
sd=[q for q in nb if 4<=q['p']<=15 and q['i']>=3000 and q['c']/q['i']<0.01]
print(len(sd),'queries impr',sum(q['i'] for q in sd))
for q in sorted(sd,key=lambda x:-x['i'])[:30]: print(f"  {q['c']:4} {q['i']:6} {q['p']:5.1f} {q['q']}")
