import { IConfigurationRoot } from './configuration-root.interface';
import { IConfigurationSection } from './configuration-section.interface';
import { ConfigurationPath } from './configuration-path';

export class ConfigurationSection implements IConfigurationSection {
  key: string = ConfigurationPath.getSectionKey(this.path);
  value: string | null = this.root.get(this.path);

  constructor(public readonly root: IConfigurationRoot, public readonly path: string) {
    console.debug('ConfigurationSection.constructor', this.path, this.key, this.value);
  }

  public get(key: string): string | null {
    console.debug('ConfigurationSection.get', this.path, key);
    return this.root.get(ConfigurationPath.combine(this.path, key));
  }

  public getSection(section: string): IConfigurationSection {
    console.debug('ConfigurationSection.getSection', this.path, section);
    return this.root.getSection(ConfigurationPath.combine(this.path, section));
  }

  public getChildren(key: string): IConfigurationSection[] {
    return this.root.getChildren(key);
  }
}
