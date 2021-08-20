import { Message, MessageActionRow, MessageButton } from 'discord.js';
import { MessageButtonStyles } from 'discord.js/typings/enums';
import { GuildConfigDto } from 'labmaker-api-wrapper';
import Command from '../utils/Base/Command';
import DiscordClient from '../utils/client';
import Payments from '../utils/GeneratePayment';

export default class Payment extends Command {
  constructor() {
    super('pay', 'Admin', ['payment']);
  }

  async run(
    client: DiscordClient,
    message?: Message,
    args?: string[],
    guildConfig?: GuildConfigDto
  ) {
    message.channel.send({
      content: 'Our Payment Methods',
      components: [await Payments.GeneratePayments(client, guildConfig)],
    });
  }
}
