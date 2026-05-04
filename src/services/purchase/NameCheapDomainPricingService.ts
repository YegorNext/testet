import { NamecheapHttpClient } from './dns/NamecheapHttpClient';
import { NamecheapPricingRequestBuilder } from './pricing/NamecheapPricingRequestBuilder';
import { NamecheapPricingResponseParser } from './pricing/NamecheapPricingResponseParser';
import { NamecheapPricingMapper } from './pricing/NamecheapPricingMapper';

export class NameCheapDomainPricingService {
  constructor(
    private readonly http: NamecheapHttpClient,
    private readonly parser: NamecheapPricingResponseParser,
    private readonly apiUser: string,
    private readonly apiKey: string,
    private readonly userName: string,
    private readonly clientIp: string
  ) {}

  public async getPricing(domain: string) {
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
          pricing: null,
          errors: ['Invalid XML response'],
          rawXml: xml,
        };
      }

      const pricing = NamecheapPricingMapper.fromXml(parsed);

      if (!pricing) {
        return {
          domain,
          pricing: null,
          errors: ['Cannot parse pricing structure'],
          rawXml: xml,
        };
      }

      return {
        domain,
        pricing,
        errors: [],
        rawXml: xml,
      };
    } catch (error: any) {
      return {
        domain,
        pricing: null,
        errors: [error.message],
        rawXml: '',
      };
    }
  }
}