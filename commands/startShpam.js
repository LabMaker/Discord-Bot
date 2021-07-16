module.exports = {
  name: "startshpam",
  description: "starts shpam",
  async execute(message, args) {
    //Checks

    setInterval(function () {
      message.channel.send(
        "<@220693271481942017> respond in 30mins or i send email to ur teacher"
      );
    }, 5000);
  },
};
