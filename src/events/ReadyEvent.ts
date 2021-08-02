import { Message } from "discord.js";
import Event from "../utils/Base/Event";
import DiscordClient from "../utils/client";

export default class MessageEvent extends Event {
    constructor() {
        super('ready')
    }

    async run(client: DiscordClient, message: Message) {
        console.log(`${client.user!.username} is running.`);
    }
}