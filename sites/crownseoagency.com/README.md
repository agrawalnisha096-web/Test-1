# crownseoagency.com

Source-of-truth repo for crownseoagency.com (WordPress on Hostinger). Content and
code are edited by an AI assistant (Claude, ChatGPT, Cursor…) through pull requests.
Every PR is checked against the site's SEO rules, and merging publishes it.

**Start here:** [docs/SETUP.md](docs/SETUP.md) (one-time) → then just ask the AI for changes.

## What's here
| Path | Purpose |
|---|---|
| `CLAUDE.md` / `AGENTS.md` | Operating instructions any AI assistant follows in this repo. |
| `docs/SEO-STANDARDS.md` | The SEO + brand rulebook. |
| `site.yml` | Brand name, SEO plugin, length limits, banned phrases. Rules are configured here. |
| `content/keyword-map.csv` | One primary keyword per URL (stops pages competing with each other). |
| `content/pages/*.yml`, `content/posts/*.md` | Page and post content (`_*` files are templates). |
| `scripts/seo_lint.py` | Automated SEO/brand checks (runs on every PR and before publishing). |
| `scripts/publish_content.py` | Pushes content + SEO meta to WordPress via the REST API. |
| `wp-content/mu-plugins/crown-seo-rest-meta.php` | Lets the API write Rank Math/Yoast fields. |
| `.github/workflows/` | `seo-check` (PRs), `deploy` (code), `publish-content` (content), `import-from-hostinger`. |

## Day-to-day
```
"Write a post on local SEO for dentists"  →  AI opens PR  →  SEO check ✅  →  you merge  →  live
```

Example requests:
- *"Add a service page for technical SEO audits targeting 'technical seo audit'."*
- *"Rewrite the meta descriptions on all service pages — keep them within limits."*
- *"Audit the keyword map for cannibalization and propose merges."*
- *"Publish the 'how long does seo take' post on Monday 9am."* (sets `status: future` + `date`)

## Using an AI other than Claude
Give the assistant access to this repo (e.g. ChatGPT Codex, Cursor, GitHub Copilot
agent) and start with: *"Read AGENTS.md and follow it."* The rules live in the repo
and the SEO check runs on every PR, so the same standards apply whichever assistant
writes the content.

Run checks locally:
```bash
pip install -r scripts/requirements.txt
python scripts/seo_lint.py            # SEO gate
python scripts/publish_content.py --dry-run   # needs WP_URL/WP_USER/WP_APP_PASSWORD
```
