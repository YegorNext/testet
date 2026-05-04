import { NamecheapHttpClient } from './dns/NamecheapHttpClient';
import { NamecheapPricingRequestBuilder } from './pricing/NamecheapPricingRequestBuilder';
import {
  NamecheapPricingResponseParser,
} from './pricing/NamecheapPricingResponseParser';

import { DomainPricingResult } from './pricing/DomainPricingResult';
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
  const params = NamecheapPricingRequestBuilder.build(
    this.apiUser,
    this.apiKey,
    this.userName,
    this.clientIp,
    domain
  );

  const xml = await this.http.get(params);
  const parsed = await this.parser.parse(xml);

  const pricing = NamecheapPricingMapper.fromXml(parsed);

  if (!pricing) {
    return {
      domain,
      pricing: null,
      errors: ['Cannot parse pricing'],
    };
  }

  return {
    domain,
    pricing,
    errors: [],
  };
}
}