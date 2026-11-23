
(function(){
 const tabs=[...document.querySelectorAll('section.tab')], links=[...document.querySelectorAll('nav.tabs a')];
 function show(){if(!tabs.length)return;let id=location.hash.slice(1); if(!tabs.some(t=>t.id===id)) id=tabs[0].id;
  tabs.forEach(t=>t.hidden=t.id!==id); links.forEach(a=>a.setAttribute('aria-current',a.getAttribute('href')==='#'+id?'page':'false'));}
 window.addEventListener('hashchange',()=>{show();window.scrollTo(0,0)}); show();
 // Trim: long lists show 3 items, long unfiltered tables show 6 rows, evidence columns start hidden
 (function trim(){
  const btn=(label,fn)=>{const b=document.createElement('button');b.type='button';b.className='more-btn';b.textContent=label;b.addEventListener('click',fn);return b;};
  document.querySelectorAll('ul.clean, ol.steps').forEach(ul=>{
   const items=[...ul.children]; if(items.length<=4) return;
   const extra=items.slice(3); extra.forEach(li=>li.hidden=true);
   const b=btn('Show '+extra.length+' more',()=>{const open=extra[0].hidden; extra.forEach(li=>li.hidden=!open); b.textContent=open?'Show less':'Show '+extra.length+' more';});
   ul.after(b);
  });
  const filtered=new Set([...document.querySelectorAll('[data-filter-for]')].map(g=>g.dataset.filterFor));
  document.querySelectorAll('.tbl > table').forEach(t=>{
   const wrap=t.parentElement, rows=[...t.querySelectorAll('tbody tr')], tools=document.createElement('div'); tools.className='tbl-tools';
   const ev=rows[0]&&rows[0].querySelector('td.ev');
   if(ev){ const idx=[...rows[0].children].indexOf(ev); const th=t.querySelectorAll('thead th')[idx]; if(th) th.classList.add('evcol');
    t.classList.add('hide-ev'); const b=btn('Show evidence',()=>{t.classList.toggle('hide-ev'); b.textContent=t.classList.contains('hide-ev')?'Show evidence':'Hide evidence';}); tools.append(b); }
   if(!filtered.has(t.id) && rows.length>8){ const extra=rows.slice(6); extra.forEach(r=>r.hidden=true);
    const b=btn('Show all '+rows.length+' rows',()=>{const open=extra[0].hidden; extra.forEach(r=>r.hidden=!open); b.textContent=open?'Show fewer rows':'Show all '+rows.length+' rows';}); tools.append(b); }
   if(tools.children.length) wrap.after(tools);
  });
 })();
 // Highlight: bold the lead-in before a colon, and mark key figures in running text (not in tables)
 (function hilite(){
  const NUM=/(\$\s?\d[\d,]*(?:\.\d+)?(?:\s?(?:K|k|M|B|\/mo))?|\d[\d,]*(?:\.\d+)?\s?(?:%|s\b|ms\b|KB\b|hrs?\b|words\b|searches\b|clicks\b|impressions\b|linking sites\b|referring domains\b|posts?\b|pages?\b|tasks?\b|\/100|x\b)|\b\d{1,3}(?:,\d{3})+\b)/g;
  const skip=el=>el.closest('table,code,.mono,.pill,.p,.k,.chip,nav,h1,h2,h3,.stat,.eyebrow,.hl,b,strong,a,.ad,button,.sev,.kind,.facts,.btn');
  document.querySelectorAll('ul.clean > li').forEach(li=>{
   if(li.querySelector(':scope > b:first-child, :scope > strong:first-child')) return;
   const t=li.firstChild; if(!t||t.nodeType!==3) return;
   const i=t.textContent.indexOf(':'); if(i<3||i>70) return;
   const lead=document.createElement('span'); lead.className='lead'; lead.textContent=t.textContent.slice(0,i+1);
   t.textContent=t.textContent.slice(i+1); li.insertBefore(lead,t);
  });
  const roots=document.querySelectorAll('ul.clean li, .card p, .callout li, dd, .sub');
  roots.forEach(r=>{
   const w=document.createTreeWalker(r,NodeFilter.SHOW_TEXT); const nodes=[]; let n;
   while((n=w.nextNode())) if(!skip(n.parentElement)) nodes.push(n);
   nodes.forEach(n=>{ const s=n.textContent; NUM.lastIndex=0; if(!NUM.test(s)) return; NUM.lastIndex=0;
    const f=document.createDocumentFragment(); let last=0, m;
    while((m=NUM.exec(s))){ if(m[0].replace(/[^0-9]/g,'').length<2 && !/[$%]/.test(m[0])) continue;
     f.append(s.slice(last,m.index)); const sp=document.createElement('span'); sp.className='hl'; sp.textContent=m[0]; f.append(sp); last=m.index+m[0].length; }
    f.append(s.slice(last)); n.replaceWith(f); });
  });
 })();

 // Filter groups that target the same table combine (e.g. status AND priority)
 document.querySelectorAll('[data-filter-for]').forEach(group=>{
  const id=group.dataset.filterFor, tbl=document.getElementById(id);
  group.addEventListener('click',e=>{const b=e.target.closest('button'); if(!b) return;
   group.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===b));
   const active=[...document.querySelectorAll('[data-filter-for="'+id+'"]')].map(g=>{
     const p=g.querySelector('button[aria-pressed="true"]'); return [g.dataset.key, p?p.dataset.v:'all'];});
   tbl.querySelectorAll('tbody tr').forEach(r=>r.hidden=!active.every(([k,v])=>v==='all'||r.dataset[k]===v));});
 });
})();
