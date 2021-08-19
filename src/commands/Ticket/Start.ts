import { Message } from 'discord.js';
import Command from '../../utils/Base/Command';
import DiscordClient from '../../utils/client';

export default class Prefix extends Command {
  constructor() {
    super('start', 'Ticket', ['']);
  }

  async run(client: DiscordClient, message: Message, args: string[]) {
    if (message.channel.type == 'DM') return;

    const guildId = message.guild.id;
    const ticketId = message.channel.name.toLowerCase().replace('ticket-', '');
    const channelId = message.channel.id;

    if (isNaN(Number(ticketId))) return;
    const ticketDetails = await client.API.Ticket.getOne(guildId, ticketId);

    await client.API.Ticket.delete(ticketDetails._id);

    message.channel.send(
      `Started New Ticket, if you would like to stop the ticket use !stop`
    );

    await client.API.Ticket.create(guildId, Number(ticketId), channelId);

    message.channel.send(
      `**Is this an exam, assignment or homework sheet?** Include the subject as well.`
    );
    message.channel.send(
      `Ticket System is currently disabled sorry for the inconvience`
    );
  }
}
