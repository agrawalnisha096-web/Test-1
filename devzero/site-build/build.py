"""Build the DevZero & Nautili plan site (static) and the two roadmap workbooks.

Usage: python3 build.py            -> writes ../../seo-plan-site/
Non-SEO sections (Google Ads tabs, competitor ads, Cast AI / ScaleOps teardowns,
scoreboard) are copied unchanged from the colleague's site in ./colleague.
SEO / GEO sections are rebuilt from seed/seed.json + merges.py.
"""
import copy, html, json, os, re, shutil
import openpyxl
import merges

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.abspath(os.path.join(HERE, '..', '..', 'seo-plan-site'))
COL = os.path.join(HERE, 'colleague')
SEED = json.load(open(os.path.join(HERE, 'seed', 'seed.json')))
E = lambda s: html.escape(str(s), quote=True)
fmt = lambda n: f'{int(round(n)):,}'
SITES = {'nautili': 'Nautili', 'devzero': 'DevZero'}
XLSX = {'nautili': 'Nautili-SEO-GEO-Roadmap.xlsx', 'devzero': 'DevZero-SEO-GEO-Roadmap.xlsx'}


def part(name):
    h = open(os.path.join(COL, name), encoding='utf-8').read()
    # tabs marked hidden were still displayed (display:grid overrides [hidden])
    return h.replace('section.tab{display:grid;gap:20px}', 'section.tab{display:grid;gap:20px}section.tab[hidden]{display:none}')


# ------------------------------------------------------------------ data
def polish(x):
    if not isinstance(x, str):
        return x
    for a, b in merges.POLISH:
        x = re.sub(a, b, x, flags=re.M)
    return x


def build_data():
    data = {}
    for site in SITES:
        tasks = [dict(t) for t in SEED[site]['tasks']]
        for t in tasks:
            t.update(merges.TASK_EDITS[site].get(t['n'], {}))
        n = max(t['n'] for t in tasks)
        for t in merges.NEW_TASKS[site]:
            n += 1
            tasks.append(dict(t, n=n))
        content = [dict(c) for c in SEED[site]['content']]
        for c in merges.NEW_CONTENT[site]:
            content.append(dict(c, n=len(content) + 1))
        for c in content:
            c['n'] = int(c['n'])
            c.update(merges.CONTENT_EDITS[site].get(c['n'], {}))
        for row in tasks + content:
            for k, v in list(row.items()):
                row[k] = polish(v)
        kws = SEED[site]['keywords']
        intent = merges.INTENT[site]
        missing = [k for k in intent if k not in {x['keyword'] for x in kws}]
        if missing:
            print(f'  note: intent entries not in {site} keyword list: {missing}')
        intent = {k: polish(v) for k, v in intent.items()}
        data[site] = dict(tasks=tasks, content=content, keywords=kws, intent=intent)
    return data


def counts(tasks):
    c = {s: sum(t['status'] == s for t in tasks) for s in ('Done', 'Partial', 'Pending', 'Blocked')}
    c['total'] = len(tasks)
    c['p0_open'] = sum(t['priority'] == 'P0' and t['status'] != 'Done' for t in tasks)
    c['hours_left'] = sum(float(t['hours'] or 0) for t in tasks if t['status'] != 'Done')
    return c


# ------------------------------------------------------------------ html pieces
def task_row(t):
    return (f'<tr data-s="{E(t["status"])}" data-p="{E(t["priority"])}"><td class="num">{t["n"]}</td>'
            f'<td><span class="pill s-{E(t["status"])}">{E(t["status"])}</span></td>'
            f'<td><span class="p p-{E(t["priority"])}">{E(t["priority"])}</span></td>'
            f'<td class="task">{E(t["task"])}<div class="muted" style="font-weight:400;font-size:13px;margin-top:3px">{E(t["why"])}</div></td>'
            f'<td>{E(t["impact"])}</td><td class="num">{E(t["effort"])}</td><td>{E(t["owner"])}</td><td>{E(t["when"])}</td>'
            f'<td>{E(t["area"])}</td><td class="ev">{E(t["verified"] or "")}</td></tr>')


