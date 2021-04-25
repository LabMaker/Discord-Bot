require("dotenv").config();
const Discord = require("discord.js");
const fs = require("fs");
const Keyv = require("keyv");
const keyv = new Keyv(process.env.DB_CONN_STRING);
const client = new Discord.Client();
const { sendLog } = require("./utils/logChannel.js");

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

  if (channel.parent == null || channel.parent.name != "Open Orders") {
    return;
  }

  ticketID = channel.name.toLowerCase().replace("ticket-", "");
  /*sendLog(
    client,
    `A Ticket Was Created by with ID ${ticketID} <@342052641146142734>`
  ); */

  setTimeout(async () => {
    channel.send(
      `Welcome! I'm going to need some more information before I can find you a suitable tutor. (Enter !stop ${ticketID} at Anytime to cancel).`
    );

    let ticket = new Keyv(process.env.DB_CONN_STRING, {
      namespace: ticketID,
    });

    await ticket.set("submitted", false);

    ticket = null;
    channel.send(
      `**Is this an exam, assignment or homework sheet?** Include the subject as well.`
    );
  }, 1500);
});

client.on("inviteCreate", async (invite) => {
  await invite.guild.fetch();
  let member = await invite.guild.members.fetch(invite.inviter.id);

  if (
    member.roles.cache.find((r) => r.name === "Admin") ||
    member.roles.cache.find((r) => r.name === "Helper")
  ) {
    console.log("Invite Creater has Admin/Helper Role");
    return;
  }

  sendLog(client, `An Invite Was Created by ${invite.inviter}`);
});

client.login(process.env.token);
