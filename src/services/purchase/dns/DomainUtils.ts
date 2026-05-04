export class DomainUtils {
  static split(domain: string): { sld: string; tld: string } {
    const parts = domain.split('.');

    if (parts.length < 2) {
      throw new Error('Incorrect domain');
    }

    const tld = parts.pop()!;
    const sld = parts.join('.');

    return { sld, tld };
  }
}