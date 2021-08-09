export class API {
  private APIUrl = 'http://localhost:3000';

  constructor(private APIBase: string) {}
  getUrl() {
    return `${this.APIUrl}/${this.APIBase}/`;
  }
}
