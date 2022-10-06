import { IConfigurationProvider } from '../core/configuration-provider.interface';
import { IConfigurationBuilder } from '../core/configuration-builder.interface';
import { JsonConfigurationProvider } from './json-configuration-provider';
import { FileConfigurationSource } from '../core/file-configuration-source';
import path from 'path';

export class JsonConfigurationSource extends FileConfigurationSource {
  constructor(path: string) {
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

    this.path = path.join(builder.getBasePath(), this.path);

    return new JsonConfigurationProvider(this);
  }
}