def content_row(c, intent=None):
    vol = c.get('volume')
    v = fmt(vol) if isinstance(vol, (int, float)) and vol else '<span class="muted">—</span>'
    return (f'<tr><td class="num">{c["n"]}</td><td class="task">{E(c["title"])}</td><td class="mono">{E(c["keyword"])}</td>'
            f'<td class="num">{v}</td><td>{E(c["type"])}</td><td><span class="p p-{E(c["priority"])}">{E(c["priority"])}</span></td>'
            f'<td><span class="pill s-{E(c["status"])}">{E(c["status"])}</span></td><td class="muted">{E((intent or {}).get(c["keyword"], "—"))}</td><td class="ev">{E(c.get("note") or "")}</td></tr>')


def replace_tbody(h, table_marker, rows_html):
    i = h.index(table_marker)
    a = h.index('<tbody>', i) + len('<tbody>')
    b = h.index('</tbody>', a)
    return h[:a] + rows_html + h[b:]


def seo_tab(site, d):
    h = part(f'plan__{site}-seo.html')
    t = d['tasks']; c = counts(t)
    # stat cards
    h = re.sub(r'(<span class="k">Tasks</span><b>)\d+(</b><span>)[^<]*', rf'\g<1>{c["total"]}\g<2>from the audits, the SEO deep dive and Search Console', h)
    h = re.sub(r'(<span class="k">Done</span><b style="color:var\(--ok\)">)\d+(</b><span>)\d+', rf'\g<1>{c["Done"]}\g<2>{c["Partial"]}', h)
    h = re.sub(r'(<span class="k">Pending</span><b>)\d+(</b><span>)\d+', rf'\g<1>{c["Pending"]}\g<2>{c["p0_open"]}', h)
    h = re.sub(r'(<span class="k">Effort left</span><b>)[\d,]+ h', rf'\g<1>{fmt(c["hours_left"])} h', h)
    # progress bar + legend
    tot = c['total']
    pct = lambda x: f'{100 * x / tot:.1f}%'
    h = re.sub(r'<div class="bar">.*?</div>',
               f'<div class="bar"><i style="width:{pct(c["Done"])};background:var(--ok)"></i><i style="width:{pct(c["Partial"])};background:var(--warn)"></i><i style="width:{pct(c["Pending"])};background:var(--idle-bg)"></i></div>', h, count=1, flags=re.S)
    h = re.sub(r'Done \d+</span>', f'Done {c["Done"]}</span>', h, count=1)
    h = re.sub(r'Partial \d+</span>', f'Partial {c["Partial"]}</span>', h, count=1)
    h = re.sub(r'Pending \d+</span></div></div>', f'Pending {c["Pending"]}</span></div></div>', h, count=1)
    # what changed: extra bullets
    extra = ''.join(f'<li>{E(x)}</li>' for x in merges.WHAT_CHANGED_EXTRA[site])
    h = h.replace("</ul></div>\n<div class=\"card\"><h3>How to read the task list</h3>", extra + "</ul></div>\n<div class=\"card\"><h3>How to read the task list</h3>", 1)
    h = h.replace('The same list is in the Excel roadmap, where the status column can be edited', 'The same list is in the roadmap workbook (download on the home page), where the status column can be edited')
    # targets
    trs = ''.join(f'<tr><td><b>{E(a)}</b></td><td class="num">{E(b)}</td><td class="num">{E(c3)}</td><td class="num">{E(c12)}</td></tr>' for a, b, c3, c12 in merges.TARGETS[site])
    tgt = ('<div style="display:grid;gap:10px"><h3 style="margin:0">Targets</h3><div class="tbl"><table><thead><tr><th>Measure</th><th class="num">Now</th><th class="num">Month 3</th><th class="num">Month 12</th></tr></thead><tbody>'
           + trs + '</tbody></table></div></div>\n')
    h = h.replace('<div style="display:grid;gap:10px"><div class="row"><h3 style="margin:0">All tasks</h3>', tgt + '<div style="display:grid;gap:10px"><div class="row"><h3 style="margin:0">All tasks</h3>', 1)
    # filter buttons
    h = re.sub(r'data-v="Done" aria-pressed="false">Done · \d+', f'data-v="Done" aria-pressed="false">Done · {c["Done"]}', h)
    h = re.sub(r'data-v="Partial" aria-pressed="false">Partial · \d+', f'data-v="Partial" aria-pressed="false">Partial · {c["Partial"]}', h)
    h = re.sub(r'data-v="Pending" aria-pressed="false">Pending · \d+', f'data-v="Pending" aria-pressed="false">Pending · {c["Pending"]}', h)
    # task table
    h = replace_tbody(h, f'<table id="{site}-seo-tasks">', ''.join(task_row(x) for x in t))
    # extra Search Console findings (table whose header starts with Finding)
    extra_rows = ''.join(f'<tr><td><b>{E(a)}</b></td><td>{E(b)}</td><td>{E(x)}</td></tr>' for a, b, x in merges.GSC_FINDINGS_EXTRA[site])
    if extra_rows:
        i = h.index('<th>Finding</th><th>Data</th><th>Action</th>')
        b = h.index('</tbody>', i)
        h = h[:b] + extra_rows + h[b:]
    if site == 'devzero':
        h = h.replace('<h3 style="margin:0">Search Console, last 3 months</h3>',
                      '<h3 style="margin:0">Search Console, last 3 months</h3><p class="muted" style="margin:0;font-size:13px">The last five findings come from the 12-month export (19 Nov 2025 – 18 Nov 2026): 20,453 clicks, 6.06M impressions.</p>', 1)
    # content plan
    cp = d['content']; live = sum(x['status'] == 'Done' for x in cp)
    h = re.sub(r'First \d+ content pieces · \d+ live', f'First {len(cp)} content pieces · {live} live', h)
    i = h.index(f'content pieces · {live} live')
    a = h.index('<tbody>', i) + len('<tbody>'); b = h.index('</tbody>', a)
    h = h[:a] + ''.join(content_row(x, d['intent']) for x in cp) + h[b:]
    k = h.rfind('<thead>', 0, a)
    h = h[:k] + h[k:a].replace('<th>Status</th><th>Existing URL / note</th>', '<th>Status</th><th>Intent check</th><th>Existing URL / note</th>', 1) + h[a:]
    return h


