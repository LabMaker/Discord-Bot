import { TextChannel } from 'discord.js';

export function getArgsFromMsg(
  msg: string,
  prefixLn: number
): { commandName: string; args?: string[] } {
  // Args including the command name
  let args = msg.slice(prefixLn).split(/ +/);

  return {
    commandName: args[0],
    args: args.slice(1),
  };
}

/**
 * Get ticket number from a channel.
 * @param channel Ticket text channel.
 * @returns Ticket number.
 */
export function getTicketNo(channel: TextChannel): string {
  // Channel must be under Open Orders category for it to be a valid ticket.
  if (channel.parent == null || channel.parent.name != 'Open Orders')
    return null;

  const ticketNo = channel.name.toLowerCase().replace('ticket-', '');

  if (isNaN(Number(ticketNo))) {
    channel.send(`Invalid Ticket ID`);
    return null;
  }

  return ticketNo;
}
