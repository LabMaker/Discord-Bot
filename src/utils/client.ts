import { Client, ClientOptions, Collection, Intents } from 'discord.js';
import { APIHandler } from '../data/apiHandler';
import Command from './Base/Command';
import Event from './Base/Event';

export default class DiscordClient extends Client {
  private _commands = new Collection<string, Command>();
  private _events = new Collection<string, Event>();
  private _apiHandler = new APIHandler();

  private _prefix = '?';

  constructor(options?: ClientOptions) {
    super(options);
  }

  get commands(): Collection<string, Command> {
    return this._commands;
  }

  get events(): Collection<string, Event> {
    return this._events;
  }

  get prefix(): string {
    return this._prefix;
  }

  get API(): APIHandler {
    return this._apiHandler;
  }

  set prefix(prefix: string) {
    this.prefix = prefix;
  }
}
