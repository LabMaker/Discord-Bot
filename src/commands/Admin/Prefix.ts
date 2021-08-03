import { Message } from "discord.js";
import { GuildConfig } from "../../data/schemas/GuildConfigSchema";
import Command from "../../utils/Base/Command";
import DiscordClient from "../../utils/client";

export default class Prefix extends Command {
  constructor() {
    super("prefix", "Admin", ["setprefix"]);
  }

  async run(client: DiscordClient, message: Message, args: string[]) {
    const guildId = message.guild.id;
    const prefix = args[0];

    try {
      const guildConfig = await GuildConfig.findOneAndUpdate(
        {
          guildId,
        },
        { prefix },
        { new: true }
      );
      message.channel.send(`Updated Prefix to ${guildConfig.prefix}`);
    } catch (err) {
      message.channel.send(
        `An Error Occured Whilst trying to update the Prefix.`
      );
    }
  }
}
