import { namecheapConfig } from '../config/namecheap.config';
import { DomainUtils } from './DomainUtils';

export class NamecheapRequestBuilder {
  static buildARecord(
    domain: string,
    ip: string,
    hostName: string = '@',
    ttl: number = 1800
  ): Record<string, string> {
    const { sld, tld } = DomainUtils.split(domain);

    return {
      apiuser: namecheapConfig.apiUser,
      apikey: namecheapConfig.apiKey,
      username: namecheapConfig.userName,
      ClientIp: namecheapConfig.clientIp,
      Command: 'namecheap.domains.dns.setHosts',
      SLD: sld,
      TLD: tld,
      HostName1: hostName,
      RecordType1: 'A',
      Address1: ip,
      TTL1: ttl.toString(),
    };
  }
}