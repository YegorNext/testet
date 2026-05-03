import { IDomainRegistrar } from './IDomainRegistrar';
import { DomainPurchaseUrlBuilder } from './components/DomainPurchaseUrlBuilder';
import { DomainResponseParser } from './components/DomainResponseParser';
import { NameCheapApiClient } from './components/NameCheapApiClient';

import { NameCheapDomainChecker } from './components/NameCheapDomainChecker';


export class NameCheapDomainRegistrar implements IDomainRegistrar {
  private checker: NameCheapDomainChecker;
  private parser: DomainResponseParser;
  private apiClient: NameCheapApiClient;

  constructor() {
    this.checker = new NameCheapDomainChecker();
    this.parser = new DomainResponseParser();
    this.apiClient = new NameCheapApiClient();
  }

  public async checkAvailability(domain: string): Promise<boolean> {
    return await this.checker.checkAvailability(domain);
  }

  public async registerDomain(domain: string): Promise<boolean> {

    await this.ensureAvailable(domain);

    const xml = await this.purchase(domain);

    console.log(`Raw XML response from NameCheap API: ${xml}`);

    return this.parser.parseRegistered(xml);
  }

  private async ensureAvailable(domain: string): Promise<void> {
    const available = await this.checkAvailability(domain);

    if (!available) {
        throw new Error(`Domain ${domain} is not available for registration.`);
    }
  }

   private buildPurchaseUrl(domain: string): string {
     const builder = new DomainPurchaseUrlBuilder(domain);
     return builder.build();
   }
  
   private async purchase(domain: string): Promise<string> {
    const url = this.buildPurchaseUrl(domain);
    return this.apiClient.execute(url);
  }

}