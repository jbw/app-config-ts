import { IConfigurationProvider } from "./IConfigurationProvider";
import { IConfigurationBuilder } from "./IConfigurationBuilder";

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
