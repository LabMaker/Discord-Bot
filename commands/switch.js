const axios = require('axios');
require('dotenv').config();
module.exports = {
  name: 'switch',
  description: 'Switch Message',
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

    //Future Update: Get message content frombody and auto append discord tag to correct place
    const customMessage = ` I can help you out. Send me a friend request on Discord at ${user.username}#${user.discriminator}.`;
    postURI = process.env.API_SITE + 'bot/updateMessage';

    axios.post(postURI, {
      pmBody: customMessage,
    });

    message.channel.send(customMessage);
  },
};
