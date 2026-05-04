import { NamecheapHttpClient } from './dns/NamecheapHttpClient';
import { NamecheapPricingRequestBuilder } from './pricing/NamecheapPricingRequestBuilder';
import { NamecheapPricingResponseParser } from './pricing/NamecheapPricingResponseParser';
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
          errors: ['Failed to parse pricing'],
          rawXml: xml,
        };
      }

      return {
        domain,
        currentPrice: parsed.currentPrice,
        renewalPrice: parsed.renewalPrice,
        errors: [],
        rawXml: xml,
      };
    } catch (error: any) {
      return {
        domain,
        errors: [error.message],
        rawXml: '',
      };
    }
  }
}