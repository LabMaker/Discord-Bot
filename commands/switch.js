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

    const customMessage = `Hello, I am happy to help you out with your work! Send me a friend request at ${user.username}#${user.discriminator} and i can help you get your work done.`;

    postURI = process.env.API_SITE + "bot/updateMessage";

    axios.post(postURI, {
      pmBody: customMessage,
    });

    message.channel.send(customMessage);
  },
};
