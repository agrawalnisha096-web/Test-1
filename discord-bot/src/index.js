import { Client, GatewayIntentBits, Partials } from 'discord.js';
import { config, isVerificationEnabled } from './config.js';
import { loadCommands } from './loadCommands.js';
import { moderateMessage } from './moderation/enforce.js';
import { handleGuildMemberAdd } from './events/welcome.js';
import { isAiModerationEnabled } from './moderation/aiModeration.js';
import { createVerificationServer } from './verification/server.js';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.GuildMember],
});

const commands = await loadCommands();

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
  console.log(`AI-assisted moderation: ${isAiModerationEnabled ? 'enabled' : 'disabled (no ANTHROPIC_API_KEY)'}`);
  console.log(`Reddit verification: ${isVerificationEnabled ? 'enabled' : 'disabled (missing Reddit/verification env vars)'}`);

  if (isVerificationEnabled) {
    const app = createVerificationServer(client);
    app.listen(config.verificationPort, () => {
      console.log(`Verification callback server listening on port ${config.verificationPort}`);
    });
  }
});

client.on('messageCreate', async (message) => {
  try {
    await moderateMessage(message);
  } catch (error) {
    console.error('Error moderating message:', error);
  }
});

client.on('guildMemberAdd', async (member) => {
  try {
    await handleGuildMemberAdd(member);
  } catch (error) {
    console.error('Error handling new member:', error);
  }
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(`Error executing command ${interaction.commandName}:`, error);
    const payload = { content: 'Something went wrong running that command.', ephemeral: true };
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp(payload).catch(() => {});
    } else {
      await interaction.reply(payload).catch(() => {});
    }
  }
});

client.login(config.discordToken);
