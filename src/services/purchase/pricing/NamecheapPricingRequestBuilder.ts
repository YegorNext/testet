export class NamecheapPricingRequestBuilder {
  static build(
    apiUser: string,
    apiKey: string,
    userName: string,
    clientIp: string,
    domain: string
  ): Record<string, string> {
    const tld = domain.split('.').pop();

    return {
      ApiUser: apiUser,
      ApiKey: apiKey,
      UserName: userName,
      ClientIp: clientIp,
      Command: 'namecheap.users.getPricing',
      ProductType: 'DOMAIN',
      ProductName: tld!,
    };
  }
}