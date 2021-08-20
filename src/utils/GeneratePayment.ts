import {
  Message,
  MessageActionRow,
  MessageButton,
  MessageComponent,
} from 'discord.js';
import { GuildConfigDto } from 'labmaker-api-wrapper';
import DiscordClient from './client';

export default class Payments {
  static async GeneratePayments(
    client: DiscordClient,
    guildConfig: GuildConfigDto
  ): Promise<MessageActionRow> {
    const payments = await client.API.DiscordConfig.getPayments(
      guildConfig.paymentConfigId
    );

    let buttonTypes = [];
    let types = [];
    payments.forEach((payment) => {
      if (!types.includes(payment.type)) {
        let tempButton = new MessageButton()
          .setStyle('PRIMARY')
          .setLabel(payment.type)
          .setCustomId(payment.type);

        buttonTypes.push(tempButton);
        types.push(payment.type);
      }
    });

    return new MessageActionRow().addComponents(buttonTypes);
  }
}
