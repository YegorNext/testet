export interface IDomainRegistrar {
  checkAvailability(domain: string): Promise<boolean>;
  registerDomain(domain: string): Promise<boolean>;
}