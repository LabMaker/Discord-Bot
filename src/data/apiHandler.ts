import {
  DiscordConfigAPI,
  RedditConfigAPI,
  TicketAPI,
} from 'labmaker-api-wrapper';

export class APIHandler {
  public DiscordConfig = new DiscordConfigAPI();
  public Ticket = new TicketAPI();
  public RedditConfig = new RedditConfigAPI();
}
