import path from 'path';

import { IConfigurationBuilder } from '../core/configuration-builder.interface';
import { IConfigurationProvider } from '../core/configuration-provider.interface';
import { FileConfigurationSource } from '../core/file-configuration-source';
import { JsonConfigurationProvider } from './json-configuration-provider';

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
