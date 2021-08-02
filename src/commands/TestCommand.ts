import { Message } from "discord.js";
import Command from "../utils/Base/Command";
import DiscordClient from "../utils/client";

export default class TestCommand extends Command{
    constructor() {
        super('Test', 'Admin', [''])
    }

    async run(client: DiscordClient, message: Message, args: string[]) {
        console.log("Running");
    }
}