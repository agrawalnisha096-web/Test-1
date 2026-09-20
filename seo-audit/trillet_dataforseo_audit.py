#!/usr/bin/env python3
"""
Trillet — DataForSEO SERP + GEO audit, budget-capped to stay under $1.

WHAT IT DOES
  1. SERP pass (cheap): for every keyword, pulls Google organic top results +
     the AI Overview block (read from the same call, so you don't pay twice).
     Flags which ranking domains are "parasite" hosts (Reddit, G2, YouTube...),
     and whether Trillet or a competitor appears.
  2. LLM spot-check (the pricey part, hard-capped): asks a few engines the real
     buyer questions and records whether Trillet is named + which domains get cited.

CLUSTER PRIORITY (as requested): white-label  ->  enterprise  ->  AI answering.
The scarce LLM budget is spent in that order, so white-label is covered first.

SAFETY
  - Reads the REAL `cost` field DataForSEO returns on every response (ground truth).
  - Re-checks your LIVE account balance before each paid LLM call.
  - Stops before spending more than HARD_BUDGET. LLM calls are capped at LLM_CALL_CAP.
  - Run with --dry-run first to preview the plan and estimated cost (spends nothing).

REQUIREMENTS
  - Python 3.8+ only. No pip installs needed (standard library).
  - Set your DataForSEO API credentials (from the dashboard, not the site login):
        export DATAFORSEO_LOGIN="you@example.com"
        export DATAFORSEO_PASSWORD="your_api_password"
  - Run:   python3 trillet_dataforseo_audit.py --dry-run
           python3 trillet_dataforseo_audit.py

NOTE ON ENDPOINT NAMES
  DataForSEO occasionally renames AI-Optimization paths/model ids. If an LLM call
  returns 404 / "not found", open https://docs.dataforseo.com/v3/ai_optimization-overview/
  and correct LLM_ENDPOINT_TMPL / LLM_MODEL below. The SERP + Labs paths are stable.
"""

import os, sys, json, base64, csv, time, argparse, urllib.request, urllib.error
from urllib.parse import urlparse
from datetime import datetime

# ======================= CONFIG =======================
BASE = "https://api.dataforseo.com/v3/"
LOGIN = os.environ.get("DATAFORSEO_LOGIN", "")
PASSWORD = os.environ.get("DATAFORSEO_PASSWORD", "")

# --- Budget guardrails ---
HARD_BUDGET   = 0.90     # never let cumulative real spend exceed this (leaves a margin under $1)
LLM_CALL_CAP  = 20       # max number of LLM Responses calls, total
LLM_COST_EST  = 0.03     # conservative per-LLM-call estimate used for the PRE-call check
BALANCE_FLOOR = 0.15     # stop LLM calls once live account balance drops to this
SERP_COST_EST = 0.002    # live advanced organic, per keyword (real cost read from response)
LABS_COST_EST = 0.02     # per Labs call

# --- Locale ---
LOCATION = "United States"
LANGUAGE = "English"

# --- SERP ---
SERP_ENDPOINT = "serp/google/organic/live/advanced"
SERP_DEPTH = 20

# --- Labs (keyword volumes / competitor overlap). Capped; toggle off if you want max LLM budget ---
RUN_LABS = True
LABS_ENDPOINT = "dataforseo_labs/google/ranked_keywords/live"
LABS_MAX_CALLS = 4
LABS_TARGETS = ["trillet.ai", "retellai.com", "synthflow.ai", "vapi.ai"]
LABS_LIMIT = 25  # rows per target

# --- LLM spot-check ---
# Engines in the order LLM budget is spent. Verify codes against the docs if a call 404s.
ENGINES = ["chat_gpt", "perplexity"]     # options: chat_gpt, gemini, claude, perplexity
WEB_SEARCH = True                        # browsing ON = measures live citations (what your work moves)
LLM_ENDPOINT_TMPL = "ai_optimization/{engine}/llm_responses/live"
LLM_MODEL = {                            # verify valid ids via ai_optimization/{engine}/llm_responses/models
    "chat_gpt":   "gpt-4o",
    "perplexity": "sonar",
    "gemini":     "gemini-2.0-flash",
    "claude":     "claude-3-5-sonnet",
}
LLM_MAX_OUTPUT_TOKENS = 700

