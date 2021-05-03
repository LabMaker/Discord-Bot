const Keyv = require("keyv");

module.exports = {
  name: "start",
  description: "Starts the ticket again",
  async execute(message, args) {
    ticketID = message.channel.name.toLowerCase().replace("ticket-", "");

    if (!Number.isInteger(ticketID)) {
      return message.channel.send(
        `Tickets can only be created in ticket category ${message.member}`
      );
    }

    const ticket = new Keyv(process.env.DB_CONN_STRING, {
      namespace: ticketID,
    });

    await ticket.clear();

    message.channel.send(
      `Started New Ticket, if you would like to stop the ticket use !stop ${ticketID}`
    );

    await ticket.set("submitted", false);

    message.channel.send(
      `**Is this an exam, assignment or homework sheet?** Include the subject as well.`
    );
  },
};
