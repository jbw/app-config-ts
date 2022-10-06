import { IConfigurationBuilder } from './configuration-builder.interface';
import { IConfigurationSource } from './configuration-source.interface';
import { IConfigurationRoot } from './configuration-root.interface';
import { IConfigurationProvider } from './configuration-provider.interface';
import { ConfigurationRoot } from './configuration-root';
import { EnvironmentVariablesConfigurationSource } from './environment-variables-configuration-source';

export class ConfigurationBuilder implements IConfigurationBuilder {
  /**
   * @description Returns the sources of the configuration values.
   */
  public readonly sources: IConfigurationSource[] = [];

  private basePath = './';

  public add(source: IConfigurationSource): IConfigurationBuilder {
    this.sources.push(source);
    return this;
  }

  public setBasePath(basePath: string): IConfigurationBuilder {
    this.basePath = basePath;
    return this;
  }

  public getBasePath(): string {
    return this.basePath;
  }

  /**
   * Extension method to add EnvironmentVariablesConfigurationSource
   */
  public addEnvironmentVariables(): IConfigurationBuilder {
    this.add(new EnvironmentVariablesConfigurationSource());
    return this;
  }

  public build(): IConfigurationRoot {
    const providers: IConfigurationProvider[] = [];

    this.sources.forEach((source) => {
      const provider: IConfigurationProvider = source.build(this);
      providers.push(provider);
    });

    return new ConfigurationRoot(providers);
  }
}
