import { IConfigurationProvider } from './IConfigurationProvider';
import { IConfigurationSection } from './IConfigurationSection';

export interface IConfigurationRoot {

  providers: IConfigurationProvider[];

  getSection(section: string): IConfigurationSection;

  get(key: string): string | null;

  getChildren(key: string): IConfigurationSection[];

}
