import { parseStringPromise } from 'xml2js';

export class NamecheapPricingResponseParser {
  async parse(xml: string): Promise<any | null> {
    try {
      const parsed = await parseStringPromise(xml, {
        explicitArray: false,
      });

      return parsed ?? null;
    } catch {
      return null;
    }
  }
}