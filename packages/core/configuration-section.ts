import { ConfigurationPath } from './configuration-path';
import { IConfigurationRoot } from './configuration-root.interface';
import { IConfigurationSection } from './configuration-section.interface';

export class ConfigurationSection implements IConfigurationSection {
  key: string;
  value: string | null;

  constructor(public readonly root: IConfigurationRoot, public readonly path: string) {
    this.key = ConfigurationPath.getSectionKey(this.path);
    this.value = this.root?.get(this.path);

    console.debug('ConfigurationSection.constructor', this.path, this.key);
  }

  public get(key: string): string | null {
    console.debug('ConfigurationSection.get', this.path, key);
    return this.root.get(ConfigurationPath.combine(this.path, key));
  }

  public getSection(section: string): IConfigurationSection {
    console.debug('ConfigurationSection.getSection', this.path, section);
    return this.root.getSection(ConfigurationPath.combine(this.path, section));
  }

  public getChildren = (key: string) => this.root.getChildren(key);
}
