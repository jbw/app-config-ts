import { IConfigurationSection } from './configuration-section.interface';

/**
 * @description key/value application configuration properties.
 */
export interface IConfiguration {
  get(key: string): string | null;

  getSection(section: string): IConfigurationSection;

  getChildren(key: string): IConfigurationSection[];
}
