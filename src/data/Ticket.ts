import { API } from '../utils/Base/API';
import { TicketDto } from './dtos/ticket.dto';

export class TicketAPI extends API {
  constructor() {
    super('discord/ticket');
  }

  async getOne(serverId: string, ticketId: string): Promise<TicketDto> {
    const url = this.getUrl();
    const updatedUrl = `${url}${serverId}/${ticketId}`;
    return await this.get(updatedUrl);
  }

  async getAll(serverId: string): Promise<TicketDto[]> {
    const url = this.getUrl() + serverId;
    return await this.get(url);
  }

  async create(
    serverId: string,
    ticketId: Number,
    channelId: string
  ): Promise<TicketDto | any> {
    const options = { serverId, ticketId, channelId };
    return await this.post(options);
  }

  async update(updatedTicket: TicketDto): Promise<TicketDto | any> {
    return await this.put(updatedTicket);
  }

  async delete(ticketId: string): Promise<TicketDto | any> {
    const url = this.getUrl() + ticketId;
    return await this.delete(url);
  }
}
