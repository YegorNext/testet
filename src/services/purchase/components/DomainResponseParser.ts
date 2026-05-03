import { parseStringPromise } from 'xml2js';
import { domainLogger } from '../../../utils/logger';

export class DomainResponseParser {
  public async parseRegistered(xml: string): Promise<boolean> {
    try {
      var result = await parseStringPromise(xml);
      var commandResponse = result.ApiResponse.CommandResponse[0];
      var domainResult = commandResponse.DomainCreateResult[0].$;
      return domainResult.Registered === 'true';
    } catch (error) {
      domainLogger.error('Failed to parse XML: ' + error);
      return false;
    }
  }
}