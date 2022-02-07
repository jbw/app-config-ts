import { IConfigurationBuilder } from './configuration-builder.interface';
import { IConfigurationSource } from './configuration-source.interface';
import { IConfigurationRoot } from './configuration-root.interface';
import { IConfigurationProvider } from './configuration-provider.interface';
import { ConfigurationRoot } from './configuration-root';

export class ConfigurationBuilder implements IConfigurationBuilder {
  public readonly sources: IConfigurationSource[] = [];

  public add(source: IConfigurationSource): IConfigurationBuilder {
    this.sources.push(source);
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
