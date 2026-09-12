# Full runbook — automating jsonformatterpro.com

A start-to-finish walkthrough for putting the Hostinger WordPress site under Git
control and publishing code **and** content automatically, with a light PR
review gate.

Legend: 👤 = you do it · 🤖 = Claude does it (ask in chat) · ⏱️ one-time unless noted.

---

## The model you're building

```
  Claude edits on a  claude/*  branch
            │
            ▼
     Pull Request  ──▶  👤 you review & merge  ──▶  main (production)
                                                      │
                                    ┌─────────────────┴─────────────────┐
                                    ▼                                    ▼
                        deploy.yml (code → Hostinger)     publish-content.yml (content → WordPress)
```

- **`main` = production.** Whatever is on `main` is what's live.
- **All changes arrive as PRs into `main`.** You merge = you approve. That's the
  "little human intervention" gate.
- Two automations fire on merge to `main`:
  - **Code** (theme/PHP/JS/CSS) → rsync/SSH to Hostinger (`deploy.yml`).
  - **Content** (Pages, ACF fields, blog posts) → WordPress REST API
    (`publish-content.yml`).

---

## PHASE A — Decide how the Action reaches Hostinger ⏱️👤

The deploy method depends on your plan.

1. Log into **hPanel** → open your website → look in the left sidebar under
   **Advanced**.
2. Decide:
   - **You see "SSH Access"** → use **SSH** (recommended; the rest of this doc
     assumes SSH unless noted).
   - **Only "FTP Accounts"** → use **FTP** (see *FTP variant* callouts).
3. If SSH: open **SSH Access** and write down:
   - **IP address** (e.g. `82.x.x.x`)
   - **Port** (Hostinger usually **65002**)
   - **Username** (e.g. `u123456789`)

---

## PHASE B — Look at what's actually on the server ⏱️👤

In hPanel → **File Manager**, open your domain's **`public_html`**. Note:

- The **absolute path** shown in the address bar, e.g.
  `/home/u123456789/domains/jsonformatterpro.com/public_html` — this is your
  **REMOTE_PATH**.
- Confirm it's WordPress: you'll see `wp-admin/`, `wp-includes/`, `wp-content/`,
  `wp-config.php`.
- Find your **active theme** under `wp-content/themes/` — your tool templates
  (like `graphqlformatter.php`) live inside it. Note the theme folder name.

> Tell me the theme folder name and REMOTE_PATH in chat and 🤖 I'll tailor the
> exclude paths and the example content slugs to your real site.

---

## PHASE C — Create the SSH deploy key ⏱️👤  *(SSH only)*

On your own computer's terminal:

```bash
ssh-keygen -t ed25519 -f ~/.ssh/hostinger_deploy -C "github-deploy" -N ""
```

You now have two files:
- `~/.ssh/hostinger_deploy`      → **private** key → goes to GitHub
- `~/.ssh/hostinger_deploy.pub`  → **public** key → goes to Hostinger

Add the **public** key to Hostinger: hPanel → **SSH Access** → **Manage SSH
keys** → **Import SSH Key** → paste the contents of `hostinger_deploy.pub`.

Test the connection (use your port/user/IP):

```bash
ssh -i ~/.ssh/hostinger_deploy -p 65002 u123456789@YOUR_IP
```

A shell prompt = success. Type `exit` to leave.

> **FTP variant:** skip this phase. Instead, in hPanel → **FTP Accounts**,
> note the **FTP host**, **username**, and **password**.

---

## PHASE D — Add the GitHub secrets ⏱️👤

GitHub repo → **Settings** → **Secrets and variables** → **Actions** →
**New repository secret**. Add each:

**For deploying code (SSH):**

| Secret | Example |
|---|---|
| `HOSTINGER_SSH_HOST` | `82.x.x.x` |
| `HOSTINGER_SSH_USER` | `u123456789` |
| `HOSTINGER_SSH_PORT` | `65002` |
| `HOSTINGER_SSH_KEY` | *entire contents of the private `hostinger_deploy` file* |
| `HOSTINGER_REMOTE_PATH` | `/home/u123456789/domains/jsonformatterpro.com/public_html` |

> **FTP variant:** add `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`,
> `FTP_REMOTE_DIR` instead, then rename `deploy-ftp.yml.example` →
> `deploy-ftp.yml` and delete `deploy.yml`.

**For publishing content (both variants):**

1. In wp-admin → **Users → Profile → Application Passwords**, type a name
   ("GitHub Publisher") → **Add New Application Password** → copy the value shown
   (you only see it once).
2. Add three secrets:

| Secret | Value |
|---|---|
| `WP_URL` | `https://jsonformatterpro.com` |
| `WP_USER` | your WordPress username |
| `WP_APP_PASSWORD` | the Application Password you just copied |

3. In wp-admin → **ACF → Field Groups**, open the group used by your templates
   and set each field (`description`, `faq_list`, and its sub-fields) to
   **Show in REST API = Yes**. Save.

---

## PHASE E — Get the live code into Git ⏱️

**SSH path (automated):**
1. GitHub → **Actions** tab → **Import code from Hostinger** → **Run workflow**
   → leave branch `research` → **Run**.
