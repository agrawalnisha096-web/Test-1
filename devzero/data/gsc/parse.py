import sys,re,json,html as H,collections
from html.parser import HTMLParser
S=sys.argv[1]
class P(HTMLParser):
    def __init__(s):
        super().__init__(); s.title='';s.h1=[];s.desc='';s.canon='';s.links=[];s.ld=[];s._t=None;s._buf='';s.text=[];s.skip=0;s.robots=''
    def handle_starttag(s,t,a):
        a=dict(a)
        if t in('script','style','noscript'):
            s.skip+=1
            if t=='script' and a.get('type')=='application/ld+json': s._t='ld'; s._buf=''
        if t=='title': s._t='title'
        if t=='h1': s._t='h1'; s._buf=''
        if t=='meta' and a.get('name')=='description': s.desc=a.get('content','')
        if t=='meta' and a.get('name')=='robots': s.robots=a.get('content','')
        if t=='link' and a.get('rel')=='canonical': s.canon=a.get('href','')
        if t=='a' and a.get('href'): s.links.append(a['href'])
    def handle_endtag(s,t):
        if t in('script','style','noscript'):
            if s._t=='ld':
                try:
                    d=json.loads(s._buf); d=d if isinstance(d,list) else d.get('@graph',[d]) if isinstance(d,dict) else []
                    s.ld+= [x.get('@type') for x in d if isinstance(x,dict)]
                except Exception: s.ld.append('PARSE_ERR')
                s._t=None
            s.skip-=1
        if t=='h1' and s._t=='h1': s.h1.append(s._buf.strip()); s._t=None
        if t=='title': s._t=None
    def handle_data(s,d):
        if s._t=='ld': s._buf+=d; return
        if s._t=='title': s.title+=d
        if s._t=='h1': s._buf+=d
        if not s.skip: s.text.append(d)
rows=[]
for l in open(f'{S}/index.tsv'):
    u,c,f=l.rstrip('\n').split('\t')
    p=P(); p.feed(open(f,errors='ignore').read())
    host=re.match(r'https://www\.([^/]+)',u).group(1)
    words=len(re.findall(r'\w+',' '.join(p.text)))
    li=set()
    for h in p.links:
        h=h.split('#')[0].split('?')[0]
        if h.startswith('/'): h=f'https://www.{host}'+h
        if re.match(r'https://(www\.)?(devzero\.io|nautili\.ai)',h): li.add(h.replace('://devzero','://www.devzero').replace('://nautili','://www.nautili').rstrip('/') or h)
    rows.append(dict(url=u.rstrip('/'),host=host,title=H.unescape(p.title.strip()),h1=p.h1,desc=p.desc,canon=p.canon,robots=p.robots,words=words,ld=sorted(set(map(str,p.ld))),links=sorted(li)))
json.dump(rows,open(f'{S}/pages.json','w'))
print(len(rows))
