import { IConfigurationRoot } from './abstractions/IConfigurationRoot';
import { IConfigurationSection } from './abstractions/IConfigurationSection';


export class ConfigurationSection implements IConfigurationSection {

  key: string = ConfigurationPath.getSectionKey(this.path);
  value: string | null = this.root.get(this.path);

  constructor(public readonly root: IConfigurationRoot, public readonly path: string) { }

  public get(key: string): string | null {
    console.log('ConfigurationSection.get', this.root, this.path, key);
    return this.root.get(ConfigurationPath.combine(this.path, key));
  }

  public getSection(section: string): IConfigurationSection {
    console.log('ConfigurationSection.getSection', this.root, this.path, section);
    return this.root.getSection(ConfigurationPath.combine(this.path, section));
  }

  public getChildren(key: string): IConfigurationSection[] {
    return this.root.getChildren(this.path);
  }
}

export class ConfigurationPath
{
  static readonly keyDelimiter: string = '.';

  public static combine(path1: string, path2: string): string {
    return path1 + ConfigurationPath.keyDelimiter + path2;
  }

  public static getParentPath(path: string): string {
    return path.substring(0, path.lastIndexOf('.'));
  }

  public static getSectionKey(path: string): string {
    return path.substring(path.lastIndexOf('.') + 1);
  }

}
