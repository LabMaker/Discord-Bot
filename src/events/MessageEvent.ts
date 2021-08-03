import { Message } from "discord.js";
import Event from "../utils/Base/Event";
import DiscordClient from "../utils/client";

export default class MessageEvent extends Event {
  constructor() {
    super("message");
  }

  async run(client: DiscordClient, message: Message) {
    if (message.author.bot) {
      return;
    }

    if (message.content.startsWith(client.prefix)) {
      const args = message.content.slice(client.prefix.length).split(/ +/);
      const commandName = args[0];

      const command = client.commands.get(commandName.toLowerCase());

      if (command) {
        args.shift();
        command.run(client, message, args);
      }
    }
  }
}
