const { sendLog } = require("./../utils/logChannel.js");
require("dotenv").config();

module.exports = {
  name: "ticket",
  description: "Handles new Ticket",
  async execute(message, client) {
    if (
      message.channel.parent == null ||
      message.channel.parent.name.toLowerCase() != "open orders"
    ) {
      return;
    }

    // If message was by an admin, don't count as message
    // answering ticket question and just return.
    let roles = message.member.roles.cache;
    if (
      roles.find((r) => r.name === "Admin") ||
      roles.find((r) => r.name === "Helper")
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
    const subject = await ticket.get("subject");
    const time = await ticket.get("time");
    const level = await ticket.get("level");
    const budget = await ticket.get("budget");

    if (submitted || submitted == undefined) {
      return;
    }

    if (type == undefined) {
      // Type is undefined, so the content of this message must be
      // answering the last question so we should set type to the msg content.
      // Then ask next question (in this case subject).
      await ticket.set("type", message.content);
      message.channel.send(`**What subject is the ${message.content}?**`);
    } else if (subject == undefined) {
      await ticket.set("subject", message.content);
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
        .setTitle(`${subject} ${type}`)
        .setAuthor(
          `${message.member.user.username}#${message.member.user.discriminator} - Ticket ${ticketID}`,
          `${message.member.user.displayAvatarURL({
            format: "png",
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
        .setThumbnail("https://i.imgur.com/E7PB9cr.gif")
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
