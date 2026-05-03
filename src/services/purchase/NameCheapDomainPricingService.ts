import axios from 'axios';
import { parseStringPromise } from 'xml2js';
import { prisma } from '../../utils/prisma'; 
import { domainLogger } from '../../utils/logger';
import { NamecheapAccountEntity } from '../entities/../../entities/namecheap-account.entity';

export interface DomainPricingResult {
  domain: string;
  currentPrice?: number;
  renewalPrice?: number;
  errors: string[];
  rawXml: string;
}

export class NameCheapDomainPricingService {
  private account!: NamecheapAccountEntity;

  constructor(private accountName: string) {} 


  public async loadAccount(): Promise<void> {
    const account = await prisma.namecheapAccount.findUnique({
      where: { name: this.accountName },
    });

    if (!account) {
      throw new Error(`Namecheap account with name "${this.accountName}" not found`);
    }

    this.account = new NamecheapAccountEntity(account);
  }

  public async getPricing(domain: string): Promise<DomainPricingResult> {
    if (!this.account) {
      await this.loadAccount();
    }

    const params: Record<string, string> = {
      ApiUser: this.account.apiUser,
      ApiKey: this.account.apiKey,
      UserName: this.account.userName,
      ClientIp: this.account.clientIp,
      Command: 'namecheap.users.getPricing',
      ProductType: 'DOMAIN',
      ProductName: domain,
    };

    try {
      const response = await axios.get(this.account.apiUrl, { params });
      const xml = response.data;
      const parsed = await parseStringPromise(xml, { explicitArray: false });

      const domainPricing =
        parsed?.ApiResponse?.CommandResponse?.Pricing?.ProductType?.Domain?.[0]?.Product?.$;

      if (!domainPricing) {
        domainLogger.error(`Failed to parse pricing for domain ${domain}: ${xml}`);
        return { domain, errors: ['Failed to parse pricing'], rawXml: xml };
      }

      return {
        domain,
        currentPrice: parseFloat(domainPricing.CurrentPrice),
        renewalPrice: parseFloat(domainPricing.RenewalPrice),
        errors: [],
        rawXml: xml,
      };
    } catch (error: any) {
      domainLogger.error(`Error getting pricing for domain ${domain}: ${error.message}`);
      return { domain, errors: [error.message], rawXml: '' };
    }
  }
}