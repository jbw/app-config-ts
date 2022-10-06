import { IConfigurationRoot } from './configuration-root.interface';
import { IConfigurationSource } from './configuration-source.interface';

/**
 * @description Builds application configuration.
 */

export interface IConfigurationBuilder {
  readonly sources: IConfigurationSource[];

  add(configurationSource: IConfigurationSource): IConfigurationBuilder;

  setBasePath(basePath: string): IConfigurationBuilder;

  getBasePath(): string;

  addEnvironmentVariables(): IConfigurationBuilder;

  build(): IConfigurationRoot;
}
