module.exports = {
  name: "clear",
  description: "Clear Messages",
  async execute(message, args) {
    //Checks
    if (!args[0]) return message.reply("Please Specify A Number");
    if (isNaN(args[0])) return message.reply("Please Enter a Valid Number");
    if (args[0] > 100 || args[0] < 1)
      return message.reply("Number Must Be between 1-100");

    const amount = parseInt(args[0]);
    message.channel.bulkDelete(amount);
  },
};
