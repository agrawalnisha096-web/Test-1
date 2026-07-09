import { readdirSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function loadCommands() {
  const commandsDir = path.join(__dirname, 'commands');
  const files = readdirSync(commandsDir).filter((file) => file.endsWith('.js'));

  const commands = new Map();
  for (const file of files) {
    const module = await import(pathToFileURL(path.join(commandsDir, file)).href);
    if (module.data && module.execute) {
      commands.set(module.data.name, module);
    }
  }
  return commands;
}
