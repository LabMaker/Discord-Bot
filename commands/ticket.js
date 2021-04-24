const Keyv = require("keyv");
const Discord = require("discord.js");

module.exports = {
  name: "ticket",
  description: "Handles new Ticket",
  async execute(message, client) {
    ticketID = message.channel.name.substr(8);
    const ticket = new Keyv("mysql://root:@localhost:3306/discord_bot", {
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
        `What Date & Time is the ${message.content} (Include Timezone)`
      );
    } else if (time == undefined) {
      await ticket.set("time", message.content);
      message.channel.send(
        `What Level of Education is this Including Year (University/College)`
      );
    } else if (level == undefined) {
      await ticket.set("level", message.content);
      message.channel.send(`What is your budget?`);
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
        `Your Ticket has been submitted a helper should be with you shortly`
      );

      client.guilds
        .fetch("826449038727184404")
        .then(async (guild) => {
          logChannel = guild.channels.cache.get("835467376467116053");
          if (logChannel)
            setTimeout(() => {
              logChannel.send(ticketEmbed);
            }, 1500);
        })
        .catch(console.error);
    }
  },
};
