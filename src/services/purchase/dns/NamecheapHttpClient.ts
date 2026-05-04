import axios, { AxiosInstance } from 'axios';

export class NamecheapHttpClient {
  private readonly client: AxiosInstance;

  constructor(baseUrl: string) {
    this.client = axios.create({
      baseURL: baseUrl,
      timeout: 10000,
    });
  }

  public async get(params: Record<string, string>): Promise<string> {
    const response = await this.client.get('', { params });
    return response.data;
  }
}