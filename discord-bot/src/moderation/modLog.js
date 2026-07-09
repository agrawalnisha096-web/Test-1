import { EmbedBuilder } from 'discord.js';
import { config } from '../config.js';

export async function logModerationAction(client, { user, action, reason, source, messageContent }) {
  if (!config.modLogChannelId) return;

  const channel = await client.channels.fetch(config.modLogChannelId).catch(() => null);
  if (!channel) return;

  const embed = new EmbedBuilder()
    .setTitle(`Moderation action: ${action}`)
    .addFields(
      { name: 'User', value: `<@${user.id}> (${user.tag})`, inline: true },
      { name: 'Source', value: source, inline: true },
      { name: 'Reason', value: reason || 'N/A' },
    )
    .setTimestamp();

  if (messageContent) {
    embed.addFields({ name: 'Message content', value: messageContent.slice(0, 1000) });
  }

  await channel.send({ embeds: [embed] }).catch((error) => {
    console.error('Failed to send mod log message:', error.message);
  });
}
