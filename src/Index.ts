import DiscordClient from "./utils/client";
import { registerCommands, registerEvents } from "./utils/Handlers";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const client = new DiscordClient();

(async () => {
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then((m) => console.log("Connected to database."))
    .catch((err) => console.log("Failed to connect to db"));
})();

(async () => {
  await registerCommands(client);
  await registerEvents(client);
  await client.login(process.env.BOT_TOKEN);
})();
