import { Message } from 'discord.js';
import Event from '../utils/Base/Event';
import DiscordClient from '../utils/client';
import { GuildConfigDto } from '../data/dtos/guildConfig.dto';

export default class MessageEvent extends Event {
  constructor() {
    super('message');
  }

  async run(client: DiscordClient, message: Message) {
    if (message.author.bot) return;

    const guildId = message.guild.id;
    let guildConfig: GuildConfigDto = await client.API.DiscordConfig.getOne(
      guildId
    );

    client.commands.get('ticket').run(client, message, [], guildConfig);

    if (!guildConfig)
      guildConfig = await client.API.DiscordConfig.create(guildId);

    if (message.content.startsWith(guildConfig.prefix)) {
      const args = message.content.slice(guildConfig.prefix.length).split(/ +/);
      const commandName = args[0];

      const command = client.commands.get(commandName.toLowerCase());

      if (command) {
        args.shift();
        command.run(client, message, args, guildConfig);
      }
    }
  }
}
