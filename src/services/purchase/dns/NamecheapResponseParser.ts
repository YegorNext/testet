import { parseStringPromise } from 'xml2js';

export class NamecheapResponseParser {
  async parseSetARecord(xml: string): Promise<boolean> {
    const parsed = await parseStringPromise(xml);

    return (
      parsed?.ApiResponse?.CommandResponse?.[0]?.DomainDNSSetHostsResult?.[0]?.$?.IsSuccess === 'true'
    );
  }
}