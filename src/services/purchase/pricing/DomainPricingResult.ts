export interface DomainPricingResult {
  domain: string;
  currentPrice?: number;
  renewalPrice?: number;
  errors: string[];
  rawXml: string;
}