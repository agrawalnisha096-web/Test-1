import 'dotenv/config';

function required(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const config = {
  discordToken: required('DISCORD_TOKEN'),
  clientId: required('DISCORD_CLIENT_ID'),
  guildId: process.env.DISCORD_GUILD_ID || null,
  anthropicApiKey: process.env.ANTHROPIC_API_KEY || null,
  claudeModel: process.env.CLAUDE_MODEL || 'claude-sonnet-5',
  welcomeChannelId: process.env.WELCOME_CHANNEL_ID || null,
  autoRoleId: process.env.AUTO_ROLE_ID || null,
  modLogChannelId: process.env.MOD_LOG_CHANNEL_ID || null,

  // Reddit verification
  redditClientId: process.env.REDDIT_CLIENT_ID || null,
  redditClientSecret: process.env.REDDIT_CLIENT_SECRET || null,
  redditRedirectUri: process.env.REDDIT_REDIRECT_URI || null,
  redditUserAgent: process.env.REDDIT_USER_AGENT || 'discord-community-bot/1.0',
  verifiedRoleId: process.env.VERIFIED_ROLE_ID || null,
  sessionSecret: process.env.SESSION_SECRET || null,
  minTotalKarma: Number(process.env.MIN_TOTAL_KARMA || 100),
  minCommentKarma: Number(process.env.MIN_COMMENT_KARMA || 20),
  minAccountAgeDays: Number(process.env.MIN_ACCOUNT_AGE_DAYS || 365),
  verificationPort: Number(process.env.VERIFICATION_PORT || 3000),
  databasePath: process.env.DATABASE_PATH || './verifications.db',
};

export const isVerificationEnabled = Boolean(
  config.redditClientId &&
    config.redditClientSecret &&
    config.redditRedirectUri &&
    config.verifiedRoleId &&
    config.sessionSecret,
);
