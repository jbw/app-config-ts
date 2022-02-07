import { IConfigurationRoot } from './abstractions/IConfigurationRoot';
import { IConfigurationSection } from './abstractions/IConfigurationSection';
import { ConfigurationPath } from './ConfigurationPath';

export class ConfigurationSection implements IConfigurationSection {
  key: string = ConfigurationPath.getSectionKey(this.path);
  value: string | null = this.root.get(this.path);

  constructor(public readonly root: IConfigurationRoot, public readonly path: string) {
    console.debug('ConfigurationSection.constructor', this.path);
  }

  public get(key: string): string | null {
    console.debug('ConfigurationSection.get', this.root, this.path, key);
    return this.root.get(ConfigurationPath.combine(this.path, key));
  }

  public getSection(section: string): IConfigurationSection {
    console.debug('ConfigurationSection.getSection', this.root, this.path, section);
    return this.root.getSection(ConfigurationPath.combine(this.path, section));
  }

  public getChildren(key: string): IConfigurationSection[] {
    return this.root.getChildren(key);
  }
}
