const axios = require("axios");
module.exports = {
  name: "switch",
  description: "Switch Message",
  execute(message, args) {
    if (!args[0]) return message.channel.send("Usage: !switch <@User>");

    user = message.mentions.users.first();

    //ID was provided
    if (!user) {
      user = message.guild.users.fetch(args[0]);
      vf = user.id;
      console.log(user);
    }
    const customMessage = `${user.username}#${user.discriminator} Add me on Discord`;

    axios.post("https://reddit-api-bot.herokuapp.com/bot/updateMessage", {
      pmBody: customMessage,
    });
    message.channel.send(
      `Changed Config To "${customMessage} Add me on Discord"`
    );
  },
};

function getUserFromMention(mention) {
  if (!mention) return;

  if (mention.startsWith("<@") && mention.endsWith(">")) {
    mention = mention.slice(2, -1);

    if (mention.startsWith("!")) {
      mention = mention.slice(1);
    }

    return client.users.cache.get(mention);
  }
}
