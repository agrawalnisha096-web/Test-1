"""Run the Task 2 prompt panel against Claude (with web search) and log mentions and citations.

Each prompt runs N times in a fresh conversation, so you get a mention/citation *rate*
rather than one response presented as a stable ranking.

Usage:
    pip install anthropic
    export ANTHROPIC_API_KEY=...        # or `ant auth login`
    python run_claude_prompts.py --prompts task2-prompts.csv --runs 3 --out claude-runs

Output:
    claude-runs/<query_id>_run<n>.json   full response (evidence)
    claude-runs/summary.csv              one row per run, same columns as task2-results-log.csv
"""

import argparse
import csv
import datetime as dt
import json
import pathlib
import re
import urllib.parse

import anthropic

MODEL = "claude-opus-5-5"
BRAND = re.compile(r"\bsolu\s?lab\b", re.I)
# Brands to look for in answers; extend after the first round of manual runs.
COMPETITORS = [
    "LeewayHertz", "Debut Infotech", "PixelPlex", "Appinventiv", "Suffescom", "Markovate",
    "Simform", "ScienceSoft", "Itransition", "Intellectsoft", "TechAhead", "Mindinventory",
    "Openxcell", "Space-O", "Antier", "Blockchain App Factory", "Accenture", "Deloitte",
    "IBM", "Infosys", "TCS", "Wipro", "EPAM", "Cognizant", "Capgemini", "PwC", "KPMG",
    "McKinsey", "BCG", "G42", "Master of Code", "Azumo", "HatchWorks", "Netguru", "STX Next",
    "RaftLabs", "Fingent", "BairesDev", "N-iX", "Innowise", "Softeq", "Mobiquity",
]
COUNTRY = {"US": "US", "GCC (UAE)": "AE", "GCC (KSA)": "SA"}


def run_once(client, prompt, country):
    messages = [{"role": "user", "content": prompt}]
    tools = [{
        "type": "web_search_20260209",
        "name": "web_search",
        "max_uses": 5,
        "user_location": {"type": "approximate", "country": country},
    }]
    for _ in range(5):  # resume pause_turn up to 5 times
        response = client.beta.messages.create(
            model=MODEL,
            max_tokens=16000,
            output_config={"effort": "medium"},
            tools=tools,
            messages=messages,
            betas=["server-side-fallback-2026-07-01"],
            fallbacks="default",
        )
        if response.stop_reason != "pause_turn":
            return response
        messages.append({"role": "assistant", "content": response.content})
    return response


def parse(response):
    text, cited, retrieved = [], [], []
    for block in response.content:
        if block.type == "text":
            text.append(block.text)
            for c in getattr(block, "citations", None) or []:
                if getattr(c, "url", None):
                    cited.append(c.url)
        elif block.type == "web_search_tool_result" and isinstance(block.content, list):
            retrieved += [r.url for r in block.content if getattr(r, "url", None)]
    answer = "".join(text)
    return answer, list(dict.fromkeys(cited)), list(dict.fromkeys(retrieved))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--prompts", default="task2-prompts.csv")
    ap.add_argument("--runs", type=int, default=3)
    ap.add_argument("--out", default="claude-runs")
    args = ap.parse_args()

    out = pathlib.Path(args.out)
    out.mkdir(exist_ok=True)
    client = anthropic.Anthropic()
    rows = []
    for q in csv.DictReader(open(args.prompts, newline="")):
        for n in range(1, args.runs + 1):
            now = dt.datetime.now(dt.timezone.utc)
            try:
                response = run_once(client, q["exact_prompt"], COUNTRY.get(q["market"], "US"))
            except anthropic.RateLimitError as e:
                print(f"{q['query_id']} run {n}: rate limited ({e}); rerun later")
                continue
            except anthropic.APIStatusError as e:
                print(f"{q['query_id']} run {n}: API error {e.status_code}: {e.message}")
                continue
            if response.stop_reason == "refusal":
                print(f"{q['query_id']} run {n}: refused")
                continue
            answer, cited, retrieved = parse(response)
            (out / f"{q['query_id']}_run{n}.json").write_text(json.dumps({
                "query_id": q["query_id"], "prompt": q["exact_prompt"], "model": response.model,
                "timestamp_utc": now.isoformat(), "answer": answer,
                "cited_urls": cited, "retrieved_urls": retrieved,
            }, indent=2))
            sl_cited = [u for u in cited if "solulab.com" in urllib.parse.urlsplit(u).netloc]
            competitors = [b for b in COMPETITORS if re.search(rf"\b{re.escape(b)}\b", answer, re.I)]
            rows.append({
                "query_id": q["query_id"], "platform": f"Claude API ({response.model})",
                "mode": "web_search", "run_no": n, "date_utc": now.date().isoformat(),
                "time_utc": now.strftime("%H:%M"), "tester_location": f"approx {COUNTRY.get(q['market'], 'US')}",
                "logged_in": "n/a (API)", "exact_prompt": q["exact_prompt"],
                "solulab_mentioned": bool(BRAND.search(answer)),
                "solulab_recommended": "",  # judge manually from the saved answer
                "solulab_cited": bool(sl_cited), "solulab_cited_urls": " | ".join(sl_cited),
                "position_in_list": "", "competitor_brands": "; ".join(competitors),
                "cited_urls": " | ".join(cited), "facts_about_solulab_correct": "",
                "screenshot_file": f"{q['query_id']}_run{n}.json", "notes": "",
            })
            print(f"{q['query_id']} run {n}: mentioned={rows[-1]['solulab_mentioned']} "
                  f"cited={rows[-1]['solulab_cited']} competitors={len(competitors)}")

    if rows:
        with open(out / "summary.csv", "w", newline="") as f:
            w = csv.DictWriter(f, fieldnames=list(rows[0]))
            w.writeheader()
            w.writerows(rows)


if __name__ == "__main__":
    main()
