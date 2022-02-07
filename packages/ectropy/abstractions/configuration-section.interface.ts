import { IConfiguration } from './configuratio.interface';

export interface IConfigurationSection extends IConfiguration {
  key: string;
  value: string | null;
  path: string;
}
