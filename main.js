require("dotenv").config();

const Discord = require("discord.js");
const fs = require("fs");
const Keyv = require("keyv");
const keyv = new Keyv(process.env.DB_CONN_STRING);
const client = new Discord.Client();
require("discord-buttons")(client);
const { MessageButton } = require("discord-buttons");
const { sendLog } = require("./utils/logChannel.js");
let ticketNum = process.env.TICKET_NUM;
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
  console.log("Started");
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

client.on("guildMemberAdd2", (member) => {
  member.guild.fetch();
  guild = member.guild;
  const everyoneRole = guild.roles.everyone;
  const helperRole = guild.roles.cache.find((role) => {
    return role.name === "Helper";
  });

  guild.channels
    .create(`Ticket-0${ticketNum}`, {
      type: "text",
      parent: "818879990774628374",
      permissionOverwrites: [
        { id: everyoneRole, deny: ["VIEW_CHANNEL"] },
        { id: member.id, allow: ["VIEW_CHANNEL"] },
        { id: helperRole, allow: ["VIEW_CHANNEL"] },
      ],
    })
    .then((channel) => {
      channel.send(`<@${member.id}> Welcome`);
      const ticketEmbed = new Discord.MessageEmbed()
        .setColor("#10F9AB")
        .setDescription(
          `A Support member will be with you shortly, please answer the questions below. `
        )
        .setFooter("Task Place Ticket Tool");
      channel.send(ticketEmbed);
    });
  ticketNum++;
});

client.on("presenceUpdate2", (oldPresence, newPresence) => {
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

client.on("clickButton", async (button) => {
  if (button.id === "crypto") {
    let ethButton = new MessageButton()
      .setStyle("blurple")
      .setLabel("ETH")
      .setID("eth");

    let btcAddress = new MessageButton()
      .setStyle("red")
      .setLabel("BTC")
      .setID("btc");

    let ltcAddress = new MessageButton()
      .setStyle("blurple")
      .setLabel("LTC")
      .setID("ltc");

    let backButton = new MessageButton()
      .setStyle("gray")
      .setLabel("<")
      .setID("back");
    button.message.delete();

    button.channel.send("Our Crypto Methods", {
      buttons: [ethButton, btcAddress, ltcAddress, backButton],
    });
  } else if (button.id === "venmo") {
    button.channel.send("@assignmenthelper");
  } else if (button.id === "zelle") {
    button.channel.send("yegireddilikhita@gmail.com");
  } else if (button.id === "eth") {
    button.channel.send(`ETH: 0xCb3fA82D02751Db19ca9F891D99225FD70bb9c26`);
  } else if (button.id === "btc") {
    button.channel.send(`BTC: 3BomLGxJbTKJ648hkWzHA9MX6vgfhPX3A9`);
  } else if (button.id === "ltc") {
    button.channel.send(`LTC: MFn7mwJXkCGUVDxKRsLX1f8XSe2hrt916W`);
  } else if (button.id === "back") {
    let cryptoButton = new MessageButton()
      .setStyle("green")
      .setLabel("Crypto")
      .setID("crypto");

    let venmoButton = new MessageButton()
      .setStyle("blurple")
      .setLabel("Venmo")
      .setID("venmo");

    let zelleButton = new MessageButton()
      .setStyle("red")
      .setLabel("Zelle")
      .setID("zelle");

    button.message.delete();

    button.channel.send("Our Payment Methods", {
      buttons: [cryptoButton, venmoButton, zelleButton],
    });
  }

  button.reply.defer();
});

client.login(process.env.token);