def keyword_tab(site, d):
    h = part(f'plan__{site}-keywords.html')
    intent = d['intent']

    def add_col(tbl):
        tbl = tbl.replace('</tr></thead>', '<th>Intent check (Google today)</th></tr></thead>', 1)

        def row(m):
            cells = re.findall(r'<td[^>]*>(.*?)</td>', m.group(2), re.S)
            kw = html.unescape(re.sub('<[^>]+>', '', cells[1])).strip() if len(cells) > 1 else ''
            v = intent.get(kw)
            cell = f'<td class="muted">{E(v)}</td>' if v else '<td class="muted">—</td>'
            body = m.group(2)
            ed = merges.KEYWORD_EDITS[site].get(kw)
            if ed:
                tds = re.findall(r'<td[^>]*>.*?</td>', body, re.S)
                for idx, key in ((5, 'plan'), (6, 'now')):
                    if key in ed and idx < len(tds):
                        open_tag = re.match(r'<td[^>]*>', tds[idx]).group(0)
                        tds[idx] = f'{open_tag}{E(ed[key])}</td>'
                body = ''.join(tds)
            return m.group(1) + body + cell + '</tr>'
        return re.sub(r'(<tr[^>]*>)((?:(?!</tr>).)*?<td.*?)</tr>', row, tbl, flags=re.S)

    out, pos = [], 0
    for m in re.finditer(r'<table[^>]*>.*?</table>', h, re.S):
        tbl = m.group(0)
        if '<th>Keyword</th>' in tbl:
            tbl = add_col(tbl)
        out.append(h[pos:m.start()]); out.append(tbl); pos = m.end()
    out.append(h[pos:])
    h = ''.join(out)
    note = ('<p class="muted" style="font-size:13px;margin:0">Intent check: what Google shows for each keyword today '
            '(latest results snapshot, Jul–Nov 2026) and what that means for the target.</p>')
    h = h.replace('</div>\n<div class="grid2">\n<div class="card"><span class="k">Tier 1', note + '</div>\n<div class="grid2">\n<div class="card"><span class="k">Tier 1', 1) if 'Tier 1' in h else h
    return h


