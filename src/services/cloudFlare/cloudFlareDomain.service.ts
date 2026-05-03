import { CloudflareClientProvider } from './cloudFlareClientProvider';
import { CloudflareHelper } from './cloudFlare.helper';

export class CloudFlareDomainService {
  constructor(private clientProvider: CloudflareClientProvider) {}

  public async connectDomain(domain: string, serverIp: string, accountName: string) {
    const client = await this.clientProvider.getClient(accountName);
    const helper = new CloudflareHelper(client);

    let zone = await helper.getZone(domain);
    if (!zone) zone = await helper.createZone(domain);

    await helper.createARecord(zone.id, domain, serverIp);
    await helper.createCnameRecord(zone.id, 'www', domain);

    return zone;
  }
}