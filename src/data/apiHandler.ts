import { DiscordConfigAPI } from './DiscordConfig';
import { TicketAPI } from './Ticket';

export class APIHandler {
  public DiscordConfig = new DiscordConfigAPI();
  public Ticket = new TicketAPI();
}