def overview_tab(data):
    h = part('plan__overview.html')
    rows = ''
    for site, name in SITES.items():
        c = counts(data[site]['tasks'])
        cls = 'na' if site == 'nautili' else 'dz'
        rows += (f"<tr><td><span class='dot {cls}' style='display:inline-block;width:8px;height:8px;border-radius:50%;margin-right:8px'></span><b>{name}</b></td>"
                 f"<td class='num'>{c['total']}</td><td class='num'>{c['Done']}</td><td class='num'>{c['Partial']}</td><td class='num'>{c['Pending']}</td><td class='num'>{c['p0_open']}</td></tr>")
    a = h.index('<tbody>') + len('<tbody>'); b = h.index('</tbody>', a)
    h = h[:a] + rows + h[b:]
    h = re.sub(r'<div class="card"><h3>Sources</h3>.*?</ul></div>\n?', '', h, flags=re.S)
    return polish(h)


def plan_page(data):
    head = part('plan__head.html')
    body = (part('plan__pre.html') + overview_tab(data) + polish(seo_tab('nautili', data['nautili'])) + polish(keyword_tab('nautili', data['nautili']))
            + part('plan__nautili-ads.html') + polish(seo_tab('devzero', data['devzero'])) + polish(keyword_tab('devzero', data['devzero']))
            + part('plan__devzero-ads.html'))
    return head + body + part('plan__tail.html')


# ------------------------------------------------------------------ competitors
def card(title, items, kicker=None, color=None):
    k = f'<span class="k" style="color:var(--{color})">{E(kicker)}</span>' if kicker else ''
    return f'<div class="card">{k}<h3 style="margin-top:8px">{E(title)}</h3><ul class="clean">' + ''.join(f'<li>{x}</li>' for x in items) + '</ul></div>'


def table(headers, rows):
    th = ''.join(f'<th>{E(x)}</th>' for x in headers)
    tr = ''.join('<tr>' + ''.join(f'<td>{x}</td>' for x in r) + '</tr>' for r in rows)
    return f'<div class="tbl"><table><thead><tr>{th}</tr></thead><tbody>{tr}</tbody></table></div>'


