const axios = require("axios");
module.exports = {
  name: "switch",
  description: "Switch Message",
  execute(message, args) {
    user = message.mentions.users.first();

    if (!args[0]) {
      user = message.author;
    }

    //ID was provided
    if (!user) {
      user = message.guild.users.fetch(args[0]);
      vf = user.id;
      console.log(user);
    }
    const customMessage = `${user.username}#${user.discriminator} Add me on Discord`;

    /*axios.post("https://reddit-api-bot.herokuapp.com/bot/updateMessage", {
      pmBody: customMessage,
    }); */

    message.channel.send(
      `Changed Config To "${customMessage} Add me on Discord"`
    );
  },
};
