import { IConfigurationProvider } from './configuration-provider.interface';
import { IConfigurationSection } from './configuration-section.interface';

export interface IConfigurationRoot {
  providers: IConfigurationProvider[];

  getSection(section: string): IConfigurationSection;

  get(key: string): string | null;

  getSectionWithType<T>(sectionKey: string): T;

  getChildren(key: string): IConfigurationSection[];
}
