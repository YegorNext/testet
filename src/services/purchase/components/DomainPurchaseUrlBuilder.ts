import { namecheapConfig } from '../../../config/namecheap.config';
import { URLSearchParams } from 'url';

export class DomainPurchaseUrlBuilder {
  private domain: string;
  private years: number;

  constructor(domain: string, years = 1) {
    this.domain = domain;
    this.years = years;
  }

  public build(): string {
    const params = new URLSearchParams({
      ApiUser: namecheapConfig.apiUser,
      ApiKey: namecheapConfig.apiKey,
      UserName: namecheapConfig.userName,
      ClientIp: namecheapConfig.clientIp,
      Command: 'namecheap.domains.create',
      DomainName: this.domain,
      Years: this.years.toString(),
      AddFreeWhoisguard: 'no',
      WGEnabled: 'no',
    });

    this.appendRegistrant(params);
    this.appendTech(params);
    this.appendAdmin(params);
    this.appendAuxBilling(params);

    return `${namecheapConfig.apiUrl}?${params.toString()}`;
  }

  private appendRegistrant(params: URLSearchParams) {
    const r = namecheapConfig.registrant;
    params.append('RegistrantFirstName', r.firstName);
    params.append('RegistrantLastName', r.lastName);
    params.append('RegistrantAddress1', r.address1);
    if (r.address2) params.append('RegistrantAddress2', r.address2);
    params.append('RegistrantCity', r.city);
    params.append('RegistrantStateProvince', r.stateProvince);
    params.append('RegistrantPostalCode', r.postalCode);
    params.append('RegistrantCountry', r.country);
    params.append('RegistrantPhone', r.phone);
    params.append('RegistrantEmailAddress', r.email);
  }

  private appendTech(params: URLSearchParams) {
    const t = namecheapConfig.tech;
    params.append('TechFirstName', t.firstName);
    params.append('TechLastName', t.lastName);
    params.append('TechAddress1', t.address1);
    if (t.address2) params.append('TechAddress2', t.address2);
    params.append('TechCity', t.city);
    params.append('TechStateProvince', t.stateProvince);
    params.append('TechPostalCode', t.postalCode);
    params.append('TechCountry', t.country);
    params.append('TechPhone', t.phone);
    params.append('TechEmailAddress', t.email);
  }

  private appendAdmin(params: URLSearchParams) {
    const a = namecheapConfig.admin;
    params.append('AdminFirstName', a.firstName);
    params.append('AdminLastName', a.lastName);
    params.append('AdminAddress1', a.address1);
    if (a.address2) params.append('AdminAddress2', a.address2);
    params.append('AdminCity', a.city);
    params.append('AdminStateProvince', a.stateProvince);
    params.append('AdminPostalCode', a.postalCode);
    params.append('AdminCountry', a.country);
    params.append('AdminPhone', a.phone);
    params.append('AdminEmailAddress', a.email);
  }

  private appendAuxBilling(params: URLSearchParams) {
    const aux = namecheapConfig.auxBilling;
    params.append('AuxBillingFirstName', aux.firstName);
    params.append('AuxBillingLastName', aux.lastName);
    params.append('AuxBillingAddress1', aux.address1);
    if (aux.address2) params.append('AuxBillingAddress2', aux.address2);
    params.append('AuxBillingCity', aux.city);
    params.append('AuxBillingStateProvince', aux.stateProvince);
    params.append('AuxBillingPostalCode', aux.postalCode);
    params.append('AuxBillingCountry', aux.country);
    params.append('AuxBillingPhone', aux.phone);
    params.append('AuxBillingEmailAddress', aux.email);
  }
}