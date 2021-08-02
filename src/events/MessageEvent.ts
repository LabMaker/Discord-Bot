import { Message } from "discord.js";
import Event from "../utils/Base/Event";
import DiscordClient from "../utils/client";

export default class MessageEvent extends Event {
    constructor() {
        super('message')
    }

    async run(client: DiscordClient, message: Message) {
        console.log("Got Message Running");
    }
}