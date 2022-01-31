import { IConfiguration } from './abstractions/IConfiguration';
import { IConfigurationSection } from './abstractions/IConfigurationSection';

export class Configuration implements IConfiguration {
  get(key: string): string {
    throw new Error('Method not implemented.');
  }
  getSection(section: string): IConfigurationSection {
    throw new Error('Method not implemented.');
  }
  getChildren(key: string): IConfigurationSection[] {
    throw new Error('Method not implemented.');
  }
}