# --- Brand / competitor / parasite matching (lowercase) ---
BRAND_TOKENS       = ["trillet"]
BRAND_DOMAINS      = ["trillet.ai"]
COMPETITOR_TOKENS  = ["retell", "vapi", "synthflow", "bland", "playai", "play.ai",
                      "assistable", "air.ai", "thoughtly", "leadlock", "autocalls"]
PARASITE_HOSTS     = ["reddit.com", "g2.com", "capterra.com", "getapp.com", "trustpilot.com",
                      "trustradius.com", "producthunt.com", "youtube.com", "medium.com",
                      "quora.com", "alternativeto.net", "stackshare.io", "fiverr.com",
                      "upwork.com", "cbinsights.com", "substack.com", "linkedin.com"]

# ======================= KEYWORDS + PROMPTS (priority order) =======================
# Each cluster: (label, [SERP keywords], [LLM prompts])
CLUSTERS = [
    ("1 · White-label / agency",
     [
        "best white label ai voice agent platform for agencies",
        "white label voice ai for agencies",
        "white label ai voice agent reseller platform",
        "ai voice agent platform gohighlevel white label",
        "how to start an ai voice agent agency",
        "cheapest white label voice ai",
        "vapi white label alternative for agencies",
        "retell ai white label alternative",
     ],
     [
        "What's the best white-label AI voice agent platform for agencies in 2026?",
        "Which voice AI platform lets an agency resell under its own brand with unlimited sub-accounts?",
        "What's a good Retell AI white-label alternative for resellers?",
        "What voice AI platform should I use to start an AI calling agency?",
     ]),
    ("2 · Enterprise voice automation",
     [
        "enterprise ai voice agent platform",
        "ai voice agent for contact center",
        "ai voice automation customer support",
        "hipaa compliant ai voice agent",
        "ai voice agent that integrates with crm",
        "low latency ai voice agent enterprise",
     ],
     [
        "What's the best enterprise AI voice agent platform that resolves calls end to end?",
        "Which AI voice platforms are HIPAA and TCPA compliant for enterprise use?",
        "What voice AI can act across CRM and business systems during a live call?",
     ]),
    ("3 · AI answering / receptionist",
     [
        "best ai receptionist for small business",
        "ai answering service for small business",
        "24/7 ai phone answering service",
        "ai receptionist for hvac",
        "ai receptionist for dental office",
        "affordable ai receptionist under 100",
     ],
     [
        "What's the best AI receptionist for a small business?",
        "Best AI answering service for a business that keeps missing calls?",
        "What AI phone agent can book appointments 24/7?",
     ]),
]

# ======================= HTTP + COST TRACKING =======================
class Stop(Exception):
    pass

class Ledger:
    def __init__(self):
        self.spent = 0.0
        self.llm_calls = 0
        self.rows = []  # (ts, endpoint, detail, cost, running_total)
    def add(self, endpoint, detail, cost):
        self.spent += cost
        self.rows.append((datetime.utcnow().isoformat(timespec="seconds"), endpoint, detail, round(cost, 5), round(self.spent, 5)))
    def would_exceed(self, next_est):
        return (self.spent + next_est) > HARD_BUDGET

LEDGER = Ledger()

def _auth_header():
    if not LOGIN or not PASSWORD:
        print("ERROR: set DATAFORSEO_LOGIN and DATAFORSEO_PASSWORD environment variables.", file=sys.stderr)
        sys.exit(2)
    tok = base64.b64encode(f"{LOGIN}:{PASSWORD}".encode()).decode()
    return "Basic " + tok

def api(endpoint, payload=None, method="POST"):
    """Call DataForSEO. Returns parsed JSON. Raises urllib errors on transport failure."""
    url = BASE + endpoint
    data = json.dumps(payload).encode() if payload is not None else None
    req = urllib.request.Request(url, data=data, method=method)
    req.add_header("Authorization", _auth_header())
    req.add_header("Content-Type", "application/json")
    for attempt in range(3):
        try:
            with urllib.request.urlopen(req, timeout=120) as r:
                return json.loads(r.read().decode())
        except urllib.error.HTTPError as e:
            body = e.read().decode(errors="ignore")
            if e.code in (429, 500, 502, 503) and attempt < 2:
                time.sleep(2 * (attempt + 1)); continue
            raise RuntimeError(f"HTTP {e.code} on {endpoint}: {body[:300]}")
        except urllib.error.URLError as e:
            if attempt < 2:
                time.sleep(2 * (attempt + 1)); continue
            raise RuntimeError(f"Network error on {endpoint}: {e}")

