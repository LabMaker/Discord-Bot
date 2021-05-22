const axios = require("axios");
require("dotenv").config();
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

    postURI = process.env.API_URL + "/bot/updateMessage";

    axios.post(postURI, {
      pmBody: customMessage,
    });

    message.channel.send(
      `Changed Config To "${customMessage} Add me on Discord"`
    );
  },
};
