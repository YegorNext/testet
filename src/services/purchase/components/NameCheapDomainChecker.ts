import axios from 'axios';
import { parseStringPromise } from 'xml2js';
import { namecheapConfig } from '../../../config/namecheap.config';
import { domainLogger } from '../../../utils/logger';

export class NameCheapDomainChecker {
  public async checkAvailability(domain: string): Promise<boolean> {
    try {
      const url = this.buildCheckUrl(domain);
      const response = await fetch(url).then(r => r.text()); 
      return this.parseDomainAvailability(response);
    } catch (error: any) {
      domainLogger.error(`Error checking domain ${domain}: ${error.message}`);
      return false;
    }
  }

  private buildCheckUrl(domain: string): string {
    return `${namecheapConfig.apiUrl}?ApiUser=${namecheapConfig.apiUser}&ApiKey=${namecheapConfig.apiKey}&UserName=${namecheapConfig.userName}&ClientIp=${namecheapConfig.clientIp}&Command=namecheap.domains.check&DomainList=${domain}`;
  }

  private async parseDomainAvailability(xml: string): Promise<boolean> {

      domainLogger.info(`NameCheap API response for domain check: ${xml}`);


    const result = await parseStringPromise(xml, { explicitArray: false }); 

    const domainCheckResult = result?.ApiResponse?.CommandResponse?.DomainCheckResult?.$;

    if (!domainCheckResult || typeof domainCheckResult.Available === 'undefined') {
      domainLogger.error('Unexpected response from NameCheap API');
      return false;
    }

    return domainCheckResult.Available === 'true';
  }
}