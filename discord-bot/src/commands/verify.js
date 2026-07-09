import { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { config, isVerificationEnabled } from '../config.js';
import { signState } from '../verification/state.js';
import { buildAuthUrl } from '../verification/reddit.js';

export const data = new SlashCommandBuilder()
  .setName('verify')
  .setDescription('Verify your Reddit account to get the verified role');

export async function execute(interaction) {
  if (!isVerificationEnabled) {
    await interaction.reply({
      content: 'Reddit verification is not configured on this server yet. Ask an admin to set it up.',
      ephemeral: true,
    });
    return;
  }

  const state = signState({ discordId: interaction.user.id, guildId: interaction.guildId });
  const url = buildAuthUrl(state);

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setLabel('Verify with Reddit').setStyle(ButtonStyle.Link).setURL(url),
  );

  await interaction.reply({
    content: `Click below to connect your Reddit account. You'll need **${config.minTotalKarma}+ total karma**, **${config.minCommentKarma}+ comment karma**, and an account at least **${config.minAccountAgeDays} days old**. This link expires in 10 minutes.`,
    components: [row],
    ephemeral: true,
  });
}
