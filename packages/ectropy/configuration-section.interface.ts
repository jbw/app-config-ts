import { IConfiguration } from './configuration.interface';

export interface IConfigurationSection extends IConfiguration {
  key: string;
  value: string | null;
  path: string;
}
