require("dotenv").config();

const Discord = require("discord.js");
const fs = require("fs");
const Keyv = require("keyv");
const keyv = new Keyv(process.env.DB_CONN_STRING);
const client = new Discord.Client();
require("discord-buttons")(client);
const { MessageButton } = require("discord-buttons");
const { GetConfig, GetPayments } = require("./utils/APIHelper.js");
const { sendLog } = require("./utils/logChannel.js");
const { execute } = require("./utils/AutoMod");

let ticketNum = process.env.TICKET_NUM;
let config = "";
client.commands = new Discord.Collection();
const commandFiles = fs
  .readdirSync("./commands/")
  .filter((file) => file.endsWith("js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

keyv.on("error", (err) => console.log("Connection Error e", err));

client.on("ready", async () => {
  await GetConfig().then((data) => {
    config = data;
    client.user.setPresence({
      activity: { name: config.activity, type: config.type },
      status: config.status,
    });
  });
  console.log("Started");
});

client.on("message", async (message) => {
  await GetConfig()
    .then((data) => {
      config = data;
      if (message.author.id === "830423278015217714" && config.autoReact) {
        message.react("🥱");
      }

      if (message.channel.id == "863424666052198410" && !message.author.bot) {
        message.delete();
        message
          .reply("This is a log channel please use the main channel")
          .then((msg) => {
            msg.delete({ timeout: 5000 });
          });
        return;
      }
      if (message.author.bot) {
        return;
      }

      if (!message.content.startsWith(process.env.prefix)) {
        execute(message, client);

        const ticCommand = client.commands.get("ticket");
        ticCommand.execute(message, client);

        //command.execute("ticket");
        return;
      }

      const args = message.content.slice(process.env.prefix.length).split(/ +/);
      const commandName = args.shift().toLowerCase();

      if (!client.commands.has(commandName)) return;

      const command = client.commands.get(commandName);
      try {
        command.execute(message, args, config);
      } catch (error) {
        console.error(error);
        message.reply("there was an error trying to execute that command!");
      }
    })
    .catch((error) => console.error(error));
});

client.on("guildMemberAdd", async (member) => {
  await GetConfig().then((data) => {
    config = data;

    if (!config.autoTicket) {
      return;
    }

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
});

client.on("presenceUpdate", async (oldPresence, newPresence) => {
  await GetConfig().then((data) => {
    config = data;

    if (!config.autoSwitch) {
      return;
    }

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

    const tarmac = client.users.cache.find(
      (u) => u.id === "827212859447705610"
    );
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
});

client.on("channelCreate", async (channel) => {
  let x = channel.guild.me.joinedTimestamp / 1000;
  if (x >= x + 10) return; // if the bot just joined the server the channelcreate event will get activated after 10 sec
  if (channel.parent.name.toLowerCase() != "open orders") return;

  ticketID = channel.name.toLowerCase().replace("ticket-", "");

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
  //Possible Rewrite adding this to the WebAPI (is this Unsafe? would have to encrypto data on API if we did this)
  await GetPayments().then((payments) => {
    const backButton = new MessageButton()
      .setStyle("gray")
      .setLabel("<")
      .setID("back");

    if (button.id == "back") {
      button.message.delete();
      const command = client.commands.get("pay");
      return command.execute(button.message, "", config);
    }

    let paymentButtons = [];

    payments.forEach((payment) => {
      if (button.id === payment.name) {
        button.channel.send(`${payment.name}: ${payment.value}`);
        return button.reply.defer();
      } else if (button.id === payment.type) {
        let tempButton = new MessageButton()
          .setStyle("blurple")
          .setLabel(payment.name)
          .setID(payment.name);

        paymentButtons.push(tempButton);
      }
    });

    if (paymentButtons.length > 0) {
      paymentButtons.push(backButton);
      button.message.delete();
      button.channel.send("Our Payment Methods", {
        buttons: paymentButtons,
      });
    }
  });
});

client.login(process.env.token);
