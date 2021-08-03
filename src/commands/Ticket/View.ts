import { Message } from "discord.js";
import { GuildConfig } from "../../data/schemas/GuildConfigSchema";
import Command from "../../utils/Base/Command";
import DiscordClient from "../../utils/client";
import Logs from "../../utils/Logs";

export default class Prefix extends Command {
  constructor() {
    super("view", "Ticket", [""]);
  }

  async run(client: DiscordClient, message: Message, args: string[]) {
    if (message.channel.type == "dm") return;

    const ticketId = message.channel.name.toLowerCase().replace("ticket-", "");

    if (Number(ticketId) === NaN) {
      return message.channel.send(`Ticket doesnt exist ${message.member}`);
    }
    
    message.channel.send(await Logs.GenerateEmbed(ticketId, message));
  }
}
