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
  client.user.setPresence({
    activity: { name: "Helping Get Work Done", type: "PLAYING" },
    status: "online",
  });
});

client.on("message", (message) => {
  /*if (message.author.id == "830423278015217714") {
    message.delete();
  } */

  if (message.channel.id == "835467376467116053" && !message.author.bot) {
    message.delete();
    message
      .reply("This is a log channel please use the main channel")
      .then((msg) => {
        msg.delete({ timeout: 5000 });
      });
    return;
  }

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

  if (commandName == "restart") {
    message.channel
      .send("Restarting...")
      .then((msg) => client.destroy())
      .then(() => client.login(process.env.token));

    return;
  }
  if (!client.commands.has(commandName)) return;

  const command = client.commands.get(commandName);
  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply("there was an error trying to execute that command!");
  }
});

client.on("presenceUpdate", (oldPresence, newPresence) => {
  let member = newPresence.member;
  // User id of the user you're tracking status.

  if (newPresence.guild.id != "826449038727184404") {
    return;
  }

  //Check if not Dias || Tarmac
  if (
    newPresence.member.id != 827212859447705610 &&
    newPresence.member.id != 818867515157381140
  ) {
    return;
  }

  const tarmac = client.users.cache.find((u) => u.id === "827212859447705610");
  const dias = client.users.cache.find((u) => u.id === "818867515157381140");

  const tarmacStatus = tarmac.presence.status;
  const diasStatus = dias.presence.status;

  let messageDiscrim = "";
  let switchedUserID = "";

  if (tarmacStatus == "online" && diasStatus == "online") {
    return;
  }

  if (
    (tarmacStatus == "offline" || tarmacStatus == "idle") &&
    (diasStatus == "offline" || diasStatus == "idle")
  ) {
    return;
  } else if (tarmacStatus == "offline" || tarmacStatus == "idle") {
    messageDiscrim = `${dias.username}#${dias.discriminator}`;
    switchedUser = dias.id;
  } else if (diasStatus == "offline" || diasStatus == "idle") {
    messageDiscrim = `${tarmac.username}#${tarmac.discriminator}`;
    switchedUser = tarmac.id;
  }

  const customMessage = `Reach me out on discord which is ${messageDiscrim} Add me ill respond ASAP.`;

  postURI = process.env.API_SITE + "bot/updateMessage";

  axios.post(postURI, {
    pmBody: customMessage,
  });
  client.channels
    .fetch("853967623673872385")
    .then((channel) => channel.send(`Switched to <@${switchedUser}>`));
});

client.on("channelCreate", (channel) => {
  let x = channel.guild.me.joinedTimestamp / 1000;
  if (x >= x + 10) return; // if the bot just joined the server the channelcreate event will get activated after 10 sec

  if (
    channel.parent == null ||
    channel.parent.name.toLowerCase() != "open orders"
  ) {
    return;
  }

  ticketID = channel.name.toLowerCase().replace("ticket-", "");
  /*sendLog(
    client,
    `A Ticket Was Created by with ID ${ticketID} <@342052641146142734>`
  ); */

  setTimeout(async () => {
    channel.send(
      `Welcome! I'm going to need some more information before I can find you a suitable tutor. (Enter !stop at Anytime to cancel).`
    );

    let ticket = new Keyv(process.env.DB_CONN_STRING, {
      namespace: ticketID,
    });

    await ticket.set("submitted", false);

    ticket = null;
    channel.send(`**Is this an exam, assignment or homework sheet?**`);
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
