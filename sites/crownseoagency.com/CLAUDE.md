# Instructions for AI assistants — crownseoagency.com

You are editing the source-of-truth repo for **crownseoagency.com** (WordPress on
Hostinger). Merges to `main` go live automatically, so follow these rules exactly.

## Read before any content work
1. `docs/SEO-STANDARDS.md` — the rulebook. Non-negotiable.
2. `site.yml` — brand name, SEO plugin, limits, banned phrases.
3. `content/keyword-map.csv` — which URL owns which keyword.

## How changes ship
| You change | Where | Goes live via |
|---|---|---|
| Page text, SEO title/description, FAQ | `content/pages/<slug>.yml` | `publish-content.yml` (REST API) |
| Blog post | `content/posts/<slug>.md` | `publish-content.yml` (REST API) |
| Theme PHP/CSS/JS, mu-plugins | `wp-content/...` | `deploy.yml` (rsync) |

Never edit WordPress core, `wp-config.php`, or anything with credentials.

## Workflow for every request
1. Work on a new branch (`claude/<short-topic>`), never directly on `main`.
2. **New page/post:** add the keyword-map row first. If an existing URL already
   targets that keyword/intent, update that page instead and say so.
3. Copy `content/pages/_page-template.yml` or `content/posts/_post-template.md`; fill every field.
4. New content: `status: draft` unless the user explicitly says publish.
5. Run `python scripts/seo_lint.py` and fix **all errors** and as many warnings as
   sensible. Don't change `site.yml` limits to make content pass unless asked.
6. Open a PR using the PR template; list any redirects needed.
7. Report back briefly: what changed, the PR link, remaining lint warnings.

## Writing rules (summary — full detail in SEO-STANDARDS.md)
- Brand is always **Crown SEO Agency**. Expert, plain English, second person.
- Answer the searcher's question in the first two sentences.
- Body starts at H2; no skipped levels; descriptive alt text on every image.
- ≥ 3 internal links in posts (≥ 2 on pages), https + trailing slash.
- **Never invent** statistics, client names, testimonials, case-study results,
  awards, or prices. If you need one, leave `[TODO: verify …]` and flag it in the PR.
- No ranking guarantees, no hype, no AI-cliché phrases.
- Never rename a live slug without a redirect noted in the PR.
