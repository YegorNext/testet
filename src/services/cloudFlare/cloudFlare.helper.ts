import { CloudflareClient } from './cloudFlareClient';
import { CloudflareZoneResponse } from './cloudFlareZoneResponse';

export class CloudflareHelper {
  constructor(private client: CloudflareClient) {}

  public async createZone(domain: string): Promise<CloudflareZoneResponse> {
    const response = await this.client.post('/zones', { name: domain, jump_start: true });
    if (!response.data.success) throw new Error(JSON.stringify(response.data.errors));
    return response.data.result;
  }

  public async getZone(domain: string): Promise<CloudflareZoneResponse | null> {
    const response = await this.client.get('/zones', { name: domain });
    if (!response.data.success || !response.data.result || response.data.result.length === 0)
      return null;
    return response.data.result[0];
  }

  public async createARecord(zoneId: string, name: string, ip: string, proxied = true) {
    const response = await this.client.post(`/zones/${zoneId}/dns_records`, {
      type: 'A', name, content: ip, proxied
    });
    if (!response.data.success) throw new Error(JSON.stringify(response.data.errors));
    return response.data.result;
  }

  public async createCnameRecord(zoneId: string, name: string, target: string, proxied = true) {
    const response = await this.client.post(`/zones/${zoneId}/dns_records`, {
      type: 'CNAME', name, content: target, proxied
    });
    if (!response.data.success) throw new Error(JSON.stringify(response.data.errors));
    return response.data.result;
  }
}