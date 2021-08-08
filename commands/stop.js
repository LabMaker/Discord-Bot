const Keyv = require('keyv');

module.exports = {
  name: 'stop',
  description: 'Stops the current ticket',
  async execute(message, args) {
    ticketID = message.channel.name.toLowerCase().replace('ticket-', '');

    if (isNaN(ticketID)) {
      return message.channel.send(
        `Tickets can only be created in ticket category ${message.member}`
      );
    }

    const ticket = new Keyv(process.env.DB_CONN_STRING, {
      namespace: ticketID,
    });

    await ticket.set('submitted', true);

    message.channel.send(
      `Stopped Ticket Creation. If you would like to restart type !start`
    );
  },
};
