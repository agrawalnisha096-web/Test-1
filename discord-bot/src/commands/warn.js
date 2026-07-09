import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { logModerationAction } from '../moderation/modLog.js';

export const data = new SlashCommandBuilder()
  .setName('warn')
  .setDescription('Warn a member')
  .addUserOption((opt) => opt.setName('user').setDescription('Member to warn').setRequired(true))
  .addStringOption((opt) => opt.setName('reason').setDescription('Reason for the warning').setRequired(true))
  .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers);

export async function execute(interaction) {
  const user = interaction.options.getUser('user');
  const reason = interaction.options.getString('reason');

  await logModerationAction(interaction.client, {
    user,
    action: 'warn',
    reason,
    source: `manual (${interaction.user.tag})`,
  });

  await user.send(`You've been warned in **${interaction.guild.name}**: ${reason}`).catch(() => {});
  await interaction.reply({ content: `Warned ${user.tag}.`, ephemeral: true });
}
