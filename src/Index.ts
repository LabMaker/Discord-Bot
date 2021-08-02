import DiscordClient from './utils/client';
import { registerCommands, registerEvents } from './utils/Handlers';
import * as dotenv from 'dotenv';
dotenv.config();

const client = new DiscordClient();

(async () => {
    await registerCommands(client);
    await registerEvents(client);
    await client.login(process.env.BOT_TOKEN);   
})()
