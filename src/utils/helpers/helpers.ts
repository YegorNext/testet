import fs from 'fs/promises';
import path from 'path';
import { CloackType, createCloackService } from '../../services/cloack/cloack.service';

export const getForgeHeaders = () => {
  return {
    Authorization: `Bearer ${process.env.FORGE_API_TOKEN}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
};

export const buildNginxConfig = async (domain: string): Promise<string> => {
  const templatePath = path.resolve(__dirname, '../../templates/nginx/nginx.conf.tmpl');
  let template = await fs.readFile(templatePath, 'utf8');

  return template.replaceAll('{{domain}}', domain);
};

export type CloackParams = {
  cloack: CloackType;
  alias: string;
  team: string;
  user: string;
  campaign: string;
};

export const createCloackContent = async (params: CloackParams): Promise<string> => {
  const cloackService = createCloackService(params.cloack);

  return await cloackService.getContent(params.alias, params.team, params.user, params.campaign);
};
