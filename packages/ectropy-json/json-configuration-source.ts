import { IConfigurationProvider } from '../ectropy/configuration-provider.interface';
import { IConfigurationBuilder } from '../ectropy/configuration-builder.interface';
import { JsonConfigurationProvider } from './json-configuration-provider';
import { FileConfigurationSource } from '../ectropy/file-configuration-source';

export class JsonConfigurationSource extends FileConfigurationSource {
  /**
   * @description This is the interface for the configuration of the application.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public build(builder: IConfigurationBuilder): IConfigurationProvider {
    return new JsonConfigurationProvider(this);
  }
}
