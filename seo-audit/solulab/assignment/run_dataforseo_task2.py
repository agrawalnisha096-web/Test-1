"""Task 2 runner: test the SoluLab prompt panel on several AI platforms via the DataForSEO API.

Each prompt runs --runs times per platform. Results are reported as rates across runs,
never as one response treated as a stable ranking.

Platforms (DataForSEO endpoints):
  chatgpt     ai_optimization/chat_gpt/llm_scraper/live/advanced   (consumer ChatGPT answer + sources)
  ai_mode     serp/google/ai_mode/live/advanced                    (Google AI Mode answer + references)
  perplexity  ai_optimization/perplexity/llm_responses/live        (Perplexity Sonar + citations)

Auth: env DATAFORSEO_LOGIN and DATAFORSEO_PASSWORD (API credentials from the DataForSEO dashboard).

Usage:
  python run_dataforseo_task2.py --dry-run                     # print payloads, no API calls
  python run_dataforseo_task2.py --runs 3 --out dfs-runs       # full run (5 prompts x 3 platforms x 3)
  python run_dataforseo_task2.py --platforms chatgpt --runs 1  # smoke test

Outputs in --out:
  raw/<platform>_<query>_run<n>.json   full API response (evidence; includes datetime and cost)
  runs.csv                             one row per run (same columns as task2-results-log.csv)
  summary.md                           rates per query x platform, competitors, top cited domains
"""

import argparse
import collections
import csv
import datetime as dt
import json
import os
import pathlib
import re
import sys
import time
import urllib.parse
from concurrent.futures import ThreadPoolExecutor

import requests

API = "https://api.dataforseo.com/v3/"
# Target brand per prompt: optional prompts-CSV columns brand, brand_regex, brand_domain (default SoluLab).
DEFAULT_BRAND = ("SoluLab", r"\bsolu\s?lab\b", "solulab.com")
COMPETITORS = [
    "LeewayHertz", "Debut Infotech", "PixelPlex", "Appinventiv", "Suffescom", "Markovate",
    "Simform", "ScienceSoft", "Itransition", "Intellectsoft", "TechAhead", "MindInventory",
    "OpenXcell", "Space-O", "Antier", "Blockchain App Factory", "Accenture", "Deloitte",
    "IBM", "Infosys", "TCS", "Tata Consultancy", "Wipro", "EPAM", "Cognizant", "Capgemini",
    "PwC", "KPMG", "EY", "McKinsey", "BCG", "Bain", "G42", "Presight", "Master of Code",
    "Azumo", "HatchWorks", "Netguru", "STX Next", "RaftLabs", "Fingent", "BairesDev", "N-iX",
    "Innowise", "Softeq", "Mobiquity", "Neoteric", "Turing", "Toptal", "Glorium",
    "Xebia", "SDAIA", "Mozn", "Elm", "Lean Technologies", "Unifonic", "Quantiphi",
    "Fractal", "LatentView", "Tiger Analytics", "Persistent", "HCLTech", "Tech Mahindra",
    "Globant", "Thoughtworks", "Slalom", "Kanerika", "Vention", "Code Brew", "Hyperlink InfoSystem",
    "Intuz", "Biz4Group", "Matellio", "Rapid Innovation", "Signity", "Webisoft",
]
STOPWORDS = {"and", "the", "for", "with", "to", "before", "how", "what", "of", "a", "an", "on",
             "in", "would", "I", "your", "you", "if", "vs", "is", "are", "by", "from", "when", "why"}
# DataForSEO location codes / ISO codes per market
MARKETS = {
    "US": {"location_code": 2840, "iso": "US"},
    "GCC (UAE)": {"location_code": 2784, "iso": "AE"},
    "GCC (KSA)": {"location_code": 2682, "iso": "SA"},
}


def payload(platform, prompt, market, tag):
    m = MARKETS.get(market, MARKETS["US"])
    if platform == "chatgpt":
        return "ai_optimization/chat_gpt/llm_scraper/live/advanced", [{
            "keyword": prompt, "location_code": m["location_code"], "language_code": "en",
            "force_web_search": True, "tag": tag}]
    if platform == "ai_mode":
        return "serp/google/ai_mode/live/advanced", [{
            "keyword": prompt, "location_code": m["location_code"], "language_code": "en",
            "device": "desktop", "tag": tag}]
    if platform == "perplexity":
        return "ai_optimization/perplexity/llm_responses/live", [{
            "user_prompt": prompt, "model_name": "sonar", "max_output_tokens": 2048,
            "web_search_country_iso_code": m["iso"], "tag": tag}]
    raise ValueError(platform)


