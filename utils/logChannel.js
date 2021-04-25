require("dotenv").config();

module.exports = {
  sendLog(client, msg) {
    const serverID = "826449038727184404";
    const channelID = "835467376467116053";

    client.guilds
      .fetch(serverID)
      .then(async (guild) => {
        const logChannel = guild.channels.cache.get(channelID);

        if (logChannel) {
          setTimeout(() => {
            logChannel.send(msg);
          }, 1500);
        }
      })
      .catch(console.error);
  },
};
