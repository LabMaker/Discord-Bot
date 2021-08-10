import {
  Channel,
  DMChannel,
  Message,
  NewsChannel,
  TextChannel,
} from 'discord.js';
import Event from '../utils/Base/Event';
import DiscordClient from '../utils/client';

export default class MessageEvent extends Event {
  constructor() {
    super('channelCreate');
  }

  async run(
    client: DiscordClient,
    channel: NewsChannel | TextChannel | DMChannel
  ) {
    if (channel.type == 'dm') {
      return;
    }

    let x = channel.guild.me.joinedTimestamp / 1000;
    if (x >= x + 10) return; // if the bot just joined the server the channelcreate event will get activated after 10 sec
    if (
      channel.parent === null ||
      channel.parent.name.toLowerCase() != 'open orders'
    )
      return;

    const ticketId = channel.name.toLowerCase().replace('ticket-', '');
    if (isNaN(Number(ticketId))) return;

    setTimeout(async () => {
      channel.send(
        `Welcome! I'm going to need some more information before I can find you a suitable tutor. (Enter !stop at Anytime to cancel).`
      );

      //await Ticket.create({ ticketId });

      channel.send(`**Is this an exam, assignment or homework sheet?**`);
    }, 1500);
  }
}