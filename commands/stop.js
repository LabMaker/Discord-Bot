const axios = require("axios");
module.exports = {
  name: "stop",
  description: "Stops the current ticket",
  execute(message, args) {
    if (!args[0]) return message.channel.send("Usage: !stop <@Ticket Id>");
    ticketID = message.channel.name.toLowerCase().replace("ticket-", "");

    if (args[0] != ticketID) {
      return message.channel.send(`Ticket ID not created by ${message.member}`);
    }

    message.channel.send(
      `Stopped Ticket Creation. If you would like to restart type !start ${ticketID}`
    );
  },
};