def call(session, path, body, retries=3):
    for attempt in range(retries):
        r = session.post(API + path, json=body, timeout=180)
        if r.status_code == 200:
            return r.json()
        if r.status_code in (429, 500, 502, 503, 504):
            time.sleep(5 * (attempt + 1))
            continue
        r.raise_for_status()
    r.raise_for_status()


def walk(obj):
    """Yield every dict nested anywhere in obj."""
    stack = [obj]
    while stack:
        x = stack.pop()
        if isinstance(x, dict):
            yield x
            stack.extend(x.values())
        elif isinstance(x, list):
            stack.extend(x)


def parse(platform, resp):
    task = (resp.get("tasks") or [{}])[0]
    result = (task.get("result") or [{}])[0] or {}
    answer, urls = "", []
    if platform == "chatgpt":
        answer = result.get("markdown") or ""
        urls = [s.get("url") for s in (result.get("sources") or [])]
        for it in result.get("items") or []:
            urls += [s.get("url") for s in (it.get("sources") or [])]
    elif platform == "ai_mode":
        for it in result.get("items") or []:
            if it.get("type") == "ai_overview":
                answer += it.get("markdown") or ""
                for d in walk(it):
                    if d.get("type") in ("ai_overview_reference", "link_element") and d.get("url"):
                        urls.append(d["url"])
    elif platform == "perplexity":
        for it in result.get("items") or []:
            for sec in it.get("sections") or []:
                answer += sec.get("text") or ""
                urls += [a.get("url") for a in (sec.get("annotations") or [])]
    # Inline markdown links: AI Mode puts its citations here, ChatGPT repeats them here.
    urls += re.findall(r"(?<!!)\[[^\]]*\]\((https?://[^)\s]+)\)", answer)  # skip ![image](...) links
    urls = list(dict.fromkeys(clean_url(u) for u in urls if u and "images.openai.com" not in u))
    retrieved = [clean_url(s.get("url")) for s in (result.get("search_results") or []) if s.get("url")]
    return {
        "status": task.get("status_code"), "status_message": task.get("status_message"),
        "cost": task.get("cost"), "datetime": result.get("datetime"),
        "answer": answer, "urls": urls, "retrieved": retrieved, "entities": named_entities(answer),
    }


def clean_url(u):
    """Drop tracking params such as utm_source=chatgpt.com so URLs dedupe."""
    s = urllib.parse.urlsplit(u)
    q = [(k, v) for k, v in urllib.parse.parse_qsl(s.query) if not k.startswith("utm_")]
    return urllib.parse.urlunsplit((s.scheme, s.netloc, s.path, urllib.parse.urlencode(q), ""))


def named_entities(answer):
    """Names an answer recommends: the bold or heading text that opens a numbered or bulleted
    entry ("- **Accenture** - ...", "**1. Accenture**", "### 2. IBM"), plus first cells of tables."""
    names, lines = [], answer.replace("\\", "").splitlines()
    for i, line in enumerate(lines):
        m = (re.match(r"^\s*(?:[-*\u2022]|\d+[.)])\s+\*\*([^*]{2,80}?)\*\*", line)
             or re.match(r"^\s*\*\*\d+[.)]\s*([^*]{2,80}?)\*\*\s*$", line)
             or re.match(r"^\s*#{2,4}\s+\d+[.)]\s*(.{2,80})$", line))
        if not m and line.startswith("|") and i >= 2 and re.match(r"^\|[\s:|-]+\|$", lines[i - 1].strip()) is None \
                and any(re.match(r"^\|[\s:|-]+\|$", lines[j].strip()) for j in range(max(0, i - 40), i)):
            m = re.match(r"^\|\s*\**([^|*]{2,60}?)\**\s*\|", line)
        if m:
            name = re.split(r"\s+[\u2014\u2013(-]\s*|:\s*", m.group(1).strip(" *:"))[0].strip(" *:")
            words = name.split()
            if len(words) > 5 or any(w in STOPWORDS for w in words):
                continue  # section headings, not company names
            if name and name.lower() not in {n.lower() for n in names}:
                names.append(name)
    return names


