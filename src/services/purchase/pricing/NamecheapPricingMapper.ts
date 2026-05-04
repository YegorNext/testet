import { NormalizedPricing } from './NormalizedPricing';

export class NamecheapPricingMapper {
  static fromXml(parsed: any): NormalizedPricing | null {
    const root =
      parsed?.ApiResponse?.CommandResponse?.UserGetPricingResult;

    const categoriesRaw = root?.ProductType?.ProductCategory;

    const categories = Array.isArray(categoriesRaw)
      ? categoriesRaw
      : categoriesRaw
        ? [categoriesRaw]
        : [];

    if (!categories.length) return null;

    const getPrice = (name: string): number | undefined => {
      const category = categories.find((c: any) => c?.$?.Name === name);
      const product = category?.Product;

      const pricesRaw = product?.Price;

      const prices = Array.isArray(pricesRaw)
        ? pricesRaw
        : pricesRaw
          ? [pricesRaw]
          : [];

      const year1 = prices.find(
        (p: any) => p?.$?.Duration === '1'
      );

      const value = year1?.$?.Price;

      return value ? parseFloat(value) : undefined;
    };

    const register1y = getPrice('register');

    if (register1y === undefined) return null;

    return {
      register1y,
      renew1y: getPrice('renew') ?? 0,
      transfer1y: getPrice('transfer') ?? 0,
    };
  }
}