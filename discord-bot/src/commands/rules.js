import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('rules')
  .setDescription('Show the community rules');

export async function execute(interaction) {
  const embed = new EmbedBuilder()
    .setTitle(`${interaction.guild.name} rules`)
    .setDescription(
      [
        '1. Be respectful — no harassment, hate speech, or personal attacks.',
        '2. No spam, unsolicited invite links, or scams.',
        '3. Keep content in the right channels and follow Discord ToS.',
        '4. Listen to moderators — decisions can be appealed via DM.',
      ].join('\n'),
    )
    .setColor(0x5865f2);

  await interaction.reply({ embeds: [embed] });
}