def competitors_page():
    dz_extra = ('<div style="display:grid;gap:10px"><h3 style="margin:0">DevZero: internal links and pages competing with each other</h3>'
                + table(['Topic', 'DevZero URLs competing', 'Evidence', 'Action'], [
                    ['<b>AKS pricing</b>', '/blog/aks-pricing · /blog/azure-kubernetes-service-pricing · /blog/aks-cost-optimization', 'All three in the "aks pricing" results (#8, #31, #45); the weaker page gets 31 internal links, the stronger 11', 'Merge into /blog/aks-pricing and repoint links'],
                    ['<b>EKS / GKE</b>', '/blog/*-pricing · /blog/*-cost-optimization · /solutions/aws-eks, /gcp-gke', 'Two URLs in "eks pricing" (#7, #34); solutions pages titled like the blog posts', 'Pricing = price, blog = how-to, solutions = product'],
                    ['<b>Karpenter</b>', 'karpenter-guide · guides/karpenter-on-eks · /karpenter-optimization · /compare/karpenter', 'Guide #24, EKS guide #50 and #83 for "karpenter"', 'One intent per URL; the guide is the hub'],
                    ['<b>VPA</b>', '/vpa · /compare/vpa', 'Same search, two pages', '301 /vpa to /compare/vpa'],
                ])
                + table(['Finding', 'Detail'], [
                    ['<b>13 product pages with at most one in-content link</b>', '/pod-rightsizing, /vpa, /solutions/*, /product/*, /kubernetes-management… none above 300 impressions in 12 months'],
                    ['<b>26 of 58 posts link to no product page</b>', 'Including both CRIU posts (355 clicks)'],
                    ['<b>14 orphan posts</b>', 'aws-s3-pricing (95k impressions), azure-container-apps-pricing, kubernetes-pricing; the /blog index has no post links in its HTML'],
                    ['<b>Strong guides with 1–2 links</b>', 'KEDA guide (5,620 words), Karpenter on EKS (4,875); "how to reduce your Kubernetes spend" has 40k impressions and 2 links'],
                ]) + '</div>')
    na_extra = ('<div style="display:grid;gap:10px"><h3 style="margin:0">Pages Nautili should build, with rivals as templates</h3>'
                + table(['Page type', 'Rival example', 'Nautili today', 'Build (3 months)'], [
                    ['<b>Comparison</b>', 'Requesty /vs/ (7 pages); LLMGateway /compare (7)', '2 (OpenRouter, Portkey)', '+8'],
                    ['<b>Alternatives</b>', 'Portkey /alternatives for OpenRouter, LiteLLM, Cloudflare; TrueFoundry 300+ posts', '0', '3–4'],
                    ['<b>Integrations</b>', 'Requesty 20 (Cline, Roo Code, Kilo Code, OpenCode, OpenWebUI, n8n, Codex…); Helicone 64', '1 page; Cursor, Codex, Continue set-up already in /docs/gateway/coding-tools; Gemini CLI guide exists', '+10 (4 from existing docs)'],
                    ['<b>Cost calculators</b>', 'Bifrost per-model cost calculator (3,000 URLs); LLMGateway token and Copilot calculators', 'Fee calculator inside /compare/openrouter', 'Claude Code cost calculator, token calculator'],
                    ['<b>Model comparisons</b>', 'Helicone 3,500 pages; LLMGateway /models/compare', '0', 'Top 30 pairs'],
                    ['<b>Glossary / migration</b>', 'LLMGateway glossary and /migration; TrueFoundry 1,185 entries', '0', '20 entries + one migration guide'],
                ])
                + '<h3 style="margin:8px 0 0">Where rivals get their links</h3>'
                + table(['Channel', 'Where', 'Why'], [
                    ['<b>Built-in provider lists</b>', 'Cline, Roo Code, Kilo Code, OpenCode, Continue, OpenWebUI, LibreChat, n8n, Dify, LangChain and Vercel AI SDK community providers; the Claude Code docs "LLM gateway" page', 'How Requesty and OpenRouter reach users; each brings sign-ups and a docs link'],
                    ['<b>Directories and comparison sites</b>', 'Sites linking to 2+ rivals: Toolify, Toolradar, Toolscout, apis.io, Agentic Index, gatewayscore.com, llmpricing.dev, cheapestllmapi.com, selfhost.directory', '293 sites link to two or more of Requesty, LLMGateway, Helicone and Portkey'],
                    ['<b>Marketplaces and registries</b>', 'AWS Marketplace (DevZero is already listed), Artifact Hub (Helm chart), Docker Hub, awesome lists', 'Where self-hosting buyers look'],
                    ['<b>Review sites</b>', 'G2, Capterra/GetApp, TrustRadius, SaaSHub, AlternativeTo, StackShare', 'They rank for "X alternatives" and feed AI shortlists'],
                ]) + '</div>')
    secs = {}
    for i in ['summary', 'scoreboard', 'cast-ai', 'scaleops', 'devzero', 'nautili-rivals', 'ads']:
        secs[i] = part(f'competitors__{i}.html')

    def append(sec, extra):
        k = sec.rindex('</section>')
        return sec[:k] + extra + '\n' + sec[k:]
    secs['devzero'] = polish(append(secs['devzero'], dz_extra))
    secs['nautili-rivals'] = polish(append(secs['nautili-rivals'], na_extra))
    body = part('competitors__pre.html') + ''.join(secs.values())
    return part('competitors__head.html') + body + part('competitors__tail.html')


