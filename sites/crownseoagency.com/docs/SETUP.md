# Setup — crownseoagency.com

Same pipeline as jsonformatterpro.com (see that repo's `docs/RUNBOOK.md` for
screenshots-level detail on each hPanel step), plus an SEO gate. ~45 minutes, once.

```
 AI (Claude/ChatGPT/Cursor) edits on a branch
            │
            ▼
   Pull Request ──▶ "SEO check" must be green ──▶ 👤 review & merge ──▶ main
                                                                         │
                           ┌─────────────────────────────────────────────┴───┐
                           ▼                                                 ▼
            deploy.yml: theme + mu-plugin → Hostinger      publish-content.yml: lint → WordPress REST
```

## 1. Create the repo 👤
Create a **private** GitHub repo, e.g. `crownseoagency`, and copy the contents of
this folder to its root (including the hidden `.github/`, `.gitignore`, `.env.example`).
If you use Claude Code on the web, connect the new repo to it as well.

## 2. Hostinger access 👤
hPanel → crownseoagency.com → **Advanced → SSH Access**: note IP, port (usually
`65002`), username. In **File Manager** note the web-root path, e.g.
`/home/u123456789/domains/crownseoagency.com/public_html`.
No SSH? Use `.github/workflows/deploy-ftp.yml.example` instead (rename, delete `deploy.yml`).

> If you already created a deploy key for jsonformatterpro.com **on the same
> Hostinger account**, you can reuse it. Otherwise generate one:
> `ssh-keygen -t ed25519 -f ~/.ssh/crown_deploy -C github-deploy -N ""`
> and import the `.pub` in hPanel → SSH Access → Manage SSH keys.

## 3. GitHub secrets 👤
Repo → Settings → Secrets and variables → Actions:

| Secret | Value |
|---|---|
| `HOSTINGER_SSH_HOST` / `_USER` / `_PORT` | from step 2 |
| `HOSTINGER_SSH_KEY` | full private key |
| `HOSTINGER_REMOTE_PATH` | `/home/u…/domains/crownseoagency.com/public_html` |
| `WP_URL` | `https://crownseoagency.com` |
| `WP_USER` | WordPress user with Editor/Admin role |
| `WP_APP_PASSWORD` | wp-admin → Users → Profile → Application Passwords |

## 4. Import the live site 👤
Actions → **Import code from Hostinger** → Run (branch `research` or any review branch).
Review the commit: no `wp-config.php`, `.env`, or DB dumps. Then create `main` from it
and make `main` the default branch.

## 5. Confirm the assumptions in `site.yml` 👤/🤖
Check the brand spelling, the **SEO plugin** (Rank Math vs Yoast — wp-admin →
Plugins), and the locale. Tell the AI the answers and it will update the file.

## 6. Turn on the gates 👤
Settings → Branches → add a rule for `main`:
- Require a pull request before merging
- Require status check **SEO check / lint** to pass

## 7. First deploy & publish, safely 👤
1. hPanel → Backups → create a backup.
2. Actions → **Deploy to Hostinger** → Run. This also installs
   `wp-content/mu-plugins/crown-seo-rest-meta.php`, which lets the pipeline write
   SEO titles/descriptions.
3. Actions → **Publish content to WordPress** → Run with `dry_run = true`. Expect
   `Authenticated … ` and `WOULD CREATE post 'how-long-does-seo-take'`.
4. Run again with `dry_run = false` — creates the example **draft** post. Check it
   in wp-admin, including the Rank Math/Yoast title & description. Delete it afterwards.

## 8. Bring existing pages under control 🤖
Ask the AI: *"Export the existing pages and posts into content/ and fill the keyword map."*
(It can do this via the REST API with the same credentials.) Until a page has a file in
`content/`, the pipeline never touches it — so nothing live is overwritten by accident.

## Troubleshooting
| Symptom | Fix |
|---|---|
| SEO check red on a PR | Read the `ERROR` lines in the job log; fix the content. |
| Title/description not showing in Rank Math/Yoast | mu-plugin not deployed yet, or `seo_plugin` in `site.yml` is wrong. |
| `could not authenticate` | Regenerate the Application Password; check `WP_USER`. |
| `parent page '…' not found` | Publish the parent page first (or remove `parent_slug`). |
| Deploy fails at SSH | Port 65002, key imported in hPanel, whole private key pasted. |
