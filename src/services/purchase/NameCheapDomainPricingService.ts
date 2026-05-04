import { NamecheapHttpClient } from './dns/NamecheapHttpClient';
import { NamecheapPricingRequestBuilder } from './pricing/NamecheapPricingRequestBuilder';
import {
  NamecheapPricingResponseParser,
} from './pricing/NamecheapPricingResponseParser';

import { DomainPricingResult } from './pricing/DomainPricingResult';

export class NameCheapDomainPricingService {
  constructor(
    private readonly http: NamecheapHttpClient,
    private readonly parser: NamecheapPricingResponseParser,
    private readonly apiUser: string,
    private readonly apiKey: string,
    private readonly userName: string,
    private readonly clientIp: string
  ) {}

  public async getPricing(domain: string): Promise<DomainPricingResult> {
    try {
      const params = NamecheapPricingRequestBuilder.build(
        this.apiUser,
        this.apiKey,
        this.userName,
        this.clientIp,
        domain
      );

      const xml = await this.http.get(params);

      const parsed = await this.parser.parse(xml);

      if (!parsed) {
        return {
          domain,
          type: '',
          errors: ['Failed to parse pricing response'],
          rawXml: xml,
        };
      }

      return {
        domain,
        type: parsed.type ?? '',
        errors: [],
        rawXml: xml,
      };
    } catch (error: any) {
      return {
        domain,
        type: '',
        errors: [error.message],
        rawXml: '',
      };
    }
  }
}