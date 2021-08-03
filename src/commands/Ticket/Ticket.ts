import { Message, MessageEmbed, TextChannel } from "discord.js";
import { syncBuiltinESMExports } from "module";
import { GuildConfig } from "../../data/schemas/GuildConfigSchema";
import { Ticket } from "../../data/schemas/TicketSchema";
import Command from "../../utils/Base/Command";
import DiscordClient from "../../utils/client";
import Logs from "../../utils/Logs";

export default class Prefix extends Command {
  constructor() {
    super("ticket", "Ticket", []);
  }

  async run(client: DiscordClient, message: Message, args: string[]) {
    const channel = message.channel as TextChannel;

    if (channel.parent == null || channel.parent.name != "Open Orders") return;

    let roles = message.member.roles.cache;
    if (
      roles.find((r) => r.name === "Admin") ||
      roles.find((r) => r.name === "Helper")
    )
      return;

    const ticketId = channel.name.toLowerCase().replace("ticket-", "");
    const ticketDetails = await Ticket.findOne({ ticketId });

    if (isNaN(Number(ticketId))) {
      return message.channel.send(`Invalid Ticket ID ${message.member}`);
    }

    if (ticketDetails.submitted) return;

    if (!ticketDetails.type) {
      ticketDetails.type = message.content;
      message.channel.send(`**What subject is the ${message.content}?**`);
    } else if (!ticketDetails.subject) {
      ticketDetails.subject = message.content;
      message.channel.send(
        `**What date & time is the ${message.content}?** (Include Timezone)`
      );
    } else if (!ticketDetails.time) {
      ticketDetails.time = message.content;
      message.channel.send(
        `**What level of education is this including year?** (University/College)`
      );
    } else if (!ticketDetails.level) {
      ticketDetails.level = message.content;
      message.channel.send(
        `**What is your budget?** (Include currency if isn't \`£ for GBP\` or \`$ for USD\`)`
      );
    } else if (!ticketDetails.budget) {
      ticketDetails.budget = message.content;
      ticketDetails.submitted = true;
      await ticketDetails.save();

      message.channel.send(await Logs.GenerateEmbed(ticketId, message));
      message.channel.send(
        `**Your Ticket has been submitted!** A helper will be with you shortly.`
      );
    }

    await ticketDetails.save();

    console.log(ticketDetails);
  }
}
