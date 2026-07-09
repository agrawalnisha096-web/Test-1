import { REST, Routes } from 'discord.js';
import { config } from './config.js';
import { loadCommands } from './loadCommands.js';

const commands = await loadCommands();
const body = [...commands.values()].map((command) => command.data.toJSON());

const rest = new REST().setToken(config.discordToken);

const route = config.guildId
  ? Routes.applicationGuildCommands(config.clientId, config.guildId)
  : Routes.applicationCommands(config.clientId);

const result = await rest.put(route, { body });
console.log(`Registered ${result.length} slash command(s)${config.guildId ? ' for guild ' + config.guildId : ' globally'}.`);
