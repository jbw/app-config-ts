import { ConfigurationPath } from './configuration-path';
import { IConfigurationProvider } from './configuration-provider.interface';
import { IConfigurationRoot } from './configuration-root.interface';
import { ConfigurationSection } from './configuration-section';
import { IConfigurationSection } from './configuration-section.interface';

export class ConfigurationRoot implements IConfigurationRoot {
  public providers: IConfigurationProvider[] = [];

  constructor(providers: IConfigurationProvider[]) {
    this.providers = providers;
  }

  getSection(section: string): IConfigurationSection {
    return new ConfigurationSection(this, section);
  }

  get(key: string): string | null {
    for (const provider of this.providers) {
      console.debug('ConfigurationRoot.get', key);

      const value = provider.get(key);
      if (value != null) {
        return value;
      }
    }

    return null;
  }

  getSectionWithType<T>(sectionKey: string): T {
    // HACK: Currently this is simplified by setting the object on a section in JsonConfigurationProvider.flatten
    // Might not be able to assume this will be done for all format extensions such as YAML or INI.
    const section = this.getSection(sectionKey);
    const obj = {} as T;
    obj[sectionKey] = section.value;
    return obj[sectionKey];
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
