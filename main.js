require("dotenv").config();
const Discord = require("discord.js");
const fs = require("fs");
const Keyv = require("keyv");
const keyv = new Keyv(process.env.DB_CONN_STRING);
const client = new Discord.Client();
const { sendLog } = require("./utils/logChannel.js");
var cron = require("cron");

function test() {
  client.channels
    .fetch("853687787333353493")
    .then((channel) => channel.send("!d bump"));
}

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
  let job1 = new cron.CronJob("0 5 */2 * * *", test); // fires every day, at 01:05:01 and 13:05:01

  job1.start();
  test();
  console.log("Bot is Online!");

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