def brand_positions(answer, brand, brand_re):
    """Order of first appearance of the target brand and competitor brands in the answer."""
    hits = []
    for name in [brand] + [c for c in COMPETITORS if c.lower() != brand.lower()]:
        pat = brand_re if name == brand else re.compile(rf"\b{re.escape(name)}\b", re.I)
        m = pat.search(answer)
        if m:
            hits.append((m.start(), name))
    order = [n for _, n in sorted(hits)]
    pos = order.index(brand) + 1 if brand in order else ""
    return pos, [n for n in order if n != brand]


def domain(u):
    d = urllib.parse.urlsplit(u).netloc.lower()
    return d[4:] if d.startswith("www.") else d


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--prompts", default=str(pathlib.Path(__file__).with_name("task2-prompts.csv")))
    ap.add_argument("--platforms", default="chatgpt,ai_mode,perplexity")
    ap.add_argument("--runs", type=int, default=3)
    ap.add_argument("--out", default="dfs-runs")
    ap.add_argument("--workers", type=int, default=6)
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--reparse", action="store_true", help="rebuild runs.csv/summary.md from saved raw files, no API calls")
    args = ap.parse_args()

    prompts = list(csv.DictReader(open(args.prompts, newline="")))
    platforms = [p.strip() for p in args.platforms.split(",") if p.strip()]
    jobs = [(p, q, n) for q in prompts for p in platforms for n in range(1, args.runs + 1)]

    if args.dry_run:
        for p in platforms:
            for q in prompts:
                print(p, q["query_id"], json.dumps(payload(p, q["exact_prompt"], q["market"], f"{q['query_id']}-{p}-1")))
        print(f"{len(jobs)} calls planned")
        return

    login, pw = os.environ.get("DATAFORSEO_LOGIN"), os.environ.get("DATAFORSEO_PASSWORD")
    if not (login and pw) and not args.reparse:
        sys.exit("Set DATAFORSEO_LOGIN and DATAFORSEO_PASSWORD in the environment.")
    session = requests.Session()
    session.auth = (login, pw)

    out = pathlib.Path(args.out)
    (out / "raw").mkdir(parents=True, exist_ok=True)

    def from_raw(j):
        platform, q, n = j
        f = out / "raw" / f"{platform}_{q['query_id']}_run{n}.json"
        if not f.exists():
            return {"job": j, "error": "no raw file"}
        resp = json.loads(f.read_text())
        parsed = parse(platform, resp)
        stamp = parsed["datetime"] or ""
        try:
            started = dt.datetime.strptime(stamp[:19], "%Y-%m-%d %H:%M:%S")
        except ValueError:
            started = dt.datetime.fromtimestamp(f.stat().st_mtime, dt.timezone.utc)
        return {"job": j, "parsed": parsed, "started": started}

    def job(j):
        platform, q, n = j
        tag = f"{q['query_id']}-{platform}-{n}"
        path, body = payload(platform, q["exact_prompt"], q["market"], tag)
        started = dt.datetime.now(dt.timezone.utc)
        try:
            resp = call(session, path, body)
        except requests.RequestException as e:
            return {"job": j, "error": str(e)[:200], "started": started}
        (out / "raw" / f"{platform}_{q['query_id']}_run{n}.json").write_text(json.dumps(resp, indent=1))
        return {"job": j, "parsed": parse(platform, resp), "started": started}

    if args.reparse:
        results = [from_raw(j) for j in jobs]
    else:
        with ThreadPoolExecutor(args.workers) as ex:
            results = list(ex.map(job, jobs))

    rows, total_cost = [], 0.0
    for r in results:
        platform, q, n = r["job"]
        if "error" in r:
            print(f"ERROR {platform} {q['query_id']} run {n}: {r['error']}")
            continue
        p = r["parsed"]
        total_cost += p["cost"] or 0
        if p["status"] != 20000:
            print(f"TASK ERROR {platform} {q['query_id']} run {n}: {p['status']} {p['status_message']}")
        brand = q.get("brand") or DEFAULT_BRAND[0]
        brand_re = re.compile(q.get("brand_regex") or DEFAULT_BRAND[1], re.I)
        bdom = q.get("brand_domain") or DEFAULT_BRAND[2]
        sl_urls = [u for u in p["urls"] if bdom in domain(u)]
        sl_retrieved = [u for u in p["retrieved"] if bdom in domain(u)]
        pos, comps = brand_positions(p["answer"], brand, brand_re)
        rows.append({
            "query_id": q["query_id"], "platform": platform, "mode": "DataForSEO API",
            "run_no": n, "date_utc": r["started"].date().isoformat(),
            "time_utc": r["started"].strftime("%H:%M"), "tester_location": q["market"],
            "logged_in": "n/a (API)", "exact_prompt": q["exact_prompt"],
            "brand": brand,
            "brand_mentioned": bool(brand_re.search(p["answer"])),
            "brand_recommended": "",  # judge from the saved answer
            "brand_cited": bool(sl_urls), "brand_cited_urls": " | ".join(sl_urls),
            "position_in_list": pos, "competitor_brands": "; ".join(comps),
            "cited_urls": " | ".join(p["urls"]), "facts_about_brand_correct": "",
            "screenshot_file": f"raw/{platform}_{q['query_id']}_run{n}.json",
            "named_entities": "; ".join(p["entities"]),
            "brand_retrieved_not_cited": " | ".join(u for u in sl_retrieved if u not in sl_urls),
            "notes": f"status {p['status']}; answer_chars {len(p['answer'])}; api_datetime {p['datetime']}",
        })

    if not rows:
        sys.exit("No successful runs.")
    with open(out / "runs.csv", "w", newline="") as f:
        w = csv.DictWriter(f, fieldnames=list(rows[0]))
        w.writeheader()
        w.writerows(rows)

    # summary.md
    lines = [f"# AI visibility results (DataForSEO, {rows[0]['date_utc']})", "",
             f"Runs per prompt per platform: {args.runs}. Total API cost: ${total_cost:.3f}.", "",
             "| ID | Platform | Mentioned | Cited | Brand URL(s) cited | Top competitors (runs) | Top cited domains (runs) |",
             "|---|---|---|---|---|---|---|"]
    by = collections.defaultdict(list)
    named = {}
    for row in rows:
        by[(row["query_id"], row["platform"])].append(row)
    for (qid, plat), g in sorted(by.items()):
        k = len(g)
        ment = sum(r["brand_mentioned"] for r in g)
        cit = sum(r["brand_cited"] for r in g)
        sl = sorted({u for r in g for u in r["brand_cited_urls"].split(" | ") if u})
        comp = collections.Counter(c for r in g for c in set(filter(None, r["competitor_brands"].split("; "))))
        doms = collections.Counter(d for r in g for d in {domain(u) for u in r["cited_urls"].split(" | ") if u})
        ents = collections.Counter(e for r in g for e in set(filter(None, r["named_entities"].split("; "))))
        named[(qid, plat)] = ents
        lines.append(f"| {qid} | {plat} | {ment}/{k} | {cit}/{k} | {'<br>'.join(sl) or '-'} | "
                     f"{', '.join(f'{c} ({v})' for c, v in comp.most_common(6)) or '-'} | "
                     f"{', '.join(f'{d} ({v})' for d, v in doms.most_common(6)) or '-'} |")
    lines += ["", "## Names recommended in the answers (runs naming each)", ""]
    for (qid, plat), ents in sorted(named.items()):
        lines.append(f"- **{qid} / {plat}:** " + (", ".join(f"{e} ({v})" for e, v in ents.most_common(12)) or "-"))
    brand_domains = {r["brand_cited_urls"] and domain(r["brand_cited_urls"].split(" | ")[0]) for r in rows} | {DEFAULT_BRAND[2]} | {q.get("brand_domain") for q in prompts if q.get("brand_domain")}
    brand_domains.discard("")
    brand_domains.discard(None)
    third = collections.Counter(d for r in rows for d in {domain(u) for u in r["cited_urls"].split(" | ") if u}
                                if not any(b in d for b in brand_domains))
    lines += ["", "## Third-party domains cited most (all queries, all platforms) - E1 source list", "",
              "| Domain | Runs citing it |", "|---|---|"]
    lines += [f"| {d} | {v} |" for d, v in third.most_common(30)]
    (out / "summary.md").write_text("\n".join(lines) + "\n")
    print("\n".join(lines[:4 + len(by) + 2]))
    print(f"\nSaved {len(rows)} runs to {out}. Cost ${total_cost:.3f}")


if __name__ == "__main__":
    main()
