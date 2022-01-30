import { IConfigurationSection } from "./IConfigurationSection";

/**
 * @description key/value application configuration properties.
 */
export interface IConfiguration {

  get(key: string): string;

  getSection(section: string): IConfigurationSection;

  getChildren(key: string): IConfigurationSection[];
}
