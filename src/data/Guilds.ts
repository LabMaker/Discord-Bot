import { Mongoose } from "mongoose";
import { GuildConfig } from "./schemas/GuildConfigSchema";

export default class Guilds {
  public async getGuild(guildId): Promise<any> {
    console.log("Yes");
    return (
      (await GuildConfig.findOne({ guildId })) ??
      (await GuildConfig.create({ guildId }))
    );
  }
}
