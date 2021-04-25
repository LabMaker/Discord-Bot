const Keyv = require("keyv");

module.exports = {
  name: "start",
  description: "Starts the ticket again",
  async execute(message, args) {
    if (!args[0]) return message.channel.send("Usage: !stop <@Ticket Id>");
    ticketID = message.channel.name.toLowerCase().replace("ticket-", "");

    if (args[0] != ticketID) {
      return message.channel.send(`Ticket ID not created by ${message.member}`);
    }

    const ticket = new Keyv(process.env.DB_CONN_STRING, {
      namespace: ticketID,
    });

    await ticket.clear();

    message.channel.send(
      `Started New Ticket, if you would like to stop the ticket use !stop ${ticketID}`
    );

    await ticket.set("submitted", false);

    channel.send(
      `**Is this an exam, assignment or homework sheet?** Include the subject as well.`
    );
    ticket = null;
  },
};
