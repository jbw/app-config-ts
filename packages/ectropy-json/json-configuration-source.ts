import { IConfigurationProvider } from '../ectropy/configuration-provider.interface';
import { IConfigurationBuilder } from '../ectropy/configuration-builder.interface';
import { JsonConfigurationProvider } from './json-configuration-provider';
import { FileConfigurationSource } from '../ectropy/file-configuration-source';

export class JsonConfigurationSource extends FileConfigurationSource {
  /**
   * @description This is the interface for the configuration of the application.
   */
  public build(builder: IConfigurationBuilder): IConfigurationProvider {
    // check builder
    if (builder === null) {
      throw new Error('builder cannot be null');
    }

    return new JsonConfigurationProvider(this);
  }
}
