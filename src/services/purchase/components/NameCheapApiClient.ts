import axios from 'axios';

export class NameCheapApiClient {
  public async execute(url: string): Promise<string> {
    const response = await axios.get(url);
    return response.data;
  }
}