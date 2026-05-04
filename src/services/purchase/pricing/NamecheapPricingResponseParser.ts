import { parseStringPromise } from 'xml2js';

export interface ParsedPricing {
  type?: string;
}

export class NamecheapPricingResponseParser {
  async parse(xml: string): Promise<ParsedPricing | null> {
    const parsed = await parseStringPromise(xml, {
      explicitArray: false,
    });

    const result =
      parsed?.ApiResponse?.CommandResponse?.UserGetPricingResult;

    if (!result) {
      return null;
    }

    const type = result?.ProductType?.$?.Name;

    return {
      type,
    };
  }
}