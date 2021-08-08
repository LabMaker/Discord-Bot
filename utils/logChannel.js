require('dotenv').config();

module.exports = {
  sendLog(client, msg) {
    //ReWrite maybe to find all servers with Log Channel inside bot?
    const servers = [
      ['863423914230546462', '863424666052198410'], //Big Baller
      ['818838130815795241', '838759492829184011'], //ChingJo (Backup)
    ]; // SERVERID | CHANNELID

    servers.forEach((server) => {
      client.guilds
        .fetch(server[0])
        .then(async (guild) => {
          const logChannel = guild.channels.cache.get(server[1]);

          if (logChannel) {
            setTimeout(() => {
              logChannel.send(msg);
            }, 1500);
          }
        })
        .catch(console.error);
    });
  },
};
