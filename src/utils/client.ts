import { Client, ClientOptions, Collection } from "discord.js";
import Command from "./Base/Command";
import Event from "./Base/Event";

export default class DiscordClient extends Client {
  private _commands = new Collection<string, Command>();
  private _events = new Collection<string, Event>();
  private _prefix = "?";

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

  set prefix(prefix: string) {
    this.prefix = prefix;
  }
}
