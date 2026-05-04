import { NormalizedPricing } from './NormalizedPricing';

export class NamecheapPricingMapper {
  static fromXml(parsed: any): NormalizedPricing | null {
    const root =
      parsed?.ApiResponse?.CommandResponse?.UserGetPricingResult;

    const categories = root?.ProductType?.ProductCategory;

    if (!categories) return null;

    const getPrice = (name: string) => {
      const category = categories.find((c: any) => c?.$?.Name === name);
      const product = category?.Product;

      const price = product?.Price;

      const firstYear = Array.isArray(price)
        ? price.find((p: any) => p?.$?.Duration === '1')
        : price;

      return firstYear?.$?.Price
        ? parseFloat(firstYear.$.Price)
        : undefined;
    };

    const register1y = getPrice('register');
    if (!register1y) return null;

    return {
      register1y,
      renew1y: getPrice('renew') ?? 0,
      transfer1y: getPrice('transfer') ?? 0,
    };
  }
}