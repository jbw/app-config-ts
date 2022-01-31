import { IConfigurationBuilder } from './abstractions/IConfigurationBuilder';
import { IConfigurationProvider } from './abstractions/IConfigurationProvider';
import { IConfigurationSource } from './abstractions/IConfigurationSource';

export interface IFileProvider {}

export abstract class FileConfigurationSource implements IConfigurationSource {
  public path?: string;

  abstract build(builder: IConfigurationBuilder): IConfigurationProvider;
}
