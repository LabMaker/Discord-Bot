import DiscordClient from './utils/client';
import { registerCommands, registerEvents } from './utils/Handlers';
import * as dotenv from 'dotenv';
import { Intents } from 'discord.js';
import PayNotifications from './utils/PayNotifications';
dotenv.config();

const intents = new Intents(32767);
const client = new DiscordClient({ intents });
client.API.setAccessToken(process.env.API_TOKEN);

(async () => {
  await registerCommands(client);
  await registerEvents(client);
  PayNotifications.listen(client);
  await client.login(process.env.BOT_TOKEN);
})();
