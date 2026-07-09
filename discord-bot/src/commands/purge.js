import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('purge')
  .setDescription('Bulk delete recent messages in this channel')
  .addIntegerOption((opt) =>
    opt.setName('count').setDescription('Number of messages to delete (max 100)').setRequired(true).setMinValue(1).setMaxValue(100),
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages);

export async function execute(interaction) {
  const count = interaction.options.getInteger('count');
  const deleted = await interaction.channel.bulkDelete(count, true).catch(() => null);

  await interaction.reply({
    content: deleted ? `Deleted ${deleted.size} messages.` : 'Failed to delete messages (they may be older than 14 days).',
    ephemeral: true,
  });
}