2. It pulls the live code and commits it to `research`. Watch it go green.

**FTP path (manual):**
1. hPanel File Manager → select `public_html` → **Compress** → download the zip.
2. Unzip locally, copy the files into a clone of this repo on `research`, then:
   ```bash
   git add -A && git commit -m "Import live site code from Hostinger"
   git push origin research
   ```

**Either way — 👤 review the import before it goes further:** make sure no
secrets came along (`wp-config.php`, `.env`, DB dumps). The `.gitignore` and
`deploy-exclude.txt` already exclude the usual ones; tell me if you spot others.

---

## PHASE F — Establish `main` as production ⏱️👤

Right now there's no `main`. Create it from the reviewed `research` branch:

**Option 1 — GitHub UI:** Branches → **New branch** → name `main`, source
`research`. Then Settings → **General → Default branch** → switch to `main`.

**Option 2 — command line:**
```bash
git fetch origin
git checkout -b main origin/research
git push -u origin main
```

From now on: `main` is live, and everything reaches it through PRs.

---

## PHASE G — First deploy, safely ⏱️👤

1. **Back up first:** hPanel → **Files → Backups** → create a backup (so you can
   roll back).
2. Trigger a deploy: GitHub → Actions → **Deploy to Hostinger** → **Run
   workflow** on `main`. (Or just push any small change to `main`.)
3. Watch the run. On success it reports `Deployed commit … to Hostinger.`
4. Load the site and confirm it looks unchanged (you deployed the same code you
   imported, so nothing should visibly change — that's the point of the test).

> `--delete` is OFF by default, so the deploy never removes server files that
> aren't in Git (e.g. uploads). Leave it off until you're sure the repo is the
> full source of truth.

---

## PHASE H — First content publish, safely ⏱️👤

1. **Dry run:** GitHub → Actions → **Publish content to WordPress** → **Run
   workflow** → tick **dry_run = true** → Run. Read the log: it prints
   `WOULD CREATE page 'example-graphql-formatter'` etc. — nothing is written.
2. If the auth line says `Authenticated to … as '<you>'`, credentials work.
3. **Real run:** run it again with **dry_run = false**. It creates the harmless
   example draft page + draft post. Check them in wp-admin (they're drafts, so
   not public).
4. Delete the examples when you're satisfied, or repurpose them.

---

## PHASE I — The daily workflow (this is the payoff) ♻️

Once A–H are done, day-to-day is just this:

### To change or add a **tool page** (code)
1. 👤 In chat: *"Add a YAML formatter tool page like the GraphQL one."*
2. 🤖 I create the theme template (e.g. `wp-content/themes/<theme>/yamlformatter.php`)
   on a `claude/*` branch and open a **PR**.
3. 👤 You review the PR diff and **Merge**.
4. ⚙️ `deploy.yml` pushes the file live within ~a minute.
5. 👤 One manual bit (WordPress requirement): in wp-admin create/assign the Page
   to that template — **or** let the content pipeline do it (next section).

### To publish/edit **page content or a blog post** (database)
1. 👤 In chat: *"Write a blog post about JSON vs YAML"* or *"set the GraphQL
   page's FAQ to these 4 questions."*
2. 🤖 I add/edit a file under `content/` (`content/posts/*.md` or
   `content/pages/*.yml`) on a branch and open a **PR**.
3. 👤 Review + **Merge**.
4. ⚙️ `publish-content.yml` creates/updates the Page or Post via REST.

### To fix a **bug or styling** in existing code
1. 👤 *"The sample buttons on the GraphQL page don't work — fix them."*
2. 🤖 PR with the fix → 👤 merge → ⚙️ deploys.

That's the whole loop: **you describe it, I PR it, you merge it, it ships.**

---

## Optional: even less intervention

- **Auto-fix CI:** after I open a PR, ask me to *watch* it — I'll respond to
  failing checks and review comments automatically until it's green.
- **Auto-merge:** GitHub can auto-merge a PR once checks pass (Settings → General
  → Allow auto-merge). Use only for low-risk content PRs if you want to skip the
  click.
- **Scheduled posts:** set `status: future` + a `date` in a post's front matter
  to schedule it; WordPress publishes at that time.

---

## Troubleshooting

| Symptom | Likely cause / fix |
|---|---|
| Deploy Action fails at SSH step | Wrong port (use 65002), key not imported in hPanel, or `HOSTINGER_SSH_KEY` missing a line. Re-paste the **whole** private key. |
| Content run: `could not authenticate` | Wrong `WP_USER`/`WP_APP_PASSWORD`, or Application Passwords disabled. Regenerate the app password. |
| Content run: ACF fields not saving | The fields aren't set to **Show in REST API** (Phase D.3). |
| Content run: `template` rejected | The template file isn't deployed yet — deploy the code first, then publish content. |
| Site changed unexpectedly after deploy | Restore the Hostinger backup from Phase G.1, then check `deploy-exclude.txt`. |
| Import pulled in `wp-config.php` | Remove it from Git (`git rm --cached wp-config.php`), it's already gitignored going forward. |
