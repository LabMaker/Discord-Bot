import { Message } from 'discord.js';
import Command from '../../utils/Base/Command';
import DiscordClient from '../../utils/client';
import Logs from '../../utils/Logs';

export default class Prefix extends Command {
  constructor() {
    super('stop', 'Ticket', ['']);
  }

  async run(client: DiscordClient, message: Message, args: string[]) {
    // if (message.channel.type == 'dm') return;

    // const ticketId = message.channel.name.toLowerCase().replace('ticket-', '');

    // if (isNaN(Number(ticketId))) return;

    // await Ticket.findOneAndUpdate({ ticketId }, { submitted: true });

    // message.channel.send(
    //   `Stopped Ticket Creation. If you would like to restart type !start`
    // );

    message.channel.send(
      `Ticket System is currently disabled sorry for the inconvience`
    );
  }
}
