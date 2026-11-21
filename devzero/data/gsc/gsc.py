import csv,sys,collections,re
D=sys.argv[1]
def rd(n):
    rows=list(csv.reader(open(f'{D}/{n}',encoding='utf-8-sig')))
    out=[]
    for r in rows[1:]:
        d=dict(zip(rows[0],r))
        for k in ('Clicks','Impressions'): d[k]=int(d[k].replace(',',''))
        d['CTR']=float(d['CTR'].rstrip('%')); d['Position']=float(d['Position'])
        out.append(d)
    return rows[0][0],out
_,ch=rd('Chart.csv')
C=sum(r['Clicks'] for r in ch); I=sum(r['Impressions'] for r in ch)
print('days',len(ch),ch[0]['Date'],ch[-1]['Date'],'clicks',C,'impr',I)
m=collections.OrderedDict()
for r in ch:
    k=r['Date'][:7]; a=m.setdefault(k,[0,0,0,0]); a[0]+=r['Clicks']; a[1]+=r['Impressions']; a[2]+=r['Position']*r['Impressions']; a[3]+=1
for k,a in m.items(): print(f'  {k} days {a[3]:2} clicks {a[0]:5} impr {a[1]:8} ctr {a[0]/a[1]*100:.2f}% pos {a[2]/a[1]:.1f}')
for n in ('Devices.csv','Countries.csv','Search appearance.csv'):
    try: h,rs=rd(n)
    except Exception as e: print(n,e); continue
    print('==',n); [print('  ',r[h],r['Clicks'],r['Impressions'],r['CTR'],r['Position']) for r in rs[:12]]
