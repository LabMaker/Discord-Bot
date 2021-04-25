const Keyv = require("keyv");

module.exports = {
  name: "stop",
  description: "Stops the current ticket",
  async execute(message, args) {
    if (!args[0]) return message.channel.send("Usage: !stop <@Ticket Id>");
    ticketID = message.channel.name.toLowerCase().replace("ticket-", "");

    if (args[0] != ticketID) {
      return message.channel.send(`Ticket ID not created by ${message.member}`);
    }

    const ticket = new Keyv(process.env.DB_CONN_STRING, {
      namespace: ticketID,
    });
    await ticket.set("submitted", true);

    message.channel.send(
      `Stopped Ticket Creation. If you would like to restart type !start ${ticketID}`
    );
  },
};
