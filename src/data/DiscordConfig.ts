import { API } from '../utils/Base/API';
import { GuildConfigDto } from './dtos/guildConfig.dto';
import axios from 'axios';

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
    return (
      await axios.post(this.getUrl(), {
        _id,
      })
    ).data;
  }

  async update(updatedConfig: GuildConfigDto): Promise<GuildConfigDto> {
    return (await axios.put(this.getUrl(), updatedConfig)).data;
  }
}
