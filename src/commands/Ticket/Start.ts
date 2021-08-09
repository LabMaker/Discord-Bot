import { Message } from 'discord.js';
import Command from '../../utils/Base/Command';
import DiscordClient from '../../utils/client';
import Logs from '../../utils/Logs';

export default class Prefix extends Command {
  constructor() {
    super('start', 'Ticket', ['']);
  }

  async run(client: DiscordClient, message: Message, args: string[]) {
    // if (message.channel.type == 'dm') return;

    // const ticketId = message.channel.name.toLowerCase().replace('ticket-', '');

    // if (isNaN(Number(ticketId))) return;

    // await Ticket.deleteOne({ ticketId });

    // message.channel.send(
    //   `Started New Ticket, if you would like to stop the ticket use !stop`
    // );

    // await await Ticket.create({ ticketId });

    // message.channel.send(
    //   `**Is this an exam, assignment or homework sheet?** Include the subject as well.`
    // );
    message.channel.send(
      `Ticket System is currently disabled sorry for the inconvience`
    );
  }
}
