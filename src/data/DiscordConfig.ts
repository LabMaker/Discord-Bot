import { API } from '../utils/Base/API';
import { GuildConfigDto } from './dtos/guildConfig.dto';
import { PaymentDto } from './dtos/payment.dto';

export class DiscordConfigAPI extends API {
  constructor() {
    super('discord/config');
  }

  async getAll(): Promise<GuildConfigDto[]> {
    return await this.get();
  }

  async getOne(id: string): Promise<GuildConfigDto> {
    const url = this.getUrl() + id;

    return await this.get(url);
  }

  async create(_id: string): Promise<GuildConfigDto> {
    const paymentConfigId = 0;

    return await this.post({ _id, paymentConfigId });
  }

  async update(updatedConfig: GuildConfigDto): Promise<GuildConfigDto> {
    return await this.put(updatedConfig);
  }

  //Pointless creating PaymentsAPI Class for one call so for now im placing it here
  async getPayments(nodeId: Number): Promise<PaymentDto[]> {
    const url =
      this.getUrl().substring(0, this.getUrl().length - 7) +
      `payment/${nodeId}`;

    return await this.get(url);
  }
}
