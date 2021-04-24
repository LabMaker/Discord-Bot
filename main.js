const { Console } = require("console");
const Discord = require("discord.js");
const fs = require("fs");
const Keyv = require("keyv");
const keyv = new Keyv("mysql://root:@localhost:3306/discord_bot");
require("dotenv").config();

const client = new Discord.Client();

client.commands = new Discord.Collection();
const commandFiles = fs
  .readdirSync("./commands/")
  .filter((file) => file.endsWith("js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

keyv.on("error", (err) => console.log("Connection Error", err));

client.once("ready", () => {
  console.log("Work Connect is Online!");
  /*client.user.setPresence({ activity: { name: '' }, status: 'invisible' })
        .then(console.log)
        .catch(console.error); */
});

client.on("message", (message) => {
  if (!message.content.startsWith(process.env.prefix) || message.author.bot) {
    if (message.author.bot) {
      return;
    }
    const ticCommand = client.commands.get("ticket");
    ticCommand.execute(message, client);
    //command.execute("ticket");
    return;
  }

  const args = message.content.slice(process.env.prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();
  //const id = client.guilds.get("GUILD-ID");

  if (!client.commands.has(commandName)) return;

  const command = client.commands.get(commandName);
  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply("there was an error trying to execute that command!");
  }
});

client.on("channelCreate", (channel) => {
  let x = channel.guild.me.joinedTimestamp / 1000;
  if (x >= x + 10) return; // if the bot just joined the server the channelcreate event will get activated after 10 sec
  ticketID = channel.name.substr(8);

  client.guilds
    .fetch("826449038727184404")
    .then((guild) => {
      logChannel = guild.channels.cache.get("835467376467116053");
      if (logChannel)
        setTimeout(() => {
          logChannel.send(
            `A Ticket Was Created by with ID ${ticketID} <@342052641146142734>`
          );
        }, 1500);
    })
    .catch(console.error);

  setTimeout(async () => {
    channel.send(
      `Welcome, Im going to need some more information before i can find you a tutor. (Enter !stop ${ticketID} at Anytime to cancel).`
    );

    const ticket = new Keyv("mysql://root:@localhost:3306/discord_bot", {
      namespace: ticketID,
    });

    await ticket.set("submitted", false);

    channel.send(
      `Is This an Exam, Assignment or Homeworksheet? Include the subject aswell.`
    );
  }, 1500);
});

client.on("inviteCreate", (invite) => {
  client.guilds
    .fetch("826449038727184404")
    .then(async (guild) => {
      let member = await invite.guild.members.fetch(invite.inviter.id);

      if (
        member.roles.cache.find((r) => r.name === "Admin") ||
        member.roles.chache.find((r) => r.name === "Helper")
      ) {
        console.log("Invite Creater has Admin/Helper Role");
        return;
      }

      logChannel = guild.channels.cache.get("835467376467116053");
      if (logChannel)
        setTimeout(() => {
          logChannel.send(`An Invite Was Created by ${invite.inviter}`);
        }, 1500);
    })
    .catch(console.error);
});

client.login(process.env.token);
