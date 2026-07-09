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
};
