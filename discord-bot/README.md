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

Right-click any channel/role with Developer Mode enabled (User Settings →
Advanced → Developer Mode) to copy its ID.

## 5. Install, register commands, and run

```bash
npm install
npm run deploy-commands   # registers /warn /kick /ban /timeout /purge /rules
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

Whichever you pick, never commit `.env` or paste your bot token/API key into
chat, issues, or commits — treat them like passwords.
