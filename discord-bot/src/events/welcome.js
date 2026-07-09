import { EmbedBuilder } from 'discord.js';
import { config } from '../config.js';

export async function handleGuildMemberAdd(member) {
  if (config.autoRoleId) {
    await member.roles.add(config.autoRoleId).catch((error) => {
      console.error('Failed to assign auto-role:', error.message);
    });
  }

  if (!config.welcomeChannelId) return;

  const channel = await member.guild.channels.fetch(config.welcomeChannelId).catch(() => null);
  if (!channel) return;

  const embed = new EmbedBuilder()
    .setTitle(`Welcome to ${member.guild.name}!`)
    .setDescription(
      `Hey <@${member.id}>, glad to have you here. Check the rules channel to get started, and say hi!`,
    )
    .setThumbnail(member.user.displayAvatarURL())
    .setTimestamp();

  await channel.send({ embeds: [embed] }).catch((error) => {
    console.error('Failed to send welcome message:', error.message);
  });
}
