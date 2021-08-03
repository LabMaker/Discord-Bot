import mongoose from "mongoose";

export const GuildConfigSchema = new mongoose.Schema({
  guildId: {
    type: mongoose.SchemaTypes.String,
    require: true,
    unique: true,
  },
  prefix: {
    type: String,
    default: "?",
  },
  imageUrl: { type: String },
  autoSwitch: { type: mongoose.SchemaTypes.Boolean, default: false },
  autoTicket: { type: mongoose.SchemaTypes.Boolean, default: false },
  autoReact: { type: mongoose.SchemaTypes.Boolean, default: false },
});

//export const GuildConfig = mongoose.model("GuildConfig", GuildConfigSchema);
export const GuildConfig = mongoose.model("GuildConfig", GuildConfigSchema);
