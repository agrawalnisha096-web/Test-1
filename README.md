# jsonformatterpro.com

Source-of-truth repository for the site, with automated deployment to Hostinger.

## What's here

| Path | Purpose |
|------|---------|
| `.github/workflows/deploy.yml` | Auto-deploys theme/template **code** to Hostinger over SSH/rsync on push to the production branch. |
| `.github/workflows/publish-content.yml` | Publishes **content** (Pages + blog posts) to WordPress via the REST API. |
| `.github/workflows/import-from-hostinger.yml` | One-time job to pull the current live code into Git. |
| `.github/workflows/deploy-ftp.yml.example` | FTP deploy alternative for plans without SSH. |
| `content/` | Version-controlled Pages (`*.yml`) and blog posts (`*.md`). See `content/README.md`. |
| `scripts/publish_content.py` | Pushes `content/` to WordPress (idempotent, matches by slug). |
| `deploy-exclude.txt` | Files rsync must not push/pull (secrets, docs, uploads). |
| `.gitignore` | Keeps secrets and generated files out of Git. |
| `.env.example` | Template for local env vars (never commit real `.env`). |
| `docs/SETUP.md` | **Start here** — full step-by-step setup guide. |
| `seo-audit/` | Existing SEO audit materials (not deployed). |

## Quick start

Follow **[docs/SETUP.md](docs/SETUP.md)**. In short:

1. Add Hostinger deploy credentials as GitHub Actions secrets.
2. Run the **Import code from Hostinger** action once to seed the repo.
3. From then on: edit → open PR → review → merge → it deploys automatically.

## Workflow

```
edit on a branch  →  open PR  →  review + merge  →  GitHub Action deploys to Hostinger
```