# ------------------------------------------------------------------ index
def index_page(data):
    h = part('index__head.html') + part('index__main.html') + part('index__tail.html')
    for site, name in SITES.items():
        c = counts(data[site]['tasks'])
        # roadmap card facts
        h = re.sub(rf'(<h3>{name} Roadmap</h3>.*?<div class="facts">).*?(</div>)',
                   rf'\g<1><span><b>{c["total"]}</b> tasks</span><span><b>{c["Done"]}</b> done</span><span><b>{c["Partial"]}</b> partial</span><span><b>{c["p0_open"]}</b> urgent open</span>\g<2>', h, count=1, flags=re.S)
        # urgent table
        rows = ''.join(f"<tr><td class='task'>{E(t['task'])}</td><td class='own'>{E(t['owner'])}</td><td class='own'>{E(t['when'])}</td><td><span class='pill s-{E(t['status'])}'>{E(t['status'])}</span></td></tr>"
                       for t in data[site]['tasks'] if t['priority'] == 'P0' and t['status'] != 'Done')
        m = re.search(rf'{name}: \d+ open</h3>', h)
        h = h[:m.start()] + f'{name}: {c["p0_open"]} open</h3>' + h[m.end():]
        a = h.index('<tbody>', m.start()) + len('<tbody>'); b = h.index('</tbody>', a)
        h = h[:a] + rows + h[b:]
    # sheets -> downloadable workbooks
    for name, f in [('DevZero', XLSX['devzero']), ('Nautili', XLSX['nautili'])]:
        h = re.sub(rf'(<h3>{name} Roadmap</h3>.*?)<a class="btn" href="https://docs\.google\.com[^"]*"[^>]*>Open in Google Sheets &rarr;</a><p class="note">[^<]*</p>',
                   rf'\g<1><a class="btn" href="/downloads/{f}" download>Download the workbook &rarr;</a><p class="note">Excel file. Upload it to Google Drive and open with Google Sheets to share and edit; the Overview totals keep working.</p>', h, count=1, flags=re.S)
    h = h.replace('<span class="kind sheet">Google Sheet</span>', '<span class="kind sheet">Workbook</span>')
    h = h.replace('<b>Track the work in the two Google Sheets.</b>', '<b>Track the work in the two roadmap workbooks.</b>')
    h = h.replace('the sheets are where status changes. If they disagree, the sheet is current.', 'the workbooks are where status changes. If they disagree, the workbook is current.')
    for name in ('devzero', 'nautili'):  # DevZero card comes first on the page
        h = h.replace('<li><b>Content Plan:</b> the first 20 posts and pages, with target keywords</li>', f'<li><b>Content Plan:</b> the first {len(data[name]["content"])} posts and pages, with target keywords</li>', 1)
    # extra findings
    extra = {
        'Nautili': ['Several "new" pages partly exist: Cursor, Codex and Continue set-up is in the docs, the Gemini CLI guide exists, the OpenRouter fee calculator sits inside /compare/openrouter. They become upgrades, not new builds'],
        'DevZero': ['18% of the last 12 months\' clicks (3,623) came from 47 old URLs that now redirect to /blog. Restoring the top 9 protects about 300 clicks a month',
                    'Pricing guides and instance pages are seen millions of times but clicked 0.25% of the time; prices in titles are the fastest traffic win'],
    }
    for name, items in extra.items():
        m = re.search(rf'<span class="k" style="color:var\(--{"na" if name == "Nautili" else "dz"}\)">{name}</span><h3[^>]*>[^<]*</h3><ul class="clean">', h)
        k = h.index('</ul>', m.end())
        h = h[:k] + ''.join(f'\n<li>{E(x)}</li>' for x in items) + h[k:]
    return h


