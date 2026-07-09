import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { logModerationAction } from '../moderation/modLog.js';

export const data = new SlashCommandBuilder()
  .setName('timeout')
  .setDescription('Time out a member')
  .addUserOption((opt) => opt.setName('user').setDescription('Member to time out').setRequired(true))
  .addIntegerOption((opt) =>
    opt.setName('minutes').setDescription('Duration in minutes').setRequired(true).setMinValue(1).setMaxValue(40320),
  )
  .addStringOption((opt) => opt.setName('reason').setDescription('Reason for the timeout').setRequired(false))
  .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers);

export async function execute(interaction) {
  const user = interaction.options.getUser('user');
  const minutes = interaction.options.getInteger('minutes');
  const reason = interaction.options.getString('reason') || 'No reason provided';
  const member = await interaction.guild.members.fetch(user.id).catch(() => null);

  if (!member) {
    await interaction.reply({ content: 'Could not find that member in this server.', ephemeral: true });
    return;
  }

  await member.timeout(minutes * 60 * 1000, reason).catch(async (error) => {
    await interaction.reply({ content: `Failed to time out: ${error.message}`, ephemeral: true });
    throw error;
  });

  await logModerationAction(interaction.client, {
    user,
    action: `timeout (${minutes}m)`,
    reason,
    source: `manual (${interaction.user.tag})`,
  });

  await interaction.reply({ content: `Timed out ${user.tag} for ${minutes} minutes.`, ephemeral: true });
}
