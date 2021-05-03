require("dotenv").config();

module.exports = {
  sendLog(client, msg) {
    const serverID = "826449038727184404";
    const channelID = "835467376467116053";

    const talkHere = ["826449038727184404", "835467376467116053"];
    const chingJo = ["818838130815795241", "838759492829184011"];

    client.guilds
      .fetch(talkHere[0])
      .then(async (guild) => {
        const logChannel = guild.channels.cache.get(talkHere[1]);

        if (logChannel) {
          setTimeout(() => {
            logChannel.send(msg);
          }, 1500);
        }
      })
      .catch(console.error);

    client.guilds
      .fetch(chingJo[0])
      .then(async (guild) => {
        const logChannel = guild.channels.cache.get(chingJo[1]);

        if (logChannel) {
          setTimeout(() => {
            logChannel.send(msg);
          }, 1500);
        }
      })
      .catch(console.error);
  },
};
