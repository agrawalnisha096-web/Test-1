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
BRAND = re.compile(r"\bsolu\s?lab\b", re.I)
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
    urls = list(dict.fromkeys(u for u in urls if u))
    return {
        "status": task.get("status_code"), "status_message": task.get("status_message"),
        "cost": task.get("cost"), "datetime": result.get("datetime"),
        "answer": answer, "urls": urls,
    }


def brand_positions(answer):
    """Order of first appearance of SoluLab and competitor brands in the answer."""
    hits = []
    for name in ["SoluLab"] + COMPETITORS:
        pat = BRAND if name == "SoluLab" else re.compile(rf"\b{re.escape(name)}\b", re.I)
        m = pat.search(answer)
        if m:
            hits.append((m.start(), name))
    order = [n for _, n in sorted(hits)]
    pos = order.index("SoluLab") + 1 if "SoluLab" in order else ""
    return pos, [n for n in order if n != "SoluLab"]


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
    if not (login and pw):
        sys.exit("Set DATAFORSEO_LOGIN and DATAFORSEO_PASSWORD in the environment.")
    session = requests.Session()
    session.auth = (login, pw)

    out = pathlib.Path(args.out)
    (out / "raw").mkdir(parents=True, exist_ok=True)

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
        sl_urls = [u for u in p["urls"] if "solulab.com" in domain(u)]
        pos, comps = brand_positions(p["answer"])
        rows.append({
            "query_id": q["query_id"], "platform": platform, "mode": "DataForSEO API",
            "run_no": n, "date_utc": r["started"].date().isoformat(),
            "time_utc": r["started"].strftime("%H:%M"), "tester_location": q["market"],
            "logged_in": "n/a (API)", "exact_prompt": q["exact_prompt"],
            "solulab_mentioned": bool(BRAND.search(p["answer"])),
            "solulab_recommended": "",  # judge from the saved answer
            "solulab_cited": bool(sl_urls), "solulab_cited_urls": " | ".join(sl_urls),
            "position_in_list": pos, "competitor_brands": "; ".join(comps),
            "cited_urls": " | ".join(p["urls"]), "facts_about_solulab_correct": "",
            "screenshot_file": f"raw/{platform}_{q['query_id']}_run{n}.json",
            "notes": f"status {p['status']}; answer_chars {len(p['answer'])}; api_datetime {p['datetime']}",
        })

    if not rows:
        sys.exit("No successful runs.")
    with open(out / "runs.csv", "w", newline="") as f:
        w = csv.DictWriter(f, fieldnames=list(rows[0]))
        w.writeheader()
        w.writerows(rows)

    # summary.md
    lines = [f"# Task 2 results (DataForSEO, {rows[0]['date_utc']})", "",
             f"Runs per prompt per platform: {args.runs}. Total API cost: ${total_cost:.3f}.", "",
             "| ID | Platform | Mentioned | Cited | SoluLab URL(s) cited | Top competitors (runs) | Top cited domains (runs) |",
             "|---|---|---|---|---|---|---|"]
    by = collections.defaultdict(list)
    for row in rows:
        by[(row["query_id"], row["platform"])].append(row)
    for (qid, plat), g in sorted(by.items()):
        k = len(g)
        ment = sum(r["solulab_mentioned"] for r in g)
        cit = sum(r["solulab_cited"] for r in g)
        sl = sorted({u for r in g for u in r["solulab_cited_urls"].split(" | ") if u})
        comp = collections.Counter(c for r in g for c in set(filter(None, r["competitor_brands"].split("; "))))
        doms = collections.Counter(d for r in g for d in {domain(u) for u in r["cited_urls"].split(" | ") if u})
        lines.append(f"| {qid} | {plat} | {ment}/{k} | {cit}/{k} | {'<br>'.join(sl) or '-'} | "
                     f"{', '.join(f'{c} ({v})' for c, v in comp.most_common(6)) or '-'} | "
                     f"{', '.join(f'{d} ({v})' for d, v in doms.most_common(6)) or '-'} |")
    third = collections.Counter(d for r in rows for d in {domain(u) for u in r["cited_urls"].split(" | ") if u}
                                if "solulab.com" not in d)
    lines += ["", "## Third-party domains cited most (all queries, all platforms) - E1 source list", "",
              "| Domain | Runs citing it |", "|---|---|"]
    lines += [f"| {d} | {v} |" for d, v in third.most_common(30)]
    (out / "summary.md").write_text("\n".join(lines) + "\n")
    print("\n".join(lines[:4 + len(by) + 2]))
    print(f"\nSaved {len(rows)} runs to {out}. Cost ${total_cost:.3f}")


if __name__ == "__main__":
    main()