def response_cost(resp):
    """DataForSEO returns the actual charge in the top-level `cost` field."""
    try:
        return float(resp.get("cost", 0.0) or 0.0)
    except Exception:
        return 0.0

def get_balance():
    """Live USD balance from the account. Cheap/free; used as a hard safety gate."""
    try:
        resp = api("appendix/user_data", method="GET")
        return float(resp["tasks"][0]["result"][0]["money"]["balance"])
    except Exception as e:
        print(f"  (could not read balance: {e})")
        return None

# ======================= PARSERS =======================
def domain_of(url):
    try:
        net = urlparse(url).netloc.lower()
        return net[4:] if net.startswith("www.") else net
    except Exception:
        return ""

def is_parasite(dom):
    return any(dom == h or dom.endswith("." + h) or h in dom for h in PARASITE_HOSTS)

def classify_domain(dom):
    if any(bd in dom for bd in BRAND_DOMAINS):
        return "TRILLET"
    if any(t.replace(".", "") in dom.replace(".", "") for t in COMPETITOR_TOKENS):
        return "competitor"
    if is_parasite(dom):
        return "parasite"
    return "other"

def find_urls(obj, out):
    """Recursively pull every URL-ish string out of an arbitrary JSON blob (schema-agnostic)."""
    if isinstance(obj, dict):
        for v in obj.values():
            find_urls(v, out)
    elif isinstance(obj, list):
        for v in obj:
            find_urls(v, out)
    elif isinstance(obj, str):
        if obj.startswith("http://") or obj.startswith("https://"):
            out.append(obj)

def find_text(obj, out):
    """Pull likely answer-text fields out of an arbitrary LLM response blob."""
    if isinstance(obj, dict):
        for k, v in obj.items():
            if k in ("message", "content", "text", "answer", "response") and isinstance(v, str):
                out.append(v)
            find_text(v, out)
    elif isinstance(obj, list):
        for v in obj:
            find_text(v, out)

def mentioned(text, tokens):
    t = text.lower()
    return sorted({tok for tok in tokens if tok in t})

# ======================= PASSES =======================
def serp_pass(dry):
    print("\n=== SERP PASS (organic + AI Overview) ===")
    serp_rows, aio_rows, raw = [], [], []
    for label, keywords, _ in CLUSTERS:
        print(f"\n[{label}]")
        for kw in keywords:
            if LEDGER.would_exceed(SERP_COST_EST):
                print("  ! budget guard hit — stopping SERP pass"); return serp_rows, aio_rows, raw
            if dry:
                print(f"  (dry-run) would query SERP: {kw}")
                continue
            payload = [{"keyword": kw, "location_name": LOCATION,
                        "language_name": LANGUAGE, "depth": SERP_DEPTH}]
            resp = api(SERP_ENDPOINT, payload)
            LEDGER.add(SERP_ENDPOINT, kw, response_cost(resp))
            raw.append({"keyword": kw, "resp": resp})
            try:
                items = resp["tasks"][0]["result"][0]["items"] or []
            except Exception:
                items = []
            found_brand = found_comp = False
            for it in items:
                if it.get("type") == "organic":
                    url = it.get("url", "")
                    dom = domain_of(url)
                    cls = classify_domain(dom)
                    found_brand |= (cls == "TRILLET")
                    found_comp  |= (cls == "competitor")
                    serp_rows.append([label, kw, it.get("rank_absolute", ""),
                                      dom, cls, it.get("title", "")[:120], url])
                elif it.get("type") in ("ai_overview", "ai_overview_reference"):
                    urls = []
                    find_urls(it, urls)
                    doms = sorted({domain_of(u) for u in urls if domain_of(u)})
                    aio_rows.append([label, kw, "yes", ";".join(doms)[:400]])
            para = sum(1 for r in serp_rows if r[1] == kw and r[4] == "parasite")
            print(f"  {kw[:52]:<52} top20: parasite={para} trillet={'Y' if found_brand else '-'} comp={'Y' if found_comp else '-'}")
    return serp_rows, aio_rows, raw

