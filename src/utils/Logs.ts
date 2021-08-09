import { Message, MessageEmbed } from 'discord.js';

export default class Logs {
  static async GenerateEmbed(
    ticketId: string,
    message: Message
  ): Promise<MessageEmbed> | null {
    // const TicketDetails = await Ticket.findOne({ ticketId });
    // return new MessageEmbed()
    //   .setColor('#10F9AB')
    //   .setTitle(TicketDetails.type)
    //   .setAuthor(
    //     `${message.member.user.username}#${message.member.user.discriminator} - Ticket ${ticketId}`,
    //     `${message.member.user.displayAvatarURL({
    //       format: 'gif',
    //       dynamic: true,
    //     })}`,
    //     message.url
    //   )
    //   .addFields(
    //     { name: 'Time', value: TicketDetails.time, inline: false },
    //     { name: 'Level', value: TicketDetails.level, inline: true },
    //     { name: 'Budget', value: TicketDetails.budget, inline: true }
    //   )
    //   .setFooter('Submitted')
    //   .setThumbnail(`https://i.imgur.com/E7PB9cr.gif`)
    //   .setTimestamp();
    return null;
  }
}
