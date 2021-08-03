module.exports = {
  name: "checkguilds",
  description: "Clear Messages",
  async execute(message, args, config, client) {
    console.log(client.guilds.cache);
  },
};
