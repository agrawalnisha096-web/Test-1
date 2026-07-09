# Discord Community Bot

A moderation and community-management bot for a Discord server. It combines
fast, deterministic rule-based filters (banned words, spam/rate limits,
invite-link spam, mass mentions) with Claude-powered judgment calls on
messages that are ambiguous enough to need real reasoning (harassment,
threats, scams, targeted bullying). It also handles welcome messages,
auto-roling new members, and moderator slash commands.

## 1. Create the server

If you haven't already: open Discord → click the `+` in the server list →
**Create My Own** → give it a name/icon. Set up whatever channels/roles you
want (e.g. `#welcome`, `#rules`, `#general`, `#mod-log`, a `Member` role).

## 2. Create the bot application

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications) → **New Application**.
2. Under **Bot**, click **Reset Token** to generate a token, and copy it — this is `DISCORD_TOKEN`. Keep it secret; never commit it.
3. On the same Bot page, enable these **Privileged Gateway Intents**:
   - Server Members Intent
   - Message Content Intent
4. Copy the **Application ID** from the General Information page — this is `DISCORD_CLIENT_ID`.

## 3. Invite the bot to your server

Build an invite URL (replace `CLIENT_ID`):

```
https://discord.com/api/oauth2/authorize?client_id=CLIENT_ID&permissions=1099780067414&scope=bot%20applications.commands
```

The permissions integer above grants: Manage Roles, Kick Members, Ban
Members, Moderate Members (timeout), Manage Messages, View/Send Channels,
Read Message History. Adjust in the Developer Portal's OAuth2 URL Generator
if you want a different set.

Open the link, pick your server, and authorize.

## 4. Configure environment variables

```bash
cd discord-bot
cp .env.example .env
```

Fill in `.env`:

