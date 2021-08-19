import { Message } from 'discord.js';
import Event from '../utils/Base/Event';
import DiscordClient from '../utils/client';

export default class MessageEvent extends Event {
  constructor() {
    super('messageCreate');
  }

  async run(client: DiscordClient, message: Message) {
    if (message.author.bot) return;

    const guildId = message.guild.id;

    let guildConfig = await client.API.DiscordConfig.getOne(guildId);

    console.log(guildConfig);

    if (!guildConfig)
      guildConfig = await client.API.DiscordConfig.create(guildId);

    //Move Try catch inside ticket command?
    try {
      client.commands.get('ticket').run(client, message, [], guildConfig);
    } catch {
      console.log('Unable To Execute Ticket Command'); //Not all Messages are tickets so pointless sending a message to the channel
    }

    if (message.content.startsWith(guildConfig.prefix)) {
      const args = message.content.slice(guildConfig.prefix.length).split(/ +/);
      const commandName = args[0];

      const command = client.commands.get(commandName.toLowerCase());

      if (command) {
        args.shift();
        try {
          command.run(client, message, args, guildConfig);
        } catch (err) {
          message.channel.send(
            'There was an error when attempting to execute this command'
          );
        }
      }
    }
  }
}
