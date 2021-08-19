import { Message } from 'discord.js';
import { GuildConfigDto } from 'labmaker-api-wrapper';
import Command from '../utils/Base/Command';
import DiscordClient from '../utils/client';

export default class Payment extends Command {
  constructor() {
    super('pay', 'Admin', ['payment']);
  }

  async run(
    client: DiscordClient,
    message: Message,
    args: string[],
    guildConfig: GuildConfigDto
  ) {
    // const payments = await client.API.DiscordConfig.getPayments(
    //   guildConfig.paymentConfigId
    // );
    // let buttonTypes = [];
    // let types = [];
    // payments.forEach((payment) => {
    //   if (!types.includes(payment.type)) {
    //     let tempButton = new MessageButton()
    //       .setStyle('blurple')
    //       .setLabel(payment.type)
    //       .setID(payment.type);
    //     buttonTypes.push(tempButton);
    //     types.push(payment.type);
    //   }
    // });
    // let buttonTypes = [];
    // let types = [];
    // payments.map((payment) => {
    //   if (!types.includes(payment.type)) {
    //     let tempButton = new MessageButton()
    //       .setStyle('blurple')
    //       .setLabel(payment.type)
    //       .setID(payment.type);
    //     buttonTypes.push(tempButton);
    //     types.push(payment.type);
    //   }
    // });
    // message.channel.send('Our Payment Methods', {
    //   buttons: buttonTypes,
    // });
  }
}
