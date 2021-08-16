import { DiscordConfigAPI, TicketAPI } from 'labmaker-api-wrapper';

export class APIHandler {
  public DiscordConfig = new DiscordConfigAPI();
  public Ticket = new TicketAPI();
}
