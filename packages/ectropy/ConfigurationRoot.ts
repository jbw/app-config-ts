import { IConfigurationRoot } from './abstractions/IConfigurationRoot';
import { IConfigurationProvider } from './abstractions/IConfigurationProvider';
import { IConfigurationSection } from './abstractions/IConfigurationSection';
import { ConfigurationSection } from './ConfigurationSection';

export class ConfigurationRoot implements IConfigurationRoot {
  public providers: IConfigurationProvider[] = [];

  constructor(providers: IConfigurationProvider[]) {
    this.providers = providers;
  }

  getSection(section: string): IConfigurationSection {
    return new ConfigurationSection(this, section);
  }

  get(key: string): string | null {
    for (let i = 0; i < this.providers.length; i++) {
      const value = this.providers[i].get(key);
      console.debug('ConfigurationRoot.get', key, value, this.providers[i]);
      if (value != null) {
        return value;
      }
    }

    return null;
  }

  getChildren(key: string): IConfigurationSection[] {
    const result: IConfigurationSection[] = [];

    for (let i = 0; i < this.providers.length; i++) {
      const children = this.providers[i].getChildKeys(key);

      if (children != null) {
        for (let j = 0; j < children.length; j++) {
          result.push(new ConfigurationSection(this, children[j]));
        }
      }
    }
    return result;
  }
}
