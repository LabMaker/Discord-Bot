import { Message } from 'discord.js';
import Event from '../utils/Base/Event';
import DiscordClient from '../utils/client';

export default class MessageEvent extends Event {
  constructor() {
    super('messageCreate');
  }

  async run(client: DiscordClient, message: Message) {
    if (message.author.bot) return;

    if (message.channel.id == '863424666052198410' && !message.author.bot) {
      message
        .reply('This is a log channel please use the main channel')
        .then((msg) => {
          setTimeout(() => {
            message.delete();
            msg.delete();
          }, 5000);
        });
      return;
    }

    const guildId = message.guild.id;

    let guildConfig = await client.API.Discord.getOne(guildId);

    if (!guildConfig._id) {
      guildConfig = await client.API.Discord.create(guildId);
    }

    if (!guildConfig._id) {
      return; //After Two Tries move on.
    }

    //Move Try catch inside ticket command?
    try {
      client.commands.get('ticket').run(client, message, [], guildConfig);
    } catch {
      console.log('Unable To Execute Ticket Command'); //Not all Messages are tickets so pointless sending a message to the channel
    }

    if (message.content.startsWith(guildConfig.prefix)) {
      //Message is only <Prefix>
      if (message.content === guildConfig.prefix) {
        return;
      }

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
