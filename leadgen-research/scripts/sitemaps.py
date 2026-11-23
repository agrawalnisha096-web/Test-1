import re,sys,json,urllib.request,collections,gzip
from urllib.parse import urlparse
def get(u):
    req=urllib.request.Request(u,headers={"User-Agent":"Mozilla/5.0"})
    try:
        b=urllib.request.urlopen(req,timeout=30).read()
        if b[:2]==b"\x1f\x8b": b=gzip.decompress(b)
        return b.decode("utf-8","ignore")
    except Exception as e: print("  fail",u,e); return ""
def crawl(root):
    seen=set(); urls=set(); q=[root]
    while q and len(seen)<60:
        s=q.pop(); 
        if s in seen: continue
        seen.add(s); x=get(s)
        locs=re.findall(r"<loc>\s*(.*?)\s*</loc>",x)
        if "<sitemapindex" in x: q+=locs
        else: urls.update(locs)
    return sorted(urls),sorted(seen)
out={}
for d,sm in [("99calls.com","https://99calls.com/sitemap.xml"),("33mileradius.com","https://33mileradius.com/sitemap_index.xml"),
             ("servicedirect.com","https://servicedirect.com/sitemap_index.xml"),("hookagency.com","https://hookagency.com/sitemap_index.xml"),
             ("abstraktmg.com","https://abstraktmg.com/sitemap_index.xml"),("builtrightdigital.com","https://builtrightdigital.com/sitemap_index.xml")]:
    urls,maps=crawl(sm); out[d]=urls
    seg=collections.Counter((urlparse(u).path.strip("/").split("/")[0] or "(home)") for u in urls)
    print(f"\n{d}: {len(urls)} urls, {len(maps)} sitemaps: {[m.rsplit('/',1)[-1] for m in maps][:12]}")
    print("  top sections:",seg.most_common(15))
json.dump(out,open("../data/sitemap_urls.json","w"))
