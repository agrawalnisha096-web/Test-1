# Content (Pages & Posts)

Files here are the **source of truth for WordPress content** — the words and
data that live in the database, not the theme code. When they change on the
production branch, `.github/workflows/publish-content.yml` runs
`scripts/publish_content.py`, which publishes them to WordPress via the REST API.

## The two layers of a tool page

A page like the GraphQL Formatter has **two parts**, published by two pipelines:

| Part | Where it's defined | Pipeline |
|------|--------------------|----------|
| The tool UI + logic (PHP template, JS, CSS) | Theme file, e.g. `graphqlformatter.php` | `deploy.yml` (rsync) |
| The page's text — `description`, FAQ, title, slug | `content/pages/*.yml` (this folder) | `publish-content.yml` (REST) |

To ship a brand-new tool you do both: add the template file (code) **and** a
content file here (content).

## Pages — `content/pages/*.yml`

See `graphql-formatter.yml` for a worked example. Fields:

- `title`, `slug` (required)
- `status`: `publish` | `draft` | `pending` | `private`
- `template`: the theme template filename (must already be deployed)
- `acf`: a map of ACF field name → value. Repeaters (like `faq_list`) are a
  list of objects whose keys are the sub-field names.
- `meta` (optional): SEO meta, only if those keys are REST-writable.

## Posts — `content/posts/*.md`

Markdown body + YAML front matter. See `example-blog-post.md`. Front matter:

- `title`, `slug` (required)
- `status`, `excerpt`, `date` (optional)
- `categories`, `tags`: lists of names — created automatically if missing.

## Prerequisites

1. **Application Password** for a WordPress user → stored as the `WP_APP_PASSWORD`
   GitHub secret (with `WP_URL`, `WP_USER`).
2. **ACF fields set to "Show in REST API"** (ACF 6+), so `acf` values can be
   written.

## How matching works

Publishing matches by `slug`: an existing page/post with that slug is **updated**;
otherwise it's **created**. Re-running with no changes does nothing. Test safely
first:

```bash
# from repo root, with WP_URL/WP_USER/WP_APP_PASSWORD set
python scripts/publish_content.py --check     # verify connection + auth
python scripts/publish_content.py --dry-run   # preview, publish nothing
```
