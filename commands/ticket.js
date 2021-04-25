const { sendLog } = require("./../utils/logChannel.js");
require("dotenv").config();

module.exports = {
  name: "ticket",
  description: "Handles new Ticket",
  async execute(message, client) {
    if (
      message.channel.parent == null ||
      message.channel.parent.name != "Open Orders"
    ) {
      return;
    }

    const Keyv = require("keyv");
    const Discord = require("discord.js");
    ticketID = message.channel.name.toLowerCase().replace("ticket-", "");

    const ticket = new Keyv(process.env.DB_CONN_STRING, {
      namespace: ticketID,
    });

    const submitted = await ticket.get("submitted");
    const type = await ticket.get("type");
    const time = await ticket.get("time");
    const level = await ticket.get("level");
    const budget = await ticket.get("budget");

    if (submitted || submitted == undefined) {
      return;
    }

    if (type == undefined) {
      await ticket.set("type", message.content);
      message.channel.send(
        `**What date & time is the ${message.content}?** (Include Timezone)`
      );
    } else if (time == undefined) {
      await ticket.set("time", message.content);
      message.channel.send(
        `**What level of education is this including year?** (University/College)`
      );
    } else if (level == undefined) {
      await ticket.set("level", message.content);
      message.channel.send(
        `**What is your budget?** (Include currency if isn't \`£ for GBP\` or \`$ for USD\`)`
      );
    } else if (budget == undefined) {
      await ticket.set("budget", message.content);
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
          { name: "Budget", value: message.content, inline: true }
        )
        .setFooter("Submitted")
        .setThumbnail("https://i.imgur.com/gPYO6A1.gif")
        .setTimestamp();
      await ticket.set("submitted", true);

      message.channel.send(ticketEmbed);
      message.channel.send(
        `**Your Ticket has been submitted!** A helper will be with you shortly.`
      );
      sendLog(client, ticketEmbed);
    }
  },
};