| Variable | Required | Notes |
|---|---|---|
| `DISCORD_TOKEN` | yes | From step 2 |
| `DISCORD_CLIENT_ID` | yes | From step 2 |
| `DISCORD_GUILD_ID` | no | Set while testing so slash commands register instantly (right-click your server icon → Copy Server ID, with Developer Mode on). Leave blank for global commands (~1hr to propagate). |
| `ANTHROPIC_API_KEY` | no | Enables Claude-powered moderation for borderline messages. Get one at [console.anthropic.com](https://console.anthropic.com/). Without it, only the rule-based filters run. |
| `CLAUDE_MODEL` | no | Defaults to `claude-sonnet-5`. |
| `WELCOME_CHANNEL_ID` | no | Channel to post welcome messages in |
| `AUTO_ROLE_ID` | no | Role auto-assigned to new members |
| `MOD_LOG_CHANNEL_ID` | no | Channel moderation actions get logged to |
| `REDDIT_CLIENT_ID` / `REDDIT_CLIENT_SECRET` | no | Enables `/verify`. From your Reddit app (see step 5 below). |
| `REDDIT_REDIRECT_URI` | no | Must exactly match the redirect URI on the Reddit app, e.g. `https://yourdomain.com/reddit/callback` |
| `REDDIT_USER_AGENT` | no | Reddit requires a descriptive User-Agent, e.g. `discord-community-bot/1.0 (by /u/yourname)` |
| `VERIFIED_ROLE_ID` | no | Role granted to members who pass Reddit verification |
| `SESSION_SECRET` | no | Random string signing OAuth state tokens — generate with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
| `MIN_TOTAL_KARMA` / `MIN_COMMENT_KARMA` / `MIN_ACCOUNT_AGE_DAYS` | no | Verification thresholds. Default to 100 / 20 / 365. |
| `VERIFICATION_PORT` | no | Port the callback server listens on. Default 3000. |
| `DATABASE_PATH` | no | Where the SQLite file storing verification snapshots is written. Default `./verifications.db`. |

Right-click any channel/role with Developer Mode enabled (User Settings →
Advanced → Developer Mode) to copy its ID.

## 5. (Optional) Set up Reddit verification

This gates a role behind Reddit account age + karma via `/verify`. Skip this
section if you don't need it — the bot runs fine without it.

1. Go to [reddit.com/prefs/apps](https://www.reddit.com/prefs/apps) → **create another app...**
2. Choose type **web app** (not "script" — script apps can't use the authorization-code flow this bot relies on).
3. Set **redirect uri** to `https://yourdomain.com/reddit/callback` — this must be the public HTTPS URL where the bot's verification server will be reachable (see step 7, "Running it long-term," for hosting options; you need that URL decided before this step).
4. Copy the **client ID** (under the app name) and **secret** into `REDDIT_CLIENT_ID` / `REDDIT_CLIENT_SECRET`.
5. Set `REDDIT_REDIRECT_URI` in `.env` to the exact same URL you entered in step 3.
6. Set `VERIFIED_ROLE_ID` to the role you want members to get on passing.
7. Generate and set `SESSION_SECRET`.
8. Adjust `MIN_TOTAL_KARMA` / `MIN_COMMENT_KARMA` / `MIN_ACCOUNT_AGE_DAYS` if you don't want the defaults (100 / 20 / 365).

How it works: a member runs `/verify`, gets an ephemeral link, authorizes on
Reddit (read-only `identity` scope — the bot never sees their password and
the access token is used once and discarded, never stored). The bot's
callback server fetches their karma and account age, checks them against
your thresholds, assigns `VERIFIED_ROLE_ID` if they pass, and stores a
snapshot (Reddit username, karma, account age, pass/fail, timestamp) in
SQLite so mods can look it up later with `/reddit-info @user`. Re-running
`/verify` overwrites the previous snapshot and re-checks the role.

This scales the same way regardless of community size: verification is
triggered per-member on demand, not as a batch job, so Reddit's API rate
limits (well under what a real community's `/verify` traffic would produce)
aren't a practical constraint.

## 6. Install, register commands, and run

```bash
npm install
npm run deploy-commands   # registers /warn /kick /ban /timeout /purge /rules /verify /reddit-info
npm start
```

## What it does

- **Rule-based filters** (`src/moderation/ruleFilters.js`): instant checks
  for banned words, invite-link spam, mass mentions, and message-rate spam.
  Edit `BANNED_WORDS` and the thresholds to match your community.
- **Claude-powered review** (`src/moderation/aiModeration.js`): messages that
  pass the rule filters but could still be harassment, threats, scams, etc.
  are sent to Claude for a judgment call, returning an action (`ignore`,
  `delete`, `warn`, `timeout`, `ban`) with a reason. This only runs when
  `ANTHROPIC_API_KEY` is set.
- **Welcome + auto-role** (`src/events/welcome.js`): posts a welcome embed
  and assigns a role when someone joins.
- **Slash commands** (`src/commands/`): `/warn`, `/kick`, `/ban`,
  `/timeout`, `/purge`, `/rules` — each gated by the relevant Discord
  permission, so only actual moderators can run them.
- **Mod log** (`src/moderation/modLog.js`): every automated or manual
  moderation action is posted as an embed to `MOD_LOG_CHANNEL_ID`.
- **Reddit verification** (`src/verification/`): `/verify` sends members
  through Reddit OAuth; the callback server checks karma/account age against
  your thresholds, assigns `VERIFIED_ROLE_ID` on a pass, and stores a
  snapshot mods can pull up with `/reddit-info`. Only runs when the
  `REDDIT_*` / `VERIFIED_ROLE_ID` / `SESSION_SECRET` env vars are set.

## Running it long-term

This bot needs to run as a long-lived process — `npm start` only stays up as
long as the terminal/container it's running in does. Options:

- **Your own machine**: run it with a process manager like `pm2` so it
  restarts on crash/reboot.
- **A small VPS** (e.g. a $5/mo droplet): clone the repo, set up `.env`,
  run under `pm2` or `systemd`.
- **Managed platforms**: [Railway](https://railway.app),
  [Fly.io](https://fly.io), or [Render](https://render.com) all support
  deploying a Node.js worker from a git repo with env vars set in their
  dashboard — no Dockerfile required for a simple bot like this.

If you're using Reddit verification, whichever option you pick needs to
expose `VERIFICATION_PORT` (default 3000) over HTTPS at the exact
`REDDIT_REDIRECT_URI` you configured — most of the platforms above
terminate TLS for you automatically and just need the port set via their
dashboard.

Whichever you pick, never commit `.env`, the `verifications.db` file, or
paste your bot token/API keys into chat, issues, or commits — treat them
like passwords. `verifications.db` contains real members' Reddit usernames
and karma data, so treat it as user data, not disposable local state.
