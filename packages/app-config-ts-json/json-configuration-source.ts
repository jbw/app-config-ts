import { IConfigurationProvider } from '../app.config.ts/configuration-provider.interface';
import { IConfigurationBuilder } from '../app.config.ts/configuration-builder.interface';
import { JsonConfigurationProvider } from './json-configuration-provider';
import { FileConfigurationSource } from '../app.config.ts/file-configuration-source';

export class JsonConfigurationSource extends FileConfigurationSource {
  constructor(path?: string) {
    super(path);
  }

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
