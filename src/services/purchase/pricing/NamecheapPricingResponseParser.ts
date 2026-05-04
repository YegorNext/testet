import { parseStringPromise } from 'xml2js';

export class NamecheapPricingResponseParser {
  async parse(xml: string) {
    const parsed = await parseStringPromise(xml, {
      explicitArray: false,
    });

    const product =
      parsed?.ApiResponse?.CommandResponse?.Pricing?.ProductType?.Domain?.Product?.$;

    if (!product) {
      return null;
    }

    return {
      currentPrice: parseFloat(product.CurrentPrice),
      renewalPrice: parseFloat(product.RenewalPrice),
    };
  }
}