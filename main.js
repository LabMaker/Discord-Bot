const Discord = require("discord.js");
const fs = require("fs");
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

client.once("ready", () => {
  console.log("Work Connect is Online!");
  /*client.user.setPresence({ activity: { name: '' }, status: 'invisible' })
        .then(console.log)
        .catch(console.error); */
});

client.on("message", (message) => {
  if (!message.content.startsWith(process.env.prefix) || message.author.bot)
    return;

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
  if (x <= x + 10) return; // if the bot just joined the server the channelcreate event will get activated after 10 sec

  console.log("Valid event!");
  channel.send("Test");
});

client.login(process.env.token);
