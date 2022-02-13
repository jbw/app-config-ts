import { IConfigurationRoot } from './configuration-root.interface';
import { IConfigurationSource } from './configuration-source.interface';

/**
 * @description Builds application configuration.
 */

export interface IConfigurationBuilder {
  readonly sources: IConfigurationSource[];

  add(configurationSourcec: IConfigurationSource): IConfigurationBuilder;

  setBasePath(basePath: string): IConfigurationBuilder;

  addEnvironmentVariables(): IConfigurationBuilder;

  build(): IConfigurationRoot;
}
