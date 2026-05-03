import dns from 'dns/promises';
import fetch from 'node-fetch';

export class DomainChecker {
  static async isResolvable(domain: string): Promise<boolean> {
    try {
      const records = await dns.resolve(domain);
      return records.length > 0;
    } catch {
      return false;
    }
  }

  static async isOnline(domain: string): Promise<boolean> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000); 

    try {
      const res = await fetch(`http://${domain}`, {
        method: 'HEAD',
        signal: controller.signal,
      });
      return res.ok;
    } catch {
      return false;
    } finally {
      clearTimeout(timeout);
    }
  }

  static async check(domain: string): Promise<boolean> {
    const resolvable = await this.isResolvable(domain);
    return resolvable ? await this.isOnline(domain) : false;
  }
}