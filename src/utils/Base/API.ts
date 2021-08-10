import axios from 'axios';

export class API {
  private APIUrl = 'http://localhost:3000';

  constructor(private APIBase: string) {
    this.APIUrl = `${this.APIUrl}/${this.APIBase}/`;
  }

  getUrl() {
    return this.APIUrl;
  }

  async get(url?: string): Promise<any> {
    try {
      if (!url) {
        return (await axios.get(this.APIUrl)).data;
      } else {
        return (await axios.get(url)).data;
      }
    } catch (err) {
      console.error(err.message);
      return null;
    }
  }

  async post(options: any, url?: string): Promise<any> {
    try {
      if (!url) {
        return (await axios.post(this.APIUrl, options)).data;
      } else {
        return (await axios.post(url, options)).data;
      }
    } catch (err) {
      console.error(err.message);
      return null;
    }
  }

  async put(options: any, url?: string): Promise<any> {
    try {
      if (!url) {
        return (await axios.put(this.APIUrl, options)).data;
      }
      return await axios.put(url, options);
    } catch (err) {
      console.error(err.message);
      return null;
    }
  }
}
