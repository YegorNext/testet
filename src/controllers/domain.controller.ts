import { Request, Response } from 'express';
import { NameCheapDomainRegistrar } from '../services/purchase/NameCheapDomainRegistrar';

import { NamecheapDNSService } from '../services/NameCheapDNSService';
import { NamecheapHttpClient } from '../services/purchase/dns/NamecheapHttpClient';
import { NamecheapResponseParser } from '../services/purchase/dns/NamecheapResponseParser';
import { namecheapConfig } from '../config/namecheap.config';

import { NameCheapDomainPricingService } from '../services/purchase/NameCheapDomainPricingService';
import { NamecheapPricingResponseParser } from '../services/purchase/pricing/NamecheapPricingResponseParser';


export class DomainController {
  private registrar = new NameCheapDomainRegistrar();

  private dnsService = new NamecheapDNSService(new NamecheapHttpClient(namecheapConfig.apiUrl), new NamecheapResponseParser());
  private pricingService = new NameCheapDomainPricingService(
    new NamecheapHttpClient(namecheapConfig.apiUrl),
    new NamecheapPricingResponseParser(),
    namecheapConfig.apiUser,
    namecheapConfig.apiKey,
    namecheapConfig.userName,
    namecheapConfig.clientIp
  );

  addARecordOnNamecheap = async (req: Request, res: Response) => {
    const { domain, ip, host } = req.body;

    if (!domain || !ip) {
      return res.status(400).json({
        message: 'Domain and IP are required.',
      });
    }

    const aRecordResult = await this.dnsService.setARecord(
      domain,
      ip,
      host || '@'
    );

    return res.json({
      domain,
      namecheapARecord: aRecordResult,
    });
  };

  purchaseDomain = async (req: Request, res: Response) => {
    const { domain } = req.body;

    if (!domain) {
      return res.status(400).json({
        message: 'Domain is required.',
      });
    }

    try {
      const success = await this.registrar.registerDomain(domain);

      return res.json({
        domain,
        registered: success,
        message: success
          ? 'Domain successfully registered'
          : 'Domain registration failed',
      });
    } catch (error: any) {
      return res.status(500).json({
        domain,
        registered: false,
        message: error.message,
      });
    }
  };

getDomainPricing = async (req: Request, res: Response) => {
  const { domain } = req.body;

  if (!domain) {
    return res.status(400).json({
      message: 'Domain is required.',
    });
  }

  try {
    const result = await this.pricingService.getPricing(domain);

    return res.json({
      domain: result.domain,
      price: result.pricing,
      errors: result.errors,
    });
  } catch (error: any) {
    return res.status(500).json({
      domain,
      message: error.message,
    });
  }
};
}