def labs_pass(dry):
    if not RUN_LABS:
        return []
    print("\n=== LABS PASS (ranked keywords per domain) ===")
    rows = []
    for i, target in enumerate(LABS_TARGETS):
        if i >= LABS_MAX_CALLS or LEDGER.would_exceed(LABS_COST_EST):
            break
        if dry:
            print(f"  (dry-run) would pull ranked keywords: {target}")
            continue
        payload = [{"target": target, "location_name": LOCATION,
                    "language_name": LANGUAGE, "limit": LABS_LIMIT}]
        try:
            resp = api(LABS_ENDPOINT, payload)
        except RuntimeError as e:
            print(f"  ! Labs skipped for {target}: {e}"); continue
        LEDGER.add(LABS_ENDPOINT, target, response_cost(resp))
        try:
            items = resp["tasks"][0]["result"][0]["items"] or []
        except Exception:
            items = []
        for it in items:
            kd = (it.get("keyword_data") or {})
            ki = (kd.get("keyword_info") or {})
            se = (it.get("ranked_serp_element") or {}).get("serp_item", {})
            rows.append([target, kd.get("keyword", ""), ki.get("search_volume", ""),
                         se.get("rank_absolute", "")])
        print(f"  {target:<16} keywords pulled: {len(items)}")
    return rows

def llm_pass(dry):
    print("\n=== LLM SPOT-CHECK (capped, cluster-priority order) ===")
    rows, raw = [], []
    for label, _, prompts in CLUSTERS:
        for prompt in prompts:
            for engine in ENGINES:
                if LEDGER.llm_calls >= LLM_CALL_CAP:
                    print("  • LLM call cap reached — stopping."); return rows, raw
                if LEDGER.would_exceed(LLM_COST_EST):
                    print("  • budget guard hit — stopping LLM pass."); return rows, raw
                if dry:
                    print(f"  (dry-run) [{engine}] {prompt[:60]}")
                    LEDGER.llm_calls += 1
                    continue
                bal = get_balance()
                if bal is not None and bal <= BALANCE_FLOOR:
                    print(f"  • live balance ${bal:.2f} at floor — stopping LLM pass."); return rows, raw
                endpoint = LLM_ENDPOINT_TMPL.format(engine=engine)
                payload = [{
                    "user_prompt": prompt,
                    "model_name": LLM_MODEL.get(engine, ""),
                    "web_search": WEB_SEARCH,
                    "max_output_tokens": LLM_MAX_OUTPUT_TOKENS,
                }]
                try:
                    resp = api(endpoint, payload)
                except RuntimeError as e:
                    print(f"  ! {engine} call failed ({e}). If 404, fix LLM_ENDPOINT_TMPL/LLM_MODEL.")
                    continue
                LEDGER.add(endpoint, f"{engine}:{prompt[:40]}", response_cost(resp))
                LEDGER.llm_calls += 1
                raw.append({"engine": engine, "prompt": prompt, "resp": resp})
                texts, urls = [], []
                find_text(resp, texts); find_urls(resp, urls)
                answer = " ".join(texts)[:4000]
                cited = sorted({domain_of(u) for u in urls if domain_of(u)})
                trillet = bool(mentioned(answer, BRAND_TOKENS))
                comps = mentioned(answer, COMPETITOR_TOKENS)
                rows.append([label, engine, prompt, "yes" if trillet else "no",
                             ";".join(comps), ";".join(cited)[:400], answer[:300].replace("\n", " ")])
                print(f"  [{engine:<10}] {prompt[:46]:<46} trillet={'Y' if trillet else '-'} comps={len(comps)} cites={len(cited)}")
    return rows, raw

