import axios from 'axios';
import { parseStringPromise } from 'xml2js';
import { namecheapConfig } from '../config/namecheap.config';

export interface SetARecordResult {
  isSuccess: boolean;
  errors: string[];
  rawXml: string;
}

export class NamecheapDNSService {
  private readonly apiUser = namecheapConfig.apiUser;
  private readonly apiKey = namecheapConfig.apiKey;
  private readonly clientIp = namecheapConfig.clientIp;
  private readonly username = namecheapConfig.userName;
  private readonly baseUrl = namecheapConfig.apiUrl;

  public async setARecord(domain: string, ip: string, hostName: string = '@', ttl: number = 1800): Promise<SetARecordResult> {
    const { sld, tld } = this.splitDomain(domain);
    const params: Record<string, string> = {
      apiuser: this.apiUser,
      apikey: this.apiKey,
      username: this.username,
      ClientIp: this.clientIp,
      Command: 'namecheap.domains.dns.setHosts',
      SLD: sld,
      TLD: tld,
      HostName1: hostName,
      RecordType1: 'A',
      Address1: ip,
      TTL1: ttl.toString(),
    };

    try {
      const response = await axios.get(this.baseUrl, { params });
      const parsed = await parseStringPromise(response.data);
      const isSuccess =
        parsed.ApiResponse?.CommandResponse?.[0]?.DomainDNSSetHostsResult?.[0]?.$.IsSuccess === 'true';
      return { isSuccess, errors: [], rawXml: response.data };
    } catch (err: any) {
      return { isSuccess: false, errors: [err.message], rawXml: '' };
    }
  }

  private splitDomain(domain: string): { sld: string; tld: string } {
    const parts = domain.split('.');
    if (parts.length < 2) throw new Error('Incorrect domain');
    const tld = parts.pop()!;
    const sld = parts.join('.');
    return { sld, tld };
  }
}