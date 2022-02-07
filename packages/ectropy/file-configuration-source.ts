import { IConfigurationBuilder } from './abstractions/configuration-builder.interface';
import { IConfigurationProvider } from './abstractions/configuration-provider.interface';
import { IConfigurationSource } from './abstractions/configuration-source.interface';

export abstract class FileConfigurationSource implements IConfigurationSource {
  public path?: string;

  abstract build(builder: IConfigurationBuilder): IConfigurationProvider;
}
