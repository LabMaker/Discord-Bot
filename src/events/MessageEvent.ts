import { Guild, Message } from "discord.js";
import Event from "../utils/Base/Event";
import DiscordClient from "../utils/client";
import { GuildConfig } from "../data/schemas/GuildConfigSchema";
import Guilds from "../data/Guilds";
export default class MessageEvent extends Event {
  constructor() {
    super("message");
  }

  async run(client: DiscordClient, message: Message) {
    if (message.author.bot) return;

    client.commands.get("ticket").run(client, message, []);

    const guildId = message.guild.id;
    const guildConfig = await GuildConfig.findOne({ guildId });

    if (!guildConfig) await GuildConfig.create({ guildId });

    if (message.content.startsWith(guildConfig.prefix)) {
      const args = message.content.slice(guildConfig.prefix.length).split(/ +/);
      const commandName = args[0];

      const command = client.commands.get(commandName.toLowerCase());

      if (command) {
        args.shift();
        command.run(client, message, args);
      }
    }
  }
}