# ======================= OUTPUT =======================
def write_csv(path, header, rows):
    with open(path, "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f); w.writerow(header); w.writerows(rows)
    print(f"  wrote {path} ({len(rows)} rows)")

def summarize(serp_rows, aio_rows, llm_rows):
    print("\n=== SHARE OF VOICE (from this run) ===")
    # SERP: trillet vs parasite vs competitor presence per cluster
    by_cluster = {}
    for label, kw, rank, dom, cls, title, url in serp_rows:
        d = by_cluster.setdefault(label, {"kw": set(), "trillet": 0, "comp": 0, "parasite": 0})
        d["kw"].add(kw)
        if cls == "TRILLET": d["trillet"] += 1
        elif cls == "competitor": d["comp"] += 1
        elif cls == "parasite": d["parasite"] += 1
    sov = []
    for label, d in by_cluster.items():
        n = len(d["kw"]) or 1
        line = f"{label}: {n} kw | Trillet listings {d['trillet']} | competitor listings {d['comp']} | parasite-host listings {d['parasite']}"
        print("  " + line)
        sov.append([label, n, d["trillet"], d["comp"], d["parasite"]])
    if llm_rows:
        named = sum(1 for r in llm_rows if r[3] == "yes")
        print(f"  LLM answers naming Trillet: {named}/{len(llm_rows)}")
        sov.append(["LLM: Trillet named", named, len(llm_rows), "", ""])
    return sov

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true", help="preview plan + cost, spend nothing")
    ap.add_argument("--outdir", default="trillet_dfs_out")
    args = ap.parse_args()
    os.makedirs(args.outdir, exist_ok=True)

    n_kw = sum(len(k) for _, k, _ in CLUSTERS)
    n_prompts = sum(len(p) for _, _, p in CLUSTERS)
    planned_llm = min(LLM_CALL_CAP, n_prompts * len(ENGINES))
    est = n_kw * SERP_COST_EST + (LABS_MAX_CALLS * LABS_COST_EST if RUN_LABS else 0) + planned_llm * LLM_COST_EST
    print("Trillet — DataForSEO audit")
    print(f"  keywords: {n_kw} | prompts: {n_prompts} x {len(ENGINES)} engines | LLM cap: {LLM_CALL_CAP} (planned {planned_llm})")
    print(f"  ESTIMATED worst-case spend: ${est:.2f}  (hard stop at ${HARD_BUDGET:.2f})")

    if not args.dry_run:
        bal = get_balance()
        if bal is not None:
            print(f"  live account balance: ${bal:.2f}")
            if bal < 0.05:
                print("  balance too low — aborting."); return

    try:
        serp_rows, aio_rows, serp_raw = serp_pass(args.dry_run)
        labs_rows = labs_pass(args.dry_run)
        llm_rows, llm_raw = llm_pass(args.dry_run)
    except Stop:
        serp_rows = aio_rows = serp_raw = labs_rows = llm_rows = llm_raw = []

    if args.dry_run:
        print(f"\nDRY RUN complete — would make ~{n_kw} SERP + "
              f"{LABS_MAX_CALLS if RUN_LABS else 0} Labs + {planned_llm} LLM calls. Nothing was spent.")
        return

    print("\n=== WRITING OUTPUT ===")
    write_csv(os.path.join(args.outdir, "serp_rankings.csv"),
              ["cluster", "keyword", "rank", "domain", "class", "title", "url"], serp_rows)
    write_csv(os.path.join(args.outdir, "ai_overview.csv"),
              ["cluster", "keyword", "ai_overview_present", "cited_domains"], aio_rows)
    if labs_rows:
        write_csv(os.path.join(args.outdir, "labs_keywords.csv"),
                  ["target_domain", "keyword", "search_volume", "rank"], labs_rows)
    write_csv(os.path.join(args.outdir, "llm_answers.csv"),
              ["cluster", "engine", "prompt", "trillet_named", "competitors", "cited_domains", "answer_excerpt"], llm_rows)
    sov = summarize(serp_rows, aio_rows, llm_rows)
    write_csv(os.path.join(args.outdir, "share_of_voice.csv"),
              ["cluster", "keywords", "trillet", "competitor", "parasite_or_llm"], sov)
    write_csv(os.path.join(args.outdir, "cost_log.csv"),
              ["utc_time", "endpoint", "detail", "cost", "running_total"], LEDGER.rows)
    with open(os.path.join(args.outdir, "raw_dump.json"), "w", encoding="utf-8") as f:
        json.dump({"serp": serp_raw, "llm": llm_raw}, f)
    print(f"  wrote {args.outdir}/raw_dump.json")

    print(f"\n=== DONE ===  actual spend: ${LEDGER.spent:.4f}  |  LLM calls: {LEDGER.llm_calls}")
    b = get_balance()
    if b is not None:
        print(f"  remaining balance: ${b:.2f}")

if __name__ == "__main__":
    main()
