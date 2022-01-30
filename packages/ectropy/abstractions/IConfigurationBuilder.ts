import { IConfigurationRoot } from './IConfigurationRoot';
import { IConfigurationSource } from './IConfigurationSource';

/**
 * @description Builds application configuration.
 */

export interface IConfigurationBuilder {

  readonly sources: IConfigurationSource[];

  add(configurationSourcec: IConfigurationSource): IConfigurationBuilder;

  build(): IConfigurationRoot;
}
