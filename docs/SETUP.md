# jsonformatterpro.com — Git + Claude + Hostinger pipeline

This repo is the **source of truth** for the site's code. You edit here (with
Claude's help), open a pull request, review it, merge it — and a GitHub Action
automatically deploys the change to Hostinger. Minimal human intervention: your
only manual step is glancing at a PR and clicking **Merge**.

```
Hostinger (live)  ──①import──▶  GitHub repo  ──②edit in Claude──▶  branch
      ▲                                                              │
      │                                                        ③ open PR
   ⑤ auto-deploy  ◀──────────── ④ you review & merge ◀──────────────┘
   (GitHub Action)
```

Do the numbered steps once to set it up. After that, day-to-day is only ②–⑤.

---

## Step 0 — Find out what access your Hostinger plan gives you

The deploy method depends on this.

1. Log in to **hPanel** (Hostinger's dashboard).
2. Open your website → look in the sidebar under **Advanced**.
   - If you see **SSH Access** → you have SSH. ✅ Use the recommended path below.
   - If you only see **FTP Accounts** (no SSH) → use the **FTP alternative**.
3. On **SSH Access**, note the **IP address**, **Port** (Hostinger usually uses
   **65002**, not 22), and **username** (looks like `u123456789`).

> Not sure which plan you have? Premium shared plans are often FTP-only;
> Business, Cloud, and VPS plans include SSH. If in doubt, check whether the
> **SSH Access** menu item exists.

---

## Step 1 — Confirm what the code actually is

Before importing, glance at the file structure so we scope the repo correctly.
In hPanel → **File Manager**, open your domain's `public_html`:

- **Custom PHP site** (what you expect): you'll see your own `.php` files,
  maybe an `index.php`, `assets/`, `includes/`, etc. → version the **whole
  web root**.
- **WordPress**: you'll see `wp-admin/`, `wp-includes/`, `wp-content/`,
  `wp-config.php`. → version **only `wp-content/` (your theme + custom
  plugins)**, never core. If your blog posts were written in the WP editor,
  their *text* is in the MySQL database, not in these files — tell me and we'll
  add a content-publishing step for those.

Whichever it is, that folder's path is your **remote path** for the secrets below
(e.g. `/home/u123456789/domains/jsonformatterpro.com/public_html`).

---

## Step 2 — Create an SSH key for deployments (SSH path)

On your own computer:

```bash
ssh-keygen -t ed25519 -f ~/.ssh/hostinger_deploy -C "github-deploy" -N ""
```

This makes two files:
- `hostinger_deploy`      → **private** key (goes into GitHub secrets)
- `hostinger_deploy.pub`  → **public** key (goes onto Hostinger)

In **hPanel → SSH Access → Manage SSH keys → Import SSH Key**, paste the
contents of `hostinger_deploy.pub`.

Test it (replace port/user/host with yours):

```bash
ssh -i ~/.ssh/hostinger_deploy -p 65002 u123456789@YOUR_SERVER_IP
```

If you get a shell, you're good.

---

## Step 3 — Add GitHub Actions secrets

In GitHub: **Settings → Secrets and variables → Actions → New repository secret.**
Add these (SSH path):

| Secret name             | Value                                                        |
|-------------------------|--------------------------------------------------------------|
| `HOSTINGER_SSH_HOST`    | Your server IP or hostname                                   |
| `HOSTINGER_SSH_USER`    | e.g. `u123456789`                                            |
| `HOSTINGER_SSH_PORT`    | e.g. `65002`                                                 |
| `HOSTINGER_SSH_KEY`     | The **entire** contents of the private `hostinger_deploy`    |
| `HOSTINGER_REMOTE_PATH` | e.g. `/home/u123456789/domains/jsonformatterpro.com/public_html` |

(FTP path instead: `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`, `FTP_REMOTE_DIR`
— see `.github/workflows/deploy-ftp.yml.example`.)

---

## Step 4 — Import the live code into Git (one time)

**If you have SSH:** go to the **Actions** tab → **Import code from Hostinger**
→ **Run workflow** (leave branch = `research`). It pulls the live code down and
commits it to `research`. Open a PR from `research` and review what came in.

**If you're FTP-only (or prefer it):**
1. In hPanel File Manager, select your web root → **Compress** to a `.zip` →
   download it.
2. Unzip locally, copy the files into a clone of this repo, then:
   ```bash
   git checkout research
   git add -A && git commit -m "Import live site code from Hostinger"
   git push -u origin research
   ```

Either way, **first review the import** to make sure no secrets came along
(`wp-config.php`, `.env`, DB dumps). `.gitignore` and `deploy-exclude.txt`
already exclude the usual suspects — adjust them to match your real structure.

---

## Step 5 — Pick your production branch

`deploy.yml` deploys on every push to **`main`**. Two common setups:

- **`main` = production** (recommended): PRs merge into `main`, which deploys.
- If you'd rather deploy from `research`, change the `branches:` line in
  `.github/workflows/deploy.yml` to `research`.

Do all editing on short-lived feature branches and merge via PR — never commit
straight to the production branch.

---

## Day-to-day workflow (the part you'll actually use)

1. Ask me (Claude) for a change — a new page, a blog post, a fix.
2. I make it on a feature branch and open a **pull request**.
3. You review the PR (GitHub shows the exact diff). Optionally I can watch the
   PR and fix CI automatically.
4. You click **Merge**.
5. The deploy Action pushes the change live to Hostinger within a minute.

That's the "little human intervention" loop you asked for: I do the work, you
approve.

---

## Safety notes

- **`--delete` is off by default** in `deploy.yml`, so files on the server that
  aren't in Git (like user uploads) are never wiped. Turn it on only once the
  repo is the complete source of truth.
- **Secrets never enter Git** — `wp-config.php`, `.env`, keys, and DB dumps are
  gitignored and rsync-excluded. The server keeps its own config.
- **Back up first.** Before your first live deploy, take a Hostinger backup
  (hPanel → Files → Backups) so you can roll back.
- **Blog/page *content* vs *code*:** if this turns out to be WordPress and your
  posts were written in the editor, deploying files won't publish those posts —
  they live in MySQL. Tell me and I'll add a REST-API publishing step for them.
