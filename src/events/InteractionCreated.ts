import {
  ButtonInteraction,
  Interaction,
  Message,
  MessageActionRow,
  MessageButton,
} from 'discord.js';
import { MessageButtonStyles } from 'discord.js/typings/enums';
import { InternalSymbolName } from 'typescript';
import Event from '../utils/Base/Event';
import DiscordClient from '../utils/client';
import Payments from '../utils/GeneratePayment';

export default class MessageEvent extends Event {
  constructor() {
    super('interactionCreate');
  }

  async run(client: DiscordClient, interaction: Interaction) {
    if (!interaction.isButton()) return;
    const guildId = interaction.guild.id;
    let guildConfig = await client.API.DiscordConfig.getOne(guildId);

    if (interaction.customId == 'back') {
      interaction.update({
        content: 'Our Payment Methods',
        components: [await Payments.GeneratePayments(client, guildConfig)],
      });
    }

    const payments = await client.API.DiscordConfig.getPayments(
      guildConfig.paymentConfigId
    );
    let paymentButtons = [];

    payments.forEach((payment) => {
      if (interaction.customId === payment.name) {
        return interaction.reply({
          content: `${payment.name}: ${payment.value}`,
        });
      } else if (interaction.customId === payment.type) {
        let tempButton = new MessageButton()
          .setStyle('PRIMARY')
          .setLabel(payment.name)
          .setCustomId(payment.name);

        paymentButtons.push(tempButton);
      }
    });

    if (paymentButtons.length > 0) {
      const backButton = new MessageButton()
        .setStyle('SECONDARY')
        .setLabel('<')
        .setCustomId('back');
      paymentButtons.push(backButton);
      const row = new MessageActionRow().addComponents(paymentButtons);
      interaction.update({ content: 'Our Payment Methods', components: [row] });
    }
  }
}