# ------------------------------------------------------------------ workbooks
def write_workbook(site, d, path):
    wb = openpyxl.load_workbook(os.path.join(HERE, 'seed', XLSX[site]))
    ws = wb['Roadmap']
    style_row = [copy.copy(ws.cell(row=5, column=c)._style) for c in range(1, 13)]
    for r in range(5, ws.max_row + 1):
        for c in range(1, 13):
            ws.cell(row=r, column=c).value = None
    keys = ['n', 'area', 'task', 'why', 'priority', 'impact', 'effort', 'hours', 'owner', 'when', 'status', 'verified']
    for i, t in enumerate(d['tasks']):
        for c, k in enumerate(keys, start=1):
            cell = ws.cell(row=5 + i, column=c); cell.value = t[k]; cell._style = copy.copy(style_row[c - 1])
    last = 4 + len(d['tasks'])
    for dv in ws.data_validations.dataValidation:
        dv.sqref = openpyxl.worksheet.cell_range.MultiCellRange(re.sub(r'(\$?[A-Z]+\$?)\d+(?=\s|$)', lambda m: m.group(1) + str(last), str(dv.sqref)))
    cp = wb['Content Plan']
    cstyle = [copy.copy(cp.cell(row=5, column=c)._style) for c in range(1, 9)]
    ckeys = ['n', 'title', 'keyword', 'volume', 'type', 'priority', 'status', 'note']
    for i, c_ in enumerate(d['content']):
        for c, k in enumerate(ckeys, start=1):
            cell = cp.cell(row=5 + i, column=c); cell.value = c_.get(k); cell._style = copy.copy(cstyle[c - 1])
    clast = 4 + len(d['content'])
    ov = wb['Overview']
    for row in ov.iter_rows():
        for cell in row:
            if isinstance(cell.value, str) and cell.value.startswith('='):
                v = re.sub(r"(Roadmap!\$[A-Z]\$5:\$[A-Z]\$)\d+", rf'\g<1>{last}', cell.value)
                v = re.sub(r"('Content Plan'!\$[A-Z]\$5:\$[A-Z]\$)\d+", rf'\g<1>{clast}', v)
                cell.value = v
            elif isinstance(cell.value, str):
                cell.value = cell.value.replace('first 20', f'first {len(d["content"])}')
    t1 = cp.cell(row=1, column=1)
    if isinstance(t1.value, str):
        t1.value = re.sub(r'First \d+', f'First {len(d["content"])}', t1.value)
    if merges.GSC_FINDINGS_EXTRA[site]:
        sc = wb['Search Console']
        r = sc.max_row
        while r > 1 and not any(sc.cell(row=r, column=c).value for c in range(1, 4)):
            r -= 1
        st = [copy.copy(sc.cell(row=r, column=c)._style) for c in range(1, 4)]
        for i, (a, b, x) in enumerate(merges.GSC_FINDINGS_EXTRA[site], start=1):
            for c, v in enumerate([a, b, x], start=1):
                cell = sc.cell(row=r + i, column=c); cell.value = v; cell._style = copy.copy(st[c - 1])
    wb.save(path)


# ------------------------------------------------------------------ main
def main():
    data = build_data()
    if os.path.isdir(OUT):
        shutil.rmtree(OUT)
    os.makedirs(os.path.join(OUT, 'downloads'))
    open(os.path.join(OUT, 'index.html'), 'w', encoding='utf-8').write(index_page(data))
    open(os.path.join(OUT, 'plan.html'), 'w', encoding='utf-8').write(plan_page(data))
    open(os.path.join(OUT, 'competitors.html'), 'w', encoding='utf-8').write(competitors_page())
    json.dump({'cleanUrls': True, 'trailingSlash': False,
               'headers': [{'source': '/(.*)', 'headers': [{'key': 'X-Robots-Tag', 'value': 'noindex, nofollow'}]}]},
              open(os.path.join(OUT, 'vercel.json'), 'w'), indent=2)
    open(os.path.join(OUT, 'robots.txt'), 'w').write('User-agent: *\nDisallow: /\n')
    for site in SITES:
        write_workbook(site, data[site], os.path.join(OUT, 'downloads', XLSX[site]))
    for site in SITES:
        c = counts(data[site]['tasks'])
        print(f'{site}: {c["total"]} tasks, {c["Done"]} done, {c["Partial"]} partial, {c["p0_open"]} P0 open, {fmt(c["hours_left"])} h left; {len(data[site]["content"])} content pieces')
    print('wrote', OUT)


if __name__ == '__main__':
    main()
