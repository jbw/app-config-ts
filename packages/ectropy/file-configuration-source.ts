import { IConfigurationBuilder } from './abstractions/IConfigurationBuilder';
import { IConfigurationProvider } from './abstractions/IConfigurationProvider';
import { IConfigurationSource } from './abstractions/IConfigurationSource';

export abstract class FileConfigurationSource implements IConfigurationSource {
  public path?: string;

  abstract build(builder: IConfigurationBuilder): IConfigurationProvider;
}
