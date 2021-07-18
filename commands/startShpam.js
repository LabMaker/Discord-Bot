module.exports = {
  name: "startshpam",
  description: "starts shpam",
  async execute(message, args) {
    //Checks

    setInterval(function () {
      message.channel.send("Test");
    }, 5000);
  },
};
