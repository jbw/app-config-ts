import { IConfigurationRoot } from './configuration-root.interface';
import { IConfigurationProvider } from './configuration-provider.interface';
import { IConfigurationSection } from './configuration-section.interface';
import { ConfigurationSection } from './configuration-section';
import { ConfigurationPath } from './configuration-path';

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
      if (value != null) {
        return value;
      }
    }

    return null;
  }

  public getSectionByType<T>(section: string): T {
    const sections = this.getSection(section).getChildren(section);

    const obj = {} as T;
    sections.forEach((section) => {
      obj[section.key] = section.value;
    });

    return obj;
  }

  getChildren(key: string): IConfigurationSection[] {
    const result: IConfigurationSection[] = [];

    for (let i = 0; i < this.providers.length; i++) {
      const children = this.providers[i].getChildKeys(key);

      if (children != null) {
        for (let j = 0; j < children.length; j++) {
          result.push(new ConfigurationSection(this, key + ConfigurationPath.keyDelimiter + children[j]));
        }
      }
    }
    return result;
  }
}
