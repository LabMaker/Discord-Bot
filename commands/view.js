const Keyv = require("keyv");
const Discord = require("discord.js");

module.exports = {
  name: "view",
  description: "Shows ticket Status",
  async execute(message, args) {
    if (!args[0]) return message.channel.send("Usage: !ticket <@ID>");

    ticketID = message.channel.name.toLowerCase().replace("ticket-", "");
    const ticket = new Keyv(process.env.DB_CONN_STRING, {
      namespace: ticketID,
    });

    const submitted = await ticket.get("submitted");
    const type = await ticket.get("type");
    const time = await ticket.get("time");
    const level = await ticket.get("level");
    const budget = await ticket.get("budget");

    const ticketEmbed = new Discord.MessageEmbed()
      .setColor("#10F9AB")
      .setTitle(type)
      .setAuthor(
        `${message.member.user.username}#${message.member.user.discriminator} - Ticket ${ticketID}`,
        `${message.member.user.displayAvatarURL({
          format: "gif",
          dynamic: true,
        })}`,
        message.url
      )
      .addFields(
        { name: "Time", value: time, inline: false },
        { name: "Level", value: level, inline: true },
        { name: "Budget", value: budget, inline: true }
      )
      .setFooter("Submitted")
      .setThumbnail("https://i.imgur.com/gPYO6A1.gif")
      .setTimestamp();
    message.channel.send(ticketEmbed);
  },
};