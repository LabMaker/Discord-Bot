import { Message, MessageEmbed } from 'discord.js';
import { GuildConfigDto, TicketDto } from 'labmaker-api-wrapper';
import DiscordClient from './client';

export default class Logs {
  static async GenerateEmbed(
    ticketDetails: TicketDto,
    message: Message
  ): Promise<MessageEmbed> | null {
    return new MessageEmbed()
      .setColor('#10F9AB')
      .setTitle(ticketDetails.type)
      .setAuthor(
        `${message.member.user.username}#${message.member.user.discriminator} - Ticket ${ticketDetails.ticketId}`,
        `${message.member.user.displayAvatarURL({
          dynamic: true,
        })}`,
        message.url
      )
      .addFields(
        { name: 'Time', value: ticketDetails.time, inline: false },
        { name: 'Level', value: ticketDetails.level, inline: true },
        { name: 'Budget', value: ticketDetails.budget, inline: true }
      )
      .setFooter('Submitted')
      .setThumbnail(`https://i.imgur.com/E7PB9cr.gif`)
      .setTimestamp();
  }
}
