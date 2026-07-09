import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { logModerationAction } from '../moderation/modLog.js';

export const data = new SlashCommandBuilder()
  .setName('kick')
  .setDescription('Kick a member')
  .addUserOption((opt) => opt.setName('user').setDescription('Member to kick').setRequired(true))
  .addStringOption((opt) => opt.setName('reason').setDescription('Reason for the kick').setRequired(false))
  .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers);

export async function execute(interaction) {
  const user = interaction.options.getUser('user');
  const reason = interaction.options.getString('reason') || 'No reason provided';
  const member = await interaction.guild.members.fetch(user.id).catch(() => null);

  if (!member) {
    await interaction.reply({ content: 'Could not find that member in this server.', ephemeral: true });
    return;
  }

  await member.kick(reason).catch(async (error) => {
    await interaction.reply({ content: `Failed to kick: ${error.message}`, ephemeral: true });
    throw error;
  });

  await logModerationAction(interaction.client, {
    user,
    action: 'kick',
    reason,
    source: `manual (${interaction.user.tag})`,
  });

  await interaction.reply({ content: `Kicked ${user.tag}.`, ephemeral: true });
}
