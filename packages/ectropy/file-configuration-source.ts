import { IConfigurationBuilder } from './configuration-builder.interface';
import { IConfigurationProvider } from './configuration-provider.interface';
import { IConfigurationSource } from './configuration-source.interface';

export abstract class FileConfigurationSource implements IConfigurationSource {
  public path?: string;

  abstract build(builder: IConfigurationBuilder): IConfigurationProvider;
}
