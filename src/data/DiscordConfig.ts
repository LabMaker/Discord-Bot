import { API } from '../utils/Base/API';
import { GuildConfigDto } from './dtos/guildConfig.dto';
import axios from 'axios';
import { PaymentDto } from './dtos/payment.dto';

export class DiscordConfigAPI extends API {
  constructor() {
    super('discord/config');
  }

  async getAll(): Promise<GuildConfigDto[]> {
    return (await axios.get(this.getUrl())).data;
  }

  async getOne(id: string): Promise<GuildConfigDto> {
    const url = this.getUrl() + id;
    return (await axios.get(url)).data;
  }

  async create(_id: string): Promise<GuildConfigDto> {
    console.log(_id, this.getUrl());
    const paymentConfigId = 0;
    return (
      await axios.post(this.getUrl(), {
        _id,
        paymentConfigId,
      })
    ).data;
  }

  async update(updatedConfig: GuildConfigDto): Promise<GuildConfigDto> {
    return (await axios.put(this.getUrl(), updatedConfig)).data;
  }

  //Pointless creating PaymentsAPI Class for one call so for now im placing it here
  async getPayments(nodeId: string): Promise<PaymentDto[]> {
    const url =
      this.getUrl().substring(0, this.getUrl().length - 7) +
      `payment/${nodeId}`;

    return (await axios.get(url)).data;
  }
}
