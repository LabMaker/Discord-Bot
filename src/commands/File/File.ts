import { Message } from "discord.js";
import Command from "../../utils/Base/Command";
import DiscordClient from "../../utils/client";

export default class FileCommand extends Command {
    constructor() {
        super('test2', 'Admin', [''])
    }

    async run(client: DiscordClient, message: Message, args: string[]) {
        console.log("FileCommand Running");
    }
}