import { IConfiguration } from './IConfiguration';

export interface IConfigurationSection extends IConfiguration {
  key: string;
  value: string | null;
  path: string;
}
