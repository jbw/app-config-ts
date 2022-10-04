import { IConfigurationProvider } from './configuration-provider.interface';
import { IConfigurationBuilder } from './configuration-builder.interface';

/**
 * @description This is the interface for the configuration of the application.
 */

export interface IConfigurationSource {
  /**
   * Builds the configuration for this source.
   * @param IConfigurationBuilder The configuration builder.
   * @returns IConfigurationProvider The configuration provider.
   */
  build(builder: IConfigurationBuilder): IConfigurationProvider;
}
