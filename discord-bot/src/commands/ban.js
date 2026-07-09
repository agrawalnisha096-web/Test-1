import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { logModerationAction } from '../moderation/modLog.js';

export const data = new SlashCommandBuilder()
  .setName('ban')
  .setDescription('Ban a member')
  .addUserOption((opt) => opt.setName('user').setDescription('Member to ban').setRequired(true))
  .addStringOption((opt) => opt.setName('reason').setDescription('Reason for the ban').setRequired(false))
  .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers);

export async function execute(interaction) {
  const user = interaction.options.getUser('user');
  const reason = interaction.options.getString('reason') || 'No reason provided';

  await interaction.guild.members.ban(user.id, { reason }).catch(async (error) => {
    await interaction.reply({ content: `Failed to ban: ${error.message}`, ephemeral: true });
    throw error;
  });

  await logModerationAction(interaction.client, {
    user,
    action: 'ban',
    reason,
    source: `manual (${interaction.user.tag})`,
  });

  await interaction.reply({ content: `Banned ${user.tag}.`, ephemeral: true });
}
