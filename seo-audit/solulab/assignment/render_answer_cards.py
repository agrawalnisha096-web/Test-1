"""Render saved DataForSEO AI-answer responses as evidence cards (HTML), for screenshotting.

Each card shows the platform, exact prompt, API timestamp, location, the answer with the
target brand highlighted, and the cited sources. The footer states that the card is rendered
from a saved API response, not captured from the app UI.

Usage: python render_answer_cards.py <out_dir> <evidence_dir> <platform> <query_id> <run> <brand_regex> [<excerpt_chars>]
"""

import html
import json
import pathlib
import re
import sys

import markdown

sys.path.insert(0, str(pathlib.Path(__file__).parent))
from run_dataforseo_task2 import parse  # noqa: E402

LABEL = {"chatgpt": "ChatGPT (DataForSEO LLM Scraper)", "perplexity": "Perplexity Sonar (DataForSEO LLM Responses)",
         "ai_mode": "Google AI Mode (DataForSEO SERP API)"}


def card(evidence_dir, platform, qid, run, brand_regex, excerpt_chars=2600):
    raw = pathlib.Path(evidence_dir) / "raw" / f"{platform}_{qid}_run{run}.json"
    resp = json.loads(raw.read_text())
    task = resp["tasks"][0]
    data = task.get("data", {})
    p = parse(platform, resp)
    prompt = data.get("keyword") or data.get("user_prompt")
    loc = data.get("location_name") or data.get("location_code") or data.get("web_search_country_iso_code")
    loc = {2840: "United States", 2784: "United Arab Emirates", 2682: "Saudi Arabia"}.get(loc, loc)
    answer = re.sub(r"!\[[^\]]*\]\([^)]*\)", "", p["answer"])  # drop inline images
    if platform == "chatgpt":  # keep source chips as plain text, drop escape backslashes
        answer = re.sub(r"\[([^\]]*)\]\((https?://[^)]+)\)", r"[\1] ", answer)
        answer = re.sub(r"\\([.:!()\-])", r"\1", answer)
    brand = re.compile(brand_regex, re.I)
    m = brand.search(answer)
    if m and m.start() > excerpt_chars - 600:  # centre the excerpt on the brand mention
        start = max(0, answer.rfind("\n", 0, m.start() - 700))
        answer = "…\n\n" + answer[start:]
    if len(answer) > excerpt_chars:
        answer = answer[:excerpt_chars].rsplit("\n", 1)[0] + "\n\n…"
    body = markdown.markdown(answer, extensions=["tables"])
    body = brand.sub(lambda x: f"<mark>{x.group(0)}</mark>", body)
    sources = "".join(f"<li>{html.escape(u)}</li>" for u in p["urls"][:12])
    return f"""<!doctype html><html><head><meta charset="utf-8"><style>
body{{margin:0;background:#eef0f3;font:14px/1.5 -apple-system,Segoe UI,Roboto,Arial,sans-serif;color:#1d2330}}
.card{{width:860px;margin:16px;background:#fff;border:1px solid #d5d9e0;border-radius:10px;overflow:hidden}}
.hd{{background:#1d2330;color:#fff;padding:12px 18px}} .hd b{{font-size:15px}} .meta{{opacity:.85;font-size:12.5px;margin-top:4px}}
.q{{padding:12px 18px;background:#f6f7f9;border-bottom:1px solid #e3e6eb}} .q span{{color:#5b6476;font-size:12px;text-transform:uppercase;letter-spacing:.04em}}
.ans{{padding:6px 18px 4px}} .ans table{{border-collapse:collapse;font-size:12.5px}} .ans td,.ans th{{border:1px solid #d9dde3;padding:4px 6px;vertical-align:top}}
mark{{background:#ffe066;padding:0 2px;border-radius:2px;font-weight:600}}
.src{{padding:8px 18px 12px;border-top:1px solid #e3e6eb;font-size:12px;color:#3b4252}} .src ol{{margin:4px 0 0 18px;padding:0}}
.ft{{padding:8px 18px;background:#f6f7f9;font-size:11.5px;color:#5b6476;border-top:1px solid #e3e6eb}}
</style></head><body><div class="card">
<div class="hd"><b>{LABEL[platform]}</b><div class="meta">API timestamp: {html.escape(str(p['datetime']))} · Location: {html.escape(str(loc))} · Run {run} · Task cost ${task.get('cost')}</div></div>
<div class="q"><span>Exact prompt</span><br>{html.escape(prompt)}</div>
<div class="ans">{body}</div>
<div class="src"><b>Cited sources ({len(p['urls'])})</b><ol>{sources}</ol></div>
<div class="ft">Rendered from the saved API response <code>{raw.as_posix().split('assignment/')[-1]}</code>; answer excerpted, brand highlighted. Not a screenshot of the app UI.</div>
</div></body></html>"""


if __name__ == "__main__":
    out, ev, plat, qid, run, rx = sys.argv[1:7]
    n = int(sys.argv[7]) if len(sys.argv) > 7 else 2600
    path = pathlib.Path(out) / f"card_{plat}_{qid}_run{run}.html"
    path.write_text(card(ev, plat, qid, run, rx, n))
    print(path)
