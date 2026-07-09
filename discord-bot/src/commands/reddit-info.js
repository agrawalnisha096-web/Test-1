import { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } from 'discord.js';
import { getVerification } from '../verification/store.js';

export const data = new SlashCommandBuilder()
  .setName('reddit-info')
  .setDescription("Look up a member's Reddit verification snapshot")
  .addUserOption((opt) => opt.setName('user').setDescription('Member to look up').setRequired(true))
  .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers);

export async function execute(interaction) {
  const user = interaction.options.getUser('user');
  const record = getVerification(user.id);

  if (!record) {
    await interaction.reply({ content: `${user.tag} hasn't run /verify yet.`, ephemeral: true });
    return;
  }

  const embed = new EmbedBuilder()
    .setTitle(`Reddit verification: ${user.tag}`)
    .addFields(
      { name: 'Reddit account', value: `u/${record.reddit_username}`, inline: true },
      { name: 'Result', value: record.passed ? 'Passed' : 'Failed', inline: true },
      { name: 'Total karma', value: String(record.total_karma), inline: true },
      { name: 'Comment karma', value: String(record.comment_karma), inline: true },
      { name: 'Account age (days)', value: String(record.account_age_days), inline: true },
      { name: 'Verified at', value: record.verified_at, inline: true },
    )
    .setColor(record.passed ? 0x2e7d32 : 0xc62828);

  await interaction.reply({ embeds: [embed], ephemeral: true });
}
