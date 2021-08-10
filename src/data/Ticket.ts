import { API } from '../utils/Base/API';
import { GuildConfigDto } from './dtos/guildConfig.dto';
import axios from 'axios';
import { TicketDto } from './dtos/ticket.dto';

export class TicketAPI extends API {
  constructor() {
    super('discord/ticket');
  }

  async getOne(serverId: string, ticketId: string): Promise<TicketDto> {
    try {
      const url = this.getUrl();
      const updatedUrl = `${url}${serverId}/${ticketId}`;
      return (await axios.get(updatedUrl)).data;
    } catch (err) {
      console.error('Error Occured');
    }
  }

  async getAll(serverId: string): Promise<TicketDto[]> {
    const url = this.getUrl() + serverId;

    return (await axios.get(url)).data;
  }

  async create(
    serverId: string,
    ticketId: Number,
    channelId: string
  ): Promise<TicketDto | any> {
    await axios
      .post(this.getUrl(), {
        serverId,
        ticketId,
        channelId,
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async update(updatedTicket: TicketDto): Promise<TicketDto | any> {
    return (await axios.put(this.getUrl(), updatedTicket)).data;
  }
}
