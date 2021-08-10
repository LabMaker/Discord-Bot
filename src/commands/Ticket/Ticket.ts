import { Message, TextChannel } from 'discord.js';
import Command from '../../utils/Base/Command';
import DiscordClient from '../../utils/client';
import Logs from '../../utils/Logs';

export default class Prefix extends Command {
  constructor() {
    super('ticket', 'Ticket', []);
  }

  async run(client: DiscordClient, message: Message, args: string[]) {
    const channel = message.channel as TextChannel;
    if (channel.parent == null || channel.parent.name != 'Open Orders') return;

    let roles = message.member.roles.cache;
    if (roles.find((r) => r.id === '863817773393379358')) return;

    const ticketId = channel.name.toLowerCase().replace('ticket-', '');
    const guildId = channel.guild.id;

    if (isNaN(Number(ticketId))) {
      return message.channel.send(`Invalid Ticket ID ${message.member}`);
    }

    const ticketDetails = await client.API.Ticket.getOne(guildId, ticketId);

    if (ticketDetails.submitted) return;
    if (ticketDetails.channelId != message.channel.id) return;

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
      await client.API.Ticket.update(ticketDetails);
      message.channel.send({
        embeds: [await Logs.GenerateEmbed(ticketDetails, message)],
      });
      message.channel.send(
        `**Your Ticket has been submitted!** A helper will be with you shortly.`
      );
    }

    if (!ticketDetails.submitted) await client.API.Ticket.update(ticketDetails);
  }
}
