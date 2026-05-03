import axios, { AxiosInstance } from 'axios';
import { prisma } from '../../utils/prisma';
import { CloudflareAccountEntity } from '../entities/../../entities/cloudflare-account.entity';

export class CloudflareClient {
  private client!: AxiosInstance;
  private account!: CloudflareAccountEntity;

  constructor(private accountName: string) {}

  private async loadAccount(): Promise<void> {
    const account = await prisma.cloudflareAccount.findUnique({
      where: { name: this.accountName },
    });

    if (!account) {
      throw new Error(`Cloudflare account with name "${this.accountName}" not found`);
    }

    this.account = new CloudflareAccountEntity(account);
    this.client = axios.create({
      baseURL: process.env.CLOUDFLARE_BASE_URL || 'https://api.cloudflare.com/client/v4', 
      headers: {
        Authorization: `Bearer ${this.account.apiToken}`,
        'Content-Type': 'application/json',
      },
    });
  }

  public async get(url: string, params?: any) {
    if (!this.client) await this.loadAccount();
    return this.client.get(url, { params });
  }

  public async post(url: string, data?: any) {
    if (!this.client) await this.loadAccount();
    return this.client.post(url, data);
  }
}