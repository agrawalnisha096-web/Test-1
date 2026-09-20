# Trillet — DataForSEO audit: run guide

Budget-capped SERP + GEO (AI-answer) audit that maps who ranks / who gets cited for
Trillet's keyword clusters, in priority order: **white-label → enterprise → AI answering**.

Script: `trillet_dataforseo_audit.py` — Python 3 standard library only, **no pip installs**.

## Budget safety (why it stays under the $1 free credit)
- Reads the real `cost` field DataForSEO returns on every response and sums it.
- Re-checks the **live account balance before each LLM call**; stops at a $0.15 floor.
- **Hard stop at $0.90** cumulative spend; **LLM calls capped at 20**.
- Dry-run verified worst-case: **~$0.72**.

## Requirements for a real run
This needs **outbound network access to `api.dataforseo.com`**. The default Claude Code
on the web environment is egress-locked (no external network), so run it in one of:
1. an environment whose **network policy allows `api.dataforseo.com`**, or
2. your local machine / any host with open network.

Network policy is set when the environment is created — see
https://code.claude.com/docs/en/claude-code-on-the-web

## Credentials (use environment variables — do not hardcode)
Use your DataForSEO **API password** (Dashboard → API Access), not your website login.
Preferably set these as **environment secrets** so they never appear in a chat transcript:

```bash
export DATAFORSEO_LOGIN="you@example.com"
export DATAFORSEO_PASSWORD="your_api_password"
```

## Run
```bash
cd seo-audit
python3 trillet_dataforseo_audit.py --dry-run   # preview plan + est cost, spends nothing
python3 trillet_dataforseo_audit.py             # real run
```

## Outputs → `seo-audit/trillet_dfs_out/`
| File | Contents |
|---|---|
| `serp_rankings.csv` | Top-20 per keyword; each domain tagged Trillet / competitor / parasite-host / other |
| `ai_overview.csv` | Whether a Google AI Overview showed, and which domains it cited |
| `labs_keywords.csv` | Ranked keywords + search volumes for Trillet vs 3 rivals |
| `llm_answers.csv` | Per engine/prompt: was Trillet named, competitors named, cited domains, answer excerpt |
| `share_of_voice.csv` | Roll-up: Trillet vs competitor vs parasite presence per cluster |
| `cost_log.csv` | Every paid call with real cost + running total |
| `raw_dump.json` | Raw API responses for debugging |

## If an LLM call returns 404
DataForSEO occasionally renames AI-Optimization paths/model ids. Correct
`LLM_ENDPOINT_TMPL` / `LLM_MODEL` at the top of the script against the live docs:
https://docs.dataforseo.com/v3/ai_optimization-overview/
The SERP + Labs endpoints are stable and work regardless.

## Tuning (top of the script)
- `ENGINES` — default `["chat_gpt", "perplexity"]`; add `gemini` / `claude`.
- `LLM_CALL_CAP`, `HARD_BUDGET`, `BALANCE_FLOOR` — budget guards.
- `RUN_LABS` — set `False` to skip Labs and reserve more budget for LLM calls.
- `CLUSTERS` — the keywords + prompts, already in priority order.
